import "assets/css/user-styles.css";
import getFriendMessages from "hooks/getter/getFriendMessages";
import SelectImgUser from "hooks/SelectImgUser";

import React, { useState, useSignal } from "react";
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
	const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("mensajes7reinas")));

	const obtenerMensajesDeChat = (amigx, mensajes) => {
		if (mensajes == null)
			return;
		return mensajes.map((mensaje) => {
			if (mensaje.Receptor == amigx)
				return (
					<Card className="chat-msg chat-msg-mine">
						{mensaje.Contenido}
					</Card>
				);
			else if (mensaje.Emisor == amigx)
				return (
					<Card className={"chat-msg " + (mensaje.Leido ? " chat-msg-friend-read" : " chat-msg-friend-not-read")}>
						{mensaje.Contenido}
					</Card>
				);
		});
	}

	let sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
	let friends = JSON.parse(localStorage.getItem("amigxs7reinas"));

	let { chatOpen, setChatOpen, chatUser, sePuedeEnviar, wsChat } = props;

	wsChat.onmessage = (event) => {
		let msg = JSON.parse(event.data);
		setMessages([...messages, {Emisor: msg.emisor, Receptor: msg.receptor, Contenido: msg.contenido, Leido: 0}]);
		localStorage.setItem("mensajes7reinas", JSON.stringify([...messages, {Emisor: msg.emisor, Receptor: msg.receptor, Contenido: msg.contenido, Leido: 0}]));
	}

	const handleMsgChange = event => {
		setMessage(event.target.value);
	};

	if (chatOpen)
	return (
		<>
			<Card className="chat-header chat-open-header" color="primary">
				<div onClick = {() => setChatOpen(!chatOpen)}>
					{chatUser < 0 ? "Chat" :
						<Media className="align-items-center">
							<span className="avatar avatar-sm rounded-circle">
								<img
									alt="Imagen de perfil"
									src={SelectImgUser(friends[chatUser].Foto)}
								/>
							</span>
							<Media className="ml-2 d-none d-lg-block">
								<span className="mb-0 text-sm font-weight-bold">
									{friends[chatUser].Nombre}
								</span>
							</Media>
						</Media>
					}
				</div>
			</Card>
			<Card className="chat-open-body" color="contrast">
				{chatUser < 0 ? "Selecciona un@ amig@ de la lista de amig@s y pulsa \"Chat\"." : obtenerMensajesDeChat(friends[chatUser].Codigo, messages)}
			</Card>
			<Form onSubmit={event => {
				event.preventDefault();
				if (sePuedeEnviar && message != "") {
					wsChat.send(JSON.stringify({emisor: sessionUser.codigo, receptor: friends[chatUser].Codigo, contenido:message}));
					setMessages([...messages, {Emisor: sessionUser.codigo, Receptor: friends[chatUser].Codigo, Contenido: message, Leido: 1}]);
					localStorage.setItem("mensajes7reinas", JSON.stringify([...messages, {Emisor: sessionUser.codigo, Receptor: friends[chatUser].Codigo, Contenido: message, Leido: 1}]));
				}
				setMessage("");
			}}>
				<Input
					className="chat-input"
					type="text"
					placeholder="Escribe un mensaje"
					onChange={handleMsgChange}
					value={message}
				/>
				<Button
					className="chat-send"
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
		<Card className="chat-header chat-closed">
			<div onClick = {() => setChatOpen(!chatOpen)} className="chat-header">
				Chat
			</div>
		</Card>
	);
}

export default Chat;