"use client";
import { useRef, useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

export default function ContactForm({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const t = (fr: string, en: string) => (locale === "fr" ? fr : en);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    setErrorMsg(null);

    const fd = new FormData(formRef.current);

    // si honeypot rempli => on arrête mais on répond OK pour ne pas aider les bots
    if (String(fd.get("company") || "").trim()) {
      setStatus("ok");
      formRef.current.reset();
      return;
    }

    // ajoute la page courante (utile dans l'email)
    if (!fd.get("page") && typeof window !== "undefined") {
      fd.set("page", window.location.href);
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setStatus("ok");
        formRef.current.reset();
      } else {
        setStatus("err");
        setErrorMsg(t("Erreur serveur — réessaie.", "Server error — please try again."));
      }
    } catch {
      setStatus("err");
      setErrorMsg(t("Impossible d’envoyer le message.", "Unable to send the message."));
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-3">
      <Input name="from_name" placeholder={t("Votre nom", "Your name")} required />
      <Input name="email" type="email" placeholder={t("Votre email", "Your email")} required />
      <Textarea name="message" placeholder={t("Message", "Message")} required minLength={20} />

      {/* champs cachés */}
      <input type="hidden" name="page" value="" />
      <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t("Envoi…", "Sending…") : t("Envoyer", "Send")}
        </Button>
        {status === "ok" && (
          <span className="text-sm text-emerald-600">
            {t("Message envoyé ✅", "Message sent ✅")}
          </span>
        )}
        {status === "err" && <span className="text-sm text-red-600">{errorMsg}</span>}
      </div>
    </form>
  );
}
