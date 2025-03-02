import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/home"); // Redirect to login
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the FinanceHub 🎉</h1>
      <p>You are logged in!</p>
      <button className="btn btn-danger" onClick={handleHome}>continue</button>
    </div>
  );
};

export default Dashboard;
