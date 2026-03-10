import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-navbar dark:bg-dark-navbar text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
              Building digital experiences that make a difference. Let's create something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 dark:text-gray-400 hover:text-light-action dark:hover:text-dark-action transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Me</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-lg hover:bg-light-action dark:hover:bg-dark-action transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-lg hover:bg-light-action dark:hover:bg-dark-action transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-lg hover:bg-light-action dark:hover:bg-dark-action transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="p-3 bg-white/10 rounded-lg hover:bg-light-action dark:hover:bg-dark-action transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 dark:text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-gray-300 dark:text-gray-400 text-sm flex items-center gap-2">
            Made with <Heart size={16} className="text-red-500 fill-current" /> by Your Name
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;