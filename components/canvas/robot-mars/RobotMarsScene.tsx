// SPDX-License-Identifier: MIT. © 2026 Tridimotion (https://tridimotion.com). Credit appreciated.
"use client";

import { useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import * as THREE from "three";
import { preloadRobotMars } from "./assets";
import { Ground } from "./Ground";
import { Rocks } from "./Rocks";
import { Rover } from "./Rover";

preloadRobotMars();

export function RobotMarsScene() {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const [lookAt, setLookAt] = useState(
    () => new THREE.Vector3(-0.58, 2.65, 8.14),
  );

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault
        fov={40}
        position={[0, 2, 8]}
      />
      {/* The rover's head turns to the camera when an orbit ends. */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2.5}
        onEnd={() => {
          if (camera.current) setLookAt(camera.current.position.clone());
        }}
      />

      <Stage
        adjustCamera
        shadows="contact"
        environment="sunset"
        preset="soft"
        intensity={1}
      >
        <group position={[0, -0.7, 0]} rotation={[0, -0.8, 0]}>
          <Rocks scale={0.4} />
          <Ground scale={0.4} />
          <Rover lookAt={lookAt} />
        </group>
      </Stage>

      <directionalLight intensity={0.8} position={[-4, 3, -3]} />
    </>
  );
}
