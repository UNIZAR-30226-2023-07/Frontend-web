import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Table,
    Media,
    Badge,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    UncontrolledDropdown,
    DropdownToggle,
    Progress,
    DropdownMenu,
    DropdownItem
  } from "reactstrap";
  import { PropTypes } from "prop-types";
  import React, {useState} from "react"
  import { Link } from "react-router-dom";

  // core components
  //import UserHeader from "components/Headers/UserHeader.js";
  import Header from "components/Headers/Header.js";
  import SelectImgUser from "hooks/SelectImgUser.js";
  import getUserByCode from "hooks/getter/getUserByCode";
  
  const Lobby_Unirse_Partida = (props) => { 
    const json_j_default = '{"Nombre": "Sin jugador", "Foto": 6}';
    const j_default = JSON.parse(json_j_default);

    const { players } = props;

    //const [jugadoresPart, setjugadoresPart] = useState(JSON.parse(localStorage.getItem("juego7reinas_j")));
    const [Jugador1, setJugador1] = useState(JSON.parse(localStorage.getItem("usuario7reinas")));
    const [Jugador2, setJugador2] = useState(j_default);
    const [Jugador3, setJugador3] = useState(j_default);
    const [Jugador4, setJugador4] = useState(j_default);

    const [jugPartida, setjugPartida] = useState(JSON.parse(localStorage.getItem("jugadorxs7reinas"))); //Miramos los jugadores en partida

    const handleJugador1 = jugador => {
      setJugador1(jugador)
    };

    const handleJugador2 = jugador => {
      setJugador2(jugador)
    };

    const handleJugador3 = jugador => {
      setJugador3(jugador)
    };

    const handleJugador4 = jugador => {
      setJugador4(jugador)
    };

    //Actualizamos los jugadores en partida
    // if(jPartida != null && jPartida != []){
    //   jPartida.forEach(function(elemento, indice, array) {
    //     if(indice == 1){
    //       getUserByCode(elemento, Jugador2);
    //     } else if(indice == 2){
    //       getUserByCode(elemento, Jugador3);
    //     } else if(indice == 3){
    //       getUserByCode(elemento, Jugador4);
    //     }
    //   })
    // }

    return (
      <>
        {/* <Header /> */}
        {/* Page content */}
        <Container className="mt-6" fluid>
          <Row>
            <Col className="order-xl-1" xl="11">
              <Card className="bg-secondary shadow ml-7">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Jugadores {JSON.stringify(jugPartida)}</h3>
                </CardHeader>
                <Row className="mt-3 mb-3">
                  <Col  className="ml-4" lg="5">
                      <img
                        alt="..."
                        className="avatar-lg rounded-circle mr-3"
                        src={SelectImgUser(players[0].foto)}
                      />
                      <span className="mt-6">{players[0].nombre}</span>
                  </Col>
                  <Col  className="ml-4" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(players[1].foto)}
                    />
                      <span className="mt-6">{players[1].nombre}</span>
                  </Col>
                  <Col  className="ml-4 mt-3" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(players[2].foto)}
                    />
                    <span className="mt-6">{players[2].nombre}</span>
                  </Col>
                  <Col  className="ml-4 mt-3" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(players[3].foto)}
                    />
                      <span className="mt-6">{players[3].nombre}</span>
                  </Col>
                </Row>
              </Card>
              <Row>
                <Col lg="5"></Col>
                <Col lg="5">
                  <p className="mt-4 ml-4">
                      Esperando inicio de partida...
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  export default Lobby_Unirse_Partida;
  