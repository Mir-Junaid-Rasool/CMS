// app/courses/dev/session4/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   MODULE NAV DATA
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Understand what version control is and why it's essential",
  "Explain GIT's 3-Tree Architecture",
  "Install and configure GIT on your system",
  "Understand GIT's key features and advantages",
  "Perform basic GIT operations: init, add, commit",
  "Navigate the standard GIT workflow",
];

const gitFeatures = [
  ["Distributed",       "Every developer has the full history on their own machine"],
  ["Fast",              "Most operations are local — nearly instantaneous"],
  ["Free & Open Source","No licensing costs, used worldwide"],
  ["Branching & Merging","Create branches in seconds, merge easily"],
  ["Data Integrity",    "Everything is checksummed (SHA-1 hash)"],
  ["Staging Area",      "Control exactly what goes into each commit"],
  ["Small & Efficient", "Lightweight storage engine"],
  ["Industry Standard", "Used by Google, Facebook, Microsoft, Netflix"],
];

const commandRef = [
  ["git init",    "Initialize a new GIT repository",              "git init"],
  ["git status",  "Show the working tree status",                 "git status"],
  ["git add",     "Add files to the staging area",                "git add file.txt  /  git add ."],
  ["git commit",  "Record changes to the repository",             'git commit -m "message"'],
  ["git log",     "Show commit history",                          "git log  /  git log --oneline"],
  ["git diff",    "Show changes between commits / working tree",  "git diff"],
  ["git config",  "Get and set configuration options",            'git config --global user.name "Name"'],
  ["git help",    "Get help on any command",                      "git help commit"],
];

const bestPracticesDo = [
  "Commit early and often",
  "Write clear, descriptive commit messages",
  "Review changes before committing (git diff)",
  "Use git status frequently to stay aware",
  "Keep commits focused on one logical change",
  "Only commit working, tested code",
];

const bestPracticesDont = [
  "Commit large binary files (images, videos, compiled code)",
  "Commit sensitive information (passwords, API keys)",
  'Use vague messages ("update", "fix", "changes")',
  "Commit without testing first",
  "Delete the .git folder",
  "Commit generated files (node_modules, build/)",
];

const quizData = [
  { q: "What command initializes a new GIT repository?",                   a: "git init" },
  { q: "What are the three trees in GIT's architecture?",                  a: "Working Directory, Staging Area (Index), Repository (HEAD)" },
  { q: "What does git add do?",                                            a: "Adds files to the staging area — prepares them for commit" },
  { q: "What is the purpose of git status?",                               a: "Shows the current state of the working directory and staging area" },
  { q: "What makes a good commit message?",                                a: "Clear, descriptive, starts with a verb, explains WHAT and WHY" },
  { q: "What file do you create to ignore files from GIT tracking?",       a: ".gitignore" },
  { q: "What command shows the commit history?",                           a: "git log" },
  { q: "What does git diff show?",                                         a: "Differences between files — exactly what changed" },
  { q: "Where is all the GIT repository data stored?",                     a: "Inside the hidden .git directory in the project root" },
  { q: "Difference between git add . and git add filename?",               a: "git add . stages ALL files; git add filename stages only that specific file" },
];

