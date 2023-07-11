import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { GetUserId } from "../function/GetLoginUserid";

function CpNavbar() {
  const [isLogin, setIsLogin] = useState(GetUserId() !== undefined);
  const [Name, setName] = useState("");
  const Logout = async () => {
    try {
      const response = await axios.delete("http://localhost:7000/logout");
      // await Swal.fire("Bye! 👋", response.data.msg, "success");

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      Swal.fire("Oops!", error.response.data.msg, "error");
    }
  };

  const getName = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/user/" + GetUserId()
      );
      //console.log(response.data);
      setName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (GetUserId() !== undefined) {
      getName();
    }
  }, []);

  // console.log(isLogin);
  return (
    <div style={{ border: "1px solid #eaeaea", marginBottom: "100px" }}>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container fluid>
          <Navbar.Brand href="/home">MyToko</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/products" className={isLogin ? "" : "d-none"}>
                Products
              </Nav.Link>
              <Nav.Link href="/about" className={isLogin ? "" : "d-none"}>
                About
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              {Name}
              <Button
                variant="outline-success"
                className={isLogin ? "ms-2" : "d-none"}
                onClick={Logout}
              >
                Logout
              </Button>
              <Link
                className={isLogin ? "d-none" : "btn btn-primary me-2"}
                to="/"
              >
                Login
              </Link>
              <Link
                className={isLogin ? "d-none" : "btn btn-outline-primary "}
                to="/register"
              >
                Register
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CpNavbar;
