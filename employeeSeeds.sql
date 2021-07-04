--Hardcoding some data for the databasse

INSERT INTO department (name)
VALUES ("Education");

INSERT INTO role (title, salary)
VALUES ("Teacher", 50000.0);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 131, 001);
