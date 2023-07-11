import React from "react";
import CpRegister from "../components/Cp.Register";
import { Card, Col, Row } from "react-bootstrap";
import CpTitleAction from "../components/Cp.TitleAction";

const Register = () => {
  return (
    <div className="container">
      <CpTitleAction title="Sign Up"></CpTitleAction>
      <Row>
        <Col>
          <CpRegister />
        </Col>
        <Col>
          <div className="text-center">
            <img
              className=""
              width="450px"
              style={{ transform: "translate(10px, -68px)" }}
              src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-internet-security_516790-1591.jpg"
            ></img>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
