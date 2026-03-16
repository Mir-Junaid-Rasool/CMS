"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// ─────────────────────────────────────────────────────────────
//  Module data
// ─────────────────────────────────────────────────────────────
const MODULE_DATA = {
  html: {
    title: "HTML",
    fullTitle: "HyperText Markup Language",
    icon: "🌐",
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.10)",
    colorMid: "rgba(249,115,22,0.18)",
    description:
      "The skeleton of every webpage. Learn to structure content with semantic elements, forms, tables, links, and media — the foundation everything else builds on.",
    stats: { sessions: 6, hours: "12 hrs", level: "Beginner" },
    outcomes: [
      "Write valid HTML5 documents from scratch",
      "Use semantic elements for accessibility & SEO",
      "Build tables, forms, and media-rich pages",
      "Understand the browser rendering model",
    ],
    sessions: [
      { num: 1, title: "Introduction to HTML & The Web",  topics: ["DOCTYPE", "Tags & Elements", "Attributes", "Semantic HTML5"],      href: "/courses/webtechnologies/html/session1" },
      { num: 2, title: "Text Effects, DIV, IMG & Colors", topics: ["Text Formatting", "DIV & SPAN", "Colors", "Backgrounds"],           href: "/courses/webtechnologies/html/session2" },
      { num: 3, title: "Lists & Image Attributes",        topics: ["Ordered Lists", "Unordered Lists", "Definition Lists", "img attrs"], href: "/courses/webtechnologies/html/session3" },
      { num: 4, title: "Hyperlinks, Anchors & URLs",      topics: ["Absolute URLs", "Relative URLs", "Anchors", "Link targets"],        href: "/courses/webtechnologies/html/session4" },
      { num: 5, title: "Tables with colspan & rowspan",   topics: ["Table Structure", "colspan", "rowspan", "Nested Tables"],           href: "/courses/webtechnologies/html/session5" },
      { num: 6, title: "Forms, Inputs & Frames",          topics: ["Input Types", "Select & Textarea", "Form Validation", "iFrames"],   href: "/courses/webtechnologies/html/session6" },
    ],
  },
  css: {
    title: "CSS",
    fullTitle: "Cascading Style Sheets",
    icon: "🎨",
    color: "#3b82f6",
    colorDim: "rgba(59,130,246,0.10)",
    colorMid: "rgba(59,130,246,0.18)",
    description:
      "Transform bare HTML into stunning visual experiences. Master selectors, the box model, Flexbox, Grid, animations, and responsive design.",
    stats: { sessions: 6, hours: "12 hrs", level: "Beginner–Intermediate" },
    outcomes: [
      "Apply inline, internal and external stylesheets",
      "Master the CSS box model and positioning",
      "Build responsive layouts with Flexbox and Grid",
      "Create smooth animations and transitions",
    ],
    sessions: [
      { num: 7,  title: "Introduction to CSS",          topics: ["Selectors", "Specificity", "Inline vs External", "Cascade"],      href: "/courses/webtechnologies/css/session7"  },
      { num: 8,  title: "Box Model & Layout",           topics: ["Margin", "Padding", "Border", "display & position"],              href: "/courses/webtechnologies/css/session8"  },
      { num: 9,  title: "Selectors, Fonts & Colors",    topics: ["Pseudo-classes", "Google Fonts", "HSL Colors", "Variables"],      href: "/courses/webtechnologies/css/session9"  },
      { num: 10, title: "Flexbox",                      topics: ["flex-direction", "justify-content", "align-items", "flex-wrap"],  href: "/courses/webtechnologies/css/session10" },
      { num: 11, title: "CSS Grid",                     topics: ["grid-template", "grid-area", "auto-fit", "Responsive Grid"],      href: "/courses/webtechnologies/css/session11" },
      { num: 12, title: "Animations & Transitions",     topics: ["@keyframes", "transition", "transform", "animation-delay"],      href: "/courses/webtechnologies/css/session12" },
    ],
  },
  javascript: {
    title: "JavaScript",
    fullTitle: "JavaScript — Client-Side Scripting",
    icon: "⚡",
    color: "#ff2299",
    colorDim: "rgba(234,179,8,0.10)",
    colorMid: "rgba(234,179,8,0.18)",
    description:
      "Bring your pages to life. Learn variables, functions, DOM manipulation, event handling, form validation, and the fundamentals of DHTML.",
    stats: { sessions: 6, hours: "12 hrs", level: "Intermediate" },
    outcomes: [
      "Write JavaScript programs using ES6+ syntax",
      "Manipulate the DOM dynamically",
      "Handle user events and build interactive UIs",
      "Validate forms and work with APIs",
    ],
    sessions: [
      { num: 13, title: "Introduction to JavaScript",        topics: ["Variables", "Data Types", "Operators", "console.log"],          href: "/courses/webtechnologies/javascript/session13" },
      { num: 14, title: "Variables, Data Types & Operators", topics: ["let/const", "Type Coercion", "Arithmetic", "Comparison"],       href: "/courses/webtechnologies/javascript/session14" },
      { num: 15, title: "Functions & Scope",                 topics: ["Arrow Functions", "Closures", "Hoisting", "Scope Chain"],        href: "/courses/webtechnologies/javascript/session15" },
      { num: 16, title: "DOM Manipulation",                  topics: ["querySelector", "innerHTML", "classList", "createElement"],     href: "/courses/webtechnologies/javascript/session16" },
      { num: 17, title: "Events & Event Handling",           topics: ["addEventListener", "Event Object", "Bubbling", "Delegation"],   href: "/courses/webtechnologies/javascript/session17" },
      { num: 18, title: "Forms Validation",                  topics: ["Regex", "Custom Validation", "preventDefault", "Feedback UI"],  href: "/courses/webtechnologies/javascript/session18" },
    ],
  },
  php: {
    title: "PHP",
    fullTitle: "PHP — Server-Side Scripting",
    icon: "🖥️",
    color: "#8b5cf6",
    colorDim: "rgba(139,92,246,0.10)",
    colorMid: "rgba(139,92,246,0.18)",
    description:
      "Step into the server. Build dynamic web applications with PHP, connect to MySQL databases, manage sessions and cookies, and implement authentication.",
    stats: { sessions: 6, hours: "12 hrs", level: "Intermediate–Advanced" },
    outcomes: [
      "Write PHP scripts for server-side logic",
      "Perform CRUD operations with MySQL",
      "Manage state with sessions and cookies",
      "Implement secure user authentication",
    ],
    sessions: [
      { num: 19, title: "Introduction to PHP",             topics: ["Syntax", "Variables", "echo/print", "Data Types"],              href: "/courses/webtechnologies/php/session19" },
      { num: 20, title: "Variables, Loops & Functions",    topics: ["for/while", "foreach", "User Functions", "Arrays"],             href: "/courses/webtechnologies/php/session20" },
      { num: 21, title: "Forms & User Input",              topics: ["$_GET / $_POST", "Form Handling", "Sanitization", "Redirect"],  href: "/courses/webtechnologies/php/session21" },
      { num: 22, title: "PHP & MySQL — CRUD",              topics: ["mysqli", "SELECT/INSERT", "UPDATE/DELETE", "Prepared Stmts"],   href: "/courses/webtechnologies/php/session22" },
      { num: 23, title: "Sessions & Cookies",              topics: ["session_start()", "$_SESSION", "setcookie()", "$_COOKIE"],      href: "/courses/webtechnologies/php/session23" },
      { num: 24, title: "Authentication & Security",       topics: ["Password Hashing", "Login Flow", "SQL Injection", "XSS"],       href: "/courses/webtechnologies/php/session24" },
    ],
  },
} as const;

