import React, { useState } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";

export default function MoviesCreate() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(title, date);
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <h3 className="mt-4">New Movie</h3>
        <Row className="mt-4">
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="Image url"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="date"
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.currentTarget.value)}
            />
          </Col>
          <Col md={12}>
            <Button>Create</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
