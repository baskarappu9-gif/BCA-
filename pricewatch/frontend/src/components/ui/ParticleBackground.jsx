import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function ParticleField(props) {
    const ref = useRef();

    const positions = useMemo(() => {
        const count = 5000;
        const array = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.5 * Math.cbrt(Math.random());

            array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            array[i * 3 + 2] = r * Math.cos(phi);
        }
        return array;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00d9ff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

const ParticleBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#11111f] to-[#1a1a2e] z-0"></div>

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-10 opacity-60">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleField />
                </Canvas>
            </div>
        </div>
    );
};

export default ParticleBackground;
