const nodemailer = require("nodemailer");

// This uses a Gmail account to send emails.
// EMAIL_USER = your gmail address
// EMAIL_PASS = a 16-character "App Password" (NOT your normal Gmail password)
// See README.md for how to generate an App Password.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Sends a 6-digit OTP code to the given email address
const sendOtpEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"Digital Library" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify your Digital Library account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
        <h2 style="color: #2c5f6f;">Digital Library - Email Verification</h2>
        <p>Use the code below to verify your account:</p>
        <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #2c5f6f;">${otp}</p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not sign up for Digital Library, you can safely ignore this email.</p>
      </div>
    `
  });
};

module.exports = { sendOtpEmail };
