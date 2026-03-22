import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RESUME_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #e5e7eb; }

  .resume-page {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #1a1a1a;
    line-height: 1.5;
  }

  .resume-sheet {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    margin: 0 auto;
    padding: 14mm 16mm 14mm 16mm;
    box-shadow: 0 4px 40px rgba(0,0,0,0.15);
  }

  /* ── header ── */
  .r-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 2px solid #f97316; }
  .r-name { font-size: 28px; font-weight: 700; color: #111; letter-spacing: -0.5px; }
  .r-title { font-size: 13px; font-weight: 500; color: #f97316; margin-top: 3px; letter-spacing: 0.5px; text-transform: uppercase; }
  .r-contact { text-align: right; font-size: 11.5px; color: #555; line-height: 1.8; }
  .r-contact a { color: #f97316; text-decoration: none; }

  /* ── two-col layout ── */
  .r-body { display: grid; grid-template-columns: 1fr 2.2fr; gap: 20px; }

  /* ── section ── */
  .r-section { margin-bottom: 16px; }
  .r-section-title {
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: #f97316;
    border-bottom: 1px solid #f9731640;
    padding-bottom: 4px; margin-bottom: 10px;
  }

  /* ── skills ── */
  .r-skill-group { margin-bottom: 8px; }
  .r-skill-label { font-size: 11px; font-weight: 600; color: #333; margin-bottom: 4px; }
  .r-skill-tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .r-skill-tag {
    padding: 2px 8px; border-radius: 4px;
    background: #fff7ed; border: 1px solid #fed7aa;
    color: #c2410c; font-size: 10.5px; font-weight: 500;
  }

  /* ── experience / education ── */
  .r-item { margin-bottom: 12px; }
  .r-item-header { display: flex; justify-content: space-between; align-items: flex-start; }
  .r-item-role { font-size: 13px; font-weight: 700; color: #111; }
  .r-item-company { font-size: 11.5px; color: #f97316; font-weight: 500; }
  .r-item-meta { font-size: 10.5px; color: #888; text-align: right; line-height: 1.6; }
  .r-item-desc { font-size: 11.5px; color: #444; margin-top: 4px; line-height: 1.6; }
  .r-bullets { margin-top: 5px; padding-left: 14px; }
  .r-bullets li { font-size: 11px; color: #555; margin-bottom: 3px; line-height: 1.55; }

  /* ── projects ── */
  .r-project { margin-bottom: 10px; }
  .r-project-name { font-size: 12.5px; font-weight: 700; color: #111; }
  .r-project-stack { font-size: 10.5px; color: #f97316; font-weight: 500; margin-bottom: 2px; }
  .r-project-desc { font-size: 11px; color: #555; line-height: 1.55; }

  /* ── print button (hidden on print) ── */
  .print-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: #111; padding: 10px 24px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px;
  }
  .print-bar span { color: #aaa; font-size: 13px; font-family: 'Inter', sans-serif; }
  .print-btn {
    padding: 8px 20px; border-radius: 8px; border: none; cursor: pointer;
    font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f97316, #ec4899);
    color: #fff; transition: opacity .2s;
  }
  .print-btn:hover { opacity: .85; }
  .back-btn {
    padding: 8px 16px; border-radius: 8px; border: 1px solid #333; cursor: pointer;
    font-size: 13px; font-weight: 500; font-family: 'Inter', sans-serif;
    background: transparent; color: #ccc; transition: border-color .2s;
  }
  .back-btn:hover { border-color: #666; }

  @media print {
    .print-bar { display: none !important; }
    body { background: #fff !important; }
    .resume-sheet { box-shadow: none !important; margin: 0 !important; padding: 10mm 12mm !important; }
    @page { size: A4; margin: 0; }
  }
`;

export default function Resume() {
  const navigate = useNavigate();

  useEffect(() => {
    // inject print styles
    const style = document.createElement('style');
    style.id = 'resume-print-styles';
    style.textContent = RESUME_STYLES;
    document.head.appendChild(style);
    // override body bg for this page
    document.body.style.background = '#e5e7eb';
    return () => {
      document.getElementById('resume-print-styles')?.remove();
      document.body.style.background = '';
    };
  }, []);

  return (
    <div className="resume-page" style={{ paddingTop: 52 }}>

      {/* ── print bar ── */}
      <div className="print-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <span>Tip: In print dialog → set "Destination" to "Save as PDF", margins to "None"</span>
        <button className="print-btn" onClick={() => window.print()}>⬇ Save as PDF</button>
      </div>

      {/* ── A4 sheet ── */}
      <div className="resume-sheet">

        {/* HEADER */}
        <div className="r-header">
          <div>
            <div className="r-name">Rafiul Islam</div>
            <div className="r-title">Full Stack Web Developer</div>
          </div>
          <div className="r-contact">
            <div>📧 rafiul@example.com</div>
            <div>📱 +880 1700-000000</div>
            <div>📍 Dhaka, Bangladesh</div>
            <div><a href="https://github.com">github.com/rafiul</a> · <a href="https://linkedin.com">linkedin.com/in/rafiul</a></div>
          </div>
        </div>

        {/* BODY */}
        <div className="r-body">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* Summary */}
            <div className="r-section">
              <div className="r-section-title">Profile</div>
              <p style={{ fontSize: 11.5, color: '#444', lineHeight: 1.65 }}>
                Passionate Full Stack Developer with 2+ years of experience building scalable web applications. Skilled in React, Node.js, and MongoDB. Focused on clean code, performance, and great user experiences.
              </p>
            </div>

            {/* Skills */}
            <div className="r-section">
              <div className="r-section-title">Skills</div>
              {[
                { label: 'Frontend', tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'] },
                { label: 'Backend',  tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
                { label: 'Database', tags: ['MongoDB', 'Firebase', 'MySQL'] },
                { label: 'Tools',    tags: ['Git', 'VS Code', 'Figma', 'AWS', 'Vercel'] },
              ].map(g => (
                <div key={g.label} className="r-skill-group">
                  <div className="r-skill-label">{g.label}</div>
                  <div className="r-skill-tags">
                    {g.tags.map(t => <span key={t} className="r-skill-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="r-section">
              <div className="r-section-title">Education</div>
              {[
                { degree: 'B.Sc. Computer Science', school: 'University of Dhaka', period: '2020 – 2024', grade: 'CGPA 3.75' },
                { degree: 'HSC — Science', school: 'Dhaka College', period: '2017 – 2019', grade: 'GPA 5.00' },
                { degree: 'SSC — Science', school: 'Motijheel Govt. High School', period: '2015 – 2017', grade: 'GPA 5.00' },
              ].map(e => (
                <div key={e.degree} className="r-item" style={{ marginBottom: 8 }}>
                  <div className="r-item-header">
                    <div>
                      <div className="r-item-role" style={{ fontSize: 12 }}>{e.degree}</div>
                      <div className="r-item-company" style={{ fontSize: 11 }}>{e.school}</div>
                    </div>
                    <div className="r-item-meta">
                      <div>{e.period}</div>
                      <div style={{ color: '#f97316', fontWeight: 600 }}>{e.grade}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="r-section">
              <div className="r-section-title">Certifications</div>
              <div className="r-item" style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>Full Stack Web Development</div>
                <div style={{ fontSize: 11, color: '#f97316' }}>Programming Hero · 2022–2023</div>
              </div>
            </div>

            {/* Languages */}
            <div className="r-section">
              <div className="r-section-title">Languages</div>
              <div style={{ fontSize: 11.5, color: '#444', lineHeight: 1.8 }}>
                <div>Bengali — Native</div>
                <div>English — Professional</div>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>

            {/* Experience */}
            <div className="r-section">
              <div className="r-section-title">Experience</div>
              {[
                {
                  role: 'Full Stack Developer', company: 'TechNova Solutions',
                  period: 'Jan 2024 – Present', location: 'Dhaka · Full-time',
                  bullets: [
                    'Architected a component library used across 4 product teams, reducing UI dev time by 35%.',
                    'Built real-time notification system with WebSockets handling 10k+ concurrent connections.',
                    'Optimised MongoDB pipelines, cutting dashboard load time from 4.2s to 0.8s.',
                  ],
                },
                {
                  role: 'Frontend Developer', company: 'Creative Digital Agency',
                  period: 'Jun 2023 – Dec 2023', location: 'Remote · Full-time',
                  bullets: [
                    'Delivered pixel-perfect Next.js pages with sub-100ms LCP scores for 12+ clients.',
                    'Implemented Framer Motion animation systems adopted as agency-wide standard.',
                    'Reduced average page bundle size by 42% through code splitting and lazy loading.',
                  ],
                },
                {
                  role: 'Junior Web Developer', company: 'StartupHub BD',
                  period: 'Jan 2023 – May 2023', location: 'Dhaka · Part-time',
                  bullets: [
                    'Developed a startup tracking dashboard used by 30+ portfolio companies.',
                    'Integrated Firebase Auth and Firestore for real-time data across 3 products.',
                  ],
                },
                {
                  role: 'Freelance Developer', company: 'Self-employed',
                  period: '2022 – 2023', location: 'Remote · Freelance',
                  bullets: [
                    'Delivered 10+ websites and landing pages for local businesses and NGOs.',
                    'Built custom WordPress themes and plugins for 6 small business clients.',
                  ],
                },
              ].map(e => (
                <div key={e.role + e.company} className="r-item">
                  <div className="r-item-header">
                    <div>
                      <div className="r-item-role">{e.role}</div>
                      <div className="r-item-company">{e.company}</div>
                    </div>
                    <div className="r-item-meta">
                      <div>{e.period}</div>
                      <div>{e.location}</div>
                    </div>
                  </div>
                  <ul className="r-bullets">
                    {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="r-section">
              <div className="r-section-title">Projects</div>
              {[
                { name: 'TaskFlow — Project Management App', stack: 'React · Node.js · MongoDB · Socket.io', desc: 'Real-time collaborative task manager with drag-and-drop boards, team workspaces, and live notifications.' },
                { name: 'ShopEase — E-Commerce Platform', stack: 'Next.js · Stripe · Firebase · Tailwind', desc: 'Full-featured e-commerce platform with cart, payments, admin dashboard, and order tracking.' },
                { name: 'DevConnect — Developer Network', stack: 'React · Express · MongoDB · JWT', desc: 'Social platform for developers to share projects, follow peers, and collaborate on open-source.' },
              ].map(p => (
                <div key={p.name} className="r-project">
                  <div className="r-project-name">{p.name}</div>
                  <div className="r-project-stack">{p.stack}</div>
                  <div className="r-project-desc">{p.desc}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
