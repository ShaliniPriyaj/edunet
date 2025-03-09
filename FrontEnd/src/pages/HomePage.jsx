import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const token = localStorage.getItem("token");

        const incomeRes = await fetch("http://localhost:5000/incomes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const expenseRes = await fetch("http://localhost:5000/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const incomeData = await incomeRes.json();
        const expenseData = await expenseRes.json();

        // Calculate total income & expense
        const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
        const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
        const remainingAmount = totalIncome - totalExpense;

        setTotalIncome(totalIncome);
        setTotalExpense(totalExpense);
        setRemainingAmount(remainingAmount);
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchTotals();
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 home-background">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5 }}
      >
        <h1 className="mb-3" style={{ color: "white" }}>FinanceHub</h1>
        <p className="lead" style={{ color: "white" }}>
          Track, manage, and analyze your finances in real-time.
        </p>

        {/* Display Total Income, Expense & Remaining Amount */}
        <div className="card p-4 shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
        }}>
          <h3 style={{ color: "black" }}>Total Income: ₹{totalIncome}</h3>
          <h3 style={{ color: "red" }}>Total Expense: ₹{totalExpense}</h3>
          <h3 style={{ color: remainingAmount >= 0 ? "black" : "red" }}>
            Remaining Amount: ₹{remainingAmount}
          </h3>
        </div>

        {/* Buttons Section */}
        <div className="mt-4" style={{ display: "flex", justifyContent: "center" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/add-expense" className="btn btn-primary m-2">
              Add Expense
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/add-income" className="btn btn-warning m-2">
              Add Income
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/view" className="btn btn-secondary m-2">
              View Finances 
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
