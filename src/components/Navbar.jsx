import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ isDark, toggleTheme, onOpenNav }) => {
    return (
        <>
            {/* Logo - Fixed Top Left */}
            <Link
                to="/"
                className={`fixed top-6 left-6 z-50 text-2xl font-bold tracking-widest uppercase ${isDark ? 'text-white' : 'text-black'}`}
            >
                GGT
            </Link>

            {/* Controls - Fixed Top Right Pill */}
            <nav className={`fixed top-6 right-6 z-50 flex items-center gap-4 px-6 py-3 rounded-full border backdrop-blur-md transition-all duration-300 ${isDark
                    ? 'bg-zinc-900/50 border-zinc-700 text-white'
                    : 'bg-white/50 border-zinc-200 text-black'
                }`}>
                <button
                    onClick={toggleTheme}
                    className="text-xs font-mono uppercase hover:text-purple-500 transition-colors"
                >
                    {isDark ? 'Light' : 'Dark'}
                </button>
                <div className={`w-[1px] h-4 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`}></div>
                <button
                    onClick={onOpenNav}
                    className="flex items-center gap-2 text-sm font-bold uppercase hover:text-purple-500 transition-colors"
                >
                    Menu <FaBars />
                </button>
            </nav>
        </>
    );
};

export default Navbar;
