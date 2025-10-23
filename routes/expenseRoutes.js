const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  getMonthlyReport
} = require('../controllers/expenseController');

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// =====================
// GET Routes
// =====================

// Dashboard page
router.get('/dashboard', isLoggedIn, getExpenses);

// Monthly report page
router.get('/monthly-report', isLoggedIn, getMonthlyReport);

// Show Add Expense page
router.get('/add', isLoggedIn, (req, res) => {
  res.render('addExpense', { user: req.session.user });
});

// =====================
// POST Routes
// =====================

// Add new expense
router.post('/add', isLoggedIn, addExpense);

// Edit expense
router.post('/edit/:id', isLoggedIn, editExpense);

// Delete expense
router.post('/delete/:id', isLoggedIn, deleteExpense);

module.exports = router;

