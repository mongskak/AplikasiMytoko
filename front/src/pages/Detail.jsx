import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card, Button } from "react-bootstrap";
import { formatRupiah } from "../function/FormatRupiah";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [base64Data, setBase64Data] = useState("");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const getProductByid = async () => {
      const response = await axios.get(`http://localhost:7000/product/${id}`);
      setBase64Data(response.data.img);
      setDesc(response.data.description);
      setName(response.data.name);
      setPrice(response.data.price);
      setStock(response.data.stock);
      console.log(response.data);
    };
    if (id !== "new") {
      getProductByid();
    }
  }, [id]);

  return (
    <div className="container">
      <Row>
        <Col>
          <img className="w-100" src={base64Data}></img>
        </Col>
        <Col className="fw-semi-bold">
          <h1>{name}</h1>
          <br />
          <h3>{formatRupiah(price)}</h3>
          <br />
          <p>{desc}</p>
          <br />
          <div>
            <Row>
              <Col></Col>
              <Col>
                <Button variant="outline-success" className="w-40 me-3">
                  Add Cart
                </Button>
                <Button variant="success" className="w-50">
                  Order Now
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
