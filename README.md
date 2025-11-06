💸 Expense Tracker Web App Using AWS


🔗 GitHub Repository: Expense Tracker Web App Using AWS

🧾 Project Description

The Expense Tracker Web Application is a cloud-hosted platform that helps users efficiently manage their daily and monthly expenses.
It allows users to register, log in, add, view, and manage expenses, while also visualizing monthly spending trends through an interactive dashboard.

The system is developed using Node.js and Express.js for the backend, and EJS, Bootstrap, CSS, and JavaScript for the frontend.
All data is stored securely in AWS RDS (MySQL), and the application is deployed on AWS EC2 for high availability.
Additionally, AWS CloudWatch is used to monitor instance performance and ensure system reliability.

🎯 Project Outcome

Developed a full-stack Expense Tracker with authentication, data management, and analytics.

Deployed successfully on AWS Cloud using EC2 for hosting and RDS for database management.

Integrated AWS CloudWatch to track instance health (CPU, disk, network).

Provided interactive charts for monthly expense visualization using Chart.js.

Implemented a secure and user-friendly dashboard to manage all financial activities.

🧠 Key Features

✅ User Registration & Login
✅ Add, Edit, and Delete Expenses
✅ Dashboard showing recent expenses
✅ Monthly Reports with Chart.js visualization
✅ AWS Cloud deployment using EC2, RDS, and CloudWatch

🧰 Key Technologies Used
Category	Technologies
Frontend	EJS, CSS, Bootstrap, JavaScript, Chart.js
Backend	Node.js, Express.js
Database	MySQL (AWS RDS)
Cloud Services	AWS EC2, AWS RDS, AWS CloudWatch
Version Control	Git & GitHub
Tools Used	MySQL Workbench, Visual Studio Code
☁️ Cloud Architecture Overview
User (Browser)
   │
   ▼
Frontend (EJS, Bootstrap, JS)
   │
   ▼
Backend (Node.js + Express) → Hosted on AWS EC2
   │
   ▼
Database (MySQL) → Hosted on AWS RDS
   │
   ▼
Monitoring → AWS CloudWatch

⚙️ Project Setup & Deployment
🔹 Phase 1: Development

Designed frontend using EJS templates, CSS, and Bootstrap.

Built backend APIs using Node.js and Express.js.

Created MySQL database schema with users and expenses tables.

🔹 Phase 2: AWS Setup

EC2 Instance – Launch Ubuntu EC2 instance, install Node.js, clone repo, run app.

RDS MySQL Database – Create and connect using endpoint credentials.

CloudWatch – Monitor EC2 metrics and set alarms.

📊 Database Schema
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
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

🚀 How to Run Locally
git clone https://github.com/mugeshwaran954/Expense-Tracker.git
cd Expense-Tracker
npm install
node server.js


Visit: http://localhost:3000

🧩 AWS Verification

✅ Data stored in AWS RDS

✅ Backend hosted on AWS EC2

✅ Instance monitored using CloudWatch

🧾 Result

The Expense Tracker Web App was successfully developed and deployed on AWS Cloud.
It ensures secure authentication, efficient expense management, and visual financial insights for users.
By leveraging EC2, RDS, and CloudWatch, the project achieves scalability, security, and continuous monitoring.

📸 Screenshots

<img width="975" height="458" alt="image" src="https://github.com/user-attachments/assets/b1779431-0468-4490-be16-4c07eb336fcc" />
<img width="975" height="336" alt="image" src="https://github.com/user-attachments/assets/0e5285ec-0eb4-4fef-a908-8a76e3126ad2" />
<img width="975" height="555" alt="image" src="https://github.com/user-attachments/assets/6c4f3cd9-602d-4fbc-be70-54b3ea205024" />



🔗 Future Enhancements

AWS SES for email alerts

AWS S3 for storing receipts

Multi-user budget sharing

Dark/Light mode UI
