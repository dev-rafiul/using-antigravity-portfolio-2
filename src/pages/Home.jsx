import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';

const Home = ({ darkMode }) => {
  return (
    <main>
      <Hero darkMode={darkMode} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
};

export default Home;
