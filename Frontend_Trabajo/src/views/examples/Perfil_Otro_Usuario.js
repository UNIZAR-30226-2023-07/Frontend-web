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
  import { Link, useParams } from "react-router-dom";

  // core components
  //import UserHeader from "components/Headers/UserHeader.js";
  import Header from "components/Headers/Header.js";
  import SelectImgUser from "hooks/SelectImgUser.js";

  import getUserByCode from "hooks/getter/getUserByCode";
  
  const Perfil_Otro_Usuario = (props) => {

    const params = useParams();
    console.log(params.id);
    let user = getUserByCode(params.id);

    console.log(user);

    function porcentaje_victorias(vic, der){
      return (vic/(vic + der))*100;
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
                          src={SelectImgUser(user.foto)}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                {/* <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Link to= "/admin/ajustes_perfil"><Button as={Link} variant="primary" className="mr-4" color="info" size="sm">
                      Ajustar
                    </Button>
                    </Link>
                  </div>
                </CardHeader> */}
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-4">
                        <div>
                          <span className="heading">{user.codigo}</span>
                          <span className="description">Código</span>
                        </div>
                        <div>
                          <span className="heading">{user.puntos}</span>
                          <span className="description">#Puntos</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-left">
                    <h3>
                      <span className="font-weight-bold">Usuario:</span>
                      <div>
                      <span className="font-weight-light">{user.nombre}</span>
                      </div>
                    </h3>
                    <h3>
                      <span className="font-weight-bold">Correo:</span>
                      <div>
                      <span className="font-weight-light">{user.correo}</span>
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
                          {user.pganadas}
                          </span>
                        </Media>
                      </td>
                      <td>
                        <span className="mb-0 text-sm text-sm-center">
                          {user.pperdidas}
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm text-sm-center">
                          {user.pjugadas}
                        </span>
                      </td>
                      <td>
                      <div className="d-flex align-items-center">
                      <span className="mr-2">{user.pjugadas > 0 ? Math.round(porcentaje_victorias(user.pganadas, user.pperdidas)) : 50}%</span>
                        <div>
                          <Progress
                            max="100"
                            value={porcentaje_victorias(user.ppganadas, user.pperdidas)}
                            barClassName={Math.round(porcentaje_victorias(user.ppganadas, user.pperdidas)) < 10 ? "percent10" :
                                          Math.round(porcentaje_victorias(user.ppganadas, user.pperdidas)) < 30 ? "percent30" :
                                          Math.round(porcentaje_victorias(user.ppganadas, user.pperdidas)) < 50 ? "percent50" :
                                          Math.round(porcentaje_victorias(user.ppganadas, user.pperdidas)) < 70 ? "percent70" :
                                          Math.round(porcentaje_victorias(user.ppganadas, user.pperdidas)) < 90 ? "percent90" : "percent100"}
                          />
                        </div>
                      </div>
                      </td>
                    </tr>
                    </tbody>
                </Table>
              </Card>
              <div className="mb-5"></div>
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Descripción</h3>
                </CardHeader>
                <div className="text-left ml-4">
                    <h3>
                      <span className="font-weight-light">{user.descrp}</span>
                    </h3>
                  </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  export default Perfil_Otro_Usuario;
  