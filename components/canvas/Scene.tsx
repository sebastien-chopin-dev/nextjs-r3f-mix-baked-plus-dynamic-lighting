"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

// A Canvas that lives inside its section, so it scrolls natively with the page (no lag).
export default function Scene({ children, ...props }: CanvasProps) {
  return (
    <Canvas
      {...props}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.AgXToneMapping;
      }}
    >
      {children}
      <Preload all />
    </Canvas>
  );
}
