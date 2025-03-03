import React, { useState } from "react";

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Groceries", amount: 50, category: "Food", date: "2024-02-25" },
    { id: 2, title: "Electric Bill", amount: 100, category: "Bills", date: "2024-02-20" },
    { id: 3, title: "Movie", amount: 30, category: "Entertainment", date: "2024-02-22" },
    { id: 4, title: "Gym", amount: 40, category: "Bills", date: "2024-02-18" },
  ]);

  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [filterCategory, setFilterCategory] = useState("All");

  const removeExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  // Sorting function
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date); // Sort by newest first
    } else if (sortBy === "amount") {
      return b.amount - a.amount; // Sort by highest amount first
    }
    return 0;
  });

  // Filtering function
  const filteredExpenses = filterCategory === "All" 
    ? sortedExpenses 
    : sortedExpenses.filter(expense => expense.category === filterCategory);

  // Get unique categories for dropdown
  const categories = ["All", ...new Set(expenses.map(expense => expense.category))];

  return (
    <div className="container mt-4 ">
      <div className="card shadow-lg p-4 " style={{background: "rgba(255, 255, 255, 0.75)",backdropFilter: "blur(10px)",borderRadius: "12px",}}>
        <h1 className="text-center mb-3">Expense List</h1>

        {/* Sort & Filter Controls */}
        <div className="d-flex justify-content-space-between mb-3 ">
          <div style={{paddingRight:"5px"}}>
            <label className="me-2">Sort by:</label>
            <select 
              className="form-select d-inline w-auto" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date (Newest First)</option>
              <option value="amount">Amount (High to Low)</option>
            </select>
          </div>
          <div style={{paddingLeft:"5px"}}>
            <label className="me-2">Filter by Category:</label>
            <select 
              className="form-select d-inline w-auto" 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Expense Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense, index) => (
                  <tr key={expense.id} className={index % 2 === 0 ? "table-light" : "table-secondary"}>
                    <td>{expense.title}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => removeExpense(expense.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
