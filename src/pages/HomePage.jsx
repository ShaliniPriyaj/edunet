import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const HomePage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 home-background">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 2.5 }}
      >
        <h1 className="mb-3" style={{ color: "white" }}>FinanceHub</h1>
        <p className="lead" style={{ color: "white" }}>Track, manage, and analyze your expenses in real-time.</p>

        <div className="mt-4 " style={{display: "flex" , justifyContent:"center"}} >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/add-expense" className="btn btn-primary m-2">
              Add Expense
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/expenses" className="btn btn-secondary m-2">
              View Expenses
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/reports" className="btn btn-success m-2">
              View Reports
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;