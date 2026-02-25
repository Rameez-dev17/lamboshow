require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the .next folder (if applicable) or other public assets
app.use(express.static(path.join(__dirname, "public")));

// Handle feedback form submission
app.post("/api/feedback", async (req, res) => {
    const { email, rating } = req.body;

    if (!email || !rating) {
        return res.status(400).send("Email and rating are required");
    }

    // Configure Gmail
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    try {
        // Email to you
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: "rameezrahman17@gmail.com",
            subject: "New Feedback Received",
            text: `
            New feedback from: ${email}
            Rating: ${rating} / 5 stars
            `
        });

        res.status(200).send("Feedback submitted successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending feedback");
    }
});

// Serve index.html (fallback)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));