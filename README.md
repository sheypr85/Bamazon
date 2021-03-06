# Bamazon


## Description

This is a node application to:
* view product information
* allow customer to place orders for products

## Getting Started

### MUST INSTALL

* Node.js 
    -Inquirer
    -MySQL
* MySQL 
* A MySQL developer tool (I used MySql Pro)

### Get the APP Running

1. Clone Repository in Terminal
1. run *npm install* to install the dependencies
1. Use the *schema.sql* & *seeds.sql* files to create the databases in MySQL


### bamazonCustomer.js

1. run _node bamazonCustomer.js_ from a terminal session in the application directory.
1. Select a product from the list generated by id to order.
1. Once a product is selected, enter the quantity of items you want to order.
1. If the Item is not available you will get a prompt saying the item is not available.
1. After Item is ordered you will get an update with the total price.

### bamazonManager.js

1. run _node bamazonManager.js_ from a terminal session in the application directory.
1. Select one of the following options with the arrows.
    * "View Products for Sale" - lists all products in inventory.
    * "View Low Inventory" - Gives you the products with less than 5 items in the inventory.
    * "Add to Inventory" - Allows you to add additional quantity of products.
    * "Add New Product" - Allos you to add additional Products to inventory.


## Bamazon Customer *DEMO*
** CLick for Video! Don't forget to adjust resolution!**
[![](https://i.vimeocdn.com/video/754836432.jpg)](https://player.vimeo.com/video/313506273)

## Bamazon Manager *DEMO*
[![](https://i.vimeocdn.com/video/754836485.jpg)](https://player.vimeo.com/video/313506300)



### Packages
1. Node -(https://nodejs.org/en/download/)
1. inquirer -(https://www.npmjs.com/package/inquirer)
1. mysql -(https://www.npmjs.com/package/node-mysql)
