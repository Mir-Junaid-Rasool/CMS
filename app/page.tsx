import Link from "next/link";

const courses = [
  {
    id: "ml",    name: "Machine Learning",     tag: "AI & Data Science", icon: "🧠",
    lessons: 24, students: 138, progress: 68,
    grad: "linear-gradient(135deg,#FF416C 0%,#FF4B2B 100%)", shadow: "rgba(255,65,108,0.4)",
    topics: ["Neural Networks","Supervised Learning","Model Eval"],
  },
  {
    id: "react", name: "React",                tag: "Frontend Dev",      icon: "⚛️",
    lessons: 32, students: 210, progress: 82,
    grad: "linear-gradient(135deg,#00C6FF 0%,#0072FF 100%)", shadow: "rgba(0,114,255,0.4)",
    topics: ["Hooks","State Mgmt","Component Patterns"],
  },
  {
    id: "web",   name: "Web Technologies",     tag: "Full Stack",        icon: "🌐",
    lessons: 28, students: 175, progress: 55,
    grad: "linear-gradient(135deg,#F7971E 0%,#FFD200 100%)", shadow: "rgba(247,151,30,0.4)",
    topics: ["HTML5","CSS Grid","REST APIs"],
  },
  {
    id: "cloud", name: "Cloud Computing",      tag: "DevOps",            icon: "☁️",
    lessons: 20, students: 92,  progress: 40,
    grad: "linear-gradient(135deg,#56CCF2 0%,#2F80ED 100%)", shadow: "rgba(47,128,237,0.4)",
    topics: ["AWS","Containers","Serverless"],
  },
  {
    id: "data",  name: "Data Management",      tag: "Database",          icon: "🗄️",
    lessons: 18, students: 114, progress: 73,
    grad: "linear-gradient(135deg,#11998E 0%,#38EF7D 100%)", shadow: "rgba(56,239,125,0.35)",
    topics: ["SQL","NoSQL","Data Modeling"],
  },
  {
    id: "java",  name: "Java",                 tag: "Backend",           icon: "☕",
    lessons: 36, students: 156, progress: 61,
    grad: "linear-gradient(135deg,#F953C6 0%,#B91D73 100%)", shadow: "rgba(249,83,198,0.4)",
    topics: ["OOP","Spring Boot","Concurrency"],
  },
  {
    id: "c",     name: "C Programming",        tag: "Systems",           icon: "⚙️",
    lessons: 22, students: 88,  progress: 50,
    grad: "linear-gradient(135deg,#7F00FF 0%,#E100FF 100%)", shadow: "rgba(225,0,255,0.35)",
    topics: ["Pointers","Memory Mgmt","File I/O"],
  },
  {
    id: "se",    name: "Software Engineering", tag: "Process",           icon: "🏗️",
    lessons: 26, students: 130, progress: 45,
    grad: "linear-gradient(135deg,#FF8008 0%,#FFC837 100%)", shadow: "rgba(255,200,55,0.35)",
    topics: ["Agile","Design Patterns","Testing"],
  },
  {
    id: "dev",    name: "DevOps",     tag: "DevOps", icon: "🧠",
    lessons: 24, students: 138, progress: 68,
    grad: "linear-gradient(135deg,#FF416C 0%,#FF4B2B 100%)", shadow: "rgba(255,65,108,0.4)",
    topics: ["Git","Jenkins","CICD"],
  },
];

