// app/courses/dev/session7/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Understand Continuous Integration and why it is essential in modern software teams",
  "Explain what Jenkins is, its origin, and where it fits in the DevOps toolchain",
  "Describe Jenkins Master-Agent architecture and key terminology",
  "Install Jenkins on Linux (Ubuntu), Windows, and via Docker step by step",
  "Complete the Jenkins first-run setup wizard with confidence",
  "Navigate the Jenkins dashboard and understand every UI section",
  "Create, configure, and run a Freestyle build job",
  "Understand all six build trigger types including Poll SCM and Build Periodically",
];

const withoutCI = [
  ["Infrequent integration",  "Developers merge code every few weeks — conflicts are enormous and painful"],
  ["Late bug discovery",      "Bugs found days or weeks after writing — very expensive to trace and fix"],
  ["Manual testing",          "Tests run by hand, inconsistently, sometimes skipped under pressure"],
  ["No build visibility",     "Team has no real-time view of whether the shared codebase actually builds"],
  ["Risky releases",          "Deployments are stressful events where things break unexpectedly"],
  ["Slow feedback loops",     "Developer waits days to learn their commit broke something"],
];

const withCI = [
  ["Every commit triggers build", "Each push to Git starts a build and test run in seconds automatically"],
  ["Instant bug detection",       "Broken builds caught within minutes while the change is fresh in mind"],
  ["Automated testing",           "Same tests run the same way every time — no human inconsistency"],
  ["Dashboard visibility",        "Everyone sees live build health across all branches at a glance"],
  ["Safe frequent releases",      "Releases become small, routine, and low-risk events"],
  ["Fast feedback loops",         "Developer knows in 5 minutes whether their commit is good or broken"],
];

const jenkinsFeatures = [
  ["Free & Open Source",    "No licensing cost, Apache 2.0, massive global community"],
  ["Platform Independent",  "Windows, Linux, macOS, Docker, Kubernetes, cloud VMs"],
  ["1800+ Plugins",         "Plugin for every tool: Git, Maven, Docker, Slack, AWS, Kubernetes"],
  ["Distributed Builds",    "Master-Agent architecture scales from 1 machine to hundreds"],
  ["Pipeline as Code",      "Jenkinsfile stored in Git — your build definition is versioned"],
  ["GIT Integration",       "Native polling and webhook support for GitHub, GitLab, Bitbucket"],
  ["Rich Build History",    "Every build logged: console, test results, artefacts, timing"],
  ["Active Community",      "20+ years of development, millions of active installations"],
];

const terminology = [
  ["Job / Project",  "A configured automated task — build, test, lint, deploy, or any command"],
  ["Build",          "One execution of a Job — has a number, console log, status, and duration"],
  ["Workspace",      "Directory on the Agent where source is checked out and commands run"],
  ["Executor",       "A thread slot on a Node — one executor runs one build at a time"],
  ["Node",           "Any machine in Jenkins — Master or Agent"],
  ["Plugin",         "Extension adding new functionality (Git plugin, Maven plugin, etc.)"],
  ["Jenkinsfile",    "Text file defining a Pipeline job — stored in your Git repository"],
  ["Artefact",       "Output file produced by a build: JAR, WAR, Docker image, report"],
  ["Upstream Job",   "A job that triggers another job when it completes"],
  ["Downstream Job", "A job triggered by a completing upstream job"],
];

const dashboardSections = [
  ["New Item",              "Create jobs, pipelines, multibranch pipelines, folders"],
  ["People",                "All users who have interacted with Jenkins builds"],
  ["Build History",         "Timeline of all recent builds across every job"],
  ["Manage Jenkins",        "System config, global tools, plugins, security, nodes, logs"],
  ["My Views",              "Personal views filtering the job list by criteria"],
  ["Build Queue",           "Jobs waiting for a free executor"],
  ["Build Executor Status", "Live view of what is running on each executor right now"],
];

const triggerTypes = [
  ["Build Now (Manual)",   "User clicks Build Now in the dashboard",                                             "Ad-hoc builds, demos, testing config changes"],
  ["Poll SCM",             "Jenkins checks the Git repo on a cron schedule — builds only if new commits exist", "When webhooks are unavailable"],
  ["Build Periodically",   "Runs on a cron schedule regardless of code changes",                                 "Nightly builds, scheduled reports, cron tasks"],
  ["GitHub Webhook",       "GitHub pushes an event to Jenkins the instant a commit is made",                    "Best practice — zero polling delay"],
  ["Upstream Job Trigger", "Another job finishing triggers this job automatically",                              "Build pipelines, parent-child job chains"],
  ["Remote API Trigger",   "An HTTP call to the Jenkins REST API starts a build",                                "External tools, custom scripts, Slack bots"],
];

const envVars = [
  ["$BUILD_NUMBER", "Incrementing integer 1, 2, 3 … for each run of the job"],
  ["$BUILD_ID",     "Timestamp-based build identifier"],
  ["$JOB_NAME",     "Name of the Jenkins job"],
  ["$WORKSPACE",    "Absolute path to the job workspace directory on the Agent"],
  ["$JENKINS_URL",  "Base URL of this Jenkins instance (e.g. http://localhost:8080/)"],
  ["$GIT_COMMIT",   "Full SHA-1 hash of the Git commit being built"],
  ["$GIT_BRANCH",   "Name of the Git branch being built"],
  ["$BUILD_URL",    "Full URL to this specific build page"],
  ["$NODE_NAME",    "Name of the Node (Agent) running this build"],
];

