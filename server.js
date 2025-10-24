const db = require('./config/db');

const express = require('express');
const path = require('path');
const session = require('express-session');
require('./config/db');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'secretKey123',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/', authRoutes);
app.use('/expenses', expenseRoutes);

app.use((req, res) => res.status(404).send('404 Page Not Found'));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
