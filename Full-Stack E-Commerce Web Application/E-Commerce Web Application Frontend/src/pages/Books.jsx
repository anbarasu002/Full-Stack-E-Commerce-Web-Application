import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Books = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage
}) => {

  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(2000);
  const [sort, setSort] = useState("");

  const products = [
  { id: 1, name: "The Lost Kingdom", price: 499, discount: 20, image: "https://m.media-amazon.com/images/I/71rrPVH-xFL._AC_UF1000,1000_QL80_.jpg" },
  { id: 2, name: "Mystery of the Night", price: 599, discount: 25, image: "https://m.media-amazon.com/images/I/81OHVFFv5HL._AC_UF1000,1000_QL80_.jpg" },
  { id: 3, name: "Adventure Island", price: 699, discount: 30, image: "https://m.media-amazon.com/images/I/71cDeRRWdhL._AC_UF1000,1000_QL80_.jpg" },
  { id: 4, name: "Hidden Treasure", price: 549, discount: 18, image: "https://m.media-amazon.com/images/I/913jk-B+tZL._AC_UF1000,1000_QL80_.jpg" },
  { id: 5, name: "The Last Journey", price: 650, discount: 22, image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781398538665/the-last-journey-9781398538665_hr.jpg" },
  { id: 6, name: "Superhero Saga", price: 399, discount: 20, image: "https://images.booksense.com/images/336/311/9798228311336.jpg" },
  { id: 7, name: "Spider Hero Comics", price: 499, discount: 25, image: "https://m.media-amazon.com/images/I/91B9-aW14+L._AC_UF1000,1000_QL80_.jpg" },
  { id: 8, name: "Avengers Action", price: 599, discount: 30, image: "https://m.media-amazon.com/images/I/91E25ncbxnL._AC_UF1000,1000_QL80_.jpg" },
  { id: 9, name: "Batman Returns", price: 549, discount: 18, image: "https://m.media-amazon.com/images/I/91oin8sPg6L._UF1000,1000_QL80_.jpg" },
  { id: 10, name: "Comic Adventures", price: 450, discount: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcZNQZlgIGxl50U2ilcdc-mDOCaTSCmoPH7A&s" },
  { id: 11, name: "ABC Learning Book", price: 299, discount: 15, image: "https://m.media-amazon.com/images/I/715JYTHw2jL._AC_UF1000,1000_QL80_.jpg" },
  { id: 12, name: "Coloring Book", price: 199, discount: 20, image: "https://m.media-amazon.com/images/I/71imzfqxcJL._AC_UF1000,1000_QL80_.jpg" },
  { id: 13, name: "Bedtime Stories", price: 399, discount: 25, image: "https://m.media-amazon.com/images/I/911m3tKg15L._AC_UF1000,1000_QL80_.jpg" },
  { id: 14, name: "Numbers & Shapes", price: 249, discount: 18, image: "https://m.media-amazon.com/images/I/71ymk+jJI0L._AC_UF1000,1000_QL80_.jpg" },
  { id: 15, name: "Kids Fun Stories", price: 350, discount: 22, image: "https://m.media-amazon.com/images/I/81NtiolE9GL._AC_UF1000,1000_QL80_.jpg" },
  { id: 16, name: "React JS Guide", price: 799, discount: 30, image: "https://theroadtoenterprise.com/images/react-typescript-edition.png" },
  { id: 17, name: "JavaScript Mastery", price: 899, discount: 25, image: "https://m.media-amazon.com/images/I/71lBExcZLZL._UF1000,1000_QL80_.jpg" },
  { id: 18, name: "Python Programming", price: 999, discount: 35, image: "https://m.media-amazon.com/images/I/61ViPUXS8ZL._AC_UF1000,1000_QL80_.jpg" },
  { id: 19, name: "Full Stack Dev", price: 1299, discount: 28, image: "https://m.media-amazon.com/images/I/61jcXMvVUKL._UF1000,1000_QL80_.jpg" },
  { id: 20, name: "Data Structures", price: 899, discount: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRosT3G2e2_wIjbwO_E19MUEIjgvogasqJvFA&s" }
  ];

  useEffect(() => {
    const randomRatings = {};

    products.forEach((item) => {
      randomRatings[item.id] = Math.floor(Math.random() * 5) + 1;
    });

    setRatings(randomRatings);
  }, []);

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

      <h2>Books 📚</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="price-filter">
        <p>Max Price: ₹{price}</p>
        <input
          type="range"
          min="100"
          max="2000"
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

              <p className="price">
                ₹{finalPrice}
                <span className="old-price">₹{item.price}</span>
              </p>

              <p className="discount">{item.discount}% OFF</p>

              
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      ratings[item.id] >= star ? "star active" : "star"
                    }
                  >
                    ★
                  </span>
                ))}
                <p>{ratings[item.id]}/5</p>
              </div>

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

export default Books;