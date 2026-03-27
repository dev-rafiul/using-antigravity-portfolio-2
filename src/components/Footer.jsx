const FOOTER_STYLES = `
@keyframes footerFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes footerGrad  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes footerPulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
`;

const links = [
  { label:'Home',       href:'#home' },
  { label:'About',      href:'#about' },
  { label:'Skills',     href:'#skills' },
  { label:'Projects',   href:'#projects' },
  { label:'Experience', href:'#experience' },
  { label:'Education',  href:'#education' },
  { label:'Contact',    href:'#contact' },
];




const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const socials = [
  { icon: <GitHubIcon />,   href: 'https://github.com/dev-rafiul', color: '#eef4f7', label: 'GitHub' },
  { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/dev-rafi',           color: '#0ea5e9', label: 'LinkedIn' },
  { icon: <TwitterIcon />,  href: 'https://x.com/rafiulX',            color: '#38bdf8', label: 'Twitter' },
  { icon: <FacebookIcon />, href: 'https://www.facebook.com/devrafiul0/',           color: '#3b82f6', label: 'Facebook' },
];




import { useState, useEffect } from 'react';

export default function Footer({ darkMode }) {
  const [hovered, setHovered] = useState(null);
  const bg    = darkMode ? '#070710' : '#0f172b';
  const card  = darkMode ? '#111118' : '#1e293b';
  const border= 'rgba(255,255,255,0.07)';
  const muted = 'rgba(255,255,255,0.45)';

  useEffect(() => {
    if (!document.getElementById('footer-anim-styles')) {
      const s = document.createElement('style');
      s.id = 'footer-anim-styles';
      s.textContent = FOOTER_STYLES;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <footer style={{ background: bg, borderTop:`1px solid ${border}`, position:'relative', overflow:'hidden' }}>
      {/* top gradient line */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
        background:'linear-gradient(90deg,#f97316,#ec4899,#a855f7,#f97316)',
        backgroundSize:'200% 100%', animation:'footerGrad 4s linear infinite' }} />

      {/* ambient orbs */}
      <div style={{ position:'absolute', bottom:'-30%', left:'-5%', width:300, height:300, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(249,115,22,.08) 0%,transparent 70%)',
        animation:'footerFloat 8s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-20%', right:'-5%', width:250, height:250, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(168,85,247,.08) 0%,transparent 70%)',
        animation:'footerFloat 10s ease-in-out infinite', animationDelay:'3s', pointerEvents:'none' }} />

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'60px 24px 32px', position:'relative', zIndex:1 }}>

        {/* top row */}
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr', gap:48, marginBottom:48 }}>

          {/* brand */}
          <div>
            <div style={{ marginBottom:16 }}>
              <span style={{
                fontSize:28, fontWeight:900, fontFamily:"'Playfair Display',serif",
                background:'linear-gradient(135deg,#f97316,#ec4899,#a855f7)',
                backgroundSize:'200% 200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                animation:'footerGrad 4s ease infinite',
              }}>
                Rafiul Islam
              </span>
            </div>
            <p style={{ color: muted, fontSize:14, lineHeight:1.8, maxWidth:280, marginBottom:20 }}>
              Full Stack Developer crafting modern, performant web experiences with clean code and creative design.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              {socials.map((s,i) => (
               


<a key={i} href={s.href} target="_blank" rel="noreferrer"
  aria-label={s.label}
  onMouseEnter={() => setHovered(`soc-${i}`)}
  onMouseLeave={() => setHovered(null)}
  style={{
    width: 40, height: 40, borderRadius: 10, background: card,
    border: `1px solid ${hovered === `soc-${i}` ? s.color : border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none',
    color: hovered === `soc-${i}` ? s.color : muted,   // ← drives currentColor
    transform: hovered === `soc-${i}` ? 'translateY(-4px)' : 'none',
    boxShadow: hovered === `soc-${i}` ? `0 6px 20px ${s.color}40` : 'none',
    transition: 'all .3s ease',
  }}>
  {s.icon}
</a>




              ))}
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:700, fontSize:14, textTransform:'uppercase', letterSpacing:2, marginBottom:20 }}>Quick Links</h4>
            {links.map((l,i) => (
              <a key={i} href={l.href}
                onMouseEnter={() => setHovered(`link-${i}`)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display:'flex', alignItems:'center', gap:8,
                  color: hovered===`link-${i}` ? '#f97316' : muted,
                  textDecoration:'none', fontSize:14, marginBottom:10,
                  transform: hovered===`link-${i}` ? 'translateX(6px)' : 'none',
                  transition:'all .25s ease',
                }}>
                <span style={{ fontSize:10, color:'#f97316', opacity: hovered===`link-${i}` ? 1 : 0, transition:'opacity .25s' }}>▶</span>
                {l.label}
              </a>
            ))}
          </div>

          {/* contact snippet */}
          <div>
            <h4 style={{ color:'#fff', fontWeight:700, fontSize:14, textTransform:'uppercase', letterSpacing:2, marginBottom:20 }}>Contact</h4>
            {[
              { icon:'📧', val:'rafiulislam040@gmail.com' },
              { icon:'📱', val:'+880 1903168428' },
              { icon:'📍', val:'Dhaka, Bangladesh' },
            ].map((c,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <span style={{ fontSize:16, animation:`footerFloat ${3+i}s ease-in-out infinite`, animationDelay:`${i*0.5}s`, display:'inline-block' }}>{c.icon}</span>
                <span style={{ color: muted, fontSize:13 }}>{c.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div style={{ height:1, background:`linear-gradient(90deg,transparent,${border},transparent)`, marginBottom:24 }} />

        {/* bottom row */}
        <div className="footer-bottom" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ color: muted, fontSize:13, margin:0 }}>
            © {new Date().getFullYear()} Rafiul Islam. Built with{' '}
            <span style={{ animation:'footerPulse 1.5s ease-in-out infinite', display:'inline-block' }}>❤️</span>
            {' '}using React & Tailwind CSS.
          </p>
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', animation:'footerPulse 1.2s ease-in-out infinite' }} />
            <span style={{ color: muted, fontSize:12 }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
