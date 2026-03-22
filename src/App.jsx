import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InteractiveNavbar from './components/InteractiveNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Loader from './components/Loader';
import useScrollAnimation from './hooks/useScrollAnimation';

function AppInner({ darkMode, toggleDarkMode }) {
  const [activeSection, setActiveSection] = useState('home');
  useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const glow = document.getElementById('cursor-glow');
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white font-inter flex flex-col relative w-full overflow-hidden transition-colors duration-500">
      {/* Scroll progress bar */}
      <div id="scroll-progress" />
      {/* Cursor glow */}
      <div id="cursor-glow" />

      <InteractiveNavbar activeSection={activeSection} theme={darkMode ? 'dark' : 'light'} toggleDarkMode={toggleDarkMode} />

      <div className="flex-grow w-full relative z-10">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>

      <div className="relative z-10">
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Router>
        <AppInner darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Router>
    </>
  );
}

export default App;

