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
  import SelectImgUser from "hooks/SelectImgUser.js";
  import borrar_datos_partida from "hooks/getter/borrar_datos_partida.js";

  
  const Pausa_Partida = (props) => { 

    const { players, myTurn } = props;
    console.log(players);

    const winner = JSON.parse(sessionStorage.getItem("ganadorx7reinas"));
    console.log(winner);

    const history = useHistory();//Permite cambiar de pantalla

    const ptsFromCard = (number) => {
      switch (number) {
        case 1:
          return 11;
          break;
        case 0:
          return 20;
          break;
        case 11, 12, 13:
          return 10;
          break;
        default:
          return number;
      }
    }

        

    const showPlayers = (players, /*board, */winner) => {
      // Obtenemos los puntos por jugador.
      /*board?.forEach((hand, owner) => {
        let pts = 0;
        hand.forEach(card => {
          pts += ptsFromCard(parseInt(card.number));
        });
        console.log(pts);
        console.log(owner);
        players[owner].points = pts;
        }
      )*/
      // Ordenamos los jugadores que no han ganado.
      console.log(winner);
      let sortedPlayers = players.map(p => p);
      // players.forEach((player, key) => {
      //   if (key != winner) {
      //     console.log(key, winner);
      //     sortedPlayers?.push(player);
      //   }
      // });
      sortedPlayers.sort((a, b) => {
        return a.cartas - b.cartas;
        /*return res == 0 ? a.points - b.points : res;*/
      });
      console.log(sortedPlayers);
      return (sortedPlayers==null) ? null : sortedPlayers.map((player, key) => {

        return (player == null) ? null : (
          <Card className="card-profile shadow lobby-player-card" key={key}>
            <img
              alt="..."
              className="lobby-player-pic avatar-lg rounded-circle"
              src={SelectImgUser(player.foto)}
            />
            <h2 className="align-center mt--2 overflow-ignore font-weight-bolder">{player.nombre}</h2>
            <h4 className="align-center mt--1"><strong>{player.cartas}</strong>{player.cartas==1 ? " carta" : " cartas"}</h4>
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
              
              <Row style={{marginTop: "10rem", justifyContent: "center", display: "flex", alignItems:"center"}}>

                <div style={{textAlign:"center", width: "60%"}}>
                  <h2 style={{color:"white", fontSize:"300%"}}>El anfitrión ha pausado la partida.</h2>
                </div>
              </Row>
              <Row style={{marginTop: "3rem", justifyContent: "center"}}>
                <Button variant="primary" color="primary" onClick={() => {history.push("/user"); borrar_datos_partida();}}>
                  VOLVER A INICIO
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  export default Pausa_Partida;
  