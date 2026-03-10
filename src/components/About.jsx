import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-light-navbar dark:text-dark-navbar mb-4 inline-block relative">
            About Me
            <div className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-light-action dark:bg-dark-action rounded-full"></div>
          </h2>
        </motion.div>

        <div className="bg-light-bg/50 dark:bg-dark-bg/50 p-8 md:p-12 rounded-3xl shadow-card dark:border dark:border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-light-navbar dark:text-dark-navbar">The Programming Journey</h3>
            <p className="mb-6 leading-relaxed">
              My journey into programming started a few years ago when I built a simple HTML/CSS webpage out of curiosity. Fast forward to today, and I've had the privilege of building high-performance web applications, diving deep into scalable architectures, and writing robust APIs. Over the years, I've transitioned from curious beginner to a passionate full-stack developer committed to continuous learning.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-light-navbar dark:text-dark-navbar text-light-action dark:text-dark-action">What I Do</h3>
            <p className="mb-6 leading-relaxed">
              I specialize in creating pixel-perfect, highly responsive, and robust full stack web applications. I genuinely enjoy solving complex logic problems, optimizing database queries, and designing user interfaces that feel intuitive and engaging. Bridging the gap between engineering and design is what I do best.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-light-navbar dark:text-dark-navbar">Beyond the Code</h3>
            <p className="leading-relaxed">
              When I'm not carefully crafting code or reading up on the latest tech trends, you can usually find me exploring the outdoors. I love painting abstract art, playing competitive tennis, and experimenting with new recipes in the kitchen. I believe that stepping away from the screen fuels creativity when I return to it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;