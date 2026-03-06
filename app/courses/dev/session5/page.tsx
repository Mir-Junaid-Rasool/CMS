// app/courses/dev/session5/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   MODULE NAV DATA
───────────────────────────────────────────── */

 

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Understand GIT Clone and its purpose",
  "Master Git Commit, Push, and Pull operations",
  "Learn to create and manage GitHub repositories",
  "Understand GitHub Projects and project management",
  "Connect local repositories to remote GitHub repositories",
  "Collaborate using GitHub features",
];

const cloneVsZip = [
  ["Version History",    "✅ Complete history included",  "❌ No history"],
  ["GIT Features",       "✅ Full GIT functionality",     "❌ Not a GIT repository"],
  ["Updates",            "✅ Easy to pull updates",       "❌ Must re-download"],
  ["Push Changes",       "✅ Can push back to GitHub",    "❌ Cannot push"],
  ["Remote Connection",  "✅ Automatically connected",    "❌ No connection"],
];

const fetchVsPull = [
  ["Downloads Changes", "✅ Yes",                   "✅ Yes"],
  ["Merges Changes",    "❌ No",                    "✅ Yes (automatic)"],
  ["Safety",            "✅ Safer — review first",  "⚠️ Can cause conflicts"],
  ["Use Case",          "Review before merging",    "Quick sync"],
];

const commitParts = [
  ["Unique ID (SHA-1 Hash)", "40-character identifier for every commit"],
  ["Author Information",     "Name and email of the committer"],
  ["Timestamp",              "When the commit was created"],
  ["Commit Message",         "Human-readable description of changes"],
  ["Changes",                "Exactly which files and lines were modified"],
  ["Parent Commit",          "Link to the previous commit in history"],
];

const commitExamples = [
  ["updated file",  "Add user authentication feature"],
  ["fixed bug",     "Fix login error on mobile devices"],
  ["changes",       "Update README with installation steps"],
  ["lol",           "Remove deprecated API endpoints"],
  ["asdf",          "Refactor database connection logic"],
];

const githubFeatures = [
  ["Remote Repository Hosting", "Store your code in the cloud"],
  ["Collaboration Tools",       "Work with teams worldwide"],
  ["Pull Requests",             "Code review and merge workflow"],
  ["Issues",                    "Track bugs and feature requests"],
  ["GitHub Actions",            "CI/CD automation pipelines"],
  ["GitHub Pages",              "Host static websites for free"],
  ["Wikis",                     "Documentation for your projects"],
  ["Social Features",           "Star, fork, and follow projects"],
];

const repoSettings = [
  ["Repository Name",  "Unique identifier",         "Use lowercase with hyphens: my-project"],
  ["Description",      "Brief project summary",     "Clear, concise, informative"],
  ["Public/Private",   "Visibility setting",        "Public for open-source, Private for personal"],
  ["README.md",        "Project documentation",     "Always include for clarity"],
  [".gitignore",       "Files to ignore",           "Choose template for your language"],
  ["License",          "Usage permissions",         "MIT for open-source projects"],
];

const authMethods = [
  ["HTTPS",       "Username + Personal Access Token", "Easy to set up, works everywhere",   "Need to enter credentials (unless cached)"],
  ["SSH",         "SSH key pair",                     "No password needed, more secure",    "Initial setup required"],
  ["GitHub CLI",  "gh command-line tool",             "Modern, integrated workflow",        "Need to install gh tool"],
];

const projectColumns = [
  ["📋 To Do",       "Tasks not yet started",          "Backlog items"],
  ["🚧 In Progress", "Currently being worked on",      "Active development"],
  ["👀 In Review",   "Code review / testing phase",    "Awaiting approval"],
  ["✅ Done",        "Completed tasks",                "Finished and merged"],
];

const issueLabels = [
  ["🐛 bug",              "Red",        "Something isn’t working"],
  ["✨ enhancement",      "Blue",       "New feature or request"],
  ["📝 documentation",   "Light blue", "Improvements to docs"],
  ["❓ question",         "Purple",     "Further information needed"],
  ["⚠️ duplicate",       "Gray",       "Already reported issue"],
  ["🚀 good first issue", "Green",      "Good for newcomers"],
];

const quizData = [
  { q: "What does git clone do?",
    a: "Creates a copy of a remote repository on your local machine" },
  { q: "What’s the difference between git fetch and git pull?",
    a: "git fetch downloads changes but doesn’t merge; git pull downloads and merges automatically" },
  { q: "What command pushes your code to GitHub?",
    a: "git push origin main (or just git push after setting upstream)" },
  { q: "What does git remote -v show?",
    a: "Shows the remote repository URLs for fetch and push" },
  { q: "What should you do before pushing code to GitHub?",
    a: "Commit your changes and pull latest updates from remote" },
  { q: "What is the purpose of GitHub Projects?",
    a: "To organise and track project tasks visually using boards" },
  { q: "What are GitHub Issues used for?",
    a: "To track bugs, enhancements, tasks, and questions" },
  { q: "Name three things a good README.md should include.",
    a: "Description, installation instructions, usage, technologies, contact info" },
  { q: "What does git push -u origin main do?",
    a: "Pushes to main branch and sets upstream tracking for future pushes" },
  { q: "Why is it important to pull before pushing?",
    a: "To avoid conflicts and ensure you have the latest code before adding your changes" },
];

const takeaways = [
  ["git clone",       "Copies a remote repository to your local machine"],
  ["git push",        "Uploads local commits to remote repository"],
  ["git pull",        "Downloads and merges remote changes locally"],
  ["git fetch",       "Downloads remote changes without merging"],
  ["GitHub",          "Cloud platform for hosting Git repositories"],
  ["Remote / Origin", "Default name for your remote repository"],
  ["GitHub Projects", "Visual task management using boards"],
  ["Issues",          "Track bugs, features, and questions"],
];

