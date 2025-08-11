# Email Setup Guide

## Overview

This contact form now sends emails using nodemailer. It sends two emails:

1. **To you**: A notification email with the contact form details
2. **To the sender**: A confirmation email thanking them for their message

## Setup Instructions

### 1. Create Environment Variables

Create a `.env.local` file in your project root with:

```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password_here
```

### 2. Gmail App Password Setup

**IMPORTANT**: Do NOT use your regular Gmail password. You need an "App Password":

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Step Verification if not already enabled
3. Go to Security > App passwords
4. Select "Mail" and "Other (Custom name)"
5. Generate the password
6. Copy the 16-character password to your `.env.local` file

### 3. Alternative Email Services

#### Outlook/Hotmail

```env
EMAIL_SERVICE=outlook
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your.email@outlook.com
EMAIL_PASS=your_password
```

#### Custom SMTP Server

```env
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your.email@yourdomain.com
EMAIL_PASS=your_password
```

## How It Works

1. **User fills out contact form**
2. **Form submits to `/api/contact`**
3. **API sends two emails**:
   - Notification email to you (the studio)
   - Confirmation email to the sender
4. **User sees success/error message**

## Email Templates

### Studio Notification Email

- Professional HTML template
- Includes all contact form details
- Easy to read and respond to

### Sender Confirmation Email

- Thank you message
- Confirms message received
- Professional branding
- Sets expectations for response time

## Troubleshooting

### Common Issues

1. **"Authentication failed"**

   - Check your app password is correct
   - Ensure 2-Step Verification is enabled

2. **"Connection timeout"**

   - Check your internet connection
   - Verify email service settings

3. **"Invalid email address"**
   - Ensure EMAIL_USER is a valid email format

### Testing

1. Fill out the contact form
2. Check your email for the notification
3. Check the sender's email for confirmation
4. Verify both emails are properly formatted

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords, not regular passwords
- Consider rate limiting for production use
- Validate email inputs on both client and server

## Production Considerations

- Use environment variables on your hosting platform
- Consider using a transactional email service (SendGrid, Mailgun, etc.)
- Implement rate limiting and spam protection
- Add email validation and sanitization
