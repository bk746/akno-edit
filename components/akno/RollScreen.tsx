"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type RollScreenProps = {
  alt: string;
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  sizes: string;
};

export function RollScreen({
  alt,
  src,
  width,
  height,
  sizes,
}: RollScreenProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    stageRef.current = img.closest(".stage");
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fit = () => {
      const sc = img.parentElement;
      if (!sc) return;
      const d = Math.max(0, img.offsetHeight - sc.clientHeight);
      img.style.setProperty("--end", `${-d}px`);
      img.style.setProperty(
        "--dur",
        `${Math.round(Math.min(40, Math.max(14, d / (img.closest(".iph") ? 60 : 45))))}s`,
      );
    };

    const load = () => {
      img.classList.add("ld");
      fit();
    };

    if (img.complete && img.naturalHeight) load();
    else img.addEventListener("load", load, { once: true });

    const stage = stageRef.current;
    if (!stage) return;

    const pio = new IntersectionObserver(
      (es) =>
        es.forEach((e) =>
          e.target.classList.toggle("on", e.isIntersecting && !RM),
        ),
      { rootMargin: "0px" },
    );
    pio.observe(stage);

    const ro = new ResizeObserver(() => {
      if (img.classList.contains("ld")) fit();
    });
    ro.observe(document.body);

    const onVis = () => {
      document.querySelectorAll<HTMLElement>(".stage").forEach((st) =>
        st.style.setProperty("--ps", document.hidden ? "paused" : "running"),
      );
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      img.removeEventListener("load", load);
      pio.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <Image
      ref={imgRef}
      className="roll"
      alt={alt}
      src={src}
      width={width}
      height={height}
      sizes={sizes}
      loading="lazy"
      unoptimized
      style={{ width: "100%", height: "auto", maxWidth: "none" }}
    />
  );
}

export function DeviceStage({
  desktop,
  mobileShot,
  reverse,
}: {
  desktop: RollScreenProps;
  mobileShot: RollScreenProps;
  reverse?: boolean;
}) {
  const stageClass = `stage${reverse ? " rev" : ""}`;

  return (
    <div className={stageClass}>
      <div className="mac">
        <div className="lid">
          <span className="cam" />
          <div className="scr">
            <RollScreen {...desktop} />
            <i className="glare" />
          </div>
        </div>
        <div className="base">
          <i />
        </div>
      </div>
      <div className="iph">
        <div className="frm">
          <div className="scr">
            <RollScreen {...mobileShot} />
            <span className="isl" />
            <i className="glare" />
          </div>
        </div>
      </div>
    </div>
  );
}
