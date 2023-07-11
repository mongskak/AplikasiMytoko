import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CpNavbar from "./components/Cp.Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import About from "./pages/About";
import Detail from "./pages/Detail";
import { useState } from "react";

function App() {
  return (
    <Router>
      <CpNavbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id/:name" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
