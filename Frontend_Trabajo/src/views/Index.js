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


const Index = (props) => {
  const history = useHistory();//Permite cambiar de pantalla

  let sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
  const [Clave, setClave] = useState(""); //Guarda el clave de la partida a unirse
  const [ErrorUnirse, setErrorUnirse] = useState(false); //Señala si saca un mensaje de error
  const [ErrorCrear, setErrorCrear] = useState(false); //Señala si saca un mensaje de error

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  //Codigo que tiene la lista de ranking
  const json_r_default = '{ "ranking": [ {"Nombre": "Pedro", "Foto": 5, "P_vict": 34}, {"Nombre": "Javier", "Foto": 1, "P_vict": 35} ] }';
  const r_default = JSON.parse(json_r_default);

  const [ranking_jug, setRanking_jug] = useState(JSON.parse(JSON.stringify(r_default.ranking)));


  const handleClaveChange = event => {
    setClave(event.target.value)
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const crear_partida = () => {
    // alert(`Your state values: 
    //       Codigo: ${sessionUser.codigo} 
    //       Se ha mandado al servidor la información`);
    
    //Petición http
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
    // update the state of the component with the result here
      //console.log(xhr.responseText)
    })
    
    xhr.onload = function() { //Se dispara cuando se recibe la respuesta del servidor

      const respuesta = JSON.parse(xhr.response);
      
      if(xhr.status === 202 || xhr.status === 200){ //Si recibe un OK

        console.log(respuesta);

        localStorage.setItem('code_partida_actual', JSON.stringify(respuesta.clave)); //Guardamos la clave de la partida
        
        history.push("/admin/crear_partida_n");
        
      } else {
        //alert(`No se ha podido crear una partida`);
        setErrorCrear(true);
      }
    }
    // Abrimos una request de tipo post en nuestro servidor
    xhr.open('POST', 'http://52.174.124.24:3001/api/partida/crear')
        
    //Mandamos la request con el email y la contraseña
    xhr.send(JSON.stringify({ tipo: "amistosa", anfitrion: sessionUser.codigo }))
  };

  const unirse_partida = () => {
    // alert(`Your state values: 
    //        Codigo: ${sessionUser.codigo}
    //        Se ha mandado al servidor la información`);
    
    //Petición http
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
    // update the state of the component with the result here
      //console.log(xhr.responseText)
    })
    
    xhr.onload = function() { //Se dispara cuando se recibe la respuesta del servidor
      
      if( (xhr.status === 202 || xhr.status === 200)){ //Si recibe un OK

        const respuesta = JSON.parse(xhr.response);

        if( respuesta.res === "ok"){
          //Mostramos por consola la respuesta recibida del servidor
          console.log(respuesta);

          localStorage.setItem('code_partida_actual', JSON.stringify(respuesta.clave)); //Guardamos la clave de la partida
          
          history.push("/admin/lobby_unirse_partida");
        }
        
      } else {
        //alert(`No se ha podido unir a la partida`);
        setErrorUnirse(true);
      }
    }
    // Abrimos una request de tipo post en nuestro servidor
    xhr.open('POST', 'http://52.174.124.24:3001/api/partida/join')
        
    //Mandamos la request con el email y la contraseña
    xhr.send(JSON.stringify({ codigo: sessionUser.codigo, clave: Clave }))
  };


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
              <span className="h3">{prop.P_vict}%</span>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {/* <Header /> */}
      {/* Page content */}



      <>
      <div className="pt-md-5">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col xs="5">
                  <Card className="card-stats mb-4 mb-xl-0 ml-5">
                    <div className="col">
                        <CardTitle
                          tag="h5"
                          className="h2 font-weight-bold align-center mb-0"
                        >
                          Unirse a partida
                        </CardTitle>
                      </div>
                    <CardBody className="mt--1 mb--3">
                      <Row>
                        <Col xs="9">
                          <FormGroup>
                              <Input
                                className="form-control-alternative"
                                id="input-nombre_usiario"
                                placeholder="#clave de partida"
                                type="text"
                                onChange={handleClaveChange}
                                value={Clave}
                              />
                          </FormGroup>
                        </Col>
                        <Col xs="2" className="ml--6">
                          <Button variant="primary" color="primary" className="ml-5"  onClick={unirse_partida}>
                            Unirse
                          </Button>
                        </Col>
                      </Row>
                      {ErrorUnirse && <p className="red mb--1 mt--4"> Error al unirse</p>}
                    </CardBody>
                  </Card>
              </Col>
              <Col xs="6">
                <Card className="card-stats mb-4 mb-xl-0 ml-3">
                    <div className="col">
                        <CardTitle
                          tag="h5"
                          className="h2 font-weight-bold align-center mb-0"
                        >
                          Crear Partida
                        </CardTitle>
                      </div>
                    <CardBody className="mt--2">
                      <Row>
                      <Col xs="6">
                        <Button className="ml-4" color="primary" onClick={crear_partida}>
                          Partida Normal
                        </Button>
                      </Col>
                      <Col xs="6">
                        <Button className="ml-3" color="primary" onClick={crear_partida}>
                          Partida Clasificatoria
                        </Button>
                      </Col>

                      </Row>
                      {ErrorCrear && <p className="red ml-9 mb--3"> Error al crear una partida</p>}
                      
                    </CardBody>
                  </Card>
              </Col>

              <div className="mb-8"></div>
              
              <Col className="order-xl-1 ml-4" xl="11">
              <Card className="bg-secondary shadow" style={{height: '400px', overflowY: 'scroll', overflowX: 'hidden'}} >
                <CardHeader className="border-0">
                  <Row>
                    <Col>
                      <h3 className="mb-0">Torneo</h3>
                    </Col>
                    <Col>
                      <h3 className="mb-0">Ranking</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <Row>
                  <Col>
                    <Table className="align-items-center table-flush" responsive>
                        <tbody>
                        <tr>
                          <td>
                            <Media className="align-items-center">
                              <span className="mb-0 text-sm text-sm-center">
                              {"Patida 1"}
                              </span>
                            </Media>
                          </td>
                        </tr>
                        </tbody>
                    </Table>
                  </Col>
                
                  <Col>
                    <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Puesto</th>
                        <th scope="col">Foto de Perfil</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">% de Victorias</th>
                        <th scope="col" />
                      </tr>
                    </thead>

                      <tbody>
                        {showRanking_jug()}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card>
              <div className="mb-5"></div>
            </Col>

            </Row>
          </div>
        </Container>
      </div>
    </>





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
