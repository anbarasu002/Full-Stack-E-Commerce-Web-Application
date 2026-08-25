import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Sports = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage
}) => {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(10000);
  const [sort, setSort] = useState("");

  const products = [
  { id: 1, name: "Cricket Bat", price: 2999, discount: 20, image: "https://cdnmedia.dsc-cricket.com/media/catalog/product/cache/5b0ea239e50527b43e3253a7f103e237/d/s/dsc-blak-65-supreme-english-willow-india-range-cricket-bat-2.webp" },
  { id: 2, name: "Football", price: 999, discount: 25, image: "https://m.media-amazon.com/images/I/81w+EoFVdEL._AC_UF894,1000_QL80_.jpg" },
  { id: 3, name: "Badminton Racket", price: 1499, discount: 30, image: "https://m.media-amazon.com/images/I/719j2lzLn2L._AC_UF1000,1000_QL80_.jpg" },
  { id: 4, name: "Tennis Ball Set", price: 799, discount: 15, image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/ball/e/f/u/270-cricket-ball-tennis-ball-box-set-pack-green-high-bounce-soft-original-imaheyjcazerugyk.jpeg?q=70" },

  { id: 5, name: "Gym Dumbbells", price: 2499, discount: 35, image: "https://m.media-amazon.com/images/I/614EYnLQaKL._AC_UF894,1000_QL80_.jpg" },
  { id: 6, name: "Yoga Mat", price: 699, discount: 20, image: "https://sppartos.com/cdn/shop/files/31VX-aIlgWL_580x.jpg?v=1702469142" },
  { id: 7, name: "Skipping Rope", price: 399, discount: 10, image: "https://www.lifelinefitness.in/wp-content/uploads/2024/02/Skipping-Rope-1-1.webp" },
  { id: 8, name: "Sports Shoes", price: 1999, discount: 40, image: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg" },

  { id: 9, name: "Basketball", price: 1299, discount: 20, image: "https://contents.mediadecathlon.com/p3095393/32ea7227c71098e222da41c0c9d2f4bd/p3095393.jpg" },
  { id: 10, name: "Volleyball", price: 1099, discount: 15, image: "https://m.media-amazon.com/images/I/61pFab9tNeL._AC_UF894,1000_QL80_.jpg" },
  { id: 11, name: "Boxing Gloves", price: 1999, discount: 25, image: "https://contents.mediadecathlon.com/p1592998/c901b69179d40a0c2d013d8880a994f7/p1592998.jpg" },
  { id: 12, name: "Cricket Helmet", price: 1799, discount: 30, image: "https://www.brewingcricket.com/cdn/shop/files/T-Plus-Ti-BLACK_1000x.jpg-Photoroom.jpg?v=1745994273" },

  { id: 13, name: "Football Shoes", price: 2999, discount: 35, image: "https://contents.mediadecathlon.com/m20968713/6bbc76159043ca84837faca389324d36/m20968713.jpg" },
  { id: 14, name: "Sports Jersey", price: 999, discount: 20, image: "https://m.media-amazon.com/images/I/51Fk5E4852L._AC_UY1100_.jpg" },
  { id: 15, name: "Gym Gloves", price: 599, discount: 10, image: "https://strausssport.com/cdn/shop/files/71zKWjbkuyL.jpg?v=1738729805" },
  { id: 16, name: "Skipping Counter Rope", price: 899, discount: 15, image: "https://m.media-amazon.com/images/I/61Bkcx4sUeL.jpg" },

  { id: 17, name: "Badminton Shuttle Cock", price: 499, discount: 20, image: "https://m.media-amazon.com/images/I/615AczRo+aL._AC_UF894,1000_QL80_.jpg" },
  { id: 18, name: "Table Tennis Bat", price: 1299, discount: 25, image: "https://m.media-amazon.com/images/I/61pMLiRn7SL.jpg" },
  { id: 19, name: "Sports Cap", price: 399, discount: 10, image: "https://m.media-amazon.com/images/I/713ZwxZ9+TL._AC_UY1100_.jpg" },
  { id: 20, name: "Training Cones Set", price: 799, discount: 15, image: "https://nwscdn.com/media/catalog/product/cache/h900xw900/f/l/flexible-training-cones-main-new-logo.jpg" }
  ];

  const generateRandomRatings = () => {
    const r = {};
    products.forEach((p) => {
      r[p.id] = Math.floor(Math.random() * 5) + 1;
    });
    return r;
  };

  const [ratings] = useState(() => generateRandomRatings());

  const filteredProducts = products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => item.price <= price)
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

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

    showMessage("Item added to cart 🛒", "success");
  };

  const toggleWishlist = (item) => {
    const exists = wishlist.find((p) => p.id === item.id);

    if (exists) {
      setWishlist(wishlist.filter((p) => p.id !== item.id));
      showMessage("Removed from wishlist", "error");
    } else {
      setWishlist([...wishlist, item]);
      showMessage("Saved to wishlist", "success");
    }
  };

  return (
    <div className="fashion-page">

      <Navbar setPage={setPage} cart={cart} wishlist={wishlist} />

      <button onClick={() => setPage("home")} className="back-btn">
        ⬅ Back
      </button>

      <h2>Sports 🏀</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Sports Items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="price-filter">
        <p>Max Price: ₹{price}</p>
        <input
          type="range"
          min="100"
          max="10000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="sort-box">
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      <div className="product-grid">

        {filteredProducts.map((item) => {
          const finalPrice = Math.floor(
            item.price - (item.price * item.discount) / 100
          );

          const isWish = wishlist.find((p) => p.id === item.id);

          return (
            <div key={item.id} className="product-card">

              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>

              
              <div className="rating">
                {"★".repeat(ratings[item.id])}
                {"☆".repeat(5 - ratings[item.id])}
              </div>

              <p className="price">
                ₹{finalPrice}
                <span className="old-price">₹{item.price}</span>
              </p>

              <p className="discount">{item.discount}% OFF</p>

              <div className="buttons">

                <button onClick={() => addToCart(item)} className="cart-btn">
                  Add to Cart
                </button>

                <button onClick={() => toggleWishlist(item)} className="wish-btn">
                  {isWish ? "❤️ Saved" : "🤍 Wishlist"}
                </button>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Sports;