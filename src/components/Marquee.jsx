import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function Marquee() {
    const marqueeRef = useRef(null);

    // Create scroll-based animations
    const { scrollYProgress } = useScroll({
        target: marqueeRef,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to various effects
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 5]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const verticalMovement = useTransform(scrollYProgress, [0, 1], [0, -20]);

    // Spring physics for smoother animations
    const springRotation = useSpring(rotation, { stiffness: 100, damping: 30 });
    const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
    const springVertical = useSpring(verticalMovement, { stiffness: 80, damping: 25 });

    return (
        <div
            ref={marqueeRef}
            className="w-full py-20 overflow-hidden relative border-t border-zinc-800"
            style={{ borderTopLeftRadius: "4rem", borderTopRightRadius: "4rem", marginTop: "-4rem" }}
        >
            {/* Animated background elements with vertical movement */}
            <motion.div
                style={{
                    rotate: springRotation,
                    scale: springScale,
                    y: springVertical
                }}
                className="absolute inset-0 opacity-10"
            >
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-500 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-cyan-400 rotate-45"></div>
            </motion.div>

            <div className="bg-[#004D43] border-y border-zinc-600 flex whitespace-nowrap overflow-hidden relative z-10">
                {[...Array(6)].map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{
                            ease: "easeInOut",
                            repeat: Infinity,
                            duration: 25,
                            delay: index * 0.5
                        }}
                        whileHover={{
                            scale: 1.1,
                            y: -10, // Vertical lift on hover
                            transition: { duration: 0.3 }
                        }}
                        className="flex shrink-0 py-8 cursor-pointer"
                    >
                        <motion.span
                            className="text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter text-white mx-12 flex items-center group"
                            animate={{
                                y: [0, -5, 0, 5, 0], // Vertical bounce animation
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.2
                            }}
                        >
                            <span className="inline-block w-6 h-6 border-2 border-purple-500 rotate-45 mr-6 group-hover:bg-purple-500 transition-all duration-300"></span>
                            <span className="group-hover:text-purple-300 transition-colors duration-300">Galaxy Grid Technologies</span>
                            <span className="inline-block w-6 h-6 border-2 border-cyan-400 ml-6 group-hover:bg-cyan-400 transition-all duration-300"></span>
                        </motion.span>
                    </motion.div>
                ))}
            </div>

            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none"></div>
        </div>
    );
}

export default Marquee;
