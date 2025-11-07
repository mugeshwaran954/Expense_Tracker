// config/db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'expense-tracker-db.cpy08604cofv.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Busky12345',
  database: 'expense_tracker',
  multipleStatements: true // <-- ADD THIS LINE
});

connection.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to AWS RDS Database");
});
module.exports = connection;
