import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode, isLoggedIn, setIsLoggedIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loggedOutItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'About', path: '/about' },
    { name: 'Login', path: '/login' },
  ];

  const loggedInItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Blog', path: '/blog' },
  ];

  const currentNavItems = isLoggedIn ? loggedInItems : loggedOutItems;

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    navigate('/');
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
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 relative">
            {currentNavItems.map((item, index) => {
              return (
                <div key={item.name} className="relative">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `relative px-4 py-2 rounded-full text-sm lg:text-base font-semibold transition-colors duration-300 z-10 block ${
                      isActive
                        ? 'text-white'
                        : 'text-light-navbar dark:text-dark-navbar hover:text-light-action dark:hover:text-dark-action'
                    }`}
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 bg-light-action dark:bg-dark-action rounded-full z-[-1] shadow-glow"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </div>
              );
            })}

            {/* Profile Dropdown (Logged In Only) */}
            {isLoggedIn && (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 px-4 py-2 text-sm lg:text-base font-semibold text-light-navbar dark:text-dark-navbar hover:text-light-action dark:hover:text-dark-action transition-colors"
                >
                  <span>Profile</span>
                  <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col z-50"
                    >
                      <Link to="/profile" className="px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsProfileOpen(false)}>My Profile</Link>
                      <button onClick={handleLogout} className="px-4 py-3 text-sm font-medium text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500 transition-colors">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="ml-4 p-2.5 rounded-full bg-light-action/10 dark:bg-dark-action/10 text-light-action dark:text-dark-action hover:bg-light-action dark:hover:bg-dark-action hover:text-white dark:hover:text-white transition-all duration-300 flex items-center justify-center relative overflow-hidden group shadow-sm hover:shadow-glow"
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
              {currentNavItems.map((item, index) => {
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `block w-[90%] text-center px-4 py-3 rounded-2xl text-lg font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-light-action dark:bg-dark-action text-white shadow-glow'
                        : 'text-light-navbar dark:text-dark-navbar hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
              
              {isLoggedIn && (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `block w-[90%] text-center px-4 py-3 rounded-2xl text-lg font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-light-action dark:bg-dark-action text-white shadow-glow'
                        : 'text-light-navbar dark:text-dark-navbar hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-[90%] text-center px-4 py-3 rounded-2xl text-lg font-bold transition-all duration-300 text-red-500 hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;