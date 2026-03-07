// app/courses/dev/session3/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   MODULE NAV DATA
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Understand the DevOps tools landscape and categories",
  "Install and configure Jenkins for CI/CD",
  "Work with Docker containers and images",
  "Set up Vagrant for development environments",
  "Compare configuration management tools: Ansible, Puppet, Chef",
  "Select appropriate tools for different DevOps scenarios",
];

const toolsLandscape = [
  { category: "Version Control",        purpose: "Track code changes, collaboration",        tools: "Git, GitHub, GitLab, Bitbucket",          color: "#F59E0B" },
  { category: "CI/CD",                  purpose: "Automate build, test, deploy",             tools: "Jenkins, GitLab CI, CircleCI, Travis CI", color: "#D33833" },
  { category: "Containerization",       purpose: "Package applications with dependencies",   tools: "Docker, Kubernetes, Podman",              color: "#2496ED" },
  { category: "Config Management",      purpose: "Automate infrastructure setup",            tools: "Ansible, Puppet, Chef, SaltStack",        color: "#EE0000" },
  { category: "Virtual Development",    purpose: "Create reproducible dev environments",     tools: "Vagrant, VirtualBox, VMware",             color: "#1563FF" },
  { category: "Monitoring",             purpose: "Track performance and errors",             tools: "Prometheus, Grafana, Nagios",             color: "#10B981" },
];

const configMgmtRows = [
  ["Agent Required",  "❌ No (Agentless)", "✅ Yes",                 "✅ Yes"],
  ["Language",        "YAML",              "Puppet DSL",             "Ruby DSL"],
  ["Learning Curve",  "Easy",              "Medium",                 "Steep"],
  ["Setup Time",      "Minutes",           "Hours",                  "Hours"],
  ["Best For",        "Cloud, simple auto","Enterprise, compliance", "Complex workflows"],
  ["Execution",       "Push (master)",     "Pull (agents check-in)", "Pull (agents check-in)"],
  ["Speed",           "Fast",              "Slower (agent overhead)","Slower (agent overhead)"],
  ["Community",       "Large & growing",   "Mature",                 "Mature"],
];

const toolSelectionRows = [
  ["Build and test code automatically",          "Jenkins",  "Purpose-built for CI/CD, 1800+ plugins"],
  ["Package application with dependencies",      "Docker",   "Lightweight, portable, consistent environments"],
  ["Create identical dev environments for team", "Vagrant",  "Full VMs, works with any OS"],
  ["Quick server config (cloud)",                "Ansible",  "Simple, agentless, fast to learn"],
  ["Large enterprise with compliance needs",     "Puppet",   "Mature, excellent reporting, enterprise support"],
  ["Complex infrastructure as code",             "Chef",     "Powerful, flexible, strong testing"],
];

const quizData = [
  { q: "What is the default port for Jenkins?",                           a: "8080" },
  { q: "What command pulls a Docker image?",                              a: "docker pull [image-name]" },
  { q: "What is the main advantage of Ansible over Puppet?",             a: "Ansible is agentless — no agent installation required on managed servers" },
  { q: "What file do you create to configure a Vagrant environment?",    a: "Vagrantfile" },
  { q: "What does CI/CD stand for?",                                      a: "Continuous Integration / Continuous Delivery (or Deployment)" },
  { q: "Two differences between Docker containers and VMs?",             a: "Containers share OS kernel and start in seconds; VMs have full OS and are more isolated" },
  { q: "Which config management tool uses YAML?",                        a: "Ansible" },
  { q: "How do you list running Docker containers?",                     a: "docker ps" },
  { q: "What command starts a Jenkins build?",                           a: "Click 'Build Now' or trigger via webhook/schedule" },
  { q: "What is the purpose of a Jenkinsfile?",                          a: "Define the Jenkins pipeline as code so it can be version-controlled" },
];

