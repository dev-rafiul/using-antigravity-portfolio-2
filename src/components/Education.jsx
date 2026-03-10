import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    institution: "University of Technology",
    degree: "B.Sc. in Computer Science & Engineering",
    duration: "2019 - 2023",
    description: "Graduated with honors. Key coursework included Data Structures, Algorithms, Web Engineering, and Database Systems."
  },
  {
    institution: "City College",
    degree: "Higher Secondary Certificate (HSC)",
    duration: "2017 - 2019",
    description: "Science major. Awarded merit scholarship for outstanding performance in physics and mathematics."
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-light-navbar dark:text-dark-navbar mb-4 inline-block relative">
            Educational Qualification
            <div className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-light-action dark:bg-dark-action rounded-full"></div>
          </h2>
        </motion.div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-700 before:to-transparent">
          {educationData.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-dark-bg bg-light-action dark:bg-dark-action text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <svg className="fill-current w-5 h-5" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2.12-1.16V17h2v-7.24L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-light-bg/50 dark:bg-dark-bg/50 shadow-card dark:border dark:border-gray-800 transition-all hover:shadow-lg">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-gray-900 dark:text-gray-100 text-xl">{edu.institution}</div>
                  <time className="font-caveat font-medium text-light-action dark:text-dark-action whitespace-nowrap">{edu.duration}</time>
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-semibold mb-2">{edu.degree}</div>
                <div className="text-gray-600 dark:text-gray-400">{edu.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;