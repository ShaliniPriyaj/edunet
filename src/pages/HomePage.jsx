import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="mb-3">FinanceHub</h1>
        <p className="lead">Track, manage, and analyze your expenses in real-time.</p>

        <div className="mt-4">
          <Link to="/add-expense" className="btn btn-primary m-2">
            Add Expense
          </Link>
          <Link to="/expenses" className="btn btn-secondary m-2">
            View Expenses
          </Link>
          <Link to="/reports" className="btn btn-success m-2">
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
