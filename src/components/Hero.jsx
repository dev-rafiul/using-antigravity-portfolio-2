import { useEffect, useRef, useState } from "react";

export default function HumanizedHero() {
  const curtainRef   = useRef(null);
  const heroRef      = useRef(null);
  const line1Ref     = useRef(null);
  const line2Ref     = useRef(null);
  const subtitleRef  = useRef(null);
  const bottomRef    = useRef(null);
  const sidesRef     = useRef(null);
  const playRef      = useRef(null);
  const [theme, setTheme] = useState("light");

  const isDark = theme === "dark";

  useEffect(() => {
    const timers = [];
    const t = (ms, fn) => timers.push(setTimeout(fn, ms));

    t(100,  () => curtainRef.current?.classList.add("open"));
    t(700,  () => heroRef.current?.classList.add("orb-in"));
    t(900,  () => line1Ref.current?.classList.add("in"));
    t(1100, () => line2Ref.current?.classList.add("in"));
    t(1350, () => subtitleRef.current?.classList.add("in"));
    t(1550, () => bottomRef.current?.classList.add("in"));
    t(1700, () => sidesRef.current?.classList.add("in"));
    t(1900, () => playRef.current?.classList.add("in"));

    return () => timers.forEach(clearTimeout);
  }, []);

  const bg   = isDark ? "#0f0d0b" : "#faf8f5";
  const txt  = isDark ? "#f0ede8" : "#1a1714";
  const muted = isDark ? "rgba(240,237,232,0.35)" : "rgba(26,23,20,0.38)";
  const curtBg = isDark ? "#0f0d0b" : "#faf8f5";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── CURTAIN ── */
        @keyframes curtL { to { transform: translateX(-100%); } }
        @keyframes curtR { to { transform: translateX( 100%); } }
        .curtain { position:fixed;inset:0;z-index:300;display:flex;pointer-events:none; }
        .c-l { width:50%;height:100%;background:${curtBg};animation:curtL 1s cubic-bezier(0.76,0,0.24,1) 0.2s forwards; }
        .c-r { width:50%;height:100%;background:${curtBg};animation:curtR 1s cubic-bezier(0.76,0,0.24,1) 0.2s forwards; }

        /* ── ORB ── */
        @keyframes orbFloat {
          0%,100% { transform:translate(-50%,-48%) scale(1); }
          50%      { transform:translate(-50%,-52%) scale(1.06); }
        }
        .orb-wrap { opacity:0; transition:opacity 1.2s ease; }
        .orb-in .orb-wrap { opacity:1; }

        /* ── TEXT reveals ── */
        .reveal-line {
          overflow:hidden; display:block;
        }
        .reveal-inner {
          display:block;
          transform:translateY(108%);
          transition:transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease;
          opacity:0;
        }
        .reveal-line.in .reveal-inner { transform:translateY(0); opacity:1; }

        .fade-up {
          opacity:0;transform:translateY(18px);
          transition:opacity 0.8s ease,transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .fade-up.in { opacity:1;transform:translateY(0); }

        .fade-sides {
          opacity:0;
          transition:opacity 0.8s ease;
        }
        .fade-sides.in { opacity:1; }

        /* ── PLAY BUTTON ── */
        @keyframes playPop {
          0%   { opacity:0;transform:scale(0.7) translateY(14px); }
          65%  { transform:scale(1.06) translateY(-3px); }
          100% { opacity:1;transform:scale(1) translateY(0); }
        }
        .play-wrap {
          opacity:0;
          animation-fill-mode:forwards;
        }
        .play-wrap.in {
          animation:playPop 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        /* ── GRADIENT text ── */
        .grad-text {
          background: linear-gradient(120deg, #f97316 0%, #ec4899 55%, #a855f7 100%);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        /* ── THEME toggle ── */
        .theme-pill {
          display:inline-flex;align-items:center;gap:0;
          border-radius:999px;overflow:hidden;
          border:1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"};
        }
        .theme-btn {
          padding:3px 10px;font-size:10px;letter-spacing:0.06em;
          font-family:'DM Sans',sans-serif;font-weight:500;
          background:transparent;cursor:pointer;border:none;
          transition:all 0.2s ease;
        }
        .theme-btn.active {
          background:${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"};
        }

        /* ── PLAY BUTTON hover ── */
        .play-btn { transition:transform 0.25s ease; }
        .play-btn:hover { transform:scale(1.04); }

        /* ── KNOW MORE hover ── */
        .know-link {
          display:inline-flex;align-items:center;gap:6px;
          font-size:13px;font-weight:500;letter-spacing:0.04em;
          border-bottom:1px solid ${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)"};
          padding-bottom:2px;cursor:pointer;
          transition:gap 0.2s ease;
        }
        .know-link:hover { gap:10px; }

        /* ── VERTICAL TEXT ── */
        .vert-l { writing-mode:vertical-rl; transform:rotate(180deg); }
        .vert-r { writing-mode:vertical-rl; }
      `}</style>

      {/* Curtain */}
      <div className="curtain">
        <div className="c-l" />
        <div className="c-r" />
      </div>

      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          position:"relative", width:"100vw", height:"100vh",
          background: bg,
          overflow:"hidden",
          fontFamily:"'DM Sans',sans-serif",
          transition:"background 0.4s ease",
        }}
      >
        {/* ── ORB behind heading ── */}
        <div
          className="orb-wrap"
          style={{
            position:"absolute",
            left:"50%", top:"46%",
            transform:"translate(-50%,-48%)",
            width:"520px", height:"520px",
            borderRadius:"50%",
            background: isDark
              ? "radial-gradient(circle, rgba(249,115,22,0.12) 0%, rgba(236,72,153,0.10) 45%, transparent 72%)"
              : "radial-gradient(circle, rgba(249,115,22,0.13) 0%, rgba(236,72,153,0.11) 45%, transparent 72%)",
            filter:"blur(50px)",
            animation:"orbFloat 7s ease-in-out infinite",
            pointerEvents:"none",
            zIndex:0,
          }}
        />

        {/* ── LEFT EDGE ── */}
        <div
          ref={sidesRef}
          className="fade-sides"
          style={{
            position:"absolute", left:22, top:0, bottom:0,
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            gap:24, zIndex:20,
          }}
        >
          {/* Scroll indicator */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:28, height:1, background: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)" }} />
            <span className="vert-l" style={{ fontSize:10, letterSpacing:"0.14em", color: muted, fontWeight:400 }}>
              Scroll
            </span>
          </div>

          {/* Theme toggle */}
          <div className="theme-pill" style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)" }}>
            <button
              className={`theme-btn${theme==="dark" ? " active":""}`}
              style={{ color: isDark ? "#f0ede8" : "#1a1714" }}
              onClick={() => setTheme("dark")}
            >Dark</button>
            <button
              className={`theme-btn${theme==="light" ? " active":""}`}
              style={{ color: isDark ? "#f0ede8" : "#1a1714" }}
              onClick={() => setTheme("light")}
            >Light</button>
          </div>
        </div>

        {/* ── RIGHT EDGE ── */}
        <div
          className="fade-sides"
          style={{
            position:"absolute", right:22, top:0, bottom:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            zIndex:20,
          }}
        >
          <span
            className="vert-r"
            style={{ fontSize:10, letterSpacing:"0.14em", color: muted, fontWeight:400 }}
          >
            Follow Us — Fb. / Ig. / Tw.
          </span>
        </div>

        {/* ── CENTER CONTENT ── */}
        <div
          style={{
            position:"relative", zIndex:10,
            height:"100%",
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            paddingLeft:60, paddingRight:60,
          }}
        >
          {/* Heading */}
          <div
            style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontWeight:600,
              fontSize:"clamp(68px,10vw,140px)",
              lineHeight:1.0,
              textAlign:"center",
              letterSpacing:"-0.02em",
              userSelect:"none",
            }}
          >
            {/* Line 1 */}
            <span ref={line1Ref} className="reveal-line" style={{ transitionDelay:"0s" }}>
              <span className="reveal-inner" style={{ color: txt }}>Humanized</span>
            </span>
            {/* Line 2 — gradient */}
            <span ref={line2Ref} className="reveal-line" style={{ transitionDelay:"0.1s" }}>
              <span className="reveal-inner grad-text">Design.</span>
            </span>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="fade-up"
            style={{
              marginTop:28,
              fontSize:"clamp(13px,1.3vw,16px)",
              color: muted,
              textAlign:"center",
              lineHeight:1.7,
              maxWidth:360,
              fontWeight:300,
              letterSpacing:"0.01em",
            }}
          >
            Crafting interfaces where form meets function,<br />
            and every pixel earns its place.
          </p>
        </div>

        {/* ── BOTTOM LEFT ── */}
        <div
          ref={bottomRef}
          className="fade-up"
          style={{
            position:"absolute", left:60, bottom:44, zIndex:20,
            maxWidth:260,
          }}
        >
          <p style={{ fontSize:13, color: muted, lineHeight:1.7, fontWeight:300, marginBottom:14 }}>
            I transform thorny problems into elegant solutions
            using visual design, rapid prototyping, and
            interaction skills.
          </p>
          <span className="know-link" style={{ color: txt }}>
            Know more
            <span style={{ fontSize:15 }}>→</span>
          </span>
        </div>

        {/* ── BOTTOM RIGHT: Play Intro ── */}
        <div
          ref={playRef}
          className="play-wrap"
          style={{
            position:"absolute", right:48, bottom:40, zIndex:20,
          }}
        >
          <div
            className="play-btn"
            style={{
              display:"flex", alignItems:"center", gap:12,
              cursor:"pointer",
            }}
          >
            {/* Avatar circle */}
            <div
              style={{
                width:44, height:44, borderRadius:"50%",
                background: isDark
                  ? "linear-gradient(135deg,#2a1f10,#3d2a14)"
                  : "linear-gradient(135deg,#e8ddd0,#d4c4b0)",
                border:`2px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                overflow:"hidden",
                flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}
            >
              {/* Play icon inside */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill={isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)"}>
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
            <span
              style={{
                fontSize:13, fontWeight:500,
                color: txt,
                letterSpacing:"0.03em",
              }}
            >
              Play Intro
            </span>
          </div>
        </div>
      </div>
    </>
  );
}