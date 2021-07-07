require('dotenv').config()
const mysql = require('mysql');
const inquirer = require("inquirer");
// const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});


function startApp() {
  inquirer
    .prompt([{
      // for Create, Read, Update
      name: 'cru',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View Existing', 'Create New', 'Update Current', "EXIT"],
    }, ]).then((data) => {

      switch (data.cru) {
        case 'View Existing':
          readData();
          break;
        case 'Create New':
          writeData();
          break;
        case 'Update Current':
          updateData();
          break;
        default:
          connection.end();
          break;
      }
    });
};

// =====================================================================
const readData = () => {
  inquirer
    .prompt([{
      // for Create, Read, Update
      name: 'view',
      type: 'list',
      message: 'What would you like view?',
      choices: ['Departments', 'Roles', 'Employees', "Start Over"],
    }, ]).then((data) => {

      if (data.view === 'Departments') {
        connection.query('SELECT * FROM department', (err, res) => {
          if (err) throw err;
          console.table(res);
          startApp();
        });
      } else if (data.view === 'Roles') {
        connection.query('SELECT * FROM role', (err, res) => {
          if (err) throw err;
          console.table(res);
          startApp();
        });
      } else if (data.view === 'Employees') {
        connection.query('SELECT * FROM employee', (err, res) => {
          if (err) throw err;
          console.table(res);
          startApp();
        });
      } else {
        startApp();
      }
    });
}

// =====================================================================
const writeData = () => {

  inquirer.prompt([{
      type: 'list',
      name: 'writeWhat',
      message: 'What would you like to create?',
      choices: ['Role', 'Employee', 'Department', 'Start Over'],
    }, ])
    .then((data) => {

      if (data.writeWhat === 'Department') {
        newDepartment();
      } else if (data.writeWhat === 'Role') {
        newRole();
      } else if (data.writeWhat === 'Employee') {
        newEmployee();
      } else {
        startApp();
      }
    });
  // console.log('this is write test');
  // connection.end();
}


const newDepartment = () => {
  inquirer.prompt([{
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the Department you would like to add?',
    }, ])
    .then((data) => {
      const query = 'INSERT INTO department SET ?';
      connection.query(query, {
        name: data.departmentName
      }, (err) => {
        if (err) throw err;
        startApp();
      });
    });
}

const newRole = () => {
  inquirer.prompt([{
      type: 'input',
      name: 'roleName',
      message: 'What is the name of the Role you would like to add?',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'What is the salary of that Role?',
      validate(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log(" <- That isn't a number. Please enter a number.");
        return false;
      },
    }, ])
    .then((data) => {
      const query = 'INSERT INTO role SET ?';
      connection.query(query, {
        title: data.roleName,
        salary: data.salary,
      }, (err) => {
        if (err) throw err;
        startApp();
      });
    });
}

const newEmployee = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'firstName',
    message: "What is the employee's first name?",
  },
  {
    type: 'input',
    name: 'lastName',
    message: "What is the employee's last name?",
  }, 
  {
    type: 'number',
    name: 'employeeID',
    message: "What is the employee's ID number?",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      console.log(" <- That isn't a number. Please enter a number.");
      return false;
    },
  },
  {
    type: 'input',
    name: 'managerID',
    message: "What is the their manager's ID number?",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      console.log(" <- That isn't a number. Please enter a number.");
      return false;
    },
  },
])
  .then((data) => {
    const query = 'INSERT INTO employee SET ?';
    connection.query(query, {
      first_name: data.firstName,
      last_name: data.lastName,
      role_id: data.employeeID,
      manager_id: data.managerID, 
    }, (err) => {
      if (err) throw err;
      startApp();
    });
  });
}

// =====================================================================
const updateData = () => {
  console.log('this is update test');
  connection.end();
}




// =====================================================================
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  // connection.end();
  startApp();
});