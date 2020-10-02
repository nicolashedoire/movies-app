import React, { useState } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <h3 className="mt-4">SignIn</h3>
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
            <Button>Login</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
