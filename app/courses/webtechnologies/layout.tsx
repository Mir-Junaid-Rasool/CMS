"use client";

import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import ModuleNav from "@/components/ModuleNav";

const moduleData = [
  {
    num: 1, title: "HTML", color: "#f97316",
    sessions: [
      { num: 1,  title: "Introduction to HTML & The Web",  href: "/courses/webtechnologies/html/session1" },
      { num: 2,  title: "Text Effects, DIV, IMG, Colors",  href: "/courses/webtechnologies/html/session2" },
      { num: 3,  title: "Lists & Image Attributes",        href: "/courses/webtechnologies/html/session3" },
      { num: 4,  title: "Hyperlinks, Anchors & URLs",      href: "/courses/webtechnologies/html/session4" },
      { num: 5,  title: "Tables with colspan & rowspan",   href: "/courses/webtechnologies/html/session5" },
      { num: 6,  title: "Forms, Input Elements & Frames",  href: "/courses/webtechnologies/html/session6" },
    ],
  },
  {
    num: 2, title: "CSS", color: "#3b82f6",
    sessions: [
      { num: 7,  title: "Introduction to CSS",             href: "/courses/webtechnologies/css/session7"  },
      { num: 8,  title: "Box Model & Layout",              href: "/courses/webtechnologies/css/session8"  },
      { num: 9,  title: "Selectors, Fonts & Colors",       href: "/courses/webtechnologies/css/session9"  },
      { num: 10, title: "Flexbox",                         href: "/courses/webtechnologies/css/session10" },
      { num: 11, title: "CSS Grid",                        href: "/courses/webtechnologies/css/session11" },
      { num: 12, title: "Animations & Transitions",        href: "/courses/webtechnologies/css/session12" },
    ],
  },
  {
    num: 3, title: "JavaScript", color: "#ff88ff",
    sessions: [
      { num: 13, title: "Introduction to JavaScript",        href: "/courses/webtechnologies/js/session13" },
      { num: 14, title: "Variables, Data Types & Operators", href: "/courses/webtechnologies/js/session14" },
      { num: 15, title: "Functions & Scope",                 href: "/courses/webtechnologies/js/session15" },
      { num: 16, title: "DOM Manipulation",                  href: "/courses/webtechnologies/js/session16" },
      { num: 17, title: "Events & Event Handling",           href: "/courses/webtechnologies/js/session17" },
      { num: 18, title: "Forms Validation",                  href: "/courses/webtechnologies/js/session18" },
    ],
  },
  {
    num: 4, title: "PHP", color: "#8b5cf6",
    sessions: [
      { num: 19, title: "Introduction to PHP",         href: "/courses/webtechnologies/php/session19" },
      { num: 20, title: "Variables, Loops & Functions",href: "/courses/webtechnologies/php/session20" },
      { num: 21, title: "Forms & User Input",          href: "/courses/webtechnologies/php/session21" },
      { num: 22, title: "PHP & MySQL — CRUD",          href: "/courses/webtechnologies/php/session22" },
      { num: 23, title: "Sessions & Cookies",          href: "/courses/webtechnologies/php/session23" },
      { num: 24, title: "Authentication & Security",   href: "/courses/webtechnologies/php/session24" },
    ],
  },
];

export default function ModuleLayout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showBackTop, setShowBackTop]     = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        navBarRef.current?.contains(target) ||
        drawerRef.current?.contains(target)
      ) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick as EventListener);
    };
  }, [mobileNavOpen]);

  return (
    <>
      <style>{`
        .wt-outer { overflow-x: clip; }

        .wt-shell {
          display: flex;
          align-items: flex-start;
          gap: 1.75rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 86px 1.5rem 4rem;
        }

        .wt-content { flex: 1; min-width: 0; }

        /* ── mobile sticky bar ── */
        .wt-mobile-bar {
          display: none;
          position: fixed;
          top: 68px;
          left: 0; right: 0;
          z-index: 200;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 0.6rem 1rem;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .wt-mobile-spacer { display: none; height: 44px; flex-shrink: 0; }

        .wt-mnb-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: var(--text2);
          letter-spacing: 0.04em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        .wt-mnb-toggle {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.4rem 0.75rem;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .wt-mnb-toggle:hover { background: var(--border); border-color: var(--border2); }
        .wt-mnb-toggle svg { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); flex-shrink: 0; }
        .wt-mnb-toggle.open svg { transform: rotate(180deg); }

        /* ── slide-down drawer ── */
        .wt-drawer {
          display: none;
          position: fixed;
          top: calc(68px + 44px);
          left: 0; right: 0;
          z-index: 199;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1);
          border-bottom: 1px solid var(--border);
          background: var(--bg);
        }
        .wt-drawer.open {
          max-height: calc(100vh - 68px - 44px);
          overflow-y: auto;
        }
        .wt-drawer .lnav {
          display: flex !important;
          width: 100% !important;
          position: static !important;
          max-height: none !important;
          border-radius: 0 !important;
          border-left: none !important;
          border-right: none !important;
          border-top: none !important;
        }

        /* ── backdrop ── */
        .wt-backdrop {
          display: none;
        }

        /* ── back to top ── */
        .wt-btt {
          position: fixed;
          bottom: 2rem; right: 2rem;
          z-index: 300;
          width: 42px; height: 42px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          transition: opacity 0.25s ease, transform 0.25s ease,
                      background 0.15s, color 0.15s;
        }
        .wt-btt:hover {
          background: var(--surface2);
          color: var(--text);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.16);
        }
        .wt-btt.hidden { opacity: 0; pointer-events: none; transform: translateY(8px); }

        /* ── breakpoints ── */
        @media (max-width: 860px) {
          .wt-shell { flex-direction: column; gap: 0; padding: 0 0 4rem; }
          .wt-mobile-bar    { display: flex; }
          .wt-drawer        { display: block; }
          .wt-mobile-spacer { display: block; }
          .wt-content       { padding: 1.5rem 1rem 2rem; }
          .wt-backdrop      {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 198;
            background: rgba(0,0,0,0.45);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            cursor: pointer;
            animation: wtFadeIn 0.25s ease forwards;
          }
          .wt-btt { bottom: 1.25rem; right: 1.25rem; }
        }
        @media (min-width: 861px) {
          .wt-mobile-bar    { display: none !important; }
          .wt-drawer        { display: none !important; }
          .wt-mobile-spacer { display: none !important; }
        }
        @keyframes wtFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* backdrop */}
      {mobileNavOpen && (
        <div className="wt-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* mobile sticky bar */}
      <div className="wt-mobile-bar" ref={navBarRef}>
        <span className="wt-mnb-label">📚 Course Navigation</span>
        <button
          className={`wt-mnb-toggle${mobileNavOpen ? " open" : ""}`}
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-expanded={mobileNavOpen}
          aria-label="Toggle course navigation"
        >
          {mobileNavOpen ? "Hide" : "Modules"}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* slide-down drawer */}
      <div className={`wt-drawer${mobileNavOpen ? " open" : ""}`} ref={drawerRef}>
        <ModuleNav modules={moduleData} />
      </div>

      {/* spacer */}
      <div className="wt-mobile-spacer" />

      {/* desktop shell */}
      <div className="wt-outer">
        <div className="wt-shell">
          <ModuleNav modules={moduleData} />
          <main className="wt-content">{children}</main>
        </div>
      </div>

      {/* back to top */}
      <button
        className={`wt-btt${showBackTop ? "" : " hidden"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.75"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  );
}