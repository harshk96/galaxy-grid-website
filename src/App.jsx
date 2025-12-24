import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './components/Navbar';
import FullScreenNav from './components/FullScreenNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';

function ScrollToTop({ lenisRef }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes (but not hash)
    if (!hash) {
      // Use Lenis scroll if available, otherwise fallback to window.scrollTo
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      // Scroll to element with hash
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Use Lenis scroll if available, otherwise fallback to element.scrollIntoView
        if (lenisRef.current) {
          const offsetTop = element.offsetTop;
          lenisRef.current.scrollTo(offsetTop, { offset: -100 }); // Offset for fixed navbar
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [pathname, hash, lenisRef]);

  return null;
}

function AppContent() {
  const [isDark, setIsDark] = useState(() => {
    // Get initial theme from localStorage or default to true (dark)
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        gsap.ticker.remove(lenisRef.current.raf);
      }
    };
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update document class for CSS
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-500 ${isDark ? 'bg-transparent' : 'bg-white'}`}>
      <ScrollToTop lenisRef={lenisRef} />

      <Navbar
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
        onOpenNav={() => setIsNavOpen(true)}
      />

      <FullScreenNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        lenisRef={lenisRef}
        isDark={isDark}
      />

      <main className="relative">
        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />
          <Route path="/services" element={<ServicesPage isDark={isDark} />} />
          <Route path="/services/:id" element={<ServiceDetail isDark={isDark} />} />
        </Routes>
      </main>

      <div className="relative z-50">
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
