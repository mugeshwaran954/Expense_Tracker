const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',       // or your AWS RDS endpoint if deployed
  user: 'root',            // replace with your MySQL username
  password: 'Busky@2018#',            // replace with your MySQL password (default blank in XAMPP)
  database: 'expense_tracker'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ MySQL Connected...');
  }
});

module.exports = db;
