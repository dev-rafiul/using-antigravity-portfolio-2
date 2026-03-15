import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Header = ({ activeSection, darkMode, toggleDarkMode }) => {
  return (
    <header className="fixed top-0 w-full z-[100] flex items-center justify-between px-6 py-6 md:px-[60px] md:py-8 text-black dark:text-white transition-colors duration-500">
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl md:text-[22px] font-light tracking-wide lowercase cursor-pointer"
      >
        display
      </motion.div>
      
      {/* Nav Links */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden lg:flex items-center gap-[40px] text-[16px] font-semibold tracking-wide ml-[-40px]"
      >
        <a href="#work" className="hover:opacity-70 transition-colors">Work</a>
        <a href="#about" className="hover:opacity-70 transition-colors">About</a>
        <a href="#blog" className="hover:opacity-70 transition-colors">Blog</a>
        <a href="#contact" className="hover:opacity-70 transition-colors">Contact</a>
      </motion.nav>
      
      {/* Button & Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-4 hidden md:flex"
      >
        <button 
          onClick={toggleDarkMode} 
          className="p-2.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md text-[14.5px] font-medium hover:bg-black/10 dark:hover:bg-white/15 hover:scale-105 transition-all cursor-pointer">
          Get template
        </button>
      </motion.div>
    </header>
  );
};

export default Header;