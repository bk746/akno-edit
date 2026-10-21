export function LegalDialogs() {
  return (
    <>
      <dialog aria-labelledby="t-ml" id="d-ml">
        <div className="dl">
          <header>
            <h2 id="t-ml">Mentions légales</h2>
            <button aria-label="Fermer" className="x" data-close type="button">
              ✕
            </button>
          </header>
          <h3>Éditeur du site</h3>
          <dl>
            <dt>Éditeur</dt>
            <dd>Keryan Bouzerda — AKNO · Entrepreneur individuel</dd>
            <dt>SIRET</dt>
            <dd>101 354 413 00011</dd>
            <dt>SIREN</dt>
            <dd>101 354 413</dd>
            <dt>Code APE</dt>
            <dd>62.01Z – Programmation informatique</dd>
            <dt>Adresse</dt>
            <dd>17 allée Paul Gauguin</dd>
            <dt>Email</dt>
            <dd>
              <a href="mailto:aknoweb.contact@gmail.com">
                aknoweb.contact@gmail.com
              </a>
            </dd>
            <dt>Téléphone</dt>
            <dd>
              <a href="tel:+33781990761">07 81 99 07 61</a>
            </dd>
          </dl>
          <h3>Directeur de la publication</h3>
          <p>Keryan Bouzerda</p>
          <h3>Hébergement</h3>
          <p>
            Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            —{" "}
            <a href="https://vercel.com/contact">vercel.com/contact</a>
          </p>
          <h3>Propriété intellectuelle</h3>
          <p>
            L&apos;ensemble du contenu de ce site (textes, visuels, logo, mise en
            page, code) est la propriété exclusive de Keryan Bouzerda / AKNO, sauf
            mention contraire. Toute reproduction, représentation ou diffusion,
            totale ou partielle, sans autorisation écrite préalable est
            interdite.
          </p>
          <h3>Données personnelles</h3>
          <p>
            Les informations transmises via le formulaire de contact (nom, email,
            message) sont utilisées uniquement pour répondre à votre demande.
            Elles ne sont ni vendues ni cédées à des tiers. Conformément au
            RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
            de suppression en écrivant à{" "}
            <a href="mailto:aknoweb.contact@gmail.com">
              aknoweb.contact@gmail.com
            </a>
            .
          </p>
          <h3>Cookies</h3>
          <p>
            Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de
            mesure d&apos;audience ni de traçage. Aucun bandeau de consentement
            n&apos;est donc nécessaire.
          </p>
        </div>
      </dialog>
      <dialog aria-labelledby="t-conf" id="d-conf">
        <div className="dl">
          <header>
            <h2 id="t-conf">Politique de confidentialité</h2>
            <button aria-label="Fermer" className="x" data-close type="button">
              ✕
            </button>
          </header>
          <h3>Responsable du traitement</h3>
          <p>
            Keryan Bouzerda, entrepreneur individuel (AKNO), SIRET 101 354 413
            00011, 17 allée Paul Gauguin,{" "}
            <a href="mailto:aknoweb.contact@gmail.com">
              aknoweb.contact@gmail.com
            </a>
            .
          </p>
          <h3>Données collectées</h3>
          <p>
            Via le formulaire de contact, nous collectons les informations que
            vous saisissez volontairement&nbsp;: nom, adresse email, objet de la
            demande, budget éventuel et message.
          </p>
          <h3>Finalités et base légale</h3>
          <p>
            Vos données sont utilisées pour répondre à vos demandes et, le cas
            échéant, pour établir des devis. Le traitement repose sur les
            mesures précontractuelles prises à la demande de la personne
            concernée (article 6.1.b du RGPD) et sur l&apos;intérêt légitime à
            assurer le suivi commercial (article 6.1.f du RGPD).
          </p>
          <h3>Destinataires et sous-traitants</h3>
          <p>
            Les données sont accessibles à Keryan Bouzerda uniquement.
            Sous-traitants techniques&nbsp;: Vercel Inc. (hébergement du site),
            Google (messagerie professionnelle). Vos données ne sont ni vendues
            ni cédées à des tiers.
          </p>
          <h3>Transferts hors Union européenne</h3>
          <p>
            Certains prestataires (notamment Vercel Inc. et, le cas échéant,
            l&apos;outil d&apos;envoi du formulaire) sont situés aux États-Unis.
            Les transferts de données sont encadrés par le Data Privacy Framework
            UE–États-Unis et/ou les clauses contractuelles types adoptées par la
            Commission européenne.
          </p>
          <h3>Durée de conservation</h3>
          <p>
            Pour un prospect&nbsp;: conservation des données pendant 3 ans à
            compter du dernier contact. Pour un client&nbsp;: durée de la
            relation contractuelle, puis conservation pendant les durées légales
            applicables (comptabilité, garanties, contentieux).
          </p>
          <h3>Vos droits</h3>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;effacement, d&apos;opposition, de limitation du
            traitement et de portabilité de vos données. Pour exercer vos droits,
            écrivez à{" "}
            <a href="mailto:aknoweb.contact@gmail.com">
              aknoweb.contact@gmail.com
            </a>
            &nbsp;; nous répondons dans un délai d&apos;un mois. Vous pouvez
            également introduire une réclamation auprès de la CNIL (
            <a href="https://www.cnil.fr">www.cnil.fr</a>).
          </p>
          <h3>Cookies</h3>
          <p>
            Ce site ne dépose aucun cookie publicitaire ni de mesure
            d&apos;audience. Si un outil de ce type est ajouté ultérieurement,
            un bandeau de consentement sera mis en place avant tout dépôt de
            cookies non essentiels.
          </p>
          <p className="up">
            Dernière mise à jour&nbsp;: 24 septembre 2026 (texte repris
            d&apos;akno.fr).
          </p>
        </div>
      </dialog>
    </>
  );
}
