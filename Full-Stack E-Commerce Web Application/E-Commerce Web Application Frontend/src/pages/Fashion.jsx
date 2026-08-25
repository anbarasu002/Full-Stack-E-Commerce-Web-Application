import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Fashion = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage
}) => {

  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(2000);
  const [sort, setSort] = useState("");


  const products = [
    { id: 1, name: "Men Stylish Shirt", price: 999, discount: 30, image: "https://img.drz.lazcdn.com/static/bd/p/6f21695360a0e06db002b7a6738d1a27.jpg_720x720q80.jpg" }, { id: 2, name: "Casual T-Shirt", price: 699, discount: 25, image: "https://markmorphy.com/cdn/shop/files/rn-image_picker_lib_temp_9ca97105-1b3f-4cef-a875-85611b9afbca.jpg?v=1742846371" }, { id: 3, name: "Denim Jacket", price: 1499, discount: 40, image: "https://t3.ftcdn.net/jpg/03/29/42/80/360_F_329428044_moJE1F5e98gv4iOGQOnRb9LhwMIf9PWl.jpg" }, { id: 4, name: "Hoodie", price: 1199, discount: 35, image: "https://cdn.yourdesignstore.in/uploads/yds/productImages/full/17664856566144pure-cotton-hoodies-1.jpg" }, { id: 5, name: "Formal Shirt", price: 899, discount: 20, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157" }, { id: 6, name: "Jeans Pant", price: 1299, discount: 45, image: "https://5.imimg.com/data5/ANDROID/Default/2023/1/ML/EX/FW/107973193/product-jpeg.jpg" }, { id: 7, name: "Sports Wear", price: 799, discount: 30, image: "https://i.pinimg.com/474x/c0/86/eb/c086eb397ace55e3d297fa9240fd95c7.jpg" }, { id: 8, name: "Winter Jacket", price: 1999, discount: 50, image: "https://m.media-amazon.com/images/I/41b1oVj7E3L._AC_SR70_.jpg" }, { id: 9, name: "Casual Shirt", price: 850, discount: 15, image: "https://img.freepik.com/free-photo/shirt_1203-8194.jpg?semt=ais_hybrid&w=740&q=80" }, { id: 10, name: "Printed T-Shirt", price: 599, discount: 20, image: "https://5.imimg.com/data5/QM/DY/AU/ANDROID-90572738/product-jpeg-500x500.jpg"},
     {
    id: 11,
    name: "Women Stylish Dress",
    price: 1299,
    discount: 30,
    image: "https://media.istockphoto.com/id/1346354625/photo/horizontal-portrait-of-a-beautiful-blonde-woman-protecting-her-eyes-with-hand-on-a-sunny-day.jpg?s=612x612&w=0&k=20&c=9vmVoFODs5gcO7JUteMz4YYzo6zIUM9YDl_NlNRa0Tc="
  },
  {
    id: 12,
    name: "Casual Women Top",
    price: 799,
    discount: 25,
    image: "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2025/NOVEMBER/21/0zXu6XhJ_225a7f4a221441ba93178529c975e3dc.jpg"
  },
  {
    id: 13,
    name: "Denim Jacket Women",
    price: 1599,
    discount: 40,
    image: "https://image.hm.com/assets/hm/01/22/012296fb34bf6032135318932fc106e28236b54c.jpg?imwidth=2160"
  },
  {
    id: 14,
    name: "Women Hoodie",
    price: 1199,
    discount: 35,
    image: "https://www.rockit.co.in/cdn/shop/products/2230101738-6-36_1.jpg?v=1703672424"
  },
  {
    id: 15,
    name: "Formal Women Shirt",
    price: 899,
    discount: 20,
    image: "https://assets.myntassets.com/assets/images/2024/OCTOBER/17/istWZkll_1c48000f81b047cdbeab827dea577885.jpg"
  },
  {
    id: 16,
    name: "Women Jeans",
    price: 1399,
    discount: 45,
    image: "https://static.aceomni.cmsaceturtle.com/prod/product-image/aceomni/Wrangler/Monobrand/WWJN001095/WWJN001095_1.jpg"
  },
  {
    id: 17,
    name: "Party Wear Dress",
    price: 1999,
    discount: 30,
    image: "https://24thspoke.in/cdn/shop/files/1706969499381.jpg?v=1716824689"
  },
  {
    id: 18,
    name: "Winter Women Jacket",
    price: 1899,
    discount: 50,
    image: "https://contents.mediadecathlon.com/p2687616/580497e3b6682088c5e606f527592199/p2687616.jpg"
  },
  {
    id: 19,
    name: "Women Kurti",
    price: 999,
    discount: 15,
    image: "https://vnhnaiduhall.com/cdn/shop/files/MythriRayonKurtiforWomen_RegularFitEmbroideredKurtiwithRoundNeckV-NotchEverydayWearKurta-RS09_2.jpg?v=1775308919&width=1000"
  },
  {
    id: 20,
    name: "Printed Women T-Shirt",
    price: 599,
    discount: 20,
    image: "https://assets.ajio.com/medias/sys_master/root/20241108/edCP/672db036f9b8ef490b0c43ae/-473Wx593H-443049969-mint-MODEL.jpg"
  },
  {
    id: 21,
    name: "Kids T-Shirt",
    price: 499,
    discount: 20,
    image: "https://wyo.in/cdn/shop/files/Follow-Your-Dreams-Kids-T-Shirt-2.jpg?v=1751010616"
  },
  {
    id: 22,
    name: "Kids Hoodie",
    price: 799,
    discount: 25,
    image: "https://fullyfilmy.in/cdn/shop/files/THE-BOYS-HOODIE.jpg?v=1747991175"
  },
  {
    id: 23,
    name: "Kids Denim Jacket",
    price: 999,
    discount: 30,
    image: "https://popupkids.in/cdn/shop/files/j4_1024x1024.jpg?v=1728453110"
  },
  {
    id: 24,
    name: "Kids Winter Wear",
    price: 1199,
    discount: 35,
    image: "https://i5.walmartimages.com/seo/Winter-Thicken-Kids-Jackets-For-Girls-Coats-Warm-Girl-Jackets-Jackets-Hooded-Outerwear-Infant-3-4-5-6-7-8Yrs-Children-Clothes_69d2a388-71a1-442a-8eb3-943b3640ee4e.82a7c17b4cc42d8d47c1a4bf05d0b7a2.jpeg"
  },
  {
    id: 25,
    name: "Kids Shirt",
    price: 599,
    discount: 15,
    image: "https://www.mumkins.in/cdn/shop/products/601e27d227258.jpg?v=1757574845"
  },
  {
    id: 26,
    name: "Kids Jeans",
    price: 899,
    discount: 40,
    image: "https://www.mumkins.in/cdn/shop/products/jeans-for-boys-bl062241c-blue-1.jpg?v=1757575285"
  },
  {
    id: 27,
    name: "Kids Party Dress",
    price: 1299,
    discount: 30,
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2026/MARCH/20/SetIq94W_425ccc81f9f94ea883cf602e4413da32.jpg"
  },
  {
    id: 28,
    name: "Kids Sports Wear",
    price: 699,
    discount: 20,
    image: "https://cpimg.tistatic.com/6308630/b/1/kids-cotton-sports-wear-dress.jpg"
  },
  {
    id: 29,
    name: "Kids Sweater",
    price: 799,
    discount: 25,
    image: "https://littlesurprisebox.com/cdn/shop/products/navy-multi-space-rocket-cardiganwarmersweater-for-toddlers-kidslittle-surprise-box-991379.jpg?v=1737978401&width=1946"
  },
  {
    id: 30,
    name: "Kids Printed T-Shirt",
    price: 399,
    discount: 10,
    image: "https://tiimg.tistatic.com/fp/1/008/104/kids-printed-round-neck-modern-style-half-sleeve-cotton-t-shirts-607.jpg"
  }
  ];

  useEffect(() => {
    const randomRatings = {};

    products.forEach((item) => {
      randomRatings[item.id] = Math.floor(Math.random() * 5) + 1;
    });

    setRatings(randomRatings);
  }, []);

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

  const filteredProducts = products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (category === "Men") return item.id <= 10;
      if (category === "Women") return item.id > 10 && item.id <= 20;
      if (category === "Kids") return item.id > 20;
      return true;
    })
    .filter((item) => item.price <= price)
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="fashion-page">

      <Navbar setPage={setPage} cart={cart} wishlist={wishlist} />

      <button onClick={() => setPage("home")} className="back-btn">
        ⬅ Back
      </button>

      <h2>Fashion Products</h2>

      <input
        type="text"
        placeholder="Search Fashion..."
        className="search-bar"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Men")}>Men</button>
        <button onClick={() => setCategory("Women")}>Women</button>
        <button onClick={() => setCategory("Kids")}>Kids</button>
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

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

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

export default Fashion;