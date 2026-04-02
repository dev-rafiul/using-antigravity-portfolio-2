import { useState, useRef, useEffect } from 'react';

/* ── infinite animation keyframes injected once ── */
const STYLES = `
@keyframes floatUp    { 0%,100%{transform:translateY(0) scale(1);opacity:.7} 50%{transform:translateY(-28px) scale(1.15);opacity:1} }
@keyframes floatX     { 0%,100%{transform:translateX(0);} 50%{transform:translateX(18px);} }
@keyframes pulseRing  { 0%{transform:scale(.85);opacity:.7} 70%{transform:scale(1.25);opacity:0} 100%{transform:scale(.85);opacity:0} }
@keyframes orbitCW    { from{transform:rotate(0deg) translateX(70px) rotate(0deg)} to{transform:rotate(360deg) translateX(70px) rotate(-360deg)} }
@keyframes orbitCCW   { from{transform:rotate(0deg) translateX(50px) rotate(0deg)} to{transform:rotate(-360deg) translateX(50px) rotate(360deg)} }
@keyframes spinSlow   { to{transform:rotate(360deg)} }
@keyframes spinSlowR  { to{transform:rotate(-360deg)} }
@keyframes waveDot    { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(2.2)} }
@keyframes gradShift  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes blink      { 0%,100%{opacity:1} 50%{opacity:.2} }
@keyframes slideInUp  { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
@keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
@keyframes spin       { to{transform:rotate(360deg)} }
@keyframes bounceIn   { 0%{transform:scale(.3);opacity:0} 60%{transform:scale(1.1)} 80%{transform:scale(.95)} 100%{transform:scale(1);opacity:1} }
@keyframes particleDrift {
  0%   { transform:translate(0,0) scale(1); opacity:.8; }
  25%  { transform:translate(30px,-40px) scale(1.2); opacity:.5; }
  50%  { transform:translate(-20px,-70px) scale(.8); opacity:.9; }
  75%  { transform:translate(40px,-100px) scale(1.1); opacity:.4; }
  100% { transform:translate(0,-130px) scale(1); opacity:0; }
}
`;

const contactInfo = [
  { icon:'📧', label:'Email',    value:'rafiulislam040@gmail.com',   href:'mailto:rafiulislam040@gmail.com', color:'#f97316' },
  { icon:'📱', label:'Phone',    value:'+880 1903168428',      href:'tel:+8801903168428',        color:'#ec4899' },
  { icon:'💬', label:'WhatsApp', value:'+880 1903168428',      href:'https://wa.me/8801903168428',color:'#22c55e' },
  { icon:'📍', label:'Location', value:'Dhaka, Bangladesh',     href:'#',                         color:'#a855f7' },
];

const socials = [
  { icon:'🐙', label:'GitHub',   href:'https://github.com/dev-rafiul',   color:'#eef4f7' },
  { icon:'💼', label:'LinkedIn', href:'https://www.linkedin.com/in/dev-rafi', color:'#0ea5e9' },
  { icon:'🐦', label:'Twitter',  href:'https://twitter.com',  color:'#38bdf8' },
  { icon:'📘', label:'Facebook', href:'https://www.facebook.com/devrafiul0/', color:'#3b82f6' },
];

/* ── floating particle component ── */
function Particle({ color, style }) {
  return (
    <div style={{
      position:'absolute', width:6, height:6, borderRadius:'50%',
      background: color, animation:`particleDrift ${3 + Math.random()*3}s ease-in infinite`,
      animationDelay:`${Math.random()*4}s`, pointerEvents:'none', ...style,
    }} />
  );
}

/* ── animated orb with pulse rings ── */
function PulseOrb({ color, size=120, style }) {
  return (
    <div style={{ position:'absolute', width:size, height:size, ...style, pointerEvents:'none' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          position:'absolute', inset:0, borderRadius:'50%',
          border:`2px solid ${color}`,
          animation:`pulseRing 2.4s ease-out infinite`,
          animationDelay:`${i*0.8}s`,
        }} />
      ))}
      <div style={{ position:'absolute', inset:'25%', borderRadius:'50%', background:`radial-gradient(circle,${color},transparent)`, opacity:.6 }} />
    </div>
  );
}

/* ── orbiting dot around a center ── */
function OrbitRing({ color, radius=70, dotSize=8, duration=6, reverse=false, style }) {
  return (
    <div style={{ position:'absolute', width:radius*2, height:radius*2, ...style, pointerEvents:'none' }}>
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:`1px dashed ${color}40` }} />
      <div style={{
        position:'absolute', top:'50%', left:'50%',
        width:dotSize, height:dotSize, borderRadius:'50%',
        background: color, marginTop:-dotSize/2, marginLeft:-dotSize/2,
        animation:`${reverse?'orbitCCW':'orbitCW'} ${duration}s linear infinite`,
        boxShadow:`0 0 8px ${color}`,
      }} />
    </div>
  );
}