export default function HomePage() {
  return (
    <>
      <style>{`
        /* ── background blobs ── */
        .page-bg {
          position: fixed; inset: 0; z-index: 0;
          overflow: hidden; pointer-events: none;
        }
        .bg-blob {
          position: absolute; border-radius: 50%;
          filter: blur(110px);
          transition: opacity 0.4s;
        }
        [data-theme="dark"]  .bg-blob { opacity: 0.18; }
        [data-theme="light"] .bg-blob { opacity: 0.10; }

        .blob1{width:700px;height:700px;top:-200px;left:-200px;background:radial-gradient(circle,#FF416C,transparent 70%);}
        .blob2{width:600px;height:600px;top:30%;right:-150px;background:radial-gradient(circle,#0072FF,transparent 70%);}
        .blob3{width:500px;height:500px;bottom:-100px;left:30%;background:radial-gradient(circle,#38EF7D,transparent 70%);}
        .blob4{width:400px;height:400px;bottom:20%;right:20%;background:radial-gradient(circle,#F953C6,transparent 70%);}

        /* ── page ── */
        .page {
          position: relative; z-index: 1;
          max-width: 1300px; margin: 0 auto;
          padding: 3.5rem 2rem 6rem;
        }

        /* ── hero ── */
        .hero { margin-bottom: 4rem; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.4rem 1rem 0.4rem 0.7rem; border-radius: 100px;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--text2); margin-bottom: 1.5rem;
        }
        .badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg,#FF416C,#FF4B2B);
          box-shadow: 0 0 8px rgba(255,65,108,0.85);
          animation: livePulse 2s infinite; flex-shrink: 0;
        }
        @keyframes livePulse {
          0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.35);opacity:0.65;}
        }

        .hero-title {
          font-size: clamp(2.4rem,5.5vw,4rem);
          font-weight: 800; line-height: 1.05; letter-spacing: -0.035em; margin-bottom: 1.25rem;
        }
        .line1 { color: var(--text); display: block; }
        .line2 {
          display: block;
          background: linear-gradient(90deg,#FF416C,#F953C6,#7F00FF,#0072FF,#38EF7D,#FFD200,#FF416C);
          background-size: 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 5s linear infinite;
        }
        @keyframes shimmer {
          0%{background-position:0% 50%;}100%{background-position:300% 50%;}
        }

        .hero-desc {
          font-size: 1rem; color: var(--text2);
          max-width: 500px; line-height: 1.78; margin-bottom: 2.5rem;
        }

        /* ── stats ── */
        .stats-strip {
          display: flex; flex-wrap: wrap;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden; width: fit-content;
          box-shadow: var(--shadow-sm);
        }
        .stat-box {
          padding: 1rem 1.75rem;
          border-right: 1px solid var(--border);
          text-align: center;
        }
        .stat-box:last-child { border-right: none; }
        .stat-num {
          font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em;
          color: var(--text); line-height: 1; margin-bottom: 0.3rem;
        }
        .stat-lbl {
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ── section header ── */
        .section-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem;
        }
        .section-left { display: flex; align-items: center; gap: 0.75rem; }
        .section-title { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text); }
        .pill-count {
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
          padding: 0.25rem 0.7rem; border-radius: 100px;
          background: var(--surface2); border: 1px solid var(--border); color: var(--muted);
        }
        .btn-new {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem; font-weight: 700; color: #fff;
          background: linear-gradient(135deg,#FF416C,#F953C6);
          border: none; padding: 0.6rem 1.25rem; border-radius: 10px;
          cursor: pointer; box-shadow: 0 4px 20px rgba(255,65,108,0.38);
          transition: transform 0.2s, box-shadow 0.2s; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .btn-new:hover { transform:translateY(-2px); box-shadow: 0 8px 28px rgba(255,65,108,0.5); }

        /* ── grid ── */
        .grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(310px,1fr)); gap: 1.25rem; }

        /* ── card ── */
        .card {
          position: relative; border-radius: 20px; overflow: hidden;
          text-decoration: none; color: var(--text);
          display: flex; flex-direction: column;
          background: var(--surface); border: 1px solid var(--border);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.35s, border-color 0.2s;
          animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
          box-shadow: var(--shadow-sm);
        }
        @keyframes cardIn {
          from{opacity:0;transform:translateY(28px) scale(0.97);}
          to{opacity:1;transform:translateY(0) scale(1);}
        }
        .card:nth-child(1){animation-delay:0.04s}.card:nth-child(2){animation-delay:0.08s}
        .card:nth-child(3){animation-delay:0.12s}.card:nth-child(4){animation-delay:0.16s}
        .card:nth-child(5){animation-delay:0.20s}.card:nth-child(6){animation-delay:0.24s}
        .card:nth-child(7){animation-delay:0.28s}.card:nth-child(8){animation-delay:0.32s}

        .card:hover {
          transform: translateY(-7px) scale(1.01);
          box-shadow: 0 28px 60px var(--card-shadow), 0 0 0 1px color-mix(in srgb, var(--border2) 80%, transparent);
        }

        /* ── banner ── */
        .card-banner {
          height: 115px; position: relative;
          background: var(--card-grad); overflow: hidden; flex-shrink: 0;
        }
        .banner-dots {
          position: absolute; inset: 0; opacity: 0.12;
          background-image: radial-gradient(rgba(255,255,255,0.85) 1px, transparent 1px);
          background-size: 18px 18px;
        }
        .banner-shine {
          position: absolute; top:-40%; left:-20%; width:60%; height:140%;
          background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%);
          transform: skewX(-15deg); transition: left 0.6s;
        }
        .card:hover .banner-shine { left: 120%; }

        .banner-icon {
          position: absolute; bottom: -18px; left: 1.4rem;
          width: 58px; height: 58px; border-radius: 16px;
          background: var(--surface);
          border: 3px solid var(--surface);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.65rem; box-shadow: var(--shadow-md); z-index: 2;
          transition: transform 0.3s;
        }
        .card:hover .banner-icon { transform: scale(1.1) rotate(-4deg); }

        .banner-tag {
          position: absolute; top: 0.9rem; right: 0.9rem;
          font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.92);
          background: rgba(0,0,0,0.28);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.25rem 0.65rem; border-radius: 100px;
        }

        /* ── card body ── */
        .card-body { padding: 1.8rem 1.4rem 1.25rem; display: flex; flex-direction: column; gap: 0.9rem; flex: 1; }

        .card-name { font-size: 1.15rem; font-weight: 800; letter-spacing: -0.025em; line-height: 1.2; margin-top: 0.4rem; color: var(--text); }

        .topics { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .topic {
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          color: var(--text2); background: var(--surface2);
          border: 1px solid var(--border);
          padding: 0.2rem 0.55rem; border-radius: 6px; letter-spacing: 0.03em;
        }

        .meta { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .meta-pill {
          display: flex; align-items: center; gap: 0.35rem;
          font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
          color: var(--text2); background: var(--surface2);
          border: 1px solid var(--border);
          padding: 0.28rem 0.65rem; border-radius: 8px;
        }

        /* ── progress ── */
        .progress-wrap { margin-top: auto; }
        .prog-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem; }
        .prog-label {
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase;
        }
        .prog-pct { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 500; color: var(--text); }
        .prog-track { height: 5px; background: var(--border2); border-radius: 100px; overflow: hidden; }
        .prog-fill {
          height: 100%; border-radius: 100px;
          background: var(--card-grad); width: var(--prog);
          box-shadow: 0 0 12px var(--card-shadow);
        }

        /* ── card footer ── */
        .card-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.85rem 1.4rem;
          border-top: 1px solid var(--border);
          background: var(--surface2);
        }
        .foot-text { font-size: 0.78rem; font-weight: 600; color: var(--text2); transition: color 0.2s; }
        .card:hover .foot-text { color: var(--text); }

        .foot-arrow {
          width: 32px; height: 32px; border-radius: 10px;
          border: 1px solid var(--border); background: transparent;
          display: flex; align-items: center; justify-content: center;
          color: var(--muted);
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .card:hover .foot-arrow {
          background: var(--card-grad); border-color: transparent; color: #fff;
          box-shadow: 0 4px 16px var(--card-shadow); transform: translate(2px,-2px);
        }

        @media(max-width:640px){
          .page{padding:2rem 1rem 4rem;}
          .grid{grid-template-columns:1fr;}
          .stats-strip{width:100%;}
          .stat-box{flex:1;padding:0.85rem 0.75rem;}
        }
      `}</style>

      {/* BG blobs */}
      <div className="page-bg">
        <div className="bg-blob blob1"/><div className="bg-blob blob2"/>
        <div className="bg-blob blob3"/><div className="bg-blob blob4"/>
      </div>

      <main className="page">

        {/* Hero */}
        <div className="hero">
          <div className="hero-badge">
            <span className="badge-dot"/>
            Academic Year 2024–25 · 8 Active Courses
          </div>
          <h1 className="hero-title">
            <span className="line1">Welcome back,</span>
            <span className="line2">Students! 👋</span>
          </h1>
          <p className="hero-desc">
            All your course content, and teaching materials live here. Pick a subject to dive in.
          </p>
          <div className="stats-strip">
            {[
              { num: "8",     lbl: "Courses"       },
              { num: "1,103", lbl: "Students"      },
              { num: "206",   lbl: "Lessons"       },
              { num: "62%",   lbl: "Avg. Coverage" },
            ].map((s) => (
              <div key={s.lbl} className="stat-box">
                <div className="stat-num">{s.num}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section */}
        <div className="section-top">
          <div className="section-left">
            <span className="section-title">All Courses</span>
            <span className="pill-count">{courses.length} subjects</span>
          </div>
          <Link href="/courses/new" className="btn-new">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New Course
          </Link>
        </div>

        {/* Cards */}
        <div className="grid">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.id}/session1`}
              className="card"
              style={{
                ["--card-grad"   as string]: c.grad,
                ["--card-shadow" as string]: c.shadow,
                ["--prog"        as string]: `${c.progress}%`,
              }}
            >
              <div className="card-banner">
                <div className="banner-dots"/>
                <div className="banner-shine"/>
                <div className="banner-icon">{c.icon}</div>
                <span className="banner-tag">{c.tag}</span>
              </div>

              <div className="card-body">
                <div className="card-name">{c.name}</div>
                <div className="topics">
                  {c.topics.map((t) => <span key={t} className="topic">{t}</span>)}
                </div>
                <div className="meta">
                  <span className="meta-pill">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <rect x="0.75" y="2.5" width="9.5" height="7.75" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
                      <path d="M3.5 1v2M7.5 1v2M0.75 5.5h9.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                    </svg>
                    {c.lessons} lessons
                  </span>
                  <span className="meta-pill">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="5.5" cy="3.25" r="1.85" stroke="currentColor" strokeWidth="1.1"/>
                      <path d="M1.5 9.75c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                    </svg>
                    {c.students} students
                  </span>
                </div>
                <div className="progress-wrap">
                  <div className="prog-row">
                    <span className="prog-label">Syllabus Coverage</span>
                    <span className="prog-pct">{c.progress}%</span>
                  </div>
                  <div className="prog-track"><div className="prog-fill"/></div>
                </div>
              </div>

              <div className="card-foot">
                <span className="foot-text">Open Course</span>
                <div className="foot-arrow">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}