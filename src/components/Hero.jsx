import { useEffect, useState } from "react";

const blobs = [
  {
    className: "w-[480px] h-[480px] -top-[10%] -left-[8%]",
    gradient: "radial-gradient(circle, #3b5bdb 0%, #1c3faa 60%, transparent 100%)",
    delay: "0s",
    opacity: 0.75,
  },
  {
    className: "w-[520px] h-[520px] top-[5%] -right-[5%]",
    gradient: "radial-gradient(circle, #7048e8 0%, #4c2dbf 50%, transparent 100%)",
    delay: "-3s",
    opacity: 0.75,
  },
  {
    className: "w-[380px] h-[380px] -top-[5%] right-[5%]",
    gradient: "radial-gradient(circle, #e07b39 0%, #c45e20 50%, transparent 100%)",
    delay: "-5s",
    opacity: 0.5,
  },
  {
    className: "w-[300px] h-[300px] bottom-[5%] left-[10%]",
    gradient: "radial-gradient(circle, #228be6 0%, #1971c2 60%, transparent 100%)",
    delay: "-2s",
    opacity: 0.6,
  },
  {
    className: "w-[200px] h-[200px] bottom-[15%] right-[20%]",
    gradient: "radial-gradient(circle, #9775fa 0%, #7048e8 60%, transparent 100%)",
    delay: "-4s",
    opacity: 0.55,
  },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&family=DM+Sans:wght@400;500&display=swap');

        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(20px, -25px) scale(1.05); }
          66%  { transform: translate(-15px, 15px) scale(0.97); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #37b24d; }
          50%       { opacity: 0.7; box-shadow: 0 0 16px #37b24d; }
        }
        .blob-float { animation: floatBlob 8s ease-in-out infinite; }
        .dot-pulse  { animation: pulse-dot 2s ease-in-out infinite; }

        .fade-down {
          transition: opacity 0.8s ease, transform 0.8s ease;
          transition-delay: 0.2s;
        }
        .fade-up-1 {
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
          transition-delay: 0.4s;
        }
        .fade-up-2 {
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
          transition-delay: 0.65s;
        }
        .hidden-start { opacity: 0; transform: translateY(16px); }
        .hidden-down  { opacity: 0; transform: translateY(-12px); }
        .shown        { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>

      <div
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{ background: "#06060f", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Blobs */}
        {blobs.map((b, i) => (
          <div
            key={i}
            className={`absolute rounded-full blob-float ${b.className}`}
            style={{
              background: b.gradient,
              filter: "blur(80px)",
              opacity: b.opacity,
              animationDelay: b.delay,
            }}
          />
        ))}

        {/* SVG sweep lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-100 300 Q400 100 800 400 T1600 200" stroke="rgba(100,130,255,0.15)" strokeWidth="1.5" fill="none"/>
          <path d="M-100 500 Q500 200 900 500 T1600 350" stroke="rgba(150,100,255,0.12)" strokeWidth="1" fill="none"/>
          <path d="M800 -50 Q1100 200 1000 500 T1200 950" stroke="rgba(200,140,100,0.12)" strokeWidth="1.5" fill="none"/>
          <path d="M900 -80 Q1200 150 1100 450 T1300 950" stroke="rgba(180,120,80,0.08)" strokeWidth="1" fill="none"/>
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div
            className={`fade-down hidden-down ${visible ? "shown" : ""} inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full`}
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            <span
              className="dot-pulse rounded-full"
              style={{ width: 8, height: 8, background: "#37b24d", display: "inline-block" }}
            />
            Open for projects
          </div>

          {/* Heading */}
          <h1
            className={`fade-up-1 hidden-start ${visible ? "shown" : ""} text-center text-white uppercase leading-none`}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(80px, 14vw, 180px)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
            }}
          >
            RAFIUL
            <br />
            ISLAM
          </h1>

          {/* Subtitle */}
          <p
            className={`fade-up-2 hidden-start ${visible ? "shown" : ""} text-center mt-8`}
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(14px, 1.8vw, 18px)",
              lineHeight: 1.65,
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            A creative human from Amsterdam
            <br />
            making digital experiences.
          </p>
        </div>
      </div>
    </>
  );
}