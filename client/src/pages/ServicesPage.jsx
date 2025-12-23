import React, { useRef, useEffect } from 'react';
import { servicesData } from '../data/services';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = ({ isDark }) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const location = useLocation();

    const colors = [
        'from-[#ec2626] to-[#f9ab1c]',
        'from-blue-600 to-cyan-600',
        'from-green-600 to-emerald-600',
        'from-orange-600 to-red-600',
        'from-[#f9ab1c] to-[#ec2626]',
        'from-pink-600 to-rose-600',
        'from-cyan-600 to-blue-600',
        'from-emerald-600 to-teal-600',
        'from-red-600 to-orange-600',
    ];

    useEffect(() => {
        ScrollTrigger.refresh();
    }, [location.pathname]);

    useGSAP(() => {
        ScrollTrigger.getAll().forEach(t => t.kill());

        const ctx = gsap.context(() => {

            gsap.from(titleRef.current, {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            cardsRef.current.forEach(card => {
                const inner = card.querySelector('.card-inner');

                gsap.to(inner, {
                    scale: 0.92,
                    rotateX: 6,
                    filter: 'brightness(0.75)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <div className={isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-black'}>

            {/* HERO (scrolls away naturally) */}
            <section className="relative">
                <div
                    className={`sticky top-0 z-20 pt-32 pb-24 px-6 md:px-10
                    ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}
                >
                    <div ref={titleRef} className="max-w-7xl mx-auto">
                        <h1 className="text-6xl md:text-[10vw] font-bold uppercase tracking-tighter leading-[0.85] mb-8">
                            Our Services
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl font-mono opacity-70">
                            Comprehensive IT solutions delivered with cutting-edge technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* STICKY STACK */}
            <div ref={containerRef} className="relative">

                {servicesData.map((service, index) => {
                    const isLast = index === servicesData.length - 1;

                    return (
                        <section
                            key={service.id}
                            ref={el => cardsRef.current[index] = el}
                            id={service.id}
                            className={`relative ${!isLast ? 'min-h-screen' : 'h-[60vh]'}`}
                            style={{ zIndex: servicesData.length - index }}
                        >
                            <div className="sticky top-28 flex items-center justify-center px-6 md:px-10">
                                <div className="card-inner w-full max-w-6xl perspective-1000">
                                    <div className={`relative h-[520px] md:h-[620px] rounded-3xl overflow-hidden shadow-2xl
                                        ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>

                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />

                                        <div className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} opacity-80 mix-blend-multiply`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                                        <div className="relative h-full p-12 md:p-16 flex flex-col justify-between text-white">

                                            <div className="flex justify-between">
                                                <service.icon className="text-6xl md:text-7xl" />
                                                <span className="px-5 py-2 rounded-full bg-white/20 text-sm font-bold">
                                                    Service {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="text-5xl md:text-7xl font-bold uppercase mb-6">
                                                    {service.title}
                                                </h3>
                                                <p className="max-w-2xl text-lg font-mono opacity-90">
                                                    {service.desc}
                                                </p>
                                            </div>

                                            <Link
                                                to={`/services/${service.id}`}
                                                className="inline-flex w-fit items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase"
                                            >
                                                View Details →
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* GET IN TOUCH — NO GAP */}
            <section className="py-32 flex justify-center">
                <Link
                    to="/#contact"
                    className="px-12 py-6 rounded-full bg-black text-white font-bold uppercase"
                >
                    Get In Touch
                </Link>
            </section>
        </div>
    );
};

export default ServicesPage;
