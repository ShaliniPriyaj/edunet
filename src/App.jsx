import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import NavigationBar from "./pages/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./App.css";

const AppLayout = () => {
  const location = useLocation();  // ✅ Fix: Use useLocation() correctly
  const hideNavbarOn = ["/", "/login", "/home", "/dashboard"]; // ✅ Define hidden pages

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <NavigationBar />}  
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>  {/* ✅ Fix: Correct Router placement */}
      <AppLayout />
    </Router>
  );
};

export default App;
