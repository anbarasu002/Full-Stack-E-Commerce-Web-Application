import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Mobile = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage
}) => {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(100000);
  const [sort, setSort] = useState("");

  const products = [
  { id: 1, name: "iPhone 17 Pro Max Silicone Case with MagSafe – Terra Cotta", price: 69999, discount: 10, image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFQ4?wid=4000&hei=4000&fmt=jpeg&qlt=90&.v=1757534575976" },
  { id: 2, name: "Samsung s25 ultra", price: 59999, discount: 15, image: "https://darlingretail.com/cdn/shop/files/1_2_be316c5f-5d44-4f33-a540-80cedf642b71_800x.jpg?v=1753531706" },
  { id: 3, name: "OnePlus 11", price: 49999, discount: 20, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQcveS_Dogo1vR8b6Il29bvM6IDPqY-i4Ig&s" },
  { id: 4, name: "Realme 12 Pro", price: 24999, discount: 25, image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/304506_0_vwxf1m.png" },

  { id: 5, name: "Xiaomi Redmi Note 13", price: 17999, discount: 18, image: "https://m.media-amazon.com/images/I/71VW8LmqqPL._AC_UF1000,1000_QL80_.jpg" },
  { id: 6, name: "Vivo V29", price: 32999, discount: 22, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKM5IxpI13mDxukejySoH-1ySJKKyNN7t8JA&s" },
  { id: 7, name: "Oppo Reno 10", price: 28999, discount: 20, image: "https://img-prd-pim.poorvika.com/product/Oppo-reno-10-5g-ice-blue-256gb-8gb-ram-Front-Back-View.png" },
  { id: 8, name: "Google Pixel 7", price: 54999, discount: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8FTbcd4woEvhm7PwlUUZawoh4e-wLarb1pQ&s" },

  { id: 9, name: "iPhone 14", price: 79999, discount: 8, image: "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/apple-iphone-14-pro-gold-128gb-front-and-back-view.png" },
  { id: 10, name: "Samsung A54", price: 38999, discount: 18, image: "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/samsung-galaxy-a54-5g-awesome-violet-256gb-8gb-ram-back-front-view.png" },
  { id: 11, name: "iQOO Neo 7", price: 31999, discount: 20, image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/mobile/1/d/a/neo-7-5g-i2214-iqoo-original-imagn9wdw6vqxsrv.jpeg?q=70" },
  { id: 12, name: "Motorola Edge 40", price: 27999, discount: 15, image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/mobile/j/q/2/edge-40-neo-payj0001in-motorola-original-imagtkf5ewhafvhh.jpeg?q=70" },

  { id: 13, name: "Poco X5 Pro", price: 22999, discount: 25, image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/mobile/a/x/j/-original-imagmkjfhzjhfhhe.jpeg?q=70" },
  { id: 14, name: "Samsung Z Flip 5", price: 99999, discount: 10, image: "https://m.media-amazon.com/images/I/61Tl1z+Hn0L._AC_UF1000,1000_QL80_.jpg" },
  { id: 15, name: "iPhone SE", price: 49999, discount: 12, image: "https://buy.gazelle.com/cdn/shop/files/iPhone_SE_3rd_Gen_-_RED-_Overlap_Trans-cropped.jpg?v=1757019093&width=1445" },
  { id: 16, name: "Realme Narzo 60", price: 15999, discount: 20, image: "https://www.91-img.com/pictures/157444-v5-realme-narzo-60-5g-mobile-phone-hres-14.jpg?tr=h-271,c-at_max,q-70,pr-true" },

  { id: 17, name: "Infinix Zero 30", price: 18999, discount: 22, image: "https://rukminim2.flixcart.com/image/480/640/xif0q/mobile/w/x/0/-original-imagszg3qxqgdx9c.jpeg?q=90" },
  { id: 18, name: "Asus ROG Phone 7", price: 74999, discount: 15, image: "https://dlcdnwebimgs.asus.com/gain/A16F8224-F8F7-44F3-A1D5-A9A1AEC9F92D" },
  { id: 19, name: "Samsung M14", price: 14999, discount: 18, image: "https://m.media-amazon.com/images/I/913EiorAS0L.jpg" },
  { id: 20, name: "OnePlus Nord CE 3", price: 24999, discount: 20, image: "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/product/ziti/ziti-specs-gray.png" }
  ];

  const [ratings] = useState(() => {
    const r = {};
    products.forEach((p) => {
      r[p.id] = Math.floor(Math.random() * 5) + 1;
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

      <h2>Mobile 📱</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="price-filter">
        <p>Max Price: ₹{price}</p>
        <input
          type="range"
          min="5000"
          max="100000"
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

export default Mobile;