import React, { useState, useEffect, useRef } from "react";
import api from "./services/api";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Shoes from "./pages/Shoes";
import Electronics from "./pages/Electronics";
import Toys from "./pages/Toys";
import Books from "./pages/Books";
import Makeup from "./pages/Makeup";
import Mobile from "./pages/Mobile";
import Appliances from "./pages/Appliances";
import Sports from "./pages/Sports";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResults from "./components/SearchResults";

import Footer from "./components/Footer";

import "./App.css";

const App = () => {

  const [page, setPage] = useState("login");

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2000);
  };

  const protect = (component) => {
    if (!user) {
      setPage("login");
      return null;
    }
    return component;
  };

  const [lastOrder, setLastOrder] = useState(null);
  const cartHydrated = useRef(false);
  const wishlistHydrated = useRef(false);

  useEffect(() => {
    const restoreSession = async () => {
      if (!api.isLoggedIn()) return;

      try {
        const restoredUser = await api.me();
        setUser(restoredUser);

        const [savedCart, savedWishlist] = await Promise.all([
          api.getCart(),
          api.getWishlist(),
        ]);

        cartHydrated.current = true;
        wishlistHydrated.current = true;

        setCart(
          (savedCart || []).map((i) => ({
            id: i.productId,
            name: i.name,
            price: i.price,
            discount: i.discount,
            image: i.image,
            qty: i.qty,
          }))
        );
        setWishlist(
          (savedWishlist || []).map((i) => ({
            id: i.productId,
            name: i.name,
            price: i.price,
            discount: i.discount,
            image: i.image,
          }))
        );

        setPage("home");
      } catch {
        localStorage.removeItem("authToken");
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (!cartHydrated.current) {
      cartHydrated.current = true;
      return;
    }
    api
      .replaceCart(
        cart.map((i) => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          discount: i.discount || 0,
          image: i.image,
          qty: i.qty || 1,
        }))
      )
      .catch(() => {});

  }, [cart, user]);

  useEffect(() => {
    if (!user) return;
    if (!wishlistHydrated.current) {
      wishlistHydrated.current = true;
      return;
    }
    api
      .replaceWishlist(
        wishlist.map((i) => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          discount: i.discount || 0,
          image: i.image,
        }))
      )
      .catch(() => {});

  }, [wishlist, user]);

  const handleSetUser = (nextUser) => {
    if (nextUser === null) {
      api.logout().catch(() => {});
      cartHydrated.current = false;
      wishlistHydrated.current = false;
      setCart([]);
      setWishlist([]);
    }
    setUser(nextUser);
  };

  return (
    <div className="app-container">

      {message && (
        <div className={`toast ${message.type}`}>
          {message.text}
        </div>
      )}

      {page === "login" && (
        <Login setPage={setPage} setUser={setUser} />
      )}

      {page === "register" && (
        <Register setPage={setPage} />
      )}

      {page === "home" &&
        protect(
          <Home
            setPage={setPage}
            cart={cart}
            wishlist={wishlist}
            setCart={setCart}
            setWishlist={setWishlist}
            showMessage={showMessage}
            user={user}
            setUser={handleSetUser}
            setSearch={setSearch}   
          />
        )}

      {page === "search" &&
        protect(
          <SearchResults
            setPage={setPage}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            showMessage={showMessage}
            search={search}  
          />
        )}

      {page === "fashion" &&
        protect(<Fashion setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "shoes" &&
        protect(<Shoes setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "electronics" &&
        protect(<Electronics setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "toys" &&
        protect(<Toys setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "books" &&
        protect(<Books setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "makeup" &&
        protect(<Makeup setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "mobile" &&
        protect(<Mobile setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "appliances" &&
        protect(<Appliances setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "sports" &&
        protect(<Sports setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} showMessage={showMessage} user={user} />)}

      {page === "orders" &&
        protect(<Orders setPage={setPage} cart={cart} wishlist={wishlist} user={user} setUser={handleSetUser} />)}

      {page === "cart" &&
        protect(<Cart setPage={setPage} cart={cart} setCart={setCart} wishlist={wishlist} showMessage={showMessage} user={user} />)}

      {page === "wishlist" &&
        protect(<Wishlist setPage={setPage} wishlist={wishlist} setWishlist={setWishlist} cart={cart} setCart={setCart} showMessage={showMessage} user={user} />)}

      {page === "checkout" &&
        protect(
          <Checkout
            setPage={setPage}
            cart={cart}
            setCart={setCart}
            showMessage={showMessage}
            user={user}
            onOrderPlaced={setLastOrder}
          />
        )}

      {page === "success" &&
        protect(<OrderSuccess setPage={setPage} cart={cart} order={lastOrder} />)}

      {user && <Footer />}

    </div>
  );
};

export default App;