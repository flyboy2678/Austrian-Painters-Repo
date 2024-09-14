
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { LogHoursService } from './log-hours.service'; // Hypothetical service to get user tasks
import { UserService } from './user.service'; // Hypothetical user service
import { getUserTasks } from './tasksController'


const userModel = require("../models/userModel");

const createUser = (req, res) => {
	const user = req.body;
	userModel.createUser(user, (err, result) => {
		if (err) {
			res.status(500).send("Error creating user");
			return;
		}
		res.status(201).send(result);
	});
};

const getUserByEmail = (req, res) => {
	const email = req.params.email;
	userModel.getUserByEmail(email, (err, result) => {
		if (err) {
			res.status(500).send("Error getting user");
			return;
		}
		res.status(200).send(result);
	});
};

const getUserById = (req, res) => {
	const id = req.params.id;
	userModel.getUserById(id, (err, result) => {
		if (err) {
			res.status(500).send("Error getting user");
			return;
		}
		res.status(200).send(result);
	});
};

const updateUser = (req, res) => {
	const user = req.body;
	userModel.updateUser(user, (err, result) => {
		if (err) {
			res.status(500).send("Error updating user");
			return;
		}
		res.status(200).send(result);
	});
};

const adminUpdateUser = (req, res) => {
	const user = req.body;
	userModel.adminUpdateUser(user, (err, result) => {
		if (err) {
			res.status(500).send("Error updating user");
			return;
		}
		res.status(200).send(result);
	});
};

const getAllUsers = (req, res) => {
	userModel.getAllUsers((err, result) => {
		if (err) {
			res.status(500).send("Error getting users");
			return;
		}
		res.status(200).send(result);
	});
};

const deleteUser = (req, res) => {
	const id = req.params.id;
	userModel.deleteUser(id, (err, result) => {
		if (err) {
			res.status(500).send("Error deleting user");
			return;
		}
		res.status(200).send(result);
	});
};

const changePassword = (req, res) => {
	const user = req.body;
	userModel.changePassword(user, (err, result) => {
		if (err) {
			res.status(500).send("Error changing password");
			return;
		}
		res.status(200).send(result);
	});
};

// Function to get the user's status
const getUserStatus = (req, res) => {
    const { emp_id } = req.params.id;
    if (req.token) {
        updateUserStatus(emp_id, "online");  // Ensure user status is online
        res.status(200).send({ status: "online" });
    } else {
        updateUserStatus(emp_id, "offline");  // Ensure user status is offline
        res.status(200).send({ status: "offline" });
    }
};


import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { LogHoursService } from './log-hours.service'; // Hypothetical service to get user tasks
import { UserService } from './user.service'; // Hypothetical user service

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example: use Gmail, you can replace it with your own email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Function to generate daily task summary
const generateDailySummary = async (userId) => {
  try {
    const tasks = await getUserTasks(userId); // Assume this gets today's tasks (await added)
    const time = await getHours(userId); // Assume this gets today's hours (await added)
    let taskDescriptions = '';
    let totalHours = 0;

    // Get the current date
    const currentDate = new Date();

    // Iterate through tasks and filter based on due date and status
    tasks.forEach((task) => {
      const taskDueDate = new Date(task.DueDate); // Convert task's due date to a Date object

      // Check if the task's due date hasn't passed and its status is "in progress" 
      // or is neither "completed" nor "not started"
      if (
        taskDueDate >= currentDate && 
        (task.Status === 'in progress' || (task.Status !== 'completed' || task.Status !== 'not started'))
      ) {
        // Append task description
        taskDescriptions += `- Task: ${task.Name}\n`;

        // Add corresponding time spent on this task
        time.forEach((hrs) => {
          if (hrs.user_id === task.Task_id) { // Assuming `taskId` links to the correct task
            taskDescriptions += `  - Time Spent: ${hrs.hours} hours\n`;
            totalHours += hrs.hours;
          }
        });
      }
    });

    const summary = `Here is your summary for today:\n\n${taskDescriptions}\nTotal Hours Worked: ${totalHours}`;
    return summary;
  } catch (error) {
    console.error('Error generating daily summary:', error);
    return 'Error generating summary';
  }
};

// Function to send an email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
};

// Main function that generates the summary and sends an email
const sendDailySummaryEmail = async () => {
  const userService = new UserService(); // Instantiate user service

  try {
    const users = await userService.getAllUsers(); // Assume this returns all users

    for (const user of users) {
      const summary = await generateDailySummary(user.id);
      const emailSubject = `Daily Summary for ${new Date().toLocaleDateString()}`;

      // Send email to the user
      await sendEmail(user.email, emailSubject, summary);
    }
  } catch (error) {
    console.error('Error sending daily summary emails:', error);
  }
};

// Schedule the email to be sent daily at 7 PM
cron.schedule('0 19 * * *', () => {
  console.log('Running daily summary email job at 7 PM');
  sendDailySummaryEmail().catch((err) => {
    console.error('Error sending daily summary emails:', err);
  });
});



module.exports = {
	createUser,
	updateUser,
	adminUpdateUser,
	getUserByEmail,
	getAllUsers,
	getUserById,
	deleteUser,
	generateDailySummary,
	getUserStatus,
	changePassword,
};
