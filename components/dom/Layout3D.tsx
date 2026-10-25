"use client";

import { useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

// Fixed full-screen canvas over the page. pointer-events stay off so the DOM scrolls;
// events come from the wrapper div instead.
export function Layout3D({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null!);

  return (
    <div ref={ref} className="relative">
      {children}
      <Scene
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
        eventSource={ref}
        eventPrefix="client"
      />
    </div>
  );
}
