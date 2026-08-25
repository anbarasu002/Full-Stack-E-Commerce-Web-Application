import React from "react";
import Navbar from "../components/Navbar";
import "./OrderSuccess.css";

const OrderSuccess = ({ setPage, cart, order }) => {
  const total = order
    ? Math.floor(order.total)
    : cart.reduce((sum, item) => {
        const qty = item.qty || 1;
        const discount = item.discount || 0;

        const finalPrice = Math.floor(
          item.price - (item.price * discount) / 100
        );

        return sum + finalPrice * qty;
      }, 0);

  return (
    <div className="success-page">

      <Navbar setPage={setPage} cart={cart} wishlist={[]} />

      <div className="success-box">

        <h1>🎉 Order Placed Successfully!</h1>

        <p className="msg">
          We see you're back for more! Thank you for being a loyal customer—we love serving you
        </p>

        <h2>Total Amount: ₹{Math.floor(total)}</h2>

        <button
          className="back-shop"
          onClick={() => setPage("home")}
        >
          🛍 Back to Shop
        </button>

      </div>

    </div>
  );
};

export default OrderSuccess;