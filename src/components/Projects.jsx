import { useEffect, useRef, useState } from "react";

/* ── DATA ── */
const FILTERS = ["All", "Full Stack", "Frontend", "Backend"];

const PROJECTS = [
  {
    id: 1,
    title: "Create Arena",
    subtitle: "Contest Platform",
    category: "Full Stack",
    year: "2025",
    status: "Live",
    color: "#f97316",
    gradient: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
    tags: ["React", "Node.js", "MongoDB", "JWT", "Stripe", "Firebase", "Express.js", "Tailwind CSS", "Authentication"],
    shortDesc: "A competitive programming contest platform where users create, join, and judge contests in real time.",
    fullDesc: "Create Arena is a full-featured contest platform built for developers and competitive programmers. It supports real-time contest creation, participant management, live leaderboards, and automated judging. The platform handles thousands of concurrent users with optimised WebSocket connections.",
    challenges: "Implementing real-time leaderboard updates without overwhelming the server was the biggest challenge. Solved using Redis pub/sub with debounced WebSocket broadcasts and client-side optimistic updates.",
    improvements: "Planning to add AI-powered code review, multi-language support, and a mobile app with offline contest participation.",
    live: "https://create-arena.web.app/",
    github: "https://github.com/dev-rafiul/create_arena_frontend",
    image: "https://i.ibb.co.com/gZsfVvdB/Screenshot-33.png",
  },
  {
    id: 2,
    title: "Plateshare",
    subtitle: "Food Sharing Platform",
    category: "Full Stack",
    year: "2025",
    status: "Live",
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
    tags: ["React", "Express", "MongoDB", "Tanstack Query", "Sweet Alert", "Lottie Animations", "Framer"],
    shortDesc: "Community-driven food sharing app connecting people with surplus food to those who need it.",
    fullDesc: "Plateshare reduces food waste by connecting donors with recipients in local communities. Features include real-time food listing, geolocation-based matching, in-app messaging, and a reputation system. Integrated with Cloudinary for image optimisation and Google Maps for location services.",
    challenges: "Building a reliable geolocation matching system that works across different devices and network conditions. Implemented a fallback to manual location entry with address geocoding.",
    improvements: "Adding push notifications for new listings nearby, a mobile app, and partnerships with local restaurants for bulk donations.",
    live: "https://plate-shares.netlify.app/",
    github: "https://github.com/dev-rafiul/client-side-plateshare",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  {
    id: 3,
    title: "Sun Bloom",
    subtitle: "Flower Shop E-Commerce",
    category: "Frontend",
    year: "2025",
    status: "Live",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    tags: ["React", "Firebase", "DaisyUI", "Tailwind"],
    shortDesc: "Elegant e-commerce experience for a premium flower shop with real-time inventory and Stripe checkout.",
    fullDesc: "Sun Bloom is a premium flower shop e-commerce platform with a focus on visual storytelling and seamless purchasing. Features include animated product galleries, real-time inventory tracking via Firebase, Stripe payment integration, order tracking, and an admin dashboard for inventory management.",
    challenges: "Creating smooth, performant image galleries with lazy loading while maintaining the premium aesthetic. Used Intersection Observer with custom blur-up image loading.",
    improvements: "Subscription bouquet service, AR flower arrangement preview, and a loyalty rewards programme.",
    live: "https://aesthetic-genie-7553ed.netlify.app/",
    github: "https://github.com/yourusername/sun-bloom",
    image: "https://i.ibb.co.com/G4z4F4qk/Screenshot-35.png",
  },
  {
    id: 4,
    title: "Hero Apps",
    subtitle: "Hero Developer All Apps",
    category: "Frontend",
    year: "2025",
    status: "In Progress",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)",
    tags: ["React.Js", "Javascript", "TailwindCss", "Daisy Ui"],
    shortDesc: "Unified developer productivity dashboard aggregating GitHub, Jira, and Slack into one clean interface.",
    fullDesc: "DevBoard brings together all the tools developers use daily into a single, customisable dashboard. Real-time GitHub activity, Jira ticket management, Slack notifications, and custom widgets. Built with Next.js App Router for optimal performance and TypeScript for type safety throughout.",
    challenges: "Managing OAuth flows for multiple providers simultaneously and keeping data in sync across services without excessive API calls. Implemented a smart polling strategy with webhook fallbacks.",
    improvements: "Adding AI-powered daily standup generation, time tracking integration, and team analytics.",
    live: "https://heroapppss.netlify.app/",
    github: "https://github.com/dev-rafiul/assignment-8-Hero_Apps",
    image: "https://i.ibb.co.com/CpmpsMqF/Screenshot-36.png",
  },
  {
    id: 5,
    title: "Green Earth",
    subtitle: "A Plant Ecommerce",
    category: "Frontend",
    year: "2025",
    status: "Live",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    tags: ["Javascript", "Tailwind", "Html", "CSS3"],
    shortDesc: "Scalable real-time chat application supporting rooms, DMs, file sharing, and end-to-end encryption.",
    fullDesc: "NexChat is a production-grade messaging platform built for scale. Supports thousands of concurrent connections via Socket.io with Redis adapter for horizontal scaling. Features include end-to-end encryption, message reactions, file sharing, read receipts, and typing indicators.",
    challenges: "Achieving sub-100ms message delivery at scale while maintaining message ordering guarantees. Used Redis Streams for message queuing with acknowledgement-based delivery.",
    improvements: "Voice and video calling via WebRTC, message threading, and a bot API for integrations.",
    live: "https://green-earth-plant-rrq.netlify.app/",
    github: "https://github.com/dev-rafiul/assignment-6-Green-earth",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
  },
  {
    id: 6,
    title: "Ticket System",
    subtitle: "Customer Ticket Buy System",
    category: "Frontend",
    year: "2025",
    status: "Live",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
    tags: ["CSS", "HTML", "Tailwind", "Javascript"],
    shortDesc: "An interactive portfolio designed as a desktop OS with draggable windows, a dock, and real apps.",
    fullDesc: "PortfolioOS reimagines the personal portfolio as a fully interactive desktop operating system. Features draggable, resizable windows, a macOS-style dock, a working terminal, a music player, and a photo gallery — all built with React and Framer Motion for buttery-smooth interactions.",
    challenges: "Implementing a proper window management system with z-index stacking, focus management, and smooth resize/drag without performance degradation. Used a custom hook with pointer events.",
    improvements: "Adding more 'apps', a file system simulation, and multi-monitor support.",
    live: "https://assignment-7-react-customer-ticket.netlify.app/",
    github: "",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    id: 7,
    title: "Tea House",
    subtitle: "Tea Shop",
    category: "Frontend",
    year: "2025",
    status: "Live",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
    tags: ["CSS", "HTML", "Tailwind"],
    shortDesc: "A Frontend Project Just Show My designs i have plan for this project need times",
    fullDesc: "PortfolioOS reimagines the personal portfolio as a fully interactive desktop operating system. Features draggable, resizable windows, a macOS-style dock, a working terminal, a music player, and a photo gallery — all built with React and Framer Motion for buttery-smooth interactions.",
    challenges: "Implementing a proper window management system with z-index stacking, focus management, and smooth resize/drag without performance degradation. Used a custom hook with pointer events.",
    improvements: "Adding more 'apps', a file system simulation, and multi-monitor support.",
    live: "https://tea-house-pro.netlify.app/",
    github: "",
    image: "https://i.ibb.co.com/PzcQxcFs/Screenshot-32.png",
  },
];

