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
import Login_R from "views/examples/Login_Reinas.js";
import Register_R from "views/examples/Register_Reinas.js";
import Perfil_Usuario from "views/examples/Perfil_Usuario";
import Perfil_Otro_Usuario from "views/examples/Perfil_Otro_Usuario";
import Password_O from "views/examples/Password_Olvidada";
import Ajustes_Perfil from "views/examples/Ajustes_Perfil";
import Crear_Partida_N from "views/examples/Crear_Partida_N";
import Tablero_Rabino from "views/examples/Tablero_Rabino";
import Final_Partida from "views/examples/Final_Partida";
import Pausa_Partida from "views/examples/Pausa_Partida";


var routes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/user"
  },
  //Rutas nuevas para 7 Reinas
  {
    path: "/login",
    name: "Login_R",
    icon: "ni ni-key-25 text-info",
    component: Login_R,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register_R",
    icon: "ni ni-circle-08 text-pink",
    component: Register_R,
    layout: "/auth"
  },
  {
    path: "/password",
    name: "Password_O",
    icon: "ni ni-circle-08 text-pink",
    component: Password_O,
    layout: "/auth"
  },
  {
    path: "/profile/:id",
    name: "Perfil_Otro_Usuario",
    icon: "ni ni-single-02 text-yellow",
    component: Perfil_Otro_Usuario,
    layout: "/user"
  },
  {
    path: "/profile",
    name: "Perfil_Usuario",
    icon: "ni ni-single-02 text-yellow",
    component: Perfil_Usuario,
    layout: "/user"
  },
  {
    path: "/settings",
    name: "Ajustes_Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: Ajustes_Perfil,
    layout: "/user"
  },
  {
    path: "/lobby",
    name: "Crear_Partida_N",
    icon: "ni ni-single-02 text-yellow",
    component: Crear_Partida_N,
    layout: "/user"
  },
  {
    path: "/game",
    name: "Partida",
    icon: "ni ni-single-02 text-yellow",
    component: Tablero_Rabino,
    layout: "/user"
  },
  {
    path: "/end",
    name: "Resultados",
    icon: "ni ni-single-02 text-yellow",
    component: Final_Partida,
    layout: "/user"
  },
  {
    path: "/paused",
    name: "Partida pausada",
    icon: "ni ni-single-02 text-yellow",
    component: Pausa_Partida,
    layout: "/user"
  },
];
export default routes;
