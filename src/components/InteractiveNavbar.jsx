// AnimatedNavbar.jsx - Updated to sync with HumanizedHero
import React, { useState, useEffect, useContext } from 'react';

const AnimatedNavbar = ({ theme = "dark" }) => { // theme prop from parent
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-900 ease-in-out ${
        scrolled ? 'w-[55%] py-2.5' : 'w-[85%] py-4'
      } backdrop-blur-xl rounded-3xl flex items-center justify-center gap-10 px-8 font-bold pointer-events-auto`}
      style={{
        background: isDark ? 'rgba(15, 13, 11, 0.4)' : 'rgba(250, 248, 245, 0.4)',
        border: isDark ? '1px solid rgba(240,237,232,0.15)' : '1px solid rgba(26,23,20,0.12)'
      }}
    >
      {/* Logo - Matches hero gradient */}
      <span className="flex items-center gap-2 text-xl font-[600]">
        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#a855f7]" />
        <span 
          className="bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#a855f7] bg-clip-text text-transparent font-[600]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Rafi
        </span>
      </span>

      {/* Nav Links */}
      <ul className="flex items-center gap-8 text-sm font-[500]">
        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
          <li 
            key={item}
            className="cursor-pointer px-3 py-2 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:bg-white/10"
            style={{ 
              color: isDark ? '#f0ede8' : '#1a1714',
              letterSpacing: '0.02em'
            }}
            onClick={() => scrollToSection(item.toLowerCase())}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* CTA Button - Matches Play Intro style */}
      <button 
        className="flex items-center gap-3 px-6 py-2.5 rounded-2xl font-medium transition-all duration-300 hover:scale-105 border border-white/20"
        style={{ 
          color: isDark ? '#f0ede8' : '#1a1714',
          background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
        }}
      >
        <span className="bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#a855f7] bg-clip-text text-transparent">
          Play Intro
        </span>
      </button>
    </nav>
  );
};

export default AnimatedNavbar;
