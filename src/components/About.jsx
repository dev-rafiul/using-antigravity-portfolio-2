import { useEffect, useRef, useState } from "react";

const TABS = ["Story", "What I Do", "Beyond Code"];

const STORY = `My journey into programming started with a single HTML file and a burning curiosity. I wanted to understand how the web worked — not just use it. That curiosity turned into late nights, countless tutorials, and eventually a genuine passion for building things that live on the internet.

Today I craft full-stack web applications with a focus on clean architecture, smooth user experiences, and code that's actually maintainable. Every project teaches me something new, and I wouldn't have it any other way.`;

const WHAT_I_DO = `I specialize in the full spectrum — from pixel-perfect React interfaces to robust Node.js APIs and MongoDB databases. I enjoy the challenge of bridging design and engineering, making sure what looks good also works flawlessly under the hood.

I care deeply about performance, accessibility, and the small details that separate a good product from a great one. Whether it's a micro-interaction or a complex data flow, I bring the same level of attention to every layer.`;

const BEYOND = `When I step away from the screen, you'll find me on the tennis court, experimenting with abstract painting, or trying out a new recipe in the kitchen. I believe creativity in life feeds creativity in code.

I'm also an avid reader — mostly tech, design, and the occasional philosophy book. I think the best developers are curious about everything, not just their stack.`;

const TAB_CONTENT = [STORY, WHAT_I_DO, BEYOND];

const SKILLS_QUICK = [
  { label: "React / Next.js",  pct: 92 },
  { label: "Node.js / Express", pct: 85 },
  { label: "MongoDB",           pct: 80 },
  { label: "Tailwind CSS",      pct: 95 },
  { label: "TypeScript",        pct: 28 },
  { label: "Figma / UI Design", pct: 72 },
];

const FACTS = [
  { num: "1+",  sub: "Years of\nExperience" },
  { num: "10+", sub: "Projects\nDelivered"  },
  { num: "1+", sub: "Happy\nClients"       },
  { num: "∞",   sub: "Cups of\nCoffee / Tea"      },
];

