import React, { useState } from "react";

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Groceries", amount: 50, category: "Food", date: "2024-02-25" },
    { id: 2, title: "Electric Bill", amount: 100, category: "Utilities", date: "2024-02-20" },
  ]);

  return (
    <div className="container mt-5" >
      <h2 className="text-center mb-4">Expense List</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
