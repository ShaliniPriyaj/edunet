import React from "react";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-lg text-center"
        style={{
          width: "400px",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
        }}
      >
        <h1 className="mb-4">Manage Finances</h1>
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={() => navigate("/add-expense")}
          style={{ transition: "transform 0.2s" }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Add Expense
        </button>
        <button
          className="btn btn-success w-100"
          onClick={() => navigate("/add-income")}
          style={{ transition: "transform 0.2s" }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddPage;
