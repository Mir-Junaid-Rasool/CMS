// app/courses/dev/session10/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Understand Jenkins' four pillars of security: Authentication, Authorization, Confidentiality, and Auditing",
  "Configure Jenkins Authentication using the built-in local user database",
  "Integrate Jenkins Authentication with LDAP and understand how SSO works",
  "Create and manage Jenkins users with appropriate roles and permissions",
  "Configure Authorization using Matrix-based Security step by step",
  "Install and configure Role-Based Access Control (RBAC) for team environments",
  "Apply Project-level security using Folders to restrict per-team access",
  "Store and use secrets securely with the Jenkins Credentials store and withCredentials()",
  "Enable HTTPS on Jenkins using an Nginx reverse proxy",
  "Install, configure, and use the most important Jenkins plugins for SCM, build, and testing",
];

const securityPillars = [
  {
    pillar: "Authentication",
    icon: "🔑",
    desc: "Who are you? Jenkins verifies the identity of every user before granting access. Methods: local user database, LDAP/Active Directory, GitHub OAuth, SAML/SSO.",
    examples: [
      "Local user database — accounts created inside Jenkins",
      "LDAP/AD — company directory, same password as Windows/email",
      "GitHub OAuth — log in with your GitHub account",
      "SAML/SSO — enterprise identity providers (Okta, Azure AD)",
    ],
  },
  {
    pillar: "Authorization",
    icon: "🛡️",
    desc: "What are you allowed to do? After authentication, Jenkins checks your permissions. Controls reading, building, configuring, and administering.",
    examples: [
      "Matrix-based Security — per-user permission table",
      "Role-Based Access Control (RBAC) — assign roles like Developer, Viewer, Admin",
      "Project-level security — restrict access per job folder",
      "Logged-in users can do anything — for small trusted teams only",
    ],
  },
  {
    pillar: "Confidentiality",
    icon: "🔒",
    desc: "Are your secrets protected? Passwords, tokens, and SSH keys must never appear in plain text in logs, config files, URLs, or Jenkinsfiles.",
    examples: [
      "Jenkins Credentials store — encrypted secret storage",
      "Secret masking — credentials() and withCredentials() mask values as ****",
      "HTTPS — encrypt all traffic so passwords cannot be intercepted",
      "Never hardcode secrets in Jenkinsfiles stored in Git",
    ],
  },
  {
    pillar: "Auditing",
    icon: "📋",
    desc: "Who did what and when? Jenkins logs all build triggers, configuration changes, and login events. Essential for compliance and incident investigation.",
    examples: [
      "System Log — all Jenkins events available in real time",
      "Audit Trail plugin — who changed which job config and when",
      "Build history — who triggered each build and from where",
      "Failed login attempts are logged in the system log",
    ],
  },
];

const authMethods = [
  {
    method: "Jenkins' Own User Database",
    when: "Small teams, labs, learning environments",
    how: "Manage Jenkins → Security → Authentication → Jenkins' own user database. Accounts created manually by an admin. Passwords stored hashed. No external dependencies.",
    pros: ["No external services needed", "Easy to set up in minutes", "Full control over accounts"],
    cons: ["Does not scale beyond ~20 users", "Separate Jenkins password per user", "No SSO with other company tools"],
  },
  {
    method: "LDAP / Active Directory",
    when: "Companies with an existing directory service",
    how: "Install the LDAP plugin. Manage Jenkins → Security → LDAP. Enter your server URL, bind DN, and user search base. Users authenticate with their company password.",
    pros: ["Single password — same as Windows/email/Jira", "Centralised — disable in AD to revoke everywhere", "AD groups map to Jenkins roles"],
    cons: ["LDAP server must be reachable from Jenkins", "More complex initial configuration", "LDAP outage = nobody can log in"],
  },
  {
    method: "GitHub OAuth",
    when: "Development teams already on GitHub",
    how: "Install GitHub Authentication plugin. Create a GitHub OAuth App. Add Client ID and Secret to Jenkins config. Users click 'Login with GitHub'.",
    pros: ["No separate Jenkins passwords", "GitHub org membership can control access", "Easy setup for dev teams"],
    cons: ["Requires internet access to GitHub", "GitHub outage affects Jenkins login", "Not for air-gapped environments"],
  },
];

const matrixPermissions = [
  ["Overall/Administer",  "Full control — install plugins, change security, manage users. Limit to 1–3 people."],
  ["Overall/Read",        "View the Jenkins dashboard. Every logged-in user needs at least this."],
  ["Job/Build",           "Trigger a build. Give to all developers on the team."],
  ["Job/Read",            "View job config and build results. Give to stakeholders who need to monitor."],
  ["Job/Configure",       "Edit job configuration. Senior developers and team leads."],
  ["Job/Create",          "Create new jobs. Usually restricted to team leads or admins."],
  ["Job/Delete",          "Delete jobs. Admin only — accidental deletion loses all build history."],
  ["Job/Cancel",          "Abort a running build. Give to developers on the team."],
  ["View/Read",           "See dashboard views. All authenticated users normally need this."],
  ["Credentials/View",   "See that a credential exists (NOT its value). Fine for all users."],
  ["Credentials/Update", "Modify a stored credential. Admin and senior devs only."],
  ["Agent/Connect",       "Reconnect an offline agent. Admin and ops team."],
];

const rbaRoles = [
  { role: "Anonymous",   perms: ["Overall/Read"],                                                                         when: "Unauthenticated visitors. In production: no permissions — force login first." },
  { role: "Viewer",      perms: ["Overall/Read", "Job/Read", "View/Read"],                                                when: "Stakeholders — see results, cannot trigger builds or change anything." },
  { role: "Developer",   perms: ["Overall/Read", "Job/Read", "Job/Build", "Job/Cancel", "View/Read"],                    when: "Developers — trigger builds, view results, cannot create/configure jobs." },
  { role: "Team Lead",   perms: ["Overall/Read", "Job/Read", "Job/Build", "Job/Configure", "Job/Create", "Job/Cancel", "View/Read", "Credentials/View"], when: "Can create and configure jobs within their folder." },
  { role: "Admin",       perms: ["Overall/Administer"],                                                                   when: "Full access. 1–3 people maximum." },
];

