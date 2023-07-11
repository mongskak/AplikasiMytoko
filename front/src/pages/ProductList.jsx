import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CpTitleAction from "../components/Cp.TitleAction";
import { Button } from "react-bootstrap";
import { formatRupiah } from "../function/FormatRupiah";

function ProductList() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:7000/products");
      setProducts(response.data);
    };
    getProducts();
  }, []);
  return (
    <div className="container">
      <CpTitleAction
        title="Product List"
        action={
          <Link className="btn btn-primary" to="/productdetail/new">
            Add Product
          </Link>
        }
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Products.map((produk, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/productdetail/${produk.id}`}
                >
                  {produk.name}
                </Link>
              </td>
              <td>{produk.description}</td>
              <td>{produk.stock}</td>
              <td>{formatRupiah(produk.price)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
