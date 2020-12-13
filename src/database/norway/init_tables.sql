CREATE TYPE countries AS ENUM ('Finland', 'Sweden', 'Norway');
CREATE TYPE in_status AS ENUM ('Waiting', 'InProgress', 'Rejected', 'Approved');
CREATE TYPE access_lvl AS ENUM ('Normal', 'Moderator', 'Administrator');

CREATE TABLE IF NOT EXISTS customers(
customer_id SERIAL,
customer_country countries,
social_security_number CHAR(11),
email VARCHAR(60),
first_name VARCHAR(20),
last_name VARCHAR(30),
PRIMARY KEY (customer_id, customer_country)
) PARTITION BY LIST (customer_country);

CREATE TABLE IF NOT EXISTS bank_accounts(
bank_account_id SERIAL PRIMARY KEY,
balance INT NOT NULL
);

CREATE TABLE IF NOT EXISTS opticians(
optician_id SERIAL,
bank_account_id INT,
optician_country countries,
name VARCHAR(30),
PRIMARY KEY (optician_id, optician_country),
FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(bank_account_id)
) PARTITION BY LIST (optician_country);

CREATE TABLE IF NOT EXISTS opthalmologists(
opthalmologist_id SERIAL,
bank_account_id INT NOT NULL,
opthalmologist_country countries,
name VARCHAR(30),
price INT,
PRIMARY KEY (opthalmologist_id, opthalmologist_country),
FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(bank_account_id)
) PARTITION BY LIST (opthalmologist_country);

CREATE TABLE IF NOT EXISTS inspections(
inspection_id SERIAL,
customer_id INT NOT NULL,
customer_country countries,
optician_id INT NOT NULL,
optician_country countries,
opthalmologist_id INT NOT NULL,
opthalmologist_country countries,
inspections_country countries,
fundus_photo_ref INT,
oct_scan_ref INT,
visual_field_ref INT,
inspection_time TIMESTAMP,
login_token CHAR(16),
status in_status,
PRIMARY KEY (inspection_id, inspections_country),
FOREIGN KEY (customer_id, customer_country) REFERENCES customers(customer_id, customer_country),
FOREIGN KEY (optician_id, optician_country) REFERENCES opticians(optician_id, optician_country),
FOREIGN KEY (opthalmologist_id, opthalmologist_country) REFERENCES opthalmologists(opthalmologist_id, opthalmologist_country)
) PARTITION BY LIST (inspections_country);

CREATE TABLE IF NOT EXISTS contracts(
contract_id SERIAL,
optician_id INT NOT NULL,
optician_country countries,
opthalmologist_id INT NOT NULL,
opthalmologist_country countries,
contracts_country countries,
PRIMARY KEY (contract_id, contracts_country),
FOREIGN KEY (optician_id, optician_country) REFERENCES opticians(optician_id, optician_country),
FOREIGN KEY (opthalmologist_id, opthalmologist_country) REFERENCES opthalmologists(opthalmologist_id, opthalmologist_country)
) PARTITION BY LIST (contracts_country);

CREATE TABLE IF NOT EXISTS opthalmologist_employees(
employee_id SERIAL,
opthalmologist_id INT NOT NULL,
opthalmologist_country countries,
opthalmologist_employee_country countries,
social_security_number CHAR(11),
email VARCHAR(60),
password VARCHAR(60),
first_name VARCHAR(20),
last_name VARCHAR(30),
access_level access_lvl,
PRIMARY KEY (employee_id, opthalmologist_employee_country),
FOREIGN KEY (opthalmologist_id, opthalmologist_country) REFERENCES opthalmologists(opthalmologist_id, opthalmologist_country)
) PARTITION BY LIST (opthalmologist_employee_country);

CREATE TABLE IF NOT EXISTS optician_employees(
employee_id SERIAL,
optician_id INT NOT NULL,
optician_country countries,
optician_employee_country countries,
social_security_number CHAR(11),
email VARCHAR(60),
password VARCHAR(60),
first_name VARCHAR(20),
last_name VARCHAR(30),
access_level access_lvl,
PRIMARY KEY (employee_id, optician_employee_country),
FOREIGN KEY (optician_id, optician_country) REFERENCES opticians(optician_id, optician_country)
) PARTITION BY LIST (optician_employee_country);

CREATE TABLE IF NOT EXISTS administrators(
admin_id SERIAL PRIMARY KEY,
access_level access_lvl,
email VARCHAR(60),
password VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS customers_norway
    PARTITION OF customers
    FOR VALUES IN ('Norway');

CREATE TABLE IF NOT EXISTS opticians_norway
    PARTITION OF opticians
    FOR VALUES IN ('Norway');

CREATE TABLE IF NOT EXISTS opthalmologists_norway
    PARTITION OF opthalmologists
    FOR VALUES IN ('Norway');

CREATE TABLE IF NOT EXISTS inspections_norway
    PARTITION OF inspections
    FOR VALUES IN ('Norway');

CREATE TABLE IF NOT EXISTS contracts_norway
    PARTITION OF contracts
    FOR VALUES IN ('Norway');

CREATE TABLE IF NOT EXISTS opthalmologist_employees_norway
    PARTITION OF opthalmologist_employees
    FOR VALUES IN ('Norway');

CREATE TABLE IF NOT EXISTS optician_employees_norway
    PARTITION OF optician_employees
    FOR VALUES IN ('Norway');