export default function Session5() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s5-page {
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

        /* ── Prev/Next ── */
        .nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
        .nav-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); transition: all 0.2s; white-space: nowrap; }
        .nav-btn:hover { color: var(--text); border-color: var(--border2); }

        /* ── Hero ── */
        .hero {
          border-radius: 20px;
          background: linear-gradient(135deg, #24292e 0%, #0366d6 60%, #044289 100%);
          padding: 2.5rem 2rem; margin-bottom: 2rem;
          position: relative; overflow: hidden;
        }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px; }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .h-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-mod { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-dur { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem; }
        .hero h1 { font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem; }
        .hero p { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        /* ── Jump nav ── */
        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jpill { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; padding: 0.3rem 0.8rem; border-radius: 100px; border: 1px solid var(--border); background: var(--surface2); color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
        .jpill:hover { color: var(--text); border-color: var(--border2); }
        .jpill.active { background: linear-gradient(135deg,#0366d6,#044289); color: #fff; border-color: transparent; }

        /* ── Section title ── */
        .pt { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text); margin: 2.5rem 0 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .pt::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .pt-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(135deg,#0366d6,#044289); color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }

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

        /* ── Tip / info / warn boxes ── */
        .tip-box { background: rgba(3,102,214,0.07); border-left: 3px solid #0366d6; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .tip-box h4 { font-size: 0.82rem; font-weight: 700; color: #0366d6; margin-bottom: 0.5rem; }
        .tip-box p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .tip-box ul { list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .tip-box li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }
        .tip-box li::before { content: →; color: #0366d6; flex-shrink: 0; font-size: 0.75rem; margin-top: 1px; }
        .tip-box strong { color: var(--text); }
        .tip-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .ex-box { background: var(--surface2); border-left: 3px solid #27ae60; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .ex-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #27ae60; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.6rem; font-weight: 600; }
        .ex-box p { font-size: 0.84rem; color: var(--text2); line-height: 1.65; margin-bottom: 0.45rem; }
        .ex-box p:last-child { margin-bottom: 0; }
        .ex-box ul, .ex-box ol { padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .ex-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; }
        .ex-box li code, .ex-box p code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }
        .ex-box strong { color: var(--text); }

        .warn-box { background: rgba(220,53,69,0.05); border-left: 3px solid #dc3545; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .warn-box h4 { font-size: 0.82rem; font-weight: 700; color: #dc3545; margin-bottom: 0.5rem; }
        .warn-box p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .warn-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .warn-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }
        .warn-box li::before { content: ⚠; flex-shrink: 0; font-size: 0.72rem; color: #dc3545; }
        .warn-box strong { color: var(--text); }
        .warn-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        /* ── Code block ── */
        .cb { background: #0d1117; color: #e6edf3; padding: 1.25rem; border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; line-height: 1.9; overflow-x: auto; margin: 0.75rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .c-cm  { color: #8b949e; }
        .c-cmd { color: #79c0ff; font-weight: 600; }
        .c-out { color: #a5d6ff; }
        .c-ok  { color: #56d364; }

        /* ── Tables ── */
        .data-table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; margin: 1.25rem 0; font-size: 0.82rem; }
        .data-table thead th { padding: 0.85rem 1rem; text-align: left; font-weight: 700; font-size: 0.76rem; background: linear-gradient(135deg,#0366d6,#044289); color: #fff; }
        .data-table td { padding: 0.72rem 1rem; border-bottom: 1px solid var(--border); color: var(--text2); vertical-align: top; line-height: 1.5; }
        .data-table td:first-child { font-weight: 600; color: var(--text); background: var(--surface); }
        .data-table tr:last-child td { border-bottom: none; }
        .data-table tr:nth-child(even) td:not(:first-child) { background: var(--surface2); }

        /* ── Workflow push/pull visual ── */
        .flow-visual { display: flex; flex-direction: column; align-items: center; gap: 0; margin: 1.25rem auto; max-width: 460px; }
        .flow-box { width: 100%; border-radius: 12px; padding: 1rem 1.25rem; border: 2px solid; text-align: center; }
        .flow-box.local  { border-color: #0366d6; background: rgba(3,102,214,0.06); }
        .flow-box.remote { border-color: #27ae60; background: rgba(39,174,96,0.06); }
        .flow-box h4 { font-size: 0.88rem; font-weight: 700; margin-bottom: 0.25rem; }
        .flow-box.local  h4 { color: #0366d6; }
        .flow-box.remote h4 { color: #27ae60; }
        .flow-box p { font-size: 0.78rem; color: var(--text2); }
        .flow-arrow { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--muted); display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0; letter-spacing: 0.06em; }
        .flow-arrow::before, .flow-arrow::after { content: ''; flex: 1; max-width: 60px; height: 1px; background: var(--border); }

        /* ── GitHub 4-step flow ── */
        .gh-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.65rem; margin: 1.25rem 0; }
        @media(max-width:640px){ .gh-steps { grid-template-columns: repeat(2,1fr); } }
        .gh-step { background: linear-gradient(135deg,#0366d6 0%,#044289 100%); border-radius: 12px; padding: 1.1rem 0.9rem; text-align: center; }
        .gh-step .gh-num { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.2); color: #fff; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.6rem; }
        .gh-step h4 { font-size: 0.8rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem; }
        .gh-step p  { font-size: 0.72rem; color: rgba(255,255,255,0.75); line-height: 1.45; }

        /* ── Feature cards grid ── */
        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin: 1.25rem 0; }
        @media(max-width:560px){ .feat-grid { grid-template-columns: 1fr; } }
        .feat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.85rem 1rem; display: flex; gap: 0.6rem; align-items: flex-start; }
        .feat-icon { color: #27ae60; font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
        .feat-card strong { font-size: 0.84rem; color: var(--text); display: block; margin-bottom: 0.12rem; }
        .feat-card span { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Workflow numbered steps ── */
        .workflow { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0; position: relative; }
        .workflow::before { content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 2px; background: var(--border); z-index: 0; }
        .wf-step { display: flex; align-items: flex-start; gap: 0.85rem; padding: 0.9rem 1rem; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); position: relative; z-index: 1; transition: border-color 0.2s; }
        .wf-step:hover { border-color: var(--border2); }
        .wf-num { width: 28px; height: 28px; border-radius: 8px; background: #0366d6; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; flex-shrink: 0; }
        .wf-content { display: flex; flex-direction: column; gap: 0.2rem; width: 100%; }
        .wf-content strong { font-size: 0.88rem; color: var(--text); }
        .wf-content p { font-size: 0.8rem; color: var(--text2); line-height: 1.5; }

        /* ── Activity ── */
        .act-box { background: linear-gradient(135deg,#24292e 0%,#0366d6 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .act-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .act-box h4 { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 1.1rem 0 0.5rem; }
        .lab-ol { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; padding: 1rem 1rem 1rem 2rem; margin-bottom: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .lab-ol li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.55; }
        .lab-ol li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }
        .lab-ol li strong { color: #fff; }
        .lab-ol li ul { margin-top: 0.3rem; padding-left: 1.2rem; }

        /* ── Quiz ── */
        .quiz-box { background: linear-gradient(135deg,rgba(3,102,214,0.08),rgba(4,66,137,0.08)); border: 1px solid rgba(3,102,214,0.2); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .quiz-box h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.25rem; }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .qi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.9rem 1rem; }
        .qi-n { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #0366d6; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
        .qi-q { font-size: 0.88rem; font-weight: 600; color: var(--text); }
        .qi-a { font-size: 0.82rem; color: var(--text2); font-style: italic; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--border); }
        .qi-a code { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); font-style: normal; }

        /* ── Homework ── */
        .hw-box { background: rgba(255,193,7,0.06); border: 1px solid rgba(255,193,7,0.2); border-radius: 14px; padding: 1.5rem; margin: 1.5rem 0; }
        .hw-box h3 { font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; }
        .hw-task { margin-bottom: 0.85rem; }
        .hw-task h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; }
        .hw-task p  { font-size: 0.82rem; color: var(--text2); line-height: 1.55; margin-bottom: 0.4rem; }
        .hw-task ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; padding-left: 0.5rem; }
        .hw-task li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.4rem; }
        .hw-task li::before { content: •; color: #F59E0B; flex-shrink: 0; }
        .hw-task li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.35rem; border-radius: 4px; color: var(--accent); }
        .hw-task li ul { padding-left: 1rem; margin-top: 0.25rem; }

        /* ── Takeaways ── */
        .tk-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 0.65rem; margin: 1rem 0; }
        .tk-card { background: var(--surface); border: 1px solid var(--border); border-top: 3px solid #0366d6; border-radius: 12px; padding: 0.9rem 1rem; }
        .tk-card h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; font-family: 'JetBrains Mono', monospace; }
        .tk-card p  { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Flow pill ── */
        .flow-pill { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.5rem; margin: 1.25rem 0; }
        .fp { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text); background: var(--surface); border: 1px solid var(--border); padding: 0.45rem 0.9rem; border-radius: 8px; }
        .fp-arrow { color: var(--muted); font-size: 0.9rem; }

        /* ── Golden rules ── */
        .rules-box { background: rgba(3,102,214,0.05); border: 1px solid rgba(3,102,214,0.2); border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0; }
        .rules-box h4 { font-size: 0.85rem; font-weight: 700; color: #0366d6; margin-bottom: 0.65rem; }
        .rules-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .rules-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .rules-box li::before { content: ✓; color: #0366d6; flex-shrink: 0; font-weight: 700; }

        /* ── Next card ── */
        .next-card { background: linear-gradient(135deg,#11998e 0%,#38ef7d 100%); border-radius: 16px; padding: 1.75rem; margin-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .next-text h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.4); margin-bottom: 0.4rem; }
        .next-text h3 { font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .next-text ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .next-text li { font-size: 0.83rem; color: rgba(255,255,255,0.8); display: flex; gap: 0.5rem; }
        .next-text li::before { content: →; color: rgba(255,255,255,0.6); flex-shrink: 0; }
        .next-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 700; color: #11998e; background: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.5rem; transition: opacity 0.2s, transform 0.2s; }
        .next-btn:hover { opacity: 0.9; transform: translateX(3px); }

        @media(max-width:640px){
          .s5-page { padding: 2rem 1rem 4rem; }
          .mod-sessions { flex-direction: column; }
          .s-link { border-right: none !important; border-bottom: 1px solid var(--border); }
          .s-link:last-child { border-bottom: none; }
          .flow-visual { max-width: 100%; }
        }
      `}</style>

      <div className="s5-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link>
          <span className="sep">/</span>
          <span className="current">Session 5: GIT Operations &amp; GitHub</span>
        </div>

        {/* ── MODULE NAVIGATION ── */}
        

        {/* Prev / Next */}
        <div className="nav-row">
          <Link href="/courses/dev/session4" className="nav-btn">&larr; Session 4: GIT Fundamentals</Link>
          <Link href="/courses/dev/session6" className="nav-btn">Session 6: Advanced GIT &rarr;</Link>
        </div>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 5 of 6</span>
            <span className="h-mod">Module 2 &mdash; DevOps in Practice</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~3.5 hrs
            </span>
          </div>
          <h1>🌐 GIT Operations &amp; GitHub</h1>
          <p>Clone, Push, Pull &mdash; connect your local work to the world. Create GitHub repositories, manage projects, and collaborate with teams.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","GIT Clone","GIT Commit","Push","Pull","GitHub","Connecting","Projects","Lab","Quiz","Homework"].map((l, i) => (
            <a key={i} href={`#s5p${i}`} className={`jpill${i === 0 ? " active" : ""}`}>{l}</a>
          ))}
        </div>

        {/* ── OBJECTIVES ── */}
        <div id="s5p0" className="obj-card">
          <h2>📋 Session Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o, i) => (
              <li key={i}><span className="obj-check">✓</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* ── GIT CLONE ── */}
        <div id="s5p1">
          <div className="pt"><span className="pt-badge">1 of 6</span>GIT Clone</div>
          <p className="body-text">
            <strong>GIT Clone</strong> creates a complete copy of an existing remote repository on your local machine &mdash; including the full version history and all files.
          </p>

          <div className="tip-box">
            <h4>💡 Why Clone?</h4>
            <ul>
              <li>Download existing projects from GitHub</li>
              <li>Get the complete version history</li>
              <li>Start contributing to open-source projects</li>
              <li>Work on team projects locally</li>
              <li>Create your own copy of any public project</li>
            </ul>
          </div>

          <div className="sub-h">Clone Command Syntax</div>
          <div className="cb">
<span className="c-cm"># Basic clone</span>{"\n"}
<span className="c-cmd">git clone</span> {"<"}repository-url{">"}{"\n\n"}
<span className="c-cm"># Clone with a custom directory name</span>{"\n"}
<span className="c-cmd">git clone</span> {"<"}repository-url{">"} {"<"}directory-name{">"}{"\n\n"}
<span className="c-cm"># Clone a specific branch</span>{"\n"}
<span className="c-cmd">git clone</span> -b {"<"}branch-name{">"} {"<"}repository-url{">"}
          </div>

          <div className="ex-box">
            <div className="ex-label">Example &mdash; Cloning from GitHub</div>
            <div className="cb" style={{marginTop:"0.5rem"}}>
<span className="c-cmd">git clone</span> https://github.com/username/project-name.git{"\n\n"}
<span className="c-out">Cloning into &apos;project-name&apos;...</span>{"\n"}
<span className="c-out">remote: Enumerating objects: 150, done.</span>{"\n"}
<span className="c-out">remote: Total 150 (delta 45), reused 150 (delta 45)</span>{"\n"}
<span className="c-out">Receiving objects: 100% (150/150), 1.25 MiB | 2.50 MiB/s, done.</span>{"\n\n"}
<span className="c-cm"># Navigate into the cloned directory</span>{"\n"}
cd project-name{"\n\n"}
<span className="c-cm"># Check remote connection</span>{"\n"}
<span className="c-cmd">git remote -v</span>{"\n"}
<span className="c-out">origin  https://github.com/username/project-name.git (fetch)</span>{"\n"}
<span className="c-out">origin  https://github.com/username/project-name.git (push)</span>
            </div>
          </div>

          <div className="sub-h">Clone vs Download ZIP</div>
          <table className="data-table">
            <thead><tr><th>Feature</th><th>GIT Clone</th><th>Download ZIP</th></tr></thead>
            <tbody>
              {cloneVsZip.map(([f, g, b]) => (
                <tr key={f}><td>{f}</td><td>{g}</td><td>{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── GIT COMMIT (detailed) ── */}
        <div id="s5p2">
          <div className="pt"><span className="pt-badge">2 of 6</span>GIT Commit &mdash; In Depth</div>
          <p className="body-text">
            A <strong>commit</strong> is a snapshot of your project at a specific point in time. Every commit stores:
          </p>

          <div className="feat-grid">
            {commitParts.map(([title, desc]) => (
              <div key={title} className="feat-card">
                <span className="feat-icon">📌</span>
                <div><strong>{title}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="tip-box" style={{marginTop:"1.25rem"}}>
            <h4>💡 Writing Good Commit Messages</h4>
            <ul>
              <li>Start with a verb in present tense (Add, Fix, Update, Remove)</li>
              <li>Be concise but descriptive &mdash; 50 characters or less for the title</li>
              <li>Explain WHAT and WHY, not HOW</li>
              <li>Use imperative mood: &ldquo;Add feature&rdquo; not &ldquo;Added feature&rdquo;</li>
            </ul>
          </div>

          <div className="sub-h">Good vs Bad Commit Messages</div>
          <table className="data-table">
            <thead><tr><th>❌ Bad</th><th>✅ Good</th></tr></thead>
            <tbody>
              {commitExamples.map(([bad, good]) => (
                <tr key={bad}><td>{bad}</td><td>{good}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Advanced Commit Commands</div>
          <div className="cb">
<span className="c-cm"># Commit with a detailed body message</span>{"\n"}
<span className="c-cmd">git commit -m &quot;Add user profile page&quot; -m &quot;Includes avatar upload and bio editing&quot;</span>{"\n\n"}
<span className="c-cm"># Commit all modified files (skip git add)</span>{"\n"}
<span className="c-cmd">git commit -a -m &quot;Update styles for homepage&quot;</span>{"\n\n"}
<span className="c-cm"># Amend the last commit (fix a mistake)</span>{"\n"}
<span className="c-cmd">git commit --amend -m &quot;New commit message&quot;</span>{"\n\n"}
<span className="c-cm"># View details of a specific commit</span>{"\n"}
<span className="c-cmd">git show</span> {"<"}commit-hash{">"}{"\n\n"}
<span className="c-cm"># View commit history as a graph</span>{"\n"}
<span className="c-cmd">git log --graph --oneline --all</span>
          </div>
        </div>

        {/* ── GIT PUSH ── */}
        <div id="s5p3">
          <div className="pt"><span className="pt-badge">3 of 6</span>GIT Push &mdash; Upload to GitHub</div>
          <p className="body-text">
            <strong>GIT Push</strong> uploads your local commits to a remote repository (like GitHub), synchronising your work with the server.
          </p>

          <div className="flow-visual">
            <div className="flow-box local">
              <h4>📁 Local Repository</h4>
              <p>Your commits on your computer</p>
            </div>
            <div className="flow-arrow">&darr;&nbsp; git push &nbsp;&darr;</div>
            <div className="flow-box remote">
              <h4>☁️ Remote Repository (GitHub)</h4>
              <p>Commits uploaded to GitHub server</p>
            </div>
          </div>

          <div className="sub-h">Push Command Syntax</div>
          <div className="cb">
<span className="c-cm"># Basic push syntax</span>{"\n"}
<span className="c-cmd">git push</span> {"<"}remote-name{">"} {"<"}branch-name{">"}{"\n\n"}
<span className="c-cm"># Most common usage</span>{"\n"}
<span className="c-cmd">git push origin main</span>{"\n\n"}
<span className="c-cm"># Push and set upstream tracking (first time)</span>{"\n"}
<span className="c-cmd">git push -u origin main</span>{"\n\n"}
<span className="c-cm"># After setting upstream, just use:</span>{"\n"}
<span className="c-cmd">git push</span>{"\n\n"}
<span className="c-cm"># Force push &mdash; DANGEROUS, use with extreme caution!</span>{"\n"}
<span className="c-cmd">git push --force origin main</span>
          </div>

          <div className="warn-box">
            <h4>⚠️ Before Every Push</h4>
            <ul>
              <li>Always commit your changes first</li>
              <li>Make sure you are on the correct branch</li>
              <li>Pull latest changes before pushing (avoids conflicts)</li>
              <li>Never force push to shared branches</li>
            </ul>
          </div>

          <div className="sub-h">Complete Push Workflow Example</div>
          <div className="cb">
<span className="c-cm"># 1. Check status</span>{"\n"}
<span className="c-cmd">git status</span>{"\n"}
<span className="c-out">On branch main</span>{"\n"}
<span className="c-out">Changes not staged for commit:</span>{"\n"}
<span className="c-out">  modified:   index.html</span>{"\n\n"}
<span className="c-cm"># 2. Stage the file</span>{"\n"}
<span className="c-cmd">git add index.html</span>{"\n\n"}
<span className="c-cm"># 3. Commit</span>{"\n"}
<span className="c-cmd">git commit -m &quot;Update homepage layout&quot;</span>{"\n"}
<span className="c-out">[main a1b2c3d] Update homepage layout</span>{"\n"}
<span className="c-out"> 1 file changed, 15 insertions(+), 5 deletions(-)</span>{"\n\n"}
<span className="c-cm"># 4. Push to GitHub</span>{"\n"}
<span className="c-cmd">git push origin main</span>{"\n"}
<span className="c-out">Writing objects: 100% (3/3), 425 bytes | 425.00 KiB/s, done.</span>{"\n"}
<span className="c-ok">To https://github.com/username/repo-name.git</span>{"\n"}
<span className="c-ok">   f9e8d7c..a1b2c3d  main -&gt; main</span>
          </div>
        </div>

        {/* ── GIT PULL ── */}
        <div id="s5p4">
          <div className="pt"><span className="pt-badge">4 of 6</span>GIT Pull &mdash; Download from GitHub</div>
          <p className="body-text">
            <strong>GIT Pull</strong> downloads the latest changes from the remote repository and merges them into your local branch. It is essentially <code>git fetch</code> + <code>git merge</code> combined.
          </p>

          <div className="flow-visual">
            <div className="flow-box remote">
              <h4>☁️ Remote Repository (GitHub)</h4>
              <p>Latest commits on the GitHub server</p>
            </div>
            <div className="flow-arrow">&darr;&nbsp; git pull &nbsp;&darr;</div>
            <div className="flow-box local">
              <h4>📁 Local Repository</h4>
              <p>Updates merged into your local code</p>
            </div>
          </div>

          <div className="sub-h">Pull Command Syntax</div>
          <div className="cb">
<span className="c-cm"># Basic pull</span>{"\n"}
<span className="c-cmd">git pull</span> {"<"}remote-name{">"} {"<"}branch-name{">"}{"\n\n"}
<span className="c-cm"># Most common usage</span>{"\n"}
<span className="c-cmd">git pull origin main</span>{"\n\n"}
<span className="c-cm"># After setting upstream, just use:</span>{"\n"}
<span className="c-cmd">git pull</span>{"\n\n"}
<span className="c-cm"># Pull with rebase instead of merge</span>{"\n"}
<span className="c-cmd">git pull --rebase origin main</span>
          </div>

          <div className="ex-box">
            <div className="ex-label">Example &mdash; Pulling Updates</div>
            <div className="cb" style={{marginTop:"0.5rem"}}>
<span className="c-cmd">git pull origin main</span>{"\n"}
<span className="c-out">remote: Enumerating objects: 8, done.</span>{"\n"}
<span className="c-out">remote: Total 6 (delta 2), reused 6 (delta 2)</span>{"\n"}
<span className="c-out">Unpacking objects: 100% (6/6), done.</span>{"\n"}
<span className="c-out">Updating a1b2c3d..e5f6g7h</span>{"\n"}
<span className="c-out">Fast-forward</span>{"\n"}
<span className="c-ok"> README.md | 10 ++++++++--</span>{"\n"}
<span className="c-ok"> 1 file changed, 8 insertions(+), 2 deletions(-)</span>
            </div>
          </div>

          <div className="sub-h">Fetch vs Pull</div>
          <table className="data-table">
            <thead><tr><th>Aspect</th><th>git fetch</th><th>git pull</th></tr></thead>
            <tbody>
              {fetchVsPull.map(([a, b, c]) => (
                <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="cb">
<span className="c-cm"># Fetch: download without merging (review first)</span>{"\n"}
<span className="c-cmd">git fetch origin</span>{"\n"}
<span className="c-cmd">git log origin/main</span>       <span className="c-cm"># review changes</span>{"\n"}
<span className="c-cmd">git merge origin/main</span>     <span className="c-cm"># merge manually when ready</span>{"\n\n"}
<span className="c-cm"># Pull: download + merge in one step</span>{"\n"}
<span className="c-cmd">git pull origin main</span>
          </div>
        </div>

        {/* ── GITHUB ── */}
        <div id="s5p5">
          <div className="pt"><span className="pt-badge">5 of 6</span>GitHub &mdash; Remote Repository Platform</div>
          <p className="body-text">
            <strong>GitHub</strong> is a cloud-based hosting service for Git repositories. It provides a web interface for version control and collaboration, along with access control, bug tracking, feature requests, and more.
          </p>

          <div className="feat-grid">
            {githubFeatures.map(([title, desc]) => (
              <div key={title} className="feat-card">
                <span className="feat-icon">✅</span>
                <div><strong>{title}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="sub-h">Creating a GitHub Repository</div>
          <div className="gh-steps">
            {[
              ["1","Sign In",       "Log into GitHub.com"],
              ["2","New Repository","Click “+” → “New repository”"],
              ["3","Configure",     "Name, description, public/private"],
              ["4","Initialise",    "Add README, .gitignore, licence"],
            ].map(([n, h, p]) => (
              <div key={n} className="gh-step">
                <div className="gh-num">{n}</div>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>

          <div className="sub-h">Repository Settings</div>
          <table className="data-table">
            <thead><tr><th>Setting</th><th>Description</th><th>Best Practice</th></tr></thead>
            <tbody>
              {repoSettings.map(([s, d, b]) => (
                <tr key={s}><td>{s}</td><td>{d}</td><td>{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── CONNECTING LOCAL → GITHUB ── */}
        <div id="s5p6">
          <div className="pt"><span className="pt-badge">Connecting</span>Local Repo &rarr; GitHub</div>

          <div className="tip-box">
            <h4>💡 Two Scenarios</h4>
            <ul>
              <li><strong>Scenario 1:</strong> You already have a local repository and want to push it to GitHub</li>
              <li><strong>Scenario 2:</strong> You create a GitHub repository first, then clone it locally</li>
            </ul>
          </div>

          <div className="sub-h">Scenario 1 &mdash; Push Existing Local Repo to GitHub</div>
          <div className="workflow">
            {[
              { n:"1", title:"Create repo on GitHub (without README)", code:null },
              { n:"2", title:"Add GitHub as remote",                   code:"git remote add origin https://github.com/username/repo-name.git" },
              { n:"3", title:"Verify remote connection",               code:"git remote -v\n# origin  https://github.com/username/repo-name.git (fetch)\n# origin  https://github.com/username/repo-name.git (push)" },
              { n:"4", title:"Rename branch to main (if needed)",      code:"git branch -M main" },
              { n:"5", title:"Push to GitHub",                         code:"git push -u origin main\n# Branch 'main' set up to track remote branch 'main' from 'origin'." },
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-content">
                  <strong>{s.title}</strong>
                  {s.code && (
                    <div className="cb" style={{marginTop:"0.45rem",fontSize:"0.71rem"}}>
                      {s.code.split("\n").map((line, i) => (
                        <span key={i} style={{display:"block"}}>
                          {line.startsWith("#") ? <span className="c-cm">{line}</span>
                           : line.startsWith("git") ? <span className="c-cmd">{line}</span>
                           : <span className="c-out">{line}</span>}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="sub-h">Scenario 2 &mdash; Clone from GitHub</div>
          <div className="cb">
<span className="c-cm"># 1. Create repo on GitHub (with README checked)</span>{"\n\n"}
<span className="c-cm"># 2. Clone to your computer</span>{"\n"}
<span className="c-cmd">git clone</span> https://github.com/username/repo-name.git{"\n\n"}
<span className="c-cm"># 3. Navigate into the directory</span>{"\n"}
cd repo-name{"\n\n"}
<span className="c-cm"># 4. Remote is already configured &mdash; start working!</span>{"\n"}
<span className="c-cmd">git remote -v</span>{"\n"}
<span className="c-out">origin  https://github.com/username/repo-name.git (fetch)</span>{"\n"}
<span className="c-out">origin  https://github.com/username/repo-name.git (push)</span>
          </div>

          <div className="sub-h">GitHub Authentication Methods</div>
          <table className="data-table">
            <thead><tr><th>Method</th><th>Description</th><th>Pros</th><th>Cons</th></tr></thead>
            <tbody>
              {authMethods.map(([m, d, p, c]) => (
                <tr key={m}><td>{m}</td><td>{d}</td><td>{p}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="warn-box">
            <h4>⚠️ Password Authentication Removed</h4>
            <p>GitHub no longer accepts passwords for Git operations. You must use one of:</p>
            <ul>
              <li><strong>Personal Access Token (PAT)</strong> &mdash; generate from Settings &rarr; Developer settings</li>
              <li><strong>SSH Keys</strong> &mdash; more convenient for frequent pushes</li>
              <li><strong>GitHub CLI</strong> &mdash; easiest option for beginners</li>
            </ul>
          </div>

          <div className="sub-h">README.md Best Practices</div>
          <div className="cb">
# Project Title{"\n\n"}
## Description{"\n"}
Brief description of what your project does{"\n\n"}
## Features{"\n"}
- Feature 1{"\n"}
- Feature 2{"\n\n"}
## Installation{"\n"}
&#96;&#96;&#96;bash{"\n"}
git clone https://github.com/username/repo-name.git{"\n"}
cd repo-name{"\n"}
npm install{"\n"}
&#96;&#96;&#96;{"\n\n"}
## Usage{"\n"}
&#96;&#96;&#96;bash{"\n"}
npm start{"\n"}
&#96;&#96;&#96;{"\n\n"}
## Technologies Used{"\n"}
- HTML, CSS, JavaScript{"\n"}
- Node.js, Express{"\n\n"}
## License{"\n"}
MIT License{"\n\n"}
## Contact{"\n"}
- Email: you@example.com{"\n"}
- GitHub: @yourusername
          </div>
        </div>

        {/* ── GITHUB PROJECTS ── */}
        <div id="s5p7">
          <div className="pt"><span className="pt-badge">6 of 6</span>GitHub Projects &amp; Management</div>
          <p className="body-text">
            <strong>GitHub Projects</strong> is a built-in project management tool. It helps teams organise and track work using customisable boards &mdash; similar to Kanban boards.
          </p>

          <div className="feat-grid">
            {[
              ["Project Boards",    "Visual task management (Table, Board, Roadmap views)"],
              ["Issues Integration","Link tasks directly to code issues"],
              ["Automation",        "Auto-move cards based on event triggers"],
              ["Custom Fields",     "Add priority, status, assignees"],
              ["Milestones",        "Track progress toward release goals"],
              ["Labels",            "Categorise and filter issues quickly"],
            ].map(([t, d]) => (
              <div key={t} className="feat-card">
                <span className="feat-icon">✅</span>
                <div><strong>{t}</strong><span>{d}</span></div>
              </div>
            ))}
          </div>

          <div className="sub-h">Creating a GitHub Project</div>
          <div className="gh-steps">
            {[
              ["1","Navigate",       "Repository → Projects tab"],
              ["2","Create Project", "Click “New project”"],
              ["3","Choose Template","Kanban, Table, or start from scratch"],
              ["4","Configure",      "Add columns, labels, automation"],
            ].map(([n, h, p]) => (
              <div key={n} className="gh-step">
                <div className="gh-num">{n}</div>
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            ))}
          </div>

          <div className="sub-h">Standard Project Board Columns</div>
          <table className="data-table">
            <thead><tr><th>Column</th><th>Purpose</th><th>Card Status</th></tr></thead>
            <tbody>
              {projectColumns.map(([c, p, s]) => (
                <tr key={c}><td>{c}</td><td>{p}</td><td>{s}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">GitHub Issues &mdash; Task Tracking</div>
          <p className="body-text">
            <strong>Issues</strong> are used to track bugs, enhancements, tasks, and questions. They are the building blocks of GitHub Projects.
          </p>

          <div className="ex-box">
            <div className="ex-label">Creating an Issue &mdash; Steps</div>
            <div className="cb" style={{marginTop:"0.5rem"}}>
<span className="c-cm"># On the GitHub web interface:</span>{"\n"}
1. Repository &rarr; Issues tab{"\n"}
2. Click &quot;New issue&quot;{"\n"}
3. Fill in:{"\n"}
   - Title: clear, concise description{"\n"}
   - Description: detailed explanation{"\n"}
   - Assignees: who will work on it{"\n"}
   - Labels: bug, enhancement, documentation, etc.{"\n"}
   - Projects: link to project board{"\n"}
   - Milestone: associate with release version{"\n"}
4. Click &quot;Submit new issue&quot;
            </div>
          </div>

          <div className="sub-h">Issue Labels</div>
          <table className="data-table">
            <thead><tr><th>Label</th><th>Colour</th><th>Purpose</th></tr></thead>
            <tbody>
              {issueLabels.map(([l, c, p]) => (
                <tr key={l}><td>{l}</td><td>{c}</td><td>{p}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── LAB ACTIVITIES ── */}
        <div id="s5p8">
          <div className="act-box">
            <h3>🎯 Hands-On Lab Activities</h3>

            <h4>Lab 1 &mdash; Clone a Repository</h4>
            <ol className="lab-ol">
              <li>Go to <code>https://github.com/octocat/Hello-World</code></li>
              <li>Click the green <strong>Code</strong> button &rarr; copy the HTTPS URL</li>
              <li>Open terminal and run:
                <div className="cb" style={{marginTop:"0.4rem",fontSize:"0.71rem"}}>
<span className="c-cmd">git clone</span> https://github.com/octocat/Hello-World.git{"\n"}
cd Hello-World{"\n"}
<span className="c-cmd">git log</span>
                </div>
              </li>
              <li>Explore the repository files and commit history</li>
            </ol>

            <h4>Lab 2 &mdash; Create Your First GitHub Repository</h4>
            <ol className="lab-ol">
              <li>Go to GitHub.com and sign in</li>
              <li>Click <strong>+</strong> &rarr; <strong>New repository</strong></li>
              <li>Name: <code>my-first-devops-repo</code></li>
              <li>Description: <code>Learning DevOps with GIT and GitHub</code></li>
              <li>Set visibility to <strong>Public</strong></li>
              <li>Check <strong>Add a README file</strong></li>
              <li>.gitignore template: choose <strong>Python</strong> or <strong>Node</strong></li>
              <li>Licence: <strong>MIT</strong> &rarr; click <strong>Create repository</strong></li>
            </ol>

            <h4>Lab 3 &mdash; Push Local Project to GitHub</h4>
            <ol className="lab-ol">
              <li>Create a new local project:
                <div className="cb" style={{marginTop:"0.4rem",fontSize:"0.71rem"}}>
mkdir devops-demo{"\n"}
cd devops-demo{"\n"}
<span className="c-cmd">git init</span>
                </div>
              </li>
              <li>Create files:
                <div className="cb" style={{marginTop:"0.4rem",fontSize:"0.71rem"}}>
echo &quot;# DevOps Demo Project&quot; {">"} README.md{"\n"}
echo &quot;console.log(&apos;Hello DevOps!&apos;);&quot; {">"} app.js
                </div>
              </li>
              <li>Commit locally:
                <div className="cb" style={{marginTop:"0.4rem",fontSize:"0.71rem"}}>
<span className="c-cmd">git add .</span>{"\n"}
<span className="c-cmd">git commit -m &quot;Initial commit&quot;</span>
                </div>
              </li>
              <li>Create a new repository on GitHub (without README)</li>
              <li>Connect and push:
                <div className="cb" style={{marginTop:"0.4rem",fontSize:"0.71rem"}}>
<span className="c-cmd">git remote add origin</span> https://github.com/your-username/devops-demo.git{"\n"}
<span className="c-cmd">git branch -M main</span>{"\n"}
<span className="c-cmd">git push -u origin main</span>
                </div>
              </li>
              <li>Refresh the GitHub page to see your code!</li>
            </ol>

            <h4>Lab 4 &mdash; Practice Pull Workflow</h4>
            <ol className="lab-ol">
              <li>On GitHub, edit README.md directly using the web interface</li>
              <li>Add the line: <code>Updated from GitHub web interface</code></li>
              <li>Commit the change on GitHub</li>
              <li>In your local terminal:
                <div className="cb" style={{marginTop:"0.4rem",fontSize:"0.71rem"}}>
<span className="c-cmd">git pull origin main</span>{"\n"}
cat README.md   <span className="c-cm"># verify the new line appears</span>
                </div>
              </li>
            </ol>

            <h4>Lab 5 &mdash; Create a GitHub Project Board</h4>
            <ol className="lab-ol">
              <li>Go to your repository &rarr; Projects tab</li>
              <li>Click <strong>New project</strong> &rarr; choose <strong>Board</strong> template</li>
              <li>Name it <code>DevOps Learning Tracker</code></li>
              <li>Create columns: <strong>To Do</strong>, <strong>In Progress</strong>, <strong>Done</strong></li>
              <li>Add cards: <em>Learn GIT basics</em>, <em>Create GitHub account</em>, <em>Push first project</em>, <em>Learn branching</em></li>
              <li>Move cards between columns as you progress</li>
            </ol>

            <h4>Challenge &mdash; Complete Push-Pull-Push Cycle</h4>
            <ol className="lab-ol">
              <li>Make a change locally (add a new file) &rarr; commit and push to GitHub</li>
              <li>Make a change on GitHub (edit file via web) &rarr; commit it</li>
              <li>Pull changes to local</li>
              <li>Make another local change &rarr; pull first (best practice) &rarr; push</li>
              <li>Document each step with screenshots</li>
            </ol>
          </div>
        </div>

        {/* ── QUIZ ── */}
        <div id="s5p9" className="quiz-box">
          <h3>🎓 Quick Quiz &mdash; Knowledge Check</h3>
          <ul className="quiz-list">
            {quizData.map((item, i) => (
              <li key={i} className="qi">
                <div className="qi-n">Q{i + 1}</div>
                <div className="qi-q">{item.q}</div>
                <div className="qi-a">💡 {item.a}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── HOMEWORK ── */}
        <div id="s5p10" className="hw-box">
          <h3>📝 Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Personal Portfolio Project:</h4>
            <ul>
              <li>Create a new GitHub repository called <code>my-portfolio</code></li>
              <li>Clone it to your computer</li>
              <li>Create a simple portfolio website with:
                <ul>
                  <li><code>index.html</code> &mdash; homepage with your name and bio</li>
                  <li><code>style.css</code> &mdash; basic styling</li>
                  <li><code>projects.html</code> &mdash; list of your projects</li>
                  <li><code>contact.html</code> &mdash; your contact info</li>
                </ul>
              </li>
              <li>Make at least 5 commits with meaningful messages</li>
              <li>Push all changes to GitHub and share the repo link</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Practice Clone-Modify-Push:</h4>
            <ul>
              <li>Clone any interesting public repository</li>
              <li>Read the README.md and document what the project does</li>
              <li>Explore the commit history using <code>git log</code></li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Create a Project Board:</h4>
            <ul>
              <li>Create a Project Board in your repository</li>
              <li>Add at least 10 tasks related to your learning journey</li>
              <li>Organise them into To Do, In Progress, Done</li>
              <li>Create 3 issues for actual bugs or features you want to add</li>
              <li>Link issues to your project board</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Write a Professional README:</h4>
            <ul>
              <li>Update README.md in your portfolio repository</li>
              <li>Include: title, description, features, technologies, installation instructions, contact info</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>5. Understanding Questions (answer in your own words):</h4>
            <ul>
              <li>What is the difference between <code>git clone</code> and downloading a ZIP file?</li>
              <li>Explain the workflow: Clone &rarr; Modify &rarr; Commit &rarr; Push</li>
              <li>What is the purpose of <code>git pull</code>? When should you use it?</li>
              <li>What are the benefits of using GitHub Projects?</li>
              <li>How do issues help in project management?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>6. Command Practice &mdash; document the commands for these scenarios:</h4>
            <ul>
              <li>Clone a repository from GitHub</li>
              <li>Check remote repository URL</li>
              <li>Add a new remote repository</li>
              <li>Push to main branch for the first time</li>
              <li>Pull latest changes from GitHub</li>
              <li>View remote branches</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>7. Prepare for Session 6:</h4>
            <ul>
              <li>Read about Git Rebase and Merge</li>
              <li>Understand what Git Stash does</li>
              <li>Learn about Git Reset and Checkout</li>
              <li>Watch: &ldquo;Git Branching and Merging&rdquo; tutorial on YouTube</li>
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
          <span className="fp">Clone</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Edit</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">git add</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">git commit</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">git pull</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">git push</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Repeat</span>
        </div>

        <div className="rules-box">
          <h4>⭐ Golden Rules</h4>
          <ul>
            <li>Always pull before you push</li>
            <li>Never force push to shared branches</li>
            <li>Write clear, meaningful commit messages</li>
            <li>Keep your repository organised with a proper README and .gitignore</li>
            <li>Use GitHub Issues and Projects to track your work</li>
          </ul>
        </div>

        {/* ── NEXT SESSION ── */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next &middot; Module 2 &middot; Session 6</h4>
            <h3>Advanced GIT Operations</h3>
            <ul>
              <li>Git Rebase &amp; Merge &mdash; integrate changes cleanly</li>
              <li>Git Stash &mdash; save changes without committing</li>
              <li>Git Reset &mdash; undo commits and changes</li>
              <li>Git Checkout &mdash; switch branches and restore files</li>
              <li>Resolving merge conflicts</li>
            </ul>
          </div>
          <Link href="/courses/dev/session6" className="next-btn">Session 6 &rarr;</Link>
        </div>

      </div>
    </>
  );
}