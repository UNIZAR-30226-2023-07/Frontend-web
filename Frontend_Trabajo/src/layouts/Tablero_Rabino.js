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

import { Link, useLocation } from "react-router-dom";

import SelectImgUser from "hooks/SelectImgUser.js";

import Reverso_carta from "../assets/img/Imgs_7_Reinas/Reverso_carta.png";

//Cuando el jugador le de a salir de la partida se ejecutará esta función
//FALTA IMPLEMENTARLA
//import GuardarSalir from "hooks/getter/logOut.js";


function Tablero_Rabino(props) {

  const location = useLocation();

  //Esta parte guarda la información de los jugadores que hay
  const json_j_default = '{"Nombre": "Sin jugador", "Foto": 6, "Mano": "4"}';
  const j_default = JSON.parse(json_j_default);

  const json_j_turno = '{"Nombre": "Pedro"}';
  const j_turno = JSON.parse(json_j_turno);

  const { players, board, hand, setHand, myTurn, turn, wsGame, sessionUser } = props;

  const [openPlay, setOpenPlay] = useState(Array.from({ length: hand.length }, () => ({comb:-1, ord:-1})));
  const [cardsPerComb, setCardsPerComb] = useState([0, 0, 0, 0, 0]);
  const [currentComb, setCurrentComb] = useState(0);
  const [numOfCombs, setNumOfCombs] = useState(0);
  const [action, setAction] = useState(0);

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

  console.log(combinaciones(hand, cardsPerComb, numOfCombs));

  const clearPlay = () => {
    let partialHand = hand;
    partialHand.forEach(card => { card.comb=-1; card.ord=-1 });
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
      console.log('añadiendo');
      addCardIntoComb(card, partialOpenPlay, partialCardsPerComb, partialCombs);
    } else if (partialOpenPlay[card].comb === currentComb) {
      console.log('quitando');
      removeCardFromComb(card, partialOpenPlay, partialCardsPerComb, partialCombs);
    } else {
      console.log('cambiando');
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

  const t = [
    [{
      number: 0, //JOKER
      symbol: 0,
    },
    {
      number: 11, //JOKER
      symbol: 1,
    },
    {
      number: 11, //JOKER
      symbol: 2,
    }
    ],
    [{
      number: 11, //Q
      symbol: 3,
    },
    {
      number: 11, //Q
      symbol: 4,
    },
    {
      number: 12, //Q
      symbol: 1,
    }
    ],
    [{
      number: 12, //J
      symbol: 2,
    },
    {
      number: 12, //J
      symbol: 3,
    },
    {
      number: 12, //J
      symbol: 4,
    },
    ],
    [{
      number: 13, //K
      symbol: 1,
    },
    {
      number: 13, //K
      symbol: 2,
    },
    {
      number: 13, //K
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    },
    {
      number: 13, //K
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    },
    {
      number: 13, //K
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    },
    {
      number: 13, //K
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    },
    {
      number: 13, //K
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    },
    {
      number: 13, //K
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    }
    ]
  ];

  const jugadoresInfo = (jugadores) => {
    return jugadores.map((jugador, ind) => {
      return (
        <Col className="ml-5 mt-3 mb-2" xs="3" key={ind}>
          <Row className="mt--2 mb--1">
            <img
              alt="..."
              className="avatar-lg rounded-circle mr-3 ml--4"
              src={SelectImgUser(jugador.foto)}
            />
            <Col className="ml--4">
              <Col className="ml--2">
                <span className="mt-1">{jugador.nombre}</span>
              </Col>
              <Col className="ml--2">
                <Row>
                  <Col>
                <span className="mt-0">{jugador.cartas} cartas</span>
                </Col>
                <Col className="ml--4">
                { jugadores[turn].codigo===jugador.codigo && <p className="red"> Turno </p>}
                {/* { jugadores[turn].codigo==jugador.codigo && <i className="ni ni-check-bold red"/>} */}
                </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </Col>
      );
    });
  }

  const mostrarMano = (mano) => {
    if(mano == null){
      return;
    }
    return(<CardsWrapper cartas={hand} cardsNumber={hand.length} classes={"hand-cards"} accion_Carta={(index) => {console.log(`Carta selecionada ${index}`); handleCardSelect(index)}}/>);
  }

  const mostrarDescartes = (descartes, robar_Descarte) => {
    if(descartes == null){
      return;
    }
    return(<CardsWrapper cartas={descartes} cardsNumber={descartes.length} accion_Carta={robar_Descarte}/>);
  }

  const robarCarta = () => {
    wsGame.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Robar_carta"}));
    console.log('Enviar: Roba una carta');
    return;
  }

  const robarDescarte = () => {
    wsGame.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Robar_carta_descartes"}));
    console.log('Enviar: Robar de descarte');
    return;
  }

  const descartar = () => {
    if (numOfCombs === 1 && cardsPerComb[0] === 1) {
      wsGame.send(JSON.stringify({
        emisor: sessionUser.codigo,
        tipo: "Descarte",
        info: hand.findIndex(card => card.comb === 0)
      }));
      console.log('Enviar: Descarte');
    } else {
      console.log('Para descartar, seleccione una sola carta.');
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

  const botonesCombinaciones = (numCombs) => {
    let botones = [];
    for (let i=0; i<=numCombs && i<5; i++)
      botones.push(<Button className={`game-action-button comb-button-${i}-${currentComb==i?"on":"off"}`} color='primary' onClick={() => {setCurrentComb(i)}}>{i+1}</Button>);
    return botones;
  }

  //console.log(players);
  //console.log(board);
  //console.log(hand);

  return (
    <div className="App" style={{overflowY: 'hidden', overflowX: 'hidden'}}>
      <div style={{ position: "relative", height: '5rem', width: 'calc(100vw - 15rem)', right: '0', zIndex:'1'}}
          className="mt-0">
            <Row style={{background: "transparent"}}>
                  <UncontrolledDropdown nav>
                    <DropdownToggle className="pr-0" nav>
                    <Button color='primary' className="ml-3">
                        <Row className="mt-2 mb--2 ml--4">
                          <Col>
                          <i className="ni ni-bold-left"/>
                          </Col>
                          <Col className="mt--1 ml--3">
                          <p >Salir</p>
                          </Col>
                        </Row>
                    </Button>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow mt--1">
                      {/* <DropdownItem to="/inicio" tag={Link} onClick={logOut}> */}
                      <DropdownItem to="/admin/" tag={Link}>
                        <i className="ni ni-user-run" />
                        <span>Guardar y Salir</span>
                      </DropdownItem>

                      <DropdownItem divider />
                      <DropdownItem>
                        <i className="ni ni-spaceship" />
                        <span>Seguir Jugando</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              {/* <Col xs="1" className="ml--7  mr-5">
                <Button color='primary' className="mt-1" onClick={() => console.log('Nueva combinacion')}>Nueva combinación</Button>
              </Col> */}
              <Col className="ml--3">
                <Card className="bg-secondary shadow" style={{ height: '70px'}}>
                  {/* <CardHeader className="border-0">
                    <h3 className="mb--4 mt--3">Turno de: {TurnoJugador.Nombre}</h3>
                  </CardHeader> */}
                  <Row>
                    {/* {() => {players.map((player, ind) => {
                      console.log(player);
                      return (
                      <Col className="mt-3 mb-2" xs="3" key={ind}> */}
                        {jugadoresInfo(players)}
                      {/* </Col>
                    )})}} */}
                  </Row>
                  
                </Card>

              </Col>
            </Row>
            {/* <Row>
              <Col>
                <Button color='primary' onClick={() => console.log('Abrir chat')}>Abrir chat</Button>
              </Col>
            </Row> */}
      </div>
      <div style={{ display: 'flex', position: 'relative', top: '-5rem', width: '100%', flexDirection: 'row', zIndex:'0' }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{backgroundColor: 'green', height: 'calc(100vh - 16em)', width: 'calc(100vw - 15rem)', overflowY: 'scroll' }}>
            {board.map((fila, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'row',borderBottom: '1px solid white' }}>
                <CardsWrapper cartas={fila} cardsNumber={fila.length} accion_Carta={() => console.log('Carta selecionada')}/>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: 'brown', padding: '10px', width: 'calc(100vw - 15rem)', height: '10rem'}}>
            <Row className="mt--2 mr--4">
              <Col xs="3" >
                <Row>
                  <Col>
                    <div className="ml-1">
                      {/* <p className="mb--2" style={{ color: 'white', textAlign: 'center'}} >Mazo</p> */}
                      <Button onClick={() => robarCarta()}
                      className="card-button">
                        <img src={Reverso_carta} alt="..." style={{ width:'100%', height:'90%'}}/>
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    {/* <p className="mb--2" style={{ color: 'white', textAlign: 'center'}} >Descartes</p> */}
                    {mostrarDescartes(descartes, () => {robarDescarte()})}
                  </Col>
                </Row>
              </Col>
              
              <Col xs="9">
                <div style={{ width:'100%', height:'12rem'}}>
                  {mostrarMano(hand)}
                </div>
              </Col>
            </Row>
          </div>
          {/* <button onClick={() => window.location.reload()}>Reload Cards</button> */}
        </div>
      </div>
      <Card className="game-action-bar">
        <Button className="game-action-button" color='primary' onClick={() => {console.log('Boton pulsado'); abrir()}}>Abrir</Button>
        <Button className="game-action-button" color='primary' onClick={() => console.log('Boton pulsado')}>Añadir combinación</Button>
        Combinación
        {() => {
          console.log('NUMCOMBS');
          console.log(numOfCombs);
          {/* for (let i = 0; i <= numOfCombs; i++)
            return <Button className="game-action-button" color='primary' onClick={() => currentComb = {i}}>{i+1}</Button>; */}
        }}
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