import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const AboutSection = ({ isDark }) => {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);
    const stagesRef = useRef([]);
    const imagesRef = useRef([]);
    const textWrapperRef = useRef(null);

    const stages = [
        {
            title: "Strategy First",
            desc: "We design scalable infrastructure aligned with business goals.",
            img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
        },
        {
            title: "Security by Design",
            desc: "Security is embedded into every layer of our systems.",
            img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
        },
        {
            title: "Automation at Scale",
            desc: "We automate workflows to reduce cost and human error.",
            img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 0.3,
                pin: pinRef.current,
                anticipatePin: true,
                invalidateOnRefresh: true,
                ease: "power2.out"
            },
        });

        stages.forEach((_, i) => {
            const stage = stagesRef.current[i];
            const image = imagesRef.current[i];

            // Text Animation with modern effects
            tl.fromTo(
                stage,
                {
                    opacity: 0,
                    y: 100,
                    rotationX: -90,
                    transformPerspective: 1000
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)"
                }
            );

            // Enhanced Image Animation
            if (i === 0) {
                tl.fromTo(image,
                    { opacity: 1 },
                    { opacity: 1, duration: 1 },
                    "<"
                );
            } else {
                tl.fromTo(image,
                    {
                        opacity: 0,
                        scale: 1.2,
                        rotation: 5,
                        filter: "blur(10px)"
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        filter: "blur(0px)",
                        duration: 1.5,
                        ease: "expo.out"
                    },
                    "<"
                );
            }

            // Exit Animation with modern effects
            if (i !== stages.length - 1) {
                tl.to(stage,
                    {
                        opacity: 0,
                        y: -100,
                        rotationX: 90,
                        duration: 1,
                        ease: "back.in(1.2)"
                    },
                    "+=0.2"
                );
                tl.to(image,
                    {
                        opacity: 0,
                        scale: 0.8,
                        rotation: -5,
                        filter: "blur(5px)",
                        duration: 1,
                        ease: "power2.inOut"
                    },
                    "<"
                );
            }
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="about"
            className={`relative w-full border-t ${isDark ? "bg-[#18181b] text-white border-zinc-800" : "bg-[#f4f4f5] text-black border-zinc-200"}`}
            style={{ borderTopLeftRadius: "4rem", borderTopRightRadius: "4rem", marginTop: "-4rem" }}
        >
            {/* PINNED AREA */}
            <div
                ref={pinRef}
                className="h-screen w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20"
            >
                {/* LEFT TEXT */}
                <div
                    ref={textWrapperRef}
                    className="w-full md:w-1/2 relative h-[40vh] md:h-[50vh] flex items-center"
                >
                    {stages.map((stage, i) => (
                        <div
                            key={i}
                            ref={(el) => (stagesRef.current[i] = el)}
                            className="absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-0"
                        >
                            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-[0.9]">
                                {stage.title}
                            </h2>
                            <p className={`text-lg md:text-xl font-mono max-w-md ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                {stage.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* RIGHT IMAGE */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden relative shadow-2xl">
                    {stages.map((stage, i) => (
                        <div
                            key={i}
                            ref={(el) => (imagesRef.current[i] = el)}
                            className="absolute inset-0 w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${stage.img})`,
                                opacity: i === 0 ? 1 : 0,
                                zIndex: i
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;