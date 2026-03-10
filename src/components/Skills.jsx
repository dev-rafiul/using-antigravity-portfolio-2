import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "Framer Motion", level: 85 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "RESTful APIs", level: 90 },
      { name: "Firebase", level: 75 }
    ]
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Vercel / Netlify", level: 85 },
      { name: "Docker", level: 60 },
      { name: "Figma", level: 80 }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-light-bg dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-light-navbar dark:text-dark-navbar mb-4 inline-block relative">
            Technical Skills
            <div className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-light-action dark:bg-dark-action rounded-full"></div>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white dark:bg-dark-bg p-8 rounded-3xl shadow-card dark:border dark:border-gray-800"
            >
              <h3 className="text-xl font-bold mb-6 text-light-navbar dark:text-dark-navbar border-b-2 border-gray-100 dark:border-gray-800 pb-2">
                {category.category}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                        className="h-full bg-light-action dark:bg-dark-action rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;