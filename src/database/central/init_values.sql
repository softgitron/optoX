--Add here more table initialization stuff
INSERT INTO bank_accounts (bank_account_id, balance)VALUES (0, 0);

INSERT INTO opticians (optician_id, bank_account_id, optician_country, name)VALUES (0, 0, 'Finland', 'Nissen');

INSERT INTO optician_employees (employee_id, optician_id, optician_country, optician_employee_country,
social_security_number, email, password, first_name, last_name, access_level)
VALUES (0, 0, 'Finland', 'Finland', '456878-1458', 'optician@mail.com', 'optician', 'First', 'Last', 'Normal');

INSERT INTO opthalmologists (opthalmologist_id, bank_account_id, opthalmologist_country, name)VALUES (0, 0, 'Finland', 'TAYS');

INSERT INTO opthalmologist_employees (employee_id, opthalmologist_id, opthalmologist_country, opthalmologist_employee_country,
social_security_number, email, password, first_name, last_name, access_level)
VALUES (0, 0, 'Finland', 'Finland', '456878-1458', 'opthalmologist@mail.com', 'opthalmologist', 'First', 'Last', 'Normal');

INSERT INTO customers (customer_id, customer_country, social_security_number, email, first_name, last_name)
VALUES (0, 'Finland', '456878-1458', 'user@mail.com', 'First', 'Last');

INSERT INTO inspections (inspection_id, customer_id, customer_country, optician_id, optician_country, opthalmologist_id,
opthalmologist_country, inspections_country, fundus_photo_ref, oct_scan_ref, visual_field_ref, inspection_time, login_token)
VALUES (0, 0, 'Finland', 0, 'Finland', 0, 'Finland', 'Finland', 1, 2, 3, NOW(), '1234567890123456');