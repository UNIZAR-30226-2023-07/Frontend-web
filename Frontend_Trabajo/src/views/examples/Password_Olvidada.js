import {
    Button,
    Card,
    CardHeader,
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
  
  import React, {useState} from "react";
  import { Link, useHistory } from "react-router-dom";
  import encryptPassword from "hooks/encryptPassword";

  const Register = () => {
  
    //Cosas que vamos a guardar para el formulario
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    //Elemento para cambiar de pantalla de forma imperativa
    const history = useHistory();
    
    //Guardar el cambio en los atributos
    const handleEmailChange = event => {
      setEmail(event.target.value)
    };
  
    const handlePasswordChange = event => {
      setPassword(event.target.value)
    };
  
    const handlePassword2Change = event => {
      setPassword2(event.target.value)
    };
    
    const modify_password = event => {
      event.preventDefault();

      if (password === password2) {
        let encryptedPassword = encryptPassword(password);
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
          //console.log(xhr.responseText);
        })
    
        xhr.onload = function () { //Se dispara cuando se recibe la respuesta del servidor
          //console.log(xhr.status);
          if (xhr.status === 202) { //Si recibe un OK
            alert(`La contraseña ha sido cambiada correctamente. Vuelve a iniciar sesión.`);
            history.push('/pagina_login/');
          } else {
            alert(`Se ha producido un error al cambiar la contraseña, vuelve a intentarlo.`);
          }
        }
        // Abrimos una request de tipo post en nuestro servidor
        xhr.open('POST', 'http://20.160.173.253:3001/api/auth/mod-login');
    
        //Mandamos la request con el email y la contraseña
        xhr.send(JSON.stringify({ email: email, contra: encryptedPassword }));
      } else {
        alert(`Las contraseñas no coinciden.`);
      }

    };
  
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-darker mb-4 f-size-2">
                <strong>RABINO 7 REINAS</strong>
              </div>
              <div className="text-center text-muted mb-4">
                <small>Introduzca sus datos para cambiar de contraseña</small>
              </div>
              <Form role="form" onSubmit={modify_password}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
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
                  <Button className="mt-4" color="primary" type="submit">
                    Cambiar contraseña
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  };
  
  export default Register;
  