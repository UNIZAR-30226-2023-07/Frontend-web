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
import Sidebar from "components/Sidebar/Sidebar.js";
import Chat from "components/Chat/Chat.js";
import ChatGame from "components/Chat/ChatGame.js";

import routes from "routes.js";
//import friends from "friends.js";
//import friendRequests from "friendRequests.js";
import informacion_Web from "informacion_Web.js";
import getUserForGame from "hooks/getter/getUserForGame";
import getFriends from "hooks/getter/getFriends";
import getFriendRequests from "hooks/getter/getFriendRequests";
import getPausedGames from "hooks/getter/getPausedGames";

import setAppIcon from "hooks/setAppIcon";

const Admin = (props) => {

  setAppIcon();

  const mainContent = React.useRef(null);
  const location = useLocation();
  const [friends, setFriends] = useState(JSON.parse(localStorage.getItem("amigxs7reinas")));
  const [friendRequests, setFriendRequests] = useState(JSON.parse(localStorage.getItem("solicitudes7reinas")));
  const [sessionUser, setSessionUser] = useState(JSON.parse(localStorage.getItem("usuario7reinas")));
  const [currentGame, setCurrentGame] = useState(JSON.parse(localStorage.getItem("juego7reinas")));
  const [currentTournament, setCurrentTournament] = useState(JSON.parse(localStorage.getItem("torneo7reinas")));
  const [currentGameChat, setCurrentGameChat] = useState(JSON.parse(localStorage.getItem("chatjuego7reinas")));
  const [players, setPlayers] = useState(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
  const [myTurn, setMyTurn] = useState(JSON.parse(localStorage.getItem("miturno7reinas")));
  const [turn, setTurn] = useState(JSON.parse(localStorage.getItem("turno7reinas")));
  const [hand, setHand] = useState(JSON.parse(localStorage.getItem("mano7reinas")));
  const [board, setBoard] = useState(JSON.parse(localStorage.getItem("tablero7reinas")));
  const [discard, setDiscard] = useState(JSON.parse(localStorage.getItem("descarte7reinas")));
	const [chatOpen, setChatOpen] = useState(false);
	const [chatGameOpen, setChatGameOpen] = useState(false);
  const [chatUser, setChatUser] = useState(-1);
	const [sePuedeEnviar, setSePuedeEnviar] = useState(false);
	const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("mensajes7reinas")));
	const [sePuedeEnviarGame, setSePuedeEnviarGame] = useState(false);
  const [msgsGame, setMsgsGame] = useState(JSON.parse(localStorage.getItem("msjsjuego7reinas")));
  const [wsGame, setWsGame] = useState(null);
  const [wsTorneo, setWsTorneo] = useState(null);
  const [wsChat, setWsChat] = useState(null);
  const [wsGameChat, setWsGameChat] = useState(null);
  const [puntosTorneo, setpuntosTorneo] = useState(JSON.parse(localStorage.getItem("puntosTorneo7reinas")));

  const history = useHistory();//Permite cambiar de pantalla

  const updateFriends = () => {
    getFriends(sessionUser.codigo, () => {
      setFriends(JSON.parse(localStorage.getItem("amigxs7reinas")));
      console.log(friends);
    });
  }
  const updateFriendRequests = () => {
    getFriendRequests(sessionUser.codigo, () => {
      setFriendRequests(JSON.parse(localStorage.getItem("solicitudes7reinas")));
      console.log(friendRequests);
    });
  }

  // Construcción de los WebSockets.

  const wsChatInstance = useMemo(() => {
    if (!wsChat) {
      const ws = new WebSocket(`ws://13.93.90.135:3001/api/ws/chat/${sessionUser.codigo}`);
      ws.onopen = () => {
        console.log('Conexión abierta');
        setSePuedeEnviar(true);
        setWsChat(ws);
      };
      ws.onclose = () => {
        console.log('Conexión cerrada');
      };
      ws.onmessage = (event) => {
        console.log(event.data);
        let msg = JSON.parse(event.data);
        if (msg.emisor === "Servidor")
          switch(msg.contenido) {
            case "Accept":
              updateFriends();
              updateFriendRequests();
              break;
            case "Remove":
              updateFriends();
              break;
            default:
              updateFriendRequests();
              break;
        }
        else {
          msg = {Emisor: msg.Emisor, Receptor: msg.Receptor, Contenido: msg.Contenido, Leido: (chatOpen && chatUser>=0 && friends[chatUser].Codigo===msg.emisor) ? 1 : 0};
          let todosLosMensajes = JSON.parse(localStorage.getItem("mensajes7reinas"));
          setMessages(todosLosMensajes === null ? [msg] : [...todosLosMensajes, msg]);
          localStorage.setItem("mensajes7reinas", JSON.stringify(todosLosMensajes === null ? [msg] : [...todosLosMensajes, msg]));
        }
      };
      ws.onerror = (error) => {
        console.log(`Error: ${error.message}`);
      };
      return ws;
    }
    return wsChat;
  }, [wsChat, chatOpen, chatUser, friends, sessionUser.codigo]);


  const comportamiento_partida = (mensaje, ws) => {
    let myHand = [], mydescartes = [];

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
        let numNoBots = mensaje.turnos.filter((turn) => !(/^bot(\d+)$/).test(turn[0])).length;
        let gamePlayers = mensaje.turnos.map(() => null);
        console.log(gamePlayers);
        localStorage.setItem("jugadorxs7reinas", JSON.stringify(gamePlayers));
        // for (let i = 0; i < 4; i++) {
        //   let playerBeingSorted = mensaje.turnos.find((turn) => turn[i][1] == i.toString);

        mensaje.turnos.forEach((elemento, indice) => {
          console.log(elemento[0] + ' - ' + elemento[1]);
          if(elemento[0] === sessionUser.codigo){
            localStorage.setItem("miturno7reinas", JSON.stringify(elemento[1])); //Guardamos nuestro turno como String
            setMyTurn(elemento[1]);
            //console.log("Mi turno: "+elemento[1]);
            
          }
          const match = (/^bot(\d+)$/).exec(elemento[0]);
          if (match) {
            let bot = {
              codigo: elemento[0],
              nombre: "Bot " + match[1],
              foto: Math.floor(Math.random() * 9),
              cartas: 14
            };
            let players = JSON.parse(localStorage.getItem('jugadorxs7reinas'));
            players[parseInt(elemento[1])] = bot;
            localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
          } else {
            getUserForGame(elemento[0], () => {
              console.log("El nuevo jugador: "+(mensaje.tipo).substring(15));
              console.log("El nuevo jugador 2: "+JSON.stringify(players));
              numNoBots--;
              if (numNoBots === 0) {
                ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
              }
              //localStorage.setItem("jugadorxs7reinas", JSON.stringify(players)); //Inicialmnete es vacia
            }, parseInt(elemento[1]));
          }
          // gamePlayers.forEach((player) => {
          //     console.log(player.codigo);
          //     if(player.codigo === elemento[0]){
          //       sortedPlayers.push(player);
          //     }
          //   });
        });
        setPlayers(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
        setBoard([]);
        localStorage.setItem("tablero7reinas", JSON.stringify([])); //Inicialmente es vacia
        setTurn(0);
        localStorage.setItem("turno7reinas", JSON.stringify(0)); //Guardamos nuestro turno como String
        setDiscard([]);
        localStorage.setItem("descarte7reinas", JSON.stringify([])); //Inicialmente es vacia
        localStorage.setItem("herobado7reinas", false); //Inicialmente es false
        console.log(sessionUser.codigo);
        setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]); //Ponemos un valor inicial para evitar error
        
        // HARA FALTA CUANDO SE REANUDEN LAS PARTIDAS
        // ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_tablero"}));
        break;
      
      case "Mostrar_manos":
        //console.log("Mostrar manos: "+mensaje.mano);
        let gameplayers = JSON.parse(localStorage.getItem("jugadorxs7reinas"));
        for (let i = 0; i < mensaje.manos.length; i++) {
          gameplayers[i].cartas = mensaje.manos[i].length;
        }
        setPlayers(gameplayers);
        localStorage.setItem("jugadorxs7reinas", JSON.stringify(gameplayers)); //Inicialmnete es vacia
        let myTurn = JSON.parse(localStorage.getItem("miturno7reinas"));
        myHand = mensaje.manos[myTurn] ? mensaje.manos[myTurn].map((card, ind) => {
          let values = card.split(",");
          return {number: values[0], symbol: values[1], back: values[2], comb: -1, ord: -1};
        }) : [];
        console.log("Mi mano:");
        console.log(myHand);
        setHand(myHand);
        localStorage.setItem("mano7reinas", JSON.stringify(myHand)); //Inicialmnete es vacia
        if (location.pathname !== "/admin/partida")
          history.push("/admin/partida");
        break;

      case "Mostrar_mano":
        //console.log("Mostrar mano: "+mensaje.mano);
        myHand = mensaje.cartas.map((card, ind) => {
          let values = card.split(",");
          return {number: values[0], symbol: values[1], back: values[2], comb: -1, ord: -1};
        });
        console.log("Mi mano:");
        console.log(myHand);
        setHand(myHand);
        localStorage.setItem("mano7reinas", JSON.stringify(myHand)); //Inicialmnete es vacia
        break;
      
      case "Mostrar_tablero":
        //console.log("Mostrar tablero: "+mensaje.tablero);
        if (mensaje.combinaciones != null) {
          let tablero = mensaje.combinaciones?.map((combination) => {
            return combination.map((card) => {
              let values = card.split(",");
              return {number: values[0], symbol: values[1], back: values[2]};
            });
          });
          console.log("Tablero:");
          console.log(tablero);

          if(tablero != null && tablero != undefined){
            setBoard(tablero);
            localStorage.setItem("tablero7reinas", JSON.stringify(tablero)); //Inicialmnete es vacia
          }
        }
        //Descartes
        if (mensaje.descartes != null) {
          let descartes = mensaje.descartes?.map((card) => {
            let values = card.split(",");
            return {number: values[0], symbol: values[1], back: values[2]};
          });
          console.log("Descartes:");
          console.log(descartes);
          setDiscard(descartes);
          localStorage.setItem("descarte7reinas", JSON.stringify(descartes)); //Inicialmnete es vacia
        }
        break;
      
      case "Robar_carta":
        if(mensaje.receptor == sessionUser.codigo){//Así solo se pide una vez
          localStorage.setItem("herobado7reinas", true); //Indica si ha robado el jugador
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_mano"}));
          console.log("RECEPCIÓN: Carta Robada");
        }
        break;

      case "Robar_carta_descartes":
        if(mensaje.receptor == sessionUser.codigo){//Así solo se pide una vez
          localStorage.setItem("herobado7reinas", true); //Indica si ha robado el jugador
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_mano"}));
          console.log("RECEPCIÓN: Carta Robada de Descartes");
        }
        break;
      
      case "Abrir":
        if(mensaje.info == "Ok" && mensaje.receptor == sessionUser.codigo){//Así solo se pide una vez actualizar
          localStorage.setItem("heabierto7reinas", true);
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_mano"}));
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_tablero"}));
        } else if((/^\d+$/).test(mensaje.info)){
          localStorage.setItem("ganadorx7reinas", parseInt(mensaje.info));
          history.push("/admin/gameend");
        } else if (/*GANADOR*/true) {
          /*Acciones por ganar*/
        }
        break;
      
      case "Colocar_combinacion":
        if(mensaje.info == "Ok" && mensaje.receptor == sessionUser.codigo){//Así solo se pide una vez actualizar
          //Actualizar manos y tablero
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_mano"}));
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_tablero"}));
        } else if((/^\d+$/).test(mensaje.info)){
          localStorage.setItem("ganadorx7reinas", parseInt(mensaje.info));
          history.push("/admin/gameend");
        } else if (/*GANADOR*/false) {
          /*Acciones por ganar*/
        }
        
        break;

      case "Colocar_carta":
        if((mensaje.info == "Ok" || (/^\d+,\d+,\d+$/).test(mensaje.info)) && mensaje.receptor == sessionUser.codigo){//Así solo se pide una vez actualizar
          // Actualizar manos y tablero
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_mano"}));
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_tablero"}));
        } else if((/^\d+$/).test(mensaje.info)){
          localStorage.setItem("ganadorx7reinas", parseInt(mensaje.info));
          history.push("/admin/gameend");
        } else if (/*GANADOR*/false) {
          /*Acciones por ganar*/
        } else if(/*JOCKER*/true && mensaje.receptor == sessionUser.codigo){

        }
        break;

      case "Descarte":// Dejar descarte y se acaba el turno

        /*if( mensaje.info != "Ok" ){
          console.log("ERROR AL DESCARTAR: "+mensaje.info);
        } else {*/
          // Gestión de cartas del tablero
          let tablero = mensaje.combinaciones?.map((combination) => {
            return combination.map((card) => {
              let values = card.split(",");
              return {number: values[0], symbol: values[1], back: values[2]};
            });
          });
          console.log("Tablero en Descartes:");
          console.log(tablero);
          if(tablero != null && tablero != undefined){
            setBoard(tablero);
            localStorage.setItem("tablero7reinas", JSON.stringify(tablero)); //Inicialmnete es vacia
          }

          // Gestión de cartas de descartes
          mydescartes = mensaje.descartes.map((card, ind) => {
            let values = card.split(",");
            return {number: values[0], symbol: values[1], back: values[2]};
          });
          console.log("Mi descartes:");
          console.log(mydescartes);
          setDiscard(mydescartes);
          localStorage.setItem("descarte7reinas", JSON.stringify(mydescartes)); //Inicialmnete es vacia

          // Gestión de cartas el turno
          if(mensaje.turno != ""){
            setTurn(mensaje.turno);
            localStorage.setItem("turno7reinas", JSON.stringify(mensaje.turno));
          }

              // Si el siguiente jugador a abierto o no
              /*if(mensaje.abrir == "si"){
                localStorage.setItem("heabierto7reinas", true);
              }else{
                localStorage.setItem("heabierto7reinas", false);
              }*/

              // Actualizar las manos de los jugadores
              if (!(/^bot(\d+)$/).test(JSON.parse(localStorage.getItem("jugadorxs7reinas"))[parseInt(mensaje.turno)].codigo))
                ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
              else console.log ("VA A JUGAR UN BOT. NO ACTUALIZAMOS.")
              localStorage.setItem("herobado7reinas", false); //Indica si ha robado el jugador
            /*}*/
            if ((/^\d+$/).test(mensaje.ganador)) {
              localStorage.setItem("ganadorx7reinas", parseInt(mensaje.ganador));
              history.push("/admin/gameend");
            }
            break;

        case "Partida_Pausada":
          getPausedGames(sessionUser.codigo, () => {
            history.push("/admin/gamepaused");
          });
          break;
      
      case "jugadores":
          console.log(mensaje.cartas);
        break;

      default:
        return 0;
    }
  }



  const wsGameInstance = useMemo(() => {
    if (!wsGame/* && currentGame !== null && currentGame !== undefined && currentGame !== ""*/) {
      const ws = new WebSocket(`ws://13.93.90.135:3001/api/ws/partida/${currentGame}`);
      ws.onopen = () => {
        console.log(`Conectado a la partida ${currentGame}`);
        setSePuedeEnviarGame(true);
        setWsGame(ws);

        /*if(location.pathname != "/admin/partida"){//Comprobamos que no estemos en una partida
          console.log("Reseteamos LStorage Partida: "+location.pathname);
          localStorage.removeItem('miturno7reinas');
          localStorage.removeItem('mano7reinas');
          localStorage.removeItem('tablero7reinas');
          localStorage.removeItem('descarte7reinas');
          localStorage.removeItem('turno7reinas');
          localStorage.removeItem('heabierto7reinas');
          localStorage.removeItem('herobado7reinas');
  
          localStorage.setItem("turno7reinas", JSON.stringify(0)); //Inicializa el turno
          localStorage.setItem("heabierto7reinas", false);
          localStorage.setItem("herobado7reinas", false); //Inicialmente es false
        }*/
      }
      ws.onclose = () => {
        console.log(`Desconectado de la partida ${currentGame}`);
        //Reseteamos los almacenes
        // localStorage.removeItem('miturno7reinas');
        // localStorage.removeItem('mano7reinas');
        // localStorage.removeItem('tablero7reinas');
        // localStorage.removeItem('descarte7reinas');
        // localStorage.removeItem('turno7reinas');    
      }
      ws.onmessage = (event) => {
        let mensaje = JSON.parse(event.data);
        console.log("Mensaje de wsGame:");
        console.log(mensaje);
        comportamiento_partida(mensaje, ws)
      }      
      ws.onerror = (error) => {
        console.log(`Error: ${error.message}`);
      }
      return ws;
    }
    return wsGame;
  }, [wsGame, sessionUser.codigo, currentGame, history, myTurn, players]);

  const wsTorneoInstance = useMemo(() => {
    if (!wsTorneo/* && currentGame !== null && currentGame !== undefined && currentGame !== ""*/) {
      if(JSON.parse(localStorage.getItem("es_torneo7reinas"))){
        const ws = new WebSocket(`ws://13.93.90.135:3001/api/ws/torneo/${currentGame}`);
        ws.onopen = () => {
          console.log(`Conectado a al Torneo: ${currentGame}`);
          setSePuedeEnviarGame(true);
          setWsTorneo(ws);

          /*if(location.pathname != "/admin/partida"){//Comprobamos que no estemos en una partida
            console.log("Reseteamos LStorage Partida: "+location.pathname);
            localStorage.removeItem('miturno7reinas');
            localStorage.removeItem('mano7reinas');
            localStorage.removeItem('tablero7reinas');
            localStorage.removeItem('descarte7reinas');
            localStorage.removeItem('turno7reinas');
            localStorage.removeItem('heabierto7reinas');
            localStorage.removeItem('herobado7reinas');
    
            localStorage.setItem("turno7reinas", JSON.stringify(0)); //Inicializa el turno
            localStorage.setItem("heabierto7reinas", false);
            localStorage.setItem("herobado7reinas", false); //Inicialmente es false
          }*/
        }
        ws.onclose = () => {
          console.log(`Desconectado de la partida ${currentGame}`);
          //Reseteamos los almacenes
          // localStorage.removeItem('miturno7reinas');
          // localStorage.removeItem('mano7reinas');
          // localStorage.removeItem('tablero7reinas');
          // localStorage.removeItem('descarte7reinas');
          // localStorage.removeItem('turno7reinas');    
        }
        ws.onmessage = (event) => {
          let mensaje = JSON.parse(event.data);
          console.log("Mensaje de wsTorneo:");
          console.log(mensaje);
          let puntos;

          if (mensaje.tipo === "Partida_iniciada") {
            
            let numNoBots = mensaje.turnos.filter((turn) => !(/^bot(\d+)$/).test(turn[0])).length;
            let gamePlayers = mensaje.turnos.map(() => null);
            console.log(gamePlayers);
            localStorage.setItem("jugadorxs7reinas", JSON.stringify(gamePlayers));

            mensaje.turnos.forEach((elemento, indice) => {
              console.log(elemento[0] + ' - ' + elemento[1]);
              if(elemento[0] === sessionUser.codigo){
                localStorage.setItem("miturno7reinas", JSON.stringify(elemento[1])); //Guardamos nuestro turno como String
                setMyTurn(elemento[1]);
              }
              const match = (/^bot(\d+)$/).exec(elemento[0]);
              if (match) {
                let bot = {
                  codigo: elemento[0],
                  nombre: "Bot " + match[1],
                  foto: Math.floor(Math.random() * 9),
                  cartas: 14
                };
                let players = JSON.parse(localStorage.getItem('jugadorxs7reinas'));
                players[parseInt(elemento[1])] = bot;
                localStorage.setItem('jugadorxs7reinas', JSON.stringify(players));
              } else {
                getUserForGame(elemento[0], () => {
                  console.log("El nuevo jugador: "+(mensaje.tipo).substring(15));
                  console.log("El nuevo jugador 2: "+JSON.stringify(players));
                  numNoBots--;
                  if (numNoBots === 0) {
                    ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
                  }
                }, parseInt(elemento[1]));
              }
            });
            setPlayers(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
            setBoard([]);
            localStorage.setItem("tablero7reinas", JSON.stringify([])); //Inicialmente es vacia
            setTurn(0);
            localStorage.setItem("turno7reinas", JSON.stringify(0)); //Guardamos nuestro turno como String
            setDiscard([]);
            localStorage.setItem("descarte7reinas", JSON.stringify([])); //Inicialmente es vacia
            localStorage.setItem("herobado7reinas", false); //Inicialmente es false
            console.log(sessionUser.codigo);
            setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]); //Ponemos un valor inicial para evitar error
            //Establecemos los puntos iniciales en el torneo
            setpuntosTorneo([]);
            localStorage.setItem("puntosTorneo7reinas", JSON.stringify([])); //Inicialmente es vacia
            // HARA FALTA CUANDO SE REANUDEN LAS PARTIDAS
            // ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_tablero"}));
          
          } else if(mensaje.tipo === "Partida_terminada"){
            //setpuntosTorneo([]);
            //localStorage.setItem("puntosTorneo7reinas", JSON.stringify([]));
            //Guardamos los puntos
            puntos = mensaje.puntos.map((puntosInx, ind) => {
              return puntosInx;
            });
            setpuntosTorneo(puntos);
            localStorage.setItem("puntosTorneo7reinas", JSON.stringify(puntos));

            if(mensaje.ganador != ""){
              //El resto del código esta en este enlace
              //https://github.com/UNIZAR-30226-2023-07/Frontend-movil/blob/4e6f853857d7e37a79a62eccdd462a874e2fe93b/Aplicacion/lib/pages/board_page.dart
            }
          }
        }      
        ws.onerror = (error) => {
          console.log(`Error: ${error.message}`);
        }
        return ws;
      }
    }
    return wsTorneo;
  }, [wsTorneo, sessionUser.codigo, currentTournament, history, myTurn, players]);


  const wsGameChatInstance = useMemo(() => {
    if (!wsGameChat/* && currentGame !== null && currentGame !== undefined && currentGame !== ""*/) {
      const ws = new WebSocket(`ws://13.93.90.135:3001/api/ws/chat/lobby/${currentGameChat}`);
      ws.onopen = () => {
        console.log(`Conectado al chat de la partida ${currentGameChat}`);
        setWsGameChat(ws);
      }
      ws.onclose = () => {
        console.log(`Desconectado del chat de la partida ${currentGameChat}`);
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
  }, [wsGameChat, currentGameChat]);


  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    //mainContent.current.scrollTop = 0;
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
      if (wsTorneoInstance) {
        wsTorneoInstance.close();
        setWsTorneo(null);
      }
      if (wsGameChatInstance) {
        wsGameChatInstance.close();
        setWsGameChat(null);
      }
    }
  }, [wsChatInstance, wsGameInstance, wsTorneoInstance, wsGameChatInstance, currentGame]);


  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (

          <Route
            path={prop.layout + prop.path}
            // Añadir props: https://ui.dev/react-router-pass-props-to-components
            render={(props) => <div className={"user-content" + (prop.path==="/partida"?" game-content":"")} ref={mainContent}>
                                  <prop.component
                                    {...props}
                                    sessionUser={sessionUser}
                                    setSessionUser={setSessionUser}
                                    friends={friends}
                                    friendRequests={friendRequests}
                                    setGame={setCurrentGame}
                                    currentGame={currentGame}
                                    players={players}
                                    setPlayers={setPlayers}
                                    hand={hand}
                                    setHand={setHand}
                                    board={board}
                                    discard={discard}
                                    myTurn={myTurn}
                                    turn={turn}
                                    wsGame={wsGame}
                                    wsTorneo={wsTorneo}
                                  />
                                </div>}
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
        <div className={"game-content user-content"} ref={mainContent}>
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
        
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
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
