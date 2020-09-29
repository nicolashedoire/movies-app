import React from "react";
import { Row, Col, Alert } from "reactstrap";

export default function MoviesCount({ count }: { count: string }) {
  return (
    <Row>
      <Col md={12}>
        <Alert color="secondary" className="p-4">
          {count} films
        </Alert>
      </Col>
    </Row>
  );
}
