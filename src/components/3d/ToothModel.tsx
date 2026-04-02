"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ToothModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <group ref={groupRef} scale={1.8}>
      {/* Tooth crown */}
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.55, 0.5, 16, 32]} />
        <meshPhysicalMaterial
          color="#f0f0f0"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Tooth root 1 */}
      <mesh position={[-0.18, -0.55, 0]} rotation={[0, 0, 0.15]}>
        <coneGeometry args={[0.18, 0.7, 16]} />
        <meshStandardMaterial
          color="#e8e8e8"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* Tooth root 2 */}
      <mesh position={[0.18, -0.55, 0]} rotation={[0, 0, -0.15]}>
        <coneGeometry args={[0.18, 0.7, 16]} />
        <meshStandardMaterial
          color="#e8e8e8"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* Accent glow ring */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#00D4AA"
          emissive="#00D4AA"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}
