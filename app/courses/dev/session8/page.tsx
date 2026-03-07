// app/courses/dev/session8/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Navigate Manage Jenkins and understand every configuration section",
  "Configure Jenkins System Settings — URL, admin email, executors, and environment variables",
  "Set up Global Tool Configuration for Java, Maven, Git, and NodeJS",
  "Install, manage, and troubleshoot Jenkins plugins safely",
  "Connect Jenkins to a GitHub repository using the Git plugin and SSH keys",
  "Configure GitHub Webhooks so builds trigger instantly on every push",
  "Understand all Jenkins job types and when to use each one",
  "Build a real Maven Java project end-to-end from GitHub source",
  "Manage workspaces, credentials, and build artefact archiving",
];

const manageJenkinsSections = [
  ["System",                "Jenkins URL, admin email, global env vars, executor count, Shell executable path"],
  ["Global Tool Config",   "Java JDK, Maven, Gradle, Git, NodeJS — point Jenkins to each installed tool"],
  ["Plugins",              "Install, update, disable, uninstall plugins — restart required after changes"],
  ["Nodes & Clouds",       "Add Agent nodes, configure labels, executor count, remote root directory"],
  ["Credentials",          "Store SSH keys, username/password, API tokens, secret text — used in jobs securely"],
  ["Security",             "Authentication realm (local users, LDAP), authorisation strategy, CSRF protection"],
  ["System Log",           "Live Jenkins log output — diagnose plugin errors, authentication failures, build issues"],
  ["System Information",   "Full dump of all JVM properties, environment variables, plugin versions"],
  ["Script Console",       "Run Groovy scripts directly on the Jenkins JVM — powerful admin tool"],
  ["Reload Configuration", "Reload config.xml files from disk without a full Jenkins restart"],
];

const globalTools = [
  {
    name: "JDK",
    icon: "☕",
    why: "Jenkins needs to know where Java is installed to compile Java code and run Maven/Gradle builds",
    steps: [
      "Go to Manage Jenkins → Global Tool Configuration",
      "Scroll to JDK section → click Add JDK",
      "Uncheck 'Install automatically' (use your already-installed Java)",
      "Name: Java17   JAVA_HOME: /usr/lib/jvm/java-17-openjdk-amd64",
      "Click Save",
      "Verify: open a job → Build Steps → Execute shell → type: $JAVA_HOME/bin/java -version",
    ],
  },
  {
    name: "Maven",
    icon: "📦",
    why: "Maven is the most common Java build tool — Jenkins needs its path to run mvn commands in jobs",
    steps: [
      "Install Maven first: sudo apt install -y maven",
      "Find path: which mvn  →  usually /usr/share/maven",
      "Manage Jenkins → Global Tool Configuration → Maven → Add Maven",
      "Uncheck 'Install automatically'",
      "Name: Maven3   MAVEN_HOME: /usr/share/maven",
      "Click Save — now Maven is available in all Maven Project jobs",
    ],
  },
  {
    name: "Git",
    icon: "🌿",
    why: "The Git plugin needs the path to the git binary to clone repositories and detect changes",
    steps: [
      "Install Git: sudo apt install -y git",
      "Find path: which git  →  /usr/bin/git",
      "Manage Jenkins → Global Tool Configuration → Git → Add Git",
      "Name: Default   Path to Git executable: /usr/bin/git",
      "Click Save",
      "Test: create a job → Source Code Management → Git → enter any repo URL",
    ],
  },
  {
    name: "NodeJS",
    icon: "🟩",
    why: "Needed for JavaScript/TypeScript projects — install via the NodeJS plugin for automatic version management",
    steps: [
      "First install the NodeJS plugin: Manage Jenkins → Plugins → Available → search NodeJS",
      "After plugin install restart Jenkins",
      "Manage Jenkins → Global Tool Configuration → NodeJS → Add NodeJS",
      "Check 'Install automatically' → choose version (e.g. NodeJS 20.x)",
      "Jenkins will download and install Node automatically on first use",
    ],
  },
];

const jobTypes = [
  ["Freestyle Project",       "GUI-based job — configure everything via web forms. No code file needed. Best for beginners and simple shell/batch tasks."],
  ["Pipeline",                "Jenkinsfile-based job — define your entire build as code. Supports parallel stages, complex logic, and versioning in Git."],
  ["Multibranch Pipeline",    "Automatically creates a Pipeline job for every branch in your repository. Ideal for feature-branch workflows and PRs."],
  ["Maven Project",           "Purpose-built for Java/Maven — automatically parses pom.xml, runs mvn goals, and publishes JUnit test results natively."],
  ["Folder",                  "An organisational container — group related jobs together. Supports folder-level credentials and views."],
  ["GitHub Organisation",     "Scans an entire GitHub organisation or user account and creates Multibranch Pipelines for every repo with a Jenkinsfile."],
];

const gitPluginSteps = [
  {n:"1", t:"Install the Git Plugin",          b:"Manage Jenkins → Plugins → Installed — confirm 'Git plugin' is present. If not: Available tab → search Git → Install without restart."},
  {n:"2", t:"Generate an SSH Key on the server", b:"On your Jenkins server terminal run: ssh-keygen -t ed25519 -C \"jenkins@yourserver\" -f ~/.ssh/jenkins_id_ed25519 — press Enter twice (no passphrase)."},
  {n:"3", t:"Add the public key to GitHub",    b:"Copy the public key: cat ~/.ssh/jenkins_id_ed25519.pub — go to GitHub → Settings → SSH and GPG keys → New SSH key → paste and save."},
  {n:"4", t:"Add the private key to Jenkins Credentials", b:"Manage Jenkins → Credentials → System → Global credentials → Add Credentials. Kind: SSH Username with private key. Username: git. Private key: Enter directly → paste contents of ~/.ssh/jenkins_id_ed25519."},
  {n:"5", t:"Test the SSH connection",         b:"On the Jenkins server run: ssh -T git@github.com — you should see: Hi username! You have successfully authenticated."},
  {n:"6", t:"Use credentials in a job",        b:"Job → Configure → Source Code Management → Git → Repository URL: git@github.com:youruser/yourrepo.git → Credentials: choose the SSH key you just added."},
];

const webhookSteps = [
  {n:"1", t:"Jenkins must be reachable from the internet", b:"GitHub needs to call your Jenkins URL. For local dev use ngrok: ngrok http 8080 — gives you a public URL like https://abc123.ngrok.io"},
  {n:"2", t:"Install GitHub Integration plugin",          b:"Manage Jenkins → Plugins → Available → search 'GitHub Integration' → Install without restart."},
  {n:"3", t:"Enable webhook trigger in the job",          b:"Job → Configure → Build Triggers → check 'GitHub hook trigger for GITScm polling' → Save."},
  {n:"4", t:"Add webhook on GitHub",                      b:"GitHub repo → Settings → Webhooks → Add webhook. Payload URL: http://your-jenkins-url/github-webhook/   Content type: application/json   Event: Just the push event → Add webhook."},
  {n:"5", t:"Test the webhook",                           b:"Make a commit and push to GitHub. GitHub shows a green tick on the webhook delivery. Jenkins starts a build within 2 seconds."},
  {n:"6", t:"Verify in Jenkins",                          b:"The build triggered by the webhook shows 'Started by GitHub push by username' at the top of the Console Output."},
];

