import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CPLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/login", {
        email: email,
        password: password,
      });
      // await Swal.fire("Good job!", response.data.msg, "success");

      window.location.href = "/home";
    } catch (error) {
      //console.log(error);
      if (error.response) {
        Swal.fire("Oops!", error.response.data.msg, "error");
      }
    }
  };

  return (
    <div className="">
      <Card>
        <Card.Body>
          <Form onSubmit={Login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <span className="ms-3">
              don't have account?{" "}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Register
              </Link>
            </span>
          </Form>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CPLogin;
