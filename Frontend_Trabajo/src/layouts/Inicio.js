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

import logo from './../assets/img/brand/large-white.png';
//import fonfo_pantalla from './../assets/img/Imgs_7_Reinas/Fondo_Pantalla_Inicio.png';
import { Link, useHistory } from "react-router-dom";

import getUser from "hooks/getter/getUser";
import getFriends from "hooks/getter/getFriends";
import getFriendRequests from "hooks/getter/getFriendRequests";
import getFriendMessages from "hooks/getter/getFriendMessages";
import getPausedGames from "hooks/getter/getPausedGames";
import setAppIcon from "hooks/setAppIcon.js";
import rules from "hooks/rules";


function Inicio() {

  setAppIcon();

  const history = useHistory();
  let email = JSON.parse(localStorage.getItem('sesionrecordada7reinas'));
  if (email !== null) {
    getUser(email, () => {
      let sessionUser = JSON.parse(sessionStorage.getItem('usuario7reinas'));
      getFriends(sessionUser.codigo, () => {
        getFriendRequests(sessionUser.codigo, () => {
          getPausedGames(sessionUser.codigo, () => {
            getFriendMessages(sessionUser.codigo, () => {
              history.push("/user/");
            });
          });
        });
      });
    });
  }

  const loginIface =
    <div className="d-flex align-items-center my-5 text-white">
      <Button onClick={e => {
          e.preventDefault(); 
          history.push("/auth/register");
        }}
        variant="primary"
        className="inicio-boton mr-3"
      >
        Empezar a jugar
      </Button>
      o
      <Button onClick={e => {
          e.preventDefault(); 
          history.push("/auth/login");
        }}
        variant="primary"
        className="inicio-boton ml-3"
      >
        Iniciar sesión
      </Button>
    </div>;

  return (
    <div className="inicio_fondo_pantalla py-5 d-flex flex-column">

      <img src={logo} className="inicio-logo" alt="Logo de Rabino 7 Reinas"/>

      <p2 className="text-center text-white display-4 pt-3">Bienvenid@ a la primera versión online gratuita de rabino.</p2>

      {loginIface}

      {rules}

      {loginIface}

    </div>
  );
}
export default Inicio;