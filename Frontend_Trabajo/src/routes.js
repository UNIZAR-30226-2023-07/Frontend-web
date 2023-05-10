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
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
//NUEVO
import Login_R from "views/examples/Login_Reinas.js";
import Register_R from "views/examples/Register_Reinas.js";
import Perfil_Usuario from "views/examples/Perfil_Usuario";
import Perfil_Otro_Usuario from "views/examples/Perfil_Otro_Usuario";
import Password_O from "views/examples/Password_Olvidada";
import Ajustes_Perfil from "views/examples/Ajustes_Perfil";
import Crear_Partida_N from "views/examples/Crear_Partida_N";
import Tablero_Rabino from "layouts/Tablero_Rabino";
import Final_Partida from "views/examples/Final_Partida";
import Pausa_Partida from "views/examples/Pausa_Partida";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  //Rutas nuevas para 7 Reinas
  {
    path: "/login_reinas",
    name: "Login_R",
    icon: "ni ni-key-25 text-info",
    component: Login_R,
    layout: "/pagina_login"
  },
  {
    path: "/register_reinas",
    name: "Register_R",
    icon: "ni ni-circle-08 text-pink",
    component: Register_R,
    layout: "/pagina_login"
  },
  {
    path: "/password_olvidada",
    name: "Password_O",
    icon: "ni ni-circle-08 text-pink",
    component: Password_O,
    layout: "/pagina_login"
  },
  {
    path: "/perfil_usuario",
    name: "Perfil_Usuario",
    icon: "ni ni-single-02 text-yellow",
    component: Perfil_Usuario,
    layout: "/admin"
  },
  {
    path: "/usuario/:id",
    name: "Perfil_Otro_Usuario",
    icon: "ni ni-single-02 text-yellow",
    component: Perfil_Otro_Usuario,
    layout: "/admin"
  },
  {
    path: "/ajustes_perfil",
    name: "Ajustes_Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: Ajustes_Perfil,
    layout: "/admin"
  },
  {
    path: "/gamelobby",
    name: "Crear_Partida_N",
    icon: "ni ni-single-02 text-yellow",
    component: Crear_Partida_N,
    layout: "/admin"
  },
  {
    path: "/partida",
    name: "Partida",
    icon: "ni ni-single-02 text-yellow",
    component: Tablero_Rabino,
    layout: "/admin"
  },
  {
    path: "/gameend",
    name: "Resultados",
    icon: "ni ni-single-02 text-yellow",
    component: Final_Partida,
    layout: "/admin"
  },
  {
    path: "/gamepaused",
    name: "Partida pausada",
    icon: "ni ni-single-02 text-yellow",
    component: Pausa_Partida,
    layout: "/admin"
  },

  /*{
    path: "",
    name: "",
    icon: "ni ni-circle-08 text-pink",
    component: ,
    layout: "/tablero_rabino"
  },*/
];
export default routes;
