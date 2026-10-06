import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";
import { ownerNotification, senderConfirmation } from "./templates.js";

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

// A teszt-feladó (onboarding@resend.dev) csak a Resend fiók saját címére tud küldeni,
// ezért a látogatónak szóló visszaigazolás csak hitelesített domainnel (RESEND_FROM) megy ki.
const FROM_ADDRESS = process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>";
const CAN_SEND_CONFIRMATION = Boolean(process.env.RESEND_FROM);
const OWNER_EMAIL = "tinkodev@gmail.com";

// Ébresztő végpont: a frontend oldalbetöltéskor meghívja, hogy az alvó szerver
// mire az űrlapot elküldik, már fusson
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/contact", async (req, res) => {
  const { name, email, message, locale } = req.body;

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

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  try {
    // Levél küldése neked (portfolio owner) - MINDIG ide megy, függetlenül attól, hogy mi van a form-ban!
    const ownerEmailData = {
      from: FROM_ADDRESS,
      to: [OWNER_EMAIL],
      // Ha válaszolsz a levélre, az a látogatónak menjen (a form-ban beírt email)
      reply_to: cleanEmail,
      ...ownerNotification({ name: cleanName, email: cleanEmail, message: cleanMessage }),
    };

    // Automatikus visszaigazoló levél a feladónak, az oldalon kiválasztott nyelven
    const senderConfirmationEmailData = {
      from: FROM_ADDRESS,
      to: [cleanEmail],
      // Ha az ügyfél válaszol a visszaigazolásra, az hozzád érkezzen
      reply_to: OWNER_EMAIL,
      ...senderConfirmation({ name: cleanName, message: cleanMessage, locale, replyEmail: OWNER_EMAIL }),
    };

    console.log("📤 Email küldése...", {
      ownerTo: ownerEmailData.to,
      reply_to: ownerEmailData.reply_to,
      ownerSubject: ownerEmailData.subject,
      confirmationTo: CAN_SEND_CONFIRMATION ? senderConfirmationEmailData.to : "(kihagyva, nincs RESEND_FROM)",
    });

    const ownerResult = await resend.emails.send(ownerEmailData);
    console.log("📬 Resend API válasz (owner):", JSON.stringify(ownerResult, null, 2));

    // Csak a neked szóló levél hibája számít sikertelen küldésnek
    if (ownerResult.error) {
      console.error("❌ Resend API hiba (owner):", JSON.stringify(ownerResult.error, null, 2));
      return res.status(500).json({
        error: "Hiba történt az email küldésekor.",
        details: ownerResult.error.message || "Ismeretlen hiba"
      });
    }

    // A visszaigazolás hibája nem akadályozhatja meg, hogy a látogató sikert lásson
    let confirmationId = null;
    if (CAN_SEND_CONFIRMATION) {
      try {
        const senderResult = await resend.emails.send(senderConfirmationEmailData);
        if (senderResult.error) {
          console.error("⚠️ Visszaigazolás nem ment ki:", JSON.stringify(senderResult.error, null, 2));
        } else {
          confirmationId = senderResult.data?.id ?? null;
        }
      } catch (confirmationError) {
        console.error("⚠️ Visszaigazolás nem ment ki:", confirmationError.message);
      }
    }

    console.log("✅ Email sikeresen elküldve!", {
      ownerId: ownerResult.data?.id,
      confirmationId
    });
    res.status(200).json({
      success: true,
      message: "Email elküldve!",
      id: ownerResult.data?.id,
      confirmationId
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