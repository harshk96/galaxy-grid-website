import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function Marquee() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Physics-based scroll reaction for the background text
    const xRaw = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const xSpring = useSpring(xRaw, { stiffness: 40, damping: 20 });

    const words = ["Digital Systems", "Cloud Infrastructure", "Cyber Security", "Web Engineering", "AI Automation", "Network Solutions"];

    return (
        <section 
            ref={containerRef} 
            className="relative w-full py-24 overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-700"
        >
            {/* 1. THE GRADIENT MASK (The secret to high-end design) */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-64 z-30 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-64 z-30 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none" />
            
            {/* Dynamic floating particles - Reduced count for cleaner look */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-[#ec2626]"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* 2. BACKGROUND FLOWING TEXT (Massive & Subtle) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.07] pointer-events-none select-none">
                <motion.div style={{ x: xSpring }} className="flex whitespace-nowrap">
                    <span className="text-[20vw] font-black uppercase italic tracking-tighter">
                        GALAXY GRID • GALAXY GRID • GALAXY GRID • GALAXY GRID •
                    </span>
                </motion.div>
            </div>

            {/* 3. MAIN INTERACTIVE MARQUEE */}
            <div className="relative z-20 flex flex-col gap-8">
                <div className="flex overflow-hidden group">
                    <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex items-center whitespace-nowrap"
                    >
                        {/* Render twice for seamless loop */}
                        {[...Array(2)].map((_, idx) => (
                            <div key={idx} className="flex items-center">
                                {words.map((word, i) => (
                                    <div key={i} className="flex items-center px-8 md:px-12 group/item">
                                        <h2 className="text-[6vw] md:text-[4vw] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 transition-all duration-500 group-hover/item:text-[#ec2626]">
                                            {word}
                                        </h2>
                                        <div className="mx-8 md:mx-12">
                                            <div className="w-2 h-2 rounded-full bg-[#ec2626] shadow-[0_0_15px_rgba(236,38,38,0.8)]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* 4. TECH-LINE FOOTER */}
            <div className="mt-20 px-12 flex flex-col items-center gap-4">
                <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] tracking-[0.4em] font-mono text-zinc-400 uppercase">
                        System.Status: <span className="text-zinc-900 dark:text-zinc-100 font-bold">Operational</span>
                    </span>
                </div>
            </div>

            <style jsx>{`
                .font-outline {
                    -webkit-text-stroke: 1px currentColor;
                    color: transparent;
                }
            `}</style>
        </section>
    );
}

export default Marquee;