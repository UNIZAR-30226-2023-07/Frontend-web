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
} from "reactstrap";

import React, { useState } from "react"
import { PropTypes } from "prop-types";
import { useHistory } from "react-router-dom";
import encryptPassword from "hooks/encryptPassword";
import getUser from "hooks/getter/getUser";
import getFriends from "hooks/getter/getFriends";
import getFriendRequests from "hooks/getter/getFriendRequests";
import getFriendMessages from "hooks/getter/getFriendMessages";
import getPausedGames from "hooks/getter/getPausedGames";

const Login = () => {

  //Cosas que vamos a guardar para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  //Elemento para cambiar de pantalla de forma imperativa
  const history = useHistory();

  //Guardar el cambio en los atributos
  const handleEmailChange = event => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  };

  const handleRememberChange = event => {
    setRemember(!remember)
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
          let sessionUser = JSON.parse(sessionStorage.getItem('usuario7reinas'));
          getFriends(sessionUser.codigo, () => {
            getFriendRequests(sessionUser.codigo, () => {
              getPausedGames(sessionUser.codigo, () => {
                getFriendMessages(sessionUser.codigo, () => {
                  if (remember)
                    localStorage.setItem('sesionrecordada7reinas', JSON.stringify(email));
                  history.push("/user/");
                });
              });
            });
          });
        });
        
      } else {
        alert(`Se ha producido un error en el login, vuelve a intentarlo.`);
      }
    }
    // Abrimos una request de tipo post en nuestro servidor
    xhr.open('POST', 'http://20.160.173.253:3001/api/auth/login');

    //Mandamos la request con el email y la contraseña
    xhr.send(JSON.stringify({ email: email, contra: encryptedPassword }));
  };


  return (
    <>
      <Col style={{maxWidth:"80%"}} className="d-flex flex-column align-items-center">
        <Card className="bg-secondary shadow border-0 extra-rounded-card"
          style={{width:"75%"}}
        >
          <CardBody className="p-5">
            <div className="text-center text-darker mb-4 f-size-2">
              <strong>Iniciar sesión</strong>
            </div>
            <Form role="form" onSubmit={login_user}>
              <FormGroup>
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
                    maxLength="64"
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
                  checked={remember}
                  onChange={handleRememberChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Recuérdame</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-1 d-flex justify-content-center">
          <div className="d-flex align-items-center mt-3 mb-0 text-white">
            <Button onClick={e => {
                e.preventDefault(); 
                history.push("/auth/register");
              }}
              variant="primary"
              className="inicio-boton mr-4"
            >
              Registrarse
            </Button>
            <Button onClick={e => {
                e.preventDefault(); 
                history.push("/auth/password");
              }}
              variant="primary"
              className="inicio-boton"
            >
              Recuperar contraseña
            </Button>
          </div>
        </Row>
      </Col>
    </>
  );

};

Login.propTypes = {
  sessionUser: PropTypes.object,
  friends: PropTypes.arrayOf(PropTypes.object)
};

Login.defaultProps = {
  sessionUser: {},
  friends: [{}]
};

export default Login;