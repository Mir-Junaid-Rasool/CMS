"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import ModuleNav from "@/components/ModuleNav";

const moduleData = [
  {
    num: 1,
    title: "HTML",
    color: "#f97316",
    sessions: [
      { num: 1,  title: "Introduction to HTML & The Web",   href: "/courses/webtechnologies/html/session1" },
      { num: 2,  title: "Text Effects, DIV, IMG, Colors",   href: "/courses/webtechnologies/html/session2" },
      { num: 3,  title: "Lists & Image Attributes",         href: "/courses/webtechnologies/html/session3" },
      { num: 4,  title: "Hyperlinks, Anchors & URLs",       href: "/courses/webtechnologies/html/session4" },
      { num: 5,  title: "Tables with colspan & rowspan",    href: "/courses/webtechnologies/html/session5" },
      { num: 6,  title: "Forms, Input Elements & Frames",   href: "/courses/webtechnologies/html/session6" },
    ],
  },
  {
    num: 2,
    title: "CSS",
    color: "#3b82f6",
    sessions: [
      { num: 7,  title: "Introduction to CSS",              href: "/courses/webtechnologies/css/session7"  },
      { num: 8,  title: "Box Model & Layout",               href: "/courses/webtechnologies/css/session8"  },
      { num: 9,  title: "Selectors, Fonts & Colors",        href: "/courses/webtechnologies/css/session9"  },
      { num: 10, title: "Flexbox",                          href: "/courses/webtechnologies/css/session10" },
      { num: 11, title: "CSS Grid",                         href: "/courses/webtechnologies/css/session11" },
      { num: 12, title: "Animations & Transitions",         href: "/courses/webtechnologies/css/session12" },
    ],
  },
  {
    num: 3,
    title: "JavaScript",
    color: "#ff88ff",
    sessions: [
      { num: 13, title: "Introduction to JavaScript",       href: "/courses/webtechnologies/js/session13" },
      { num: 14, title: "Variables, Data Types & Operators",href: "/courses/webtechnologies/js/session14" },
      { num: 15, title: "Functions & Scope",                href: "/courses/webtechnologies/js/session15" },
      { num: 16, title: "DOM Manipulation",                 href: "/courses/webtechnologies/js/session16" },
      { num: 17, title: "Events & Event Handling",          href: "/courses/webtechnologies/js/session17" },
      { num: 18, title: "Forms Validation",                 href: "/courses/webtechnologies/js/session18" },
    ],
  },
  {
    num: 4,
    title: "PHP",
    color: "#8b5cf6",
    sessions: [
      { num: 19, title: "Introduction to PHP",              href: "/courses/webtechnologies/php/session19" },
      { num: 20, title: "Variables, Loops & Functions",     href: "/courses/webtechnologies/php/session20" },
      { num: 21, title: "Forms & User Input",               href: "/courses/webtechnologies/php/session21" },
      { num: 22, title: "PHP & MySQL — CRUD",               href: "/courses/webtechnologies/php/session22" },
      { num: 23, title: "Sessions & Cookies",               href: "/courses/webtechnologies/php/session23" },
      { num: 24, title: "Authentication & Security",        href: "/courses/webtechnologies/php/session24" },
    ],
  },
];

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{`
        .btt-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 999;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          transition: opacity 0.25s, transform 0.25s cubic-bezier(0.16,1,0.3,1),
                      background 0.2s, border-color 0.2s;
        }
        .btt-btn.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px);
        }
        .btt-btn.shown {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }
        .btt-btn:hover {
          background: var(--surface2);
          border-color: var(--border2);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.25);
        }
        .btt-btn:active {
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .btt-btn {
            bottom: 1.25rem;
            right: 1.25rem;
            width: 38px;
            height: 38px;
          }
        }
      `}</style>

      <button
        className={`btt-btn ${visible ? "shown" : "hidden"}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 11.5V2.5M7 2.5L3 6.5M7 2.5L11 6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}

export default function ModuleLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "86px 1.5rem 4rem",
        alignItems: "flex-start",
      }}
    >
      <ModuleNav modules={moduleData} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {children}
      </div>
      <BackToTop />
    </div>
  );
}