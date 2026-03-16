"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import type { SessionData, TopicSection } from "@/types/session";

const SESSION_MAP: Record<string, () => Promise<{ default: SessionData }>> = {
  "html-session1": () => import("@/data/courses/webtechnologies/html/session1") as Promise<{ default: SessionData }>,
  "html-session2": () => import("@/data/courses/webtechnologies/html/session2") as Promise<{ default: SessionData }>,
  "html-session3": () => import("@/data/courses/webtechnologies/html/session3") as Promise<{ default: SessionData }>,
  "html-session4": () => import("@/data/courses/webtechnologies/html/session4") as Promise<{ default: SessionData }>,
  "html-session5": () => import("@/data/courses/webtechnologies/html/session5") as Promise<{ default: SessionData }>,
  "html-session6": () => import("@/data/courses/webtechnologies/html/session6") as Promise<{ default: SessionData }>,
  "css-session7":  () => import("@/data/courses/webtechnologies/css/session7")  as Promise<{ default: SessionData }>,
  "css-session8":  () => import("@/data/courses/webtechnologies/css/session8")  as Promise<{ default: SessionData }>,
  "css-session9":  () => import("@/data/courses/webtechnologies/css/session9")  as Promise<{ default: SessionData }>,
  "css-session10": () => import("@/data/courses/webtechnologies/css/session10") as Promise<{ default: SessionData }>,
  "css-session11": () => import("@/data/courses/webtechnologies/css/session11") as Promise<{ default: SessionData }>,
  "css-session12": () => import("@/data/courses/webtechnologies/css/session12") as Promise<{ default: SessionData }>,
  "js-session13":  () => import("@/data/courses/webtechnologies/js/session13")  as Promise<{ default: SessionData }>,
  "js-session14":  () => import("@/data/courses/webtechnologies/js/session14")  as Promise<{ default: SessionData }>,
  "js-session15":  () => import("@/data/courses/webtechnologies/js/session15")  as Promise<{ default: SessionData }>,
  "js-session16":  () => import("@/data/courses/webtechnologies/js/session16")  as Promise<{ default: SessionData }>,
  "js-session17":  () => import("@/data/courses/webtechnologies/js/session17")  as Promise<{ default: SessionData }>,
  "js-session18":  () => import("@/data/courses/webtechnologies/js/session18")  as Promise<{ default: SessionData }>,
  "php-session19": () => import("@/data/courses/webtechnologies/php/session19") as Promise<{ default: SessionData }>,
};

function CopyBtn({ text, color }: { text: string; color: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="sp-copy"
      style={copied ? { color, background: color + "22" } : undefined}
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        });
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({ label, code, color }: { label?: string; code: string; color: string }) {
  return (
    <div className="sp-code-wrap">
      <div className="sp-code-header">
        {label && <span className="sp-code-label">{label}</span>}
        <CopyBtn text={code} color={color} />
      </div>
      <pre className="sp-code"><code>{code}</code></pre>
    </div>
  );
}

