const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'user_management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const query = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Registration failed' });
        } else {
            res.status(200).json({ message: 'User registered successfully' });
        }
    });
});

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