const mavenJobSteps = [
  {n:"1",  t:"Create a Maven Java project",         b:"On GitHub, create a new repo. In your terminal: mvn archetype:generate -DgroupId=com.devops -DartifactId=hello-maven -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false"},
  {n:"2",  t:"Push the project to GitHub",          b:"cd hello-maven && git init && git add . && git commit -m 'Initial Maven project' && git remote add origin git@github.com:you/hello-maven.git && git push -u origin main"},
  {n:"3",  t:"Create a Maven Project job in Jenkins", b:"Dashboard → New Item → name: hello-maven-build → choose Maven Project → OK. (If Maven Project is missing, install 'Maven Integration' plugin first.)"},
  {n:"4",  t:"Configure Source Code Management",    b:"Source Code Management → Git → Repository URL: git@github.com:you/hello-maven.git → Credentials: choose your SSH key → Branch: */main"},
  {n:"5",  t:"Configure Maven Build Goals",         b:"Build → Goals and options: clean test package   This runs: clean (remove old outputs) → test (run all unit tests) → package (create the JAR)"},
  {n:"6",  t:"Add Post-Build: Archive Artefacts",   b:"Post-build Actions → Add → Archive the artefacts → Files to archive: target/*.jar   Jenkins will save the built JAR from every successful build."},
  {n:"7",  t:"Add Post-Build: Publish JUnit Results", b:"Post-build Actions → Add → Publish JUnit test result report → Test report XMLs: target/surefire-reports/*.xml   Jenkins will graph your test results over time."},
  {n:"8",  t:"Save and Build Now",                  b:"Click Save → Build Now. Watch the Console Output — you will see mvn clean test package running with full Maven output. Build turns blue on success."},
];

const credentialTypes = [
  ["Username with password",    "Store a username and password pair — used for HTTP Git clones, Docker registry, database connections"],
  ["SSH Username with private key", "Store an SSH private key — used for SSH Git clones, remote server connections via SSH"],
  ["Secret text",               "A single secret string — used for API tokens (GitHub tokens, Slack tokens, AWS keys)"],
  ["Secret file",               "An entire file treated as a secret — used for kubeconfig files, service account JSON keys"],
  ["Certificate",               "A PKCS#12 certificate — used for code signing, SSL mutual authentication"],
];

const workspaceInfo = [
  ["Default location",     "/var/lib/jenkins/workspace/JOB_NAME on Linux — each job gets its own directory"],
  ["What it contains",     "Git-cloned source code, compiled classes, test reports, any file created during the build"],
  ["Workspace per build?", "No — the same workspace is reused across builds. Files persist between runs unless you clean up"],
  ["Clean before build",   "Job → Configure → Build Environment → check 'Delete workspace before build starts' for a fresh slate every time"],
  ["Wipe workspace",       "Job page → left sidebar → 'Wipe Out Workspace' — manually delete everything and start fresh"],
  ["Workspace size",       "Can grow very large over time — use Discard Old Builds and clean options to control disk usage"],
];

const envVarGlobal = [
  ["JAVA_HOME",      "/usr/lib/jvm/java-17-openjdk-amd64",  "Points Maven and other tools to the correct JDK"],
  ["M2_HOME",        "/usr/share/maven",                     "Maven home directory — used by Maven wrapper and scripts"],
  ["DOCKER_HOST",    "tcp://localhost:2375",                  "Points Docker CLI to a Docker daemon for container builds"],
  ["SONAR_HOST_URL", "http://sonarqube:9000",                 "URL of your SonarQube server for code quality scans"],
];

const quizData = [
  { q: "Where in Jenkins do you configure the path to Maven and Java?",
    a: "Manage Jenkins → Global Tool Configuration — this is where you define the name and path of each tool (JDK, Maven, Git, NodeJS) available to all jobs." },
  { q: "What is the difference between a Freestyle job and a Maven Project job?",
    a: "A Freestyle job is generic — you write shell/batch commands manually. A Maven Project job understands Maven natively — it parses pom.xml, runs goals, and automatically publishes JUnit test results and build artefacts." },
  { q: "What type of Jenkins Credential should you use to store a GitHub SSH private key?",
    a: "'SSH Username with private key' — set Username to 'git' and paste the private key content directly. Never use 'Username with password' for SSH key authentication." },
  { q: "What URL does GitHub send webhook payloads to on your Jenkins server?",
    a: "http://your-jenkins-url/github-webhook/ — the trailing slash is required. Jenkins' GitHub Integration plugin listens at exactly this endpoint." },
  { q: "What does 'clean test package' mean as Maven build goals?",
    a: "clean — deletes the target/ directory (removes old compiled files). test — compiles and runs all JUnit tests. package — creates the JAR/WAR artefact. They run in this order." },
  { q: "How do you trigger a build whenever a commit is pushed to GitHub?",
    a: "Two parts: (1) In the job: Build Triggers → check 'GitHub hook trigger for GITScm polling'. (2) On GitHub: repo Settings → Webhooks → Add webhook with your Jenkins URL + /github-webhook/." },
  { q: "What is a Jenkins Folder and why is it useful?",
    a: "A Folder is an organisational container that groups related jobs together. It supports folder-level credentials (so you don't expose secrets to all jobs) and makes large Jenkins installations manageable." },
  { q: "What happens to the workspace between builds by default?",
    a: "The workspace is reused — files from previous builds remain. This speeds up builds (no re-download) but can cause stale file issues. Enable 'Delete workspace before build starts' for a clean environment every time." },
];

const takeaways = [
  ["Global Tool Config",  "Define JDK, Maven, Git paths once — available to all jobs"],
  ["Git Plugin",          "SSH key authentication is the secure way to clone private repos"],
  ["Webhooks",            "Instant build trigger — GitHub calls Jenkins on every push"],
  ["Maven Project",       "Purpose-built job type that parses pom.xml automatically"],
  ["Credentials Store",   "Store secrets once, reference by ID — never hardcode in jobs"],
  ["Workspace",           "Shared build directory — clean it when fresh builds are needed"],
  ["Plugins",             "Extend Jenkins with any tool — 1800+ plugins available"],
  ["Multibranch",         "Auto-creates jobs for every branch — perfect for teams"],
];

