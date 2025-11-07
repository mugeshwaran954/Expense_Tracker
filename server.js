// server.js
const express = require('express');
const path = require('path');
const session = require('express-session');
require('./config/db'); // db connection is initiated

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'a-fallback-secret-key-123',
  resave: false,
  saveUninitialized: false, // Set to false for best practice
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in prod
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// --- NEW MIDDLEWARE ---
// This makes the 'user' variable available in all .ejs files
// so the navbar can show "Welcome, User" or "Login"
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
// --- END NEW ---

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/', authRoutes);
app.use('/expenses', expenseRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send('404 Page Not Found');
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));