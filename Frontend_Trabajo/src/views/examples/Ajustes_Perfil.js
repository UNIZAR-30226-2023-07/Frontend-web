import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    Table,
    Container,
    Row,
    Col,
  } from "reactstrap";

  import React, { useState } from "react"

  import { useHistory } from "react-router-dom";

  import getUser from "hooks/getter/getUser";


  // core components
  //import UserHeader from "components/Headers/UserHeader.js";
  import PepoClown from "../../assets/img/Imgs_7_Reinas/pepoclown.jpg";
  import Slifer from "../../assets/img/Imgs_7_Reinas/Slifer_sky_dragon.png";
  import Bot from "../../assets/img/Imgs_7_Reinas/bot.jpg";
  import Jaime from "../../assets/img/Imgs_7_Reinas/jaime.jpg";
  import Lucia from "../../assets/img/Imgs_7_Reinas/lucia.jpg";
  import Patricia from "../../assets/img/Imgs_7_Reinas/patricia.jpg";
  import Jorge from "../../assets/img/Imgs_7_Reinas/jorge.jpg";
  import Pikachu from "../../assets/img/Imgs_7_Reinas/pikachu.jpg";
  import Mondongo from "../../assets/img/Imgs_7_Reinas/mondongo.jpg";

  
  import SelectImgUser from "hooks/SelectImgUser.js";

  const Ajustes_Perfil = (props) => {
    const history = useHistory();

    let { sessionUser, setSessionUser } = props;

    const [Nombre_U, setNombre_U] = useState(sessionUser.nombre);
    const [Descrp_U, setDescrp_U] = useState(sessionUser.descrp);
    const [Imagen, setImagen] = useState(sessionUser.foto);

    const handleNombre_UChange = event => {
      setNombre_U(event.target.value)
    };

    const handleDescrp_UChange = event => {
      setDescrp_U(event.target.value)
    };


  //Submit al servidor
  const modificar_usuario = () => {
    // alert(`Your state values: 
    //       Imagen: ${Imagen} 
    //       Nombre: ${Nombre_U}
    //       Email: ${sessionUser.correo}
    //       Descrp: ${Descrp_U}
    //       Se ha mandado al servidor la información`);
    
    //Petición http
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
    // update the state of the component with the result here
      //console.log(xhr.responseText)
    })
    
    xhr.onload = function() { //Se dispara cuando se recibe la respuesta del servidor

      const respuesta = JSON.parse(xhr.response);

      if(xhr.status === 202 && respuesta.res === "ok"){ //Si recibe un OK
        getUser(sessionUser.correo, () => {
          setSessionUser(JSON.parse(localStorage.getItem("usuario7reinas")));
          history.push("/admin/perfil_usuario");
        });
        //history.push("/admin/perfil_usuario");
      } else {
        alert(`Se ha producido un error, vuelve a intentarlo`);
      }
    }
    // Abrimos una request de tipo post en nuestro servidor
    xhr.open('POST', 'http://52.174.124.24:3001/api/jugador/mod')
        
    //Mandamos la request con el email y la contraseña
    xhr.send(JSON.stringify({ email: sessionUser.correo, nombre: Nombre_U, foto: Imagen , descp: (Descrp_U==null || Descrp_U=="") ? " " : Descrp_U }));
  };

    return (
      <>
        {/* <Header /> */}
        {/* Page content */}
        <Container className="mt-6" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={SelectImgUser(Imagen)}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                </CardHeader>
                <CardBody className="pt-0 pt-md-5">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-4">
                        <div>
                          <span className="heading">{sessionUser.codigo}</span>
                          <span className="description">Código</span>
                        </div>
                        <div>
                          <span className="heading">{sessionUser.puntos}</span>
                          <span className="description">#Puntos</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-left">
                    <h3>
                      <span className="font-weight-bold">Usuario:</span>
                      <div>
                      <span className="font-weight-light">{sessionUser.nombre}</span>
                      </div>
                    </h3>
                    <h3>
                      <span className="font-weight-bold">Correo:</span>
                      <div>
                      <span className="font-weight-light">{sessionUser.correo}</span>
                      </div>
                    </h3>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Modificar Datos de Perfil</h3>
                </CardHeader>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="5">
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
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="10">
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
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                <Table className="align-items-center table-flush" responsive>
                    <Row className="ml-4">
                      <span className="form-control-label">Imágenes de Usuario</span>
                    </Row>
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
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  // Ajustes_Perfil.propTypes = {
  //   sessionUser: PropTypes.checkPropTypes({
  //     nick: PropTypes.string,
  //     email: PropTypes.string,
  //     codigo: PropTypes.number,
  //     won: PropTypes.number,
  //     lost: PropTypes.number,
  //     picture: PropTypes.number,
  //     descrp: PropTypes.string,
  //     puntos: PropTypes.number
  //   })
  // };
  
  // Ajustes_Perfil.defaultProps = {
  //   sessionUser: {}
  // };

  export default Ajustes_Perfil;
  