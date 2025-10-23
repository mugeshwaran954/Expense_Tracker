-- =====================================================
-- Expense Tracker Database
-- Fully Corrected SQL File
-- Author: Varsha K
-- =====================================================

-- 1️⃣ Create Database
CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

-- 2️⃣ Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- 3️⃣ Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4️⃣ Sample Data for Testing
-- Sample User
INSERT INTO users (username, email, password)
VALUES ('Varsha', 'varsha@example.com', 'password123');

-- Sample Expenses
INSERT INTO expenses (user_id, category, amount, description, date)
VALUES
(1, 'Food', 250.00, 'Lunch with friends', '2025-10-01'),
(1, 'Travel', 100.00, 'Taxi to office', '2025-10-02'),
(1, 'Bills', 150.00, 'Electricity bill', '2025-10-03'),
(1, 'Shopping', 200.00, 'Groceries', '2025-10-04'),
(1, 'Others', 50.00, 'Coffee', '2025-10-05');

-- 5️⃣ Optional: View Tables to Test
-- SELECT * FROM users;
-- SELECT * FROM expenses;
