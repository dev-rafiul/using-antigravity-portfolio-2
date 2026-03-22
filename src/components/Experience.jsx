import { useEffect, useRef, useState } from "react";

/* ── DATA ── */
const EXPERIENCES = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "TechNova Solutions",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
    period: "Jan 2024 — Present",
    duration: "1 yr+",
    current: true,
    color: "#f97316",
    gradient: "linear-gradient(135deg,#f97316,#ec4899)",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    summary: "Leading frontend architecture and building scalable full-stack features for a SaaS platform serving 50k+ users.",
    bullets: [
      "Architected a component library used across 4 product teams, reducing UI dev time by 35%.",
      "Built real-time notification system with WebSockets handling 10k+ concurrent connections.",
      "Optimised MongoDB aggregation pipelines, cutting dashboard load time from 4.2s to 0.8s.",
      "Mentored 2 junior developers through code reviews and pair programming sessions.",
    ],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Creative Digital Agency",
    type: "Full-time",
    location: "Remote",
    period: "Jun 2023 — Dec 2023",
    duration: "7 mos",
    current: false,
    color: "#a855f7",
    gradient: "linear-gradient(135deg,#a855f7,#3b82f6)",
    tags: ["Next.js", "TypeScript", "Tailwind", "Figma"],
    summary: "Delivered pixel-perfect, animated marketing sites and web apps for 12+ clients across e-commerce and SaaS.",
    bullets: [
      "Converted Figma designs to production-ready Next.js pages with sub-100ms LCP scores.",
      "Implemented Framer Motion animation systems adopted as agency-wide standard.",
      "Integrated Stripe, Shopify, and custom CMS solutions for e-commerce clients.",
      "Reduced average page bundle size by 42% through code splitting and lazy loading.",
    ],
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "StartupHub BD",
    type: "Part-time",
    location: "Dhaka, Bangladesh",
    period: "Jan 2023 — May 2023",
    duration: "5 mos",
    current: false,
    color: "#22c55e",
    gradient: "linear-gradient(135deg,#22c55e,#06b6d4)",
    tags: ["React", "Firebase", "CSS", "REST APIs"],
    summary: "Built and maintained internal tools and client-facing dashboards for a startup accelerator programme.",
    bullets: [
      "Developed a startup tracking dashboard used by 30+ portfolio companies.",
      "Integrated Firebase Auth and Firestore for real-time data across 3 products.",
      "Collaborated directly with founders to translate requirements into working features.",
    ],
  },
  {
    id: 4,
    role: "Freelance Developer",
    company: "Self-employed",
    type: "Freelance",
    location: "Remote",
    period: "2022 — 2023",
    duration: "1 yr",
    current: false,
    color: "#06b6d4",
    gradient: "linear-gradient(135deg,#06b6d4,#a855f7)",
    tags: ["HTML/CSS", "JavaScript", "WordPress", "PHP"],
    summary: "Delivered 10+ websites and landing pages for local businesses, NGOs, and personal brands.",
    bullets: [
      "Built custom WordPress themes and plugins for 6 small business clients.",
      "Designed and developed landing pages with conversion-focused layouts.",
      "Maintained ongoing client relationships with monthly retainer agreements.",
    ],
  },
];

