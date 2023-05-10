import "./../assets/css/cartas_rabino.css";
//import CardR from "components/Cartas_Rabino/card.js";
import React, { useEffect, useState, memo } from 'react';
import CardsWrapper from "components/Cartas_Rabino/CardWrapper.js";
import { Container,
  Row,
  Col,
  Card,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media
} from "reactstrap";

import { Link, useLocation, useHistory } from "react-router-dom";

import SelectImgUser from "hooks/SelectImgUser.js";

import Reverso_carta from "../assets/img/Imgs_7_Reinas/Reverso_carta.png";

import pauseGame from "hooks/setter/pauseGame";

//Cuando el jugador le de a salir de la partida se ejecutará esta función
//FALTA IMPLEMENTARLA
//import GuardarSalir from "hooks/getter/logOut.js";


function Tablero_Rabino(props) {

  const location = useLocation();
  const history = useHistory();

  if (localStorage.getItem("turno7reinas") == null)
    history.push("/admin/");

  //Esta parte guarda la información de los jugadores que hay
  const json_j_default = '{"Nombre": "Sin jugador", "Foto": 6, "Mano": "4"}';
  const j_default = JSON.parse(json_j_default);

  const json_j_turno = '{"Nombre": "Pedro"}';
  const j_turno = JSON.parse(json_j_turno);

  const { players, board, hand, setHand, myTurn, turn, wsGame, sessionUser, discard } = props;

  const [cardsPerComb, setCardsPerComb] = useState([0, 0, 0, 0, 0]);
  const [currentComb, setCurrentComb] = useState(0);
  const [numOfCombs, setNumOfCombs] = useState(0);
  const [action, setAction] = useState(0);
  const [heRobado, setheRobado] = useState(localStorage.getItem("herobado7reinas") == null? false:localStorage.getItem("herobado7reinas"));

  const combinaciones = (hand, cardsPerComb, numOfCombs) => {
    let estructura = [];
    for (let i = 0; i < numOfCombs; i++) {
      let result = "";
      for (let j = 0; j < cardsPerComb[i]; j++)
        result += hand.findIndex(card => card.comb === i && card.ord === j) + ",";
      estructura.push(result.substring(0, result.length-1));
    }
    return estructura;
  };

  const clearPlay = () => {
    let partialHand = hand;
    partialHand && partialHand.forEach(card => { card.comb=-1; card.ord=-1 });
    setCurrentComb(0);
    setNumOfCombs(0);
    //setOpenPlay(Array.from({ length: hand.length }, () => ({comb:-1, ord:-1})));
    setHand(partialHand);
    setCardsPerComb([0, 0, 0, 0, 0]);
  };

  const addCardIntoComb = (card, openPlay, cardsPerComb, combs) => {
    openPlay[card].comb = combs.current;
    openPlay[card].ord = cardsPerComb[combs.current];
    cardsPerComb[combs.current]++;
    if (cardsPerComb[combs.current] === 1) combs.num++;
  };
  const removeCardFromComb = (card, openPlay, cardsPerComb, combs) => {
    let itsComb = openPlay[card].comb;
    let itsOrd = openPlay[card].ord;
    cardsPerComb[itsComb]--;
    if (cardsPerComb[itsComb] === 0) {
      combs.num--;
      if (itsComb < combs.current) combs.current--;
      cardsPerComb.splice(itsComb, 1);
      cardsPerComb.push(0);
      openPlay.forEach(card => { if (card.comb > itsComb) card.comb-- });
    } else openPlay.forEach(card => { if (card.comb === itsComb && card.ord > itsOrd) card.ord-- });
    openPlay[card].comb = -1;
    openPlay[card].ord = -1;
  };

  const handleCardSelect = (card) => {
    let partialOpenPlay = hand;
    let partialCardsPerComb = cardsPerComb;
    let partialCombs = {num:numOfCombs, current:currentComb}
    if (partialOpenPlay[card].comb === -1) {
      //console.log('añadiendo');
      addCardIntoComb(card, partialOpenPlay, partialCardsPerComb, partialCombs);
    } else if (partialOpenPlay[card].comb === currentComb) {
      //console.log('quitando');
      removeCardFromComb(card, partialOpenPlay, partialCardsPerComb, partialCombs);
    } else {
      //console.log('cambiando');
      removeCardFromComb(card, partialOpenPlay, partialCardsPerComb, partialCombs);
      addCardIntoComb(card, partialOpenPlay, partialCardsPerComb, partialCombs);
    }
    // console.log("Combinaciones");
    // console.log(partialOpenPlay);
    // console.log("Cartas por combinacion");
    // console.log(partialCardsPerComb);
    // console.log("Numero de combinaciones");
    // console.log(partialCombs.num);
    // console.log("Combinacion actual");
    // console.log(partialCombs.current);
    setAction(action+1);
    setHand(partialOpenPlay);
    setCardsPerComb(partialCardsPerComb);
    setNumOfCombs(partialCombs.num);
    setCurrentComb(partialCombs.current);
  }

  useEffect(() => {
    clearPlay();
  }, [hand, location]);

  // useEffect(() => {
  // }, [currentComb, cardsPerComb]);
  // // actualizar el componente cuando cambie hand
  // useEffect(() => {
  // }, [hand]);

  useEffect(() => {
    // Set the overflow property to hidden on the body element
    document.body.style.overflow = 'hidden';
  }, []);

  // const BarButtons = React.memo(() => {
  //   return (
  //     <Card className="game-action-bar">
  //       <Button className="game-action-button" color='primary' onClick={() => console.log('Boton pulsado')}>Abrir</Button>
  //       <Button className="game-action-button" color='primary' onClick={() => console.log('Boton pulsado')}>Añadir combinación</Button>
  //       Combinación
  //       {() => {
  //         console.log('NUMCOMBS');
  //         console.log(numOfCombs);
  //         for (let i = 0; i <= numOfCombs; i++)
  //           return <Button className="game-action-button" color='primary' onClick={() => currentComb = {i}}>{i+1}</Button>;
  //       }}
  //       {/* <Button className="game-action-button" color='primary' onClick={() => currentComb = 1}>2</Button>
  //       <Button className="game-action-button" color='primary' onClick={() => currentComb = 2}>3</Button>
  //       <Button className="game-action-button" color='primary' onClick={() => currentComb = 3}>4</Button>
  //       <Button className="game-action-button" color='primary' onClick={() => currentComb = 4}>5</Button> */}
  //       {() => {if (numOfCombs>0) return (<Button className="game-action-button" color='primary' onClick={() => currentComb = 1}>2</Button>)}}
  //       {() => {if (numOfCombs>1) return (<Button className="game-action-button" color='primary' onClick={() => currentComb = 2}>3</Button>)}}
  //       {() => {if (numOfCombs>2) return (<Button className="game-action-button" color='primary' onClick={() => currentComb = 3}>4</Button>)}}
  //       {() => {if (numOfCombs>3) return (<Button className="game-action-button" color='primary' onClick={() => currentComb = 4}>5</Button>)}}
  //       <Button className="game-action-button" color='primary' onClick={() => {console.log('Boton pulsado'); clearPlay();}}>Deseleccionar</Button>
  //     </Card>
  //   );
  // });

  const descartes = [
    {
      number: 0, //JOKER
      symbol: 0,
    },
  ];

  const jugadoresInfo = (jugadores) => {
    let turno = JSON.parse(localStorage.getItem("turno7reinas"));
    return jugadores?.map((jugador, ind) => {
      return jugador == null ? null : (
        <Card className={"game-player-card" + (ind==turno?" game-player-current":(ind==myTurn?" game-player-me":""))}>
            <img
              alt="..."
              className="game-player-card-pic avatar-lg rounded-circle"
              src={SelectImgUser(jugador.foto)}
            />
          <p className="game-player-card-text">
            <div className="game-player-card-text-name">{jugador.nombre}</div>
            <div className="game-player-card-text-cards">
              <span className="game-player-card-text-cards-num">{jugador.cartas}</span>
              <span className="game-player-card-text-cards-word">{jugador.cartas==1?"carta":"cartas"}</span>
            </div>
          </p>
        </Card>
      );
    });
  }

  const mostrarMano = (mano) => {
    return (mano == null || mano == undefined) ? null :
    <CardsWrapper
      className="game-my-hand"
      cartas={hand}
      cardsNumber={hand.length}
      classes={"hand-cards card-button"}
      accion_Carta={(index) => {handleCardSelect(index)}}
    />;
  }

  const mostrarDescartes = (descartes1, descartes2, accion) => {
    if(descartes2 == null || descartes2 == undefined || descartes2.length == 0){
      return(<CardsWrapper cartas={descartes1} cardsNumber={descartes1.length} classes={"card-button"} accion_Carta={accion}/>);
    }else{//Si hay cartas en descartes
    return(<CardsWrapper cartas={descartes2} cardsNumber={descartes2.length} classes={"card-button"} accion_Carta={accion}/>);
    }
  }

  const mostrarTablero = () => {
    if(board == null || board == undefined){
      return;
    }
    return board.map((fila, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'row',borderBottom: '1px solid white', justifyContent:'center', alignItems:"center" }}>
        <CardsWrapper cartas={fila} cardsNumber={fila.length} classes={"card-board"} accion_Carta={() => {}}/>
        <Card className="game-add-card-bar">
          <Button className="game-action-button" color='primary' onClick={() => {console.log('Boton pulsado'); anyadirCarta(i);}}><i className="ni ni-fat-add" /></Button>
        </Card>
      </div>
    ));
  }

  const robarCarta = () => {
    let turno = JSON.parse(localStorage.getItem("turno7reinas"));
    if(turno == myTurn){
      setheRobado(true);
      localStorage.setItem("herobado7reinas", true); //Indica si ha robado el jugador
      wsGame.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Robar_carta"}));
      console.log('Enviar: Roba una carta');
    } else {
      console.log('No es tu turno de robar');
    }
    return;
  }

  const robarDescarte = () => {
    let turno = JSON.parse(localStorage.getItem("turno7reinas"));
    if(turno == myTurn){
      setheRobado(true);
      localStorage.setItem("herobado7reinas", true); //Indica si ha robado el jugador
      wsGame.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Robar_carta_descartes"}));
      console.log('Enviar: Robar de descarte');
    } else {
      console.log('No es tu turno de robar descarte');
    }
    return;
  }

  const descartar = () => {
    let turno = JSON.parse(localStorage.getItem("turno7reinas"));
    if(turno == myTurn){
      if (numOfCombs === 1 && cardsPerComb[0] === 1) {
        wsGame.send(JSON.stringify({
          "emisor": sessionUser.codigo,
          "tipo": "Descarte",
          "info": (hand.findIndex(card => card.comb === 0)).toString()
        }));
        console.log('Enviar: Descarte');
        console.log(JSON.stringify({
          "emisor": sessionUser.codigo,
          "tipo": "Descarte",
          "info": (hand.findIndex(card => card.comb === 0)).toString()
        }));
      } else {
        console.log('Para descartar, seleccione una sola carta.');
      }
    
    } else {
      console.log('No es tu turno de descartar');
    }
    return;
  }

  const abrir = () => {
    wsGame.send(JSON.stringify({
      emisor: sessionUser.codigo,
      tipo: "Abrir",
      cartas: combinaciones(hand, cardsPerComb, numOfCombs)
    }));
    console.log('Enviar: Abrir');
    return;
  }

  const nuevaCombinacion = () => {
    if (numOfCombs === 1) {
      wsGame.send(JSON.stringify({
        emisor: sessionUser.codigo,
        tipo: "Colocar_combinacion",
        cartas: combinaciones(hand, cardsPerComb, 1)
      }));
      console.log('Enviar: Nueva combinación');
    } else {
      console.log('Para colocar una combinación, seleccione una sola combinación.');
    }
    return;
  }

  const anyadirCarta = (comb) => {
    if (numOfCombs === 1 && cardsPerComb[0] === 1) {
      wsGame.send(JSON.stringify({
        emisor: sessionUser.codigo,
        tipo: "Colocar_carta",
        info: `${comb},${hand.findIndex(card => card.comb === 0)}`
      }));
      console.log('Enviar: Colocamos la carta');
    } else {
      console.log('Para colocar una carta, seleccione solo una.');
    }
    return;
  }

  const botonesCombinaciones = (numCombs) => {
    let botones = [];
    for (let i=0; i<=numCombs && i<5; i++)
      botones.push(<Button className={`game-action-button comb-button-${i}-${currentComb==i?"on":"off"}`} color='primary' onClick={() => {setCurrentComb(i)}}>{i+1}</Button>);
    return botones;
  }

  console.log(players);
  //console.log(board);
  //console.log(hand);

  return (
    <div className="App" style={{overflowY: 'hidden', overflowX: 'hidden'}}>
      <div style={{ position: "relative", height: '5rem', width: 'calc(100vw - 15rem)', right: '0', zIndex:'1'}}
      className="mt-0">
        <Row className="game-player-container">
          {(turn==myTurn && JSON.parse(localStorage.getItem("anfitrion7reinas")) && !JSON.parse(localStorage.getItem("herobado7reinas"))) ?
          <Button
            className="game-exit-button"
            color='primary'
            onClick={() => {console.log('Salir pulsado'); pauseGame(sessionUser, `${JSON.parse(localStorage.getItem("juego7reinas"))}`, ()=>{}, ()=>{});}}
          >
            <i className="ni flip-y ni-user-run" />
          </Button> : null}
          {jugadoresInfo(players)}
        </Row>
      </div>
      <div style={{ display:'flex', position:'relative', top:'-5rem', width:'100%', flexDirection:'row', zIndex:'0' }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{backgroundColor:'green', height:'calc(100vh - 16em)', width:'calc(100vw - 15rem)', overflowY:'scroll', paddingTop:'6rem', paddingBottom:'4rem' }}>
            {mostrarTablero()}
          </div>
          <div style={{ backgroundColor:'brown', width:'calc(100vw - 15rem)', height:'10rem', display:'flex'}}>
            
                      {/* <p className="mb--2" style={{ color: 'white', textAlign: 'center'}} >Mazo</p> */}
                      <Button style={{minWidth:'fit-content'}} onClick={() => robarCarta()}
                      className="card-button">
                        <img src={Reverso_carta} alt="..." style={{ width:'100%', height:'90%', borderRadius:'0.35rem'}}/>
                      </Button>



                    {/* <p className="mb--2" style={{ color: 'white', textAlign: 'center'}} >Descartes</p> */}
                    {mostrarDescartes(descartes, discard, () => {!JSON.parse(localStorage.getItem("herobado7reinas"))/* && JSON.parse(localStorage.getItem("heabierto7reinas"))*/? robarDescarte() : descartar()})}
                  
              
              
                
                  {mostrarMano(hand)}
                
          {/* <button onClick={() => window.location.reload()}>Reload Cards</button> */}
          </div>
        </div>
      </div>
      <Card className="game-action-bar">
        <Button className="game-action-button" disabled={JSON.parse(localStorage.getItem("heabierto7reinas"))}  color='primary' onClick={() => {console.log('Boton pulsado'); abrir()}}>Abrir</Button>
        <Button className="game-action-button" color='primary' onClick={() => {console.log('Boton pulsado'); nuevaCombinacion();}}>Añadir combinación</Button>
        Combinación
        {turn}
        {botonesCombinaciones(numOfCombs)}
        {/* <Button className="game-action-button" color='primary' onClick={() => currentComb = 1}>2</Button>
        <Button className="game-action-button" color='primary' onClick={() => currentComb = 2}>3</Button>
        <Button className="game-action-button" color='primary' onClick={() => currentComb = 3}>4</Button>
        <Button className="game-action-button" color='primary' onClick={() => currentComb = 4}>5</Button> */}
        <Button className="game-action-button" color='primary' onClick={() => {console.log('Boton pulsado'); clearPlay();}}>Deseleccionar</Button>
      </Card>
    </div>
  );
  
  
}

export default memo(Tablero_Rabino);