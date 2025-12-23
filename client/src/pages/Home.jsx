import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import HomeServices from '../components/HomeServices';
import Eyes from '../components/Eyes';
import AboutSection from '../components/AboutSection';
import Canvas3D from '../components/Canvas3D';

const Features = ({ isDark }) => {
    const features = [
        { title: "24/7 Reliability", desc: "99.9% uptime guaranteed with proactive monitoring." },
        { title: "Full-Stack Expertise", desc: "Complete solutions across Network, Server, Cloud, and AI." },
        { title: "Complete Transparency", desc: "Detailed documentation and reporting for every solution." }
    ];

    return (
        <div
            className={`w-full py-20 px-6 border-t border-b relative z-10 ${isDark ? 'border-zinc-800 bg-black text-white' : 'border-zinc-200 bg-white text-black'}`}
            style={{ borderTopLeftRadius: "4rem", borderTopRightRadius: "4rem", marginTop: "-4rem" }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                {features.map((f, i) => (
                    <div key={i} className="p-6">
                        <h3 className="text-2xl font-bold mb-2 uppercase">{f.title}</h3>
                        <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Home = ({ isDark }) => {
    return (
        <div className="relative">
            <Canvas3D isDark={isDark} />
            <div className="relative z-0">
                <Hero isDark={isDark} />
            </div>
            <div className="relative z-10">
                <Features isDark={isDark} />
            </div>
            <div className="relative z-20">
                <Marquee />
            </div>
            <div className="relative z-30">
                <AboutSection isDark={isDark} />
            </div>
            <div className="relative z-40">
                <HomeServices isDark={isDark} />
            </div>
            <div className="relative z-50">
                <Eyes isDark={isDark} />
            </div>
        </div>
    );
};

export default Home;
