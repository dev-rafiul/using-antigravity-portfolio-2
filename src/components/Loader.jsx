import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 22);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="relative flex items-center justify-center w-48 h-48">

            {/* Outer spinning dashed ring */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="100" cy="100" r="90"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="0.6"
                strokeDasharray="4 8"
                opacity="0.4"
              />
            </motion.svg>

            {/* Inner spinning arc */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="100" cy="100" r="72"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1.2"
                strokeDasharray="60 220"
                strokeLinecap="round"
                opacity="0.9"
              />
            </motion.svg>

            {/* Outer arc (slow) */}
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="100" cy="100" r="82"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="0.8"
                strokeDasharray="30 300"
                strokeLinecap="round"
                opacity="0.6"
              />
            </motion.svg>

            {/* Orbiting dot — top */}
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_3px_rgba(0,212,255,0.8)]"
              style={{ top: '4px', left: '50%', marginLeft: '-4px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Orbiting dot — bottom-left */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_2px_rgba(0,212,255,0.7)]"
              style={{ bottom: '18px', left: '14px' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Orbiting dot — right */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_2px_rgba(0,212,255,0.7)]"
              style={{ top: '50%', right: '2px', marginTop: '-3px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              {/* Counter */}
              <motion.span
                className="text-white font-mono text-2xl font-bold tracking-widest"
                style={{ textShadow: '0 0 10px rgba(0,212,255,0.5)' }}
              >
                {String(progress).padStart(2, '0')}
                <span className="text-cyan-400">%</span>
              </motion.span>

              {/* System loading text */}
              <motion.p
                className="text-cyan-400 font-mono text-[9px] tracking-[0.3em] mt-1 uppercase"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                System Loading
              </motion.p>
            </div>
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48">
            <div className="w-full h-px bg-cyan-900/40 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400 rounded-full"
                style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(0,212,255,0.8)' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
