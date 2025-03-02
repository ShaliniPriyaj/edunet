import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <motion.div
      className="container text-center mt-5"
      initial={{ opacity: 0, y: 100 }} // Start off-screen and transparent
      animate={{ opacity: 1, y: 0 }} // Animate to on-screen and fully visible
      transition={{ duration: 2 }} // Duration of the animation
    >
      <h1 style={{ color: "white" }}>Welcome to the FinanceHub 🎉</h1>
      <p style={{ color: "white" }}>You are logged in!</p>
      <button onClick={goToHome}>
        Continue
      </button>
    </motion.div>
  );
};

export default Dashboard;