import React, { useState, useEffect } from "react";
import "./Auth.css";
import api from "../services/api";

const Login = ({ setPage, setUser }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const user = await api.login(cleanEmail, cleanPassword);
      setUser(user);
      setPage("home");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-box" onSubmit={handleLogin} autoComplete="off">
        <h2>🛍️Shop it</h2>
        <br></br>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

        <p>
          Don't have an account?{" "}
          <span
            onClick={(e) => {
              e.preventDefault();
              setPage("register");
            }}
            className="link"
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
};

export default Login;