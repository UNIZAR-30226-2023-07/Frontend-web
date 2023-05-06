import "./../assets/css/cartas_rabino.css";
//import CardR from "components/Cartas_Rabino/card.js";
import React, { useEffect, useState } from 'react';
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

  let openPlay, cardsPerComb, currentComb;
  const [numOfCombs, setNumOfCombs] = useState(0);

  const clearPlay = () => {
    currentComb = 0;
    setNumOfCombs(0);
    openPlay = [];
    for (let i = 0; i < hand.length; i++) {
      openPlay.push({comb:-1, ord:-1});
    }
    cardsPerComb = [0, 0, 0, 0, 0];
  };

  const addCardIntoComb = (card, comb) => {
    openPlay[card].comb = comb;
    openPlay[card].ord = cardsPerComb[comb];
    cardsPerComb[comb]++;
    if (cardsPerComb[comb] === 1) setNumOfCombs(numOfCombs+1);
  };

  const removeCardFromComb = (card) => {
    let itsComb = openPlay[card].comb;
    let itsOrd = openPlay[card].ord;
    cardsPerComb[itsComb]--;
    if (cardsPerComb[itsComb] === 0) {
      setNumOfCombs(numOfCombs-1);
      cardsPerComb.splice(itsComb, 1);
      cardsPerComb.push(0);
      openPlay.forEach(card => { if (card.comb > itsComb) card.comb-- });
    } else openPlay.forEach(card => { if (card.comb === itsComb && card.ord > itsOrd) card.ord-- });
    openPlay[card].comb = -1;
    openPlay[card].ord = -1;
  };

  const handleCardSelect = (card, comb) => {
    if (openPlay[card].comb === -1) {
      addCardIntoComb(card, comb);
    } else if (openPlay[card].comb === comb) {
      removeCardFromComb(card);
    } else {
      removeCardFromComb(card);
      addCardIntoComb(card, comb);
    }
    console.log("Combinaciones");
    console.log(openPlay);
    console.log("Cartas por combinacion");
    console.log(cardsPerComb);
  }

  useEffect(() => {
    clearPlay();
  }, [hand, location]);

  useEffect(() => {
    // Set the overflow property to hidden on the body element
    document.body.style.overflow = 'hidden';
  }, []);

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
    return(<CardsWrapper cartas={hand} cardsNumber={hand.length} classes={"hand-cards"} accion_Carta={(index) => {console.log(`Carta selecionada ${index}`); handleCardSelect(index, currentComb)}}/>);
  }

  const mostrarDescartes = (descartes, robar_Descarte) => {
    if(descartes == null){
      return;
    }
    return(<CardsWrapper cartas={descartes} cardsNumber={descartes.length} accion_Carta={robar_Descarte}/>);
  }

  const robarCarta = () =>{
    wsGame.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Robar_carta"}));
    console.log('Enviar: Roba una carta');
    return;
  }

  const robarDescarte = () =>{
    wsGame.send(JSON.stringify({"emisor":sessionUser.codigo, "tipo":"Robar_carta_descartes"}));
    console.log('Enviar: Robar de descarte');
    return;
  }


  //console.log(players);
  //console.log(board);
  //console.log(hand);

  return (
    <div className="App" style={{overflowY: 'hidden', overflowX: 'hidden'}}>
      <div style={{ height: '75px', backgroundColor: 'white', width: 'calc(100vw - 15rem)', minWidth: '200px', right: '0'}}
          className="mt-0">
            <Row>
              <Col xs="2">
                <Nav className="" navbar>
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
                </Nav>
              </Col>
              <Col xs="1" className="ml--7  mr-5">
                <Button color='primary' className="mt-1" onClick={() => console.log('Nueva combinacion')}>Nueva combinación</Button>
              </Col>
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
      <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{backgroundColor: 'green', height: 'calc(100vh - 21em)', width: 'calc(100vw - 15rem)', overflowY: 'scroll' }}>
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
        <Button className="game-action-button" color='primary' onClick={() => console.log('Boton pulsado')}>Abrir</Button>
        <Button className="game-action-button" color='primary' onClick={() => console.log('Boton pulsado')}>Añadir combinación</Button>
        Combinación
        <Button className="game-action-button" color='primary' onClick={() => currentComb = 0}>1</Button>
        <Button className="game-action-button" color='primary' onClick={() => currentComb = 1}>2</Button>
        <Button className="game-action-button" color='primary' onClick={() => currentComb = 2}>3</Button>
        <Button className="game-action-button" color='primary' onClick={() => currentComb = 3}>4</Button>
        <Button className="game-action-button" color='primary' onClick={() => currentComb = 4}>5</Button>
        {/* {() => {if (numOfCombs>0) return (<Button className="game-action-button" color='primary' onClick={() => currentComb = 1}>2</Button>)}}
        {() => {if (numOfCombs>1) return (<Button className="game-action-button" color='primary' onClick={() => currentComb = 2}>3</Button>)}}
        {() => {if (numOfCombs>2) return (<Button className="game-action-button" color='primary' onClick={() => currentComb = 3}>4</Button>)}}
        {() => {if (numOfCombs>3) return (<Button className="game-action-button" color='primary' onClick={() => currentComb = 4}>5</Button>)}} */}
        <Button className="game-action-button" color='primary' onClick={() => {console.log('Boton pulsado'); clearPlay();}}>Deseleccionar</Button>
      </Card>
    </div>
  );
  
  
}

export default Tablero_Rabino;