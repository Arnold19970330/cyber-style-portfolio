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

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

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

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

  try {
    // Levél küldése neked (portfolio owner)
    const ownerEmailData = {
      // FONTOS: Itt a SAJÁT domainedet kell használni, amit a Resend-en beállítottál!
      // Példa: "onboarding@resend.dev" (teszteléshez) vagy "contact@te-domained.com"
      from: "Portfolio Contact <onboarding@resend.dev>", 
      
      // Ide érkezzen meg a levél (a te saját Gmail címed) - MINDIG ide megy, függetlenül attól, hogy mi van a form-ban!
      to: ["tinkodev@gmail.com"], 
      
      // Ha válaszolsz a levélre, az a látogatónak menjen (a form-ban beírt email)
      reply_to: email, 
      
      subject: `Új üzenet tőle: ${name}`,
      html: `
        <div style="margin:0;padding:24px;background:#070b14;color:#e6f1ff;font-family:Arial,sans-serif;">
          <div style="max-width:640px;margin:0 auto;border:1px solid #00f6ff;border-radius:14px;overflow:hidden;background:linear-gradient(180deg,#0b1220 0%,#070b14 100%);box-shadow:0 0 24px rgba(0,246,255,0.25);">
            <div style="padding:20px 24px;border-bottom:1px solid rgba(0,246,255,0.35);">
              <h2 style="margin:0;color:#00f6ff;font-size:24px;letter-spacing:1px;">NEW CONTACT SIGNAL</h2>
              <p style="margin:8px 0 0;color:#9fb3c8;">Cyber Portfolio Interface</p>
            </div>
            <div style="padding:22px 24px;">
              <p style="margin:0 0 12px;"><strong style="color:#00f6ff;">Név:</strong> ${safeName}</p>
              <p style="margin:0 0 12px;"><strong style="color:#00f6ff;">Email:</strong> ${safeEmail}</p>
              <p style="margin:16px 0 8px;color:#8aa2be;">Üzenet:</p>
              <div style="background:#0e1828;border:1px solid rgba(0,246,255,0.25);border-radius:10px;padding:14px;line-height:1.6;color:#e6f1ff;">
                ${safeMessage}
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // Automatikus visszaigazoló levél a feladónak
    const senderConfirmationEmailData = {
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [email],
      subject: "Köszönöm a megkeresést! | Cyber Portfolio",
      html: `
        <div style="margin:0;padding:24px;background:#070b14;color:#e6f1ff;font-family:Arial,sans-serif;">
          <div style="max-width:640px;margin:0 auto;border:1px solid #ff00d4;border-radius:14px;overflow:hidden;background:linear-gradient(180deg,#13071a 0%,#070b14 100%);box-shadow:0 0 24px rgba(255,0,212,0.22);">
            <div style="padding:20px 24px;border-bottom:1px solid rgba(255,0,212,0.35);">
              <h2 style="margin:0;color:#ff00d4;font-size:24px;letter-spacing:1px;">MESSAGE RECEIVED</h2>
              <p style="margin:8px 0 0;color:#b8a2c5;">Visszaigazolás a megkeresésedről</p>
            </div>
            <div style="padding:22px 24px;line-height:1.6;">
              <p style="margin:0 0 12px;">Szia ${safeName}!</p>
              <p style="margin:0 0 12px;">Köszönöm a megkeresésedet, az üzeneted megérkezett hozzám.</p>
              <p style="margin:0 0 12px;">Hamarosan válaszolok a lehető legrövidebb időn belül.</p>
              <p style="margin:20px 0 0;color:#9fb3c8;">- Tinko / Cyber Portfolio</p>
            </div>
          </div>
        </div>
      `,
    };

    console.log("📤 Email küldése...", {
      ownerTo: ownerEmailData.to,
      reply_to: ownerEmailData.reply_to,
      ownerSubject: ownerEmailData.subject,
      confirmationTo: senderConfirmationEmailData.to,
    });

    const [ownerResult, senderResult] = await Promise.all([
      resend.emails.send(ownerEmailData),
      resend.emails.send(senderConfirmationEmailData),
    ]);

    console.log("📬 Resend API válasz (owner):", JSON.stringify(ownerResult, null, 2));
    console.log("📬 Resend API válasz (sender):", JSON.stringify(senderResult, null, 2));
    
    if (ownerResult.error || senderResult.error) {
        console.error("❌ Resend API hiba:", JSON.stringify({
          ownerError: ownerResult.error || null,
          senderError: senderResult.error || null
        }, null, 2));
        return res.status(500).json({ 
          error: "Hiba történt az email küldésekor.", 
          details: ownerResult.error?.message || senderResult.error?.message || "Ismeretlen hiba" 
        });
    }

    console.log("✅ Mindkét email sikeresen elküldve!", {
      ownerId: ownerResult.id,
      senderId: senderResult.id
    });
    res.status(200).json({
      success: true,
      message: "Email elküldve, visszaigazolás kiküldve!",
      id: ownerResult.id,
      confirmationId: senderResult.id
    });

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