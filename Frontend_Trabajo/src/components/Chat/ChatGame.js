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
	Media,
	Row,
	Col
} from "reactstrap";

const ChatGame = (props) => {
	const [message, setMessage] = useState("");

	let sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
	let codigoPartida = localStorage.getItem("juego7reinas");

	const obtenerMensajesDePartida = (mensajes) => {
		if (mensajes == null)
			return;
		return mensajes.map((mensaje, key) => {
			if (mensaje.codigo == sessionUser.codigo)
				return (
					<Card className="chat-msg chat-msg-mine" key={key}>
						{mensaje.mensaje}
					</Card>
				);
			else
				return (
					<Row className="ml-0 mr-0" key={key}>
						<Col className="chat-icon ml--2 mr--1">
							<span className="avatar avatar-sm rounded-circle">
								<img
									alt={"Imagen de perfil de " + mensaje.nombre}
									src={SelectImgUser(mensaje.foto)}
								/>
							</span>
						</Col>
						<Card className="chat-msg chat-msg-friend-read" style={{width: "11rem"}} key={key}>
							<h6 style={{marginBottom: "-0.3rem"}}>{mensaje.nombre}</h6>
							{mensaje.mensaje}
						</Card>
					</Row>
				);
		});
	}

	let { chatOpen, setChatOpen, messages, setMessages, wsChat, sePuedeEnviar } = props;

	const handleMsgChange = event => {
		setMessage(event.target.value);
	};


	if (chatOpen) return (
		<>
			<Card className="chat-header chat-game chat-header-open chat-text-xxl" color="primary" onClick = {() => setChatOpen(!chatOpen)}>
				Chat de partida
			</Card>
			<Card className="chat-body chat-game" color="contrast">
				{obtenerMensajesDePartida(messages)}
			</Card>
			<Form onSubmit={event => {
				event.preventDefault();
				if (sePuedeEnviar && message !== "") {
					let msg = {codigo: sessionUser.codigo, nombre: sessionUser.nombre, foto: sessionUser.foto, mensaje: message};
					wsChat.send(JSON.stringify(msg));
					// setMessages(messages == null ? [msg] : [...messages, msg]);
					// localStorage.setItem("msjsjuego7reinas", JSON.stringify(messages == null ? [msg] : [...messages, msg]));
				}
				setMessage("");
			}}>
				<Input
					className="chat-input chat-input-game"
					type="textarea"
					placeholder="Escribe un mensaje"
					onChange={handleMsgChange}
					// onKeyDown={event => {
					// 	if (event.keyCode === 13 && !event.shiftKey && !event.ctrlKey) {
					// 	// Presionó Enter sin mantener Shift o Ctrl
					// 		event.preventDefault(); // Detiene el comportamiento predeterminado de nueva línea
					// 		event.target.form.submit(); // Envía el formulario
					// 	}
					// }}
					value={message}
				/>
				<Button
					className="chat-send chat-game"
					color="primary"
					type="submit"
				>
					Enviar
				</Button>
			</Form>
		</>
	);
	else return (
		<Card className="chat-header chat-game chat-header-closed chat-text-xxl" color="primary" onClick = {() => setChatOpen(!chatOpen)}>
			Chat de partida
		</Card>
	);
}

export default ChatGame;