/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useLocation, Route, Switch, Redirect, useHistory } from "react-router-dom";
//import WebSocket from "websocket";
import React, { useState } from "react";

import { w3cwebsocket as W3CWebSocket } from "websocket";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Chat from "components/Chat/Chat.js";
import ChatGame from "components/Chat/ChatGame.js";

import routes from "routes.js";
import friends from "friends.js";
import friendRequests from "friendRequests.js";
import sessionUser from "sessionUser.js";
import informacion_Web from "informacion_Web.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
	const [chatOpen, setChatOpen] = useState(false);
	const [chatGameOpen, setChatGameOpen] = useState(false);
  const [chatUser, setChatUser] = useState(-1);
	const [sePuedeEnviar, setSePuedeEnviar] = useState(false);
	const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("mensajes7reinas")));
	const [sePuedeEnviarGame, setSePuedeEnviarGame] = useState(false);
  const [msgsGame, setMsgsGame] = useState(JSON.parse(localStorage.getItem("msjsjuego7reinas")));
  let partidaActual = JSON.parse(localStorage.getItem("juego7reinas")); //Guarda la calve de la partida actual
  let pConectada = localStorage.getItem("pConectada7reinas"); //Guarda si ya se ha conectado el websocket de la parrtida

  const wsChat = new WebSocket(`ws://52.174.124.24:3001/api/ws/chat/1`);

  const history = useHistory();//Permite cambiar de pantalla

  let misDatos = JSON.parse(localStorage.getItem("sessionUser"));

  wsChat.onopen = () => {
    console.log('Conexión abierta');
		setSePuedeEnviar(true);
  };
  
  wsChat.onclose = () => {
    console.log('Conexión cerrada');
  };

  wsChat.onerror = (error) => {
    console.log(`Error: ${error.message}`);
  }

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            // Añadir props: https://ui.dev/react-router-pass-props-to-components
            render={(props) => <prop.component
                                  {...props}
                                  sessionUser={sessionUser} 
                                  friends={friends}
                                  friendRequests={friendRequests}
                                /> }
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  if (partidaActual !== null && partidaActual !== undefined && partidaActual !== "" && pConectada == null) {

    localStorage.setItem('pConectada7reinas', true); //Indicamos que se ha conectado a la partida

    const wsGame = new WebSocket(`ws://52.174.124.24:3001/api/ws/partida/${partidaActual}`);
    wsGame.onopen = () => {
      console.log(`Conectado a la partida ${partidaActual}`);
      setSePuedeEnviarGame(true);
    }
    wsGame.onclose = () => {
      console.log(`Desconectado de la partida ${partidaActual}`);
      setSePuedeEnviar(false);
      localStorage.removeItem('pConectada7reinas');//Permitimos volver a conectar
    }
    wsGame.onmessage = (event) => {
      let mensaje = JSON.parse(event.data);
      console.log("Mensaje de wsGame: "+JSON.stringify(mensaje));

      switch ( (mensaje.tipo).substr(0, 13) ) {
        case "Nuevo_Jugador":
          let jugadores = JSON.parse(localStorage.getItem("jPartida7reinas"))
          let nuegoJugador = (mensaje.tipo).substr(15, 13);
          jugadores.push(nuegoJugador); //Apilamos el nuevo jugador

          console.log("El nuevo jugador: "+(mensaje.tipo).substr(15, 13));
          console.log("El nuevo jugador 2: "+JSON.stringify(jugadores));
          localStorage.removeItem("jPartida7reinas");
          localStorage.setItem("jPartida7reinas", JSON.stringify(jugadores)); //Inicialmnete es vacia
          break;

        case "Partida_Inici":
          // console.log("Turno inicial: "+mensaje.turnos[0][0]);
          // console.log("Turno inicial: "+mensaje.turnos[0][1]);
          // console.log("Turno inicial: "+mensaje.turnos[1][0]);
          // console.log("Turno inicial: "+mensaje.turnos[1][1]);
          mensaje.turnos.forEach(function(elemento, indice) {
            if(elemento[0] == (misDatos.codigo).toString()){
              localStorage.setItem("turnoJugador7reinas", JSON.stringify(elemento[1])); //Guardamos nuestro turno como String
              //console.log("Mi turno: "+elemento[1]);
            }
          })
          //localStorage.setItem("turnoJugador7reinas", JSON.stringify(jugadores)); //Inicialmnete es vacia
          history.push("/admin/partida")
          break;
        
        default:
          return 0;
      }
  
    }
    wsGame.onerror = (error) => {
      console.log(`Error en la partida ${partidaActual}: ${error}`);
      setSePuedeEnviar(false);
      localStorage.removeItem('pConectada7reinas');//Permitimos volver a conectar
    }
    const wsChatGame = new WebSocket(`ws://52.174.124.24:3001/api/ws/chat/lobby/${partidaActual}`);
    wsChatGame.onopen = () => {
      console.log(`Conectado al chat de partida ${partidaActual}`);
      setSePuedeEnviarGame(true);
    }
    wsChatGame.onclose = () => {
      console.log(`Desconectado del chat de partida ${partidaActual}`);
      setSePuedeEnviar(false);
      localStorage.removeItem('pConectada7reinas');//Permitimos volver a conectar
    }
    wsChatGame.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      console.log(msg);
      let todosLosMensajes = JSON.parse(localStorage.getItem("msjsjuego7reinas"));
      setMsgsGame(todosLosMensajes == null ? [msg] : [...todosLosMensajes, msg]);
      localStorage.setItem("msjsjuego7reinas", JSON.stringify(todosLosMensajes == null ? [msg] : [...todosLosMensajes, msg]));
    }
    wsChatGame.onerror = (error) => {
      console.log(`Error en el chat de partida ${partidaActual}: ${error}`);
      setSePuedeEnviar(false);
      localStorage.removeItem('pConectada7reinas');//Permitimos volver a conectar
    }

    return (
      <>
        <div className="topbar">
          <UserNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("../assets/img/brand/large-white.png"),
              imgAlt: "..."
            }}
            sessionUser={sessionUser}
            informacion_Web={informacion_Web}
          />
        </div>
        <Sidebar
          {...props}
          routes={routes}
          sessionUser={sessionUser}
          friends={friends}
          friendRequests={friendRequests}
          setChatOpen={setChatOpen}
          chatUser={chatUser}
          setChatUser={setChatUser}
          messages={messages}
          setMessages={setMessages}
        />
        <div className="user-content" ref={mainContent}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
        </div>
        <Chat
          {...props}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          chatUser={chatUser}
          wsChat={wsChat}
          messages={messages}
          setMessages={setMessages}
          sePuedeEnviar={sePuedeEnviar}
        />
        <ChatGame
          {...props}
          chatOpen={chatGameOpen}
          setChatOpen={setChatGameOpen}
          messages={msgsGame}
          setMessages={setMsgsGame}
          wsChat={wsChatGame}
          sePuedeEnviar={sePuedeEnviarGame}
        />
      </>
    );
  } else {
    return (
      <>
        <div className="topbar">
          <UserNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("../assets/img/brand/large-white.png"),
              imgAlt: "..."
            }}
            sessionUser={sessionUser}
            informacion_Web={informacion_Web}
          />
        </div>
        <Sidebar
          {...props}
          routes={routes}
          sessionUser={sessionUser}
          friends={friends}
          friendRequests={friendRequests}
          setChatOpen={setChatOpen}
          chatUser={chatUser}
          setChatUser={setChatUser}
          messages={messages}
          setMessages={setMessages}
        />
        <div className="user-content" ref={mainContent}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
        </div>
        <Chat
          {...props}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          chatUser={chatUser}
          wsChat={wsChat}
          messages={messages}
          setMessages={setMessages}
          sePuedeEnviar={sePuedeEnviar}
        />
      </>
    );
  }
};

export default Admin;
