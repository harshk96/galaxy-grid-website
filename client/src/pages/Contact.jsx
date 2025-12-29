import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ isDark }) => {
  const containerRef = useRef(null);
  const blobRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Creative Effect: Mouse Follower Blob
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(blobRef.current, {
        x: clientX - 150,
        y: clientY - 150,
        duration: 2,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    // Entrance Animation for the Form
    gsap.from('.contact-card', {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
      }
    });

    // Staggered reveal for contact info items
    gsap.from('.info-item', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.info-section',
        start: 'top 85%',
      }
    });
  }, { scope: containerRef });

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    projectType: 'AI Integration',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const contactMethods = [
    { title: "Email", icon: "󰇮", value: "akshay.hirpara90@gmail.com", color: "#ec2626" },
    { title: "Phone", icon: "󰏲", value: "+91 82008 54316", color: "#f9ab1c" },
    { 
      title: "Office", 
      icon: "󰋜", 
      value: [
        "210-A, Block E,",
        "Ganesh Glory 11,",
        "Near BSNL Office,",
        "SG Highway,",
        "Jagatpur, Ahmedabad,",
        "Gujarat, India"
      ],
      color: "#ec2626" 
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({
      ...prev,
      projectType: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', projectType: 'AI Integration', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(result.msg || 'Failed to submit contact form');
      }
    } catch (error) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen transition-colors duration-500 overflow-hidden ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}
    >
      {/* Creative Background Element */}
      <div 
        ref={blobRef}
        className="fixed w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none z-0 opacity-20"
        style={{ background: 'linear-gradient(to right, #ec2626, #f9ab1c)' }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-12 px-6">
        <motion.div 
          style={{ y: yRange }}
          className="text-center z-10"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-xs font-black uppercase tracking-[0.5em] mb-4 block ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}
          >
            Ready for takeoff?
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6">
            Contact <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec2626] to-[#f9ab1c]">
              The Grid
            </span>
          </h1>
        </motion.div>
      </section>

      {/* Main Content Split */}
      <section className="relative z-10 py-12 px-6 contact-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Interactive Info */}
          <div className="lg:col-span-5 space-y-12 info-section">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-4 italic">Socials & Sync</h2>
              <p className="opacity-60 max-w-sm">We don't just build grids, we build relationships. Choose your preferred method of transmission.</p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className={`info-item p-6 rounded-3xl border flex items-start gap-6 transition-colors ${
                    isDark ? 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#ec2626] text-white font-bold shadow-[0_0_20px_rgba(236,38,38,0.3)]">
                    {method.title[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{method.title}</p>
                    {Array.isArray(method.value) ? (
                      <p className="text-xl font-bold break-words">
                        {method.value.map((line, idx) => (
                          <span key={idx} className="block">{line}</span>
                        ))}
                      </p>
                    ) : (
                      <p className="text-xl font-bold break-words">{method.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#ec2626] to-[#f9ab1c] text-white shadow-2xl info-item">
              <h4 className="font-black uppercase tracking-tighter text-2xl mb-2">Global Support</h4>
              <p className="text-sm opacity-90 leading-relaxed mb-6">Our response window is typically under 12 hours. For critical infrastructure emergencies, use the priority line.</p>
              <div className="flex justify-between items-center border-t border-white/20 pt-4">
                <span className="text-xs font-bold uppercase">Uptime Monitoring</span>
                <span className="flex items-center gap-2 text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              </div>
            </div>
          </div>

          {/* Right: The Modern Form */}
          <div className="lg:col-span-7">
            <motion.div 
              className={`contact-card p-1 md:p-10 rounded-[48px] border relative ${
                isDark ? 'bg-zinc-900/20 border-zinc-800' : 'bg-white border-zinc-100 shadow-2xl'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-8 p-6 md:p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      className={`peer w-full ${isDark ? 'bg-zinc-900/30' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-zinc-700/50' : 'border-zinc-300'} py-4 px-4 rounded-xl outline-none focus:border-[#ec2626] transition-all duration-300 focus:ring-2 focus:ring-[#ec2626]/20`} 
                    />
                    <label className={`absolute left-4 -top-2 ${isDark ? 'bg-zinc-950' : 'bg-white'} px-2 text-zinc-500 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#ec2626] peer-valid:-top-6 peer-valid:text-xs`}>Your Name</label>
                  </div>
                  <div className="group relative">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className={`peer w-full ${isDark ? 'bg-zinc-900/30' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-zinc-700/50' : 'border-zinc-300'} py-4 px-4 rounded-xl outline-none focus:border-[#ec2626] transition-all duration-300 focus:ring-2 focus:ring-[#ec2626]/20`} 
                    />
                    <label className={`absolute left-4 -top-2 ${isDark ? 'bg-zinc-950' : 'bg-white'} px-2 text-zinc-500 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#ec2626] peer-valid:-top-6 peer-valid:text-xs`}>Your Email</label>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest opacity-50">What's your objective?</p>
                  <div className="flex flex-wrap gap-3">
                    {['AI Integration', 'Cloud Migration', 'Cyber Security', 'Custom Dev'].map((type) => (
                      <label key={type} className="relative cursor-pointer group">
                        <input 
                          type="radio" 
                          name="projectType"
                          value={type}
                          checked={formData.projectType === type}
                          onChange={() => handleRadioChange(type)}
                          className="peer sr-only" 
                        />
                        <span className={`px-5 py-2 rounded-full border text-sm transition-all inline-block ${
                          isDark ? 'border-zinc-800 peer-checked:bg-white peer-checked:text-black' : 'border-zinc-200 peer-checked:bg-black peer-checked:text-white'
                        }`}>
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="group relative">
                  <textarea 
                    rows="4" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                    className={`peer w-full ${isDark ? 'bg-zinc-900/30' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-zinc-700/50' : 'border-zinc-300'} py-4 px-4 rounded-xl outline-none focus:border-[#ec2626] transition-all duration-300 focus:ring-2 focus:ring-[#ec2626]/20`} 
                  />
                  <label className={`absolute left-4 -top-2 ${isDark ? 'bg-zinc-950' : 'bg-white'} px-2 text-zinc-500 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#ec2626] peer-valid:-top-6 peer-valid:text-xs`}>Project Intel</label>
                </div>

                {submitSuccess && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                    Contact form submitted successfully! We'll get back to you soon.
                  </div>
                )}
                
                {submitError && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                    {submitError}
                  </div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.02, backgroundColor: '#f9ab1c' }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-[#ec2626]'} text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-colors`}
                >
                  {isSubmitting ? 'Submitting...' : 'Initialize Contact'}
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Bottom Floating Decorative Section */}
      <section className="py-24 text-center opacity-20 hover:opacity-100 transition-opacity duration-700">
         <h4 className="text-[12vw] font-black uppercase tracking-tighter select-none whitespace-nowrap">
           FUTURE GRID GALAXY GALAXY GRID FUTURE
         </h4>
      </section>
    </div>
  );
};

export default Contact;