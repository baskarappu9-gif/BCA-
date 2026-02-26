'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function ParticleField() {
    const count = 2000
    const mesh = useRef()

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100
            const factor = Math.random() * 100 + 20
            const speed = Math.random() * 0.01 + 0.001
            const x = Math.random() * 100 - 50
            const y = Math.random() * 100 - 50
            const z = Math.random() * 100 - 50

            temp.push({ time, factor, speed, x, y, z, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state) => {
        if (!mesh.current) return

        particles.forEach((particle, i) => {
            let { time, factor, speed, x, y, z } = particle

            // Update particle position
            const t = (particle.time += speed)

            // Oscillate particles
            particle.mx = Math.sin(t) * 0.1
            particle.my = Math.cos(t) * 0.1

            dummy.position.set(
                x + particle.mx,
                y + particle.my,
                z
            )

            const scale = (Math.sin(t * 3) + 2) * 0.1
            dummy.scale.set(scale, scale, scale)

            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })

        mesh.current.instanceMatrix.needsUpdate = true
        mesh.current.rotation.y += 0.001
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color="#14b8a6" emissive="#0d9488" />
        </instancedMesh>
    )
}

function Grid() {
    return (
        <gridHelper args={[100, 100, 0x14b8a6, 0x0f766e]} position={[0, -10, 0]} />
    )
}


export function MainScene() {
    return (
        <div className="w-full h-full absolute inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
                <fog attach="fog" args={['#000', 10, 60]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#14b8a6" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ParticleField />
                <Grid />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    )
}