export default function Session8() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s8-page {
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
          overflow-x: hidden;
        }

        /* ── Breadcrumb ── */
        .bc { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); margin-bottom: 2rem; }
        .bc a { color: var(--text2); text-decoration: none; transition: color 0.2s; }
        .bc a:hover { color: var(--accent); }
        .bc .sep { color: var(--border2); }
        .bc .cur { color: var(--text); }

        /* ── Prev/Next ── */
        .nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
        .nav-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--text2); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); transition: all 0.2s; white-space: nowrap; }
        .nav-btn:hover { color: var(--text); border-color: var(--border2); }

        /* ── Hero ── */
        .hero { border-radius: 20px; background: linear-gradient(135deg, #0a0a2e 0%, #1a237e 55%, #283593 100%); padding: 2.5rem 2rem; margin-bottom: 2rem; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 22px 22px; }
        .hero-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; position: relative; }
        .h-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-mod   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.8); padding: 0.3rem 0.75rem; border-radius: 100px; }
        .h-dur   { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.35rem; }
        .hero h1 { font-size: clamp(1.5rem,3.5vw,2.2rem); font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1.15; position: relative; margin-bottom: 0.75rem; }
        .hero p  { color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.65; max-width: 620px; position: relative; }

        /* ── Jump nav ── */
        .jump-nav { display: flex; gap: 0.4rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
        .jpill { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; padding: 0.3rem 0.8rem; border-radius: 100px; border: 1px solid var(--border); background: var(--surface2); color: var(--muted); text-decoration: none; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
        .jpill:hover { color: var(--text); border-color: var(--border2); }
        .jpill.active { background: linear-gradient(135deg,#1a237e,#283593); color: #fff; border-color: transparent; }

        /* ── Section title ── */
        .pt { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.025em; color: var(--text); margin: 2.5rem 0 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
        .pt::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .pt-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; background: linear-gradient(135deg,#1a237e,#283593); color: #fff; padding: 0.2rem 0.65rem; border-radius: 100px; flex-shrink: 0; }

        /* ── Objectives ── */
        .obj-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; }
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
        .tip-box { background: rgba(26,35,126,0.07); border-left: 3px solid #1a237e; border-radius: 0 12px 12px 0; padding: 1.1rem 1.25rem; margin: 1.1rem 0; }
        .tip-box h4 { font-size: 0.82rem; font-weight: 700; color: #1a237e; margin-bottom: 0.5rem; }
        .tip-box p { font-size: 0.83rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.4rem; }
        .tip-box ul { list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.3rem; margin: 0.4rem 0; }
        .tip-box li { font-size: 0.82rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.45rem; }
        .tip-box li::before { content: '→'; color: #1a237e; flex-shrink: 0; font-size: 0.75rem; margin-top: 1px; }
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
        .feat-icon { color: #1a237e; font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
        .feat-card strong { font-size: 0.84rem; color: var(--text); display: block; margin-bottom: 0.12rem; }
        .feat-card span { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Workflow numbered steps ── */
        .workflow { display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0; position: relative; }
        .workflow::before { content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 2px; background: var(--border); z-index: 0; }
        .wf-step { display: flex; align-items: flex-start; gap: 0.85rem; padding: 0.9rem 1rem; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); position: relative; z-index: 1; transition: border-color 0.2s; }
        .wf-step:hover { border-color: var(--border2); }
        .wf-num { width: 28px; height: 28px; border-radius: 8px; background: #1a237e; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; flex-shrink: 0; }
        .wf-body { display: flex; flex-direction: column; gap: 0.2rem; width: 100%; }
        .wf-body strong { font-size: 0.88rem; color: var(--text); }
        .wf-body p { font-size: 0.8rem; color: var(--text2); line-height: 1.5; }
        .wf-body code { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--accent); }

        /* ── Tool cards ── */
        .tool-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin: 1.25rem 0; }
        @media(max-width:640px){ .tool-grid { grid-template-columns: 1fr; } }
        .tool-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; }
        .tool-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.65rem; }
        .tool-icon { font-size: 1.2rem; }
        .tool-name { font-size: 0.95rem; font-weight: 800; color: var(--text); }
        .tool-why { font-size: 0.78rem; color: var(--text2); line-height: 1.5; margin-bottom: 0.75rem; padding-bottom: 0.65rem; border-bottom: 1px solid var(--border); }
        .tool-steps { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; }
        .tool-steps li { display: flex; gap: 0.5rem; font-size: 0.77rem; color: var(--text2); line-height: 1.5; }
        .tool-steps li::before { content: '→'; color: #1a237e; flex-shrink: 0; font-size: 0.72rem; margin-top: 1px; }
        .tool-steps li code { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; background: var(--surface2); border: 1px solid var(--border); padding: 0.05rem 0.3rem; border-radius: 4px; color: var(--accent); }

        /* ── Job type table ── */
        .data-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; margin: 1.25rem 0; }
        .data-table thead th { background: var(--surface2); color: var(--text); font-weight: 700; padding: 0.65rem 0.9rem; text-align: left; border-bottom: 2px solid var(--border); font-size: 0.78rem; }
        .data-table tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
        .data-table tbody tr:hover { background: var(--surface); }
        .data-table td { padding: 0.6rem 0.9rem; color: var(--text2); vertical-align: top; line-height: 1.5; }
        .data-table td:first-child { color: var(--text); font-weight: 600; font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; }

        /* ── Credential type cards ── */
        .cred-grid { display: grid; grid-template-columns: 1fr; gap: 0.5rem; margin: 1.25rem 0; }
        .cred-row { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.8rem 1rem; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; }
        .cred-icon { width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg,#1a237e,#283593); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #fff; flex-shrink: 0; }
        .cred-row strong { font-size: 0.83rem; color: var(--text); display: block; margin-bottom: 0.2rem; }
        .cred-row span { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Activity / Lab ── */
        .act-box { background: linear-gradient(135deg,#0a0a2e 0%,#1a237e 100%); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .act-box h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
        .act-box h4 { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.9); margin: 1.1rem 0 0.5rem; }
        .lab-ol { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; padding: 1rem 1rem 1rem 2rem; margin-bottom: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .lab-ol li { font-size: 0.83rem; color: rgba(255,255,255,0.88); line-height: 1.55; }
        .lab-ol li code { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: rgba(255,255,255,0.15); padding: 0.1rem 0.4rem; border-radius: 4px; color: #fff; }
        .lab-ol li strong { color: #fff; }

        /* ── Quiz ── */
        .quiz-box { background: linear-gradient(135deg,rgba(26,35,126,0.08),rgba(40,53,147,0.08)); border: 1px solid rgba(26,35,126,0.2); border-radius: 16px; padding: 1.75rem; margin: 1.5rem 0; }
        .quiz-box h3 { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 1.25rem; }
        .quiz-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .qi { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 0.9rem 1rem; }
        .qi-n { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #1a237e; letter-spacing: 0.08em; margin-bottom: 0.3rem; }
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

        /* ── Takeaways ── */
        .tk-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 0.65rem; margin: 1rem 0; }
        .tk-card { background: var(--surface); border: 1px solid var(--border); border-top: 3px solid #1a237e; border-radius: 12px; padding: 0.9rem 1rem; }
        .tk-card h4 { font-size: 0.82rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem; font-family: 'JetBrains Mono', monospace; }
        .tk-card p  { font-size: 0.78rem; color: var(--text2); line-height: 1.45; }

        /* ── Flow pill ── */
        .flow-pill { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; justify-content: center; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.5rem; margin: 1.25rem 0; }
        .fp { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text); background: var(--surface); border: 1px solid var(--border); padding: 0.45rem 0.9rem; border-radius: 8px; }
        .fp-arrow { color: var(--muted); font-size: 0.9rem; }

        /* ── Rules box ── */
        .rules-box { background: rgba(26,35,126,0.05); border: 1px solid rgba(26,35,126,0.2); border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0; }
        .rules-box h4 { font-size: 0.85rem; font-weight: 700; color: #1a237e; margin-bottom: 0.65rem; }
        .rules-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
        .rules-box li { font-size: 0.83rem; color: var(--text2); line-height: 1.5; display: flex; gap: 0.5rem; }
        .rules-box li::before { content: '✓'; color: #1a237e; flex-shrink: 0; font-weight: 700; }

        /* ── Next card ── */
        .next-card { background: linear-gradient(135deg,#1a3a2a 0%,#27ae60 100%); border-radius: 16px; padding: 1.75rem; margin-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .next-text h4 { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 0.4rem; }
        .next-text h3 { font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
        .next-text ul { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
        .next-text li { font-size: 0.83rem; color: rgba(255,255,255,0.8); display: flex; gap: 0.5rem; }
        .next-text li::before { content: '→'; color: rgba(255,255,255,0.6); flex-shrink: 0; }
        .next-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; font-weight: 700; color: #27ae60; background: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 10px; cursor: pointer; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.5rem; transition: opacity 0.2s, transform 0.2s; }
        .next-btn:hover { opacity: 0.9; transform: translateX(3px); }

        /* ── Env var table ── */
        .env-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; margin: 1rem 0; }
        .env-table thead th { background: var(--surface2); color: var(--text); font-weight: 700; padding: 0.6rem 0.85rem; text-align: left; border-bottom: 2px solid var(--border); font-size: 0.76rem; }
        .env-table td { padding: 0.55rem 0.85rem; border-bottom: 1px solid var(--border); color: var(--text2); line-height: 1.5; vertical-align: top; }
        .env-table td:first-child { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--accent); }
        .env-table td:nth-child(2) { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #56d364; }

        @media(max-width:640px){
          .s8-page { padding: 2rem 1rem 4rem; }
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
          .quiz-box { padding: 1.25rem 1rem; }
          .hw-box { padding: 1.25rem 1rem; }
        }
        @media(max-width:400px){
          .tool-grid { grid-template-columns: 1fr; }
          .hero h1 { font-size: 1.1rem; }
        }
      `}</style>

      <div className="s8-page">

        {/* Breadcrumb */}
        <div className="bc">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link>
          <span className="sep">/</span>
          <span className="cur">Session 8: Configuring Jenkins</span>
        </div>

        {/* Prev / Next */}
        <div className="nav-row">
          <Link href="/courses/dev/session7" className="nav-btn">&larr; Session 7: Intro to Jenkins &amp; CI/CD</Link>
          <Link href="/courses/dev/session9" className="nav-btn">Session 9: Jenkins Pipelines &rarr;</Link>
        </div>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 8 of 15</span>
            <span className="h-mod">Module 3 &mdash; Continuous Integration</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4 hrs
            </span>
          </div>
          <h1>&#9881; Configuring Jenkins</h1>
          <p>Master Jenkins configuration from the ground up &mdash; tools, plugins, credentials, Git integration, webhooks, and building a real Maven project end-to-end.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","Manage Jenkins","System Config","Global Tools","Plugins","Job Types","Git Plugin","Webhooks","Maven Build","Credentials","Workspace","Lab","Quiz","Homework"].map((l, i) => (
            <a key={i} href={`#s8p${i}`} className={`jpill${i === 0 ? " active" : ""}`}>{l}</a>
          ))}
        </div>

        {/* ── OBJECTIVES ── */}
        <div id="s8p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o, i) => (
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* ── MANAGE JENKINS ── */}
        <div id="s8p1">
          <div className="pt"><span className="pt-badge">Control Panel</span>Manage Jenkins &mdash; Your Configuration Hub</div>
          <p className="body-text">
            <strong>Manage Jenkins</strong> is the central administration page. Everything that affects all jobs globally &mdash; tools, plugins, security, nodes &mdash; lives here. You reach it from the left sidebar of the main dashboard.
          </p>

          <div className="ex-box">
            <div className="ex-label">&#128270; How to Access</div>
            <p>From the Jenkins dashboard left sidebar &rarr; click <strong>Manage Jenkins</strong>. The page shows a grid of configuration panels. Each panel controls a different aspect of your Jenkins instance.</p>
          </div>

          <div className="feat-grid">
            {manageJenkinsSections.map(([section, desc]) => (
              <div key={section} className="feat-card">
                <span className="feat-icon">&#9881;</span>
                <div><strong>{section}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <h4>&#128161; Orange Warning Badges</h4>
            <ul>
              <li>When Manage Jenkins shows an orange number badge, Jenkins is telling you something needs attention</li>
              <li><strong>Plugin updates available</strong> &mdash; new versions of installed plugins are ready to install</li>
              <li><strong>Security issues</strong> &mdash; a configuration is less secure than recommended</li>
              <li><strong>Java version warning</strong> &mdash; your JVM is outdated or approaching end-of-life</li>
            </ul>
          </div>
        </div>

        {/* ── SYSTEM CONFIG ── */}
        <div id="s8p2">
          <div className="pt"><span className="pt-badge">System</span>Jenkins System Configuration</div>
          <p className="body-text">
            <strong>Manage Jenkins &rarr; System</strong> contains instance-wide settings that apply to every job. Getting these right first prevents problems later.
          </p>

          <div className="workflow">
            {[
              {n:"1", t:"Set Jenkins URL",             b:"System → Jenkins URL: enter the public URL of your Jenkins (e.g. http://192.168.1.10:8080/). This URL is used in email notifications and webhook callback links. A wrong URL here causes webhook failures."},
              {n:"2", t:"Set Admin Email Address",      b:"System → System Admin e-mail address: enter jenkins@yourdomain.com. This is the From address in all build notification emails."},
              {n:"3", t:"Set Executor Count on Master", b:"System → # of executors: for a standalone setup use 2. For a Master-only setup with no Agents, this is how many jobs can run simultaneously. Reduce to 0 if Agents handle all builds."},
              {n:"4", t:"Set Shell Executable",         b:"System → Shell: /bin/bash — ensures all Execute shell build steps run with bash (not sh). This gives you bash syntax: arrays, [[ ]], $( ), etc."},
              {n:"5", t:"Add Global Environment Variables", b:"System → Global properties → check 'Environment variables' → Add. These key=value pairs are available as environment variables in every job automatically."},
              {n:"6", t:"Configure Email Notifications", b:"System → E-mail Notification → SMTP server: smtp.gmail.com  Port: 587  Use TLS: checked. Enter your email credentials. Click Test configuration to verify."},
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="sub-h">Global Environment Variables Example</div>
          <table className="env-table">
            <thead><tr><th>Variable Name</th><th>Example Value</th><th>Purpose</th></tr></thead>
            <tbody>
              {envVarGlobal.map(([name, val, desc]) => (
                <tr key={name}><td>{name}</td><td>{val}</td><td>{desc}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="warn-box">
            <h4>&#9888; Never Store Secrets as Environment Variables Here</h4>
            <ul>
              <li>Environment variables set in System Configuration are <strong>visible to all users</strong> who can read job console logs</li>
              <li>For passwords, API tokens, and SSH keys — always use the <strong>Credentials Store</strong> instead</li>
              <li>Credentials are masked in console output automatically; plain environment variables are not</li>
            </ul>
          </div>
        </div>

        {/* ── GLOBAL TOOLS ── */}
        <div id="s8p3">
          <div className="pt"><span className="pt-badge">Tools</span>Global Tool Configuration</div>
          <p className="body-text">
            <strong>Manage Jenkins &rarr; Global Tool Configuration</strong> is where you tell Jenkins <em>where</em> each development tool is installed on your server. You set up a tool once here, give it a name, and then reference that name in every job that needs it.
          </p>

          <div className="ex-box">
            <div className="ex-label">&#128161; Why This Matters</div>
            <p>Without Global Tool Configuration, every job would need its own hard-coded paths like <code>/usr/lib/jvm/java-17-openjdk-amd64/bin/java</code>. With it, you write the path once, name it <strong>Java17</strong>, and every job uses that name. When you upgrade Java, you change the path in one place and all jobs update instantly.</p>
          </div>

          <div className="tool-grid">
            {globalTools.map((tool) => (
              <div key={tool.name} className="tool-card">
                <div className="tool-header">
                  <span className="tool-icon">{tool.icon}</span>
                  <span className="tool-name">{tool.name}</span>
                </div>
                <p className="tool-why">{tool.why}</p>
                <ul className="tool-steps">
                  {tool.steps.map((step, i) => (
                    <li key={i}>{step.includes(":") && step.split(":")[0].length < 30
                      ? <>{step.split(":")[0]}: <code>{step.split(":").slice(1).join(":").trim()}</code></>
                      : step
                    }</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="sub-h">Verify Your Tools Are Configured Correctly</div>
          <div className="cb">
<span className="c-cm"># Create a quick Freestyle job to verify all tools</span>{"\n"}
<span className="c-cm"># Add these as Execute shell build steps:</span>{"\n\n"}
<span className="c-cm"># Test Java</span>{"\n"}
echo "Java location: $JAVA_HOME"{"\n"}
$JAVA_HOME/bin/java -version{"\n\n"}
<span className="c-cm"># Test Maven</span>{"\n"}
echo "Maven location: $M2_HOME"{"\n"}
mvn -version{"\n\n"}
<span className="c-cm"># Test Git</span>{"\n"}
git --version{"\n\n"}
<span className="c-ok"># Expected output:</span>{"\n"}
<span className="c-ok">openjdk version "17.0.10" ...</span>{"\n"}
<span className="c-ok">Apache Maven 3.9.x ...</span>{"\n"}
<span className="c-ok">git version 2.x.x</span>
          </div>
        </div>

        {/* ── PLUGINS ── */}
        <div id="s8p4">
          <div className="pt"><span className="pt-badge">Plugins</span>Managing Jenkins Plugins</div>
          <p className="body-text">
            Plugins are what make Jenkins powerful. There are over <strong>1,800 plugins</strong> that add support for every tool imaginable. Managing them safely is an essential Jenkins admin skill.
          </p>

          <div className="workflow">
            {[
              {n:"1", t:"Open Plugin Manager",          b:"Manage Jenkins → Plugins. You see four tabs: Updates (plugins with newer versions), Available (plugins you can install), Installed (what is currently installed), Advanced (upload plugin .hpi files manually)."},
              {n:"2", t:"Install a new plugin",         b:"Click the Available tab → use the search box to find the plugin by name (e.g. 'Maven Integration') → check the checkbox → click 'Install without restart'. The plugin downloads and installs. Most plugins are active immediately."},
              {n:"3", t:"When to restart after installing", b:"Some plugins require a restart. Jenkins shows a message: 'Restart Jenkins when installation is complete and no jobs are running' — check that box. Jenkins will restart safely once all running builds finish."},
              {n:"4", t:"Update installed plugins",     b:"Updates tab → check 'Select All' → click 'Download now and install after restart'. Always update plugins during a maintenance window — plugin updates sometimes introduce behaviour changes."},
              {n:"5", t:"Disable vs Uninstall",         b:"Disabling a plugin keeps it installed but inactive — safe to re-enable later. Uninstalling removes it permanently. Always disable first, verify nothing breaks, then uninstall."},
              {n:"6", t:"Diagnose a broken plugin",     b:"If Jenkins fails to start after a plugin change: access the Plugin Manager via the safe mode URL: http://localhost:8080/pluginManager — or check logs at /var/log/jenkins/jenkins.log for the error."},
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="sub-h">Essential Plugins to Install Now</div>
          <div className="feat-grid">
            {[
              ["Git Plugin",              "Clone repos, detect commits, poll SCM — absolute must-have"],
              ["Maven Integration",       "Adds Maven Project job type with automatic pom.xml parsing"],
              ["GitHub Integration",      "Webhook receiver, commit status updates back to GitHub"],
              ["Pipeline",                "Jenkinsfile-based declarative and scripted pipeline jobs"],
              ["Blue Ocean",              "Modern visual pipeline UI — much easier to read than classic UI"],
              ["Credentials Binding",     "Inject stored credentials (tokens, passwords) into build environments"],
              ["NodeJS Plugin",           "Manage NodeJS versions and run npm/yarn in build steps"],
              ["Slack Notification",      "Send build pass/fail notifications to a Slack channel"],
              ["JUnit Plugin",            "Parse test result XML and display pass/fail graphs over time"],
              ["Email Extension (ExtEmail)", "Rich HTML email notifications with build status, logs, test results"],
            ].map(([name, desc]) => (
              <div key={name} className="feat-card">
                <span className="feat-icon">&#128279;</span>
                <div><strong>{name}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <h4>&#128161; Plugin Safety Best Practices</h4>
            <ul>
              <li>Always <strong>read the plugin changelog</strong> before updating — major version bumps often have breaking changes</li>
              <li>Take a <strong>Jenkins home backup</strong> before mass plugin updates: <code>cp -r /var/lib/jenkins ~/jenkins-backup-$(date +%Y%m%d)</code></li>
              <li>Test plugin updates on a <strong>non-production Jenkins</strong> instance first if possible</li>
              <li>Use the <strong>Plugin Compatibility Tester</strong> at plugins.jenkins.io to check compatibility with your Jenkins version</li>
            </ul>
          </div>
        </div>

        {/* ── JOB TYPES ── */}
        <div id="s8p5">
          <div className="pt"><span className="pt-badge">Jobs</span>All Jenkins Job Types Explained</div>
          <p className="body-text">
            When you click <strong>New Item</strong> on the Jenkins dashboard, you see several job types. Understanding which to use and when is one of the most important Jenkins skills.
          </p>

          <table className="data-table">
            <thead>
              <tr><th>Job Type</th><th>Description &amp; Best Use Case</th></tr>
            </thead>
            <tbody>
              {jobTypes.map(([type, desc]) => (
                <tr key={type}><td>{type}</td><td>{desc}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">When to Use Which Job Type</div>
          <div className="feat-grid">
            {[
              ["Just learning Jenkins",        "→ Freestyle Project — no code, all GUI, perfect for understanding concepts"],
              ["Building a Java/Maven project", "→ Maven Project — automatic test reporting, artefact archiving built-in"],
              ["Complex multi-stage build",     "→ Pipeline — stages, parallel execution, Jenkinsfile in Git"],
              ["Feature branch workflow",       "→ Multibranch Pipeline — auto-creates jobs for every branch, ideal for PRs"],
              ["Organising many jobs",          "→ Folder — group by team, project, or environment"],
              ["Entire GitHub org",             "→ GitHub Organisation — scans all repos, creates jobs for all Jenkinsfiles"],
            ].map(([when, use]) => (
              <div key={when} className="feat-card">
                <span className="feat-icon">&#9654;</span>
                <div><strong>{when}</strong><span>{use}</span></div>
              </div>
            ))}
          </div>

          <div className="ex-box">
            <div className="ex-label">&#127919; Real Team Example</div>
            <p><strong>Small startup (3 devs):</strong> One Pipeline job per service, triggered by webhook. Simple, fast to set up.</p>
            <p><strong>Mid-size team (20 devs, feature branches):</strong> Multibranch Pipeline — every branch gets its own job automatically. PRs are validated before merge.</p>
            <p><strong>Enterprise (100+ devs, many teams):</strong> GitHub Organisation job scans the entire org. Folders per team. Shared Pipeline libraries for common steps.</p>
          </div>
        </div>

        {/* ── GIT PLUGIN ── */}
        <div id="s8p6">
          <div className="pt"><span className="pt-badge">Source Control</span>Connecting Jenkins to GitHub with the Git Plugin</div>
          <p className="body-text">
            The <strong>Git plugin</strong> allows Jenkins to clone your repository, detect new commits via polling or webhooks, and check out the correct branch for each build. Using <strong>SSH key authentication</strong> is the secure standard &mdash; never store GitHub passwords in Jenkins.
          </p>

          <div className="workflow">
            {gitPluginSteps.map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="sub-h">SSH Key Generation Commands</div>
          <div className="cb">
<span className="c-cm"># Generate a new Ed25519 SSH key (modern, secure, compact)</span>{"\n"}
ssh-keygen -t ed25519 -C "jenkins@myserver" -f ~/.ssh/jenkins_id_ed25519{"\n"}
<span className="c-out">Generating public/private ed25519 key pair.</span>{"\n"}
<span className="c-out">Enter passphrase (empty for no passphrase):</span>  <span className="c-cm">← press Enter (no passphrase for Jenkins)</span>{"\n"}
<span className="c-out">Enter same passphrase again:</span>  <span className="c-cm">← press Enter again</span>{"\n"}
<span className="c-ok">Your identification has been saved in /home/jenkins/.ssh/jenkins_id_ed25519</span>{"\n"}
<span className="c-ok">Your public key has been saved in /home/jenkins/.ssh/jenkins_id_ed25519.pub</span>{"\n\n"}
<span className="c-cm"># Copy public key to paste into GitHub</span>{"\n"}
cat ~/.ssh/jenkins_id_ed25519.pub{"\n"}
<span className="c-out">ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... jenkins@myserver</span>{"\n\n"}
<span className="c-cm"># Test the connection after adding public key to GitHub</span>{"\n"}
ssh -T git@github.com{"\n"}
<span className="c-ok">Hi yourusername! You have successfully authenticated, but GitHub does not provide shell access.</span>
          </div>

          <div className="sub-h">Configuring Git in a Job</div>
          <div className="cb">
<span className="c-cm"># Job → Configure → Source Code Management → Git</span>{"\n\n"}
Repository URL:    git@github.com:yourusername/your-repo.git{"\n"}
Credentials:       jenkins-ssh-key  <span className="c-cm">← the credential ID you created</span>{"\n"}
Branch Specifier:  */main           <span className="c-cm">← build the main branch</span>{"\n\n"}
<span className="c-cm"># Multiple branches? Use:</span>{"\n"}
Branch Specifier:  **               <span className="c-cm">← build ALL branches (use with Multibranch)</span>{"\n"}
Branch Specifier:  */release/*      <span className="c-cm">← build only release/* branches</span>
          </div>

          <div className="warn-box">
            <h4>&#9888; Common Git Plugin Errors and Fixes</h4>
            <ul>
              <li><strong>Host key verification failed</strong> &mdash; run <code>ssh -T git@github.com</code> once as the jenkins user to add GitHub to known_hosts</li>
              <li><strong>Permission denied (publickey)</strong> &mdash; the public key was not added to GitHub, or you selected the wrong Jenkins credential</li>
              <li><strong>Repository not found</strong> &mdash; check the SSH URL format. It must be <code>git@github.com:USER/REPO.git</code> not the HTTPS URL</li>
              <li><strong>Credentials shown in red</strong> &mdash; the credential ID in the job does not exist in the Credentials store — re-create the credential</li>
            </ul>
          </div>
        </div>

        {/* ── WEBHOOKS ── */}
        <div id="s8p7">
          <div className="pt"><span className="pt-badge">Automation</span>GitHub Webhook Configuration</div>
          <p className="body-text">
            A <strong>webhook</strong> is an HTTP POST request that GitHub sends to your Jenkins server the instant a commit is pushed. This is far better than Poll SCM &mdash; builds start within <strong>2 seconds</strong> of a push instead of waiting up to 5 minutes for the next poll.
          </p>

          <div className="ex-box">
            <div className="ex-label">&#127916; How Webhooks Work</div>
            <p><strong>Without webhook (Poll SCM every 5 min):</strong> Developer pushes at 10:00:01. Jenkins checks at 10:05:00. Build starts 4 minutes 59 seconds later. Multiply by 20 developers and you have enormous wasted time.</p>
            <p><strong>With webhook:</strong> Developer pushes at 10:00:01. GitHub sends POST to Jenkins at 10:00:01. Jenkins starts build at 10:00:02. Feedback arrives in 3 minutes total.</p>
          </div>

          <div className="workflow">
            {webhookSteps.map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="sub-h">Webhook Payload URL Format</div>
          <div className="cb">
<span className="c-cm"># The webhook URL Jenkins listens on — note the trailing slash!</span>{"\n"}
http://YOUR-JENKINS-IP:8080/github-webhook/{"\n\n"}
<span className="c-cm"># Examples:</span>{"\n"}
http://192.168.1.10:8080/github-webhook/{"\n"}
https://jenkins.mycompany.com/github-webhook/{"\n"}
https://abc123.ngrok.io/github-webhook/  <span className="c-cm">← for local dev via ngrok</span>{"\n\n"}
<span className="c-cm"># ngrok setup for local development testing:</span>{"\n"}
<span className="c-cm"># Install ngrok: snap install ngrok</span>{"\n"}
<span className="c-cm"># Sign up at ngrok.com and get your auth token</span>{"\n"}
ngrok config add-authtoken YOUR_TOKEN{"\n"}
ngrok http 8080{"\n"}
<span className="c-ok">Forwarding  https://abc123.ngrok.io → http://localhost:8080</span>
          </div>

          <div className="tip-box">
            <h4>&#128161; Verify a Webhook Delivery</h4>
            <ul>
              <li>GitHub repo &rarr; Settings &rarr; Webhooks &rarr; click your webhook &rarr; scroll to <strong>Recent Deliveries</strong></li>
              <li>A green tick means GitHub sent the payload and got a <code>200 OK</code> response from Jenkins</li>
              <li>A red X means either Jenkins was unreachable or returned an error — check the Response tab for details</li>
              <li>You can click <strong>Redeliver</strong> to resend the last payload without making a new commit — very useful for debugging</li>
            </ul>
          </div>
        </div>

        {/* ── MAVEN BUILD ── */}
        <div id="s8p8">
          <div className="pt"><span className="pt-badge">Hands-on</span>Building a Real Maven Project End-to-End</div>
          <p className="body-text">
            This is the full end-to-end walkthrough: create a Maven Java project, push it to GitHub, connect Jenkins, build it, run tests, and archive the JAR artefact. Every step is detailed.
          </p>

          <div className="workflow">
            {mavenJobSteps.map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="sub-h">What the Console Output Looks Like</div>
          <div className="cb">
<span className="c-cm">[INFO] Scanning for projects...</span>{"\n"}
<span className="c-cm">[INFO] -------------------------------------------------------</span>{"\n"}
<span className="c-cm">[INFO]  T E S T S</span>{"\n"}
<span className="c-cm">[INFO] -------------------------------------------------------</span>{"\n"}
<span className="c-ok">[INFO] Running com.devops.AppTest</span>{"\n"}
<span className="c-ok">[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0</span>{"\n"}
<span className="c-cm">[INFO] -------------------------------------------------------</span>{"\n"}
<span className="c-ok">[INFO] BUILD SUCCESS</span>{"\n"}
<span className="c-cm">[INFO] -------------------------------------------------------</span>{"\n"}
<span className="c-out">[INFO] Total time:  4.523 s</span>{"\n"}
<span className="c-out">[INFO] Finished at: 2025-01-15T10:32:44Z</span>{"\n\n"}
<span className="c-ok">Archiving artifacts</span>{"\n"}
<span className="c-ok">Recording test results</span>{"\n"}
<span className="c-ok">Finished: SUCCESS</span>
          </div>

          <div className="sub-h">Understanding Maven Lifecycle Goals</div>
          <div className="feat-grid">
            {[
              ["mvn clean",             "Delete the target/ directory — removes all compiled files from previous builds"],
              ["mvn compile",           "Compile all .java source files into .class bytecode files in target/classes/"],
              ["mvn test",              "Run all JUnit tests in src/test/java/ — build FAILS if any test fails"],
              ["mvn package",           "Create the JAR or WAR artefact in target/ — runs compile + test first"],
              ["mvn install",           "Run package then copy the JAR to your local ~/.m2/repository cache"],
              ["mvn clean test package","The most common Jenkins goal — clean start, test, then package"],
            ].map(([goal, desc]) => (
              <div key={goal} className="feat-card">
                <span className="feat-icon">&#128230;</span>
                <div><strong>{goal}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="tip-box">
            <h4>&#128161; Maven Build Failure Checklist</h4>
            <ul>
              <li><strong>JAVA_HOME not set</strong> &mdash; Maven cannot find Java &mdash; check Global Tool Configuration → JDK path</li>
              <li><strong>No compiler found</strong> &mdash; you installed JRE not JDK &mdash; reinstall with <code>sudo apt install -y openjdk-17-jdk</code></li>
              <li><strong>Tests failing</strong> &mdash; check Console Output → scroll up to find the test class and assertion that failed</li>
              <li><strong>pom.xml not found</strong> &mdash; check that the root of the Git repo actually contains pom.xml — it is case-sensitive</li>
              <li><strong>Could not resolve dependency</strong> &mdash; Maven cannot download a library — check internet access from the Jenkins server</li>
            </ul>
          </div>
        </div>

        {/* ── CREDENTIALS ── */}
        <div id="s8p9">
          <div className="pt"><span className="pt-badge">Security</span>Jenkins Credentials Store</div>
          <p className="body-text">
            The <strong>Credentials Store</strong> is Jenkins&apos; secure vault. Store your secrets here once &mdash; SSH keys, passwords, API tokens &mdash; and reference them by ID in any job. Credentials are <strong>never shown in plain text</strong> in console logs.
          </p>

          <div className="sub-h">Credential Types</div>
          <div className="cred-grid">
            {credentialTypes.map(([type, desc]) => (
              <div key={type} className="cred-row">
                <div className="cred-icon">&#128274;</div>
                <div><strong>{type}</strong><span>{desc}</span></div>
              </div>
            ))}
          </div>

          <div className="sub-h">Adding a Credential Step by Step</div>
          <div className="workflow">
            {[
              {n:"1", t:"Open the Credentials Store",    b:"Manage Jenkins → Credentials → System → Global credentials (unrestricted). This scope makes the credential available to all jobs. For folder-scoped credentials, create them inside a Folder instead."},
              {n:"2", t:"Click Add Credentials",         b:"Click the 'Add Credentials' button in the top left of the credentials list."},
              {n:"3", t:"Choose the credential Kind",    b:"Select the correct type from the dropdown: Username with password, SSH Username with private key, Secret text, etc. The form changes based on your choice."},
              {n:"4", t:"Fill in the credential details", b:"For SSH: Username = git. Private key = Enter directly → paste your private key (the contents of ~/.ssh/jenkins_id_ed25519, including -----BEGIN and -----END lines)."},
              {n:"5", t:"Set the ID and Description",    b:"ID: github-ssh-key (this is what you reference in jobs — make it descriptive). Description: 'GitHub SSH key for jenkins user'. Click Create."},
              {n:"6", t:"Use the credential in a job",   b:"Job → Configure → Source Code Management → Git → Credentials dropdown → select your credential by its description. The dropdown shows all credentials that match the context (SSH for SSH URLs, username/password for HTTPS)."},
            ].map((s) => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>

          <div className="warn-box">
            <h4>&#9888; Credential Security Rules</h4>
            <ul>
              <li><strong>Never echo a credential</strong> in an Execute shell step &mdash; even though Jenkins masks it in output, it is bad practice</li>
              <li><strong>Use Credentials Binding plugin</strong> to inject credentials as environment variables: Build Environment → Use secret text(s) or file(s)</li>
              <li><strong>Limit credential scope</strong> &mdash; use Folder-scoped credentials so only jobs inside that folder can access them</li>
              <li><strong>Rotate credentials regularly</strong> &mdash; update the Jenkins credential when you rotate your GitHub token or SSH key</li>
            </ul>
          </div>
        </div>

        {/* ── WORKSPACE ── */}
        <div id="s8p10">
          <div className="pt"><span className="pt-badge">Build Env</span>Workspace Management</div>
          <p className="body-text">
            Every Jenkins job runs inside a <strong>workspace</strong> &mdash; a directory on the build Agent (or Master) where source code is checked out and build commands execute. Understanding workspaces prevents mysterious build failures caused by stale files.
          </p>

          <table className="data-table">
            <thead><tr><th>Topic</th><th>Details</th></tr></thead>
            <tbody>
              {workspaceInfo.map(([topic, detail]) => (
                <tr key={topic}><td>{topic}</td><td>{detail}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Workspace Commands You Need to Know</div>
          <div className="cb">
<span className="c-cm"># Find all Jenkins workspaces on Linux</span>{"\n"}
ls /var/lib/jenkins/workspace/{"\n"}
<span className="c-out">hello-world-job/   hello-maven-build/   ci-pipeline-sim/</span>{"\n\n"}
<span className="c-cm"># Check workspace size of a specific job</span>{"\n"}
du -sh /var/lib/jenkins/workspace/hello-maven-build/{"\n"}
<span className="c-out">84M     /var/lib/jenkins/workspace/hello-maven-build/</span>{"\n\n"}
<span className="c-cm"># Clean Maven target directory manually (also done by mvn clean)</span>{"\n"}
rm -rf /var/lib/jenkins/workspace/hello-maven-build/target/{"\n\n"}
<span className="c-cm"># See total disk usage of all workspaces</span>{"\n"}
du -sh /var/lib/jenkins/workspace/*{"\n\n"}
<span className="c-cm"># In a job's Execute shell step — clean before build:</span>{"\n"}
mvn clean{"\n"}
<span className="c-cm"># Or use the checkbox: Configure → Build Environment → Delete workspace before build starts</span>
          </div>

          <div className="tip-box">
            <h4>&#128161; Workspace Best Practices</h4>
            <ul>
              <li>Enable <strong>Discard Old Builds</strong> on every job (max 10-30 builds) to prevent unlimited log accumulation</li>
              <li>Use <strong>mvn clean</strong> or <strong>gradle clean</strong> as the first goal to remove stale compiled files</li>
              <li>Archive important artefacts (JARs, reports) using Post-build Actions — they survive workspace wipes</li>
              <li>Monitor disk usage monthly &mdash; large teams can fill a disk with workspace data in weeks</li>
            </ul>
          </div>
        </div>

        {/* ── LAB ── */}
        <div id="s8p11">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 &mdash; Configure System and Global Tools</h4>
            <ol className="lab-ol">
              <li>Go to <strong>Manage Jenkins &rarr; System</strong></li>
              <li>Set Jenkins URL to <code>http://localhost:8080/</code></li>
              <li>Set System Admin email to <code>admin@devops-lab.local</code></li>
              <li>Set <strong># of executors</strong> to <code>2</code></li>
              <li>Add a Global Environment Variable: Name = <code>APP_ENV</code>, Value = <code>development</code></li>
              <li>Click <strong>Save</strong></li>
              <li>Go to <strong>Manage Jenkins &rarr; Global Tool Configuration</strong></li>
              <li>Configure JDK: name <code>Java17</code>, JAVA_HOME <code>/usr/lib/jvm/java-17-openjdk-amd64</code></li>
              <li>Configure Maven: name <code>Maven3</code>, MAVEN_HOME <code>/usr/share/maven</code></li>
              <li>Create a Freestyle job that prints <code>$JAVA_HOME</code>, <code>$APP_ENV</code>, and runs <code>mvn -version</code> &mdash; verify all values appear correctly</li>
            </ol>

            <h4>Lab 2 &mdash; Install Plugins</h4>
            <ol className="lab-ol">
              <li>Go to <strong>Manage Jenkins &rarr; Plugins &rarr; Available</strong></li>
              <li>Install <strong>Maven Integration</strong> plugin &mdash; restart when prompted</li>
              <li>Install <strong>GitHub Integration</strong> plugin &mdash; restart when prompted</li>
              <li>Verify both appear on the Installed tab after restart</li>
              <li>Check <strong>Manage Jenkins &rarr; Plugins &rarr; Updates</strong> &mdash; list any plugins that have updates available</li>
            </ol>

            <h4>Lab 3 &mdash; Connect to GitHub with SSH</h4>
            <ol className="lab-ol">
              <li>Generate an SSH key: <code>ssh-keygen -t ed25519 -C "jenkins-lab" -f ~/.ssh/lab_key</code></li>
              <li>Add the public key (<code>cat ~/.ssh/lab_key.pub</code>) to your GitHub account under Settings &rarr; SSH Keys</li>
              <li>Test connection: <code>ssh -T git@github.com</code></li>
              <li>Add the private key to Jenkins Credentials as <strong>SSH Username with private key</strong></li>
              <li>Create a Freestyle job that clones your GitHub repo using the SSH credential</li>
              <li>Build the job and verify the Console Output shows the repo being cloned successfully</li>
            </ol>

            <h4>Lab 4 &mdash; Full Maven Build with GitHub</h4>
            <ol className="lab-ol">
              <li>Create a Maven project on your machine: <code>mvn archetype:generate -DgroupId=com.devops -DartifactId=jenkins-lab -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false</code></li>
              <li>Push it to a new GitHub repository</li>
              <li>In Jenkins: <strong>New Item &rarr; Maven Project</strong> &rarr; name: <code>jenkins-lab-build</code></li>
              <li>Set SCM to your GitHub repo with SSH credential</li>
              <li>Goals: <code>clean test package</code></li>
              <li>Post-build: <strong>Archive artefacts</strong> &rarr; <code>target/*.jar</code></li>
              <li>Post-build: <strong>Publish JUnit results</strong> &rarr; <code>target/surefire-reports/*.xml</code></li>
              <li>Build Now &mdash; verify: green build, archived JAR appears, test results graph starts</li>
            </ol>

            <h4>Challenge &mdash; Configure a Webhook</h4>
            <ol className="lab-ol">
              <li>Install <strong>ngrok</strong> and run <code>ngrok http 8080</code> to get a public URL</li>
              <li>In your Jenkins job: Build Triggers &rarr; check <strong>GitHub hook trigger for GITScm polling</strong></li>
              <li>On GitHub: repo &rarr; Settings &rarr; Webhooks &rarr; Add webhook with your ngrok URL + <code>/github-webhook/</code></li>
              <li>Make a small code change, commit, and push to GitHub</li>
              <li>Watch Jenkins start a build automatically within 2 seconds</li>
              <li>Verify the Console Output says <strong>Started by GitHub push</strong></li>
            </ol>
          </div>
        </div>

        {/* ── QUIZ ── */}
        <div id="s8p12" className="quiz-box">
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
        <div id="s8p13" className="hw-box">
          <h3>&#128221; Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Complete the Maven Build Pipeline:</h4>
            <ul>
              <li>Create a Maven project with at least <strong>3 unit tests</strong> in AppTest.java (add assertions that actually test logic)</li>
              <li>Push to GitHub and configure a Jenkins Maven Project job with full SCM integration</li>
              <li>Deliberately break one test — observe the build turn yellow (UNSTABLE), fix it, watch it go green</li>
              <li>Document the full Console Output from both a failing and a passing build</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Plugin Research:</h4>
            <ul>
              <li>Install the <strong>Blue Ocean</strong> plugin and open the Blue Ocean UI (Dashboard &rarr; Open Blue Ocean)</li>
              <li>Run your Maven build from Blue Ocean and screenshot the pipeline visualisation</li>
              <li>Write a comparison: what does Blue Ocean show that the classic UI does not?</li>
              <li>Research and document 3 other plugins you would add to a real team Jenkins setup and why</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Credentials and Security:</h4>
            <ul>
              <li>Create three different credential types in Jenkins: SSH key, secret text (use a dummy GitHub token), and username/password</li>
              <li>Write a Freestyle job shell script that uses <code>withCredentials</code> binding to inject the secret text into a build variable</li>
              <li>Explain in writing: why can a Jenkins admin always extract any stored credential, and what does this mean for your security model?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Webhook vs Poll SCM Experiment:</h4>
            <ul>
              <li>Configure your Maven job to use <strong>Poll SCM</strong> with schedule <code>H/2 * * * *</code> (every 2 min)</li>
              <li>Make a commit and measure how long before Jenkins starts the build</li>
              <li>Switch to a webhook (use ngrok), make another commit, measure the delay</li>
              <li>Document the difference in seconds and explain the business impact of faster feedback</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>5. Prepare for Session 9:</h4>
            <ul>
              <li>Read about Jenkins Declarative Pipeline syntax at <code>jenkins.io/doc/book/pipeline/syntax/</code></li>
              <li>Create an empty file called <code>Jenkinsfile</code> in the root of your Maven repo and push it</li>
              <li>Think about: what stages would a complete CI/CD pipeline for your Maven project need?</li>
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
          <span className="fp">GitHub Push</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Webhook</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Jenkins Job</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">mvn clean test</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">Package JAR</span>
          <span className="fp-arrow">&rarr;</span>
          <span className="fp">&#9989; Archive</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; Jenkins Configuration Golden Rules</h4>
          <ul>
            <li>Always use SSH keys for GitHub authentication &mdash; never username and password</li>
            <li>Store all secrets in the Credentials Store &mdash; never hardcode in job shell scripts</li>
            <li>Use webhooks over Poll SCM for real-time builds &mdash; polling wastes resources</li>
            <li>Configure Global Tool once, reference by name in all jobs &mdash; change in one place, updates everywhere</li>
            <li>Set Discard Old Builds on every job &mdash; unbounded build history fills disks silently</li>
            <li>Backup /var/lib/jenkins before any major plugin update or Jenkins version upgrade</li>
          </ul>
        </div>

        {/* ── NEXT SESSION ── */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next &middot; Module 3 &middot; Session 9</h4>
            <h3>Jenkins Pipelines &amp; Jenkinsfile</h3>
            <ul>
              <li>Declarative Pipeline syntax from scratch</li>
              <li>Stages, steps, post conditions, and agents</li>
              <li>Pipeline as Code &mdash; Jenkinsfile in Git</li>
              <li>Parallel stages and multi-environment builds</li>
              <li>Shared Pipeline Libraries for team reuse</li>
            </ul>
          </div>
          <Link href="/courses/dev/session9" className="next-btn">Session 9 &rarr;</Link>
        </div>

      </div>
    </>
  );
}