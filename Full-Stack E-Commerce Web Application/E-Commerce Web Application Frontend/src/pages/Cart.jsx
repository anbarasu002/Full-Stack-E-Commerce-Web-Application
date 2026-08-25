import React from "react";
import Navbar from "../components/Navbar";
import "./Cart.css";

const Cart = ({
  setPage,
  cart,
  setCart,
  wishlist = [],
  showMessage
}) => {
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: (item.qty || 1) > 1 ? item.qty - 1 : 1
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    showMessage("Item removed from cart", "error");
  };

  const total = cart.reduce((acc, item) => {
    const qty = item.qty || 1;
    const discount = item.discount || 0;

    const finalPrice = Math.floor(
      item.price - (item.price * discount) / 100
    );

    return acc + finalPrice * qty;
  }, 0);

  return (
    <div className="cart-page">

      <Navbar setPage={setPage} cart={cart} wishlist={wishlist} />

      <h2 className="title">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty">
          <h3>Your cart is empty</h3>
          <button onClick={() => setPage("home")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-container">

            {cart.map((item) => {
              const qty = item.qty || 1;
              const discount = item.discount || 0;

              const finalPrice = Math.floor(
                item.price - (item.price * discount) / 100
              );

              return (
                <div className="cart-card" key={item.id}>

                  <img src={item.image} alt={item.name} />

                  <div className="cart-info">
                    <h3>{item.name}</h3>

                    <p>Price: ₹{finalPrice}</p>

                    <div className="qty">
                      <button onClick={() => decreaseQty(item.id)}>
                        ➖
                      </button>

                      <span>{qty}</span>

                      <button onClick={() => increaseQty(item.id)}>
                        ➕
                      </button>
                    </div>

                    <p>Total: ₹{finalPrice * qty}</p>

                    <button
                      className="remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

      
          <div className="bottom">

            <h2>Total Amount: ₹{total}</h2>

            <button
              className="checkout"
              onClick={() => setPage("checkout")}   
            >
              Proceed to Checkout
            </button>

            <button
              className="shop"
              onClick={() => setPage("home")}
            >
              ⬅ Continue Shopping
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;