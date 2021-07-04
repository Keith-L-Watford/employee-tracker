require('dotenv').config()
const mysql      = require('mysql');
const inquirer = require("inquirer");


const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
});


inquirer.prompt([
    {
        
    },
])
    .then((data) => {

});







connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.end();
  });
  