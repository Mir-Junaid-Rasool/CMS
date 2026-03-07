// app/courses/dev/session9/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Understand what a Jenkins Pipeline is and why Pipeline as Code matters",
  "Write a complete Declarative Pipeline using correct Jenkinsfile syntax",
  "Understand all Declarative Pipeline blocks: pipeline, agent, stages, stage, steps, post",
  "Use environment variables, parameters, when conditions, and parallel stages",
  "Configure a Jenkins Master-Slave (Controller-Agent) Node setup step by step",
  "Connect an Agent node via SSH and via JNLP and understand the difference",
  "Use node labels to direct specific jobs to specific agents",
  "Understand Jenkins Workspace Management — location, lifecycle, and cleanup strategies",
  "Configure workspace cleanup policies and build discard rules to manage disk usage",
  "Build a complete Pipeline that targets a specific agent by label and archives artefacts",
];

const whyPipeline = [
  ["Pipeline as Code",    "The Jenkinsfile lives in Git alongside your source — versioned, reviewed, and rolled back like any other file"],
  ["Survives restarts",   "If Jenkins restarts mid-build, a Pipeline can resume — Freestyle jobs die and must restart from scratch"],
  ["Full stage visibility","Blue Ocean and Stage View show every stage status at a glance — Freestyle is a single opaque block"],
  ["Parallel execution",  "Run tests on multiple agents simultaneously — cut build time by running independent stages at the same time"],
  ["Complex conditions",  "when directives skip stages based on branch, parameters, or any expression — not possible in Freestyle"],
  ["Reusable logic",      "Extract shared steps into Shared Libraries — one centralised tested library used by every team's pipeline"],
];

const declarativeBlocks = [
  { block:"pipeline { }",    role:"Mandatory outermost block. Every Declarative Jenkinsfile must start here. All other blocks are nested inside it.", example:"pipeline {\n  agent any\n  stages { ... }\n  post { ... }\n}" },
  { block:"agent",           role:"WHERE the build runs. 'any' = first available executor. 'none' = each stage sets its own agent. Can target a label or Docker image.", example:"agent any\nagent none\nagent { label 'linux-slave' }\nagent { docker 'maven:3.9-jdk17' }" },
  { block:"stages { }",      role:"Container for all stage blocks. Must contain at least one stage. Stages run sequentially by default.", example:"stages {\n  stage('Build') { ... }\n  stage('Test')  { ... }\n  stage('Deploy'){ ... }\n}" },
  { block:"stage('name') {}", role:"A named logical unit. Name appears as a column in Stage View. Must contain steps, parallel, or nested stages.", example:"stage('Unit Tests') {\n  steps {\n    sh 'mvn test'\n  }\n}" },
  { block:"steps { }",        role:"The actual commands inside a stage. Contains sh, bat, echo, archiveArtifacts, junit, withCredentials, and plugin steps.", example:"steps {\n  sh 'mvn clean package'\n  echo 'Build complete'\n  archiveArtifacts 'target/*.jar'\n}" },
  { block:"post { }",         role:"Runs after stages finish. Conditions: always, success, failure, unstable, changed. Use for cleanup, notifications, reporting.", example:"post {\n  always  { cleanWs() }\n  success { archiveArtifacts 'target/*.jar' }\n  failure { echo \"FAILED: ${env.BUILD_URL}\" }\n}" },
  { block:"environment { }",  role:"Define variables scoped to the whole pipeline or a single stage. Use credentials() to inject secrets — they are masked in logs.", example:"environment {\n  APP_ENV  = 'staging'\n  GH_TOKEN = credentials('github-token')\n}" },
  { block:"parameters { }",   role:"Declare build parameters (string, boolean, choice). Jenkins auto-generates a form. Access with params.NAME.", example:"parameters {\n  booleanParam(name:'SKIP_TESTS', defaultValue:false)\n  choice(name:'ENV', choices:['dev','staging','prod'])\n}" },
  { block:"when { }",         role:"Conditional stage execution. Conditions: branch, expression, environment, not, allOf, anyOf. Skipped stages show as grey.", example:"when { branch 'main' }\nwhen { expression { return params.ENV == 'prod' } }" },
  { block:"parallel { }",     role:"Run multiple sub-stages simultaneously on different executors. Ideal for splitting test suites or running cross-platform builds.", example:"parallel {\n  stage('Linux') { agent { label 'linux' }\n    steps { sh 'mvn test' } }\n  stage('Win')   { agent { label 'windows' }\n    steps { bat 'mvn test' } }\n}" },
];

const masterSlaveIntro = [
  ["Jenkins Controller (Master)", "The central brain — hosts the web UI, stores all job config, schedules builds, dispatches jobs to agents, collects results. Should NOT run heavy builds itself."],
  ["Jenkins Agent (Slave)",       "A machine that executes builds assigned by the Controller. Has executors (build slots). Can be any OS — Linux, Windows, macOS, Docker container."],
  ["Executor",                    "A single build slot on a Node. A node with 3 executors can run 3 builds simultaneously. The Controller also has executors (set to 0 for pure coordination)."],
  ["Node Label",                  "A tag you assign to an Agent — e.g. 'linux', 'windows', 'docker', 'high-mem'. Jobs use agent { label 'linux' } to target that agent specifically."],
  ["JNLP / Inbound Agent",        "Agent connects OUT to the Controller on port 50000. Use when the Agent cannot be reached by SSH (behind NAT/firewall)."],
  ["SSH Agent",                   "Controller connects IN to the Agent over SSH. Simpler, more common on Linux. Requires the agent to have Java installed and SSH open."],
];

const workspaceDetails = [
  ["Default path (Linux)",    "/var/lib/jenkins/workspace/JOB_NAME — each job gets its own subdirectory"],
  ["Default path (Windows)",  "C:\\ProgramData\\Jenkins\\.jenkins\\workspace\\JOB_NAME"],
  ["What lives there",        "Cloned source code, compiled classes, test reports, artefact files — everything produced during the build"],
  ["Reused between builds",   "Yes by default — workspace is NOT wiped between runs. Previous build files remain unless you explicitly clean"],
  ["Stale file risk",         "If a file is deleted from Git, it may still exist in the workspace until you wipe it — causing misleading results"],
  ["Wipe from UI",            "Job page → left sidebar → Wipe Out Workspace — immediately deletes the entire workspace directory"],
  ["Clean via Jenkinsfile",   "post { always { cleanWs() } } — cleanWs() plugin deletes workspace after every build automatically"],
  ["Clean via config",        "Configure → Build Environment → check 'Delete workspace before build starts' — fresh clone every time"],
  ["Artefact archiving",      "archiveArtifacts saves specific files to Jenkins storage — they survive workspace wipes and container deletions"],
  ["Disk management",         "Configure → Discard Old Builds — set max builds to keep (10–30) and max days (30) to cap log and artefact storage"],
];

const quizData = [
  { q: "What is the outermost mandatory block in every Declarative Jenkinsfile?",
    a: "pipeline { } — everything else (agent, stages, environment, post, parameters) is nested inside this block." },
  { q: "What does 'agent none' mean at the top of a Pipeline, and why use it?",
    a: "'agent none' means no global executor is allocated for the pipeline itself — each stage must declare its own agent. Use it when different stages need different environments, e.g. build on Linux, test on Windows." },
  { q: "What is the difference between a Jenkins Controller and an Agent?",
    a: "The Controller (Master) is the central server — it manages the UI, schedules jobs, and stores all configuration. Agents (Slaves) are separate machines that actually run the builds. The Controller dispatches work; Agents execute it." },
  { q: "What is a Node Label in Jenkins and how do you use it in a Pipeline?",
    a: "A label is a tag applied to an Agent node — e.g. 'linux' or 'docker'. In a Pipeline you use agent { label 'linux' } to direct that stage to run only on nodes tagged 'linux'." },
  { q: "What is the difference between SSH Agent connection and JNLP (Inbound) Agent connection?",
    a: "SSH: the Controller reaches out to the Agent via SSH — requires SSH access from Controller to Agent. JNLP: the Agent reaches out to the Controller on port 50000 — used when the Agent is behind a firewall or NAT and cannot be reached by SSH." },
  { q: "What does the cleanWs() step do and where should you put it?",
    a: "cleanWs() deletes the entire workspace directory on the agent after the build. Put it in post { always { cleanWs() } } so it runs after every build regardless of pass or fail — this prevents stale files and disk bloat." },
  { q: "What is the difference between Poll SCM and Build Periodically?",
    a: "Poll SCM: Jenkins checks the Git repo at the scheduled interval and only builds if new commits exist — smart, avoids unnecessary builds. Build Periodically: runs on the schedule regardless of whether code changed — use for nightly reports or jobs that must run on a timer." },
  { q: "How do you make a stage only run on the 'main' branch?",
    a: "Add a when { branch 'main' } directive inside the stage block. On any other branch the stage is skipped (shown grey in Stage View). It is not an error — just a condition not met." },
];

