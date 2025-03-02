import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid">
        {/* Brand Name on the Left */}
        <Link className="navbar-brand" to="/dashboard">FinanceHub</Link>

        {/* Navbar Toggler */}
        <button 
          className="navbar-toggler"  
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/add-expense">Add Expense</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expenses">View Expenses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">View Reports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
