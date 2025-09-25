import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Products(){
  const [products, setProducts] = useState([]);
  useEffect(()=> {
    axios.get(process.env.REACT_APP_PRODUCT_API || "http://localhost:5002/api/products")
      .then(r => setProducts(r.data))
      .catch(console.error);
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <b>{p.title}</b> — ${p.price} — stock {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
