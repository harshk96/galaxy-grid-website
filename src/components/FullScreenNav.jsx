import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const FullScreenNav = ({ isOpen, onClose, lenisRef, isDark = true }) => {
    const containerRef = useRef(null);
    const sidebarRef = useRef(null);
    const backdropRef = useRef(null);
    const tl = useRef(null);
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.set(sidebarRef.current, { x: "100%" });
        gsap.set(backdropRef.current, { opacity: 0, pointerEvents: "none" });
        gsap.set('.nav-link', { x: 50, opacity: 0 });

        tl.current = gsap.timeline({ paused: true })
            .to(backdropRef.current, {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.3,
                ease: "power2.out"
            })
            .to(sidebarRef.current, {
                x: "0%",
                duration: 0.5,
                ease: "power4.out"
            }, "-=0.2")
            .to('.nav-link', {
                x: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.3");

        // Cleanup function
        return () => {
            if (tl.current) {
                tl.current.kill();
            }
        };
    }, { scope: containerRef });

    useEffect(() => {
        if (isOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isOpen]);

    const handleLinkClick = (e, path) => {
        e.preventDefault();
        onClose();

        // Small delay to allow the menu to close before navigating
        setTimeout(() => {
            // Handle internal navigation
            if (path === '/') {
                navigate('/');
                // Scroll to top after navigation
                setTimeout(() => {
                    if (lenisRef && lenisRef.current) {
                        lenisRef.current.scrollTo(0);
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 100);
            } else if (path === '/services') {
                navigate('/services');
                // Scroll to top after navigation
                setTimeout(() => {
                    if (lenisRef && lenisRef.current) {
                        lenisRef.current.scrollTo(0);
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 100);
            } else if (path.startsWith('/services/')) {
                // Navigate to specific service detail page
                navigate(path);
            } else if (path.startsWith('#')) {
                // Handle anchor links on current page
                const id = path.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    if (lenisRef && lenisRef.current) {
                        const offsetTop = element.offsetTop;
                        lenisRef.current.scrollTo(offsetTop, { offset: -100 });
                    } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } else if (path.includes('#')) {
                // Handle navigation with hash (e.g. /services#web-dev)
                const [pathname, hash] = path.split('#');
                navigate(pathname);

                // After navigation, scroll to the element with the hash
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        if (lenisRef && lenisRef.current) {
                            const offsetTop = element.offsetTop;
                            lenisRef.current.scrollTo(offsetTop, { offset: -100 });
                        } else {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 300); // Give time for page to load
            } else {
                // Regular navigation
                navigate(path);
            }
        }, 300);
    };

    const links = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "About", path: "/#about" },
        { id: 3, name: "All Services", path: "/services" },
        { id: 4, name: "Web Dev", path: "/services/web-dev" },
        { id: 5, name: "AI Automation", path: "/services/ai-automation" },
        { id: 6, name: "Servers", path: "/services/server" },
        { id: 7, name: "Network", path: "/services/network" },
        { id: 8, name: "Security", path: "/services/security" },
        { id: 9, name: "Contact", path: "/#contact" }
    ];

    return (
        <div ref={containerRef} className="fixed inset-0 z-[60] pointer-events-none">
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={onClose}
                className={`absolute inset-0 backdrop-blur-sm pointer-events-none ${isDark ? 'bg-black/60' : 'bg-black/40'}`}
            ></div>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`absolute top-0 right-0 h-full w-full sm:w-[400px] md:w-[450px] p-8 sm:p-10 flex flex-col pointer-events-auto shadow-2xl ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}
            >
                <button
                    onClick={onClose}
                    className={`self-end text-sm font-bold uppercase tracking-widest transition-colors mb-16 sm:mb-20 ${isDark ? 'hover:text-purple-500' : 'hover:text-purple-600'}`}
                >
                    Close
                </button>

                <div className="flex flex-col gap-6 sm:gap-8">
                    {links.map((link) => (
                        <a
                            key={link.id}
                            href={link.path}
                            className={`nav-link text-2xl sm:text-3xl md:text-4xl font-bold uppercase transition-colors cursor-pointer ${isDark ? 'hover:text-purple-500' : 'hover:text-purple-600'}`}
                            onClick={(e) => handleLinkClick(e, link.path)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className={`mt-auto pt-8 sm:pt-10 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <p className={`text-sm mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Get in touch</p>
                    <a href="mailto:info@galaxygrid.com" className={`block text-lg sm:text-xl transition-colors ${isDark ? 'hover:text-purple-500' : 'hover:text-purple-600'}`}>info@galaxygrid.com</a>
                </div>
            </div>
        </div>
    );
};

export default FullScreenNav;
