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
import MonthlyReport from "./pages/MonthlyReport";
import YearlyReport from "./pages/YearlyReport";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./App.css";


const AppLayout = () => {
  const location = useLocation();
  console.log("Current Path:", location.pathname); // ✅ Debug Path
  const hideNavbarOn = ["/", "/login", "/home", "/dashboard"];

  return (
    <>
      <div className="stars"></div>
      {!hideNavbarOn.includes(location.pathname) && <NavigationBar />}
      <Routes>
        <Route path="/" element={<SignupPage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
        <Route path="/yearly-report" element={<YearlyReport />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
