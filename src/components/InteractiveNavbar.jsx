import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Cpu, Clock, Briefcase, Mail, Moon, Sun } from 'lucide-react';

const navItems = [
  { name: 'Home', id: 'home', icon: Home },
  { name: 'About', id: 'about', icon: User },
  { name: 'Skills', id: 'skills', icon: Cpu },
  { name: 'Experience', id: 'experience', icon: Clock },
  { name: 'Projects', id: 'projects', icon: Briefcase },
  { name: 'Contact', id: 'contact', icon: Mail },
];

const InteractiveNavbar = ({ activeSection, darkMode, toggleDarkMode }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: id === 'home' ? 0 : element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] sm:w-auto overflow-x-auto sm:overflow-visible no-scrollbar pb-4 sm:pb-0">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`flex items-center gap-2 sm:gap-4 p-2.5 rounded-[2rem] border transition-all duration-300 w-max mx-auto
          ${isScrolled 
            ? 'bg-[#0f172a]/80 backdrop-blur-xl border-slate-700/50 shadow-lg shadow-black/20' 
            : 'bg-[#1e293b]/90 backdrop-blur-lg border-slate-700 shadow-md'}
        `}
      >
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('home')}
          className="flex items-center justify-center w-10 h-10 rounded-full mx-1 cursor-pointer hover:scale-105 transition-transform"
          style={{
            background: 'linear-gradient(to bottom, #1E293B 50%, #0EA5E9 50%)'
          }}
        >
          <div className="flex flex-col gap-[3px] opacity-90">
            <svg width="20" height="6" viewBox="0 0 24 6" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
            </svg>
            <svg width="20" height="6" viewBox="0 0 24 6" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
            </svg>
            <svg width="20" height="6" viewBox="0 0 24 6" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
            </svg>
          </div>
        </div>

        {/* Separator */}
        <div className="w-[1px] h-8 bg-slate-600/50 mx-1 hidden sm:block"></div>

        {/* Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2 pr-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredIndex === index;

            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-colors duration-300
                  ${isActive 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-slate-100'}
                `}
              >
                {/* Active Indicator / Hover Effect Background */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-bg"
                    className="absolute inset-0 bg-slate-700/80 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Subtle light effect on hover (for non-active items, or a glow) */}
                {isHovered && !isActive && (
                   <motion.div
                    layoutId="navbar-hover-bg"
                    className="absolute inset-0 bg-slate-800/50 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 font-medium text-[13px] sm:text-[15px] tracking-wide">
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`${isActive ? 'block' : 'hidden md:block'}`}>{item.name}</span>
                </span>

                {/* Top Glowing cyan line (shown maybe on hover or active to match image, let's put it on hover to match image design where one is pills and other has glow) */}
                {isHovered && (
                  <motion.div
                    layoutId="navbar-glow"
                    className="absolute -top-[11px] left-1/2 -translate-x-1/2 w-12 h-[2px] bg-cyan-400 blur-[1px] rounded-full hidden sm:block"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {isHovered && (
                  <motion.div
                    layoutId="navbar-glow-core"
                    className="absolute -top-[11px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-cyan-200 rounded-full hidden sm:block"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </div>

      </motion.nav>
    </div>
  );
};

export default InteractiveNavbar;
