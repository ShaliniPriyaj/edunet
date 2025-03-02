import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Brand Name on the Left */}
        <Link className="navbar-brand" to="/dashboard">FinanceHub</Link>

        {/* Navbar Toggler */}
        <button 
          className="navbar-toggler"  
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/add-expense">Add Expense</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expenses">View Expenses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">View Reports</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
