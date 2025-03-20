require('dotenv').config();
const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Welcome to Our Platform 🎉",
      html: `<h2>Welcome, ${userName}!</h2>
             <p>Thank you for signing up. We're excited to have you on board.</p>
             <p>Explore and enjoy our platform!</p>
             <br/>
             <p>Best regards,</p>
             <p><strong>Your Company Team</strong></p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendWelcomeEmail;
