import { useEffect, useRef } from "react";

const blobs = [
  { cls: "w-[480px] h-[480px] -top-[10%] -left-[8%]", g: "#3b5bdb,#1c3faa", delay: "0s", td: "0.2s" },
  { cls: "w-[520px] h-[520px] top-[5%] -right-[5%]",  g: "#7048e8,#4c2dbf", delay: "-3s", td: "0.35s" },
  { cls: "w-[380px] h-[380px] -top-[5%] right-[5%]",  g: "#e07b39,#c45e20", delay: "-5s", td: "0.5s" },
  { cls: "w-[300px] h-[300px] bottom-[5%] left-[10%]", g: "#228be6,#1971c2", delay: "-2s", td: "0.6s" },
  { cls: "w-[200px] h-[200px] bottom-[15%] right-[20%]", g: "#9775fa,#7048e8", delay: "-4s", td: "0.7s" },
];

export default function DigitalDesignerHero() {
  const curtainRef  = useRef(null);
  const heroRef     = useRef(null);
  const badgeRef    = useRef(null);
  const word1Ref    = useRef(null);
  const word2Ref    = useRef(null);
  const subtitleRef = useRef(null);
  const scanRef     = useRef(null);

  useEffect(() => {
    const timers = [];
    const t = (ms, fn) => timers.push(setTimeout(fn, ms));

    t(80,   () => curtainRef.current?.classList.add("open"));
    t(400,  () => heroRef.current?.classList.add("blobs-visible"));
    t(900,  () => badgeRef.current && (badgeRef.current.style.animationPlayState = "running"));
    t(1050, () => {
      word1Ref.current?.classList.add("heading-visible");
      word2Ref.current?.classList.add("heading-visible");
    });
    t(1100, () => scanRef.current && (scanRef.current.style.animationPlayState = "running"));
    t(1400, () => subtitleRef.current?.classList.add("visible"));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&family=DM+Sans:wght@400;500&display=swap');

        @keyframes floatBlob {
          0%,100% { transform: translate(0,0) scale(1); }
          33%  { transform: translate(20px,-25px) scale(1.05); }
          66%  { transform: translate(-15px,15px) scale(0.97); }
        }
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 8px #37b24d; }
          50%      { box-shadow: 0 0 18px #37b24d; }
        }
        @keyframes badgeDrop {
          0%   { opacity:0; transform: translateY(-40px) scale(0.8); }
          60%  { transform: translateY(6px) scale(1.04); }
          80%  { transform: translateY(-3px) scale(0.98); }
          100% { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes scanLine {
          0%   { left:-5%; opacity:1; }
          100% { left:105%; opacity:0; }
        }

        /* Curtain */
        .curtain { position:fixed;inset:0;z-index:100;display:flex;pointer-events:none; }
        .curtain-half {
          width:50%;height:100%;background:#06060f;
          transition: transform 0.9s cubic-bezier(0.76,0,0.24,1) 0.3s;
        }
        .curtain.open .curtain-left  { transform: translateX(-100%); }
        .curtain.open .curtain-right { transform: translateX(100%); }

        /* Blobs */
        .blob-el {
          position:absolute;border-radius:50%;filter:blur(80px);
          animation: floatBlob 8s ease-in-out infinite;
          transform:scale(0);opacity:0;
          transition: transform 1.4s cubic-bezier(0.34,1.56,0.64,1),
                      opacity 1.2s ease;
        }
        .blobs-visible .blob-el { transform:scale(1) !important; opacity:1 !important; }

        /* Badge */
        .badge-anim { opacity:0; animation:badgeDrop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; animation-play-state:paused; }

        /* Heading slam */
        .heading-word  { display:block;overflow:hidden;line-height:0.88; }
        .heading-inner {
          display:block;transform:translateY(110%);opacity:0;
          transition: transform 0.8s cubic-bezier(0.16,1,0.3,1),
                      opacity 0.5s ease;
        }
        .heading-visible .heading-inner { transform:translateY(0);opacity:1; }

        /* Scan line */
        .scan-line {
          position:absolute;top:0;bottom:0;width:4px;
          background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.6),transparent);
          pointer-events:none;
          animation:scanLine 0.6s ease forwards;
          animation-play-state:paused;
        }

        /* Subtitle */
        .subtitle-el {
          opacity:0;transform:translateY(20px);
          transition:opacity 0.8s ease,transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .subtitle-el.visible { opacity:0.6;transform:translateY(0); }
      `}</style>

      {/* Curtain */}
      <div className="curtain" ref={curtainRef}>
        <div className="curtain-half curtain-left" />
        <div className="curtain-half curtain-right" />
      </div>

      {/* Hero */}
      <div
        ref={heroRef}
        style={{ background:"#06060f", fontFamily:"'DM Sans',sans-serif" }}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {blobs.map((b, i) => (
          <div
            key={i}
            className={`blob-el ${b.cls}`}
            style={{
              background: `radial-gradient(circle,${b.g.split(",")[0]} 0%,${b.g.split(",")[1]} 60%,transparent 100%)`,
              animationDelay: b.delay,
              transitionDelay: b.td,
            }}
          />
        ))}

        {/* SVG sweeps */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <path d="M-100 300 Q400 100 800 400 T1600 200" stroke="rgba(100,130,255,0.15)" strokeWidth="1.5" fill="none"/>
          <path d="M-100 500 Q500 200 900 500 T1600 350" stroke="rgba(150,100,255,0.12)" strokeWidth="1" fill="none"/>
          <path d="M800 -50 Q1100 200 1000 500 T1200 950" stroke="rgba(200,140,100,0.12)" strokeWidth="1.5" fill="none"/>
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="badge-anim inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full"
            style={{ background:"rgba(255,255,255,0.08)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.85)", fontSize:13, fontWeight:500 }}
          >
            <span style={{ width:8,height:8,background:"#37b24d",borderRadius:"50%",display:"inline-block",animation:"pulseDot 2s ease-in-out infinite" }} />
            Open for projects
          </div>

          {/* Heading */}
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"clamp(80px,14vw,180px)", color:"#fff", textAlign:"center", textTransform:"uppercase", letterSpacing:"-0.01em", position:"relative" }}>
            <span className="heading-word" ref={word1Ref}>
              <span className="heading-inner" style={{ transitionDelay:"0s" }}>RAFIUL</span>
            </span>
            <span className="heading-word" ref={word2Ref}>
              <span className="heading-inner" style={{ transitionDelay:"0.12s" }}>ISLAM</span>
            </span>
            <div className="scan-line" ref={scanRef} />
          </div>

          {/* Subtitle */}
          <p ref={subtitleRef} className="subtitle-el text-center mt-8" style={{ fontSize:"clamp(14px,1.8vw,18px)", lineHeight:1.65 }}>
            A creative human from Amsterdam<br />making digital experiences.
          </p>
        </div>
      </div>
    </>
  );
}