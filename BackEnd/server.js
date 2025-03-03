require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

const ExpenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    category: String,
    date: String,
    userId: String, // To link expenses to users
  });
  
const Expense = mongoose.model("Expense", ExpenseSchema);
  
// ✅ Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered!" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid email or password!" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid email or password!" });
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token });
    } catch (error) {
      console.error("Login Error:", error); // ✅ Print exact error in terminal
      res.status(500).json({ error: "Server error!" });
    }
  });
  

// Middleware to Verify JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. No token provided." });
    }
  
    const token = authHeader.split(" ")[1]; // Extract token
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      req.userId = decoded.userId; // Attach userId to request
      next();
    });
  };
  
  

  app.post("/expenses", verifyToken, async (req, res) => {
    const { title, amount, category, date } = req.body;
    const newExpense = new Expense({ title, amount, category, date, userId: req.userId });
  
    try {
      await newExpense.save();
      res.json({ message: "Expense added successfully" });
    } catch (err) {
      res.status(400).json({ error: "Failed to add expense" });
    }
  });
  
  app.get("/expenses", verifyToken, async (req, res) => {
    try {
      const expenses = await Expense.find({ userId: req.userId });
      res.json(expenses);
    } catch (err) {
      res.status(400).json({ error: "Failed to fetch expenses" });
    }
  });
  
  // ✅ Delete Expense Route
app.delete("/expenses/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // Get the expense ID from the request parameters

  try {
    // Find the expense by ID and ensure it belongs to the user
    const expense = await Expense.findOne({ _id: id, userId: req.userId });
    
    if (!expense) {
      return res.status(404).json({ error: "Expense not found or not authorized" });
    }

    // Delete the expense
    await Expense.findByIdAndDelete(id);
    
    res.json({ message: "Expense removed successfully" });
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// Assuming you have the Expense model already defined
app.get("/monthly-spending", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    
    // Initialize an array to hold monthly spending
    const monthlySpending = Array(12).fill(0); // 12 months

    // Calculate total spending for each month
    expenses.forEach(expense => {
      const month = new Date(expense.date).getMonth(); // Get month (0-11)
      monthlySpending[month] += expense.amount; // Add to the corresponding month
    });

    // Format the data for the chart
    const data = monthlySpending.map((spending, index) => ({
      month: new Date(0, index).toLocaleString('default', { month: 'short' }), // Get month name
      spending,
    }));

    res.json(data);
  } catch (err) {
    console.error("Error fetching monthly spending:", err);
    res.status(500).json({ error: "Failed to fetch monthly spending" });
  }
});


// Get Yearly Expenses Route
app.get("/yearly-expenses", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });

    // Initialize an object to hold yearly expenses
    const yearlyExpenses = {};

    // Calculate total expenses for each year
    expenses.forEach(expense => {
      const year = new Date(expense.date).getFullYear(); // Get year
      if (!yearlyExpenses[year]) {
        yearlyExpenses[year] = 0; // Initialize if not present
      }
      yearlyExpenses[year] += expense.amount; // Add to the corresponding year
    });

    // Format the data for the chart
    const data = Object.keys(yearlyExpenses).map(year => ({
      year,
      expense: yearlyExpenses[year],
    }));

    res.json(data);
  } catch (err) {
    console.error("Error fetching yearly expenses:", err);
    res.status(500).json({ error: "Failed to fetch yearly expenses" });
  }
});

// Get Expense Distribution Route
app.get("/expense-distribution", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });

    // Initialize an object to hold expense distribution
    const expenseDistribution = {};

    // Calculate total expenses for each category
    expenses.forEach(expense => {
      if (!expenseDistribution[expense.category]) {
        expenseDistribution[expense.category] = 0; // Initialize if not present
      }
      expenseDistribution[expense.category] += expense.amount; // Add to the corresponding category
    });

    // Format the data for the pie chart
    const data = Object.keys(expenseDistribution).map(category => ({
      name: category,
      value: expenseDistribution[category],
    }));

    res.json(data);
  } catch (err) {
    console.error("Error fetching expense distribution:", err);
    res.status(500).json({ error: "Failed to fetch expense distribution" });
  }
});


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
