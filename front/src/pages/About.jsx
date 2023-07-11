import React from "react";
import CpTitleAction from "../components/Cp.TitleAction";
import { Col, Row } from "react-bootstrap";

const About = () => {
  return (
    <div className="container">
      <CpTitleAction title="About" />
      <Row>
        <Col>
          <img
            style={{ transform: "translate(10px, -46px)" }}
            src="https://img.freepik.com/free-vector/shop-with-sign-we-are-open_23-2148562565.jpg?w=360"
          ></img>
        </Col>
        <Col className="fw-semi-bold">
          <p>
            MyToko is a place that offers a wide range of goods and products to
            its customers. The shop provides various categories of items,
            including clothing, electronics, food and beverages, and household
            goods. With its diverse product selection, customers can easily find
            what they need in this store.
          </p>
          <p>
            Furthermore, MyToko provides an enjoyable and comfortable shopping
            experience for its customers. The store has friendly and
            well-trained staff members who are ready to assist customers in
            finding their desired products and offer helpful advice.
            Additionally, MyToko often holds attractive promotions and
            discounts, allowing customers to obtain products at more affordable
            prices. With its quality products and excellent customer service,
            MyToko has become a favorite shopping destination for many people.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default About;
