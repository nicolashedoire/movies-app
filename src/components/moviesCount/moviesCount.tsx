import React from "react";
import { Row, Col, Alert } from "reactstrap";

export default function MoviesCount({ count }: { count: string }) {
  return (
    <Row>
      <Col md={12} className="p-0">
        <Alert color="secondary">{count} films</Alert>
      </Col>
    </Row>
  );
}
