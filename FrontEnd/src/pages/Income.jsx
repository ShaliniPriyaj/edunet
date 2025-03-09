import { useEffect, useState } from "react";
import axios from "axios";

const Income = () => {
  const [income, setIncome] = useState([]);
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch income from the server
  const fetchIncome = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored
      const response = await axios.get("http://localhost:5000/incomes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncome(response.data);
    } catch (err) {
      setError("Failed to fetch income");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const removeIncome = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/income/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIncome(income.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Failed to delete income", err);
      }
    }
  };

  // Sorting function
  const sortedIncome = [...income].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date); // Sort by newest first
    } else if (sortBy === "amount") {
      return b.amount - a.amount; // Sort by highest amount first
    }
    return 0;
  });

  // Filtering function
  const filteredIncome =
    filterCategory === "All"
      ? sortedIncome
      : sortedIncome.filter((item) => item.category === filterCategory);

  // Get unique categories for dropdown
  const categories = ["All", ...new Set(income.map((item) => item.category))];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <div
        className="card shadow-lg p-4"
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
        }}
      >
        <h1 className="text-center mb-3">Income List</h1>

        {/* Sort & Filter Controls */}
        <div className="d-flex justify-content-space-between mb-3">
          <div style={{ paddingRight: "5px" }}>
            <label className="me-2">Sort by:</label>
            <select
              className="form-select d-inline w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date (Newest First)</option>
              <option value="amount">Amount (High to Low)</option>
            </select>
          </div>
          <div style={{ paddingLeft: "5px" }}>
            <label className="me-2">Filter by Category:</label>
            <select
              className="form-select d-inline w-auto"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Income Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncome.length > 0 ? (
                filteredIncome.map((item, index) => (
                  <tr
                    key={item._id}
                    className={index % 2 === 0 ? "table-light" : "table-secondary"}
                  >
                    <td>{item.title}</td>
                    <td>₹{item.amount.toFixed(2)}</td>
                    <td>{item.category}</td>
                    <td>{item.date}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeIncome(item._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No income records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Income;
