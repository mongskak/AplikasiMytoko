import React from "react";
import CPLogin from "../components/Cp.Login";
import { Col, Row } from "react-bootstrap";
import CpTitleAction from "../components/Cp.TitleAction";

const Login = () => {
  return (
    <div className="container">
      <CpTitleAction title="Sign In" />
      <Row>
        <Col>
          <CPLogin />
        </Col>
        <Col>
          <div className="text-center">
            <img
              className=""
              width="450px"
              style={{ transform: "translate(12px, -98px)" }}
              src="https://img.freepik.com/premium-vector/website-with-shield-password-concept-cyber-security-flat-illustration_203633-7559.jpg"
            ></img>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
