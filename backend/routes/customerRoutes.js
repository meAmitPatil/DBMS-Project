const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Get Customer by ID
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM customers WHERE customer_id = ?`;
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send('Database error');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
