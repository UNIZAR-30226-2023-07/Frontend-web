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
  
  import React, {useState} from "react"
  import { Link, useHistory } from "react-router-dom";
  import encryptPassword from "hooks/encryptPassword";

  
  const Register = (props) => {
  
    //Cosas que vamos a guardar para el formulario
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [name, setName] = useState('')

    const { sessionUser } = props;

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
  
    const handleNameChange = event => {
      setName(event.target.value)
    };
    
    //Submit al servidor
    const registerSubmit = event => {
      event.preventDefault();
      alert(`Your state values:
              email: ${email}
              password: ${password}
              name: ${name}
              Se ha mandado al servidor la información`);
  
      //Petición http
      var xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
      })
  
      // Abrimos una request de tipo post en nuestro servidor
      xhr.open('POST', 'http://localhost:3001/api/auth/register')
      
      //Mandamos la request con el email y la contraseña
      xhr.send(JSON.stringify({ name: name, email: email , password: password }))
  
    };

    const register_user = event => {
      event.preventDefault();
      alert(`Your state values:
                nombre: ${name}
                email: ${email} 
                password: ${password}
                password2: ${password2}
                Se ha mandado al servidor la información`);

      if (password === password2) {
        let encryptedPassword = encryptPassword(password);
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
          console.log(xhr.responseText);
        })
    
        xhr.onload = function () { //Se dispara cuando se recibe la respuesta del servidor
          alert(`Se ha recibido la respuesta del servidor`);
          console.log(xhr.status);
          if (xhr.status === 202) { //Si recibe un OK
            alert(`Registro correcto`);
            let xhr2 = new XMLHttpRequest()
            xhr2.addEventListener('load', () => {
              // update the state of the component with the result here
              console.log(xhr.responseText);
            })
            xhr2.onload = function () {
              if (xhr2.status === 200) {
                sessionUser.nick = xhr2.response.nick;
                sessionUser.email = email;
                sessionUser.codigo = xhr2.response.codigo;
                sessionUser.won = xhr2.response.pganadas;
                sessionUser.lost = xhr2.response.pjugadas - xhr2.response.pganadas;
                sessionUser.picture = xhr2.response.foto;
                sessionUser.descrp = xhr2.response.descrp;
                sessionUser.puntos = xhr2.response.puntos;
                history.push("/admin/");
              } else {
                alert(`Se ha producido un erroral obtener los datos de usuario, vuelve a intentarlo`);
              }
            }
    
            // Abrimos una request de tipo post en nuestro servidor
            xhr2.open('GET', `http://52.174.124.24:3001/api/jugador/get/${email}`);
        
            //Mandamos la request
            xhr2.send();
            
          } else {
            alert(`Se ha producido un error al registrarse, vuelve a intentarlo`);
          }
        }
        // Abrimos una request de tipo post en nuestro servidor
        xhr.open('POST', 'http://52.174.124.24:3001/api/auth/register');
    
        //Mandamos la request con el email y la contraseña
        xhr.send(JSON.stringify({ nombre: name, email: email, contra: encryptedPassword }));
      } else {
        alert(`Las contraseñas no coinciden`);
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
                <small>Introduzca sus datos para poder registrarse</small>
              </div>
              <Form role="form" onSubmit={register_user}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Nombre de usuario" 
                      type="text" 
                      onChange={handleNameChange}
                      value={name}
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
                
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          Estoy de acuerdo con los{" "}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                           Terminos y condiciones de uso
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Crear cuenta
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
  