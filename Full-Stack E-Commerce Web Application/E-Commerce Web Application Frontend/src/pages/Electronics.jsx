import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Electronics = ({
  setPage,
  cart,
  setCart,
  wishlist,
  setWishlist,
  showMessage
}) => {

  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(50000);
  const [sort, setSort] = useState("");

  const products = [
    {
    id: 1,
    name: "SanDisk Cruzer Blade 64GB USB Flash Drive",
    price: 24999,
    discount: 20,
    image: "https://saboocomputers.com/wp-content/uploads/2023/10/PD_SND_32GB_CZ-50-1.jpg"
  },
  {
    id: 3,
    name: "Bluetooth Headphones",
    price: 1999,
    discount: 30,
    image: "https://m.media-amazon.com/images/I/71WqgqIJ1tL.jpg"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 4999,
    discount: 35,
    image: "https://m.media-amazon.com/images/I/61QH+Ta0QmL.jpg"
  },
  {
    id: 5,
    name: "Tablet",
    price: 18999,
    discount: 15,
    image: "https://img.global.news.samsung.com/za/wp-content/uploads/2019/08/Product-Image-Galaxy-Tab-S6-2.jpg"
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 799,
    discount: 20,
    image: "https://m.media-amazon.com/images/I/61iw9q2FAVL.jpg"
  },
  {
    id: 7,
    name: "Gaming Keyboard",
    price: 2999,
    discount: 25,
    image: "https://rukminim2.flixcart.com/image/480/640/xif0q/keyboard/desktop-keyboard/w/l/6/gaming-keyboard-with-87-keys-rgb-backlit-with-suspension-keys-original-imagzcgwtrabgjna.jpeg?q=90"
  },
  {
    id: 8,
    name: "LED Monitor",
    price: 12999,
    discount: 30,
    image: "https://www.simplyshopping.in/cdn/shop/products/71UhJp4kTIL._SL1500_2048x.jpg?v=1626840159"
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    price: 2499,
    discount: 20,
    image: "https://www.sencor.com/getmedia/6770caad-d0be-4d0d-b5f0-01bbc4c1c555/35059169.jpg.aspx?width=2100&height=2100&ext=.jpg"
  },
  {
    id: 10,
    name: "Power Bank",
    price: 1499,
    discount: 15,
    image: "https://m.media-amazon.com/images/I/7110HiY3I6L._AC_SL1500_.jpg"
  },
  {
    id: 11,
    name: "DSLR Camera",
    price: 45999,
    discount: 18,
    image: "https://cdn.pixelbin.io/v2/catalog-cloud/ccprod/original/products/assets/item/free/original/9ed3c718-4851-4eab-b2c6-cc84425c54c1.jpeg"
  },
  {
    id: 12,
    name: "Action Camera",
    price: 9999,
    discount: 22,
    image: "https://ausha.co.in/cdn/shop/files/A_71621229-3504-4aad-9681-d019d91122eb.jpg?v=1724910869"
  },
  {
    id: 13,
    name: "USB Flash Drive",
    price: 699,
    discount: 10,
    image: "https://m.media-amazon.com/images/I/71ULtE83xWL.jpg"
  },
  {
    id: 14,
    name: "External Hard Drive",
    price: 3999,
    discount: 20,
    image: "https://www.minitool.com/images/uploads/2019/06/external-hard-disk-1.png"
  },
  {
    id: 15,
    name: "Router",
    price: 1999,
    discount: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfJO6fNhFLCZ-RgVLUqiAS5__iZWHjEhe7bw&s"
  },
  {
    id: 16,
    name: "Projector",
    price: 14999,
    discount: 30,
    image: "https://zebronics.com/cdn/shop/files/zeb-pixaplay-55-pic1.jpg?v=1717845375&width=2048"
  },
  {
    id: 17,
    name: "Smart TV",
    price: 39999,
    discount: 28,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-PSBG6r7cyjsEvTCEmMxvGs6txs34ULjpJQ&s"
  },
  {
    id: 18,
    name: "Earbuds",
    price: 2999,
    discount: 35,
    image: "https://m.media-amazon.com/images/I/51GEDaBzrwL.jpg"
  },
  {
    id: 19,
    name: "Charging Cable",
    price: 499,
    discount: 10,
    image: "https://shop.lripl.com/cdn/shop/files/2_40d65002-5035-47b8-9550-2bc7616ae4a0.jpg?v=1719659486&width=1000"
  },
  {
    id: 20,
    name: "Gaming Console",
    price: 49999,
    discount: 15,
    image: "https://in.store.asus.com/media/catalog/product/a/l/ally_x_black_01_1.png"
  },
  {
    id: 21,
    name: "boAt WCD QC3.0 Fast Charger",
    price: 49999,
    discount: 15,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQerbCBGaP6EUOBkbJZgN0aXzrFlafymNiwxgOa1gLoPaDkmaXaBZnw2mhGdE5J7r4VWIhVnFJAT-igchVyrfe2wNLV7hVqY7kOkJlMv4eexg7eu5WNv6Ai"
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

      <h2>Electronics ⚡</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Electronics..."
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

export default Electronics;