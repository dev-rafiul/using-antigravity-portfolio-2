import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
.
const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-light-bg dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewp.once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-light-navbar dark:text-dark-navbar mb-4 inline-block relative">
            Get In Touch
            <div className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-light-action dark:bg-dark-action rounded-full"></div>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </motion.div>

        
      </div>
    </section>
  );
};

export default Contact;