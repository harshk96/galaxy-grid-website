import React, { useEffect, useState, useRef } from "react";

function Eyes({ isDark = true }) {
    const [rotate, setRotate] = useState(0);
    const [pupilScale, setPupilScale] = useState(1);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            let mouseX = e.clientX;
            let mouseY = e.clientY;

            let deltaX = mouseX - centerX;
            let deltaY = mouseY - centerY;

            var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            setRotate(angle - 180);

            // Calculate distance from center to determine pupil dilation
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = Math.min(rect.width, rect.height) / 2;
            const normalizedDistance = Math.min(distance / maxDistance, 1);
            setPupilScale(1 + normalizedDistance * 0.5);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    return (
        <div
            className={`w-full h-[80vh] flex items-center justify-center overflow-hidden relative border-t
            ${isDark ? 'bg-gradient-to-br from-zinc-900 to-black border-zinc-800' : 'bg-gradient-to-br from-zinc-100 to-gray-200 border-zinc-200'}`}
            style={{ borderTopLeftRadius: "4rem", borderTopRightRadius: "4rem", marginTop: "-4rem" }}
        >
            <div className="absolute inset-0 opacity-10 bg-[url('https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg')] bg-cover bg-center"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-[#ec2626]/10"
                        style={{
                            width: `${Math.random() * 100 + 20}px`,
                            height: `${Math.random() * 100 + 20}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `pulse ${Math.random() * 10 + 10}s infinite alternate`
                        }}
                    />
                ))}
            </div>

            <div ref={containerRef} className="relative flex gap-16 z-10">
                {/* Left Eye */}
                <div className={`w-[18vw] h-[18vw] flex items-center justify-center rounded-full shadow-2xl relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-zinc-100 to-gray-200 border-8 border-zinc-700' : 'bg-gradient-to-br from-zinc-300 to-gray-100 border-4 border-zinc-400'}`}>
                    {/* Eye reflection */}
                    <div className="absolute top-8 left-8 w-1/4 h-1/4 bg-white/40 rounded-full blur-sm"></div>

                    <div className={`w-2/3 h-2/3 relative rounded-full shadow-inner ${isDark ? 'bg-gradient-to-br from-zinc-900 to-black' : 'bg-gradient-to-br from-zinc-700 to-zinc-900'}`}>
                        {/* Iris */}
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#ec2626] to-[#f9ab1c] flex items-center justify-center">
                            {/* Pupil with dynamic scaling */}
                            <div
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${pupilScale})`,
                                }}
                                className="line w-full h-12 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-transform duration-100"
                            >
                                <div className={`w-[2.5vw] h-[2.5vw] rounded-full shadow-lg ${isDark ? 'bg-zinc-100' : 'bg-zinc-200'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Eye */}
                <div className={`w-[18vw] h-[18vw] flex items-center justify-center rounded-full shadow-2xl relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-zinc-100 to-gray-200 border-8 border-zinc-700' : 'bg-gradient-to-br from-zinc-300 to-gray-100 border-4 border-zinc-400'}`}>
                    {/* Eye reflection */}
                    <div className="absolute top-8 left-8 w-1/4 h-1/4 bg-white/40 rounded-full blur-sm"></div>

                    <div className={`w-2/3 h-2/3 relative rounded-full shadow-inner ${isDark ? 'bg-gradient-to-br from-zinc-900 to-black' : 'bg-gradient-to-br from-zinc-700 to-zinc-900'}`}>
                        {/* Iris */}
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#ec2626] to-[#f9ab1c] flex items-center justify-center">
                            {/* Pupil with dynamic scaling */}
                            <div
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${pupilScale})`,
                                }}
                                className="line w-full h-12 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-transform duration-100"
                            >
                                <div className={`w-[2.5vw] h-[2.5vw] rounded-full shadow-lg ${isDark ? 'bg-zinc-100' : 'bg-zinc-200'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`absolute bottom-20 uppercase font-bold tracking-widest text-lg flex items-center ${isDark ? 'text-white' : 'text-black'}`}>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                Real-time System Monitoring Active
            </div>

            {/* Custom styles for animations */}
            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.05; transform: scale(1); }
                    100% { opacity: 0.15; transform: scale(1.2); }
                }
            `}</style>
        </div>
    );
}

export default Eyes;