/* ── wave bars (audio visualizer) ── */
function WaveBars({ color }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:3, height:24 }}>
      {[1,1.8,1.3,2.2,1.6,1,1.9,1.4,2,1.2].map((h,i) => (
        <div key={i} style={{
          width:3, height:`${h*10}px`, borderRadius:2, background: color,
          animation:`waveDot ${0.6+i*0.07}s ease-in-out infinite`,
          animationDelay:`${i*0.08}s`,
        }} />
      ))}
    </div>
  );
}

export default function Contact({ darkMode }) {
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState(null);
  const [focused, setFocused] = useState('');
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);

  const bg    = darkMode ? '#0a0a0f' : '#f0f4ff';
  const card  = darkMode ? '#111118' : '#ffffff';
  const border= darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const text  = darkMode ? '#eef4f7' : '#0f172b';
  const muted = darkMode ? '#bfc2c7' : '#64748b';
  const inputBg = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name:'', email:'', subject:'', message:'' });
      setTimeout(() => setStatus(null), 5000);
    }, 1800);
  };

  const inputStyle = field => ({
    width:'100%', padding:'14px 16px', borderRadius:12,
    background: inputBg,
    border:`1px solid ${focused===field ? '#f97316' : border}`,
    color: text, fontSize:14, outline:'none',
    transition:'border-color .3s, box-shadow .3s',
    boxShadow: focused===field ? '0 0 0 3px rgba(249,115,22,.15)' : 'none',
    boxSizing:'border-box', fontFamily:'inherit',
  });

  /* inject keyframes  */
  useEffect(() => {
    if (!document.getElementById('contact-anim-styles')) {
      const s = document.createElement('style');
      s.id = 'contact-anim-styles';
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
  }, []);

 
  const particles = [
    { color:'#f97316', style:{ left:'10%', bottom:'20%' } },
    { color:'#ec4899', style:{ left:'20%', bottom:'30%' } },
    { color:'#a855f7', style:{ left:'15%', bottom:'10%' } },
    { color:'#06b6d4', style:{ right:'12%', bottom:'25%' } },
    { color:'#f97316', style:{ right:'22%', bottom:'15%' } },
    { color:'#22c55e', style:{ right:'8%',  bottom:'35%' } },
    { color:'#ec4899', style:{ left:'50%',  bottom:'5%'  } },
    { color:'#a855f7', style:{ left:'35%',  bottom:'12%' } },
  ];

  return (
    <section id="contact" ref={sectionRef}
      style={{ background:bg, padding:'100px 0', position:'relative', overflow:'hidden', minHeight:'100vh' }}
    >
      {/* ── infinite back animat ── */}

      {/* large gradient orbs that float */}
      <div style={{ position:'absolute', top:'5%', left:'-5%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(249,115,22,.12) 0%,transparent 70%)',
        animation:'floatUp 8s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'5%', right:'-5%', width:450, height:450, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(168,85,247,.12) 0%,transparent 70%)',
        animation:'floatUp 10s ease-in-out infinite', animationDelay:'3s', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'40%', left:'40%', width:300, height:300, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(236,72,153,.08) 0%,transparent 70%)',
        animation:'floatX 7s ease-in-out infinite', pointerEvents:'none' }} />

     
      <PulseOrb color="#f97316" size={100} style={{ top:'8%', right:'8%' }} />
      <PulseOrb color="#a855f7" size={80}  style={{ bottom:'12%', left:'6%' }} />
      <PulseOrb color="#06b6d4" size={60}  style={{ top:'50%', right:'3%' }} />

      {/* orbit ring*/}
      <div className="orbit-ring"><OrbitRing color="#f97316" radius={60} duration={5}  style={{ top:'15%', left:'3%' }} /></div>
      <div className="orbit-ring"><OrbitRing color="#ec4899" radius={50} duration={7}  reverse style={{ bottom:'20%', right:'5%' }} /></div>
      <div className="orbit-ring"><OrbitRing color="#a855f7" radius={40} duration={9}  style={{ top:'60%', left:'8%' }} /></div>

     
      <div className="spin-ring" style={{ position:'absolute', top:'20%', right:'15%', width:180, height:180, borderRadius:'50%',
        border:'1px dashed rgba(249,115,22,.25)', animation:'spinSlow 20s linear infinite', pointerEvents:'none' }} />
      <div className="spin-ring" style={{ position:'absolute', bottom:'25%', left:'12%', width:140, height:140, borderRadius:'50%',
        border:'1px dashed rgba(168,85,247,.25)', animation:'spinSlowR 15s linear infinite', pointerEvents:'none' }} />

      {/* floating part */}
      {particles.map((p,i) => <Particle key={i} {...p} />)}

      
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', position:'relative', zIndex:2 }}>

        {/* heading */}
        <div data-scroll="fade-up" style={{ textAlign:'center', marginBottom:64 }}>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'6px 18px', borderRadius:999,
            background:'rgba(249,115,22,.15)', border:'1px solid rgba(249,115,22,.3)',
            color:'#f97316', fontSize:13, fontWeight:600, letterSpacing:2, textTransform:'uppercase', marginBottom:16,
          }}>
            <WaveBars color="#f97316" />
            Get In Touch
          </span>
          <h2 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:800, color:text, margin:'0 0 16px',
            fontFamily:"'Playfair Display',serif" }}>
            Let's{' '}
            <span style={{
              background:'linear-gradient(135deg,#f97316,#ec4899,#a855f7)',
              backgroundSize:'200% 200%',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              animation:'gradShift 4s ease infinite',
            }}>
              Work Together
            </span>
          </h2>
          <p style={{ color:muted, fontSize:16, maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="contact-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:48, alignItems:'start' }}>

          {/* ── LEFT info ── */}
          <div>
            <div data-scroll="fade-left" style={{ marginBottom:28 }}>
              <h3 style={{ color:text, fontWeight:700, fontSize:20, marginBottom:8 }}>Contact Information</h3>
              <p style={{ color:muted, fontSize:14, lineHeight:1.7 }}>
                Available for freelance work and full-time opportunities. Reach out through any channel below.
              </p>
            </div>

            {contactInfo.map((info, i) => (
              <a key={i} href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                data-scroll="fade-left" data-scroll-delay={`${i*0.1}`}
                onMouseEnter={() => setHovered(`info-${i}`)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display:'flex', alignItems:'center', gap:16, padding:'16px 20px',
                  borderRadius:14, background: card, border:`1px solid ${hovered===`info-${i}` ? info.color+'55' : border}`,
                  marginBottom:12, textDecoration:'none',
                  transform: hovered===`info-${i}` ? 'translateX(8px)' : 'none',
                  boxShadow: hovered===`info-${i}` ? `0 4px 24px ${info.color}25` : 'none',
                  transition:'all .3s ease',
                }}
              >
                {/* animated icon  */}
                <div style={{
                  width:48, height:48, borderRadius:14, background:`${info.color}20`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0,
                  animation: hovered===`info-${i}` ? 'floatUp 1s ease-in-out infinite' : 'none',
                  position:'relative',
                }}>
                  {info.icon}
                  {hovered===`info-${i}` && (
                    <div style={{ position:'absolute', inset:0, borderRadius:14, border:`2px solid ${info.color}`,
                      animation:'pulseRing 1s ease-out infinite' }} />
                  )}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ color:muted, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1 }}>{info.label}</div>
                  <div style={{ color:text, fontSize:14, fontWeight:600, marginTop:2 }}>{info.value}</div>
                </div>
                <div style={{ color:info.color, fontSize:18, opacity: hovered===`info-${i}` ? 1 : 0, transition:'opacity .3s' }}>→</div>
              </a>
            ))}

            <div data-scroll="fade-left" data-scroll-delay="0.45" style={{ marginTop:28 }}>
              <p style={{ color:muted, fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:14 }}>Follow Me</p>
              <div style={{ display:'flex', gap:12 }}>
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    onMouseEnter={() => setHovered(`soc-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      width:48, height:48, borderRadius:14, background:card,
                      border:`1px solid ${hovered===`soc-${i}` ? s.color : border}`,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
                      textDecoration:'none', position:'relative', overflow:'hidden',
                      transform: hovered===`soc-${i}` ? 'translateY(-6px) scale(1.1)' : 'none',
                      boxShadow: hovered===`soc-${i}` ? `0 8px 24px ${s.color}40` : 'none',
                      transition:'all .3s ease',
                    }}
                  >
                    {s.icon}
                    {hovered===`soc-${i}` && (
                      <div style={{ position:'absolute', inset:0, background:`${s.color}15`, borderRadius:14 }} />
                    )}
                  </a>
                ))}
              </div>
            </div>

           
            <div data-scroll="fade-left" data-scroll-delay="0.55"
              style={{ marginTop:28, display:'inline-flex', alignItems:'center', gap:10,
                padding:'10px 18px', borderRadius:999,
                background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.3)' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', animation:'blink 1.2s ease-in-out infinite' }} />
              <span style={{ color:'#22c55e', fontSize:13, fontWeight:600 }}>Available for new projects</span>
            </div>
          </div>

        
          <div data-scroll="fade-right"
            style={{ background:card, borderRadius:24, padding:36, border:`1px solid ${border}`,
              position:'relative', overflow:'hidden' }}>

            {/* animated top gradient bar */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
              background:'linear-gradient(90deg,#f97316,#ec4899,#a855f7,#f97316)',
              backgroundSize:'200% 100%', animation:'gradShift 3s linear infinite' }} />

            {/* corner orbit decoration */}
            <OrbitRing color="#f97316" radius={35} duration={4} style={{ top:-35, right:-35, opacity:.5 }} />

            <h3 style={{ color:text, fontWeight:700, fontSize:20, marginBottom:24 }}>Send a Message</h3>

            {status === 'sent' ? (
              <div style={{ textAlign:'center', padding:'48px 24px', animation:'bounceIn .6s ease' }}>
                <div style={{ fontSize:64, marginBottom:16, animation:'floatUp 2s ease-in-out infinite' }}>✅</div>
                <h4 style={{ color:text, fontWeight:700, fontSize:22, marginBottom:8 }}>Message Sent!</h4>
                <p style={{ color:muted, fontSize:14, lineHeight:1.7 }}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <div style={{ marginTop:20, display:'flex', justifyContent:'center' }}>
                  <WaveBars color="#22c55e" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:16, marginBottom:16 }}>
                  <div>
                    <label style={{ color:muted, fontSize:12, fontWeight:600, display:'block', marginBottom:6 }}>Your Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                      placeholder="John Doe" style={inputStyle('name')}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
                  </div>
                  <div>
                    <label style={{ color:muted, fontSize:12, fontWeight:600, display:'block', marginBottom:6 }}>Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required
                      placeholder="john@example.com" style={inputStyle('email')}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
                  </div>
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ color:muted, fontSize:12, fontWeight:600, display:'block', marginBottom:6 }}>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange} required
                    placeholder="Project Inquiry / Collaboration" style={inputStyle('subject')}
                    onFocus={() => setFocused('subject')} onBlur={() => setFocused('')} />
                </div>
                <div style={{ marginBottom:24 }}>
                  <label style={{ color:muted, fontSize:12, fontWeight:600, display:'block', marginBottom:6 }}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required
                    rows={5} placeholder="Tell me about your project..."
                    style={{ ...inputStyle('message'), resize:'vertical' }}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
                </div>
                <button type="submit" disabled={status==='sending'}
                  onMouseEnter={e => { if(status!=='sending') e.currentTarget.style.transform='translateY(-3px) scale(1.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; }}
                  style={{
                    width:'100%', padding:'15px 24px', borderRadius:14,
                    background: status==='sending' ? 'rgba(249,115,22,.5)' : 'linear-gradient(135deg,#f97316,#ec4899)',
                    backgroundSize:'200% 200%',
                    animation: status!=='sending' ? 'gradShift 3s ease infinite' : 'none',
                    border:'none', color:'#fff', fontWeight:700, fontSize:15,
                    cursor: status==='sending' ? 'not-allowed' : 'pointer',
                    transition:'transform .2s, box-shadow .2s',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                    boxShadow:'0 4px 20px rgba(249,115,22,.35)',
                  }}>
                  {status==='sending' ? (
                    <>
                      <span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,.4)',
                        borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin .8s linear infinite' }} />
                      Sending...
                    </>
                  ) : <>Send Message ✉️</>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── bottom stats ── */}
        <div className="contact-stats" data-scroll="fade-up" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginTop:64 }}>
          {[
            { icon:'⚡', label:'Response Time', value:'24h' },
            { icon:'🌍', label:'Timezone',       value:'GMT+6' },
            { icon:'💼', label:'Availability',   value:'Open' },
            { icon:'🤝', label:'Projects Done',  value:'12+' },
          ].map((s,i) => (
            <div key={i} data-scroll="fade-up" data-scroll-delay={`${i*0.1}`}
              onMouseEnter={() => setHovered(`stat-${i}`)}
              onMouseLeave={() => setHovered(null)}
              style={{
                textAlign:'center', padding:'24px 16px', borderRadius:16,
                background: card, border:`1px solid ${hovered===`stat-${i}` ? 'rgba(249,115,22,.4)' : border}`,
                transform: hovered===`stat-${i}` ? 'translateY(-6px)' : 'none',
                boxShadow: hovered===`stat-${i}` ? '0 12px 32px rgba(249,115,22,.15)' : 'none',
                transition:'all .3s ease', cursor:'default',
              }}>
              <div style={{ fontSize:28, marginBottom:8, animation:`floatUp ${3+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.4}s` }}>{s.icon}</div>
              <div style={{ fontSize:'1.6rem', fontWeight:900,
                background:'linear-gradient(135deg,#f97316,#ec4899,#a855f7)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.value}</div>
              <div style={{ color:muted, fontSize:12, marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
