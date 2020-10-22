import React from "react";
import { Container } from "reactstrap";
import "./styles.scss";

export default function Sidebar(props: any) {
  return (
    <Container fluid className="p-0 m-0 pageContainer">
      <div className="sidebarContainer">
        <div className="sidebar">
          <ul>
            <li className="mt-2 mb-2 p-2">A</li>
            <li className="mt-2 mb-2 p-2">B</li>
            <li className="mt-2 mb-2 p-2">C</li>
            <li className="mt-2 mb-2 p-2">D</li>
          </ul>
        </div>
      </div>
      {props.children}
    </Container>
  );
}
