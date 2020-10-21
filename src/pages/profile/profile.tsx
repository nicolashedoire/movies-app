import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";
import { useSelector } from "react-redux";
import { getProfile, getUid } from "../../pages/auth/selectors";
import { firestore } from "../../firebase";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const profile = useSelector(getProfile);
  const uid = useSelector(getUid);

  useEffect(() => {
    if (profile.lastname && profile.firstname) {
      setLastname(profile.lastname);
      setFirstname(profile.firstname);
    }
  }, [profile]);

  useEffect(() => {}, [firstname, lastname]);

  const updateProfile = () => {
    if(!uid){
      return;
    }
    return firestore
      .collection("users")
      .doc(uid)
      .set({
        firstname,
        lastname,
        initials: `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`,
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <h1 className="mt-4">Profil</h1>
        </Col>
        <Col md={12} className="mb-4 mt-4">
          <Input
            className="mb-4"
            type="text"
            value={lastname}
            placeholder="Nom"
            autoComplete="off"
            onChange={(e) => setLastname(e.currentTarget.value)}
          />
          <Input
            type="text"
            value={firstname}
            placeholder="Prénom"
            autoComplete="off"
            onChange={(e) => setFirstname(e.currentTarget.value)}
          />
        </Col>
        <Col md={12}>
          <Button
            color="primary"
            onClick={updateProfile}
          >
            Mettre à jour le profil
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
