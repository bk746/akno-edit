const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const SERVICE_BESOIN: Record<string, string> = {
  "UI / UX Design": "UI-UX",
  "SEO Performance": "SEO",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function failHtml() {
  return `Oups, réessayez ou écrivez-nous sur <a href="https://wa.me/33781990761" rel="noopener" target="_blank">WhatsApp</a>.`;
}

function showFieldErrors(form: HTMLFormElement) {
  const nomEl = form.querySelector<HTMLInputElement>("#f-n");
  const emailEl = form.querySelector<HTMLInputElement>("#f-e");
  const consentEl = form.querySelector<HTMLInputElement>("#f-c");
  if (!nomEl || !emailEl || !consentEl) return null;

  const nom = nomEl.value.trim();
  const email = emailEl.value.trim();
  const nomKo = !nom;
  const emailKo = !email || !EMAIL_RE.test(email);
  const consentKo = !consentEl.checked;

  nomEl.setAttribute("aria-invalid", String(nomKo));
  emailEl.setAttribute("aria-invalid", String(emailKo));
  consentEl.setAttribute("aria-invalid", String(consentKo));

  if (nomKo) return nomEl;
  if (emailKo) return emailEl;
  if (consentKo) return consentEl;
  return null;
}

function showFormError(form: HTMLFormElement, html: string) {
  const msg = form.querySelector<HTMLElement>("#msg");
  if (!msg) return;
  msg.className = "msg err";
  msg.innerHTML = `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9"/><path d="M10 5.8v5.2M10 14.2v.1"/></svg><div><p>${html}</p></div>`;
}

function showFormSuccess(form: HTMLFormElement) {
  const sent = document.createElement("div");
  sent.className = "form rv form-sent";
  sent.setAttribute("role", "status");
  sent.setAttribute("aria-live", "polite");
  sent.innerHTML =
    "<p>Merci, c'est reçu. Réponse sous 24 h.</p>";
  form.replaceWith(sent);
}

function collectBesoin(form: HTMLFormElement) {
  return [...form.querySelectorAll<HTMLInputElement>('input[name="services"]:checked')]
    .map((el) => SERVICE_BESOIN[el.value] ?? el.value)
    .join(", ");
}

export function bindAknoContactForm(form: HTMLFormElement): () => void {
  const onFieldInput = (e: Event) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (t.id === "f-n" || t.id === "f-e" || t.id === "f-c") {
      t.removeAttribute("aria-invalid");
    }
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    const bad = showFieldErrors(form);
    if (bad) {
      bad.focus();
      return;
    }

    const bot = form.querySelector<HTMLInputElement>('input[name="botcheck"]');
    if (bot?.checked) return;

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      showFormError(form, failHtml());
      return;
    }

    const nom = form.querySelector<HTMLInputElement>("#f-n")!.value.trim();
    const email = form.querySelector<HTMLInputElement>("#f-e")!.value.trim();
    const phone =
      form.querySelector<HTMLInputElement>("#f-t")?.value.trim() ?? "";
    const message =
      form.querySelector<HTMLTextAreaElement>("#f-m")?.value.trim() ?? "";
    const besoin = collectBesoin(form);

    const btn = form.querySelector<HTMLButtonElement>("[type=submit]");
    const lb = btn?.querySelector(".lb");
    if (btn) {
      btn.disabled = true;
      btn.classList.add("ld");
    }
    if (lb) lb.textContent = "Envoi…";

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: key,
          subject: `Nouvelle demande Akno — ${nom}`,
          from_name: "Site Akno",
          name: nom,
          email,
          phone,
          besoin,
          message,
          botcheck: "",
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("web3forms");
      showFormSuccess(form);
    } catch {
      showFormError(form, failHtml());
      if (btn) {
        btn.disabled = false;
        btn.classList.remove("ld");
      }
      if (lb) lb.textContent = "Envoyer ma demande";
    }
  };

  form.addEventListener("submit", onSubmit);
  form.addEventListener("input", onFieldInput);
  form.addEventListener("change", onFieldInput);

  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("input", onFieldInput);
    form.removeEventListener("change", onFieldInput);
  };
}
