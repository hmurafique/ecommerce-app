import React, {useState} from "react";
import axios from "axios";

export default function Checkout(){
  const [userId, setUserId] = useState("user_1");
  const [itemsJSON, setItemsJSON] = useState('[{"productId":"<id>","qty":1,"price":10}]');

  const placeOrder = async () => {
    try {
      const items = JSON.parse(itemsJSON);
      const res = await axios.post(process.env.REACT_APP_ORDER_API || "http://localhost:5003/api/orders", {
        userId, items, paymentMethod: { type: "card", token: "tok_test" }
      });
      alert("Order placed: " + JSON.stringify(res.data));
    } catch (err) {
      alert("Order failed: " + err?.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout (mock)</h1>
      <div>
        <label>UserId</label><br/>
        <input value={userId} onChange={e=>setUserId(e.target.value)} />
      </div>
      <div>
        <label>Items JSON</label><br/>
        <textarea rows={6} cols={80} value={itemsJSON} onChange={e=>setItemsJSON(e.target.value)} />
      </div>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
