const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Get Plans by Type
router.get('/:type', (req, res) => {
    const query = `SELECT * FROM phone_plans WHERE plan_type = ?`;
    db.query(query, [req.params.type], (err, results) => {
        if (err) {
            res.status(500).send('Database error');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
