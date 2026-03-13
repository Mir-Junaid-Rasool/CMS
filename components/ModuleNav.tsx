"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Session { num: number; title: string; href: string; }
interface Module   { num: number; title: string; color: string; sessions: Session[]; }
interface Props    { modules: Module[]; }

export default function ModuleNav({ modules }: Props) {
  const pathname = usePathname();

  const activeModule = modules.find((m) =>
    m.sessions.some((s) => s.href === pathname)
  );

  const [openModule, setOpenModule] = useState<number | null>(
    activeModule?.num ?? modules[0]?.num ?? null
  );

  const toggle = (num: number) =>
    setOpenModule((prev) => (prev === num ? null : num));

  const totalSessions = modules.reduce((a, m) => a + m.sessions.length, 0);

  const activeSession = modules
    .flatMap((m) => m.sessions)
    .find((s) => s.href === pathname);
  const activeNum = activeSession?.num ?? 0;

  const progressPct = totalSessions
    ? Math.round((activeNum / totalSessions) * 100)
    : 0;

  return (
    <>
      <style>{`
        .lnav {
          width: 260px;
          flex-shrink: 0;
          position: sticky;
          top: 80px;
          max-height: calc(100vh - 96px);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: var(--surface);
          scrollbar-width: thin;
          scrollbar-color: var(--border2) transparent;
          align-self: flex-start;
        }
        .lnav::-webkit-scrollbar { width: 4px; }
        .lnav::-webkit-scrollbar-track { background: transparent; }
        .lnav::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

        .lnav-head {
          padding: 0.85rem 1rem 0.75rem;
          border-bottom: 1px solid var(--border);
          background: var(--surface2);
          border-radius: 16px 16px 0 0;
          flex-shrink: 0;
        }
        .lnav-head-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }
        .lnav-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .lnav-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          color: var(--muted);
          background: var(--border);
          border-radius: 20px;
          padding: 0.1rem 0.5rem;
        }
        .lnav-prog-track {
          width: 100%;
          height: 4px;
          background: var(--border);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 0.35rem;
        }
        .lnav-prog-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #11998e, #38ef7d);
          transition: width 0.5s ease;
        }
        .lnav-prog-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          color: var(--muted);
        }

        .lnav-mod { border-bottom: 1px solid var(--border); }
        .lnav-mod:last-child { border-bottom: none;  }

        .lnav-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 0.85rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s;
        }
        .lnav-trigger:hover  { background: var(--surface2); }
        .lnav-trigger.is-open { background: var(--surface2); }

        .lnav-bar {
          width: 3px;
          min-height: 30px;
          border-radius: 100px;
          flex-shrink: 0;
          transition: background 0.25s;
        }

        .lnav-trigger-body { flex: 1; min-width: 0; }
        .lnav-mod-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.52rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          display: block;
          margin-bottom: 0.1rem;
        }
        .lnav-mod-name {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text);
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }

        .lnav-right {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }
        .lnav-sess-n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.52rem;
          color: var(--muted);
          white-space: nowrap;
        }
        .lnav-chevron {
          width: 13px;
          height: 13px;
          color: var(--muted);
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .lnav-chevron.open { transform: rotate(180deg); }

        .lnav-slist-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .lnav-slist-wrap.open { grid-template-rows: 1fr; }
        .lnav-slist-inner { overflow: hidden; }
        .lnav-slist {
          padding: 0.3rem 0.55rem 0.55rem 0.55rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .lnav-slink {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.45rem 0.6rem;
          border-radius: 8px;
          text-decoration: none;
          color: var(--text2);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          transition: background 0.15s, color 0.15s;
          border: 1px solid transparent;
          line-height: 1.35;
        }
        .lnav-slink:hover {
          background: var(--surface2);
          color: var(--text);
        }
        .lnav-slink.active {
          background: var(--surface2);
          color: var(--text);
          font-weight: 700;
          border-color: var(--border);
        }

        .lnav-snum {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.58rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .lnav-stitle {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .lnav-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* desktop only — hide on mobile (layout.tsx drawer handles it) */
        @media (max-width: 860px) {
          .lnav { display: none; }
        }
      `}</style>

      <aside className="lnav" aria-label="Course navigation">
        <div className="lnav-head">
          <div className="lnav-head-top">
            <span className="lnav-title">Course Navigation</span>
            <span className="lnav-badge">{modules.length}M · {totalSessions}S</span>
          </div>
          <div className="lnav-prog-track">
            <div className="lnav-prog-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="lnav-prog-label">{progressPct}% complete</span>
        </div>

        {modules.map((mod) => {
          const isOpen    = openModule === mod.num;
          const hasActive = mod.sessions.some((s) => s.href === pathname);

          return (
            <div key={mod.num} className="lnav-mod">
              <button
                className={`lnav-trigger${isOpen ? " is-open" : ""}`}
                onClick={() => toggle(mod.num)}
                aria-expanded={isOpen}
              >
                <div
                  className="lnav-bar"
                  style={{ background: hasActive ? mod.color : "var(--border2)" }}
                />
                <div className="lnav-trigger-body">
                  <span
                    className="lnav-mod-tag"
                    style={{ color: hasActive ? mod.color : undefined }}
                  >
                    Module {mod.num}
                  </span>
                  <span className="lnav-mod-name">{mod.title}</span>
                </div>
                <div className="lnav-right">
                  <span className="lnav-sess-n">{mod.sessions.length}s</span>
                  <svg className={`lnav-chevron${isOpen ? " open" : ""}`} viewBox="0 0 14 14" fill="none">
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              <div className={`lnav-slist-wrap${isOpen ? " open" : ""}`}>
                <div className="lnav-slist-inner">
                  <div className="lnav-slist">
                    {mod.sessions.map((s) => {
                      const active = s.href === pathname;
                      return (
                        <Link
                          key={s.num}
                          href={s.href}
                          className={`lnav-slink${active ? " active" : ""}`}
                        >
                          <span
                            className="lnav-snum"
                            style={{
                              background: mod.color + (active ? "ff" : "55"),
                              color: active ? "#fff" : "rgba(255,255,255,0.85)",
                            }}
                          >
                            {s.num}
                          </span>
                          <span className="lnav-stitle">{s.title}</span>
                          {active && (
                            <span className="lnav-dot" style={{ background: mod.color }} />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </aside>
    </>
  );
}