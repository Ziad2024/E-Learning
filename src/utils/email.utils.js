import nodemailer from 'nodemailer';
import { config } from "../config/env.js"
import { createInternalError } from "./APIErrors.js"

let transporter = null;

export const initializeEmailTransporter = () => {
  transporter = nodemailer.createTransport({
    host: config.EMAIL.HOST || "smtp.gmail.com" ,
    port: config.EMAIL.PORT || 587 ,
    secure: config.EMAIL.SECURE || false ,
    auth: {
      user: config.EMAIL.USER,
      pass: config.EMAIL.PASSWORD,
    },
  });
};

export const sendEmail = async (options) => {
  if (!transporter) initializeEmailTransporter();

  const mailOptions = {
    from: config.EMAIL.FROM,
    to: options.to,
    subject: options.subject, 
    text: options.text,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {

    throw createInternalError('Failed to send email');
  }
};

export const sendWelcomeEmail = async (user) => {
  const subject = `Welcome to${config.APP_NAME}`;
const html = `  
<h1> welcome ${ user.firstName }  </h1>
<h2> thanks for using our website </h2>

`

  return sendEmail({
    to: user.email,
    subject,
    html,
  });
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetURL = `${config.FRONTEND_URL}/auth/reset-password/${resetToken}`;
  const subject = 'Password Reset Request';
  const html = `
    <h1>Password Reset</h1>
    <p>Hi${user.firstName},</p>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetURL}">Reset Password</a>
    <p>This link will expire in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  return sendEmail({
    to: user.email,
    subject,
    html,
  });
};





export const verifyEmailTransporter = async () => {
  try {
    if (!transporter) initializeEmailTransporter();
    await transporter.verify();

    return true;
  } catch (error) {

    return false;
  }
};