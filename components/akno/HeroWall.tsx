"use client";

import { useEffect, useRef } from "react";

const IMG: [string, string][] = [
  ["veillee", "VIDEO"],
  ["sublimessence", "c-sublimessence-0"],
  ["vauclair", "c-vauclair-0"],
  ["lacets", "c-lacets-0"],
  ["alric", "c-alric-0"],
  ["veillee", "c-veillee-2"],
  ["sublimessence", "c-sublimessence-2"],
  ["vauclair", "c-vauclair-1"],
  ["lacets", "c-lacets-1"],
  ["alric", "c-alric-1"],
  ["veillee", "c-veillee-3"],
  ["sublimessence", "c-sublimessence-1"],
  ["vauclair", "c-vauclair-2"],
  ["veillee", "c-veillee-0"],
  ["sublimessence", "c-sublimessence-3"],
];

type CardEl = HTMLDivElement & { _i: number; _j: number };

export function HeroWall() {
  const wallRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const wall = wallRef.current;
    const tilt = tiltRef.current;
    if (!wall || !tilt) return;

    heroRef.current = wall.closest(".hero");
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cards: CardEl[] = [];
    let cols = 0;
    let rows = 0;
    let W = 0;
    let H = 0;
    let G = 0;
    let ox = 0;
    let oy = 0;
    let vx = 0;
    let vy = 0;
    let heroOn = true;
    let raf = 0;
    let lt = 0;

    function build() {
      if (!wall || !tilt) return;
      const mob = innerWidth < 760;
      wall.innerHTML = "";
      cards = [];
      W = mob ? 150 : Math.min(270, innerWidth * 0.19);
      H = W * 0.75;
      G = mob ? 12 : 20;
      cols = mob ? 4 : 6;
      rows = 5;
      const k = RM ? 0.12 : 1;
      vx = (mob ? 10 : 13) * k;
      vy = (mob ? 5.6 : 7.2) * k;
      tilt.style.transform = "rotateX(52deg) rotateZ(-32deg)";
      let vids = 0;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = IMG.length;
          const q = (((i * 3 + j * 5) % n) + n) % n;
          const [, f] = IMG[q];
          const d = document.createElement("div") as CardEl;
          d.className = "card";
          d.style.cssText = `width:${W}px;height:${H}px;margin-left:${-W / 2}px;margin-top:${-H / 2}px`;
          const vid = f === "VIDEO" && !mob && !RM && vids++ < 2;
          const im = f === "VIDEO" ? "c-veillee-1" : f;
          d.innerHTML = `<div class="in">${
            vid
              ? `<video src="/assets/video/veillee.mp4" poster="/assets/img/wall/c-veillee-1.webp" autoplay muted loop playsinline tabindex="-1"></video>`
              : `<img src="/assets/img/wall/${im}-280.webp" srcset="/assets/img/wall/${im}-280.webp 280w, /assets/img/wall/${im}.webp 560w" sizes="${Math.round(W)}px" width="560" height="420" alt="" draggable="false" decoding="async">`
          }</div>`;
          d._i = i;
          d._j = j;
          wall.appendChild(d);
          cards.push(d);
        }
      }
    }

    function frame(dt: number) {
      ox += vx * dt;
      oy += vy * dt;
      const TW = cols * (W + G);
      const TH = rows * (H + G);
      for (const c of cards) {
        const x = (((c._i * (W + G) + ox) % TW) + TW) % TW - TW / 2;
        const y = (((c._j * (H + G) + oy) % TH) + TH) % TH - TH / 2;
        c.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      }
    }

    function loop(t: number) {
      const dt = lt ? Math.min(0.05, (t - lt) / 1000) : 0;
      lt = t;
      frame(dt);
      raf = heroOn && !document.hidden ? requestAnimationFrame(loop) : ((lt = 0), 0);
    }

    const run = () => {
      if (!raf && heroOn && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const vids = () => wall.querySelectorAll("video");

    build();
    frame(0);
    run();

    let rt: ReturnType<typeof setTimeout>;
    let lw = innerWidth;
    const onResize = () => {
      if (innerWidth === lw) return;
      lw = innerWidth;
      clearTimeout(rt);
      rt = setTimeout(() => {
        build();
        frame(0);
      }, 150);
    };
    addEventListener("resize", onResize);

    const heroEl = heroRef.current;
    const io = heroEl
      ? new IntersectionObserver(([en]) => {
          heroOn = en.isIntersecting;
          if (heroOn) {
            if (raf) cancelAnimationFrame(raf);
            raf = 0;
            lt = 0;
          }
          vids().forEach((v) =>
            heroOn && !document.hidden ? v.play().catch(() => {}) : v.pause(),
          );
          run();
        })
      : null;
    if (heroEl) io?.observe(heroEl);

    const onPageShow = () => {
      heroOn = true;
      run();
    };
    const onVis = () => {
      vids().forEach((v) =>
        document.hidden || !heroOn ? v.pause() : v.play().catch(() => {}),
      );
      run();
    };
    addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      io?.disconnect();
      removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVis);
      clearTimeout(rt);
    };
  }, []);

  return (
    <div id="scene" aria-hidden="true">
      <div id="tilt" ref={tiltRef}>
        <div id="wall" ref={wallRef} />
      </div>
    </div>
  );
}
