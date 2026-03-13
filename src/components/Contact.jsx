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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-dark-bg p-8 rounded-3xl shadow-card dark:border dark:border-gray-800">
              <h3 className="text-2xl font-bold text-light-navbar dark:text-dark-navbar mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <a 
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-light-action/10 dark:hover:bg-dark-action/10 transition-colors group"
                >
                  <div className="p-3 bg-light-action/10 dark:bg-dark-action/10 rounded-xl group-hover:bg-light-action dark:group-hover:bg-dark-action transition-colors">
                    <Mail className="text-light-action dark:text-dark-action group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">your.email@example.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+1234567890"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-light-action/10 dark:hover:bg-dark-action/10 transition-colors group"
                >
                  <div className="p-3 bg-light-action/10 dark:bg-dark-action/10 rounded-xl group-hover:bg-light-action dark:group-hover:bg-dark-action transition-colors">
                    <Phone className="text-light-action dark:text-dark-action group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">+1 (234) 567-890</p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-light-action/10 dark:hover:bg-dark-action/10 transition-colors group"
                >
                  <div className="p-3 bg-light-action/10 dark:bg-dark-action/10 rounded-xl group-hover:bg-light-action dark:group-hover:bg-dark-action transition-colors">
                    <MessageCircle className="text-light-action dark:text-dark-action group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">+1 (234) 567-890</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-light-action to-amber-600 dark:from-dark-action dark:to-amber-700 p-8 rounded-3xl text-white shadow-glow">
              <h3 className="text-2xl font-bold mb-4">Let's Create Something Amazing</h3>
              <p className="text-white/90 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the channels above.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-dark-bg p-8 rounded-3xl shadow-card dark:border dark:border-gray-800"
          >
            <h3 className="text-2xl font-bold text-light-navbar dark:text-dark-navbar mb-6">
              Send Me a Message
            </h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-light-action dark:focus:ring-dark-action focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-light-action dark:focus:ring-dark-action focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-light-action dark:focus:ring-dark-action focus:border-transparent transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-light-action dark:focus:ring-dark-action focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-light-action dark:bg-dark-action text-white rounded-xl font-semibold hover:shadow-glow transition-all hover:scale-105"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;