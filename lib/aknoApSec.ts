import type gsap from "gsap";

type TileLoops = { intro: gsap.core.Timeline | null; loops: gsap.core.Timeline[] };

export function initAknoApSec(
  RM: boolean,
  gsapIn: typeof gsap | null,
): (() => void) | undefined {
  const sections = [...document.querySelectorAll(".ap-sec")];
  if (!sections.length) return undefined;
  if (RM || !gsapIn) {
    sections.forEach((s) => s.classList.add("ap-static"));
    return undefined;
  }
  const g = gsapIn;
  const E = "expo.inOut";
  const P = "power3.out";
  const cleanups: (() => void)[] = [];

  function web(t: Element): TileLoops {
    const ph = t.querySelector(".ap-ph");
    const im = t.querySelector(".ap-ph-scr img");
    const gl = t.querySelector(".ap-ph-gl");
    if (!ph || !im) return { intro: null, loops: [] };
    g.set(ph, { yPercent: 18, opacity: 0 });
    const intro = g
      .timeline({ paused: true })
      .to(ph, { yPercent: 0, opacity: 1, duration: 1.6, ease: "expo.out" });
    const lp = g.timeline({ paused: true, repeat: -1, defaults: { ease: E } });
    lp.to(im, { yPercent: -4, duration: 2.2 }, "+=1.2")
      .to(im, { yPercent: -9.5, duration: 2.4 }, "+=1.4")
      .to(im, { yPercent: 0, duration: 2.8, ease: "power3.inOut" }, "+=1.6");
    const fl = g
      .timeline({ paused: true, repeat: -1, yoyo: true })
      .to(ph, { y: -10, rotation: 0.6, duration: 3.6, ease: "sine.inOut" });
    const gt = gl
      ? g
          .timeline({ paused: true, repeat: -1, yoyo: true })
          .fromTo(gl, { xPercent: -16 }, { xPercent: 16, duration: 5, ease: "sine.inOut" })
      : g.timeline({ paused: true });
    return { intro, loops: [lp, fl, gt] };
  }

  function seo(t: Element): TileLoops {
    const q = t.querySelector(".ap-qt") as HTMLElement | null;
    const rows = [...t.querySelectorAll(".ap-row")];
    const ak = t.querySelector(".ap-ak") as HTMLElement | null;
    const first = rows[0] as HTMLElement | undefined;
    const res = t.querySelector(".ap-res") as HTMLElement | null;
    if (!q || !ak || !first || !res) return { intro: null, loops: [] };
    const txt = "studio web annecy";
    g.set(rows, { opacity: 0, y: 14, scale: 0.98 });
    g.set(ak, { zIndex: 2 });
    g.set(res, { opacity: 0, y: 12 });
    const lp = g.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 });
    let at = 0.3;
    for (let i = 1; i <= txt.length; i++) {
      const k = i;
      lp.call(() => {
        q.textContent = txt.slice(0, k);
      }, undefined, at);
      at += txt[i - 1] === " " ? 0.16 : 0.05 + Math.random() * 0.07;
    }
    lp.to(res, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, at + 0.25).to(
      rows,
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.6)", stagger: 0.08 },
      at + 0.4,
    );
    lp.add(() => {}, "+=0.2");
    lp.addLabel("sw");
    lp.to(
      ak,
      { y: () => -(ak.offsetTop - first.offsetTop), duration: 1.1, ease: "expo.inOut" },
      "sw",
    )
      .to(
        first,
        { y: () => ak.offsetTop - first.offsetTop, duration: 1.1, ease: "expo.inOut" },
        "sw",
      )
      .to(ak, { backgroundColor: "rgba(255,255,255,.09)", duration: 0.6, ease: P }, "sw+=0.5")
      .to(ak, { scale: 1.02, duration: 0.35, ease: P }, "sw+=0.9")
      .to(ak, { scale: 1, duration: 0.6, ease: "back.out(2)" });
    lp.to([res, q], { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "+=2.6");
    lp.set(rows, { opacity: 0, y: 14, scale: 0.98, clearProps: "backgroundColor" })
      .set(ak, { y: 0 })
      .set(first, { y: 0 })
      .call(() => {
        q.textContent = "";
      })
      .set(q, { opacity: 1 })
      .set(res, { opacity: 0, y: 12 });
    return { intro: null, loops: [lp] };
  }

  function geo(t: Element): TileLoops {
    const pr = t.querySelector(".ap-prompt");
    const th = t.querySelector(".ap-think");
    const ln = [...t.querySelectorAll(".ap-skel i")];
    const ch = t.querySelector(".ap-src");
    const pu = t.querySelector(".ap-pulse");
    const mo = [...t.querySelectorAll(".ap-more i")];
    const sp = t.querySelector(".ap-spark");
    const reset = () => {
      if (pr) g.set(pr, { opacity: 0, y: 10, scale: 0.97 });
      g.set(ln, { scaleX: 0, transformOrigin: "0 50%" });
      g.set(mo, { scaleX: 0, transformOrigin: "0 50%" });
      if (ch) g.set(ch, { opacity: 0, scale: 0.6 });
      if (th) g.set(th, { opacity: 0 });
      if (pu) g.set(pu, { opacity: 0, scale: 1 });
    };
    reset();
    const lp = g.timeline({ paused: true, repeat: -1, repeatDelay: 0.3, onRepeat: reset });
    if (pr) {
      lp.to(pr, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 0.3);
    }
    if (th) lp.to(th, { opacity: 1, duration: 0.4 }, "+=0.2");
    if (sp) lp.to(sp, { scale: 1.12, duration: 0.5, yoyo: true, repeat: 3, ease: "sine.inOut" }, "<");
    if (th) lp.to(th, { opacity: 0, duration: 0.3 });
    lp.to(ln, { scaleX: 1, duration: 0.7, ease: "power3.inOut", stagger: 0.22 }, "-=0.1");
    if (ch) lp.to(ch, { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(2.2)" }, "-=0.15");
    if (pu) {
      lp.fromTo(
        pu,
        { opacity: 0.7, scale: 1 },
        { opacity: 0, scale: 1.6, duration: 1.4, ease: "power2.out", repeat: 1 },
        "-=0.5",
      );
    }
    lp.to(mo, { scaleX: 1, duration: 0.6, ease: "power3.inOut", stagger: 0.16 }, "-=2");
    const fadeTargets = [pr, ch, ...ln, ...mo].filter(Boolean);
    lp.to(fadeTargets, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "+=2.4")
      .set(ln.concat(mo), { opacity: 1, scaleX: 0 })
      .set(ch, { scale: 0.6 })
      .set(pr, { y: 10, scale: 0.97 });
    return { intro: null, loops: [lp] };
  }

  const factories: Record<string, (t: Element) => TileLoops> = {
    "ap-web": web,
    "ap-seo": seo,
    "ap-geo": geo,
  };

  sections.forEach((S) => {
    const tiles = [...S.querySelectorAll(".ap-t")];
    const R = tiles.map((t) => {
      for (const k of Object.keys(factories)) {
        if (t.classList.contains(k)) return factories[k](t);
      }
      return { intro: null, loops: [] as gsap.core.Timeline[] };
    });
    g.set(tiles, { opacity: 0, y: 40, scale: 0.96 });
    const vis = tiles.map(() => false);
    let started = false;

    const run = (i: number) => {
      R[i].loops.forEach((l) => {
        if (vis[i] && started) l.play();
        else l.pause();
      });
    };

    const start = () => {
      if (started) return;
      started = true;
      g.to(tiles, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        clearProps: "transform",
      });
      R.forEach((r, i) => {
        g.delayedCall(0.35 + i * 0.12, () => {
          if (r.intro) {
            r.intro.play().eventCallback("onComplete", () => run(i));
          } else run(i);
        });
      });
    };

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          const i = tiles.indexOf(e.target as Element);
          if (i < 0) return;
          vis[i] = e.isIntersecting;
          if (e.isIntersecting && e.intersectionRatio > 0) start();
          if (started && (!R[i].intro || R[i].intro.progress() === 1)) run(i);
        });
      },
      { threshold: [0, 0.25] },
    );

    tiles.forEach((t, i) => {
      io.observe(t);
      const onEnter = () => {
        R[i].loops.forEach((l) => g.to(l, { timeScale: 1.35, duration: 0.6 }));
      };
      const onLeave = () => {
        R[i].loops.forEach((l) => g.to(l, { timeScale: 1, duration: 0.8 }));
      };
      t.addEventListener("mouseenter", onEnter);
      t.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
    });
    cleanups.push(() => io.disconnect());
  });

  return () => cleanups.forEach((fn) => fn());
}

