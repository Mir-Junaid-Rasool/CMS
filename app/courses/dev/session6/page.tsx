// app/courses/dev/session6/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   MODULE NAV DATA
───────────────────────────────────────────── */
const modules = [
  {
    num: 1, title: "DevOps Foundations", color: "#2a5298",
    sessions: [
      { num: 1, title: "DevOps Fundamentals",    href: "/courses/dev/session1" },
      { num: 2, title: "SDLC Models & DevOps",   href: "/courses/dev/session2" },
      { num: 3, title: "DevOps Tools Ecosystem", href: "/courses/dev/session3" },
    ],
  },
  {
    num: 2, title: "DevOps in Practice", color: "#6f42c1",
    sessions: [
      { num: 4, title: "GIT Fundamentals",        href: "/courses/dev/session4" },
      { num: 5, title: "GIT Operations & GitHub", href: "/courses/dev/session5" },
      { num: 6, title: "Advanced GIT",            href: "/courses/dev/session6" },
    ],
  },
];

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Master Git Merge and Rebase strategies",
  "Understand when to use Merge vs Rebase",
  "Learn Git Stash for temporary code storage",
  "Practice Git Reset to undo changes",
  "Use Git Checkout to switch branches and restore files",
  "Handle merge conflicts effectively",
];

const mergeTypes = [
  ["Fast-Forward",   "Simply moves the branch pointer forward",   "When no diverging changes exist"],
  ["Three-Way Merge","Creates a new merge commit",                "When both branches have changes"],
  ["Squash Merge",   "Combines all commits into one clean commit","When you want clean, readable history"],
];

const mergeVsRebase = [
  ["History",   "Preserves complete history",      "Creates linear history"],
  ["Commits",   "Creates a merge commit",           "Replays commits on top"],
  ["Use Case",  "Integrating feature branches",     "Keeping feature branch updated"],
  ["Safety",    "Safe for shared branches",         "Never rebase public branches"],
  ["Conflicts", "Resolve once",                     "May need to resolve multiple times"],
];

const resetTypes = [
  ["--soft",            "Unchanged",  "Unchanged",  "Reset — changes stay staged"],
  ["--mixed (default)", "Unchanged",  "Reset",      "Reset — changes stay in working dir"],
  ["--hard",            "Reset",      "Reset",      "Reset — all changes deleted permanently"],
];

const fetchPullTable = [
  ["git fetch",          "Download only",          "Want to review before merging"],
  ["git pull",           "Download + merge",        "Quick sync with remote"],
  ["git pull --rebase",  "Download + rebase",       "Want a linear history"],
];

const quizData = [
  { q: "What command creates a merge commit?",
    a: "git merge branch-name" },
  { q: "What is the golden rule of rebase?",
    a: "Never rebase commits that have been pushed to public/shared repositories" },
  { q: "How do you temporarily save uncommitted changes?",
    a: "git stash (or git stash save \"message\")" },
  { q: "What is the most dangerous git reset option?",
    a: "git reset --hard — permanently deletes all uncommitted changes" },
  { q: "What command discards changes in a specific file?",
    a: "git checkout -- filename  or  git restore filename" },
  { q: "What is the difference between fetch and pull?",
    a: "Fetch downloads changes without merging; Pull downloads and merges automatically" },
  { q: "How do you view all stashed changes?",
    a: "git stash list" },
  { q: "What happens in a detached HEAD state?",
    a: "You are viewing an old commit directly, not on any branch" },
];

const takeaways = [
  ["git merge",    "Combines branches, preserves full history"],
  ["git rebase",   "Creates linear history — never use on public branches"],
  ["git stash",    "Temporarily saves work without committing"],
  ["git reset",    "Undoes commits: --soft, --mixed, or --hard"],
  ["git checkout", "Switches branches and restores files"],
  ["git fetch",    "Downloads remote changes without merging"],
  ["Merge Conflict","Edit file, remove markers, then git add + commit"],
  ["Detached HEAD","Viewing old commit — checkout a branch to return"],
];

