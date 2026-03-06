// app/courses/dev/session2/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   MODULE + SESSION NAV DATA
   Module 1 → Sessions 1, 2, 3
   Module 2 → Sessions 4, 5, 6
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   PAGE DATA
───────────────────────────────────────────── */
const objectives = [
  "Understand the Waterfall model and all its phases",
  "Comprehend the Agile methodology and its 12 principles",
  "Compare and contrast Waterfall vs Agile approaches",
  "Explain how DevOps integrates with and enhances Agile",
  "Apply SDLC concepts to real-world scenarios",
];

const sdlcPhases = [
  { n: "1", title: "Planning",                   desc: "Define project scope, objectives, and feasibility" },
  { n: "2", title: "Requirements Analysis",      desc: "Gather and document what the software must do" },
  { n: "3", title: "Design",                     desc: "Create architecture and detailed design specifications" },
  { n: "4", title: "Implementation/Development", desc: "Write the actual code" },
  { n: "5", title: "Testing",                    desc: "Verify the software works correctly" },
  { n: "6", title: "Deployment",                 desc: "Release software to users" },
  { n: "7", title: "Maintenance",                desc: "Fix bugs, add features, provide support" },
];

const waterfallPhases = [
  { n: "1", title: "Requirements Gathering & Analysis", desc: "Collect all requirements upfront. Create detailed specification documents." },
  { n: "2", title: "System Design",                     desc: "Design system architecture, database schema, UI mockups." },
  { n: "3", title: "Implementation (Coding)",           desc: "Developers write code based on design documents." },
  { n: "4", title: "Testing",                           desc: "QA team tests the complete system for bugs and issues." },
  { n: "5", title: "Deployment",                        desc: "Release the software to production environment." },
  { n: "6", title: "Maintenance",                       desc: "Fix bugs, provide updates and support." },
];

const waterfallPros = ["Simple and easy to understand", "Well-documented process", "Works well for small, clear projects", "Easy to manage with clear milestones", "Good for fixed-price contracts", "Suitable for stable requirements"];
const waterfallCons = ["No working software until late in cycle", "Cannot accommodate changing requirements", "High risk and uncertainty", "Customer sees product only at the end", "Testing happens too late", "Difficult to estimate time and cost accurately"];

const agileManifesto = [
  { bold: "Individuals and interactions", rest: "over processes and tools" },
  { bold: "Working software", rest: "over comprehensive documentation" },
  { bold: "Customer collaboration", rest: "over contract negotiation" },
  { bold: "Responding to change", rest: "over following a plan" },
];

const agile12Principles = [
  "Satisfy the customer through early and continuous delivery",
  "Welcome changing requirements, even late in development",
  "Deliver working software frequently (weeks rather than months)",
  "Business people and developers must work together daily",
  "Build projects around motivated individuals",
  "Face-to-face conversation is the best form of communication",
  "Working software is the primary measure of progress",
  "Sustainable development — maintain a constant pace indefinitely",
  "Continuous attention to technical excellence and good design",
  "Simplicity — maximize the amount of work not done",
  "Best architectures emerge from self-organizing teams",
  "Regularly reflect on how to become more effective and adjust",
];

const sprintActivities = [
  { n: "1", title: "Sprint Planning",         desc: "Team selects features to build from product backlog" },
  { n: "2", title: "Daily Standups",          desc: "15-minute daily meetings to sync progress" },
  { n: "3", title: "Development & Testing",   desc: "Build and test features simultaneously" },
  { n: "4", title: "Sprint Review",           desc: "Demo working software to stakeholders" },
  { n: "5", title: "Sprint Retrospective",    desc: "Team reflects on what went well and what to improve" },
];

const agilePros = ["Early and frequent delivery of working software", "Welcomes changing requirements", "Continuous customer involvement and feedback", "Faster detection and resolution of issues", "Higher customer satisfaction", "Better team morale and collaboration", "Reduced risk — fail fast, learn fast"];
const agileCons = ["Requires active customer involvement", "Less predictable (hard to estimate final cost/time)", "Can be chaotic without discipline", "Minimal documentation (can be a problem later)", "Difficult for distributed teams", "Requires experienced team members"];

const comparisonRows = [
  ["Approach",            "Sequential, linear",               "Iterative, incremental"],
  ["Flexibility",         "Rigid, hard to change",            "Highly flexible, welcomes change"],
  ["Customer Involvement","Only at beginning and end",        "Continuous throughout project"],
  ["Delivery",            "One big release at the end",       "Frequent small releases (every 2–4 weeks)"],
  ["Testing",             "After development is complete",    "Continuous testing in each sprint"],
  ["Documentation",       "Comprehensive and detailed",       "Minimal, just enough"],
  ["Requirements",        "Fixed at the start",               "Evolving throughout project"],
  ["Team Structure",      "Hierarchical, specialized roles",  "Self-organizing, cross-functional"],
  ["Risk",                "High — issues discovered late",    "Low — issues discovered early"],
  ["Cost Estimation",     "Easier to estimate upfront",       "Difficult to predict final cost"],
  ["Best For",            "Clear requirements, stable projects", "Evolving requirements, innovative projects"],
];

const devopsGapsRows = [
  ["Deployment is still manual and slow",     "Automated CI/CD pipelines"],
  ["Dev and Ops still work separately",        "Unified DevOps team"],
  ["No focus on infrastructure automation",   "Infrastructure as Code (IaC)"],
  ["Limited production monitoring",           "Continuous monitoring and feedback"],
  ["Testing may still be delayed",            "Continuous testing in pipeline"],
];

const devopsSprintSteps = [
  { n: "1", title: "Plan → Develop",                        devops: false },
  { n: "2", title: "Automated Testing (runs every commit)", devops: true  },
  { n: "3", title: "Automated Deployment to Staging",       devops: true  },
  { n: "4", title: "Demo",                                  devops: false },
  { n: "5", title: "Automated Deployment to Production",    devops: true  },
  { n: "6", title: "Continuous Monitoring (real-time)",     devops: true  },
];

