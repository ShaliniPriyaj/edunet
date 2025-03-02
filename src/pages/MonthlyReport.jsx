import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", spending: 400 },
  { month: "Feb", spending: 300 },
  { month: "Mar", spending: 500 },
  { month: "Apr", spending: 700 },
  { month: "May", spending: 600 },
  { month: "Jun", spending: 800 },
  { month: "Jul", spending: 750 },
  { month: "Aug", spending: 900 },
  { month: "Sep", spending: 850 },
  { month: "Oct", spending: 950 },
  { month: "Nov", spending: 1000 },
  { month: "Dec", spending: 1100 },
];

const MonthlyReport = () => {
  return (
    <div className="card p-4 shadow-lg" style={{ background: "rgba(255, 255, 255, 0.75)",backdropFilter: "blur(10px)"}}>
      <h1 className="text-center" >Monthly Spending Comparison</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="spending" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyReport;
