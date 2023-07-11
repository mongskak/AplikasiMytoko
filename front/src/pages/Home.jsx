import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { formatRupiah } from "../function/FormatRupiah";

const Home = () => {
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:7000/products");
      setProducts(response.data);
    };
    getProducts();
  }, []);
  console.log(Products);

  const getDetail = (id, name) => {
    const detailName = name.replace(/\s/g, "-");
    navigate("/detail/" + id + "/" + detailName);
  };
  return (
    <>
      <img
        className="w-100"
        style={{ marginTop: "-50px" }}
        src="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
      ></img>
      <div
        className="container"
        style={{ position: "relative", top: "-130px" }}
      >
        {/* <CpTitleAction title="Product" /> */}
        <Row>
          {Products.map((produk, idx) => (
            <Col key={idx}>
              <Card
                style={{
                  width: "15rem",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => getDetail(produk.id, produk.name)}
              >
                <Card.Img variant="top" src={produk.img} />
                <Card.Text className="m-3 fw-bold " style={{ height: "50px" }}>
                  {produk.name}
                </Card.Text>
                <Card.Text className="m-3 fw-bold">
                  {formatRupiah(produk.price)}
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