type ModuleKey = keyof typeof MODULE_DATA;

// ─────────────────────────────────────────────────────────────
//  Fallback for unknown module
// ─────────────────────────────────────────────────────────────
const ALL_MODULES = [
  { key: "html",       icon: "🌐", title: "HTML",       color: "#f97316", href: "/courses/webtechnologies/html/session1"       },
  { key: "css",        icon: "🎨", title: "CSS",        color: "#3b82f6", href: "/courses/webtechnologies/css/session7"        },
  { key: "javascript", icon: "⚡", title: "JavaScript", color: "#eab308", href: "/courses/webtechnologies/javascript/session13" },
  { key: "php",        icon: "🖥️", title: "PHP",        color: "#8b5cf6", href: "/courses/webtechnologies/php/session19"       },
];

// ─────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────
export default function ModuleOverviewPage() {
  const params  = useParams();
  const moduleKey = (params?.module as string)?.toLowerCase() as ModuleKey;
  const mod = MODULE_DATA[moduleKey];
  const [hoveredSession, setHoveredSession] = useState<number | null>(null);

  // ── If module not found show course index ──────────────────
  if (!mod) {
    return (
      <>
        <style>{pageStyles}</style>
        <div className="ov-page">
          <div className="ov-fallback-header">
            <span className="ov-eyebrow">Web Technologies · 23CSE404</span>
            <h1 className="ov-fallback-title">Choose a Module</h1>
            <p className="ov-fallback-sub">Select one of the four modules below to start learning.</p>
          </div>
          <div className="ov-module-index">
            {ALL_MODULES.map((m, i) => (
              <Link
                key={m.key}
                href={m.href}
                className="ov-index-card"
                style={{ animationDelay: `${i * 0.08}s`, ["--mc" as string]: m.color }}
              >
                <span className="ov-index-icon">{m.icon}</span>
                <span className="ov-index-title">{m.title}</span>
                <svg className="ov-index-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ── Module overview ────────────────────────────────────────
  return (
    <>
      <style>{pageStyles}</style>

      <div className="ov-page">

        {/* ── Breadcrumb ── */}
        <nav className="ov-breadcrumb">
          <Link href="/courses/webtechnologies">Web Technologies</Link>
          <span className="ov-bc-sep">/</span>
          <span>{mod.title}</span>
        </nav>

        {/* ── Hero banner ── */}
        <div
          className="ov-hero"
          style={{ ["--mc" as string]: mod.color, ["--mc-dim" as string]: mod.colorDim, ["--mc-mid" as string]: mod.colorMid }}
        >
          {/* Grid texture */}
          <div className="ov-hero-grid" />

          <div className="ov-hero-left">
            <div className="ov-hero-badge" style={{ color: mod.color, background: mod.colorDim, borderColor: mod.colorMid }}>
              <span className="ov-hero-dot" style={{ background: mod.color }} />
              Module · {mod.title}
            </div>
            <h1 className="ov-hero-title">{mod.fullTitle}</h1>
            <p className="ov-hero-desc">{mod.description}</p>

            <div className="ov-hero-stats">
              {[
                { label: "Sessions",  val: mod.stats.sessions },
                { label: "Duration",  val: mod.stats.hours    },
                { label: "Level",     val: mod.stats.level    },
              ].map((s) => (
                <div key={s.label} className="ov-stat" style={{ borderColor: mod.colorMid }}>
                  <span className="ov-stat-val" style={{ color: mod.color }}>{s.val}</span>
                  <span className="ov-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            <Link
              href={mod.sessions[0].href}
              className="ov-start-btn"
              style={{ background: mod.color, boxShadow: `0 8px 28px ${mod.colorMid}` }}
            >
              Start Session 1
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="ov-hero-icon-wrap">
            <div className="ov-hero-icon-ring" style={{ borderColor: mod.colorMid, background: mod.colorDim }}>
              <span className="ov-hero-icon">{mod.icon}</span>
            </div>
          </div>
        </div>

        {/* ── Two-col: outcomes + other modules ── */}
        <div className="ov-two-col">

          {/* Learning outcomes */}
          <div className="ov-card">
            <div className="ov-card-head">
              <span className="ov-card-title">Learning Outcomes</span>
              <span className="ov-card-tag" style={{ color: mod.color, background: mod.colorDim }}>
                {mod.outcomes.length} outcomes
              </span>
            </div>
            <ul className="ov-outcomes">
              {mod.outcomes.map((o, i) => (
                <li key={i} className="ov-outcome-item">
                  <span className="ov-outcome-dot" style={{ background: mod.color }} />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Other modules */}
          <div className="ov-card">
            <div className="ov-card-head">
              <span className="ov-card-title">Other Modules</span>
            </div>
            <div className="ov-other-modules">
              {ALL_MODULES.filter((m) => m.key !== moduleKey).map((m) => (
                <Link
                  key={m.key}
                  href={m.href}
                  className="ov-other-item"
                  style={{ ["--mc" as string]: m.color }}
                >
                  <span className="ov-other-icon">{m.icon}</span>
                  <span className="ov-other-title">{m.title}</span>
                  <svg className="ov-other-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sessions list ── */}
        <div className="ov-sessions-wrap">
          <div className="ov-sessions-head">
            <span className="ov-card-title">All Sessions</span>
            <span className="ov-card-tag" style={{ color: mod.color, background: mod.colorDim }}>
              {mod.sessions.length} sessions
            </span>
          </div>

          <div className="ov-sessions-list">
            {mod.sessions.map((s, i) => {
              const isHovered = hoveredSession === s.num;
              return (
                <Link
                  key={s.num}
                  href={s.href}
                  className="ov-session-row"
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    ["--mc" as string]: mod.color,
                    ["--mc-dim" as string]: mod.colorDim,
                    borderColor: isHovered ? mod.colorMid : undefined,
                    background: isHovered ? mod.colorDim : undefined,
                  }}
                  onMouseEnter={() => setHoveredSession(s.num)}
                  onMouseLeave={() => setHoveredSession(null)}
                >
                  {/* Number */}
                  <div
                    className="ov-srow-num"
                    style={{
                      background: isHovered ? mod.color : mod.colorDim,
                      color: isHovered ? "#fff" : mod.color,
                      borderColor: mod.colorMid,
                    }}
                  >
                    {s.num}
                  </div>

                  {/* Title + topics */}
                  <div className="ov-srow-body">
                    <span className="ov-srow-title">{s.title}</span>
                    <div className="ov-srow-topics">
                      {s.topics.map((t) => (
                        <span key={t} className="ov-topic-chip">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="ov-srow-arrow"
                    style={{
                      background: isHovered ? mod.color : "transparent",
                      borderColor: isHovered ? mod.color : undefined,
                      color: isHovered ? "#fff" : mod.color,
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 7h9M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
//  Styles
// ─────────────────────────────────────────────────────────────
const pageStyles = `
  .ov-page {
    padding: 0 0 4rem;
    max-width: 860px;
  }

  /* ── Breadcrumb ── */
  .ov-breadcrumb {
    display: flex; align-items: center; gap: 0.4rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.08em;
    margin-bottom: 1.5rem;
  }
  .ov-breadcrumb a { color: var(--muted); text-decoration: none; transition: color 0.15s; }
  .ov-breadcrumb a:hover { color: var(--text); }
  .ov-bc-sep { opacity: 0.4; }

  /* ── Hero ── */
  .ov-hero {
    position: relative; overflow: hidden;
    border-radius: 20px;
    border: 1px solid var(--mc-mid, var(--border));
    background: var(--surface);
    padding: 2rem 2rem 2rem 2rem;
    display: flex; align-items: center;
    justify-content: space-between; gap: 1.5rem;
    margin-bottom: 1.5rem;
    animation: ovFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .ov-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    opacity: 0.06;
    background-image:
      linear-gradient(var(--mc, #888) 1px, transparent 1px),
      linear-gradient(90deg, var(--mc, #888) 1px, transparent 1px);
    background-size: 32px 32px;
  }

  .ov-hero-left { position: relative; z-index: 1; flex: 1; }

  .ov-hero-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.22rem 0.7rem; border-radius: 20px; border: 1px solid;
    margin-bottom: 0.85rem;
  }
  .ov-hero-dot {
    width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
  }

  .ov-hero-title {
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 800; letter-spacing: -0.03em;
    color: var(--text); line-height: 1.15;
    margin-bottom: 0.65rem;
  }
  .ov-hero-desc {
    font-size: 0.84rem; color: var(--muted);
    line-height: 1.7; max-width: 520px;
    margin-bottom: 1.25rem;
  }

  .ov-hero-stats {
    display: flex; gap: 0; margin-bottom: 1.5rem;
    border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden; width: fit-content;
  }
  .ov-stat {
    padding: 0.65rem 1.1rem;
    border-right: 1px solid;
    text-align: center;
    display: flex; flex-direction: column; gap: 0.2rem;
  }
  .ov-stat:last-child { border-right: none; }
  .ov-stat-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem; font-weight: 700; line-height: 1;
  }
  .ov-stat-lbl {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.55rem; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.1em;
  }

  .ov-start-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.65rem 1.4rem; border-radius: 10px;
    color: #fff; font-size: 0.82rem; font-weight: 700;
    text-decoration: none; letter-spacing: -0.01em;
    transition: opacity 0.2s, transform 0.2s;
  }
  .ov-start-btn:hover { opacity: 0.88; transform: translateY(-2px); }

  .ov-hero-icon-wrap {
    position: relative; z-index: 1; flex-shrink: 0;
  }
  .ov-hero-icon-ring {
    width: 110px; height: 110px; border-radius: 28px;
    border: 1px solid; display: flex;
    align-items: center; justify-content: center;
  }
  .ov-hero-icon { font-size: 3.5rem; line-height: 1; }

  @media (max-width: 600px) {
    .ov-hero { flex-direction: column; align-items: flex-start; }
    .ov-hero-icon-wrap { display: none; }
  }

  /* ── Two col ── */
  .ov-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem; margin-bottom: 1.5rem;
    animation: ovFadeUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both;
  }
  @media (max-width: 640px) { .ov-two-col { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .ov-card {
    border-radius: 16px; border: 1px solid var(--border);
    background: var(--surface); padding: 1.25rem;
  }
  .ov-card-head {
    display: flex; align-items: center;
    justify-content: space-between; margin-bottom: 1rem;
  }
  .ov-card-title {
    font-size: 0.82rem; font-weight: 700; color: var(--text);
  }
  .ov-card-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem; font-weight: 600;
    padding: 0.15rem 0.55rem; border-radius: 20px;
  }

  /* ── Outcomes ── */
  .ov-outcomes { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .ov-outcome-item {
    display: flex; align-items: flex-start; gap: 0.6rem;
    font-size: 0.78rem; color: var(--text2, var(--text)); line-height: 1.5;
  }
  .ov-outcome-dot {
    width: 6px; height: 6px; border-radius: 50%;
    flex-shrink: 0; margin-top: 0.45rem;
  }

  /* ── Other modules ── */
  .ov-other-modules { display: flex; flex-direction: column; gap: 0.4rem; }
  .ov-other-item {
    display: flex; align-items: center; gap: 0.65rem;
    padding: 0.6rem 0.75rem; border-radius: 10px;
    border: 1px solid var(--border);
    text-decoration: none; color: var(--text);
    transition: background 0.15s, border-color 0.15s;
  }
  .ov-other-item:hover {
    background: var(--surface2);
    border-color: var(--mc, var(--border));
  }
  .ov-other-icon { font-size: 1.1rem; flex-shrink: 0; }
  .ov-other-title { flex: 1; font-size: 0.8rem; font-weight: 600; }
  .ov-other-arrow { color: var(--muted); flex-shrink: 0; }
  .ov-other-item:hover .ov-other-arrow { color: var(--mc, var(--text)); }

  /* ── Sessions list ── */
  .ov-sessions-wrap {
    border-radius: 16px; border: 1px solid var(--border);
    background: var(--surface); overflow: hidden;
    animation: ovFadeUp 0.5s 0.18s cubic-bezier(0.16,1,0.3,1) both;
  }
  .ov-sessions-head {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border);
    background: var(--surface2, rgba(255,255,255,0.02));
  }

  .ov-sessions-list { display: flex; flex-direction: column; }

  .ov-session-row {
    display: flex; align-items: center; gap: 1rem;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid var(--border);
    border-left: 3px solid transparent;
    text-decoration: none; color: var(--text);
    transition: background 0.15s, border-color 0.15s;
    animation: ovFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .ov-session-row:last-child { border-bottom: none; }
  .ov-session-row:hover { border-left-color: var(--mc, transparent); }

  .ov-srow-num {
    width: 36px; height: 36px; border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; border: 1px solid;
    transition: background 0.2s, color 0.2s;
  }

  .ov-srow-body { flex: 1; min-width: 0; }
  .ov-srow-title {
    display: block; font-size: 0.84rem; font-weight: 600;
    color: var(--text); margin-bottom: 0.35rem;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .ov-srow-topics { display: flex; flex-wrap: wrap; gap: 0.3rem; }
  .ov-topic-chip {
    font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
    color: var(--muted); background: var(--surface2, rgba(255,255,255,0.04));
    border: 1px solid var(--border); padding: 0.1rem 0.45rem; border-radius: 5px;
  }

  .ov-srow-arrow {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  /* ── Fallback index ── */
  .ov-fallback-header { margin-bottom: 2rem; }
  .ov-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.1em;
    display: block; margin-bottom: 0.75rem;
  }
  .ov-fallback-title {
    font-size: 2rem; font-weight: 800; letter-spacing: -0.03em;
    color: var(--text); margin-bottom: 0.4rem;
  }
  .ov-fallback-sub { font-size: 0.88rem; color: var(--muted); }

  .ov-module-index {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }
  .ov-index-card {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 1rem 1.1rem; border-radius: 14px;
    border: 1px solid var(--border); background: var(--surface);
    text-decoration: none; color: var(--text);
    transition: background 0.15s, border-color 0.2s, transform 0.2s;
    animation: ovFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .ov-index-card:hover {
    background: var(--surface2); border-color: var(--mc, var(--border));
    transform: translateY(-3px);
  }
  .ov-index-icon { font-size: 1.5rem; flex-shrink: 0; }
  .ov-index-title { flex: 1; font-size: 0.9rem; font-weight: 700; }
  .ov-index-arrow { color: var(--muted); flex-shrink: 0; }
  .ov-index-card:hover .ov-index-arrow { color: var(--mc, var(--text)); }

  /* ── Animation ── */
  @keyframes ovFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;