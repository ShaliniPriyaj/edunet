import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      // Store token & redirect to dashboard
      localStorage.setItem("token", data.token);
      navigate("/dashboard"); // Redirect user after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 style={{justifyContent:"center",textAlign:"center",color:"white"}}>FinanceHub</h1>
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="text-center mt-3">
            Don't have an account? <Link to="/">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;