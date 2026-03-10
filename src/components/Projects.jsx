import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    name: "E-Commerce Platform",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    shortDesc: "Full-featured online shopping platform with payment integration",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    fullDescription: "A comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, order management, and secure payment processing. Built with modern web technologies to ensure scalability and performance.",
    liveLink: "https://example-ecommerce.com",
    githubLink: "https://github.com/yourusername/ecommerce-client",
    challenges: "Implementing real-time inventory management and handling concurrent transactions was challenging. Solved by using MongoDB transactions and implementing optimistic locking patterns.",
    improvements: "Planning to add AI-powered product recommendations, multi-vendor support, and advanced analytics dashboard for sellers."
  },
  {
    id: 2,
    name: "Task Management App",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    shortDesc: "Collaborative project management tool with real-time updates",
    techStack: ["Next.js", "Firebase", "Framer Motion", "Zustand"],
    fullDescription: "A modern task management application that enables teams to collaborate effectively. Features include drag-and-drop task boards, real-time notifications, file attachments, and team chat functionality.",
    liveLink: "https://example-taskapp.com",
    githubLink: "https://github.com/yourusername/task-manager",
    challenges: "Achieving real-time synchronization across multiple users without performance degradation. Implemented Firebase Realtime Database with efficient data structuring and optimistic UI updates.",
    improvements: "Future plans include adding Gantt charts, time tracking, integration with popular tools like Slack and Google Calendar, and mobile app development."
  },
  {
    id: 3,
    name: "Weather Dashboard",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    shortDesc: "Beautiful weather forecast app with location-based data",
    techStack: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    fullDescription: "An elegant weather application providing detailed forecasts, historical data visualization, and severe weather alerts. Features include geolocation support, multiple city tracking, and customizable units.",
    liveLink: "https://example-weather.com",
    githubLink: "https://github.com/yourusername/weather-dashboard",
    challenges: "Handling API rate limits and caching strategies for optimal performance. Implemented service workers for offline functionality and smart caching mechanisms.",
    improvements: "Planning to add weather maps, air quality index, pollen count, and integration with smart home devices for automated climate control."
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-light-navbar dark:text-dark-navbar mb-4 inline-block relative">
            Featured Projects
            <div className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-light-action dark:bg-dark-action rounded-full"></div>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Here are some of my recent works that showcase my skills and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-light-bg dark:bg-gray-900 rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group"
            >
              <div className="relative overflow-hidden h-56">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-light-navbar dark:text-dark-navbar mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.shortDesc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-light-action/10 dark:bg-dark-action/10 text-light-action dark:text-dark-action rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 bg-light-action dark:bg-dark-action text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-bg rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-dark-bg rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <X className="text-gray-800 dark:text-gray-200" size={24} />
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-3xl md:text-4xl font-black text-light-navbar dark:text-dark-navbar mb-4">
                  {selectedProject.name}
                </h2>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-light-action dark:text-dark-action mb-3">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-light-action/10 dark:bg-dark-action/10 text-light-action dark:text-dark-action rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-light-navbar dark:text-dark-navbar mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-light-navbar dark:text-dark-navbar mb-3">
                    Challenges Faced
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-light-navbar dark:text-dark-navbar mb-3">
                    Future Improvements
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedProject.improvements}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-light-action dark:bg-dark-action text-white rounded-xl font-semibold hover:shadow-glow transition-all hover:scale-105"
                  >
                    <ExternalLink size={20} />
                    Live Project
                  </a>
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-all hover:scale-105"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;