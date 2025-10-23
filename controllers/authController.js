const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 8);

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashed], (err) => {
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
      return res.send('Invalid credentials');
    }

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.send('Incorrect password');
    }

    req.session.user = user;
    res.redirect('/expenses/dashboard');
  });
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};
