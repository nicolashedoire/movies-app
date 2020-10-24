import React, { useState } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";
import firebase from "../../../firebase";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
          history.push("/dashboard");
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
        <h3 className="mt-4">Connexion</h3>
        <Row className="mt-4">
          <Col md={12} className="mb-4">
            <Input
              type="email"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Col>
          <Col md={12}>
            <Button color="primary" onClick={handleSubmit}>
              Se connecter
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