const quizData = [
  { q: "What does CI stand for and what is its main goal?",
    a: "Continuous Integration — automatically build and test code on every commit so bugs are caught within minutes" },
  { q: "What is Jenkins and who created it originally?",
    a: "Jenkins is an open-source automation server created by Kohsuke Kawaguchi (originally named Hudson at Sun Microsystems in 2004, renamed Jenkins in 2011)" },
  { q: "What is the default port Jenkins listens on?",
    a: "Port 8080" },
  { q: "Where is the initial admin password stored on a Linux Jenkins install?",
    a: "/var/lib/jenkins/secrets/initialAdminPassword" },
  { q: "What is the difference between Poll SCM and Build Periodically?",
    a: "Poll SCM checks Git for new commits before building — skips if nothing changed. Build Periodically runs on schedule regardless of code changes." },
  { q: "What is a Jenkins Executor?",
    a: "A thread slot on a Node — one executor can run exactly one build at a time. A node with 3 executors can run 3 builds in parallel." },
  { q: "What does the H symbol mean in Jenkins cron expressions?",
    a: "H means Hash — Jenkins picks a consistent random value within the range, spreading load across many jobs so they do not all start simultaneously" },
  { q: "Name four types of Jenkins Jobs.",
    a: "Freestyle Project, Pipeline, Multibranch Pipeline, Maven Project, Folder, External Job" },
];

const takeaways = [
  ["CI/CD",              "Automate build, test, and deploy on every code commit"],
  ["Jenkins",            "Open-source automation server, 1800+ plugins, free"],
  ["Master-Agent",       "Master coordinates; Agents execute — scales to any size"],
  ["Job",                "A configured automated task Jenkins runs"],
  ["Build",              "One execution of a Job with its own log and status"],
  ["Workspace",          "Directory where Jenkins checks out code and runs commands"],
  ["Poll SCM",           "Check Git on schedule, build only if changes found"],
  ["Build Periodically", "Build on schedule regardless of code changes"],
];

