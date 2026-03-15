'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'

function RotatingSphere() {
  const meshRef = useRef<Mesh>(null)
  const wireRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
      meshRef.current.rotation.x += delta * 0.05
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.1
      wireRef.current.rotation.z += delta * 0.08
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Deep matte graphite sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color="#121212"
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      {/* Champagne gold wireframe halo */}
      <mesh ref={wireRef} scale={1.2}>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshBasicMaterial
          color="#D4AF37"
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

export default function QuantumBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} color="#f5f0e8" />
        <pointLight position={[-3, 2, 4]} intensity={0.4} color="#D4AF37" />
        <pointLight position={[3, -2, 3]} intensity={0.2} color="#f5f0e8" />
        <RotatingSphere />
      </Canvas>
    </div>
  )
}
