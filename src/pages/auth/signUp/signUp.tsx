import React, { useState } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(username, password);
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
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="FirstName"
              value={firstname}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="LastName"
              value={lastname}
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
