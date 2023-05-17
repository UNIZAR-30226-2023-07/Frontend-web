import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Table,
  Container,
  Row,
  Col,
  Progress
} from "reactstrap";

import React, { useState } from "react"

import { useHistory } from "react-router-dom";

import getUser from "hooks/getter/getUser";


// core components
//import UserHeader from "components/Headers/UserHeader.js";
import PepoClown from "../assets/img/Imgs_7_Reinas/pepoclown.jpg";
import Slifer from "../assets/img/Imgs_7_Reinas/Slifer_sky_dragon.png";
import Bot from "../assets/img/Imgs_7_Reinas/bot.jpg";
import Jaime from "../assets/img/Imgs_7_Reinas/jaime.jpg";
import Lucia from "../assets/img/Imgs_7_Reinas/lucia.jpg";
import Patricia from "../assets/img/Imgs_7_Reinas/patricia.jpg";
import Jorge from "../assets/img/Imgs_7_Reinas/jorge.jpg";
import Pikachu from "../assets/img/Imgs_7_Reinas/pikachu.jpg";
import Mondongo from "../assets/img/Imgs_7_Reinas/mondongo.jpg";


import SelectImgUser from "hooks/SelectImgUser.js";
import deleteAccount from "hooks/setter/deleteAccount";

const Settings = (props) => {
  const history = useHistory();

  let { sessionUser, setSessionUser } = props;

  const [Nombre_U, setNombre_U] = useState(sessionUser.nombre);
  const [Descrp_U, setDescrp_U] = useState(sessionUser.descrp);
  const [Passwd_U, setPasswd_U] = useState("");
  const [Imagen, setImagen] = useState(sessionUser.foto);

  const handleNombre_UChange = event => {
    setNombre_U(event.target.value)
  };

  const handleDescrp_UChange = event => {
    setDescrp_U(event.target.value)
  };

  const handlePasswd_UChange = event => {
    setPasswd_U(event.target.value)
  };

//Submit al servidor
const modificar_usuario = () => {
  //Petición http
  var xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {})
  
  xhr.onload = function() {

    const respuesta = JSON.parse(xhr.response);

    if(xhr.status === 202 && respuesta.res === "ok"){ //Si recibe un OK
      getUser(sessionUser.correo, () => {
        setSessionUser(JSON.parse(sessionStorage.getItem("usuario7reinas")));
        history.push("/user/profile");
      });
    } else {
      alert(`Se ha producido un error modificando el usuario.`);
    }
  }
  xhr.open('POST', 'http://20.160.173.253:3001/api/jugador/mod')
  xhr.send(JSON.stringify({ email: sessionUser.correo, nombre: Nombre_U, foto: Imagen , descp: (Descrp_U==null || Descrp_U==="") ? " " : Descrp_U }));
};

