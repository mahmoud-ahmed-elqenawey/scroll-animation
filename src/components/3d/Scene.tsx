"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import ToothModel from "./ToothModel";

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-3, -3, 2]} intensity={0.4} color="#00D4AA" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00D4AA" />
          <hemisphereLight intensity={0.3} groundColor="#0A0A0A" />
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <ToothModel />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
