import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

import React, { useState } from "react"
import { PropTypes } from "prop-types";
import { Link, useHistory } from "react-router-dom";
import encryptPassword from "hooks/encryptPassword";
import getUser from "hooks/getter/getUser";
import getFriends from "hooks/getter/getFriends";
import getFriendRequests from "hooks/getter/getFriendRequests";
import getFriendMessages from "hooks/getter/getFriendMessages";

/*
import Cookies from 'universal-cookie';
const cookies = new Cookies();
cookies.set('myCat', 'Pacman', { path: '/' });
console.log(cookies.get('myCat')); // Pacman
*/


const Login_Reinas = (props) => {

  //Cosas que vamos a guardar para el formulario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let { sessionUser, friends } = props;

  //Elemento para cambiar de pantalla de forma imperativa
  const history = useHistory();

  //Guardar el cambio en los atributos
  const handleEmailChange = event => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  };

  //Submit al servidor
  const loginSubmit = event => {
    event.preventDefault();
    alert(`Your state values: 
              email: ${email} 
              password: ${password}
              Se ha mandado al servidor la información`);

    //Petición http
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      //console.log(xhr.responseText)
    })

    // Abrimos una request de tipo post en nuestro servidor
    xhr.open('POST', 'http://52.174.124.24:3001/api/auth/login')

    //Mandamos la request con el email y la contraseña
    xhr.send(JSON.stringify({ email: email, contra: password }))

    //history.push("/admin/perfil_usuario");
  };


  const login_user = event => {
    event.preventDefault();

    let encryptedPassword = encryptPassword(password);

    //Petición http
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      //console.log(xhr.responseText);
    })

    xhr.onload = function () { //Se dispara cuando se recibe la respuesta del servidor
      //console.log(xhr.status);
      if (xhr.status === 202) { //Si recibe un OK
        getUser(email, () => {
          let sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
          getFriends(sessionUser.codigo, () => {
            getFriendRequests(sessionUser.codigo, () => {
              getFriendMessages(sessionUser.codigo, () => {
                history.push("/admin/");
              });
            })
          });
        });
        
      } else {
        alert(`Se ha producido un error en el login, vuelve a intentarlo.`);
      }
    }
    // Abrimos una request de tipo post en nuestro servidor
    xhr.open('POST', 'http://52.174.124.24:3001/api/auth/login');

    //Mandamos la request con el email y la contraseña
    xhr.send(JSON.stringify({ email: email, contra: encryptedPassword }));
  };


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-darker mb-4 f-size-2">
              <strong>RABINO 7 REINAS</strong>
            </div>
            <div className="text-center text-muted mb-4">
              <small>Inicie Sesión introduciendo sus datos</small>
            </div>
            <Form role="form" onSubmit={login_user}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    //
                    onChange={handleEmailChange}
                    value={email}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    //
                    onChange={handlePasswordChange}
                    value={password}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Recordar datos</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">

          <Col className="text-right" xs="4">
            <Nav className="m-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link-icon text-light"
                  to="/pagina_login/register_reinas"
                  tag={Link}
                >
                  <small>Crear una cuenta</small>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col className="text-right" xs="6">
            <Nav className="m-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link-icon text-light"
                  to="/pagina_login/password_olvidada"
                  tag={Link}
                >
                  <small>¿Ha olvidado su contraseña?</small>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Col>
    </>
  );

};

Login_Reinas.propTypes = {
  sessionUser: PropTypes.object,
  friends: PropTypes.arrayOf(PropTypes.object)
};

Login_Reinas.defaultProps = {
  sessionUser: {},
  friends: [{}]
};

export default Login_Reinas;
