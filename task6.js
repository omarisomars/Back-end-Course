const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;


const db = mysql.createConnection({
    host: 'localhost', 
    user: 'omar',     
    password: '',      
    database: 'omars_database' 
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/select/:table', (req, res) => {
    const tableName = req.params.table;
    
    const query = `SELECT * FROM ??`;
    db.query(query, [tableName], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: 'Database query failed' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});