const importantPlugins = [
  {
    category: "SCM & Source Control",
    color: "#e74c3c",
    plugins: [
      ["Git Plugin",                   "Core Git integration — clone repos, detect commits, poll SCM. Installed by default. Without this, no Git integration works."],
      ["GitHub Integration",           "Receive GitHub webhook payloads, post commit status checks to PRs, OAuth login support."],
      ["GitLab Plugin",                "Same as GitHub Integration but for GitLab — webhooks, MR status, authentication."],
      ["GitHub Branch Source",         "Scan a GitHub organisation and auto-create Pipeline jobs for every repo that has a Jenkinsfile."],
      ["Bitbucket Branch Source",      "Scan entire Bitbucket workspaces and auto-create Multibranch Pipelines for every repository."],
    ],
  },
  {
    category: "Build & Compilation",
    color: "#e67e22",
    plugins: [
      ["Maven Integration",            "Adds Maven Project job type — parses pom.xml, runs goals, archives artefacts and test results automatically."],
      ["Gradle Plugin",                "Run Gradle builds and Gradle wrapper for Java/Kotlin/Android projects."],
      ["NodeJS Plugin",                "Manage multiple Node.js versions, run npm/yarn/npx in build steps."],
      ["Docker Pipeline",              "Use Docker containers as Pipeline agents — agent { docker 'maven:3.9' }. Fully disposable environments."],
      ["Blue Ocean",                   "Modern Pipeline visualisation UI — shows parallel stages, branch status, and step-level detail."],
      ["Pipeline",                     "Core Pipeline plugin providing Declarative and Scripted Pipeline functionality. Usually pre-installed."],
    ],
  },
  {
    category: "Test & Quality",
    color: "#27ae60",
    plugins: [
      ["JUnit Plugin",                 "Parse JUnit XML test result files — display pass/fail/skipped counts and trend graphs per build."],
      ["JaCoCo Plugin",                "Publish Java code coverage reports — shows % lines, branches, methods covered, with trend over time."],
      ["HTML Publisher",               "Publish any HTML report as a link on the build page — test dashboards, API docs, coverage reports."],
      ["Warnings Next Generation",     "Aggregate warnings from Checkstyle, SpotBugs, PMD, ESLint — trend chart per tool."],
      ["SonarQube Scanner",            "Trigger SonarQube quality scans and gate builds on quality metrics."],
    ],
  },
  {
    category: "Notifications",
    color: "#3498db",
    plugins: [
      ["Email Extension (ExtEmail)",   "Rich HTML build notification emails with test results, console snippets, and custom templates."],
      ["Slack Notification",           "Post build pass/fail messages to a Slack channel with job name, status, and a direct console link."],
      ["Build Monitor View",           "Dashboard showing every job as a large coloured tile — great for a wall-mounted build health display."],
    ],
  },
  {
    category: "Security & Credentials",
    color: "#9b59b6",
    plugins: [
      ["Credentials Binding",          "Inject stored credentials into Pipeline steps as environment variables — values masked in console logs automatically."],
      ["Role-based Authorization Strategy", "Add RBAC to Jenkins — define roles, assign permissions to roles, assign users to roles."],
      ["LDAP Plugin",                  "Authenticate users against an LDAP directory (OpenLDAP, Active Directory)."],
      ["GitHub Authentication",        "OAuth login — users log in with their GitHub credentials."],
      ["Audit Trail Plugin",           "Log every configuration change — who changed which job config, which system setting, and when."],
    ],
  },
];

const quizData = [
  { q: "What are the four pillars of Jenkins security?",
    a: "Authentication (who are you?), Authorization (what can you do?), Confidentiality (are your secrets protected?), and Auditing (who did what and when?)." },
  { q: "What is the difference between Jenkins' own user database and LDAP?",
    a: "Jenkins' own database stores accounts locally — created manually, each with a separate Jenkins password. LDAP uses your company's existing directory — users log in with their company password. LDAP scales better and provides single sign-on." },
  { q: "What is Matrix-based Security in Jenkins?",
    a: "A permission table where each row is a user or group and each column is a specific permission. You tick exactly the boxes each user needs. Granular but complex to manage at scale." },
  { q: "What is Role-Based Access Control and how does it differ from Matrix security?",
    a: "RBAC lets you define named roles (Developer, Viewer, Admin), assign permissions to each role, then assign users to roles. Easier to manage than Matrix — change a role once, all users with that role update automatically. Better for larger teams." },
  { q: "How do you prevent a credential from appearing in Jenkins console logs?",
    a: "Store it in the Jenkins Credentials store, then inject it with withCredentials([string(credentialsId:'my-id', variable:'VAR')]) { }. Jenkins automatically masks the value as **** in all console output." },
  { q: "Why should Jenkins run over HTTPS?",
    a: "Plain HTTP sends everything — including login passwords and API tokens — as unencrypted text that anyone on the network can intercept. HTTPS encrypts all traffic." },
  { q: "What does the GitHub Integration plugin add beyond the basic Git plugin?",
    a: "Webhook reception (instant build triggers on push/PR — no polling delay), posting build status checks back to GitHub PRs (the green/red tick), and optionally OAuth login. The Git plugin only clones and polls." },
  { q: "What does the JUnit plugin display in Jenkins?",
    a: "It parses JUnit-format XML test results and displays: total tests passed/failed/skipped, which specific tests failed with error messages, and a trend graph of test results across all builds." },
];

const takeaways = [
  ["Authentication",   "Verify identity — local DB, LDAP, GitHub OAuth"],
  ["Authorization",    "Control access — Matrix or RBAC by role"],
  ["Confidentiality",  "Credentials store + secret masking + HTTPS"],
  ["Create Users",     "Manage Jenkins → Users → Create User"],
  ["RBAC",             "Define roles, assign permissions, assign users"],
  ["Git Plugin",       "Core SCM — clone, poll, webhooks"],
  ["JUnit Plugin",     "Parse test XML, display pass/fail trends"],
  ["Audit Trail",      "Who changed what config and when"],
];

