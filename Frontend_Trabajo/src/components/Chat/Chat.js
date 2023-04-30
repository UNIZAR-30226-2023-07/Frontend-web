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

const Chat = (props) => {
	const [message, setMessage] = useState("");

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

	let sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
	let friends = JSON.parse(localStorage.getItem("amigxs7reinas"));

	let { chatOpen, setChatOpen, chatUser, messages, setMessages, sePuedeEnviar, wsChat } = props;

	wsChat.onmessage = (event) => {
		let msg = JSON.parse(event.data);
		msg = {Emisor: msg.emisor, Receptor: msg.receptor, Contenido: msg.contenido, Leido: (chatUser>=0 && friends[chatUser].Codigo===msg.emisor) ? 1 : 0};
		setMessages(messages === null ? [msg] : [...messages, msg]);
		localStorage.setItem("mensajes7reinas", JSON.stringify(messages === null ? [msg] : [...messages, msg]));
	}

	const handleMsgChange = event => {
		setMessage(event.target.value);
	};

	if (chatOpen)
	return (
		<>
			<Card className={"chat-header chat-friends chat-header-open " + (chatUser < 0 ? "chat-text-xxl" : "")} color="primary" onClick = {() => setChatOpen(!chatOpen)}>
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
			<Card className="chat-body chat-friends" color="contrast">
				{chatUser < 0 ? "Selecciona un@ amig@ de la lista de amig@s y pulsa \"Chat\"." : obtenerMensajesDeChat(friends[chatUser].Codigo, messages)}
			</Card>
			<Form onSubmit={event => {
				event.preventDefault();
				if (sePuedeEnviar && message !== "") {
					wsChat.send(JSON.stringify({emisor: sessionUser.codigo, receptor: friends[chatUser].Codigo, contenido:message}));
					let msg = {Emisor: sessionUser.codigo, Receptor: friends[chatUser].Codigo, Contenido: message, Leido: 1};
					setMessages (messages === null ? [msg] : [...messages, msg]);
					localStorage.setItem("mensajes7reinas", JSON.stringify(messages === null ? [msg] : [...messages, msg]));
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
					Enviar
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