// app/courses/dev/session1/page.tsx
import Link from "next/link";
import ModuleNav from "@/components/ModuleNav";


/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Define DevOps and explain its origin",
  "Identify the core principles and characteristics of DevOps",
  "Describe the main objectives of implementing DevOps",
  "Trace the historical evolution of DevOps",
  "Understand the cultural shift DevOps requires",
  "Analyze real-world case studies of DevOps implementation",
];

const principles = [
  {
    num: "1",
    title: "Collaboration and Communication",
    color: "#3B82F6",
    example: {
      title: "Real-World Example",
      text: "Spotify's Squad model: small cross-functional teams own complete features end-to-end — from coding to deployment to monitoring.",
    },
  },
  {
    num: "2",
    title: "Automation",
    color: "#8B5CF6",
    example: {
      title: "Automation in Action",
      text: "Google runs 150,000+ automated tests per day. Every code change triggers tests automatically — no manual intervention needed.",
    },
  },
  {
    num: "3",
    title: "Continuous Integration & Continuous Delivery (CI/CD)",
    color: "#06B6D4",
    example: {
      title: "Real-World Example — Netflix",
      text: "Netflix deploys code thousands of times per day across 700+ microservices, making releases invisible to users thanks to CI/CD pipelines.",
    },
  },
  {
    num: "4",
    title: "Monitoring and Feedback",
    color: "#10B981",
    example: {
      title: "Real-World Example — Amazon",
      text: "Amazon monitors millions of metrics in real-time. If response time exceeds a threshold, auto-scaling kicks in within seconds.",
    },
  },
  {
    num: "5",
    title: "Infrastructure as Code (IaC)",
    color: "#F59E0B",
    example: {
      title: "Practical Example",
      text: "Netflix manages thousands of servers with Terraform scripts. The entire infrastructure can be recreated from code in minutes.",
    },
  },
];

const objectives2 = [
  {
    num: "1", title: "Faster Time to Market", icon: "🚀", color: "#EF4444",
    company: "Etsy",
    desc: "Went from deploying twice a week to 50+ times per day after adopting DevOps — each deployment takes only 15 minutes.",
  },
  {
    num: "2", title: "Improved Collaboration", icon: "🤝", color: "#3B82F6",
    company: "E-commerce Scenario",
    desc: "Cross-functional teams sharing goals eliminate the blame game between Dev, QA and Ops — everyone owns the feature together.",
  },
  {
    num: "3", title: "Higher Quality & Reliability", icon: "✅", color: "#10B981",
    company: "Facebook",
    desc: "Uses automated testing + feature flags to test new code on 1% of users first. Bugs caught before full rollout.",
  },
  {
    num: "4", title: "Reduced Costs", icon: "💰", color: "#F59E0B",
    company: "Nordstrom",
    desc: "Reduced lead time from 9 months → 3 months, and deployment costs dropped 60% after DevOps adoption.",
  },
  {
    num: "5", title: "Continuous Feedback & Improvement", icon: "🔄", color: "#8B5CF6",
    company: "Spotify",
    desc: "\"Fail fast\" culture: features are A/B tested with real users. Bad features are rolled back in minutes, not months.",
  },
  {
    num: "6", title: "Enhanced Security (DevSecOps)", icon: "🔒", color: "#EC4899",
    company: "Industry wide",
    desc: "Security checks are automated into the pipeline — every commit is scanned for vulnerabilities before merge.",
  },
];

const timeline = [
  {
    year: "2007–2008",
    title: "The Seeds",
    text: "Patrick Debois, a Belgian consultant, frustrated by the wall between Dev and Ops, starts conversations about better collaboration. Agile was growing but didn't include Operations.",
    color: "#6366F1",
  },
  {
    year: "2009",
    title: "Birth of DevOps",
    text: "John Allspaw & Paul Hammond present \"10+ Deploys Per Day\" at Velocity Conference. Patrick Debois organises the first DevOpsDays conference in Ghent, Belgium — coining the term \"DevOps\".",
    color: "#3B82F6",
  },
  {
    year: "2010–2013",
    title: "Growing Adoption",
    text: "The Phoenix Project book published (2013). Tools like Chef, Puppet, and Jenkins gain traction. Netflix, Amazon and Etsy become public case studies.",
    color: "#06B6D4",
  },
  {
    year: "2014–2016",
    title: "Mainstream Acceptance",
    text: "State of DevOps Report starts (Puppet Labs). Docker released in 2013, Kubernetes in 2014. Every major company begins a DevOps transformation.",
    color: "#10B981",
  },
  {
    year: "2017–Present",
    title: "DevOps Everywhere",
    text: "DevSecOps, AIOps, GitOps emerge. Cloud providers (AWS, Azure, GCP) build DevOps services. DevOps is now a core requirement in most engineering job descriptions.",
    color: "#F59E0B",
  },
];

