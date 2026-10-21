import { AknoLegalShell } from "@/components/akno/AknoLegalShell";
import { aknoPageMetadata } from "@/lib/aknoMetadata";

export const metadata = aknoPageMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment Akno traite vos données personnelles : formulaire de contact, finalités, droits RGPD et cookies.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <AknoLegalShell
      lead="Cette politique décrit le traitement des données personnelles sur akno.fr."
      title="Politique de confidentialité"
    >
      <h2>Responsable du traitement</h2>
      <p>
        Akno — contact :{" "}
        <a href="mailto:aknoweb.contact@gmail.com">aknoweb.contact@gmail.com</a>
      </p>

      <h2>Données collectées</h2>
      <p>Via le formulaire « Votre projet », nous pouvons recevoir :</p>
      <ul>
        <li>nom ;</li>
        <li>adresse e-mail ;</li>
        <li>numéro de téléphone (facultatif) ;</li>
        <li>besoin(s) sélectionné(s) (site web, refonte, UI/UX, SEO) ;</li>
        <li>message libre.</li>
      </ul>

      <h2>Finalité et base légale</h2>
      <p>
        Ces données servent uniquement à étudier votre demande et à vous répondre.
        Le traitement repose sur votre consentement, matérialisé par la case à
        cocher du formulaire.
      </p>

      <h2>Sous-traitants</h2>
      <ul>
        <li>
          <strong>Web3Forms</strong> — transmission sécurisée des messages du
          formulaire ;
        </li>
        <li>
          <strong>Vercel Inc.</strong> — hébergement du site.
        </li>
      </ul>

      <h2>Durée de conservation</h2>
      <p>
        <span className="legal-placeholder">[À COMPLÉTER, ex. 3 ans]</span> à
        compter du dernier contact, sauf obligation légale contraire.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
        rectification, de suppression et d&apos;opposition au traitement de vos
        données. Pour les exercer, écrivez à{" "}
        <a href="mailto:aknoweb.contact@gmail.com">aknoweb.contact@gmail.com</a>.
        Vous pouvez également introduire une réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr" rel="noopener noreferrer" target="_blank">
          cnil.fr
        </a>
        ).
      </p>

      <h2>Cookies et traceurs</h2>
      <p>
        Ce site ne dépose pas de cookies publicitaires ni de mesure d&apos;audience.
        Seuls des cookies strictement techniques peuvent être utilisés par
        l&apos;hébergeur pour la sécurité et la diffusion du site. Aucun bandeau
        de consentement n&apos;est requis tant qu&apos;aucun traceur non essentiel
        n&apos;est ajouté.
      </p>
    </AknoLegalShell>
  );
}
