import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";
import { useSelector } from "react-redux";
import { getProfile, getUid } from "../auth/selectors";
import { firestore } from "../../firebase";

export default function Search() {
  const profile = useSelector(getProfile);
  const uid = useSelector(getUid);

  return (
    <Container className="mt-4">
      <Row className="mt-4">
        <Col md={12} className="mt-4">
          <Input type="text" placeholder="recherchez un film..."/>
        </Col>
      </Row>
    </Container>
  );
}
