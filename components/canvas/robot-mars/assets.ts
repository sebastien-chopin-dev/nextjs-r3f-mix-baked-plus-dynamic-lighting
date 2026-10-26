// SPDX-License-Identifier: MIT. © 2026 Tridimotion (https://tridimotion.com). Credit appreciated.
import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { withBasePath } from "@/lib/base-path";

// Self-hosted decoder (copied from three/examples/jsm/libs/draco/gltf). All three GLBs are Draco-compressed.
export const DRACO_PATH = withBasePath("/draco/");

const DIR = withBasePath("/models/robot-mars");

export const MODELS = {
  rover: `${DIR}/rover-body.glb`,
  ground: `${DIR}/ground.glb`,
  rocks: `${DIR}/rocks.glb`,
} as const;

// Cycles bakes. COMBINED = light x albedo, used as lightMap (or as the full color on the rocks).
export const TEXTURES = {
  roverLight: `${DIR}/MergedBake_Bake1_CyclesBake_COMBINED.jpg`,
  roverAo: `${DIR}/MergedBake_Bake1_CyclesBake_AO.jpg`,
  groundLight: `${DIR}/GroundLP_Bake1_CyclesBake_COMBINED2.jpg`,
  groundAo: `${DIR}/GroundLP_Bake1_CyclesBake_AO2.jpg`,
  groundBump: `${DIR}/GroundLP_Bake1_CyclesBake_NORMAL.jpg`,
  rocksBake: `${DIR}/MergedBake_Rock_CyclesBake_COMBINED.jpg`,
} as const;

// Start every download at once instead of one Suspense waterfall per component.
export function preloadRobotMars() {
  Object.values(MODELS).forEach((url) => useGLTF.preload(url, DRACO_PATH));
  useTexture.preload(Object.values(TEXTURES));
}

// useGLTF caches one scene per URL, and a three.js object has one parent. When two canvases
// show the model (the section and /rover, even briefly during navigation), each needs its own
// copy, so each use gets a clone (geometries, materials and textures stay shared).
export function useModel(url: string) {
  const { scene } = useGLTF(url, DRACO_PATH);
  return useMemo(() => scene.clone(), [scene]);
}

// glTF UVs are not flipped. Color bakes are sRGB; AO and bump are data.
export function prepareBakeTexture(
  texture: THREE.Texture,
  colorSpace: THREE.ColorSpace,
) {
  if (!texture.flipY && texture.colorSpace === colorSpace) return;
  texture.flipY = false;
  texture.colorSpace = colorSpace;
  texture.needsUpdate = true;
}
