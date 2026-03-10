import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// Placeholder pages for new routes
const Explore = () => <div className="min-h-screen pt-24 px-8 text-center"><h1 className="text-4xl font-bold">Explore Listings</h1></div>;
const AboutPage = () => <div className="min-h-screen pt-24 px-8 text-center"><h1 className="text-4xl font-bold">About Us</h1></div>;
const Login = () => <div className="min-h-screen pt-24 px-8 text-center"><h1 className="text-4xl font-bold">Login</h1></div>;
const Dashboard = () => <div className="min-h-screen pt-24 px-8 text-center"><h1 className="text-4xl font-bold">User Dashboard</h1></div>;
const Blog = () => <div className="min-h-screen pt-24 px-8 text-center"><h1 className="text-4xl font-bold">Blog section</h1></div>;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-navbar dark:text-dark-paragraph font-inter transition-colors duration-300 flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

