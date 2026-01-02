# 💸 Expense Tracker Web App Using AWS

A cloud-based full-stack Expense Tracker web application designed to help users efficiently manage, monitor, and analyze their personal expenses.  
The application is deployed on AWS cloud infrastructure and integrates multiple AWS services for hosting, storage, monitoring, and automated notifications.

---

## 🔗 GitHub Repository

https://github.com/mugeshwaran954/Expense_Tracker

---

## 👥 Team Members

- **Varsha K**  
- **Mugeshwaran E**  

---

## 🧾 Project Description

The **Expense Tracker Web Application** enables users to record daily expenses, categorize spending, view monthly financial reports, and receive automated email alerts when expenses exceed a predefined monthly limit.

The application is built using **Node.js (Express.js)** for backend services and **EJS, CSS, Bootstrap, and JavaScript** for frontend rendering.  
It leverages **AWS EC2, AWS RDS, AWS SNS, AWS IAM, and AWS CloudWatch** to achieve scalability, reliability, secure access control, and automation.

---

## 🎯 Project Outcomes

- Successfully developed and deployed a cloud-based Expense Tracker on AWS
- Implemented real-time expense tracking and monthly reports using Chart.js
- Integrated AWS SNS for automated email alerts when spending limits are exceeded
- Managed permissions securely using AWS IAM roles
- Hosted backend services on AWS EC2 with persistent storage using AWS RDS (MySQL)
- Achieved a scalable, secure, and production-style cloud architecture

---

## 🧠 Functional Overview

### User Registration & Login
- Secure authentication and session management

### Expense Management
- Add, edit, delete, and categorize expenses
- Store expenses with date and amount

### Dashboard
- Displays recent expenses and summary statistics

### Monthly Reports
- Visual representation of spending using Chart.js
- Category-wise expense analysis

### Spending Limit Notification
- Automatically sends email alerts via AWS SNS when monthly spending exceeds the defined limit

### Logout
- Secure session termination

---

## 🧰 Technologies Used

### Frontend
- EJS
- HTML5
- CSS3
- Bootstrap
- JavaScript
- Chart.js

### Backend
- Node.js
- Express.js

### Database
- MySQL (AWS RDS)

### Cloud Infrastructure
- AWS EC2
- AWS RDS
- AWS SNS
- AWS IAM
- AWS CloudWatch

### Development Tools
- Git & GitHub
- Visual Studio Code
- MySQL Workbench

---

## ☁️ Cloud Architecture

```text
User (Browser)
   │
   ▼
Frontend (EJS, Bootstrap, JavaScript)
   │
   ▼
Backend (Node.js + Express) — AWS EC2
   │
   ▼
Database (MySQL) — AWS RDS
   │
   ▼
Notifications — AWS SNS
   │
   ▼
Monitoring — AWS CloudWatch

```


---

## ⚙️ Deployment Guide (AWS)

### Phase 1: Application Development

- Developed frontend using EJS, CSS, Bootstrap, and JavaScript  
- Implemented backend using Node.js and Express.js  

#### Implemented Modules

- User Authentication  
- Expense CRUD Operations  
- Monthly Expense Reports (Chart.js)  

---

### Phase 2: AWS Deployment & Integration
#### Step 1: Create EC2 Instance

AMI: Ubuntu Server 22.04 LTS

Instance Type: t2.micro (Free Tier)

Security Group Inbound Rules:

- Port 22 (SSH)

- Port 80 (HTTP)

- Port 3000 (Node.js App)
#### Step 2: Connect to EC2
``` bash
ssh -i "expense_tracker-key.pem" ubuntu@<EC2-Public-IP>
```
#### Step 3: Install Node.js and npm
``` bash
sudo apt update
sudo apt install nodejs -y
sudo apt install npm -y
node -v
npm -v
```
#### Step 4: Clone Repository and Install Dependencies
``` bash
git clone https://github.com/mugeshwaran954/Expense_Tracker
cd Expense-Tracker
npm install
```
#### Step 5: Create AWS RDS (MySQL)

Engine: MySQL

Template: Free Tier

Instance Type: db.t3.micro

Public Access: Enabled (temporary)

Create database and tables:
```
CREATE DATABASE expense_tracker;
USE expense_tracker;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  spending_limit DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  category VARCHAR(100),
  amount DECIMAL(10,2),
  description TEXT,
  date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```
#### Step 6: Configure IAM and SNS

- Created IAM role for EC2 with SNS publish permissions

- Created SNS topic for expense alerts

- Subscribed user email to SNS topic

- Confirmed email subscription

#### Step 7: Run the Application
``` bash
node server.js
```

Access the application:
```
http://<EC2-Public-IP>:3000
```
---
### Phase 3: Monitoring with AWS CloudWatch

- Monitored EC2 CPU utilization and network activity

- Ensured application stability and uptime

- Enabled performance visibility through CloudWatch metrics
---

## 📄 Conclusion

The Expense Tracker Web App demonstrates a complete real-world AWS deployment workflow, integrating compute, database, notification, and monitoring services.
It provides a secure, scalable, and automated solution for personal finance tracking using modern cloud technologies.

## 📄 License

This project is developed for academic and learning purposes.
