import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Form, Card } from "react-bootstrap";

function FileInput() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Data = reader.result;
        const dataBase64 = base64Data.substring(23, base64Data.length);
        console.log(dataBase64); // Lakukan apa pun dengan data base64 ini, seperti mengirimnya ke server

        try {
          const response = await axios.post("http://localhost:7000/products", {
            name: name,
            description: desc,
            stock: stock,
            price: price,
            img: dataBase64,
          });
          Swal.fire("Success!", response.data.msg, "success");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="d-flex justify-content-center ">
      <Card>
        <Card.Body>
          <Card.Title className="mb-3">Add Product</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description product"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock"
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price product"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Link className="ms-2 btn btn-outline-primary" to="/products">
              Back
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FileInput;
