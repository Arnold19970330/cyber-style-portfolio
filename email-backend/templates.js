// E-mail sablonok: táblázatos elrendezés és inline stílusok, mert a levelezőprogramok
// (főleg a Gmail és az Outlook) csak ezt jelenítik meg megbízhatóan.

const BRAND_NAME = "Galaczi Arnold";
const BRAND_ROLE = { hu: "Full stack fejlesztő", en: "Full Stack Developer" };

const COLORS = {
  page: "#eef2f7",
  card: "#ffffff",
  header: "#0b1220",
  accent: "#00d4ff",
  accentDark: "#0b1220",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  quote: "#f8fafc",
};

const FONT = "Arial, Helvetica, sans-serif";

export const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatMessage = (message) => escapeHtml(message).replace(/\n/g, "<br>");

const formatDate = (date, locale) =>
  date.toLocaleString(locale === "en" ? "en-GB" : "hu-HU", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const layout = ({ kicker, title, body, footer }) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.page};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.page};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${COLORS.card};border-radius:12px;overflow:hidden;border:1px solid ${COLORS.border};">
            <tr>
              <td style="background:${COLORS.header};padding:28px 32px;border-bottom:4px solid ${COLORS.accent};">
                <p style="margin:0 0 8px;font-family:${FONT};font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${COLORS.accent};">${kicker}</p>
                <h1 style="margin:0;font-family:${FONT};font-size:26px;line-height:1.3;font-weight:bold;color:#ffffff;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;font-family:${FONT};font-size:16px;line-height:1.6;color:${COLORS.text};">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${COLORS.border};font-family:${FONT};font-size:13px;line-height:1.5;color:${COLORS.muted};">
                ${footer}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const field = (label, value) => `
  <tr>
    <td style="padding:0 0 18px;">
      <p style="margin:0 0 4px;font-family:${FONT};font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${COLORS.muted};">${label}</p>
      <p style="margin:0;font-family:${FONT};font-size:18px;font-weight:bold;color:${COLORS.text};">${value}</p>
    </td>
  </tr>`;

const messageBox = (label, message) => `
  <p style="margin:8px 0 8px;font-family:${FONT};font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${COLORS.muted};">${label}</p>
  <div style="background:${COLORS.quote};border-left:4px solid ${COLORS.accent};border-radius:4px;padding:18px 20px;font-family:${FONT};font-size:16px;line-height:1.7;color:${COLORS.text};">
    ${formatMessage(message)}
  </div>`;

const button = (href, label) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px;">
    <tr>
      <td style="background:${COLORS.accent};border-radius:6px;">
        <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:16px;font-weight:bold;color:${COLORS.accentDark};text-decoration:none;">${label}</a>
      </td>
    </tr>
  </table>`;

/** Neked szóló értesítés egy új megkeresésről. */
export const ownerNotification = ({ name, email, message, date = new Date() }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: Megkeresés a portfólióról")}`;

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${field("Név", safeName)}
      ${field("E-mail", `<a href="mailto:${safeEmail}" style="color:${COLORS.text};text-decoration:underline;">${safeEmail}</a>`)}
      ${field("Időpont", escapeHtml(formatDate(date, "hu")))}
    </table>
    ${messageBox("Üzenet", message)}
    ${button(replyHref, `Válasz neki: ${safeName}`)}`;

  return {
    subject: `Új megkeresés: ${name}`,
    html: layout({
      kicker: "Új megkeresés",
      title: "Üzenet érkezett a portfólióról",
      body,
      footer: "A kapcsolati űrlapról érkezett. Ha a levelezőben a Válasz gombot nyomod, a válasz közvetlenül a feladónak megy.",
    }),
    text: [
      "Új megkeresés a portfólióról",
      "",
      `Név: ${name}`,
      `E-mail: ${email}`,
      `Időpont: ${formatDate(date, "hu")}`,
      "",
      "Üzenet:",
      message,
    ].join("\n"),
  };
};

const CONFIRMATION_COPY = {
  hu: {
    subject: "Köszönöm a megkeresést! – Galaczi Arnold",
    kicker: "Visszaigazolás",
    title: "Köszönöm a megkeresést!",
    greeting: (name) => `Kedves ${name}!`,
    intro: "Megkaptam az üzenetedet, és hamarosan – általában 1 munkanapon belül – személyesen válaszolok.",
    followUp: "Ha közben eszedbe jut még valami, egyszerűen válaszolj erre a levélre.",
    messageLabel: "Az üzeneted",
    regards: "Üdvözlettel,",
    footer: "Ezt a levelet azért kaptad, mert kitöltötted a kapcsolati űrlapot a portfóliómon.",
  },
  en: {
    subject: "Thanks for reaching out! – Arnold Galaczi",
    kicker: "Confirmation",
    title: "Thanks for reaching out!",
    greeting: (name) => `Hi ${name},`,
    intro: "I've received your message and will get back to you personally soon – usually within 1 business day.",
    followUp: "If anything else comes to mind in the meantime, just reply to this email.",
    messageLabel: "Your message",
    regards: "Best regards,",
    footer: "You received this email because you filled out the contact form on my portfolio.",
  },
};

/** Visszaigazolás a feladónak, az oldalon kiválasztott nyelven. */
export const senderConfirmation = ({ name, message, locale, replyEmail }) => {
  const lang = locale === "en" ? "en" : "hu";
  const copy = CONFIRMATION_COPY[lang];
  const signatureName = lang === "en" ? "Arnold Galaczi" : BRAND_NAME;

  const body = `
    <p style="margin:0 0 16px;font-size:18px;font-weight:bold;">${copy.greeting(escapeHtml(name))}</p>
    <p style="margin:0 0 16px;">${copy.intro}</p>
    <p style="margin:0 0 24px;">${copy.followUp}</p>
    ${messageBox(copy.messageLabel, message)}
    <p style="margin:28px 0 4px;">${copy.regards}</p>
    <p style="margin:0;font-size:18px;font-weight:bold;">${signatureName}</p>
    <p style="margin:2px 0 0;color:${COLORS.muted};">${BRAND_ROLE[lang]} · <a href="mailto:${replyEmail}" style="color:${COLORS.muted};">${replyEmail}</a></p>`;

  return {
    subject: copy.subject,
    html: layout({ kicker: copy.kicker, title: copy.title, body, footer: copy.footer }),
    text: [
      copy.greeting(name),
      "",
      copy.intro,
      copy.followUp,
      "",
      `${copy.messageLabel}:`,
      message,
      "",
      copy.regards,
      signatureName,
      `${BRAND_ROLE[lang]} · ${replyEmail}`,
    ].join("\n"),
  };
};
