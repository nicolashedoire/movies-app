import React, { useState } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";
import firebase, { firestore } from "../../../firebase";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((response) => {
          return firestore
            .collection("users")
            .doc(response.user?.uid)
            .set({
              firstname,
              lastname,
              initials: `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`,
            });
        })
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <h3 className="mt-4">Inscription</h3>
        <Row className="mt-4">
          <Col md={12} className="mb-4">
            <Input
              type="email"
              placeholder="Username"
              value={username}
              autoComplete="off"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="FirstName"
              value={firstname}
              autoComplete="off"
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="LastName"
              value={lastname}
              autoComplete="off"
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </Col>
          <Col md={12}>
            <Button>S'inscrire</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
