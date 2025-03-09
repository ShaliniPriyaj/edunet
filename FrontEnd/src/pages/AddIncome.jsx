import React, { useState } from "react";

const AddIncome = () => {
  const [income, setIncome] = useState({ source: "", amount: "", category: "Salary", date: "" });

  const handleChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:5000/incomes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(income),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Income Added Successfully!");
        setIncome({ source: "", amount: "", category: "Salary", date: "" });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Failed to add income.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "450px",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
        }}
      >
        <h1 className="text-center mb-4">Add Income</h1>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="mb-3">
            <label className="form-label">Source</label>
            <input
              type="text"
              name="source"
              className="form-control"
              value={income.source}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={income.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-control"
              value={income.category}
              onChange={handleChange}
            >
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
              <option value="Gift">Gift</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={income.date}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
            style={{
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