/* ── COMPONENT ── */
export default function Experience({ darkMode }) {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const timelineRef = useRef(null);

  const [activeId,    setActiveId]    = useState(1);
  const [expandedId,  setExpandedId]  = useState(null);
  const [visibleIds,  setVisibleIds]  = useState([]);
  const [lineHeight,  setLineHeight]  = useState(0);

  const isDark  = darkMode;
  const bg      = isDark ? "#0a0908"                  : "#f5f3f0";
  const bgCard  = isDark ? "rgba(255,255,255,0.03)"   : "rgba(255,255,255,0.75)";
  const bgHov   = isDark ? "rgba(255,255,255,0.055)"  : "rgba(255,255,255,0.98)";
  const border  = isDark ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const borderH = isDark ? "rgba(255,255,255,0.18)"   : "rgba(0,0,0,0.18)";
  const txt     = isDark ? "#f0ede8"                  : "#1a1714";
  const muted   = isDark ? "rgba(240,237,232,0.42)"   : "rgba(26,23,20,0.45)";

  const active = EXPERIENCES.find(e => e.id === activeId);

  /* ── scroll entry ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        headRef.current?.classList.add("ex-in");
        setTimeout(() => timelineRef.current?.classList.add("ex-in"), 150);
        EXPERIENCES.forEach((e, i) =>
          setTimeout(() => setVisibleIds(prev => [...prev, e.id]), 300 + i * 120)
        );
        /* animate timeline line */
        let h = 0;
        const iv = setInterval(() => {
          h = Math.min(h + 2, 100);
          setLineHeight(h);
          if (h >= 100) clearInterval(iv);
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── entry ── */
        .ex-fade-up {
          opacity:0; transform:translateY(36px);
          transition:opacity .85s cubic-bezier(.16,1,.3,1), transform .85s cubic-bezier(.16,1,.3,1);
        }
        .ex-fade-panel {
          opacity:0; transform:translateX(32px);
          transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
          transition-delay:.18s;
        }
        .ex-in.ex-fade-up,
        .ex-in.ex-fade-panel { opacity:1 !important; transform:none !important; }

        /* ── card stagger ── */
        @keyframes exCardIn {
          from { opacity:0; transform:translateX(-28px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .ex-card-visible { animation:exCardIn .55s cubic-bezier(.16,1,.3,1) forwards; }

        /* ── timeline dot pulse ── */
        @keyframes exDotPulse {
          0%,100% { box-shadow:0 0 0 0 var(--dot-color); }
          50%      { box-shadow:0 0 0 6px transparent; }
        }
        .ex-dot-active { animation:exDotPulse 2s ease-in-out infinite; }

        /* ── bullet reveal ── */
        @keyframes exBulletIn {
          from { opacity:0; transform:translateX(-12px); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── expand/collapse ── */
        .ex-bullets {
          overflow:hidden;
          transition:max-height .45s cubic-bezier(.16,1,.3,1), opacity .35s ease;
        }

        /* ── tag hover ── */
        .ex-tag { transition:all .2s cubic-bezier(.34,1.56,.64,1); }
        .ex-tag:hover { transform:translateY(-2px) scale(1.07); }

        /* ── card hover ── */
        .ex-card {
          transition:transform .28s cubic-bezier(.34,1.56,.64,1),
                     box-shadow .28s ease, border-color .2s ease, background .2s ease;
          cursor:pointer;
        }
        .ex-card:hover { transform:translateY(-4px); }
        .ex-card:active { transform:scale(.98); }

        /* ── detail panel tab ── */
        .ex-tab-body { animation:exTabFade .3s ease forwards; }
        @keyframes exTabFade {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── orb float ── */
        @keyframes exOrb {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(12px,-16px) scale(1.04); }
        }

        /* ── responsive ── */
        @media (max-width:900px) {
          .ex-layout { grid-template-columns:1fr !important; }
          .ex-detail  { display:none !important; }
        }
        @media (max-width:600px) {
          .ex-card-inner { flex-direction:column !important; gap:12px !important; }
        }
      `}</style>

      <section
        id="experience"
        ref={sectionRef}
        style={{
          position:"relative", width:"100%",
          background:bg, overflow:"hidden",
          fontFamily:"'DM Sans',sans-serif",
          transition:"background .5s ease",
          padding:"120px 0 100px",
        }}
      >
        {/* ── ambient orbs ── */}
        {[
          { right:"-6%", top:"10%",  w:480, c:"rgba(249,115,22,.07)",  d:"11s" },
          { left:"-7%",  bottom:"8%",w:500, c:"rgba(168,85,247,.07)",  d:"15s", r:true },
        ].map((o,i) => (
          <div key={i} style={{
            position:"absolute",
            right:o.right, left:o.left, top:o.top, bottom:o.bottom,
            width:o.w, height:o.w, borderRadius:"50%",
            background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`,
            filter:"blur(70px)",
            animation:`exOrb ${o.d} ease-in-out infinite${o.r?" reverse":""}`,
            pointerEvents:"none", zIndex:0,
          }}/>
        ))}

        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:1 }}>

          {/* ── Heading ── */}
          <div ref={headRef} className="ex-fade-up" style={{ textAlign:"center", marginBottom:64 }}>
            <span style={{ display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:"0.18em", color:muted, marginBottom:16, textTransform:"uppercase" }}>
              — Where I've Worked
            </span>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(48px,7vw,88px)", fontWeight:600,
              lineHeight:.95, letterSpacing:"-0.02em", color:txt, margin:0,
            }}>
              Work{" "}
              <span style={{ background:"linear-gradient(120deg,#f97316,#ec4899,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Experience
              </span>
            </h2>
          </div>

          {/* ── Layout: timeline left + detail right ── */}
          <div className="ex-layout" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }}>

            {/* ── LEFT: Timeline ── */}
            <div ref={timelineRef} className="ex-fade-up" style={{ position:"relative" }}>

              {/* Vertical line */}
              <div style={{
                position:"absolute", left:19, top:24, bottom:24, width:2,
                background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                borderRadius:999, overflow:"hidden",
              }}>
                <div style={{
                  width:"100%", borderRadius:999,
                  height:`${lineHeight}%`,
                  background:"linear-gradient(180deg,#f97316,#ec4899,#a855f7)",
                  transition:"height .05s linear",
                }}/>
              </div>

              {/* Cards */}
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {EXPERIENCES.map((exp, i) => {
                  const isActive   = activeId === exp.id;
                  const isExpanded = expandedId === exp.id;
                  const isVisible  = visibleIds.includes(exp.id);

                  return (
                    <div
                      key={exp.id}
                      className={`ex-card${isVisible ? " ex-card-visible" : ""}`}
                      style={{
                        opacity: isVisible ? undefined : 0,
                        animationDelay:`${i * 0.08}s`,
                        display:"flex", gap:0,
                      }}
                    >
                      {/* Dot */}
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginRight:20, flexShrink:0 }}>
                        <div
                          className={isActive ? "ex-dot-active" : ""}
                          style={{
                            "--dot-color": exp.color + "55",
                            width:40, height:40, borderRadius:"50%",
                            background: isActive ? exp.gradient : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"),
                            border:`2px solid ${isActive ? "transparent" : border}`,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:14, flexShrink:0,
                            transition:"all .3s ease",
                            boxShadow: isActive ? `0 0 20px ${exp.color}44` : "none",
                          }}
                          onClick={() => { setActiveId(exp.id); setExpandedId(null); }}
                        >
                          {exp.current ? "●" : "○"}
                        </div>
                      </div>

                      {/* Card body */}
                      <div
                        style={{
                          flex:1,
                          padding:"18px 20px",
                          borderRadius:18,
                          background: isActive ? bgHov : bgCard,
                          border:`1px solid ${isActive ? borderH : border}`,
                          boxShadow: isActive
                            ? isDark
                              ? `0 8px 32px rgba(0,0,0,.5), 0 0 0 1px ${exp.color}22`
                              : `0 8px 32px rgba(0,0,0,.1), 0 0 0 1px ${exp.color}22`
                            : "none",
                          transition:"all .3s ease",
                        }}
                        onClick={() => { setActiveId(exp.id); setExpandedId(null); }}
                      >
                        {/* Top row */}
                        <div className="ex-card-inner" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                              <h3 style={{ fontSize:15, fontWeight:700, color:txt, margin:0, lineHeight:1.2 }}>
                                {exp.role}
                              </h3>
                              {exp.current && (
                                <span style={{
                                  padding:"2px 8px", borderRadius:999, fontSize:9, fontWeight:700,
                                  background:"rgba(34,197,94,.15)", border:"1px solid rgba(34,197,94,.3)",
                                  color:"#4ade80", letterSpacing:"0.08em",
                                }}>CURRENT</span>
                              )}
                            </div>
                            <p style={{ fontSize:13, color:muted, margin:"3px 0 0" }}>
                              {exp.company} · {exp.location}
                            </p>
                          </div>
                          <div style={{ textAlign:"right", flexShrink:0 }}>
                            <div style={{ fontSize:11, color:muted }}>{exp.period}</div>
                            <div style={{
                              fontSize:11, fontWeight:600, marginTop:2,
                              background:"linear-gradient(120deg,#f97316,#ec4899,#a855f7)",
                              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                            }}>{exp.duration}</div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:10 }}>
                          {exp.tags.map(tag => (
                            <span key={tag} className="ex-tag" style={{
                              padding:"2px 9px", borderRadius:999, fontSize:10, fontWeight:500,
                              color:muted,
                              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                              border:`1px solid ${border}`,
                            }}>{tag}</span>
                          ))}
                        </div>

                        {/* Summary */}
                        <p style={{ fontSize:12, color:muted, lineHeight:1.7, fontWeight:300, margin:0 }}>
                          {exp.summary}
                        </p>

                        {/* Expand toggle */}
                        <button
                          onClick={e => { e.stopPropagation(); toggle(exp.id); }}
                          style={{
                            marginTop:10, background:"none", border:"none",
                            cursor:"pointer", fontSize:11, fontWeight:600,
                            color:exp.color, letterSpacing:"0.06em",
                            display:"flex", alignItems:"center", gap:4,
                            padding:0, transition:"gap .2s ease",
                          }}
                          onMouseEnter={e => e.currentTarget.style.gap = "8px"}
                          onMouseLeave={e => e.currentTarget.style.gap = "4px"}
                        >
                          {isExpanded ? "▲ Less" : "▼ Key Achievements"}
                        </button>

                        {/* Expandable bullets */}
                        <div className="ex-bullets" style={{ maxHeight: isExpanded ? 300 : 0, opacity: isExpanded ? 1 : 0 }}>
                          <ul style={{ margin:"12px 0 0", padding:"0 0 0 16px", display:"flex", flexDirection:"column", gap:6 }}>
                            {exp.bullets.map((b, bi) => (
                              <li
                                key={bi}
                                style={{
                                  fontSize:12, color:muted, lineHeight:1.7, fontWeight:300,
                                  animation: isExpanded ? `exBulletIn .4s cubic-bezier(.16,1,.3,1) ${bi * 0.07}s both` : "none",
                                }}
                              >
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT: Detail panel ── */}
            <div className="ex-detail ex-fade-panel" style={{ position:"sticky", top:120 }}>
              {active && (
                <div
                  key={active.id}
                  className="ex-tab-body"
                  style={{
                    borderRadius:24,
                    background:bgCard,
                    border:`1px solid ${border}`,
                    overflow:"hidden",
                    boxShadow: isDark ? "0 20px 60px rgba(0,0,0,.4)" : "0 20px 60px rgba(0,0,0,.08)",
                  }}
                >
                  {/* Gradient header */}
                  <div style={{
                    height:6,
                    background:active.gradient,
                  }}/>

                  <div style={{ padding:"32px 28px" }}>
                    {/* Role + company */}
                    <div style={{ marginBottom:20 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                        <div style={{
                          width:44, height:44, borderRadius:14,
                          background:active.gradient,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:18, flexShrink:0,
                        }}>
                          💼
                        </div>
                        <div>
                          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:txt, margin:0, lineHeight:1.1 }}>
                            {active.role}
                          </h3>
                          <p style={{ fontSize:13, color:muted, margin:"3px 0 0" }}>{active.company}</p>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:14 }}>
                        {[
                          { icon:"📍", val:active.location },
                          { icon:"📅", val:active.period },
                          { icon:"⏱", val:active.duration },
                          { icon:"💼", val:active.type },
                        ].map(({ icon, val }) => (
                          <span key={val} style={{
                            display:"inline-flex", alignItems:"center", gap:5,
                            padding:"4px 12px", borderRadius:999, fontSize:11, fontWeight:500,
                            color:muted,
                            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                            border:`1px solid ${border}`,
                          }}>
                            <span>{icon}</span>{val}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)", marginBottom:20 }}/>

                    {/* Summary */}
                    <p style={{ fontSize:14, color:muted, lineHeight:1.8, fontWeight:300, marginBottom:20 }}>
                      {active.summary}
                    </p>

                    {/* Achievements */}
                    <h4 style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:muted, textTransform:"uppercase", marginBottom:14 }}>
                      Key Achievements
                    </h4>
                    <ul style={{ margin:0, padding:"0 0 0 16px", display:"flex", flexDirection:"column", gap:10 }}>
                      {active.bullets.map((b, i) => (
                        <li key={i} style={{
                          fontSize:13, color:muted, lineHeight:1.75, fontWeight:300,
                          animation:`exBulletIn .4s cubic-bezier(.16,1,.3,1) ${i * 0.08}s both`,
                        }}>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:24 }}>
                      {active.tags.map(tag => (
                        <span key={tag} className="ex-tag" style={{
                          padding:"5px 14px", borderRadius:999, fontSize:12, fontWeight:500,
                          background:`${active.color}18`, border:`1px solid ${active.color}30`,
                          color:active.color,
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Stats bar ── */}
          <div style={{
            marginTop:64, padding:"28px 36px", borderRadius:20,
            background:bgCard, border:`1px solid ${border}`,
            display:"flex", flexWrap:"wrap", justifyContent:"space-around", gap:24,
          }}>
            {[
              { val:"2+",  label:"Years Total" },
              { val:EXPERIENCES.length, label:"Roles Held" },
              { val:"3",   label:"Companies" },
              { val:"20+", label:"Projects Shipped" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign:"center" }}>
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:"clamp(28px,3.5vw,42px)", fontWeight:700, lineHeight:1,
                  background:"linear-gradient(120deg,#f97316,#ec4899,#a855f7)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                }}>{val}</div>
                <div style={{ fontSize:11, fontWeight:500, letterSpacing:"0.1em", color:muted, textTransform:"uppercase", marginTop:6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
