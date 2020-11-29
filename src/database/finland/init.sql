CREATE TABLE IF NOT EXISTS "employees" (
  "employee_id" SERIAL PRIMARY KEY,
  "country" VARCHAR(100) NOT NULL,
  "social_security_number" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "password" VARCHAR(100) NOT NULL,
  "first_name" VARCHAR(100) NOT NULL,
  "last_name" VARCHAR(100) NOT NULL,
  "access_level" VARCHAR(100) NOT NULL);