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
//import { Link } from "react-router-dom";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import SoundEnvironment from "../SoundEnvironment/SoundEnvironment.js"

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Media,
  Row,
  Col
} from "reactstrap";

import React, {useState} from "react"

//Imagenes de Usuario
import SelectImgUser from "hooks/SelectImgUser.js";
import logOut from "hooks/getter/logOut.js";

const UserNavbar = (props) => {

  const { bgColor, logo, informacion_Web} = props;
  let sessionUser = JSON.parse(localStorage.getItem("usuario7reinas"));

  //Variable que guarda el volumen de la música
  const [Volumen_mus, setVolumen_mus] = useState(informacion_Web.volumen);

  //Funcion para modificar el volumen de la música
  const handleVolumen_musChange = event => {
    setVolumen_mus(event.target.value)
  };

  
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank"
    };
  }

  return (
    <>
      <Navbar className="navbar-top navbar-dark py-4" expand="md" id="navbar-main">
        <Container fluid className="navbar-reinas">
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img logo-7-reinas"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block ml--7"
            to="/admin/"
          >
            Jugar
          </Link>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block ml--7"
            to="/admin/perfil_usuario"
          >
            Perfil
          </Link>
          {/* <Link
            className="h4 mb-0 text-white text-uppercase d-lg-none d-lg-inline-block ml--9"
            to="/admin/tables"
          >
            Amig@s
          </Link> */}
          <span className="mr--8"></span>
          <span className="mr-5"></span>
          
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <SoundEnvironment
            //handleSoundLoading = {() => {}}
            //handleSoundPlaying = {() => {}}
            //handleSoundFinishedPlaying = {() => {}}
            {...props}
            volumen={Volumen_mus}
          />
          <Nav className="align-items-center d-md-flex ml--9" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-lg rounded-circle">
                    <img
                      alt="..."
                      src={SelectImgUser(sessionUser.foto)}
                    />
                  </span>
                  <Media className="ml-2 d-none d-flex flex-column">
                    <span className="text-xl font-weight-bolder">
                      {sessionUser.nombre}
                    </span>
                    <span className="pb-1 mt--1 text-sm font-weight-bold">
                      {sessionUser.codigo} · {sessionUser.puntos} puntos
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Ajustes de Sonido</h6>
                </DropdownItem>
                <DropdownItem>
                  <Row>
                    <Col xl="2">
                      <i className="ni ni-note-03 ml--1" />
                      <span className="ml-1 mr-3">{Volumen_mus}</span>
                    </Col>
                    <Col xl="10">
                      <Input
                        type="range"
                        min={0}
                        max={100}
                        step={2}
                        value={Volumen_mus}
                        onChange={handleVolumen_musChange}
                        className="ml-2"
                      />
                    </Col>
                  </Row>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem to="/inicio" tag={Link} onClick={logOut}>
                  <i className="ni ni-user-run" />
                  <span>Cerrar sesión</span>
                </DropdownItem>
                <DropdownItem divider /> {/*Esto solo es para borrar localStorage de la Partida de forma rápida */}
                <DropdownItem onClick={() =>{   localStorage.removeItem('juego7reinas');
                                                localStorage.removeItem('pConectada7reinas');
                                                localStorage.removeItem('jugadorxs7reinas');
                                                localStorage.removeItem('jGetUser7reinas');
                                                localStorage.removeItem('miturno7reinas');
                                                localStorage.removeItem('mano7reinas');
                                                localStorage.removeItem('tablero7reinas');
                                                localStorage.removeItem('descarte7reinas');
                                                localStorage.removeItem('turno7reinas');
                                                localStorage.removeItem('heabierto7reinas');
                                                localStorage.removeItem('herobado7reinas');
                                                localStorage.removeItem('part_pausadas7reinas');
                                                localStorage.removeItem("es_torneo7reinas");
                                                localStorage.removeItem("puntosTorneo7reinas");
                                                console.log("SE HAN BORRADO LAS VARIABLES DE PARTIDA")}}>
                  <i className="ni ni-user-run" />
                  <span>Borrar S Partida</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

UserNavbar.propTypes = {
  // links that will be displayed inside the component
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired

  }),
  volumen: PropTypes.number

};

export default UserNavbar;
