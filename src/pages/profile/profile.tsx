import React from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";
import { useSelector } from "react-redux";
import { getAuth, getProfile } from "../../pages/auth/selectors";

export default function Profile() {
  const profile = useSelector(getProfile);

  return (
    <Container fluid>
      <h1 className="mt-4">Profil</h1>
      {profile.lastname ? <p>Nom : {profile.lastname}</p> : null}
      {profile.firstname ? <p>Prénom : {profile.firstname}</p> : null}
    </Container>
  );
}
