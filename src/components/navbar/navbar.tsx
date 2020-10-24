import React from "react";
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, getProfile } from "../../pages/auth/selectors";
import "./styles.scss";
import firebase from "../../firebase";

export default function TopBar() {
  const history = useHistory();
  const auth = useSelector(getAuth);
  const profile = useSelector(getProfile);

  return (
    <div
      style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 9999 }}
      className="navbarContainer"
    >
      <Navbar color="light" light expand="md">
        <NavLink to="/" className="ml-2">
          <NavbarBrand>Movies-app {process.env.NODE_ENV}</NavbarBrand>
        </NavLink>
        <NavbarToggler />
        <Collapse isOpen={true} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <NavbarText>
            {auth.uid ? null : (
              <React.Fragment>
                <NavLink to="/signin" className="ml-2">
                  Connexion
                </NavLink>
                <NavLink to="/signup" className="ml-2">
                  Inscription
                </NavLink>
              </React.Fragment>
            )}
            {auth.uid ? (
              <React.Fragment>
                <NavLink
                  to="/logout"
                  onClick={async () => {
                    try {
                      await firebase
                        .auth()
                        .signOut()
                        .then(() => {
                          history.push("/");
                        });
                    } catch (err) {
                      alert(err);
                    }
                  }}
                  className="ml-2"
                >
                  Deconnexion
                </NavLink>
                <NavLink to="/profile" className="ml-2 p-2 initials">
                  <span>{profile?.initials ? profile?.initials : "N/A"}</span>
                </NavLink>
              </React.Fragment>
            ) : null}
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
