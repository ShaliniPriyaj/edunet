import React from "react";

const Reports = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Expense Reports</h2>
      <p className="text-center">Generate and analyze your expense reports here.</p>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mx-2">Generate Monthly Report</button>
        <button className="btn btn-success mx-2">Generate Yearly Report</button>
      </div>
    </div>
  );
};

export default Reports;
