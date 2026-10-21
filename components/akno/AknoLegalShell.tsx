import "@/app/legal.css";
import Link from "next/link";
import { AknoLegalEffects } from "./AknoLegalEffects";

const LOGO_PATH =
  "M605,798 L594,805 L508,922 L405,1073 L587,1073 L680,945 L669,915ZM0,1069 L0,1073 L173,1073 L495,396 L521,355 L578,464 L864,1073 L1033,1073 L867,716 L867,712 L908,671 L962,724 L1270,1073 L1490,1073 L1297,852 L1021,551 L1467,88 L1238,88 L793,552 L520,0Z";

export function AknoLegalShell({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <AknoLegalEffects />
      <a className="skip" href="#main">
        Aller au contenu
      </a>
      <header className="nav solid" id="nav">
        <div className="brand">
          <Link aria-label="Akno — accueil" className="logo" href="/">
            <svg aria-hidden="true" focusable="false" height="32" viewBox="0 0 1490 1073" width="44">
              <path d={LOGO_PATH} fill="#fff" />
            </svg>
          </Link>
          <span className="where">Studio web · Annecy</span>
        </div>
        <nav aria-label="Navigation principale" className="links">
          <Link href="/#services">Services</Link>
          <Link href="/#realisations">Réalisations</Link>
          <Link href="/#methode">Méthode</Link>
        </nav>
        <div className="pill" id="pill">
          <Link href="/#contact">Réserver un appel</Link>
        </div>
        <button aria-controls="mnav" aria-expanded="false" className="burger" id="burger" type="button">
          <span className="sr">Ouvrir le menu</span>
          <i />
          <i />
        </button>
      </header>
      <div aria-label="Menu" aria-modal="true" className="mnav" hidden id="mnav" role="dialog">
        <nav aria-label="Menu mobile">
          <Link href="/#services" style={{ ["--i" as string]: 0 }}>
            <span>Services</span>
          </Link>
          <Link href="/#contact" style={{ ["--i" as string]: 1 }}>
            <span>Contact</span>
          </Link>
        </nav>
      </div>
      <main id="main">
        <article className="legal-doc">
          <h1>{title}</h1>
          {lead ? <p className="legal-lead">{lead}</p> : null}
          {children}
        </article>
      </main>
      <footer aria-label="Pied de page" className="ft2">
        <div className="fmail">
          <a className="big" href="mailto:aknoweb.contact@gmail.com">
            aknoweb.contact@gmail.com
          </a>
        </div>
        <div className="fg fcols">
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href="mailto:aknoweb.contact@gmail.com">aknoweb.contact@gmail.com</a>
              </li>
              <li>
                <a href="tel:+33781990761">07 81 99 07 61</a>
              </li>
              <li className="m">Studio web · Annecy</li>
            </ul>
          </div>
          <nav aria-label="Légal">
            <h2>Légal</h2>
            <ul>
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link href="/confidentialite">Confidentialité</Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="fcopy">© 2026 Akno · Aucun cookie déposé</p>
      </footer>
      <a
        aria-label="Écrire à Akno sur WhatsApp (ouvre un nouvel onglet)"
        className="wa"
        data-wa=""
        href="https://wa.me/33781990761"
        id="wa"
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg aria-hidden="true" height="22" viewBox="0 0 24 24" width="22">
          <path
            d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.7-1.2 2.2 2.2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z"
            fill="currentColor"
          />
        </svg>
      </a>
    </>
  );
}
