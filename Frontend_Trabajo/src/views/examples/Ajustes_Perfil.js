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
  // core components
  //import UserHeader from "components/Headers/UserHeader.js";
  import Header from "components/Headers/Header.js";
  import Slifer from "../../assets/img/Imgs_7_Reinas/Slifer_sky_dragon.png";
  import Ficha_R from "../../assets/img/Imgs_7_Reinas/Ficha_de_rabino.png";
  import Juego from "../../assets/img/Imgs_7_Reinas/Fondo_Pantalla_Inicio.png";
  import As_p from "../../assets/img/Imgs_7_Reinas/As_de_picas.png";
  
  const Ajustes_Perfil = (props) => {
    const { bgColor, routes, sessionUser } = props;
    const victorias = 18; //Esta información se cogería del sevidor
    const derrotas = 32;
    const num_amigos = 25;
    const puntos = 1500;
    const imagen = 1;
    const correo_usuario = "jjones@gmail.com";
    const nombre_usuario = "Jessica Jones";

    function porcentaje_victorias(vic, der){
      return (vic/(vic + der))*100;
    };

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
                          src={imagen_usuario(imagen)}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Ajustar
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
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
                      <span className="font-weight-light">{sessionUser.nick}</span>
                      </div>
                    </h3>
                    <h3>
                      <span className="font-weight-bold">Correo:</span>
                      <div>
                      <span className="font-weight-light">{sessionUser.email}</span>
                      </div>
                    </h3>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Estadísticas del Jugador</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-normal">
                    <tr>
                      <th scope="col">Partidas Ganadas</th>
                      <th scope="col">Partidas Perdidas</th>
                      <th scope="col">Partidas Jugadas</th>
                      <th scope="col">% de Victorias</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>
                        <Media className="align-items-center">
                          <span className="mb-0 text-sm text-sm-center">
                          {sessionUser.won}
                          </span>
                        </Media>
                      </td>
                      <td>
                        <span className="mb-0 text-sm text-sm-center">
                          {sessionUser.lost}
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm text-sm-center">
                          {sessionUser.won + sessionUser.lost}
                        </span>
                      </td>
                      <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{Math.round(porcentaje_victorias(sessionUser.won, sessionUser.lost))}%</span>
                        <div>
                          <Progress
                            max="100"
                            value={porcentaje_victorias(sessionUser.won, sessionUser.lost)}
                            barClassName={Math.round(porcentaje_victorias(sessionUser.won, sessionUser.lost)) < 30 ? "bg-danger" :
                                          Math.round(porcentaje_victorias(sessionUser.won, sessionUser.lost)) < 70 ? "bg-info" : "bg-success"}
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
        </Container>
      </>
    );
  };

  export default Ajustes_Perfil;
  