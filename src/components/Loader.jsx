import { useEffect, useState, useRef } from 'react';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving]   = useState(false);
  const raf = useRef(null);
  const start = useRef(null);
  const DURATION = 2600; // ms to reach 100

  useEffect(() => {
    const tick = (ts) => {
      if (!start.current) start.current = ts;
      const elapsed = ts - start.current;
      const pct = Math.min(Math.floor((elapsed / DURATION) * 100), 100);
      setProgress(pct);
      if (pct < 100) {
        raf.current = requestAnimationFrame(tick);
      } else {
        // hold briefly then exit
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onComplete, 900);
        }, 350);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [onComplete]);

  // clip-path wipe: progress 0→100 maps to clipPath revealing left→right
  const wipeX = `${progress}%`;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: leaving ? 0 : 1,
        transition: leaving ? 'opacity 0.85s cubic-bezier(.4,0,.2,1)' : 'none',
        overflow: 'hidden',
      }}
    >
      {/* subtle noise grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px', opacity: 0.35,
      }} />

      {/* ── name stack ── */}
      <div style={{ position: 'relative', userSelect: 'none', zIndex: 1 }}>

        {/* Layer 1 — dim base text */}
        <div style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
          fontSize: 'clamp(64px, 14vw, 160px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'rgba(255,255,255,0.08)',
          whiteSpace: 'nowrap',
        }}>
          Rafiul Islam
        </div>

        {/* Layer 2 — gradient wipe reveal */}
        <div style={{
          position: 'absolute', inset: 0,
          fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
          fontSize: 'clamp(64px, 14vw, 160px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          // clip-path wipe from left to right
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
          transition: 'clip-path 0.05s linear',
        }}>
          Rafiul Islam
        </div>
      </div>

      {/* ── loading counter ── */}
      <div style={{
        marginTop: 20, zIndex: 1,
        display: 'flex', alignItems: 'baseline', gap: 6,
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: '0.15em' }}>
          loading...
        </span>
        <span style={{
          fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
          background: 'linear-gradient(135deg,#f97316,#ec4899)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {progress} %
        </span>
      </div>

      {/* ── thin progress line ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2, background: 'rgba(255,255,255,0.05)', zIndex: 1,
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg,#f97316,#ec4899,#a855f7)',
          transition: 'width 0.05s linear',
          boxShadow: '0 0 12px rgba(249,115,22,0.6)',
        }} />
      </div>
    </div>
  );
}
