import "./../assets/css/cartas_rabino.css";
//import Card from "components/Cartas_Rabino/card.js";
import React, { useEffect } from 'react';
import CardsWrapper from "components/Cartas_Rabino/CardWrapper.js";
import { Container,
  Row,
  Col,
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

import { Link } from "react-router-dom";


import Card from "components/Cartas_Rabino/card.js";

import Reverso_carta from "../assets/img/Imgs_7_Reinas/Reverso_carta.png";

//Cuando el jugador le de a salir de la partida se ejecutará esta función
//FALTA IMPLEMENTARLA
//import GuardarSalir from "hooks/getter/logOut.js";


function App() {
  useEffect(() => {
    // Set the overflow property to hidden on the body element
    document.body.style.overflow = 'hidden';
  }, []);
  const cartas_mano = [
    {
      number: 0, //JOKER
      symbol: 0,
    },
    {
      number: 12, //Q
      symbol: 2,
    },
    {
      number: 11, //J
      symbol: 3,
    },
    {
      number: 13, //K
      symbol: 4,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },
    {
      number: 10, //K
      symbol: 2,
    },

  ];

  const descartes = [
    {
      number: 0, //JOKER
      symbol: 0,
    },
  ];

  const CSelecion= [];

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
  return (
    <div className="App">
      <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{backgroundColor: 'green', height: 'calc(95vh - 15%)',width: '1250px', overflowY: 'scroll' }}>
            {t.map((fila, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'row',borderBottom: '1px solid white' }}>
                <CardsWrapper cartas={fila} cardsNumber={fila.length} />
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: 'brown', padding: '10px', width: '1250px', height: '190px'}}>
            <Row className="mt--2 mr--4">
              <Col xs="3" >
                <Row>
                  <Col>
                    <div className="ml-4">
                      <p className="mb--2 ml-4" style={{ color: 'white'}} >Mazo</p>
                      <Button onClick={() => console.log('Roba una carta')}
                      className="card-button">
                        <img src={Reverso_carta} alt="..." style={{ width:'100%', height:'90%'}}/>
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    <p className="mb--2 ml-4" style={{ color: 'white'}} >Descartes</p>
                    <CardsWrapper cartas={descartes} cardsNumber={descartes.length} />
                  </Col>
                </Row>
              </Col>
              
              <Col xs="9">
                <div style={{ width:'100%', overflowY: 'scroll', height:'180px'}}>
                  <CardsWrapper cartas={cartas_mano} cardsNumber={cartas_mano.length} />
                </div>
              </Col>
            </Row>
          </div>
          {/* <button onClick={() => window.location.reload()}>Reload Cards</button> */}
        </div>
        <div style={{ backgroundColor: 'white', width: '20%', minWidth: '200px' }}>
          <Row>
            <Col>
            <Button color='primary' onClick={() => console.log('Nueva combinacion')}>Nueva combinación</Button>
            </Col>
            <Col>
            <Button color='primary' onClick={() => console.log('Abrir chat')}>Abrir chat</Button>
            </Col>
            {/* <Col> */}
            <Nav className="ml-4" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <Row>
                      <Col>
                      <i className="ni ni-bold-left"/>
                      </Col>
                      <Col className="mt--1 ml--3">
                      <p>Salir</p>
                      </Col>
                    </Row>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" left>
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
            {/* </Col> */}
          </Row>
        </div>
      </div>
    </div>
  );
  
  
}

export default App;