const quizData = [
  { q: "What are the main phases of the Waterfall model?",                                               a: "Requirements → Design → Implementation → Testing → Deployment → Maintenance" },
  { q: "What is a sprint in Agile?",                                                                     a: "A fixed time period (1–4 weeks) where the team delivers working software" },
  { q: "Name two advantages of Agile over Waterfall.",                                                   a: "Flexibility to change, early customer feedback, frequent releases (any two)" },
  { q: "What does 'Working software over comprehensive documentation' mean?",                             a: "Focus on delivering functional software rather than excessive documentation" },
  { q: "How does DevOps complement Agile?",                                                               a: "DevOps adds automation, continuous deployment, and monitoring to Agile's iterative development" },
  { q: "When would you choose Waterfall over Agile?",                                                    a: "When requirements are stable and well-defined, when documentation is critical, for regulated industries" },
  { q: "What is a user story?",                                                                           a: "A requirement from the user's perspective: 'As a [user], I want [goal], so that [benefit]'" },
  { q: "What happens in a Daily Standup meeting?",                                                       a: "15-min meeting: What they did yesterday, what they'll do today, any blockers" },
];

const activityScenarios = [
  { title: "Scenario 1: Mars Rover Software (NASA)",    hint: "Waterfall", bullets: ["Requirements: Must be perfect, no post-launch updates", "Timeline: 5 years of development", "Risk: Failure means mission failure"] },
  { title: "Scenario 2: New Social Media App Startup",  hint: "Agile",     bullets: ["Requirements: Unclear, need to test market fit", "Competition: Must launch quickly", "Users: Need early feedback"] },
  { title: "Scenario 3: Online Ticket Booking System",  hint: "Agile",     bullets: ["Requirements: Well-defined (similar to existing systems)", "Customer: Wants to see progress frequently", "Timeline: 6 months"] },
];

