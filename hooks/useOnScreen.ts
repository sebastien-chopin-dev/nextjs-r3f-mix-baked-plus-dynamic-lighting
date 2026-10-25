"use client";

import { useEffect, useState, type RefObject } from "react";

export function useOnScreen(
  ref: RefObject<HTMLElement | null>,
  rootMargin = "200px",
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}
