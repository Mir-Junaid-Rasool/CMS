// app/courses/dev/layout.tsx
"use client";

import { useState } from "react";
import ModuleNav from "@/components/ModuleNav"; // adjust path as needed

const modules = [
  {
    num: 1, title: "DevOps Foundations", color: "#2a5298",
    sessions: [
      { num: 1,  title: "DevOps Fundamentals",     href: "/courses/dev/session1"  },
      { num: 2,  title: "SDLC Models & DevOps",    href: "/courses/dev/session2"  },
      { num: 3,  title: "DevOps Tools Ecosystem",  href: "/courses/dev/session3"  },
    ],
  },
  {
    num: 2, title: "DevOps in Practice", color: "#11998e",
    sessions: [
      { num: 4,  title: "Version Control & Git",   href: "/courses/dev/session4"  },
      { num: 5,  title: "GIT Operations & GitHub", href: "/courses/dev/session5"  },
      { num: 6,  title: "Advanced GIT",            href: "/courses/dev/session6"  },
    ],
  },
  {
    num: 3, title: "Continuous Integration — Jenkins", color: "#c0392b",
    sessions: [
      { num: 7,  title: "Intro to Jenkins & CI",   href: "/courses/dev/session7"  },
      { num: 8,  title: "Configuring Jenkins",     href: "/courses/dev/session8"  },
      { num: 9,  title: "Pipelines & Agents",      href: "/courses/dev/session9"  },
      { num: 10, title: "Security & Plugins",      href: "/courses/dev/session10" },
    ],
  },
];

export default function DevLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <style>{`
        /* ── two-column shell ── */
        .dev-shell {
          display: flex;
          align-items: flex-start;
          gap: 1.75rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0rem 1.5rem 6rem;
        }

        .dev-content {
          flex: 1;
          min-width: 0;
        }

        /* ── mobile sticky bar shown only ≤860px ── */
        .mobile-nav-bar {
          display: none;
          position: sticky;
          top: 68px;
          z-index: 100;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 0.6rem 1rem;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .mnb-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: var(--text2);
          letter-spacing: 0.04em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .mnb-toggle {
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
        .mnb-toggle:hover {
          background: var(--border);
          border-color: var(--border2);
        }
        .mnb-toggle svg {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }
        .mnb-toggle.open svg {
          transform: rotate(180deg);
        }

        /* ── mobile slide-down drawer ── */
        .mobile-nav-drawer {
          display: none;
          position: sticky;
          top: calc(68px + 44px);
          z-index: 99;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1);
          border-bottom: 1px solid var(--border);
          background: var(--bg);
        }
        .mobile-nav-drawer.open {
          max-height: 70vh;
          overflow-y: auto;
        }

        /* make ModuleNav fill full width inside drawer */
        /* in layout.tsx <style> — add this */
.mobile-nav-drawer .lnav {
  display: flex !important;   /* ← this is the key line */
  width: 100% !important;
  position: static !important;
  max-height: none !important;
  border-radius: 0 !important;
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
}

        /* ── breakpoints ── */
        @media (max-width: 860px) {
          .dev-shell {
            flex-direction: column;
            gap: 0;
            padding: 0 0 4rem;
          }
          .mobile-nav-bar    { display: flex; }
          .mobile-nav-drawer { display: block; }
          .dev-content       { padding: 1.5rem 1rem 2rem; }
        }

        @media (min-width: 861px) {
          .mobile-nav-bar    { display: none !important; }
          .mobile-nav-drawer { display: none !important; }
        }
      `}</style>

      {/* ── mobile sticky bar ── */}
      <div className="mobile-nav-bar">
        <span className="mnb-label">📚 Course Navigation</span>
        <button
          className={`mnb-toggle${mobileNavOpen ? " open" : ""}`}
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

      {/* ── mobile slide-down drawer ── */}
      <div className={`mobile-nav-drawer${mobileNavOpen ? " open" : ""}`}>
        <ModuleNav modules={modules} />
      </div>

      {/* ── desktop two-column shell ── */}
      <div className="dev-shell">
        <ModuleNav modules={modules} />
        <main className="dev-content">
          {children}
        </main>
      </div>
    </>
  );
}