/* ── COMPONENT ── */
export default function Projects({ darkMode }) {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const filterRef  = useRef(null);

  const [activeFilter,  setActiveFilter]  = useState("All");
  const [selectedProj,  setSelectedProj]  = useState(null);
  const [hoveredId,     setHoveredId]     = useState(null);
  const [activeTab,     setActiveTab]     = useState("overview");
  const [inView,        setInView]        = useState(false);
  const [visibleCards,  setVisibleCards]  = useState([]);
  const [mousePos,      setMousePos]      = useState({ x: 0, y: 0 });

  const isDark  = darkMode;
  const bg      = isDark ? "#0f0d0b"                : "#faf8f5";
  const bgCard  = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.75)";
  const bgHov   = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.98)";
  const border  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const borderH = isDark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.20)";
  const txt     = isDark ? "#f0ede8"                : "#1a1714";
  const muted   = isDark ? "rgba(240,237,232,0.42)" : "rgba(26,23,20,0.45)";
  const modalBg = isDark ? "#141210"                : "#ffffff";

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  /* ── scroll-triggered entry ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        headRef.current?.classList.add("pj-in");
        setTimeout(() => filterRef.current?.classList.add("pj-in"), 120);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── stagger cards on filter change ── */
  useEffect(() => {
    setVisibleCards([]);
    filtered.forEach((p, i) => {
      setTimeout(() => setVisibleCards(prev => [...prev, p.id]), i * 90);
    });
  }, [activeFilter]);

  /* ── Escape closes modal ── */
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") setSelectedProj(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  /* ── lock body scroll when modal open ── */
  useEffect(() => {
    document.body.style.overflow = selectedProj ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProj]);

  /* ── mouse parallax on cards ── */
  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 14,
    });
  };

  const openProject = (proj) => {
    setSelectedProj(proj);
    setActiveTab("overview");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── entry ── */
        .pj-fade-up {
          opacity:0; transform:translateY(36px);
          transition: opacity .85s cubic-bezier(.16,1,.3,1), transform .85s cubic-bezier(.16,1,.3,1);
        }
        .pj-fade-filter {
          opacity:0; transform:translateY(18px);
          transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
          transition-delay:.12s;
        }
        .pj-in.pj-fade-up,
        .pj-in.pj-fade-filter { opacity:1 !important; transform:none !important; }

        /* ── card entry ── */
        @keyframes pjCardIn {
          from { opacity:0; transform:translateY(32px) scale(.96); }
          to   { opacity:1; transform:translateY(0)    scale(1);   }
        }
        .pj-card-visible { animation: pjCardIn .55s cubic-bezier(.16,1,.3,1) forwards; }

        /* ── card hover tilt ── */
        .pj-card {
          cursor: pointer;
          transition: box-shadow .3s ease, border-color .25s ease, background .25s ease;
          will-change: transform;
        }
        .pj-card:active { transform: scale(.97) !important; }

        /* ── image zoom ── */
        .pj-img { transition: transform .6s cubic-bezier(.16,1,.3,1); }
        .pj-card:hover .pj-img { transform: scale(1.07); }

        /* ── overlay reveal ── */
        .pj-overlay {
          opacity:0; transition: opacity .3s ease;
          background: linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 60%, transparent 100%);
        }
        .pj-card:hover .pj-overlay { opacity:1; }

        /* ── tag pill ── */
        .pj-tag { transition: all .2s cubic-bezier(.34,1.56,.64,1); }
        .pj-tag:hover { transform: scale(1.08) translateY(-2px); }

        /* ── filter pill ── */
        .pj-pill { transition: all .22s cubic-bezier(.34,1.56,.64,1); cursor:pointer; }
        .pj-pill:hover { transform: scale(1.06); }
        .pj-pill:active { transform: scale(.95); }

        /* ── modal ── */
        .pj-backdrop { animation: pjBdIn .25s ease forwards; }
        @keyframes pjBdIn { from{opacity:0} to{opacity:1} }
        .pj-modal { animation: pjMdIn .38s cubic-bezier(.34,1.56,.64,1) forwards; }
        @keyframes pjMdIn {
          from { opacity:0; transform:scale(.88) translateY(24px); }
          to   { opacity:1; transform:scale(1)   translateY(0);    }
        }

        /* ── modal tab ── */
        .pj-tab-body { animation: pjTabFade .3s ease forwards; }
        @keyframes pjTabFade {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0);   }
        }

        /* ── orb float ── */
        @keyframes pjOrb {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(14px,-18px) scale(1.05); }
        }

        /* ── status pulse ── */
        @keyframes pjPulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50%      { opacity:1;  transform:scale(1.4); }
        }
        .pj-pulse { animation: pjPulse 2s ease-in-out infinite; }

        /* ── responsive ── */
        @media (max-width:768px) {
          .pj-grid { grid-template-columns:1fr !important; }
          .pj-modal-inner { flex-direction:column !important; }
          .pj-modal-img { height:220px !important; min-width:unset !important; width:100% !important; }
          /* FIX: on mobile, image-to-content blend goes bottom → down, not right → content */
          .pj-modal-img-overlay { background: linear-gradient(to bottom, transparent 50%, var(--modal-bg) 100%) !important; }
        }
        @media (max-width:480px) {
          .pj-modal { padding:24px 20px !important; }
          .pj-modal-content { padding: 20px 20px 20px !important; }
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        style={{
          position:"relative", width:"100%",
          background: bg,
          overflow:"hidden",
          fontFamily:"'DM Sans',sans-serif",
          transition:"background .5s ease",
          padding:"120px 0 100px",
        }}
      >
        {/* ── ambient orbs ── */}
        {[
          { left:"-6%", top:"8%",  w:500, color:"rgba(249,115,22,.07)",  dur:"12s" },
          { right:"-8%",bottom:"12%",w:520,color:"rgba(168,85,247,.07)", dur:"16s", rev:true },
          { left:"40%", top:"50%", w:400, color:"rgba(236,72,153,.05)",  dur:"9s"  },
        ].map((o, i) => (
          <div key={i} style={{
            position:"absolute",
            left:o.left, right:o.right, top:o.top, bottom:o.bottom,
            width:o.w, height:o.w, borderRadius:"50%",
            background:`radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter:"blur(70px)",
            animation:`pjOrb ${o.dur} ease-in-out infinite${o.rev?" reverse":""}`,
            pointerEvents:"none", zIndex:0,
          }} />
        ))}

        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:1 }}>

          {/* ── Heading ── */}
          <div ref={headRef} className="pj-fade-up" style={{ textAlign:"center", marginBottom:52 }}>
            <span style={{ display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:"0.18em", color:muted, marginBottom:16, textTransform:"uppercase" }}>
              — What I've Built
            </span>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(48px,7vw,88px)", fontWeight:600,
              lineHeight:.95, letterSpacing:"-0.02em", color:txt, margin:0,
            }}>
              Featured{" "}
              <span style={{ background:"linear-gradient(120deg,#f97316,#ec4899,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Projects
              </span>
            </h2>
            <p style={{ marginTop:20, fontSize:15, color:muted, fontWeight:300, lineHeight:1.7, maxWidth:460, margin:"20px auto 0" }}>
              Click any card to explore the full story — stack, challenges, and what's next.
            </p>
          </div>

          {/* ── Filter ── */}
          <div ref={filterRef} className="pj-fade-filter" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10, marginBottom:52 }}>
            {FILTERS.map(f => {
              const active = activeFilter === f;
              return (
                <button key={f} className="pj-pill"
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding:"9px 22px", borderRadius:999,
                    border: active ? "1px solid transparent" : `1px solid ${border}`,
                    background: active ? "linear-gradient(120deg,#f97316,#ec4899,#a855f7)" : bgCard,
                    color: active ? "#fff" : muted,
                    fontSize:13, fontWeight: active ? 600 : 400,
                    letterSpacing:"0.03em",
                    boxShadow: active ? "0 4px 20px rgba(236,72,153,.35)" : "none",
                  }}
                >
                  {f}
                  <span style={{ marginLeft:6, fontSize:11, opacity:.7 }}>
                    ({f === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === f).length})
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Grid ── */}
          <div className="pj-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
            {filtered.map((proj, i) => {
              const isHov = hoveredId === proj.id;
              const isVis = visibleCards.includes(proj.id);
              return (
                <div
                  key={proj.id}
                  className={`pj-card${isVis ? " pj-card-visible" : ""}`}
                  style={{
                    opacity: isVis ? undefined : 0,
                    animationDelay:`${i * 0.06}s`,
                    borderRadius:24,
                    background: isHov ? bgHov : bgCard,
                    border:`1px solid ${isHov ? borderH : border}`,
                    overflow:"hidden",
                    boxShadow: isHov
                      ? isDark
                        ? `0 20px 60px rgba(0,0,0,.6), 0 0 0 1px ${proj.color}22`
                        : `0 20px 60px rgba(0,0,0,.15), 0 0 0 1px ${proj.color}33`
                      : "none",
                    transform: isHov
                      ? `perspective(800px) rotateX(${-mousePos.y * .4}deg) rotateY(${mousePos.x * .4}deg) translateY(-6px)`
                      : "perspective(800px) rotateX(0) rotateY(0) translateY(0)",
                    transition: isHov
                      ? "box-shadow .3s ease, border-color .25s ease, background .25s ease"
                      : "all .4s cubic-bezier(.16,1,.3,1)",
                  }}
                  onClick={() => openProject(proj)}
                  onMouseEnter={() => setHoveredId(proj.id)}
                  onMouseLeave={() => { setHoveredId(null); setMousePos({ x:0, y:0 }); }}
                  onMouseMove={e => handleMouseMove(e, proj.id)}
                >
                  {/* Image */}
                  <div style={{ position:"relative", height:200, overflow:"hidden" }}>
                    <img
                      src={proj.image} alt={proj.title}
                      className="pj-img"
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                    />
                    {/* Overlay */}
                    <div className="pj-overlay" style={{ position:"absolute", inset:0 }}>
                      <div style={{ position:"absolute", bottom:16, left:16, right:16, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                        <span style={{ fontSize:12, color:"rgba(255,255,255,.9)", fontWeight:500 }}>View Project →</span>
                        <span style={{
                          padding:"4px 10px", borderRadius:999, fontSize:10, fontWeight:600,
                          background: proj.status === "Live" ? "rgba(34,197,94,.25)" : "rgba(251,191,36,.25)",
                          border: `1px solid ${proj.status === "Live" ? "rgba(34,197,94,.4)" : "rgba(251,191,36,.4)"}`,
                          color: proj.status === "Live" ? "#4ade80" : "#fbbf24",
                        }}>
                          {proj.status}
                        </span>
                      </div>
                    </div>
                    {/* Gradient bar at top */}
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:proj.gradient }} />
                  </div>

                  {/* Body */}
                  <div style={{ padding:"22px 22px 20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                      <div>
                        <h3 style={{ fontSize:17, fontWeight:700, color:txt, margin:0, lineHeight:1.2 }}>{proj.title}</h3>
                        <p style={{ fontSize:12, color:muted, margin:"3px 0 0", letterSpacing:"0.04em" }}>{proj.subtitle}</p>
                      </div>
                      <span style={{ fontSize:11, color:muted, flexShrink:0, marginLeft:8 }}>{proj.year}</span>
                    </div>

                    <p style={{ fontSize:13, color:muted, lineHeight:1.7, fontWeight:300, marginBottom:16 }}>
                      {proj.shortDesc}
                    </p>

                    {/* Tags */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {proj.tags.map(tag => (
                        <span key={tag} className="pj-tag" style={{
                          padding:"3px 10px", borderRadius:999, fontSize:11, fontWeight:500,
                          color:muted,
                          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                          border:`1px solid ${border}`,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Stats bar ── */}
          <div style={{
            marginTop:64, padding:"28px 36px", borderRadius:20,
            background:bgCard, border:`1px solid ${border}`,
            display:"flex", flexWrap:"wrap", justifyContent:"space-around", gap:24,
          }}>
            {[
              { val:`${PROJECTS.length}+`, label:"Total Projects" },
              { val:PROJECTS.filter(p=>p.status==="Live").length, label:"Live & Deployed" },
              { val:"4+", label:"Tech Stacks" },
              { val: Math.max(...PROJECTS.map(p => parseInt(p.year))).toString(), label:"Latest Year" },
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

      {/* ── DETAIL MODAL ── */}
      {selectedProj && (
        <div
          className="pj-backdrop"
          onClick={() => setSelectedProj(null)}
          style={{
            position:"fixed", inset:0, zIndex:300,
            background:"rgba(0,0,0,.72)",
            backdropFilter:"blur(10px)",
            display:"flex", alignItems:"center", justifyContent:"center",
            padding:"24px 16px",
            overflowY:"auto",
          }}
        >
          <div
            className="pj-modal"
            onClick={e => e.stopPropagation()}
            style={{
              background:modalBg,
              /* FIX: expose --modal-bg so the CSS media query can reference it for the gradient */
              "--modal-bg": modalBg,
              border:`1px solid ${border}`,
              borderRadius:28,
              maxWidth:860, width:"100%",
              /* FIX: removed overflow:hidden so close button is never clipped;
                 inner panels clip themselves where needed */
              boxShadow:"0 40px 100px rgba(0,0,0,.6)",
              fontFamily:"'DM Sans',sans-serif",
              position:"relative",
              /* FIX: constrain height so content never overflows viewport */
              maxHeight:"calc(100vh - 48px)",
              display:"flex", flexDirection:"column",
            }}
          >
            {/* Gradient top bar */}
            <div style={{ height:4, background:selectedProj.gradient, borderRadius:"28px 28px 0 0", flexShrink:0 }} />

            {/* Close — sits outside the scrollable area so it's always visible */}
            <button
              onClick={() => setSelectedProj(null)}
              style={{
                position:"absolute", top:16, right:16, zIndex:10,
                width:34, height:34, borderRadius:"50%",
                background: isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)",
                border:`1px solid ${border}`,
                color:muted, fontSize:16, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .2s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,.15)" : "rgba(0,0,0,.1)"}
              onMouseLeave={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)"}
            >✕</button>

            {/* FIX: scrollable inner wrapper — modal scrolls internally on small screens */}
            <div
              className="pj-modal-inner"
              style={{
                display:"flex",
                overflowY:"auto",
                borderRadius:"0 0 28px 28px",
                flex:1,
                minHeight:0,
              }}
            >
              {/* Image panel */}
              <div
                className="pj-modal-img"
                style={{
                  minWidth:280, position:"relative", flexShrink:0,
                  /* FIX: use minHeight instead of height so panel fills flex height */
                  minHeight:320,
                  overflow:"hidden",
                }}
              >
                <img
                  src={selectedProj.image} alt={selectedProj.title}
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", position:"absolute", inset:0 }}
                />
                {/*
                  FIX: gradient direction is "to right" on desktop (blends into the side-by-side
                  content panel) but the media query above switches it to "to bottom" on mobile
                  when the panels stack vertically.
                */}
                <div
                  className="pj-modal-img-overlay"
                  style={{
                    position:"absolute", inset:0,
                    background:`linear-gradient(to right, transparent 55%, ${modalBg} 100%)`,
                  }}
                />
                {/* Status badge */}
                <div style={{
                  position:"absolute", top:16, left:16,
                  display:"flex", alignItems:"center", gap:6,
                  padding:"5px 12px", borderRadius:999,
                  background: selectedProj.status === "Live" ? "rgba(34,197,94,.2)" : "rgba(251,191,36,.2)",
                  border:`1px solid ${selectedProj.status === "Live" ? "rgba(34,197,94,.4)" : "rgba(251,191,36,.4)"}`,
                }}>
                  <span className="pj-pulse" style={{ width:6, height:6, borderRadius:"50%", background: selectedProj.status === "Live" ? "#22c55e" : "#fbbf24", display:"inline-block" }} />
                  <span style={{ fontSize:11, fontWeight:600, color: selectedProj.status === "Live" ? "#4ade80" : "#fbbf24" }}>{selectedProj.status}</span>
                </div>
              </div>

              {/* Content panel */}
              <div
                className="pj-modal-content"
                style={{ padding:"32px 32px 28px", flex:1, minWidth:0 }}
              >
                <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.14em", color:muted, textTransform:"uppercase" }}>
                  {selectedProj.category} · {selectedProj.year}
                </span>
                <h2 style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:"clamp(28px,4vw,40px)", fontWeight:700,
                  color:txt, margin:"6px 0 4px", lineHeight:1,
                }}>{selectedProj.title}</h2>
                <p style={{ fontSize:14, color:muted, margin:"0 0 20px" }}>{selectedProj.subtitle}</p>

                {/* Tags */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:24 }}>
                  {selectedProj.tags.map(tag => (
                    <span key={tag} className="pj-tag" style={{
                      padding:"4px 12px", borderRadius:999, fontSize:12, fontWeight:500,
                      background:`${selectedProj.color}18`, border:`1px solid ${selectedProj.color}30`,
                      color:selectedProj.color,
                    }}>{tag}</span>
                  ))}
                </div>

                {/* Tabs */}
                <div style={{ display:"flex", gap:4, background: isDark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)", border:`1px solid ${border}`, borderRadius:12, padding:4, marginBottom:20 }}>
                  {["overview","challenges","future"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      style={{
                        flex:1, padding:"7px 0", borderRadius:8, border:"none", cursor:"pointer",
                        fontSize:12, fontWeight: activeTab===tab ? 600 : 400,
                        color: activeTab===tab ? txt : muted,
                        background: activeTab===tab ? (isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.07)") : "transparent",
                        transition:"all .2s ease", textTransform:"capitalize",
                      }}
                    >{tab}</button>
                  ))}
                </div>

                {/* Tab body */}
                <div key={activeTab} className="pj-tab-body" style={{ fontSize:13, color:muted, lineHeight:1.8, fontWeight:300, minHeight:80 }}>
                  {activeTab === "overview"   && selectedProj.fullDesc}
                  {activeTab === "challenges" && selectedProj.challenges}
                  {activeTab === "future"     && selectedProj.improvements}
                </div>

                {/* CTA buttons */}
                <div style={{ display:"flex", gap:12, marginTop:24, flexWrap:"wrap" }}>
                  {/* FIX: disable when live URL is empty string, not just "#" */}
                  <a
                    href={selectedProj.live || undefined}
                    target="_blank" rel="noopener noreferrer"
                    onClick={!selectedProj.live ? e => e.preventDefault() : undefined}
                    style={{
                      display:"inline-flex", alignItems:"center", gap:8,
                      padding:"10px 22px", borderRadius:999,
                      background:"linear-gradient(120deg,#f97316,#ec4899,#a855f7)",
                      color:"#fff", fontSize:13, fontWeight:600,
                      textDecoration:"none", letterSpacing:"0.03em",
                      boxShadow:"0 4px 20px rgba(236,72,153,.3)",
                      transition:"transform .2s ease, box-shadow .2s ease",
                      opacity: !selectedProj.live ? 0.45 : 1,
                      pointerEvents: !selectedProj.live ? "none" : "auto",
                      cursor: !selectedProj.live ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={e => { if (selectedProj.live) { e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 6px 28px rgba(236,72,153,.5)"; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(236,72,153,.3)"; }}
                  >
                    ↗ Live Demo
                  </a>

                  {/* FIX: only render GitHub button when a URL actually exists */}
                  {selectedProj.github ? (
                    <a
                      href={selectedProj.github}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        display:"inline-flex", alignItems:"center", gap:8,
                        padding:"10px 22px", borderRadius:999,
                        background: isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)",
                        border:`1px solid ${border}`,
                        color:txt, fontSize:13, fontWeight:500,
                        textDecoration:"none", letterSpacing:"0.03em",
                        transition:"all .2s ease",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.08)"}
                      onMouseLeave={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)"}
                    >
                      🐙 GitHub
                    </a>
                  ) : (
                    /* FIX: show clearly disabled "Private Repo" label instead of broken link */
                    <span style={{
                      display:"inline-flex", alignItems:"center", gap:8,
                      padding:"10px 22px", borderRadius:999,
                      background: isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)",
                      border:`1px solid ${border}`,
                      color:muted, fontSize:13, fontWeight:400,
                      letterSpacing:"0.03em",
                      cursor:"default",
                      opacity:0.6,
                    }}>
                      🔒 Private Repo
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}