import {
  Button,
  Card,
  Container,
  Row,
  Col,
} from "reactstrap";
import React from "react"
import { useHistory } from "react-router-dom";

// core components
//import UserHeader from "components/Headers/UserHeader.js";
import SelectImgUser from "hooks/SelectImgUser.js";
import startGame from "hooks/setter/startGame";

const Lobby = (props) => {

  const { players, sessionUser, currentGame } = props;
  console.log("Los jugadores:"+players);

  const history = useHistory();//Permite cambiar de pantalla

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
      <Container fluid>
        <Row>
          <Col className="order-xl-1" xl="11">
            <Row style={{marginTop: "3rem", justifyContent: "center"}}>
              <h4 style={{color:"white"}} className="mb-0">El código de partida es <strong style={{fontSize:"200%"}}>{currentGame}</strong>{/*JSON.stringify(jugPartida)*/}</h4>
            </Row>
            <Row style={{marginTop: "3rem", justifyContent: "center"}}>
              {showPlayers(players)}
            </Row>
            { JSON.parse(sessionStorage.getItem("anfitrion7reinas")) ?
            <Row style={{marginTop: "3rem", justifyContent: "center"}}>
              <Button variant="primary" disabled={players != null && players.length <= 1} color="primary" onClick={() => {
                  startGame(sessionUser.codigo, currentGame, players.some(player => (/^bot(\d+)$/).test(player.codigo)),
                  () => history.push("/user/game")
                )}}>
                {JSON.parse(sessionStorage.getItem("reanudada7reinas")) ? "REANUDAR PARTIDA" : "INICIAR PARTIDA"}
              </Button>
              {!(JSON.parse(sessionStorage.getItem("reanudada7reinas"))) ?
                <Button variant="primary" disabled={players.length === 4} color="primary" onClick={() => {
                    startGame(sessionUser.codigo, currentGame, true,
                    () => history.push("/user/game")
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

export default Lobby;