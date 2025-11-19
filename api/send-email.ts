// @ts-ignore - nodemailer types may not be available in this context
import nodemailer from 'nodemailer';

// Vercel serverless function types
interface VercelRequest {
  method?: string;
  body?: string | Record<string, any>;
  headers?: Record<string, string>;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body
    let body;
    try {
      body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    } catch (e) {
      return response.status(400).json({ error: 'Invalid JSON in request body' });
    }

    const { name, email, message } = body || {};

    // Validate input
    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ error: 'Invalid email address' });
    }

    // Get SMTP credentials from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.rackhost.hu';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465');
    const smtpUser = process.env.SMTP_USER; // Full email address
    const smtpPassword = process.env.SMTP_PASSWORD;
    const recipientEmail = process.env.RECIPIENT_EMAIL || smtpUser;

    if (!smtpUser || !smtpPassword) {
      console.error('SMTP credentials not configured');
      return response.status(500).json({ 
        error: 'Email service not configured. Please contact the administrator.' 
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: recipientEmail,
      subject: `Portfolio Contact Form: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 3px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return response.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Return detailed error in development, generic in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Failed to send email: ${error?.message || 'Unknown error'}`
      : 'Failed to send email. Please try again later.';
    
    return response.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

