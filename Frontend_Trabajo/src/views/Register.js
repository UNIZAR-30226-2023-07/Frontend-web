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

import React, {useState} from "react"
import { useHistory } from "react-router-dom";
import encryptPassword from "hooks/encryptPassword";
import getUser from "hooks/getter/getUser";
import getFriends from "hooks/getter/getFriends";
import getFriendRequests from "hooks/getter/getFriendRequests";
import getFriendMessages from "hooks/getter/getFriendMessages";


const Register = () => {

  //Cosas que vamos a guardar para el formulario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [name, setName] = useState('')

  //Elemento para cambiar de pantalla de forma imperativa
  const history = useHistory();
  
  //Guardar el cambio en los atributos
  const handleEmailChange = event => { setEmail(event.target.value) };
  const handlePasswordChange = event => { setPassword(event.target.value) };
  const handlePassword2Change = event => { setPassword2(event.target.value) };
  const handleNameChange = event => { setName(event.target.value) };

  const register_user = event => {
    event.preventDefault();

    if (password === password2) {
      let encryptedPassword = encryptPassword(password);
      let xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {

      })
  
      xhr.onload = function () { //Se dispara cuando se recibe la respuesta del servidor
        //console.log(xhr.status);
        if (xhr.status === 202) { //Si recibe un OK
          getUser(email, () => {
            let sessionUser = JSON.parse(sessionStorage.getItem('usuario7reinas'));
            getFriends(sessionUser.codigo, () => {
              getFriendRequests(sessionUser.codigo, () => {
                getFriendMessages(sessionUser.codigo, () => {
                  history.push("/user/");
                });
              })
            });
          });
          
        } else {
          alert(`Se ha producido un error al registrarse, vuelve a intentarlo.`);
        }
      }
      // Abrimos una request de tipo post en nuestro servidor
      xhr.open('POST', 'http://20.160.173.253:3001/api/auth/register');
  
      //Mandamos la request con el email y la contraseña
      xhr.send(JSON.stringify({ nombre: name, email: email, contra: encryptedPassword }));
    } else {
      alert(`Las contraseñas no coinciden.`);
    }

  };

  return (
    <>
      <Col style={{maxWidth:"80%"}} className="d-flex flex-column align-items-center">
      <Card className="bg-secondary shadow border-0 extra-rounded-card"
        style={{width:"75%"}}
      >
          <CardBody className="p-5">
            <div className="text-center text-darker mb-4 f-size-2">
              <strong>Registrarse</strong>
            </div>
            <Form role="form" onSubmit={register_user}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    placeholder="Nombre de usuario" 
                    type="text" 
                    onChange={handleNameChange}
                    value={name}
                    maxLength="20"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Correo electrónico"
                    type="email"
                    autoComplete="new-email"
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
                    onChange={handlePasswordChange}
                    value={password}
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
                    placeholder="Confirmar contraseña"
                    type="password"
                    autoComplete="new-password"
                    onChange={handlePassword2Change}
                    value={password2}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-2" color="primary" type="submit">
                  Crear cuenta
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-1 d-flex justify-content-center">
          <div className="d-flex align-items-center mt-3 mb-0 text-white">
            ¿Ya tienes una cuenta?
            <Button onClick={e => {
                e.preventDefault(); 
                history.push("/auth/login");
              }}
              variant="primary"
              className="inicio-boton ml-3"
            >
              Iniciar sesión
            </Button>
          </div>
        </Row>
      </Col>
    </>
  );
};

export default Register;