
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

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    queryAllProducts();
});


function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].productName+ " | " + res[i].price + " | ");
      }
      console.log("-----------------------------------");
    });
  }