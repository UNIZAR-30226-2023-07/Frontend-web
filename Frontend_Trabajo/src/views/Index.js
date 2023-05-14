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

  let sessionUser = JSON.parse(localStorage.getItem("usuario7reinas"));
  const [Clave, setClave] = useState(""); //Guarda el clave de la partida a unirse
  const [ErrorUnirse, setErrorUnirse] = useState(false); //Señala si saca un mensaje de error
  const [ErrorCrear, setErrorCrear] = useState(false); //Señala si saca un mensaje de error

  //Codigo que tiene la lista de ranking

  //const json_r_default = '{ "ranking": [ {"Nombre": "Pedro", "Foto": 5, "P_vict": 34}, {"Nombre": "Javier", "Foto": 1, "P_vict": 35} ] }';
  //const r_default = JSON.parse(json_r_default);
  //const [ranking_jug, setRanking_jug] = useState(JSON.parse(JSON.stringify(r_default.ranking)));
  const [ranking_jug, setRanking_jug] = useState(JSON.parse(localStorage.getItem("amigxs7reinas")));
  const [part_pausadas, setPart_pausadas] = useState(JSON.parse(localStorage.getItem("part_pausadas7reinas")));

  let { setGame, setPlayers, setIsTournament, setAreWeResuming } = props;

  const updateRanking = () => {
    setRanking_jug(JSON.parse(localStorage.getItem("amigxs7reinas")));
  }

  const updatePart_Pausadas = () => {
    setPart_pausadas(JSON.parse(localStorage.getItem("part_pausadas7reinas")));
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
            <span className="h3">{prop.Tipo == "amistosa"? "Partida": "Torneo"} de {prop.Creador}</span>
          </td>
          <td>
              <span className="h3">{prop.Clave}</span>
          </td>
          <td>
            <Button variant="primary" color="primary" className="ml-5" onClick={() => {
              joinGame(sessionUser, prop.Clave,
                () => {
                  localStorage.setItem("reanudada7reinas", JSON.stringify(true));
                  setAreWeResuming(true);
                  setGame(localStorage.getItem("juego7reinas"));
                  setIsTournament(prop.Tipo == "Torneo");
                  setPlayers(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
                  history.push("/admin/gamelobby");
                },
                () => setErrorUnirse(true),
                prop.Creador == sessionUser.codigo, false
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
        <Card className="start-join-game start-card">
          <CardTitle
            tag="h5"
            className="h2 font-weight-bold align-center mb-0 mt-2"
            >
            Unirse a partida
          </CardTitle>
          <CardBody className="p-2 px-4">
            <Form role="form" onSubmit={(event) => {
              event.preventDefault();
              joinGame(sessionUser, Clave,
                  () => {
                    localStorage.setItem("reanudada7reinas", JSON.stringify(false));
                    setAreWeResuming(false);
                    setGame(localStorage.getItem("juego7reinas"));
                    setIsTournament(JSON.parse(localStorage.getItem("es_torneo7reinas")));
                    setPlayers(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
                    history.push("/admin/gamelobby");
                  },
                  () => setErrorUnirse(true),
                  false, true
            )}}>
              <FormGroup className="d-flex flex-row-reverse">
                <Button variant="primary" color="primary" className="m-0">
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
        <Card className="start-create-game start-card">
          <CardTitle
            tag="h5"
            className="h2 font-weight-bold align-center mb-0 mt-2"
            >
              Crear Partida
          </CardTitle>
          <CardBody className="p-2 px-4">
            <div className="d-flex justify-content-center">
              <Button color="primary"
                className="" onClick={() => {
                createGame(sessionUser, "amistosa",
                  () => {
                    localStorage.setItem("reanudada7reinas", JSON.stringify(false));
                    setAreWeResuming(false);
                    setGame(localStorage.getItem("juego7reinas"));
                    setIsTournament(false);
                    setPlayers(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
                    history.push("/admin/gamelobby")
                  },
                  () => setErrorCrear(true)
              )}}>
                Partida Normal
              </Button>
              <Button color="primary"
                className="" onClick={() => {
                createGame(sessionUser, "torneo",
                  () => {
                    localStorage.setItem("reanudada7reinas", JSON.stringify(false));
                    setAreWeResuming(false);
                    setGame(localStorage.getItem("juego7reinas"));
                    setIsTournament(true);
                    setPlayers(JSON.parse(localStorage.getItem("jugadorxs7reinas")));
                    history.push("/admin/gamelobby")
                  },
                  () => setErrorCrear(true)
              )}}>
                Partida Clasificatoria
              </Button>
            </div>
            {ErrorCrear && <p className="text-red mb--1 align-center"> Error al crear una partida</p>}
          </CardBody>
        </Card>
      </Container>
      <Container className="d-flex px-5 pb-5 m-0">
        <Card className="bg-secondary shadow start-card mx-0" style={{width:'100%', height: '25rem', overflowY: 'scroll', overflowX: 'hidden'}} >
          <CardHeader className="border-0">
            <Row>
              <Col style={{width:"50%"}}>
                <h3 className="mb-0">Partidas Pausadas</h3>
              </Col>
              <Col style={{width:"50%"}}>
                <h3 className="mb-0">Ranking</h3>
              </Col>
            </Row>
          </CardHeader>
          <Row>
            <Col style={{width:"50%"}}>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Clave</th>
                    <th scope="col" />
                  </tr>
                </thead>

                <tbody>
                  {showPart_Pausadas()}
                </tbody>
              </Table>
            </Col>
            <Col>
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
            </Col>
          </Row>
        </Card>
      </Container>





      {/* <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            hola
          </Col>
        </Row> */}


      {/* </Container> */}
      {/* <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody> */}
                {/* Chart */}
                {/* <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody> */}
                {/* Chart */}
                {/* <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default Index;
