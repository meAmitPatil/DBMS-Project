const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

// Fetch top 5 records from all tables
app.get("/api/dashboard", (req, res) => {
  const queries = {
    customers: "SELECT * FROM customers LIMIT 5",
    phone_plans: "SELECT * FROM phone_plans LIMIT 5",
    call_records: "SELECT * FROM call_records LIMIT 5",
    data_usage_records: "SELECT * FROM data_usage_records LIMIT 5",
    billing_records: "SELECT * FROM billing_records LIMIT 5",
    payments: "SELECT * FROM payments LIMIT 5",
    bank_accounts: "SELECT * FROM bank_accounts LIMIT 5",
  };

  const results = {};
  let completed = 0;

  Object.entries(queries).forEach(([table, query]) => {
    db.query(query, (err, data) => {
      if (err) {
        console.error(`Error fetching data from ${table}:`, err);
        results[table] = { error: "Error fetching data" };
      } else {
        results[table] = data;
      }
      completed++;
      if (completed === Object.keys(queries).length) {
        res.json(results);
      }
    });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
