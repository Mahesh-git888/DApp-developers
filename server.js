const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ONEPIECE',
    database: 'user_management'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    db.execute(query, [firstName, lastName, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting into MySQL:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const query = 'SELECT first_name FROM users WHERE email = ? AND password = ?';
    db.execute(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            res.status(200).send({ firstName: results[0].first_name });
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});



