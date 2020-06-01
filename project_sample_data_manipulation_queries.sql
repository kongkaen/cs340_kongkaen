-- project step 6 Draft
-- Team 11
-- These are some Database Manipulation queries for a partially implemented Project Website
-- using the cs340_kongkaen database.
-- deonte that (:) refer to input from user
-- denote that (?) read from user input

-- Employee data Manipulation
-- get all employee information
SELECT employees.employee_id as id, first_name, last_name, phone_number, job_title, skill FROM employees
-- search for employee with name start with
SELECT employees.employee_id as id, first_name, last_name, phone_number, job_title, skill FROM employees WHERE employees.first_name LIKE :s + '%'
-- add a new employee by inserting function
INSERT INTO employees (first_name, last_name, phone_number, job_title, skill) VALUES (?,?,?,?,?)
-- updating existing an employee
UPDATE employees SET first_name=?, last_name=?, phone_number=?, job_title=?, skill=? WHERE employee_id=?
-- delete an employee
DELETE FROM employees WHERE employee_id = ?


-- Customer data Manipulation
-- get all customer information
SELECT customers.customer_id as id, customers.first_name, customers.last_name, address1, address2, city, zip_code, state, country, customers.phone_number, email, employees.first_name as sale_rep, employees.employee_id FROM customers INNER JOIN employees ON employees.employee_id = customers.employee_id
-- search for customer with name start with
SELECT customers.customer_id as id, first_name, last_name, address1, address2, city, zip_code, state, country, phone_number, email FROM customers WHERE customers.first_name LIKE :s + '%'
-- filter customer by employee working with
SELECT customers.customer_id as id, customers.first_name, customers.last_name, address1, address2, city, zip_code, state, country, customers.phone_number, email, employees.first_name as sale_rep, employees.employee_id FROM customers INNER JOIN employees ON employees.employee_id = customers.employee_id WHERE customers.employee_id = ?
-- add a new customer by inserting function
INSERT INTO customers (first_name, last_name, address1, address2, city, zip_code, state, country, phone_number, email, employee_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)
-- updating existing an customer
UPDATE customers SET first_name=?, last_name=?, address1=?, address2=?, city=?, zip_code=?, state=?, country=?, phone_number=?, email=?, employee_id=? WHERE customer_id=?
-- delete an customer
DELETE FROM customers WHERE customer_id = ?


-- Invoice data Manipulation
-- get all Invoice information
SELECT invoices.invoice_number as id, total_price, status, due_date, work_order_number, transaction_id FROM invoices
-- search for invoice by invoice ID
SELECT invoice_number as id, total_price, status, due_date, work_order_number, transaction_id FROM invoices WHERE invoice_number LIKE  + :s + '%'
-- add a new Invoice by inserting function
INSERT INTO invoices (total_price, status, due_date, work_order_number) VALUES (?,?,?,?)
-- updating existing an Invoice
UPDATE invoices SET total_price=?, status=?, due_date=?, work_order_number=? WHERE invoice_number=?
-- delete an Invoice
DELETE FROM invoices WHERE invoice_number = ?


-- payment data Manipulation
-- get all payment information
SELECT transaction_id as id, payment_date, amount, type_payment, invoice_number FROM payments
-- search for payment by transaction ID
SELECT transaction_id as id, payment_date, amount, type_payment, invoice_number FROM payments WHERE transaction_id LIKE :s + '%'
-- add a new payment by inserting function
INSERT INTO payments (payment_date, amount, type_payment, invoice_number) VALUES (?,?,?,?)
-- updating existing an payment
UPDATE payments SET payment_date=?, amount=?, type_payment=?, invoice_number=? WHERE transaction_id=?
-- delete an payment
DELETE FROM payments WHERE transaction_id = ?


-- work order data Manipulation
-- get all work order information
SELECT work_orders.work_order_number as id, call_reason, date, arrival_windows_1, arrival_windows_2, status, work_orders.customer_id FROM work_orders
-- search for work 0rder by customer ID
SELECT work_orders.work_order_number as id, call_reason, date, arrival_windows_1, arrival_windows_2, status, work_orders.customer_id FROM work_orders WHERE work_orders.customer_id LIKE :s + '%'
-- add a new work order by inserting function
INSERT INTO work_orders (call_reason, date, arrival_windows_1, arrival_windows_2, status, customer_id) VALUES (?,?,?,?,?,?)
-- updating existing an work order
UPDATE work_orders SET call_reason=?, date=?, arrival_windows_1=?, arrival_windows_2=?, status=?, customer_id=? WHERE work_order_number=?
-- delete an work order
DELETE FROM work_orders WHERE work_order_number = ?


-- service data Manipulation
-- get all service information
SELECT service_id as id, service_name, unit_price, service_description, warranty FROM services
-- search for service with name start with
SELECT service_id as id, service_name, unit_price, service_description, warranty FROM services WHERE service_name LIKE :s + '%'
-- add a new service by inserting function
INSERT INTO services (service_name, unit_price, service_description, warranty) VALUES (?,?,?,?)
-- updating existing an service
UPDATE services SET service_name=?, unit_price=?, service_description=?, warranty=? WHERE service_id=?
-- delete an service
DELETE FROM services WHERE service_id = ?
