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
    salary INT(10) NOT NULL,-- hold role's salary
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id), 
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, -- employee's first name
    last_name VARCHAR(30) NOT NULL, -- employee's last name
    role_id INT NOT NULL, -- employee's assigned ID number
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES department(id), 
    manager_id INT NOT NULL, -- the employee's Mananger's assigned ID number
    PRIMARY KEY (id)
);



-- Hardcoding some seed data for the database
INSERT INTO department (name)
VALUES ("Education"), ("Admin"), ("Engineering"), ("Sales"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Teacher", 50000.0, 1), ("Janitor", 10000.0, 2), ("Accounting", 4500.0, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 131, 001), ("Jane", "Doe", 543, 002);