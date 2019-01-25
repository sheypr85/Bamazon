
// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");


//Setting mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port:8889,
    user: "root",
    password: "root",
    database: "bamazon_db"

});

