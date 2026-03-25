import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools"];

const SKILLS = [
  /* Frontend */
  { name: "React",        cat: "Frontend",  pct: 92, icon: "⚛️",  color: "#61dafb", desc: "Component architecture, hooks, context, performance optimisation." },
  { name: "Next.js",      cat: "Frontend",  pct: 65, icon: "▲",   color: "#ffffff", desc: "SSR, SSG, App Router, API routes, image optimisation." },
  { name: "TypeScript",   cat: "Frontend",  pct: 28, icon: "TS",  color: "#3178c6", desc: "Strict typing, generics, utility types, declaration files." },
  { name: "Tailwind CSS", cat: "Frontend",  pct: 95, icon: "🌊",  color: "#38bdf8", desc: "Utility-first styling, custom themes, responsive design." },
  { name: "Framer Motion",cat: "Frontend",  pct: 80, icon: "🎞️", color: "#e879f9", desc: "Declarative animations, gestures, layout transitions." },
  { name: "JavaScript",   cat: "Frontend",  pct: 90, icon: "JS",  color: "#f7df1e", desc: "ES2022+, async/await, closures, event loop mastery." },

  /* Backend */
  { name: "Node.js",      cat: "Backend",   pct: 85, icon: "🟢",  color: "#68a063", desc: "Event-driven server, streams, worker threads, clustering." },
  { name: "Express",      cat: "Backend",   pct: 88, icon: "🚂",  color: "#ffffff", desc: "REST APIs, middleware chains, error handling, auth." },
  { name: "REST APIs",    cat: "Backend",   pct: 90, icon: "🔗",  color: "#f97316", desc: "Resource design, versioning, pagination, rate limiting." },
  { name: "GraphQL",      cat: "Backend",   pct: 65, icon: "◈",   color: "#e535ab", desc: "Schema design, resolvers, Apollo Server, subscriptions." },

  /* Database */
  { name: "MongoDB",      cat: "Database",  pct: 82, icon: "🍃",  color: "#47a248", desc: "Aggregation pipelines, indexing, Atlas, Mongoose ODM." },
  { name: "Firebase",     cat: "Database",  pct: 75, icon: "🔥",  color: "#ffca28", desc: "Firestore, Realtime DB, Auth, Cloud Functions." },
  { name: "PostgreSQL",   cat: "Database",  pct: 60, icon: "🐘",  color: "#336791", desc: "Relational design, joins, transactions, Prisma ORM." },

  /* Tools */
  { name: "Git & GitHub", cat: "Tools",     pct: 92, icon: "🐙",  color: "#f0f0f0", desc: "Branching strategies, PRs, CI/CD, GitHub Actions." },
  { name: "Figma",        cat: "Tools",     pct: 74, icon: "🎨",  color: "#a259ff", desc: "Component libraries, auto-layout, prototyping, handoff." },
  { name: "Docker",       cat: "Tools",     pct: 58, icon: "🐳",  color: "#2496ed", desc: "Containerisation, Compose, multi-stage builds." },
  { name: "Vercel",       cat: "Tools",     pct: 88, icon: "▲",   color: "#ffffff", desc: "Edge deployments, preview URLs, env management." },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Skills({ darkMode }) {
  const sectionRef  = useRef(null);
  const headRef     = useRef(null);
  const filterRef   = useRef(null);
  const gridRef     = useRef(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill,  setSelectedSkill]  = useState(null);
  const [barsVisible,    setBarsVisible]    = useState(false);
  const [hoveredSkill,   setHoveredSkill]   = useState(null);
  const [inView,         setInView]         = useState(false);

  const isDark   = darkMode;
  const bg       = isDark ? "#0a0908"                  : "#f5f3f0";
  const bgCard   = isDark ? "rgba(255,255,255,0.03)"   : "rgba(255,255,255,0.7)";
  const bgCardHov= isDark ? "rgba(255,255,255,0.06)"   : "rgba(255,255,255,0.95)";
  const border   = isDark ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)";
  const borderHov= isDark ? "rgba(255,255,255,0.18)"   : "rgba(0,0,0,0.18)";
  const txt      = isDark ? "#f0ede8"                  : "#1a1714";
  const muted    = isDark ? "rgba(240,237,232,0.42)"   : "rgba(26,23,20,0.45)";
  const modalBg  = isDark ? "#141210"                  : "#ffffff";

  const filtered = activeCategory === "All"
    ? SKILLS
    : SKILLS.filter(s => s.cat === activeCategory);

  /* ── Intersection observer ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setTimeout(() => {
            headRef.current?.classList.add("sk-in");
            filterRef.current?.classList.add("sk-in");
          }, 80);
          setTimeout(() => {
            gridRef.current?.classList.add("sk-in");
          }, 220);
          setTimeout(() => setBarsVisible(true), 500);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* reset bars when category changes so they re-animate */
  const handleCategoryChange = (cat) => {
    setBarsVisible(false);
    setActiveCategory(cat);
    setTimeout(() => setBarsVisible(true), 120);
  };

  /* close modal on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelectedSkill(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── entry ── */
        .sk-fade-up {
          opacity: 0; transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1),
                      transform 0.85s cubic-bezier(0.16,1,0.3,1);
        }
        .sk-fade-filter {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                      transform 0.75s cubic-bezier(0.16,1,0.3,1);
          transition-delay: 0.12s;
        }
        .sk-fade-grid {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                      transform 0.8s cubic-bezier(0.16,1,0.3,1);
          transition-delay: 0.22s;
        }
        .sk-in.sk-fade-up,
        .sk-in.sk-fade-filter,
        .sk-in.sk-fade-grid { opacity:1 !important; transform:none !important; }

        /* ── skill card ── */
        .sk-card {
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.28s ease,
                      border-color 0.2s ease,
                      background 0.2s ease;
          cursor: pointer;
        }
        .sk-card:hover { transform: translateY(-6px) scale(1.02); }
        .sk-card:active { transform: scale(0.97); }

        /* ── bar fill ── */
        .sk-bar-fill {
          height: 100%; border-radius: 999px;
          background: linear-gradient(90deg, #f97316, #ec4899, #a855f7);
          width: 0%;
          transition: width 1.1s cubic-bezier(0.16,1,0.3,1);
          position: relative; overflow: hidden;
        }
        .sk-bar-fill::after {
          content: '';
          position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: skShimmer 2.2s ease-in-out infinite;
        }
        .sk-bar-fill.sk-visible { width: var(--pct); }
        @keyframes skShimmer {
          0%   { left: -60%; }
          100% { left: 120%; }
        }

        /* ── filter pill ── */
        .sk-pill {
          transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
        }
        .sk-pill:hover { transform: scale(1.06); }
        .sk-pill:active { transform: scale(0.95); }

        /* ── modal backdrop ── */
        .sk-modal-backdrop {
          animation: skBackdropIn 0.25s ease forwards;
        }
        @keyframes skBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .sk-modal-card {
          animation: skModalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes skModalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ── orb float ── */
        @keyframes skOrb {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-12px,16px) scale(1.04); }
        }

        /* ── icon bounce on card hover ── */
        .sk-icon {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          display: inline-block;
        }
        .sk-card:hover .sk-icon { transform: scale(1.25) rotate(-6deg); }

        /* ── responsive ── */
        @media (max-width: 640px) {
          .sk-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .sk-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        id="skills"
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
        {/* ── ambient orbs ── */}
        <div style={{
          position: "absolute", left: "-5%", top: "10%",
          width: 480, height: 480, borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "skOrb 11s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", right: "-8%", bottom: "15%",
          width: 520, height: 520, borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "skOrb 15s ease-in-out infinite reverse",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>

          {/* ── Heading ── */}
          <div ref={headRef} className="sk-fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{
              display: "inline-block", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.18em", color: muted, marginBottom: 16,
              textTransform: "uppercase",
            }}>
              — What I Work With
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 7vw, 88px)",
              fontWeight: 600, lineHeight: 0.95,
              letterSpacing: "-0.02em", color: txt, margin: 0,
            }}>
              My{" "}
              <span style={{
                background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Skills
              </span>
            </h2>
            <p style={{
              marginTop: 20, fontSize: 15, color: muted,
              fontWeight: 300, lineHeight: 1.7, maxWidth: 480, margin: "20px auto 0",
            }}>
              Click any skill card to explore details. Filter by category to focus on what matters.
            </p>
          </div>

          {/* ── Category filter ── */}
          <div
            ref={filterRef}
            className="sk-fade-filter"
            style={{
              display: "flex", flexWrap: "wrap",
              justifyContent: "center", gap: 10, marginBottom: 52,
            }}
          >
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  className="sk-pill"
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    padding: "9px 22px",
                    borderRadius: 999,
                    border: isActive
                      ? "1px solid transparent"
                      : `1px solid ${border}`,
                    background: isActive
                      ? "linear-gradient(120deg, #f97316, #ec4899, #a855f7)"
                      : bgCard,
                    color: isActive ? "#fff" : muted,
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.03em",
                    boxShadow: isActive ? "0 4px 20px rgba(236,72,153,0.35)" : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* ── Skills grid ── */}
          <div
            ref={gridRef}
            className="sk-fade-grid sk-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {filtered.map((skill, i) => {
              const isHov = hoveredSkill === skill.name;
              return (
                <div
                  key={skill.name}
                  className="sk-card"
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    padding: "24px 22px",
                    borderRadius: 20,
                    background: isHov ? bgCardHov : bgCard,
                    border: `1px solid ${isHov ? borderHov : border}`,
                    boxShadow: isHov
                      ? isDark
                        ? `0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px ${skill.color}22`
                        : `0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px ${skill.color}33`
                      : "none",
                    display: "flex", flexDirection: "column", gap: 16,
                    animationDelay: `${i * 0.04}s`,
                  }}
                >
                  {/* Icon + name row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      className="sk-icon"
                      style={{
                        width: 42, height: 42,
                        borderRadius: 12,
                        background: `${skill.color}18`,
                        border: `1px solid ${skill.color}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: skill.icon.length <= 2 ? 14 : 20,
                        fontWeight: 700,
                        color: skill.color,
                        flexShrink: 0,
                        fontFamily: "monospace",
                      }}
                    >
                      {skill.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: txt, lineHeight: 1.2 }}>
                        {skill.name}
                      </div>
                      <div style={{ fontSize: 11, color: muted, marginTop: 2, letterSpacing: "0.06em" }}>
                        {skill.cat}
                      </div>
                    </div>
                  </div>

                  {/* Bar */}
                  <div>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      marginBottom: 7,
                    }}>
                      <span style={{ fontSize: 11, color: muted, letterSpacing: "0.06em" }}>
                        Proficiency
                      </span>
                      <span style={{
                        fontSize: 12, fontWeight: 700,
                        background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                        {skill.pct}%
                      </span>
                    </div>
                    <div style={{
                      height: 5, borderRadius: 999,
                      background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                      overflow: "hidden",
                    }}>
                      <div
                        className={`sk-bar-fill${barsVisible ? " sk-visible" : ""}`}
                        style={{
                          "--pct": `${skill.pct}%`,
                          transitionDelay: `${i * 0.06}s`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Click hint */}
                  <div style={{
                    fontSize: 11, color: muted,
                    opacity: isHov ? 1 : 0,
                    transition: "opacity 0.2s ease",
                    letterSpacing: "0.06em",
                  }}>
                    Click to explore →
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Summary bar ── */}
          <div style={{
            marginTop: 64,
            padding: "28px 36px",
            borderRadius: 20,
            background: bgCard,
            border: `1px solid ${border}`,
            display: "flex", flexWrap: "wrap",
            justifyContent: "space-around", gap: 24,
          }}>
            {[
              { label: "Technologies", value: SKILLS.length + "+" },
              { label: "Frontend",     value: SKILLS.filter(s => s.cat === "Frontend").length },
              { label: "Backend",      value: SKILLS.filter(s => s.cat === "Backend").length },
              { label: "Avg. Mastery", value: Math.round(SKILLS.reduce((a, s) => a + s.pct, 0) / SKILLS.length) + "%" },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 700, lineHeight: 1,
                  background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {value}
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
                  color: muted, textTransform: "uppercase", marginTop: 6,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skill detail modal ── */}
      {selectedSkill && (
        <div
          className="sk-modal-backdrop"
          onClick={() => setSelectedSkill(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            className="sk-modal-card"
            onClick={e => e.stopPropagation()}
            style={{
              background: modalBg,
              border: `1px solid ${border}`,
              borderRadius: 28,
              padding: "40px 36px",
              maxWidth: 440, width: "100%",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              fontFamily: "'DM Sans', sans-serif",
              position: "relative",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedSkill(null)}
              style={{
                position: "absolute", top: 18, right: 18,
                width: 32, height: 32, borderRadius: "50%",
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                border: `1px solid ${border}`,
                color: muted, fontSize: 16, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"; }}
            >
              ✕
            </button>

            {/* Icon */}
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: `${selectedSkill.color}18`,
              border: `1px solid ${selectedSkill.color}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: selectedSkill.icon.length <= 2 ? 22 : 32,
              fontWeight: 700, color: selectedSkill.color,
              fontFamily: "monospace",
              marginBottom: 20,
            }}>
              {selectedSkill.icon}
            </div>

            {/* Name + category */}
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 36, fontWeight: 700,
              color: txt, margin: "0 0 4px",
              lineHeight: 1,
            }}>
              {selectedSkill.name}
            </h3>
            <span style={{
              display: "inline-block",
              fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
              color: muted, textTransform: "uppercase", marginBottom: 24,
            }}>
              {selectedSkill.cat}
            </span>

            {/* Description */}
            <p style={{
              fontSize: 14, color: muted, lineHeight: 1.8,
              fontWeight: 300, marginBottom: 28,
            }}>
              {selectedSkill.desc}
            </p>

            {/* Proficiency bar */}
            <div style={{ marginBottom: 8 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", marginBottom: 10,
              }}>
                <span style={{ fontSize: 12, color: muted, letterSpacing: "0.08em", fontWeight: 500 }}>
                  PROFICIENCY
                </span>
                <span style={{
                  fontSize: 14, fontWeight: 700,
                  background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {selectedSkill.pct}%
                </span>
              </div>
              <div style={{
                height: 8, borderRadius: 999,
                background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  background: "linear-gradient(90deg, #f97316, #ec4899, #a855f7)",
                  width: `${selectedSkill.pct}%`,
                  transition: "width 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    animation: "skShimmer 2s ease-in-out infinite",
                  }} />
                </div>
              </div>
            </div>

            {/* Level label */}
            <div style={{
              marginTop: 16,
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 999,
              background: `${selectedSkill.color}14`,
              border: `1px solid ${selectedSkill.color}28`,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: selectedSkill.color, display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: selectedSkill.color }}>
                {selectedSkill.pct >= 88 ? "Expert" : selectedSkill.pct >= 75 ? "Advanced" : selectedSkill.pct >= 60 ? "Intermediate" : "Learning"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
