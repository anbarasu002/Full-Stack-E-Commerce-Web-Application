import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Shoes = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage
}) => {

  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(5000);
  const [sort, setSort] = useState("");

  const products = [
    {
    id: 1,
    name: "Nike Running Shoes",
    price: 2999,
    discount: 30,
    image: "https://cdn.plutosport.com/a/ProductMedia/Nike/P.NIKE.RSH.5248/FN0228-001_g1.jpg?profile=max_width_mobile"
  },
  {
    id: 2,
    name: "Adidas Sports Shoes",
    price: 2499,
    discount: 25,
    image: "https://m.media-amazon.com/images/I/61V6DePLiPL._AC_UY1000_.jpg"
  },
  {
    id: 3,
    name: "Puma Casual Shoes",
    price: 1999,
    discount: 40,
    image: "https://sportsstation.in/cdn/shop/files/original-imahfqz7krddghaa.jpg?v=1756101844&width=693"
  },
  {
    id: 4,
    name: "White Sneakers",
    price: 1799,
    discount: 35,
    image: "https://assets.ajio.com/medias/sys_master/root1/20251128/8usQ/692957b38945db77cff66309/-473Wx593H-700210348-white-MODEL.jpg"
  },
  {
    id: 5,
    name: "Black Formal Shoes",
    price: 3499,
    discount: 20,
    image: "https://assets.ajio.com/medias/sys_master/root/20240125/s47H/65b264cd16fd2c6e6ac1b004/-473Wx593H-467012308-black-MODEL.jpg"
  },
  {
    id: 6,
    name: "Running Sneakers",
    price: 2200,
    discount: 30,
    image: "https://img.tatacliq.com/images/i25//437Wx649H/MP000000023366228_437Wx649H_202507111515061.jpeg"
  },
  {
    id: 7,
    name: "Gym Training Shoes",
    price: 2700,
    discount: 25,
    image: "https://preview.thenewsmarket.com/Previews/RBOK/StillAssets/1920x1080/708337_v2.jpg"
  },
  {
    id: 8,
    name: "High Top Sneakers",
    price: 3100,
    discount: 15,
    image: "https://fausto.in/cdn/shop/files/FST_FJLMC-15001_GREY_7_ee3e0510-aee4-4b76-ace9-e6e9d36268da_400x.jpg?v=1734682121"
  },
  {
    id: 9,
    name: "Canvas Shoes",
    price: 1500,
    discount: 10,
    image: "https://static.yourprint.in/new-admin-ajax.php?action=resize_outer_image&cfcache=all&url=med-s3/yP-mplace/Shoes/YPB094YNSBSL_1.jpg&resizeTo=600"
  },
  {
    id: 10,
    name: "Walking Shoes",
    price: 1800,
    discount: 20,
    image: "https://images-static.nykaa.com/media/catalog/product/0/8/08b6f1c22L-996BLK-PEACH_1.jpg?tr=w-500"
  },
  {
    id: 11,
    name: "Stylish Sneakers",
    price: 2600,
    discount: 30,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5"
  },
  {
    id: 12,
    name: "Sports Running Shoes",
    price: 2800,
    discount: 35,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
  },
  {
    id: 13,
    name: "Men Casual Sneakers",
    price: 2100,
    discount: 25,
    image: "https://tiimg.tistatic.com/fp/1/007/684/sturdy-construction-slip-resistance-red-black-white-casual-wear-mens-sneaker-shoes-290.jpg"
  },
  {
    id: 14,
    name: "Lightweight Shoes",
    price: 1900,
    discount: 20,
    image: "https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/25921932/2023/12/26/70f4280e-8a44-4713-ad9b-5da4e5fefebe1703577803463-Skechers-Men-Sports-Shoes-2441703577803175-1.jpg"
  },
  {
    id: 15,
    name: "Premium Sneakers",
    price: 4000,
    discount: 30,
    image: "https://bersache.com/cdn/shop/files/5_0000_IMG_5001_JPG.jpg?v=1754653790&width=2048"
  },
  {
    id: 16,
    name: "Outdoor Sports Shoes",
    price: 2300,
    discount: 15,
    image: "https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/JANUARY/29/VmSh792r_1492be52754140d89968d15d0e59a221.jpg"
  },
  {
    id: 17,
    name: "Classic White Shoes",
    price: 1700,
    discount: 20,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
  },
  {
    id: 18,
    name: "Trendy Sneakers",
    price: 3200,
    discount: 35,
    image: "https://fausto.in/cdn/shop/files/FSTSNK-12GREY_MoodShot_1_400x.jpg?v=1716974357"
  },
  {
    id: 19,
    name: "Running Pro Shoes",
    price: 3500,
    discount: 25,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
  },
  {
    id: 20,
    name: "Daily Wear Shoes",
    price: 1600,
    discount: 10,
    image: "https://leatherhub.in/cdn/shop/products/8177456913.jpg?v=1693284729"
  }
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
          p.id === item.id
            ? { ...p, qty: (p.qty || 1) + 1 }
            : p
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

      <h2>Shoes Collection 👟</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Shoes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="price-filter">
        <p>Max Price: ₹{price}</p>
        <input
          type="range"
          min="500"
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

export default Shoes;