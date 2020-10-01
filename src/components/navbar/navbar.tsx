import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

export default function TopBar() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Movies-app</NavbarBrand>
        <NavbarToggler />
        <Collapse isOpen={true} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <NavbarText>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