const caseStudies = [
  {
    company: "Amazon",
    icon: "🛒",
    color: "#FF9900",
    challenge: ["Massive scale (millions of customers)", "Need for rapid innovation", "High availability requirements"],
    implementation: ["Microservices architecture", "Automated deployment pipelines", "Continuous monitoring"],
    results: ["Deploys code every 11.7 seconds", "99.99% uptime", "Significantly reduced costs", "Faster time to market"],
  },
  {
    company: "Target",
    icon: "🎯",
    color: "#CC0000",
    challenge: ["Slow deployment process (weeks)", "Competition from Amazon", "Legacy systems"],
    implementation: ["Created DevOps Centre of Excellence", "Invested in automation tools", "Cultural transformation program"],
    results: ["Deployment time: weeks → hours", "Release frequency: monthly → daily", "Improved customer satisfaction", "Better employee morale"],
  },
  {
    company: "NASA JPL",
    icon: "🚀",
    color: "#0072CE",
    challenge: ["Mission-critical systems", "Zero tolerance for errors", "Complex multi-team deployments"],
    implementation: ["Automated testing suites", "Infrastructure as Code", "Continuous integration workflows"],
    results: ["Faster mission deployments", "Reduced human errors", "Better cross-team collaboration", "Significant cost savings"],
  },
];

