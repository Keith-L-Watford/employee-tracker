-- schema
DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL, -- department name
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,-- role title
    salary DECIMAL(6, 0) NOT NULL,-- hold role's salary
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, -- employee's first name
    last_name VARCHAR(30) NOT NULL, -- employee's last name
    role_id INT NOT NULL, -- employee's assigned ID number
    manager_id INT NOT NULL, -- the employee's Mananger's assigned ID number
    PRIMARY KEY (id)
);


-- Hardcoding some seed data for the database
INSERT INTO department (name)
VALUES ("Education");

INSERT INTO role (title, salary)
VALUES ("Teacher", 50000.0);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 131, 001);
