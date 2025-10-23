const db = require('../config/db');

// Add Expense
const addExpense = (req, res) => {
  const { category, amount, description, date } = req.body;
  const userId = req.session.user.id;
  const query = 'INSERT INTO expenses (user_id, category, amount, description, date) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [userId, category, amount, description, date], (err, result) => {
    if (err) return res.send('Error adding expense');
    res.redirect('/expenses/dashboard');
  });
};

// Get Expenses for Dashboard
const getExpenses = (req, res) => {
  const userId = req.session.user.id;
  const query = 'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC';
  db.query(query, [userId], (err, results) => {
    if (err) return res.send('Error fetching expenses');
    res.render('dashboard.ejs', { user: req.session.user, expenses: results });
  });
};

// Edit Expense
const editExpense = (req, res) => {
  const expenseId = req.params.id;
  const { category, amount, description, date } = req.body;
  const query = 'UPDATE expenses SET category = ?, amount = ?, description = ?, date = ? WHERE id = ?';
  db.query(query, [category, amount, description, date, expenseId], (err, result) => {
    if (err) return res.send('Error editing expense');
    res.redirect('/expenses/dashboard');
  });
};

// Delete Expense
const deleteExpense = (req, res) => {
  const expenseId = req.params.id;
  const query = 'DELETE FROM expenses WHERE id = ?';
  db.query(query, [expenseId], (err, result) => {
    if (err) return res.send('Error deleting expense');
    res.redirect('/expenses/dashboard');
  });
};

// Monthly Report
const getMonthlyReport = (req, res) => {
  const userId = req.session.user.id;
  const query = `SELECT category, SUM(amount) AS total 
                 FROM expenses 
                 WHERE user_id = ? AND MONTH(date) = MONTH(CURDATE()) 
                 GROUP BY category`;
  db.query(query, [userId], (err, results) => {
    if (err) return res.send('Error generating report');

    // convert total to number
    const reportData = results.map(row => ({
      category: row.category,
      total: Number(row.total)
    }));

    res.render('monthlyReport.ejs', { user: req.session.user, reportData });
  });
};

// Export all functions
module.exports = {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  getMonthlyReport
};
