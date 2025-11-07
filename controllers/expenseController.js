// controllers/expenseController.js
const db = require('../config/db');
const { checkAndSendSNS } = require('../utils/snsService'); // <-- IMPORT SNS SERVICE

// Add Expense
const addExpense = (req, res) => {
  const { category, amount, description, date } = req.body;
  const userId = req.session.user.id;
  const query = 'INSERT INTO expenses (user_id, category, amount, description, date) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [userId, category, amount, description, date], (err, result) => {
    if (err) return res.send('Error adding expense');

    // --- NEW SNS CHECK ---
    // Run this in the background and don't wait for it.
    checkAndSendSNS(userId).catch(console.error); 
    // --- END NEW ---

    res.redirect('/expenses/dashboard');
  });
};

// Get Expenses for Dashboard (Improved Query)
const getExpenses = (req, res) => {
  const userId = req.session.user.id;
  
  // Query 1: Get recent 10 expenses for the table
  const expenseQuery = 'SELECT *, DATE_FORMAT(date, "%Y-%m-%d") AS formatted_date FROM expenses WHERE user_id = ? ORDER BY date DESC LIMIT 10';
  
  // Query 2: Get category totals for the current month's chart
  const chartQuery = `
    SELECT category, SUM(amount) AS total
    FROM expenses 
    WHERE user_id = ? AND MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())
    GROUP BY category
  `;

  // Run both queries together
  db.query(`${expenseQuery};${chartQuery}`, [userId, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.send('Error fetching data');
    }
    
    const expenses = results[0];
    const chartData = results[1].map(row => ({
      category: row.category,
      total: Number(row.total)
    }));

    res.render('dashboard.ejs', { 
      expenses: expenses,
      chartData: chartData // Pass the new chart data to the view
    });
  });
};

// Edit Expense
const editExpense = (req, res) => {
  const expenseId = req.params.id;
  const { category, amount, description, date } = req.body;
  const query = 'UPDATE expenses SET category = ?, amount = ?, description = ?, date = ? WHERE id = ?';
  db.query(query, [category, amount, description, date, expenseId], (err, result) => {
    if (err) return res.send('Error editing expense');
    
    // Also check SNS after an edit
    checkAndSendSNS(req.session.user.id).catch(console.error);
    res.redirect('/expenses/dashboard');
  });
};

// Delete Expense
const deleteExpense = (req, res) => {
  const expenseId = req.params.id;
  const query = 'DELETE FROM expenses WHERE id = ?';
  db.query(query, [expenseId], (err, result) => {
    if (err) return res.send('Error deleting expense');
    
    // And check SNS after a delete
    checkAndSendSNS(req.session.user.id).catch(console.error);
    res.redirect('/expenses/dashboard');
  });
};

// Monthly Report
const getMonthlyReport = (req, res) => {
  const userId = req.session.user.id;
  const query = `
    SELECT category, SUM(amount) AS total 
    FROM expenses 
    WHERE user_id = ? AND MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())
    GROUP BY category
    ORDER BY total DESC
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.send('Error generating report');

    const reportData = results.map(row => ({
      category: row.category,
      total: Number(row.total)
    }));

    res.render('monthlyReport.ejs', { reportData });
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