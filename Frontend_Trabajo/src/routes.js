/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
//NUEVO
import Login from "views/Login.js";
import Register from "views/Register";
import Profile from "views/Profile";
import AnotherProfile from "views/AnotherProfile";
import Password from "views/Password";
import Settings from "views/Settings";
import Lobby from "views/Lobby";
import Game from "views/Game";
import GameEnd from "views/GameEnd";
import GamePaused from "views/GamePaused";


var routes = [
  {
    path: "/home",
    name: "Hub",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/user"
  },
  //Rutas nuevas para 7 Reinas
  {
    path: "/login",
    name: "Iniciar sesión",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Registrarse",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/password",
    name: "Recuperar contraseña",
    icon: "ni ni-circle-08 text-pink",
    component: Password,
    layout: "/auth"
  },
  {
    path: "/profile/:id",
    name: "Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: AnotherProfile,
    layout: "/user"
  },
  {
    path: "/profile",
    name: "Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/user"
  },
  {
    path: "/settings",
    name: "Ajustes de usuario",
    icon: "ni ni-single-02 text-yellow",
    component: Settings,
    layout: "/user"
  },
  {
    path: "/lobby",
    name: "Lobby",
    icon: "ni ni-single-02 text-yellow",
    component: Lobby,
    layout: "/user"
  },
  {
    path: "/game",
    name: "Partida",
    icon: "ni ni-single-02 text-yellow",
    component: Game,
    layout: "/user"
  },
  {
    path: "/end",
    name: "Partida finalizada",
    icon: "ni ni-single-02 text-yellow",
    component: GameEnd,
    layout: "/user"
  },
  {
    path: "/paused",
    name: "Partida pausada",
    icon: "ni ni-single-02 text-yellow",
    component: GamePaused,
    layout: "/user"
  },
];
export default routes;
