import React, { useState, useEffect } from "react";
import "./Auth.css";
import api from "../services/api";

const Register = ({ setPage }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  const handleRegister = async () => {

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanConfirmPassword = confirmPassword.trim();

    if (!cleanName || !cleanEmail || !cleanPassword || !cleanConfirmPassword) {
      setError("All fields are required");
      return;
    }

    if (cleanPassword.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    if (cleanPassword !== cleanConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.register(cleanName, cleanEmail, cleanPassword);
      alert("Create Successfully");
      setPage("login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box" autoComplete="off">
        <h1>🛍️Shop it</h1>
        <br></br>
        <h2>Create account</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>

        <p>
          Already have account?{" "}
          <span onClick={() => setPage("login")} className="link">
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Register;