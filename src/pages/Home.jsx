
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Hero></Hero>
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
