// app/courses/dev/layout.tsx
"use client";

import { useState, useEffect, useRef } from "react";
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
  {
    num: 4, title: "Build Tool — Maven", color: "#e67e22",
    sessions: [
      { num: 11, title: "Maven Fundamentals & POM",       href: "/courses/dev/session11" },
      { num: 12, title: "Lifecycle, Repos & Dependencies", href: "/courses/dev/session12" },
    ],
  },
  {
    num: 5, title: "Docker & Containers", color: "#0db7ed",
    sessions: [
      { num: 13, title: "Docker Images & Installation",   href: "/courses/dev/session13" },
      { num: 14, title: "Containers, Engine & CLI",       href: "/courses/dev/session14" },
      { num: 15, title: "Compose, Hub, Swarm & Dockerfile", href: "/courses/dev/session15" },
    ],
  },
];

export default function DevLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showBackTop, setShowBackTop]     = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Show back-to-top after scrolling 400px
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer when clicking anywhere outside the bar + drawer
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
        /* ── outer overflow guard (keeps page from horizontal scroll) ── */
        .dev-outer {
          overflow-x: clip;
        }

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
          width: 100%;
        }

        /* ── mobile sticky bar shown only ≤860px ── */
        .mobile-nav-bar {
          display: none;
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
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

        /* spacer so content doesn't hide under fixed bar */
        .mobile-nav-spacer {
          display: none;
          height: 44px;
          flex-shrink: 0;
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

        /* ── mobile slide-down drawer (fixed, scrollable) ── */
        .mobile-nav-drawer {
          display: none;
          position: fixed;
          top: calc(68px + 44px);
          left: 0;
          right: 0;
          z-index: 199;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1);
          border-bottom: 1px solid var(--border);
          background: var(--bg);
        }
        .mobile-nav-drawer.open {
          max-height: calc(100vh - 68px - 44px);
          overflow-y: auto;
        }

        /* make ModuleNav fill full width inside drawer */
        .mobile-nav-drawer .lnav {
          display: flex !important;
          width: 100% !important;
          position: static !important;
          max-height: none !important;
          border-radius: 0 !important;
          border-left: none !important;
          border-right: none !important;
          border-top: none !important;
        }

        /* ── backdrop overlay (mobile only, when drawer is open) ── */
        .nav-backdrop {
          display: none;
        }
        @media (max-width: 860px) {
          .nav-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 198;
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            cursor: pointer;
            animation: fadeInBackdrop 0.25s ease forwards;
          }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
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
          .mobile-nav-spacer { display: block; }
          .dev-content       { padding: 1.5rem 1rem 2rem; }
        }

        @media (min-width: 861px) {
          .mobile-nav-bar    { display: none !important; }
          .mobile-nav-drawer { display: none !important; }
          .mobile-nav-spacer { display: none !important; }
        }

        /* ── back to top button ── */
        .back-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 300;
          width: 42px;
          height: 42px;
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
        .back-top:hover {
          background: var(--surface2);
          color: var(--text);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.16);
        }
        .back-top.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(8px);
        }
        @media (max-width: 860px) {
          .back-top { bottom: 1.25rem; right: 1.25rem; }
        }
      `}</style>

      {/* ── backdrop: tap anywhere outside to close ── */}
      {mobileNavOpen && (
        <div className="nav-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* ── mobile sticky bar ── */}
      <div className="mobile-nav-bar" ref={navBarRef}>
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
      <div className={`mobile-nav-drawer${mobileNavOpen ? " open" : ""}`} ref={drawerRef}>
        <ModuleNav modules={modules} />
      </div>

      {/* ── spacer: pushes content below the fixed nav bar on mobile ── */}
      <div className="mobile-nav-spacer" />

      {/* ── desktop two-column shell ── */}
      <div className="dev-outer">
        <div className="dev-shell">
          <ModuleNav modules={modules} />
          <main className="dev-content">
            {children}
          </main>
        </div>
      </div>
      {/* ── back to top ── */}
      <button
        className={`back-top${showBackTop ? "" : " hidden"}`}
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