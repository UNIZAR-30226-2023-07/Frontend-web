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
  
  const Lobby_Unirse_Partida = (props) => { 
    const json_j_default = '{"Nombre": "Sin jugador", "Foto": 6}';
    const j_default = JSON.parse(json_j_default);

    const [Jugador1, setJugador1] = useState(j_default);
    const [Jugador2, setJugador2] = useState(j_default);
    const [Jugador3, setJugador3] = useState(j_default);
    const [Jugador4, setJugador4] = useState(j_default);

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

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt-6" fluid>
          <Row>
            <Col className="order-xl-1" xl="11">
              <Card className="bg-secondary shadow ml-7">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Jugadores</h3>
                </CardHeader>
                <Row className="mt-3 mb-3">
                  <Col  className="ml-4" lg="5">
                      <img
                        alt="..."
                        className="avatar-lg rounded-circle mr-3"
                        src={SelectImgUser(Jugador1.Foto)}
                      />
                      <span className="mt-6">{Jugador1.Nombre}</span>
                  </Col>
                  <Col  className="ml-4" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(Jugador2.Foto)}
                    />
                      <span className="mt-6">{Jugador2.Nombre}</span>
                  </Col>
                  <Col  className="ml-4 mt-3" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(Jugador3.Foto)}
                    />
                    <span className="mt-6">{Jugador3.Nombre}</span>
                  </Col>
                  <Col  className="ml-4 mt-3" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(Jugador4.Foto)}
                    />
                      <span className="mt-6">{Jugador4.Nombre}</span>
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
  