const quizData = [
  { q: "What does DevOps stand for?",                           a: "Development + Operations" },
  { q: "Name three main objectives of DevOps.",                 a: "Faster delivery, improved collaboration, higher quality (any three)" },
  { q: "In which year was the term '''DevOps''' coined?",           a: "2009" },
  { q: "What is the main cultural shift DevOps promotes?",      a: "Breaking down silos, shared responsibility, collaboration" },
  { q: "Give one example of how automation helps in DevOps.",   a: "Automated testing, automated deployment, automated monitoring" },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Session1() {
  return (
    <>
      <style>{`
        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Page ── */
        .s1-page {
          max-width: 1000px;
          width: 100%;          /* ← was missing */
          overflow-x: hidden;
        }

        /* ── Breadcrumb ── */
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
         
          flex-wrap: wrap;
        }
        .breadcrumb a {
          color: var(--text2);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb a:hover { color: var(--accent); }
        .breadcrumb .sep { color: var(--border2); }
        .breadcrumb .current { color: var(--text); }

        /* ── Session hero ── */
        .session-hero {
          border-radius: 20px;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 60%, #56CCF2 100%);
          padding: 2.5rem 2rem;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }
        .session-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .hero-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          position: relative;
        }
        .hero-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
        }
        .hero-duration {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.65);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .session-hero h1 {
          font-size: clamp(1.5rem, 3.5vw, 2.2rem);
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.15;
          position: relative;
          margin-bottom: 0.75rem;
        }
        .session-hero p {
          color: rgba(255,255,255,0.75);
          font-size: 0.95rem;
          line-height: 1.65;
          max-width: 620px;
          position: relative;
        }

        /* ── Progress strip ── */
        .session-nav-strip {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .snav-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--surface2);
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.06em;
          transition: all 0.2s;
        }
        .snav-pill:hover { color: var(--text); border-color: var(--border2); }
        .snav-pill.active {
          background: linear-gradient(135deg,#1e3c72,#2a5298);
          color: #fff;
          border-color: transparent;
        }

        /* ── Section headings ── */
        .part-title {
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: var(--text);
          margin: 2.5rem 0 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .part-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .part-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: linear-gradient(135deg,#1e3c72,#56CCF2);
          color: #fff;
          padding: 0.2rem 0.65rem;
          border-radius: 100px;
          flex-shrink: 0;
        }

        /* ── Objectives card ── */
        .objectives-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 1.75rem;
          margin-bottom: 2rem;
        }
        .objectives-card h2 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .obj-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .obj-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.92);
          line-height: 1.5;
        }
        .obj-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: rgba(255,215,0,0.25);
          border: 1.5px solid #FFD700;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem;
          color: #FFD700;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ── Definition box ── */
        .def-box {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1.25rem 0;
          box-shadow: 0 4px 20px rgba(52,152,219,0.3);
        }
        .def-box p { color: #fff; font-size: 0.95rem; line-height: 1.65; }
        .def-box strong { color: #FFD700; }

        /* ── Characteristics grid ── */
        .chars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
          margin: 1.25rem 0;
        }
        .char-pill {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.8rem 1rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .char-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg,#1e3c72,#56CCF2);
          flex-shrink: 0;
        }

        /* ── Principle card ── */
        .principle-card {
          border-radius: 14px;
          border: 1px solid var(--border);
          overflow: hidden;
          margin-bottom: 1rem;
          background: var(--surface);
        }
        .principle-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
        }
        .principle-num {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          color: #fff;
          flex-shrink: 0;
        }
        .principle-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
        }
        .principle-example {
          margin: 0 1.25rem 1.25rem;
          background: var(--surface2);
          border-left: 3px solid #27ae60;
          border-radius: 0 8px 8px 0;
          padding: 0.85rem 1rem;
        }
        .example-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #27ae60;
          margin-bottom: 0.4rem;
        }
        .principle-example p {
          font-size: 0.85rem;
          color: var(--text2);
          line-height: 1.6;
        }

        /* ── Objective cards grid ── */
        .obj2-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          margin: 1.25rem 0;
        }
        .obj2-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.25rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .obj2-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .obj2-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .obj2-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .obj2-title { font-size: 0.9rem; font-weight: 700; color: var(--text); }
        .obj2-company {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          color: var(--muted);
          margin-bottom: 0.5rem;
          letter-spacing: 0.06em;
        }
        .obj2-desc { font-size: 0.83rem; color: var(--text2); line-height: 1.6; }

        /* ── Timeline ── */
        .timeline { position: relative; padding: 0.5rem 0; }
        .timeline::before {
          content: '';
          position: absolute;
          left: 16px;
          top: 0; bottom: 0;
          width: 2px;
          background: var(--border);
        }
        .tl-item {
          position: relative;
          padding: 0 0 1.5rem 3.25rem;
        }
        .tl-dot {
          position: absolute;
          left: 8px;
          top: 4px;
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 3px solid var(--bg);
          z-index: 1;
        }
        .tl-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.3rem;
        }
        .tl-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem 1.25rem;
        }
        .tl-card h4 {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.5rem;
        }
        .tl-card p { font-size: 0.83rem; color: var(--text2); line-height: 1.65; }

        /* ── Comparison table ── */
        .comp-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 12px;
          overflow: hidden;
          margin: 1.25rem 0;
          box-shadow: var(--shadow-sm);
          font-size: 0.85rem;
        }
        .comp-table thead th {
          padding: 0.9rem 1rem;
          text-align: left;
          font-weight: 700;
          font-size: 0.82rem;
        }
        .comp-table thead th:first-child { background: #c0392b; color: #fff; }
        .comp-table thead th:last-child  { background: #27ae60; color: #fff; }
        .comp-table td {
          padding: 0.8rem 1rem;
          border-bottom: 1px solid var(--border);
          color: var(--text2);
          line-height: 1.5;
        }
        .comp-table tr:last-child td { border-bottom: none; }
        .comp-table tr:nth-child(even) td { background: var(--surface2); }

        /* ── Example before/after boxes ── */
        .before-after {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1.25rem 0;
        }
        @media(max-width:600px){ .before-after { grid-template-columns: 1fr; } }
        .ba-box {
          border-radius: 12px;
          padding: 1.25rem;
          font-size: 0.83rem;
          line-height: 1.6;
        }
        .ba-box.bad  { background: rgba(231,76,60,0.08); border: 1px solid rgba(231,76,60,0.2); }
        .ba-box.good { background: rgba(39,174,96,0.08);  border: 1px solid rgba(39,174,96,0.2); }
        .ba-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .ba-box.bad  .ba-label { color: #e74c3c; }
        .ba-box.good .ba-label { color: #27ae60; }
        .ba-box ol { padding-left: 1.1rem; }
        .ba-box li { margin-bottom: 0.3rem; color: var(--text2); }
        .ba-total {
          margin-top: 0.75rem;
          font-weight: 700;
          font-size: 0.85rem;
        }
        .ba-box.bad  .ba-total { color: #e74c3c; }
        .ba-box.good .ba-total { color: #27ae60; }

        /* ── Case study cards ── */
        .case-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          margin: 1.25rem 0;
        }
        .case-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
        }
        .case-header {
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .case-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
          background: var(--surface2);
          flex-shrink: 0;
        }
        .case-company { font-size: 1rem; font-weight: 800; color: var(--text); }
        .case-body { padding: 0 1.25rem 1.25rem; }
        .case-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0.8rem 0 0.35rem;
        }
        .case-list { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .case-list li {
          font-size: 0.82rem;
          color: var(--text2);
          padding-left: 1rem;
          position: relative;
          line-height: 1.5;
        }
        .case-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--muted);
          font-size: 0.7rem;
        }
        .case-results li::before { color: #27ae60; content: '✓'; }

        /* ── Key points box ── */
        .key-box {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          margin: 1.25rem 0;
        }
        .key-box h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .is-not-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media(max-width:500px){ .is-not-grid { grid-template-columns: 1fr; } }
        .is-col h4 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .is-col.yes h4 { color: #27ae60; }
        .is-col.no  h4 { color: #e74c3c; }
        .is-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .is-col li { font-size: 0.83rem; color: var(--text2); display: flex; align-items: flex-start; gap: 0.5rem; line-height: 1.45; }
        .is-col.yes li::before { content: '✓'; color: #27ae60; flex-shrink: 0; }
        .is-col.no  li::before { content: '✗'; color: #e74c3c; flex-shrink: 0; }

        /* ── Quiz ── */
        .quiz-box {
          background: linear-gradient(135deg,rgba(99,102,241,0.08),rgba(168,85,247,0.08));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 16px;
          padding: 1.75rem;
          margin: 1.5rem 0;
        }
        .quiz-box h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .quiz-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.9rem 1rem;
        }
        .q-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          color: var(--accent);
          letter-spacing: 0.08em;
          margin-bottom: 0.3rem;
        }
        .q-text { font-size: 0.88rem; font-weight: 600; color: var(--text); margin-bottom: 0.3rem; }
        .q-answer { font-size: 0.82rem; color: var(--text2); font-style: italic; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--border); }

        /* ── Resources ── */
        .resources-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }
        .resources-box h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .res-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 1rem 0 0.5rem;
        }
        .res-list { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .res-list li { font-size: 0.84rem; color: var(--text2); display: flex; align-items: flex-start; gap: 0.5rem; }
        .res-list li::before { content: '↗'; color: var(--accent); flex-shrink: 0; }
        .res-list a { color: var(--accent); text-decoration: none; }
        .res-list a:hover { text-decoration: underline; }

        /* ── Next session card ── */
        .next-card {
          background: linear-gradient(135deg,#1e3c72 0%,#2a5298 100%);
          border-radius: 16px;
          padding: 1.75rem;
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .next-text h4 {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 0.4rem;
        }
        .next-text h3 { font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .next-text ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .next-text li { font-size: 0.83rem; color: rgba(255,255,255,0.7); display: flex; gap: 0.5rem; }
        .next-text li::before { content: '→'; color: #56CCF2; flex-shrink: 0; }
        .next-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e3c72;
          background: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .next-btn:hover { opacity: 0.9; transform: translateX(3px); }

        /* ── Homework ── */
        .hw-box {
          background: rgba(255,193,7,0.06);
          border: 1px solid rgba(255,193,7,0.2);
          border-radius: 14px;
          padding: 1.5rem;
          margin: 1.5rem 0;
        }
        .hw-box h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hw-task {
          margin-bottom: 1rem;
        }
        .hw-task h4 {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hw-task ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; padding-left: 0.5rem; }
        .hw-task li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .hw-task li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }

        /* ── Metrics grid ── */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
          gap: 0.75rem;
          margin: 1rem 0;
        }
        .metric-chip {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text);
          text-align: center;
        }

        @media(max-width:640px){
          .s1-page { padding: 2rem 1rem 4rem; }
          .chars-grid { grid-template-columns: 1fr 1fr; }
          .obj2-grid, .case-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="s1-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link>
          <span className="sep">/</span>
          <span className="current">Session 1: DevOps Fundamentals</span>
        </div>


        {/* Quick nav row */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginBottom:"1.5rem"}}>
          <Link href="/courses/dev/session2" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.68rem",color:"var(--text2)",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"0.4rem",padding:"0.4rem 0.75rem",borderRadius:"8px",border:"1px solid var(--border)",background:"var(--surface)"}}>
            Session 2: SDLC Models →
          </Link>
        </div>

        {/* Hero */}
        <div className="session-hero">
          <div className="hero-meta">
            <span className="hero-badge">Session 1 of 15</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.65rem",letterSpacing:"0.08em",textTransform:"uppercase",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.18)",color:"rgba(255,255,255,0.8)",padding:"0.3rem 0.75rem",borderRadius:"100px"}}>Module 1 — DevOps Foundations</span>
            <span className="hero-duration">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              3 hrs total
            </span>
          </div>
          <h1>DevOps Fundamentals</h1>
          <p>What DevOps is, where it came from, its core principles, objectives, and the cultural shift it demands.</p>
        </div>

        {/* Session nav pills */}
        <div className="session-nav-strip">
          {["Objectives","What is DevOps","Objectives","History","Culture","Case Studies","Quiz","Resources"].map((label, i) => (
            <a key={i} href={`#part${i}`} className={`snav-pill${i === 0 ? " active" : ""}`}>{label}</a>
          ))}
        </div>

        {/* ── LEARNING OBJECTIVES ── */}
        <div id="part0" className="objectives-card">
          <h2>📚 Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o, i) => (
              <li key={i}>
                <span className="obj-check">✓</span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* ── PART 1: WHAT IS DEVOPS ── */}
        <div id="part1">
          <div className="part-title">
            <span className="part-badge">Part 1 · 60 min</span>
            What Is DevOps?
          </div>

          <div className="def-box">
            <p>
              <strong>DevOps</strong> (Development + Operations) is a set of practices, cultural philosophies, and tools that
              combines software development (Dev) and IT operations (Ops). Its goal is to shorten the development lifecycle
              and deliver high-quality software <strong>continuously</strong>.
            </p>
          </div>

          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.25rem 0 0.75rem"}}>Key Characteristics</h3>
          <div className="chars-grid">
            {["Cultural movement","Set of practices","Tool-agnostic","Continuous delivery","Cross-functional teams","Shared responsibility","Automation-first","Feedback loops"].map((c) => (
              <div key={c} className="char-pill"><span className="char-dot"/>{c}</div>
            ))}
          </div>

          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.5rem 0 0.75rem"}}>Core Principles of DevOps</h3>
          {principles.map((p) => (
            <div key={p.num} className="principle-card">
              <div className="principle-header">
                <div className="principle-num" style={{background: p.color}}>{p.num}</div>
                <span className="principle-title">{p.title}</span>
              </div>
              <div className="principle-example">
                <div className="example-label">{p.example.title}</div>
                <p>{p.example.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── PART 2: MAIN OBJECTIVES ── */}
        <div id="part2">
          <div className="part-title">
            <span className="part-badge">Part 2 · 45 min</span>
            DevOps Main Objectives
          </div>
          <div className="obj2-grid">
            {objectives2.map((o) => (
              <div key={o.num} className="obj2-card">
                <div className="obj2-top">
                  <div className="obj2-icon" style={{background: o.color + "18"}}>{o.icon}</div>
                  <div className="obj2-title">{o.num}. {o.title}</div>
                </div>
                <div className="obj2-company">📍 {o.company}</div>
                <div className="obj2-desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PART 3: HISTORY ── */}
        <div id="part3">
          <div className="part-title">
            <span className="part-badge">Part 3 · 30 min</span>
            History of DevOps
          </div>
          <div className="timeline">
            {timeline.map((t) => (
              <div key={t.year} className="tl-item">
                <div className="tl-dot" style={{background: t.color}}/>
                <div className="tl-year" style={{color: t.color}}>{t.year}</div>
                <div className="tl-card">
                  <h4>{t.title}</h4>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PART 4: CULTURAL SHIFT ── */}
        <div id="part4">
          <div className="part-title">
            <span className="part-badge">Part 4 · 25 min</span>
            Cultural Shift
          </div>

          <table className="comp-table">
            <thead>
              <tr>
                <th>❌ Traditional IT (Siloed)</th>
                <th>✅ DevOps Culture</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Separate Dev, QA, Ops teams", "Cross-functional teams"],
                ["\"Throw over the wall\" handoffs", "Shared ownership end-to-end"],
                ["Blame culture when things break", "Blameless post-mortems"],
                ["Infrequent, risky releases", "Small, frequent, safe releases"],
                ["Manual processes", "Automate everything possible"],
                ["Metrics by team / silo", "Shared metrics & goals"],
              ].map(([old, nw], i) => (
                <tr key={i}>
                  <td>{old}</td>
                  <td>{nw}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.5rem 0 0.75rem"}}>Same Feature — Two Worlds</h3>
          <div className="before-after">
            <div className="ba-box bad">
              <div className="ba-label">❌ Without DevOps</div>
              <ol>
                <li>Developer builds login feature (3 weeks)</li>
                <li>Throws code to QA (1 week wait)</li>
                <li>QA finds bugs, returns to Dev (2 weeks)</li>
                <li>Approved code sent to Ops (2 weeks wait)</li>
                <li>Ops struggles to deploy (1 week debug)</li>
              </ol>
              <div className="ba-total">⏱ Total: 9+ weeks</div>
            </div>
            <div className="ba-box good">
              <div className="ba-label">✅ With DevOps</div>
              <ol>
                <li>Team plans feature together (1 day)</li>
                <li>Developer codes with auto-testing (1 week)</li>
                <li>Auto deploy to staging (minutes)</li>
                <li>Team reviews together (1 day)</li>
                <li>One-click deploy to production (minutes)</li>
              </ol>
              <div className="ba-total">⏱ Total: ~1.5 weeks</div>
            </div>
          </div>

          <h3 style={{fontSize:"0.95rem",fontWeight:700,color:"var(--text)",margin:"1.5rem 0 0.75rem"}}>Key Cultural Changes</h3>
          {[
            { title: '"You Build It, You Run It"', company: "Amazon's Approach", text: "Development teams are on-call for their own services. If something breaks at 3 AM, the team who built it fixes it — which motivates building reliable systems." },
            { title: "Fail Fast, Learn Faster", company: "Netflix Chaos Engineering", text: 'Netflix intentionally breaks their own systems with "Chaos Monkey" to find weaknesses before users do. Failure in controlled conditions = resilience in production.' },
            { title: "Automate Everything", company: "Industry Principle", text: "If you do it more than twice, automate it. Free up engineers for creative work, eliminate human error, and build repeatability." },
          ].map((kc) => (
            <div key={kc.title} className="principle-card" style={{marginBottom:"0.75rem"}}>
              <div className="principle-header">
                <div className="principle-num" style={{background:"#2a5298",fontSize:"0.7rem"}}>→</div>
                <span className="principle-title">{kc.title}</span>
              </div>
              <div className="principle-example">
                <div className="example-label">{kc.company}</div>
                <p>{kc.text}</p>
              </div>
            </div>
          ))}

          <div style={{margin:"1rem 0"}}>
            <div style={{fontSize:"0.88rem",fontWeight:700,color:"var(--text)",marginBottom:"0.75rem"}}>Common DevOps Metrics</div>
            <div className="metrics-grid">
              {["Deployment Frequency","Lead Time for Changes","Mean Time to Recovery","Change Failure Rate"].map((m) => (
                <div key={m} className="metric-chip">{m}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CASE STUDIES ── */}
        <div id="part5">
          <div className="part-title">
            <span className="part-badge">Case Studies · 20 min</span>
            Real-World Examples
          </div>
          <div className="case-grid">
            {caseStudies.map((cs) => (
              <div key={cs.company} className="case-card">
                <div className="case-header" style={{borderBottom:"1px solid var(--border)"}}>
                  <div className="case-icon">{cs.icon}</div>
                  <div>
                    <div className="case-company" style={{color: cs.color}}>{cs.company}</div>
                  </div>
                </div>
                <div className="case-body">
                  <div className="case-section-label">Challenge</div>
                  <ul className="case-list">
                    {cs.challenge.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                  <div className="case-section-label">DevOps Implementation</div>
                  <ul className="case-list">
                    {cs.implementation.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                  <div className="case-section-label">Results</div>
                  <ul className="case-list case-results">
                    {cs.results.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── KEY TAKEAWAYS ── */}
        <div className="key-box" style={{marginTop:"2rem"}}>
          <h3>🏁 Key Takeaways</h3>
          <div className="is-not-grid">
            <div className="is-col yes">
              <h4>DevOps IS:</h4>
              <ul>
                {["A culture of collaboration","A set of practices & processes","Continuous improvement mindset","Shared responsibility","Automation of repetitive tasks"].map(t=><li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="is-col no">
              <h4>DevOps is NOT:</h4>
              <ul>
                {["Just a job title","Only about tools","A team name","A one-time project","A replacement for Agile"].map(t=><li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* ── HOMEWORK ── */}
        <div id="part6" className="hw-box">
          <h3>📝 Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Research Assignment:</h4>
            <ul>
              <li>Find one company that has successfully implemented DevOps</li>
              <li>Write a 1-page summary: challenges, tools used, results</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Reflection Questions:</h4>
            <ul>
              <li>How would DevOps change the way you work on your college projects?</li>
              <li>What do you think is the biggest obstacle to DevOps adoption?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Prepare for Next Session:</h4>
            <ul>
              <li>Read about Waterfall vs Agile methodologies</li>
              <li>Think about how DevOps relates to Agile</li>
            </ul>
          </div>
        </div>

        {/* ── QUIZ ── */}
        <div id="part7" className="quiz-box">
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

        {/* ── RESOURCES ── */}
        <div id="part8" className="resources-box">
          <h3>📚 Additional Resources</h3>
          <div className="res-section-label">Videos</div>
          <ul className="res-list">
            <li><a href="https://www.youtube.com/results?search_query=what+is+devops+aws" target="_blank" rel="noreferrer">What is DevOps? by AWS (10 min)</a></li>
            <li><a href="https://www.youtube.com/results?search_query=10+deploys+per+day+velocity" target="_blank" rel="noreferrer">10+ Deploys Per Day — Velocity 2009 (30 min)</a></li>
          </ul>
          <div className="res-section-label">Articles &amp; Books</div>
          <ul className="res-list">
            <li><span>The Phoenix Project — Chapter 1 (DevOps through story)</span></li>
            <li><a href="https://www.atlassian.com/devops/what-is-devops/devops-culture" target="_blank" rel="noreferrer">DevOps Culture — Atlassian</a></li>
          </ul>
          <div className="res-section-label">Websites</div>
          <ul className="res-list">
            <li><a href="https://devops.com" target="_blank" rel="noreferrer">devops.com</a></li>
            <li><a href="https://www.devopsinstitute.com" target="_blank" rel="noreferrer">The DevOps Institute</a></li>
            <li><a href="https://aws.amazon.com/devops/what-is-devops/" target="_blank" rel="noreferrer">AWS DevOps Resources</a></li>
          </ul>
        </div>

        {/* ── NEXT SESSION ── */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next</h4>
            <h3>Session 2: SDLC Models &amp; DevOps</h3>
            <ul>
              <li>Deep dive into Waterfall and Agile</li>
              <li>How DevOps enhances Agile</li>
              <li>Practical comparison with real-world examples</li>
            </ul>
          </div>
          <Link href="/courses/dev/session2" className="next-btn">
            Session 2 →
          </Link>
        </div>

      </div>
    </>
  );
}