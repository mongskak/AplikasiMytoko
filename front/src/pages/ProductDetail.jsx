import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Form, Card, Row, Col } from "react-bootstrap";
import CpTitleAction from "../components/Cp.TitleAction";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
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
  //console.log(id);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 20000) {
      Swal.fire(
        "Oops!",
        "File yg di upload " +
          Math.round(file.size / 1024) +
          "Kb, File Image tidak boleh melebihi 10Kb ",
        "error"
      );
      return false;
    }
    setSelectedFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      const convertedBase64 = reader.result;
      setBase64Data(convertedBase64);
    };

    reader.readAsDataURL(file);
  };
  //console.log(base64Data);
  //   console.log(selectedFile);
  const SaveData = (e) => {
    e.preventDefault();

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Data = reader.result;
        //const dataBase64 = base64Data.substring(23, base64Data.length);
        //console.log(dataBase64); // Lakukan apa pun dengan data base64 ini, seperti mengirimnya ke server

        try {
          const response = await axios.post("http://localhost:7000/products", {
            name: name,
            description: desc,
            stock: stock,
            price: price,
            img: base64Data,
          });
          Swal.fire("Success!", response.data.msg, "success");
          navigate("/products");
        } catch (error) {
          console.log(error);
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const UpdateData = async (id) => {
    console.log(id);
    try {
      const response = await axios.put(`http://localhost:7000/product/${id}`, {
        name: name,
        description: desc,
        stock: stock,
        price: price,
        img: base64Data,
      });
      Swal.fire("Success!", response.data.msg, "success");
      navigate("/products");
    } catch (error) {
      if (error.response) {
        Swal.fire("Oops!", error.response.data.msg, "error");
      }
    }
  };

  const SubmitData = (id) => {
    console.log(id);
    if (id !== "new") {
      UpdateData(id);
    } else {
      SaveData();
    }
  };

  const deleteProduct = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(
            "http://localhost:7000/product/" + id
          );
          Swal.fire("Deleted", response.data.msg, "success");
          navigate("/products");
        }
      });
    } catch (error) {
      if (error.response) {
        Swal.fire("Oops!", error.response.data.msg, "error");
      }
    }
  };

  return (
    <div className="container ">
      <CpTitleAction
        title={id !== "new" ? "Update Product" : "Add Product"}
        action={
          <Button
            className={id !== "new" ? "" : "d-none"}
            variant="danger"
            onClick={deleteProduct}
          >
            Delete
          </Button>
        }
      />
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form>
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
                    value={name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    style={{ height: "100px" }}
                    as="textarea"
                    placeholder="Description product"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Stock"
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price product"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </Form.Group>

                <Button variant="primary" onClick={() => SubmitData(id)}>
                  {id ? "Update" : "Save"}
                </Button>
                <Link className="ms-2 btn btn-outline-primary" to="/products">
                  Back
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <div className=" d-flex justify-content-center">
            <Form.Group className={base64Data ? "" : "d-none"}>
              <Card style={{ width: "500px" }}>
                <Card.Img src={base64Data}></Card.Img>
              </Card>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetail;
