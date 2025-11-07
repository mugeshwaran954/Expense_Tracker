// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res) => {
  // Get new fields from the form
  const { username, email, password, spending_limit } = req.body;
  const hashed = bcrypt.hashSync(password, 8);

  // Add new columns to the query
  const sql = 'INSERT INTO users (username, email, password, spending_limit) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [username, email, hashed, spending_limit], (err) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.send('Error registering user');
    }
    res.redirect('/login');
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      console.error('Invalid credentials:', err);
      // Be more generic for security
      return res.status(401).send('Invalid email or password.');
    }

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) {
       return res.status(401).send('Invalid email or password.');
    }

    req.session.user = user;
    res.redirect('/expenses/dashboard');
  });
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};