// SPDX-License-Identifier: MIT. © 2026 Tridimotion (https://tridimotion.com). Credit appreciated.
"use client";

import { useLayoutEffect, useMemo } from "react";
import { type ThreeElements } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { DRACO_PATH, MODELS, TEXTURES, prepareBakeTexture } from "./assets";

// Lit ground: tinted MeshStandardMaterial + baked lightMap/aoMap, with the bake's normal pass reused as a bump map.
export function Ground(props: ThreeElements["group"]) {
  const { scene } = useGLTF(MODELS.ground, DRACO_PATH);
  const { light, ao, bump } = useTexture({
    light: TEXTURES.groundLight,
    ao: TEXTURES.groundAo,
    bump: TEXTURES.groundBump,
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.8, 0.52, 0.15),
        roughness: 0.4,
        lightMap: light,
        lightMapIntensity: 1,
        aoMap: ao,
        aoMapIntensity: 1,
        bumpMap: bump,
        bumpScale: 3,
        toneMapped: false,
      }),
    [light, ao, bump],
  );

  useLayoutEffect(() => {
    prepareBakeTexture(light, THREE.SRGBColorSpace);
    prepareBakeTexture(ao, THREE.NoColorSpace);
    prepareBakeTexture(bump, THREE.NoColorSpace);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) obj.material = material;
    });
    return () => material.dispose();
  }, [scene, material, light, ao, bump]);

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}
