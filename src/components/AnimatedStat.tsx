"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  from?: number;
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
  respectReducedMotion?: boolean;
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function formatValue(value: number, decimals: number, prefix: string, suffix: string) {
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
}

function isElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return rect.bottom >= 0 && rect.top <= window.innerHeight * 0.9;
}

export default function AnimatedStat({
  from = 0,
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  durationMs = 1400,
  respectReducedMotion = false,
}: AnimatedStatProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || hasAnimatedRef.current) {
      return;
    }

    const reduceMotion = respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runAnimation = () => {
      const startedAt = performance.now();
      hasAnimatedRef.current = true;

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / durationMs, 1);
        const easedProgress = easeOutCubic(progress);

        setValue(from + (to - from) * easedProgress);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    if (reduceMotion) {
      frameRef.current = requestAnimationFrame(() => {
        hasAnimatedRef.current = true;
        setValue(to);
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      const watchForVisibility = () => {
        if (hasAnimatedRef.current) {
          return;
        }

        if (isElementInViewport(element)) {
          runAnimation();
          return;
        }

        frameRef.current = requestAnimationFrame(watchForVisibility);
      };

      frameRef.current = requestAnimationFrame(watchForVisibility);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          runAnimation();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [decimals, durationMs, from, respectReducedMotion, to]);

  return (
    <span ref={elementRef} className={className} suppressHydrationWarning>
      {formatValue(value, decimals, prefix, suffix)}
    </span>
  );
}
