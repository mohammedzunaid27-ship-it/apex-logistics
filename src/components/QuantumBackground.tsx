'use client'

import { useRef, useSyncExternalStore } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'

function SteelSphere() {
  const meshRef = useRef<Mesh>(null)
  const wireRef = useRef<Mesh>(null)
  const innerWireRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12
      meshRef.current.rotation.x += delta * 0.04
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.08
      wireRef.current.rotation.z += delta * 0.06
    }
    if (innerWireRef.current) {
      innerWireRef.current.rotation.x -= delta * 0.05
      innerWireRef.current.rotation.y += delta * 0.03
    }
  })

  return (
    <group>
      {/* Forged core: dark blued steel, low roughness so it picks up the rim light */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.1, 12]} />
        <meshStandardMaterial color="#15181b" metalness={0.92} roughness={0.32} flatShading={false} />
      </mesh>

      {/* Outer cage: heat-coloured wireframe, like a weld seam glowing at night */}
      <mesh ref={wireRef} scale={1.22}>
        <icosahedronGeometry args={[2.1, 2]} />
        <meshBasicMaterial
          color="#ff6a1f"
          wireframe
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner cage: cold steel, offset rotation so the two lattices cross */}
      <mesh ref={innerWireRef} scale={1.08}>
        <octahedronGeometry args={[2.1, 3]} />
        <meshBasicMaterial
          color="#9fb0bf"
          wireframe
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

// No WebGL on phones or for people who asked for less motion.
const motionQuery = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(motionQuery)
  window.addEventListener('resize', onChange)
  mq.addEventListener('change', onChange)
  return () => {
    window.removeEventListener('resize', onChange)
    mq.removeEventListener('change', onChange)
  }
}

const canRender = () => window.innerWidth >= 768 && !window.matchMedia(motionQuery).matches

export default function QuantumBackground() {
  const enabled = useSyncExternalStore(subscribe, canRender, () => false)

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.75]}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#dfe7ee" />
        <pointLight position={[-4, 1.5, 3.5]} intensity={1.1} color="#ff6a1f" />
        <pointLight position={[3, -2, 3]} intensity={0.25} color="#9fb0bf" />
        <SteelSphere />
      </Canvas>
    </div>
  )
}