export default function Session6() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s6-page {
          max-width: 1000px; margin: 0 auto;
          padding: 3rem 1.5rem 6rem;
        }

        /* ── Breadcrumb ── */
        .breadcrumb { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); margin-bottom: 2rem; }
        .breadcrumb a { color: var(--text2); text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: var(--accent); }
        .breadcrumb .sep { color: var(--border2); }
        .breadcrumb .current { color: var(--text); }

        /* ── Module nav ── */
        .module-nav { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2.5rem; }
        .module-block { border-radius: 14px; overflow: hidden; border: 1px solid var(--border); background: var(--surface); }
        .module-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); }
        .mod-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }
        .mod-title { font-size: 0.82rem; font-weight: 700; color: var(--text); }
        .mod-sessions { display: flex; flex-wrap: wrap; }
        .s-link { flex: 1; min-width: 120px; display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; transition: background 0.2s, color 0.2s; letter-spacing: 0.02em; }
        .s-link:hover { background: var(--surface2); color: var(--text); }
        .s-link.active { background: var(--surface2); color: var(--text); font-weight: 600; }
        .s-link .sn { width: 20px; height: 20px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.62rem; font-weight: 700; color: #fff; flex-shrink: 0; }

        /* ── Prev/Next ── */
        .nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
        .nav-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); transition: all 0.2s; white-space: nowrap; }
        .nav-btn:hover { color: var(--text); border-color: var(--border2); }

        /* ── Hero ── */
        .hero {
          border-radius: 20px;
          background: linear-gradient(135deg, #2d1b69 0%, #6f42c1 60%, #a855f7 100%);
          padding: 2.5rem 2rem; margin-bottom: 2rem;
          position: relative; overflow: hidden;
        }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px; }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .h-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-mod { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-fin { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,215,0,0.2); border: 1px solid rgba(255,215,0,0.4); color: #FFD700; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-dur { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem; }
        .hero h1 { font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem; }
        .hero p { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        /* ── Jump nav ── */
        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jpill { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; padding: 0.3rem 0.8rem; border-radius: 100px; border: 1px solid var(--border); background: var(--surface2); color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
        .jpill:hover { color: var(--text); border-color: var(--border2); }
        .jpill.active { background: linear-gradient(135deg,#6f42c1,#a855f7); color: #fff; border-color: transparent; }

        /* ── Section title ── */
        .pt { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text); margin: 2.5rem 0 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .pt::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .pt-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(135deg,#6f42c1,#a855f7); color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }

        /* ── Objectives ── */
        .obj-card { background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; }
        .obj-card h2 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1.1rem; }
        .obj-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .obj-list li { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: rgba(255,255,255,0.92); line-height: 1.5; }
        .obj-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(255,215,0,0.2); border: 1.5px solid #FFD700; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: #FFD700; flex-shrink: 0; margin-top: 2px; }

        /* ── Body text ── */
        .body-text { font-size: 0.9rem; color: var(--text2); line-height: 1.75; margin-bottom: 1rem; }
        .body-text strong { color: var(--text); }
        .body-text code { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        /* ── Sub header ── */
        .sub-h { font-size: 0.95rem; font-weight: 700; color: var(--text); margin: 1.5rem 0 0.75rem; }

        /* ── Tip / example / warn boxes ── */
        .tip-box { background: rgba(111,66,193,0.07); border-left: 3px solid #6f42c1; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .tip-box h4 { font-size: 0.82rem; font-weight: 700; color: #6f42c1; margin-bottom: 0.5rem; }
        .tip-box p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .tip-box ul { list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .tip-box li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }
        .tip-box li::before { content: '→'; color: #6f42c1; flex-shrink: 0; font-size: 0.75rem; margin-top: 1px; }
        .tip-box strong { color: var(--text); }
        .tip-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .ex-box { background: var(--surface2); border-left: 3px solid #27ae60; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .ex-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #27ae60; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.6rem; font-weight: 600; }
        .ex-box p { font-size: 0.84rem; color: var(--text2); line-height: 1.65; margin-bottom: 0.45rem; }
        .ex-box strong { color: var(--text); }
        .ex-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .warn-box { background: rgba(220,53,69,0.05); border-left: 3px solid #dc3545; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .warn-box h4 { font-size: 0.82rem; font-weight: 700; color: #dc3545; margin-bottom: 0.5rem; }
        .warn-box p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.35rem; }
        .warn-box p:last-child { margin-bottom: 0; }
        .warn-box strong { color: var(--text); }
        .warn-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        /* ── Code block ── */
        .cb { background: #0d1117; color: #e6edf3; padding: 1.25rem; border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; line-height: 1.9; overflow-x: auto; margin: 0.75rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .c-cm  { color: #8b949e; }
        .c-cmd { color: #79c0ff; font-weight: 600; }
        .c-out { color: #a5d6ff; }
        .c-ok  { color: #56d364; }
        .c-cf  { color: #ff7b72; }

        /* ── Tables ── */
        .data-table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; margin: 1.25rem 0; font-size: 0.82rem; }
        .data-table thead th { padding: 0.85rem 1rem; text-align: left; font-weight: 700; font-size: 0.76rem; background: linear-gradient(135deg,#6f42c1,#a855f7); color: #fff; }
        .data-table td { padding: 0.72rem 1rem; border-bottom: 1px solid var(--border); color: var(--text2); vertical-align: top; line-height: 1.5; }
        .data-table td:first-child { font-weight: 600; color: var(--text); background: var(--surface); font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; }
        .data-table tr:last-child td { border-bottom: none; }
        .data-table tr:nth-child(even) td:not(:first-child) { background: var(--surface2); }

        /* ── Reset type cards ── */
        .reset-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.65rem; margin: 1.25rem 0; }
        @media(max-width:600px){ .reset-grid { grid-template-columns: 1fr; } }
        .reset-card { border-radius: 12px; padding: 1rem; border: 2px solid; text-align: center; }
        .reset-card.soft  { border-color: #27ae60; background: rgba(39,174,96,0.06); }
        .reset-card.mixed { border-color: #f39c12; background: rgba(243,156,18,0.06); }
        .reset-card.hard  { border-color: #dc3545; background: rgba(220,53,69,0.06); }
        .reset-card h4 { font-size: 0.82rem; font-weight: 800; margin-bottom: 0.5rem; font-family: 'JetBrains Mono', monospace; }
        .reset-card.soft  h4 { color: #27ae60; }
        .reset-card.mixed h4 { color: #f39c12; }
        .reset-card.hard  h4 { color: #dc3545; }
        .reset-card p { font-size: 0.75rem; color: var(--text2); line-height: 1.5; }
        .reset-badge { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; padding: 0.15rem 0.5rem; border-radius: 100px; margin-bottom: 0.5rem; font-weight: 600; }
        .reset-card.soft  .reset-badge { background: rgba(39,174,96,0.15);  color: #27ae60; }
        .reset-card.mixed .reset-badge { background: rgba(243,156,18,0.15); color: #f39c12; }
        .reset-card.hard  .reset-badge { background: rgba(220,53,69,0.15);  color: #dc3545; }

        /* ── Stash visual ── */
        .stash-flow { display: flex; flex-direction: column; align-items: center; gap: 0; margin: 1.25rem auto; max-width: 420px; }
        .stash-box { width: 100%; border-radius: 12px; padding: 0.85rem 1.25rem; border: 2px solid; text-align: center; }
        .stash-box.work  { border-color: #0366d6; background: rgba(3,102,214,0.06); }
        .stash-box.stash { border-color: #6f42c1; background: rgba(111,66,193,0.06); }
        .stash-box h4 { font-size: 0.85rem; font-weight: 700; margin-bottom: 0.2rem; }
        .stash-box.work  h4 { color: #0366d6; }
        .stash-box.stash h4 { color: #6f42c1; }
        .stash-box p { font-size: 0.75rem; color: var(--text2); }
        .stash-arrow { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); padding: 0.25rem 0; display: flex; align-items: center; gap: 0.5rem; }
        .stash-arrow::before, .stash-arrow::after { content: ''; flex: 1; max-width: 50px; height: 1px; background: var(--border); }

        /* ── Activity ── */
        .act-box { background: linear-gradient(135deg,#2d1b69 0%,#6f42c1 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .act-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .act-box h4 { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 1.1rem 0 0.5rem; }
        .lab-ol { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; padding: 1rem 1rem 1rem 2rem; margin-bottom: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .lab-ol li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.55; }
        .lab-ol li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }
        .lab-ol li strong { color: #fff; }

        /* ── Quiz ── */
        .quiz-box { background: linear-gradient(135deg,rgba(111,66,193,0.08),rgba(168,85,247,0.08)); border: 1px solid rgba(111,66,193,0.2); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .quiz-box h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.25rem; }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .qi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.9rem 1rem; }
        .qi-n { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #6f42c1; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
        .qi-q { font-size: 0.88rem; font-weight: 600; color: var(--text); }
        .qi-a { font-size: 0.82rem; color: var(--text2); font-style: italic; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--border); }
        .qi-a code { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); font-style: normal; }

        /* ── Homework ── */
        .hw-box { background: rgba(255,193,7,0.06); border: 1px solid rgba(255,193,7,0.2); border-radius: 14px; padding: 1.5rem; margin: 1.5rem 0; }
        .hw-box h3 { font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; }
        .hw-task { margin-bottom: 0.85rem; }
        .hw-task h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; }
        .hw-task ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; padding-left: 0.5rem; }
        .hw-task li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.4rem; }
        .hw-task li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }
        .hw-task li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.35rem; border-radius: 4px; color: var(--accent); }

        /* ── Takeaways ── */
        .tk-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 0.65rem; margin: 1rem 0; }
        .tk-card { background: var(--surface); border: 1px solid var(--border); border-top: 3px solid #6f42c1; border-radius: 12px; padding: 0.9rem 1rem; }
        .tk-card h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; font-family: 'JetBrains Mono', monospace; }
        .tk-card p  { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Flow pill ── */
        .flow-pill { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.5rem; margin: 1.25rem 0; }
        .fp { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text); background: var(--surface); border: 1px solid var(--border); padding: 0.45rem 0.9rem; border-radius: 8px; }
        .fp-arrow { color: var(--muted); font-size: 0.9rem; }

        /* ── Completion card ── */
        .complete-card { background: linear-gradient(135deg,#11998e 0%,#38ef7d 100%); border-radius: 16px; padding: 2rem; margin-top: 2rem; text-align: center; }
        .complete-card h3 { font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
        .complete-card p { font-size: 0.9rem; color: rgba(255,255,255,0.85); line-height: 1.6; margin-bottom: 1.25rem; max-width: 540px; margin-left: auto; margin-right: auto; }
        .complete-links { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .c-btn { font-size: 0.85rem; font-weight: 700; padding: 0.7rem 1.4rem; border-radius: 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: opacity 0.2s, transform 0.2s; }
        .c-btn:hover { opacity: 0.9; transform: translateY(-2px); }
        .c-btn.white { background: #fff; color: #11998e; }
        .c-btn.outline { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #fff; }

        @media(max-width:640px){
          .s6-page { padding: 2rem 1rem 4rem; }
          .mod-sessions { flex-direction: column; }
          .s-link { border-right: none !important; border-bottom: 1px solid var(--border); }
          .s-link:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="s6-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link>
          <span className="sep">/</span>
          <span className="current">Session 6: Advanced GIT</span>
        </div>

        {/* ── MODULE NAVIGATION ── */}
        <div className="module-nav">
          {modules.map((mod) => (
            <div key={mod.num} className="module-block">
              <div className="module-header">
                <span className="mod-badge" style={{ background: mod.color }}>Module {mod.num}</span>
                <span className="mod-title">{mod.title}</span>
              </div>
              <div className="mod-sessions">
                {mod.sessions.map((s, si) => (
                  <Link
                    key={s.num} href={s.href}
                    className={`s-link${s.num === 6 ? " active" : ""}`}
                    style={{ borderRight: si < mod.sessions.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <span className="sn" style={{ background: mod.color }}>S{s.num}</span>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="nav-row">
          <Link href="/courses/dev/session5" className="nav-btn">&larr; Session 5: GIT &amp; GitHub</Link>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem", color:"var(--muted)", padding:"0.4rem 0.75rem", border:"1px solid var(--border)", borderRadius:"8px", background:"var(--surface)" }}>
            Module 2 Complete &#127881;
          </span>
        </div>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 6 of 6</span>
            <span className="h-mod">Module 2 &mdash; DevOps in Practice</span>
            <span className="h-fin">&#127881; Module Final</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~3.5 hrs
            </span>
          </div>
          <h1>&#9881;&#65039; Advanced GIT Operations</h1>
          <p>Merge, Rebase, Stash, Reset, Checkout &mdash; master the powerful commands that make GIT a professional tool.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","Merge","Rebase","Stash","Reset","Checkout","Fetch & Pull","Lab","Quiz","Homework"].map((l, i) => (
            <a key={i} href={`#s6p${i}`} className={`jpill${i === 0 ? " active" : ""}`}>{l}</a>
          ))}
        </div>

        {/* ── OBJECTIVES ── */}
        <div id="s6p0" className="obj-card">
          <h2>&#128218; Session Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o, i) => (
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* ── GIT MERGE ── */}
        <div id="s6p1">
          <div className="pt"><span className="pt-badge">1 of 6</span>GIT Merge</div>
          <p className="body-text">
            <strong>Git Merge</strong> combines changes from different branches. It creates a new commit that brings together the histories of both branches.
          </p>

          <div className="sub-h">Basic Merge Syntax</div>
          <div className="cb">
<span className="c-cm"># Basic merge syntax</span>{"\\n"}
<span className="c-cmd">git merge</span> {"<"}branch-name{">"}{"\\n\\n"}
<span className="c-cm"># Merge feature branch into main</span>{"\\n"}
<span className="c-cmd">git checkout main</span>{"\\n"}
<span className="c-cmd">git merge feature-branch</span>
          </div>

          <div className="ex-box">
            <div className="ex-label">Complete Merge Workflow</div>
            <div className="cb" style={{marginTop:"0.5rem"}}>
<span className="c-cm"># 1. Create and switch to new branch</span>{"\\n"}
<span className="c-cmd">git checkout -b feature-login</span>{"\\n\\n"}
<span className="c-cm"># 2. Make changes and commit</span>{"\\n"}
echo &quot;Login feature&quot; {">"} login.html{"\\n"}
<span className="c-cmd">git add login.html</span>{"\\n"}
<span className="c-cmd">git commit -m &quot;Add login feature&quot;</span>{"\\n\\n"}
<span className="c-cm"># 3. Switch back to main</span>{"\\n"}
<span className="c-cmd">git checkout main</span>{"\\n\\n"}
<span className="c-cm"># 4. Merge feature into main</span>{"\\n"}
<span className="c-cmd">git merge feature-login</span>{"\\n"}
<span className="c-out">Updating a1b2c3d..e5f6g7h</span>{"\\n"}
<span className="c-out">Fast-forward</span>{"\\n"}
<span className="c-ok"> login.html | 1 +</span>{"\\n"}
<span className="c-ok"> 1 file changed, 1 insertion(+)</span>
            </div>
          </div>

          <div className="sub-h">Types of Merges</div>
          <table className="data-table">
            <thead><tr><th>Type</th><th>Description</th><th>When It Happens</th></tr></thead>
            <tbody>
              {mergeTypes.map(([t, d, w]) => (
                <tr key={t}><td>{t}</td><td>{d}</td><td>{w}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Handling Merge Conflicts</div>
          <div className="warn-box">
            <h4>&#9888;&#65039; What is a Merge Conflict?</h4>
            <p>A conflict occurs when Git cannot automatically merge changes because the <strong>same lines were modified in both branches</strong>.</p>
          </div>

          <div className="ex-box" style={{marginTop:"0.75rem"}}>
            <div className="ex-label">Resolving a Merge Conflict — Step by Step</div>
            <div className="cb" style={{marginTop:"0.5rem"}}>
<span className="c-cm"># Step 1: Attempt merge</span>{"\\n"}
<span className="c-cmd">git merge feature-branch</span>{"\\n"}
<span className="c-out">CONFLICT (content): Merge conflict in index.html</span>{"\\n"}
<span className="c-out">Automatic merge failed; fix conflicts and then commit.</span>{"\\n\\n"}
<span className="c-cm"># Step 2: See conflicted files</span>{"\\n"}
<span className="c-cmd">git status</span>{"\\n"}
<span className="c-out">Unmerged paths:</span>{"\\n"}
<span className="c-out">  both modified:   index.html</span>{"\\n\\n"}
<span className="c-cm"># Step 3: Open file — Git marks the conflict:</span>{"\\n"}
<span className="c-cf">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span>{"\\n"}
<span className="c-out">&lt;h1&gt;Welcome to Main Branch&lt;/h1&gt;</span>{"\\n"}
<span className="c-cf">=======</span>{"\\n"}
<span className="c-out">&lt;h1&gt;Welcome to Feature Branch&lt;/h1&gt;</span>{"\\n"}
<span className="c-cf">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-branch</span>{"\\n\\n"}
<span className="c-cm"># Step 4: Edit — keep what you want, remove all markers</span>{"\\n"}
<span className="c-ok">&lt;h1&gt;Welcome to Our Website&lt;/h1&gt;</span>{"\\n\\n"}
<span className="c-cm"># Step 5: Mark resolved and commit</span>{"\\n"}
<span className="c-cmd">git add index.html</span>{"\\n"}
<span className="c-cmd">git commit -m &quot;Resolve merge conflict in index.html&quot;</span>
            </div>
          </div>
        </div>

        {/* ── GIT REBASE ── */}
        <div id="s6p2">
          <div className="pt"><span className="pt-badge">2 of 6</span>GIT Rebase</div>
          <p className="body-text">
            <strong>Git Rebase</strong> rewrites commit history by moving commits to a new base. It produces a clean, linear history instead of merge commits.
          </p>

          <div className="cb">
<span className="c-cm"># Basic rebase syntax</span>{"\\n"}
<span className="c-cmd">git rebase</span> {"<"}base-branch{">"}{"\\n\\n"}
<span className="c-cm"># Rebase feature branch onto main</span>{"\\n"}
<span className="c-cmd">git checkout feature-branch</span>{"\\n"}
<span className="c-cmd">git rebase main</span>
          </div>

          <div className="sub-h">Merge vs Rebase</div>
          <table className="data-table">
            <thead><tr><th>Aspect</th><th>Merge</th><th>Rebase</th></tr></thead>
            <tbody>
              {mergeVsRebase.map(([a, m, r]) => (
                <tr key={a}><td>{a}</td><td>{m}</td><td>{r}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="warn-box">
            <h4>&#9888;&#65039; Golden Rule of Rebase</h4>
            <p><strong>Never rebase commits that have been pushed to a public or shared repository!</strong></p>
            <p>Only rebase local commits that have not yet been shared with others.</p>
          </div>

          <div className="sub-h">Interactive Rebase</div>
          <div className="tip-box">
            <h4>&#128161; What is Interactive Rebase?</h4>
            <ul>
              <li>Clean up messy commit history before merging</li>
              <li>Combine multiple small commits into one (squash)</li>
              <li>Rewrite commit messages (reword)</li>
              <li>Remove unwanted commits (drop)</li>
            </ul>
          </div>
          <div className="cb">
<span className="c-cm"># Interactive rebase — last 3 commits</span>{"\\n"}
<span className="c-cmd">git rebase -i HEAD~3</span>{"\\n\\n"}
<span className="c-cm"># Editor opens showing your commits:</span>{"\\n"}
pick a1b2c3d Add login form{"\\n"}
pick e5f6g7h Fix validation{"\\n"}
pick i9j0k1l Update styles{"\\n\\n"}
<span className="c-cm"># Available commands:</span>{"\\n"}
<span className="c-cm"># pick (p)   = keep the commit as-is</span>{"\\n"}
<span className="c-cm"># reword (r) = keep commit, edit its message</span>{"\\n"}
<span className="c-cm"># squash (s) = combine with previous commit</span>{"\\n"}
<span className="c-cm"># drop  (d)  = remove the commit entirely</span>{"\\n\\n"}
<span className="c-cm"># Example: squash last two commits into first</span>{"\\n"}
pick a1b2c3d Add login form{"\\n"}
squash e5f6g7h Fix validation{"\\n"}
squash i9j0k1l Update styles
          </div>
        </div>

        {/* ── GIT STASH ── */}
        <div id="s6p3">
          <div className="pt"><span className="pt-badge">3 of 6</span>GIT Stash</div>
          <p className="body-text">
            <strong>Git Stash</strong> temporarily saves your uncommitted changes, letting you switch context without committing incomplete work.
          </p>

          <div className="tip-box">
            <h4>&#128161; When to Use Stash?</h4>
            <ul>
              <li>Need to switch branches but work is not ready to commit</li>
              <li>Want to pull latest changes without committing first</li>
              <li>Emergency bug fix needed on another branch</li>
              <li>Experiment with code without losing current work</li>
            </ul>
          </div>

          <div className="stash-flow">
            <div className="stash-box work">
              <h4>&#128196; Working Directory</h4>
              <p>Uncommitted changes here</p>
            </div>
            <div className="stash-arrow">&#8595;&nbsp; git stash &nbsp;&#8595;</div>
            <div className="stash-box stash">
              <h4>&#128230; Stash Stack</h4>
              <p>Changes safely stored</p>
            </div>
            <div className="stash-arrow">&#8595;&nbsp; git stash pop &nbsp;&#8595;</div>
            <div className="stash-box work">
              <h4>&#128196; Working Directory</h4>
              <p>Changes restored</p>
            </div>
          </div>

          <div className="sub-h">Stash Commands</div>
          <div className="cb">
<span className="c-cm"># Save changes to stash</span>{"\\n"}
<span className="c-cmd">git stash</span>{"\\n"}
<span className="c-out">Saved working directory and index state WIP on main</span>{"\\n\\n"}
<span className="c-cm"># Stash with a descriptive message</span>{"\\n"}
<span className="c-cmd">git stash save &quot;Work in progress on login&quot;</span>{"\\n\\n"}
<span className="c-cm"># List all stashes</span>{"\\n"}
<span className="c-cmd">git stash list</span>{"\\n"}
<span className="c-out">stash@{"{0}"}: WIP on main: a1b2c3d Add login</span>{"\\n"}
<span className="c-out">stash@{"{1}"}: WIP on main: e5f6g7h Fix bug</span>{"\\n\\n"}
<span className="c-cm"># Apply most recent stash (keep in list)</span>{"\\n"}
<span className="c-cmd">git stash apply</span>{"\\n\\n"}
<span className="c-cm"># Apply specific stash</span>{"\\n"}
<span className="c-cmd">git stash apply stash@{"{1}"}</span>{"\\n\\n"}
<span className="c-cm"># Apply and remove from stash list</span>{"\\n"}
<span className="c-cmd">git stash pop</span>{"\\n\\n"}
<span className="c-cm"># Delete a specific stash</span>{"\\n"}
<span className="c-cmd">git stash drop stash@{"{0}"}</span>{"\\n\\n"}
<span className="c-cm"># Clear all stashes</span>{"\\n"}
<span className="c-cmd">git stash clear</span>
          </div>

          <div className="ex-box" style={{marginTop:"1rem"}}>
            <div className="ex-label">Practical Stash Workflow</div>
            <div className="cb" style={{marginTop:"0.5rem"}}>
<span className="c-cm"># Working on feature branch</span>{"\\n"}
<span className="c-cmd">git checkout feature-payment</span>{"\\n"}
<span className="c-cm"># ... making changes ...</span>{"\\n\\n"}
<span className="c-cm"># Urgent bug reported! Stash current work</span>{"\\n"}
<span className="c-cmd">git stash save &quot;Payment integration incomplete&quot;</span>{"\\n\\n"}
<span className="c-cm"># Fix the bug on main</span>{"\\n"}
<span className="c-cmd">git checkout main</span>{"\\n"}
<span className="c-cm"># ... fix bug, commit ...</span>{"\\n\\n"}
<span className="c-cm"># Return to feature and restore work</span>{"\\n"}
<span className="c-cmd">git checkout feature-payment</span>{"\\n"}
<span className="c-cmd">git stash pop</span>{"\\n"}
<span className="c-out">On branch feature-payment</span>{"\\n"}
<span className="c-out">Changes not staged for commit:</span>{"\\n"}
<span className="c-out">  modified:   payment.js</span>{"\\n"}
<span className="c-ok">Dropped refs/stash@{"{0}"}</span>{"\\n"}
<span className="c-cm"># Continue working on payment feature!</span>
            </div>
          </div>
        </div>

        {/* ── GIT RESET ── */}
        <div id="s6p4">
          <div className="pt"><span className="pt-badge">4 of 6</span>GIT Reset</div>
          <p className="body-text">
            <strong>Git Reset</strong> moves the current branch pointer to a different commit, effectively undoing commits. There are three modes with very different effects.
          </p>

          <div className="reset-grid">
            <div className="reset-card soft">
              <span className="reset-badge">--soft</span>
              <h4>Soft Reset</h4>
              <p>Commits undone. Changes kept <strong>staged</strong>. Safest option.</p>
            </div>
            <div className="reset-card mixed">
              <span className="reset-badge">--mixed</span>
              <h4>Mixed Reset</h4>
              <p>Commits undone. Changes kept <strong>unstaged</strong>. Default mode.</p>
            </div>
            <div className="reset-card hard">
              <span className="reset-badge">--hard</span>
              <h4>Hard Reset</h4>
              <p>Commits undone. Changes <strong>permanently deleted</strong>. Dangerous!</p>
            </div>
          </div>

          <table className="data-table" style={{marginTop:"0.5rem"}}>
            <thead><tr><th>Type</th><th>Working Directory</th><th>Staging Area</th><th>Result</th></tr></thead>
            <tbody>
              {resetTypes.map(([t, w, s, r]) => (
                <tr key={t}><td>{t}</td><td>{w}</td><td>{s}</td><td>{r}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Reset Commands</div>
          <div className="cb">
<span className="c-cm"># Soft reset — undo commit, keep changes staged</span>{"\\n"}
<span className="c-cmd">git reset --soft HEAD~1</span>{"\\n\\n"}
<span className="c-cm"># Mixed reset — undo commit, keep changes unstaged (default)</span>{"\\n"}
<span className="c-cmd">git reset HEAD~1</span>{"\\n"}
<span className="c-cmd">git reset --mixed HEAD~1</span>{"\\n\\n"}
<span className="c-cm"># Hard reset — discard all changes PERMANENTLY</span>{"\\n"}
<span className="c-cmd">git reset --hard HEAD~1</span>{"\\n\\n"}
<span className="c-cm"># Reset to a specific commit</span>{"\\n"}
<span className="c-cmd">git reset --hard a1b2c3d</span>{"\\n\\n"}
<span className="c-cm"># Unstage a file only (safe mixed reset)</span>{"\\n"}
<span className="c-cmd">git reset HEAD file.txt</span>
          </div>

          <div className="warn-box">
            <h4>&#9888;&#65039; Reset is Destructive</h4>
            <p><code>git reset --hard</code> permanently deletes all uncommitted changes. Use with extreme caution.</p>
            <p>Never reset commits that have already been pushed to a shared repository.</p>
          </div>

          <div className="sub-h">Common Reset Scenarios</div>
          <div className="cb">
<span className="c-cm"># Scenario 1: Undo last commit but keep the changes</span>{"\\n"}
<span className="c-cmd">git reset --soft HEAD~1</span>{"\\n"}
<span className="c-cm"># Changes still staged — can re-commit with better message</span>{"\\n\\n"}
<span className="c-cm"># Scenario 2: Unstage files you accidentally staged</span>{"\\n"}
<span className="c-cmd">git add .</span>{"\\n"}
<span className="c-cmd">git reset</span>{"\\n"}
<span className="c-cm"># Files unstaged, changes preserved in working directory</span>{"\\n\\n"}
<span className="c-cm"># Scenario 3: Discard ALL local changes (nuclear option)</span>{"\\n"}
<span className="c-cmd">git reset --hard HEAD</span>{"\\n"}
<span className="c-cm"># All uncommitted changes are GONE</span>{"\\n\\n"}
<span className="c-cm"># Scenario 4: Go back 3 commits</span>{"\\n"}
<span className="c-cmd">git reset --hard HEAD~3</span>{"\\n"}
<span className="c-cm"># Last 3 commits removed, all their changes deleted</span>
          </div>
        </div>

        {/* ── GIT CHECKOUT ── */}
        <div id="s6p5">
          <div className="pt"><span className="pt-badge">5 of 6</span>GIT Checkout</div>
          <p className="body-text">
            <strong>Git Checkout</strong> is a versatile command used to switch branches, create new branches, restore files, and inspect old commits.
          </p>

          <div className="tip-box">
            <h4>&#128161; Checkout Can:</h4>
            <ul>
              <li>Switch between existing branches</li>
              <li>Create and switch to a new branch in one command</li>
              <li>Restore files from specific commits</li>
              <li>Discard local changes in a file</li>
              <li>Enter detached HEAD state to explore old commits</li>
            </ul>
          </div>

          <div className="sub-h">Common Checkout Commands</div>
          <div className="cb">
<span className="c-cm"># Switch to an existing branch</span>{"\\n"}
<span className="c-cmd">git checkout branch-name</span>{"\\n\\n"}
<span className="c-cm"># Create and switch to new branch</span>{"\\n"}
<span className="c-cmd">git checkout -b new-branch</span>{"\\n\\n"}
<span className="c-cm"># Discard all changes in a file</span>{"\\n"}
<span className="c-cmd">git checkout -- file.txt</span>{"\\n\\n"}
<span className="c-cm"># Restore file from a specific commit</span>{"\\n"}
<span className="c-cmd">git checkout a1b2c3d -- file.txt</span>{"\\n\\n"}
<span className="c-cm"># Enter detached HEAD (explore old commit)</span>{"\\n"}
<span className="c-cmd">git checkout a1b2c3d</span>{"\\n\\n"}
<span className="c-cm"># Return to branch from detached HEAD</span>{"\\n"}
<span className="c-cmd">git checkout main</span>{"\\n\\n"}
<span className="c-cm"># Checkout a remote branch locally</span>{"\\n"}
<span className="c-cmd">git checkout -b local-branch origin/remote-branch</span>
          </div>

          <div className="tip-box" style={{marginTop:"1.25rem"}}>
            <h4>&#128161; Git Switch &amp; Restore &mdash; Modern Alternatives (Git 2.23+)</h4>
            <ul>
              <li><strong>git switch</strong> replaces checkout for branch operations</li>
              <li><strong>git restore</strong> replaces checkout for file operations</li>
            </ul>
            <div className="cb" style={{marginTop:"0.6rem"}}>
<span className="c-cmd">git switch branch-name</span>{"\\n"}
<span className="c-cmd">git switch -c new-branch</span>{"\\n\\n"}
<span className="c-cmd">git restore file.txt</span>{"\\n"}
<span className="c-cmd">git restore --source=HEAD~2 file.txt</span>
            </div>
          </div>

          <div className="ex-box" style={{marginTop:"1rem"}}>
            <div className="ex-label">Checkout Scenarios</div>
            <div className="cb" style={{marginTop:"0.5rem"}}>
<span className="c-cm"># Scenario 1: Accidentally modified a file — discard changes</span>{"\\n"}
<span className="c-cmd">git checkout -- config.js</span>{"\\n"}
<span className="c-out">Updated 1 path from the index</span>{"\\n\\n"}
<span className="c-cm"># Scenario 2: Need a file from an old commit</span>{"\\n"}
<span className="c-cmd">git checkout abc123 -- old-feature.js</span>{"\\n\\n"}
<span className="c-cm"># Scenario 3: Explore how project looked 5 commits ago</span>{"\\n"}
<span className="c-cmd">git checkout HEAD~5</span>{"\\n"}
<span className="c-out">Note: switching to &apos;HEAD~5&apos;.</span>{"\\n"}
<span className="c-out">You are in &apos;detached HEAD&apos; state...</span>{"\\n"}
<span className="c-cm"># Explore freely, then return:</span>{"\\n"}
<span className="c-cmd">git checkout main</span>
            </div>
          </div>
        </div>

        {/* ── FETCH & PULL REVISITED ── */}
        <div id="s6p6">
          <div className="pt"><span className="pt-badge">6 of 6</span>Fetch &amp; Pull Revisited</div>
          <p className="body-text">
            A quick refresher on <strong>git fetch</strong> and <strong>git pull</strong> with their advanced options now that you understand merge and rebase.
          </p>

          <div className="sub-h">Git Fetch</div>
          <div className="cb">
<span className="c-cm"># Fetch all remote branches</span>{"\\n"}
<span className="c-cmd">git fetch origin</span>{"\\n\\n"}
<span className="c-cm"># Fetch a specific branch only</span>{"\\n"}
<span className="c-cmd">git fetch origin main</span>{"\\n\\n"}
<span className="c-cm"># View fetched changes before merging</span>{"\\n"}
<span className="c-cmd">git log origin/main</span>{"\\n\\n"}
<span className="c-cm"># Manually merge fetched changes</span>{"\\n"}
<span className="c-cmd">git merge origin/main</span>
          </div>

          <div className="sub-h">Git Pull (Fetch + Merge)</div>
          <div className="cb">
<span className="c-cm"># Standard pull (fetch + merge)</span>{"\\n"}
<span className="c-cmd">git pull origin main</span>{"\\n\\n"}
<span className="c-cm"># Pull with rebase instead of merge (cleaner history)</span>{"\\n"}
<span className="c-cmd">git pull --rebase origin main</span>
          </div>

          <table className="data-table">
            <thead><tr><th>Command</th><th>What It Does</th><th>When to Use</th></tr></thead>
            <tbody>
              {fetchPullTable.map(([c, w, u]) => (
                <tr key={c}><td>{c}</td><td>{w}</td><td>{u}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── LAB ACTIVITIES ── */}
        <div id="s6p7">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 &mdash; Practice Merge</h4>
            <ol className="lab-ol">
              <li>Create a repository and make an initial commit</li>
              <li>Create branch <code>feature-a</code>, add a file, commit</li>
              <li>Switch to main, create branch <code>feature-b</code>, add a different file, commit</li>
              <li>Merge <code>feature-a</code> into main</li>
              <li>Merge <code>feature-b</code> into main</li>
              <li>Run <code>git log --graph --oneline</code> to see the merge commits</li>
            </ol>

            <h4>Lab 2 &mdash; Resolve a Merge Conflict</h4>
            <ol className="lab-ol">
              <li>Create <code>index.html</code> with text <code>Main version</code> on main branch</li>
              <li>Create a feature branch, modify the same line to <code>Feature version</code></li>
              <li>Attempt to merge &mdash; a conflict will occur</li>
              <li>Open the file, edit out the conflict markers, keep the text you want</li>
              <li>Run <code>git add index.html</code> then <code>git commit</code> to complete the merge</li>
            </ol>

            <h4>Lab 3 &mdash; Use Git Stash</h4>
            <ol className="lab-ol">
              <li>Make changes to a file (do not commit)</li>
              <li>Run <code>git stash</code> to save them</li>
              <li>Run <code>git status</code> &mdash; confirm working directory is clean</li>
              <li>Create a new branch, do some work and commit it</li>
              <li>Return to the original branch and run <code>git stash pop</code> to restore your work</li>
            </ol>

            <h4>Lab 4 &mdash; Practice Reset</h4>
            <ol className="lab-ol">
              <li>Make 3 commits in a test repository</li>
              <li>Run <code>git reset --soft HEAD~1</code> to undo the last commit</li>
              <li>Re-commit with a better message</li>
              <li>Try <code>git reset --mixed HEAD~1</code> and observe the difference</li>
              <li>Try <code>git reset --hard HEAD~1</code> and note that changes are gone permanently</li>
            </ol>

            <h4>Lab 5 &mdash; Checkout Practice</h4>
            <ol className="lab-ol">
              <li>Modify a file without staging it</li>
              <li>Discard changes: <code>git checkout -- filename</code></li>
              <li>Create and switch to a new branch in one command</li>
              <li>Checkout an old commit to enter detached HEAD state</li>
              <li>Return to main with <code>git checkout main</code></li>
            </ol>
          </div>
        </div>

        {/* ── QUIZ ── */}
        <div id="s6p8" className="quiz-box">
          <h3>&#127891; Quick Quiz &mdash; Knowledge Check</h3>
          <ul className="quiz-list">
            {quizData.map((item, i) => (
              <li key={i} className="qi">
                <div className="qi-n">Q{i + 1}</div>
                <div className="qi-q">{item.q}</div>
                <div className="qi-a">&#128161; {item.a}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── HOMEWORK ── */}
        <div id="s6p9" className="hw-box">
          <h3>&#128221; Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Merge vs Rebase Practice:</h4>
            <ul>
              <li>Create two scenarios demonstrating merge and rebase</li>
              <li>Document the difference in <code>git log --graph</code> output</li>
              <li>Write an explanation of when you would use each</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Stash Workflow:</h4>
            <ul>
              <li>Create a real scenario using <code>git stash</code></li>
              <li>Stash multiple changes with descriptive messages</li>
              <li>Practice <code>git stash list</code>, <code>apply</code>, <code>pop</code>, <code>drop</code></li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Understanding Questions (answer in your own words):</h4>
            <ul>
              <li>What is the difference between merge and rebase?</li>
              <li>When should you never use rebase?</li>
              <li>Explain the three types of <code>git reset</code></li>
              <li>What is the difference between <code>git checkout</code> and <code>git switch</code>?</li>
              <li>How do you resolve a merge conflict step by step?</li>
            </ul>
          </div>
        </div>

        {/* ── TAKEAWAYS ── */}
        <div className="pt"><span className="pt-badge">Summary</span>Key Takeaways</div>
        <div className="tk-grid">
          {takeaways.map(([title, desc]) => (
            <div key={title} className="tk-card">
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        <div className="flow-pill">
          <span className="fp">merge / rebase</span>
          <span className="fp-arrow">&#183;</span>
          <span className="fp">stash</span>
          <span className="fp-arrow">&#183;</span>
          <span className="fp">reset</span>
          <span className="fp-arrow">&#183;</span>
          <span className="fp">checkout</span>
          <span className="fp-arrow">&#183;</span>
          <span className="fp">fetch / pull</span>
        </div>

        {/* ── MODULE COMPLETE ── */}
        <div className="complete-card">
          <h3>&#127881; Module 2 Complete!</h3>
          <p>You have finished all six sessions of the DevOps course. You now understand version control from the ground up &mdash; from GIT fundamentals through advanced operations and GitHub collaboration.</p>
          <div className="complete-links">
            <Link href="/courses/dev/session4" className="c-btn white">&#8592; Review Session 4</Link>
            <Link href="/courses/dev/session5" className="c-btn white">&#8592; Review Session 5</Link>
            <Link href="/" className="c-btn outline">Back to Home &#8594;</Link>
          </div>
        </div>

      </div>
    </>
  );
}