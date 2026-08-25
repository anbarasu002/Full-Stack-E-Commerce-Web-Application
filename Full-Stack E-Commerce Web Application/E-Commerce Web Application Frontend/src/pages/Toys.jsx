import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Fashion.css";

const Toys = ({ setPage, cart, setCart, wishlist, setWishlist, showMessage }) => {

  const [ratings, setRatings] = useState({});
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(5000);
  const [sort, setSort] = useState("");

  const products = [
  { id: 1, name: "Toy Car", price: 499, discount: 20, image: "https://m.media-amazon.com/images/I/61zQbBw-1OL.jpg" },
  { id: 2, name: "Teddy Bear", price: 699, discount: 25, image: "https://m.media-amazon.com/images/I/61fwcBkXVOL._AC_UF1000,1000_QL80_.jpg" },
  { id: 3, name: "Building Blocks", price: 899, discount: 30, image: "https://www.jaqueslondon.co.uk/cdn/shop/products/BuildingBlocks-WoodenStackingBlocksForKids-90219.jpg?v=1629795416" },
  { id: 4, name: "Remote Control Car", price: 1299, discount: 15, image: "https://m.media-amazon.com/images/I/71LMTdb2egL.jpg" },
  { id: 5, name: "Toy Train", price: 999, discount: 20, image: "https://i5.walmartimages.com/asr/b831b833-d357-46b6-9559-f9cb3cb5e16d.b5a74b61a0fc40361c15d4781046044f.jpeg" },
  { id: 6, name: "Doll Set", price: 799, discount: 18, image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/barbie/494613495/0/MMHQvRjwbs-494613495-1_5013.webp?dpr=1" },
  { id: 7, name: "Puzzle Game", price: 599, discount: 22, image: "https://m.media-amazon.com/images/I/71oLIqj59GL._AC_UF1000,1000_QL80_.jpg" },
  { id: 8, name: "Lego City", price: 1499, discount: 30, image: "https://mayatoys.in/wp-content/uploads/2023/03/L60330-1.jpg" },
  { id: 9, name: "Action Figure", price: 899, discount: 25, image: "https://bearhugs.in/cdn/shop/files/buy-demon-slayer-akaza-action-figure-26-cm-at-bear-hugs-87017.webp?v=1771062096" },
  { id: 10, name: "Toy Helicopter", price: 1199, discount: 20, image: "https://sellet.in/wp-content/uploads/2021/12/IMG20211210222331.jpg" },
  { id: 11, name: "Rubik Cube", price: 399, discount: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCdRT_QCL7vLtSs826Y0FAhIk_NrnTVXidkg&s" },
  { id: 12, name: "Soft Toy Panda", price: 699, discount: 28, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHsvw6WyjBS33T6BlMdiHTWEtaoiAFgcUz1w&s" },
  { id: 13, name: "Toy Gun", price: 499, discount: 15, image: "https://www.bbassets.com/media/uploads/p/l/40327370_1-toy-cloud-dart-rotating-drum-gun-manual-attacker-soft-foam-dart-blaster-with-6-dart-barrel-for-rapid-fire-fun-ideal-gun-toys-for-kids-ages-above-8-years.jpg" },
  { id: 14, name: "Board Game", price: 999, discount: 20, image: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/g/694936f76e0035908fda53aa/classicchowkabara7house-1-640x640.png" },
  { id: 15, name: "Kids Drum Set", price: 1299, discount: 25, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqbMK2mpFYnto-6u4Lw92gHJeZhCoD0lDJng&s" },
  { id: 16, name: "Toy Kitchen Set", price: 1599, discount: 30, image: "https://m.media-amazon.com/images/I/81lSlrKGJjL.jpg" },
  { id: 17, name: "Toy Robot", price: 1799, discount: 20, image: "https://m.media-amazon.com/images/I/71xxDNZKl5L._AC_UF1000,1000_QL80_.jpg" },
  { id: 18, name: "Stuffed Elephant", price: 899, discount: 22, image: "https://m.media-amazon.com/images/I/81ITRk-GeeL._AC_UF1000,1000_QL80_.jpg" },
  { id: 19, name: "Toy Bike", price: 1999, discount: 18, image: "https://m.media-amazon.com/images/I/61BcQ14EFGL.jpg" },
  { id: 20, name: "Magic Kit", price: 799, discount: 27, image: "https://m.media-amazon.com/images/I/815xxtMnU9L.jpg" }
  ];

  useEffect(() => {
    const randomRatings = {};
    products.forEach((item) => {
      randomRatings[item.id] = Math.floor(Math.random() * 5) + 1;
    });
    setRatings(randomRatings);
  }, []);

  const filteredProducts = products
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => i.price <= price)
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

      <h2>Toys 🧸</h2>

      <div className="search-box">
        <input
          placeholder="Search Toys..."
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

export default Toys;