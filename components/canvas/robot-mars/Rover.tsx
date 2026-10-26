// SPDX-License-Identifier: MIT. © 2026 Tridimotion (https://tridimotion.com). Credit appreciated.
"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MODELS, TEXTURES, prepareBakeTexture, useModel } from "./assets";

const HEAD_TURN_SPEED = 4;

// Keeps the GLB's MeshStandardMaterial (real-time specular on top) and adds the bake as lightMap + aoMap.
export function Rover({ lookAt }: { lookAt: THREE.Vector3 }) {
  const scene = useModel(MODELS.rover);
  const { light, ao } = useTexture({
    light: TEXTURES.roverLight,
    ao: TEXTURES.roverAo,
  });
  const head = useMemo(() => scene.getObjectByName("RoverHead"), [scene]);
  const headTarget = useRef(new THREE.Quaternion());

  useLayoutEffect(() => {
    prepareBakeTexture(light, THREE.SRGBColorSpace);
    prepareBakeTexture(ao, THREE.NoColorSpace);
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const material = obj.material as THREE.MeshStandardMaterial;
      material.setValues({
        lightMap: light,
        lightMapIntensity: 0.5,
        aoMap: ao,
        aoMapIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.3,
        toneMapped: false,
      });
      material.needsUpdate = true;
    });
  }, [scene, light, ao]);

  // Compute the look-at rotation once per target, then ease towards it each frame.
  useEffect(() => {
    if (!head) return;
    const current = head.quaternion.clone();
    head.lookAt(lookAt);
    headTarget.current.copy(head.quaternion);
    head.quaternion.copy(current);
  }, [head, lookAt]);

  useFrame((_, delta) => {
    head?.quaternion.slerp(
      headTarget.current,
      1 - Math.exp(-HEAD_TURN_SPEED * delta),
    );
  });

  return <primitive object={scene} scale={0.4} />;
}
