import { AknoLegalShell } from "@/components/akno/AknoLegalShell";
import { aknoPageMetadata } from "@/lib/aknoMetadata";

export const metadata = aknoPageMetadata({
  title: "Mentions légales",
  description:
    "Informations légales du site Akno : éditeur, hébergeur, propriété intellectuelle et contact.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <AknoLegalShell
      lead="Informations relatives au site akno.fr et à son éditeur."
      title="Mentions légales"
    >
      <h2>Éditeur du site</h2>
      <dl>
        <dt>Raison sociale / nom</dt>
        <dd>
          <span className="legal-placeholder">[À COMPLÉTER]</span>
        </dd>
        <dt>Statut juridique</dt>
        <dd>
          <span className="legal-placeholder">[À COMPLÉTER]</span>
        </dd>
        <dt>SIRET</dt>
        <dd>
          <span className="legal-placeholder">[À COMPLÉTER]</span>
        </dd>
        <dt>Adresse</dt>
        <dd>
          <span className="legal-placeholder">[À COMPLÉTER]</span>
        </dd>
        <dt>E-mail</dt>
        <dd>
          <a href="mailto:aknoweb.contact@gmail.com">aknoweb.contact@gmail.com</a>
        </dd>
        <dt>Téléphone</dt>
        <dd>
          <a href="tel:+33781990761">07 81 99 07 61</a>
        </dd>
        <dt>Directeur / directrice de la publication</dt>
        <dd>
          <span className="legal-placeholder">[À COMPLÉTER]</span>
        </dd>
      </dl>

      <h2>Hébergeur</h2>
      <p>
        Vercel Inc.
        <br />
        440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
        <br />
        <a href="https://vercel.com" rel="noopener noreferrer" target="_blank">
          vercel.com
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu de ce site (textes, visuels, logo, mise en page,
        code source) est protégé par le droit d&apos;auteur. Toute reproduction,
        représentation ou diffusion, totale ou partielle, sans autorisation écrite
        préalable de l&apos;éditeur est interdite.
      </p>

      <h2>Crédits</h2>
      <p>
        Conception, design et développement : Akno. Typographies : Mona Sans, Inter
        Tight, Instrument Serif (SIL Open Font License).
      </p>
    </AknoLegalShell>
  );
}
