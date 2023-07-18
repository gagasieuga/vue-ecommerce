CREATE TABLE Customers (
  customer_id INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1),
  name VARCHAR(200),
  age INT,
  tel INT,
  gender VARCHAR(10),
  email VARCHAR(200),
  address VARCHAR(200),
  PRIMARY KEY (customer_id)
);

CREATE TABLE Products(
 product_id INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1),
 product_name VARCHAR(200),
 price DECIMAL(10, 2),
 description TEXT,
 average_rating DECIMAL(3,1),
 image_url VARCHAR(255),
 PRIMARY KEY (product_id)
);


CREATE TABLE Orders (
  order_id INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1),
  customer_id INT,
  order_date DATE,
  total_price DECIMAL(10,2),
  PRIMARY KEY (order_id),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);


CREATE TABLE OrderDetail (
  OrderDetail_id INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1),
  product_id INT,
  order_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id),
  PRIMARY KEY (OrderDetail_id, product_id, order_id)
);

CREATE TABLE Accounts (
  customer_id INT,
  username VARCHAR(200) PRIMARY KEY,
  password VARCHAR(200),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

INSERT INTO Products (product_name, price, description, average_rating, image_url)
VALUES 
('Running Shoes', 60.00, 'Short description 1', 5.0, '/images/shoes-1.jpg'),
('Basketball Shoes', 120.00, 'Short description 2', 5.0, '/images/shoes-2.jpg'),
('Bright Red Shoes', 90.00, 'Short description 3', 5.0, '/images/shoes-3.jpg'),
('Fancy Shoes', 190.00, 'Short description 4', 5.0, '/images/shoes-4.jpg'),
('Skateboard Shoes', 75.00, 'Short description 5', 5.0, '/images/shoes-5.jpg'),
('High Heels', 200.00, 'Short description 6', 5.0, '/images/shoes-6.jpg'),
('Dark Shoes', 100.00, 'Short description 7', 5.0, '/images/shoes-7.jpg'),
('Classic Shoes', 40.00, 'Short description 8', 5.0, '/images/shoes-8.jpg'),
('Plain Shoes', 54.00, 'Short description 9', 5.0, '/images/shoes-9.jpg'),
('Teal Dress Shoes', 330.00, 'Short description 10', 5.0, '/images/shoes-10.jpg'),
('Fancy Boots', 230.00, 'Short description 11', 5.0, '/images/shoes-11.jpg'),
('Gold Shoes', 180.00, 'Short description 12', 5.0, '/images/shoes-12.jpg');

INSERT INTO Customers (name, age, tel, gender, email, address)
VALUES
('Quang', 25, 987872134, 'Male', 'tcq@example.com', '123 Main Street'),
('Minh Duy', 30, 98765430, 'Female', 'mduy@example.com', '456 Elm Street'),
('Nam Aatrox', 35, 912958234, 'Male', 'nam@example.com', '789 Oak Avenue');

INSERT INTO Accounts (customer_id, username, password)
VALUES
(1,'tcq123','quang123'),
(2,'nmd123','duy123'),
(3,'phn123','nam123');


