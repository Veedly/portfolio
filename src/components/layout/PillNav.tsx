"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type PillNavProps = {
  items: PillNavItem[];
  logoHref: string;
  logoLabel?: string;
  ease?: string;
};

export function PillNav({ items, logoHref, logoLabel = "DD", ease = "power3.out" }: PillNavProps) {
  const pathname = usePathname();
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const { width, height } = pill.getBoundingClientRect();
        const radius = (width * width / 4 + height * height) / (2 * height);
        const diameter = Math.ceil(2 * radius) + 2;
        const delta = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - width * width / 4))) + 1;
        const originY = diameter - delta;
        const label = pill.querySelector(".pill-label");
        const hoverLabel = pill.querySelector(".pill-label-hover");

        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          scale: 0,
          xPercent: -50,
          transformOrigin: `50% ${originY}px`,
        });

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { opacity: 0, y: height + 12 });

        timelineRefs.current[index]?.kill();
        const timeline = gsap.timeline({ paused: true });

        timeline.to(circle, { duration: 1.2, ease, scale: 1.18, xPercent: -50 }, 0);
        if (label) timeline.to(label, { duration: 1.2, ease, y: -(height + 8) }, 0);
        if (hoverLabel) timeline.to(hoverLabel, { duration: 1.2, ease, opacity: 1, y: 0 }, 0);

        timelineRefs.current[index] = timeline;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => undefined);

    gsap.fromTo(
      logoRef.current,
      { scale: 0.82, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease, delay: 0.08 },
    );

    const timelineStore = timelineRefs.current;
    const activeTweenStore = activeTweenRefs.current;

    return () => {
      window.removeEventListener("resize", layout);
      timelineStore.forEach((timeline) => timeline?.kill());
      activeTweenStore.forEach((tween) => tween?.kill());
    };
  }, [ease, items]);

  const handleEnter = (index: number) => {
    const timeline = timelineRefs.current[index];
    if (!timeline) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(timeline.duration(), {
      duration: 0.32,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (index: number) => {
    const timeline = timelineRefs.current[index];
    if (!timeline) return;
    activeTweenRefs.current[index]?.kill();
    activeTweenRefs.current[index] = timeline.tweenTo(0, {
      duration: 0.22,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    if (!logoRef.current) return;
    gsap.fromTo(logoRef.current, { rotate: 0 }, { rotate: 360, duration: 0.34, ease, overwrite: "auto" });
  };

  const nav = (
    <div className="pill-nav-container">
      <nav className="pill-nav" aria-label="Primary">
        <Link ref={logoRef} href={logoHref} className="pill-logo" aria-label="Home" onMouseEnter={handleLogoEnter}>
          {logoLabel}
        </Link>
        <div className="pill-nav-items">
          <ul className="pill-list" role="menubar">
            {items.map((item, index) => (
              <li key={item.href} role="none">
                <Link
                  role="menuitem"
                  href={item.href}
                  className={`pill${isActiveHref(pathname, item.href) ? " is-active" : ""}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(index)}
                  onMouseLeave={() => handleLeave(index)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(element) => {
                      circleRefs.current[index] = element;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );

  if (typeof document === "undefined") return null;

  return createPortal(nav, document.body);
}

function isActiveHref(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href.includes("#")) return false;
  const cleanHref = href.split("#")[0];
  if (!cleanHref) return false;
  if (cleanHref.endsWith("/shots")) return pathname.endsWith("/shots");
  return pathname === cleanHref;
}
