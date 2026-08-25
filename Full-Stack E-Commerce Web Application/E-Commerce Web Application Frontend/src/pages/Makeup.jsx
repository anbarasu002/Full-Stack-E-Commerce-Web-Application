import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Makeup = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage
}) => {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(5000);
  const [sort, setSort] = useState("");

  const products = [
  { id: 1, name: "Lipstick", price: 499, discount: 20, image: "https://ibacosmetics.com/cdn/shop/products/iba-pure-lips-long-stay-matte-lipstick---m13-pink-rose_1_1_aa73a0e7-c78a-41f3-8b4b-c7796847505e.png?v=1630582063&width=800" },
  { id: 2, name: "Foundation", price: 899, discount: 25, image: "https://www.maybelline.co.in/-/media/project/loreal/brand-sites/mny/apac/in/products/face/foundation/fitme-matte-and-poreless-foundation/modules/product-info/230-natural-buff/fmt-bottle_230.jpg?rev=33ef371d8035472d832d71497b2968f6&cx=0&cy=0&cw=315&ch=472&hash=8EAC69651BEEA8CF1FA9696A8E547BD2" },
  { id: 3, name: "Face Powder", price: 699, discount: 30, image: "https://m.media-amazon.com/images/I/61HK1LAqaoL.jpg" },
  { id: 4, name: "Eye Liner", price: 299, discount: 15, image: "https://goodchoiceindia.com/cdn/shop/files/EL05_30b2a7ac-eec3-4e7d-b050-c57554fb7d1f.jpg?v=1736945263" },

  { id: 5, name: "Mascara", price: 599, discount: 20, image: "https://static.beautytocare.com/cdn-cgi/image/f=auto/media/catalog/product/m/a/maybelline-lash-sensational-washable-mascara-very-black-9-5ml.png" },
  { id: 6, name: "Blush", price: 499, discount: 22, image: "https://revolutionbeauty.in/cdn/shop/files/5057566865128_1.jpg?v=1754899422" },
  { id: 7, name: "Highlighter", price: 799, discount: 28, image: "https://www.paccosmetics.com/cdn/shop/files/8904341201022_IMG.other1.jpg?v=1718017165&width=1500" },
  { id: 8, name: "Concealer", price: 699, discount: 25, image: "https://images-static.nykaa.com/media/catalog/product/e/0/e0b44ac607845012351_1.jpg?tr=w-500" },

  { id: 9, name: "Compact Powder", price: 549, discount: 18, image: "https://images-static.nykaa.com/media/catalog/product/0/0/0060d70LAK-new_8901030366727-new_1.jpg?tr=w-500" },
  { id: 10, name: "Lip Gloss", price: 399, discount: 20, image: "https://www.dotandkey.com/cdn/shop/files/1e.jpg?v=1760127117&width=700" },
  { id: 11, name: "Eye Shadow Palette", price: 999, discount: 30, image: "https://m.media-amazon.com/images/I/61Q6VuQYNmL._AC_UF1000,1000_QL80_.jpg" },
  { id: 12, name: "Makeup Kit", price: 1499, discount: 35, image: "https://m.media-amazon.com/images/I/811PxEGuypL._AC_UF1000,1000_QL80_.jpg" },

  { id: 13, name: "BB Cream", price: 699, discount: 22, image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/loe/loe21147/l/27.jpg" },
  { id: 14, name: "CC Cream", price: 749, discount: 24, image: "https://m.media-amazon.com/images/I/51IgR2yRK2L.jpg" },
  { id: 15, name: "Makeup Brushes Set", price: 899, discount: 27, image: "https://m.media-amazon.com/images/I/410tiL4QgAL._AC_UF1000,1000_QL80_.jpg" },
  { id: 16, name: "Nail Polish", price: 199, discount: 15, image: "https://m.media-amazon.com/images/I/61bbT6ZNKpL._AC_UF1000,1000_QL80_.jpg" },

  { id: 17, name: "Primer", price: 799, discount: 26, image: "https://m.media-amazon.com/images/I/61FfGNgMGsL._AC_UF1000,1000_QL80_.jpg" },
  { id: 18, name: "Setting Spray", price: 899, discount: 25, image: "https://m.media-amazon.com/images/I/61LNZxUmSPL._AC_UF1000,1000_QL80_.jpg" },
  { id: 19, name: "Kajal", price: 249, discount: 18, image: "https://www.osheaherbals.com/cdn/shop/files/1.FOP_a01e3838-9195-4a3b-8b75-bfa7d3a7f30d.jpg?v=1742294516" },
  { id: 20, name: "Makeup Remover", price: 499, discount: 20, image: "https://i5.walmartimages.com/seo/Neutrogena-Gentle-Oil-Free-Eye-Makeup-Remover-Cleanser-8-0-fl-oz_4a9a08e1-f0cc-4bdb-a23d-c1fffd02381f.40838fc0219f77682fd7f95a5302ebe4.jpeg" }
  ];

  const [ratings] = useState(() => {
    const r = {};
    products.forEach((p) => {
      r[p.id] = Math.floor(Math.random() * 5) + 1; // 1 to 5 stars
    });
    return r;
  });

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

      <h2>Makeup 💄</h2>

      
      <div className="search-box">
        <input
          placeholder="Search Makeup..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      <div className="price-filter">
        <p>Max Price: ₹{price}</p>
        <input
          type="range"
          min="100"
          max="5000"
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

export default Makeup;