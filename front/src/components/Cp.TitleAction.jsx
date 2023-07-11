import React from "react";
import { Col, Row } from "react-bootstrap";

const CpTitleAction = (props) => {
  return (
    <div className="mb-5">
      <Row className="d-flex align-items-center">
        <Col className="text-start fs-1 fw-semibold">{props.title}</Col>
        <Col className="text-end">{props.action}</Col>
      </Row>
    </div>
  );
};

export default CpTitleAction;
