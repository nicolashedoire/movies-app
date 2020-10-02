import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Movies-app</NavbarBrand>
        <NavbarToggler />
        <Collapse isOpen={true} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <NavbarText>
            <NavLink to="/signin" className="ml-2">
              SignIn
            </NavLink>
            <NavLink to="/signup" className="ml-2">
              SignUp
            </NavLink>
            <NavLink to="/movies/new" className="ml-2">
              New movie
            </NavLink>
            <NavLink to="/logout" className="ml-2">
              Logout
            </NavLink>
            <NavLink to="/profile" className="ml-2 p-2 border">
              NH
            </NavLink>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
