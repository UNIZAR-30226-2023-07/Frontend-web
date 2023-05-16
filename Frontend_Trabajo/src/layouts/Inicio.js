import React from "react";
//import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { 
  Container,
  Col,
  Card,
  CardBody,
  Button,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

import "./../assets/css/inicio-styles.css";

import logo from './../assets/img/Imgs_7_Reinas/logo.png';
//import fonfo_pantalla from './../assets/img/Imgs_7_Reinas/Fondo_Pantalla_Inicio.png';
import { Link, useHistory } from "react-router-dom";

import getUser from "hooks/getter/getUser";
import getFriends from "hooks/getter/getFriends";
import getFriendRequests from "hooks/getter/getFriendRequests";
import getFriendMessages from "hooks/getter/getFriendMessages";
import getPausedGames from "hooks/getter/getPausedGames";


function Inicio() {

  const history = useHistory();
  let email = JSON.parse(localStorage.getItem('sesionrecordada7reinas'));
  if (email !== null) {
    getUser(email, () => {
      let sessionUser = JSON.parse(sessionStorage.getItem('usuario7reinas'));
      getFriends(sessionUser.codigo, () => {
        getFriendRequests(sessionUser.codigo, () => {
          getPausedGames(sessionUser.codigo, () => {
            getFriendMessages(sessionUser.codigo, () => {
              history.push("/admin/");
            });
          });
        });
      });
    });
  }

    const containerStyle = {
      /*backgroundImage:
        url(${fonfo_pantalla})`,*/
      
      width: "600px",
      height: "600px",

    };


  return (
    <div className="inicio_fondo_pantalla">
      <header className="Inicio-header">

      <img src={logo} className="inicio--logo" alt="Logo del sistema de juego
        Rabino 7 Reinas"/>

      <Col lg="4" md="20" className = "inicio--cuadro">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-2">

          

          <p className="inicio--texto">
            <span className="inicio--titulo">¡¡EL ENTRETENIMIENTO TE ESPERA!!</span><br/>
            Pulse INICIAR para entrar
          </p>
          <p>
            <Link to= "/pagina_login/login_reinas"><Button as={Link} variant="primary" className="inicio--boton">
              INICIAR
            </Button>
            </Link>
          </p>

          </CardBody>
        </Card>
      </Col>
      </header>
    </div>
  );
}
export default Inicio;