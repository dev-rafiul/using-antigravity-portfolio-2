import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Twitter, Facebook } from 'lucide-react';

const Hero = () => {
  const handleResumeDownload = () => {
    // Replace with your actual resume URL when ready
    const resumeUrl = '/resume.pdf'; // Place your resume.pdf in the public folder
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Your_Name_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex flex-col items-start"
          >
            <h2 className="text-xl md:text-2xl font-bold text-light-action dark:text-dark-action mb-4 inline-block">
              Hi, I am
            </h2>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-light-navbar dark:text-dark-navbar">
              John Doe
            </h1>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-600 dark:text-gray-400 mb-6">
              Full Stack Web Developer
            </h3>
            <p className="text-lg text-gray-600 dark:text-dark-paragraph mb-8 max-w-xl leading-relaxed">
              I build robust, secure, and fully responsive web applications from the ground up. Specialized in creating sophisticated and polished user interfaces.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeDownload}
                className="flex items-center gap-2 bg-light-action dark:bg-dark-action text-white px-8 py-4 rounded-xl font-bold text-lg shadow-glow hover:shadow-lg transition-all"
              >
                <Download size={20} />
                Download Resume
              </motion.button>
            </div>

            <div className="flex gap-6 items-center flex-wrap">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Connect with me:</span>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-light-action dark:hover:text-dark-action transition-colors hover:scale-110 transform"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-light-action dark:hover:text-dark-action transition-colors hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-light-action dark:hover:text-dark-action transition-colors hover:scale-110 transform"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="https://facebook.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-light-action dark:hover:text-dark-action transition-colors hover:scale-110 transform"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
          >
            {/* Background Blob for aesthetic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-light-action/20 dark:bg-dark-action/20 rounded-full blur-3xl z-[-1] animate-pulse"></div>
            
            <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-light-action dark:border-dark-action shadow-glow">
              {/* Replace with your actual photo */}
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional Portfolio Photo" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;