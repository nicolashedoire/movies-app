import React from "react";
import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faCog,
  faHome,
  faLayerGroup,
  faFolderPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

export default function Sidebar(props: any) {
  return (
    <Container fluid className="p-0 m-0 pageContainer">
      <div className="sidebarContainer">
        <div className="sidebar">
          <ul>
            <li className="mt-2 mb-2 p-2">
              <NavLink to="/search" className="ml-2">
                <FontAwesomeIcon
                  size="1x"
                  icon={faSearch}
                  className="pointer"
                />
              </NavLink>
            </li>
            <li className="mt-2 mb-2 p-2">
              <NavLink to="/dashboard" className="ml-2">
                <FontAwesomeIcon size="1x" icon={faHome} className="pointer" />
              </NavLink>
            </li>
            <li className="mt-2 mb-2 p-2">
              <NavLink to="/movies" className="ml-2">
                <FontAwesomeIcon
                  size="1x"
                  icon={faLayerGroup}
                  className="pointer"
                />
              </NavLink>
            </li>
            <li className="mt-2 mb-2 p-2">
              <NavLink to="/movies/new" className="ml-2">
                <FontAwesomeIcon
                  size="1x"
                  icon={faFolderPlus}
                  className="pointer"
                />
              </NavLink>
            </li>
            <li className="mt-2 mb-2 p-2">
              <NavLink to="/profile" className="ml-2 p-2">
                <FontAwesomeIcon size="1x" icon={faCog} className="pointer" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {props.children}
    </Container>
  );
}
