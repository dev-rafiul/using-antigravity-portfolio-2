import { useEffect, useRef, useState } from 'react';

const educationData = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Dhaka',
    period: '2020 – 2024',
    grade: 'CGPA 3.75 / 4.00',
    type: 'University',
    icon: '🎓',
    color: '#f97316',
    description: 'Focused on software engineering, algorithms, data structures, and web technologies. Completed capstone project on real-time collaborative web applications.',
    courses: ['Data Structures & Algorithms', 'Web Engineering', 'Database Systems', 'Software Architecture', 'Machine Learning Basics'],
    achievements: ['Dean\'s List 2022 & 2023', 'Best Capstone Project Award', 'Programming Club President'],
  },
  {
    id: 2,
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Dhaka College',
    period: '2017 – 2019',
    grade: 'GPA 5.00 / 5.00',
    type: 'College',
    icon: '📚',
    color: '#ec4899',
    description: 'Science group with Mathematics, Physics, and Chemistry. Achieved perfect GPA and participated in national science olympiad.',
    courses: ['Mathematics', 'Physics', 'Chemistry', 'ICT', 'English'],
    achievements: ['Perfect GPA 5.00', 'National Science Olympiad Participant', 'College Merit Scholarship'],
  },
  {
    id: 3,
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Motijheel Government High School',
    period: '2015 – 2017',
    grade: 'GPA 5.00 / 5.00',
    type: 'School',
    icon: '🏫',
    color: '#a855f7',
    description: 'Science group with distinction. Developed early interest in computers and programming through school ICT classes.',
    courses: ['Mathematics', 'Science', 'ICT', 'English', 'Bengali'],
    achievements: ['Perfect GPA 5.00', 'School Board Scholarship', 'Math Olympiad Winner'],
  },
  {
    id: 4,
    degree: 'Full Stack Web Development',
    institution: 'Programming Hero',
    period: '2022 – 2023',
    grade: 'Certificate of Excellence',
    type: 'Certification',
    icon: '💻',
    color: '#06b6d4',
    description: 'Intensive bootcamp covering React, Node.js, MongoDB, Express.js, and modern web development practices with 500+ hours of hands-on coding.',
    courses: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT Auth', 'REST APIs'],
    achievements: ['Top 5% Graduate', 'Certificate of Excellence', '10+ Projects Completed'],
  },
];

