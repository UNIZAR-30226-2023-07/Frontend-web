import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Table,
  Container,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import createGame from "hooks/setter/createGame";
import joinGame from "hooks/setter/joinGame";

import "assets/css/user-styles.css";

const Index = (props) => {
  const history = useHistory();//Permite cambiar de pantalla

  let sessionUser = JSON.parse(sessionStorage.getItem("usuario7reinas"));
  const [Clave, setClave] = useState(""); //Guarda el clave de la partida a unirse
  const [ErrorUnirse, setErrorUnirse] = useState(false); //Señala si saca un mensaje de error
  const [ErrorCrear, setErrorCrear] = useState(false); //Señala si saca un mensaje de error

  let part_pausadas = JSON.parse(sessionStorage.getItem("part_pausadas7reinas"));

  let { setGame, setPlayers, setIsTournament, setHand } = props;

  const handleClaveChange = event => {
    setClave(event.target.value)
  };

  //Función para mostrar las partidas pausadas
  const showPart_Pausadas = () => {
    if (part_pausadas == null) {
      return;
    }
    return part_pausadas.map((prop, key) => {
      return (
        <tr key={key}>
          <td>
            <span className="h3">{prop.Tipo === "amistosa"? "Partida": "Torneo"} de {prop.Creador}</span>
          </td>
          <td>
              <span className="h3">{prop.Clave}</span>
          </td>
          <td style={{padding:0}}>
            <Button variant="primary" color="primary" className="ml-5" onClick={() => {
              joinGame(sessionUser, prop.Clave,
                () => {
                  sessionStorage.setItem("reanudada7reinas", JSON.stringify(true));
                  setGame(sessionStorage.getItem("juego7reinas"));
                  setIsTournament(prop.Tipo === "torneo");
                  sessionStorage.setItem("es_torneo7reinas", JSON.stringify(prop.Tipo === "torneo"));
                  setPlayers(JSON.parse(sessionStorage.getItem("jugadorxs7reinas")));
                  setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]);
                  history.push("/user/lobby");
                },
                () => setErrorUnirse(true),
                prop.Creador === sessionUser.codigo, false
            )}}>
              Unirse
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Container fluid className="d-flex px-5 pt-5 pb-4 m-0">
        <Card className="start-join-game rounded-card">
          <CardTitle
            tag="h5"
            className="h2 font-weight-bolder justify-content-center mb-0 mt-2 d-flex overflow-hidden"
            style={{textOverflow:"ellipsis", whiteSpace:"nowrap"}}
            >
            Unirse a partida
          </CardTitle>
          <CardBody className="p-2 px-4">
            <Form role="form" onSubmit={(event) => {
              event.preventDefault();
              joinGame(sessionUser, Clave,
                  () => {
                    sessionStorage.setItem("reanudada7reinas", JSON.stringify(false));
                    setGame(sessionStorage.getItem("juego7reinas"));
                    setIsTournament(JSON.parse(sessionStorage.getItem("es_torneo7reinas")));
                    setPlayers(JSON.parse(sessionStorage.getItem("jugadorxs7reinas")));
                    setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]);
                    history.push("/user/lobby");
                  },
                  () => setErrorUnirse(true),
                  false, true
            )}}>
              <FormGroup className="d-flex flex-row-reverse justify-content-center">
                <Button variant="primary" color="primary" className="m-0 d-flex justify-content-center"
                  style={{width:"30%", minWidth:"5rem", textOverflow:"ellipsis"}}>
                  Unirse
                </Button>
                <Input
                  className="form-control-alternative mr-2"
                  id="input-nombre_usiario"
                  placeholder="Clave"
                  type="text"
                  onChange={handleClaveChange}
                  value={Clave}
                />
              </FormGroup>
            </Form>
            {ErrorUnirse && <p className="text-red mb--1 align-center"> Error al unirse</p>}
          </CardBody>
        </Card>
        <Card className="start-create-game rounded-card">
          <CardTitle
            tag="h5"
            className="h2 font-weight-bolder justify-content-center mb-0 mt-2 d-flex overflow-hidden"
            style={{textOverflow:"ellipsis", whiteSpace:"nowrap"}}
            >
              Crear Partida
          </CardTitle>
          <CardBody className="p-2 px-4">
            <div className="d-flex justify-content-center">
              <Button color="primary" className="d-flex justify-content-end"
                style={{minWidth:"4rem", whiteSpace:"nowrap", textOverflow:"ellipsis"}}
                onClick={() => {
                  createGame(sessionUser, "amistosa",
                    () => {
                      sessionStorage.setItem("reanudada7reinas", JSON.stringify(false));
                      setGame(sessionStorage.getItem("juego7reinas"));
                      setIsTournament(false);
                      setPlayers(JSON.parse(sessionStorage.getItem("jugadorxs7reinas")));
                      setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]);
                      history.push("/user/lobby")
                    },
                    () => setErrorCrear(true)
              )}}>
                <span className="d-flex justify-content-end overflow-hidden w-100">Partida Normal</span>
              </Button>
              <Button color="primary" className="d-flex justify-content-end"
                style={{minWidth:"4rem", whiteSpace:"nowrap", textOverflow:"ellipsis"}}
                onClick={() => {
                  createGame(sessionUser, "torneo",
                    () => {
                      sessionStorage.setItem("reanudada7reinas", JSON.stringify(false));
                      setGame(sessionStorage.getItem("juego7reinas"));
                      setIsTournament(true);
                      setPlayers(JSON.parse(sessionStorage.getItem("jugadorxs7reinas")));
                      setHand([{number: '0', symbol: '0', back: '2', comb: -1, ord: -1}]);
                      history.push("/user/lobby")
                    },
                    () => setErrorCrear(true)
              )}}>
                <span className="d-flex justify-content-end overflow-hidden w-100">Partida Clasificatoria</span>
              </Button>
            </div>
            {ErrorCrear && <p className="text-red mb--1 align-center"> Error al crear una partida</p>}
          </CardBody>
        </Card>
      </Container>
      <Container className="d-flex px-5 pb-5 m-0 paused-games">
        <Card className="bg-secondary shadow rounded-card mx-0 paused-games-card" >
          <CardTitle
            tag="h5"
            className="h2 font-weight-bolder justify-content-center mb-0 mt-2 mb-3 d-flex overflow-hidden"
            style={{textOverflow:"ellipsis", whiteSpace:"nowrap", height:"2.3rem"}}
          >
            Partidas Pausadas
          </CardTitle>
          <Table className="align-items-center table-flush" responsive>
            <tbody>
              {showPart_Pausadas()}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default Index;
