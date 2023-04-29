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
/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import SelectImgUser from "hooks/SelectImgUser";
import "assets/css/user-styles.css";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
import sendFriendRequest from "hooks/setter/sendFriendRequest";
import acceptFriendRequest from "hooks/setter/acceptFriendRequest";
import denyFriendRequest from "hooks/setter/denyFriendRequest";
import unfriend from "hooks/setter/unfriend";
import getFriends from "hooks/getter/getFriendRequests";
import getFriendRequests from "hooks/getter/getFriendRequests";
import markAsRead from "hooks/setter/markAsRead";


const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriend, setNewFriend] = useState("");
  const [addFriendState, setAddFriendState] = useState("");

  const [sessionUser, setSessionUser] = useState(JSON.parse(localStorage.getItem("sessionUser")));
  const [friends, setFriends] = useState(JSON.parse(localStorage.getItem("amigxs7reinas")));
  const [friendRequests, setFriendRequests] = useState(JSON.parse(localStorage.getItem("solicitudes7reinas")));

  const { setChatOpen, chatUser, setChatUser, messages, setMessages } = props;

  const updateFriends = () => {
    getFriends(sessionUser.codigo, () => {
      setFriends(friends.filter(fr => fr.codigo != chatUser.codigo));
    });
  }
  const updateFriendRequests = () => {
    getFriendRequests(sessionUser.codigo, () => {
      setFriendRequests(JSON.parse(localStorage.getItem("solicitudes7reinas")));
      console.log(friendRequests);
    });
  }

  const toggleShowAddFriend = () => {
    setShowAddFriend(!showAddFriend);
    setNewFriend("");
    setAddFriendState("");
  }
  const handleCodeChange = event => {
    setNewFriend(event.target.value);
    setAddFriendState("");
  }
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const addFriendInterface = (show) => {
    if (show) return (
      <Card className="m-0 p-2">
        <CardBody className="m-0 p-0">
          <Button className="w-100" color="primary" onClick={toggleShowAddFriend}>
            Cerrar
          </Button>
          <Form role="form" onSubmit={event => {
              event.preventDefault();
              sendFriendRequest(sessionUser.codigo, newFriend,
                () => setAddFriendState("Enviado con éxito."),
                () => setAddFriendState("No existe el usuario indicado o ya le has agregado."));
            }}>
            <FormGroup className="my-2">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-single-02" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Código de amig@"
                  type="text"
                  autoComplete=""
                  //
                  onChange={handleCodeChange}
                  value={newFriend}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="w-100" color="primary" type="submit">
                Añadir amig@
              </Button>
            </div>
          </Form>
          {addFriendState != "" && <p className="text-center text-xs m-0 p-0 lh-120">{addFriendState}</p>}
        </CardBody>
      </Card>
    );
    else return (
      <Button color="primary" onClick={() => {toggleShowAddFriend()}}>
        Añadir amig@
      </Button>)
  }
  const showFriendRqsTitle = () => {
    if (friendRequests != null) {
      return (
        <h6 className="text-center navbar-heading text-muted my-2">
          Peticiones de amistad
        </h6>
      );
    }
  };
  // creates the links that appear in the right menu / Sidebar
  const showFriendRequests = () => {
    if (friendRequests == null) {
      return;
    }
    return friendRequests.map((prop, key) => {
      return (
        <Nav className="d-md-flex" navbar key={key}>
          <UncontrolledDropdown nav>
            <DropdownToggle className="py-1" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt={"Imagen de perfil de " + prop.Nombre}
                    src={SelectImgUser(prop.Foto)}
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                  {prop.Nombre}<span className="text-xs"><br/>Clic para gestionar</span>
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">{prop.Nombre}</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>Perfil</span>
              </DropdownItem>
              <DropdownItem onClick={() => {acceptFriendRequest(sessionUser.codigo, prop.Codigo, () => {
                  updateFriends(); updateFriendRequests();
                })}}>
                <i className="ni ni-fat-add" />
                <span>Aceptar</span>
              </DropdownItem>
              <DropdownItem onClick={() => {denyFriendRequest(sessionUser.codigo, prop.Codigo, () => {
                  updateFriendRequests();
                })}}>
                <i className="ni ni-fat-remove" />
                <span>Rechazar</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      );
    });
  };
  const showFriendsTitle = () => {
    if (friends != null) {
      return (
        <h6 className="text-center navbar-heading text-muted my-2">
          Amistades
        </h6>
      );
    }
  };
  // creates the links that appear in the right menu / Sidebar
  const showFriends = () => {
    if (friends == null) {
      return;
    }
    return friends.map((prop, key) => {
      return (
        <Nav className="d-md-flex" navbar key={key}>
          <UncontrolledDropdown nav>
            <DropdownToggle className="py-1" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="Imagen de perfil"
                    src={SelectImgUser(prop.Foto)}
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                  {prop.Nombre}<br/>{prop.Puntos} <span className="text-xs">puntos</span>
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" positionFixed>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">{prop.Nombre}</h6>
                <h6>{prop.Descp}</h6>
              </DropdownItem>
              <DropdownItem onClick={() => {
                if (chatUser >= 0)
                  setMessages(messages.map((msg) => {
                    if (msg.Emisor == friends[chatUser].Codigo) msg.Leido = 1;
                    return msg;
                  }));
                  localStorage.setItem("mensajes7reinas", JSON.stringify(messages));
                setChatUser(key);
                markAsRead(sessionUser.codigo, prop.Codigo, () => {});
                setChatOpen(true);
              }}>
                <i className="ni ni-send" />
                <span>Chat</span>
              </DropdownItem>
              <DropdownItem to={`/admin/usuario/${prop.Codigo}`} tag={Link}>
                <i className="ni ni-circle-08" />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem onClick={() => {unfriend(sessionUser.codigo, prop.Codigo, () => {
                updateFriends();
                // setFriends(friends.filter(fr => fr.Codigo != prop.Codigo));
                // localStorage.setItem("amigxs7reinas", JSON.stringify(friends));
              })}}>
                <i className="ni ni-fat-remove" />
                <span>Unfriend</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      );
    });
  };

  document.addEventListener("wheel", function(event) {
    // Desplazar el elemento que contiene el contenido de la página
    document.body.scrollTop += event.deltaY;
  });


  return (
    <Navbar
      className="user-sidebar navbar-vertical fixed-right bg-white"
      expand="md"
      id="sidenav-main"
      // style={{"overflow":"hidden"}}
    >
      <Container fluid >
        <Collapse navbar isOpen={collapseOpen}>
          {addFriendInterface (showAddFriend)}
          {showFriendRqsTitle()}
          {showFriendRequests()}
          {showFriendsTitle()}
          {showFriends()}
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
