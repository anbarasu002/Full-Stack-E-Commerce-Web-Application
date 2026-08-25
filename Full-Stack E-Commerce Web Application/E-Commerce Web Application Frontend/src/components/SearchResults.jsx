import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../pages/Fashion.css";

const SearchResults = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage,
  search
}) => {

  const [ratings, setRatings] = useState({});


  const filtered = products.filter((item) => {
    const productName = item.name.toLowerCase();
    const searchText = search.toLowerCase().trim();

    return productName.includes(searchText);
  });

  
  const handleRating = (id, value) => {
    setRatings((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const addToCart = (item) => {
    const exists = cart.find((p) => p.id === item.id);

    if (exists) {
      setCart(
        cart.map((p) =>
          p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }

    showMessage("Added to cart 🛒", "success");
  };

  const toggleWishlist = (item) => {
    const exists = wishlist.find((p) => p.id === item.id);

    if (exists) {
      setWishlist(wishlist.filter((p) => p.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  return (
    <div className="fashion-page">

      <Navbar setPage={setPage} cart={cart} wishlist={wishlist} />

      <button onClick={() => setPage("home")} className="back-btn">
        ⬅ Back
      </button>

      <h2>🔍 Search Results</h2>
      <p>Search: <b>{search}</b></p>

      <div className="product-grid">

        {filtered.length === 0 ? (
          <h3 style={{ textAlign: "center" }}> No Products Found</h3>
        ) : (
          filtered.map((item) => {
            const finalPrice = Math.floor(
              item.price - (item.price * item.discount) / 100
            );

            const isWish = wishlist.find((p) => p.id === item.id);

            return (
              <div key={item.id} className="product-card">

                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>

                <p className="price">
                  ₹{finalPrice}
                  <span className="old-price">₹{item.price}</span>
                </p>

                <p className="discount">{item.discount}% OFF</p>

                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(item.id, star)}
                      className={
                        ratings[item.id] >= star ? "star active" : "star"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="buttons">

                  <button onClick={() => addToCart(item)} className="cart-btn">
              
                  </button>

                  <button onClick={() => toggleWishlist(item)} className="wish-btn">
                    {isWish ? "❤️ Saved" : "🤍 Wishlist"}
                  </button>

                </div>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
};

export default SearchResults;