export default function Session3() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s3-page {
          max-width: 1000px;
          width: 100%;          /* ← was missing */
  overflow-x: hidden;
        }

        /* ── Breadcrumb ── */
        .breadcrumb {
          display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
          font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;
          color: var(--muted); margin-bottom: 2rem;
        }
        .breadcrumb a { color: var(--text2); text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: var(--accent); }
        .breadcrumb .sep { color: var(--border2); }
        .breadcrumb .current { color: var(--text); }

        /* ── Module nav ── */
        .module-nav { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2.5rem; }
        .module-block { border-radius: 14px; overflow: hidden; border: 1px solid var(--border); background: var(--surface); }
        .module-header { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); }
        .module-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }
        .module-title { font-size: 0.82rem; font-weight: 700; color: var(--text); }
        .module-sessions { display: flex; flex-wrap: wrap; }
        .session-link { flex: 1; min-width: 120px; display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; border-right: 1px solid var(--border); transition: background 0.2s, color 0.2s; letter-spacing: 0.02em; }
        .session-link:last-child { border-right: none; }
        .session-link:hover { background: var(--surface2); color: var(--text); }
        .session-link.active { background: var(--surface2); color: var(--text); font-weight: 600; }
        .session-link .s-num { width: 20px; height: 20px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.62rem; font-weight: 700; color: #fff; flex-shrink: 0; }

        /* ── Prev / next row ── */
        .nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
        .nav-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); transition: all 0.2s; white-space: nowrap; }
        .nav-btn:hover { color: var(--text); border-color: var(--border2); }

        /* ── Session hero ── */
        .session-hero {
          border-radius: 20px;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #d33833 100%);
          padding: 2.5rem 2rem; margin-bottom: 2rem;
          position: relative; overflow: hidden;
        }
        .session-hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 22px 22px; }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .hero-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .hero-mod-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px; }
        .hero-final-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,215,0,0.2); border: 1px solid rgba(255,215,0,0.4); color: #FFD700; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .hero-duration { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem; }
        .session-hero h1 { font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem; }
        .session-hero p { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        /* ── Jump nav ── */
        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jnav-pill { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; padding: 0.3rem 0.8rem; border-radius: 100px; border: 1px solid var(--border); background: var(--surface2); color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
        .jnav-pill:hover { color: var(--text); border-color: var(--border2); }
        .jnav-pill.active { background: linear-gradient(135deg,#1e3c72,#d33833); color: #fff; border-color: transparent; }

        /* ── Part title ── */
        .part-title { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text); margin: 2.5rem 0 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .part-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .part-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(135deg,#1e3c72,#d33833); color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }

        /* ── Objectives ── */
        .objectives-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; }
        .objectives-card h2 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1.1rem; display: flex; align-items: center; gap: 0.5rem; }
        .obj-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .obj-list li { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: rgba(255,255,255,0.92); line-height: 1.5; }
        .obj-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(255,215,0,0.2); border: 1.5px solid #FFD700; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: #FFD700; flex-shrink: 0; margin-top: 2px; }

        /* ── Tools landscape table ── */
        .landscape-grid { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0; }
        .landscape-row { display: flex; align-items: flex-start; gap: 0.85rem; padding: 0.85rem 1rem; border-radius: 10px; background: var(--surface); border: 1px solid var(--border); transition: border-color 0.2s; }
        .landscape-row:hover { border-color: var(--border2); }
        .landscape-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
        .landscape-cat { font-size: 0.85rem; font-weight: 700; color: var(--text); min-width: 160px; }
        .landscape-purpose { font-size: 0.8rem; color: var(--text2); flex: 1; }
        .landscape-tools { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); min-width: 220px; text-align: right; }

        /* ── Pipeline callout ── */
        .pipeline-callout { background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.2); border-radius: 12px; padding: 1.1rem 1.25rem; margin: 1.25rem 0; }
        .pipeline-callout h4 { font-size: 0.82rem; font-weight: 700; color: #B45309; margin-bottom: 0.5rem; }
        .pipeline-callout p { font-size: 0.83rem; color: var(--text2); line-height: 1.65; }
        .pipeline-callout strong { color: var(--text); }

        /* ── Tool card ── */
        .tool-card { border-radius: 16px; overflow: hidden; border: 1px solid var(--border); background: var(--surface); margin-bottom: 1.5rem; }
        .tool-header { padding: 1.25rem 1.5rem 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 1rem; }
        .tool-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
        .tool-header-text h3 { font-size: 1.15rem; font-weight: 800; letter-spacing: -0.02em; }
        .tool-header-text p { font-size: 0.82rem; color: var(--text2); line-height: 1.55; margin-top: 0.2rem; }
        .tool-body { padding: 1.25rem 1.5rem; }

        /* ── Features list ── */
        .features-list { background: rgba(39,174,96,0.06); border: 1px solid rgba(39,174,96,0.2); border-radius: 12px; padding: 1rem 1.25rem; margin: 1rem 0; }
        .features-list h4 { font-size: 0.78rem; font-weight: 700; color: #27ae60; margin-bottom: 0.6rem; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.08em; text-transform: uppercase; }
        .features-list ul { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }
        .features-list li { font-size: 0.82rem; color: var(--text2); line-height: 1.45; display: flex; gap: 0.45rem; }
        .features-list li::before { content: '✅'; flex-shrink: 0; font-size: 0.7rem; }

        /* ── Sub heading ── */
        .sub-h { font-size: 0.95rem; font-weight: 700; color: var(--text); margin: 1.5rem 0 0.75rem; display: flex; align-items: center; gap: 0.5rem; }

        /* ── Install steps ── */
        .install-box { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1.1rem 1.25rem; margin: 0.75rem 0; }
        .install-box h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.6rem; }
        .install-box ul, .install-box ol { padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .install-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.55; }
        .install-box li strong { color: var(--text); }

        /* ── Code block ── */
        .code-block { background: #0d1117; color: #e6edf3; padding: 1.25rem; border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; line-height: 1.85; overflow-x: auto; margin: 0.75rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .c-comment { color: #8b949e; }
        .c-cmd { color: #79c0ff; }
        .c-key { color: #ff7b72; }
        .c-str { color: #a5d6ff; }
        .c-green { color: #56d364; }

        /* ── Use case box ── */
        .use-case { background: rgba(245,158,11,0.07); border-left: 3px solid #F59E0B; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1rem 0; }
        .use-case h4 { font-size: 0.82rem; font-weight: 700; color: #B45309; margin-bottom: 0.5rem; }
        .use-case p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .use-case ul, .use-case ol { padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .use-case li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; }
        .use-case li code, .use-case p code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        /* ── Config mgmt tool cards ── */
        .config-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin: 1.25rem 0; }
        .config-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .config-header { padding: 1rem 1.25rem; display: flex; align-items: center; gap: 0.75rem; border-bottom: 1px solid var(--border); }
        .config-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
        .config-name { font-size: 1rem; font-weight: 800; }
        .config-meta { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--muted); margin-top: 1px; }
        .config-body { padding: 1rem 1.25rem; }

        /* ── Comparison tables ── */
        .comp-table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; margin: 1.25rem 0; box-shadow: var(--shadow-sm); font-size: 0.82rem; }
        .comp-table thead th { padding: 0.85rem 1rem; text-align: left; font-weight: 700; font-size: 0.76rem; }
        .comp-table thead th:first-child  { background: var(--surface2); color: var(--text); }
        .comp-table thead th:nth-child(2) { background: #EE0000; color: #fff; }
        .comp-table thead th:nth-child(3) { background: #ffae1a; color: #111; }
        .comp-table thead th:nth-child(4) { background: #f09820; color: #fff; }
        .comp-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); color: var(--text2); line-height: 1.5; vertical-align: top; }
        .comp-table td:first-child { font-weight: 600; color: var(--text); background: var(--surface); }
        .comp-table tr:last-child td { border-bottom: none; }
        .comp-table tr:nth-child(even) td:not(:first-child) { background: var(--surface2); }

        /* Tool selection table */
        .sel-table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; margin: 1.25rem 0; box-shadow: var(--shadow-sm); font-size: 0.82rem; }
        .sel-table thead th { padding: 0.85rem 1rem; text-align: left; font-weight: 700; font-size: 0.76rem; background: linear-gradient(135deg,#1e3c72,#2a5298); color: #fff; }
        .sel-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); color: var(--text2); line-height: 1.5; vertical-align: top; }
        .sel-table td:nth-child(2) { font-weight: 700; color: var(--text); }
        .sel-table tr:last-child td { border-bottom: none; }
        .sel-table tr:nth-child(even) td { background: var(--surface2); }

        /* ── Key box ── */
        .key-box { background: rgba(255,193,7,0.07); border: 1px solid rgba(255,193,7,0.22); border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0; }
        .key-box h3 { font-size: 0.9rem; font-weight: 700; color: var(--text); margin-bottom: 0.75rem; }
        .key-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .key-box li { font-size: 0.84rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .key-box li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }

        /* ── Practical demo box ── */
        .demo-box { background: linear-gradient(135deg,#f093fb 0%,#f5576c 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .demo-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .demo-box h4 { font-size: 0.85rem; font-weight: 700; color: #fff; margin: 1rem 0 0.5rem; }
        .demo-inner { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 1rem; margin-bottom: 0.75rem; }
        .demo-inner ol { padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.3rem; }
        .demo-inner li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.5; }
        .demo-inner li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }
        .demo-inner p { font-size: 0.83rem; color: rgba(255,255,255,0.75); margin-bottom: 0.4rem; }
        .demo-inner strong { color: #fff; }

        /* ── Takeaway tool cards ── */
        .takeaway-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem; margin: 1.25rem 0; }
        .tk-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; }
        .tk-card h3 { font-size: 0.9rem; font-weight: 800; margin-bottom: 0.65rem; }
        .tk-card ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .tk-card li { font-size: 0.78rem; color: var(--text2); line-height: 1.4; display: flex; gap: 0.4rem; }
        .tk-card li::before { content: '✅'; font-size: 0.65rem; flex-shrink: 0; }
        .tk-card .use-for { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--muted); margin-top: 0.6rem; padding-top: 0.6rem; border-top: 1px solid var(--border); letter-spacing: 0.04em; }

        /* ── Activity box ── */
        .activity-box { background: linear-gradient(135deg,#f093fb 0%,#f5576c 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .activity-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .activity-box h4 { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 1rem 0 0.5rem; }
        .lab-steps { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 1rem; margin-bottom: 0.75rem; }
        .lab-steps ol { padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.35rem; }
        .lab-steps li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.5; }
        .lab-steps li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.18); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }

        /* ── HW box ── */
        .hw-box { background: rgba(255,193,7,0.06); border: 1px solid rgba(255,193,7,0.2); border-radius: 14px; padding: 1.5rem; margin: 1.5rem 0; }
        .hw-box h3 { font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; }
        .hw-task { margin-bottom: 0.85rem; }
        .hw-task h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; }
        .hw-task p { font-size: 0.82rem; color: var(--text2); line-height: 1.55; margin-bottom: 0.4rem; }
        .hw-task ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; padding-left: 0.5rem; }
        .hw-task li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.4rem; }
        .hw-task li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }

        /* ── Quiz ── */
        .quiz-box { background: linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08)); border: 1px solid rgba(99,102,241,0.2); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .quiz-box h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.25rem; }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .quiz-item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.9rem 1rem; }
        .q-num { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--accent); letter-spacing: 0.08em; margin-bottom: 0.3rem; }
        .q-text { font-size: 0.88rem; font-weight: 600; color: var(--text); margin-bottom: 0.3rem; }
        .q-answer { font-size: 0.82rem; color: var(--text2); font-style: italic; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--border); }
        .q-answer code { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); font-style: normal; }

        /* ── Next (Module 2) card ── */
        .next-card { background: linear-gradient(135deg,#11998e 0%,#38ef7d 100%); border-radius: 16px; padding: 1.75rem; margin-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .next-text h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.4); margin-bottom: 0.4rem; }
        .next-text h3 { font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .next-text ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .next-text li { font-size: 0.83rem; color: rgba(255,255,255,0.8); display: flex; gap: 0.5rem; }
        .next-text li::before { content: '→'; color: rgba(255,255,255,0.6); flex-shrink: 0; }
        .next-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 700; color: #11998e; background: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.5rem; transition: opacity 0.2s, transform 0.2s; }
        .next-btn:hover { opacity: 0.9; transform: translateX(3px); }

        /* ── Module complete banner ── */
        .module-complete { background: linear-gradient(135deg,#2a5298 0%,#1e3c72 100%); border-radius: 14px; padding: 1.25rem 1.5rem; margin: 2rem 0 0; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .mc-badge { font-size: 1.75rem; flex-shrink: 0; }
        .mc-text h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 0.2rem; }
        .mc-text p { font-size: 0.88rem; font-weight: 700; color: #fff; }

        @media (max-width: 640px) {
          .s3-page { padding: 2rem 1rem 4rem; }
          .landscape-row { flex-direction: column; gap: 0.35rem; }
          .landscape-tools { text-align: left; }
          .config-grid { grid-template-columns: 1fr; }
          .takeaway-grid { grid-template-columns: 1fr 1fr; }
          .module-sessions { flex-direction: column; }
          .session-link { border-right: none; border-bottom: 1px solid var(--border); }
          .session-link:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="s3-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link>
          <span className="sep">/</span>
          <span className="current">Session 3: DevOps Tools Ecosystem</span>
        </div>

        {/* ── MODULE NAVIGATION ── */}
  

        {/* Prev / Next */}
        <div className="nav-row">
          <Link href="/courses/dev/session2" className="nav-btn">← Session 2: SDLC Models</Link>
          <Link href="/courses/dev/session4" className="nav-btn">Module 2 → Session 4: Git</Link>
        </div>

        {/* ── HERO ── */}
        <div className="session-hero">
          <div className="hero-meta">
            <span className="hero-badge">Session 3 of 15</span>
            <span className="hero-mod-tag">Module 1 — DevOps Foundations</span>
            <span className="hero-final-tag">⭐ Final Session of Module 1</span>
            <span className="hero-duration">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4 hrs total
            </span>
          </div>
          <h1>🛠️ DevOps Tools Ecosystem</h1>
          <p>Jenkins, Docker, Vagrant, Ansible, Puppet & Chef — hands-on installation, commands, and when to use each tool.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","Tools Landscape","Jenkins","Docker","Vagrant","Config Mgmt","Tool Selector","Activity","Takeaways","Quiz","Homework"].map((l, i) => (
            <a key={i} href={`#s3p${i}`} className={`jnav-pill${i === 0 ? " active" : ""}`}>{l}</a>
          ))}
        </div>

        {/* ── OBJECTIVES ── */}
        <div id="s3p0" className="objectives-card">
          <h2>📚 Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o, i) => (
              <li key={i}><span className="obj-check">✓</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* ── TOOLS LANDSCAPE ── */}
        <div id="s3p1">
          <div className="part-title"><span className="part-badge">Overview</span>Tools Landscape</div>
          <p style={{fontSize:"0.9rem",color:"var(--text2)",lineHeight:1.7,marginBottom:"1.1rem"}}>
            DevOps tools are categorised by their function in the software delivery pipeline. A typical workflow uses <strong style={{color:"var(--text)"}}>multiple tools together</strong>, each solving a specific problem.
          </p>
          <div className="landscape-grid">
            {toolsLandscape.map((t) => (
              <div key={t.category} className="landscape-row">
                <span className="landscape-dot" style={{ background: t.color }}/>
                <span className="landscape-cat">{t.category}</span>
                <span className="landscape-purpose">{t.purpose}</span>
                <span className="landscape-tools">{t.tools}</span>
              </div>
            ))}
          </div>
          <div className="pipeline-callout">
            <h4>💡 Example Full Pipeline</h4>
            <p>
              <strong>Developer writes code</strong> → <strong>Git</strong> (version control) → <strong>Jenkins</strong> (builds & tests) → <strong>Docker</strong> (containerises) → <strong>Kubernetes</strong> (deploys) → <strong>Prometheus</strong> (monitors)
            </p>
          </div>
        </div>

        {/* ── JENKINS ── */}
        <div id="s3p2">
          <div className="part-title"><span className="part-badge">Part 1 · 90 min</span>Jenkins — CI/CD Automation</div>

          <div className="tool-card">
            <div className="tool-header">
              <div className="tool-icon" style={{background:"rgba(211,56,51,0.1)"}}>🔧</div>
              <div className="tool-header-text">
                <h3 style={{color:"#D33833"}}>Jenkins</h3>
                <p>Open-source automation server that enables Continuous Integration and Continuous Delivery. Automates building, testing, and deploying applications.</p>
              </div>
            </div>
            <div className="tool-body">
              <div className="features-list">
                <h4>Key Features</h4>
                <ul>
                  {["Free and open source","1800+ plugins for integration with almost any tool","Distributed builds (master-slave architecture)","Easy installation and configuration","Supports all major version control systems","Pipeline as Code (Jenkinsfile)"].map(f=><li key={f}>{f}</li>)}
                </ul>
              </div>

              <div className="sub-h">🪟 Installation — Windows</div>
              <div className="install-box">
                <h4>Prerequisites</h4>
                <ul>
                  <li>Java JDK 11 or later installed</li>
                  <li>At least 256 MB RAM (1 GB recommended)</li>
                  <li>10 GB of disk space</li>
                </ul>
              </div>
              <div className="code-block">
<span className="c-comment"># 1. Check Java version</span>{"\n"}
java -version{"\n\n"}
<span className="c-comment"># 2. Download jenkins.war from https://jenkins.io/download/</span>{"\n\n"}
<span className="c-comment"># 3. Run Jenkins (default port 8080)</span>{"\n"}
java -jar jenkins.war{"\n\n"}
<span className="c-comment"># Or specify a custom port</span>{"\n"}
java -jar jenkins.war --httpPort=9090{"\n\n"}
<span className="c-comment"># 4. Get initial admin password (Windows path)</span>{"\n"}
type C:\Users\YourUsername\.jenkins\secrets\initialAdminPassword
              </div>
              <div className="install-box">
                <h4>Setup Steps after first launch at http://localhost:8080</h4>
                <ol>
                  <li>Paste the initial admin password from the file above</li>
                  <li>Click <strong>"Install suggested plugins"</strong> — wait ~5 minutes</li>
                  <li>Create your admin user (username, password, email)</li>
                  <li>Click <strong>"Save and Continue"</strong> → Jenkins Dashboard is ready!</li>
                </ol>
              </div>

              <div className="sub-h">🐧 Installation — Linux/Ubuntu</div>
              <div className="code-block">
<span className="c-comment"># Update & install Java</span>{"\n"}
sudo apt update{"\n"}
sudo apt install openjdk-11-jdk -y{"\n\n"}
<span className="c-comment"># Add Jenkins repository key</span>{"\n"}
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \{"\n"}
{"  "}/usr/share/keyrings/jenkins-keyring.asc {">"} /dev/null{"\n\n"}
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \{"\n"}
{"  "}https://pkg.jenkins.io/debian-stable binary/ | sudo tee \{"\n"}
{"  "}/etc/apt/sources.list.d/jenkins.list {">"} /dev/null{"\n\n"}
<span className="c-comment"># Install Jenkins</span>{"\n"}
sudo apt update && sudo apt install jenkins -y{"\n\n"}
<span className="c-comment"># Start & enable on boot</span>{"\n"}
sudo systemctl start jenkins{"\n"}
sudo systemctl enable jenkins{"\n\n"}
<span className="c-comment"># Get initial password</span>{"\n"}
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
              </div>

              <div className="sub-h">📋 Common Use Cases</div>
              <div className="use-case">
                <h4>Use Case 1: Automated Testing on Every Push</h4>
                <p>Every time a developer pushes code to GitHub, Jenkins automatically runs all tests.</p>
                <ol>
                  <li>Create a new Jenkins job</li>
                  <li>Connect to GitHub repository</li>
                  <li>Configure webhook (GitHub notifies Jenkins on push)</li>
                  <li>Add build step: <code>mvn test</code> (Java) or <code>npm test</code> (Node.js)</li>
                  <li>If tests fail, notify team via email/Slack automatically</li>
                </ol>
                <p><strong>Result:</strong> No broken code ever reaches production!</p>
              </div>

              <div className="use-case" style={{marginTop:"0.75rem"}}>
                <h4>Use Case 2: Continuous Deployment Pipeline (Jenkinsfile)</h4>
                <div className="code-block" style={{marginTop:"0.5rem"}}>
pipeline {"{"}{"\n"}
{"    "}agent any{"\n"}
{"    "}stages {"{"}{"\n"}
{"        "}stage(<span className="c-str">'Build'</span>) {"{"}{"\n"}
{"            "}steps {"{"} sh <span className="c-str">'mvn clean package'</span> {"}"}{"\n"}
{"        "}{"}"}{"\n"}
{"        "}stage(<span className="c-str">'Test'</span>) {"{"}{"\n"}
{"            "}steps {"{"} sh <span className="c-str">'mvn test'</span> {"}"}{"\n"}
{"        "}{"}"}{"\n"}
{"        "}stage(<span className="c-str">'Deploy'</span>) {"{"}{"\n"}
{"            "}steps {"{"}{"\n"}
{"                "}sh <span className="c-str">'scp target/app.war user@server:/opt/tomcat/webapps/'</span>{"\n"}
{"            "}{"}"}{"\n"}
{"        "}{"}"}{"\n"}
{"    "}{"}"}{"\n"}
{"}"}
                </div>
              </div>

              <div className="use-case" style={{marginTop:"0.75rem"}}>
                <h4>Use Case 3: Scheduled Jobs (Database Backup)</h4>
                <ul>
                  <li>Build Triggers → <strong>Build periodically</strong></li>
                  <li>Cron: <code>0 2 * * *</code> — runs at 2:00 AM every day</li>
                  <li>Execute shell: <code>pg_dump mydb {">"} backup.sql</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── DOCKER ── */}
        <div id="s3p3">
          <div className="part-title"><span className="part-badge">Part 2 · 90 min</span>Docker — Containerisation</div>

          <div className="tool-card">
            <div className="tool-header">
              <div className="tool-icon" style={{background:"rgba(36,150,237,0.1)"}}>🐳</div>
              <div className="tool-header-text">
                <h3 style={{color:"#2496ED"}}>Docker</h3>
                <p>Containerisation platform that packages applications and their dependencies into lightweight, portable containers that run consistently across any environment.</p>
              </div>
            </div>
            <div className="tool-body">
              <div className="features-list">
                <h4>Key Features</h4>
                <ul>
                  {["Lightweight — shares OS kernel, unlike VMs","Fast startup: seconds vs minutes for VMs","Portable — runs anywhere: laptop, cloud, on-premise","Isolated environments for each application","Version control for infrastructure","Efficient resource usage"].map(f=><li key={f}>{f}</li>)}
                </ul>
              </div>

              <div className="sub-h">🪟 Installation — Windows</div>
              <div className="code-block">
<span className="c-comment"># 1. Open PowerShell as Administrator — enable WSL 2</span>{"\n"}
wsl --install{"\n"}
<span className="c-comment"># Restart computer</span>{"\n\n"}
<span className="c-comment"># 2. Download Docker Desktop from https://docker.com/products/docker-desktop</span>{"\n"}
<span className="c-comment">#    Run installer → follow wizard → restart again</span>{"\n\n"}
<span className="c-comment"># 3. Verify installation</span>{"\n"}
docker --version{"\n"}
docker run hello-world{"\n"}
<span className="c-comment"># You should see "Hello from Docker!" message ✅</span>
              </div>

              <div className="sub-h">🐧 Installation — Linux/Ubuntu</div>
              <div className="code-block">
<span className="c-comment"># Install dependencies</span>{"\n"}
sudo apt update{"\n"}
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y{"\n\n"}
<span className="c-comment"># Add Docker GPG key & repository</span>{"\n"}
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg{"\n"}
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list {">"} /dev/null{"\n\n"}
<span className="c-comment"># Install Docker</span>{"\n"}
sudo apt update && sudo apt install docker-ce docker-ce-cli containerd.io -y{"\n\n"}
<span className="c-comment"># Start & enable</span>{"\n"}
sudo systemctl start docker && sudo systemctl enable docker{"\n\n"}
<span className="c-comment"># Run without sudo (re-login after this)</span>{"\n"}
sudo usermod -aG docker $USER
              </div>

              <div className="sub-h">⚡ Essential Docker Commands</div>
              <div className="code-block">
<span className="c-comment"># ── IMAGE COMMANDS ──────────────────────────</span>{"\n"}
docker pull nginx                      <span className="c-comment"># Pull image from Docker Hub</span>{"\n"}
docker pull ubuntu:20.04               <span className="c-comment"># Pull specific version</span>{"\n"}
docker images                          <span className="c-comment"># List all local images</span>{"\n"}
docker rmi nginx                       <span className="c-comment"># Remove an image</span>{"\n\n"}
<span className="c-comment"># ── CONTAINER COMMANDS ──────────────────────</span>{"\n"}
docker run nginx                       <span className="c-comment"># Run a container</span>{"\n"}
docker run -d nginx                    <span className="c-comment"># Run in background (detached)</span>{"\n"}
docker run -d -p 8080:80 nginx         <span className="c-comment"># Map host:container port</span>{"\n"}
docker run -d --name my-nginx nginx    <span className="c-comment"># Give it a name</span>{"\n\n"}
docker ps                              <span className="c-comment"># List running containers</span>{"\n"}
docker ps -a                           <span className="c-comment"># List ALL containers</span>{"\n"}
docker stop my-nginx                   <span className="c-comment"># Stop container</span>{"\n"}
docker start my-nginx                  <span className="c-comment"># Start stopped container</span>{"\n"}
docker rm my-nginx                     <span className="c-comment"># Remove container</span>{"\n"}
docker exec -it my-nginx bash          <span className="c-comment"># Shell inside container</span>{"\n"}
docker logs my-nginx                   <span className="c-comment"># View container logs</span>{"\n\n"}
<span className="c-comment"># ── BUILD & PUSH ────────────────────────────</span>{"\n"}
docker build -t myapp:1.0 .            <span className="c-comment"># Build from Dockerfile</span>{"\n"}
docker push username/myapp:1.0        <span className="c-comment"># Push to Docker Hub</span>{"\n"}
docker system prune -a                 <span className="c-comment"># Clean up unused resources</span>
              </div>

              <div className="sub-h">📋 Common Use Cases</div>
              <div className="use-case">
                <h4>Use Case 1: Run a Web Server in Seconds</h4>
                <div className="code-block" style={{marginTop:"0.5rem"}}>
<span className="c-comment"># Pull and run Nginx — zero installation on host!</span>{"\n"}
docker run -d -p 8080:80 --name webserver nginx{"\n"}
<span className="c-comment"># Visit http://localhost:8080 ✅</span>{"\n\n"}
docker stop webserver && docker rm webserver
                </div>
                <p><strong>Why Docker?</strong> No need to install Nginx on your system, no version conflicts!</p>
              </div>

              <div className="use-case" style={{marginTop:"0.75rem"}}>
                <h4>Use Case 2: Isolated Database for Testing</h4>
                <div className="code-block" style={{marginTop:"0.5rem"}}>
<span className="c-comment"># Run MySQL — clean DB every time!</span>{"\n"}
docker run -d \{"\n"}
{"  "}--name mysql-dev \{"\n"}
{"  "}-e MYSQL_ROOT_PASSWORD=password123 \{"\n"}
{"  "}-e MYSQL_DATABASE=testdb \{"\n"}
{"  "}-p 3306:3306 \{"\n"}
{"  "}mysql:8.0{"\n\n"}
docker exec -it mysql-dev mysql -uroot -p{"\n\n"}
<span className="c-comment"># Done? Remove everything cleanly</span>{"\n"}
docker stop mysql-dev && docker rm mysql-dev
                </div>
              </div>

              <div className="use-case" style={{marginTop:"0.75rem"}}>
                <h4>Use Case 3: Dockerfile — Package a Node.js App</h4>
                <div className="code-block" style={{marginTop:"0.5rem"}}>
<span className="c-comment"># Dockerfile</span>{"\n"}
<span className="c-key">FROM</span> node:16{"\n"}
<span className="c-key">WORKDIR</span> /app{"\n"}
<span className="c-key">COPY</span> package*.json ./{"\n"}
<span className="c-key">RUN</span> npm install{"\n"}
<span className="c-key">COPY</span> . .{"\n"}
<span className="c-key">EXPOSE</span> 3000{"\n"}
<span className="c-key">CMD</span> [<span className="c-str">"node"</span>, <span className="c-str">"app.js"</span>]{"\n\n"}
<span className="c-comment"># Build and run</span>{"\n"}
docker build -t my-nodeapp:1.0 .{"\n"}
docker run -d -p 3000:3000 my-nodeapp:1.0
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── VAGRANT ── */}
        <div id="s3p4">
          <div className="part-title"><span className="part-badge">Part 3</span>Vagrant — Dev Environments</div>

          <div className="tool-card">
            <div className="tool-header">
              <div className="tool-icon" style={{background:"rgba(21,99,255,0.1)"}}>📦</div>
              <div className="tool-header-text">
                <h3 style={{color:"#1563FF"}}>Vagrant</h3>
                <p>Tool for building and managing virtual machine environments in a single workflow, solving the classic "works on my machine" problem.</p>
              </div>
            </div>
            <div className="tool-body">
              <div className="sub-h">⚡ Essential Vagrant Commands</div>
              <div className="code-block">
