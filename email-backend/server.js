import express from "express";
import { Resend } from "resend"; // Új import
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Inicializáljuk a Resend-et a környezeti változóból
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <contact@TE_DOMAINED.com>", // FONTOS: Itt a saját domainedet használd!
      to: ["tinkodev@gmail.com"], // Ide érkezzen a levél (a saját gmailed)
      reply_to: email, // Hogy válaszolni tudj a feladónak
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("Email sent successfully:", data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Backend running on ${port}`));