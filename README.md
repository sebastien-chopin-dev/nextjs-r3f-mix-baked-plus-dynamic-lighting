# Next.js + R3F: baked + dynamic lighting

Template for embedding real-time 3D in a Next.js site: a Mars rover scene with Blender (Cycles) baked light mixed with three.js real-time shading.

Stack: Next.js 16 (App Router, Turbopack), React 19, three 0.186, @react-three/fiber 9, @react-three/drei 10, tunnel-rat, Tailwind 4.

```bash
npm install
npm run dev   # http://localhost:3000
```

## How it works

- **One canvas, many views.** `Layout3D` mounts one fixed full-screen `<Canvas>` (pointer events off, events from the page wrapper). Each section places a `<View>` div; drei scissors the canvas to it, and `tunnel-rat` moves the 3D children into the canvas.
- **Lazy.** The scene and `View` load with `next/dynamic` (`ssr: false`). `useOnScreen` mounts the view only near the viewport. Phones get a still image.
- **Baked light.**
  - Rover: GLB `MeshStandardMaterial` kept, Cycles `COMBINED` bake as `lightMap` (0.5) + AO bake as `aoMap`, so real-time specular/env still shows.
  - Ground: tinted `MeshStandardMaterial` + `lightMap`/`aoMap`, with the bake's normal pass as a `bumpMap`.
  - Rocks: fully baked, unlit `MeshBasicMaterial`.
  - All baked materials are `toneMapped: false` (canvas uses AgX). Textures: `flipY = false`; color bakes sRGB, AO/bump linear.
- **Real-time.** drei `<Stage environment="sunset">` with contact shadows + one directional light.
- **Interaction.** Clamped `OrbitControls`; when an orbit ends the rover's `RoverHead` node eases to face the camera.

## Layout

```
app/                         layout (wraps Layout3D) + demo page
components/canvas/           Scene (the Canvas), View
components/canvas/robot-mars assets + Rover, Ground, Rocks, RobotMarsScene
components/dom/              Layout3D, RobotMarsSection
hooks/useOnScreen.ts
lib/r3f-tunnel.ts
public/models/robot-mars/    GLBs (Draco) + bakes
public/draco/                self-hosted Draco decoder (from three/examples/jsm/libs/draco/gltf)
```

## Not done yet

1. Real cast shadows: `<Canvas shadows>`, `castShadow` light, per-mesh `castShadow`/`receiveShadow`, shadow camera bounds + bias. Today only `Stage`'s contact shadow is real-time.
2. Shadows on the baked ground: keep `MeshStandardMaterial`, or add a transparent `ShadowMaterial` plane just above it.
3. Double-lit areas: the bake already holds the sun's shadow, so a real-time shadow from the same direction darkens it twice. Bake without the key light (GI + AO only), or mask the dynamic object's bake area.
4. The `sunset` environment HDR and the Google font come from CDNs, so the demo needs a network connection. Self-host them for offline use.

The Blender `.blend` source and bake setup are not included.

## Credits and license

- **Code:** MIT, © 2026 [Tridimotion](https://tridimotion.com). If you reuse the 3D viz component, please credit **@tridimotion**.
- **Shared-canvas setup:** based on [pmndrs/react-three-next](https://github.com/pmndrs/react-three-next) (MIT).
- **3D model:** original by [Polygon Runway](https://polygonrunway.com), optimized and baked by Tridimotion. **Not MIT, not for reuse:** see [public/models/LICENSE.md](public/models/LICENSE.md).
- Notices: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
