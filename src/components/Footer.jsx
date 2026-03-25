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

const socials = [
  { icon:'🐙', href:'https://github.com/dev-rafiul',   color:'#eef4f7', label:'GitHub' },
  { icon:'💼', href:'https://linkedin.com', color:'#0ea5e9', label:'LinkedIn' },
  { icon:'🐦', href:'https://twitter.com',  color:'#38bdf8', label:'Twitter' },
  { icon:'📘', href:'https://facebook.com', color:'#3b82f6', label:'Facebook' },
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
                    width:40, height:40, borderRadius:10, background: card,
                    border:`1px solid ${hovered===`soc-${i}` ? s.color : border}`,
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:18,
                    textDecoration:'none',
                    transform: hovered===`soc-${i}` ? 'translateY(-4px)' : 'none',
                    boxShadow: hovered===`soc-${i}` ? `0 6px 20px ${s.color}40` : 'none',
                    transition:'all .3s ease',
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
              { icon:'📧', val:'rafiul@example.com' },
              { icon:'📱', val:'+880 1700-000000' },
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
