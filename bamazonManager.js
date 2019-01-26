// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");


//Establish connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) throw err;
    runSearch()
});


function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    productSearch();
                    connection.end();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;
            }
        });
}

function productSearch() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].productName + " | $" + res[i].price + " | " + "Qty: " + res[i].stockQuantity);
        }
    });

}

function lowInventory() {
    var query = "SELECT * FROM products WHERE stockQuantity <= 10";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].productName + " | $" + res[i].price + " | " + "Qty: " + res[i].stockQuantity);

        }
        connection.end()
    });
}

function addToInventory() {
    productSearch();
    inquirer
        .prompt({
            name: "select",
            type: "input",
            message: "Enter the Id number of the product you want to edit",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false
            }
        })
        .then(function (answer) {
            var query = "SELECT id,productName,price,stockQuantity FROM products WHERE ?";
            connection.query(query, {
                id: answer.select
            }, function (err, res) {
                console.log("Item: " + res[0].productName + " || QTY: " + res[0].stockQuantity);
                howManyItems(res[0]);
            });
        });
}

function howManyItems(product) {
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How many " + product.productName + " would you like to add to inventory?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false
            }
        })
        .then(function (answer) {
            var updateQuantity = (product.stockQuantity + parseInt(answer.quantity))
            console.log("You have succesfully updated the item")
            updatedItem(updateQuantity, product.id, product.productName)
        });

}

function updatedItem(update, productId, productName) {
    var query = "UPDATE products SET ? WHERE ?";
    var value = [{
        stockQuantity: update
    }, {
        id: productId
    }]
    connection.query(query, value, function (err, res) {
        console.log(productName + " has been uptated " + " QTY " + update)
        connection.end()
    });
}


function addNewProduct() {
    inquirer
        .prompt([{
                name: "name",
                type: "input",
                message: "What Product would you like to add to inventory?",
                validate: function (value) {
                    if (value === "") {
                        return false;
                    }
                    return true ;
                }
            },
            {
                name: "price",
                type: "input",
                message: "What is the item's price?",
                validate: function (value) {
                    if (isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "qty",
                type: "input",
                message: "How many Items are you adding?",
                validate: function (value) {
                    if (isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "dept",
                type: "input",
                message: "What is the item's department",
                validate: function (value) {
                    if (value === "") {
                        return false;
                    }
                    return true ;
                }
            }
        ])
        .then(function(answer){
            var query = "INSERT INTO products SET ?";
            connection.query(query, { productName: answer.name, price: answer.price, 
                stockQuantity: answer.qty, departmentName: answer.dept },
                function(err, res){
                    console.log(res.affectedRows + " product added!")
                    addingAnother()
                });
        });

    }

    function addingAnother(){
         inquirer
         .prompt({
             name: "another",
             type: "input",
             message: "Do you want to add another product? Y/N ",
             validate: function(value) {
                 var lower = value.toLowerCase();
                 if (    (lower == "y" ) || (lower =="n" )  ){

                    return true;
                } 
                    return false;
             }
         })
         .then(function(answer){
             if (answer.another == "y"){
                 addNewProduct()
             } else {
                connection.end()
             }
         })
    }