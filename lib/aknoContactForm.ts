const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const SERVICE_BESOIN: Record<string, string> = {
  "UI / UX Design": "UI-UX",
  "SEO Performance": "SEO",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function firstNameFromNom(nom: string) {
  return nom.trim().split(/\s+/)[0] ?? "";
}

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

function buildSuccessMarkup(prenom: string) {
  const intro = prenom
    ? `Merci ${escapeHtml(prenom)}, votre demande a bien été transmise.`
    : "Merci, votre demande a bien été transmise.";
  return `
<div class="form-ok" role="status" aria-live="polite">
<svg class="form-ok-ic" viewBox="0 0 48 48" aria-hidden="true">
<circle class="form-ok-ic-c" cx="24" cy="24" r="22" fill="none" pathLength="1" stroke="currentColor" stroke-width="1.5"/>
<path class="form-ok-ic-p" d="M14 24.5 20.5 31 34 17.5" fill="none" pathLength="1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
</svg>
<h3 class="form-ok-t" id="form-ok-title" tabindex="-1">Demande <em>bien reçue.</em></h3>
<p class="form-ok-p">${intro} Nous revenons vers vous sous 24&nbsp;h.</p>
<div class="form-ok-links">
<a href="https://wa.me/33781990761" rel="noopener" target="_blank">Écrire sur WhatsApp&nbsp;›</a>
<button class="form-ok-reset" type="button">Envoyer une autre demande&nbsp;›</button>
</div>
</div>`;
}

function showFormSuccess(
  form: HTMLFormElement,
  nom: string,
  initialTemplate: string,
  reattach: () => void,
) {
  const height = form.offsetHeight;
  form.style.minHeight = `${height}px`;

  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prenom = firstNameFromNom(nom);

  const mountSuccess = () => {
    form.querySelector(".form-body")?.remove();
    form.insertAdjacentHTML("beforeend", buildSuccessMarkup(prenom));
    form.classList.add("form-is-ok");
    if (!RM) form.classList.add("form-is-ok-an");

    const panel = form.querySelector(".form-ok");
    form.querySelector<HTMLElement>("#form-ok-title")?.focus({ preventScroll: true });

    form.querySelector(".form-ok-reset")?.addEventListener("click", () => {
      form.classList.remove("form-is-ok", "form-is-ok-an");
      form.style.minHeight = "";
      panel?.remove();
      form.innerHTML = initialTemplate;
      reattach();
    });
  };

  const body = document.createElement("div");
  body.className = "form-body";
  while (form.firstChild) body.appendChild(form.firstChild);
  form.appendChild(body);

  if (RM) {
    mountSuccess();
    return;
  }

  requestAnimationFrame(() => {
    body.classList.add("form-body-out");
  });

  let mounted = false;
  const done = () => {
    if (mounted) return;
    mounted = true;
    mountSuccess();
  };
  body.addEventListener("transitionend", done, { once: true });
  setTimeout(done, 400);
}

function collectBesoin(form: HTMLFormElement) {
  return [...form.querySelectorAll<HTMLInputElement>('input[name="services"]:checked')]
    .map((el) => SERVICE_BESOIN[el.value] ?? el.value)
    .join(", ");
}

export function bindAknoContactForm(form: HTMLFormElement): () => void {
  const initialTemplate = form.innerHTML;
  let detachFields: (() => void) | undefined;

  const attachFields = () => {
    detachFields?.();

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
        detachFields?.();
        showFormSuccess(form, nom, initialTemplate, attachFields);
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

    detachFields = () => {
      form.removeEventListener("submit", onSubmit);
      form.removeEventListener("input", onFieldInput);
      form.removeEventListener("change", onFieldInput);
    };
  };

  attachFields();

  return () => {
    detachFields?.();
  };
}
