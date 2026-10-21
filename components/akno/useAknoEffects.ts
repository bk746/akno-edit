"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useAknoEffects() {
  useEffect(() => {
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js");

    let lenis: Lenis | null = null;

    let lenisTick: ((time: number) => void) | null = null;

    if (!RM) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
      });
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      lenisTick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(lenisTick);
      gsap.ticker.lagSmoothing(0);
    } else {
      document.documentElement.classList.remove("js");
    }

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id) return;
      const target =
        id === "#top" ? document.body : document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const subj = a.dataset.subject;
      if (subj) {
        const o = document.getElementById("f-o") as HTMLInputElement | null;
        if (o && !o.value) o.value = subj;
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
      ...document.querySelectorAll<HTMLAnchorElement>(".links a"),
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

    let gsapCtx: gsap.Context | undefined;

    if (!RM && lenis) {
      gsapCtx = gsap.context(() => {
        const E = "expo.out";
        gsap.to(".lead .ln>span", {
          y: 0,
          duration: 1.3,
          ease: E,
          stagger: 0.09,
          delay: 0.15,
        });
        gsap.to(".hero .rv", {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: E,
          stagger: 0.08,
          delay: 0.45,
        });
        gsap.fromTo(
          "#wall",
          { opacity: 0 },
          { opacity: 1, duration: 1.8, ease: "power2.out", clearProps: "opacity" },
        );

        document
          .querySelectorAll("main section:not(.hero) h2")
          .forEach((h) => {
            if (h.querySelector(".ln")) {
              gsap.to(h.querySelectorAll(".ln>span"), {
                y: 0,
                duration: 1.2,
                ease: E,
                stagger: 0.08,
                scrollTrigger: { trigger: h, start: "top 88%" },
              });
            }
          });

        gsap.utils.toArray<HTMLElement>("main section:not(.hero) .rv").forEach((el) => {
          gsap.to(el, {
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

        gsap.utils.toArray<HTMLElement>(".stage").forEach((st) => {
          const m = st.querySelector(".mac");
          const p = st.querySelector(".iph");
          const small = !!st.closest(".mc");
          if (m && p) {
            gsap
              .timeline({ scrollTrigger: { trigger: st, start: "top 85%" } })
              .from(m, { y: 60, opacity: 0, duration: 1.4, ease: E })
              .from(p, { y: 90, opacity: 0, duration: 1.4, ease: E }, "-=1.15");
            if (!small && innerWidth > 760) {
              gsap.fromTo(
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
              gsap.fromTo(
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

        gsap.utils.toArray<HTMLElement>(".pm").forEach((pm) =>
          gsap.from(pm.children, {
            y: 24,
            opacity: 0,
            duration: 1.1,
            ease: E,
            stagger: 0.06,
            scrollTrigger: { trigger: pm, start: "top 88%" },
          }),
        );

        gsap.to(".hero .lead", {
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
      });
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

    return () => {
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("click", onDlgClick);
      removeEventListener("scroll", solid);
      removeEventListener("keydown", onKey);
      bur?.removeEventListener("click", onBurClick);
      mn?.removeEventListener("click", onMnClick);
      ioContact?.disconnect();
      ioFoot?.disconnect();
      ioNav.disconnect();
      clearTimeout(mT);
      gsapCtx?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis?.destroy();
      if (lenisTick) gsap.ticker.remove(lenisTick);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("menu-open", "js");
    };
  }, []);
}
