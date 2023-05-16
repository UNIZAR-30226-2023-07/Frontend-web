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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Media
} from "reactstrap";

import "assets/css/user-styles.css";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import { Link, useHistory } from "react-router-dom";

import Header from "components/Headers/Header.js";
import SelectImgUser from "hooks/SelectImgUser.js";
import createGame from "hooks/setter/createGame";
import joinGame from "hooks/setter/joinGame";


const Index = (props) => {
  const history = useHistory();//Permite cambiar de pantalla

  let sessionUser = JSON.parse(sessionStorage.getItem("usuario7reinas"));
  const [Clave, setClave] = useState(""); //Guarda el clave de la partida a unirse
  const [ErrorUnirse, setErrorUnirse] = useState(false); //Señala si saca un mensaje de error
  const [ErrorCrear, setErrorCrear] = useState(false); //Señala si saca un mensaje de error

  //Codigo que tiene la lista de ranking

  //const json_r_default = '{ "ranking": [ {"Nombre": "Pedro", "Foto": 5, "P_vict": 34}, {"Nombre": "Javier", "Foto": 1, "P_vict": 35} ] }';
  //const r_default = JSON.parse(json_r_default);
  //const [ranking_jug, setRanking_jug] = useState(JSON.parse(JSON.stringify(r_default.ranking)));
  const [ranking_jug, setRanking_jug] = useState(JSON.parse(sessionStorage.getItem("amigxs7reinas")));
  const [part_pausadas, setPart_pausadas] = useState(JSON.parse(sessionStorage.getItem("part_pausadas7reinas")));

  let { setGame, setPlayers, setIsTournament, setAreWeResuming, setHand } = props;

  const updateRanking = () => {
    setRanking_jug(JSON.parse(sessionStorage.getItem("amigxs7reinas")));
  }

  const updatePart_Pausadas = () => {
    setPart_pausadas(JSON.parse(sessionStorage.getItem("part_pausadas7reinas")));
  }

  const handleClaveChange = event => {
    setClave(event.target.value)
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  //Función para mostrar el ranking
  const showRanking_jug = () => {
    if (ranking_jug == null) {
      return;
    }
    return ranking_jug.map((prop, key) => {
      return (
        <tr key={key}>
          <td>
              <span className="h1">{key+1+"º"}</span>
          </td>
          <td>
            <img
            alt="..."
            className="avatar-lg rounded-circle mr-3"
            src={SelectImgUser(prop.Foto)}
            />
          </td>
          <td>
              <span className="h3">{prop.Nombre}</span>
          </td>
          <td>
              <span className="h3">{prop.Puntos}</span>
          </td>
        </tr>
      );
    });
  };

  //Función para mostrar las partidas pausadas
  const showPart_Pausadas = () => {
    if (part_pausadas == null) {
      return;
    }
    return part_pausadas.map((prop, key) => {
      return (
        <tr key={key}>
          <td>
            <span className="h3">{prop.Tipo === "amistosa"? "Partida": "Torneo"} de {prop.Creador}</span>
          </td>
          <td>
              <span className="h3">{prop.Clave}</span>
          </td>
          <td style={{padding:0}}>
            <Button variant="primary" color="primary" className="ml-5" onClick={() => {
              joinGame(sessionUser, prop.Clave,
                () => {
                  sessionStorage.setItem("reanudada7reinas", JSON.stringify(true));
                  setAreWeResuming(true);
                  setGame(sessionStorage.getItem("juego7reinas"));
                  setIsTournament(prop.Tipo === "Torneo");
                  sessionStorage.setItem("es_torneo7reinas", JSON.stringify(prop.Tipo === "Torneo"));
                  setPlayers(JSON.parse(sessionStorage.getItem("jugadorxs7reinas")));
                  setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]);
                  history.push("/admin/gamelobby");
                },
                () => setErrorUnirse(true),
                prop.Creador === sessionUser.codigo, false
            )}}>
              Unirse
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Container fluid className="d-flex px-5 pt-5 pb-4 m-0">
        <Card className="start-join-game rounded-card">
          <CardTitle
            tag="h5"
            className="h2 font-weight-bolder justify-content-center mb-0 mt-2 d-flex overflow-hidden"
            style={{textOverflow:"ellipsis", whiteSpace:"nowrap"}}
            >
            Unirse a partida
          </CardTitle>
          <CardBody className="p-2 px-4">
            <Form role="form" onSubmit={(event) => {
              event.preventDefault();
              joinGame(sessionUser, Clave,
                  () => {
                    sessionStorage.setItem("reanudada7reinas", JSON.stringify(false));
                    setAreWeResuming(false);
                    setGame(sessionStorage.getItem("juego7reinas"));
                    setIsTournament(JSON.parse(sessionStorage.getItem("es_torneo7reinas")));
                    setPlayers(JSON.parse(sessionStorage.getItem("jugadorxs7reinas")));
                    setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]);
                    history.push("/admin/gamelobby");
                  },
                  () => setErrorUnirse(true),
                  false, true
            )}}>
              <FormGroup className="d-flex flex-row-reverse justify-content-center">
                <Button variant="primary" color="primary" className="m-0 d-flex justify-content-center"
                  style={{width:"30%", minWidth:"5rem", textOverflow:"ellipsis"}}>
                  Unirse
                </Button>
                <Input
                  className="form-control-alternative mr-2"
                  id="input-nombre_usiario"
                  placeholder="Clave"
                  type="text"
                  onChange={handleClaveChange}
                  value={Clave}
                />
              </FormGroup>
            </Form>
            {ErrorUnirse && <p className="text-red mb--1 align-center"> Error al unirse</p>}
          </CardBody>
        </Card>
        <Card className="start-create-game rounded-card">
          <CardTitle
            tag="h5"
            className="h2 font-weight-bolder justify-content-center mb-0 mt-2 d-flex overflow-hidden"
            style={{textOverflow:"ellipsis", whiteSpace:"nowrap"}}
            >
              Crear Partida
          </CardTitle>
          <CardBody className="p-2 px-4">
            <div className="d-flex justify-content-center">
              <Button color="primary" className="d-flex justify-content-end"
                style={{minWidth:"4rem", whiteSpace:"nowrap", textOverflow:"ellipsis"}}
                onClick={() => {
                  createGame(sessionUser, "amistosa",
                    () => {
                      sessionStorage.setItem("reanudada7reinas", JSON.stringify(false));
                      setAreWeResuming(false);
                      setGame(sessionStorage.getItem("juego7reinas"));
                      setIsTournament(false);
                      setPlayers(JSON.parse(sessionStorage.getItem("jugadorxs7reinas")));
                      setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]);
                      history.push("/admin/gamelobby")
                    },
                    () => setErrorCrear(true)
              )}}>
                <span className="d-flex justify-content-end overflow-hidden w-100">Partida Normal</span>
              </Button>
              <Button color="primary" className="d-flex justify-content-end"
                style={{minWidth:"4rem", whiteSpace:"nowrap", textOverflow:"ellipsis"}}
                onClick={() => {
                  createGame(sessionUser, "torneo",
                    () => {
                      sessionStorage.setItem("reanudada7reinas", JSON.stringify(false));
                      setAreWeResuming(false);
                      setGame(sessionStorage.getItem("juego7reinas"));
                      setIsTournament(true);
                      setPlayers(JSON.parse(sessionStorage.getItem("jugadorxs7reinas")));
                      setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]);
                      history.push("/admin/gamelobby")
                    },
                    () => setErrorCrear(true)
              )}}>
                <span className="d-flex justify-content-end overflow-hidden w-100">Partida Clasificatoria</span>
              </Button>
            </div>
            {ErrorCrear && <p className="text-red mb--1 align-center"> Error al crear una partida</p>}
          </CardBody>
        </Card>
      </Container>
      <Container className="d-flex px-5 pb-5 m-0 paused-games">
        <Card className="bg-secondary shadow rounded-card mx-0 paused-games-card" >
          <CardTitle
            tag="h5"
            className="h2 font-weight-bolder justify-content-center mb-0 mt-2 d-flex overflow-hidden"
            style={{textOverflow:"ellipsis", whiteSpace:"nowrap"}}
            >
              Partidas Pausadas
          </CardTitle>
          {/* <CardHeader className="border-0"> */}
            {/* <Row>
              <Col style={{width:"50%"}}> */}
                {/* <h3 className="mb-0">Partidas Pausadas</h3> */}
              {/* </Col>
              <Col style={{width:"50%"}}>
                <h3 className="mb-0">Ranking</h3>
              </Col>
            </Row> */}
          {/* </CardHeader> */}
          {/* <Row>
            <Col style={{width:"50%"}}> */}
              <Table className="align-items-center table-flush" responsive>
                {/* <thead className="thead-light">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Clave</th>
                    <th scope="col" />
                  </tr>
                </thead> */}

                <tbody>
                  {showPart_Pausadas()}
                </tbody>
              </Table>
            {/* </Col> */}
            {/* <Col>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="px-1">Puesto</th>
                    <th scope="col" className="px-1">Foto de Perfil</th>
                    <th scope="col" className="px-1">Nombre</th>
                    <th scope="col" className="px-1">Puntos</th>
                    <th scope="col" className="px-1" />
                  </tr>
                </thead>

                <tbody>
                  {showRanking_jug()}
                </tbody>
              </Table>
            </Col> */}
          {/* </Row> */}
        </Card>
      </Container>
    </>
  );
};

export default Index;
