"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";
import { r3f } from "@/lib/r3f-tunnel";

type SceneProps = Omit<CanvasProps, "children">;

// The one Canvas of the app. It persists across route changes; only the tunnelled children change.
export default function Scene(props: SceneProps) {
  return (
    <Canvas
      {...props}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.AgXToneMapping;
      }}
    >
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
