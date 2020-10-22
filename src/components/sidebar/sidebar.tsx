import React from "react";
import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHome, faLayerGroup, faFolderPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

export default function Sidebar(props: any) {
  return (
    <Container fluid className="p-0 m-0 pageContainer">
      <div className="sidebarContainer">
        <div className="sidebar">
          <ul>
          <li className="mt-2 mb-2 p-2">
            <FontAwesomeIcon size="1x" icon={faSearch} className="pointer" />
            </li>
            <li className="mt-2 mb-2 p-2">
            <FontAwesomeIcon size="1x" icon={faHome} className="pointer" />
            </li>
            <li className="mt-2 mb-2 p-2">
            <FontAwesomeIcon size="1x" icon={faLayerGroup} className="pointer" />
            </li>
            <li className="mt-2 mb-2 p-2">
            <FontAwesomeIcon size="1x" icon={faFolderPlus} className="pointer" />
            </li>
            <li className="mt-2 mb-2 p-2">
              <FontAwesomeIcon size="1x" icon={faCog} className="pointer" />
            </li>
          </ul>
        </div>
      </div>
      {props.children}
    </Container>
  );
}
