import React, { useState } from "react";

const AddExpense = () => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense added:", expense);
    alert("Expense Added Successfully!");
    setExpense({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
    <div className="card p-4 shadow-lg" style={{ width: "350px", justifyContent: "center" }}>
      <h2 className="text-center mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <div className="mb-3">
          <label className="form-label">Title</label>
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
          <label className="form-label">Amount</label>
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
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={expense.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Expense
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddExpense;
