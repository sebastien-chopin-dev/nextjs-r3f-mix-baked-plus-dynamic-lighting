"use client";

import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useOnScreen } from "@/hooks/useOnScreen";

const View = dynamic(
  () => import("@/components/canvas/View").then((mod) => mod.View),
  { ssr: false, loading: () => <Spinner /> },
);
const RobotMarsScene = dynamic(
  () =>
    import("@/components/canvas/robot-mars/RobotMarsScene").then(
      (mod) => mod.RobotMarsScene,
    ),
  { ssr: false },
);

export function RobotMarsSection() {
  const section = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(section);

  return (
    <section ref={section} className="bg-stone-100 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
            Real-time 3D, baked light
          </h2>
          <ul className="mt-6 space-y-2 text-lg text-stone-600">
            <li>Cycles bake as lightMap + AO</li>
            <li>Real-time specular and contact shadows on top</li>
            <li>Drag to orbit: the rover looks at you</li>
          </ul>
        </div>

        <div className="relative h-96 w-full lg:h-[560px]">
          {/* Phones get a still image, larger screens the live scene. */}
          <Image
            src="/images/robot-mars-fallback.webp"
            alt="Mars rover on rocky ground"
            fill
            sizes="100vw"
            className="object-contain sm:hidden"
          />
          {isVisible && (
            <View className="hidden size-full sm:block">
              <Suspense fallback={null}>
                <RobotMarsScene />
              </Suspense>
            </View>
          )}
        </div>
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="size-6 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />
    </div>
  );
}
