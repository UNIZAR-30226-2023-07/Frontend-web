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
  import React, { useEffect, useState} from "react"
  import { Link, useHistory } from "react-router-dom";

  // core components
  //import UserHeader from "components/Headers/UserHeader.js";
  import Header from "components/Headers/Header.js";
  import SelectImgUser from "hooks/SelectImgUser.js";
  import iniciarGame from "hooks/setter/iniciarGame";
  import getUserByCode from "hooks/getter/getUserByCode";
  
  const Crear_Partida_N = (props) => { 
    const json_j_default = '{"nombre": "Sin jugador", "foto": 6}';
    
    const j_default = JSON.parse(json_j_default);

    let sessionUser = JSON.parse(localStorage.getItem("sessionUser"));

    const [Jugador1, setJugador1] = useState(sessionUser);
    const [nomJug2, setNomJug2] = useState(j_default.nombre);
    const [fotoJug2, setFotoJug2] = useState(j_default.foto);
    const [nomJug3, setNomJug3] = useState(j_default.nombre);
    const [fotoJug3, setFotoJug3] = useState(j_default.foto);
    const [nomJug4, setNomJug4] = useState(j_default.nombre);
    const [fotoJug4, setFotoJug4] = useState(j_default.foto);

    const [jugPartida, setjugPartida] = useState(JSON.parse(localStorage.getItem("jPartida7reinas")));


    let partidaActual = JSON.parse(localStorage.getItem("juego7reinas")); //Guarda la calve de la partida actual

    const history = useHistory();//Permite cambiar de pantalla

    const handleJugPartida = () => {
      setjugPartida(JSON.parse(localStorage.getItem("jPartida7reinas")))
    };


    //Actualizamos los jugadores en partida
    //let jPartida = JSON.parse(localStorage.getItem("jPartida7reinas")); //Miramos los jugadores en partida
    // useEffect(() => {
    //   console.log("EMPIEZA A CREAR------");
    //   if(jugPartida != null  && jugPartida != []){
    //     let datos_user;
    //     jugPartida.forEach((elemento, indice) => {
    //       let newJug;
    //       if(indice == 0){
    //         datos_user = JSON.parse(getUserByCode(elemento, newJug));
    //         ///newJug = JSON.parse(localStorage.getItem("jGetUser7reinas"));
    //         console.log("Datos recibidos por getUserCode " + datos_user.nombre + "   "+datos_user.foto);
    //         setNomJug2(datos_user.nombre);
    //         setFotoJug2(datos_user.foto);
    //         console.log("EMPIEZA A CREAR 0");
    //       } else if(indice == 1){
    //         getUserByCode(elemento, newJug)
    //         newJug = JSON.parse(localStorage.getItem("jGetUser7reinas"));
    //         setNomJug3(newJug.nombre);
    //         setFotoJug3(newJug.foto);
    //         console.log("EMPIEZA A CREAR 2");
    //       } else if(indice == 2){
    //         getUserByCode(elemento, newJug)
    //         newJug = JSON.parse(localStorage.getItem("jGetUser7reinas"));
    //         setNomJug4(newJug.nombre);
    //         setFotoJug4(newJug.foto);
    //         console.log("EMPIEZA A CREAR 3");
    //       } else {
    //         console.log("EMPIEZA A CREAR 4");
    //       }
    //     })
    //   }
    // });
  

    // jugPartida.map((elemento, indice) => {
    //   let newJug;
    //   if(indice == 0){
    //     getUserByCode(elemento, newJug)
    //     newJug = JSON.parse(localStorage.getItem("jGetUser7reinas"));
    //     setNomJug2(newJug.nombre);
    //     setFotoJug2(newJug.foto);
    //     console.log("EMPIEZA A CREAR 0");
    //   } else if(indice == 1){
    //     getUserByCode(elemento, newJug)
    //     newJug = JSON.parse(localStorage.getItem("jGetUser7reinas"));
    //     setNomJug3(newJug.nombre);
    //     setFotoJug3(newJug.foto);
    //     console.log("EMPIEZA A CREAR 2");
    //   } else if(indice == 2){
    //     getUserByCode(elemento, newJug)
    //     newJug = JSON.parse(localStorage.getItem("jGetUser7reinas"));
    //     setNomJug4(newJug.nombre);
    //     setFotoJug4(newJug.foto);
    //     console.log("EMPIEZA A CREAR 3");
    //   } else {
    //     console.log("EMPIEZA A CREAR 4");
    //   }
    // });
    //jPartida.push("3");
    // if(jPartida != null  && jPartida != []){
    //   jPartida.forEach(function(elemento, indice, array) {
    //     if(indice == 1){
    //       getUserByCode(elemento, Jugador2);
    //     } else if(indice == 2){
    //       getUserByCode(elemento, Jugador3);
    //     } else if(indice == 3){
    //       getUserByCode(elemento, Jugador4);
    //     }
    //   })
    // }

    return (
      <>
        {/* <Header /> */}
        {/* Page content */}
        <Container className="mt-6" fluid>
          <Row>
            <Col className="order-xl-1" xl="11">
              <Card className="bg-secondary shadow ml-7">
                <CardHeader className="border-0">
                <Row>
                <Col>

                    <h3 className="mb-0">Jugadores</h3>
                    </Col>
                    <Col>
                      <h4 className="mb-0">Código de partida: {partidaActual}{JSON.stringify(jugPartida)}</h4>
                    </Col>
                  </Row>
                </CardHeader>
                <Row className="mt-3 mb-3">
                  <Col  className="ml-4" lg="5">
                      <img
                        alt="..."
                        className="avatar-lg rounded-circle mr-3"
                        src={SelectImgUser(Jugador1.foto)}
                      />
                      <span className="mt-6">{Jugador1.nombre}</span>
                  </Col>
                  <Col  className="ml-4" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(fotoJug2)}
                    />
                      <span className="mt-6">{nomJug2}</span>
                  </Col>
                  <Col  className="ml-4 mt-3" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(fotoJug3)}
                    />
                    <span className="mt-6">{nomJug3}</span>
                  </Col>
                  <Col  className="ml-4 mt-3" lg="5">
                    <img
                      alt="..."
                      className="avatar-lg rounded-circle mr-3"
                      src={SelectImgUser(fotoJug4)}
                    />
                      <span className="mt-6">{nomJug4}</span>
                  </Col>
                </Row>
              </Card>
              <Row>
                <Col lg="5"></Col>
                <Col lg="5">
                  <p className="mt-4 ml-5">
                      <Button variant="primary" color="primary" onClick={() => {
                          iniciarGame(sessionUser.codigo, partidaActual,
                          () => history.push("/admin/partida")
                        )}}>
                        INICIAR PARTIDA
                      </Button>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  export default Crear_Partida_N;
  