// SPDX-License-Identifier: MIT. © 2026 Tridimotion (https://tridimotion.com). Credit appreciated.
"use client";

import { useLayoutEffect, useMemo } from "react";
import { type ThreeElements } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { DRACO_PATH, MODELS, TEXTURES, prepareBakeTexture } from "./assets";

// Fully baked: unlit MeshBasicMaterial. Meshes named *no_l_bake* keep their GLB material.
export function Rocks(props: ThreeElements["group"]) {
  const { scene } = useGLTF(MODELS.rocks, DRACO_PATH);
  const bake = useTexture(TEXTURES.rocksBake);

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ map: bake, toneMapped: false }),
    [bake],
  );

  useLayoutEffect(() => {
    prepareBakeTexture(bake, THREE.SRGBColorSpace);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && !obj.name.includes("no_l_bake")) {
        obj.material = material;
      }
    });
    return () => material.dispose();
  }, [scene, material, bake]);

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}
