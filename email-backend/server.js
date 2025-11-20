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

  // Alapvető validáció
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
  }

  try {
    // Levél küldése a Resend API-n keresztül (HTTP kérés, nem blokkolja a Render!)
    const data = await resend.emails.send({
      // FONTOS: Itt a SAJÁT domainedet kell használni, amit a Resend-en beállítottál!
      // Példa: "onboarding@resend.dev" (teszteléshez) vagy "contact@te-domained.com"
      from: "Portfolio Contact <onboarding@resend.dev>", 
      
      // Ide érkezzen meg a levél (a te saját Gmail címed)
      to: ["tinkodev@gmail.com"], 
      
      // Ha válaszolsz a levélre, az a látogatónak menjen
      reply_to: email, 
      
      subject: `Új üzenet tőle: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>🚀 Új megkeresés érkezett!</h2>
          <p><strong>Név:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Üzenet:</strong></p>
          <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    console.log("Sikeres küldés:", data);
    
    if (data.error) {
        console.error("Resend API hiba:", data.error);
        return res.status(500).json({ error: "Hiba történt az email küldésekor." });
    }

    res.status(200).json({ success: true, message: "Email elküldve!" });

  } catch (error) {
    console.error("Szerver hiba:", error);
    res.status(500).json({ error: "A szerver nem tudta elküldeni az emailt." });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`🚀 Backend running on port ${port}`));