export default function Session7() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s7-page {
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
          width: 100%;          /* ← was missing */
  overflow-x: hidden;
        }

        /* ── Breadcrumb ── */
        .breadcrumb { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); margin-bottom: 2rem; }
        .breadcrumb a { color: var(--text2); text-decoration: none; transition: color 0.2s; }
        .breadcrumb a:hover { color: var(--accent); }
        .breadcrumb .sep { color: var(--border2); }
        .breadcrumb .current { color: var(--text); }

        /* ── Prev/Next ── */
        .nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
        .nav-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); transition: all 0.2s; white-space: nowrap; }
        .nav-btn:hover { color: var(--text); border-color: var(--border2); }

        /* ── Hero ── */
        .hero {
          border-radius: 20px;
          background: linear-gradient(135deg, #1a0505 0%, #c0392b 55%, #e74c3c 100%);
          padding: 2.5rem 2rem; margin-bottom: 2rem;
          position: relative; overflow: hidden;
        }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px; }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .h-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-mod   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-new   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,215,0,0.2); border: 1px solid rgba(255,215,0,0.4); color: #FFD700; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-dur   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem; }
        .hero h1 { font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem; }
        .hero p  { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        /* ── Jump nav ── */
        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jpill { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; padding: 0.3rem 0.8rem; border-radius: 100px; border: 1px solid var(--border); background: var(--surface2); color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
        .jpill:hover { color: var(--text); border-color: var(--border2); }
        .jpill.active { background: linear-gradient(135deg,#c0392b,#e74c3c); color: #fff; border-color: transparent; }

        /* ── Section title ── */
        .pt { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text); margin: 2.5rem 0 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .pt::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .pt-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(135deg,#c0392b,#e74c3c); color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }

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
        .tip-box { background: rgba(192,57,43,0.07); border-left: 3px solid #c0392b; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .tip-box h4 { font-size: 0.82rem; font-weight: 700; color: #c0392b; margin-bottom: 0.5rem; }
        .tip-box p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .tip-box ul { list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .tip-box li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }
        .tip-box li::before { content: '→'; color: #c0392b; flex-shrink: 0; font-size: 0.75rem; margin-top: 1px; }
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
        .warn-box li::before { content: '⚠'; flex-shrink: 0; font-size: 0.72rem; color: #dc3545; }
        .warn-box strong { color: var(--text); }
        .warn-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        /* ── Code block ── */
        .cb { background: #0d1117; color: #e6edf3; padding: 1.25rem; border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; line-height: 1.9; overflow-x: auto; margin: 0.75rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .c-cm  { color: #8b949e; }
        .c-cmd { color: #79c0ff; font-weight: 600; }
        .c-out { color: #a5d6ff; }
        .c-ok  { color: #56d364; }
        .c-err { color: #ff7b72; }

        /* ── Feature cards grid ── */
        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin: 1.25rem 0; }
        @media(max-width:560px){ .feat-grid { grid-template-columns: 1fr; } }
        .feat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.85rem 1rem; display: flex; gap: 0.6rem; align-items: flex-start; }
        .feat-icon { color: #c0392b; font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
        .feat-card strong { font-size: 0.84rem; color: var(--text); display: block; margin-bottom: 0.12rem; }
        .feat-card span { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Compare grid ── */
        .cmp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin: 1.25rem 0; }
        @media(max-width:560px){ .cmp-grid { grid-template-columns: 1fr; } }
        .cmp-card { border-radius: 12px; padding: 1.1rem; border: 1px solid; }
        .cmp-card.bad  { background: rgba(220,53,69,0.04); border-color: rgba(220,53,69,0.2); }
        .cmp-card.good { background: rgba(39,174,96,0.04); border-color: rgba(39,174,96,0.2); }
        .cmp-card h4 { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; margin-bottom: 0.75rem; }
        .cmp-card.bad  h4 { color: #dc3545; }
        .cmp-card.good h4 { color: #27ae60; }
        .cmp-rows { display: flex; flex-direction: column; gap: 0.5rem; }
        .cmp-row { display: flex; gap: 0.5rem; align-items: flex-start; }
        .cmp-icon { flex-shrink: 0; font-size: 0.72rem; margin-top: 2px; }
        .cmp-title { font-size: 0.78rem; font-weight: 700; color: var(--text); display: block; line-height: 1.4; }
        .cmp-desc  { font-size: 0.73rem; color: var(--text2); line-height: 1.45; }

        /* ── CI pipeline steps ── */
        .gh-steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.65rem; margin: 1.25rem 0; }
        @media(max-width:640px){ .gh-steps { grid-template-columns: repeat(2,1fr); } }
        .gh-step { background: linear-gradient(135deg,#c0392b 0%,#922b21 100%); border-radius: 12px; padding: 1.1rem 0.9rem; text-align: center; }
        .gh-step .gh-num { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.2); color: #fff; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.6rem; }
        .gh-step h4 { font-size: 0.8rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem; }
        .gh-step p  { font-size: 0.72rem; color: rgba(255,255,255,0.75); line-height: 1.45; }

        /* ── Workflow numbered steps ── */
        .workflow { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0; position: relative; }
        .workflow::before { content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 2px; background: var(--border); z-index: 0; }
        .wf-step { display: flex; align-items: flex-start; gap: 0.85rem; padding: 0.9rem 1rem; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); position: relative; z-index: 1; transition: border-color 0.2s; }
        .wf-step:hover { border-color: var(--border2); }
        .wf-num { width: 28px; height: 28px; border-radius: 8px; background: #c0392b; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; flex-shrink: 0; }
        .wf-content { display: flex; flex-direction: column; gap: 0.2rem; width: 100%; }
        .wf-content strong { font-size: 0.88rem; color: var(--text); }
        .wf-content p { font-size: 0.8rem; color: var(--text2); line-height: 1.5; }
        .wf-content code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        /* ── Architecture ── */
        .arch { display: flex; flex-direction: column; align-items: center; gap: 0; margin: 1.5rem 0; width: 100%; }
        .arch-master { width: 100%; border-radius: 14px; padding: 1.1rem 1.4rem; background: rgba(192,57,43,0.06); border: 2px solid #c0392b; box-sizing: border-box; }
        .arch-master h4 { font-size: 0.9rem; font-weight: 800; color: #c0392b; margin-bottom: 0.4rem; }
        .arch-master p  { font-size: 0.8rem; color: var(--text2); line-height: 1.5; margin-bottom: 0.5rem; }
        .arch-master ul { list-style: none; display: flex; flex-direction: column; gap: 0.22rem; }
        .arch-master li { font-size: 0.78rem; color: var(--text2); display: flex; gap: 0.4rem; }
        .arch-master li::before { content: '•'; color: #c0392b; flex-shrink: 0; }
        .arch-arrow { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0; letter-spacing: 0.06em; width: 100%; }
        .arch-arrow::before, .arch-arrow::after { content: ''; flex: 1; max-width: 80px; height: 1px; background: var(--border); }
        .arch-agents { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.5rem; width: 100%; }
        @media(max-width:560px){ .arch-agents { grid-template-columns: 1fr; } }
        .arch-agent { border-radius: 12px; padding: 0.85rem 1rem; background: rgba(3,102,214,0.06); border: 2px solid #0366d6; }
        .arch-agent h4 { font-size: 0.8rem; font-weight: 700; color: #0366d6; margin-bottom: 0.25rem; }
        .arch-agent p  { font-size: 0.74rem; color: var(--text2); line-height: 1.45; }
        .arch-ws { width: 100%; border-radius: 12px; padding: 0.9rem 1.2rem; background: rgba(39,174,96,0.06); border: 2px solid #27ae60; box-sizing: border-box; }
        .arch-ws h4 { font-size: 0.85rem; font-weight: 700; color: #27ae60; margin-bottom: 0.35rem; }
        .arch-ws ul { list-style: none; display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .arch-ws li { font-size: 0.75rem; color: var(--text2); background: var(--surface); border: 1px solid var(--border); padding: 0.2rem 0.55rem; border-radius: 6px; }

        /* ── Activity / Lab ── */
        .act-box { background: linear-gradient(135deg,#1a0505 0%,#c0392b 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .act-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .act-box h4 { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 1.1rem 0 0.5rem; }
        .lab-ol { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; padding: 1rem 1rem 1rem 2rem; margin-bottom: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .lab-ol li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.55; }
        .lab-ol li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }
        .lab-ol li strong { color: #fff; }
        .lab-ol li ul { margin-top: 0.3rem; padding-left: 1.2rem; }

        /* ── Quiz ── */
        .quiz-box { background: linear-gradient(135deg,rgba(192,57,43,0.08),rgba(231,76,60,0.08)); border: 1px solid rgba(192,57,43,0.2); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .quiz-box h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.25rem; }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .qi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.9rem 1rem; }
        .qi-n { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #c0392b; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
        .qi-q { font-size: 0.88rem; font-weight: 600; color: var(--text); }
        .qi-a { font-size: 0.82rem; color: var(--text2); font-style: italic; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--border); }

        /* ── Homework ── */
        .hw-box { background: rgba(255,193,7,0.06); border: 1px solid rgba(255,193,7,0.2); border-radius: 14px; padding: 1.5rem; margin: 1.5rem 0; }
        .hw-box h3 { font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; }
        .hw-task { margin-bottom: 0.85rem; }
        .hw-task h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; }
        .hw-task p  { font-size: 0.82rem; color: var(--text2); line-height: 1.55; margin-bottom: 0.4rem; }
        .hw-task ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; padding-left: 0.5rem; }
        .hw-task li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.4rem; }
        .hw-task li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }
        .hw-task li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.35rem; border-radius: 4px; color: var(--accent); }
        .hw-task li ul { padding-left: 1rem; margin-top: 0.25rem; }

        /* ── Takeaways ── */
        .tk-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 0.65rem; margin: 1rem 0; }
        .tk-card { background: var(--surface); border: 1px solid var(--border); border-top: 3px solid #c0392b; border-radius: 12px; padding: 0.9rem 1rem; }
        .tk-card h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; font-family: 'JetBrains Mono', monospace; }
        .tk-card p  { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Flow pill ── */
        .flow-pill { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.5rem; margin: 1.25rem 0; }
        .fp { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text); background: var(--surface); border: 1px solid var(--border); padding: 0.45rem 0.9rem; border-radius: 8px; }
        .fp-arrow { color: var(--muted); font-size: 0.9rem; }

        /* ── Rules box ── */
        .rules-box { background: rgba(192,57,43,0.05); border: 1px solid rgba(192,57,43,0.2); border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0; }
        .rules-box h4 { font-size: 0.85rem; font-weight: 700; color: #c0392b; margin-bottom: 0.65rem; }
        .rules-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .rules-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .rules-box li::before { content: '✓'; color: #c0392b; flex-shrink: 0; font-weight: 700; }

        /* ── Next card ── */
        .next-card { background: linear-gradient(135deg,#1a3a2a 0%,#27ae60 100%); border-radius: 16px; padding: 1.75rem; margin-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .next-text h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem; }
        .next-text h3 { font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .next-text ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .next-text li { font-size: 0.83rem; color: rgba(255,255,255,0.8); display: flex; gap: 0.5rem; }
        .next-text li::before { content: '→'; color: rgba(255,255,255,0.6); flex-shrink: 0; }
        .next-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 700; color: #27ae60; background: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.5rem; transition: opacity 0.2s, transform 0.2s; }
        .next-btn:hover { opacity: 0.9; transform: translateX(3px); }

        @media(max-width:640px){
          .s7-page { padding: 2rem 1rem 4rem; }
          .nav-row { flex-direction: column; }
          .nav-btn { width: 100%; justify-content: center; }
          .hero { padding: 1.5rem 1rem; border-radius: 14px; }
          .next-card { flex-direction: column; align-items: stretch; }
          .next-btn { width: 100%; justify-content: center; }
          .jump-nav { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 0.4rem; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .jump-nav::-webkit-scrollbar { display: none; }
          .jpill { flex-shrink: 0; }
          .act-box { padding: 1.25rem 1rem; }
          .lab-ol { padding: 0.85rem 0.85rem 0.85rem 1.75rem; }
        }
      `}</style>

      <div className="s7-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link>
          <span className="sep">/</span>
          <span className="current">Session 7: Introduction to Jenkins &amp; CI/CD</span>
        </div>

        {/* Prev / Next */}
        <div className="nav-row">
          <Link href="/courses/dev/session6" className="nav-btn">&larr; Session 6: Advanced GIT</Link>
          <Link href="/courses/dev/session8" className="nav-btn">Session 8: Configuring Jenkins &rarr;</Link>
        </div>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 7 of 15</span>
            <span className="h-mod">Module 3 &mdash; Continuous Integration</span>
            <span className="h-new">&#127381; New Module</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~3.5 hrs
            </span>
          </div>
          <h1>&#9881; Introduction to Jenkins &amp; CI/CD</h1>
          <p>From zero to your first automated build &mdash; understand Continuous Integration, install Jenkins, and create your first job.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","What is CI","CI vs CD","Jenkins","Architecture","Installation","Setup Wizard","Dashboard","First Job","Triggers","Lab","Quiz","Homework"].map((l, i) => (
            <a key={i} href={`#s7p${i}`} className={`jpill${i === 0 ? " active" : ""}`}>{l}</a>
          ))}
        </div>

        {/* ── OBJECTIVES ── */}
        <div id="s7p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o, i) => (
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* ── WHAT IS CI ── */}
        <div id="s7p1">
          <div className="pt"><span className="pt-badge">Foundation</span>What is Continuous Integration?</div>
          <p className="body-text">
            <strong>Continuous Integration (CI)</strong> is a software development practice where every developer merges code changes into a shared repository <strong>frequently</strong> &mdash; typically multiple times per day. Each merge automatically triggers a <strong>build and test pipeline</strong> so problems are discovered within minutes rather than days or weeks.
          </p>

          <div className="ex-box">
            <div className="ex-label">&#127916; Real-World Scenario</div>
            <p><strong>Without CI:</strong> Five developers each work in isolation for two weeks. On Friday they all try to merge. The result is enormous conflicts, hours of manual testing, and broken builds. The release is delayed.</p>
            <p><strong>With CI:</strong> Each developer commits small changes every few hours. Jenkins automatically builds and tests each commit in 5 minutes. Conflicts are tiny and caught immediately. Friday release goes smoothly.</p>
          </div>

          <div className="cmp-grid">
            <div className="cmp-card bad">
              <h4>&#10060; Without CI</h4>
              <div className="cmp-rows">
                {withoutCI.map(([title, desc]) => (
                  <div key={title} className="cmp-row">
                    <span className="cmp-icon">&#10060;</span>
                    <div><span className="cmp-title">{title}</span><span className="cmp-desc">{desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cmp-card good">
              <h4>&#10004; With CI</h4>
              <div className="cmp-rows">
                {withCI.map(([title, desc]) => (
                  <div key={title} className="cmp-row">
                    <span className="cmp-icon">&#10004;</span>
                    <div><span className="cmp-title">{title}</span><span className="cmp-desc">{desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tip-box">
            <h4>&#128161; The Core CI Principle</h4>
            <p><strong>&quot;Integrate early, integrate often.&quot;</strong> The smaller and more frequent the integration, the smaller the risk. CI does not prevent bugs &mdash; it makes them visible immediately while they are cheap and easy to fix.</p>
          </div>
        </div>

        {/* ── CI vs CD ── */}
        <div id="s7p2">
          <div className="pt"><span className="pt-badge">Concepts</span>CI vs CD &mdash; The Full Pipeline</div>
          <p className="body-text">CI/CD automates the entire journey from code commit to production. Each stage builds on the previous one.</p>

          <div className="gh-steps">
            {[
              {label:"Code",    sub:"Dev writes & commits"},
              {label:"Build",   sub:"Compile & package"},
              {label:"Test",    sub:"Automated test suite"},
              {label:"Deploy",  sub:"Ship to staging/prod"},
            ].map((step, i) => (
              <div key={i} className="gh-step">
                <div className="gh-num">{i + 1}</div>
                <h4>{step.label}</h4>
                <p>{step.sub}</p>
              </div>
            ))}
          </div>

          <div className="feat-grid">
            {[
              ["Continuous Integration",  "Build + Unit Tests + Static Analysis on every commit"],
              ["Continuous Delivery",     "All of CI + Integration Tests + automated staging deploy"],
              ["Continuous Deployment",   "All of CD + automatic production deploy on every green build"],
            ].map(([title, desc]) => (
              <div key={title} className="feat-card">
                <span className="feat-icon">&#9654;</span>
                <div><strong>{title}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <h4>&#128161; Key Insight</h4>
            <ul>
              <li><strong>CI</strong> &mdash; integrates code continuously and verifies it builds and passes tests</li>
              <li><strong>CD (Delivery)</strong> &mdash; adds automated staging deployment; a human still clicks to release to production</li>
              <li><strong>CD (Deployment)</strong> &mdash; removes that human click; every green build ships to production automatically</li>
            </ul>
          </div>
        </div>

        {/* ── WHAT IS JENKINS ── */}
        <div id="s7p3">
          <div className="pt"><span className="pt-badge">Tool</span>What is Jenkins?</div>
          <p className="body-text">
            <strong>Jenkins</strong> is the world&apos;s most widely used open-source automation server. Originally created as <strong>Hudson</strong> by Kohsuke Kawaguchi at Sun Microsystems in 2004, it was renamed Jenkins in 2011. Jenkins orchestrates the entire CI/CD pipeline &mdash; watching your repository, triggering builds, running tests, and reporting results automatically.
          </p>

          <div className="feat-grid">
            {jenkinsFeatures.map(([title, desc]) => (
              <div key={title} className="feat-card">
                <span className="feat-icon">&#9881;</span>
                <div><strong>{title}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <h4>&#128161; Jenkins vs Other CI/CD Tools</h4>
            <ul>
              <li><strong>Jenkins</strong> &mdash; self-hosted, your infrastructure, free, fully customisable, 1800+ plugins</li>
              <li><strong>GitHub Actions</strong> &mdash; cloud-native, tight GitHub integration, YAML-based, free for public repos</li>
              <li><strong>GitLab CI/CD</strong> &mdash; built into GitLab, excellent for monorepos and enterprise</li>
              <li><strong>CircleCI / Travis CI</strong> &mdash; SaaS, quick setup, pay-per-build-minute</li>
            </ul>
            <p style={{marginTop:"0.5rem"}}>Jenkins is preferred in enterprise because it runs <strong>on your own infrastructure</strong> with no vendor lock-in and no data leaving your network.</p>
          </div>
        </div>

        {/* ── ARCHITECTURE ── */}
        <div id="s7p4">
          <div className="pt"><span className="pt-badge">Architecture</span>Jenkins Master-Agent Architecture</div>
          <p className="body-text">
            Jenkins uses a <strong>Master (Controller) &ndash; Agent</strong> architecture. The Master manages everything; Agents do the actual build work. This design scales from a single laptop to thousands of build machines.
          </p>

          <div className="arch">
            <div className="arch-master">
              <h4>&#127381; Jenkins Master (Controller)</h4>
              <p>The central brain. You interact with it in your browser at port 8080.</p>
              <ul>
                <li>Hosts the Jenkins web UI and REST API</li>
                <li>Stores all job configuration, credentials, and build history</li>
                <li>Schedules jobs and monitors all triggers</li>
                <li>Dispatches jobs to available Agents based on labels</li>
                <li>Collects results, displays console logs, sends notifications</li>
                <li>Manages plugin installation and system-wide configuration</li>
              </ul>
            </div>
            <div className="arch-arrow">&#8595;&nbsp;Dispatches builds via SSH or JNLP (port 50000)&nbsp;&#8595;</div>
            <div className="arch-agents">
              {[
                {label:"Agent 1", sub:"Linux node",   detail:"Java / Maven / shell"},
                {label:"Agent 2", sub:"Windows node", detail:".NET / MSBuild"},
                {label:"Agent 3", sub:"Docker agent", detail:"Containerised builds"},
              ].map((a) => (
                <div key={a.label} className="arch-agent">
                  <h4>&#127381; {a.label}</h4>
                  <p>{a.sub}<br/><span style={{fontSize:"0.7rem",color:"var(--muted)"}}>{a.detail}</span></p>
                </div>
              ))}
            </div>
            <div className="arch-arrow">&#8595;&nbsp;Executes in workspace, streams logs to Master&nbsp;&#8595;</div>
            <div className="arch-ws">
              <h4>&#128228; Build Workspace &amp; Output</h4>
              <ul>
                <li>Source code (cloned from Git)</li>
                <li>Compiled classes &amp; artefacts</li>
                <li>Test reports (JUnit XML)</li>
                <li>Console log (sent to Master)</li>
              </ul>
            </div>
          </div>

          <div className="sub-h">Essential Jenkins Terminology</div>
          <div className="feat-grid">
            {terminology.map(([term, def]) => (
              <div key={term} className="feat-card">
                <span className="feat-icon">&#128280;</span>
                <div><strong>{term}</strong><span>{def}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* ── INSTALLATION ── */}
        <div id="s7p5">
          <div className="pt"><span className="pt-badge">Setup</span>Installing Jenkins</div>

          <div className="tip-box">
            <h4>&#128161; Prerequisites &mdash; Check Before Installing</h4>
            <ul>
              <li><strong>Java 11 or 17</strong> must be installed &mdash; Jenkins is a Java app and will not start without it</li>
              <li>Minimum <strong>256 MB RAM</strong> (1 GB+ recommended for real projects)</li>
              <li>At least <strong>1 GB free disk space</strong> (more for build artefacts and workspaces)</li>
              <li>Port <strong>8080</strong> available for the web UI</li>
              <li>Port <strong>50000</strong> available if you plan to connect Agent nodes via JNLP</li>
            </ul>
          </div>

          <div className="sub-h">&#128228; Option 1 &mdash; Linux / Ubuntu (Recommended)</div>
          <div className="cb">
<span className="c-cm"># Step 1: Install Java 17</span>{"\n"}
sudo apt update{"\n"}
sudo apt install -y openjdk-17-jdk{"\n"}
java -version{"\n"}
<span className="c-ok">openjdk version "17.0.10" 2024-01-16</span>{"\n\n"}
<span className="c-cm"># Step 2: Add Jenkins GPG key and repository</span>{"\n"}
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key \{"\n"}
  | sudo tee /usr/share/keyrings/jenkins-keyring.asc {">"} /dev/null{"\n\n"}
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \{"\n"}
  https://pkg.jenkins.io/debian-stable binary/" \{"\n"}
  | sudo tee /etc/apt/sources.list.d/jenkins.list {">"} /dev/null{"\n\n"}
<span className="c-cm"># Step 3: Install and start Jenkins</span>{"\n"}
sudo apt update && sudo apt install -y jenkins{"\n"}
sudo systemctl enable jenkins && sudo systemctl start jenkins{"\n"}
<span className="c-ok">Active: active (running)</span>{"\n\n"}
<span className="c-cm"># Step 4: Get the initial admin password</span>{"\n"}
sudo cat /var/lib/jenkins/secrets/initialAdminPassword{"\n"}
<span className="c-out">a3f2b1c4d5e6f7a8b9c0d1e2f3a4b5c6</span>
          </div>

          <div className="sub-h">&#127381; Option 2 &mdash; Windows</div>
          <div className="workflow">
            {[
              {n:"1", t:"Install Java 17",            b:"Download JDK 17 from adoptium.net, run the installer. Verify: open Command Prompt and run java -version"},
              {n:"2", t:"Download Jenkins MSI",       b:"Go to jenkins.io/download, click Windows, download the .msi installer file"},
              {n:"3", t:"Run the installer",          b:"Double-click the .msi, click Next, choose install directory, click Install"},
              {n:"4", t:"Jenkins starts as a Service",b:"Jenkins installs as a Windows Service that starts automatically on boot. Browser opens to http://localhost:8080"},
              {n:"5", t:"Find initial admin password",b:"File: C:\\ProgramData\\Jenkins\\.jenkins\\secrets\\initialAdminPassword — open and copy the password"},
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-content"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="sub-h">&#128010; Option 3 &mdash; Docker (Quickest)</div>
          <div className="cb">
<span className="c-cm"># Pull and run Jenkins LTS in one command</span>{"\n"}
docker run -d \{"\n"}
  --name jenkins \{"\n"}
  -p 8080:8080 -p 50000:50000 \{"\n"}
  -v jenkins_home:/var/jenkins_home \{"\n"}
  jenkins/jenkins:lts-jdk17{"\n\n"}
<span className="c-cm"># Get the initial admin password</span>{"\n"}
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword{"\n"}
<span className="c-out">a3f2b1c4d5e6f7a8b9c0d1e2f3a4b5c6</span>{"\n\n"}
<span className="c-cm"># Open browser: http://localhost:8080</span>
          </div>
        </div>

        {/* ── SETUP WIZARD ── */}
        <div id="s7p6">
          <div className="pt"><span className="pt-badge">First Run</span>Initial Setup Wizard</div>
          <p className="body-text">The first time you open Jenkins at <code>http://localhost:8080</code>, a one-time setup wizard guides you through initial configuration.</p>

          <div className="workflow">
            {[
              {n:"1", t:"Unlock Jenkins",               b:"Paste the initialAdminPassword you copied during installation. Click Continue."},
              {n:"2", t:"Choose plugin installation",    b:"Two options: (A) Install suggested plugins — recommended, installs ~25 essential plugins. (B) Select plugins to install — advanced, pick only what you need."},
              {n:"3", t:"Plugin download and install",   b:"Jenkins downloads and installs each plugin. A progress bar shows each plugin name. Takes 2–5 minutes. Do not close the browser."},
              {n:"4", t:"Create first Admin User",       b:"Fill in: Username, Password, Full name, Email address. Click Save and Continue."},
              {n:"5", t:"Instance Configuration — URL",  b:"Confirm the Jenkins URL. Default is http://localhost:8080/ — leave as-is for local setups. Click Save and Finish."},
              {n:"6", t:"Jenkins is ready!",             b:"Click Start using Jenkins. The main dashboard loads. Jenkins is fully configured and ready for jobs."},
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-content"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <h4>&#128161; What Suggested Plugins Include</h4>
            <ul>
              <li><strong>Git plugin</strong> &mdash; clone repositories and detect new commits</li>
              <li><strong>Pipeline</strong> &mdash; Jenkinsfile-based declarative and scripted pipelines</li>
              <li><strong>GitHub Integration</strong> &mdash; webhook support, PR builds, commit status checks</li>
              <li><strong>Maven Integration</strong> &mdash; build Java/Maven projects natively</li>
              <li><strong>Email Extension</strong> &mdash; send pass/fail build email notifications</li>
              <li><strong>Credentials Binding</strong> &mdash; securely inject passwords/tokens into builds</li>
            </ul>
          </div>
        </div>

        {/* ── DASHBOARD ── */}
        <div id="s7p7">
          <div className="pt"><span className="pt-badge">Navigation</span>Jenkins Dashboard Tour</div>
          <p className="body-text">The Jenkins dashboard is your control centre. Knowing every section makes you productive from day one.</p>

          <div className="feat-grid">
            {dashboardSections.map(([section, desc]) => (
              <div key={section} className="feat-card">
                <span className="feat-icon">&#128279;</span>
                <div><strong>{section}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="sub-h">Build Status Ball Colours</div>
          <div className="cb">
<span className="c-ok">● Blue / Green</span>   — Last build PASSED — all steps succeeded{"\n"}
<span className="c-err">● Red</span>            — Last build FAILED — a step returned non-zero exit code{"\n"}
<span className="c-out">● Yellow</span>        — Last build UNSTABLE — compiled but test failures detected{"\n"}
<span className="c-cm">● Grey</span>           — Never built yet, or the last build was aborted{"\n"}
<span className="c-out">● Animated blue</span> — Build is currently RUNNING right now
          </div>

          <div className="sub-h">Key URLs to Bookmark</div>
          <div className="cb">
<span className="c-cm"># Dashboard</span>{"\n"}
http://localhost:8080/{"\n\n"}
<span className="c-cm"># A specific job</span>{"\n"}
http://localhost:8080/job/my-job/{"\n\n"}
<span className="c-cm"># Console log for build #42</span>{"\n"}
http://localhost:8080/job/my-job/42/console{"\n\n"}
<span className="c-cm"># REST API (JSON)</span>{"\n"}
http://localhost:8080/api/json
          </div>
        </div>

        {/* ── FIRST JOB ── */}
        <div id="s7p8">
          <div className="pt"><span className="pt-badge">Hands-on</span>Creating Your First Freestyle Job</div>
          <p className="body-text">
            A <strong>Freestyle Job</strong> is Jenkins&apos; most basic job type. Everything is configured through the web UI &mdash; no code files needed.
          </p>

          <div className="workflow">
            {[
              {n:"1", t:"Click New Item on the dashboard",   b:"From the Jenkins dashboard left sidebar, click New Item."},
              {n:"2", t:"Name and choose job type",          b:"Enter name: hello-world-job (no spaces — use hyphens). Click Freestyle project. Click OK."},
              {n:"3", t:"Add a description",                 b:'Enter: "My first Jenkins Freestyle job". Check Discard old builds, set Max # to keep = 10.'},
              {n:"4", t:"Add a Build Step",                  b:"Scroll to Build Steps. Click Add build step. Choose Execute shell. Paste the script shown below."},
              {n:"5", t:"Save and Build Now",                b:"Click Save at the bottom. Then click Build Now in the left sidebar. Build #1 appears in Build History."},
              {n:"6", t:"View Console Output",               b:"Click #1 in Build History. Click Console Output. Watch every command and its output scroll in real time."},
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-content"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="sub-h">Shell Script for the Build Step</div>
          <div className="cb">
<span className="c-cm">#!/bin/bash</span>{"\n"}
echo "Job Name     : $JOB_NAME"{"\n"}
echo "Build Number : $BUILD_NUMBER"{"\n"}
echo "Workspace    : $WORKSPACE"{"\n"}
echo "Node Name    : $NODE_NAME"{"\n\n"}
echo "[1/3] Checking Java version..."{"\n"}
java -version{"\n\n"}
echo "[2/3] Creating build output file..."{"\n"}
echo "Build $BUILD_NUMBER at $(date)" {">"} build-output.txt{"\n"}
cat build-output.txt{"\n\n"}
echo "[3/3] Done! Build succeeded."{"\n"}
<span className="c-ok">exit 0</span>
          </div>

          <div className="sub-h">Built-in Jenkins Environment Variables</div>
          <div className="feat-grid">
            {envVars.map(([varName, desc]) => (
              <div key={varName} className="feat-card">
                <span className="feat-icon">$</span>
                <div><strong>{varName}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRIGGERS ── */}
        <div id="s7p9">
          <div className="pt"><span className="pt-badge">Automation</span>Build Triggers &mdash; How Builds Start</div>
          <p className="body-text">
            A <strong>build trigger</strong> defines what event causes Jenkins to start a new build. Choosing the right trigger is essential for a responsive, efficient CI pipeline.
          </p>

          <div className="feat-grid">
            {triggerTypes.map(([trigger, how, bestFor]) => (
              <div key={trigger} className="feat-card">
                <span className="feat-icon">&#9654;</span>
                <div>
                  <strong>{trigger}</strong>
                  <span>{how}</span>
                  <span style={{display:"block", fontSize:"0.71rem", color:"var(--muted)", marginTop:"0.25rem"}}>Best for: {bestFor}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sub-h">Cron Expression Syntax</div>
          <div className="cb">
<span className="c-cm"># Cron field order: MINUTE  HOUR  DAY-OF-MONTH  MONTH  DAY-OF-WEEK</span>{"\n"}
<span className="c-cm"># H = Hash — Jenkins picks a consistent random value to spread load</span>{"\n\n"}
<span className="c-out">H/5 * * * *</span>      <span className="c-cm"># Every 5 minutes</span>{"\n"}
<span className="c-out">H * * * *</span>        <span className="c-cm"># Once per hour</span>{"\n"}
<span className="c-out">H 2 * * *</span>        <span className="c-cm"># Every day at 2 AM</span>{"\n"}
<span className="c-out">H 2 * * 1-5</span>      <span className="c-cm"># Every weekday (Mon-Fri) at 2 AM</span>{"\n"}
<span className="c-out">@daily</span>           <span className="c-cm"># Shorthand for H H * * *</span>{"\n"}
<span className="c-out">@hourly</span>          <span className="c-cm"># Shorthand for H * * * *</span>
          </div>

          <div className="tip-box">
            <h4>&#128161; Poll SCM vs Build Periodically &mdash; Critical Difference</h4>
            <ul>
              <li><strong>Poll SCM:</strong> Jenkins checks the Git repository at the interval. If there are new commits, it starts a build. If nothing changed, it skips silently.</li>
              <li><strong>Build Periodically:</strong> Jenkins builds on schedule <em>regardless</em> of whether any code changed. Useful for nightly test runs.</li>
              <li><strong>Webhook (best practice):</strong> GitHub calls Jenkins the instant a push happens. Zero delay, zero missed commits.</li>
            </ul>
          </div>
        </div>

        {/* ── LAB ── */}
        <div id="s7p10">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 &mdash; Install Jenkins and Complete Setup</h4>
            <ol className="lab-ol">
              <li>Choose your platform: Ubuntu VM (recommended), Windows, or Docker</li>
              <li>Install Java 17: <code>sudo apt install -y openjdk-17-jdk</code> then verify with <code>java -version</code></li>
              <li>Follow the full platform-specific installation steps above</li>
              <li>Open <code>http://localhost:8080</code> and confirm the Unlock screen appears</li>
              <li>Choose <strong>Install suggested plugins</strong> and wait for completion</li>
              <li>Create your admin user and click <strong>Start using Jenkins</strong></li>
            </ol>

            <h4>Lab 2 &mdash; Create and Run Your First Job</h4>
            <ol className="lab-ol">
              <li>Click <strong>New Item</strong> &rarr; name: <code>hello-world-job</code> &rarr; <strong>Freestyle project</strong> &rarr; OK</li>
              <li>Scroll to <strong>Build Steps</strong> &rarr; <strong>Add build step</strong> &rarr; <strong>Execute shell</strong></li>
              <li>Paste the shell script from the example above</li>
              <li>Click <strong>Save</strong> &rarr; click <strong>Build Now</strong></li>
              <li>Click <strong>#1</strong> in Build History &rarr; click <strong>Console Output</strong></li>
              <li>Verify <code>Finished: SUCCESS</code> appears at the bottom</li>
              <li>Build the job 4 more times &mdash; observe the build number incrementing</li>
            </ol>

            <h4>Lab 3 &mdash; Configure a Scheduled Trigger</h4>
            <ol className="lab-ol">
              <li>Open <code>hello-world-job</code> &rarr; click <strong>Configure</strong></li>
              <li>Scroll to <strong>Build Triggers</strong> &rarr; check <strong>Build periodically</strong></li>
              <li>Enter <code>H/1 * * * *</code> (every minute) &rarr; click <strong>Save</strong></li>
              <li>Wait 3 minutes &mdash; watch builds appear automatically in Build History</li>
              <li>Go back to Configure &rarr; <strong>uncheck Build periodically</strong> &rarr; Save to stop auto-builds</li>
            </ol>

            <h4>Challenge &mdash; Simulate a Full CI Pipeline</h4>
            <ol className="lab-ol">
              <li>Create a new job: <code>ci-pipeline-sim</code> with four Execute shell steps</li>
              <li><strong>Step 1 (Compile):</strong> <code>echo "Compiling..." &amp;&amp; sleep 2 &amp;&amp; echo "Compile: OK"</code></li>
              <li><strong>Step 2 (Test):</strong> <code>echo "Running 42 unit tests..." &amp;&amp; sleep 3 &amp;&amp; echo "Tests: 42/42 passed"</code></li>
              <li><strong>Step 3 (Package):</strong> <code>echo "app-v1.$BUILD_NUMBER.jar created"</code></li>
              <li>Run the job and observe each step in the console log</li>
              <li>Edit Step 2 to add <code>exit 1</code> at the end &mdash; observe the build turn red and Steps 3 and 4 not execute</li>
            </ol>
          </div>
        </div>

        {/* ── QUIZ ── */}
        <div id="s7p11" className="quiz-box">
          <h3>&#127891; Quick Quiz &mdash; Knowledge Check</h3>
          <ul className="quiz-list">
            {quizData.map((item, i) => (
              <li key={i} className="qi">
                <div className="qi-n">Q{i + 1} of {quizData.length}</div>
                <div className="qi-q">{item.q}</div>
                <div className="qi-a">&#128161; {item.a}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── HOMEWORK ── */}
        <div id="s7p12" className="hw-box">
          <h3>&#128221; Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Installation Report:</h4>
            <ul>
              <li>Install Jenkins on your platform and document every command with its exact output</li>
              <li>Include screenshots: unlock screen, plugin installation progress, first dashboard view</li>
              <li>Note the Jenkins version from Manage Jenkins &rarr; System Information</li>
              <li>Count and list the plugins installed by the suggested plugins option</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Create Three Freestyle Jobs:</h4>
            <ul>
              <li><code>env-explorer</code> &mdash; runs <code>env | sort</code> to print all environment variables alphabetically</li>
              <li><code>system-info</code> &mdash; runs <code>uname -a</code>, <code>df -h</code>, <code>free -m</code>, <code>uptime</code></li>
              <li><code>file-lifecycle</code> &mdash; creates a temp file, writes 5 lines, reads it back, counts lines, deletes it</li>
              <li>Run each job twice and paste both console outputs in your report</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Cron Expression Practice:</h4>
            <ul>
              <li>Write cron expressions for: every 10 minutes, every day at 6:30 AM, every Friday at 11 PM, 1st of every month at midnight</li>
              <li>Explain in your own words why <code>H</code> is better than a fixed minute number in Jenkins cron</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Understanding Questions (write in your own words):</h4>
            <ul>
              <li>Explain CI, Continuous Delivery, and Continuous Deployment with a real-world example for each</li>
              <li>Why is Jenkins preferred in enterprise over cloud CI services like GitHub Actions?</li>
              <li>What is the role of the Jenkins Master vs an Agent? What happens if you run all builds on the Master?</li>
              <li>Give an example of when you would choose Poll SCM vs Build Periodically vs a Webhook</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>5. Prepare for Session 8:</h4>
            <ul>
              <li>Install Maven: <code>sudo apt install -y maven</code> then verify with <code>mvn -version</code></li>
              <li>Generate a sample project and push it to a new GitHub repository</li>
              <li>Read about Jenkins Global Tool Configuration at jenkins.io/doc/book/managing/tools/</li>
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
          <span className="fp">Code Push</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Trigger</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Jenkins Job</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Build</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Test</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">&#9989; Report</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; CI/CD Golden Rules</h4>
          <ul>
            <li>Commit small and often — never let branches diverge for weeks</li>
            <li>Never ignore a red build — fix it immediately, it blocks everyone</li>
            <li>Keep your build fast — under 10 minutes is the target</li>
            <li>Every build should be reproducible — same code always produces same result</li>
            <li>Use webhooks over polling wherever possible — real-time is always better</li>
          </ul>
        </div>

        {/* ── NEXT SESSION ── */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next &middot; Module 3 &middot; Session 8</h4>
            <h3>Configuring Jenkins</h3>
            <ul>
              <li>Jenkins System &amp; Global Tool Configuration</li>
              <li>Maven Build Scripts &mdash; full integration</li>
              <li>GIT Plugin and SCM connection setup</li>
              <li>All Jenkins job types explained in depth</li>
              <li>GitHub Webhook configuration</li>
            </ul>
          </div>
          <Link href="/courses/dev/session8" className="next-btn">Session 8 &rarr;</Link>
        </div>

      </div>
    </>
  );
}