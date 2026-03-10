import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isHome) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + href);
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="text-2xl md:text-3xl font-black tracking-tighter gradient-text animate-gradient cursor-pointer">
              Portfolio.
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 relative">
            {navItems.map((item, index) => {
              // Highlight based on current hash mostly if possible, or just let them be clickable
              return (
                <div key={item.name} className="relative">
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    custom={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`relative px-3 py-2 rounded-full text-sm lg:text-base font-semibold transition-colors duration-300 z-10 block text-light-navbar dark:text-dark-navbar hover:text-light-action dark:hover:text-dark-action`}
                  >
                    {item.name}
                  </motion.a>
                </div>
              );
            })}

            {/* Dark Mode Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="ml-2 p-2.5 rounded-full bg-light-action/10 dark:bg-dark-action/10 text-light-action dark:text-dark-action hover:bg-light-action dark:hover:bg-dark-action hover:text-white dark:hover:text-white transition-all duration-300 flex items-center justify-center relative overflow-hidden group shadow-sm hover:shadow-glow"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -30, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 30, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? <Moon size={20} className="group-hover:text-white" /> : <Sun size={20} className="group-hover:text-white" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Dark Mode Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-light-action/10 dark:bg-dark-action/10 text-light-action dark:text-dark-action transition-colors duration-300 flex items-center justify-center relative overflow-hidden shadow-sm"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -30, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 30, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full bg-light-action/10 dark:bg-dark-action/10 text-light-action dark:text-dark-action transition-colors shadow-sm"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-xl"
          >
            <div className="px-4 py-6 space-y-3 flex flex-col items-center">
              {navItems.map((item, index) => {
                return (
                  <motion.a
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block w-[90%] text-center px-4 py-3 rounded-2xl text-lg font-bold transition-all duration-300 text-light-navbar dark:text-dark-navbar hover:bg-gray-200/50 dark:hover:bg-gray-800/50 hover:text-light-action dark:hover:text-dark-action`}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;