import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () => (
  <Container className="mt-5">
    <Row>
      <Col className="d-flex align-items-center justify-content-center">
        <div>
          <h1 className="required">Page Not Found!</h1>
          <p className="text-muted">The page you are looking for does not exist.</p>
        </div>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
