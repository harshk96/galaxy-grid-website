import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = ({ isDark }) => {
    const containerRef = useRef(null);
    const blobRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax & Opacity
    const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // Force ScrollTrigger refresh on mount
    useEffect(() => {
        ScrollTrigger.refresh();
    }, []);

    // Mouse Follower Blob Logic
    useEffect(() => {
        const moveBlob = (e) => {
            const { clientX, clientY } = e;
            gsap.to(blobRef.current, {
                x: clientX - 125,
                y: clientY - 125,
                duration: 1,
                ease: "power2.out"
            });
        };
        window.addEventListener('mousemove', moveBlob);
        return () => window.removeEventListener('mousemove', moveBlob);
    }, []);

    useGSAP(() => {
        // 1. Reveal Stats Grid (The Container)
        gsap.from(".stat-box", {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".stats-grid",
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });

        // 2. Numerical Counter Animation
        const counters = document.querySelectorAll(".count-up");
        counters.forEach((counter) => {
            const target = parseFloat(counter.getAttribute("data-target"));
            const suffix = counter.getAttribute("data-suffix") || "";
            
            if (!isNaN(target)) {
                const decimals = target % 1 !== 0 ? 1 : 0;
                const counterObj = { value: 0 };

                gsap.to(counterObj, {
                    value: target,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%",
                    },
                    onUpdate: () => {
                        counter.innerText = counterObj.value.toFixed(decimals) + suffix;
                    }
                });
            }
        });

        // 3. Reveal Narratives
        gsap.from('.reveal-text', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.reveal-text',
                start: 'top 85%',
            }
        });
    }, { scope: containerRef });

    const stats = [
        { num: "250", suffix: "+", label: "Infrastructures" },
        { num: "99.9", suffix: "%", label: "Reliability" },
        { num: "15", suffix: "+", label: "Awards" },
        { num: "24", suffix: "/7", label: "Sync" }
    ];

    return (
        <div
            ref={containerRef}
            className={`relative transition-colors duration-700 overflow-x-hidden ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}
        >
            {/* Background Blob */}
            <div
                ref={blobRef}
                className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none z-0 opacity-20"
                style={{ background: 'linear-gradient(to right, #ec2626, #f9ab1c)' }}
            />

            {/* Hero Section - Reduced height and padding */}
            <section className="relative min-h-[60vh] flex flex-col justify-end pt-24 pb-0 px-6 md:px-12 z-10">
                <motion.div style={{ y: textY, opacity: heroOpacity }}>
                    <span className="text-xs font-black uppercase tracking-[0.5em] text-[#ec2626] mb-4 block">
                        The Digital Architects
                    </span>
                    <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-8">
                        Defining <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec2626] to-[#f9ab1c]">
                            The Frontier
                        </span>
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center max-w-4xl">
                        <p className="text-lg opacity-60 leading-relaxed max-w-lg">
                            We build the grids that power tomorrow. Galaxy Grid is a high-performance collective engineering the next wave of infrastructure.
                        </p>
                        <div className="h-[1px] w-20 bg-[#ec2626] opacity-50" />
                    </div>
                </motion.div>
            </section>

            {/* Stats Section - Moved closer to Hero */}
            <section className="pt-20 pb-20 px-6 relative z-20">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stats-grid">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`stat-box p-8 md:p-10 rounded-[2rem] border transition-all duration-500 hover:border-[#ec2626]/50 ${
                                isDark 
                                ? 'bg-zinc-900/60 backdrop-blur-md border-zinc-800 shadow-2xl' 
                                : 'bg-zinc-50 border-zinc-200 shadow-sm'
                            }`}
                        >
                            <h3 className="text-4xl md:text-6xl font-black text-[#ec2626] mb-1 tracking-tighter">
                                <span className="count-up block" data-target={stat.num} data-suffix={stat.suffix}>
                                    0{stat.suffix}
                                </span>
                            </h3>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Narrative Section */}
            <section className="py-20 px-6 z-10 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group overflow-hidden rounded-[2.5rem] aspect-square border border-zinc-500/10">
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                            alt="Architecture"
                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                        />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none reveal-text">
                            Born to <br /><span className="italic font-light text-zinc-500">Disrupt.</span>
                        </h2>
                        <div className="space-y-4 opacity-70 text-lg reveal-text">
                            <p>Founded in 2018, we saw a gap between rigid legacy systems and the fluid speed of modern business. We bridged it.</p>
                            <p>Our philosophy is simple: Eliminate friction. We don't just provide services; we install intelligence into the core of your company.</p>
                        </div>
                        <motion.button
                            whileHover={{ x: 10 }}
                            className="flex items-center gap-6 group reveal-text mt-6"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#ec2626] text-white flex items-center justify-center text-xl shadow-lg transition-transform group-hover:rotate-[-45deg]">
                                →
                            </div>
                            <span className="font-black uppercase tracking-[0.2em] text-xs">Download Dossier</span>
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6 z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">The <br /> Operators</h2>
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em]">Precision engineering by global experts.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Alex J.", role: "Lead Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000" },
                            { name: "Sarah C.", role: "CTO / Cloud", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000" },
                            { name: "M. Rodri", role: "Security Ops", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000" },
                            { name: "E. Watson", role: "Grid Logistics", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000" }
                        ].map((member, i) => (
                            <div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-zinc-900">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-[#ec2626] text-[9px] font-black uppercase tracking-widest mb-1">{member.role}</p>
                                    <h4 className="text-lg font-black text-white">{member.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 text-center border-t border-zinc-500/10 z-10 relative">
                <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-none">
                    Sync with <br /><span className="text-zinc-500/20">the future.</span>
                </h3>
                <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-12 py-5 rounded-full bg-[#ec2626] text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl"
                >
                    Initialize Sync
                </motion.a>
            </section>
        </div>
    );
};

export default About;