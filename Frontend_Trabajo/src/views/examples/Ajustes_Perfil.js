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

  import { BrowserRouter, Route, Switch, Redirect, Link, useHistory} from "react-router-dom";


  // core components
  //import UserHeader from "components/Headers/UserHeader.js";
  import Header from "components/Headers/Header.js";
  import Slifer from "../../assets/img/Imgs_7_Reinas/Slifer_sky_dragon.png";
  import Ficha_R from "../../assets/img/Imgs_7_Reinas/Ficha_de_rabino.png";
  import Juego from "../../assets/img/Imgs_7_Reinas/Fondo_Pantalla_Inicio.png";
  import As_p from "../../assets/img/Imgs_7_Reinas/As_de_picas.png";

  const Ajustes_Perfil = (props) => {
    const num_amigos = 25;
    const puntos = 1500;
    const history = useHistory();

    const [Imagen, setImagen] = useState(props.sessionUser.picture);
    const [Nombre_U, setNombre_U] = useState(props.sessionUser.nick);

    const handleNombre_UChange = event => {
      setNombre_U(event.target.value)
    };

    function modificar_usuario(){
      console.log('Se ejecuta modificar_usuario.')
      props.sessionUser.picture = Imagen;
      props.sessionUser.nick = Nombre_U;

      history.push("/admin/perfil_usuario");
      /*Petición HTTP para enviar datos al servidor*/
    }

    function imagen_usuario(imagen_elegida){
      switch (imagen_elegida) {
        case 1:
          return Slifer;
        
        case 2:
          return Ficha_R;
        
        case 3:
          return Juego;

        default:
          return As_p;
      }
    };

    //Los huecos de modificación
    /*
    <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-nombre_usiario"
                        >
                          Usuario:
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={nombre_usuario}
                          id="input-nombre_usiario"
                          placeholder="Usuario"
                          type="text"
                        />
                      </FormGroup>
    */
   /*
   <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-correo"
                        >
                          Correo:
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={correo_usuario}
                          id="input-correo"
                          placeholder="Correo"
                          type="text"
                        />
                      </FormGroup>
   */

                      /*const navigate = useNavigate();      navigate("/admin/perfil_usuario")
<Redirect from="*" to="/admin/index" />
                  <Link to= "/admin/perfil_usuario"><Button className="my-4 mx-5" as={Link} color="primary" onClick={modificar_usuario()}>
                    Modificar
                  </Button>
                  </Link>
*/

    return (
      <>
        <Header />
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
                          src={imagen_usuario(Imagen)}
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
                          <span className="heading">{num_amigos}</span>
                          <span className="description">Amigos</span>
                        </div>
                        <div>
                          <span className="heading">{puntos}</span>
                          <span className="description">#Puntos</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-left">
                    <h3>
                      <span className="font-weight-bold">Usuario:</span>
                      <div>
                      <span className="font-weight-light">{props.sessionUser.nick}</span>
                      </div>
                    </h3>
                    <h3>
                      <span className="font-weight-bold">Correo:</span>
                      <div>
                      <span className="font-weight-light">{props.sessionUser.email}</span>
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
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Usuario
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={props.sessionUser.nick}
                            id="input-nombre_usiario"
                            placeholder="Usuario"
                            type="text"
                            onChange={handleNombre_UChange}
                            value={Nombre_U}
                          />
                        </FormGroup>
                      </Col>
                  </div>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-normal">
                    <tr>
                      <th scope="col">Slifer Sky Dragon</th>
                      <th scope="col">Ficha de Rabino</th>
                      <th scope="col">Pista de Juego</th>
                      <th scope="col">As de Picas</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>
                        <Row>
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
                        <Row>
                            <img
                              alt="..."
                              className="avatar-lg rounded-circle mr-3"
                              src={Ficha_R}
                            />
                            <div>
                              <Button onClick={() => setImagen(2)}>
                                <i className="ni ni-check-bold" />
                              </Button>
                            </div>
                          </Row>
                      </td>
                      <td>
                        <Row>
                            <img
                              alt="..."
                              className="avatar-lg rounded-circle mr-3"
                              src={Juego}
                            />
                            <div>
                              <Button onClick={() => setImagen(3)}>
                                <i className="ni ni-check-bold" />
                              </Button>
                            </div>
                          </Row>
                      </td>
                      <td>
                        <Row>
                            <img
                              alt="..."
                              className="avatar-lg rounded-circle mr-3"
                              src={As_p}
                            />
                            <div>
                              <Button onClick={() => setImagen(4)}>
                                <i className="ni ni-check-bold" />
                              </Button>
                            </div>
                          </Row>
                      </td>
                    </tr>
                    </tbody>
                </Table>
                
                <Col lg="4" md={{ span: 4, offset: 4 }}>
                  <Button className="my-4 mx-5" color="primary" onClick={() => modificar_usuario()}>
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

  Ajustes_Perfil.propTypes = {
    sessionUser: PropTypes.checkPropTypes({
      nick: PropTypes.string,
      email: PropTypes.string,
      friends: PropTypes.number,
      won: PropTypes.number,
      lost: PropTypes.number,
      picture: PropTypes.number
    })
  };
  
  Ajustes_Perfil.defaultProps = {
    sessionUser: {}
  };

  export default Ajustes_Perfil;
  