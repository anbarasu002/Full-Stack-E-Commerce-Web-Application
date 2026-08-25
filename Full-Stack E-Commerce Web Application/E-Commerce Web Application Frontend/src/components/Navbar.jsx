import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({
  setPage,
  cart = [],
  wishlist = [],
  user,
  setUser
}) => {

  const [showAccount, setShowAccount] = useState(false);
  const accountRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
    setShowAccount(false);
    setPage("login"); 
  };

  return (
    <nav className="navbar">

      <h2 className="logo" onClick={() => setPage("home")}>
        🛍️Shop-it
      </h2>

      <ul className="nav-links">

        <li onClick={() => setPage("cart")}>
          Cart 🛒 ({cart.length})
        </li>

        <li onClick={() => setPage("wishlist")}>
          Wishlist ❤️ ({wishlist.length})
        </li>

        <li className="account" ref={accountRef}>

          <span
            className="account-icon"
            onClick={() => setShowAccount((prev) => !prev)}
          >
            👤
          </span>

          {showAccount && (
            <div className="account-box">

              {user && (
                <p className="username">👋 {user.name}</p>
              )}

              <button
                onClick={() => {
                  setPage("orders");
                  setShowAccount(false);
                }}
              >
                My Orders 📦
              </button>
              <br></br>

              <button onClick={handleLogout}>
                Logout 🚪
              </button>

            </div>
          )}

        </li>

      </ul>

    </nav>
  );
};

export default Navbar;