"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "./Themecontext";

const courses = [
  { id: "ml",    name: "Machine Learning",    icon: "🧠", color: "#FF6B6B", tag: "AI"         },
  { id: "react", name: "React",               icon: "⚛️", color: "#61DAFB", tag: "Frontend"   },
  { id: "web",   name: "Web Technologies",    icon: "🌐", color: "#F7DF1E", tag: "Full Stack"  },
  { id: "cloud", name: "Cloud Computing",     icon: "☁️", color: "#FF9900", tag: "DevOps"     },
  { id: "data",  name: "Data Management",     icon: "🗄️", color: "#00D4AA", tag: "Database"   },
  { id: "java",  name: "Java",                icon: "☕", color: "#ED8B00", tag: "Backend"     },
  { id: "c",     name: "C Programming",       icon: "⚙️", color: "#A8B9CC", tag: "Systems"    },
  { id: "se",    name: "Software Engineering",icon: "🏗️", color: "#B794F4", tag: "Process"    },
   { id: "dev",   name: "DevOps",              icon: "⚙️", color: "#2496ED", tag: "DevOps"},
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeId,     setActiveId]     = useState<string | null>(null);
  const [scrolled,     setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <style>{`
        /* ── Nav shell ── */
        .nav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          padding: 0 1.5rem;
          transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
          background: var(--nav-bg);
        }
        .nav-wrap.scrolled {
          background: var(--nav-scroll);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        /* ── Logo ── */
        .logo {
          display: flex; align-items: center; gap: 0.6rem;
          text-decoration: none; flex-shrink: 0;
        }
        .logo-mark { width: 36px; height: 36px; }
        .logo-mark svg { width: 100%; height: 100%; }
        .logo-text { display: flex; flex-direction: column; line-height: 1; }
        .logo-primary {
          font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--text) 0%, var(--accent) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .logo-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; color: var(--muted);
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ── Desktop links ── */
        .nav-links { display: flex; align-items: center; gap: 0.2rem; list-style: none; }
        .nav-links a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.76rem; font-weight: 400; color: var(--text2);
          text-decoration: none; padding: 0.4rem 0.75rem;
          border-radius: 8px; letter-spacing: 0.04em;
          transition: color 0.2s, background 0.2s; white-space: nowrap;
        }
        .nav-links a:hover { color: var(--text); background: var(--surface2); }
        .nav-links a.active { color: var(--text); background: var(--surface2); font-weight: 600; }

        /* ── Courses dropdown trigger ── */
        .courses-trigger { position: relative; z-index: 10; }
        .courses-btn {
          display: flex; align-items: center; gap: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.76rem; color: var(--text2);
          background: none; border: none; cursor: pointer;
          padding: 0.4rem 0.75rem; border-radius: 8px;
          letter-spacing: 0.04em;
          transition: color 0.2s, background 0.2s; white-space: nowrap;
        }
        .courses-btn:hover, .courses-btn.open {
          color: var(--text); background: var(--surface2);
        }
        .chevron {
          width: 12px; height: 12px;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); flex-shrink: 0;
        }
        .chevron.open { transform: rotate(180deg); }

        /* ── Dropdown panel ── */
        .courses-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          width: 750px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.25rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          opacity: 0; visibility: hidden;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: var(--shadow-lg);
        }
        .courses-dropdown.open {
          opacity: 1; visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .dropdown-header {
          grid-column: 1 / -1;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 0.25rem 0.75rem;
          border-bottom: 1px solid var(--border); margin-bottom: 0.25rem;
        }
        .dropdown-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem; color: var(--muted);
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .course-count {
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
          padding: 0.15rem 0.5rem; border-radius: 20px;
        }
        .course-item {
          display: flex; align-items: flex-start; gap: 0.6rem;
          padding: 0.65rem 0.6rem; border-radius: 10px;
          cursor: pointer; text-decoration: none;
          transition: background 0.15s; border: 1px solid transparent;
          color: var(--text);
        }
        .course-item:hover { background: var(--surface2); border-color: var(--border); }
        .course-icon { font-size: 1.1rem; line-height: 1; flex-shrink: 0; margin-top: 1px; }
        .course-info { display: flex; flex-direction: column; gap: 0.15rem; }
        .course-name { font-size: 0.78rem; font-weight: 600; color: var(--text); line-height: 1.2; }
        .course-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem; color: var(--muted); letter-spacing: 0.06em;
        }

        /* ── Right side actions ── */
        .nav-actions { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }

        .icon-btn {
          width: 36px; height: 36px; border-radius: 9px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text2);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .icon-btn:hover { color: var(--text); border-color: var(--border2); background: var(--surface2); }

        /* ── Theme toggle ── */
        .theme-toggle {
          width: 56px; height: 30px;
          border-radius: 100px;
          border: 1.5px solid var(--border2);
          background: var(--surface2);
          cursor: pointer;
          position: relative;
          transition: background 0.3s, border-color 0.3s;
          flex-shrink: 0;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .theme-toggle:hover { border-color: var(--accent); }
        .toggle-thumb {
          position: absolute;
          left: 3px;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s;
          box-shadow: 0 2px 8px color-mix(in srgb, var(--accent) 50%, transparent);
        }
        .toggle-thumb.light { transform: translateX(24px); }
        .toggle-icons {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 6px; pointer-events: none;
        }
        .toggle-icons span { font-size: 0.65rem; opacity: 0.5; }

        /* ── Primary button ── */
        .btn-primary {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem; font-weight: 700; color: #fff;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
          border: none; padding: 0.5rem 1.1rem; border-radius: 9px;
          cursor: pointer; letter-spacing: -0.01em; white-space: nowrap;
          box-shadow: 0 4px 16px color-mix(in srgb, var(--accent) 40%, transparent);
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.9; transform: translateY(-1px);
          box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 50%, transparent);
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          width: 44px;
          height: 44px;
          padding: 0;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--text); border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
          pointer-events: none;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .mobile-menu {
          position: fixed; inset: 0; z-index: 190;
          background: var(--bg);
          display: flex; flex-direction: column;
          padding: 5rem 1.5rem 2rem;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          border-left: 1px solid var(--border);
        }
        .mobile-menu.open { transform: translateX(0); }

        .mobile-nav-links { list-style: none; display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 2rem; }
        .mobile-nav-links a {
          font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;
          color: var(--text2); text-decoration: none;
          padding: 0.75rem 1rem; border-radius: 10px; display: block;
          letter-spacing: 0.04em; transition: color 0.2s, background 0.2s;
        }
        .mobile-nav-links a:hover { color: var(--text); background: var(--surface2); }

        .mobile-section-label {
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
          color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0 1rem; margin-bottom: 0.75rem;
        }

        .mobile-courses-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem; margin-bottom: 2rem;
        }
        .mobile-course-card {
          display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem;
          border-radius: 12px; border: 1px solid var(--border);
          background: var(--surface); cursor: pointer; text-decoration: none;
          transition: border-color 0.2s, background 0.2s; color: var(--text);
        }
        .mobile-course-card:hover { background: var(--surface2); }
        .mobile-course-name { font-size: 0.76rem; font-weight: 600; color: var(--text); line-height: 1.2; }
        .mobile-course-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.56rem; color: var(--muted); }

        .mobile-theme-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem; border-radius: 12px;
          background: var(--surface); border: 1px solid var(--border);
          margin-bottom: 1rem;
        }
        .mobile-theme-label { font-size: 0.85rem; font-weight: 600; color: var(--text); }
        .mobile-theme-sub { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--muted); margin-top: 2px; }

        .mobile-bottom { margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--border); }
        .btn-primary-full {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; font-weight: 700; color: #fff;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
          border: none; padding: 0.85rem; border-radius: 12px;
          cursor: pointer; width: 100%;
          box-shadow: 0 4px 16px color-mix(in srgb, var(--accent) 35%, transparent);
        }

        /* ── Responsive ── */
        /* Desktop: hide hamburger and mobile menu */
        @media (min-width: 901px) {
          .hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        /* Tablet + Mobile (≤900px): hide desktop nav, show hamburger */
        @media (max-width: 900px) {
          .nav-links, .courses-trigger { display: none; }
          .hamburger { display: flex !important; }
        }
        /* Mobile only (≤640px): also hide the CTA button */
        @media (max-width: 640px) {
          .btn-primary { display: none; }
          .mobile-menu { width: 100%; border-left: none; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 36 36" fill="none">
                <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="url(#n1)" strokeWidth="2" fill="none"/>
                <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" fill="color-mix(in srgb, #7C6AF7 15%, transparent)" stroke="url(#n2)" strokeWidth="1.5"/>
                <circle cx="18" cy="18" r="4" fill="url(#n1)"/>
                <defs>
                  <linearGradient id="n1" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7C6AF7"/><stop offset="1" stopColor="#F76AC8"/>
                  </linearGradient>
                  <linearGradient id="n2" x1="8" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7C6AF7" stopOpacity="0.6"/>
                    <stop offset="1" stopColor="#6AF7C8" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-primary">CMS</span>
              <span className="logo-sub">Computing Nexus</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            <li><Link href="/" className="active">Dashboard</Link></li>
            <li><Link href="/materials">Materials</Link></li>

            {/* Courses dropdown */}
            <li className="courses-trigger" ref={dropdownRef}>
              <button
                className={`courses-btn${dropdownOpen ? " open" : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Courses
                <svg className={`chevron${dropdownOpen ? " open" : ""}`} viewBox="0 0 12 12" fill="none">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={`courses-dropdown${dropdownOpen ? " open" : ""}`}>
                <div className="dropdown-header">
                  <span className="dropdown-title">All Courses</span>
                  <span className="course-count">{courses.length} subjects</span>
                </div>
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}/session1`}
                    className="course-item"
                    onClick={() => { setActiveId(course.id); setDropdownOpen(false); }}
                    style={{ borderColor: activeId === course.id ? course.color + "40" : undefined }}
                  >
                    <span className="course-icon">{course.icon}</span>
                    <div className="course-info">
                      <span className="course-name">{course.name}</span>
                      <span className="course-tag">{course.tag}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </li>

            <li><Link href="/assignments">Assignments</Link></li>
            <li><Link href="/students">Students</Link></li>
          </ul>

          {/* Right actions */}
          <div className="nav-actions">
            {/* Search */}
            <button className="icon-btn" aria-label="Search">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="6.5" cy="6.5" r="4.2" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M9.8 9.8L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              <div className="toggle-icons">
                <span>🌙</span>
                <span>☀️</span>
              </div>
              <div className={`toggle-thumb${isDark ? "" : " light"}`}>
                {isDark ? "🌙" : "☀️"}
              </div>
            </button>

            <button className="btn-primary">+ New Content</button>

            {/* Hamburger */}
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <ul className="mobile-nav-links">
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
          <li><Link href="/materials" onClick={() => setMenuOpen(false)}>Materials</Link></li>
          <li><Link href="/assignments" onClick={() => setMenuOpen(false)}>Assignments</Link></li>
          <li><Link href="/students" onClick={() => setMenuOpen(false)}>Students</Link></li>
        </ul>

        <p className="mobile-section-label">Courses</p>
        <div className="mobile-courses-grid">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}/session1`}
              className="mobile-course-card"
              style={{ borderColor: activeId === course.id ? course.color + "60" : undefined }}
              onClick={() => { setActiveId(course.id); setMenuOpen(false); }}
            >
              <span style={{ fontSize: "1.2rem" }}>{course.icon}</span>
              <div>
                <div className="mobile-course-name">{course.name}</div>
                <div className="mobile-course-tag">{course.tag}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Theme toggle row in mobile */}
        <div className="mobile-theme-row">
          <div>
            <div className="mobile-theme-label">
              {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </div>
            <div className="mobile-theme-sub">
              Switch to {isDark ? "light" : "dark"} theme
            </div>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <div className="toggle-icons">
              <span>🌙</span><span>☀️</span>
            </div>
            <div className={`toggle-thumb${isDark ? "" : " light"}`}>
              {isDark ? "🌙" : "☀️"}
            </div>
          </button>
        </div>

        <div className="mobile-bottom">
          <button className="btn-primary-full">+ New Content</button>
        </div>
      </div>
    </>
  );
}