export default function Session2() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s2-page {
          max-width: 1000px; 
          
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

        /* ── MODULE NAV ── */
        .module-nav {
          display: flex; flex-direction: column; gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        .module-block {
          border-radius: 14px; overflow: hidden;
          border: 1px solid var(--border);
          background: var(--surface);
        }
        .module-header {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border);
        }
        .module-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px;
          flex-shrink: 0;
        }
        .module-title {
          font-size: 0.82rem; font-weight: 700; color: var(--text);
        }
        .module-sessions {
          display: flex; gap: 0; flex-wrap: wrap;
        }
        .session-link {
          flex: 1; min-width: 120px;
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.65rem 1rem;
          font-family: 'JetBrains Mono', monospace; font-size: 0.68rem;
          color: var(--text2); text-decoration: none;
          border-right: 1px solid var(--border);
          transition: background 0.2s, color 0.2s;
          letter-spacing: 0.02em;
        }
        .session-link:last-child { border-right: none; }
        .session-link:hover { background: var(--surface2); color: var(--text); }
        .session-link.active { background: var(--surface2); color: var(--text); font-weight: 600; }
        .session-link .s-num {
          width: 20px; height: 20px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.62rem; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .session-link.active .s-num { box-shadow: 0 0 0 2px var(--bg), 0 0 0 3px currentColor; }

        /* ── Session Hero ── */
        .session-hero {
          border-radius: 20px;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 60%, #56CCF2 100%);
          padding: 2.5rem 2rem; margin-bottom: 2rem;
          position: relative; overflow: hidden;
        }
        .session-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .hero-badge {
          font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
          color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px;
        }
        .hero-mod-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px;
        }
        .hero-duration {
          font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
          color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem;
        }
        .session-hero h1 {
          font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem;
        }
        .session-hero p { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        /* ── Jump nav ── */
        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jnav-pill {
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          padding: 0.3rem 0.8rem; border-radius: 100px;
          border: 1px solid var(--border); background: var(--surface2);
          color: var(--muted); text-decoration: none; letter-spacing: 0.06em;
          transition: all 0.2s;
        }
        .jnav-pill:hover { color: var(--text); border-color: var(--border2); }
        .jnav-pill.active { background: linear-gradient(135deg,#1e3c72,#2a5298); color: #fff; border-color: transparent; }

        /* ── Part title ── */
        .part-title {
          font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em;
          color: var(--text); margin: 2.5rem 0 1.25rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .part-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .part-badge {
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: linear-gradient(135deg,#1e3c72,#56CCF2);
          color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0;
        }

        /* ── Objectives card ── */
        .objectives-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem;
        }
        .objectives-card h2 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1.1rem; display: flex; align-items: center; gap: 0.5rem; }
        .obj-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .obj-list li { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: rgba(255,255,255,0.92); line-height: 1.5; }
        .obj-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(255,215,0,0.2); border: 1.5px solid #FFD700; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: #FFD700; flex-shrink: 0; margin-top: 2px; }

        /* ── Key points box ── */
        .key-box { background: rgba(255,193,7,0.07); border: 1px solid rgba(255,193,7,0.22); border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0; }
        .key-box h3 { font-size: 0.9rem; font-weight: 700; color: var(--text); margin-bottom: 0.75rem; }
        .key-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .key-box li { font-size: 0.84rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .key-box li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }

        /* ── Phase diagram ── */
        .phase-wrap { display: flex; flex-direction: column; gap: 0; margin: 1.25rem 0; position: relative; }
        .phase-wrap::before { content:''; position:absolute; left:19px; top:0; bottom:0; width:2px; background:var(--border); z-index:0; }
        .phase-step {
          display: flex; align-items: flex-start; gap: 0.85rem;
          padding: 0.8rem 1rem; border-radius: 10px; margin-bottom: 0.5rem;
          background: var(--surface); border: 1px solid var(--border);
          position: relative; z-index: 1;
          transition: border-color 0.2s;
        }
        .phase-step:hover { border-color: var(--border2); }
        .phase-step.devops-step { border-color: rgba(39,174,96,0.3); background: rgba(39,174,96,0.04); }
        .phase-num {
          width: 28px; height: 28px; border-radius: 8px;
          background: #2a5298; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.75rem; flex-shrink: 0;
        }
        .phase-num.green { background: #27ae60; }
        .phase-content { display: flex; flex-direction: column; gap: 0.15rem; }
        .phase-content strong { font-size: 0.88rem; color: var(--text); }
        .phase-content small { font-size: 0.78rem; color: var(--text2); line-height: 1.4; }
        .devops-tag {
          font-family:'JetBrains Mono',monospace; font-size:0.55rem;
          background:rgba(39,174,96,0.15); border:1px solid rgba(39,174,96,0.3);
          color:#27ae60; padding:0.1rem 0.45rem; border-radius:100px;
          margin-left:0.4rem; letter-spacing:0.06em; text-transform:uppercase;
        }

        /* ── Example box ── */
        .example-box { background: var(--surface2); border-left: 3px solid #27ae60; border-radius: 0 12px 12px 0; padding: 1.25rem; margin: 1.25rem 0; }
        .example-label { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#27ae60; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.6rem; font-weight:600; }
        .example-box p { font-size:0.85rem; color:var(--text2); line-height:1.65; margin-bottom:0.5rem; }
        .example-box p:last-child { margin-bottom: 0; }
        .example-box ul, .example-box ol { padding-left:1.1rem; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .example-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; }

        /* ── Pros / Cons grid ── */
        .pros-cons { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1.25rem 0; }
        @media(max-width:560px){ .pros-cons{grid-template-columns:1fr;} }
        .pros-box { background:rgba(39,174,96,0.06); border:1px solid rgba(39,174,96,0.2); border-radius:12px; padding:1.1rem; }
        .cons-box { background:rgba(231,76,60,0.06);  border:1px solid rgba(231,76,60,0.2);  border-radius:12px; padding:1.1rem; }
        .pros-box h4 { font-size:0.82rem; font-weight:700; color:#27ae60; margin-bottom:0.65rem; }
        .cons-box h4 { font-size:0.82rem; font-weight:700; color:#e74c3c; margin-bottom:0.65rem; }
        .pros-box ul, .cons-box ul { list-style:none; display:flex; flex-direction:column; gap:0.35rem; }
        .pros-box li { font-size:0.8rem; color:var(--text2); line-height:1.4; display:flex; gap:0.45rem; }
        .cons-box li { font-size:0.8rem; color:var(--text2); line-height:1.4; display:flex; gap:0.45rem; }
        .pros-box li::before { content:'✓'; color:#27ae60; flex-shrink:0; }
        .cons-box li::before { content:'✗'; color:#e74c3c; flex-shrink:0; }

        /* ── Comparison table ── */
        .comp-table { width:100%; border-collapse:collapse; border-radius:12px; overflow:hidden; margin:1.25rem 0; box-shadow:var(--shadow-sm); font-size:0.83rem; }
        .comp-table thead th { padding:0.85rem 1rem; text-align:left; font-weight:700; font-size:0.78rem; }
        .comp-table thead th:first-child  { background:var(--surface2); color:var(--text); }
        .comp-table thead th:nth-child(2) { background:#c0392b; color:#fff; }
        .comp-table thead th:nth-child(3) { background:#27ae60; color:#fff; }
        .comp-table td { padding:0.75rem 1rem; border-bottom:1px solid var(--border); color:var(--text2); line-height:1.5; vertical-align:top; }
        .comp-table td:first-child { font-weight:600; color:var(--text); background:var(--surface); }
        .comp-table tr:last-child td { border-bottom:none; }
        .comp-table tr:nth-child(even) td:not(:first-child) { background:var(--surface2); }

        /* DevOps gaps table */
        .gaps-table { width:100%; border-collapse:collapse; border-radius:12px; overflow:hidden; margin:1.25rem 0; box-shadow:var(--shadow-sm); font-size:0.83rem; }
        .gaps-table thead th { padding:0.85rem 1rem; text-align:left; font-weight:700; font-size:0.78rem; }
        .gaps-table thead th:first-child  { background:#e74c3c; color:#fff; }
        .gaps-table thead th:nth-child(2) { background:#27ae60; color:#fff; }
        .gaps-table td { padding:0.75rem 1rem; border-bottom:1px solid var(--border); color:var(--text2); line-height:1.5; vertical-align:top; }
        .gaps-table tr:last-child td { border-bottom:none; }
        .gaps-table tr:nth-child(even) td { background:var(--surface2); }

        /* ── Agile frameworks cards ── */
        .frameworks-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1.25rem 0; }
        @media(max-width:560px){ .frameworks-grid{grid-template-columns:1fr;} }
        .fw-card { background:var(--surface); border:2px solid #27ae60; border-radius:14px; padding:1.25rem; }
        .fw-card h3 { font-size:1rem; font-weight:800; color:#27ae60; margin-bottom:0.75rem; }
        .fw-card ul { list-style:none; display:flex; flex-direction:column; gap:0.35rem; }
        .fw-card li { font-size:0.82rem; color:var(--text2); line-height:1.45; display:flex; gap:0.4rem; }
        .fw-card li::before { content:'→'; color:#27ae60; flex-shrink:0; font-size:0.75rem; margin-top:1px; }

        /* ── Code block ── */
        .code-block {
          background:#1a1a2e; color:#a8ff78; padding:1.25rem; border-radius:12px;
          font-family:'JetBrains Mono',monospace; font-size:0.75rem; line-height:1.8;
          overflow-x:auto; margin:1rem 0; border:1px solid rgba(168,255,120,0.1);
        }
        .code-comment { color:#6af7c8; }

        /* ── Agile alone vs Agile+DevOps ── */
        .compare2-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1.25rem 0; }
        @media(max-width:560px){ .compare2-grid{grid-template-columns:1fr;} }
        .c2-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:1.25rem; }
        .c2-card h3 { font-size:0.9rem; font-weight:800; color:var(--text); margin-bottom:0.75rem; }
        .c2-card ul { list-style:none; display:flex; flex-direction:column; gap:0.35rem; }
        .c2-card li { font-size:0.82rem; color:var(--text2); line-height:1.4; display:flex; gap:0.4rem; }
        .c2-card li::before { content:'•'; color:var(--muted); flex-shrink:0; }
        .c2-card .total { margin-top:0.75rem; font-size:0.85rem; font-weight:700; color:var(--text); padding-top:0.6rem; border-top:1px solid var(--border); }
        .c2-card.winner { border-color:rgba(39,174,96,0.4); background:rgba(39,174,96,0.04); }
        .c2-card.winner .total { color:#27ae60; }

        /* ── Activity box ── */
        .activity-box { background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%); border-radius:16px; padding:1.75rem; margin:1.5rem 0; }
        .activity-box h3 { font-size:1rem; font-weight:700; color:#fff; margin-bottom:1rem; }
        .activity-scenario { background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); border-radius:10px; padding:1rem; margin-bottom:0.75rem; }
        .activity-scenario:last-child { margin-bottom:0; }
        .activity-scenario p { font-size:0.88rem; color:#fff; font-weight:600; margin-bottom:0.5rem; }
        .activity-scenario ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; padding-left:0.5rem; }
        .activity-scenario li { font-size:0.82rem; color:rgba(255,255,255,0.85); display:flex; gap:0.4rem; }
        .activity-scenario li::before { content:'·'; flex-shrink:0; }
        .hint-badge { display:inline-block; font-family:'JetBrains Mono',monospace; font-size:0.6rem; letter-spacing:0.1em; text-transform:uppercase; background:rgba(255,255,255,0.2); border:1px solid rgba(255,255,255,0.3); color:#fff; padding:0.15rem 0.55rem; border-radius:100px; margin-top:0.5rem; }

        /* ── Sprint visuals ── */
        .sprint-boxes { display:flex; flex-wrap:wrap; gap:0.6rem; margin:1rem 0; }
        .sprint-box { background:linear-gradient(135deg,#2a5298,#56CCF2); color:#fff; padding:0.75rem 1.25rem; border-radius:10px; font-size:0.82rem; font-weight:700; text-align:center; }

        /* ── Waterfall banking timeline ── */
        .wf-example { background:var(--surface2); border:1px solid var(--border); border-radius:12px; overflow:hidden; margin:1.25rem 0; }
        .wf-row { display:flex; align-items:flex-start; gap:0.85rem; padding:0.85rem 1rem; border-bottom:1px solid var(--border); }
        .wf-row:last-child { border-bottom:none; }
        .wf-month { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:var(--muted); min-width:70px; flex-shrink:0; padding-top:2px; letter-spacing:0.06em; }
        .wf-content { font-size:0.83rem; color:var(--text2); line-height:1.5; }
        .wf-content strong { color:var(--text); }

        /* ── Key takeaways final box ── */
        .takeaway-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1rem 0; }
        @media(max-width:560px){ .takeaway-grid{grid-template-columns:1fr;} }
        .takeaway-card { border-radius:14px; padding:1.25rem; border:1px solid var(--border); }
        .takeaway-card.wf { border-top:3px solid #e74c3c; }
        .takeaway-card.ag { border-top:3px solid #27ae60; }
        .takeaway-card h3 { font-size:0.95rem; font-weight:800; margin-bottom:0.75rem; }
        .takeaway-card.wf h3 { color:#e74c3c; }
        .takeaway-card.ag h3 { color:#27ae60; }
        .takeaway-card ul { list-style:none; display:flex; flex-direction:column; gap:0.35rem; }
        .takeaway-card li { font-size:0.8rem; color:var(--text2); line-height:1.4; }

        /* ── Quiz ── */
        .quiz-box { background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08)); border:1px solid rgba(99,102,241,0.2); border-radius:16px; padding:1.75rem; margin:1.5rem 0; }
        .quiz-box h3 { font-size:1rem; font-weight:700; color:var(--text); margin-bottom:1.25rem; }
        .quiz-list { list-style:none; display:flex; flex-direction:column; gap:0.75rem; }
        .quiz-item { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:0.9rem 1rem; }
        .q-num { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:var(--accent); letter-spacing:0.08em; margin-bottom:0.3rem; }
        .q-text { font-size:0.88rem; font-weight:600; color:var(--text); margin-bottom:0.3rem; }
        .q-answer { font-size:0.82rem; color:var(--text2); font-style:italic; margin-top:0.4rem; padding-top:0.4rem; border-top:1px solid var(--border); }

        /* ── HW box ── */
        .hw-box { background:rgba(255,193,7,0.06); border:1px solid rgba(255,193,7,0.2); border-radius:14px; padding:1.5rem; margin:1.5rem 0; }
        .hw-box h3 { font-size:0.95rem; font-weight:700; color:var(--text); margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem; }
        .hw-task { margin-bottom:0.85rem; }
        .hw-task h4 { font-size:0.82rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; }
        .hw-task p { font-size:0.82rem; color:var(--text2); line-height:1.55; margin-bottom:0.4rem; }
        .hw-task ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; padding-left:0.5rem; }
        .hw-task li { font-size:0.82rem; color:var(--text2); line-height:1.5; display:flex; gap:0.4rem; }
        .hw-task li::before { content:'•'; color:#F59E0B; flex-shrink:0; }

        /* ── Resources ── */
        .resources-box { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:1.5rem; margin:1.5rem 0; }
        .resources-box h3 { font-size:0.95rem; font-weight:700; color:var(--text); margin-bottom:1.1rem; }
        .res-label { font-family:'JetBrains Mono',monospace; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); margin:1rem 0 0.5rem; }
        .res-list { list-style:none; display:flex; flex-direction:column; gap:0.4rem; }
        .res-list li { font-size:0.84rem; color:var(--text2); display:flex; gap:0.5rem; }
        .res-list li::before { content:'↗'; color:var(--accent); flex-shrink:0; }
        .res-list a { color:var(--accent); text-decoration:none; }
        .res-list a:hover { text-decoration:underline; }

        /* ── Next session card ── */
        .next-card {
          background:linear-gradient(135deg,#11998e 0%,#38ef7d 100%);
          border-radius:16px; padding:1.75rem; margin-top:2rem;
          display:flex; align-items:center; justify-content:space-between;
          gap:1.5rem; flex-wrap:wrap;
        }
        .next-text h4 { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(0,0,0,0.4); margin-bottom:0.4rem; }
        .next-text h3 { font-size:1.1rem; font-weight:800; color:#fff; margin-bottom:0.5rem; }
        .next-text ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; }
        .next-text li { font-size:0.83rem; color:rgba(255,255,255,0.8); display:flex; gap:0.5rem; }
        .next-text li::before { content:'→'; color:rgba(255,255,255,0.6); flex-shrink:0; }
        .next-btn { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.85rem; font-weight:700; color:#11998e; background:#fff; border:none; padding:0.75rem 1.5rem; border-radius:10px; cursor:pointer; text-decoration:none; white-space:nowrap; transition:opacity 0.2s,transform 0.2s; display:inline-flex; align-items:center; gap:0.5rem; }
        .next-btn:hover { opacity:0.9; transform:translateX(3px); }

        /* ── Prev session link ── */
        .session-nav-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:0.5rem; }
        .nav-btn { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:var(--text2); text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem; padding:0.4rem 0.75rem; border-radius:8px; border:1px solid var(--border); background:var(--surface); transition:all 0.2s; }
        .nav-btn:hover { color:var(--text); border-color:var(--border2); }

        @media(max-width:640px){
          .s2-page { padding:2rem 1rem 4rem; }
          .module-sessions { flex-direction:column; }
          .session-link { border-right:none; border-bottom:1px solid var(--border); }
          .session-link:last-child { border-bottom:none; }
        }
      `}</style>

      <div className="s2-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link>
          <span className="sep">/</span>
          <span className="current">Session 2: SDLC Models & DevOps</span>
        </div>

        {/* ── MODULE NAVIGATION ── */}
       

        {/* Prev / Next quick nav */}
        <div className="session-nav-row">
          <Link href="/courses/dev/session1" className="nav-btn">← Session 1: DevOps Fundamentals</Link>
          <Link href="/courses/dev/session3" className="nav-btn">Session 3: Tools Ecosystem →</Link>
        </div>

        {/* Hero */}
        <div className="session-hero">
          <div className="hero-meta">
            <span className="hero-badge">Session 2 of 6</span>
            <span className="hero-mod-tag">Module 1 — DevOps Foundations</span>
            <span className="hero-duration">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4 hrs total
            </span>
          </div>
          <h1>📊 SDLC Models & DevOps</h1>
          <p>Waterfall, Agile, and how DevOps bridges the gap between development speed and deployment reliability.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","SDLC Overview","Waterfall","Agile","Comparison","DevOps + Agile","Activity","Takeaways","Quiz","Homework"].map((label, i) => (
            <a key={i} href={`#s2p${i}`} className={`jnav-pill${i === 0 ? " active" : ""}`}>{label}</a>
          ))}
        </div>

        {/* ── OBJECTIVES ── */}
        <div id="s2p0" className="objectives-card">
          <h2>📚 Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o, i) => (
              <li key={i}><span className="obj-check">✓</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* ── SDLC OVERVIEW ── */}
        <div id="s2p1">
          <div className="part-title"><span className="part-badge">Foundation</span>Understanding SDLC</div>
          <p style={{fontSize:"0.9rem",color:"var(--text2)",lineHeight:1.7,marginBottom:"1rem"}}>
            <strong style={{color:"var(--text)"}}>SDLC</strong> is a framework that defines the process used by organizations to build software applications from inception to retirement. It provides a structured approach to software development.
          </p>
          <div className="key-box">
            <h3>Why Do We Need SDLC?</h3>
            <ul>
              {[["Structure","Provides a systematic approach to development"],["Quality","Ensures high-quality software delivery"],["Cost Control","Helps manage budget and resources"],["Risk Management","Identifies and mitigates risks early"],["Communication","Creates common understanding among stakeholders"]].map(([b,r])=>(
                <li key={b}><strong style={{color:"var(--text)"}}>{b}:</strong>&nbsp;{r}</li>
              ))}
            </ul>
          </div>
          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.25rem 0 0.75rem"}}>Common SDLC Phases</h3>
          <div className="phase-wrap">
            {sdlcPhases.map((p) => (
              <div key={p.n} className="phase-step">
                <div className="phase-num">{p.n}</div>
                <div className="phase-content">
                  <strong>{p.title}</strong>
                  <small>{p.desc}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WATERFALL ── */}
        <div id="s2p2">
          <div className="part-title"><span className="part-badge">Part 1 · 90 min</span>Waterfall Model</div>
          <p style={{fontSize:"0.9rem",color:"var(--text2)",lineHeight:1.7,marginBottom:"1rem"}}>
            The Waterfall Model is a <strong style={{color:"var(--text)"}}>sequential, linear approach</strong> where each phase must be completed before the next begins. Like a waterfall, progress flows steadily downward through phases.
          </p>
          <div className="phase-wrap">
            {waterfallPhases.map((p) => (
              <div key={p.n} className="phase-step">
                <div className="phase-num" style={{background:"#e74c3c"}}>{p.n}</div>
                <div className="phase-content">
                  <strong>{p.title}</strong>
                  <small>{p.desc}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="example-box" style={{marginTop:"1.5rem"}}>
            <div className="example-label">📋 Practical Example — Building a Banking System</div>
            <div className="wf-example" style={{background:"transparent",border:"none",margin:0,padding:0}}>
              {[["Month 1–2","Requirements — Business analysts document every feature (200-page spec). Get sign-off from all stakeholders."],["Month 3–4","Design — Architects design DB schema (20+ tables), UI mockups for every screen. No coding yet!"],["Month 5–10","Implementation — Front-end, back-end, and DB teams code all features in isolation."],["Month 11–12","Testing — QA receives complete system. Finds 200+ bugs. Too late to fix major design flaws!"],["Month 13","Deployment — Bank staff see the system for the first time. '''This is not what we wanted!'''"]].map(([m,c])=>(
                <div key={m} className="wf-row">
                  <span className="wf-month">{m}</span>
                  <span className="wf-content">{c}</span>
                </div>
              ))}
            </div>
            <p style={{marginTop:"0.75rem"}}><strong style={{color:"#e74c3c"}}>Problem:</strong> By the time it's deployed, business needs have changed!</p>
          </div>

          <div className="pros-cons">
            <div className="pros-box">
              <h4>✅ Advantages of Waterfall</h4>
              <ul>{waterfallPros.map(p=><li key={p}>{p}</li>)}</ul>
            </div>
            <div className="cons-box">
              <h4>❌ Disadvantages of Waterfall</h4>
              <ul>{waterfallCons.map(c=><li key={c}>{c}</li>)}</ul>
            </div>
          </div>

          <div className="key-box">
            <h3>When to Use Waterfall?</h3>
            <ul>
              <li><strong style={{color:"var(--text)"}}>Good for:</strong> Government contracts, small projects with stable requirements, medical devices, aerospace</li>
              <li><strong style={{color:"var(--text)"}}>Not good for:</strong> Complex long-term projects, evolving requirements, innovative/competitive products</li>
            </ul>
          </div>
        </div>

        {/* ── AGILE ── */}
        <div id="s2p3">
          <div className="part-title"><span className="part-badge">Part 2 · 90 min</span>Agile Model</div>
          <p style={{fontSize:"0.9rem",color:"var(--text2)",lineHeight:1.7,marginBottom:"1rem"}}>
            Agile is an <strong style={{color:"var(--text)"}}>iterative and incremental</strong> approach that emphasizes flexibility, collaboration, customer feedback, and rapid delivery of working software.
          </p>

          <div className="key-box">
            <h3>The Agile Manifesto (2001) — 4 Core Values</h3>
            <ul>
              {agileManifesto.map((m,i)=>(
                <li key={i}><strong style={{color:"var(--text)"}}>{m.bold}</strong>&nbsp;<span style={{color:"var(--muted)"}}>over</span>&nbsp;{m.rest}</li>
              ))}
            </ul>
          </div>

          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.5rem 0 0.75rem"}}>12 Agile Principles</h3>
          <div className="phase-wrap">
            {agile12Principles.map((p,i)=>(
              <div key={i} className="phase-step">
                <div className="phase-num" style={{background:"#27ae60",fontSize:"0.7rem"}}>{i+1}</div>
                <div className="phase-content"><strong style={{fontWeight:500}}>{p}</strong></div>
              </div>
            ))}
          </div>

          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.5rem 0 0.75rem"}}>How Agile Works: Sprints</h3>
          <div className="sprint-boxes">
            {["Sprint 1\n2 weeks","Sprint 2\n2 weeks","Sprint 3\n2 weeks","Sprint 4\n2 weeks"].map((s,i)=>(
              <div key={i} className="sprint-box" style={{whiteSpace:"pre-line",lineHeight:1.4}}>{s}</div>
            ))}
          </div>
          <p style={{fontSize:"0.82rem",color:"var(--muted)",textAlign:"center",marginBottom:"1rem",fontStyle:"italic"}}>Each sprint delivers working software!</p>

          <h3 style={{fontSize:"0.9rem",fontWeight:700,color:"var(--text)",margin:"1.25rem 0 0.75rem"}}>Activities Within Each Sprint</h3>
          <div className="phase-wrap">
            {sprintActivities.map((s)=>(
              <div key={s.n} className="phase-step">
                <div className="phase-num" style={{background:"#27ae60"}}>{s.n}</div>
                <div className="phase-content">
                  <strong>{s.title}</strong>
                  <small>{s.desc}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="example-box">
            <div className="example-label">📋 Practical Example — Building an E-commerce Site (Agile)</div>
            {[["Sprint 1 (Wk 1–2)","MVP: Product listing page — deployed! Customer says: 'Add search!'"],["Sprint 2 (Wk 3–4)","Search + shopping cart added. Customer says: 'Add payment!'"],["Sprint 3 (Wk 5–6)","Payment gateway integrated. Already making sales!"],["Sprint 4 (Wk 7–8)","User accounts + order history. Iterating on real user data."]].map(([s,d])=>(
              <p key={s}><strong style={{color:"var(--text)"}}>{s}:</strong> {d}</p>
            ))}
            <p style={{marginTop:"0.75rem"}}><strong style={{color:"#27ae60"}}>Time to first release: 2 weeks!</strong> Revenue from week 6. Continuous improvement.</p>
          </div>

          <div className="example-box" style={{borderLeftColor:"#8B5CF6",marginTop:"1rem"}}>
            <div className="example-label" style={{color:"#8B5CF6"}}>🔧 Agile User Story Format</div>
            <p><strong style={{color:"var(--text)"}}>As a [user], I want [goal] so that [benefit]</strong></p>
            <ul>
              <li>As a <strong>customer</strong>, I want to <strong>search for products</strong> so that <strong>I can quickly find what I need</strong></li>
              <li>As a <strong>customer</strong>, I want to <strong>save items to wishlist</strong> so that <strong>I can purchase them later</strong></li>
              <li>As a <strong>seller</strong>, I want to <strong>view sales analytics</strong> so that <strong>I can track my revenue</strong></li>
            </ul>
          </div>

          <h3 style={{fontSize:"0.9rem",fontWeight:700,color:"var(--text)",margin:"1.25rem 0 0.75rem"}}>Popular Agile Frameworks</h3>
          <div className="frameworks-grid">
            <div className="fw-card">
              <h3>Scrum</h3>
              <ul>
                <li>Most popular Agile framework</li>
                <li>Fixed-length sprints (1–4 weeks)</li>
                <li>Roles: Product Owner, Scrum Master, Dev Team</li>
                <li>Ceremonies: Sprint Planning, Daily Standup, Review, Retro</li>
              </ul>
            </div>
            <div className="fw-card">
              <h3>Kanban</h3>
              <ul>
                <li>Visual workflow management</li>
                <li>Continuous flow (no fixed sprints)</li>
                <li>Work-in-progress (WIP) limits</li>
                <li>Board: To Do → In Progress → Done</li>
              </ul>
            </div>
          </div>

          <div className="pros-cons">
            <div className="pros-box">
              <h4>✅ Advantages of Agile</h4>
              <ul>{agilePros.map(p=><li key={p}>{p}</li>)}</ul>
            </div>
            <div className="cons-box">
              <h4>❌ Challenges of Agile</h4>
              <ul>{agileCons.map(c=><li key={c}>{c}</li>)}</ul>
            </div>
          </div>
        </div>

        {/* ── COMPARISON ── */}
        <div id="s2p4">
          <div className="part-title"><span className="part-badge">Part 3</span>Waterfall vs Agile</div>
          <table className="comp-table">
            <thead>
              <tr><th>Aspect</th><th>❌ Waterfall</th><th>✅ Agile</th></tr>
            </thead>
            <tbody>
              {comparisonRows.map(([a,w,ag])=>(
                <tr key={a}><td>{a}</td><td>{w}</td><td>{ag}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="example-box">
            <div className="example-label">🏗️ Real-World Comparison — Building a Mobile Social App</div>
            <table className="comp-table" style={{marginTop:"0.5rem",fontSize:"0.8rem"}}>
              <thead>
                <tr><th>Month</th><th>Waterfall Approach</th><th>Agile Approach</th></tr>
              </thead>
              <tbody>
                {[["Month 1","Gather all requirements","Build basic profile & posting → Deploy! Get feedback"],["Month 2","Design entire app","Add photo sharing → Deploy! Already have users"],["Month 3–8","Development (no user feedback)","Continuous features based on real user data"],["Month 9–10","Testing phase","Already have 10,000+ active users"],["Month 11","Release! Discover users want different features","Keep iterating based on analytics"],["Result","Built wrong product, wasted 11 months","Successful app with real users and revenue"]].map(([m,w,a])=>(
                  <tr key={m}><td>{m}</td><td>{w}</td><td>{a}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── DEVOPS + AGILE ── */}
        <div id="s2p5">
          <div className="part-title"><span className="part-badge">Part 4 · 45 min</span>DevOps + Agile Integration</div>

          <div className="key-box">
            <h3>The Relationship</h3>
            <ul>
              <li><strong style={{color:"var(--text)"}}>Agile</strong> = Fast development iterations</li>
              <li><strong style={{color:"var(--text)"}}>DevOps</strong> = Fast development + Fast deployment + Continuous monitoring</li>
              <li><strong style={{color:"var(--text)"}}>Together</strong> = Complete pipeline from code to customer</li>
            </ul>
          </div>

          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.25rem 0 0.75rem"}}>Gaps in Agile that DevOps Fills</h3>
          <table className="gaps-table">
            <thead>
              <tr><th>❌ Gap in Agile</th><th>✅ How DevOps Addresses It</th></tr>
            </thead>
            <tbody>
              {devopsGapsRows.map(([g,d])=>(
                <tr key={g}><td>{g}</td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="example-box">
            <div className="example-label">🔄 Agile + DevOps in Action — Food Delivery App</div>
            <p><strong style={{color:"var(--text)"}}>Sprint Goal:</strong> Add "Schedule Order for Later" feature</p>
            <p style={{margin:"0.75rem 0 0.4rem"}}><strong style={{color:"var(--text)"}}>Day 2–4: Dev commits code → DevOps pipeline auto-triggers:</strong></p>
            <div className="code-block">
              <span className="code-comment"># Developer pushes to Git</span>{"\n"}
              git commit -m "Add schedule order feature"{"\n"}
              git push origin feature/schedule-order{"\n\n"}
              <span className="code-comment"># Automated pipeline kicks in instantly:</span>{"\n"}
              1. Jenkins starts build{"\n"}
              2. Runs unit tests          <span className="code-comment">→ 10 seconds</span>{"\n"}
              3. Runs integration tests   <span className="code-comment">→ 2 minutes</span>{"\n"}
              4. Builds Docker container  <span className="code-comment">→ 1 minute</span>{"\n"}
              5. Deploys to staging       <span className="code-comment">→ 30 seconds</span>{"\n"}
              6. Runs automated UI tests  <span className="code-comment">→ 3 minutes</span>{"\n\n"}
              <span className="code-comment"># Total: ~7 minutes from commit to staging!</span>
            </div>
          </div>

          <h3 style={{fontSize:"0.9rem",fontWeight:700,color:"var(--text)",margin:"1.25rem 0 0.75rem"}}>The DevOps Extension to an Agile Sprint</h3>
          <div className="phase-wrap">
            {devopsSprintSteps.map((s)=>(
              <div key={s.n} className={`phase-step${s.devops ? " devops-step" : ""}`}>
                <div className={`phase-num${s.devops ? " green" : ""}`}>{s.n}</div>
                <div className="phase-content">
                  <strong>
                    {s.title}
                    {s.devops && <span className="devops-tag">DevOps automation</span>}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{fontSize:"0.9rem",fontWeight:700,color:"var(--text)",margin:"1.25rem 0 0.75rem"}}>Agile Alone vs Agile + DevOps</h3>
          <div className="compare2-grid">
            <div className="c2-card">
              <h3>Agile Alone</h3>
              <ul>
                <li>2-week sprints</li>
                <li>Working software at end of sprint</li>
                <li>But… deployment takes 2 more weeks</li>
                <li>Manual testing delays</li>
              </ul>
              <div className="total">⏱ Time to customer: 4 weeks</div>
            </div>
            <div className="c2-card winner">
              <h3>Agile + DevOps</h3>
              <ul>
                <li>2-week sprints</li>
                <li>Working software at end of sprint</li>
                <li>Automated deployment</li>
                <li>Continuous testing throughout</li>
              </ul>
              <div className="total">⚡ Time to customer: 2 weeks!</div>
            </div>
          </div>

          <div className="example-box" style={{borderLeftColor:"#1DB954"}}>
            <div className="example-label" style={{color:"#1DB954"}}>🎯 Real Company — Spotify</div>
            <p><strong style={{color:"var(--text)"}}>Agile practices:</strong> 2-week sprints, Squads (cross-functional teams), user stories + backlog</p>
            <p><strong style={{color:"var(--text)"}}>DevOps added:</strong> CI/CD pipelines, microservices, feature flags, A/B testing, real-time monitoring</p>
            <p><strong style={{color:"var(--text)"}}>Results:</strong> Multiple production deployments per day, test features on 1% of users first, rollback bad features in seconds, data-driven decisions</p>
          </div>
        </div>

        {/* ── ACTIVITY ── */}
        <div id="s2p6">
          <div className="activity-box">
            <h3>🎯 Class Activity: Choose Your SDLC Model (15 min)</h3>
            <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.85)",marginBottom:"1rem"}}>For each scenario below, decide whether Waterfall or Agile would be better and explain why.</p>
            {activityScenarios.map((sc) => (
              <div key={sc.title} className="activity-scenario">
                <p>{sc.title}</p>
                <ul>
                  {sc.bullets.map(b=><li key={b}>{b}</li>)}
                </ul>
                <span className="hint-badge">💡 Suggested: {sc.hint}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TAKEAWAYS ── */}
        <div id="s2p7">
          <div className="part-title"><span className="part-badge">Summary</span>Key Takeaways</div>
          <div className="takeaway-grid">
            <div className="takeaway-card wf">
              <h3>Waterfall Model</h3>
              <ul>
                {["✅ Sequential and structured","✅ Good for stable requirements","✅ Heavy documentation","❌ Inflexible to change","❌ Late customer feedback","Best for: Government, medical, construction software"].map(t=><li key={t} style={{fontSize:"0.82rem",color:"var(--text2)",marginBottom:"0.3rem"}}>{t}</li>)}
              </ul>
            </div>
            <div className="takeaway-card ag">
              <h3>Agile Model</h3>
              <ul>
                {["✅ Iterative and flexible","✅ Welcomes changing requirements","✅ Early and frequent delivery","❌ Less predictable cost/timeline","❌ Requires active customer","Best for: Web apps, mobile apps, SaaS products"].map(t=><li key={t} style={{fontSize:"0.82rem",color:"var(--text2)",marginBottom:"0.3rem"}}>{t}</li>)}
              </ul>
            </div>
          </div>
          <div className="key-box" style={{marginTop:"1rem"}}>
            <h3>Agile + DevOps = Maximum Velocity 🚀</h3>
            <ul>
              <li><strong style={{color:"var(--text)"}}>Agile</strong> provides the development methodology</li>
              <li><strong style={{color:"var(--text)"}}>DevOps</strong> provides the automation and deployment infrastructure</li>
              <li><strong style={{color:"var(--text)"}}>Together</strong> they enable continuous delivery of value to customers</li>
              <li>Modern software teams use Agile + DevOps together, not separately!</li>
            </ul>
          </div>
        </div>

        {/* ── QUIZ ── */}
        <div id="s2p8" className="quiz-box">
          <h3>🎓 Quick Quiz — Knowledge Check</h3>
          <ul className="quiz-list">
            {quizData.map((item, i) => (
              <li key={i} className="quiz-item">
                <div className="q-num">Q{i+1}</div>
                <div className="q-text">{item.q}</div>
                <div className="q-answer">💡 {item.a}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── HOMEWORK ── */}
        <div id="s2p9" className="hw-box">
          <h3>📝 Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Case Study Analysis:</h4>
            <p>Research a company that transitioned from Waterfall to Agile (e.g., ING Bank, Barclays, Adobe). Write a 2-page report covering:</p>
            <ul>
              <li>Why did they make the transition?</li>
              <li>What challenges did they face?</li>
              <li>What were the results?</li>
              <li>Did they also adopt DevOps? If so, how?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Practical Exercise — Food Delivery App:</h4>
            <ul>
              <li>Write 5 user stories (format: "As a ____, I want ____, so that ____")</li>
              <li>Plan 3 sprints (2 weeks each) showing what features go in each</li>
              <li>Explain how DevOps would accelerate delivery</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Comparison Table:</h4>
            <p>Create your own table showing 8 differences between Waterfall and Agile with real examples for each.</p>
          </div>
          <div className="hw-task">
            <h4>4. Prepare for Next Session:</h4>
            <ul>
              <li>Read about Jenkins, Docker, Ansible, and Puppet</li>
              <li>Watch introductory videos on CI/CD tools</li>
            </ul>
          </div>
        </div>

        {/* ── RESOURCES ── */}
        <div className="resources-box">
          <h3>📚 Additional Resources</h3>
          <div className="res-label">Books</div>
          <ul className="res-list">
            <li><span>Agile Manifesto — agilemanifesto.org (free)</span></li>
            <li><span>"Scrum: The Art of Doing Twice the Work in Half the Time" — Jeff Sutherland</span></li>
          </ul>
          <div className="res-label">Websites</div>
          <ul className="res-list">
            <li><a href="https://www.atlassian.com/agile" target="_blank" rel="noreferrer">Atlassian Agile Coach</a></li>
            <li><a href="https://agilemanifesto.org" target="_blank" rel="noreferrer">agilemanifesto.org</a></li>
            <li><a href="https://www.scrum.org/resources/what-is-scrum" target="_blank" rel="noreferrer">Scrum.org — What is Scrum?</a></li>
          </ul>
        </div>

        {/* ── NEXT SESSION ── */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next · Module 1 · Session 3</h4>
            <h3>DevOps Tools Ecosystem</h3>
            <ul>
              <li>CI/CD with Jenkins</li>
              <li>Containerization with Docker & Vagrant</li>
              <li>Config Management: Ansible, Puppet, Chef</li>
              <li>Hands-on tool comparisons</li>
            </ul>
          </div>
          <Link href="/courses/dev/session3" className="next-btn">
            Session 3 →
          </Link>
        </div>

      </div>
    </>
  );
}