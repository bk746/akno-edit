"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ContactForm } from "./ContactForm";
import { FooterCopy } from "./FooterCopy";
import { HeroWall } from "./HeroWall";
import { ArrowLink, ArrowOut, LineTitle, LogoAk } from "./icons";
import { DeviceStage } from "./RollScreen";
import { LegalDialogs } from "./LegalDialogs";
import { useAknoEffects } from "./useAknoEffects";

function AknoEffects() {
  useAknoEffects();
  return null;
}

export function AknoSite() {
  return (
    <>
      <AknoEffects />
      <a className="skip" href="#main">
        Aller au contenu
      </a>
      <header className="nav" id="nav">
        <div className="brand">
          <a className="logo" href="#top" aria-label="AKNO — retour en haut">
            <LogoAk />
          </a>
          <span className="where">Studio web · Annecy</span>
        </div>
        <nav className="links" aria-label="Navigation principale">
          <a href="#realisations">Réalisations</a>
          <a href="#services">Services</a>
          <a href="#methode">Méthode</a>
        </nav>
        <div className="pill" id="pill">
          <a href="#contact">Réserver un appel</a>
        </div>
        <button
          className="burger"
          id="burger"
          aria-expanded="false"
          aria-controls="mnav"
          type="button"
        >
          <span className="sr">Ouvrir le menu</span>
          <i />
          <i />
        </button>
      </header>
      <div
        className="mnav"
        id="mnav"
        hidden
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <nav aria-label="Menu mobile">
          <a href="#realisations" style={{ "--i": 0 } as CSSProperties}>
            <span>Réalisations</span>
          </a>
          <a href="#services" style={{ "--i": 1 } as CSSProperties}>
            <span>Services</span>
          </a>
          <a href="#methode" style={{ "--i": 2 } as CSSProperties}>
            <span>Méthode</span>
          </a>
        </nav>
        <div className="mfoot" style={{ "--i": 3 } as CSSProperties}>
          <a className="btn" href="#contact">
            Réserver un appel
          </a>
          <a className="mt" href="tel:+33781990761">
            07 81 99 07 61
          </a>
          <p className="mw">Studio web · Annecy</p>
        </div>
      </div>

      <main id="main">
        <section className="hero" id="top" aria-label="Introduction">
          <HeroWall />
          <div className="veil l" />
          <div className="veil r" />
          <div className="veil b" />
          <div className="hx lead">
            <p className="eyb rv">
              Site web · UI/UX Design · SEO &amp; Performance · Refonte
            </p>
            <h1>
              <LineTitle
                lines={["Des sites qui ramènent", "des clients."]}
              />
            </h1>
            <p className="rv">
              Studio web à Annecy. Stratégie, UI/UX, code et SEO&nbsp;: un
              interlocuteur, du brief au livré.
            </p>
            <div className="act rv">
              <a className="btn" id="heroCta" href="#contact">
                Réserver un appel
              </a>
              <a className="sec" href="#realisations">
                Voir les réalisations <ArrowOut />
              </a>
            </div>
          </div>
          <div className="hx cue" aria-hidden="true">
            <i />
            Défiler
          </div>
        </section>

        <section
          className="sx mth m1"
          id="methode"
          aria-labelledby="t-met"
        >
          <div className="m1top">
            <h2 id="t-met">
              <LineTitle
                lines={[
                  "Un site qui fait le job",
                  "d'un commercial digital.",
                ]}
              />
            </h2>
            <p className="m1p rv">
              Stratégie, UI/UX, code et SEO. Trois étapes, un interlocuteur, du
              cadrage au lancement. Clair, fluide, performant.
            </p>
          </div>
          <ol className="m1cols">
            {[
              {
                id: "offre",
                n: "01",
                t: "Offre & direction",
                p: "On clarifie quoi construire — et pourquoi.",
              },
              {
                id: "design",
                n: "02",
                t: "Design & expérience",
                p: "On design pour convertir, pas juste pour être beau.",
              },
              {
                id: "dev",
                n: "03",
                t: "Développement & lancement",
                p: "On livre un site rapide, propre, prêt à performer.",
              },
            ].map((step) => (
              <li className="m1c rv" key={step.id}>
                <span className="m1n" aria-hidden="true">
                  {step.n}
                </span>
                <h3>{step.t}</h3>
                <p>{step.p}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="sx" id="realisations" aria-labelledby="t-real">
          <div className="sh shl">
            <h2 id="t-real">
              <LineTitle lines={["Réalisations & concepts."]} />
            </h2>
            <p className="int rv">
              Cinq projets&nbsp;: une refonte en ligne, deux maquettes avec
              données d&apos;exemple et deux projets conceptuels. Chaque statut
              est indiqué.
            </p>
          </div>
          <div className="feat">
            <article aria-labelledby="pj-sublimessence" className="fr">
              <DeviceStage
                desktop={{
                  alt: "Capture desktop du site Sublimessence",
                  src: "/assets/img/dev/sublimessence-d-600.webp",
                  width: 1200,
                  height: 7000,
                  sizes: "(max-width:760px) 82vw, 52vw",
                }}
                mobileShot={{
                  alt: "Capture mobile 390 px — site en ligne",
                  src: "/assets/img/dev/sublimessence-m-390.webp",
                  width: 600,
                  height: 6400,
                  sizes: "(max-width:760px) 24vw, 14vw",
                }}
              />
              <div className="pm">
                <p className="hd">
                  <span className="st">Refonte · en ligne</span>
                </p>
                <h3 id="pj-sublimessence">Sublimessence</h3>
                <p className="ty">Peintre sur mobilier · Annecy</p>
                <p className="d">
                  Refonte du site de l&apos;Atelier Sublimessence, artisan
                  d&apos;art peintre sur mobilier à Epagny Metz-Tessy (Annecy)
                  : restauration, patines et décors peints.
                </p>
                <div className="lk">
                  <a
                    aria-label="Voir le projet Sublimessence"
                    className="btn sm"
                    href="https://akno.fr/realisations/sublimessence/"
                  >
                    Voir le projet <ArrowLink />
                  </a>
                  <a
                    className="sec"
                    href="https://sublimessence-website.vercel.app"
                    rel="noopener"
                    target="_blank"
                  >
                    Site en ligne <ArrowLink />
                  </a>
                </div>
              </div>
            </article>

            <article aria-labelledby="pj-veillee" className="fr rev">
              <DeviceStage
                reverse
                desktop={{
                  alt: "Capture desktop du site VEILLÉE",
                  src: "/assets/img/dev/veillee-d-600.webp",
                  width: 1200,
                  height: 7000,
                  sizes: "(max-width:760px) 82vw, 52vw",
                }}
                mobileShot={{
                  alt: "Capture mobile 390 px — page projet akno.fr",
                  src: "/assets/img/dev/veillee-m-390.webp",
                  width: 600,
                  height: 6400,
                  sizes: "(max-width:760px) 24vw, 14vw",
                }}
              />
              <div className="pm">
                <p className="hd">
                  <span className="st">Projet conceptuel</span>
                </p>
                <h3 id="pj-veillee">VEILLÉE</h3>
                <p className="ty">Exposition immersive · art</p>
                <p className="d">
                  Site d&apos;une exposition immersive : une heure dans la
                  peinture, de Georges de La Tour à Klimt, avec un parcours de
                  la bougie au plein jour.
                </p>
                <div className="lk">
                  <a
                    aria-label="Voir le projet VEILLÉE"
                    className="btn sm"
                    href="https://akno.fr/realisations/veillee/"
                  >
                    Voir le projet <ArrowLink />
                  </a>
                </div>
                <p className="note">Écran mobile&nbsp;: page projet sur akno.fr</p>
              </div>
            </article>
          </div>

          <div className="more">
            {[
              {
                id: "pj-alric",
                st: "Maquette · données d'exemple",
                title: "Alric Plomberie",
                ty: "Plombier · Nantes",
                d: "Site vitrine pour un plombier à Nantes : prix annoncé avant travaux, sélecteur « Où est la panne ? » et demande de rappel.",
                href: "https://akno.fr/realisations/alric/",
                dSrc: "/assets/img/dev/alric-d-600.webp",
                mSrc: "/assets/img/dev/alric-m-390.webp",
              },
              {
                id: "pj-vauclair",
                st: "Maquette · entreprise fictive",
                title: "Atelier Vauclair",
                ty: "Menuisier-ébéniste · Lyon",
                d: "Site vitrine pour un menuisier-ébéniste à la Croix-Rousse : cuisines, dressings, escaliers et bibliothèques en bois massif.",
                href: "https://akno.fr/realisations/vauclair/",
                dSrc: "/assets/img/dev/vauclair-d-600.webp",
                mSrc: "/assets/img/dev/vauclair-m-390.webp",
              },
              {
                id: "pj-lacets",
                st: "Projet conceptuel",
                title: "LACETS",
                ty: "Location de voitures d'exception",
                d: "Location et vente de voitures d'exception entre Annecy, Megève et Genève, avec ou sans chauffeur.",
                href: "https://akno.fr/realisations/lacets/",
                dSrc: "/assets/img/dev/lacets-d-600.webp",
                mSrc: "/assets/img/dev/lacets-m-390.webp",
              },
            ].map((p) => (
              <article aria-labelledby={p.id} className="mc" key={p.id}>
                <DeviceStage
                  desktop={{
                    alt: `Capture desktop du site ${p.title}`,
                    src: p.dSrc,
                    width: 1200,
                    height: 7000,
                    sizes: "(max-width:760px) 82vw, 26vw",
                  }}
                  mobileShot={{
                    alt: "Capture mobile 390 px — page projet akno.fr",
                    src: p.mSrc,
                    width: 600,
                    height: 6400,
                    sizes: "(max-width:760px) 24vw, 8vw",
                  }}
                />
                <div className="pm">
                  <p className="hd">
                    <span className="st">{p.st}</span>
                  </p>
                  <h3 id={p.id}>{p.title}</h3>
                  <p className="ty">{p.ty}</p>
                  <p className="d">{p.d}</p>
                  <div className="lk">
                    <a
                      aria-label={`Voir le projet ${p.title}`}
                      className="btn sm"
                      href={p.href}
                    >
                      Voir le projet <ArrowLink />
                    </a>
                  </div>
                  <p className="note">Écran mobile&nbsp;: page projet sur akno.fr</p>
                </div>
              </article>
            ))}
          </div>
          <div className="allp rv">
            <span>Réalisations</span>
            <a className="sec" href="https://akno.fr/realisations/">
              Toutes les études de cas <ArrowLink />
            </a>
          </div>
        </section>

        <section className="sx" id="services" aria-labelledby="t-svc">
          <div className="sh shl">
            <h2 id="t-svc">
              <span className="ln">
                <span>Site, design, SEO.</span>
              </span>{" "}
              <span className="ln">
                <span>
                  <em>Un système.</em>
                </span>
              </span>
            </h2>
            <p className="int rv">
              Un seul studio pour concevoir, dessiner et faire connaître votre
              site.
            </p>
          </div>
          <div className="svl">
            {[
              {
                id: "site",
                t: "Site web",
                href: "https://akno.fr/services/site-web/",
                p: "Création ou refonte\u00a0: un site sur mesure, rapide et pensé pour transformer les visites en demandes.",
                li: [
                  "Structure et textes orientés conversion",
                  "Design sur mesure, responsive",
                  "Développement propre, mise en ligne incluse",
                ],
              },
              {
                id: "seo",
                t: "SEO Performance",
                href: "https://akno.fr/services/seo/",
                p: "Être trouvé sur les bonnes recherches, avec un site qui charge vite. Des priorités concrètes, sans promesse de position.",
                li: [
                  "SEO technique et structure des pages",
                  "Optimisation des Core Web Vitals",
                  "Suivi clair et priorités concrètes",
                ],
              },
            ].map((s) => (
              <a className="sv rv" href={s.href} key={s.id}>
                <h3>{s.t}</h3>
                <div className="d">
                  <p>{s.p}</p>
                  <ul>
                    {s.li.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <span aria-hidden="true" className="go">
                  <ArrowLink />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="sx" id="apropos" aria-labelledby="t-ab">
          <div className="about">
            <figure className="ph grain rv">
              <Image
                alt="Portrait de Keryan Bouzerda, fondateur d'AKNO"
                src="/assets/img/keryan-900.webp"
                width={900}
                height={1110}
                sizes="(max-width:760px) 100vw, 40vw"
                loading="lazy"
              />
              <figcaption>
                <b>Keryan Bouzerda</b>
                Fondateur · AKNO
              </figcaption>
            </figure>
            <div className="ab">
              <h2 id="t-ab">
                <LineTitle lines={["Moi, c'est Keryan."]} />
              </h2>
              <p className="q rv">
                Je construis des sites qui ramènent des clients.
              </p>
              <p className="t rv">
                Fondateur d&apos;AKNO. Sites sur mesure pour dirigeants qui en
                ont assez du « joli mais inutile ».
              </p>
              <p className="t rv">
                Stratégie, UI/UX, code et SEO — un interlocuteur du brief au
                livré. Clair, fluide, performant&nbsp;: un site qui fait le job
                d&apos;un commercial digital.
              </p>
              <ul className="chips rv">
                <li>Sites · SEO · Growth</li>
                <li>Un interlocuteur</li>
                <li>Focus conversion</li>
                <li>Annecy</li>
              </ul>
              <div className="act rv">
                <a className="sec" href="#contact">
                  On en parle <ArrowLink />
                </a>
                <a className="sec" href="#realisations">
                  Voir des projets <ArrowOut />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="sx" id="faq" aria-labelledby="t-faq">
          <div className="sh">
            <h2 id="t-faq">
              <span className="ln">
                <span>Vous vous posez sûrement</span>
              </span>{" "}
              <span className="ln">
                <span>
                  <em>ces questions.</em>
                </span>
              </span>
            </h2>
          </div>
          <div className="faq">
            <div className="side rv">
              <p>
                Des réponses claires. Si la vôtre n&apos;y est pas, on en parle
                en 20 min.
              </p>
              <a className="sec" href="#contact">
                Encore une question&nbsp;? <ArrowLink />
              </a>
            </div>
            <div className="qs rv">
              {[
                {
                  q: "Combien coûte un site\u00a0?",
                  a: (
                    <>
                      Sur-mesure après un cadrage court. On chiffre un{" "}
                      <b>investissement rentable</b>, pas le devis le moins cher.
                    </>
                  ),
                },
                {
                  q: "En combien de temps c'est en ligne\u00a0?",
                  a: (
                    <>
                      En moyenne <b>4 à 8 semaines</b> selon le scope et votre
                      réactivité.
                    </>
                  ),
                },
                {
                  q: "Vous gérez aussi le SEO et la perf\u00a0?",
                  a: (
                    <>
                      Oui. Technique, structure et <b>Core Web Vitals</b> font
                      partie du livrable.
                    </>
                  ),
                },
                {
                  q: "Puis-je modifier le site après\u00a0?",
                  a: (
                    <>
                      Oui. Site maintenable + prise en main. Suivi possible si
                      vous voulez qu&apos;on reste.
                    </>
                  ),
                },
                {
                  q: "Vous travaillez aussi en refonte\u00a0?",
                  a: (
                    <>
                      Souvent. On part de l&apos;existant, on garde ce qui
                      marche, on corrige ce qui freine.
                    </>
                  ),
                },
                {
                  q: "Comment on démarre\u00a0?",
                  a: (
                    <>
                      Un appel de cadrage → proposition claire → kickoff.{" "}
                      <b>Un seul interlocuteur.</b>
                    </>
                  ),
                },
              ].map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <i aria-hidden="true" />
                  </summary>
                  <div className="a">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="parrainage" aria-labelledby="t-par">
          <div className="bd">
            <div className="bt">
              <h2 id="t-par">Recommandez AKNO, tout le monde y gagne.</h2>
            </div>
            <ul className="bv">
              <li>
                <b>600&nbsp;€</b>
                <span>
                  d&apos;avoir pour vous, ou 400&nbsp;€ par virement, une fois le
                  projet du filleul réglé
                </span>
              </li>
              <li>
                <b>300&nbsp;€</b>
                <span>
                  de remise pour votre filleul, ou 1 mois de maintenance offert,
                  dès la signature
                </span>
              </li>
            </ul>
            <div className="ba">
              <a className="sec" data-subject="Parrainage" href="#contact">
                Recommander quelqu&apos;un <ArrowLink />
              </a>
              <a className="sec" href="https://akno.fr/parrainage/">
                Conditions du programme <ArrowLink />
              </a>
            </div>
          </div>
          <p className="cond">
            Prime doublée dès le 3<sup>e</sup> parrainage. Récompense versée après
            règlement complet du projet parrainé. Avantage filleul au choix, non
            cumulable. Montants indiqués à titre d&apos;exemple, programme
            susceptible d&apos;évoluer.
          </p>
        </section>

        <section className="sx ct" id="contact" aria-labelledby="t-ct">
          <div className="cta">
            <div className="l">
              <h2 id="t-ct">
                <LineTitle
                  lines={[
                    "Votre site peut enfin",
                    "ramener des clients.",
                  ]}
                />
              </h2>
              <p className="int rv">
                Cadrage en 20 minutes. On regarde votre existant, vos objectifs,
                et si AKNO est le bon fit.
              </p>
              <ul className="badges rv">
                <li>Appel 20 min</li>
                <li>Sans engagement</li>
                <li>Réponse sous 24h</li>
              </ul>
              <div className="ways rv">
                <a className="way p" href="tel:+33781990761" id="ctCall">
                  <span>
                    <b>Appel 20 min · 07 81 99 07 61</b>
                    Le plus rapide pour démarrer
                  </span>
                  <span aria-hidden="true" className="go">
                    <svg aria-hidden="true" height="16" viewBox="0 0 24 24" width="16">
                      <path
                        d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </a>
                <a
                  className="way alt"
                  href="https://wa.me/33781990761"
                  rel="noopener"
                  target="_blank"
                >
                  <span>
                    <b>WhatsApp</b>
                    Réponse rapide
                  </span>
                  <span aria-hidden="true" className="go">
                    <ArrowLink />
                  </span>
                </a>
                <a className="way alt" href="mailto:aknoweb.contact@gmail.com">
                  <span>
                    <b>aknoweb.contact@gmail.com</b>
                    Ou écrivez-nous
                  </span>
                  <span aria-hidden="true" className="go">
                    <ArrowLink />
                  </span>
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="ft2" aria-label="Pied de page">
        <div className="fmail">
          <a className="big" href="mailto:aknoweb.contact@gmail.com">
            aknoweb.contact@gmail.com
          </a>
          <FooterCopy />
        </div>
        <div className="fg fcols">
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href="mailto:aknoweb.contact@gmail.com">
                  aknoweb.contact@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+33781990761">07 81 99 07 61</a>
              </li>
              <li className="m">Studio web · Annecy</li>
            </ul>
          </div>
          <nav aria-label="Découvrir">
            <h2>Découvrir</h2>
            <ul>
              <li>
                <a href="#methode">Méthode</a>
              </li>
              <li>
                <a href="#realisations">Réalisations</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#apropos">À propos</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#parrainage">Parrainage</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Légal">
            <h2>Légal</h2>
            <ul>
              <li>
                <button data-dlg="d-ml" type="button">
                  <span aria-hidden="true">▶</span> Mentions légales
                </button>
              </li>
              <li>
                <button data-dlg="d-conf" type="button">
                  <span aria-hidden="true">▶</span> Confidentialité
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div aria-hidden="true" className="fmark">
          <LogoAk />
          <span>AKNO</span>
        </div>
        <p className="fcopy">© 2026 AKNO · Aucun cookie déposé</p>
      </footer>

      <a
        aria-label="Écrire à AKNO sur WhatsApp (ouvre un nouvel onglet)"
        className="wa"
        href="https://wa.me/33781990761"
        id="wa"
        rel="noopener"
        target="_blank"
      >
        <svg aria-hidden="true" height="22" viewBox="0 0 24 24" width="22">
          <path
            d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.7-1.2 2.2 2.2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z"
            fill="currentColor"
          />
        </svg>
      </a>

      <LegalDialogs />
    </>
  );
}
