import { Button, Card, Container, Row, Col, } from "reactstrap";
import React from "react"
import { useHistory } from "react-router-dom";

// core components
//import UserHeader from "components/Headers/UserHeader.js";
import SelectImgUser from "hooks/SelectImgUser.js";
import borrar_datos_partida from "hooks/getter/borrar_datos_partida.js";

const Final_Partida = (props) => { 

  const { players, myTurn, isTournament } = props;
  console.log(players);

  const winner = JSON.parse(sessionStorage.getItem("ganadorx7reinas"));
  console.log(winner);

  const history = useHistory();//Permite cambiar de pantalla

  const showPlayers = (players, /*board, */winner) => {
    console.log(winner);
    let sortedPlayers = players.map(p => p);
    sortedPlayers[winner].cartas = 0;
    if (isTournament) {
      sortedPlayers.sort((a, b) => {
        return a.cartas - b.cartas;
      });
    } else {
      sortedPlayers.sort((a, b) => {
        return a.ptsTorneo - b.ptsTorneo;
      });
    }
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
          { isTournament ?
              <h4 className="align-center mt--1">
                <strong>{player.ptsTorneo}</strong> puntos
              </h4>
            :
              <h4 className="align-center mt--1"><strong>{player.cartas}</strong>{player.cartas===1 ? " carta" : " cartas"}</h4>
          }
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
            
            <Row style={{marginTop: "3rem", justifyContent: "center", display: "flex", alignItems:"center"}}>

              <img
                alt="..."
                className="winner-player-pic avatar-xl rounded-circle mr-3"
                src={SelectImgUser(players[winner].foto)}
              />
              <div style={{textAlign:"center"}}>
                <h4 style={{color:"white"}} className="text-condensed">Ha ganado</h4>
                <h1 style={{color:"white"}} className="text-condensed"><strong style={{fontSize:"200%"}}>{players[winner].nombre}</strong>{/*JSON.stringify(jugPartida)*/}</h1>
                { winner==myTurn ? <h4 style={{color:"white"}} className="text-condensed">¡Enhorabuena!</h4> : null}
              </div>
            </Row>
            <Row style={{marginTop: "3rem", justifyContent: "center"}}>
              {showPlayers(players, winner)}
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

export default Final_Partida;
