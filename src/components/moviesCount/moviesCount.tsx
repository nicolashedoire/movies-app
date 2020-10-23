import React from "react";
import { Row, Col, Alert } from "reactstrap";
import styles from "./styles.module.scss";

export default function MoviesCount({ count }: { count: string }) {
  return (
    <Row>
      <Col md={12} className="p-0">
        <Alert color="secondary" className={styles.background}>
          {count} films
        </Alert>
      </Col>
    </Row>
  );
}
