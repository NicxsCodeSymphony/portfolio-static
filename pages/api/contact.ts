import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, message, foundThrough } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred email service
            auth: {
                user: process.env.EMAIL_USER || "edisannico@gmail.com", // your email
                pass: process.env.EMAIL_PASS || "nlfc obbf wdkr brys" // your app password
            }
        });

        // Email to you (the studio)
        const studioEmail = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // your email
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
                        
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #555;">Name:</strong>
                            <span style="margin-left: 10px; color: #333;">${name}</span>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #555;">Email:</strong>
                            <span style="margin-left: 10px; color: #333;">${email}</span>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #555;">Found Through:</strong>
                            <span style="margin-left: 10px; color: #333;">${foundThrough || 'Not specified'}</span>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <strong style="color: #555;">Message:</strong>
                            <div style="margin-left: 10px; margin-top: 5px; padding: 15px; background-color: white; border-left: 4px solid #007bff; color: #333;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
                        <p>This message was sent from your portfolio contact form.</p>
                    </div>
                </div>
            `
        };

        // Email to the sender (confirmation)
        const confirmationEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting us!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #007bff; margin-bottom: 10px;">Thank You!</h1>
                        <p style="color: #666; font-size: 18px;">Your message has been successfully sent.</p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Message Confirmation</h3>
                        
                        <p style="color: #555; line-height: 1.6;">
                            Dear <strong>${name}</strong>,
                        </p>
                        
                        <p style="color: #555; line-height: 1.6;">
                            Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.
                        </p>
                        
                        <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <h4 style="color: #007bff; margin-top: 0;">Your Message:</h4>
                            <p style="color: #333; font-style: italic; margin: 0;">
                                "${message.length > 100 ? message.substring(0, 100) + '...' : message}"
                            </p>
                        </div>
                        
                        <p style="color: #555; line-height: 1.6;">
                            We typically respond within 24-48 hours. If you have any urgent inquiries, please don't hesitate to reach out again.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            Best regards,<br>
                            <strong>John Nico Edisan</strong>
                        </p>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(studioEmail);
        await transporter.sendMail(confirmationEmail);

        res.status(200).json({ 
            success: true, 
            message: 'Emails sent successfully' 
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email' 
        });
    }
}
