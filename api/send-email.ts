// @ts-ignore
import nodemailer from "nodemailer";

export default async function handler(request: any, response: any) {

  // CORS
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  // Parse body
  let body;
  try {
    body = typeof request.body === "string"
      ? JSON.parse(request.body)
      : request.body;
  } catch (e) {
    return response.status(400).json({ error: "Invalid JSON" });
  }

  const { name, email, message } = body || {};

  if (!name || !email || !message) {
    return response.status(400).json({ error: "Missing fields" });
  }

  // SMTP config
  const smtpHost = "mail.rackhost.hu";
  const smtpPort = 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    return response.status(500).json({ error: "SMTP environment variables missing" });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const mailOptions = {
    from: smtpUser,         // Rackhost megköveteli
    to: process.env.RECIPIENT_EMAIL || smtpUser,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
    html: `
      <h2>New Contact Form Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return response.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Email error:", error);
    return response.status(500).json({ error: "Sending failed", details: error.message });
  }
}