vagrant init ubuntu/focal64   <span className="c-comment"># Initialize a new Vagrant project</span>{"\n"}
vagrant up                    <span className="c-comment"># Start the VM</span>{"\n"}
vagrant ssh                   <span className="c-comment"># SSH into the VM</span>{"\n"}
vagrant status                <span className="c-comment"># Check VM status</span>{"\n"}
vagrant suspend               <span className="c-comment"># Suspend (save state)</span>{"\n"}
vagrant resume                <span className="c-comment"># Resume from suspend</span>{"\n"}
vagrant reload                <span className="c-comment"># Restart VM</span>{"\n"}
vagrant halt                  <span className="c-comment"># Graceful shutdown</span>{"\n"}
vagrant destroy               <span className="c-comment"># Delete the VM completely</span>
              </div>

              <div className="use-case">
                <h4>Use Case: Solve "Works on My Machine" — Team Dev Environment</h4>
                <p>Every developer on your team gets the <strong>identical environment</strong> with one command.</p>
                <div className="code-block" style={{marginTop:"0.6rem"}}>
<span className="c-comment"># Vagrantfile — checked into Git</span>{"\n"}
Vagrant.configure(<span className="c-str">"2"</span>) do |config|{"\n"}
{"  "}config.vm.box = <span className="c-str">"ubuntu/focal64"</span>{"\n"}
{"  "}config.vm.network <span className="c-str">"forwarded_port"</span>, guest: 80, host: 8080{"\n\n"}
{"  "}<span className="c-comment"># Auto-install software on first boot</span>{"\n"}
{"  "}config.vm.provision <span className="c-str">"shell"</span>, inline: &lt;&lt;-SHELL{"\n"}
{"    "}apt-get update{"\n"}
{"    "}apt-get install -y nginx nodejs npm{"\n"}
{"  "}SHELL{"\n"}
end{"\n\n"}
<span className="c-comment"># Every team member just runs:</span>{"\n"}
vagrant up{"\n"}
<span className="c-green"># ✅ Everyone gets identical environment!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONFIG MGMT ── */}
        <div id="s3p5">
          <div className="part-title"><span className="part-badge">Part 4 · 60 min</span>Configuration Management</div>
          <p style={{fontSize:"0.9rem",color:"var(--text2)",lineHeight:1.7,marginBottom:"1.1rem"}}>
            Configuration management tools <strong style={{color:"var(--text)"}}>automate the setup and maintenance of servers</strong>. Instead of manually SSH-ing to each server, you write code that configures all of them automatically.
          </p>

          <div className="config-grid">
            {/* Ansible */}
            <div className="config-card">
              <div className="config-header">
                <div className="config-icon" style={{background:"rgba(238,0,0,0.1)"}}>🔴</div>
                <div>
                  <div className="config-name" style={{color:"#EE0000"}}>Ansible</div>
                  <div className="config-meta">Agentless · YAML · Push-based</div>
                </div>
              </div>
              <div className="config-body">
                <div className="code-block">
