// SPDX-License-Identifier: MIT. © 2026 Tridimotion (https://tridimotion.com). Credit appreciated.
"use client";

import { useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stage } from "@react-three/drei";
import * as THREE from "three";
import { preloadRobotMars } from "./assets";
import { Ground } from "./Ground";
import { Rocks } from "./Rocks";
import { Rover } from "./Rover";

preloadRobotMars();

// Where a drei <Bounds> fit ends for this scene. Canvases narrower than ~0.95 (portrait
// fullscreen) back the camera off so the whole ground stays in view.
const CAMERA_DIRECTION = new THREE.Vector3(0, 1, 4).normalize();
const CAMERA_DISTANCE = 7;

export function RobotMarsScene() {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const [lookAt, setLookAt] = useState(
    () => new THREE.Vector3(-0.58, 2.65, 8.14),
  );
  const aspect = useThree((state) => state.size.width / state.size.height);
  const cameraPosition = useMemo(
    () =>
      CAMERA_DIRECTION.clone().multiplyScalar(
        CAMERA_DISTANCE * Math.max(1, 0.95 / aspect),
      ),
    [aspect],
  );

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault
        fov={40}
        position={cameraPosition}
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

      {/* Stage still centers the model. adjustCamera would animate a Bounds fit after load,
          so the camera is placed where that fit ends instead (see CAMERA_DISTANCE). */}
      <Stage
        adjustCamera={false}
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
