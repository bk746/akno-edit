"use client";

import { useEffect } from "react";
import type gsap from "gsap";
import type Lenis from "lenis";
import { initAknoApSec, initAknoKeyDataCarousel } from "@/lib/aknoApSec";
import { bindAknoContactForm } from "@/lib/aknoContactForm";
import { initAknoHeroWall } from "@/lib/aknoHeroWall";

const WHATSAPP_NUMBER = "33781990761";

type Page = "home" | "site-web" | "seo-performance" | "geo" | "legal";

export function useAknoEffects({ page }: { page: Page }) {
  useEffect(() => {
    let cancelled = false;
    let cleanupMain: (() => void) | undefined;

    const boot = async () => {
      const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.documentElement.classList.add("js");

      let gsapLib: typeof gsap | null = null;
      let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null =
        null;
      let LenisCtor: typeof import("lenis").default | null = null;

      if (!RM) {
        const [gsapMod, stMod, lenisMod] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
        if (cancelled) return;
        gsapLib = gsapMod.default;
        ScrollTrigger = stMod.ScrollTrigger;
        LenisCtor = lenisMod.default;
      }

      document.querySelectorAll("[data-wa]").forEach((a) => {
        (a as HTMLAnchorElement).href = `https://wa.me/${WHATSAPP_NUMBER}`;
      });

      let lenis: Lenis | null = null;
      let lenisTick: ((time: number) => void) | null = null;

      if (!RM && gsapLib && ScrollTrigger && LenisCtor) {
        lenis = new LenisCtor({
          duration: 1.15,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          smoothWheel: true,
        });
        gsapLib.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
        lenisTick = (time: number) => lenis?.raf(time * 1000);
        gsapLib.ticker.add(lenisTick);
        gsapLib.ticker.lagSmoothing(0);
      } else {
        document.documentElement.classList.remove("js");
      }

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id) return;
      const target =
        id === "#top" ? document.body : document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const subj = a.dataset.subject;
      if (subj) {
        const o = document.getElementById("f-m") as HTMLTextAreaElement | null;
        if (o && !o.value) o.value = `${subj} : `;
      }
      if (lenis) {
        lenis.scrollTo(id === "#top" ? 0 : (target as HTMLElement), {
          offset: id === "#top" ? 0 : -64,
          duration: 1.4,
        });
      } else if (id === "#top") scrollTo(0, 0);
      else (target as HTMLElement).scrollIntoView();
      if (id !== "#top") {
        (target as HTMLElement).setAttribute("tabindex", "-1");
        setTimeout(
          () => (target as HTMLElement).focus({ preventScroll: true }),
          lenis ? 900 : 0,
        );
      }
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onAnchorClick);

    const nav = document.getElementById("nav");
    const pill = document.getElementById("pill");
    const pillA = pill?.querySelector("a") as HTMLAnchorElement | null;
    const vis = { contact: false, foot: false };
    const syncPill = () => {
      const off = vis.contact || vis.foot;
      pill?.classList.toggle("off", off);
      if (pillA) pillA.tabIndex = off ? -1 : 0;
      pill?.setAttribute("aria-hidden", String(off));
    };
    syncPill();
    const contactEl = document.getElementById("contact");
    const footEl = document.querySelector(".ft2 .fg");
    const ioContact = contactEl
      ? new IntersectionObserver(
          ([en]) => {
            vis.contact = en.isIntersecting;
            syncPill();
          },
          { threshold: 0.15 },
        )
      : null;
    ioContact?.observe(contactEl!);
    const ioFoot = footEl
      ? new IntersectionObserver(([en]) => {
          vis.foot = en.isIntersecting;
          syncPill();
        })
      : null;
    if (footEl) ioFoot?.observe(footEl);

    const solid = () =>
      nav?.classList.toggle("solid", scrollY > innerHeight * 0.6);
    addEventListener("scroll", solid, { passive: true });
    solid();

    const secs = [...document.querySelectorAll("main section[id]")];
    const navA = [
      ...document.querySelectorAll<HTMLAnchorElement>(".links a[href^='#']"),
    ];
    const ioNav = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (en.isIntersecting) {
            navA.forEach((a) =>
              a.hash === `#${en.target.id}`
                ? a.setAttribute("aria-current", "true")
                : a.removeAttribute("aria-current"),
            );
          }
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secs.forEach((s) => ioNav.observe(s));

    const bur = document.getElementById("burger");
    const mn = document.getElementById("mnav");
    let mT: ReturnType<typeof setTimeout>;

    const menu = (o: boolean) => {
      bur?.setAttribute("aria-expanded", String(o));
      document.documentElement.classList.toggle("menu-open", o);
      const sr = bur?.querySelector(".sr");
      if (sr) sr.textContent = o ? "Fermer le menu" : "Ouvrir le menu";
      document.body.style.overflow = o ? "hidden" : "";
      if (o) lenis?.stop();
      else lenis?.start();
      clearTimeout(mT);
      if (o) {
        if (mn) mn.hidden = false;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => mn?.classList.add("open")),
        );
        setTimeout(
          () => mn?.querySelector("a")?.focus({ preventScroll: true }),
          RM ? 0 : 250,
        );
      } else {
        mn?.classList.remove("open");
        mT = setTimeout(() => {
          if (mn) mn.hidden = true;
        }, RM ? 0 : 450);
      }
    };

    const onBurClick = () => menu(!mn?.classList.contains("open"));
    const onMnClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a")) menu(false);
    };
    bur?.addEventListener("click", onBurClick);
    mn?.addEventListener("click", onMnClick);

    const onKey = (e: KeyboardEvent) => {
      if (!mn?.classList.contains("open")) return;
      if (e.key === "Escape") {
        menu(false);
        bur?.focus();
      }
      if (e.key === "Tab") {
        const f = [bur, ...mn.querySelectorAll("a")].filter(Boolean) as HTMLElement[];
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1]?.focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0]?.focus();
        }
      }
    };
    addEventListener("keydown", onKey);

    const cleanupWall =
      page === "home" ? initAknoHeroWall(RM) : undefined;

    function introThen(cb: () => void, anim: boolean) {
      const H = document.documentElement;
      const ov = document.getElementById("intro");
      if (!H.classList.contains("intro") || !ov) {
        ov?.remove();
        cb();
        return;
      }
      try {
        sessionStorage.setItem("akno-intro", "1");
      } catch {
        /* ignore */
      }
      lenis?.stop();
      const navLogo = document.querySelector(".nav .logo svg");
      const lg = ov.querySelector(".ilogo") as HTMLElement | null;
      const L = ov.querySelectorAll(".il");
      const sk = ov.querySelector(".iskip") as HTMLElement | null;
      let done = false;
      const end = () => {
        if (done) return;
        done = true;
        H.classList.remove("intro");
        ov.remove();
        lenis?.start();
        cb();
      };
      if (!navLogo || !lg) {
        end();
        return;
      }
      const r = navLogo.getBoundingClientRect();
      Object.assign(lg.style, {
        left: `${r.left}px`,
        top: `${r.top}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
      });
      const S = innerWidth < 761 ? 2.6 : 3.2;
      const dx = innerWidth / 2 - (r.left + r.width / 2);
      const dy = innerHeight / 2 - (r.top + r.height / 2);
      const gap = r.width * S * 0.5 + (innerWidth < 761 ? 22 : 40);
      L.forEach((l) => {
        (l as HTMLElement).style.width = `${Math.max(0, innerWidth / 2 - gap)}px`;
      });
      if (!anim || RM) {
        lg.style.opacity = "1";
        ov.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: RM ? 350 : 500,
          delay: RM ? 250 : 0,
          fill: "forwards",
        }).onfinish = end;
        return;
      }
      const ibg = ov.querySelector(".ibg");
      const navLogoLink = document.querySelector(".nav .logo") as HTMLElement | null;
      if (!gsapLib) {
        end();
        return;
      }
      const tl = gsapLib.timeline({ onComplete: end });
      tl.set(lg, { x: dx, y: dy, scale: S, opacity: 0, filter: "blur(8px)" })
        .set(L, { scaleX: 0 })
        .to(lg, { opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 0.1)
        .to(L, { scaleX: 1, duration: 0.8, ease: "expo.out" }, 0.4)
        .to(L, { scaleX: 0, duration: 0.45, ease: "power3.in" }, 1.45)
        .to(lg, { x: 0, y: 0, scale: 1, duration: 0.85, ease: "expo.inOut" }, 1.65)
        .to(ibg, { opacity: 0, duration: 0.6, ease: "power2.out" }, 2.05)
        .add(() => {
          if (navLogoLink) navLogoLink.style.opacity = "1";
        }, 2.5)
        .to(sk, { opacity: 0, duration: 0.2 }, 1.6);
      if (sk) {
        sk.tabIndex = 0;
        sk.addEventListener("click", () => tl.progress(1));
      }
      addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Escape" && !done) tl.progress(1);
        },
        { once: true },
      );
    }

    let gsapCtx: gsap.Context | undefined;

    const runGsap = () => {
      if (RM || !lenis || !gsapLib || page === "legal") return;
      gsapLib.config({ nullTargetWarn: false });
      gsapCtx = gsapLib.context(() => {
        const E = "expo.out";
        const heroIn = () => {
          gsapLib!.to(".lead .ln>span", {
            y: 0,
            duration: 1.3,
            ease: E,
            stagger: 0.09,
            delay: 0.15,
          });
          gsapLib!.to(".hero .rv", {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: E,
            stagger: 0.08,
            delay: 0.45,
          });
          if (innerWidth >= 760) {
            gsapLib!.fromTo(
              "#wall",
              { opacity: 0 },
              { opacity: 1, duration: 1.8, ease: "power2.out", clearProps: "opacity" },
            );
          }
        };
        if (page === "home") introThen(heroIn, true);
        else if (
          page === "site-web" ||
          page === "seo-performance" ||
          page === "geo"
        ) {
          introThen(() => {}, false);
          gsapLib!.to(".phero h1 .ln>span", {
            y: 0,
            duration: 1.3,
            ease: E,
            stagger: 0.09,
            delay: 0.1,
          });
        }

        document.querySelectorAll("main section:not(.hero) h2").forEach((h) => {
          if (h.querySelector(".ln")) {
            gsapLib!.to(h.querySelectorAll(".ln>span"), {
              y: 0,
              duration: 1.2,
              ease: E,
              stagger: 0.08,
              scrollTrigger: { trigger: h, start: "top 88%" },
            });
          }
        });

        gsapLib!.utils.toArray<HTMLElement>("main section:not(.hero) .rv").forEach((el) => {
          gsapLib!.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: E,
            delay: el.classList.contains("m1c")
              ? [...(el.parentElement?.children ?? [])].indexOf(el) * 0.12
              : 0,
            scrollTrigger: { trigger: el, start: "top 92%" },
          });
        });

        gsapLib!.utils.toArray<HTMLElement>(".stage").forEach((st) => {
          const m = st.querySelector(".mac");
          const p = st.querySelector(".iph");
          const small = !!st.closest(".mc");
          if (m && p) {
            gsapLib!
              .timeline({ scrollTrigger: { trigger: st, start: "top 85%" } })
              .from(m, { y: 60, opacity: 0, duration: 1.4, ease: E })
              .from(p, { y: 90, opacity: 0, duration: 1.4, ease: E }, "-=1.15");
            if (!small && innerWidth > 760) {
              gsapLib!.fromTo(
                p,
                { yPercent: 10 },
                {
                  yPercent: -10,
                  ease: "none",
                  scrollTrigger: {
                    trigger: st,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
              gsapLib!.fromTo(
                m,
                { yPercent: 3 },
                {
                  yPercent: -3,
                  ease: "none",
                  scrollTrigger: {
                    trigger: st,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            }
          }
        });

        gsapLib!.utils.toArray<HTMLElement>(".pm").forEach((pm) =>
          gsapLib!.from(pm.children, {
            y: 24,
            opacity: 0,
            duration: 1.1,
            ease: E,
            stagger: 0.06,
            scrollTrigger: { trigger: pm, start: "top 88%" },
          }),
        );

        const hero = document.querySelector(".hero");
        if (hero) {
          gsapLib!.to(".hero .lead", {
            y: -60,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom 30%",
              scrub: true,
            },
          });
        }
      });
    };

    if (!RM && lenis) runGsap();
    else introThen(() => {}, false);

    const ics = [...document.querySelectorAll("svg.ic")];
    const iconIos: IntersectionObserver[] = [];
    if (ics.length) {
      if (RM) ics.forEach((s) => (s as SVGSVGElement).pauseAnimations?.());
      const go = (el: Element) => {
        el.classList.add("in");
        setTimeout(() => el.classList.add("on"), RM ? 0 : 1500);
      };
      if (RM || !("IntersectionObserver" in window)) {
        ics.forEach(go);
      } else if (!RM && lenis && ScrollTrigger) {
        ScrollTrigger.batch(ics, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            batch.forEach((el, i) => setTimeout(() => go(el), i * 90)),
        });
      } else {
        const io = new IntersectionObserver(
          (es) =>
            es.forEach((e) => {
              if (e.isIntersecting) {
                go(e.target);
                io.unobserve(e.target);
              }
            }),
          { rootMargin: "0px 0px -10% 0px" },
        );
        ics.forEach((i) => io.observe(i));
        iconIos.push(io);
      }
    }

    const imgs = [...document.querySelectorAll<HTMLImageElement>("img.roll")];
    const fit = (im: HTMLImageElement) => {
      const sc = im.parentElement;
      if (!sc) return;
      const d = Math.max(0, im.offsetHeight - sc.clientHeight);
      im.style.setProperty("--end", `${-d}px`);
      im.style.setProperty(
        "--dur",
        `${Math.round(Math.min(40, Math.max(14, d / (im.closest(".iph") ? 60 : 45))))}s`,
      );
    };
    const load = (im: HTMLImageElement) => {
      if (im.src) return;
      im.onload = () => {
        im.classList.add("ld");
        fit(im);
      };
      if (im.dataset.srcset) im.srcset = im.dataset.srcset;
      if (im.dataset.src) im.src = im.dataset.src;
    };
    const lio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("img.roll").forEach((im) =>
              load(im as HTMLImageElement),
            );
            lio.unobserve(e.target);
          }
        }),
      { rootMargin: "600px 0px" },
    );
    const pio = new IntersectionObserver(
      (es) =>
        es.forEach((e) =>
          e.target.classList.toggle("on", e.isIntersecting && !RM),
        ),
      { rootMargin: "0px" },
    );
    document.querySelectorAll(".stage").forEach((st) => {
      lio.observe(st);
      pio.observe(st);
    });
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() =>
            imgs.forEach((im) => im.classList.contains("ld") && fit(im)),
          )
        : null;
    ro?.observe(document.body);
    const onVisRoll = () =>
      document.querySelectorAll(".stage").forEach((st) =>
        (st as HTMLElement).style.setProperty(
          "--ps",
          document.hidden ? "paused" : "running",
        ),
      );
    document.addEventListener("visibilitychange", onVisRoll);

    const lazyIo = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            const i = e.target as HTMLImageElement;
            if (i.dataset.src) i.src = i.dataset.src;
            lazyIo.unobserve(i);
          }
        }),
      { rootMargin: "800px 0px" },
    );
    document
      .querySelectorAll('img[data-src]:not(.roll)')
      .forEach((i) => lazyIo.observe(i));

    const mqIos: IntersectionObserver[] = [];
    document.querySelectorAll(".mq").forEach((m) => {
      const io = new IntersectionObserver(([e]) =>
        m.querySelectorAll(".mtrack").forEach((t) => {
          (t as HTMLElement).style.animationPlayState = e.isIntersecting
            ? ""
            : "paused";
        }),
      );
      io.observe(m);
      mqIos.push(io);
    });

    const tabs = [...document.querySelectorAll<HTMLElement>(".tab")];
    const shots = [...document.querySelectorAll(".scr img")];
    let ti = 0;
    let tt: ReturnType<typeof setInterval>;
    const cpv = document.getElementById("cpv");
    const selTab = (i: number, focus?: boolean) => {
      ti = i;
      tabs.forEach((t, k) => {
        t.setAttribute("aria-selected", String(k === i));
        t.tabIndex = k === i ? 0 : -1;
      });
      shots.forEach((s, k) => s.classList.toggle("on", k === i));
      if (cpv && tabs[i]) cpv.setAttribute("aria-labelledby", tabs[i].id);
      if (focus) tabs[i]?.focus();
    };
    tabs.forEach((t, k) => {
      t.addEventListener("click", () => {
        clearInterval(tt);
        selTab(k);
      });
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          clearInterval(tt);
          selTab((ti + 1) % tabs.length, true);
        }
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          clearInterval(tt);
          selTab((ti + tabs.length - 1) % tabs.length, true);
        }
      });
    });
    const copilot = document.getElementById("copilot");
    let copilotIo: IntersectionObserver | undefined;
    if (!RM && copilot && tabs.length) {
      copilotIo = new IntersectionObserver(([en]) => {
        clearInterval(tt);
        if (en.isIntersecting) {
          tt = setInterval(() => selTab((ti + 1) % tabs.length), 5200);
        }
      });
      copilotIo.observe(copilot);
    }

    const dets = [
      ...document.querySelectorAll<HTMLDetailsElement>(".qs details"),
    ];
    const openD = (d: HTMLDetailsElement) => {
      const a = d.querySelector(".a") as HTMLElement | null;
      d.open = true;
      if (RM || !a) return;
      const h = a.scrollHeight;
      a.animate(
        [
          { height: "0", opacity: "0" },
          { height: `${h}px`, opacity: "1" },
        ],
        { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    };
    const closeD = (d: HTMLDetailsElement) => {
      const a = d.querySelector(".a") as HTMLElement | null;
      if (RM || !a) {
        d.open = false;
        return;
      }
      const h = a.scrollHeight;
      const an = a.animate(
        [
          { height: `${h}px`, opacity: "1" },
          { height: "0", opacity: "0" },
        ],
        { duration: 350, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
      an.onfinish = () => {
        d.open = false;
      };
    };
    dets.forEach((d) => {
      const s = d.querySelector("summary");
      s?.addEventListener("click", (e) => {
        e.preventDefault();
        const open = !d.open;
        dets.forEach((o) => {
          if (o !== d && o.open) closeD(o);
        });
        if (open) openD(d);
        else closeD(d);
      });
    });

    const onDlgClick = (e: MouseEvent) => {
      const b = (e.target as Element).closest("[data-dlg]") as HTMLElement | null;
      if (b) {
        const d = document.getElementById(b.dataset.dlg!) as HTMLDialogElement;
        (d as HTMLDialogElement & { _from?: HTMLElement })._from = b;
        d.showModal();
        lenis?.stop();
      }
      const c = (e.target as Element).closest("[data-close]");
      if (c) (c.closest("dialog") as HTMLDialogElement)?.close();
      if ((e.target as Element).tagName === "DIALOG") {
        (e.target as HTMLDialogElement).close();
      }
    };
    document.addEventListener("click", onDlgClick);
    document.querySelectorAll("dialog").forEach((d) =>
      d.addEventListener("close", () => {
        lenis?.start();
        const dlg = d as HTMLDialogElement & { _from?: HTMLElement };
        dlg._from?.focus();
      }),
    );

    const copyBtn = document.getElementById("copyMail");
    const copyLive = document.getElementById("copyLive");
    let copyT: ReturnType<typeof setTimeout>;
    const onCopy = async () => {
      if (!copyBtn) return;
      const m = copyBtn.dataset.mail ?? "";
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
      copyBtn.textContent = ok ? "Adresse copiée ✓" : "Copie impossible";
      copyBtn.classList.toggle("ok", ok);
      if (copyLive) {
        copyLive.textContent = ok
          ? "Adresse e-mail copiée dans le presse-papiers"
          : "Copie impossible, sélectionnez l’adresse";
      }
      clearTimeout(copyT);
      copyT = setTimeout(() => {
        copyBtn.textContent = "Copier l’adresse";
        copyBtn.classList.remove("ok");
      }, 2200);
    };
    copyBtn?.addEventListener("click", onCopy);

    const form = document.getElementById("form") as HTMLFormElement | null;
    const cleanupForm = form ? bindAknoContactForm(form) : undefined;

    const cleanupAp =
      page === "home" ? initAknoApSec(RM, gsapLib) : undefined;
    const cleanupKd = page === "home" ? initAknoKeyDataCarousel() : undefined;

    cleanupMain = () => {
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("click", onDlgClick);
      removeEventListener("scroll", solid);
      removeEventListener("keydown", onKey);
      bur?.removeEventListener("click", onBurClick);
      mn?.removeEventListener("click", onMnClick);
      copyBtn?.removeEventListener("click", onCopy);
      cleanupForm?.();
      ioContact?.disconnect();
      ioFoot?.disconnect();
      ioNav.disconnect();
      lio.disconnect();
      pio.disconnect();
      lazyIo.disconnect();
      mqIos.forEach((io) => io.disconnect());
      copilotIo?.disconnect();
      iconIos.forEach((io) => io.disconnect());
      ro?.disconnect();
      document.removeEventListener("visibilitychange", onVisRoll);
      clearTimeout(mT);
      clearTimeout(copyT);
      clearInterval(tt);
      gsapCtx?.revert();
      ScrollTrigger?.getAll().forEach((t) => t.kill());
      cleanupWall?.();
      cleanupAp?.();
      cleanupKd?.();
      lenis?.destroy();
      if (lenisTick && gsapLib) gsapLib.ticker.remove(lenisTick);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("menu-open", "js");
    };
    };

    void boot();

    return () => {
      cancelled = true;
      cleanupMain?.();
    };
  }, [page]);
}
