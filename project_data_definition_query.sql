
-- CS 340 - Project step 4
-- Team: "11 out of 10"
-- Natthaphong Kongkaew

-- Query to create table "employees"
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `employee_id` INT(10) not NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) not NULL,
  `last_name` VARCHAR(20) not NULL,
  `phone_number` VARCHAR(11) not NULL,
  `job_title` VARCHAR(20) not NULL,
  `skill` VARCHAR(30) not NULL,
  CONSTRAINT PRIMARY KEY (`employee_id`)

);

-- Query to create table "customer"
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customer_id` INT(10) not NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) not NULL,
  `last_name` VARCHAR(20) not NULL,
  `address1` VARCHAR(50) not NULL,
  `address2` VARCHAR(50),
  `city` VARCHAR(20) not NULL,
  `zip_code` VARCHAR(5) not NULL,
  `state` VARCHAR(20) not NULL,
  `country` VARCHAR(20),
  `phone_number` VARCHAR(11) not NULL,
  `email` VARCHAR(50),
  `employee_id` INT(10),
  CONSTRAINT PRIMARY KEY (`customer_id`),
  CONSTRAINT FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
  ON DELETE CASCADE
);

-- Query to create table "work_orders"
DROP TABLE IF EXISTS `work_orders`;
CREATE TABLE `work_orders` (
  `work_order_number` INT(10) not NULL AUTO_INCREMENT,
  `call_reason` TEXT not NULL,
  `date` DATE not NULL,
  `arrival_windows_1` TIME not NULL,
  `arrival_windows_2` TIME not NULL,
  `status` VARCHAR(100) not NULL,
  `customer_id` INT(10) not NULL,
  CONSTRAINT PRIMARY KEY (`work_order_number`),
  CONSTRAINT FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
  ON DELETE CASCADE
);

-- Query to create table "payments"
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `transaction_id` INT(10) not NULL AUTO_INCREMENT,
  `payment_date` DATE not NULL,
  `amount` DOUBLE not NULL,
  `type_payment` VARCHAR(20) not NULL,
  `invoice_number` INT(10) not NULL,
  CONSTRAINT PRIMARY KEY (`transaction_id`)
);
ALTER TABLE payments AUTO_INCREMENT=10000;

-- Query to create table "invoices"
DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `invoice_number` INT(10) not NULL AUTO_INCREMENT,
  `total_price` DOUBLE NOT NULL,
  `status` VARCHAR(20) not NULL,
  `due_date` DATE not NULL,
  `work_order_number` INT(10) not NULL ,
  `transaction_id` INT(10),
  CONSTRAINT PRIMARY KEY (`invoice_number`),
  CONSTRAINT FOREIGN KEY (`transaction_id`) REFERENCES `payments`(`transaction_id`),
  CONSTRAINT FOREIGN KEY (`work_order_number`) REFERENCES `work_orders`(`work_order_number`)
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- Query to create table "services"
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `service_id` INT(10) not NULL AUTO_INCREMENT,
  `service_name` VARCHAR(100) not NULL,
  `unit_price` DOUBLE NOT NULL,
  `service_description` TEXT not NULL,
  `warranty` VARCHAR(100) not NULL,
  CONSTRAINT PRIMARY KEY (`service_id`)
);

-- Query to create table "job"
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `invoice_number` INT(10) not NULL,
  `service_id` INT(10) not NULL,
  CONSTRAINT PRIMARY KEY (`invoice_number`, `service_id`),
  CONSTRAINT FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE,
  CONSTRAINT FOREIGN KEY (`invoice_number`) REFERENCES `invoices` (`invoice_number`)
  ON DELETE CASCADE ON UPDATE CASCADE
);


-- Query for insert new employees to "employees' table"
-- in the order of employee_id, first_name, last_name, phone_number, job_title, skill.

INSERT INTO `employees` (first_name, last_name, phone_number, job_title, skill)
VALUES ('Jamie', 'Kolb', '501-648-3728', 'Plumber', 'Installs and services'),
        ('Ruben', 'Patterson', '906-343-4821', 'Plumber', 'Heater and Plumbing'),
        ('Robert', 'Young', '925-767-2526', 'Dispatcher', 'Web Dispatcher');

-- Query to insert new customers to "customer" table
-- in the order of customer_id, first_name, last_name, address1, address2, city, zip_code, state, country, phone_number, email, employee_id

INSERT INTO `customers` (first_name, last_name, address1,address2, city, zip_code, state, country, phone_number, email, employee_id)
VALUES  ('Keith', 'Gibson', '4461 Pick Street', '', 'Fraser', 80442, 'CO', 'USA', '970-722-7802', 'KeithLGibson@jourrapide.com', 1),
        ('Carmen', 'Early', '1471 Deercove Drive', '', 'Irving', 75063, 'TX', 'USA', '214-929-7457', 'CarmenPEarly@dayrep.com', 2),
        ('Cecil', 'Murphy', '391 Village View Drive', '', 'Lanham', 20706, 'MD', 'USA', '240-241-3756', 'cust3@CecilLMurphy@rhyta.com.edu', 3);

-- Query to insert new work_order to "work_orders" table
-- in the order of work_order_number, call_reason, date, arrival_windows_1, arrival_windows_2, status, customer_id
INSERT INTO `work_orders` (call_reason, date, arrival_windows_1, arrival_windows_2, status, customer_id)
VALUES  ('water heater is not working', '2020-08-02', '08:00:00', '10:00:00', 'Confirmed', 1 ),
        ('sewer backup', '2020-09-01', '09:00:00', '11:00:00', 'Confirmed', 2 ),
        ('kitchen drain clog', '2020-11-12', '10:00:00', '12:00:00', 'Confirmed', 1 );

-- Query to insert payments to "payments" table
-- in the order of transaction_id, payment_date, amount, type_payment, invoice_number
INSERT INTO `payments` (payment_date, amount, type_payment, invoice_number)
VALUES  ('2020-08-02', 500.00, 'check', 1),
        ('2020-09-01', 1000.00, 'credit card', 2),
        ('2020-10-01', 100.00, 'credit card', 3);

-- Query to insert invoices to "invoices" table
-- in the order of invoice_number, total_price, status, due_date, work_order_number, transaction_id
INSERT INTO `invoices` (total_price, status, due_date, work_order_number, transaction_id)
VALUES  (700.00, 'close', '2020-08-02', 1, 10000),
      (1000.00, 'close', '2020-09-01', 2, 10001),
      (1000.00, 'open', '2020-10-01', 3, 10002);

-- Query to insert services to "services" table
-- in order of service_id, service_name, unit_price, service_description, warranty
INSERT INTO `services` (service_name, unit_price, service_description, warranty)
VALUES  ('fix wate rheater', 700.00, 'repalce a new water heater', '60 days'),
    ('clear kitchen drain', 500.00, 'clear kitchen drain through p-trap', '60 days'),
    ('clear sewer backup', 500.00, 'run snake machine through sewer cleanout', '60 days');

-- Query to insert jobs to 'jobs' table
-- in the order of invoice_number, service_id
INSERT INTO `jobs` (invoice_number, service_id)
VALUES  (1,2),
    (1,1),
    (2,2),
    (2,1);
