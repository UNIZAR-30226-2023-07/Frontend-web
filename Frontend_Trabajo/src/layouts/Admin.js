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
import getUserForGame from "hooks/getter/getUserForGame";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [friends, setFriends] = useState(JSON.parse(localStorage.getItem("amigxs7reinas")));
  const [friendRequests, setFriendRequests] = useState(JSON.parse(localStorage.getItem("solicitudes7reinas")));
  const [sessionUser, setSessionUser] = useState(JSON.parse(localStorage.getItem("usuario7reinas")));
  const [currentGame, setCurrentGame] = useState(JSON.parse(localStorage.getItem("juego7reinas")));
  const [players, setPlayers] = useState(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
  const [myTurn, setMyTurn] = useState(JSON.parse(localStorage.getItem("miturno7reinas")));
  const [turn, setTurn] = useState(0);
  const [hand, setHand] = useState(JSON.parse(localStorage.getItem("mano7reinas")));
  const [board, setBoard] = useState(JSON.parse(localStorage.getItem("tablero7reinas")));
  const [discard, setDiscard] = useState(JSON.parse(localStorage.getItem("descarte7reinas")));
  const [discard2, setDiscard2] = useState(JSON.parse(localStorage.getItem("descartedos7reinas")));
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
        console.log("Mensaje de wsGame:");
        console.log(mensaje);
        let myHand;

        if ( (mensaje.tipo).substring(0, 13) === "Nuevo_Jugador" ) {
            let nuevoJugador = (mensaje.tipo).substring(15);
            getUserForGame(nuevoJugador, () => {
              setPlayers(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
              console.log("El nuevo jugador: "+(mensaje.tipo).substring(15));
              console.log("El nuevo jugador 2: "+JSON.stringify(players));
              //localStorage.setItem("jugadorxs7reinas", JSON.stringify(players)); //Inicialmnete es vacia
            });
            //setPlayers(players.push(nuevoJugador)); //Apilamos el nuevo jugador
        } else
        switch (mensaje.tipo) {
          case "Partida_Iniciada":
            // console.log("Turno inicial: "+mensaje.turnos[0][0]);
            // console.log("Turno inicial: "+mensaje.turnos[0][1]);
            // console.log("Turno inicial: "+mensaje.turnos[1][0]);
            // console.log("Turno inicial: "+mensaje.turnos[1][1]);
            let gamePlayers = JSON.parse(localStorage.getItem("jugadorxs7reinas"));
            let sortedPlayers = [];
            mensaje.turnos.forEach(function(elemento, indice) {
              console.log(elemento[0] + ' - ' + elemento[1]);
              if(elemento[0] === (sessionUser.codigo).toString()){
                localStorage.setItem("miturno7reinas", JSON.stringify(elemento[1])); //Guardamos nuestro turno como String
                setMyTurn(elemento[1]);
                //console.log("Mi turno: "+elemento[1]);
              }
              gamePlayers.forEach((player) => {
                  console.log(player.codigo);
                  if(player.codigo === elemento[0]){
                    player.cartas = 14;
                    sortedPlayers.push(player);
                  }
                });
            });
            setPlayers(sortedPlayers);
            localStorage.setItem("jugadorxs7reinas", JSON.stringify(sortedPlayers));
            setBoard([]);
            localStorage.setItem("tablero7reinas", JSON.stringify([])); //Inicialmente es vacia
            setDiscard([]);
            localStorage.setItem("descartes7reinas", JSON.stringify([])); //Inicialmente es vacia
            console.log(sessionUser.codigo);
            ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
            //localStorage.setItem("miturno7reinas", JSON.stringify(jugadores)); //Inicialmnete es vacia
            history.push("/admin/partida");
            break;
          
          case "Mostrar_manos":
            //console.log("Mostrar manos: "+mensaje.mano);
            myHand = mensaje.manos[myTurn].map((card, ind) => {
              let values = card.split(",");
              return {number: values[0], symbol: values[1], back: values[2]};
            });
            console.log("Mi mano:");
            console.log(myHand);
            setHand(myHand);
            localStorage.setItem("mano7reinas", JSON.stringify(myHand)); //Inicialmnete es vacia
            break;

          case "Mostrar_mano":
            //console.log("Mostrar mano: "+mensaje.mano);
            myHand = mensaje.cartas.map((card, ind) => {
              let values = card.split(",");
              return {number: values[0], symbol: values[1], back: values[2]};
            });
            console.log("Mi mano:");
            console.log(myHand);
            setHand(myHand);
            localStorage.setItem("mano7reinas", JSON.stringify(myHand)); //Inicialmnete es vacia
            break;
          
          case "Mostrar_tablero":
            //console.log("Mostrar tablero: "+mensaje.tablero);
            let tablero = mensaje.combinaciones.map((combination) => {
              return combination.map((card) => {
                let values = card.split(",");
                return {number: values[0], symbol: values[1], back: values[2]};
              });
            });
            console.log("Tablero:");
            console.log(tablero);
            setBoard(tablero);
            localStorage.setItem("tablero7reinas", JSON.stringify(tablero)); //Inicialmnete es vacia
            break;
          
          case "Robar_carta":
            ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
            break;

          case "Robar_carta_descartes":
            ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
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
  }, [wsGame, sessionUser.codigo, currentGame, history, myTurn, players]);

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
  }, [location]);

  useEffect(() => {
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
  }, [wsChatInstance, wsGameInstance, wsGameChatInstance, currentGame]);


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
                                  players={players}
                                  setPlayers={setPlayers}
                                  hand={hand}
                                  board={board}
                                  myTurn={myTurn}
                                  turn={turn}
                                  wsGame={wsGame}
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
          sessionUser={sessionUser}
          friends={friends}
        />
        <ChatGame
          {...props}
          sessionUser={sessionUser}
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
          sessionUser={sessionUser}
          friends={friends}
        />
      </>
    );
  }
};

export default Admin;
