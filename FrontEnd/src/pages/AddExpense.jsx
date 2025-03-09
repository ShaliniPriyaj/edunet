import React, { useState } from "react";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "Food", // Default category
    date: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense added:", expense);
    alert("Expense Added Successfully!");
    setExpense({ title: "", amount: "", category: "Food", date: "" });
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
        <h1 className="text-center mb-4 ">Add Expense</h1>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="mb-3">
            <label className="form-label ">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={expense.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label ">Amount</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={expense.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label ">Category</label>
            <select
              name="category"
              className="form-control"
              value={expense.category}
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label ">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={expense.date}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
