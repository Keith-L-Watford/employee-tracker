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
          console.log(res);
          startApp();
        });
      } else if (data.view === 'Roles') {
        connection.query('SELECT * FROM role', (err, res) => {
          if (err) throw err;
          console.log(res);
          startApp();
        });
      } else if (data.view === 'Employees') {
        connection.query('SELECT * FROM employee', (err, res) => {
          if (err) throw err;
          console.log(res);
          startApp();
        });
      } else {
        startApp();
      }
    });
  // connection.end();
}














// =====================================================================
const writeData = () => {
  console.log('this is write test');
  connection.end();
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