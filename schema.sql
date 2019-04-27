-- Database set up 
CREATE DATABASE Bamazon;

USE Bamazon;

-- My First table
CREATE TABLE Products(
ItemID INTEGER AUTO_INCREMENT PRIMARY KEY,
ProductName VARCHAR(30),
DepartmentName VARCHAR(30),
Price DOUBLE(10,2),
StockQuantity INTEGER);

-- Seed Items into Database
INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity)
VALUES   ("Nike AirMax", "Men's Shoes", 199.99, 15),
  ("Jordan 3 Retro", "Men's Shoes", 129.99, 34),
  ("Polo Ralph Laureen", "Frangrance's", 89.99, 5),
  ("HM Men's V-neck", "Men's Clothing", 49.99, 17),
  ("Iphone 10x", "Electronics", 999.99, 28),
  ("NY Giants FootBall jersey", "Men's Clothing", 599.99, 2),
  ("God of War 2", "Games", 69.99, 49),
  ("Uncharted 4", "Games", 59.99, 29),
  ("Victoria Secret Bra's", "Women's Clothing", 49.99, 33),
  ("Men's Swim Trunks", "Men's Clothing", 22.99, 16),
  ("Game of Thrones 1-8", "dvds", 13.99, 336),  
  ("Chanel Coach bag", "Women's Clothing", 499.99, 21),
  ("Drake World Tour Live", "Music", 16.95, 28);


-- View Database Entries
-- SELECT * FROM Products;

CREATE TABLE Departments(
DepartmentID INTEGER AUTO_INCREMENT PRIMARY KEY,
DepartmentName VARCHAR(30),
OverHeadCosts DOUBLE(10,2),
TotalSales DOUBLE(10,2));

-- Seed Departments into Database
INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales)
VALUES ("Men's Shoes", 10500.00, -10000.00),
  ("electronics", 25000.00, 0.00),
  ("Men's Clothing", 15000.00, 0.00),
  ("Games", 5000.00, 0.00),
  ("dvds", 20000.00, 0.00),
  ("Women's Clothing", 20000.00, 0.00),
  ("Music", 7500.00, 0.00);

