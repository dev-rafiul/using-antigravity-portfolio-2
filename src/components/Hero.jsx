import { useEffect, useRef } from "react";
// import rafiulImg from '../assets/rafiul.jpeg';
import rafiulImg from '../assets/face-of-rafiul.jpg';

export default function Hero({ darkMode }) {
  const heroRef     = useRef(null);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const subtitleRef = useRef(null);
  const bottomRef   = useRef(null);
  const sidesRef    = useRef(null);

  const isDark = darkMode;
  const bg     = isDark ? "#0f0d0b" : "#faf8f5";
  const txt    = isDark ? "#f0ede8" : "#1a1714";
  const muted  = isDark ? "rgba(240,237,232,0.38)" : "rgba(26,23,20,0.40)";
  const line   = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)";

  useEffect(() => {
    const timers = [];
    const t = (ms, fn) => timers.push(setTimeout(fn, ms));

    t(200,  () => heroRef.current?.classList.add("orb-in"));
    t(400,  () => line1Ref.current?.classList.add("in"));
    t(600,  () => line2Ref.current?.classList.add("in"));
    t(800,  () => subtitleRef.current?.classList.add("in"));
    t(1000, () => bottomRef.current?.classList.add("in"));
    t(1100, () => sidesRef.current?.classList.add("in"));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── ORB ── */
        .orb-wrap { opacity:0; transition:opacity 1.4s ease; }
        .orb-in .orb-wrap { opacity:1; }

        /* ── TEXT reveals ── */
        .reveal-line { overflow:hidden; display:block; }
        .reveal-inner {
          display:block;
          transform:translateY(110%);
          transition:transform 1s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease;
          opacity:0;
        }
        .reveal-line.in .reveal-inner { transform:translateY(0); opacity:1; }

        .fade-up {
          opacity:0; transform:translateY(20px);
          transition:opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-up.in { opacity:1; transform:translateY(0); }

        .fade-sides { opacity:0; transition:opacity 1s ease 0.2s; }
        .fade-sides.in { opacity:1; }

        /* ── GRADIENT text ── */
        .grad-text {
          background: linear-gradient(120deg, #f97316 0%, #ec4899 55%, #a855f7 100%);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        /* ── KNOW MORE ── */
        .know-link {
          display:inline-flex; align-items:center; gap:6px;
          font-size:13px; font-weight:500; letter-spacing:0.04em;
          padding-bottom:2px; cursor:pointer;
          transition:gap 0.2s ease;
        }
        .know-link:hover { gap:11px; }

        /* ── VERTICAL TEXT ── */
        .vert-l { writing-mode:vertical-rl; transform:rotate(180deg); }
        .vert-r { writing-mode:vertical-rl; }

        /* ── ORB float ── */
        @keyframes orbFloat {
          0%,100% { transform:translate(-50%,-48%) scale(1); }
          50%      { transform:translate(-50%,-52%) scale(1.06); }
        }

        /* ── SOCIAL dot pulse ── */
        @keyframes dotPulse {
          0%,100% { opacity:0.5; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.3); }
        }
        .dot-pulse { animation: dotPulse 2.4s ease-in-out infinite; }

        @keyframes heroRingGrad {
          0%   { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>

      {/* Hero */}
      <section
        id="home"
        ref={heroRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: bg,
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.5s ease",
        }}
      >
        {/* ── Ambient orb ── */}
        <div
          className="orb-wrap"
          style={{
            position: "absolute",
            left: "50%", top: "46%",
            transform: "translate(-50%,-48%)",
            width: "600px", height: "600px",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(249,115,22,0.13) 0%, rgba(236,72,153,0.10) 45%, transparent 72%)"
              : "radial-gradient(circle, rgba(249,115,22,0.14) 0%, rgba(236,72,153,0.11) 45%, transparent 72%)",
            filter: "blur(60px)",
            animation: "orbFloat 8s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── LEFT EDGE ── */}
        <div
          ref={sidesRef}
          className="fade-sides hero-sides"
          style={{
            position: "absolute", left: 24, top: 0, bottom: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 28, zIndex: 20,
          }}
        >
          {/* Scroll indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 1, background: line }} />
            <span className="vert-l" style={{ fontSize: 10, letterSpacing: "0.14em", color: muted, fontWeight: 400 }}>
              Scroll
            </span>
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            {[
              { label: "Gh", href: "https://github.com/dev-rafiul" },
              { label: "Li", href: "https://www.linkedin.com/in/dev-rafi/" },
              { label: "Tw", href: "https://twitter.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.06em",
                  color: muted, textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => e.target.style.color = txt}
                onMouseLeave={e => e.target.style.color = muted}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT EDGE ── */}
        <div
          className="fade-sides hero-sides"
          style={{
            position: "absolute", right: 24, top: 0, bottom: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 20,
          }}
        >
          <span className="vert-r" style={{ fontSize: 10, letterSpacing: "0.14em", color: muted, fontWeight: 400 }}>
            Available for work — 2025
          </span>
        </div>

        {/* ── CENTER CONTENT ── */}
        <div
          className="hero-center"
          style={{
            position: "relative", zIndex: 10,
            height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            paddingLeft: 80, paddingRight: 80,
          }}
        >
          {/* Badge */}
          <div
            ref={subtitleRef}
            className="fade-up"
            style={{
              marginBottom: 28,
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              border: `1px solid ${line}`,
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            }}
          >
            <span className="dot-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.1em", color: muted, fontWeight: 500 }}>
              FULL STACK DEVELOPER
            </span>
          </div>

          {/* Photo */}
          <div
            style={{
              marginBottom: 24,
              position: 'relative',
              width: 110, height: 110,
            }}
          >
            {/* spinning gradient ring */}
            <div style={{
              position: 'absolute', inset: -3, borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7, #f97316)',
              backgroundSize: '300% 300%',
              animation: 'heroRingGrad 3s linear infinite',
              zIndex: 0,
            }} />
            {/* white gap ring */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: isDark ? '#050505' : '#f9fafb',
              zIndex: 1,
              margin: 3,
            }} />
            <img
              src={rafiulImg}
              alt="Rafiul Islam"
              style={{
                position: 'absolute', inset: 6, borderRadius: '50%',
                width: 'calc(100% - 12px)', height: 'calc(100% - 12px)',
                objectFit: 'cover', objectPosition: 'top',
                zIndex: 2,
              }}
            />
          </div>

          {/* Heading */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: "clamp(72px, 11vw, 148px)",
              lineHeight: 0.95,
              textAlign: "center",
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          >
            <span ref={line1Ref} className="reveal-line">
              <span className="reveal-inner" style={{ color: txt }}>RAFIUL</span>
            </span>
            <span ref={line2Ref} className="reveal-line" style={{ transitionDelay: "0.08s" }}>
              <span className="reveal-inner grad-text">ISLAM</span>
            </span>
          </div>

          {/* Subtitle */}
          <p
            style={{
              marginTop: 32,
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: muted,
              textAlign: "center",
              lineHeight: 1.8,
              maxWidth: 380,
              fontWeight: 300,
              letterSpacing: "0.01em",
            }}
          >
            Crafting interfaces where form meets function,<br />
            and every pixel earns its place.
          </p>

          {/* CTA row */}
          <div
            ref={bottomRef}
            className="fade-up"
            style={{
              marginTop: 44,
              display: "flex", alignItems: "center", gap: 24,
            }}
          >
            {/* Primary CTA */}
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "12px 28px",
                borderRadius: 999,
                background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                color: "#fff",
                fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                boxShadow: "0 4px 24px rgba(236,72,153,0.35)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(236,72,153,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(236,72,153,0.35)"; }}
            >
              View Work
              <span style={{ fontSize: 16 }}>→</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="know-link"
              style={{
                color: txt,
                borderBottom: `1px solid ${line}`,
              }}
            >
              Let's talk
              <span style={{ fontSize: 15 }}>↗</span>
            </a>
          </div>
        </div>

        {/* ── BOTTOM decorative line ── */}
        <div
          className="fade-sides"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${line}, transparent)`,
            zIndex: 20,
          }}
        />

        {/* ── BOTTOM stats ── */}
        <div
          className="fade-sides hero-stats"
          style={{
            position: "absolute", bottom: 36, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: 48, zIndex: 20,
          }}
        >
          {[
            { num: "2+", label: "Years Exp." },
            { num: "15+", label: "Projects" },
            { num: "10+", label: "Clients" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(18px,2vw,24px)", fontWeight: 700,
                fontFamily: "'Cormorant Garamond', serif",
                background: "linear-gradient(120deg, #f97316, #ec4899, #a855f7)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {num}
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", color: muted, fontWeight: 400, marginTop: 2 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
