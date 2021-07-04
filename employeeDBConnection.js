const mysql      = require('mysql');



const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.end();
  });
  