DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;


CREATE TABLE products(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    productName VARCHAR(100),
    departmentName VARCHAR(100),
    price DECIMAL(18,4),
    stockQuantity INTEGER(11),
    PRIMARY KEY (id)
);

INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Lounge chair', 'furniture', 59.99, 4);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Hair dryer', 'beauty', 79.99, 22);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Lemons', 'grocery', 1.0, 40);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Diet Coke', 'grocery', 5.99, 45);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Mixed Nuts', 'grocery', 7.99, 40);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Highball glass', 'houseware', 25.0, 20);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Exterior lights', 'houseware', 29.99, 8);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Coffee table', 'furniture', 89.99, 25);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Eye Shadow', 'beauty', 5.99, 45);
INSERT INTO products (productName, departmentName, price, stockQuantity) values ('Yoga Mat', 'fitness', 40.0, 10);

SELECT * FROM products;



