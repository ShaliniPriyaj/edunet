import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const Reports = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenseDistribution = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming you store the JWT token in localStorage
      const response = await axios.get("http://localhost:5000/expense-distribution", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch expense distribution data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDistribution();
  }, []);

  const goToMon = () => {
    navigate("/monthly-report");
  };
  const goToYear = () => {
    navigate("/yearly-report");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5 text-center">
      <h1 style={{ color: "white" }}>Expense Reports</h1>
      <p style={{ color: "white" }}>Generate and analyze your expense reports here.</p>
      
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-primary mx-2" onClick={goToMon}>Generate Monthly Report</button>
        <button className="btn btn-success mx-2" onClick={goToYear}>Generate Yearly Report</button>
      </div>

      {/* Pie Chart for Expense Distribution */}
      <div className="card justify-content-center align-items-center p-4" style={{ background: "rgba(255, 255, 255, 0.75)", backdropFilter: "blur(10px)" }}>
        <PieChart width={350} height={350}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Reports;