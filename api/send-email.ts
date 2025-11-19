// @ts-ignore - nodemailer types may not be available in this context
import nodemailer from 'nodemailer';

interface VercelRequest {
  method?: string;
  body?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = request.body || {};
    const { name, email, message } = body;

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

  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).json({ 
      error: 'Failed to send email. Please try again later.' 
    });
  }
}