const takeaways = [
  ["Jenkinsfile",      "Pipeline as Code — stored in Git, reviewed like source code"],
  ["Declarative",      "Structured blocks: pipeline, agent, stages, steps, post"],
  ["agent label",      "Target a specific Agent node by its label"],
  ["parallel",         "Run stages simultaneously to cut build time"],
  ["when",             "Skip stages conditionally — by branch, param, or expression"],
  ["Master/Slave",     "Controller coordinates; Agents execute — scales to any size"],
  ["Workspace",        "Build directory on Agent — clean it to avoid stale files"],
  ["cleanWs()",        "Delete workspace after every build — post { always { } }"],
];

export default function Session9() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s9-page {
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
          overflow-x: hidden;
        }

        .bc { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); margin-bottom: 2rem; }
        .bc a { color: var(--text2); text-decoration: none; transition: color 0.2s; }
        .bc a:hover { color: var(--accent); }
        .bc .sep { color: var(--border2); }
        .bc .cur { color: var(--text); }

        .nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
        .nav-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); transition: all 0.2s; white-space: nowrap; }
        .nav-btn:hover { color: var(--text); border-color: var(--border2); }

        .hero { border-radius: 20px; background: linear-gradient(135deg, #0d2818 0%, #1a5c38 55%, #27ae60 100%); padding: 2.5rem 2rem; margin-bottom: 2rem; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px; }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .h-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-mod   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-dur   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem; }
        .hero h1 { font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem; }
        .hero p  { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jpill { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; padding: 0.3rem 0.8rem; border-radius: 100px; border: 1px solid var(--border); background: var(--surface2); color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
        .jpill:hover { color: var(--text); border-color: var(--border2); }
        .jpill.active { background: linear-gradient(135deg,#1a5c38,#27ae60); color: #fff; border-color: transparent; }

        .pt { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text); margin: 2.5rem 0 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .pt::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .pt-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(135deg,#1a5c38,#27ae60); color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }

        .obj-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; }
        .obj-card h2 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1.1rem; }
        .obj-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .obj-list li { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: rgba(255,255,255,0.92); line-height: 1.5; }
        .obj-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(255,215,0,0.2); border: 1.5px solid #FFD700; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: #FFD700; flex-shrink: 0; margin-top: 2px; }

        .body-text { font-size: 0.9rem; color: var(--text2); line-height: 1.75; margin-bottom: 1rem; }
        .body-text strong { color: var(--text); }
        .body-text code { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .sub-h { font-size: 0.95rem; font-weight: 700; color: var(--text); margin: 1.5rem 0 0.75rem; }

        .tip-box { background: rgba(26,92,56,0.07); border-left: 3px solid #27ae60; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .tip-box h4 { font-size: 0.82rem; font-weight: 700; color: #1a5c38; margin-bottom: 0.5rem; }
        .tip-box p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .tip-box ul { list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .tip-box li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }
        .tip-box li::before { content: '→'; color: #27ae60; flex-shrink: 0; font-size: 0.75rem; margin-top: 1px; }
        .tip-box strong { color: var(--text); }
        .tip-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .ex-box { background: var(--surface2); border-left: 3px solid #3498db; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .ex-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #3498db; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.6rem; font-weight: 600; }
        .ex-box p { font-size: 0.84rem; color: var(--text2); line-height: 1.65; margin-bottom: 0.45rem; }
        .ex-box p:last-child { margin-bottom: 0; }
        .ex-box ul { padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
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

        .cb { background: #0d1117; color: #e6edf3; padding: 1.25rem; border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; line-height: 1.9; overflow-x: auto; margin: 0.75rem 0; border: 1px solid rgba(255,255,255,0.06); }
        .c-cm  { color: #8b949e; }
        .c-kw  { color: #ff7b72; font-weight: 600; }
        .c-str { color: #a5d6ff; }
        .c-fn  { color: #d2a8ff; }
        .c-ok  { color: #56d364; }
        .c-err { color: #ff7b72; }
        .c-out { color: #a5d6ff; }

        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin: 1.25rem 0; }
        @media(max-width:560px){ .feat-grid { grid-template-columns: 1fr; } }
        .feat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.85rem 1rem; display: flex; gap: 0.6rem; align-items: flex-start; }
        .feat-icon { color: #27ae60; font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
        .feat-card strong { font-size: 0.84rem; color: var(--text); display: block; margin-bottom: 0.12rem; }
        .feat-card span { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        .block-list { display: flex; flex-direction: column; gap: 0.75rem; margin: 1.25rem 0; }
        .block-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
        .block-header { padding: 0.75rem 1.1rem 0.5rem; border-bottom: 1px solid var(--border); }
        .block-name { font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; font-weight: 700; color: #27ae60; }
        .block-body { padding: 0.75rem 1.1rem; }
        .block-role { font-size: 0.82rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.65rem; }
        .block-example { background: #0d1117; border-radius: 8px; padding: 0.75rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #a5d6ff; line-height: 1.8; white-space: pre; overflow-x: auto; }

        .data-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; margin: 1.25rem 0; }
        .data-table thead th { background: var(--surface2); color: var(--text); font-weight: 700; padding: 0.65rem 0.9rem; text-align: left; border-bottom: 2px solid var(--border); font-size: 0.78rem; }
        .data-table tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
        .data-table tbody tr:hover { background: var(--surface); }
        .data-table td { padding: 0.6rem 0.9rem; color: var(--text2); vertical-align: top; line-height: 1.5; }
        .data-table td:first-child { color: var(--text); font-weight: 600; font-size: 0.8rem; }

        .workflow { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0; position: relative; }
        .workflow::before { content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 2px; background: var(--border); z-index: 0; }
        .wf-step { display: flex; align-items: flex-start; gap: 0.85rem; padding: 0.9rem 1rem; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); position: relative; z-index: 1; transition: border-color 0.2s; }
        .wf-step:hover { border-color: var(--border2); }
        .wf-num { width: 28px; height: 28px; border-radius: 8px; background: #27ae60; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; flex-shrink: 0; }
        .wf-body { display: flex; flex-direction: column; gap: 0.2rem; width: 100%; }
        .wf-body strong { font-size: 0.88rem; color: var(--text); }
        .wf-body p { font-size: 0.8rem; color: var(--text2); line-height: 1.5; }
        .wf-body code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .arch { display: flex; flex-direction: column; align-items: center; gap: 0; margin: 1.5rem 0; width: 100%; }
        .arch-master { width: 100%; border-radius: 14px; padding: 1.1rem 1.4rem; background: rgba(39,174,96,0.06); border: 2px solid #27ae60; box-sizing: border-box; }
        .arch-master h4 { font-size: 0.9rem; font-weight: 800; color: #27ae60; margin-bottom: 0.4rem; }
        .arch-master p  { font-size: 0.8rem; color: var(--text2); line-height: 1.5; margin-bottom: 0.5rem; }
        .arch-master ul { list-style: none; display: flex; flex-direction: column; gap: 0.22rem; }
        .arch-master li { font-size: 0.78rem; color: var(--text2); display: flex; gap: 0.4rem; }
        .arch-master li::before { content: '•'; color: #27ae60; flex-shrink: 0; }
        .arch-arrow { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0; letter-spacing: 0.06em; width: 100%; }
        .arch-arrow::before, .arch-arrow::after { content: ''; flex: 1; max-width: 80px; height: 1px; background: var(--border); }
        .arch-agents { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.5rem; width: 100%; }
        @media(max-width:560px){ .arch-agents { grid-template-columns: 1fr; } }
        .arch-agent { border-radius: 12px; padding: 0.85rem 1rem; background: rgba(3,102,214,0.06); border: 2px solid #0366d6; }
        .arch-agent h4 { font-size: 0.8rem; font-weight: 700; color: #0366d6; margin-bottom: 0.25rem; }
        .arch-agent p  { font-size: 0.74rem; color: var(--text2); line-height: 1.45; }

        .act-box { background: linear-gradient(135deg,#0d2818 0%,#1a5c38 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .act-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .act-box h4 { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 1.1rem 0 0.5rem; }
        .lab-ol { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; padding: 1rem 1rem 1rem 2rem; margin-bottom: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .lab-ol li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.55; }
        .lab-ol li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }
        .lab-ol li strong { color: #fff; }

        .quiz-box { background: linear-gradient(135deg,rgba(26,92,56,0.08),rgba(39,174,96,0.08)); border: 1px solid rgba(39,174,96,0.2); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .quiz-box h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.25rem; }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .qi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.9rem 1rem; }
        .qi-n { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #27ae60; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
        .qi-q { font-size: 0.88rem; font-weight: 600; color: var(--text); }
        .qi-a { font-size: 0.82rem; color: var(--text2); font-style: italic; margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px solid var(--border); }

        .hw-box { background: rgba(255,193,7,0.06); border: 1px solid rgba(255,193,7,0.2); border-radius: 14px; padding: 1.5rem; margin: 1.5rem 0; }
        .hw-box h3 { font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 1rem; }
        .hw-task { margin-bottom: 0.85rem; }
        .hw-task h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; }
        .hw-task ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; padding-left: 0.5rem; }
        .hw-task li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.4rem; }
        .hw-task li::before { content: '•'; color: #F59E0B; flex-shrink: 0; }
        .hw-task li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.35rem; border-radius: 4px; color: var(--accent); }

        .tk-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 0.65rem; margin: 1rem 0; }
        .tk-card { background: var(--surface); border: 1px solid var(--border); border-top: 3px solid #27ae60; border-radius: 12px; padding: 0.9rem 1rem; }
        .tk-card h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; font-family: 'JetBrains Mono', monospace; }
        .tk-card p  { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        .flow-pill { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.5rem; margin: 1.25rem 0; }
        .fp { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text); background: var(--surface); border: 1px solid var(--border); padding: 0.45rem 0.9rem; border-radius: 8px; }
        .fp-arrow { color: var(--muted); font-size: 0.9rem; }

        .rules-box { background: rgba(26,92,56,0.05); border: 1px solid rgba(39,174,96,0.2); border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0; }
        .rules-box h4 { font-size: 0.85rem; font-weight: 700; color: #1a5c38; margin-bottom: 0.65rem; }
        .rules-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .rules-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .rules-box li::before { content: '✓'; color: #27ae60; flex-shrink: 0; font-weight: 700; }

        .next-card { background: linear-gradient(135deg,#1a0a2e 0%,#6c3483 100%); border-radius: 16px; padding: 1.75rem; margin-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .next-text h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem; }
        .next-text h3 { font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .next-text ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .next-text li { font-size: 0.83rem; color: rgba(255,255,255,0.8); display: flex; gap: 0.5rem; }
        .next-text li::before { content: '→'; color: rgba(255,255,255,0.6); flex-shrink: 0; }
        .next-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 700; color: #6c3483; background: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.5rem; transition: opacity 0.2s, transform 0.2s; }
        .next-btn:hover { opacity: 0.9; transform: translateX(3px); }

        @media(max-width:640px){
          .s9-page { padding: 2rem 1rem 4rem; }
          .nav-row { flex-direction: column; }
          .nav-btn { width: 100%; justify-content: center; }
          .hero { padding: 1.5rem 1rem; border-radius: 14px; }
          .hero h1 { font-size: 1.3rem; }
          .next-card { flex-direction: column; align-items: stretch; }
          .next-btn { width: 100%; justify-content: center; }
          .jump-nav { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 0.4rem; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .jump-nav::-webkit-scrollbar { display: none; }
          .jpill { flex-shrink: 0; }
          .act-box { padding: 1.25rem 1rem; }
          .lab-ol { padding: 0.85rem 0.85rem 0.85rem 1.75rem; }
        }
        @media(max-width:400px){ .hero h1 { font-size: 1.1rem; } }
      `}</style>

      <div className="s9-page">

        <div className="bc">
          <Link href="/">Home</Link><span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link><span className="sep">/</span>
          <span className="cur">Session 9: Pipelines, Agents &amp; Workspace</span>
        </div>

        <div className="nav-row">
          <Link href="/courses/dev/session8" className="nav-btn">&larr; Session 8: Configuring Jenkins</Link>
          <Link href="/courses/dev/session10" className="nav-btn">Session 10: Security &amp; Plugins &rarr;</Link>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 9 of 15</span>
            <span className="h-mod">Module 3 &mdash; Continuous Integration</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4.5 hrs
            </span>
          </div>
          <h1>&#128221; Pipelines, Master-Slave Agents &amp; Workspace</h1>
          <p>Write your build process as code, distribute builds across multiple machines, and manage workspace storage cleanly &mdash; the three pillars of scalable Jenkins.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","Why Pipeline","Syntax","All Blocks","First Pipeline","Scheduling","Parallel & when","Master-Slave","Add SSH Agent","Add JNLP Agent","Agent Labels","Workspace Mgmt","Full Pipeline","Lab","Quiz","Homework"].map((l,i)=>(
            <a key={i} href={`#s9p${i}`} className={`jpill${i===0?" active":""}`}>{l}</a>
          ))}
        </div>

        {/* OBJECTIVES */}
        <div id="s9p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o,i)=>(
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* WHY PIPELINE */}
        <div id="s9p1">
          <div className="pt"><span className="pt-badge">Foundation</span>Why Pipeline as Code?</div>
          <p className="body-text">
            A <strong>Jenkins Pipeline</strong> is your entire build, test, and deploy process defined as a file called a <strong>Jenkinsfile</strong> stored in Git. Instead of clicking through Jenkins forms, you write code &mdash; and that code is versioned, reviewed, and reproducible.
          </p>
          <div className="ex-box">
            <div className="ex-label">&#127916; The Core Shift</div>
            <p><strong>Before (Freestyle):</strong> Build logic lives inside Jenkins, configured through web forms. Invisible in Git, impossible to review in a pull request, lost if Jenkins is rebuilt.</p>
            <p><strong>After (Jenkinsfile):</strong> Build logic lives in your repository. Every change is a Git commit. Any developer can read it, review it, roll it back. Works identically on any Jenkins server.</p>
          </div>
          <div className="feat-grid">
            {whyPipeline.map(([t,d])=>(
              <div key={t} className="feat-card"><span className="feat-icon">&#9654;</span><div><strong>{t}</strong><span>{d}</span></div></div>
            ))}
          </div>
          <div className="tip-box">
            <h4>&#128161; Declarative vs Scripted Pipeline</h4>
            <ul>
              <li><strong>Declarative</strong> &mdash; structured, opinionated blocks (pipeline, agent, stages, steps, post). Easier to read and validate. Use this.</li>
              <li><strong>Scripted</strong> &mdash; raw Groovy, maximum flexibility, no enforced structure. Harder, older. Use only when Declarative cannot express your need.</li>
              <li><strong>Rule:</strong> Always start with Declarative. Use a <code>script {"{ }"}</code> block inside Declarative when you need a small amount of custom Groovy logic.</li>
            </ul>
          </div>
        </div>

        {/* DECLARATIVE SYNTAX */}
        <div id="s9p2">
          <div className="pt"><span className="pt-badge">Syntax</span>Declarative Pipeline Skeleton</div>
          <p className="body-text">Every Declarative Pipeline follows the same structure. Learn this grammar once and every Jenkinsfile becomes readable.</p>
          <div className="cb">
<span className="c-cm">// Jenkinsfile — place in the root of your Git repository</span>{"\n\n"}
<span className="c-kw">pipeline</span> {"{"}                          <span className="c-cm">// mandatory outermost block</span>{"\n"}
  <span className="c-kw">agent</span> any                            <span className="c-cm">// run on any available executor</span>{"\n\n"}
  <span className="c-kw">environment</span> {"{"}                     <span className="c-cm">// variables available to all stages</span>{"\n"}
    APP_NAME = <span className="c-str">'hello-maven'</span>{"\n"}
    GH_TOKEN = <span className="c-fn">credentials</span>(<span className="c-str">'github-token'</span>)  <span className="c-cm">// injected, masked in logs</span>{"\n"}
  {"}"}{"\n\n"}
  <span className="c-kw">parameters</span> {"{"}                      <span className="c-cm">// user fills this form before building</span>{"\n"}
    <span className="c-fn">booleanParam</span>(name:<span className="c-str">'SKIP_TESTS'</span>, defaultValue:false){"\n"}
    <span className="c-fn">choice</span>(name:<span className="c-str">'ENV'</span>, choices:[<span className="c-str">'dev'</span>,<span className="c-str">'staging'</span>,<span className="c-str">'prod'</span>]){"\n"}
  {"}"}{"\n\n"}
  <span className="c-kw">stages</span> {"{"}                          <span className="c-cm">// container for all stages</span>{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Checkout'</span>) {"{"}             <span className="c-cm">// stage 1 — named unit of work</span>{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">checkout</span> scm {"}"}{"\n"}
    {"}"}{"\n\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Build'</span>) {"{"}               <span className="c-cm">// stage 2</span>{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'mvn clean package -DskipTests'</span> {"}"}{"\n"}
    {"}"}{"\n\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Test'</span>) {"{"}                <span className="c-cm">// stage 3</span>{"\n"}
      <span className="c-kw">when</span> {"{"} expression {"{"} <span className="c-kw">return</span> !params.SKIP_TESTS {"}"} {"}"}{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-fn">sh</span> <span className="c-str">'mvn test'</span>{"\n"}
        <span className="c-fn">junit</span> <span className="c-str">'target/surefire-reports/*.xml'</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Package'</span>) {"{"}             <span className="c-cm">// stage 4</span>{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">archiveArtifacts</span> <span className="c-str">'target/*.jar'</span> {"}"}{"\n"}
    {"}"}{"\n"}
  {"}"}{"\n\n"}
  <span className="c-kw">post</span> {"{"}                            <span className="c-cm">// runs after all stages complete</span>{"\n"}
    <span className="c-kw">always</span>  {"{"} <span className="c-fn">cleanWs</span>() {"}"}{"\n"}
    <span className="c-kw">success</span> {"{"} <span className="c-fn">echo</span> <span className="c-str">'&#9989; Pipeline passed!'</span> {"}"}{"\n"}
    <span className="c-kw">failure</span> {"{"} <span className="c-fn">echo</span> <span className="c-str">'&#10060; Pipeline FAILED!'</span> {"}"}{"\n"}
  {"}"}{"\n"}
{"}"}
          </div>
        </div>

        {/* ALL BLOCKS */}
        <div id="s9p3">
          <div className="pt"><span className="pt-badge">Reference</span>Every Declarative Block</div>
          <div className="block-list">
            {declarativeBlocks.map(b=>(
              <div key={b.block} className="block-card">
                <div className="block-header"><span className="block-name">{b.block}</span></div>
                <div className="block-body">
                  <p className="block-role">{b.role}</p>
                  <div className="block-example">{b.example}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FIRST PIPELINE */}
        <div id="s9p4">
          <div className="pt"><span className="pt-badge">Hands-on</span>Creating Your First Pipeline Job</div>
          <p className="body-text">Two methods: paste the script directly in Jenkins (good for learning), or point at a Jenkinsfile in Git (the real-world approach).</p>

          <div className="sub-h">Method A &mdash; Pipeline Script in the Job</div>
          <div className="workflow">
            {[
              {n:"1",t:"New Item → Pipeline",b:"Dashboard → New Item → name: my-first-pipeline → choose Pipeline → OK."},
              {n:"2",t:"Scroll to Pipeline section",b:"At the bottom of the configuration page: Definition = 'Pipeline script'. Paste your Jenkinsfile code into the Script textarea."},
              {n:"3",t:"Save and Build Now",b:"Click Save → Build Now. The Stage View appears showing each stage as a column with colour and duration."},
              {n:"4",t:"Explore Stage View",b:"Hover over any stage cell to see its duration. Click a cell for that stage's logs only. Click the build number for the full Console Output."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>

          <div className="sub-h">Method B &mdash; Jenkinsfile from Git (Real-World)</div>
          <div className="workflow">
            {[
              {n:"1",t:"Create Jenkinsfile in repo root",b:"Create a file named exactly Jenkinsfile (no extension) in the root of your GitHub repository. Commit and push."},
              {n:"2",t:"New Item → Pipeline",b:"Dashboard → New Item → Pipeline → OK."},
              {n:"3",t:"Change Definition to SCM",b:"Pipeline section → Definition → change to 'Pipeline script from SCM'."},
              {n:"4",t:"Configure SCM",b:"SCM: Git. Repository URL: git@github.com:you/repo.git. Credentials: your SSH key. Branch: */main."},
              {n:"5",t:"Script Path",b:"Script Path: Jenkinsfile (default — leave as-is if the file is in the root). Click Save → Build Now."},
              {n:"6",t:"Every build re-reads the Jenkinsfile",b:"Jenkins clones your repo and reads the Jenkinsfile fresh on every build. Change the pipeline by committing to Git — no Jenkins UI changes needed."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>
        </div>

        {/* SCHEDULING */}
        <div id="s9p5">
          <div className="pt"><span className="pt-badge">Triggers</span>Scheduling Build Jobs — Poll SCM &amp; Build Periodically</div>
          <p className="body-text">
            Jenkins can start builds automatically on a schedule using <strong>cron expressions</strong>. Two triggers use cron: <strong>Poll SCM</strong> (smart — only builds if code changed) and <strong>Build Periodically</strong> (always builds on schedule regardless).
          </p>

          <div className="feat-grid">
            {[
              ["Poll SCM","Jenkins checks the Git repository at the scheduled interval. If new commits exist → it builds. If nothing changed → it skips silently. Smart, avoids unnecessary builds.","#27ae60"],
              ["Build Periodically","Jenkins builds on the schedule regardless of whether code changed. Use for: nightly test suites, scheduled reports, recurring maintenance jobs.","#e67e22"],
            ].map(([t,d])=>(
              <div key={t} className="feat-card"><span className="feat-icon">&#9201;</span><div><strong>{t}</strong><span>{d}</span></div></div>
            ))}
          </div>

          <div className="sub-h">Cron Expression Syntax &mdash; Full Reference</div>
          <div className="cb">
<span className="c-cm"># Format:  MINUTE  HOUR  DAY-OF-MONTH  MONTH  DAY-OF-WEEK</span>{"\n"}
<span className="c-cm"># H = Hash — Jenkins picks a consistent random value to spread load across jobs</span>{"\n\n"}
<span className="c-out">H/5 * * * *</span>      <span className="c-cm">  # Every 5 minutes</span>{"\n"}
<span className="c-out">H * * * *</span>         <span className="c-cm">  # Once per hour at a random minute</span>{"\n"}
<span className="c-out">H 2 * * *</span>         <span className="c-cm">  # Every day at some time around 2 AM</span>{"\n"}
<span className="c-out">H 2 * * 1-5</span>       <span className="c-cm">  # Monday–Friday around 2 AM (weekdays only)</span>{"\n"}
<span className="c-out">H 8,14,20 * * *</span>   <span className="c-cm">  # Three times a day: ~8am, ~2pm, ~8pm</span>{"\n"}
<span className="c-out">H H 1 * *</span>         <span className="c-cm">  # Once per month on the 1st</span>{"\n"}
<span className="c-out">@daily</span>            <span className="c-cm">  # Shorthand for H H * * *  (once a day)</span>{"\n"}
<span className="c-out">@hourly</span>           <span className="c-cm">  # Shorthand for H * * * *  (once an hour)</span>{"\n"}
<span className="c-out">@weekly</span>           <span className="c-cm">  # Shorthand for H H * * 0  (once a week)</span>{"\n\n"}
<span className="c-cm"># In a Pipeline Jenkinsfile — add triggers block inside pipeline { }:</span>{"\n"}
<span className="c-kw">triggers</span> {"{"}{"\n"}
  <span className="c-fn">pollSCM</span>(<span className="c-str">'H/5 * * * *'</span>)         <span className="c-cm">  // Poll SCM every 5 min</span>{"\n"}
  <span className="c-fn">cron</span>(<span className="c-str">'H 2 * * 1-5'</span>)            <span className="c-cm">  // Build Periodically — weekdays at 2am</span>{"\n"}
{"}"}
          </div>

          <div className="tip-box">
            <h4>&#128161; Why H is Better Than a Fixed Minute</h4>
            <ul>
              <li>If 100 jobs all use <code>0 2 * * *</code> they all start at exactly 2:00 AM — Jenkins queue floods, builds wait for executors</li>
              <li><code>H 2 * * *</code> spreads those 100 jobs randomly across the 2 AM hour — load balanced, no queue spike</li>
              <li>The H value is deterministic per job — same job always gets the same random offset, so it is predictable but spread</li>
              <li><strong>Best practice:</strong> Always use H instead of a fixed minute for scheduled builds</li>
            </ul>
          </div>

          <div className="warn-box">
            <h4>&#9888; Poll SCM vs Webhook — Know the Difference</h4>
            <ul>
              <li><strong>Poll SCM</strong> — Jenkins asks GitHub "any changes?" on a timer. Has up to 5-minute delay. Uses network requests every poll cycle.</li>
              <li><strong>GitHub Webhook</strong> — GitHub tells Jenkins instantly when a push happens. Zero delay. Best practice for real-time CI.</li>
              <li><strong>When to use Poll SCM</strong> — when your Jenkins server is not reachable from the internet (behind firewall/NAT) and webhooks are impossible.</li>
            </ul>
          </div>
        </div>

        {/* PARALLEL AND WHEN */}
        <div id="s9p6">
          <div className="pt"><span className="pt-badge">Advanced</span>Parallel Stages &amp; Conditional when</div>

          <div className="sub-h">Running Stages in Parallel</div>
          <p className="body-text">
            Use <code>parallel {"{ }"}</code> inside a stage to run multiple sub-stages <strong>simultaneously</strong> on different executors. Independent stages running in parallel cut total build time significantly.
          </p>
          <div className="cb">
<span className="c-kw">stage</span>(<span className="c-str">'Quality Gates'</span>) {"{"}{"\n"}
  <span className="c-kw">parallel</span> {"{"}{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Unit Tests'</span>) {"{"}{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-fn">sh</span> <span className="c-str">'mvn test'</span>{"\n"}
        <span className="c-fn">junit</span> <span className="c-str">'target/surefire-reports/*.xml'</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Code Style'</span>) {"{"}{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'mvn checkstyle:check'</span> {"}"}{"\n"}
    {"}"}{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Dependency Check'</span>) {"{"}{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'mvn dependency:analyze'</span> {"}"}{"\n"}
    {"}"}{"\n"}
  {"}"} <span className="c-cm">// all three run simultaneously</span>{"\n"}
{"}"}
          </div>

          <div className="sub-h">Conditional Stages with when</div>
          <p className="body-text">The <code>when {"{ }"}</code> directive makes a stage execute only when its condition is true. Skipped stages appear grey in Stage View — not an error.</p>
          <div className="cb">
<span className="c-cm">// Only deploy on the main branch</span>{"\n"}
<span className="c-kw">stage</span>(<span className="c-str">'Deploy Staging'</span>) {"{"}{"\n"}
  <span className="c-kw">when</span> {"{"} <span className="c-fn">branch</span> <span className="c-str">'develop'</span> {"}"}{"\n"}
  <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'./deploy.sh staging'</span> {"}"}{"\n"}
{"}"}{"\n\n"}
<span className="c-cm">// Only deploy prod when on main AND param says prod</span>{"\n"}
<span className="c-kw">stage</span>(<span className="c-str">'Deploy Production'</span>) {"{"}{"\n"}
  <span className="c-kw">when</span> {"{"} allOf {"{"} <span className="c-fn">branch</span> <span className="c-str">'main'</span>; expression {"{"} <span className="c-kw">return</span> params.ENV == <span className="c-str">'prod'</span> {"}"} {"}"} {"}"}{"\n"}
  <span className="c-kw">steps</span> {"{"}{"\n"}
    <span className="c-fn">input</span> message: <span className="c-str">'Approve production deploy?'</span>, ok: <span className="c-str">'Ship it!'</span>{"\n"}
    <span className="c-fn">sh</span> <span className="c-str">'./deploy.sh production'</span>{"\n"}
  {"}"}{"\n"}
{"}"}
          </div>
        </div>

        {/* MASTER SLAVE INTRO */}
        <div id="s9p7">
          <div className="pt"><span className="pt-badge">Architecture</span>Jenkins Master-Slave Node Configuration</div>
          <p className="body-text">
            Jenkins uses a <strong>Controller (Master) &ndash; Agent (Slave)</strong> architecture. The Controller manages everything centrally; Agents are the machines that actually run builds. This design scales Jenkins from one laptop to hundreds of build machines.
          </p>

          <div className="arch">
            <div className="arch-master">
              <h4>&#9881; Jenkins Controller (Master)</h4>
              <p>The central server. You interact with it at port 8080. Manages all jobs, agents, and results.</p>
              <ul>
                <li>Hosts the web UI and REST API</li>
                <li>Stores all job configuration, credentials, and build history</li>
                <li>Schedules jobs and monitors triggers (webhook, poll SCM, cron)</li>
                <li>Dispatches jobs to available Agents based on labels</li>
                <li>Collects results, console logs, test reports, and artefacts</li>
                <li>Should have executors set to 0 — do not run builds on the Controller itself</li>
              </ul>
            </div>
            <div className="arch-arrow">&#8595;&nbsp;Dispatches builds via SSH (port 22) or JNLP (port 50000)&nbsp;&#8595;</div>
            <div className="arch-agents">
              {[
                {label:"Linux Agent",   sub:"Ubuntu/CentOS",     detail:"Java/Maven/shell builds"},
                {label:"Windows Agent", sub:"Windows Server",     detail:".NET/MSBuild/PowerShell"},
                {label:"Docker Agent",  sub:"Containerised",      detail:"Ephemeral — clean per build"},
              ].map(a=>(
                <div key={a.label} className="arch-agent">
                  <h4>&#127381; {a.label}</h4>
                  <p>{a.sub}<br/><span style={{fontSize:"0.7rem",color:"var(--muted)"}}>{a.detail}</span></p>
                </div>
              ))}
            </div>
          </div>

          <div className="sub-h">Key Concepts</div>
          <div className="feat-grid">
            {masterSlaveIntro.map(([t,d])=>(
              <div key={t} className="feat-card"><span className="feat-icon">&#128280;</span><div><strong>{t}</strong><span>{d}</span></div></div>
            ))}
          </div>

          <div className="tip-box">
            <h4>&#128161; Why Not Run Builds on the Controller?</h4>
            <ul>
              <li>The Controller serves the web UI, manages the database, and schedules all jobs — heavy builds consume its CPU/memory and make the UI slow for everyone</li>
              <li>A runaway build can crash the Controller, taking down all CI for the entire team</li>
              <li><strong>Best practice:</strong> Set Controller executors to <strong>0</strong> (Manage Jenkins → System → # of executors = 0). All builds run on Agents.</li>
            </ul>
          </div>
        </div>

        {/* ADD SSH AGENT */}
        <div id="s9p8">
          <div className="pt"><span className="pt-badge">Setup</span>Adding an SSH Agent Node</div>
          <p className="body-text">
            An <strong>SSH Agent</strong> is the most common Agent type on Linux. The Controller connects outward to the Agent machine over SSH, starts the Jenkins Agent process, and begins dispatching builds.
          </p>

          <div className="sub-h">Prerequisites on the Agent Machine</div>
          <div className="cb">
<span className="c-cm"># On the AGENT machine (not the Controller)</span>{"\n\n"}
<span className="c-cm"># 1. Install Java (required — Jenkins Agent is a Java process)</span>{"\n"}
sudo apt update && sudo apt install -y openjdk-17-jdk{"\n"}
java -version{"\n"}
<span className="c-ok">openjdk version "17.0.x"</span>{"\n\n"}
<span className="c-cm"># 2. Create a dedicated jenkins user</span>{"\n"}
sudo useradd -m -s /bin/bash jenkins{"\n"}
sudo passwd jenkins          <span className="c-cm">  # set a password</span>{"\n\n"}
<span className="c-cm"># 3. Create the workspace directory</span>{"\n"}
sudo mkdir -p /var/jenkins{"\n"}
sudo chown jenkins:jenkins /var/jenkins{"\n\n"}
<span className="c-cm"># 4. Add the Controller's public SSH key to the Agent</span>{"\n"}
<span className="c-cm"># (Generate on Controller first: ssh-keygen -t ed25519 -f ~/.ssh/jenkins_agent)</span>{"\n"}
sudo -u jenkins mkdir -p /home/jenkins/.ssh{"\n"}
sudo -u jenkins nano /home/jenkins/.ssh/authorized_keys{"\n"}
<span className="c-cm"># Paste the Controller's PUBLIC key content here, save and exit</span>{"\n"}
sudo chmod 600 /home/jenkins/.ssh/authorized_keys{"\n\n"}
<span className="c-cm"># 5. Test SSH from Controller to Agent (run this on the Controller)</span>{"\n"}
ssh -i ~/.ssh/jenkins_agent jenkins@AGENT_IP{"\n"}
<span className="c-ok">Welcome to Ubuntu ... jenkins@agent:~$</span>  <span className="c-cm">← success</span>
          </div>

          <div className="sub-h">Adding the Node in Jenkins UI</div>
          <div className="workflow">
            {[
              {n:"1",t:"Open Manage Jenkins → Nodes",b:"Manage Jenkins → Nodes and Clouds → New Node. Give it a name (e.g. linux-agent-1). Select 'Permanent Agent'. Click Create."},
              {n:"2",t:"Configure node settings",b:"Description: Linux build agent. Number of executors: 2 (how many builds run simultaneously on this node). Remote root directory: /var/jenkins (the workspace directory you created)."},
              {n:"3",t:"Set Labels",b:"Labels: linux maven — space-separated tags. These are how Pipeline jobs target this agent using agent { label 'linux' }. Use meaningful labels matching the node's capabilities."},
              {n:"4",t:"Set Launch Method",b:"Launch method: Launch agents via SSH. Host: the Agent's IP address (e.g. 192.168.1.20). Credentials: Add → SSH Username with private key → username: jenkins → paste the PRIVATE key."},
              {n:"5",t:"Set Host Key Verification",b:"Host Key Verification Strategy: 'Manually trusted key Verification Strategy' for first-time setup. Or 'Known hosts file' if you already added the host to known_hosts on the Controller."},
              {n:"6",t:"Save and verify",b:"Click Save. Jenkins immediately tries to connect. The Node page shows 'Agent successfully connected and online'. A green circle appears next to the node name on the Nodes list."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>
        </div>

        {/* JNLP AGENT */}
        <div id="s9p9">
          <div className="pt"><span className="pt-badge">Setup</span>Adding a JNLP (Inbound) Agent Node</div>
          <p className="body-text">
            A <strong>JNLP Agent</strong> (also called an Inbound Agent) connects <em>outward</em> from the Agent machine to the Controller on port 50000. Use this when the Agent is behind a firewall or NAT and the Controller cannot SSH into it.
          </p>

          <div className="sub-h">When to Use JNLP vs SSH</div>
          <div className="feat-grid">
            {[
              ["Use SSH Agent when…","The Controller can reach the Agent directly — same network, SSH port 22 open. Most common for Linux Agents in the same data centre."],
              ["Use JNLP Agent when…","The Agent is behind a firewall, NAT, or in a different network. Windows Agents (SSH setup is more complex on Windows). Docker or cloud-ephemeral agents."],
            ].map(([t,d])=>(
              <div key={t} className="feat-card"><span className="feat-icon">&#128268;</span><div><strong>{t}</strong><span>{d}</span></div></div>
            ))}
          </div>

          <div className="workflow">
            {[
              {n:"1",t:"Create the node in Jenkins",b:"Manage Jenkins → Nodes → New Node → name: windows-agent-1 → Permanent Agent → Create."},
              {n:"2",t:"Configure — launch via JNLP",b:"Remote root directory: C:\\Jenkins (on the Windows Agent). Labels: windows dotnet. Launch method: Launch agent by connecting it to the controller."},
              {n:"3",t:"Enable JNLP port",b:"Manage Jenkins → Security → Agents → TCP port for inbound agents → Fixed: 50000. Ensure port 50000 is open on the Controller's firewall."},
              {n:"4",t:"Save and get the connect command",b:"After saving, click the node name → the node page shows a command like: java -jar agent.jar -url http://CONTROLLER:8080/ -secret ABC123... -name windows-agent-1 -workDir C:\\Jenkins"},
              {n:"5",t:"Download agent.jar on the Agent",b:"On the Agent machine, download: http://CONTROLLER:8080/jnlpJars/agent.jar — save it to C:\\Jenkins\\agent.jar (Windows) or /var/jenkins/agent.jar (Linux)."},
              {n:"6",t:"Run the connect command on the Agent",b:"Execute the java -jar agent.jar command shown in step 4 on the Agent machine. The Agent connects to the Controller. Status turns green. For permanent agents, set this as a Windows Service or systemd service."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>

          <div className="cb">
<span className="c-cm"># On the Agent machine — run as a systemd service (Linux JNLP agent)</span>{"\n"}
sudo nano /etc/systemd/system/jenkins-agent.service{"\n\n"}
<span className="c-out">[Unit]</span>{"\n"}
<span className="c-out">Description=Jenkins Agent</span>{"\n"}
<span className="c-out">After=network.target</span>{"\n\n"}
<span className="c-out">[Service]</span>{"\n"}
<span className="c-out">User=jenkins</span>{"\n"}
<span className="c-out">ExecStart=java -jar /var/jenkins/agent.jar \</span>{"\n"}
<span className="c-out">  -url http://CONTROLLER_IP:8080/ \</span>{"\n"}
<span className="c-out">  -secret YOUR_SECRET_HERE \</span>{"\n"}
<span className="c-out">  -name linux-jnlp-agent \</span>{"\n"}
<span className="c-out">  -workDir /var/jenkins</span>{"\n"}
<span className="c-out">Restart=always</span>{"\n\n"}
<span className="c-out">[Install]</span>{"\n"}
<span className="c-out">WantedBy=multi-user.target</span>{"\n\n"}
sudo systemctl enable jenkins-agent && sudo systemctl start jenkins-agent{"\n"}
<span className="c-ok">Active: active (running)</span>
          </div>
        </div>

        {/* AGENT LABELS */}
        <div id="s9p10">
          <div className="pt"><span className="pt-badge">Targeting</span>Using Agent Labels in Pipelines</div>
          <p className="body-text">
            Labels are the mechanism that connects Pipeline jobs to specific Agent nodes. A label is a tag you apply to a node (e.g. <code>linux</code>, <code>maven</code>, <code>docker</code>). Pipeline stages then use <code>agent {"{"} label &apos;...&apos; {"}"}</code> to request an executor with that label.
          </p>

          <div className="cb">
<span className="c-cm">// Example: Different stages on different agents</span>{"\n"}
<span className="c-kw">pipeline</span> {"{"}{"\n"}
  <span className="c-kw">agent</span> none  <span className="c-cm">// no global agent — each stage declares its own</span>{"\n\n"}
  <span className="c-kw">stages</span> {"{"}{"\n"}
{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Build on Linux'</span>) {"{"}{"\n"}
      <span className="c-kw">agent</span> {"{"} label <span className="c-str">'linux && maven'</span> {"}"}  <span className="c-cm">// must have BOTH labels</span>{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-fn">sh</span> <span className="c-str">'mvn clean package'</span>{"\n"}
        <span className="c-fn">stash</span> includes:<span className="c-str">'target/*.jar'</span>, name:<span className="c-str">'built-jar'</span>  <span className="c-cm">// save for next stage</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Test on Windows'</span>) {"{"}{"\n"}
      <span className="c-kw">agent</span> {"{"} label <span className="c-str">'windows'</span> {"}"}{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-fn">unstash</span> <span className="c-str">'built-jar'</span>  <span className="c-cm">// retrieve the JAR from Linux build</span>{"\n"}
        <span className="c-fn">bat</span> <span className="c-str">'mvn test'</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Deploy from any'</span>) {"{"}{"\n"}
      <span className="c-kw">agent</span> any  <span className="c-cm">// any available executor is fine</span>{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">echo</span> <span className="c-str">"Deploying from node: ${"{"}env.NODE_NAME{"}"}"</span> {"}"}{"\n"}
    {"}"}{"\n"}
{"\n"}
  {"}"}{"\n"}
{"}"}
          </div>

          <div className="tip-box">
            <h4>&#128161; Label Expressions</h4>
            <ul>
              <li><code>agent {"{"} label &apos;linux&apos; {"}"}</code> — any node tagged <strong>linux</strong></li>
              <li><code>agent {"{"} label &apos;linux {"&"}{"&"} maven&apos; {"}"}</code> — node must have BOTH labels</li>
              <li><code>agent {"{"} label &apos;linux {"||"} mac&apos; {"}"}</code> — node has linux OR mac label</li>
              <li><code>agent {"{"} label &apos;!windows&apos; {"}"}</code> — any node that does NOT have the windows label</li>
              <li><code>env.NODE_NAME</code> inside a Pipeline step tells you which node is actually running this stage</li>
            </ul>
          </div>
        </div>

        {/* WORKSPACE MANAGEMENT */}
        <div id="s9p11">
          <div className="pt"><span className="pt-badge">Storage</span>Jenkins Workspace Management</div>
          <p className="body-text">
            The <strong>workspace</strong> is the directory on the Agent where Jenkins checks out source code and runs build commands. Understanding its lifecycle prevents stale-file bugs and disk bloat &mdash; two of the most common real-world Jenkins problems.
          </p>

          <table className="data-table">
            <thead><tr><th>Topic</th><th>Details</th></tr></thead>
            <tbody>
              {workspaceDetails.map(([topic,detail])=>(
                <tr key={topic}><td>{topic}</td><td>{detail}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Three Strategies for Workspace Cleanliness</div>
          <div className="workflow">
            {[
              {n:"1",t:"Post always cleanWs() — Best Practice",b:"Add post { always { cleanWs() } } to every Pipeline. The Workspace Cleanup plugin (cleanWs) deletes the entire workspace after the build finishes regardless of pass or fail. Safest, cleanest approach — every build starts with a fresh Git clone."},
              {n:"2",t:"mvn clean / gradle clean — Fast and Targeted",b:"Run mvn clean as the first Maven goal. This deletes only the target/ directory (compiled classes and old JARs) while keeping the already-cloned Git source. Faster than a full workspace wipe because no re-clone is needed."},
              {n:"3",t:"Delete workspace before build — Configure option",b:"Job → Configure → Build Environment → check 'Delete workspace before build starts'. Jenkins wipes the workspace before cloning. Good for Freestyle jobs. In Pipelines, prefer post { always { cleanWs() } }."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>

          <div className="sub-h">Build Discard — Controlling Disk Usage</div>
          <div className="cb">
<span className="c-cm">// In a Jenkinsfile — control how many old builds are kept</span>{"\n"}
<span className="c-kw">pipeline</span> {"{"}{"\n"}
  <span className="c-kw">agent</span> any{"\n"}
{"\n"}
  <span className="c-kw">options</span> {"{"}{"\n"}
    <span className="c-cm"> // Keep only last 10 builds AND builds from last 30 days</span>{"\n"}
    <span className="c-fn">buildDiscarder</span>(<span className="c-fn">logRotator</span>({"\n"}
      numToKeepStr: <span className="c-str">'10'</span>,          <span className="c-cm">// keep max 10 builds</span>{"\n"}
      daysToKeepStr: <span className="c-str">'30'</span>,         <span className="c-cm">// keep builds for max 30 days</span>{"\n"}
      artifactNumToKeepStr: <span className="c-str">'5'</span>    <span className="c-cm">// keep artefacts for last 5 builds only</span>{"\n"}
    )){"\n"}
    <span className="c-fn">timeout</span>(time: 30, unit: <span className="c-str">'MINUTES'</span>)  <span className="c-cm">// abort if build takes &gt; 30 min</span>{"\n"}
    <span className="c-fn">disableConcurrentBuilds</span>()         <span className="c-cm">// prevent parallel runs of same job</span>{"\n"}
  {"}"}{"\n"}
{"\n"}
  <span className="c-kw">stages</span> {"{"}{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Build'</span>) {"{"}{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'mvn clean package'</span> {"}"}{"\n"}
    {"}"}{"\n"}
  {"}"}{"\n"}
{"\n"}
  <span className="c-kw">post</span> {"{"}{"\n"}
    <span className="c-kw">success</span> {"{"} <span className="c-fn">archiveArtifacts</span> <span className="c-str">'target/*.jar'</span> {"}"}  <span className="c-cm">// save JAR before workspace wipe</span>{"\n"}
    <span className="c-kw">always</span>  {"{"} <span className="c-fn">cleanWs</span>() {"}"}                              <span className="c-cm">// then wipe workspace</span>{"\n"}
  {"}"}{"\n"}
{"}"}
          </div>

          <div className="sub-h">Workspace CLI Commands</div>
          <div className="cb">
<span className="c-cm"># Check workspace sizes for all jobs (on Linux Controller/Agent)</span>{"\n"}
du -sh /var/lib/jenkins/workspace/*{"\n"}
<span className="c-out">84M     hello-maven-build</span>{"\n"}
<span className="c-out">210M    ci-pipeline-sim</span>{"\n"}
<span className="c-out">12M     hello-world-job</span>{"\n\n"}
<span className="c-cm"># Manually wipe a specific job workspace</span>{"\n"}
rm -rf /var/lib/jenkins/workspace/hello-maven-build/{"\n\n"}
<span className="c-cm"># Find and delete all target/ directories across all workspaces (reclaim Maven build caches)</span>{"\n"}
find /var/lib/jenkins/workspace -name target -type d -exec rm -rf {"{ }"} \;{"\n\n"}
<span className="c-cm"># Check total Jenkins data directory size</span>{"\n"}
du -sh /var/lib/jenkins/{"\n"}
<span className="c-out">4.2G    /var/lib/jenkins/</span>
          </div>

          <div className="warn-box">
            <h4>&#9888; Stale Workspace Bugs — Common Causes</h4>
            <ul>
              <li><strong>Renamed file in Git still exists in workspace</strong> — old name stays on disk, build picks it up, causes confusing failures</li>
              <li><strong>Test fixtures left from previous build</strong> — integration tests depend on a clean database state but find leftover data</li>
              <li><strong>Compiled class from deleted source file</strong> — old .class files in target/ survive because mvn clean was not run</li>
              <li><strong>Fix:</strong> always run <code>mvn clean</code> as first goal, or use <code>cleanWs()</code> + fresh Git checkout every build</li>
            </ul>
          </div>
        </div>

        {/* FULL PRODUCTION PIPELINE */}
        <div id="s9p12">
          <div className="pt"><span className="pt-badge">Full Example</span>Complete Production Pipeline with Agent Targeting</div>
          <p className="body-text">
            This Jenkinsfile combines every concept from this session: scheduling triggers, environment variables, parameters, parallel quality gates, agent label targeting, workspace cleanup, and build discard policy.
          </p>
          <div className="cb">
<span className="c-cm">// Jenkinsfile — production-ready Maven pipeline with agent targeting</span>{"\n"}
<span className="c-kw">pipeline</span> {"{"}{"\n"}
  <span className="c-kw">agent</span> none  <span className="c-cm">// each stage sets its own agent</span>{"\n\n"}
  <span className="c-kw">options</span> {"{"}{"\n"}
    <span className="c-fn">buildDiscarder</span>(<span className="c-fn">logRotator</span>(numToKeepStr:<span className="c-str">'10'</span>, artifactNumToKeepStr:<span className="c-str">'5'</span>)){"\n"}
    <span className="c-fn">timeout</span>(time:30, unit:<span className="c-str">'MINUTES'</span>){"\n"}
    <span className="c-fn">disableConcurrentBuilds</span>(){"\n"}
  {"}"}{"\n\n"}
  <span className="c-kw">triggers</span> {"{"}{"\n"}
    <span className="c-fn">pollSCM</span>(<span className="c-str">'H/5 * * * *'</span>)   <span className="c-cm">// fallback if webhook not configured</span>{"\n"}
  {"}"}{"\n\n"}
  <span className="c-kw">environment</span> {"{"}{"\n"}
    APP_NAME = <span className="c-str">'hello-maven'</span>{"\n"}
  {"}"}{"\n\n"}
  <span className="c-kw">parameters</span> {"{"}{"\n"}
    <span className="c-fn">booleanParam</span>(name:<span className="c-str">'SKIP_TESTS'</span>, defaultValue:false, description:<span className="c-str">'Skip tests'</span>){"\n"}
    <span className="c-fn">choice</span>(name:<span className="c-str">'TARGET_ENV'</span>, choices:[<span className="c-str">'dev'</span>,<span className="c-str">'staging'</span>,<span className="c-str">'prod'</span>]){"\n"}
  {"}"}{"\n\n"}
  <span className="c-kw">stages</span> {"{"}{"\n"}
{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Checkout'</span>) {"{"}{"\n"}
      <span className="c-kw">agent</span> {"{"} label <span className="c-str">'linux && maven'</span> {"}"}{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-fn">checkout</span> scm{"\n"}
        <span className="c-fn">echo</span> <span className="c-str">"Node: ${"{"}env.NODE_NAME{"}"} | Branch: ${"{"}env.BRANCH_NAME{"}"} | Build: #${"{"}env.BUILD_NUMBER{"}"}"</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Build'</span>) {"{"}{"\n"}
      <span className="c-kw">agent</span> {"{"} label <span className="c-str">'linux && maven'</span> {"}"}{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-fn">sh</span> <span className="c-str">'mvn clean package -DskipTests=$SKIP_TESTS'</span>{"\n"}
        <span className="c-fn">stash</span> includes:<span className="c-str">'target/*.jar'</span>, name:<span className="c-str">'app-jar'</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Quality Gates'</span>) {"{"}{"\n"}
      <span className="c-kw">when</span> {"{"} expression {"{"} <span className="c-kw">return</span> !params.SKIP_TESTS {"}"} {"}"}{"\n"}
      <span className="c-kw">parallel</span> {"{"}{"\n"}
        <span className="c-kw">stage</span>(<span className="c-str">'Unit Tests'</span>) {"{"}{"\n"}
          <span className="c-kw">agent</span> {"{"} label <span className="c-str">'linux && maven'</span> {"}"}{"\n"}
          <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'mvn test'</span> {"}"}{"\n"}
          <span className="c-kw">post</span> {"{"} <span className="c-kw">always</span> {"{"} <span className="c-fn">junit</span> <span className="c-str">'target/surefire-reports/*.xml'</span> {"}"} {"}"}{"\n"}
        {"}"}{"\n"}
        <span className="c-kw">stage</span>(<span className="c-str">'Code Style'</span>) {"{"}{"\n"}
          <span className="c-kw">agent</span> {"{"} label <span className="c-str">'linux && maven'</span> {"}"}{"\n"}
          <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'mvn checkstyle:check'</span> {"}"}{"\n"}
        {"}"}{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Deploy'</span>) {"{"}{"\n"}
      <span className="c-kw">agent</span> {"{"} label <span className="c-str">'linux'</span> {"}"}{"\n"}
      <span className="c-kw">when</span> {"{"} anyOf {"{"} <span className="c-fn">branch</span> <span className="c-str">'main'</span>; <span className="c-fn">branch</span> <span className="c-str">'develop'</span> {"}"} {"}"}{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-fn">unstash</span> <span className="c-str">'app-jar'</span>{"\n"}
        <span className="c-fn">echo</span> <span className="c-str">"Deploying ${"{"}env.APP_NAME{"}"} to ${"{"}params.TARGET_ENV{"}"}"</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
{"\n"}
  {"}"}{"\n\n"}
  <span className="c-kw">post</span> {"{"}{"\n"}
    <span className="c-kw">success</span> {"{"}{"\n"}
      <span className="c-fn">node</span>(<span className="c-str">'linux'</span>) {"{"}{"\n"}
        <span className="c-fn">unstash</span> <span className="c-str">'app-jar'</span>{"\n"}
        <span className="c-fn">archiveArtifacts</span> <span className="c-str">'target/*.jar'</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
    <span className="c-kw">always</span> {"{"} <span className="c-fn">echo</span> <span className="c-str">"Build #${"{"}env.BUILD_NUMBER{"}"} done — ${"{"}env.BUILD_URL{"}"}"</span> {"}"}{"\n"}
  {"}"}{"\n"}
{"}"}
          </div>
        </div>

        {/* LAB */}
        <div id="s9p13">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 &mdash; First Jenkinsfile in Git</h4>
            <ol className="lab-ol">
              <li>In your Maven project root, create a file named <code>Jenkinsfile</code></li>
              <li>Write a 3-stage Pipeline: <strong>Checkout</strong>, <strong>Build</strong> (<code>mvn clean package -DskipTests</code>), <strong>Test</strong> (<code>mvn test</code>)</li>
              <li>Add <code>post {"{ always { cleanWs() } }"}</code> and <code>options {"{ buildDiscarder(logRotator(numToKeepStr:'10')) }"}</code></li>
              <li>Commit and push to GitHub. In Jenkins: New Item → Pipeline → SCM → point to your repo</li>
              <li>Build Now — verify all 3 stages are green in Stage View and workspace is cleaned after</li>
            </ol>

            <h4>Lab 2 &mdash; Scheduling</h4>
            <ol className="lab-ol">
              <li>Add a <code>triggers {"{ pollSCM('H/1 * * * *') }"}</code> block to your Jenkinsfile, commit and push</li>
              <li>Make a small change to your Java source, commit and push — watch Jenkins detect and build it within 1 minute</li>
              <li>Check the build's Console Output — look for: <strong>Started by an SCM change</strong> at the top</li>
              <li>Switch to <code>cron('H/2 * * * *')</code> (Build Periodically) and verify Jenkins builds even without a code change</li>
            </ol>

            <h4>Lab 3 &mdash; Add a Slave Agent Node</h4>
            <ol className="lab-ol">
              <li>Provision a second Linux machine (or a second VM/container on the same host)</li>
              <li>On the agent machine: install Java 17 and create a <code>jenkins</code> user with a <code>/var/jenkins</code> workspace directory</li>
              <li>Generate an SSH key pair on your Controller: <code>ssh-keygen -t ed25519 -f ~/.ssh/jenkins_agent</code></li>
              <li>Add the public key to <code>/home/jenkins/.ssh/authorized_keys</code> on the agent machine</li>
              <li>In Jenkins: Manage Jenkins → Nodes → New Node → name <code>linux-agent-1</code> → SSH launch → fill in IP, credential, label <code>linux maven</code>, remote root <code>/var/jenkins</code></li>
              <li>Save — verify the node shows <strong>online</strong> (green dot) in the Nodes list</li>
            </ol>

            <h4>Lab 4 &mdash; Target Agent by Label</h4>
            <ol className="lab-ol">
              <li>Modify your Jenkinsfile: add <code>agent none</code> at the top level</li>
              <li>Add <code>agent {"{ label 'linux && maven' }"}</code> to each stage</li>
              <li>Build and verify in Console Output: each stage shows <strong>Running on linux-agent-1</strong></li>
              <li>Set the Controller's executor count to 0 (Manage Jenkins → System → # of executors = 0)</li>
              <li>Build again — confirm the build still runs (via the agent) even though the Controller has no executors</li>
            </ol>

            <h4>Challenge &mdash; Workspace Cleanup Experiment</h4>
            <ol className="lab-ol">
              <li>Remove <code>cleanWs()</code> from your Pipeline. Build 5 times. Check workspace size: <code>du -sh /var/jenkins/workspace/your-job/</code></li>
              <li>Add <code>cleanWs()</code> back in <code>post {"{ always { } }"}</code>. Build once more. Verify workspace is empty after build.</li>
              <li>Add a file manually to the workspace between builds: <code>touch /var/jenkins/workspace/your-job/stale-file.txt</code></li>
              <li>Build without <code>cleanWs()</code> and add <code>sh 'ls -la'</code> — see the stale file appear. Then enable <code>cleanWs()</code> and confirm it disappears.</li>
            </ol>
          </div>
        </div>

        {/* QUIZ */}
        <div id="s9p14" className="quiz-box">
          <h3>&#127891; Quick Quiz &mdash; Knowledge Check</h3>
          <ul className="quiz-list">
            {quizData.map((item,i)=>(
              <li key={i} className="qi">
                <div className="qi-n">Q{i+1} of {quizData.length}</div>
                <div className="qi-q">{item.q}</div>
                <div className="qi-a">&#128161; {item.a}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* HOMEWORK */}
        <div id="s9p15" className="hw-box">
          <h3>&#128221; Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Complete Agent Setup and Pipeline:</h4>
            <ul>
              <li>Add a real slave node (second VM or Docker container) with labels <code>linux</code> and <code>maven</code></li>
              <li>Build a 5-stage Pipeline (Checkout, Build, Test parallel with Code Style, Archive, Deploy) where every stage uses <code>agent {"{ label 'linux && maven' }"}</code></li>
              <li>Screenshot the Console Output showing <strong>Running on linux-agent-1</strong> for each stage</li>
              <li>Set Controller executors to 0 and verify builds still work</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Scheduling Practice:</h4>
            <ul>
              <li>Write cron expressions for: every 15 minutes, every weekday at 7 AM, every Sunday at midnight, first day of every month at 3 AM</li>
              <li>Add a <code>pollSCM</code> trigger to your Jenkinsfile, push a commit, and measure the exact delay before Jenkins starts the build</li>
              <li>Explain in writing: why would a company use Build Periodically even if they have webhooks configured?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Workspace Management Report:</h4>
            <ul>
              <li>Run 10 builds without <code>cleanWs()</code> and document the workspace size growth with <code>du -sh</code> after each build</li>
              <li>Enable <code>cleanWs()</code> and <code>buildDiscarder(logRotator(numToKeepStr:'5'))</code> — document how much disk space is reclaimed</li>
              <li>Add <code>archiveArtifacts 'target/*.jar'</code> in <code>post {"{ success { } }"}</code> and verify the JAR persists even after <code>cleanWs()</code> wipes the workspace</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Understanding Questions:</h4>
            <ul>
              <li>Explain the difference between SSH Agent connection and JNLP connection — when would you choose each?</li>
              <li>What does <code>stash</code> and <code>unstash</code> do in a Pipeline, and why is it needed when using <code>agent none</code>?</li>
              <li>A developer says "I keep getting builds that fail due to missing files that were deleted from Git". What is happening and how do you fix it?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>5. Prepare for Session 10:</h4>
            <ul>
              <li>Read about Jenkins Security at <code>jenkins.io/doc/book/security/</code></li>
              <li>List the 3 users you would create for a typical company Jenkins setup and what permissions each should have</li>
              <li>Explore Manage Jenkins → Security and note every setting you see — come prepared with questions</li>
            </ul>
          </div>
        </div>

        {/* TAKEAWAYS */}
        <div className="pt"><span className="pt-badge">Summary</span>Key Takeaways</div>
        <div className="tk-grid">
          {takeaways.map(([t,d])=>(
            <div key={t} className="tk-card"><h4>{t}</h4><p>{d}</p></div>
          ))}
        </div>

        <div className="flow-pill">
          <span className="fp">Checkout</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Build</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Test &#x2225; Lint</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Archive</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Deploy</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">&#9989; cleanWs</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; Pipeline &amp; Agent Golden Rules</h4>
          <ul>
            <li>Always store the Jenkinsfile in Git &mdash; Pipeline as Code means it is versioned and reviewed like all other source</li>
            <li>Set Controller executors to 0 &mdash; never run builds on the Controller, only on dedicated Agents</li>
            <li>Label Agents meaningfully (linux, windows, maven, docker) and target them precisely in Pipelines</li>
            <li>Always call <code>cleanWs()</code> in <code>post {"{ always { } }"}</code> &mdash; prevents stale files and disk bloat</li>
            <li>Archive important artefacts BEFORE <code>cleanWs()</code> so they survive the workspace wipe</li>
            <li>Use <code>buildDiscarder(logRotator(numToKeepStr:'10'))</code> on every job to cap log and artefact storage</li>
            <li>Use <code>H</code> instead of fixed minutes in cron expressions to spread load across Jenkins schedulers</li>
          </ul>
        </div>

        {/* NEXT */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next &middot; Module 3 &middot; Session 10</h4>
            <h3>Securing Jenkins</h3>
            <ul>
              <li>Authentication &mdash; local users, LDAP, SSO</li>
              <li>Authorization &mdash; Matrix, Role-Based, Project-level security</li>
              <li>Creating and managing Jenkins users</li>
              <li>Confidentiality &mdash; credentials, secrets, HTTPS</li>
              <li>Jenkins Plugins deep dive &mdash; SCM, build, test plugins</li>
            </ul>
          </div>
          <Link href="/courses/dev/session10" className="next-btn">Session 10 &rarr;</Link>
        </div>

      </div>
    </>
  );
}