import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Checkout.css";
import api from "../services/api";

const Checkout = ({ setPage, cart, setCart, onOrderPlaced }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    payment: "cod"
  });
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum +
      (item.price - (item.price * (item.discount || 0)) / 100) *
        (item.qty || 1),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    const { name, email, phone, address, country, payment } = form;

    if (!name || !email || !phone || !address || !country || !payment) {
      alert("Please fill all details before placing order!");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setOrderError("");
    setPlacing(true);

    try {
      const order = await api.placeOrder({
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          discount: item.discount || 0,
          image: item.image,
          qty: item.qty || 1
        })),
        name,
        email,
        phone,
        address,
        country,
        payment
      });

      if (onOrderPlaced) onOrderPlaced(order);
      setCart([]);
      setPage("success");
    } catch (err) {
      setOrderError(err.message || "Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="checkout-page">

      <Navbar setPage={setPage} cart={cart} wishlist={[]} />

      <h2 className="title">Checkout 🧾</h2>

      <div className="checkout-container">

        <div className="form-box">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            rows="4"
            onChange={handleChange}
          />

          <input
            name="country"
            placeholder="Country"
            onChange={handleChange}
          />

          <div className="payment">
            <h4>Payment Method</h4>

            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={form.payment === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={form.payment === "upi"}
                onChange={handleChange}
              />
              UPI / Net Banking
            </label>

          </div>

        </div>

        <div className="summary-box">

          <h3>Order Summary</h3>

          <div className="summary-items">
            {cart.map((item) => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.name}</p>
                  <p className="summary-item-qty">Qty: {item.qty || 1}</p>
                </div>
                <p className="summary-item-price">
                  ₹
                  {Math.floor(
                    (item.price - (item.price * (item.discount || 0)) / 100) *
                      (item.qty || 1)
                  )}
                </p>
              </div>
            ))}
          </div>

          <p>Total Items: {cart.length}</p>

          <h2>Total: ₹{Math.floor(total)}</h2>

          {orderError && <p className="error">{orderError}</p>}

          <button className="place-btn" onClick={placeOrder} disabled={placing}>
            {placing ? "Placing Order..." : "Place Order"}
          </button>

          <button
            className="back-btn"
            onClick={() => setPage("cart")}
          >
            ⬅ Back
          </button>

        </div>

      </div>
    </div>
  );
};

export default Checkout;