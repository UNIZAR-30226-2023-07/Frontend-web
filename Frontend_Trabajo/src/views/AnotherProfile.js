import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  Container,
  Row,
  Col,
  Progress,
} from "reactstrap";
import { useParams, useLocation, useHistory } from "react-router-dom";

// core components
import SelectImgUser from "hooks/SelectImgUser.js";

import getUserByCode from "hooks/getter/getUserByCode";
import getHistorial from "hooks/getter/getHistorial";
  
const AnotherProfile = (props) => {

  const [ anotherUser, setAnotherUser ] = React.useState({});
  const [ historial, setHistorial ] = React.useState([]);
  const history = useHistory();

  const location = useLocation();
  const params = useParams();
  console.log(params.id);
  const { sessionUser } = props;
  if (params.id === sessionUser.codigo)
    history.push("/user/profile");

  React.useEffect(() => {
    getUserByCode(params.id)
    .then((user) => {
      setAnotherUser(user);
      console.log(JSON.parse(user));
    })
    .catch((err) => {
      console.log(err);
    });
    getHistorial(params.id)
    .then ((res) => {
      console.log("Historial obtenido");
      console.log(res);
      setHistorial(res);
    })
    .catch((err) => {
      console.log("Error al obtener el historial");
      console.log(err);
    });
  }, [location]);

  function porcentaje_victorias(vic, der){
    return (vic/(vic + der))*100;
  };

  return (
    <>
      <Container className="p-5" fluid>
        <Row className="d-flex justify-content-center">

          <Form role="form" onSubmit={(event) => {
            event.preventDefault();
            history.push(`/user/profile/${event.target[0].value}`);
          }}>
            <FormGroup className="d-flex flex-row justify-content-center">
              <InputGroup className="d-flex d-row flex-nowrap">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input className="h-auto" placeholder="Código de usuario" type="text" />
              </InputGroup>
              <Button className="ml-3" color="primary" type="submit">
                Buscar
              </Button>
              
            </FormGroup>
          </Form>
        </Row>
        <Row className="mt-5">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          <Card className="card-profile shadow rounded-card">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    {/* <a href="#pablo" onClick={(e) => e.preventDefault()}> */}
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={SelectImgUser(anotherUser.foto)}
                      />
                    {/* </a> */}
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4">
                <Row className="mt-8 d-flex justify-content-center">
                  <h1 className="font-weight-bolder">
                    {anotherUser.nombre}
                  </h1>
                </Row>
                <Row className="d-flex justify-content-center">
                  <h2 className="font-weight-normal">
                    {anotherUser.codigo} · {anotherUser.puntos} puntos
                  </h2>
                </Row>
                {anotherUser.descrp === "" || anotherUser.descrp === " " || anotherUser.descrp === null ? null :
                  <Row className="d-flex justify-content-center align-center">
                    <h3 className="font-weight-normal px-4">
                      {anotherUser.descrp}
                    </h3>
                  </Row>
                }
                <Row className="d-flex justify-content-center">
                  <h3 className="font-weight-light">
                    {anotherUser.correo}
                  </h3>
                </Row>
                <Row className="d-flex card-profile-stats py-0 justify-content-center">
                  <div>
                    <span className="heading">{anotherUser.pjugadas}</span>
                    <span className="description">Jugadas</span>
                  </div>
                  <div>
                    <span className="heading">{anotherUser.pganadas}</span>
                    <span className="description">Ganadas</span>
                  </div>
                  <div>
                    <span className="heading">{anotherUser.pperdidas}</span>
                    <span className="description">Perdidas</span>
                  </div>
                </Row>
                <Row className="d-flex align-items-center justify-content-center">
                  <span className="mr-2">{anotherUser.pjugadas > 0 ? Math.round(porcentaje_victorias(anotherUser.pganadas, anotherUser.pperdidas)) : 50}%</span>
                  <Progress
                    max="100"
                    value={porcentaje_victorias(anotherUser.pganadas, anotherUser.pperdidas)}
                    style={{width: "15vw"}}
                    className="mb-0"
                    barClassName={Math.round(porcentaje_victorias(anotherUser.pganadas, anotherUser.pperdidas)) < 10 ? "percent10" :
                                  Math.round(porcentaje_victorias(anotherUser.pganadas, anotherUser.pperdidas)) < 30 ? "percent30" :
                                  Math.round(porcentaje_victorias(anotherUser.pganadas, anotherUser.pperdidas)) < 50 ? "percent50" :
                                  Math.round(porcentaje_victorias(anotherUser.pganadas, anotherUser.pperdidas)) < 70 ? "percent70" :
                                  Math.round(porcentaje_victorias(anotherUser.pganadas, anotherUser.pperdidas)) < 90 ? "percent90" : "percent100"}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow rounded-card">
              <CardTitle
                tag="h5"
                className="h2 font-weight-bolder justify-content-center mb-0 mt-2 d-flex overflow-hidden"
                style={{textOverflow:"ellipsis", whiteSpace:"nowrap"}}
                >
                  Historial de partidas
              </CardTitle>
              <Table className="align-items-center table-flush" responsive>
                  {historial ?
                    <thead className="thead-normal">
                      <tr>
                        <th scope="col" className="text-center" style={{width:"15%"}}>Clave</th>
                        <th scope="col" className="text-center" style={{width:"20%"}}>Tipo</th>
                        <th scope="col" className="text-center">Anfitrión</th>
                        <th scope="col" className="text-center" style={{width:"30%"}}>Resultado</th>
                      </tr>
                    </thead>
                  : null}
                  <tbody>
                    {historial ? historial.reverse().map((partida, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <h4>
                              {partida.Clave}
                            </h4>
                          </td>
                          <td className="text-center">
                            <h4>
                              {partida.Tipo==="amistosa" ? "Amistosa" : "Torneo"}
                            </h4>
                          </td>
                          <td className="text-center">
                            <h4>
                              {partida.Creador}
                            </h4>
                          </td>
                          <td className="text-center">
                            <h4>
                              {partida.Ganador ? <span className="text-green">Victoria</span> : <span className="text-red">Derrota</span>}
                              {partida.Tipo==="torneo" ? <span className="small text-center"> {partida.Puntos} puntos</span> : null}
                            </h4>
                          </td>
                        </tr>
                      );
                    }) : <h2 className="align-center my-4">Aún no se han jugado partidas.</h2>}
                  </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AnotherProfile;