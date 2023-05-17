import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import React from "react"
import { useHistory } from "react-router-dom";

import borrar_datos_partida from "hooks/getter/borrar_datos_partida.js";


const GamePaused = (props) => { 

  const { players, setGame } = props;
  console.log(players);

  const winner = JSON.parse(sessionStorage.getItem("ganadorx7reinas"));
  console.log(winner);

  const history = useHistory();
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="order-xl-1" xl="11">
            <Row style={{marginTop: "10rem", justifyContent: "center", display: "flex", alignItems:"center"}}>
              <div style={{textAlign:"center", width: "60%"}}>
                <h2 style={{color:"white", fontSize:"300%"}}>El anfitrión ha pausado la partida.</h2>
              </div>
            </Row>
            <Row style={{marginTop: "3rem", justifyContent: "center"}}>
              <Button variant="primary" color="primary" onClick={() => {history.push("/user"); borrar_datos_partida(); setGame(null);}}>
                VOLVER A INICIO
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GamePaused;