export default function Session4() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s4-page {
          max-width: 1000px; 
         
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

        /* ── Prev/Next row ── */
        .nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
        .nav-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); transition: all 0.2s; white-space: nowrap; }
        .nav-btn:hover { color: var(--text); border-color: var(--border2); }

        /* ── Hero ── */
        .hero {
          border-radius: 20px;
          background: linear-gradient(135deg, #f05033 0%, #e84118 55%, #c0392b 100%);
          padding: 2.5rem 2rem; margin-bottom: 2rem;
          position: relative; overflow: hidden;
        }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 22px 22px; }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .h-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-mod { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-new { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,215,0,0.2); border: 1px solid rgba(255,215,0,0.4); color: #FFD700; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-dur { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem; }
        .hero h1 { font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem; }
        .hero p { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        /* ── Jump nav ── */
        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jpill { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; padding: 0.3rem 0.8rem; border-radius: 100px; border: 1px solid var(--border); background: var(--surface2); color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
        .jpill:hover { color: var(--text); border-color: var(--border2); }
        .jpill.active { background: linear-gradient(135deg,#f05033,#e84118); color: #fff; border-color: transparent; }

        /* ── Part title ── */
        .pt { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text); margin: 2.5rem 0 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .pt::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .pt-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(135deg,#f05033,#e84118); color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }

        /* ── Objectives ── */
        .obj-card { background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; }
        .obj-card h2 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1.1rem; }
        .obj-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .obj-list li { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: rgba(255,255,255,0.92); line-height: 1.5; }
        .obj-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(255,215,0,0.2); border: 1.5px solid #FFD700; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: #FFD700; flex-shrink: 0; margin-top: 2px; }

        /* ── Body text ── */
        .body-text { font-size: 0.9rem; color: var(--text2); line-height: 1.75; margin-bottom: 1rem; }
        .body-text strong { color: var(--text); }

        /* ── Features list (pros/cons style) ── */
        .feat-box { border-radius: 12px; padding: 1.1rem 1.25rem; margin: 1rem 0; border: 1px solid var(--border); }
        .feat-box.green { background: rgba(39,174,96,0.05); border-color: rgba(39,174,96,0.2); }
        .feat-box.red   { background: rgba(220,53,69,0.05);  border-color: rgba(220,53,69,0.2); }
        .feat-box h4 { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.65rem; font-family: 'JetBrains Mono', monospace; }
        .feat-box.green h4 { color: #27ae60; }
        .feat-box.red   h4 { color: #dc3545; }
        .feat-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }
        .feat-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }

        /* ── Example / tip boxes ── */
        .ex-box { background: var(--surface2); border-left: 3px solid #27ae60; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .ex-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #27ae60; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.6rem; font-weight: 600; }
        .ex-box p { font-size: 0.84rem; color: var(--text2); line-height: 1.65; margin-bottom: 0.45rem; }
        .ex-box p:last-child { margin-bottom: 0; }
        .ex-box ul, .ex-box ol { padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .ex-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; }
        .ex-box li code, .ex-box p code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }
        .ex-box strong { color: var(--text); }

        .tip-box { background: rgba(23,162,184,0.07); border-left: 3px solid #17a2b8; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .tip-box h4 { font-size: 0.82rem; font-weight: 700; color: #17a2b8; margin-bottom: 0.5rem; }
        .tip-box p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .tip-box ul { list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .tip-box li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }
        .tip-box li::before { content: '→'; color: #17a2b8; flex-shrink: 0; font-size: 0.75rem; margin-top: 1px; }
        .tip-box strong { color: var(--text); }
        .tip-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .warn-box { background: rgba(220,53,69,0.05); border-left: 3px solid #dc3545; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .warn-box h4 { font-size: 0.82rem; font-weight: 700; color: #dc3545; margin-bottom: 0.5rem; }
        .warn-box p, .warn-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.6; }
        .warn-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .warn-box li { display: flex; gap: 0.45rem; }
        .warn-box li::before { content: '❌'; flex-shrink: 0; font-size: 0.72rem; }
        .warn-box strong { color: var(--text); }

        /* ── 3-Tree visual ── */
        .tree-wrap { display: flex; flex-direction: column; align-items: center; gap: 0; margin: 1.5rem 0; }
        .tree-node { width: 100%; max-width: 580px; border-radius: 14px; padding: 1.1rem 1.5rem; border: 2px solid; }
        .tree-node.wd  { border-color: #3498db; background: rgba(52,152,219,0.06); }
        .tree-node.sa  { border-color: #f39c12; background: rgba(243,156,18,0.06); }
        .tree-node.rep { border-color: #27ae60; background: rgba(39,174,96,0.06); }
        .tree-node h4 { font-size: 0.9rem; font-weight: 800; margin-bottom: 0.5rem; }
        .tree-node.wd  h4 { color: #3498db; }
        .tree-node.sa  h4 { color: #f39c12; }
        .tree-node.rep h4 { color: #27ae60; }
        .tree-node p { font-size: 0.82rem; color: var(--text2); line-height: 1.55; margin-bottom: 0.2rem; }
        .tree-node .t-status { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; margin-top: 0.4rem; padding: 0.2rem 0.6rem; border-radius: 100px; display: inline-block; font-weight: 600; }
        .tree-node.wd  .t-status { background: rgba(52,152,219,0.12);  color: #3498db; }
        .tree-node.sa  .t-status { background: rgba(243,156,18,0.12);  color: #f39c12; }
        .tree-node.rep .t-status { background: rgba(39,174,96,0.12);   color: #27ae60; }
        .tree-arrow { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--muted); display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0; letter-spacing: 0.06em; }
        .tree-arrow::before, .tree-arrow::after { content: ''; flex: 1; max-width: 80px; height: 1px; background: var(--border); }

        /* ── Workflow steps ── */
        .workflow { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0; position: relative; }
        .workflow::before { content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 2px; background: var(--border); z-index: 0; }
        .wf-step { display: flex; align-items: flex-start; gap: 0.85rem; padding: 0.9rem 1rem; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); position: relative; z-index: 1; transition: border-color 0.2s; }
        .wf-step:hover { border-color: var(--border2); }
        .wf-num { width: 28px; height: 28px; border-radius: 8px; background: #f05033; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; flex-shrink: 0; }
        .wf-content { display: flex; flex-direction: column; gap: 0.2rem; width: 100%; }
        .wf-content strong { font-size: 0.88rem; color: var(--text); }
        .wf-content p { font-size: 0.8rem; color: var(--text2); line-height: 1.5; }

        /* ── Code block ── */
        .cb { background: #0d1117; color: #e6edf3; padding: 1.25rem; border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; line-height: 1.9; overflow-x: auto; margin: 0.75rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .c-cm { color: #8b949e; }
        .c-cmd { color: #79c0ff; font-weight: 600; }
        .c-out { color: #a5d6ff; }
        .c-ok  { color: #56d364; }
        .c-key { color: #ff7b72; }

        /* ── Command ref table ── */
        .cmd-table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; margin: 1.25rem 0; font-size: 0.82rem; }
        .cmd-table thead th { padding: 0.85rem 1rem; text-align: left; font-weight: 700; font-size: 0.76rem; background: linear-gradient(135deg,#f05033,#e84118); color: #fff; }
        .cmd-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); color: var(--text2); vertical-align: top; line-height: 1.5; }
        .cmd-table td:first-child { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--accent); font-weight: 600; white-space: nowrap; background: var(--surface); }
        .cmd-table td code { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }
        .cmd-table tr:last-child td { border-bottom: none; }
        .cmd-table tr:nth-child(even) td:not(:first-child) { background: var(--surface2); }

        /* ── GIT features grid ── */
        .git-feats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin: 1.25rem 0; }
        @media(max-width:560px){ .git-feats{grid-template-columns:1fr;} }
        .gf-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.85rem 1rem; display: flex; gap: 0.6rem; align-items: flex-start; }
        .gf-check { color: #27ae60; font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
        .gf-card strong { font-size: 0.84rem; color: var(--text); display: block; margin-bottom: 0.15rem; }
        .gf-card span { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── .git directory visual ── */
        .git-dir { background: #0d1117; color: #e6edf3; border-radius: 12px; padding: 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; line-height: 1.9; border: 1px solid rgba(255,255,255,0.06); margin: 1rem 0; }
        .gd-dir  { color: #79c0ff; }
        .gd-file { color: #e6edf3; }
        .gd-cm   { color: #8b949e; }

        /* ── Key box ── */
        .key-box { background: rgba(255,193,7,0.07); border: 1px solid rgba(255,193,7,0.22); border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0; }
        .key-box h3 { font-size: 0.9rem; font-weight: 700; color: var(--text); margin-bottom: 0.75rem; }
        .key-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .key-box li { font-size: 0.84rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .key-box li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }

        /* ── Gitignore display ── */
        .gitignore-block { background: #0d1117; border-radius: 12px; padding: 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; line-height: 2; border: 1px solid rgba(255,255,255,0.06); margin: 0.75rem 0; color: #e6edf3; }
        .gi-cm   { color: #8b949e; }
        .gi-path { color: #a5d6ff; }

        /* ── Activity ── */
        .act-box { background: linear-gradient(135deg,#f093fb 0%,#f5576c 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .act-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .act-box h4 { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 1rem 0 0.5rem; }
        .lab-ol { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 1rem 1rem 1rem 2rem; margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .lab-ol li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.55; }
        .lab-ol li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.18); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }
        .lab-ol li strong { color: #fff; }
        .lab-ol li ul { margin-top: 0.3rem; padding-left: 1.2rem; }
        .lab-ol li ul li::before { content: none; }

        /* ── HW ── */
        .hw-box { background: rgba(255,193,7,0.06); border: 1px solid rgba(255,193,7,0.2); border-radius: 14px; padding: 1.5rem; margin: 1.5rem 0; }
        .hw-box h3 { font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; }
        .hw-task { margin-bottom: 0.85rem; }
        .hw-task h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; }
        .hw-task p { font-size: 0.82rem; color: var(--text2); line-height: 1.55; margin-bottom: 0.4rem; }
        .hw-task ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; padding-left: 0.5rem; }
        .hw-task li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.4rem; }
        .hw-task li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }
        .hw-task li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.35rem; border-radius: 4px; color: var(--accent); }

        /* ── Quiz ── */
        .quiz-box { background: linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08)); border: 1px solid rgba(99,102,241,0.2); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .quiz-box h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.25rem; }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .qi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.9rem 1rem; }
        .qi-n { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--accent); letter-spacing: 0.08em; margin-bottom: 0.3rem; }
        .qi-q { font-size: 0.88rem; font-weight: 600; color: var(--text); }
        .qi-a { font-size: 0.82rem; color: var(--text2); font-style: italic; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--border); }
        .qi-a code { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); font-style: normal; }

        /* ── Takeaways ── */
        .tk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 0.65rem; margin: 1rem 0; }
        .tk-card { background: var(--surface); border: 1px solid var(--border); border-top: 3px solid #f05033; border-radius: 12px; padding: 0.9rem 1rem; }
        .tk-card h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; font-family: 'JetBrains Mono', monospace; }
        .tk-card p  { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Flow pill ── */
        .flow-pill { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.5rem; margin: 1.25rem 0; }
        .fp { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; font-weight: 700; color: var(--text); background: var(--surface); border: 1px solid var(--border); padding: 0.45rem 0.9rem; border-radius: 8px; }
        .fp-arrow { color: var(--muted); font-size: 0.9rem; }

        /* ── Next card ── */
        .next-card { background: linear-gradient(135deg,#11998e 0%,#38ef7d 100%); border-radius: 16px; padding: 1.75rem; margin-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .next-text h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.4); margin-bottom: 0.4rem; }
        .next-text h3 { font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .next-text ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .next-text li { font-size: 0.83rem; color: rgba(255,255,255,0.8); display: flex; gap: 0.5rem; }
        .next-text li::before { content: '→'; color: rgba(255,255,255,0.6); flex-shrink: 0; }
        .next-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 700; color: #11998e; background: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.5rem; transition: opacity 0.2s, transform 0.2s; }
        .next-btn:hover { opacity: 0.9; transform: translateX(3px); }

        /* ── Sub header ── */
        .sub-h { font-size: 0.95rem; font-weight: 700; color: var(--text); margin: 1.5rem 0 0.75rem; }

        @media(max-width:640px){
          .s4-page { padding: 2rem 1rem 4rem; }
          .mod-sessions { flex-direction: column; }
          .s-link { border-right: none !important; border-bottom: 1px solid var(--border); }
          .s-link:last-child { border-bottom: none; }
          .tree-node { max-width: 100%; }
        }
      `}</style>

      <div className="s4-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link>
          <span className="sep">/</span>
          <span className="current">Session 4: GIT Fundamentals</span>
        </div>

        {/* ── MODULE NAVIGATION ── */}
    

        {/* Prev / Next */}
        <div className="nav-row">
          <Link href="/courses/dev/session3" className="nav-btn">← Session 3: Tools Ecosystem</Link>
          <Link href="/courses/dev/session5" className="nav-btn">Session 5: GIT & GitHub →</Link>
        </div>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 4 of 6</span>
            <span className="h-mod">Module 2 — DevOps in Practice</span>
            <span className="h-new">🆕 Start of Module 2</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~3.5 hrs
            </span>
          </div>
          <h1>🔀 GIT Fundamentals</h1>
          <p>Version control from scratch — 3-Tree Architecture, installation, configuration, and your first repository.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","Version Control","What is GIT","3-Tree Arch","Installation","First Repo","Commands","Workflow","Best Practices","Activity","Quiz","Homework"].map((l, i) => (
            <a key={i} href={`#s4p${i}`} className={`jpill${i === 0 ? " active" : ""}`}>{l}</a>
          ))}
        </div>

        {/* ── OBJECTIVES ── */}
        <div id="s4p0" className="obj-card">
          <h2>📚 Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o, i) => (
              <li key={i}><span className="obj-check">✓</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* ── VERSION CONTROL ── */}
        <div id="s4p1">
          <div className="pt"><span className="pt-badge">Foundation</span>What is Version Control?</div>
          <p className="body-text">
            <strong>Version Control</strong> (also called Source Control) is a system that records changes to files over time so you can recall specific versions later. It's like having an "Undo" button for your <em>entire project</em>!
          </p>

          <div className="ex-box">
            <div className="ex-label">📝 Real-World Analogy — Google Docs</div>
            <p>Remember working on a Google Doc and seeing all the changes made by different people? You can go back to any previous version? <strong>GIT does exactly this — for code.</strong></p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",margin:"1.25rem 0"}}>
            <div className="feat-box red">
              <h4>❌ Without Version Control</h4>
              <ul>
                <li><span style={{flexShrink:0}}>❌</span><span><strong style={{color:"var(--text)"}}>final_version_FINAL.docx</strong> — file copies everywhere</span></li>
                <li><span>❌</span><span>Lost work when files get corrupted or deleted</span></li>
                <li><span>❌</span><span>No way to know who changed what and when</span></li>
                <li><span>❌</span><span>Emailing code files back and forth</span></li>
                <li><span>❌</span><span>Can&apos;t experiment without fear of breaking things</span></li>
                <li><span>❌</span><span>No backup history at all</span></li>
              </ul>
            </div>
            <div className="feat-box green">
              <h4>✅ With Version Control</h4>
              <ul>
                <li><span>✅</span><span>Track every change — what, when, and by whom</span></li>
                <li><span>✅</span><span>Revert to any previous version (time machine)</span></li>
                <li><span>✅</span><span>Collaborate safely — multiple people simultaneously</span></li>
                <li><span>✅</span><span>Branch to experiment without breaking main code</span></li>
                <li><span>✅</span><span>Distributed backups ensure data safety</span></li>
                <li><span>✅</span><span>Clear audit trail of every change</span></li>
              </ul>
            </div>
          </div>

          <div className="ex-box">
            <div className="ex-label">🎯 Real Scenario — Bug in Production</div>
            <p><strong>Without GIT:</strong> Website crashes after update → don&apos;t know what changed → spend hours debugging → no way to quickly go back.</p>
            <p><strong>With GIT:</strong></p>
            <ol>
              <li>Run <code>git log</code> — see the exact commits made</li>
              <li>Run <code>git revert [commit-id]</code> — undo the bad change</li>
              <li><strong>Website back online in 2 minutes!</strong></li>
            </ol>
          </div>
        </div>

        {/* ── WHAT IS GIT ── */}
        <div id="s4p2">
          <div className="pt"><span className="pt-badge">Core Concept</span>What is GIT?</div>
          <p className="body-text">
            <strong>GIT</strong> is a <strong>distributed version control system</strong> created by Linus Torvalds (creator of Linux) in 2005. It is the most popular version control system in the world.
          </p>

          <div className="git-feats">
            {gitFeatures.map(([title, desc]) => (
              <div key={title} className="gf-card">
                <span className="gf-check">✅</span>
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <h4>💡 GIT vs GitHub — What&apos;s the Difference?</h4>
            <ul>
              <li><strong>GIT</strong> = Version control software that runs on your computer</li>
              <li><strong>GitHub</strong> = Cloud platform for hosting GIT repositories (like Google Drive for code)</li>
            </ul>
            <p style={{marginTop:"0.5rem"}}><strong>Analogy:</strong> GIT is like email software (Outlook), GitHub is like Gmail (the online service)</p>
          </div>
        </div>

        {/* ── 3-TREE ARCHITECTURE ── */}
        <div id="s4p3">
          <div className="pt"><span className="pt-badge">Key Concept</span>GIT&apos;s 3-Tree Architecture</div>
          <p className="body-text">
            GIT uses a <strong>3-Tree Architecture</strong> to manage your code. Understanding this is crucial to mastering GIT!
          </p>

          <div className="tree-wrap">
            <div className="tree-node wd">
              <h4>1️⃣ Working Directory</h4>
              <p><strong style={{color:"var(--text)"}}>What it is:</strong> Your actual project files on your computer</p>
              <p><strong style={{color:"var(--text)"}}>What you do:</strong> Edit, create, delete files here</p>
              <span className="t-status">Untracked / Modified files</span>
            </div>
            <div className="tree-arrow">↓ &nbsp; git add &nbsp; ↓</div>
            <div className="tree-node sa">
              <h4>2️⃣ Staging Area (Index)</h4>
              <p><strong style={{color:"var(--text)"}}>What it is:</strong> Preparation area for the next commit</p>
              <p><strong style={{color:"var(--text)"}}>What you do:</strong> Choose which changes to include in the next commit</p>
              <span className="t-status">Staged files — ready to commit</span>
            </div>
            <div className="tree-arrow">↓ &nbsp; git commit &nbsp; ↓</div>
            <div className="tree-node rep">
              <h4>3️⃣ Repository (HEAD)</h4>
              <p><strong style={{color:"var(--text)"}}>What it is:</strong> Committed snapshots of your project</p>
              <p><strong style={{color:"var(--text)"}}>What you do:</strong> Permanent record of all commits</p>
              <span className="t-status">Committed history</span>
            </div>
          </div>

          <div className="ex-box">
            <div className="ex-label">🎬 Movie Analogy</div>
            <ul>
              <li><strong>Working Directory</strong> = Filming scenes (raw footage)</li>
              <li><strong>Staging Area</strong> = Editing room (selecting which takes to include)</li>
              <li><strong>Repository</strong> = Final movie released to the public (permanent record)</li>
            </ul>
            <p style={{marginTop:"0.6rem"}}>You don&apos;t include every single shot in the final movie — you <strong>stage</strong> the best takes, then <strong>commit</strong> them to the final version!</p>
          </div>

          <div className="sub-h">🔧 Practical: 3-Tree Workflow</div>
          <div className="cb">
<span className="c-cm"># 1. Working Directory — create a file</span>{"\n"}
echo "Hello World" {">"} hello.txt{"\n"}
<span className="c-cm">#    File exists in Working Directory only</span>{"\n\n"}
<span className="c-cmd">git status</span>{"\n"}
<span className="c-out">Untracked files:</span>{"\n"}
<span className="c-out">  hello.txt</span>{"\n\n"}
<span className="c-cm"># 2. Staging Area — add to staging</span>{"\n"}
<span className="c-cmd">git add hello.txt</span>{"\n\n"}
<span className="c-cmd">git status</span>{"\n"}
<span className="c-out">Changes to be committed:</span>{"\n"}
<span className="c-out">  new file: hello.txt</span>{"\n\n"}
<span className="c-cm"># 3. Repository — commit permanently</span>{"\n"}
<span className="c-cmd">git commit -m "Add hello.txt"</span>{"\n"}
<span className="c-ok">[main a1b2c3d] Add hello.txt</span>{"\n"}
<span className="c-ok"> 1 file changed, 1 insertion(+)</span>{"\n"}
<span className="c-cm"># File now permanently in Repository!</span>
          </div>
        </div>

        {/* ── INSTALLATION ── */}
        <div id="s4p4">
          <div className="pt"><span className="pt-badge">Setup</span>GIT Installation</div>

          <div className="sub-h">🪟 Windows</div>
          <div className="ex-box" style={{borderLeftColor:"#17a2b8"}}>
            <ol>
              <li>Visit <strong>https://git-scm.com/download/win</strong> → download 64-bit installer</li>
              <li>Run the <code>.exe</code> → accept default settings → check <strong>&quot;Git Bash Here&quot;</strong></li>
              <li>Verify in Command Prompt or Git Bash:</li>
            </ol>
          </div>
          <div className="cb">
git --version{"\n"}
<span className="c-ok"># git version 2.x.x</span>
          </div>

          <div className="sub-h">🐧 Linux (Ubuntu)</div>
          <div className="cb">
sudo apt update{"\n"}
sudo apt install git -y{"\n"}
git --version
          </div>

          <div className="sub-h">🍎 macOS</div>
          <div className="cb">
brew install git{"\n"}
<span className="c-cm"># Or download from: https://git-scm.com/download/mac</span>{"\n"}
git --version
          </div>

          <div className="sub-h">⚙️ Initial Configuration (Required!)</div>
          <p className="body-text">After installing GIT you <strong>must</strong> configure your identity — this is included in every commit.</p>
          <div className="cb">
<span className="c-cm"># Set your name</span>{"\n"}
<span className="c-cmd">git config --global user.name "Your Name"</span>{"\n\n"}
<span className="c-cm"># Set your email</span>{"\n"}
<span className="c-cmd">git config --global user.email "you@example.com"</span>{"\n\n"}
<span className="c-cm"># Set default editor to VS Code (optional)</span>{"\n"}
<span className="c-cmd">git config --global core.editor "code"</span>{"\n\n"}
<span className="c-cm"># Verify your configuration</span>{"\n"}
<span className="c-cmd">git config --list</span>{"\n"}
<span className="c-out">user.name=Your Name</span>{"\n"}
<span className="c-out">user.email=you@example.com</span>{"\n"}
<span className="c-out">core.editor=code</span>
          </div>

          <div className="tip-box">
            <h4>💡 Configuration Levels</h4>
            <ul>
              <li><code>--global</code> — Settings for all repositories for the current user</li>
              <li><code>--system</code> — Settings for all users on the computer</li>
              <li><code>--local</code>  — Settings for current repository only (default)</li>
            </ul>
          </div>
        </div>

        {/* ── FIRST REPO ── */}
        <div id="s4p5">
          <div className="pt"><span className="pt-badge">Hands-on</span>Your First Repository</div>

          <div className="workflow">
            {[
              { n:"1", title:"Create project directory",       code:`mkdir my-first-repo\ncd my-first-repo` },
              { n:"2", title:"Initialise GIT repository",      code:`git init\n# Initialized empty Git repository in /path/to/my-first-repo/.git/` },
              { n:"3", title:"Create files",                   code:`echo "# My First Repo" > README.md\necho "console.log('Hello GIT!');" > app.js` },
              { n:"4", title:"Check status",                   code:`git status\n# On branch main\n# Untracked files: README.md  app.js` },
              { n:"5", title:"Stage files",                    code:`git add .       # add everything\ngit status\n# Changes to be committed:\n#   new file: README.md\n#   new file: app.js` },
              { n:"6", title:'Commit changes',                 code:`git commit -m "Initial commit: Add README and app.js"\n# [main a1b2c3d] Initial commit...\n#  2 files changed, 2 insertions(+)` },
              { n:"7", title:"View commit history",            code:`git log\n# commit a1b2c3d...\n# Author: Your Name <you@example.com>\n# Date:   ...\n#     Initial commit: Add README and app.js` },
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-content">
                  <strong>{s.title}</strong>
                  <div className="cb" style={{marginTop:"0.45rem",fontSize:"0.71rem"}}>
                    {s.code.split("\n").map((line, i) => (
                      <span key={i} style={{display:"block"}}>
                        {line.startsWith("#") ? <span className="c-cm">{line}</span> : line}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tip-box" style={{marginTop:"1.25rem"}}>
            <h4>💡 Writing Good Commit Messages</h4>
            <ul>
              <li><strong>Bad:</strong> <code>git commit -m &quot;update&quot;</code></li>
              <li><strong>Good:</strong> <code>git commit -m &quot;Fix login bug for mobile users&quot;</code></li>
            </ul>
            <p style={{marginTop:"0.6rem"}}><strong>Rules:</strong> Start with a verb (Add, Fix, Update, Remove) · Be specific · Explain WHAT and WHY, not HOW</p>
            <ul style={{marginTop:"0.4rem"}}>
              <li>✅ &quot;Add user authentication feature&quot;</li>
              <li>✅ &quot;Fix navbar alignment on mobile devices&quot;</li>
              <li>✅ &quot;Update dependencies to latest versions&quot;</li>
              <li style={{listStyle:"none",paddingLeft:0}}>
                <span style={{color:"#dc3545"}}>❌</span>&nbsp;"fixed stuff"&nbsp;&nbsp;
                <span style={{color:"#dc3545"}}>❌</span>&nbsp;"changes"
              </li>
            </ul>
          </div>
        </div>

        {/* ── COMMANDS ── */}
        <div id="s4p6">
          <div className="pt"><span className="pt-badge">Reference</span>Essential Commands</div>
          <table className="cmd-table">
            <thead><tr><th>Command</th><th>Description</th><th>Example</th></tr></thead>
            <tbody>
              {commandRef.map(([cmd, desc, ex]) => (
                <tr key={cmd}><td>{cmd}</td><td>{desc}</td><td><code>{ex}</code></td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Understanding git status Output</div>
          <div className="cb">
<span className="c-cmd">git status</span>{"\n\n"}
<span className="c-out">On branch main</span>                    <span className="c-cm">  # Current branch</span>{"\n"}
<span className="c-out">Your branch is up to date</span>        <span className="c-cm">  # Synced with remote</span>{"\n\n"}
<span className="c-out">Changes not staged for commit:</span>   <span className="c-cm">  # Modified but not yet added</span>{"\n"}
<span className="c-out">  modified:   index.html</span>{"\n\n"}
<span className="c-out">Untracked files:</span>                 <span className="c-cm">  # New files GIT doesn&apos;t know about</span>{"\n"}
<span className="c-out">  new-file.js</span>{"\n\n"}
<span className="c-out">no changes added to commit</span>       <span className="c-cm">  # Nothing staged yet</span>
          </div>
        </div>

        {/* ── WORKFLOW ── */}
        <div id="s4p7">
          <div className="pt"><span className="pt-badge">Practice</span>Daily Development Workflow</div>
          <div className="workflow">
            {[
              { n:"1", title:"Start your day — check status",   body:'git status' },
              { n:"2", title:"Make changes to your code",        body:"Edit files in your favourite code editor" },
              { n:"3", title:"Review what changed",              body:"git status   # see what files changed\ngit diff       # see exact line-by-line changes" },
              { n:"4", title:"Stage changes",                    body:"git add .    # stage all changes" },
              { n:"5", title:"Commit with meaningful message",   body:'git commit -m "Add user login feature"' },
              { n:"6", title:"Repeat throughout the day",        body:"Commit after every logical change. Every feature = one commit." },
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-content">
                  <strong>{s.title}</strong>
                  {s.body.includes("\n") || s.body.startsWith("git") ? (
                    <div className="cb" style={{marginTop:"0.45rem",fontSize:"0.71rem"}}>
                      {s.body.split("\n").map((line, i) => (
                        <span key={i} style={{display:"block"}}>
                          {line.startsWith("git") ? <span className="c-cmd">{line}</span> : <span className="c-cm">{line}</span>}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>{s.body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <h4>💡 How Often Should You Commit?</h4>
            <ul>
              <li>Commit after completing each feature or bug fix</li>
              <li>Commit before taking a break or ending the day</li>
              <li>Commit only when code is in a working state</li>
            </ul>
            <p style={{marginTop:"0.5rem"}}><strong>Rule of thumb:</strong> If you can describe the change in one sentence, it&apos;s ready to commit!</p>
          </div>
        </div>

        {/* ── BEST PRACTICES ── */}
        <div id="s4p8">
          <div className="pt"><span className="pt-badge">Best Practices</span>GIT Do&apos;s &amp; Don&apos;ts</div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.5rem"}}>
            <div className="feat-box green">
              <h4>✅ DO</h4>
              <ul>{bestPracticesDo.map(p=><li key={p}><span>✅</span><span>{p}</span></li>)}</ul>
            </div>
            <div className="feat-box red">
              <h4>❌ DON'T</h4>
              <ul>{bestPracticesDont.map(p=><li key={p}><span>❌</span><span>{p}</span></li>)}</ul>
            </div>
          </div>

          <div className="sub-h">Using .gitignore</div>
          <p className="body-text">Create a <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.8rem",background:"var(--surface2)",border:"1px solid var(--border)",padding:"0.1rem 0.4rem",borderRadius:"4px",color:"var(--accent)"}}>
            .gitignore</code> file to tell GIT which files to never track:
          </p>
          <div className="gitignore-block">
<span className="gi-cm"># Dependencies</span>{"\n"}
<span className="gi-path">node_modules/</span>{"\n\n"}
<span className="gi-cm"># Log files</span>{"\n"}
<span className="gi-path">*.log</span>{"\n\n"}
<span className="gi-cm"># Environment variables (secrets!)</span>{"\n"}
<span className="gi-path">.env</span>{"\n\n"}
<span className="gi-cm"># Build output</span>{"\n"}
<span className="gi-path">dist/</span>{"\n"}
<span className="gi-path">build/</span>{"\n\n"}
<span className="gi-cm"># OS files</span>{"\n"}
<span className="gi-path">.DS_Store</span>{"\n"}
<span className="gi-path">Thumbs.db</span>{"\n\n"}
<span className="gi-cm"># IDE files</span>{"\n"}
<span className="gi-path">.vscode/</span>{"\n"}
<span className="gi-path">.idea/</span>
          </div>

          <div className="sub-h">Understanding the .git Directory</div>
          <div className="git-dir">
<span className="c-cm"># What git init creates:</span>{"\n"}
<span className="gd-dir">.git/</span>{"\n"}
├── <span className="gd-file">HEAD</span>           <span className="gd-cm"># Points to current branch</span>{"\n"}
├── <span className="gd-file">config</span>         <span className="gd-cm"># Repository configuration</span>{"\n"}
├── <span className="gd-dir">hooks/</span>         <span className="gd-cm"># Scripts for automation</span>{"\n"}
├── <span className="gd-dir">objects/</span>       <span className="gd-cm"># All commits, trees, blobs</span>{"\n"}
├── <span className="gd-dir">refs/</span>          <span className="gd-cm"># References to commits (branches, tags)</span>{"\n"}
└── <span className="gd-file">index</span>          <span className="gd-cm"># Staging area information</span>
          </div>
          <div className="warn-box">
            <h4>⚠️ Never Delete the .git Folder!</h4>
            <ul>
              <li>You lose ALL version history permanently</li>
              <li>You lose all branches and tags</li>
              <li>You can no longer undo any changes</li>
              <li>The folder becomes a plain folder — not a GIT repo</li>
            </ul>
            <p style={{marginTop:"0.5rem",fontSize:"0.83rem",color:"var(--text2)"}}><strong style={{color:"var(--text)"}}>It's like burning all your backup drives!</strong></p>
          </div>
        </div>

        {/* ── PRACTICAL EXAMPLES ── */}
        <div id="s4p9" style={{display:"none"}} />

        {/* ── ACTIVITY ── */}
        <div id="s4p9">
          <div className="act-box">
            <h3>🎯 Hands-On Lab Activity</h3>
            <h4>Lab: Create Your First GIT Project — &quot;my-portfolio&quot;</h4>
            <ol className="lab-ol">
              <li><strong>Setup:</strong> Create folder &quot;my-portfolio&quot; → <code>git init</code></li>
              <li><strong>Create files:</strong> <code>index.html</code> (basic HTML), <code>style.css</code>, <code>about.html</code></li>
              <li><strong>Commit 1:</strong> <code>git add index.html</code> → <code>git commit -m &quot;Add homepage&quot;</code></li>
              <li><strong>Commit 2:</strong> <code>git add style.css</code> → <code>git commit -m &quot;Add CSS styling&quot;</code></li>
              <li><strong>Commit 3:</strong> <code>git add about.html</code> → <code>git commit -m &quot;Add about page&quot;</code></li>
              <li><strong>View history:</strong> Run <code>git log</code> — take a screenshot showing 3 commits</li>
              <li><strong>Make a change:</strong> Edit index.html → run <code>git diff</code> to see the change → commit it</li>
              <li><strong>Create .gitignore:</strong> Add common patterns → commit it</li>
            </ol>
            <h4>Challenge: Understand git status</h4>
            <ol className="lab-ol">
              <li>Create <code>contact.html</code> (don&apos;t add it)</li>
              <li>Modify <code>index.html</code> (don&apos;t add it)</li>
              <li>Run <code>git status</code> — what do you see?</li>
              <li>Now add only <code>contact.html</code></li>
              <li>Run <code>git status</code> again — explain the difference</li>
            </ol>
          </div>
        </div>

        {/* ── QUIZ ── */}
        <div id="s4p10" className="quiz-box">
          <h3>🎓 Quick Quiz — Knowledge Check</h3>
          <ul className="quiz-list">
            {quizData.map((item, i) => (
              <li key={i} className="qi">
                <div className="qi-n">Q{i+1}</div>
                <div className="qi-q">{item.q}</div>
                <div className="qi-a">💡 {item.a.includes("git ") ? <code>{item.a}</code> : item.a}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── HOMEWORK ── */}
        <div id="s4p11" className="hw-box">
          <h3>📝 Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Personal Project Setup:</h4>
            <p>Create a GIT repo for any personal project (calculator, to-do list, etc.) — make at least 5 meaningful commits. Screenshot: <code>git status</code>, <code>git log</code>, <code>git diff</code>.</p>
          </div>
          <div className="hw-task">
            <h4>2. Understanding Questions (answer in your own words):</h4>
            <ul>
              <li>What is the difference between Working Directory, Staging Area, and Repository?</li>
              <li>Why do we need the Staging Area? Why not commit directly?</li>
              <li>What happens when you run <code>git init</code>?</li>
              <li>How is GIT different from GitHub?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Command Practice — document these scenarios:</h4>
            <ul>
              <li>Create a file, add to staging, then <em>remove</em> it from staging without deleting</li>
              <li>Create 3 files, stage only 2, commit them</li>
              <li>View commit history in one-line format (<code>git log --oneline</code>)</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. .gitignore Practice:</h4>
            <ul>
              <li>Write a <code>.gitignore</code> for a Node.js project with at least 5 patterns</li>
              <li>Explain why each pattern should be ignored</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>5. Prepare for Session 5:</h4>
            <ul>
              <li>Create a GitHub account if you don&apos;t have one</li>
              <li>Read about <code>git clone</code>, <code>git push</code>, and <code>git pull</code></li>
              <li>Watch &quot;Git and GitHub for Beginners&quot; on YouTube</li>
            </ul>
          </div>
        </div>

        {/* ── TAKEAWAYS ── */}
        <div className="pt"><span className="pt-badge">Summary</span>Key Takeaways</div>
        <div className="tk-grid">
          {[
            ["Version Control", "Tracks all changes to files over time"],
            ["GIT", "Distributed version control — industry standard"],
            ["Working Directory", "Where you edit files"],
            ["Staging Area", "Where you prepare what to commit"],
            ["Repository (HEAD)", "Permanent history of all commits"],
            ["git init", "Creates a new GIT repository"],
            ["git add", "Stages changes for commit"],
            ["git commit", "Saves staged changes permanently"],
            ["git status", "Shows current working state"],
            [".gitignore", "Excludes files from being tracked"],
          ].map(([title, desc]) => (
            <div key={title} className="tk-card">
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        <div className="flow-pill">
          <span className="fp">Edit Files</span>
          <span className="fp-arrow">→</span>
          <span className="fp">git add</span>
          <span className="fp-arrow">→</span>
          <span className="fp">git commit</span>
          <span className="fp-arrow">→</span>
          <span className="fp">Repeat</span>
        </div>

        {/* ── NEXT SESSION ── */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next · Module 2 · Session 5</h4>
            <h3>GIT Operations & GitHub</h3>
            <ul>
              <li>GIT Clone, Push, Pull operations</li>
              <li>Creating & managing GitHub repositories</li>
              <li>Connecting local repo to GitHub</li>
              <li>GitHub project management & collaboration</li>
              <li>Working with README.md and documentation</li>
            </ul>
          </div>
          <Link href="/courses/dev/session5" className="next-btn">Session 5 →</Link>
        </div>

      </div>
    </>
  );
}