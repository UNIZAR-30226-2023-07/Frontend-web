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
  import { Link } from "react-router-dom";

  // core components
  //import UserHeader from "components/Headers/UserHeader.js";
  import Header from "components/Headers/Header.js";
  import SelectImgUser from "hooks/SelectImgUser.js";
  
  const Perfil_Usuario = (props) => {
    let sessionUser = JSON.parse (localStorage.getItem("sessionUser"));

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
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                    <h3 className="mb-0">Jugadores</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                    <tbody>
                    <tr>
                      <td>
                        <Media className="align-items-center">
                          <span className="mb-0 text-sm text-sm-center">
                          {sessionUser.pganadas}
                          </span>
                        </Media>
                      </td>
                      <td>
                        <span className="mb-0 text-sm text-sm-center">
                          {sessionUser.pperdidas}
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm text-sm-center">
                          {sessionUser.pjugadas}
                        </span>
                      </td>
                      <td>
                      <div className="d-flex align-items-center">
                      <span className="mr-2">{sessionUser.pjugadas > 0 ? Math.round(porcentaje_victorias(sessionUser.pganadas, sessionUser.pperdidas)) : 50}%</span>
                        <div>
                          <Progress
                            max="100"
                            value={porcentaje_victorias(sessionUser.ppganadas, sessionUser.pperdidas)}
                            barClassName={Math.round(porcentaje_victorias(sessionUser.ppganadas, sessionUser.pperdidas)) < 10 ? "percent10" :
                                          Math.round(porcentaje_victorias(sessionUser.ppganadas, sessionUser.pperdidas)) < 30 ? "percent30" :
                                          Math.round(porcentaje_victorias(sessionUser.ppganadas, sessionUser.pperdidas)) < 50 ? "percent50" :
                                          Math.round(porcentaje_victorias(sessionUser.ppganadas, sessionUser.pperdidas)) < 70 ? "percent70" :
                                          Math.round(porcentaje_victorias(sessionUser.ppganadas, sessionUser.pperdidas)) < 90 ? "percent90" : "percent100"}
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

  Perfil_Usuario.propTypes = {
    sessionUser: PropTypes.checkPropTypes({
      nick: PropTypes.string,
      email: PropTypes.string,
      codigo: PropTypes.number,
      won: PropTypes.number,
      lost: PropTypes.number,
      picture: PropTypes.number,
      descrp: PropTypes.string,
      puntos: PropTypes.number
    })
  };
  
  Perfil_Usuario.defaultProps = {
    sessionUser: {}
  };

  export default Perfil_Usuario;
  