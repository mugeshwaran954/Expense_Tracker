// utils/snsService.js
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const db = require('../config/db');

// The SDK will automatically use the region from the environment variable (AWS_REGION)
// and the credentials from the EC2 Instance Role.
const snsClient = new SNSClient({});

// Get the Topic ARN from the environment variable
const topicArn = process.env.SNS_TOPIC_ARN;

async function checkAndSendSNS(userId) {
  if (!topicArn) {
    console.error("SNS_TOPIC_ARN environment variable is not set. Skipping notification.");
    return;
  }

  try {
    // 1. Get user's info, limit, and current monthly total in parallel
    const userQuery = 'SELECT username, email, spending_limit FROM users WHERE id = ?';
    const expenseQuery = `
      SELECT SUM(amount) AS current_total
      FROM expenses
      WHERE user_id = ? AND MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())
    `;

    // Use .promise() for async/await with mysql2
    const [userResults] = await db.promise().query(userQuery, [userId]);
    const [expenseResults] = await db.promise().query(expenseQuery, [userId]);

    if (!userResults.length) {
      console.error(`User not found for ID: ${userId}`);
      return;
    }

    const user = userResults[0];
    const currentTotal = parseFloat(expenseResults[0].current_total) || 0;
    const spendingLimit = parseFloat(user.spending_limit);

    // 2. Check if total exceeds limit
    // We add a basic check to prevent spamming (e.g., only alert when *crossing* the limit)
    // A more robust solution would be to check if an alert was already sent this month.
    if (currentTotal > spendingLimit && (currentTotal - (expenseResults[0].last_amount || 0) <= spendingLimit)) {
      
      const subject = `Expense Tracker Alert: Spending Limit Exceeded for ${user.username}`;
      const message = `
Hello,

This is an automated alert from your Expense Tracker.

User: ${user.username} (Email: ${user.email})
Spending Limit: $${spendingLimit.toFixed(2)}
Current Monthly Spending: $${currentTotal.toFixed(2)}

This user has exceeded their monthly spending limit.

- Expense Tracker App
      `;

      const params = {
        Message: message,
        Subject: subject,
        TopicArn: topicArn,
      };

      const command = new PublishCommand(params);
      await snsClient.send(command);
      console.log(`✅ SNS Alert sent for user ${userId} who exceeded limit.`);

    } else if (currentTotal <= spendingLimit) {
      // User is under limit, do nothing.
    } else {
      // User is *still* over limit, but was likely already alerted.
    }

  } catch (err) {
    console.error("Error in checkAndSendSNS:", err);
  }
}

module.exports = { checkAndSendSNS }; 