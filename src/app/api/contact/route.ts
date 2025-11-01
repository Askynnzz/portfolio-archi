import { NextResponse } from "next/server";
const nodemailer = require('nodemailer')

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function env(name: string) {
  return (process.env[name] || "").trim();
}



export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // honeypot
    if (String(form.get("company") || "").trim()) {
      return NextResponse.json({ ok: true });
    }

    const from_name = String(form.get("from_name") || "").trim();
    const email     = String(form.get("email") || "").trim();
    const message   = String(form.get("message") || "").trim();
    const page      = String(form.get("page") || "").trim();

    if (!from_name || !email || !message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    const host = env("SMTP_HOST") || "smtp.gmail.com";
    const portStr = env("SMTP_PORT") || "465";
    const port = Number(portStr);
    const user = env("SMTP_USER");
    const pass = env("SMTP_PASS");
    const to   = env("MAIL_TO") || user;

    console.log("[/api/contact] env", {
      host,
      port,
      user: user.replace(/(.{2}).+(@.*)/, "$1***$2"),
      passLen: pass.length,
    });

    // Transport (465 sécurisé, sinon 587 STARTTLS)
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // Vérification explicite : si auth invalide, on le sait ici
    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to,
      replyTo: `${from_name} <${email}>`,
      subject: `Contact — ${from_name}`,
      text: `From: ${from_name} <${email}>\nPage: ${page}\n\n${message}`,
      html: `<p><b>From:</b> ${from_name} &lt;${email}&gt;</p>
             <p><b>Page:</b> ${page}</p>
             <hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    // Si 535 (BadCredentials), on retente automatiquement en 587 (STARTTLS)
    if (e?.responseCode === 535 || /BadCredentials/i.test(String(e))) {
      try {
        const host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
        const user = (process.env.SMTP_USER || "").trim();
        const pass = (process.env.SMTP_PASS || "").trim();
        const to   = (process.env.MAIL_TO || user).trim();

        const transporter587 = nodemailer.createTransport({
          host,
          port: 587,
          secure: false, // STARTTLS
          auth: { user, pass },
        });

        await transporter587.verify();
        const form = await req.formData();
        const from_name = String(form.get("from_name") || "").trim();
        const email     = String(form.get("email") || "").trim();
        const message   = String(form.get("message") || "").trim();
        const page      = String(form.get("page") || "").trim();

        await transporter587.sendMail({
          from: `"Portfolio" <${user}>`,
          to,
          replyTo: `${from_name} <${email}>`,
          subject: `Contact — ${from_name}`,
          text: `From: ${from_name} <${email}>\nPage: ${page}\n\n${message}`,
          html: `<p><b>From:</b> ${from_name} &lt;${email}&gt;</p>
                 <p><b>Page:</b> ${page}</p>
                 <hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
        });

        return NextResponse.json({ ok: true });
      } catch (err587) {
        console.error("[/api/contact] auth failed on 587:", err587);
      }
    }

    console.error("[/api/contact] error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
