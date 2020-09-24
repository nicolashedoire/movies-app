import React from 'react';
import { Row, Col } from 'reactstrap';

export default function MoviesCount({ count }: {count: string}) {
    return (
        <Row>
            <Col md={12}>
                <p className="p-4">{count} films</p>
            </Col>
        </Row>
    )
}