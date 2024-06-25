// var express = require('express');
// var mysql = require('mysql2');


// var app = express();

// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     port: 3306,
//     password: "",
//     database: "sgroup_be"
// })


// connection.connect(function (err) {
//     if (err) throw err;
//     var sql = "SELECT * FROM customers";
//     var newCustomer = {FirstName: "Lene", LastName: "Nguyen", Email : "lenguyen.23@gmail.com"}
//     var sql2 = `insert into customers (FirstName, LastName, Email) values("${newCustomer.FirstName}", "${newCustomer.LastName}", "${newCustomer.Email}")`
//     var sql1 = "INSERT INTO Customers (FirstName, LastName, Email) VALUES ('Khoaine', 'he', 'khoai.he@example.com')"
//     connection.query(sql, function (err, results) {
//         if (err) throw err;
//         console.log(results);
//     })
// });

// app.listen(3000, function () {
//     console.log('Node server running @http://localhost:3000')
// });


var mysql = require ("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST, 
        user: process.env.DB_USER, 
        password: process.env.DB_PASS,
        database : process.env.DB_NAME
    }).promise();
 
    db.connect()
    .then(() => {
        console.log("Database connected");
        })
        .catch((err) => {
            console.log("Error connecting to database", err);
        });
    module.exports = db
