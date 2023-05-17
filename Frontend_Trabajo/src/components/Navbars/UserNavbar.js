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
import { Link, useLocation } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import SoundEnvironment from "../SoundEnvironment/SoundEnvironment.js"

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Input,
  NavbarBrand,
  Navbar,
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

  const { logo, informacion_Web} = props;
  let sessionUser = JSON.parse(sessionStorage.getItem("usuario7reinas"));

  const location = useLocation();

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
      <Navbar className="navbar-top navbar-dark p-4" expand="xs" id="navbar-main">
        <Container fluid className="navbar-reinas">
          <div className="d-flex flex-row align-items-center">
            {logo ? (
              <NavbarBrand className="pt-0" {...navbarBrandProps}
                onClick={event => {if(location.pathname === "/user/game" ||
                                      location.pathname === "/user/paused" ||
                                      location.pathname === "/user/end" ||
                                      location.pathname === "/user/lobby")
                                    event.preventDefault();
                }}>
                <img
                  alt={logo.imgAlt}
                  className="navbar-brand-img logo-7-reinas"
                  src={logo.imgSrc}
                />
              </NavbarBrand>
            ) : null}
            {(location.pathname === "/user/game" ||
              location.pathname === "/user/paused" ||
              location.pathname === "/user/end" ||
              location.pathname === "/user/lobby")? 
            <span className="mr-1"></span>:(
            <Link
              className="navbar-menu h4 mb-0 text-white text-uppercase d-none ml-2"
              to="/user/"
            >
              Jugar
            </Link>
            )}
            {(location.pathname === "/user/game" ||
              location.pathname === "/user/paused" ||
              location.pathname === "/user/end" ||
              location.pathname === "/user/lobby") ?
            <span className="mr-1"></span>:(
            <Link
              className="navbar-menu h4 mb-0 text-white text-uppercase d-none ml-4"
              to="/user/profile"
            >
              Perfil
            </Link>
            )}
          </div>
          <div className="d-flex flex-row align-items-center">
            <SoundEnvironment
              {...props}
              volumen={Volumen_mus}
            />
            <Nav className="align-items-center d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-lg rounded-circle"
                      style={{minWidth: "58px", minHeight: "58px"}}
                    >
                      <img
                        alt="..."
                        src={SelectImgUser(sessionUser.foto)}
                      />
                    </span>
                    <Media className="ml-2 d-none d-flex flex-column white-text"
                      style={{width:"max-content"}}>
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
                  <DropdownItem to="/start" tag={Link} onClick={logOut}>
                    <i className="ni ni-user-run" />
                    <span>Cerrar sesión</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </div>
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
