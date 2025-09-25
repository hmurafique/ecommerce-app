import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";

function App(){
  return (
    <BrowserRouter>
      <nav style={{ padding: 10 }}>
        <Link to="/">Products</Link> | <Link to="/checkout">Checkout</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
