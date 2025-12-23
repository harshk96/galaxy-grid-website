import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ isDark }) => {
    const containerRef = useRef(null);
    const textWrapRef = useRef(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            /* ============================
               INTRO ANIMATION (ON LOAD)
            ============================ */
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(".hero-line", {
                y: 120,
                opacity: 0,
                duration: 1.2,
                stagger: 0.12,
            })
                .from(
                    ".hero-cta",
                    {
                        y: 40,
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.8,
                    },
                    "-=0.4"
                );

            /* ============================
               SCROLL PARALLAX (SUBTLE)
            ============================ */
            gsap.to(textWrapRef.current, {
                y: -80,
                scale: 0.98,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                ease: "none",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full h-screen flex items-center justify-center relative z-10 overflow-hidden px-4"
        >
            <div
                ref={textWrapRef}
                className="flex flex-col items-center text-center pointer-events-none"
            >
                {/* ================= HEADLINE ================= */}
                <h1
                    className={`hero-line text-[8vw] md:text-[5vw] font-bold uppercase leading-[0.9] tracking-tighter mb-6
            ${isDark ? "text-white" : "text-black"}`}
                >
                    Empower Your Business <br />
                   <span className="bg-gradient-to-r from-[#ec2626] to-[#f9ab1c] bg-clip-text text-transparent">
  With Reliable IT
</span>

                </h1>

                {/* ================= SUBTEXT ================= */}
                <p
                    className={`hero-line text-lg md:text-2xl font-mono max-w-3xl mb-12
            ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
                >
                    Zero Downtime, Total Peace of Mind. We don’t just sell products — we
                    solve problems to keep your business running smoothly.
                </p>

                {/* ================= CTA ================= */}
                <div className="hero-cta flex flex-col md:flex-row gap-6 pointer-events-auto">
                    <button
                        className={`px-10 py-4 rounded-full font-bold text-lg transition-all duration-300
              hover:scale-105 active:scale-95
              ${isDark
                                ? "bg-white text-black hover:bg-[#ec2626] hover:text-white"
                                : "bg-black text-white hover:bg-[#ec2626]"}
                            }`}
                    >
                        Get Free IT Audit
                    </button>

                    <Link
                        to="/services"
                        className={`px-10 py-4 rounded-full font-bold text-lg border-2 transition-all duration-300
              hover:scale-105 active:scale-95 flex items-center justify-center
              ${isDark
                                ? "border-white text-white hover:bg-white hover:text-black"
                                : "border-black text-black hover:bg-black hover:text-white"
                            }`}
                    >
                        Explore Services
                    </Link>
                </div>
            </div>

            {/* ================= BACKGROUND ACCENT ================= */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-5 flex flex-col items-center justify-center space-y-4">
                <h1 className="text-[8vw] md:text-[6vw] font-bold uppercase text-center">
                    Galaxy Grid
                </h1>
                <h1 className="text-[15vw] md:text-[12vw] font-bold uppercase text-center">
                    Technology
                </h1>
            </div>
        </section>
    );
};

export default Hero;
