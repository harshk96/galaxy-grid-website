import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import ImageWithFallback from '../components/ImageWithFallback';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, MoveRight, Layers, Workflow, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = ({ isDark }) => {
    const { id } = useParams();
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const service = useMemo(() => servicesData.find(s => s.id === id), [id]);
    
    // Debugging - uncomment to see service data in console
    // useEffect(() => {
    //     if (service) {
    //         console.log('Service data:', service);
    //         console.log('Features:', service.features);
    //     }
    // }, [service]);

    const { nextService, prevService } = useMemo(() => {
        const currentIndex = servicesData.findIndex(s => s.id === id);
        if (currentIndex === -1) return { nextService: null, prevService: null };
        return {
            nextService: servicesData[(currentIndex + 1) % servicesData.length],
            prevService: servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length]
        };
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Refresh ScrollTrigger after loading
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    useGSAP(() => {
        if (isLoading || !service) return;

        const ctx = gsap.context(() => {
            // Initial reveal
            const tl = gsap.timeline();

            tl.from(".hero-reveal", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.3
            });

            // Parallax Hero
            gsap.to(".hero-image", {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Generic section triggers
            const sections = gsap.utils.toArray(".reveal-section");
            sections.forEach(section => {
                const revealItems = section.querySelectorAll(".reveal-item");
                if (revealItems.length > 0) {
                    gsap.from(revealItems, {
                        y: 30,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.08,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    });
                }
            });

            // Sticky Vision Implementation
            if (window.innerWidth > 1024) {
                ScrollTrigger.create({
                    trigger: ".vision-container",
                    start: "top 100px",
                    end: "bottom bottom",
                    pin: ".vision-image-wrapper",
                    pinSpacing: false,
                    invalidateOnRefresh: true
                });
            }

            // Magnetic Buttons
            const magneticElements = gsap.utils.toArray(".magnetic-btn");
            magneticElements.forEach((el) => {
                const moveEl = (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(el, {
                        x: x * 0.25,
                        y: y * 0.25,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                };
                const resetEl = () => {
                    gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: "elastic.out(1, 0.5)"
                    });
                };
                el.addEventListener("mousemove", moveEl);
                el.addEventListener("mouseleave", resetEl);
            });

        }, containerRef);

        return () => ctx.revert();
    }, [isLoading, service]);

    if (isLoading) {
        return (
            <div className={`h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-40">Loading Experience</span>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className={`h-screen flex flex-col items-center justify-center gap-8 px-6 text-center transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>
                <h2 className="text-5xl font-black uppercase tracking-tighter">Service Not Found</h2>
                <p className="text-xl max-w-2xl opacity-60 font-light italic">The requested service could not be located. It may have been archived or moved.</p>
                <Link to="/services" className="px-10 py-5 bg-purple-600 text-white rounded-full font-bold uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20 active:scale-95">
                    Explore Our Services
                </Link>
            </div>
        );
    }

    // Check if service data is complete
    if (!service.features) {
        console.warn('Service features data is missing for:', service.id);
    }

    const accentText = "text-purple-500";
    const accentBg = "bg-purple-600";
    const borderClass = isDark ? "border-white/5" : "border-zinc-200";
    const cardBg = isDark ? "bg-white/[0.03]" : "bg-zinc-50";

    return (
        <div ref={containerRef} className={`min-h-screen selection:bg-purple-500 selection:text-white transition-colors duration-500 ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>

            {/* Hero Section */}
            <section id="hero" className="relative h-[90vh] md:h-screen w-full flex items-center overflow-hidden px-6">
                <div className="absolute inset-0 z-0">
                    <div className="hero-image h-full w-full">
                        <ImageWithFallback
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover scale-105"
                        />
                    </div>
                    <div className={`absolute inset-0 z-10 ${isDark ? 'bg-zinc-950/70' : 'bg-white/80'} backdrop-blur-[1px]`}></div>
                    <div className={`absolute inset-0 z-20 bg-gradient-to-b ${isDark ? 'from-transparent via-zinc-950/40 to-zinc-950' : 'from-transparent via-white/40 to-white'}`}></div>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-30">
                    <div className="hero-reveal inline-flex items-center gap-3 px-5 py-2 rounded-full border mb-10 text-xs font-bold uppercase tracking-[0.4em] backdrop-blur-md bg-white/5 border-white/10">
                        <Sparkles size={14} className={accentText} />
                        <span className={isDark ? 'text-white/80' : 'text-zinc-600'}>Capability Profile</span>
                    </div>

                    <h1 className="hero-reveal text-[13vw] md:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter mb-10 max-w-[12ch]">
                        {service.title.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h1>

                    <p className={`hero-reveal text-xl md:text-3xl font-light max-w-3xl leading-relaxed mb-16 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {service.desc || service.tagline}
                    </p>

                    <div className="hero-reveal flex flex-wrap gap-8">
                        <button className={`magnetic-btn px-10 py-5 ${accentBg} text-white rounded-full font-bold uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-transform duration-300 shadow-2xl shadow-purple-500/30`}>
                            Start Project <MoveRight size={20} />
                        </button>
                        <button className={`magnetic-btn px-10 py-5 border rounded-full font-bold uppercase tracking-widest hover:bg-current/5 transition-all ${isDark ? 'border-white/10 text-white' : 'border-zinc-200 text-zinc-900'}`}>
                            Case Studies
                        </button>
                    </div>
                </div>

                {/* Vertical Scroll Indicator */}
                <div className="absolute bottom-12 left-10 z-30 hidden lg:flex flex-col items-center gap-6 opacity-30">
                    <span className="text-[10px] font-bold uppercase tracking-[0.6em] vertical-text">Scroll</span>
                    <div className="w-px h-20 bg-gradient-to-b from-current to-transparent"></div>
                </div>
            </section>

            {/* Vision & Overview Section */}
            <section className="vision-container py-32 md:py-56 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
                    <div className="order-2 lg:order-1 vision-image-wrapper">
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/10">
                            <ImageWithFallback
                                src={service.image}
                                alt="Vision Overview"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-zinc-950/60' : 'from-white/40'} to-transparent opacity-80`}></div>

                            {/* Decorative badge */}
                            <div className="absolute top-8 left-8 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hidden md:block">
                                <Layers className={accentText} size={32} />
                                <div className="mt-4">
                                    <p className="text-2xl font-black leading-none text-white">Top Tier</p>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Quality Standard</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 flex flex-col justify-center space-y-12 reveal-section">
                        <div className="reveal-item">
                            <span className={`text-sm font-bold uppercase tracking-[0.4em] mb-6 block ${accentText}`}>The Vision</span>
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                                Redefining <br />
                                <span className={`italic font-light ${isDark ? 'text-white/60' : 'text-zinc-400'}`}>Standards</span>
                            </h2>
                            <div className={`w-24 h-1.5 ${accentBg} rounded-full`}></div>
                        </div>

                        <div className="reveal-item space-y-8">
                            <p className={`text-xl md:text-2xl leading-relaxed font-light ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                {service.fullDesc || service.overview}
                            </p>
                            <p className={`text-lg leading-relaxed font-light opacity-60 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                Our approach combines deep technical expertise with a profound understanding of modern business requirements, ensuring that every solution we build is not just functional, but transformative and future-proof.
                            </p>
                        </div>

                        <div className="reveal-item grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
                            <div>
                                <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-3 opacity-40">Methodology</h4>
                                <p className="text-lg font-medium italic">Agile Innovation</p>
                            </div>
                            <div>
                                <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-3 opacity-40">Expertise</h4>
                                <p className="text-lg font-medium italic">Production Grade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Capabilities Grid */}
            <section className={`py-32 md:py-64 px-6 relative reveal-section overflow-hidden ${isDark ? 'bg-zinc-900/20' : 'bg-zinc-50/50'}`}>
                {/* Decorative background text */}
                <div className={`absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black opacity-[0.02] whitespace-nowrap select-none pointer-events-none uppercase tracking-tighter z-0`}>
                    Capabilities • Innovation • Excellence
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24 md:mb-32 reveal-item">
                        <span className={`text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block ${accentText}`}>Our Toolkit</span>
                        <h2 className="text-4xl md:text-[7vw] font-black uppercase tracking-tighter leading-none mb-6 md:mb-8">Core Capabilities</h2>
                        <div className="max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {service.features && service.features.length > 0 ? (
                            service.features.map((feature, i) => (
                                <div key={i} className={`reveal-item group p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-700 hover:shadow-2xl flex flex-col items-start ${isDark ? 'bg-zinc-950/40 border-white/5 hover:border-purple-500/30' : 'bg-white border-zinc-100 hover:border-purple-500/30 shadow-lg'}`}>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>
                                        {feature.icon ? <feature.icon size={28} /> : <Zap size={28} />}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-purple-500 transition-colors">{feature.title}</h3>
                                    <p className={`text-base md:text-lg leading-relaxed font-light opacity-60 flex-1`}>{feature.desc}</p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16">
                                <p className="text-xl opacity-60">No capabilities available for this service.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Technologies Marquee */}
            {service.technologies && (
                <section className={`py-20 border-y ${borderClass} overflow-hidden bg-transparent`}>
                    <div className="flex whitespace-nowrap gap-16 py-4">
                        {[1, 2, 3].map((set) => (
                            <div key={set} className="flex gap-16 animate-marquee shrink-0">
                                {service.technologies.map((tech, i) => (
                                    <span key={i} className="text-5xl md:text-7xl font-black uppercase tracking-tighter opacity-10 hover:opacity-100 hover:text-purple-500 transition-all duration-500 cursor-default flex items-center gap-16">
                                        {tech} <span className="w-4 h-4 rounded-full bg-purple-500/20"></span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Production Roadmap / Process */}
            <section className="py-32 md:py-64 px-6 reveal-section">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12 reveal-item">
                        <div className="max-w-3xl">
                            <span className={`text-sm font-bold uppercase tracking-[0.4em] mb-6 block ${accentText}`}>The Roadmap</span>
                            <h2 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-8">Production <br />Process</h2>
                        </div>
                        <p className="max-w-md text-xl md:text-2xl font-light opacity-50 italic border-l-4 border-purple-500/30 pl-8 pb-4">
                            A battle-tested methodology designed for high-performance delivery.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {service.process?.map((step, i) => (
                            <div key={i} className={`reveal-item group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-10 md:p-14 rounded-[3.5rem] border transition-all duration-700 ${isDark ? 'border-white/5 hover:bg-white/[0.04]' : 'border-zinc-100 hover:bg-zinc-50 shadow-sm'}`}>
                                <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-current/10 pb-6 lg:pb-0 lg:pr-10">
                                    <div className="text-6xl font-black opacity-10 group-hover:opacity-100 group-hover:text-purple-500 transition-all duration-500">
                                        0{i + 1}
                                    </div>
                                </div>
                                <div className="lg:col-span-3">
                                    <h3 className="text-3xl font-bold uppercase tracking-tight">{step.title}</h3>
                                </div>
                                <div className="lg:col-span-6">
                                    <p className={`text-xl font-light leading-relaxed opacity-60 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        {step.desc}
                                    </p>
                                </div>
                                <div className="lg:col-span-2 flex justify-center lg:justify-end">
                                    <div className={`w-16 h-16 rounded-full border border-current/10 flex items-center justify-center scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700`}>
                                        <Workflow size={24} className={accentText} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pagination Navigation */}
            <section className={`py-32 px-6 border-t ${borderClass}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 reveal-section">
                        {prevService && (
                            <Link to={`/services/${prevService.id}`} className={`reveal-item group relative h-[500px] rounded-[4rem] border ${borderClass} overflow-hidden p-14 flex flex-col justify-between transition-all duration-700 hover:border-purple-500/40 shadow-xl`}>
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 grayscale group-hover:grayscale-0">
                                    <img src={prevService.image} alt={prevService.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40 mb-6 block">Previous capability</span>
                                    <h4 className="text-5xl md:text-6xl font-black uppercase tracking-tighter group-hover:translate-x-6 transition-transform duration-700 leading-none">
                                        {prevService.title}
                                    </h4>
                                </div>
                                <div className="relative z-10 flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.6em] opacity-40 group-hover:opacity-100 transition-all">
                                    <ArrowLeft size={16} /> Explore Project
                                </div>
                            </Link>
                        )}
                        {nextService && (
                            <Link to={`/services/${nextService.id}`} className={`reveal-item group relative h-[500px] rounded-[4rem] border ${borderClass} overflow-hidden p-14 flex flex-col justify-between items-end text-right transition-all duration-700 hover:border-purple-500/40 shadow-xl`}>
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 grayscale group-hover:grayscale-0">
                                    <img src={nextService.image} alt={nextService.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40 mb-6 block">Next capability</span>
                                    <h4 className="text-5xl md:text-6xl font-black uppercase tracking-tighter group-hover:-translate-x-6 transition-transform duration-700 leading-none">
                                        {nextService.title}
                                    </h4>
                                </div>
                                <div className="relative z-10 flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.6em] opacity-40 group-hover:opacity-100 transition-all">
                                    View Service <ArrowRight size={16} />
                                </div>
                            </Link>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 reveal-section">
                        <Link to="/services" className="reveal-item flex items-center gap-4 hover:text-purple-500 transition-colors py-4">
                            <ArrowLeft size={14} /> Back to Hub
                        </Link>
                        <div className="reveal-item hidden md:block">Est. 2024 • Galaxy Grid Technologies</div>
                        <div className="reveal-item">Privacy Policy / Terms</div>
                    </div>
                </div>
            </section>

            {/* Custom Styles for Vertical Text */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
};

export default ServiceDetail;