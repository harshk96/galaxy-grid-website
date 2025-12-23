    import React, { useRef, useEffect } from "react";
    import { Link, useLocation } from "react-router-dom";
    import { servicesData } from "../data/services";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { useGSAP } from "@gsap/react";

    gsap.registerPlugin(ScrollTrigger);

    const HomeServices = ({ isDark }) => {
        const sectionRef = useRef(null);
        const cardsRef = useRef([]);
        const location = useLocation();

        // Prioritize services for home - focusing on core infrastructure and security
        const priorityIds = ["web-dev","network", "server", "security", "cloud", "amc"];
        const displayServices = servicesData.filter(service =>
            priorityIds.includes(service.id)
        );

        // Refresh ScrollTrigger after navigation
        useEffect(() => {
            const timer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);

            return () => clearTimeout(timer);
        }, [location.pathname]);

        useGSAP(() => {
            // Kill any existing ScrollTriggers for this section
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === sectionRef.current ||
                    (trigger.trigger && sectionRef.current?.contains(trigger.trigger))) {
                    trigger.kill();
                }
            });

            const ctx = gsap.context(() => {
                /* ============================
                SECTION TITLE ANIMATION
                ============================ */
                gsap.fromTo(
                    ".services-title",
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                            invalidateOnRefresh: true,
                        },
                    }
                );

                /* ============================
                CARDS ENTRANCE ANIMATION
                ============================ */
                gsap.utils.toArray(".service-card").forEach((card, i) => {
                    gsap.fromTo(
                        card,
                        {
                            y: 100,
                            opacity: 0,
                            scale: 0.9,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.8,
                            delay: i * 0.1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 90%",
                                toggleActions: "play none none reverse",
                                invalidateOnRefresh: true,
                            },
                        }
                    );
                });
            }, sectionRef);

            return () => ctx.revert();
        }, [location.pathname]);

        return (
            <section
                ref={sectionRef}
                className={`w-full py-32 px-6 md:px-10 overflow-hidden relative
            ${isDark ? "bg-zinc-900 text-white border-t border-zinc-800" : "bg-zinc-100 text-black border-t border-zinc-200"}`}
                style={{ borderTopLeftRadius: "4rem", borderTopRightRadius: "4rem", marginTop: "-4rem" }}
            >
                <div className="max-w-7xl mx-auto">
                    {/* ================= HEADER ================= */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 pb-6 border-b border-zinc-700">
                        <div>
                            <div className="inline-block px-4 py-1 rounded-full border border-[#ec2626]/50 bg-[#ec2626]/10 text-[#ec2626] text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">
                                OUR EXPERTISE
                            </div>
                            <h2 className="services-title text-4xl md:text-7xl font-bold uppercase tracking-tighter">
                                Core Services
                            </h2>
                            <p className="services-title mt-4 text-lg max-w-2xl text-zinc-500">
                                Core infrastructure and security services designed to keep your business running smoothly and securely
                            </p>
                        </div>

                        <div className="services-title mt-6 md:mt-0">
                            <Link
                                to="/services"
                                className="text-lg font-mono underline hover:text-[#ec2626] transition-colors inline-flex items-center group"
                            >
                                View All Services
                                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* ================= SERVICES GRID ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {displayServices.map((service, index) => (
                            <div
                                key={service.id}
                                ref={el => (cardsRef.current[index] = el)}
                                className="service-card group cursor-pointer"
                            >
                                <div className={`h-full p-10 rounded-3xl border relative transition-all duration-500
                    ${isDark
                                        ? "border-zinc-700 bg-zinc-800/60 hover:border-[#ec2626]/50 hover:-translate-y-2"
                                        : "border-zinc-300 bg-white hover:border-[#ec2626]/50 hover:shadow-2xl hover:-translate-y-2"
                                    }`}>
                                    {/* Icon */}
                                    <div className="text-5xl mb-8 text-[#ec2626] transition-all duration-300 group-hover:scale-110 group-hover:text-[#f9ab1c]">
                                        <service.icon />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-[#f9ab1c] transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className={`mb-8 font-mono text-base leading-relaxed
                    ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
                                    >
                                        {service.desc}
                                    </p>

                                    {/* CTA */}
                                    <Link
                                        to={`/services/${service.id}`}
                                        className="inline-flex items-center text-base font-bold uppercase tracking-wider
                    border-b-2 border-transparent group-hover:border-current transition-all group-hover:text-[#f9ab1c]"
                                    >
                                        Learn More
                                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>

                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                    bg-gradient-to-br from-[#ec2626]/10 via-transparent to-transparent" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    };

    export default HomeServices;
