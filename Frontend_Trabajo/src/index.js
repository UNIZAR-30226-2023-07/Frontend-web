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
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import UserLayout from "layouts/User.js";
import StartLayout from "layouts/Start.js";
import LoginLayout from "layouts/Login.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/user" render={(props) => <UserLayout {...props} />} />
      <Route path="/auth" render={(props) => <LoginLayout {...props} />} />
      <Route path="/start" render={(props) => <StartLayout {...props} />} />
      <Redirect from="/" to="/start" /> {/* Indicamos que es la redireccion a hacer inicialmente */}
    </Switch>
  </BrowserRouter>
);
