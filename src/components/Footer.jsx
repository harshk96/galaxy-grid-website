import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ isDark }) => {
    const containerRef = useRef(null);

    const headingLinesRef = useRef([]);
    const buttonsRef = useRef([]);
    const bigTextRef = useRef(null);
    const bgTextRef = useRef(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            /* ================= CTA HEADINGS ================= */
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "top center",
                    scrub: 1.2,
                },
            })
                .from(headingLinesRef.current, {
                    y: 80,
                    rotateX: -60,
                    opacity: 0,
                    transformOrigin: "left center",
                    stagger: 0.15,
                    ease: "power3.out",
                })
                .to(headingLinesRef.current, {
                    letterSpacing: "0.08em",
                    duration: 1,
                });

            /* ================= MASSIVE CENTER TEXT ================= */
            gsap.fromTo(
                bigTextRef.current,
                {
                    y: 160,
                    scale: 0.96,
                },
                {
                    y: -160,
                    scale: 1.04,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: true,
                    },
                }
            );

            /* ================= BACKGROUND FLOATING TEXT ================= */
            gsap.fromTo(
                bgTextRef.current,
                { y: 0 },
                {
                    y: -220,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        end: "bottom bottom",
                        scrub: 0.4,
                    },
                }
            );

            /* ================= BUTTON MICRO PARALLAX ================= */
            gsap.to(buttonsRef.current, {
                y: -12,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 65%",
                    end: "top 35%",
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={containerRef}
            id="contact"
            className={`w-full min-h-screen flex flex-col justify-between p-8 md:p-20 relative overflow-hidden
        ${isDark ? "bg-zinc-900 text-white" : "bg-zinc-100 text-black"}`}
            style={{ borderTopLeftRadius: "2rem", borderTopRightRadius: "2rem" }}
        >
            {/* ================= CTA SECTION ================= */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-24">
                <div className="uppercase font-bold text-3xl md:text-5xl leading-none tracking-tighter perspective-500">
                    <h2
                        ref={(el) => (headingLinesRef.current[0] = el)}
                        className="-mb-2 origin-left"
                    >
                        Ready to
                    </h2>
                    <h2
                        ref={(el) => (headingLinesRef.current[1] = el)}
                        className="origin-left"
                    >
                        Start the project?
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        ref={(el) => (buttonsRef.current[0] = el)}
                        className="px-8 py-4 rounded-full border border-current uppercase font-medium transition-all hover:bg-purple-500 hover:border-purple-500 hover:text-white"
                    >
                        Start a Project
                    </button>

                    <button
                        ref={(el) => (buttonsRef.current[1] = el)}
                        className="px-8 py-4 rounded-full border border-current uppercase font-medium transition-all hover:bg-purple-500 hover:border-purple-500 hover:text-white"
                    >
                        info@galaxygrid.com
                    </button>
                </div>
            </div>

            {/* ================= MASSIVE TEXT ================= */}
            <div className="flex-1 flex items-center justify-center py-10">
                <div className="w-full border-t border-b border-zinc-500/30 py-10 overflow-visible">
                    <h1
                        ref={bigTextRef}
                        className="text-[12vw] leading-[0.8] font-bold uppercase text-center tracking-tighter whitespace-nowrap"
                    >
                        Galaxy Grid
                    </h1>
                </div>
            </div>

            {/* ================= LINKS ================= */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mt-10">
                <div className="flex flex-col gap-2">
                    <h3 className="uppercase font-bold mb-2 opacity-50">Sitemap</h3>
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/services" className="hover:underline">Services</Link>
                    <Link to="/#about" className="hover:underline">About</Link>
                    <Link to="/#contact" className="hover:underline">Contact</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="uppercase font-bold mb-2 opacity-50">Socials</h3>
                    <a href="#" className="hover:underline">LinkedIn</a>
                    <a href="#" className="hover:underline">Instagram</a>
                    <a href="#" className="hover:underline">Twitter</a>
                    <a href="#" className="hover:underline">Facebook</a>
                </div>

                <div className="flex flex-col gap-2 text-right md:text-left">
                    <p className="opacity-50 text-sm">
                        © {new Date().getFullYear()} Galaxy Grid Technologies.
                    </p>
                    <p className="opacity-50 text-sm">All rights reserved.</p>
                </div>
            </div>

            {/* ================= BACKGROUND TEXT ================= */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-5">
                <h1
                    ref={bgTextRef}
                    className="text-[13vw] font-bold uppercase leading-none text-center whitespace-nowrap"
                >
                    Technologies
                </h1>
            </div>
        </footer>
    );
};

export default Footer;
