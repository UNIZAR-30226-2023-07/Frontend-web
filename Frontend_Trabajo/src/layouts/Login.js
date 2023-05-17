import React from "react";
import { useHistory, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Row } from "reactstrap";

import routes from "routes.js";
import logo from './../assets/img/brand/large-white.png';
import setAppIcon from "hooks/setAppIcon.js";

const Login = (props) => {

  setAppIcon();

  const history = useHistory();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component
                                  {...props}
                                /> }
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (

    <div className="inicio_fondo_pantalla py-5 d-flex flex-column">

      <img src={logo} className="login-logo" alt="Logo de Rabino 7 Reinas"
        onClick={e => {e.preventDefault(); history.push("/");}}
      />

      <Row className="justify-content-center pt-5 mx-0">
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </Row>

    </div>
  );
};

export default Login;