function porcentaje_victorias(vic, der){
  return ((vic*1.0)/(vic + der))*100;
};

  return (
    <>
      <Container className="mt-5 p-5" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow rounded-card">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={SelectImgUser(sessionUser.foto)}
                      />
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4">
                <Row className="mt-8 d-flex justify-content-center">
                  <h1 className="font-weight-bolder">
                    {sessionUser.nombre}
                  </h1>
                </Row>
                <Row className="d-flex justify-content-center">
                  <h2 className="font-weight-normal">
                    {sessionUser.codigo} · {sessionUser.puntos} puntos
                  </h2>
                </Row>
                {sessionUser.descrp === "" || sessionUser.descrp === " " || sessionUser.descrp === null ? null :
                  <Row className="d-flex justify-content-center align-center">
                    <h3 className="font-weight-normal px-4">
                      {sessionUser.descrp}
                    </h3>
                  </Row>
                }
                <Row className="d-flex justify-content-center">
                  <h3 className="font-weight-light">
                    {sessionUser.correo}
                  </h3>
                </Row>
                <Row className="d-flex card-profile-stats py-0 justify-content-center">
                  <div>
                    <span className="heading">{sessionUser.pjugadas}</span>
                    <span className="description">Jugadas</span>
                  </div>
                  <div>
                    <span className="heading">{sessionUser.pganadas}</span>
                    <span className="description">Ganadas</span>
                  </div>
                  <div>
                    <span className="heading">{sessionUser.pperdidas}</span>
                    <span className="description">Perdidas</span>
                  </div>
                </Row>
                <Row className="d-flex align-items-center justify-content-center">
                  <span className="mr-2">{sessionUser.pjugadas > 0 ? Math.round(porcentaje_victorias(sessionUser.pganadas, sessionUser.pperdidas)) : 50}%</span>
                  <Progress
                    max="100"
                    value={porcentaje_victorias(sessionUser.pganadas, sessionUser.pperdidas)}
                    style={{width: "15vw"}}
                    className="mb-0"
                    barClassName={Math.round(porcentaje_victorias(sessionUser.pganadas, sessionUser.pperdidas)) < 10 ? "percent10" :
                                  Math.round(porcentaje_victorias(sessionUser.pganadas, sessionUser.pperdidas)) < 30 ? "percent30" :
                                  Math.round(porcentaje_victorias(sessionUser.pganadas, sessionUser.pperdidas)) < 50 ? "percent50" :
                                  Math.round(porcentaje_victorias(sessionUser.pganadas, sessionUser.pperdidas)) < 70 ? "percent70" :
                                  Math.round(porcentaje_victorias(sessionUser.pganadas, sessionUser.pperdidas)) < 90 ? "percent90" : "percent100"}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow rounded-card mb-4">
              <CardTitle
                tag="h5"
                className="h2 font-weight-bolder justify-content-center mb-0 mt-2 d-flex overflow-hidden"
                style={{textOverflow:"ellipsis", whiteSpace:"nowrap"}}
                >
                  Modificar perfil
              </CardTitle>
                <div className="px-4">
                  <Row>
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Usuario
                        </label>
                        <Input
                          className="form-control-alternative"
                          // defaultValue={sessionUser.nombre}
                          id="input-nombre_usiario"
                          placeholder="Usuario"
                          type="text"
                          onChange={handleNombre_UChange}
                          value={Nombre_U}
                          maxLength="20"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-descrip"
                        >
                          Descripción
                        </label>
                        <Input
                          className="form-control-alternative"
                          // defaultValue={sessionUser.descrp}
                          id="input-descrip"
                          placeholder="Descripción"
                          type="text"
                          onChange={handleDescrp_UChange}
                          value={Descrp_U}
                          maxLength="280"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <span
                    className="form-control-label"
                    style={{width:"15rem"}}>
                      Imágenes de Usuario
                  </span>
                </div>
              <Table className="align-items-center table-flush" responsive>
                  <tbody>
                  <tr>
                    <td>
                      <Row className="ml--4">
                        <img
                          alt="..."
                          className="ml-4 avatar-lg rounded-circle mr-3"
                          src={PepoClown}
                        />
                        <div className="ml-4">
                          <Button onClick={() => setImagen(0)}>
                            <i className="ni ni-check-bold" />
                          </Button>
                        </div>
                      </Row>
                    </td>
                    <td>
                      <Row className="ml--4">
                        <img
                          alt="..."
                          className="avatar-lg rounded-circle mr-3"
                          src={Slifer}
                        />
                        <div>
                          <Button onClick={() => setImagen(1)}>
                            <i className="ni ni-check-bold" />
                          </Button>
                        </div>
                      </Row>
                    </td>
                    <td>
                      <Row className="ml--4">
                          <img
                            alt="..."
                            className="avatar-lg rounded-circle mr-3"
                            src={Bot}
                          />
                          <div>
                            <Button onClick={() => setImagen(2)}>
                              <i className="ni ni-check-bold" />
                            </Button>
                          </div>
                        </Row>
                    </td>
                    <td>
                      <Row className="ml--4">
                          <img
                            alt="..."
                            className="avatar-lg rounded-circle mr-3"
                            src={Jaime}
                          />
                          <div>
                            <Button onClick={() => setImagen(3)}>
                              <i className="ni ni-check-bold" />
                            </Button>
                          </div>
                        </Row>
                    </td>
                    <td>
                      <Row className="ml--4">
                          <img
                            alt="..."
                            className="avatar-lg rounded-circle mr-3"
                            src={Lucia}
                          />
                          <div>
                            <Button onClick={() => setImagen(4)}>
                              <i className="ni ni-check-bold" />
                            </Button>
                          </div>
                        </Row>
                    </td>
                    <td>
                      <Row className="ml--4">
                          <img
                            alt="..."
                            className="avatar-lg rounded-circle mr-3"
                            src={Patricia}
                          />
                          <div>
                            <Button onClick={() => setImagen(5)}>
                              <i className="ni ni-check-bold" />
                            </Button>
                          </div>
                        </Row>
                    </td>
                    <td>
                      <Row className="ml--4">
                          <img
                            alt="..."
                            className="avatar-lg rounded-circle mr-3"
                            src={Jorge}
                          />
                          <div>
                            <Button onClick={() => setImagen(6)}>
                              <i className="ni ni-check-bold" />
                            </Button>
                          </div>
                        </Row>
                    </td>
                    <td>
                      <Row className="ml--4">
                          <img
                            alt="..."
                            className="avatar-lg rounded-circle mr-3"
                            src={Pikachu}
                          />
                          <div>
                            <Button onClick={() => setImagen(7)}>
                              <i className="ni ni-check-bold" />
                            </Button>
                          </div>
                        </Row>
                    </td>
                    <td>
                      <Row className="ml--4">
                          <img
                            alt="..."
                            className="avatar-lg rounded-circle mr-3"
                            src={Mondongo}
                          />
                          <div>
                            <Button onClick={() => setImagen(8)}>
                              <i className="ni ni-check-bold" />
                            </Button>
                          </div>
                        </Row>
                    </td>
                  </tr>
                  </tbody>
              </Table>
              <Col lg="4" md={{ span: 4, offset: 4 }}>
                <Button className="my-4 mx-5" color="primary" onClick={modificar_usuario}>
                  Modificar
                </Button>
              </Col>
            </Card>
            <Card className="bg-secondary shadow rounded-card">
              <CardTitle
                tag="h5"
                className="h2 font-weight-bolder justify-content-center mb-0 mt-2 d-flex overflow-hidden"
                style={{textOverflow:"ellipsis", whiteSpace:"nowrap"}}
                >
                  Eliminar cuenta
              </CardTitle>
                <h4 className="align-center">¡Cuidado! Esta acción es irreversible.</h4>
                <div className="px-8 pt-3">
                  <Row>
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Introduce de nuevo tu contraseña
                        </label>
                        <Input
                          className="form-control-alternative"
                          // defaultValue={sessionUser.nombre}
                          id="input-contrasenya"
                          placeholder="Contraseña"
                          type="password"
                          onChange={handlePasswd_UChange}
                          value={Passwd_U}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              
              <Col className="d-flex justify-content-center">
                <Button className="mb-4 mx-5 bg-red" style={{border:"none"}} color="primary" onClick={() => {
                  deleteAccount(sessionUser.codigo, sessionUser.correo, Passwd_U, () => {
                    history.push("/");
                  });
                }}>
                  Borrar cuenta
                </Button>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Settings;