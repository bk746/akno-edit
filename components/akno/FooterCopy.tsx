"use client";

import { useRef } from "react";

export function FooterCopy() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onCopy = async () => {
    const m = "aknoweb.contact@gmail.com";
    let ok = false;
    try {
      await navigator.clipboard.writeText(m);
      ok = true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = m;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
    }
    const b = btnRef.current;
    const live = liveRef.current;
    if (b) {
      b.textContent = ok ? "Adresse copiée ✓" : "Copie impossible";
      b.classList.toggle("ok", ok);
    }
    if (live) {
      live.textContent = ok
        ? "Adresse e-mail copiée dans le presse-papiers"
        : "Copie impossible, sélectionnez l'adresse";
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (b) {
        b.textContent = "Copier l'adresse";
        b.classList.remove("ok");
      }
    }, 2200);
  };

  return (
    <>
      <button
        ref={btnRef}
        className="copy"
        type="button"
        data-mail="aknoweb.contact@gmail.com"
        id="copyMail"
        onClick={onCopy}
      >
        Copier l&apos;adresse
      </button>
      <span aria-live="polite" className="sr" id="copyLive" ref={liveRef} role="status" />
    </>
  );
}
