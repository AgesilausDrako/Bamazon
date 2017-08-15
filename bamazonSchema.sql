DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Xbox", "Electronics", 279, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Flatscreen HD TV", "Electronics", 599, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Oak Bookcase", "Furniture", 80, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Couch", "Furniture", 999, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Car Battery", "Automotive", 49, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Car Tires", "Automotive", 65, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Motor Oil", "Automotive", 25, 1500);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Refrigerator", "Appliances", 1600, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Washer-Dryer Combo", "Appliances", 1398, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Exterior Paint", "Paint", 45, 800);
