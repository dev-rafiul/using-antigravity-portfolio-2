import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experienceData = [
  {
    role: "Frontend Developer",
    company: "Tech Solutions Inc.",
    duration: "Jan 2024 - Present",
    description: "Spearheaded the development of scalable UI components using React and Tailwind CSS. Mentored junior developers and improved overall application performance by 30%."
  },
  {
    role: "Junior Web Developer",
    company: "Creative Agency",
    duration: "Jun 2022 - Dec 2023",
    description: "Assisted in building client websites, integrating RESTful APIs, and implementing dynamic real-time features using WebSockets."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-light-bg dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-light-navbar dark:text-dark-navbar mb-4 inline-block relative">
            Professional Experience
            <div className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-light-action dark:bg-dark-action rounded-full"></div>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-dark-bg p-8 rounded-3xl shadow-card dark:border dark:border-gray-800"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-light-action/10 dark:bg-dark-action/10 text-light-action dark:text-dark-action rounded-xl">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{exp.role}</h3>
                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">{exp.company}</h4>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 inline-flex self-start md:self-auto px-4 py-2 rounded-full bg-light-action/10 dark:bg-dark-action/10 text-light-action dark:text-dark-action font-semibold text-sm">
                  {exp.duration}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;