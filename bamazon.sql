CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
item_id INTEGER NOT NULL,
product_name VARCHAR,
department_name VARCHAR,
price DECIMAL(10, 2) NOT NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ('chicken', 'store', 2.99, 100);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ('milk', 'store', 1.99, 90);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ('steak', 'store', 7.99, 70);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ('rice', 'store', 0.99, 1000);