export function initAknoKeyDataCarousel(): (() => void) | undefined {
  const k = document.querySelector(".kd");
  if (!k) return undefined;
  const slides = [...k.querySelectorAll(".kd-s")];
  const N = k.querySelector(".kd-n b");
  const ring = k.querySelector(".ring circle");
  const RMk = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0;

  const show = (n: number) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, j) => {
      s.classList.toggle("on", j === i);
      const hidden = j !== i;
      s.setAttribute("aria-hidden", String(hidden));
      if (hidden) s.setAttribute("inert", "");
      else s.removeAttribute("inert");
    });
    if (N) N.textContent = String(i + 1).padStart(2, "0");
    restart();
  };

  const restart = () => {
    if (RMk || !ring) return;
    k.classList.remove("run");
    void (ring as SVGGeometryElement).getBBox();
    k.classList.add("run");
  };

  const onRingEnd = () => show(i + 1);
  ring?.addEventListener("animationend", onRingEnd);
  k.querySelectorAll(".kd-b").forEach((b) => {
    b.addEventListener("click", () => show(i + Number((b as HTMLElement).dataset.d)));
  });
  const onKey = (e: Event) => {
    if (!(e instanceof KeyboardEvent)) return;
    if (e.key === "ArrowRight") {
      show(i + 1);
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      show(i - 1);
      e.preventDefault();
    }
  };
  k.addEventListener("keydown", onKey);
  const p = (v: boolean) => k.classList.toggle("paused", v);
  k.addEventListener("mouseenter", () => p(true));
  k.addEventListener("mouseleave", () => p(false));
  k.addEventListener("focusin", () => p(true));
  k.addEventListener("focusout", () => p(false));

  let io: IntersectionObserver | undefined;
  if (!RMk && "IntersectionObserver" in window) {
    io = new IntersectionObserver((es) =>
      es.forEach((e) => {
        if (e.isIntersecting && !k.classList.contains("run")) restart();
        p(!e.isIntersecting);
      }),
    );
    io.observe(k);
  }

  show(0);

  return () => {
    ring?.removeEventListener("animationend", onRingEnd);
    k.removeEventListener("keydown", onKey);
    io?.disconnect();
  };
}
