import { useEffect } from 'react';

/**
 * Global scroll animation engine.
 * Observes all [data-scroll] elements and adds "in-view" class when visible.
 * Also drives: scroll progress bar, parallax layers, section counter, cursor glow.
 */
export default function useScrollAnimation() {
  useEffect(() => {
    /* ── 1. IntersectionObserver for data-scroll elements ── */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.scrollDelay || '0';
            setTimeout(() => {
              el.classList.add('in-view');
            }, parseFloat(delay) * 1000);
            // keep observing for re-trigger on scroll-up if desired
          } else {
            // optional: remove class so it re-animates on scroll back
            if (entry.target.dataset.scrollRepeat === 'true') {
              entry.target.classList.remove('in-view');
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = () => {
      document.querySelectorAll('[data-scroll]').forEach((el) => io.observe(el));
    };

    observe();

    /* re-observe after dynamic content (small delay) */
    const reObserveTimer = setTimeout(observe, 800);

    /* ── 2. Scroll progress bar ── */
    const progressBar = document.getElementById('scroll-progress');
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = `${pct}%`;

      /* ── 3. Parallax layers ── */
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const rect  = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${center * speed}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      clearTimeout(reObserveTimer);
    };
  }, []);
}
