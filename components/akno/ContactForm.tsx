"use client";

import { FormEvent, useState } from "react";

const ICO = {
  ok: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" />
      <path d="M6 10.3l2.6 2.6L14 7.5" />
    </svg>
  ),
  err: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" />
      <path d="M10 5.8v5.2M10 14.2v.1" />
    </svg>
  ),
};

export function ContactForm() {
  const [msg, setMsg] = useState<{
    kind: "ok" | "err";
    title: string;
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const say = (text: string, ok: boolean) => {
    setMsg({
      kind: ok ? "ok" : "err",
      title: ok ? "Merci, c'est bien reçu." : "Un instant.",
      text,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let bad: HTMLElement | null = null;
    for (const f of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "[required]",
    )) {
      const v =
        f.type === "checkbox"
          ? (f as HTMLInputElement).checked
            ? "1"
            : ""
          : f.value.trim();
      const ko =
        !v ||
        (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      f.setAttribute("aria-invalid", String(ko));
      if (ko && !bad) bad = f;
    }
    if (bad) {
      say(
        "Merci de compléter le nom, un e-mail valide, quelques mots sur votre projet et d'accepter l'utilisation de vos données.",
        false,
      );
      bad.focus();
      return;
    }
    const gotcha = form.querySelector<HTMLInputElement>('input[name="_gotcha"]');
    if (gotcha?.value) return;

    const fallback =
      ' Écrivez-nous directement à <a href="mailto:aknoweb.contact@gmail.com">aknoweb.contact@gmail.com</a> ou appelez le <a href="tel:+33781990761">07 81 99 07 61</a>.';

    setLoading(true);
    try {
      const fd = new FormData(form);
      const r = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });
      const data = (await r.json()) as { ok?: boolean; error?: string };
      if (r.status === 503) {
        say(
          "L'envoi en ligne n'est pas encore activé." + fallback,
          false,
        );
        return;
      }
      if (!r.ok || !data.ok) {
        throw new Error(data.error ?? "fail");
      }
      form.reset();
      say("Message envoyé. À très vite.", true);
    } catch {
      say(`L'envoi a échoué.${fallback}`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form rv"
      id="form"
      noValidate
      aria-labelledby="t-form"
      onSubmit={onSubmit}
    >
      <h3 id="t-form">Allumons votre projet.</h3>
      <p className="s">Quelques mots suffisent. Réponse sous 24h.</p>
      <fieldset>
        <legend>
          Qu&apos;est-ce qu&apos;on allume ?{" "}
          <span className="sr">(plusieurs choix possibles)</span>
        </legend>
        <div className="opts">
          {["Site web", "SEO Performance"].map(
            (v, i) => (
              <label key={v}>
                <input
                  type="checkbox"
                  name="services"
                  value={v}
                  defaultChecked={i === 0}
                />
                <span>{v}</span>
              </label>
            ),
          )}
        </div>
      </fieldset>
      <fieldset>
        <legend>Votre budget, à la louche (optionnel)</legend>
        <div className="opts">
          {[
            "Moins de 5 000 €",
            "5 000 – 10 000 €",
            "10 000 – 20 000 €",
            "Plus de 20 000 €",
            "Je préfère en parler",
          ].map((v) => (
            <label key={v}>
              <input type="radio" name="budget" value={v} />
              <span>{v}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="fl">
        <div className="f">
          <input
            autoComplete="name"
            id="f-n"
            name="nom"
            placeholder=" "
            required
            onInput={(e) =>
              e.currentTarget.removeAttribute("aria-invalid")
            }
          />
          <label htmlFor="f-n">Nom</label>
          <i aria-hidden="true" />
        </div>
        <div className="f">
          <input
            autoComplete="email"
            id="f-e"
            name="email"
            placeholder=" "
            required
            type="email"
            onInput={(e) =>
              e.currentTarget.removeAttribute("aria-invalid")
            }
          />
          <label htmlFor="f-e">E-mail</label>
          <i aria-hidden="true" />
        </div>
        <div className="f full">
          <input id="f-o" name="objet" placeholder=" " />
          <label htmlFor="f-o">
            Objet <em>(optionnel)</em>
          </label>
          <i aria-hidden="true" />
        </div>
        <div className="f full">
          <textarea
            id="f-m"
            name="message"
            placeholder=" "
            required
            onInput={(e) =>
              e.currentTarget.removeAttribute("aria-invalid")
            }
          />
          <label htmlFor="f-m">Votre projet en quelques mots</label>
          <i aria-hidden="true" />
        </div>
      </div>
      <div className="rgpd">
        <input
          id="f-c"
          name="consentement"
          required
          type="checkbox"
          value="oui"
          onChange={(e) =>
            e.currentTarget.removeAttribute("aria-invalid")
          }
        />
        <label htmlFor="f-c">
          J&apos;accepte que mes données soient utilisées par AKNO uniquement
          pour répondre à ma demande (voir la{" "}
          <button data-dlg="d-conf" type="button">
            politique de confidentialité
          </button>
          ).
        </label>
      </div>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="sr"
        name="_gotcha"
        tabIndex={-1}
        type="text"
      />
      <div className="sub">
        <button className={`send${loading ? " ld" : ""}`} type="submit" disabled={loading}>
          <span className="lb">{loading ? "Envoi…" : "Envoyer ma demande"}</span>
          <span aria-hidden="true" className="ic">
            <svg viewBox="0 0 16 16">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </button>
        <small>Réponse sous 24h · Sans engagement</small>
      </div>
      {msg && (
        <div
          aria-live="polite"
          className={`msg ${msg.kind}`}
          id="msg"
          role="status"
        >
          {ICO[msg.kind]}
          <div>
            <b>{msg.title}</b>
            <p dangerouslySetInnerHTML={{ __html: msg.text }} />
          </div>
        </div>
      )}
    </form>
  );
}
