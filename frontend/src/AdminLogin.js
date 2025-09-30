// frontend/src/AdminLogin.js
import React, { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your admin authentication logic
    if (email === "admin@example.com" && password === "admin123") {
      // Redirect to admin dashboard
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{ color: "#764ba2", marginBottom: "1.5rem" }}>Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: "1rem",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%"
          }}
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: "1rem",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%"
          }}
        />
        <button type="submit" style={{
          background: "#764ba2",
          color: "#fff",
          padding: "0.75rem 2rem",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem"
        }}>
          Login as Admin
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;