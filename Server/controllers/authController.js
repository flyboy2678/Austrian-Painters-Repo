const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createUser, getUserByEmail, getUserById } = require("../models/userModel");
const { jwtDecode } = require("jwt-decode");
const nodemailer = require("nodemailer");

const secretKey = process.env.JWT_SECRET;

// Variable to track user status and activity
let userStatus = "offline"; // Default is offline
let inactivityTimer = null; // Timer to track inactivity

// Function to set user status to 'tired' after 30 minutes of inactivity
const setInactivityTimeout = () => {
    // Clear any existing timer
    if (inactivityTimer) {
        clearTimeout(inactivityTimer);
    }

    // Set a new timer for 30 minutes (1800000 ms)
    inactivityTimer = setTimeout(() => {
        userStatus = "tired";
        console.log("User is now tired due to 30 minutes of inactivity.");
    }, 1800000); // 30 minutes
};

// Function to get the user's status
const getUserStatus = (req, res) => {
    if (req.token) {
        res.status(200).send({ status: userStatus });
    } else {
        res.status(200).send({ status: "offline" });
    }
};

// Signup function
const signup = (req, res) => {
    const user = req.body;
    createUser(user, (err, result) => {
        if (err) {
            res.status(500).send("Error creating user");
            return;
        }
        res.status(201).send(result);
    });
};

// Login function with user status update
const login = (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    getUserByEmail(email, (err, results) => {
        if (err) {
            res.status(500).send("Error getting user");
            return;
        }

        if (results.length === 0) {
            res.status(401).send("User not found");
            return;
        }

        const user = results[0];

        // Compare the password entered with the hashed password in the database before logging the user in
        bcrypt.compare(password, user.Password, (err, result) => {
            if (err) {
                res.status(500).send("Error comparing passwords");
                return;
            }

            if (!result) {
                res.status(401).send("Invalid credentials");
                return;
            }

            // Create token
            const token = jwt.sign(
                {
                    id: user.Emp_id,
                    firstName: user.FirstName,
                    lastName: user.LastName,
                    email: user.Email,
                    admin: user.Admin,
                },
                secretKey,
                { expiresIn: "9h" },
                { algorithm: "HS256" }
            );

            // Set user status to online when successfully logged in
            userStatus = "online";

            // Reset inactivity timeout every time the user logs in
            setInactivityTimeout();

            res.status(200).send({ token, status: userStatus });
        });
    });
};

// Function to refresh token and reset inactivity timer
const refreshToken = (req, res) => {
    const token = req.body;
    const decoded = jwtDecode(token.refreshToken.token);

    // Retrieve the updated user details
    getUserById(decoded.id, (err, results) => {
        if (err) {
            res.status(500).send("Error getting user");
            return;
        }

        const user = results[0];
        if (!user) {
            res.status(401).send("User not found");
            return;
        }

        // Create a new token with the updated user details
        const token = jwt.sign(
            {
                id: decoded.id,
                firstName: user.FirstName,
                lastName: user.LastName,
                email: user.Email,
                admin: user.Admin,
            },
            secretKey,
            { expiresIn: "9h" },
            { algorithm: "HS256" }
        );

        // Set user status to online after token refresh
        userStatus = "online";

        // Reset inactivity timeout every time the user refreshes their token
        setInactivityTimeout();

        res.status(200).send({ token, status: userStatus });
    });
};

// Send Forgot Password Email
const sendForgotPasswordEmail = (req, res) => {
    const { email } = req.body;
    const token = jwt.sign(
        { email },
        secretKey,
        { expiresIn: "1h" },
        { algorithm: "HS256" }
    );

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "ttsunke15@gmail.com",
        to: email,
        subject: "Password Reset",
        html: `Click on the link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(500).send("Error sending email");
            return;
        }
        res.status(200).send("Email sent");
    });
};

// Logout function to update the status to offline
const logout = (req, res) => {
    userStatus = "offline"; // Update the user's status to offline
    clearTimeout(inactivityTimer); // Clear inactivity timer on logout
    res.status(200).send({ status: userStatus });
};

module.exports = { signup, login, refreshToken, sendForgotPasswordEmail, getUserStatus, logout };
