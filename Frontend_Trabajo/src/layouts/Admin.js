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
import getUser from "hooks/getter/getUser";
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
  const [isTournament, setIsTournament] = useState(JSON.parse(localStorage.getItem("es_torneo7reinas")));
  const [areWeResuming, setAreWeResuming] = useState(JSON.parse(localStorage.getItem("reanudada7reinas")));
  const [players, setPlayers] = useState(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
  const [myTurn, setMyTurn] = useState(JSON.parse(localStorage.getItem("miturno7reinas")));
  const [turn, setTurn] = useState(JSON.parse(localStorage.getItem("turno7reinas")));
  const [hand, setHand] = useState(JSON.parse(localStorage.getItem("mano7reinas")));
  const [board, setBoard] = useState(JSON.parse(localStorage.getItem("tablero7reinas")));
  const [discard, setDiscard] = useState(JSON.parse(localStorage.getItem("descarte7reinas")));
  const [roundWinner, setRoundWinner] = useState(JSON.parse(localStorage.getItem("ganadorxronda7reinas")));
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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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
      const ws = new WebSocket(`ws://20.160.173.253:3001/api/ws/chat/${sessionUser.codigo}`);
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
        if (msg.emisor === "Servidor"){
          updateFriends();
          updateFriendRequests();
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

  //Se usa para resetar la partida cuando estas en un torneo
  const resetear_partida_torneo = () => {
    console.log("RESETEAMOS PARTIDA DE TORNEO");
    setBoard([]);
    localStorage.setItem("tablero7reinas", JSON.stringify([])); //Inicialmente es vacia
    setTurn(0);
    localStorage.setItem("turno7reinas", JSON.stringify(0)); //Guardamos nuestro turno como String
    setDiscard([]);
    localStorage.setItem("descarte7reinas", JSON.stringify([])); //Inicialmente es vacia
    localStorage.setItem("herobado7reinas", false); //Inicialmente es false
    console.log(sessionUser.codigo);
    setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]); //Ponemos un valor inicial para evitar error
    // console.log('PEDIMOS LAS MANOS AL INICIAR');
    // //ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
    // const wsTemp = new WebSocket(`ws://20.160.173.253:3001/api/ws/partida/${currentGame}`);
    // wsTemp.onopen = () => {
    //   console.log(`PEDIR CARTAS`);
    //   wsTemp.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
    //   wsTemp.close();
    // }
    // wsTemp.onclose = () => {
    //   console.log(`SALIDO`);
    // }
  }

  const comportamiento_partida = async (mensaje, ws) => {
    let myHand = [], mydescartes = [];

    if ( (mensaje.tipo).substring(0, 13) === "Nuevo_Jugador" ) {
      let nuevoJugador = mensaje.tipo.slice(mensaje.tipo.indexOf(":")+2);
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
        //let numNoBots = mensaje.turnos.filter((turn) => !(/^bot(\d+)$/).test(turn[0])).length;
        let lobbyPlayers = JSON.parse(localStorage.getItem("jugadorxs7reinas"));
        let gamePlayers = mensaje.turnos.map(() => null);
        console.log("PartidaIniciada-GamePlayers: "+gamePlayers);
        mensaje.turnos.forEach((elemento, indice) => {
          console.log(elemento[0] + ' - ' + elemento[1]);
          if(elemento[0] === sessionUser.codigo){
            localStorage.setItem("miturno7reinas", JSON.stringify(elemento[1])); //Guardamos nuestro turno como String
            setMyTurn(elemento[1]);
            console.log("Nuestro turno es el "+JSON.parse(JSON.stringify(elemento[1])));
          }
          const match = (/^bot(\d+)$/).exec(elemento[0]);
          if (match) {
            let bot = {
              codigo: elemento[0],
              nombre: "Bot " + match[1],
              foto: Math.floor(Math.random() * 9),
              cartas: 14,
              ptsTorneo: 0
            };
            gamePlayers[parseInt(elemento[1])] = bot;
          } else {
            lobbyPlayers.forEach((player) => {
              console.log(player.codigo, elemento[0], elemento[1]);
              if(player.codigo === elemento[0])
                gamePlayers[parseInt(elemento[1])] = player;
            });
          }
        });
        setPlayers(gamePlayers);
        localStorage.setItem("jugadorxs7reinas", JSON.stringify(gamePlayers));
        setBoard([]);
        localStorage.setItem("tablero7reinas", JSON.stringify([])); //Inicialmente es vacia
        setTurn(0);
        localStorage.setItem("turno7reinas", JSON.stringify(0)); //Guardamos nuestro turno como String
        setDiscard([]);
        localStorage.setItem("descarte7reinas", JSON.stringify([])); //Inicialmente es vacia
        localStorage.setItem("herobado7reinas", false); //Inicialmente es false
        console.log(sessionUser.codigo);
        //setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]); //Ponemos un valor inicial para evitar error
        localStorage.setItem("torneo_ganado7reinas", false); //Indica que no se ha ganado el torneo
        // if (!(JSON.parse(localStorage.getItem("reanudada7reinas")))) {
        //   console.log('PEDIMOS LAS MANOS AL INICIAR')
        //   ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
        // }
        break;

      case "Partida_Creada":
        await sleep(1000);
        console.log('PEDIMOS LAS MANOS AL REANUDAR');
        ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
        console.log('PEDIMOS EL TABLERO AL REANUDAR');
        ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_tablero"}));
        break;

      case "Mostrar_manos":
        //console.log("Mostrar manos: "+mensaje.mano);
        let gameplayers = JSON.parse(localStorage.getItem("jugadorxs7reinas"));
        for (let i = 0; i < mensaje.manos.length; i++) {
          gameplayers[i].cartas = mensaje.manos[i].length;
        }
        setPlayers(gameplayers);
        localStorage.setItem("jugadorxs7reinas", JSON.stringify(gameplayers)); //Inicialmnete es vacia
        let myHandIdx = JSON.parse(localStorage.getItem("miturno7reinas"));
        myHand = mensaje.manos[myHandIdx] ? mensaje.manos[myHandIdx].map((card, ind) => {
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
        if (mensaje.receptor === sessionUser.codigo) {
          //console.log("Mostrar mano: "+mensaje.mano);
          let gameplayers = JSON.parse(localStorage.getItem("jugadorxs7reinas"));
          let miTurno = JSON.parse(localStorage.getItem("miturno7reinas"));
          // console.log("MostrarMano-myTurn: "+myTurn);
          // console.log("MostrarMano-miTurno: "+miTurno);
          // console.log("MostrarMano-msgCartasLength: "+mensaje.cartas.length);
          // console.log("MostrarMano-GamePlayers: "+(gameplayers[myTurn].cartas).toString());
          gameplayers[miTurno].cartas = mensaje.cartas.length;
          localStorage.setItem("jugadorxs7reinas", JSON.stringify(gameplayers));
          setPlayers(gameplayers);
          myHand = mensaje.cartas.map((card, ind) => {
            let values = card.split(",");
            return {number: values[0], symbol: values[1], back: values[2], comb: -1, ord: -1};
          });
          console.log("Mi mano:");
          console.log(myHand);
          setHand(myHand);
          localStorage.setItem("mano7reinas", JSON.stringify(myHand)); //Inicialmnete es vacia
        }
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
        } else { //Vaciamos el tablero
          setBoard([]);
          localStorage.setItem("tablero7reinas", JSON.stringify([]));  
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
        } else { // Vaciamos descartes
          setDiscard([]);
          localStorage.setItem("descarte7reinas", JSON.stringify([])); //Inicialmente es vacia      
        }
        break;
      
      case "Robar_carta":
        localStorage.removeItem("ganadorxronda7reinas");
        setRoundWinner(null);
        if(mensaje.receptor == sessionUser.codigo && (/^(\d+),(\d+),(\d+)$/).test(mensaje.info)){//Así solo se pide una vez
          localStorage.setItem("herobado7reinas", true); //Indica si ha robado el jugador
          let card = mensaje.info.split(",");
          let myHand = JSON.parse(localStorage.getItem("mano7reinas"));
          myHand.push({number: card[0], symbol: card[1], back: card[2], comb: -1, ord: -1});
          setHand(myHand);
          localStorage.setItem("mano7reinas", JSON.stringify(myHand));
          console.log("RECEPCIÓN: Carta Robada");
        }
        break;

      case "Robar_carta_descartes":
        if(mensaje.receptor == sessionUser.codigo && (/^(\d+),(\d+),(\d+)$/).test(mensaje.info)){//Así solo se pide una vez
          localStorage.setItem("herobado7reinas", true); //Indica si ha robado el jugador
          let card = mensaje.info.split(",");
          let myHand = JSON.parse(localStorage.getItem("mano7reinas"));
          myHand.push({number: card[0], symbol: card[1], back: card[2], comb: -1, ord: -1});
          setHand(myHand);
          localStorage.setItem("mano7reinas", JSON.stringify(myHand));
          setDiscard([]);
          localStorage.setItem("descarte7reinas", JSON.stringify([])); //Ponemos a vacio descartes
          console.log("RECEPCIÓN: Carta Robada de Descartes");
        }
        break;
      
      case "Abrir":
        if(mensaje.info == "Ok" && mensaje.receptor == sessionUser.codigo){//Así solo se pide una vez actualizar
          localStorage.setItem("heabierto7reinas", true);
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_mano"}));
          ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_tablero"}));
        } else if((/^\d+$/).test(mensaje.info)){

          let torneo_ganado = JSON.parse(localStorage.getItem("torneo_ganado7reinas"));
          if (isTournament) {
            if(!torneo_ganado) {
              localStorage.setItem("ganadorxronda7reinas", parseInt(mensaje.info));
              setRoundWinner(parseInt(mensaje.info));
            }
          } else {
            localStorage.setItem("ganadorx7reinas", parseInt(mensaje.info));
            getUser(sessionUser.correo, () => {
              history.push("/admin/gameend");
            });
          }
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

          let torneo_ganado = JSON.parse(localStorage.getItem("torneo_ganado7reinas"));
          if (isTournament) {
            if(!torneo_ganado) {
              localStorage.setItem("ganadorxronda7reinas", parseInt(mensaje.info));
              setRoundWinner(parseInt(mensaje.info));
            }
          } else {
            localStorage.setItem("ganadorx7reinas", parseInt(mensaje.info));
            getUser(sessionUser.correo, () => {
              history.push("/admin/gameend");
            });
          }
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
          
          let torneo_ganado = JSON.parse(localStorage.getItem("torneo_ganado7reinas"));
          if (isTournament) {
            if(!torneo_ganado) {
              localStorage.setItem("ganadorxronda7reinas", parseInt(mensaje.info));
              setRoundWinner(parseInt(mensaje.info));
            }
          } else {
            localStorage.setItem("ganadorx7reinas", parseInt(mensaje.info));
            getUser(sessionUser.correo, () => {
              history.push("/admin/gameend");
            });
          }
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
        mydescartes = mensaje.descartes==null ? null : 
          mensaje.descartes.map((card, ind) => {
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

        // Si el siguiente jugador a abierto o no
        /*if(mensaje.abrir == "si"){
          localStorage.setItem("heabierto7reinas", true);
        }else{
          localStorage.setItem("heabierto7reinas", false);
        }*/

        // Actualizar las manos de los jugadores
          if (!(/^bot(\d+)$/).test(JSON.parse(localStorage.getItem("jugadorxs7reinas"))[parseInt(mensaje.turno)].codigo) && parseInt(mensaje.turno)==myTurn)
            { console.log('PEDIMOS LAS MANOS AL DESCARTAR');
              ws.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));}
          else console.log ("VA A JUGAR UN BOT. NO ACTUALIZAMOS.")
          localStorage.setItem("herobado7reinas", false); //Indica si ha robado el jugador
        }
        if ((/^\d+$/).test(mensaje.ganador)) {
          let torneo_ganado = JSON.parse(localStorage.getItem("torneo_ganado7reinas"));
          if (isTournament) {
            if(!torneo_ganado) {
              localStorage.setItem("ganadorxronda7reinas", parseInt(mensaje.ganador));
              setRoundWinner(parseInt(mensaje.ganador));
            }
          } else {
            localStorage.setItem("ganadorx7reinas", parseInt(mensaje.ganador));
            getUser(sessionUser.correo, () => {
              history.push("/admin/gameend");
            });
          }
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

        case "Puntos":
          let players = JSON.parse(localStorage.getItem("jugadorxs7reinas"));
          mensaje.puntos.forEach((pts, ind) => {
            players[ind].ptsTorneo = pts;
          });
          setPlayers(players);
          localStorage.setItem("jugadorxs7reinas", JSON.stringify(players));
          break;

      default:
        return 0;
    }
  }



  const wsGameInstance = useMemo(() => {
    if (!wsGame/* && currentGame !== null && currentGame !== undefined && currentGame !== ""*/) {
      console.log("WSgAME ES TORNEO: "+localStorage.getItem("es_torneo7reinas"));
      const ws = new WebSocket(`ws://20.160.173.253:3001/api/ws/partida/${currentGame}`);
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
      //console.log("wSesTorneo-es_torneo: "+JSON.parse(localStorage.getItem("es_torneo7reinas")));
      if(JSON.parse(localStorage.getItem("es_torneo7reinas"))){
        const ws = new WebSocket(`ws://20.160.173.253:3001/api/ws/torneo/${currentGame}`);
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

          if ( (mensaje.tipo).substring(0, 13) === "Nuevo_Jugador" ) {
            let nuevoJugador = mensaje.tipo.slice(mensaje.tipo.indexOf(" ")+3);
            getUserForGame(nuevoJugador, () => {
              setPlayers(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
              console.log("El nuevo jugador: "+(mensaje.tipo).substring(15));
              console.log("El nuevo jugador 2: "+JSON.stringify(players));
              //localStorage.setItem("jugadorxs7reinas", JSON.stringify(players)); //Inicialmnete es vacia
            });
            //setPlayers(players.push(nuevoJugador)); //Apilamos el nuevo jugador
          } else
          if (mensaje.tipo === "Partida_Iniciada") {
            let lobbyPlayers = JSON.parse(localStorage.getItem("jugadorxs7reinas"));
            let gamePlayers = mensaje.turnos.map(() => null);
            console.log("PartidaIniciada-GamePlayers: "+gamePlayers);
            mensaje.turnos.forEach((elemento, indice) => {
              console.log(elemento[0] + ' - ' + elemento[1]);
              if(elemento[0] === sessionUser.codigo){
                localStorage.setItem("miturno7reinas", JSON.stringify(elemento[1])); //Guardamos nuestro turno como String
                setMyTurn(elemento[1]);
                console.log("Nuestro turno es el "+JSON.parse(JSON.stringify(elemento[1])));
              }
              const match = (/^bot(\d+)$/).exec(elemento[0]);
              if (match) {
                let bot = {
                  codigo: elemento[0],
                  nombre: "Bot " + match[1],
                  foto: Math.floor(Math.random() * 9),
                  cartas: 14,
                  ptsTorneo: 0
                };
                gamePlayers[parseInt(elemento[1])] = bot;
              } else {
                lobbyPlayers.forEach((player) => {
                  console.log(player.codigo, elemento[0], elemento[1]);
                  if(player.codigo === elemento[0])
                    gamePlayers[parseInt(elemento[1])] = player;
                });
              }
            });
            setPlayers(gamePlayers);
            localStorage.setItem("jugadorxs7reinas", JSON.stringify(gamePlayers));
            setBoard([]);
            localStorage.setItem("tablero7reinas", JSON.stringify([])); //Inicialmente es vacia
            setTurn(0);
            localStorage.setItem("turno7reinas", JSON.stringify(0)); //Guardamos nuestro turno como String
            setDiscard([]);
            localStorage.setItem("descarte7reinas", JSON.stringify([])); //Inicialmente es vacia
            localStorage.setItem("herobado7reinas", false); //Inicialmente es false
            console.log(sessionUser.codigo);
            //setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]); //Ponemos un valor inicial para evitar error
            localStorage.setItem("torneo_ganado7reinas", false); //Indica que no se ha ganado el torneo

            // if (!(JSON.parse(localStorage.getItem("reanudada7reinas")))) {
            //   console.log('PEDIMOS LAS MANOS AL INICIAR')
            //   const ws2 = new WebSocket(`ws://20.160.173.253:3001/api/ws/partida/${currentGame}`);
            //   ws2.onopen = () => {
            //     console.log(`PEDIR CARTAS`);
            //     ws2.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Mostrar_manos"}));
            //     ws2.close();
            //   }
            //   ws2.onclose = () => {
            //     console.log(`SALIDO`);
            //   }
            // }
          } else if(mensaje.tipo === "Partida_terminada"){
            //setpuntosTorneo([]);
            //localStorage.setItem("puntosTorneo7reinas", JSON.stringify([]));
            //Guardamos los puntos
            let players = JSON.parse(localStorage.getItem("jugadorxs7reinas"));
            mensaje.puntos.forEach((pts, ind) => {
              players[ind].ptsTorneo = pts;
            });
            setPlayers(players);
            localStorage.setItem("jugadorxs7reinas", JSON.stringify(players));

            if(mensaje.ganador == ""){
              //El resto del código esta en este enlace
              //https://github.com/UNIZAR-30226-2023-07/Frontend-movil/blob/4e6f853857d7e37a79a62eccdd462a874e2fe93b/Aplicacion/lib/pages/board_page.dart
              resetear_partida_torneo();
            } else {
              localStorage.setItem("torneo_ganado7reinas", true); //Indica que se ha ganado el torneo

              let usuario = JSON.parse(localStorage.getItem("usuario7reinas"));
              
              mensaje.puntos.forEach((pts, ind) => {
                usuario.puntos = ( (parseInt(usuario.puntos) + parseInt(players[ind].ptsTorneo)).toString());
              });
              localStorage.setItem("usuario7reinas", JSON.stringify(usuario));
              localStorage.setItem("ganadorx7reinas", parseInt(mensaje.ganador));
              getUser(sessionUser.correo, () => {
                history.push("/admin/gameend");
              });
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
  }, [wsTorneo, sessionUser.codigo, currentGame, history, myTurn, players]);


  const wsGameChatInstance = useMemo(() => {
    if (!wsGameChat/* && currentGame !== null && currentGame !== undefined && currentGame !== ""*/) {
      const ws = new WebSocket(`ws://20.160.173.253:3001/api/ws/chat/lobby/${currentGame}`);
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
    //mainContent.current.scrollTop = 0;
  }, [location]);

  useEffect(() => {
    return () => {
      if (wsChatInstance) {
        wsChatInstance.close();
        setWsChat(null);
      }
    }
  }, [wsChatInstance]);

  useEffect(() => {
    return () => {
      if (wsGameInstance) {
        wsGameInstance.close();
        setWsGame(null);
      }
    }
  }, [wsGameInstance, currentGame]);

  useEffect(() => {
    return () => {
      if (wsTorneoInstance) {
        wsTorneoInstance.close();
        setWsTorneo(null);
      }
    }
  }, [wsTorneoInstance, currentGame]);

  useEffect(() => {
    return () => {
      if (wsGameChatInstance) {
        wsGameChatInstance.close();
        setWsGameChat(null);
      }
    }
  }, [wsGameChatInstance, currentGame]);



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
                                    currentGame={currentGame}
                                    setGame={setCurrentGame}
                                    isTournament={isTournament}
                                    setIsTournament={setIsTournament}
                                    setAreWeResuming={setAreWeResuming}
                                    players={players}
                                    setPlayers={setPlayers}
                                    hand={hand}
                                    setHand={setHand}
                                    board={board}
                                    discard={discard}
                                    roundWinner={roundWinner}
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
