// email.service.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER
} = process.env;

class EmailService {

    // Using OAuth Method
    
    // constructor() {
    //     const oAuth2Client = new google.auth.OAuth2(
    //     GOOGLE_CLIENT_ID,
    //     GOOGLE_CLIENT_SECRET,
    //     "https://developers.google.com/oauthplayground" // redirect URI
    //     );

    //     oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
    //     this.oAuth2Client = oAuth2Client;
    // }

    // async createTransporter() {
    //     const accessToken = await this.oAuth2Client.getAccessToken();

    //     return nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         type: 'OAuth2',
    //         user: GOOGLE_USER,
    //         clientId: GOOGLE_CLIENT_ID,
    //         clientSecret: GOOGLE_CLIENT_SECRET,
    //         refreshToken: GOOGLE_REFRESH_TOKEN,
    //         accessToken: accessToken.token,
    //     },
    //     tls:{
    //         rejectUnauthorized: false
    //     },
    //     connectionTimeout: 50000,
    //     greetingTimeout: 30000,
    //     socketTimeout: 50000
    //     });
    // }


    // Using App Password Method

    constructor() {
        // Create transporter once in constructor
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail address
                pass: process.env.GMAIL_APP_PASSWORD, // 16-character App Password
            },
            // Additional timeout settings for Render
            connectionTimeout: 60000, // 60 seconds
            greetingTimeout: 30000,
            socketTimeout: 60000,
        });
    }

    async sendVerificationEmail(to, name, verificationLink) {
        try {
            const mailOptions = {
                from: `Auth API <${process.env.GMAIL_USER}>`,
                to,
                subject: 'Verify Your Email',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Hello, ${name}</h2>
                        <p style="color: #666; font-size: 16px;">Thanks for registering. Please verify your email by clicking the link below:</p>
                        <a href="${verificationLink}" 
                           style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
                            Verify Email
                        </a>
                        <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
                        <p style="color: #4F46E5; word-break: break-all;">${verificationLink}</p>
                        <p style="color: #999; font-size: 12px; margin-top: 24px;">This link will expire in 24 hours.</p>
                    </div>
                `,
            };

            await this.transporter.sendMail(mailOptions);
            console.log(`Verification email sent to ${to}`);
        } catch (error) {
            console.error('Error sending verification email:', error);
            throw error;
        }
    }

    async sendPasswordResetEmail(to, name, resetLink) {
        try {
            const mailOptions = {
                from: `Auth API <${process.env.GMAIL_USER}>`,
                to,
                subject: 'Password Reset Request',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Hello, ${name}</h2>
                        <p style="color: #666; font-size: 16px;">We received a request to reset your password. Click the link below to reset it:</p>
                        <a href="${resetLink}" 
                           style="display: inline-block; padding: 12px 24px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">
                            Reset Password
                        </a>
                        <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
                        <p style="color: #DC2626; word-break: break-all;">${resetLink}</p>
                        <p style="color: #999; font-size: 12px; margin-top: 24px;">This link will expire in 10 minutes.</p>
                        <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email and your password will remain unchanged.</p>
                    </div>
                `,
            };

            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error;
        }
    }
}

module.exports = new EmailService();
