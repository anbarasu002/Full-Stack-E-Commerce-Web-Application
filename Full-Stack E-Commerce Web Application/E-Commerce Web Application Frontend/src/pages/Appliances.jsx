import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Appliances = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage
}) => {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(50000);
  const [sort, setSort] = useState("");

  const products = [
  { id: 1, name: "Refrigerator", price: 24999, discount: 20, image: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/jioretailer/products/pictures/item/free/original/vTqfPDV8-C-bpl-brf-3800avss-refrigerator-492284021-1-1200wx1200h.jpeg" },
  { id: 2, name: "Washing Machine", price: 18999, discount: 25, image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/308169_nhjiel.png" },
  { id: 3, name: "Air Conditioner", price: 32999, discount: 30, image: "https://m.media-amazon.com/images/I/71+G7Rr-cBL.jpg" },
  { id: 4, name: "Microwave Oven", price: 7999, discount: 35, image: "https://www.electrolux.in/globalassets/support/faq/microwave-faq-640x640.jpg?width=464" },

  { id: 5, name: "Mixer Grinder", price: 2999, discount: 15, image: "https://m.media-amazon.com/images/I/61arz2nJBbL._AC_UF894,1000_QL80_.jpg" },
  { id: 6, name: "Electric Kettle", price: 1499, discount: 20, image: "https://www.bbassets.com/media/uploads/p/l/40317802_2-wonderchef-crescent-electric-kettle.jpg" },
  { id: 7, name: "Ceiling Fan", price: 2499, discount: 25, image: "https://ankurelectricals.com/cdn/shop/files/1_9914d9e5-393b-450b-b69c-317cc1285647.png?v=1729681211" },
  { id: 8, name: "Water Purifier", price: 10999, discount: 30, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTysjB86EU08Y1vuDKRhgRezvVdfEC47XFXSw&s" },

  { id: 9, name: "Induction Stove", price: 1999, discount: 20, image: "https://www.lifelongindiaonline.com/cdn/shop/files/1._Image_9867d677-79a8-43d7-bb20-169747f5a3c8.jpg?v=1752144826" },
  { id: 10, name: "Electric Iron", price: 1299, discount: 15, image: "https://m.media-amazon.com/images/I/510o881zPLL._AC_UF894,1000_QL80_.jpg" },
  { id: 11, name: "Vacuum Cleaner", price: 4999, discount: 25, image: "https://m.media-amazon.com/images/I/51-NgiUucAL._AC_UF894,1000_QL80_.jpg" },
  { id: 12, name: "Dishwasher", price: 35999, discount: 30, image: "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/bosch-series-6-15-place-settings-dishwasher-sms6hmi00i-silver-inox-front-view.png" },

  { id: 13, name: "Smart TV", price: 42999, discount: 20, image: "https://amstradworld.com/wp-content/uploads/2023/12/Amstrad-AM65UWGTA-WebOS-TV_front.jpg" },
  { id: 14, name: "Room Heater", price: 2999, discount: 18, image: "https://longwayindia.com/cdn/shop/files/LW-Blaze-800-W-2R-Gray-P1.jpg?v=1756816467" },
  { id: 15, name: "Air Cooler", price: 8999, discount: 22, image: "https://m.media-amazon.com/images/I/71S3lGnLYuL._AC_SL1500_.jpg" },
  { id: 16, name: "Toaster", price: 1499, discount: 15, image: "https://media.tatacroma.com/Croma%20Assets/Small%20Appliances/Toasters%20Sandwich%20Makers/Images/234744_0_wtuotf.png" },

  { id: 17, name: "Juicer Mixer", price: 3499, discount: 20, image: "https://m.media-amazon.com/images/I/615eo-7xrTL._AC_UF894,1000_QL80_.jpg" },
  { id: 18, name: "Coffee Maker", price: 4999, discount: 25, image: "https://m.media-amazon.com/images/I/61w-WO4aQsL._AC_UF894,1000_QL80_.jpg" },
  { id: 19, name: "LED Bulb Set", price: 799, discount: 10, image: "https://5.imimg.com/data5/SELLER/Default/2023/4/298726843/AW/CM/OE/7093821/havells-9watt-led-bulb-for-your-home-and-office-set-of-4-.jpg" },
  { id: 20, name: "Smart Home Hub", price: 5999, discount: 20, image: "https://m.media-amazon.com/images/I/61tMoVGYglL.jpg" }
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
      showMessage("Removed from wishlist ", "error");
    } else {
      setWishlist([...wishlist, item]);
      showMessage("Saved to wishlist ", "success");
    }
  };

  return (
    <div className="fashion-page">

      <Navbar setPage={setPage} cart={cart} wishlist={wishlist} />

      <button onClick={() => setPage("home")} className="back-btn">
        ⬅ Back
      </button>

      <h2>Appliances 🏠</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Appliances..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="price-filter">
        <p>Max Price: ₹{price}</p>
        <input
          type="range"
          min="500"
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

export default Appliances;