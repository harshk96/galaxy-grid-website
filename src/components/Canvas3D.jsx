import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

function MovingStars() {
    const starsRef = useRef();

    useFrame((_, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.x -= delta * 0.02;
            starsRef.current.rotation.y -= delta * 0.015;
        }
    });

    return (
        <Stars
            ref={starsRef}
            radius={80}
            depth={40}
            count={4000}     // Reduced for performance
            factor={5}
            saturation={0}
            fade
            speed={1}
        />
    );
}

function FloatingGrid({ isDark }) {
    const gridRef = useRef();

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z =
                Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <gridHelper
            ref={gridRef}
            args={[
                120,
                120,
                isDark ? 0xf26722 : 0xf26722, // main grid color
                isDark ? 0xf26722 : 0xf26722,
                // secondary grid color
            ]}
            position={[0, -2.5, 0]}
        />

    );
}

const Canvas3D = ({ isDark }) => {
    const isMobile = window.innerWidth < 768;

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 1, 6], fov: 70 }}
                dpr={[1, 1.5]}
                frameloop="demand"
            >
                {/* Background */}
                <color attach="background" args={[isDark ? "#050505" : "#f9ab1c"]} />

                {/* Fog for depth */}
                <fog attach="fog" args={[isDark ? "#050505" : "#ec2626", 8, 20]} />


                {isDark && <MovingStars />}

                {/* Lighting */}
                <ambientLight intensity={isDark ? 0.4 : 1} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={isDark ? 0.8 : 0.5}
                />

                <FloatingGrid isDark={isDark} />

                {!isMobile && (
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.3}
                        enableDamping
                    />
                )}
            </Canvas>
        </div>
    );
};

export default Canvas3D;