export default function Session10() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s10-page {
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

        .hero { border-radius: 20px; background: linear-gradient(135deg, #1a0a2e 0%, #6c3483 55%, #8e44ad 100%); padding: 2.5rem 2rem; margin-bottom: 2rem; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px; }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .h-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-mod   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-fin   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.06em; background: rgba(255,215,0,0.18); border: 1px solid rgba(255,215,0,0.4); color: #FFD700; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-dur   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem; }
        .hero h1 { font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem; }
        .hero p  { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jpill { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; padding: 0.3rem 0.8rem; border-radius: 100px; border: 1px solid var(--border); background: var(--surface2); color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
        .jpill:hover { color: var(--text); border-color: var(--border2); }
        .jpill.active { background: linear-gradient(135deg,#6c3483,#8e44ad); color: #fff; border-color: transparent; }

        .pt { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text); margin: 2.5rem 0 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .pt::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .pt-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(135deg,#6c3483,#8e44ad); color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }

        .obj-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; }
        .obj-card h2 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1.1rem; }
        .obj-list { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
        .obj-list li { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: rgba(255,255,255,0.92); line-height: 1.5; }
        .obj-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(255,215,0,0.2); border: 1.5px solid #FFD700; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; color: #FFD700; flex-shrink: 0; margin-top: 2px; }

        .body-text { font-size: 0.9rem; color: var(--text2); line-height: 1.75; margin-bottom: 1rem; }
        .body-text strong { color: var(--text); }
        .body-text code { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .sub-h { font-size: 0.95rem; font-weight: 700; color: var(--text); margin: 1.5rem 0 0.75rem; }

        .tip-box { background: rgba(108,52,131,0.07); border-left: 3px solid #8e44ad; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .tip-box h4 { font-size: 0.82rem; font-weight: 700; color: #6c3483; margin-bottom: 0.5rem; }
        .tip-box p  { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .tip-box ul { list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .tip-box li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }
        .tip-box li::before { content: '→'; color: #8e44ad; flex-shrink: 0; font-size: 0.75rem; margin-top: 1px; }
        .tip-box strong { color: var(--text); }
        .tip-box code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .ex-box { background: var(--surface2); border-left: 3px solid #27ae60; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .ex-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #27ae60; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.6rem; font-weight: 600; }
        .ex-box p  { font-size: 0.84rem; color: var(--text2); line-height: 1.65; margin-bottom: 0.45rem; }
        .ex-box p:last-child { margin-bottom: 0; }
        .ex-box ul { padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .ex-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; }
        .ex-box li code, .ex-box p code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }
        .ex-box strong { color: var(--text); }

        .warn-box { background: rgba(220,53,69,0.05); border-left: 3px solid #dc3545; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .warn-box h4 { font-size: 0.82rem; font-weight: 700; color: #dc3545; margin-bottom: 0.5rem; }
        .warn-box p  { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
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
        .feat-icon { color: #8e44ad; font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
        .feat-card strong { font-size: 0.84rem; color: var(--text); display: block; margin-bottom: 0.12rem; }
        .feat-card span { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        .pillar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin: 1.25rem 0; }
        @media(max-width:580px){ .pillar-grid { grid-template-columns: 1fr; } }
        .pillar-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; }
        .pillar-header { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.7rem; }
        .pillar-icon { font-size: 1.4rem; }
        .pillar-name { font-size: 0.95rem; font-weight: 800; color: var(--text); }
        .pillar-desc { font-size: 0.8rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.7rem; }
        .pillar-list { list-style: none; display: flex; flex-direction: column; gap: 0.28rem; }
        .pillar-list li { font-size: 0.76rem; color: var(--text2); line-height: 1.45; display: flex; gap: 0.4rem; }
        .pillar-list li::before { content: '→'; flex-shrink: 0; color: #8e44ad; font-size: 0.7rem; margin-top: 1px; }

        .auth-list { display: flex; flex-direction: column; gap: 0.75rem; margin: 1.25rem 0; }
        .auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 1.1rem 1.25rem; }
        .auth-name { font-size: 0.9rem; font-weight: 700; color: var(--text); margin-bottom: 0.2rem; }
        .auth-when { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #8e44ad; letter-spacing: 0.06em; margin-bottom: 0.6rem; }
        .auth-how  { font-size: 0.81rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.7rem; padding-bottom: 0.65rem; border-bottom: 1px solid var(--border); }
        .auth-row  { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        @media(max-width:480px){ .auth-row { grid-template-columns: 1fr; } }
        .auth-pro  { background: rgba(39,174,96,0.05); border: 1px solid rgba(39,174,96,0.2); border-radius: 8px; padding: 0.6rem 0.8rem; }
        .auth-con  { background: rgba(220,53,69,0.04); border: 1px solid rgba(220,53,69,0.15); border-radius: 8px; padding: 0.6rem 0.8rem; }
        .auth-pro h5 { font-size: 0.67rem; font-weight: 700; color: #27ae60; margin-bottom: 0.3rem; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.06em; }
        .auth-con h5 { font-size: 0.67rem; font-weight: 700; color: #dc3545; margin-bottom: 0.3rem; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.06em; }
        .auth-pro ul, .auth-con ul { list-style: none; display: flex; flex-direction: column; gap: 0.2rem; }
        .auth-pro li { font-size: 0.74rem; color: var(--text2); line-height: 1.4; display: flex; gap: 0.3rem; }
        .auth-con li { font-size: 0.74rem; color: var(--text2); line-height: 1.4; display: flex; gap: 0.3rem; }
        .auth-pro li::before { content: '✓'; color: #27ae60; flex-shrink: 0; font-size: 0.7rem; }
        .auth-con li::before { content: '✗'; color: #dc3545; flex-shrink: 0; font-size: 0.7rem; }

        .data-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; margin: 1.25rem 0; }
        .data-table thead th { background: var(--surface2); color: var(--text); font-weight: 700; padding: 0.65rem 0.9rem; text-align: left; border-bottom: 2px solid var(--border); font-size: 0.78rem; }
        .data-table tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
        .data-table tbody tr:hover { background: var(--surface); }
        .data-table td { padding: 0.6rem 0.9rem; color: var(--text2); vertical-align: top; line-height: 1.5; }
        .data-table td:first-child { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: #8e44ad; font-weight: 600; }

        .role-list { display: flex; flex-direction: column; gap: 0.55rem; margin: 1.25rem 0; }
        .role-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 0.9rem 1.1rem; display: flex; gap: 1rem; align-items: flex-start; }
        @media(max-width:560px){ .role-card { flex-direction: column; gap: 0.5rem; } }
        .role-name-col { min-width: 90px; flex-shrink: 0; }
        .role-name { font-size: 0.84rem; font-weight: 700; color: var(--text); font-family: 'JetBrains Mono', monospace; }
        .role-when { font-size: 0.72rem; color: var(--text2); margin-top: 0.2rem; line-height: 1.4; }
        .role-perms { display: flex; flex-wrap: wrap; gap: 0.28rem; }
        .perm-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.64rem; background: rgba(108,52,131,0.1); border: 1px solid rgba(142,68,173,0.25); color: #8e44ad; padding: 0.14rem 0.5rem; border-radius: 6px; }

        .plugin-section { margin-bottom: 1.75rem; }
        .plugin-cat-header { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.65rem; padding-bottom: 0.45rem; border-bottom: 2px solid var(--border); }
        .plugin-cat-dot  { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .plugin-cat-name { font-size: 0.84rem; font-weight: 700; color: var(--text); }
        .plugin-rows { display: flex; flex-direction: column; gap: 0.35rem; }
        .plugin-row { display: flex; gap: 0.75rem; padding: 0.65rem 0.9rem; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; align-items: flex-start; transition: border-color 0.15s; }
        .plugin-row:hover { border-color: var(--border2); }
        .plugin-name { font-family: 'JetBrains Mono', monospace; font-size: 0.73rem; font-weight: 700; color: var(--text); min-width: 190px; flex-shrink: 0; }
        .plugin-desc { font-size: 0.78rem; color: var(--text2); line-height: 1.5; }
        @media(max-width:640px){ .plugin-row { flex-direction: column; gap: 0.25rem; } .plugin-name { min-width: unset; } }

        .workflow { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0; position: relative; }
        .workflow::before { content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 2px; background: var(--border); z-index: 0; }
        .wf-step { display: flex; align-items: flex-start; gap: 0.85rem; padding: 0.9rem 1rem; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); position: relative; z-index: 1; transition: border-color 0.2s; }
        .wf-step:hover { border-color: var(--border2); }
        .wf-num { width: 28px; height: 28px; border-radius: 8px; background: #6c3483; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; flex-shrink: 0; }
        .wf-body { display: flex; flex-direction: column; gap: 0.2rem; width: 100%; }
        .wf-body strong { font-size: 0.88rem; color: var(--text); }
        .wf-body p { font-size: 0.8rem; color: var(--text2); line-height: 1.5; }
        .wf-body code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        .act-box { background: linear-gradient(135deg,#1a0a2e 0%,#6c3483 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .act-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .act-box h4 { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 1.1rem 0 0.5rem; }
        .lab-ol { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; padding: 1rem 1rem 1rem 2rem; margin-bottom: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .lab-ol li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.55; }
        .lab-ol li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }
        .lab-ol li strong { color: #fff; }

        .quiz-box { background: linear-gradient(135deg,rgba(108,52,131,0.08),rgba(142,68,173,0.08)); border: 1px solid rgba(142,68,173,0.2); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .quiz-box h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.25rem; }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .qi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.9rem 1rem; }
        .qi-n { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #8e44ad; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
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
        .tk-card { background: var(--surface); border: 1px solid var(--border); border-top: 3px solid #8e44ad; border-radius: 12px; padding: 0.9rem 1rem; }
        .tk-card h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; font-family: 'JetBrains Mono', monospace; }
        .tk-card p  { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        .flow-pill { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.5rem; margin: 1.25rem 0; }
        .fp { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text); background: var(--surface); border: 1px solid var(--border); padding: 0.45rem 0.9rem; border-radius: 8px; }
        .fp-arrow { color: var(--muted); font-size: 0.9rem; }

        .rules-box { background: rgba(108,52,131,0.05); border: 1px solid rgba(142,68,173,0.2); border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0; }
        .rules-box h4 { font-size: 0.85rem; font-weight: 700; color: #6c3483; margin-bottom: 0.65rem; }
        .rules-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .rules-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .rules-box li::before { content: '✓'; color: #8e44ad; flex-shrink: 0; font-weight: 700; }

        .complete-card { background: linear-gradient(135deg,#0d1117 0%,#1a3a2a 50%,#27ae60 100%); border-radius: 20px; padding: 2.5rem 2rem; margin-top: 2.5rem; text-align: center; position: relative; overflow: hidden; }
        .complete-card::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 20px 20px; }
        .complete-card h2 { font-size: 1.7rem; font-weight: 800; color: #fff; margin-bottom: 0.4rem; position: relative; }
        .complete-card .sub { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 1rem; position: relative; display: block; }
        .complete-card p { color: rgba(255,255,255,0.8); font-size: 0.92rem; line-height: 1.7; max-width: 540px; margin: 0 auto 1.75rem; position: relative; }
        .complete-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; justify-content: center; position: relative; margin-bottom: 2rem; }
        .cpill { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; letter-spacing: 0.05em; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 0.25rem 0.65rem; border-radius: 100px; }
        .complete-links { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; position: relative; }
        .c-btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; background: #fff; color: #1a5c38; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 700; padding: 0.8rem 1.75rem; border-radius: 10px; text-decoration: none; transition: opacity 0.2s, transform 0.2s; }
        .c-btn-primary:hover { opacity: 0.92; transform: translateY(-2px); }
        .c-btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 700; padding: 0.8rem 1.75rem; border-radius: 10px; text-decoration: none; transition: opacity 0.2s; }
        .c-btn-secondary:hover { opacity: 0.8; }

        @media(max-width:640px){
          .s10-page { padding: 2rem 1rem 4rem; }
          .nav-row { flex-direction: column; }
          .nav-btn { width: 100%; justify-content: center; }
          .hero { padding: 1.5rem 1rem; border-radius: 14px; }
          .hero h1 { font-size: 1.3rem; }
          .jump-nav { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 0.4rem; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .jump-nav::-webkit-scrollbar { display: none; }
          .jpill { flex-shrink: 0; }
          .act-box { padding: 1.25rem 1rem; }
          .lab-ol { padding: 0.85rem 0.85rem 0.85rem 1.75rem; }
          .complete-card { padding: 1.75rem 1.25rem; }
          .complete-card h2 { font-size: 1.3rem; }
        }
        @media(max-width:400px){ .hero h1 { font-size: 1.1rem; } }
      `}</style>

      <div className="s10-page">

        <div className="bc">
          <Link href="/">Home</Link><span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link><span className="sep">/</span>
          <span className="cur">Session 10: Security &amp; Plugins</span>
        </div>

        <div className="nav-row">
          <Link href="/courses/dev/session9" className="nav-btn">&larr; Session 9: Pipelines &amp; Agents</Link>
          <Link href="/courses/dev/session1" className="nav-btn">&#127881; Course Home</Link>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 10 of 15</span>
            <span className="h-mod">Module 3 &mdash; Continuous Integration</span>
            <span className="h-fin">&#127881; Final Session</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4 hrs
            </span>
          </div>
          <h1>&#128274; Securing Jenkins &amp; Plugins</h1>
          <p>Lock down your Jenkins installation, control exactly who can do what, protect every secret, and extend Jenkins with the plugins your team actually needs.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","4 Pillars","Authentication","Create Users","Authorization","Matrix Security","RBAC Roles","Project Security","Confidentiality","HTTPS","SCM Plugins","Build Plugins","Test Plugins","Lab","Quiz","Homework"].map((l,i)=>(
            <a key={i} href={`#s10p${i}`} className={`jpill${i===0?" active":""}`}>{l}</a>
          ))}
        </div>

        {/* OBJECTIVES */}
        <div id="s10p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o,i)=>(
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* 4 PILLARS */}
        <div id="s10p1">
          <div className="pt"><span className="pt-badge">Foundation</span>The Four Pillars of Jenkins Security</div>
          <p className="body-text">
            A freshly installed Jenkins with <strong>no security configuration</strong> allows anyone who can reach port 8080 to do anything &mdash; create jobs, read secrets, install plugins, and run arbitrary shell commands on your server. The first thing you do after installation is enable security.
          </p>
          <div className="pillar-grid">
            {securityPillars.map(p=>(
              <div key={p.pillar} className="pillar-card">
                <div className="pillar-header">
                  <span className="pillar-icon">{p.icon}</span>
                  <span className="pillar-name">{p.pillar}</span>
                </div>
                <p className="pillar-desc">{p.desc}</p>
                <ul className="pillar-list">
                  {p.examples.map((e,i)=><li key={i}>{e}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="warn-box">
            <h4>&#9888; Unsecured Jenkins is a Critical Vulnerability</h4>
            <ul>
              <li>An unsecured Jenkins exposed to the internet is effectively a <strong>Remote Code Execution service</strong> — anyone can open the Script Console and run any command on your server</li>
              <li>Check: Manage Jenkins → Security. If you see <strong>"Allow anyone to do anything"</strong> under Authorization — fix it immediately</li>
              <li>Action order: (1) enable authentication, (2) create your admin account, (3) restrict anonymous access, (4) enable HTTPS</li>
            </ul>
          </div>
        </div>

        {/* AUTHENTICATION */}
        <div id="s10p2">
          <div className="pt"><span className="pt-badge">Authentication</span>Configuring Authentication</div>
          <p className="body-text">
            Authentication is configured at <strong>Manage Jenkins &rarr; Security &rarr; Security Realm</strong>. Choose the method that matches your organisation&apos;s infrastructure.
          </p>
          <div className="auth-list">
            {authMethods.map(m=>(
              <div key={m.method} className="auth-card">
                <div className="auth-name">{m.method}</div>
                <div className="auth-when">Best for: {m.when}</div>
                <p className="auth-how">{m.how}</p>
                <div className="auth-row">
                  <div className="auth-pro"><h5>PROS</h5><ul>{m.pros.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
                  <div className="auth-con"><h5>CONS</h5><ul>{m.cons.map((c,i)=><li key={i}>{c}</li>)}</ul></div>
                </div>
              </div>
            ))}
          </div>

          <div className="sub-h">Enabling Security — Step by Step</div>
          <div className="workflow">
            {[
              {n:"1", t:"Manage Jenkins → Security",            b:"This is the master security control panel. All authentication, authorization, and agent settings are here."},
              {n:"2", t:"Check 'Enable Security'",              b:"The page expands to show Security Realm and Authorization options. Jenkins is now requiring configuration."},
              {n:"3", t:"Security Realm: Jenkins' own database", b:"Select 'Jenkins' own user database'. Check 'Allow users to sign up' only for the initial setup — uncheck it after creating your admin account."},
              {n:"4", t:"Authorization: choose a strategy",     b:"Start with 'Logged-in users can do anything' for simplicity, or 'Matrix-based security' for fine-grained control. Never leave 'Anyone can do anything'."},
              {n:"5", t:"Save and log in",                      b:"Click Save. Jenkins asks you to log in. Use the admin account from the initial setup wizard."},
              {n:"6", t:"Uncheck Allow sign-up",                b:"Manage Jenkins → Security → uncheck 'Allow users to sign up'. Now only admins can create new accounts — no unauthorised registrations."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>

          <div className="sub-h">LDAP Configuration Reference</div>
          <div className="cb">
<span className="c-cm"># Install the LDAP plugin first:</span>{"\n"}
<span className="c-cm"># Manage Jenkins → Plugins → Available → search "LDAP" → install and restart</span>{"\n\n"}
<span className="c-cm"># Then Manage Jenkins → Security → Security Realm → LDAP</span>{"\n\n"}
Server:               ldap://your-ad-server.company.com:389{"\n"}
Root DN:              dc=company,dc=com{"\n"}
User search base:     ou=users{"\n"}
User search filter:   {"sAMAccountName={0}"}     <span className="c-cm">  # Active Directory</span>{"\n"}
                      {"uid={0}"}                 <span className="c-cm">  # OpenLDAP</span>{"\n"}
Group search base:    ou=groups{"\n"}
Manager DN:           cn=jenkins-bind,ou=service-accounts,dc=company,dc=com{"\n"}
Manager Password:     <span className="c-cm">your-bind-service-account-password</span>{"\n\n"}
<span className="c-cm"># Click "Test LDAP settings" — enter a real user's credentials to verify</span>{"\n"}
<span className="c-ok">Authentication successful</span>  <span className="c-cm">← success message</span>
          </div>
        </div>

        {/* CREATE USERS */}
        <div id="s10p3">
          <div className="pt"><span className="pt-badge">Users</span>Creating &amp; Managing Jenkins Users</div>
          <p className="body-text">
            When using the built-in user database, an admin creates all accounts manually. Permissions are <em>not</em> set on this page — they are set in the Authorization section (Matrix or RBAC).
          </p>

          <div className="workflow">
            {[
              {n:"1", t:"Manage Jenkins → Users",           b:"Lists all users in the local database — username, full name, and last active time."},
              {n:"2", t:"Click 'Create User'",              b:"Fill in: Username (lowercase, no spaces — e.g. alice.smith), Password, Confirm Password, Full Name, Email Address."},
              {n:"3", t:"Save",                             b:"The user appears in the list and can now log in immediately with the credentials you set."},
              {n:"4", t:"Assign permissions",               b:"User permissions are set in Manage Jenkins → Security (Matrix table) or Manage and Assign Roles (RBAC). Adding a user here does not grant them any permissions yet."},
              {n:"5", t:"User resets their password",       b:"After first login: top-right menu → username → Configure → change the password to something only they know."},
              {n:"6", t:"Delete vs disable",                b:"Delete: Manage Jenkins → Users → Delete — removes login access, build history remains. For departing team members, prefer disabling via the security matrix (remove all permissions) rather than deleting, to preserve audit history."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>

          <div className="tip-box">
            <h4>&#128161; User Account Best Practices</h4>
            <ul>
              <li>Create a <strong>dedicated service account</strong> (e.g. ci-bot) for automation and API access — never use a personal admin account for scripts</li>
              <li>One account per person — shared accounts make the audit trail meaningless</li>
              <li>Document a password policy — Jenkins has no built-in enforcement, so enforce it as a team rule</li>
              <li>Revoke permissions immediately when someone leaves — remove their row from Matrix or unassign their role in RBAC</li>
            </ul>
          </div>
        </div>

        {/* AUTHORIZATION OVERVIEW */}
        <div id="s10p4">
          <div className="pt"><span className="pt-badge">Authorization</span>Authorization Strategies Overview</div>
          <p className="body-text">Authorization controls <em>what</em> authenticated users can do. Jenkins offers several strategies &mdash; pick based on team size and security requirements.</p>
          <div className="feat-grid">
            {[
              ["Allow anyone to do anything",     "No authorization — all users (including anonymous!) have full admin rights. ONLY for a local dev laptop with no network access. Never production."],
              ["Logged-in users can do anything",  "All authenticated users are admins. Anonymous has no access. OK for very small trusted teams. Simple but coarse."],
              ["Matrix-based Security",            "Per-user permission table — granular, full control. Best for small-medium teams with specific access requirements."],
              ["Role-Based Access Control (RBAC)", "Define named roles with permissions, assign users to roles. Best for larger teams where many users share the same access level."],
              ["Project-based Matrix Auth",        "Matrix security extended with per-job permissions. Most flexible, most complex. Use when teams need completely isolated job access."],
              ["Legacy mode (obsolete)",           "Admin = full, non-admin = read-only. Not recommended — use Matrix or RBAC."],
            ].map(([t,d])=>(
              <div key={t} className="feat-card"><span className="feat-icon">&#128737;</span><div><strong>{t}</strong><span>{d}</span></div></div>
            ))}
          </div>
        </div>

        {/* MATRIX SECURITY */}
        <div id="s10p5">
          <div className="pt"><span className="pt-badge">Matrix Security</span>Configuring Matrix-Based Security</div>
          <p className="body-text">
            Matrix-based Security shows a permission table: each row is a user or group, each column is a permission. You tick exactly what each user needs.
          </p>
          <div className="workflow">
            {[
              {n:"1", t:"Enable Matrix-based security",      b:"Manage Jenkins → Security → Authorization → select 'Matrix-based security'. The permission table appears with rows for 'anonymous' (not logged in) and 'authenticated' (all logged-in users)."},
              {n:"2", t:"Set Anonymous row",                  b:"For production: check nothing for anonymous — require login before seeing anything. If you want public read access, check Overall/Read and Job/Read only."},
              {n:"3", t:"Set Authenticated row",              b:"Check Overall/Read, Job/Read, View/Read. This gives all logged-in users basic read access. Only tick Job/Build here if every user in the system should be able to trigger any job."},
              {n:"4", t:"Add your admin username",            b:"Click 'Add user or group', enter your username. Tick 'Overall/Administer'. This makes you a full admin. There should be at most 2–3 admins."},
              {n:"5", t:"Add individual users",               b:"Add each user by username. Tick only the permissions they need. See the reference table below."},
              {n:"6", t:"Save and test",                      b:"Click Save. Log out. Log in as a non-admin user and verify permissions. Log in as admin to confirm admin still works. Always test before removing your own admin access."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>

          <div className="sub-h">Permission Reference</div>
          <table className="data-table">
            <thead><tr><th>Permission</th><th>What It Allows</th></tr></thead>
            <tbody>{matrixPermissions.map(([p,d])=><tr key={p}><td>{p}</td><td>{d}</td></tr>)}</tbody>
          </table>

          <div className="warn-box">
            <h4>&#9888; Locked Out of Jenkins?</h4>
            <ul>
              <li>Stop Jenkins: <code>sudo systemctl stop jenkins</code></li>
              <li>Edit <code>/var/lib/jenkins/config.xml</code> — delete the entire <code>&lt;authorizationStrategy&gt;</code> block</li>
              <li>Restart Jenkins: <code>sudo systemctl start jenkins</code> — security resets to "anyone can do anything"</li>
              <li>Log in immediately and reconfigure security properly. <strong>Always test with a second admin account before changing your own permissions.</strong></li>
            </ul>
          </div>
        </div>

        {/* RBAC */}
        <div id="s10p6">
          <div className="pt"><span className="pt-badge">RBAC</span>Role-Based Access Control</div>
          <p className="body-text">
            Install the <strong>Role-based Authorization Strategy</strong> plugin (Manage Jenkins → Plugins → search "Role-based Authorization Strategy"). This is the recommended approach for teams with 5+ users &mdash; define roles once, assign users to roles, update a role to change all its members at once.
          </p>

          <div className="workflow">
            {[
              {n:"1", t:"Install plugin and enable RBAC",      b:"Manage Jenkins → Plugins → Available → 'Role-based Authorization Strategy' → Install → restart. Then Manage Jenkins → Security → Authorization → 'Role-Based Strategy' → Save."},
              {n:"2", t:"Manage Roles",                        b:"Manage Jenkins → Manage and Assign Roles → Manage Roles. The Global roles section shows a permission matrix — same columns as Matrix security, but rows are role names, not usernames."},
              {n:"3", t:"Create roles",                        b:"Enter role names one at a time (viewer, developer, team-lead, admin) and click Add. Tick the permissions for each role. Save."},
              {n:"4", t:"Create Item Roles (optional)",        b:"Item roles scope permissions to specific jobs matching a pattern — e.g. pattern 'TeamA.*' applies to all jobs in folder TeamA. Give a role Build rights only on TeamA jobs."},
              {n:"5", t:"Assign Roles",                        b:"Manage Jenkins → Manage and Assign Roles → Assign Roles. Add each username, then select their Global role from the dropdown. Click Add. Save."},
              {n:"6", t:"Verify",                              b:"Log in as each user type and confirm they can only see and do what their role allows."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>

          <div className="sub-h">Recommended Role Definitions</div>
          <div className="role-list">
            {rbaRoles.map(r=>(
              <div key={r.role} className="role-card">
                <div className="role-name-col">
                  <div className="role-name">{r.role}</div>
                  <div className="role-when">{r.when}</div>
                </div>
                <div className="role-perms">
                  {r.perms.map(p=><span key={p} className="perm-tag">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECT SECURITY */}
        <div id="s10p7">
          <div className="pt"><span className="pt-badge">Project Security</span>Folder-Level Project Security</div>
          <p className="body-text">
            The <strong>Folder plugin</strong> (CloudBees Folders) lets you group jobs and apply permissions per folder. A user can have Build rights on <code>TeamA</code> but only Read rights on <code>TeamB</code> &mdash; they cannot even see TeamB&apos;s configuration.
          </p>
          <div className="cb">
<span className="c-cm"># Folder structure with per-team access</span>{"\n"}
Jenkins Dashboard{"\n"}
├── TeamA/                <span className="c-ok">← developer1 has Build rights here</span>{"\n"}
│   ├── frontend-app{"\n"}
│   └── backend-api{"\n"}
├── TeamB/                <span className="c-cm">← developer1 has Read-only here</span>{"\n"}
│   └── mobile-app{"\n"}
└── Shared/               <span className="c-cm">← developer1 cannot see this folder at all</span>{"\n"}
    └── infra-job{"\n\n"}
<span className="c-cm"># Credentials scoped to a folder are ONLY available</span>{"\n"}
<span className="c-cm"># to jobs inside that folder — not to other teams</span>
          </div>
          <div className="workflow">
            {[
              {n:"1", t:"Create a Folder",                         b:"Dashboard → New Item → name e.g. TeamA → select Folder → OK."},
              {n:"2", t:"Enable project-based security",           b:"Inside the folder → Configure → check 'Enable project-based security'. A permission matrix for this folder appears."},
              {n:"3", t:"Set per-folder permissions",              b:"Add users and tick permissions specific to this folder. These override global permissions for all jobs inside. Users not listed fall back to their global role."},
              {n:"4", t:"Add folder-scoped credentials",           b:"Inside the folder → Credentials → Add. Secrets here are only accessible to jobs inside this folder — TeamA's deploy keys never reach TeamB jobs."},
              {n:"5", t:"Create jobs inside the folder",           b:"Navigate into the folder, then New Item. All jobs created here inherit the folder's security settings automatically."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>
        </div>

        {/* CONFIDENTIALITY */}
        <div id="s10p8">
          <div className="pt"><span className="pt-badge">Confidentiality</span>Protecting Secrets &amp; Credentials</div>
          <p className="body-text">
            Secrets must <strong>never</strong> appear in Jenkinsfiles, console logs, or config files. Store them in the Jenkins Credentials store and inject them via <code>withCredentials()</code> or <code>credentials()</code> &mdash; Jenkins masks the values automatically.
          </p>

          <div className="sub-h">Adding a Credential</div>
          <div className="workflow">
            {[
              {n:"1", t:"Open Credentials",        b:"Dashboard → Manage Jenkins → Credentials → (global) → Add Credentials."},
              {n:"2", t:"Choose the type",          b:"Secret text — API token, webhook secret. Username/Password — service account. SSH Username with private key — Git deploy key, server SSH. Certificate — PKCS12 for HTTPS client auth."},
              {n:"3", t:"Set the ID",               b:"ID is how you reference the credential in Jenkinsfiles — e.g. 'github-api-token'. Use a clear descriptive ID; you cannot easily change it later."},
              {n:"4", t:"Enter the secret value",   b:"Paste in your password, token, or private key. Click OK. The value is stored encrypted on disk — it is never shown again in the UI."},
            ].map(s=>(
              <div key={s.n} className="wf-step"><div className="wf-num">{s.n}</div><div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div></div>
            ))}
          </div>

          <div className="sub-h">Using Credentials Securely in a Pipeline</div>
          <div className="cb">
<span className="c-kw">pipeline</span> {"{"}{"\n"}
  <span className="c-kw">agent</span> any{"\n"}
  <span className="c-kw">environment</span> {"{"}{"\n"}
    <span className="c-cm">// credentials() injects AND masks the value automatically</span>{"\n"}
    GITHUB_TOKEN = <span className="c-fn">credentials</span>(<span className="c-str">'github-api-token'</span>){"\n"}
  {"}"}{"\n"}
  <span className="c-kw">stages</span> {"{"}{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Deploy'</span>) {"{"}{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-cm">// withCredentials — explicit, scoped to the block</span>{"\n"}
        <span className="c-fn">withCredentials</span>([<span className="c-fn">string</span>(credentialsId:<span className="c-str">'deploy-api-key'</span>, variable:<span className="c-str">'API_KEY'</span>)]) {"{"}{"\n"}
          <span className="c-fn">sh</span> <span className="c-str">'curl -H "Authorization: Bearer $API_KEY" https://api.example.com/deploy'</span>{"\n"}
          <span className="c-cm">// Console output: curl -H "Authorization: Bearer ****"</span>{"\n"}
        {"}"}{"\n\n"}
        <span className="c-cm">// SSH key credential</span>{"\n"}
        <span className="c-fn">withCredentials</span>([<span className="c-fn">sshUserPrivateKey</span>(credentialsId:<span className="c-str">'prod-server-ssh'</span>, keyFileVariable:<span className="c-str">'SSH_KEY'</span>)]) {"{"}{"\n"}
          <span className="c-fn">sh</span> <span className="c-str">'scp -i $SSH_KEY app.jar user@prod:/opt/app/'</span>{"\n"}
        {"}"}{"\n\n"}
        <span className="c-err">// NEVER do this — visible in plain text in Git and logs:</span>{"\n"}
        <span className="c-err">// sh "curl -H 'Authorization: Bearer hardcoded-token' ..."</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
  {"}"}{"\n"}
{"}"}
          </div>

          <div className="feat-grid">
            {[
              ["Never hardcode in Jenkinsfile","The Jenkinsfile is in Git — everyone with repo access sees the secret. Always reference by credentials ID only."],
              ["Never echo credentials","Even masked, avoid echoing credential variables — multi-line values and special characters can break masking."],
              ["Rotate credentials regularly","Update stored credential values when tokens expire or staff leave. The ID stays the same — no Jenkinsfile changes needed."],
              ["Audit credential usage","Audit Trail plugin tracks which jobs accessed which credentials — essential for compliance and incident response."],
            ].map(([t,d])=>(
              <div key={t} className="feat-card"><span className="feat-icon">&#128274;</span><div><strong>{t}</strong><span>{d}</span></div></div>
            ))}
          </div>
        </div>

        {/* HTTPS */}
        <div id="s10p9">
          <div className="pt"><span className="pt-badge">HTTPS</span>Running Jenkins over HTTPS</div>
          <p className="body-text">
            By default Jenkins runs on plain HTTP port 8080. Every login, every API call, every credential is sent as unencrypted text. Use an <strong>Nginx reverse proxy</strong> with a TLS certificate to secure all traffic.
          </p>
          <div className="cb">
<span className="c-cm"># 1. Install Nginx and Certbot (free Let's Encrypt certificate)</span>{"\n"}
sudo apt install -y nginx certbot python3-certbot-nginx{"\n\n"}
<span className="c-cm"># 2. Get a free TLS certificate (requires domain pointing to this server)</span>{"\n"}
sudo certbot --nginx -d jenkins.yourdomain.com{"\n\n"}
<span className="c-cm"># 3. Create /etc/nginx/sites-available/jenkins</span>{"\n"}
<span className="c-out">server {"{"}</span>{"\n"}
<span className="c-out">    listen 443 ssl;</span>{"\n"}
<span className="c-out">    server_name jenkins.yourdomain.com;</span>{"\n"}
<span className="c-out">    ssl_certificate     /etc/letsencrypt/live/jenkins.yourdomain.com/fullchain.pem;</span>{"\n"}
<span className="c-out">    ssl_certificate_key /etc/letsencrypt/live/jenkins.yourdomain.com/privkey.pem;</span>{"\n\n"}
<span className="c-out">    location / {"{"}</span>{"\n"}
<span className="c-out">        proxy_pass         http://localhost:8080;</span>{"\n"}
<span className="c-out">        proxy_set_header   Host $host;</span>{"\n"}
<span className="c-out">        proxy_set_header   X-Forwarded-Proto https;</span>{"\n"}
<span className="c-out">        proxy_set_header   X-Real-IP $remote_addr;</span>{"\n"}
<span className="c-out">    {"}"}</span>{"\n"}
<span className="c-out">{"}"}</span>{"\n\n"}
<span className="c-cm"># 4. Enable site and reload Nginx</span>{"\n"}
sudo ln -s /etc/nginx/sites-available/jenkins /etc/nginx/sites-enabled/{"\n"}
sudo nginx -t && sudo systemctl reload nginx{"\n\n"}
<span className="c-cm"># 5. Update Jenkins URL to use https://</span>{"\n"}
<span className="c-cm"># Manage Jenkins → System → Jenkins URL → https://jenkins.yourdomain.com/</span>
          </div>
          <div className="tip-box">
            <h4>&#128161; After Enabling HTTPS</h4>
            <ul>
              <li>Update <strong>Jenkins URL</strong> in Manage Jenkins → System to <code>https://</code> — fixes webhook callbacks, email links, agent connections</li>
              <li>Update any GitHub/GitLab webhook URLs from <code>http://</code> to <code>https://</code></li>
              <li>Set up certificate auto-renewal: <code>sudo certbot renew --dry-run</code> to test, then add a cron job</li>
              <li>Redirect port 80 to 443 so HTTP requests are automatically upgraded</li>
            </ul>
          </div>
        </div>

        {/* SCM PLUGINS */}
        <div id="s10p10">
          <div className="pt"><span className="pt-badge">SCM Plugins</span>Source Control Plugins</div>
          <p className="body-text">
            SCM plugins connect Jenkins to your version control system. They enable cloning, change detection, webhooks, and posting build status back to pull requests.
          </p>
          {importantPlugins.filter(c=>c.category==="SCM & Source Control").map(cat=>(
            <div key={cat.category} className="plugin-section">
              <div className="plugin-rows">
                {cat.plugins.map(([name,desc])=>(
                  <div key={name} className="plugin-row">
                    <span className="plugin-name">{name}</span>
                    <span className="plugin-desc">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="sub-h">Git Plugin — Advanced SCM Options</div>
          <div className="cb">
<span className="c-cm"># Freestyle job → Source Code Management → Git → Additional Behaviours</span>{"\n\n"}
Branch Specifier:{"\n"}
  */main          <span className="c-cm">  # build the main branch only</span>{"\n"}
  **              <span className="c-cm">  # build ALL branches (for Multibranch Pipeline)</span>{"\n"}
  */release/*     <span className="c-cm">  # build only release/* branches</span>{"\n\n"}
Additional Behaviours (click Add):{"\n"}
  Shallow clone depth:  1     <span className="c-cm">  # only fetch last 1 commit — much faster</span>{"\n"}
  Clean before checkout: ✓    <span className="c-cm">  # wipe workspace, then fresh clone</span>{"\n"}
  Prune stale branches:  ✓    <span className="c-cm">  # remove locally deleted remote branches</span>
          </div>
        </div>

        {/* BUILD PLUGINS */}
        <div id="s10p11">
          <div className="pt"><span className="pt-badge">Build Plugins</span>Build &amp; Compilation Plugins</div>
          <p className="body-text">
            Build plugins add new agent types, job types, and build steps for specific languages and tools.
          </p>
          {importantPlugins.filter(c=>c.category==="Build & Compilation").map(cat=>(
            <div key={cat.category} className="plugin-section">
              <div className="plugin-rows">
                {cat.plugins.map(([name,desc])=>(
                  <div key={name} className="plugin-row">
                    <span className="plugin-name">{name}</span>
                    <span className="plugin-desc">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="sub-h">Docker Pipeline Plugin — Containerised Builds</div>
          <div className="cb">
<span className="c-kw">pipeline</span> {"{"}{"\n"}
  <span className="c-kw">agent</span> none{"\n"}
  <span className="c-kw">stages</span> {"{"}{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Build'</span>) {"{"}{"\n"}
      <span className="c-kw">agent</span> {"{"} docker {"{"} image <span className="c-str">'maven:3.9-eclipse-temurin-17'</span> {"}"} {"}"}{"\n"}
      <span className="c-kw">steps</span> {"{"}{"\n"}
        <span className="c-fn">sh</span> <span className="c-str">'mvn clean package'</span>   <span className="c-cm">// Maven from inside the container</span>{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Test Node'</span>) {"{"}{"\n"}
      <span className="c-kw">agent</span> {"{"} docker {"{"} image <span className="c-str">'node:20-alpine'</span> {"}"} {"}"}{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'npm install && npm test'</span> {"}"}{"\n"}
    {"}"}{"\n"}
  {"}"}{"\n"}
{"}"}
          </div>
        </div>

        {/* TEST & OTHER PLUGINS */}
        <div id="s10p12">
          <div className="pt"><span className="pt-badge">Test Plugins</span>Test, Quality, Notification &amp; Security Plugins</div>
          <p className="body-text">
            Test plugins parse test output and display results. Quality plugins track coverage trends. Notification plugins alert your team instantly on failures.
          </p>
          {importantPlugins.filter(c=>c.category!=="SCM & Source Control" && c.category!=="Build & Compilation").map(cat=>(
            <div key={cat.category} className="plugin-section">
              <div className="plugin-cat-header">
                <div className="plugin-cat-dot" style={{background:cat.color}}></div>
                <span className="plugin-cat-name">{cat.category}</span>
              </div>
              <div className="plugin-rows">
                {cat.plugins.map(([name,desc])=>(
                  <div key={name} className="plugin-row">
                    <span className="plugin-name">{name}</span>
                    <span className="plugin-desc">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="sub-h">Publishing Test Results &amp; Notifications in a Pipeline</div>
          <div className="cb">
<span className="c-kw">pipeline</span> {"{"}{"\n"}
  <span className="c-kw">agent</span> any{"\n"}
  <span className="c-kw">stages</span> {"{"}{"\n"}
    <span className="c-kw">stage</span>(<span className="c-str">'Test'</span>) {"{"}{"\n"}
      <span className="c-kw">steps</span> {"{"} <span className="c-fn">sh</span> <span className="c-str">'mvn test'</span> {"}"}{"\n"}
      <span className="c-kw">post</span> {"{"}{"\n"}
        <span className="c-kw">always</span> {"{"}{"\n"}
          <span className="c-fn">junit</span> <span className="c-str">'target/surefire-reports/*.xml'</span>   <span className="c-cm">// JUnit plugin</span>{"\n"}
          <span className="c-fn">jacoco</span>(execPattern:<span className="c-str">'target/jacoco.exec'</span>,{"\n"}
                 classPattern:<span className="c-str">'target/classes'</span>,{"\n"}
                 sourcePattern:<span className="c-str">'src/main/java'</span>)  <span className="c-cm">// JaCoCo coverage</span>{"\n"}
        {"}"}{"\n"}
      {"}"}{"\n"}
    {"}"}{"\n"}
  {"}"}{"\n"}
  <span className="c-kw">post</span> {"{"}{"\n"}
    <span className="c-kw">failure</span> {"{"}{"\n"}
      <span className="c-fn">emailext</span>({"\n"}
        subject: <span className="c-str">"FAILED: ${"{"}env.JOB_NAME{"}"} #${"{"}env.BUILD_NUMBER{"}"}"</span>,{"\n"}
        body:    <span className="c-str">"See: ${"{"}env.BUILD_URL{"}"}console"</span>,{"\n"}
        to:      <span className="c-str">'team@company.com'</span>{"\n"}
      ){"\n"}
    {"}"}{"\n"}
    <span className="c-kw">always</span> {"{"} <span className="c-fn">cleanWs</span>() {"}"}{"\n"}
  {"}"}{"\n"}
{"}"}
          </div>
        </div>

        {/* LAB */}
        <div id="s10p13">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 &mdash; Enable Security and Create Users</h4>
            <ol className="lab-ol">
              <li>Manage Jenkins → Security → Enable Security → Jenkins' own user database → Matrix-based security</li>
              <li>Set anonymous row: no permissions. Set authenticated row: Overall/Read, Job/Read, View/Read</li>
              <li>Add your admin username with Overall/Administer. Save and verify you can still log in.</li>
              <li>Create three users: <code>developer1</code>, <code>viewer1</code>, <code>teamlead1</code></li>
              <li>In the Matrix: give <code>developer1</code> Job/Build + Job/Cancel. Give <code>teamlead1</code> Job/Configure + Job/Create. Leave <code>viewer1</code> with only inherited read permissions.</li>
              <li>Log in as each user and verify they can only perform their permitted actions</li>
            </ol>

            <h4>Lab 2 &mdash; Role-Based Access Control</h4>
            <ol className="lab-ol">
              <li>Install <strong>Role-based Authorization Strategy</strong> plugin and restart Jenkins</li>
              <li>Switch Authorization to Role-Based Strategy</li>
              <li>Create roles: <code>viewer</code> (Overall/Read + Job/Read), <code>developer</code> (+ Job/Build + Job/Cancel), <code>admin</code> (Overall/Administer)</li>
              <li>Assign: <code>viewer1</code> → viewer, <code>developer1</code> → developer, your admin → admin</li>
              <li>Log in as <code>developer1</code> — verify they can build but not configure. Log in as <code>viewer1</code> — verify read-only.</li>
            </ol>

            <h4>Lab 3 &mdash; Credentials and Secret Masking</h4>
            <ol className="lab-ol">
              <li>Add a Secret Text credential: ID <code>my-api-token</code>, value <code>super-secret-12345</code></li>
              <li>Create a Pipeline with: <code>{"withCredentials([string(credentialsId:'my-api-token', variable:'TOKEN')]) { sh 'echo Token is $TOKEN' }"}</code></li>
              <li>Run the build — verify the Console Output shows <strong>Token is ****</strong> not the actual value</li>
              <li>Add a second credential of type Username/Password. Inject it with <code>usernamePassword()</code> and verify both username and password are masked.</li>
            </ol>

            <h4>Lab 4 &mdash; Install and Use Test Plugins</h4>
            <ol className="lab-ol">
              <li>Install: <strong>JUnit Plugin</strong>, <strong>HTML Publisher</strong>, <strong>Email Extension Plugin</strong></li>
              <li>Add <code>junit 'target/surefire-reports/*.xml'</code> to your Maven Pipeline&apos;s <code>post {"{ always { } }"}</code> block</li>
              <li>Build and verify the test results graph appears on the job page with pass/fail counts</li>
              <li>Deliberately fail one test — observe the build goes UNSTABLE (yellow) not FAILED (red) — note the distinction</li>
              <li>Fix the test — verify the next build is green and the trend graph shows the recovery</li>
            </ol>

            <h4>Challenge &mdash; Folder Security</h4>
            <ol className="lab-ol">
              <li>Install the <strong>CloudBees Folder</strong> plugin. Create two folders: <code>TeamA</code> and <code>TeamB</code></li>
              <li>Enable project-based security on each folder. Give <code>developer1</code> Build rights on TeamA, Read-only on TeamB</li>
              <li>Add a folder-scoped Secret Text credential inside TeamA. Verify a job in TeamB cannot reference it.</li>
              <li>Log in as <code>developer1</code> — confirm they can build in TeamA but the Build button is absent in TeamB</li>
            </ol>
          </div>
        </div>

        {/* QUIZ */}
        <div id="s10p14" className="quiz-box">
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
        <div id="s10p15" className="hw-box">
          <h3>&#128221; Final Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Full Security Configuration:</h4>
            <ul>
              <li>Configure RBAC: create Admin, Team-Lead, Developer, and Viewer roles with appropriate permissions</li>
              <li>Create 5 users and assign them to roles — document each user&apos;s role and justify the permission level chosen</li>
              <li>Create two folders (ProjectA, ProjectB) with folder-level security — ProjectA developers cannot build ProjectB jobs</li>
              <li>Screenshot the role definitions table and user assignment page</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Credentials Security Exercise:</h4>
            <ul>
              <li>Add three credentials: SSH key (GitHub), Secret Text (dummy API token), Username/Password (dummy DB)</li>
              <li>Write a Pipeline that uses <code>withCredentials</code> to inject all three — verify all masked in console output</li>
              <li>Write a short paragraph: what is the risk if a credential accidentally appears in console output, and how do you remediate it?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Plugin Research Report:</h4>
            <ul>
              <li>Install Audit Trail plugin — make 5 configuration changes and screenshot the audit log entries</li>
              <li>Install Blue Ocean — run your Maven Pipeline through it and screenshot the stage visualisation</li>
              <li>Research and document 3 additional plugins not covered in this session that would benefit a real DevOps team, explaining what problem each solves</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Module 3 Capstone — Secure CI/CD Pipeline:</h4>
            <ul>
              <li>Build a complete Pipeline combining Sessions 7–10: Git webhook trigger, Maven build, parallel unit tests + code style, JUnit result publishing, archived JAR, credentials used via <code>withCredentials</code>, agent label targeting, <code>cleanWs()</code></li>
              <li>Only Admin and Team-Lead roles can configure the job; Developer role can trigger builds; Viewer reads only</li>
              <li>Document the full setup with screenshots and a written explanation of every security decision made</li>
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
          <span className="fp">Authenticate</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Authorize</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Secure Secrets</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">HTTPS</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Audit</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">&#9989; Safe Jenkins</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; Jenkins Security Golden Rules</h4>
          <ul>
            <li>Enable security immediately after installation — never leave "Allow anyone to do anything" in production</li>
            <li>Set Controller executors to 0 and block anonymous access — no unauthenticated builds, ever</li>
            <li>Use RBAC for teams of 5 or more — roles scale, individual Matrix rows do not</li>
            <li>Never hardcode credentials in Jenkinsfiles — always store in the Credentials store and reference by ID</li>
            <li>Enable HTTPS before exposing Jenkins beyond localhost — plain HTTP sends passwords in clear text</li>
            <li>Install the Audit Trail plugin — you must know who changed what config and when</li>
            <li>Keep plugins updated — outdated plugins are the primary Jenkins attack surface</li>
          </ul>
        </div>

        {/* COURSE COMPLETE */}
        <div className="complete-card">
          <h2>&#127881; Module 3 Complete!</h2>
          <span className="sub">Continuous Integration &mdash; Jenkins &mdash; Sessions 7 – 10</span>
          <p>You have covered the complete Jenkins CI/CD curriculum — from first installation and basic jobs to production-grade secure pipelines running across distributed agent nodes.</p>
          <div className="complete-pills">
            {["CI/CD Concepts","Jenkins Install","Freestyle Jobs","Global Tools","Git Plugin","Maven Builds","Webhooks","Poll SCM","Job Types","Declarative Pipeline","Parallel Stages","Master-Slave Agents","Workspace Mgmt","Authentication","Authorization","RBAC","Credentials","HTTPS","JUnit Plugin","Audit Trail"].map(t=>(
              <span key={t} className="cpill">&#10003; {t}</span>
            ))}
          </div>
          <div className="complete-links">
            <Link href="/courses/dev/session7" className="c-btn-secondary">&larr; Back to Session 7</Link>
            <Link href="/courses/dev/session1" className="c-btn-primary">&#127968; Course Home &rarr;</Link>
          </div>
        </div>

      </div>
    </>
  );
}