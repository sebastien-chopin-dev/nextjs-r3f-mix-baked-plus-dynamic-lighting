"use client";

import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FullscreenIcon, overlayButton, Spinner } from "./ui";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => <Spinner />,
});
const RobotMarsScene = dynamic(
  () =>
    import("@/components/canvas/robot-mars/RobotMarsScene").then(
      (mod) => mod.RobotMarsScene,
    ),
  { ssr: false },
);

const BACK = "/#robot-mars";

// The rover scene at full viewport size, on every device (phones included).
export function RobotMarsFullscreen() {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push(BACK);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="fixed inset-0 bg-surface">
      <Scene className="size-full">
        <Suspense fallback={null}>
          <RobotMarsScene />
        </Suspense>
      </Scene>

      <Link href={BACK} className={`${overlayButton} top-4 right-4`}>
        <FullscreenIcon exit />
        Exit
      </Link>
      <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-sm text-muted">
        Drag to orbit
      </p>
    </main>
  );
}
