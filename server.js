const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Seenu145",
    database: "hospital_db"
});

db.connect(err => {
    if (err) console.log(err);
    else console.log("MySQL Connected");
});




const internationalDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Seenu145",
    database: "international_db"
});

internationalDB.connect(err => {
    if (err) {
        console.log("International DB Error:", err);
    } else {
        console.log("International MySQL Connected");
    }
});



app.get('/book', (req, res) => {
    const sql = "SELECT * FROM appointments";

    db.query(sql, (err, result) => {
        if (err) {
            console.log("Fetch Error:", err);
            res.json({ status: "error" });
        } else {
            res.json(result);
        }
    });
});


// EXISTING POST ROUTE
app.post('/book', (req, res) => {
    console.log("Data received:", req.body);

    const { name, phone, email, service, location, description } = req.body;

    const sql = `INSERT INTO appointments 
    (name, phone, email, service, location, description)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, phone, email, service, location, description],
        (err, result) => {
            if (err) {
                console.log("SQL Error:", err);
                res.json({ status: "error" });
            } else {
                res.json({ status: "success" });
            }
        });
});

app.listen(5000, () => {
    console.log("http://localhost:5000/book");
});

// TEST INTERNATIONAL API
app.get('/inter', (req, res) => {
    res.send("International API working");
});

// INSERT INTERNATIONAL USER DATA
app.post('/inter', (req, res) => {
    console.log("International Data received:", req.body);

    const { name, phone, email, gender, address, description } = req.body;

    const sql = `INSERT INTO international_users
    (name, phone, email, gender, address, description)
    VALUES (?, ?, ?, ?, ?, ?)`;

    internationalDB.query(sql,
        [name, phone, email, gender, address, description],
        (err, result) => {
            if (err) {
                console.log("International SQL Error:", err);
                res.json({ status: "error" });
            } else {
                res.json({ status: "success" });
            }
        });
});