<span className="c-comment"># Install (Ubuntu)</span>{"\n"}
sudo apt install ansible -y{"\n"}
ansible --version{"\n\n"}
<span className="c-comment"># install_nginx.yml</span>{"\n"}
---{"\n"}
- hosts: webservers{"\n"}
{"  "}become: yes{"\n"}
{"  "}tasks:{"\n"}
{"    "}- name: Install Nginx{"\n"}
{"      "}apt:{"\n"}
{"        "}name: nginx{"\n"}
{"        "}state: present{"\n"}
{"    "}- name: Start Nginx{"\n"}
{"      "}service:{"\n"}
{"        "}name: nginx{"\n"}
{"        "}state: started{"\n\n"}
<span className="c-comment"># Run on all servers:</span>{"\n"}
ansible-playbook install_nginx.yml
                </div>
                <div className="features-list" style={{marginTop:"0.75rem"}}>
                  <h4>Pros</h4>
                  <ul>
                    {["Easy to learn (YAML syntax)","No agent required on servers","Uses SSH — secure by default","Fast to get started (minutes)"].map(p=><li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Puppet */}
            <div className="config-card">
              <div className="config-header">
                <div className="config-icon" style={{background:"rgba(255,174,26,0.1)"}}>🟡</div>
                <div>
                  <div className="config-name" style={{color:"#FFAE1A"}}>Puppet</div>
                  <div className="config-meta">Agent-based · Puppet DSL · Pull-based</div>
                </div>
              </div>
              <div className="config-body">
                <div className="code-block">
<span className="c-comment"># Install Puppet Server (Ubuntu)</span>{"\n"}
wget https://apt.puppet.com/puppet7-release-focal.deb{"\n"}
sudo dpkg -i puppet7-release-focal.deb{"\n"}
sudo apt install puppetserver puppet-agent -y{"\n"}
sudo systemctl start puppetserver{"\n\n"}
<span className="c-comment"># site.pp (manifest)</span>{"\n"}
node <span className="c-str">'webserver'</span> {"{"}{"\n"}
{"  "}package {"{"} <span className="c-str">'nginx'</span>:{"\n"}
{"    "}ensure ={">"} installed,{"\n"}
{"  "}{"}"}{"\n"}
{"  "}service {"{"} <span className="c-str">'nginx'</span>:{"\n"}
{"    "}ensure ={">"} running,{"\n"}
{"    "}enable ={">"} true,{"\n"}
{"  "}{"}"}{"\n"}
{"}"}
                </div>
                <div className="features-list" style={{marginTop:"0.75rem"}}>
                  <h4>Pros</h4>
                  <ul>
                    {["Mature and stable platform","Strong enterprise support","Excellent compliance reporting","Large module library (Forge)"].map(p=><li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Chef */}
            <div className="config-card">
              <div className="config-header">
                <div className="config-icon" style={{background:"rgba(240,152,32,0.1)"}}>🟠</div>
                <div>
                  <div className="config-name" style={{color:"#F09820"}}>Chef</div>
                  <div className="config-meta">Agent-based · Ruby DSL · Pull-based</div>
                </div>
              </div>
              <div className="config-body">
                <div className="code-block">
<span className="c-comment"># Install Chef Workstation (Ubuntu)</span>{"\n"}
wget https://packages.chef.io/files/stable/chef-workstation/21.10.640/ubuntu/20.04/chef-workstation_21.10.640-1_amd64.deb{"\n"}
sudo dpkg -i chef-workstation_*.deb{"\n"}
chef --version{"\n\n"}
<span className="c-comment"># nginx_recipe.rb</span>{"\n"}
package <span className="c-str">'nginx'</span> do{"\n"}
{"  "}action :install{"\n"}
end{"\n\n"}
service <span className="c-str">'nginx'</span> do{"\n"}
{"  "}action [:enable, :start]{"\n"}
end{"\n\n"}
file <span className="c-str">'/var/www/html/index.html'</span> do{"\n"}
{"  "}content <span className="c-str">'&lt;h1&gt;Hello from Chef!&lt;/h1&gt;'</span>{"\n"}
end
                </div>
                <div className="features-list" style={{marginTop:"0.75rem"}}>
                  <h4>Pros</h4>
                  <ul>
                    {["Powerful and flexible","Strong testing framework (Test Kitchen)","Good for compliance automation","Cloud-native features"].map(p=><li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.75rem 0 0.75rem"}}>Ansible vs Puppet vs Chef — Comparison</h3>
          <table className="comp-table">
            <thead>
              <tr><th>Feature</th><th>🔴 Ansible</th><th>🟡 Puppet</th><th>🟠 Chef</th></tr>
            </thead>
            <tbody>
              {configMgmtRows.map(([f,a,p,c])=>(
                <tr key={f}><td>{f}</td><td>{a}</td><td>{p}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>

          {/* Practical demo */}
          <div className="demo-box">
            <h3>🎯 Same Task, Different Tools — Install Nginx on 10 Servers</h3>
            <h4>❌ Manual Way (Traditional)</h4>
            <div className="demo-inner">
              <ol>
                <li>SSH to server 1: <code>ssh user@server1</code></li>
                <li>Run: <code>sudo apt install nginx</code></li>
                <li>Start: <code>sudo systemctl start nginx</code></li>
                <li>Repeat for server 2, 3 … 10</li>
              </ol>
              <p style={{marginTop:"0.75rem"}}><strong>Time: ~30 minutes | Risk: Human error, inconsistency</strong></p>
            </div>
            <h4>✅ With Ansible (2 minutes, zero errors)</h4>
            <div className="code-block">
<span className="c-comment"># inventory.ini — list all 10 servers</span>{"\n"}
[webservers]{"\n"}
server1.example.com{"\n"}
server2.example.com{"\n"}
<span className="c-comment"># ... server3 through server10</span>{"\n\n"}
<span className="c-comment"># playbook.yml</span>{"\n"}
---{"\n"}
- hosts: webservers{"\n"}
{"  "}become: yes{"\n"}
{"  "}tasks:{"\n"}
{"    "}- name: Install &amp; start Nginx{"\n"}
{"      "}apt: {"{"} name: nginx, state: present, update_cache: yes {"}"}{"\n"}
{"    "}- name: Enable Nginx service{"\n"}
{"      "}service: {"{"} name: nginx, state: started, enabled: yes {"}"}{"\n\n"}
<span className="c-comment"># Run on ALL 10 servers simultaneously:</span>{"\n"}
ansible-playbook -i inventory.ini playbook.yml{"\n"}
<span className="c-green"># ✅ Done in ~2 minutes — all servers identical!</span>
            </div>
          </div>
        </div>

        {/* ── TOOL SELECTOR ── */}
        <div id="s3p6">
          <div className="part-title"><span className="part-badge">Guide</span>Tool Selection</div>
          <table className="sel-table">
            <thead>
              <tr><th>Scenario</th><th>Use This Tool</th><th>Why?</th></tr>
            </thead>
            <tbody>
              {toolSelectionRows.map(([s,t,w])=>(
                <tr key={s}><td>{s}</td><td>{t}</td><td>{w}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="key-box">
            <h3>💡 Pro Tip: Combine Tools in Real Workflows</h3>
            <ul>
              <li><strong style={{color:"var(--text)"}}>Development:</strong> Vagrant (local VMs) + Docker (containers)</li>
              <li><strong style={{color:"var(--text)"}}>CI/CD:</strong> Jenkins (automation) + Docker (build environments)</li>
              <li><strong style={{color:"var(--text)"}}>Deployment:</strong> Ansible (server config) + Docker (app deployment)</li>
              <li><strong style={{color:"var(--text)"}}>Infrastructure:</strong> Terraform (provision) + Ansible (configure)</li>
            </ul>
          </div>
        </div>

        {/* ── ACTIVITY ── */}
        <div id="s3p7">
          <div className="activity-box">
            <h3>🎯 Hands-On Lab Activity (20 min)</h3>
            <h4>Lab 1: Jenkins — Create Your First Job</h4>
            <div className="lab-steps">
              <ol>
                <li>Install Jenkins (if not done) and access at <code>http://localhost:8080</code></li>
                <li>Click <strong>"New Item"</strong> → Name it <code>Hello-World</code> → Select <strong>"Freestyle project"</strong></li>
                <li>Under <strong>"Build"</strong> section → Add <strong>"Execute shell"</strong></li>
                <li>Enter: <code>echo "Hello from Jenkins!"</code></li>
                <li>Click <strong>Save</strong> → then <strong>"Build Now"</strong></li>
                <li>Click the build number → <strong>"Console Output"</strong> to verify ✅</li>
              </ol>
            </div>
            <h4>Lab 2: Docker — Run Your First Container</h4>
            <div className="lab-steps">
              <ol>
                <li>Open terminal / command prompt</li>
                <li>Run: <code>docker run -d -p 8080:80 nginx</code></li>
                <li>Open browser → <code>http://localhost:8080</code> → see "Welcome to nginx!"</li>
                <li>List containers: <code>docker ps</code> → copy container ID</li>
                <li>Stop: <code>docker stop [container-id]</code></li>
              </ol>
            </div>
            <h4>Lab 3: Ansible — Configure a Local Server</h4>
            <div className="lab-steps">
              <ol>
                <li>Install Ansible (Linux/WSL): <code>sudo apt install ansible -y</code></li>
                <li>Create <code>playbook.yml</code> with Nginx installation tasks (see code above)</li>
                <li>Create <code>inventory.ini</code> containing just <code>localhost</code></li>
                <li>Run: <code>ansible-playbook -i inventory.ini playbook.yml</code></li>
                <li>Verify: <code>systemctl status nginx</code> → should show active ✅</li>
              </ol>
            </div>
          </div>
        </div>

        {/* ── TAKEAWAYS ── */}
        <div id="s3p8">
          <div className="part-title"><span className="part-badge">Summary</span>Key Takeaways</div>
          <div className="takeaway-grid">
            {[
              { name: "Jenkins", color: "#D33833", icon: "🔧", points: ["CI/CD automation server","1800+ plugins","Pipeline as Code"], useFor: "Automated builds, testing, deployments" },
              { name: "Docker",  color: "#2496ED", icon: "🐳", points: ["Containerisation platform","Lightweight & portable","Consistent environments"], useFor: "App packaging, microservices" },
              { name: "Vagrant", color: "#1563FF", icon: "📦", points: ["VM environment management","Reproducible dev envs","Config as code"], useFor: "Team development setup" },
              { name: "Ansible", color: "#EE0000", icon: "🔴", points: ["Agentless automation","Simple YAML syntax","Fast to learn"], useFor: "Server config, cloud automation" },
              { name: "Puppet",  color: "#FFAE1A", icon: "🟡", points: ["Enterprise-grade","Strong reporting","Mature ecosystem"], useFor: "Large-scale infra, compliance" },
              { name: "Chef",    color: "#F09820", icon: "🟠", points: ["Powerful & flexible","Strong testing","Ruby-based"], useFor: "Complex workflows, cloud-native apps" },
            ].map((t) => (
              <div key={t.name} className="tk-card" style={{borderTop:`3px solid ${t.color}`}}>
                <h3 style={{color:t.color}}>{t.icon} {t.name}</h3>
                <ul>{t.points.map(p=><li key={p}>{p}</li>)}</ul>
                <div className="use-for">Use for: {t.useFor}</div>
              </div>
            ))}
          </div>
          <div className="key-box" style={{marginTop:"1rem"}}>
            <h3>Remember</h3>
            <ul>
              <li><strong style={{color:"var(--text)"}}>No single tool does everything</strong> — DevOps uses a combination</li>
              <li><strong style={{color:"var(--text)"}}>Start simple</strong> — master one tool before moving to the next</li>
              <li><strong style={{color:"var(--text)"}}>Automation is key</strong> — if you do it twice, automate it</li>
              <li><strong style={{color:"var(--text)"}}>Tools evolve</strong> — stay updated with new versions and features</li>
            </ul>
          </div>
        </div>

        {/* ── QUIZ ── */}
        <div id="s3p9" className="quiz-box">
          <h3>🎓 Quick Quiz — Knowledge Check</h3>
          <ul className="quiz-list">
            {quizData.map((item, i) => (
              <li key={i} className="quiz-item">
                <div className="q-num">Q{i+1}</div>
                <div className="q-text">{item.q}</div>
                <div className="q-answer">💡 {item.a.includes("docker") || item.a.includes("ansible") ? <code>{item.a}</code> : item.a}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── HOMEWORK ── */}
        <div id="s3p10" className="hw-box">
          <h3>📝 Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Tool Installation Portfolio:</h4>
            <p>Install all three main tools and document with screenshots:</p>
            <ul>
              <li>Jenkins — show dashboard and first successful job</li>
              <li>Docker — show <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.78rem",background:"var(--surface2)",padding:"0.1rem 0.35rem",borderRadius:"4px"}}>docker ps</code> with a running container</li>
              <li>Ansible/Vagrant — show successful installation + output</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Comparative Analysis:</h4>
            <ul>
              <li>Ansible vs Puppet vs Chef — at least 5 differences</li>
              <li>When would you use Docker vs Vagrant?</li>
              <li>Give 3 real-world use cases for Jenkins</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Practical Exercise — Jenkins Pipeline:</h4>
            <ul>
              <li>Clone any public Git repository</li>
              <li>Create a Jenkins pipeline that builds it</li>
              <li>Take a screenshot of the successful build</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Docker Challenge:</h4>
            <ul>
              <li>Create a simple Python or Node.js "Hello World" app</li>
              <li>Write a Dockerfile to containerise it</li>
              <li>Build and run the container, document all commands used</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>5. Prepare for Module 2:</h4>
            <ul>
              <li>Read about Git branching strategies</li>
              <li>Install Git on your system</li>
              <li>Create a GitHub account if you don't have one</li>
            </ul>
          </div>
        </div>

        {/* ── MODULE COMPLETE BANNER ── */}
        <div className="module-complete">
          <div className="mc-badge">🎉</div>
          <div className="mc-text">
            <h4>Module 1 Complete</h4>
            <p>You've finished all 3 sessions of DevOps Foundations — ready for Module 2!</p>
          </div>
        </div>

        {/* ── NEXT SESSION (MODULE 2) ── */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next · Module 2 · Session 4</h4>
            <h3>Version Control with Git</h3>
            <ul>
              <li>Git fundamentals & 3-Tree Architecture</li>
              <li>Basic operations: Clone, Commit, Push</li>
              <li>GitHub project management</li>
              <li>Advanced: Rebase, Merge, Stash, Branching strategies</li>
            </ul>
          </div>
          <Link href="/courses/dev/session4" className="next-btn">
            Module 2 → Session 4
          </Link>
        </div>

      </div>
    </>
  );
}