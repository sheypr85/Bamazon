// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");


//Setting mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"

});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    queryAllProducts();
});


function queryAllProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].productName + " | $" + res[i].price + " | ");
        }
        console.log("-----------------------------------");

        buyingChoice();
    });
}


function buyingChoice() {
    inquirer
        .prompt({
            name: "select",
            type: "input",
            message: "Enter the product number of the Item you want to buy: ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        })
        .then(function (answer) {
            
            var query = "SELECT id,productName,price,stockQuantity FROM products WHERE ?";
            connection.query(query, { id: answer.select }, function (err, res) {
                console.log("Item: " + res[0].productName + " || Price: $" + res[0].price);

                howManyUnits(res[0]);

            });

        });

}
// Ask customer to select how many items they want to buy
function howManyUnits(product) {
    inquirer
        .prompt({
            name: "units",
            type: "input",
            message: "How many " + product.productName + " do you need to buy? ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false
            }
        })
        .then(function (answer) {
    
            if (answer.units > product.stockQuantity) {
                console.log("Not Enough inventory")
            }
            else {
                console.log("Item available");
                var upadatedQuantity= (product.stockQuantity - answer.units)
                var totalPrice = (product.price * answer.units)
                updateItems(upadatedQuantity, product.id, totalPrice)
                
                
            }
    
        });
    
}
// Updates item quantity and gives total price of purchase
function updateItems(quantity, itemId, total) {
    var query = "UPDATE products SET ? WHERE ?";
    var value = [{ stockQuantity: quantity },{ id: itemId }]
    connection.query(query, value, function (err, res) {
        console.log("Your order is updated")
        console.log("Your total price is $" + total)
        connection.end()
    });
}

