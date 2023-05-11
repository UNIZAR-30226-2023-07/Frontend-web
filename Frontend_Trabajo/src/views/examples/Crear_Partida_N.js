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
  import startGame from "hooks/setter/startGame";
  import getUserByCode from "hooks/getter/getUserByCode";
  
  const Crear_Partida_N = (props) => { 
    const json_j_default = '{"nombre": "Sin jugador", "foto": 6}';
    
    const j_default = JSON.parse(json_j_default);

    let sessionUser = JSON.parse(localStorage.getItem("usuario7reinas"));

    const [Jugador1, setJugador1] = useState(sessionUser);
    const [nomJug2, setNomJug2] = useState(j_default.nombre);
    const [fotoJug2, setFotoJug2] = useState(j_default.foto);
    const [nomJug3, setNomJug3] = useState(j_default.nombre);
    const [fotoJug3, setFotoJug3] = useState(j_default.foto);
    const [nomJug4, setNomJug4] = useState(j_default.nombre);
    const [fotoJug4, setFotoJug4] = useState(j_default.foto);

    const { players } = props;
    console.log("Los jugadores:"+players);

    const [jugPartida, setjugPartida] = useState(JSON.parse(localStorage.getItem("jugadorxs7reinas")));


    let partidaActual = JSON.parse(localStorage.getItem("juego7reinas")); //Guarda la calve de la partida actual

    const history = useHistory();//Permite cambiar de pantalla

    const handleJugPartida = () => {
      setjugPartida(JSON.parse(localStorage.getItem("jugadorxs7reinas")))
    };


    //Actualizamos los jugadores en partida
    //let jPartida = JSON.parse(localStorage.getItem("jugadorxs7reinas")); //Miramos los jugadores en partida
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
    // useEffect(() => {
    //   //window.location.reload();
    // }, [players]);
  
    const showPlayers = (players) => {
      return (players==null) ? null : players.map((player, key) => {
        return (player == null || (/^bot(\d+)$/).test(player.codigo)) ? null : (
          <Card className="card-profile shadow lobby-player-card" key={key}>
            <img
              alt="..."
              className="lobby-player-pic avatar-lg rounded-circle"
              src={SelectImgUser(player.foto)}
            />
            <h2 className="align-center mt--2 overflow-ignore font-weight-bolder">{player.nombre}</h2>
            <h5 className="align-center mt--3 overflow-ignore text-gray">{player.codigo}</h5>
            <h4 className="align-center mt--1"><strong>{player.puntos}</strong> puntos</h4>
          </Card>
        )
      })
    };

    return (
      <>
        {/* <Header /> */}
        {/* Page content */}
        <Container fluid>
          <Row>
            <Col className="order-xl-1" xl="11">
              <Row style={{marginTop: "3rem", justifyContent: "center"}}>
                <h4 style={{color:"white"}} className="mb-0">El código de partida es <strong style={{fontSize:"200%"}}>{partidaActual}</strong>{/*JSON.stringify(jugPartida)*/}</h4>
              </Row>
              <Row style={{marginTop: "3rem", justifyContent: "center"}}>
                {showPlayers(players)}
              </Row>
              { JSON.parse(localStorage.getItem("anfitrion7reinas")) ?
              <Row style={{marginTop: "3rem", justifyContent: "center"}}>
                <Button variant="primary" color="primary" onClick={() => {
                    startGame(sessionUser.codigo, partidaActual, false,
                    () => history.push("/admin/partida")
                  )}}>
                  INICIAR PARTIDA
                </Button>
                {(players && players.length < 4) ?
                  <Button variant="primary" color="primary" onClick={() => {
                      startGame(sessionUser.codigo, partidaActual, true,
                      () => history.push("/admin/partida")
                    )}}>
                    INICIAR CON BOTS
                  </Button>
                  : null
                }
              </Row>
              :
              <Row style={{marginTop: "3rem", justifyContent: "center"}}>
                  <p className="mt-4 ml-4">
                      Esperando inicio de partida...
                  </p>
              </Row>
              }
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  export default Crear_Partida_N;
  