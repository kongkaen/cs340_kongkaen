-- These are some Database Manipulation queries for a partially implemented Project Website 
-- using the cs340_kongkaen database.

-- get all employee_id, first_name and last_name
SELECT employee_id, first_name, last_name FROM employees

--get all customer who live in CA
SELECT * FROM customers WHERE state = 'CA'

-- get all customer first_name, last_name, employee working with, and work order assosiated
SELECT c.first_name, c.last_name, c.employee_id AS 'working with employee ID', wo.work_order_number
FROM customers c INNER JOIN work_orders wo ON c.customer_id = wo.customer_id

-- get all invoices that have status 'close'
SELECT * FROM invoices
WHERE status = 'close'

-- get customer name who have 'open' invoice
SELECT c.first_name, c.last_name, c.phone_number, i.invoice_number, i.status
FROM customers c INNER JOIN work_orders wo ON c.customer_id = wo.customer_id INNER JOIN invoices i ON i.work_order_number = wo.work_order_number
WHERE i.status = 'open'

-- get all payment assosiated with invoice_number '1'
SELECT * FROM payments WHERE invoice_number = 1

--get all customer who paid by check
SELECT c.first_name, c.last_name, p.type_payment
FROM customers c INNER JOIN work_orders wo ON c.customer_id = wo.customer_id
INNER JOIN invoices i ON wo.work_order_number = i.work_order_number
INNER JOIN payments p ON i.transaction_id = p.transaction_id
WHERE p.type_payment = 'check'

-- add a new customer
-- denote the variables that will have data from the backend programming language
INSERT INTO customers (first_name, last_name, address1,address2, city, zip_code, state, country, phone_number, email, employee_id)
VALUES (:first_nameInput, :last_nameInput, :address1Input, :address2Input, :cityInput, :zip_codeInput, 
	:stateInput, :countryInput, :phone_numberInput, :emailInput, :employee_id_from_dropdown_Input)

-- associate an invoice with a service (M-to-M relationship addition)
INSERT INTO jobs (invoice_number, service_id) VALUES (:invoice_number_from_dropdown_Input, :service_id_from_dropdown_Input)

UPDATE customers SET phone_number = :phone_number_Input

DELETE FROM services WHERE service_name = :service_name_selected_from_service_page

