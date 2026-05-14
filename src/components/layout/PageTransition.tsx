"use client";

import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

type PageSnapshot = {
  key: string;
  html: string;
  scrollY: number;
};

type TransitionStack = {
  currentKey: string;
  previous: PageSnapshot | null;
};

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname() || "/";
  const currentRef = useRef<HTMLDivElement | null>(null);
  const previousRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef(0);
  const pendingPreviousRef = useRef<PageSnapshot | null>(null);
  const lastRenderedSnapshotRef = useRef<PageSnapshot | null>(null);
  const [stack, setStack] = useState<TransitionStack>(() => ({
    currentKey: pathname,
    previous: null,
  }));
  const isStudio = pathname.startsWith("/studio");

  useLayoutEffect(() => {
    const rememberCurrentScroll = () => {
      lastScrollYRef.current = window.scrollY;
    };

    const rememberScroll = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      const href = target?.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;

      const url = new URL(href, window.location.href);
      const currentUrl = new URL(window.location.href);
      if (url.origin !== currentUrl.origin || (url.pathname === currentUrl.pathname && url.search === currentUrl.search)) {
        return;
      }

      lastScrollYRef.current = window.scrollY;
      pendingPreviousRef.current = createSnapshot(stack.currentKey, currentRef.current, lastScrollYRef.current);
    };

    window.addEventListener("scroll", rememberCurrentScroll, { passive: true });
    document.addEventListener("click", rememberScroll, { capture: true });
    return () => {
      window.removeEventListener("scroll", rememberCurrentScroll);
      document.removeEventListener("click", rememberScroll, { capture: true });
    };
  }, [stack.currentKey]);

  useLayoutEffect(() => {
    setStack((prev) => {
      if (prev.currentKey === pathname) return prev;

      const previous = pendingPreviousRef.current || lastRenderedSnapshotRef.current;
      pendingPreviousRef.current = null;

      return {
        previous,
        currentKey: pathname,
      };
    });
  }, [pathname]);

  useLayoutEffect(() => {
    lastRenderedSnapshotRef.current = createSnapshot(pathname, currentRef.current, lastScrollYRef.current);
  });

  useLayoutEffect(() => {
    const current = currentRef.current;
    const previous = previousRef.current;
    if (!current || !previous || !stack.previous) return;

    if (prefersReducedMotion()) {
      const frame = window.requestAnimationFrame(() => setStack((prev) => ({ ...prev, previous: null })));
      return () => window.cancelAnimationFrame(frame);
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 1.18 },
      onComplete: () => setStack((prev) => ({ ...prev, previous: null })),
    });

    timeline
      .set(current, {
        borderRadius: "28px 28px 0 0",
        boxShadow: "0 -28px 90px rgba(0, 0, 0, 0.34)",
        inset: "18vh 5vw auto 5vw",
        minHeight: "100vh",
        opacity: 1,
        position: "fixed",
        y: 96,
      })
      .fromTo(
        current,
        {
          borderRadius: "28px 28px 0 0",
          boxShadow: "0 -28px 90px rgba(0, 0, 0, 0.34)",
          inset: "18vh 5vw auto 5vw",
          y: 96,
        },
        {
          borderRadius: "0px 0px 0px 0px",
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          inset: "0px 0px auto 0px",
          y: 0,
        },
        0,
      )
      .to(previous, { scale: 0.982, opacity: 0.72, filter: "blur(3px)", duration: 0.92, ease: "power2.out" }, 0)
      .to(previous, { opacity: 0.52, filter: "blur(6px)", duration: 0.34, ease: "power1.out" }, 0.72)
      .set(current, { clearProps: "position,inset,boxShadow,borderRadius,minHeight,transform" });

    return () => {
      timeline.kill();
    };
  }, [stack.currentKey, stack.previous]);

  const previousStyle = useMemo(
    () => ({
      transform: `translateY(-${stack.previous?.scrollY || 0}px)`,
    }),
    [stack.previous?.scrollY],
  );

  if (isStudio) return children;

  return (
    <div className="page-transition-root">
      {stack.previous ? (
        <div
          ref={previousRef}
          className="page-transition-layer page-transition-layer--previous"
          data-testid="page-transition-previous"
          aria-hidden="true"
          style={previousStyle}
          dangerouslySetInnerHTML={{ __html: stack.previous.html }}
        />
      ) : null}
      <div
        ref={currentRef}
        key={stack.currentKey}
        className="page-transition-layer page-transition-layer--current"
        data-testid="page-transition-current"
      >
        {children}
      </div>
    </div>
  );
}

function prefersReducedMotion() {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function createSnapshot(key: string, element: HTMLDivElement | null, scrollY: number): PageSnapshot | null {
  if (!element) return null;
  return {
    key,
    html: element.innerHTML,
    scrollY,
  };
}
