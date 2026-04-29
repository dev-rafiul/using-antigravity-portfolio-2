import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';


const InteractiveNavbar = ({ theme = 'dark', toggleDarkMode, activeSection }) => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'];

  const navBg     = isDark ? 'rgba(15,13,11,0.55)'   : 'rgba(255,255,255,0.65)';
  const navBorder = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)';
  const navShadow = isDark ? '0 8px 32px rgba(0,0,0,0.45)' : '0 8px 32px rgba(0,0,0,0.08)';
  const linkColor = isDark ? '#f0ede8' : '#1a1714';
  const mutedColor = isDark ? 'rgba(240,237,232,0.45)' : 'rgba(26,23,20,0.45)';

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          width: scrolled ? '58%' : '88%',
          maxWidth: 1100,
          padding: scrolled ? '10px 28px' : '14px 32px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 999,
          background: navBg,
          border: `1px solid ${navBorder}`,
          boxShadow: navShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          fontFamily: "'Radeyn', system-ui, sans-serif",
        }}
      >
        {/* ── Logo ── */}
        <button
          onClick={() => scrollTo('home')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'linear-gradient(135deg, #602486, #341352, #1B0F23)',
            display: 'inline-block', flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Radeyn', system-ui, sans-serif",
            fontSize: 20, fontWeight: 600,
            background: 'linear-gradient(120deg, #602486, #341352, #1B0F23)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Rafiul
          </span>
        </button>

        
        <ul style={{
          display: 'flex', alignItems: 'center', gap: 4,
          listStyle: 'none', margin: 0, padding: 0,
        }}
          className="hidden md:flex"
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item.toLowerCase())}
                  style={{
                    background: isActive
                      ? isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)'
                      : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '7px 14px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? linkColor : mutedColor,
                    letterSpacing: '0.02em',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = linkColor; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = mutedColor; }}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>

      
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

         
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            style={{
              position: 'relative',
              width: 52, height: 26,
              borderRadius: 999,
              border: `1px solid ${navBorder}`,
              background: isDark
                ? 'linear-gradient(135deg, #1e1b4b, #312e81)'
                : 'linear-gradient(135deg, #fde68a, #fbbf24)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              padding: '0 3px',
              transition: 'background 0.4s ease',
              flexShrink: 0,
            }}
          >
            {/* Moon icon (left track) */}
            <Moon
              size={11}
              style={{
                position: 'absolute', left: 5,
                color: '#c7d2fe',
                opacity: isDark ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
            {/* Sun icon (right track) */}
            <Sun
              size={11}
              style={{
                position: 'absolute', right: 5,
                color: '#92400e',
                opacity: isDark ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />
            {/* Thumb */}
            <span
              style={{
                width: 20, height: 20,
                borderRadius: '50%',
                background: isDark ? '#c7d2fe' : '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                transform: isDark ? 'translateX(0px)' : 'translateX(26px)',
                transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.4s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1, flexShrink: 0,
              }}
            >
              {isDark
                ? <Moon size={10} style={{ color: '#4338ca' }} />
                : <Sun  size={10} style={{ color: '#d97706' }} />
              }
            </span>
          </button>

          {/* Download CV — desktop */}
          <a
            href="/resume.pdf"
            download="Rafiul_Islam_CV.pdf"
            className="hidden sm:inline-flex"
            style={{
              alignItems: 'center', gap: 6,
              padding: '8px 18px',
              borderRadius: 999,
              fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
              background: 'linear-gradient(120deg, #602486, #341352, #1B0F23)',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 2px 16px rgba(52,19,82,0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(52,19,82,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(52,19,82,0.3)'; }}
          >
            ↓ Download CV
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: linkColor, padding: 4,
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 90, left: '50%',
            transform: 'translateX(-50%)',
            width: '88%', maxWidth: 400,
            zIndex: 99,
            background: isDark ? 'rgba(15,13,11,0.95)' : 'rgba(255,255,255,0.97)',
            border: `1px solid ${navBorder}`,
            borderRadius: 20,
            padding: '12px 8px',
            backdropFilter: 'blur(20px)',
            boxShadow: navShadow,
            fontFamily: "'Radeyn', system-ui, sans-serif",
          }}
        >
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              style={{
                display: 'block', width: '100%',
                padding: '12px 20px',
                background: 'none', border: 'none',
                textAlign: 'left', cursor: 'pointer',
                fontSize: 15, fontWeight: 500,
                color: activeSection === item.toLowerCase() ? '#341352' : linkColor,
                borderRadius: 12,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default InteractiveNavbar;
