import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';

const Home = ({ darkMode }) => {
  return (
    <main>
      <Hero darkMode={darkMode} />
      <About darkMode={darkMode} />
      <Skills darkMode={darkMode} />
      <Projects darkMode={darkMode} />
      <Education darkMode={darkMode} />
      <Contact darkMode={darkMode} />
    </main>
  );
};

export default Home;
