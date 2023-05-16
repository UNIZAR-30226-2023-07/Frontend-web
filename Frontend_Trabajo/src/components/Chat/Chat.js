import "assets/css/user-styles.css";
import SelectImgUser from "hooks/SelectImgUser";

import React, { useState } from "react";
import { 
	Button,
	Card,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Media
} from "reactstrap";

import markAsSeen from "hooks/markAsSeen";

const Chat = (props) => {
	const [message, setMessage] = useState("");

	let { chatOpen, setChatOpen, chatUser, messages, setMessages, sePuedeEnviar, wsChat, sessionUser, friends } = props;

	const obtenerMensajesDeChat = (amigx, mensajes) => {
		if (mensajes == null)
			return;
		return mensajes.map((mensaje, key) => {
			if (mensaje.Receptor === amigx)
				return (
					<Card className="chat-msg chat-msg-mine" key={key}>
						{mensaje.Contenido}
					</Card>
				);
			else if (mensaje.Emisor === amigx)
				return (
					<Card className={"chat-msg " + (mensaje.Leido ? " chat-msg-friend-read" : " chat-msg-friend-not-read")} key={key}>
						{mensaje.Contenido}
					</Card>
				);
		});
	}

	const handleMsgChange = event => {
		setMessage(event.target.value);
	};

	if (chatOpen)
	return (
		<>
			<Card
				className={"chat-header chat-friends chat-header-open" + (chatUser < 0 ? " chat-text-xxl" : "")}
				color="primary"
				onClick = {() => {
					setChatOpen(!chatOpen);
					let msgs = JSON.parse(sessionStorage.getItem("mensajes7reinas"));
					markAsSeen(msgs, friends[chatUser].Codigo);
					setMessages (msgs);
					sessionStorage.setItem("mensajes7reinas", JSON.stringify(msgs));
				}}
			>
				{chatUser < 0 ? "Chat" :
					<Media className="align-items-center">
						<span className="avatar avatar-sm rounded-circle">
							<img
								alt="Imagen de perfil"
								src={SelectImgUser(friends[chatUser].Foto)}
							/>
						</span>
						<Media className="ml-2 d-none d-block">
							<span className="mb-0 text-lg font-weight-bold">
								{friends[chatUser].Nombre}
							</span>
						</Media>
					</Media>
				}
			</Card>
			<Card className="chat-body chat-friends" color="contrast">
				{chatUser < 0 ? (<h4 className="no-selected-chat-user">Selecciona un@ amig@ de la lista de amig@s y pulsa "Chat".</h4>) :
								obtenerMensajesDeChat(friends[chatUser].Codigo, messages)}
			</Card>
			<Form onSubmit={event => {
				event.preventDefault();
				if (sePuedeEnviar && message !== "") {
					wsChat.send(JSON.stringify({emisor: sessionUser.codigo, receptor: friends[chatUser].Codigo, contenido:message}));
					let msgs = JSON.parse(sessionStorage.getItem("mensajes7reinas"));
					let msg = {Emisor: sessionUser.codigo, Receptor: friends[chatUser].Codigo, Contenido: message, Leido: 1};
					msgs = msgs === null ? [msg] : [...msgs, msg];
					markAsSeen(msgs, friends[chatUser].Codigo);
					setMessages (msgs);
					sessionStorage.setItem("mensajes7reinas", JSON.stringify(msgs));
				}
				setMessage("");
			}}>
				<Input
					className="chat-input chat-input-friends"
					type="textarea"
					placeholder="Escribe un mensaje"
					onChange={handleMsgChange}
					value={message}
				/>
				<Button
					className="chat-send chat-friends"
					color="primary"
					type="submit"
				>
					<i className="ni ni-send symbol-xl" />
				</Button>
			</Form>
			{/* <InputGroup className="input-group-alternative">
				<InputGroupAddon addonType="prepend">
					<InputGroupText>
					<i className="ni ni-single-02" />
					</InputGroupText>
				</InputGroupAddon>
				<Input
					placeholder="Escribe un mensaje"
					type="text"
					autoComplete=""
					//
					onChange={handleMsgChange}
					value={message}
				/>
			</InputGroup> */}
		</>
	);
	else
	return (
		<Card className={"chat-header chat-friends chat-header-closed " + (chatUser < 0 ? "chat-text-xxl" : "")} color="primary" onClick = {() => setChatOpen(!chatOpen)}>
			{chatUser < 0 ? "Chat" :
				<Media className="align-items-center">
					<span className="avatar avatar-sm rounded-circle">
						<img
							alt="Imagen de perfil"
							src={SelectImgUser(friends[chatUser].Foto)}
						/>
					</span>
					<Media className="ml-2 d-none d-lg-block">
						<span className="mb-0 text-lg font-weight-bold">
							{friends[chatUser].Nombre}
						</span>
					</Media>
				</Media>
			}
		</Card>
	);
}

export default Chat;