function TopicBlock({
  topic, color, colorDim, colorMid,
}: {
  topic: TopicSection; color: string; colorDim: string; colorMid: string;
}) {
  return (
    <div className="sp-topic">
      <p className="sp-topic-content">{topic.content}</p>

      {topic.tip && (
        <div className="sp-tip" style={{ borderLeftColor: color, background: colorDim, color }}>
          💡 {topic.tip}
        </div>
      )}
      {topic.warning && <div className="sp-warning">⚠️ {topic.warning}</div>}

      {topic.codeExamples?.map((ce, i) => (
        <CodeBlock key={i} label={ce.label} code={ce.code} color={color} />
      ))}

      {topic.definitions && (
        <div className="sp-defs">
          {topic.definitions.map((d, i) => (
            <div
              key={i}
              className="sp-def-item"
              style={
                d.deprecated
                  ? { borderLeftColor: "#ef4444", background: "rgba(239,68,68,0.05)" }
                  : { borderLeftColor: colorMid }
              }
            >
              <div className="sp-def-top">
                <code className="sp-def-term" style={{ color, background: colorDim }}>{d.term}</code>
                {d.deprecated && <span className="sp-dep-badge">deprecated</span>}
              </div>
              <p className="sp-def-desc">{d.description}</p>
              {d.note && <p className="sp-def-note" style={{ color }}>→ {d.note}</p>}
              {d.code && <CodeBlock code={d.code} color={color} />}
            </div>
          ))}
        </div>
      )}

      {topic.table && (
        <div className="sp-table-wrap">
          <table className="sp-table">
            <thead>
              <tr style={{ background: color }}>
                {topic.table.headers.map((h) => <th key={h} className="sp-th">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {topic.table.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 1 ? "sp-tr-alt" : ""}>
                  {row.cells.map((cell, ci) => <td key={ci} className="sp-td">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {topic.subSections?.map((sub) => (
        <div key={sub.id} className="sp-sub">
          <h4 className="sp-sub-h" style={{ color }}>{sub.heading}</h4>
          <p className="sp-topic-content">{sub.content}</p>
          {sub.tip && (
            <div className="sp-tip" style={{ borderLeftColor: color, background: colorDim, color }}>
              💡 {sub.tip}
            </div>
          )}
          {sub.codeExamples?.map((ce, i) => (
            <CodeBlock key={i} label={ce.label} code={ce.code} color={color} />
          ))}
        </div>
      ))}
    </div>
  );
}

type TabId = "objectives" | "content" | "demo" | "exercises";

const TAB_LIST: { id: TabId; label: string; icon: string }[] = [
  { id: "objectives", label: "Objectives", icon: "🎯" },
  { id: "content",    label: "Content",    icon: "📖" },
  { id: "demo",       label: "Live Demo",  icon: "🚀" },
  { id: "exercises",  label: "Exercises",  icon: "✍️" },
];

export default function SessionPage() {
  const params = useParams();
  const moduleName  = (params?.module  as string) ?? "";
  const sessionName = (params?.session as string) ?? "";
  const key = `${moduleName}-${sessionName}`;

  const [data,       setData]      = useState<SessionData | null>(null);
  const [loading,    setLoading]   = useState(true);
  const [tab,        setTab]       = useState<TabId>("objectives");
  const [activeDemo, setActiveDemo]= useState(0);
  const [openTopic,  setOpenTopic] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = SESSION_MAP[key];
    if (!loader) { setLoading(false); setData(null); return; }
    setData(null);
    loader()
      .then((mod) => {
        if (cancelled) return;
        setData(mod.default);
        setOpenTopic(mod.default.topics[0]?.id ?? null);
        setActiveDemo(0);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [key]);

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="sp-page sp-loading-wrap">
          <div className="sp-loading"><div className="sp-spinner" /><span>Loading session…</span></div>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <style>{css}</style>
        <div className="sp-page">
          <div className="sp-notfound">
            <div className="sp-404-icon">📭</div>
            <h2>Session not found</h2>
            <p>The session <code>{key}</code> does not have content yet.</p>
            <Link href={`/courses/webtechnologies/${moduleName}`} className="sp-back-link">
              ← Back to {moduleName} module
            </Link>
          </div>
        </div>
      </>
    );
  }

  const { meta, topics, demos, exercises } = data;
  const C    = meta.color;
  const CDIM = meta.colorDim;
  const CMID = meta.colorMid;
  const currentDemo = demos[activeDemo] ?? demos[0];

  return (
    <>
      <style>{css}</style>
      <div className="sp-page">

        <nav className="sp-bc">
          <Link href="/courses/webtechnologies">Web Technologies</Link>
          <span className="sp-bc-sep">/</span>
          <Link href={`/courses/webtechnologies/${moduleName}`}>{moduleName.toUpperCase()}</Link>
          <span className="sp-bc-sep">/</span>
          <span>Session {meta.sessionNumber}</span>
        </nav>

        <header className="sp-header">
          <div className="sp-badge" style={{ color: C, background: CDIM, borderColor: CMID }}>
            <span className="sp-dot" style={{ background: C }} />
            {meta.module.toUpperCase()} · Session {meta.sessionNumber}
          </div>
          <h1 className="sp-title">{meta.title}</h1>
          <p className="sp-subtitle">{meta.subtitle}</p>
          <div className="sp-chips">
            <span className="sp-chip">⏱ {meta.duration}</span>
            <span className="sp-chip">📖 {topics.length} Topics</span>
            <span className="sp-chip">🚀 {demos.length} Demos</span>
            <span className="sp-chip">✍️ {exercises.length} Exercises</span>
          </div>
        </header>

        <nav className="sp-tabs">
          {TAB_LIST.map((t) => (
            <button
              key={t.id}
              className={`sp-tab${tab === t.id ? " sp-tab-on" : ""}`}
              style={tab === t.id ? { color: C, borderBottomColor: C } : undefined}
              onClick={() => setTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </nav>

        {tab === "objectives" && (
          <section className="sp-section">
            <h2 className="sp-sh" style={{ borderLeftColor: C }}>What You Will Learn</h2>
            <div className="sp-obj-grid">
              {meta.objectives.map((obj, i) => (
                <div key={i} className="sp-obj-card">
                  <span className="sp-obj-num" style={{ background: C, color: "#fff" }}>{i + 1}</span>
                  <span className="sp-obj-text">{obj}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "content" && (
          <section className="sp-section">
            <div className="sp-accordion">
              {topics.map((topic) => {
                const isOpen = openTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className={`sp-acc-item${isOpen ? " sp-acc-open" : ""}`}
                    style={isOpen ? { borderColor: CMID } : undefined}
                  >
                    <button
                      className="sp-acc-trigger"
                      style={isOpen ? { background: CDIM } : undefined}
                      onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                    >
                      <span className="sp-acc-title" style={isOpen ? { color: C } : undefined}>
                        {topic.heading}
                      </span>
                      <svg className={`sp-chev${isOpen ? " sp-chev-open" : ""}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="sp-acc-body">
                        <TopicBlock topic={topic} color={C} colorDim={CDIM} colorMid={CMID} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {tab === "demo" && (
          <section className="sp-section">
            <h2 className="sp-sh" style={{ borderLeftColor: C }}>Interactive Examples</h2>
            <div className="sp-demo-btns">
              {demos.map((d, i) => (
                <button
                  key={d.id}
                  className={`sp-demo-btn${activeDemo === i ? " sp-demo-btn-on" : ""}`}
                  style={activeDemo === i ? { background: C, borderColor: C, color: "#fff" } : undefined}
                  onClick={() => setActiveDemo(i)}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="sp-demo-panel">
              <div className="sp-demo-bar">
                <span className="sp-demo-bar-label" style={{ color: C }}>● {currentDemo.label}</span>
              </div>
              <div className="sp-demo-output" dangerouslySetInnerHTML={{ __html: currentDemo.html }} />
            </div>
          </section>
        )}

        {tab === "exercises" && (
          <section className="sp-section">
            <h2 className="sp-sh" style={{ borderLeftColor: C }}>Practice Exercises</h2>
            <div className="sp-exercises">
              {exercises.map((ex, i) => (
                <div key={i} className="sp-ex-card" style={{ borderLeftColor: C }}>
                  <div className="sp-ex-header">
                    <span className="sp-ex-num" style={{ color: C, background: CDIM }}>{i + 1}</span>
                    <h3 className="sp-ex-title">{ex.title}</h3>
                  </div>
                  <p className="sp-ex-desc">{ex.description}</p>
                  <ol className="sp-ex-tasks">
                    {ex.tasks.map((task, ti) => <li key={ti} className="sp-ex-task">{task}</li>)}
                  </ol>
                  {ex.hint && (
                    <div className="sp-ex-hint" style={{ color: C, background: CDIM, borderColor: CMID }}>
                      💡 Hint: {ex.hint}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="sp-nav-footer">
          {meta.prevSession
            ? <Link href={meta.prevSession.href} className="sp-nav-btn">← Session {meta.prevSession.num}</Link>
            : <div />
          }
          {meta.nextSession && (
            <Link href={meta.nextSession.href} className="sp-nav-btn sp-nav-btn-primary"
                  style={{ background: C, borderColor: C, color: "#fff" }}>
              Session {meta.nextSession.num} →
            </Link>
          )}
        </footer>

      </div>
    </>
  );
}

const css = `
  /* ── Page wrapper ── */
  .sp-page {
    width: 100%;
    min-width: 0;
    max-width: 860px;
    box-sizing: border-box;
    overflow-x: hidden;
    padding: 0 0 4rem;
  }
  @media (max-width: 860px) {
    .sp-page { padding: 0 0 3rem; }
  }

  /* ── Loading / not-found ── */
  .sp-loading-wrap { padding: 4rem 1rem; }
  .sp-loading {
    display: flex; align-items: center; gap: 0.75rem;
    color: var(--muted); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
  }
  .sp-spinner {
    width: 20px; height: 20px; border-radius: 50%;
    border: 2px solid var(--border); border-top-color: var(--accent);
    animation: spSpin 0.7s linear infinite; flex-shrink: 0;
  }
  @keyframes spSpin { to { transform: rotate(360deg); } }
  .sp-notfound { padding: 4rem 1rem; text-align: center; color: var(--text); }
  .sp-404-icon { font-size: 3rem; margin-bottom: 1rem; }
  .sp-notfound h2 { font-size: 1.25rem; margin-bottom: 0.5rem; }
  .sp-notfound p  { color: var(--muted); margin-bottom: 1.5rem; font-size: 0.85rem; }
  .sp-back-link { color: var(--accent); text-decoration: none; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; }
  .sp-back-link:hover { text-decoration: underline; }

  /* ── Breadcrumb ── */
  .sp-bc {
    display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;
    font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.5rem;
  }
  .sp-bc a { color: var(--muted); text-decoration: none; transition: color 0.15s; }
  .sp-bc a:hover { color: var(--text); }
  .sp-bc-sep { opacity: 0.4; }

  /* ── Header ── */
  .sp-header { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
  .sp-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.22rem 0.7rem; border-radius: 20px; border: 1px solid;
    margin-bottom: 0.85rem; max-width: 100%; box-sizing: border-box;
    word-break: break-word; white-space: normal;
  }
  .sp-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .sp-title {
    font-size: clamp(1.25rem, 5vw, 1.9rem); font-weight: 800;
    letter-spacing: -0.03em; color: var(--text);
    line-height: 1.2; margin-bottom: 0.5rem; word-break: break-word;
  }
  .sp-subtitle { font-size: 0.85rem; color: var(--muted); line-height: 1.7; margin-bottom: 1rem; word-break: break-word; }
  .sp-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .sp-chip {
    font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
    color: var(--muted); background: var(--surface2, rgba(255,255,255,0.04));
    border: 1px solid var(--border); border-radius: 20px; padding: 0.2rem 0.6rem;
  }

  /* ── Tabs ── */
  .sp-tabs {
    display: flex; gap: 0;
    border-bottom: 1px solid var(--border);
    margin-bottom: 2rem; overflow-x: auto; scrollbar-width: none;
  }
  .sp-tabs::-webkit-scrollbar { display: none; }
  .sp-tab {
    display: flex; align-items: center; gap: 0.35rem; padding: 0.55rem 0.9rem;
    background: none; border: none; border-bottom: 2px solid transparent;
    cursor: pointer; white-space: nowrap; flex-shrink: 0;
    font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted);
    transition: color 0.15s; margin-bottom: -1px;
  }
  .sp-tab:hover { color: var(--text); }
  .sp-tab-on { font-weight: 700; }

  /* ── Sections ── */
  .sp-section {
    animation: spFade 0.3s ease both;
    overflow: clip;
    min-width: 0;
    isolation: isolate;
  }
  @keyframes spFade {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: none; }
  }
  .sp-sh {
    font-size: 1rem; font-weight: 700; color: var(--text);
    padding-left: 0.85rem; border-left: 3px solid; margin-bottom: 1.25rem;
  }

  /* ── Inline code inside text ── */
  .sp-topic-content code,
  .sp-def-desc code,
  .sp-ex-task code,
  .sp-ex-desc code,
  .sp-tip code,
  .sp-warning code {
    word-break: break-all;
    white-space: normal;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85em;
    background: var(--surface2, rgba(255,255,255,0.06));
    padding: 0.1em 0.35em;
    border-radius: 4px;
  }

  /* ── Objectives ── */
  .sp-obj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
    gap: 0.65rem;
  }
  .sp-obj-card {
    display: flex; align-items: flex-start; gap: 0.75rem;
    padding: 0.85rem 1rem; border-radius: 10px;
    border: 1px solid var(--border); background: var(--surface);
    min-width: 0; box-sizing: border-box;
  }
  .sp-obj-num {
    min-width: 26px; height: 26px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 700; flex-shrink: 0;
  }
  .sp-obj-text { font-size: 0.8rem; color: var(--text2, var(--text)); line-height: 1.5; min-width: 0; word-break: break-word; }

  /* ── Accordion ── */
  .sp-accordion { display: flex; flex-direction: column; gap: 0.5rem; }
  .sp-acc-item {
    border-radius: 12px; border: 1px solid var(--border);
    background: var(--surface);
    overflow: clip;
    transition: border-color 0.2s; min-width: 0;
  }
  .sp-acc-trigger {
    width: 100%; display: flex; align-items: center;
    justify-content: space-between; gap: 0.75rem; padding: 0.9rem 1.1rem;
    background: none; border: none; cursor: pointer;
    text-align: left; transition: background 0.15s; min-width: 0;
  }
  .sp-acc-trigger:hover { background: var(--surface2, rgba(255,255,255,0.03)); }
  .sp-acc-title {
    font-size: 0.85rem; font-weight: 700; color: var(--text);
    transition: color 0.15s; min-width: 0;
    word-break: break-word; overflow-wrap: break-word;
  }
  .sp-chev { color: var(--muted); flex-shrink: 0; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .sp-chev-open { transform: rotate(180deg); }
  .sp-acc-body { padding: 0 1.1rem 1.1rem; min-width: 0; overflow: clip; box-sizing: border-box; }

  /* ── Topic ── */
  .sp-topic { min-width: 0; overflow: clip; }
  .sp-topic-content {
    font-size: 0.84rem; color: var(--muted); line-height: 1.75; margin-bottom: 1rem;
    word-break: break-word; overflow-wrap: break-word;
  }
  .sp-tip {
    display: flex; gap: 0.5rem; padding: 0.75rem 0.9rem;
    border-radius: 8px; border-left: 3px solid;
    font-size: 0.78rem; line-height: 1.6; margin: 0.75rem 0 1rem;
    box-sizing: border-box; word-break: break-word;
    overflow-wrap: break-word; min-width: 0;
  }
  .sp-warning {
    padding: 0.75rem 0.9rem; border-radius: 8px;
    background: rgba(234,179,8,0.1); border-left: 3px solid #eab308;
    color: #ca8a04; font-size: 0.78rem; line-height: 1.6; margin: 0.75rem 0 1rem;
    word-break: break-word; overflow-wrap: break-word;
  }

  /* ── Code blocks ── */
  .sp-code-wrap {
    border-radius: 10px;
    clip-path: inset(0 round 10px);
    border: 1px solid var(--border); margin: 0.75rem 0 1rem;
    max-width: 100%; box-sizing: border-box;
  }
  .sp-code-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.4rem 0.85rem;
    background: var(--surface2, rgba(255,255,255,0.03));
    border-bottom: 1px solid var(--border);
  }
  .sp-code-label { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
  .sp-copy {
    font-family: 'JetBrains Mono', monospace; font-size: 0.55rem;
    text-transform: uppercase; letter-spacing: 0.08em;
    background: none; border: none; cursor: pointer; color: var(--muted);
    padding: 0.2rem 0.5rem; border-radius: 4px; flex-shrink: 0;
    transition: color 0.15s, background 0.15s;
  }
  .sp-copy:hover { color: var(--text); background: var(--border); }
  .sp-code {
    display: block;
    background: #0d1117; color: #e6edf3; margin: 0;
    padding: 1rem 1.1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
    line-height: 1.75; white-space: pre; tab-size: 2;
    max-width: 100%; box-sizing: border-box;
  }

  /* ── Definitions ── */
  .sp-defs { display: flex; flex-direction: column; gap: 0.65rem; margin: 0.75rem 0 1rem; min-width: 0; }
  .sp-def-item {
    border-radius: 10px; border: 1px solid; border-left-width: 3px;
    background: var(--surface); padding: 0.9rem 1rem;
    min-width: 0; box-sizing: border-box;
    overflow: clip;
  }
  .sp-def-top { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.4rem; flex-wrap: wrap; }
  .sp-def-term {
    font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700;
    padding: 0.15rem 0.55rem; border-radius: 6px; word-break: break-all; max-width: 100%;
  }
  .sp-dep-badge {
    font-family: 'JetBrains Mono', monospace; font-size: 0.55rem;
    background: rgba(239,68,68,0.12); color: #ef4444;
    border: 1px solid rgba(239,68,68,0.3); padding: 0.1rem 0.45rem; border-radius: 20px;
  }
  .sp-def-desc { font-size: 0.8rem; color: var(--text2, var(--text)); line-height: 1.6; margin-bottom: 0.35rem; word-break: break-word; min-width: 0; }
  .sp-def-note { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; margin-bottom: 0.5rem; word-break: break-word; }

  /* ── Table ── */
  .sp-table-wrap {
    overflow-x: auto; -webkit-overflow-scrolling: touch;
    margin: 0.75rem 0 1rem; border-radius: 10px; border: 1px solid var(--border);
    max-width: 100%; box-sizing: border-box; min-width: 0;
  }
  .sp-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
  .sp-th { padding: 0.6rem 0.85rem; color: #fff; text-align: left; font-weight: 600; white-space: nowrap; }
  .sp-td { padding: 0.6rem 0.85rem; color: var(--text); border-top: 1px solid var(--border); vertical-align: top; }
  .sp-tr-alt { background: var(--surface2, rgba(255,255,255,0.02)); }

  /* ── Sub-sections ── */
  .sp-sub { margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--border); min-width: 0; overflow: clip; }
  .sp-sub-h { font-size: 0.88rem; font-weight: 700; margin-bottom: 0.5rem; word-break: break-word; }

  /* ── Demo ── */
  .sp-demo-btns { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
  .sp-demo-btn {
    padding: 0.45rem 0.85rem; border-radius: 8px;
    border: 1px solid var(--border); background: var(--surface2);
    color: var(--text); font-size: 0.75rem; cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .sp-demo-btn:hover { background: var(--surface2); }
  .sp-demo-panel {
    border-radius: 12px; border: 1px solid var(--border);
    overflow: clip;
    margin-bottom: 1.5rem; max-width: 100%; box-sizing: border-box;
  }
  .sp-demo-bar {
    padding: 0.45rem 1rem;
    background: var(--surface2, rgba(255,255,255,0.03));
    border-bottom: 1px solid var(--border);
  }
  .sp-demo-bar-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
  .sp-demo-output {
    padding: 1.25rem; min-height: 140px; color: var(--text); font-size: 0.85rem;
    overflow-x: auto; -webkit-overflow-scrolling: touch;
    max-width: 100%; box-sizing: border-box; word-break: break-word;
  }
  .sp-demo-output * {
    max-width: 100%;
    box-sizing: border-box;
  }
  .sp-demo-output [style*="width"],
  .sp-demo-output [style*="min-width"] {
    max-width: 100% !important;
  }

  /* ── Exercises ── */
  .sp-exercises { display: flex; flex-direction: column; gap: 1rem; }
  .sp-ex-card {
    border-radius: 12px; border: 1px solid var(--border); border-left-width: 4px;
    background: var(--surface); padding: 1.1rem 1.25rem;
    min-width: 0; box-sizing: border-box; overflow: clip;
  }
  .sp-ex-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
  .sp-ex-num { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 20px; flex-shrink: 0; }
  .sp-ex-title { font-size: 0.88rem; font-weight: 700; color: var(--text); word-break: break-word; min-width: 0; }
  .sp-ex-desc  { font-size: 0.8rem; color: var(--muted); margin-bottom: 0.75rem; word-break: break-word; }
  .sp-ex-tasks { padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; }
  .sp-ex-task  { font-size: 0.8rem; color: var(--text2, var(--text)); line-height: 1.5; word-break: break-word; }
  .sp-ex-hint  { margin-top: 0.75rem; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid; font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; line-height: 1.6; word-break: break-word; box-sizing: border-box; }

  /* ── Nav footer ── */
  .sp-nav-footer {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
    padding-top: 2rem; margin-top: 2.5rem; border-top: 1px solid var(--border); gap: 1rem;
  }
  .sp-nav-btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.6rem 1.1rem; border-radius: 8px;
    border: 1px solid var(--border); background: var(--surface);
    color: var(--text); text-decoration: none;
    font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    transition: background 0.15s, border-color 0.15s;
    white-space: nowrap; box-sizing: border-box;
  }
  .sp-nav-btn:hover { background: var(--surface2); }
  .sp-nav-btn-primary { border-color: transparent !important; }

  /* ── Mobile overrides — 480px ── */
  @media (max-width: 480px) {
    .sp-code     { font-size: 0.68rem; padding: 0.85rem 0.9rem; }
    .sp-th, .sp-td { padding: 0.45rem 0.55rem; font-size: 0.72rem; }
    .sp-tab      { padding: 0.5rem 0.6rem; font-size: 0.6rem; }
    .sp-acc-body { padding: 0 0.75rem 0.75rem; }
    .sp-ex-card  { padding: 0.9rem 1rem; }
  }

  /* ── Galaxy S8 — 360px breakpoint ── */
  @media (max-width: 360px) {

    .sp-page { padding-left: 0; padding-right: 0; }

    .sp-code { font-size: 0.62rem; padding: 0.75rem 0.8rem; }

    .sp-tab { padding: 0.45rem 0.5rem; font-size: 0.58rem; gap: 0.2rem; }

    .sp-acc-trigger { padding: 0.75rem 0.85rem; gap: 0.4rem; }
    .sp-acc-body    { padding: 0 0.65rem 0.65rem; }

    .sp-obj-grid { grid-template-columns: 1fr; }

    .sp-chip { font-size: 0.55rem; padding: 0.15rem 0.5rem; }

    .sp-ex-card  { padding: 0.75rem 0.85rem; }
    .sp-ex-tasks { padding-left: 1rem; }

    .sp-nav-btn { font-size: 0.58rem; padding: 0.5rem 0.85rem; }

    .sp-th, .sp-td { padding: 0.4rem 0.45rem; font-size: 0.68rem; }

    .sp-demo-output { padding: 0.85rem; }

    .sp-def-term { font-size: 0.68rem; }

    .sp-topic-content { font-size: 0.82rem; line-height: 1.65; }

    .sp-sh { font-size: 0.9rem; }
  }
`;