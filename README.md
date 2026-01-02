💸 Expense Tracker Web App Using AWS


🔗 GitHub Repository: Expense Tracker Web App Using AWS

🧾 Project Description

The Expense Tracker Web Application is a cloud-hosted platform that allows users to manage personal finances effectively.
It lets users register, log in, add expenses, view monthly reports, and access a dashboard that displays recent transactions and spending trends using Chart.js.

The app is built using Node.js (Express.js) for the backend, EJS, CSS, Bootstrap, and JavaScript for the frontend, and MySQL hosted on AWS RDS for persistent storage.
It is deployed on AWS EC2, with AWS CloudWatch used for performance monitoring and instance health tracking.

🎯 Project Outcome

Successfully developed and deployed a full-stack Expense Tracker web app on AWS Cloud.

Achieved seamless integration between EC2 (Node.js backend) and RDS (MySQL database).

Implemented monitoring using AWS CloudWatch for continuous tracking of EC2 metrics.

Demonstrated a scalable, reliable, and secure architecture using multiple AWS services.

🧠 Key Features

✅ User Registration and Login (secure authentication using bcrypt)
✅ Add, Edit, and Delete Expenses
✅ Dashboard showing recent transactions
✅ Monthly reports with category-wise charts (Chart.js)
✅ Cloud deployment using AWS EC2, RDS, and CloudWatch

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

⚙️ How to Run This Project on AWS

This section guides you through deploying the Expense Tracker Web App on AWS step-by-step.

🔹 Step 1: Launch an AWS EC2 Instance

Go to the AWS Management Console → EC2 → Launch Instance.

Configure:

AMI: Ubuntu Server 22.04 LTS (Free Tier)

Instance Type: t2.micro

Key Pair: Create or use an existing .pem key

Security Group: Allow inbound rules for

Port 22 (SSH)

Port 80 (HTTP)

Port 3000 (Node.js App)

Click Launch Instance.

Once running, note the Public IPv4 DNS of your instance.

🔹 Step 2: Connect to Your EC2 Instance

Open your terminal or PowerShell:

cd path/to/your-key.pem
ssh -i "expense_tracker-key.pem" ubuntu@<EC2-Public-DNS>

🔹 Step 3: Install Node.js and npm

Inside your EC2 instance:

sudo apt update
sudo apt install nodejs -y
sudo apt install npm -y
node -v
npm -v

🔹 Step 4: Clone Your GitHub Repository
git clone https://github.com/mugeshwaran954/Expense-Tracker.git
cd Expense-Tracker
npm install

🔹 Step 5: Set Up AWS RDS (MySQL Database)

Go to AWS Console → RDS → Create Database.

Select:

Engine: MySQL

Template: Free Tier

DB Instance ID: expense-tracker-db

Username: admin

Password: (your choice)

Enable Public Access (temporarily).

After creation, copy your RDS Endpoint.

Connect to your RDS instance from EC2:

mysql -h <rds-endpoint> -u admin -p


Create your database and tables:

CREATE DATABASE expense_tracker;
USE expense_tracker;

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

🔹 Step 6: Connect EC2 App to RDS

Edit config/db.js in your project:

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '<your-rds-endpoint>',
  user: 'admin',
  password: '<your-password>',
  database: 'expense_tracker'
});
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to AWS RDS');
});
module.exports = connection;

🔹 Step 7: Run Your Application

On EC2 terminal:

node server.js


✅ You should see:
Connected to AWS RDS
Server running on port 3000

Access your live app at:

http://<EC2-Public-DNS>:3000

🔹 Step 8: Monitor Instance with CloudWatch

Go to AWS Console → CloudWatch → Metrics → EC2.

View CPU utilization, memory, and network activity.

(Optional) Create an alarm for high CPU usage:

Condition: CPU > 80% for 5 minutes

Notification: via SNS or email

🔹 Step 9: Verify Data Storage

To confirm your data is being stored in AWS RDS:

mysql -h <rds-endpoint> -u admin -p
USE expense_tracker;
SELECT * FROM expenses;


You’ll see the data you entered through the web app.

🧩 AWS Services Used
AWS Service	Purpose
EC2	Host the Node.js backend
RDS (MySQL)	Store users and expense data
CloudWatch	Monitor EC2 instance performance and uptime
🧾 Result

The Expense Tracker Web App was successfully developed and deployed on AWS.
It allows users to track, visualize, and manage expenses securely and efficiently using AWS cloud infrastructure.
EC2 handles hosting, RDS manages storage, and CloudWatch ensures continuous system monitoring.

🔗 Future Enhancements

Integrate AWS S3 for uploading expense receipts.

Add AWS SES for monthly report emails.

Implement multi-user analytics dashboards.

Add budget alerts and AI-based spending predictions.
<img width="975" height="398" alt="image" src="https://github.com/user-attachments/assets/9ebf7558-4378-4341-88da-5d8a9db35f8f" />

<img width="975" height="397" alt="image" src="https://github.com/user-attachments/assets/0578e99d-3c3b-4e29-ab13-e50a3e7e928b" />

<img width="975" height="411" alt="image" src="https://github.com/user-attachments/assets/5f79c8c5-470b-477a-ba67-8cd5b9d2c92d" />

<img width="975" height="405" alt="image" src="https://github.com/user-attachments/assets/6c2084db-5edb-45e4-8d83-2fd34fe77436" />

<img width="975" height="408" alt="image" src="https://github.com/user-attachments/assets/b9621bd0-256d-40ea-a123-204fff22d379" />