export default function About({ darkMode }) {
  const sectionRef  = useRef(null);
  const headRef     = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);
  const factsRef    = useRef(null);
  const [activeTab, setActiveTab]     = useState(0);
  const [hoveredBar, setHoveredBar]   = useState(null);
  const [barsVisible, setBarsVisible] = useState(false);
  const [inView, setInView]           = useState(false);

  const isDark  = darkMode;
  const bg      = isDark ? "#0f0d0b"                  : "#faf8f5";
  const bgCard  = isDark ? "rgba(255,255,255,0.03)"   : "rgba(0,0,0,0.03)";
  const border  = isDark ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const txt     = isDark ? "#f0ede8"                  : "#1a1714";
  const muted   = isDark ? "rgba(240,237,232,0.42)"   : "rgba(26,23,20,0.45)";
  const line    = isDark ? "rgba(255,255,255,0.10)"   : "rgba(0,0,0,0.10)";
  const tabActiveBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

  /* ── Intersection observ ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setTimeout(() => {
            headRef.current?.classList.add("ab-in");
            leftRef.current?.classList.add("ab-in");
            rightRef.current?.classList.add("ab-in");
            factsRef.current?.classList.add("ab-in");
          }, 80);
          setTimeout(() => setBarsVisible(true), 600);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── entry animations ── */
        .ab-fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .ab-fade-left {
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
          transition-delay: 0.15s;
        }
        .ab-fade-right {
          opacity: 0;
          transform: translateX(48px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
          transition-delay: 0.25s;
        }
        .ab-fade-facts {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
          transition-delay: 0.4s;
        }
        .ab-in.ab-fade-up,
        .ab-in.ab-fade-left,
        .ab-in.ab-fade-right,
        .ab-in.ab-fade-facts {
          opacity: 1 !important;
          transform: none !important;
        }

        /* ── skill bar ── */
        .skill-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #f97316, #ec4899, #a855f7);
          width: 0%;
          transition: width 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .skill-bar-fill.visible { width: var(--pct); }

        /* ── tab content fade ── */
        .tab-body {
          animation: tabFade 0.35s ease forwards;
        }
        @keyframes tabFade {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0);   }
        }

        /* ── photo ring spin ── */
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ring-spin { animation: ringRotate 12s linear infinite; }

        /* ── orb float ── */
        @keyframes aboutOrb {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(10px,-14px) scale(1.05); }
        }

        /* ── fact counter hover ── */
        .fact-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .fact-card:hover {
          transform: translateY(-6px) scale(1.03);
        }

        /* ── tag hover ── */
        .tech-tag {
          transition: all 0.2s ease;
          cursor: default;
        }
        .tech-tag:hover {
          transform: translateY(-2px) scale(1.06);
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          background: bg,
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.5s ease",
          padding: "120px 0 100px",
        }}
      >
        {/* ── background orb ── */}
        <div style={{
          position: "absolute", right: "-10%", top: "20%",
          width: 500, height: 500, borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "aboutOrb 10s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", left: "-8%", bottom: "15%",
          width: 400, height: 400, borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "aboutOrb 14s ease-in-out infinite reverse",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>

          {/* ── Section heading ── */}
          <div ref={headRef} className="ab-fade-up" style={{ marginBottom: 72, textAlign: "center" }}>
            <span style={{
              display: "inline-block",
              fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
              color: muted, marginBottom: 16, textTransform: "uppercase",
            }}>
              — Who I Am
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: txt,
              margin: 0,
            }}>
              About{" "}
              <span style={{
                background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Me
              </span>
            </h2>
          </div>

          {/* ── Main grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "start",
          }}
            className="about-grid"
          >
            {/* ── LEFT — photo + facts ── */}
            <div ref={leftRef} className="ab-fade-left" style={{ display: "flex", flexDirection: "column", gap: 32 }}>

             
              <div style={{
                position: "relative",
                borderRadius: 28,
                overflow: "hidden",
                background: bgCard,
                border: `1px solid ${border}`,
                aspectRatio: "4/5",
                maxHeight: 480,
              }}>
                {/* Spinning gradient ring */}
                <div className="ring-spin" style={{
                  position: "absolute", inset: -3,
                  borderRadius: 30,
                  background: "conic-gradient(from 0deg, #f97316, #ec4899, #a855f7, transparent, transparent, #f97316)",
                  zIndex: 0,
                  opacity: 0.5,
                }} />

              
                <div style={{
                  position: "absolute", inset: 2,
                  borderRadius: 26,
                  overflow: "hidden",
                  zIndex: 1,
                  background: isDark ? "#1a1714" : "#e8e4df",
                }}>
                  <img
                    src="https://i.ibb.co.com/mVBjQsFJ/rafiul.jpg"
                    alt="Rafiul Islam"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  
                  <div style={{
                    position: "absolute", inset: 0,
                    background: isDark
                      ? "linear-gradient(to top, rgba(15,13,11,0.7) 0%, transparent 50%)"
                      : "linear-gradient(to top, rgba(250,248,245,0.6) 0%, transparent 50%)",
                  }} />
                  {/* Name tag */}
                  <div style={{
                    position: "absolute", bottom: 20, left: 20, right: 20,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#f0ede8" }}>
                        Rafiul Islam
                      </div>
                      <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(240,237,232,0.6)" }}>
                        Full Stack Developer
                      </div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "5px 12px", borderRadius: 999,
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.3)",
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                      <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 500 }}>Open to work</span>
                    </div>
                  </div>
                </div>
              </div>

            
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind", "Express", "Figma"].map(tag => (
                  <span key={tag} className="tech-tag" style={{
                    padding: "5px 14px",
                    borderRadius: 999,
                    fontSize: 12, fontWeight: 500,
                    color: muted,
                    background: bgCard,
                    border: `1px solid ${border}`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          
            <div ref={rightRef} className="ab-fade-right" style={{ display: "flex", flexDirection: "column", gap: 36 }}>

              
              <div>
                <div style={{
                  display: "flex", gap: 4,
                  background: bgCard,
                  border: `1px solid ${border}`,
                  borderRadius: 14,
                  padding: 4,
                  marginBottom: 28,
                }}>
                  {TABS.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(i)}
                      style={{
                        flex: 1,
                        padding: "9px 0",
                        borderRadius: 10,
                        border: "none",
                        cursor: "pointer",
                        fontSize: 13, fontWeight: activeTab === i ? 600 : 400,
                        color: activeTab === i ? txt : muted,
                        background: activeTab === i ? tabActiveBg : "transparent",
                        transition: "all 0.25s ease",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

              
                <div key={activeTab} className="tab-body" style={{
                  fontSize: "clamp(13px,1.1vw,15px)",
                  color: muted,
                  lineHeight: 1.85,
                  fontWeight: 300,
                  whiteSpace: "pre-line",
                }}>
                  {TAB_CONTENT[activeTab]}
                </div>
              </div>

            
              <div style={{ height: 1, background: `linear-gradient(90deg, ${line}, transparent)` }} />

              
              <div>
                <h3 style={{
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.12em",
                  color: muted, textTransform: "uppercase", marginBottom: 20,
                }}>
                  Core Skills
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {SKILLS_QUICK.map((s, i) => (
                    <div
                      key={s.label}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                      style={{ cursor: "default" }}
                    >
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        marginBottom: 6,
                      }}>
                        <span style={{
                          fontSize: 13, fontWeight: 500,
                          color: hoveredBar === i ? txt : muted,
                          transition: "color 0.2s ease",
                        }}>
                          {s.label}
                        </span>
                        <span style={{
                          fontSize: 12, fontWeight: 600,
                          background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          opacity: hoveredBar === i ? 1 : 0.7,
                          transition: "opacity 0.2s ease",
                        }}>
                          {s.pct}%
                        </span>
                      </div>
                      <div style={{
                        height: 4, borderRadius: 999,
                        background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                        overflow: "hidden",
                        transform: hoveredBar === i ? "scaleY(1.5)" : "scaleY(1)",
                        transition: "transform 0.2s ease",
                        transformOrigin: "left center",
                      }}>
                        <div
                          className={`skill-bar-fill${barsVisible ? " visible" : ""}`}
                          style={{
                            "--pct": `${s.pct}%`,
                            transitionDelay: `${i * 0.08}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "11px 24px", borderRadius: 999,
                    background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                    color: "#fff", fontSize: 13, fontWeight: 600,
                    textDecoration: "none", letterSpacing: "0.03em",
                    boxShadow: "0 4px 20px rgba(236,72,153,0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(236,72,153,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(236,72,153,0.3)"; }}
                >
                  ↓ Download CV
                </a>
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "11px 24px", borderRadius: 999,
                    background: bgCard,
                    border: `1px solid ${border}`,
                    color: txt, fontSize: 13, fontWeight: 500,
                    textDecoration: "none", letterSpacing: "0.03em",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = bgCard; }}
                >
                  Let's Talk ↗
                </a>
              </div>
            </div>
          </div>

          
          <div
            ref={factsRef}
            className="ab-fade-facts about-facts"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
              marginTop: 72,
            }}
          >
            {FACTS.map(({ num, sub }) => (
              <div
                key={num}
                className="fact-card"
                style={{
                  padding: "28px 24px",
                  borderRadius: 20,
                  background: bgCard,
                  border: `1px solid ${border}`,
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <div style={{
                  fontFamily: "serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 8,
                }}>
                  {num}
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.1em", color: muted,
                  textTransform: "uppercase", whiteSpace: "pre-line", lineHeight: 1.5,
                }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>

        </div>

        
        <style>{`
          @media (max-width: 768px) {
            .about-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}