import React from "react";
import Navbar from "../components/Navbar";
import "./Wishlist.css";

const Wishlist = ({
  setPage,
  wishlist,
  cart,
  setCart,
  setWishlist,
  showMessage
}) => {

  const moveToCart = (item) => {
    const exists = cart.find((p) => p.id === item.id);

    if (exists) {
      setCart(
        cart.map((p) =>
          p.id === item.id
            ? { ...p, qty: (p.qty || 1) + 1 }
            : p
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }

    showMessage("Moved to cart 🛒", "success");
  };

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);   

    showMessage("Removed from wishlist", "error");
  };

  return (
    <div className="wishlist-page">

      <Navbar setPage={setPage} cart={cart} wishlist={wishlist} />

      <h2 className="title">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="empty">
          <h3>No items in wishlist</h3>
          <button onClick={() => setPage("fashion")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">

          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-card">

              <img src={item.image} alt={item.name} />

              <div className="info">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div className="buttons">

                  <button
                    className="cart-btn"
                    onClick={() => moveToCart(item)}
                  >
                    🛒 Move to Cart
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    ❌ Remove
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Wishlist;