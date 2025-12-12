import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS beállítása: Engedjük, hogy a Vercel frontend (vagy bárki) elérje
app.use(cors({
  origin: "*", // Élesben érdemes lehet lecserélni a saját frontend domainedre
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Resend inicializálása a kulccsal
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("📧 Email küldési kérés érkezett:", { name, email, message: message?.substring(0, 50) + "..." });

  // Alapvető validáció
  if (!name || !email || !message) {
    console.error("❌ Hiányzó mezők:", { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
  }

  // Email formátum validáció
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("❌ Érvénytelen email formátum:", email);
    return res.status(400).json({ error: "Érvénytelen email cím formátum!" });
  }

  try {
    // Levél küldése a Resend API-n keresztül (HTTP kérés, nem blokkolja a Render!)
    const emailData = {
      // FONTOS: Itt a SAJÁT domainedet kell használni, amit a Resend-en beállítottál!
      // Példa: "onboarding@resend.dev" (teszteléshez) vagy "contact@te-domained.com"
      from: "Portfolio Contact <onboarding@resend.dev>", 
      
      // Ide érkezzen meg a levél (a te saját Gmail címed) - MINDIG ide megy, függetlenül attól, hogy mi van a form-ban!
      to: ["tinkodev@gmail.com"], 
      
      // Ha válaszolsz a levélre, az a látogatónak menjen (a form-ban beírt email)
      reply_to: email, 
      
      subject: `Új üzenet tőle: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>🚀 Új megkeresés érkezett!</h2>
          <p><strong>Név:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Üzenet:</strong></p>
          <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    console.log("📤 Email küldése...", { to: emailData.to, reply_to: emailData.reply_to, subject: emailData.subject });

    const data = await resend.emails.send(emailData);

    console.log("📬 Resend API válasz:", JSON.stringify(data, null, 2));
    
    if (data.error) {
        console.error("❌ Resend API hiba:", JSON.stringify(data.error, null, 2));
        return res.status(500).json({ 
          error: "Hiba történt az email küldésekor.", 
          details: data.error.message || "Ismeretlen hiba" 
        });
    }

    console.log("✅ Email sikeresen elküldve! ID:", data.id);
    res.status(200).json({ success: true, message: "Email elküldve!", id: data.id });

  } catch (error) {
    console.error("❌ Szerver hiba:", error);
    console.error("❌ Hiba részletei:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      error: "A szerver nem tudta elküldeni az emailt.", 
      details: error.message 
    });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`🚀 Backend running on port ${port}`));