export default function Education({ darkMode }) {
  const [activeId, setActiveId] = useState(1);
  const [expandedCourses, setExpandedCourses] = useState({});
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const bg    = darkMode ? '#0a0a0f' : '#f9fafb';
  const card  = darkMode ? '#111118' : '#ffffff';
  const border= darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const text  = darkMode ? '#eef4f7' : '#0f172b';
  const muted = darkMode ? '#bfc2c7' : '#64748b';

  const active = educationData.find(e => e.id === activeId);

  /* animate timeline line on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && lineRef.current) {
        lineRef.current.style.height = '100%';
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{ background: bg, padding: '100px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* ambient orbs */}
      <div style={{ position:'absolute', top:'10%', right:'5%', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'15%', left:'3%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* heading */}
        <div data-scroll="fade-up" style={{ textAlign:'center', marginBottom: 64 }}>
          <span style={{ display:'inline-block', padding:'6px 18px', borderRadius:999, background:'rgba(168,85,247,0.15)', border:'1px solid rgba(168,85,247,0.3)', color:'#a855f7', fontSize:13, fontWeight:600, letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>
            Academic Journey
          </span>
          <h2 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:800, color: text, margin:'0 0 16px', fontFamily:"'Playfair Display', serif" }}>
            Education &{' '}
            <span style={{ background:'linear-gradient(135deg,#f97316,#ec4899,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Qualifications
            </span>
          </h2>
          <p style={{ color: muted, fontSize:16, maxWidth:520, margin:'0 auto' }}>
            A foundation built on curiosity, discipline, and continuous learning.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>

          {/* LEFT — timeline */}
          <div style={{ position:'relative' }}>
            {/* vertical line */}
            <div style={{ position:'absolute', left:28, top:0, bottom:0, width:2, background: border }}>
              <div ref={lineRef} style={{ width:'100%', height:0, background:'linear-gradient(180deg,#f97316,#ec4899,#a855f7)', transition:'height 1.4s cubic-bezier(.4,0,.2,1)', borderRadius:2 }} />
            </div>

            {educationData.map((edu, i) => (
              <div
                key={edu.id}
                onClick={() => setActiveId(edu.id)}
                style={{
                  display:'flex', gap:20, marginBottom:28, cursor:'pointer',
                  position:'relative', zIndex:1,
                  opacity:1, transform:'none',
                  animation:`cardIn 0.5s ease ${i * 0.12}s both`,
                }}
              >
                {/* dot */}
                <div style={{
                  width:56, height:56, borderRadius:'50%', flexShrink:0,
                  background: activeId === edu.id ? edu.color : card,
                  border: `2px solid ${activeId === edu.id ? edu.color : border}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:22, transition:'all 0.3s ease',
                  boxShadow: activeId === edu.id ? `0 0 20px ${edu.color}55` : 'none',
                }}>
                  {edu.icon}
                </div>

                {/* card */}
                <div style={{
                  flex:1, padding:'16px 20px', borderRadius:14,
                  background: activeId === edu.id ? `${edu.color}15` : card,
                  border: `1px solid ${activeId === edu.id ? edu.color + '55' : border}`,
                  transition:'all 0.3s ease',
                  transform: activeId === edu.id ? 'translateX(4px)' : 'none',
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8 }}>
                    <div>
                      <span style={{ fontSize:11, fontWeight:700, color: edu.color, textTransform:'uppercase', letterSpacing:1 }}>{edu.type}</span>
                      <h3 style={{ color: text, fontWeight:700, fontSize:15, margin:'4px 0 2px', lineHeight:1.3 }}>{edu.degree}</h3>
                      <p style={{ color: muted, fontSize:13, margin:0 }}>{edu.institution}</p>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <span style={{ fontSize:12, color: muted, display:'block' }}>{edu.period}</span>
                      <span style={{ fontSize:12, fontWeight:700, color: edu.color }}>{edu.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — detail panel */}
          {active && (
            <div
              key={active.id}
              style={{
                background: card, borderRadius:20, padding:32,
                border: `1px solid ${active.color}33`,
                boxShadow: `0 0 40px ${active.color}15`,
                position:'sticky', top:100,
                animation:'fadeSlideIn 0.4s ease',
              }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
                <div style={{ width:60, height:60, borderRadius:16, background:`${active.color}20`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>
                  {active.icon}
                </div>
                <div>
                  <span style={{ fontSize:11, fontWeight:700, color: active.color, textTransform:'uppercase', letterSpacing:1 }}>{active.type}</span>
                  <h3 style={{ color: text, fontWeight:800, fontSize:18, margin:'4px 0 0' }}>{active.degree}</h3>
                </div>
              </div>

              <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap' }}>
                {[active.institution, active.period, active.grade].map((tag, i) => (
                  <span key={i} style={{ padding:'5px 12px', borderRadius:999, background:`${active.color}15`, border:`1px solid ${active.color}33`, color: active.color, fontSize:12, fontWeight:600 }}>
                    {tag}
                  </span>
                ))}
              </div>

              <p style={{ color: muted, fontSize:14, lineHeight:1.7, marginBottom:24 }}>{active.description}</p>

              {/* courses */}
              <div style={{ marginBottom:20 }}>
                <button
                  onClick={() => setExpandedCourses(p => ({ ...p, [active.id]: !p[active.id] }))}
                  style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', color: text, fontWeight:700, fontSize:14, padding:0, marginBottom:12 }}
                >
                  <span style={{ color: active.color }}>▶</span>
                  Key Subjects
                  <span style={{ fontSize:11, color: muted, transform: expandedCourses[active.id] ? 'rotate(180deg)' : 'none', transition:'transform 0.3s', display:'inline-block' }}>▼</span>
                </button>
                {expandedCourses[active.id] && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {active.courses.map((c, i) => (
                      <span key={i} style={{ padding:'4px 10px', borderRadius:6, background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: muted, fontSize:12, animation:`fadeSlideIn 0.3s ease ${i*0.05}s both` }}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* achievements */}
              <div>
                <p style={{ color: text, fontWeight:700, fontSize:14, marginBottom:10 }}>🏆 Achievements</p>
                {active.achievements.map((a, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, animation:`fadeSlideIn 0.3s ease ${i*0.08}s both` }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background: active.color, flexShrink:0 }} />
                    <span style={{ color: muted, fontSize:13 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* stats bar */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginTop:64 }}>
          {[
            { label:'Years of Study', value:'8+' },
            { label:'Certifications', value:'4' },
            { label:'GPA Average', value:'4.9' },
            { label:'Awards Won', value:'9' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign:'center', padding:'24px 16px', borderRadius:16, background: card, border:`1px solid ${border}` }}>
              <div style={{ fontSize:'2rem', fontWeight:900, background:'linear-gradient(135deg,#f97316,#ec4899,#a855f7)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.value}</div>
              <div style={{ color: muted, fontSize:13, marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateX(-24px); }
          to   { opacity:1; transform:translateX(0); }
        }
      `}</style>
    </section>
  );
}
