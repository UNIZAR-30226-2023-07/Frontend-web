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
import React, { useState, useEffect, useMemo } from "react";

////import { w3cwebsocket as W3CWebSocket } from "websocket";
// reactstrap components
//import { Container } from "reactstrap";
// core components
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Chat from "components/Chat/Chat.js";
import ChatGame from "components/Chat/ChatGame.js";

import routes from "routes.js";
//import friends from "friends.js";
//import friendRequests from "friendRequests.js";
import informacion_Web from "informacion_Web.js";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [friends, setFriends] = useState(JSON.parse(localStorage.getItem("amigxs7reinas")));
  const [friendRequests, setFriendRequests] = useState(JSON.parse(localStorage.getItem("solicitudes7reinas")));
  const [sessionUser, setSessionUser] = useState(JSON.parse(localStorage.getItem("sessionUser")));
  const [currentGame, setCurrentGame] = useState(JSON.parse(localStorage.getItem("juego7reinas")));
	const [chatOpen, setChatOpen] = useState(false);
	const [chatGameOpen, setChatGameOpen] = useState(false);
  const [chatUser, setChatUser] = useState(-1);
	const [sePuedeEnviar, setSePuedeEnviar] = useState(false);
	const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("mensajes7reinas")));
	const [sePuedeEnviarGame, setSePuedeEnviarGame] = useState(false);
  const [msgsGame, setMsgsGame] = useState(JSON.parse(localStorage.getItem("msjsjuego7reinas")));
  const [wsGame, setWsGame] = useState(null);
  const [wsChat, setWsChat] = useState(null);
  const [wsGameChat, setWsGameChat] = useState(null);

  const history = useHistory();//Permite cambiar de pantalla

  // Construcción de los WebSockets.

  const wsChatInstance = useMemo(() => {
    if (!wsChat) {
      const ws = new WebSocket(`ws://52.174.124.24:3001/api/ws/chat/${sessionUser.codigo}`);
      ws.onopen = () => {
        console.log('Conexión abierta');
        setSePuedeEnviar(true);
        setWsChat(ws);
      };
      ws.onclose = () => {
        console.log('Conexión cerrada');
      };
      ws.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        msg = {Emisor: msg.emisor, Receptor: msg.receptor, Contenido: msg.contenido, Leido: (chatOpen && chatUser>=0 && friends[chatUser].Codigo===msg.emisor) ? 1 : 0};
        let todosLosMensajes = JSON.parse(localStorage.getItem("mensajes7reinas"));
        setMessages(todosLosMensajes === null ? [msg] : [...todosLosMensajes, msg]);
        localStorage.setItem("mensajes7reinas", JSON.stringify(todosLosMensajes === null ? [msg] : [...todosLosMensajes, msg]));
      };
      ws.onerror = (error) => {
        console.log(`Error: ${error.message}`);
      };
      return ws;
    }
    return wsChat;
  }, [wsChat, chatOpen, chatUser, friends, sessionUser.codigo]);

  const wsGameInstance = useMemo(() => {
    if (!wsGame/* && currentGame !== null && currentGame !== undefined && currentGame !== ""*/) {
      const ws = new WebSocket(`ws://52.174.124.24:3001/api/ws/partida/${currentGame}`);
      ws.onopen = () => {
        console.log(`Conectado a la partida ${currentGame}`);
        setSePuedeEnviarGame(true);
        setWsGame(ws);
      }
      ws.onclose = () => {
        console.log(`Desconectado de la partida ${currentGame}`);
      }
      ws.onmessage = (event) => {
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
              if(elemento[0] === (sessionUser.codigo).toString()){
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
      ws.onerror = (error) => {
        console.log(`Error: ${error.message}`);
      }
      return ws;
    }
    return wsGame;
  }, [wsGame, sessionUser.codigo, currentGame, history]);

  const wsGameChatInstance = useMemo(() => {
    if (!wsGameChat/* && currentGame !== null && currentGame !== undefined && currentGame !== ""*/) {
      const ws = new WebSocket(`ws://52.174.124.24:3001/api/ws/chat/lobby/${currentGame}`);
      ws.onopen = () => {
        console.log(`Conectado al chat de la partida ${currentGame}`);
        setWsGameChat(ws);
      }
      ws.onclose = () => {
        console.log(`Desconectado del chat de la partida ${currentGame}`);
      }
      ws.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        //console.log(msg);
        let todosLosMensajes = JSON.parse(localStorage.getItem("msjsjuego7reinas"));
        setMsgsGame(todosLosMensajes == null ? [msg] : [...todosLosMensajes, msg]);
        localStorage.setItem("msjsjuego7reinas", JSON.stringify(todosLosMensajes == null ? [msg] : [...todosLosMensajes, msg]));
      }
      ws.onerror = (error) => {
        console.log(`Error: ${error.message}`);
      }
      return ws;
    }
    return wsGameChat;
  }, [wsGameChat, currentGame]);


  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
    return () => {
      if (wsChatInstance) {
        wsChatInstance.close();
        setWsChat(null);
      }
      if (wsGameInstance) {
        wsGameInstance.close();
        setWsGame(null);
      }
      if (wsGameChatInstance) {
        wsGameChatInstance.close();
        setWsGameChat(null);
      }
    }
  }, [location, wsChatInstance, wsGameInstance, wsGameChatInstance]);


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
                                  setSessionUser={setSessionUser}
                                  friends={friends}
                                  friendRequests={friendRequests}
                                  setGame={setCurrentGame}
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

  if (currentGame !== null && currentGame !== undefined && currentGame !== "") {

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
          setFriends={setFriends}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
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
          wsChat={wsGameChat}
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
