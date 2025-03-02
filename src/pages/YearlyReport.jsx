import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { year: "2018", expense: 5000 },
  { year: "2019", expense: 5500 },
  { year: "2020", expense: 6000 },
  { year: "2021", expense: 7000 },
  { year: "2022", expense: 7500 },
  { year: "2023", expense: 8000 },
  { year: "2024", expense: 8500 },
];

const YearlyReport = () => {
  return (
    <div
      className="card p-4 shadow-lg " style={{ background: "rgba(255, 255, 255, 0.75)",backdropFilter: "blur(10px)"}}>
      <h1 className="text-center" >Yearly Expense Trends</h1>
      <ResponsiveContainer width="100%" height={300} >
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expense" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyReport;
