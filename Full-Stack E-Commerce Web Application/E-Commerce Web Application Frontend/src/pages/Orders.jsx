import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Orders = ({ setPage, cart, wishlist, user, setUser }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data || []);
      } catch (err) {
        setError(err.message || "Could not load orders");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>

      <Navbar
        setPage={setPage}
        cart={cart}
        wishlist={wishlist}
        user={user}
        setUser={setUser}
      />

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        📦 My Orders
      </h2>

      {loading && <p style={{ textAlign: "center" }}>Loading orders...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p style={{ textAlign: "center" }}>You haven't placed any orders yet.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px",
              width: "80%",
              borderRadius: "10px"
            }}
          >
            <p style={{ marginBottom: "10px" }}>
              <b>Order #{order.id}</b> · {order.status} ·{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "8px 0"
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <div>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: 0 }}>₹{item.price} × {item.qty}</p>
                </div>
              </div>
            ))}

            <b>Order Total: ₹{Math.floor(order.total)}</b>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Orders;
