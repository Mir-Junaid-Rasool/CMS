// app/courses/dev/session12/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Understand Maven's three built-in lifecycles: default, clean, and site",
  "Recite all phases of the default lifecycle in order and know what each one does",
  "Run specific lifecycle phases from the command line and understand what gets executed",
  "Explain how Maven's Local Repository (.m2) works and where it lives on disk",
  "Understand how Maven resolves dependencies — local cache first, then remote",
  "Describe Maven Central and how artifacts are published and consumed from it",
  "Configure a corporate repository mirror (Nexus / Artifactory) in settings.xml",
  "Create a parent POM and a multi-module Maven project",
  "Use dependencyManagement to centralise version declarations across modules",
  "Combine everything into a complete multi-module Maven project built with a single command",
];

const threeLifecycles = [
  {
    name: "default",
    color: "#e67e22",
    desc: "The main lifecycle — builds and deploys the project. Contains 23 phases from validate to deploy. This is what you use every day.",
    cmd: "mvn package / mvn install / mvn deploy",
  },
  {
    name: "clean",
    color: "#3498db",
    desc: "Deletes all generated output (the target/ directory) so the next build starts completely fresh. Run before default lifecycle phases to avoid stale output.",
    cmd: "mvn clean",
  },
  {
    name: "site",
    color: "#27ae60",
    desc: "Generates project documentation — JavaDoc, test reports, dependency reports, code coverage. Rarely used in CI but useful for release documentation.",
    cmd: "mvn site",
  },
];

const defaultPhases = [
  { phase: "validate",             n:"01", desc: "Checks the project is correct and all necessary information is available. Validates pom.xml syntax and coordinate completeness." },
  { phase: "initialize",           n:"02", desc: "Initialises build state — sets up properties, creates directories. Rarely needs customisation." },
  { phase: "generate-sources",     n:"03", desc: "Generates source code that is then compiled. Used by annotation processors and code generators (e.g. JAXB, Lombok)." },
  { phase: "process-sources",      n:"04", desc: "Processes the source code — filtering, expanding variables, transforming. Plugin hooks in here before compilation." },
  { phase: "generate-resources",   n:"05", desc: "Generates resources to be included in the package. Config-file generators run here." },
  { phase: "process-resources",    n:"06", desc: "Copies and filters resources into target/classes. Maven's resource plugin copies src/main/resources here." },
  { phase: "compile",              n:"07", desc: "Compiles src/main/java source into target/classes. The maven-compiler-plugin runs here. This is where your .class files are produced.", highlight: true },
  { phase: "process-classes",      n:"08", desc: "Post-processes compiled classes — bytecode enhancement, instrumentation. Used by JPA providers (Hibernate bytecode enhancement)." },
  { phase: "generate-test-sources",n:"09", desc: "Generates test source code. Same as generate-sources but for the test classpath." },
  { phase: "process-test-sources", n:"10", desc: "Processes test source code. Filters test sources if needed." },
  { phase: "generate-test-resources",n:"11",desc: "Generates test resources." },
  { phase: "process-test-resources",n:"12",desc: "Copies and filters test resources into target/test-classes." },
  { phase: "test-compile",         n:"13", desc: "Compiles src/test/java into target/test-classes. Uses the same compiler plugin as compile, but the test classpath includes test-scope dependencies." },
  { phase: "process-test-classes", n:"14", desc: "Post-processes compiled test classes." },
  { phase: "test",                 n:"15", desc: "Runs unit tests using maven-surefire-plugin. Generates XML results in target/surefire-reports/. Build fails here if any test fails.", highlight: true },
  { phase: "prepare-package",      n:"16", desc: "Prepares for packaging — pre-packaging operations. Few plugins bind here by default." },
  { phase: "package",              n:"17", desc: "Packages compiled code into its distributable format — JAR, WAR, or EAR. The output appears in target/artifactId-version.jar.", highlight: true },
  { phase: "pre-integration-test", n:"18", desc: "Sets up the environment for integration tests — starts a database, launches an application server, opens ports." },
  { phase: "integration-test",     n:"19", desc: "Runs integration tests. Uses maven-failsafe-plugin (not surefire). Tests run against a real deployed application." },
  { phase: "post-integration-test",n:"20", desc: "Tears down the environment after integration tests — stops the database, shuts down the server." },
  { phase: "verify",               n:"21", desc: "Checks the package is valid and meets quality criteria — code coverage thresholds, static analysis gates, integration test results." },
  { phase: "install",              n:"22", desc: "Installs the package into the LOCAL .m2 repository so other local Maven projects can depend on it without publishing to a remote repo.", highlight: true },
  { phase: "deploy",               n:"23", desc: "Copies the final package to a REMOTE repository (Nexus, Artifactory, GitHub Packages) so the team and CI pipelines can access it.", highlight: true },
];

const commonCommands = [
  ["mvn clean",                   "Deletes target/ — start fresh"],
  ["mvn compile",                 "Compiles source code only — phases 1–7"],
  ["mvn test",                    "Compiles + runs unit tests — phases 1–15"],
  ["mvn package",                 "Compiles + tests + packages JAR/WAR — phases 1–17"],
  ["mvn verify",                  "Full build + integration tests + quality checks — phases 1–21"],
  ["mvn install",                 "Build + installs to local .m2 repo — phases 1–22"],
  ["mvn deploy",                  "Full build + deploy to remote repo — phases 1–23"],
  ["mvn clean package",           "Delete old output then build fresh JAR — most common CI command"],
  ["mvn clean install",           "Delete + full build + local install — use before running dependent local projects"],
  ["mvn package -DskipTests",     "Build JAR without running tests — faster, use sparingly"],
  ["mvn test -pl module-name",    "Run tests in a specific module of a multi-module project"],
  ["mvn dependency:tree",         "Print full resolved dependency tree with transitive deps"],
  ["mvn dependency:analyze",      "Find unused declared deps and undeclared used deps"],
  ["mvn help:effective-pom",      "Print the fully merged pom.xml including inherited parent config"],
  ["mvn versions:display-dependency-updates", "List all dependencies that have newer versions available"],
];

const localRepoFacts = [
  ["Default location (Linux/Mac)", "~/.m2/repository/ — in your home directory"],
  ["Default location (Windows)",   "C:\\Users\\YourName\\.m2\\repository\\"],
  ["Directory structure",          "Mirrors Maven coordinates: groupId/artifactId/version/artifactId-version.jar"],
  ["What gets cached",             "JARs, POMs, SHA1 checksums, metadata files — everything needed to verify integrity"],
  ["First build",                  "Maven downloads all dependencies — can take minutes for large projects"],
  ["Subsequent builds",            "Maven reads from cache — near-instant. No network needed unless new versions are declared."],
  ["Force re-download",            "mvn clean install -U  — the -U flag forces Maven to check for updates even if cached"],
  ["Delete and rebuild cache",     "rm -rf ~/.m2/repository  — nuclear option. Next build re-downloads everything."],
  ["Shared on CI servers",         "CI agents share a .m2 cache between builds — drastically speeds up pipeline times"],
  ["settings.xml location",        "~/.m2/settings.xml — configures mirrors, proxies, server credentials for Maven"],
];

const repoTypes = [
  {
    type: "Local Repository (.m2)",
    color: "#e67e22",
    icon: "💻",
    desc: "On your own machine at ~/.m2/repository. Maven checks here first. If the artifact exists and is not SNAPSHOT, it is used directly without any network call.",
    when: "First check — always",
  },
  {
    type: "Central Repository",
    color: "#3498db",
    icon: "🌐",
    desc: "repo.maven.apache.org — the public registry containing virtually every open-source Java library. Maven queries this if the artifact is not in local cache. No configuration needed.",
    when: "Second check — if not in local cache",
  },
  {
    type: "Remote / Corporate Repository",
    color: "#27ae60",
    icon: "🏢",
    desc: "Your company's private Nexus or Artifactory server. Contains internal artifacts plus a proxy cache of Central. Configured via settings.xml. Replaces Central as the primary remote repo.",
    when: "Replaces Central when configured",
  },
  {
    type: "Repository in pom.xml",
    color: "#9b59b6",
    icon: "📄",
    desc: "Additional repositories declared directly in pom.xml for specific third-party libraries not in Central (e.g. JBoss repo, Spring milestones). Checked after Central.",
    when: "Extra source for specific artifacts",
  },
];

const multiModuleItems = [
  { n:"1", t:"Create the parent project directory",       b:"mkdir my-app && cd my-app. Create pom.xml with <packaging>pom</packaging> and a <modules> section. Do NOT put any src/ in the parent." },
  { n:"2", t:"Add child modules to parent pom.xml",       b:"Inside <modules>, list each child: <module>core</module>, <module>web</module>, <module>service</module>. Maven looks for a directory with that name containing its own pom.xml." },
  { n:"3", t:"Create child module directories",           b:"mkdir core web service. Inside each, create a pom.xml that declares <parent> pointing to the parent's GAV coordinates, and its own <artifactId>." },
  { n:"4", t:"Child pom declares parent",                 b:"Each child pom.xml has <parent><groupId>com.mycompany</groupId><artifactId>my-app</artifactId><version>1.0.0-SNAPSHOT</version></parent>. It inherits the parent's groupId and version automatically." },
  { n:"5", t:"Use dependencyManagement in parent",        b:"In the parent pom, add <dependencyManagement><dependencies> to declare all versions centrally. Child modules then declare <dependency> WITHOUT a version — they inherit it from the parent." },
  { n:"6", t:"Build everything with one command",         b:"From the parent directory: mvn clean install. Maven builds all modules in the correct order (resolving inter-module dependencies). One command, all modules." },
];

const quizData = [
  { q: "What are Maven's three built-in lifecycles and what does each do?",
    a: "default: builds and deploys the project (23 phases from validate to deploy). clean: deletes the target/ directory for a fresh build. site: generates project documentation and reports." },
  { q: "When you run 'mvn package', which lifecycle phases execute?",
    a: "All phases from validate (phase 1) through package (phase 17) execute in order: validate, initialize, generate-sources, process-sources, generate-resources, process-resources, compile, process-classes, generate-test-sources, process-test-sources, generate-test-resources, process-test-resources, test-compile, process-test-classes, test, prepare-package, package." },
  { q: "What is the difference between 'mvn install' and 'mvn deploy'?",
    a: "mvn install (phase 22) copies the artifact to your LOCAL .m2 repository — only you can use it on your machine. mvn deploy (phase 23) uploads the artifact to a REMOTE repository (Nexus, Artifactory) — the whole team and CI pipelines can use it." },
  { q: "What is the Maven Local Repository, where is it, and what is its purpose?",
    a: "The Local Repository is a directory on your machine (~/.m2/repository on Linux/Mac, C:\\Users\\Name\\.m2\\repository on Windows). Maven caches every downloaded JAR, POM, and checksum here. On subsequent builds, Maven reads from this cache instead of the network — making builds faster and allowing offline work." },
  { q: "What is Maven Central and how does dependency resolution work?",
    a: "Maven Central (repo.maven.apache.org) is the public registry of open-source Java libraries. When Maven needs a dependency, it checks the local .m2 cache first. If not found, it downloads from Central (or your configured mirror). Downloaded artifacts are cached locally for future use." },
  { q: "What is a settings.xml file and what is it used for?",
    a: "settings.xml (~/.m2/settings.xml) is Maven's user configuration file. It configures: mirror repositories (redirect Central to your Nexus), proxy servers (for corporate firewalls), server authentication (username/password for private repos), and local repository location." },
  { q: "What is a multi-module Maven project and what is the parent POM's packaging type?",
    a: "A multi-module project has a parent POM with <packaging>pom</packaging> that lists child modules in <modules>. Each child has its own pom.xml with a <parent> reference. The parent coordinates builds, centralises dependency versions via <dependencyManagement>, and allows building all modules with one mvn command from the root." },
  { q: "What is dependencyManagement and how does it differ from dependencies?",
    a: "<dependencyManagement> in a parent POM declares dependency versions centrally without actually adding them to the classpath. Child modules can then declare <dependency> without a <version> — they inherit it from the parent. <dependencies> actually adds a dependency to the classpath. dependencyManagement is about version governance, not inclusion." },
];

const takeaways = [
  ["default lifecycle",  "23 phases: validate → compile → test → package → install → deploy"],
  ["mvn clean package",  "Most common CI command — fresh build producing a JAR"],
  [".m2 repository",     "Local cache at ~/.m2/repository — checked first, always"],
  ["Maven Central",      "Public registry — downloaded on first use, cached locally"],
  ["settings.xml",       "Mirror, proxy, server credentials — ~/.m2/settings.xml"],
  ["Parent POM",         "packaging=pom, centralises config for child modules"],
  ["dependencyManagement","Declare versions once in parent — children inherit, no version duplication"],
  ["mvn install -U",     "Force re-check remote repos even if artifact is cached"],
];

export default function Session12() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s12-page {
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
          overflow-x: hidden;
        }

        .bc { display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:var(--muted); margin-bottom:2rem; }
        .bc a { color:var(--text2); text-decoration:none; transition:color 0.2s; }
        .bc a:hover { color:var(--accent); }
        .bc .sep { color:var(--border2); }
        .bc .cur { color:var(--text); }

        .nav-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.5rem; flex-wrap:wrap; gap:0.5rem; }
        .nav-btn { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:var(--text2); text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem; padding:0.4rem 0.75rem; border-radius:8px; border:1px solid var(--border); background:var(--surface); transition:all 0.2s; white-space:nowrap; }
        .nav-btn:hover { color:var(--text); border-color:var(--border2); }

        .hero { border-radius:20px; background:linear-gradient(135deg,#3d1a00 0%,#c0392b 30%,#e67e22 70%,#f39c12 100%); padding:2.5rem 2rem; margin-bottom:2rem; position:relative; overflow:hidden; }
        .hero::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px); background-size:22px 22px; }
        .hero-meta { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; flex-wrap:wrap; position:relative; }
        .h-badge { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#fff; padding:0.3rem 0.75rem; border-radius:100px; }
        .h-mod   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.08em; text-transform:uppercase; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); color:rgba(255,255,255,0.8); padding:0.3rem 0.75rem; border-radius:100px; }
        .h-fin   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; background:rgba(255,215,0,0.18); border:1px solid rgba(255,215,0,0.4); color:#FFD700; padding:0.3rem 0.75rem; border-radius:100px; }
        .h-dur   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:rgba(255,255,255,0.6); display:flex; align-items:center; gap:0.35rem; }
        .hero h1 { font-size:clamp(1.5rem,3.5vw,2.2rem); font-weight:800; color:#fff; letter-spacing:-0.03em; line-height:1.15; position:relative; margin-bottom:0.75rem; }
        .hero p  { color:rgba(255,255,255,0.75); font-size:0.95rem; line-height:1.65; max-width:620px; position:relative; }

        .jump-nav { display:flex; gap:0.4rem; margin-bottom:2.5rem; flex-wrap:wrap; }
        .jpill { font-family:'JetBrains Mono',monospace; font-size:0.6rem; padding:0.3rem 0.8rem; border-radius:100px; border:1px solid var(--border); background:var(--surface2); color:var(--muted); text-decoration:none; letter-spacing:0.06em; transition:all 0.2s; white-space:nowrap; }
        .jpill:hover { color:var(--text); border-color:var(--border2); }
        .jpill.active { background:linear-gradient(135deg,#c0392b,#e67e22); color:#fff; border-color:transparent; }

        .pt { font-size:1.3rem; font-weight:800; letter-spacing:-0.025em; color:var(--text); margin:2.5rem 0 1.25rem; display:flex; align-items:center; gap:0.75rem; }
        .pt::after { content:''; flex:1; height:1px; background:var(--border); }
        .pt-badge { font-family:'JetBrains Mono',monospace; font-size:0.6rem; letter-spacing:0.08em; text-transform:uppercase; background:linear-gradient(135deg,#c0392b,#e67e22); color:#fff; padding:0.2rem 0.65rem; border-radius:100px; flex-shrink:0; }

        .obj-card { background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); border-radius:16px; padding:1.75rem; margin-bottom:2rem; }
        .obj-card h2 { font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:1.1rem; }
        .obj-list { list-style:none; display:flex; flex-direction:column; gap:0.55rem; }
        .obj-list li { display:flex; align-items:flex-start; gap:0.65rem; font-size:0.9rem; color:rgba(255,255,255,0.92); line-height:1.5; }
        .obj-check { width:18px; height:18px; border-radius:50%; background:rgba(255,215,0,0.2); border:1.5px solid #FFD700; display:flex; align-items:center; justify-content:center; font-size:0.6rem; color:#FFD700; flex-shrink:0; margin-top:2px; }

        .body-text { font-size:0.9rem; color:var(--text2); line-height:1.75; margin-bottom:1rem; }
        .body-text strong { color:var(--text); }
        .body-text code { font-family:'JetBrains Mono',monospace; font-size:0.8rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        .sub-h { font-size:0.95rem; font-weight:700; color:var(--text); margin:1.5rem 0 0.75rem; }

        .tip-box { background:rgba(230,126,34,0.07); border-left:3px solid #e67e22; border-radius:0 12px 12px 0; padding:1.1rem 1.25rem; margin:1.1rem 0; }
        .tip-box h4 { font-size:0.82rem; font-weight:700; color:#c0392b; margin-bottom:0.5rem; }
        .tip-box p  { font-size:0.83rem; color:var(--text2); line-height:1.6; margin-bottom:0.4rem; }
        .tip-box ul { list-style:none; padding-left:0; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .tip-box li { font-size:0.82rem; color:var(--text2); line-height:1.5; display:flex; gap:0.45rem; }
        .tip-box li::before { content:'→'; color:#e67e22; flex-shrink:0; font-size:0.75rem; margin-top:1px; }
        .tip-box strong { color:var(--text); }
        .tip-box code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        .warn-box { background:rgba(220,53,69,0.05); border-left:3px solid #dc3545; border-radius:0 12px 12px 0; padding:1.1rem 1.25rem; margin:1.1rem 0; }
        .warn-box h4 { font-size:0.82rem; font-weight:700; color:#dc3545; margin-bottom:0.5rem; }
        .warn-box p  { font-size:0.83rem; color:var(--text2); line-height:1.6; margin-bottom:0.4rem; }
        .warn-box ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .warn-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; display:flex; gap:0.45rem; }
        .warn-box li::before { content:'⚠'; flex-shrink:0; font-size:0.72rem; color:#dc3545; }
        .warn-box strong { color:var(--text); }
        .warn-box code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        .ex-box { background:var(--surface2); border-left:3px solid #27ae60; border-radius:0 12px 12px 0; padding:1.1rem 1.25rem; margin:1.1rem 0; }
        .ex-label { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#27ae60; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.6rem; font-weight:600; }
        .ex-box p  { font-size:0.84rem; color:var(--text2); line-height:1.65; margin-bottom:0.45rem; }
        .ex-box p:last-child { margin-bottom:0; }
        .ex-box ul { padding-left:1.2rem; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .ex-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; }
        .ex-box li code,.ex-box p code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }
        .ex-box strong { color:var(--text); }

        .cb { background:#0d1117; color:#e6edf3; padding:1.25rem; border-radius:12px; font-family:'JetBrains Mono',monospace; font-size:0.73rem; line-height:1.9; overflow-x:auto; margin:0.75rem 0; border:1px solid rgba(255,255,255,0.06); }
        .c-cm  { color:#8b949e; }
        .c-kw  { color:#ff7b72; font-weight:600; }
        .c-str { color:#a5d6ff; }
        .c-fn  { color:#d2a8ff; }
        .c-ok  { color:#56d364; }
        .c-err { color:#ff7b72; }
        .c-tag { color:#7ee787; }
        .c-attr{ color:#79c0ff; }
        .c-val { color:#a5d6ff; }
        .c-hi  { color:#f39c12; font-weight:700; }

        /* ── Three lifecycle cards ── */
        .lc-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.7rem; margin:1.25rem 0; }
        @media(max-width:600px){ .lc-grid { grid-template-columns:1fr; } }
        .lc-card { border-radius:14px; padding:1.1rem; border:2px solid; }
        .lc-name { font-family:'JetBrains Mono',monospace; font-size:0.88rem; font-weight:700; margin-bottom:0.4rem; }
        .lc-cmd  { font-family:'JetBrains Mono',monospace; font-size:0.67rem; margin-bottom:0.65rem; opacity:0.75; }
        .lc-desc { font-size:0.79rem; color:var(--text2); line-height:1.55; }

        /* ── Lifecycle phase table ── */
        .phase-table { width:100%; border-collapse:collapse; font-size:0.8rem; margin:1.25rem 0; }
        .phase-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.6rem 0.85rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.75rem; }
        .phase-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .phase-table tbody tr:hover { background:var(--surface); }
        .phase-table tbody tr.hl { background:rgba(230,126,34,0.05); }
        .phase-table tbody tr.hl:hover { background:rgba(230,126,34,0.1); }
        .phase-table td { padding:0.55rem 0.85rem; color:var(--text2); vertical-align:top; line-height:1.5; }
        .phase-table td:first-child { width:28px; font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:var(--muted); text-align:center; }
        .phase-table td:nth-child(2) { font-family:'JetBrains Mono',monospace; font-size:0.73rem; font-weight:700; width:190px; }
        .phase-table tbody tr.hl td:nth-child(2) { color:#e67e22; }
        .phase-table td:nth-child(3) { font-size:0.77rem; }

        /* ── Command table ── */
        .cmd-list { display:flex; flex-direction:column; gap:0; background:#0d1117; border-radius:12px; border:1px solid rgba(255,255,255,0.06); overflow:hidden; margin:0.75rem 0; }
        .cmd-row  { display:flex; gap:0; border-bottom:1px solid rgba(255,255,255,0.06); }
        .cmd-row:last-child { border-bottom:none; }
        .cmd-code { font-family:'JetBrains Mono',monospace; font-size:0.71rem; color:#a5d6ff; padding:0.55rem 1rem; min-width:290px; flex-shrink:0; border-right:1px solid rgba(255,255,255,0.06); }
        .cmd-desc { font-size:0.76rem; color:#8b949e; padding:0.55rem 1rem; line-height:1.5; }
        @media(max-width:640px){ .cmd-row { flex-direction:column; } .cmd-code { border-right:none; border-bottom:1px solid rgba(255,255,255,0.06); min-width:unset; } }

        /* ── Repo type cards ── */
        .repo-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin:1.25rem 0; }
        @media(max-width:560px){ .repo-grid { grid-template-columns:1fr; } }
        .repo-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:1.1rem; }
        .repo-header { display:flex; align-items:center; gap:0.6rem; margin-bottom:0.5rem; }
        .repo-icon { font-size:1.2rem; }
        .repo-type { font-size:0.88rem; font-weight:700; color:var(--text); }
        .repo-when { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.06em; margin-bottom:0.55rem; }
        .repo-desc { font-size:0.79rem; color:var(--text2); line-height:1.55; }

        /* ── Local repo fact table ── */
        .data-table { width:100%; border-collapse:collapse; font-size:0.82rem; margin:1.25rem 0; }
        .data-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.65rem 0.9rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.78rem; }
        .data-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .data-table tbody tr:hover { background:var(--surface); }
        .data-table td { padding:0.6rem 0.9rem; color:var(--text2); vertical-align:top; line-height:1.5; }
        .data-table td:first-child { font-family:'JetBrains Mono',monospace; font-size:0.74rem; color:#e67e22; font-weight:600; width:220px; }

        /* ── Workflow steps ── */
        .workflow { display:flex; flex-direction:column; gap:0.5rem; margin:1.25rem 0; position:relative; }
        .workflow::before { content:''; position:absolute; left:19px; top:0; bottom:0; width:2px; background:var(--border); z-index:0; }
        .wf-step { display:flex; align-items:flex-start; gap:0.85rem; padding:0.9rem 1rem; border-radius:12px; background:var(--surface); border:1px solid var(--border); position:relative; z-index:1; transition:border-color 0.2s; }
        .wf-step:hover { border-color:var(--border2); }
        .wf-num { width:28px; height:28px; border-radius:8px; background:linear-gradient(135deg,#c0392b,#e67e22); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem; flex-shrink:0; }
        .wf-body { display:flex; flex-direction:column; gap:0.2rem; width:100%; }
        .wf-body strong { font-size:0.88rem; color:var(--text); }
        .wf-body p { font-size:0.8rem; color:var(--text2); line-height:1.5; }
        .wf-body code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        .act-box { background:linear-gradient(135deg,#3d1a00 0%,#c0392b 40%,#e67e22 100%); border-radius:16px; padding:1.75rem; margin:1.5rem 0; }
        .act-box h3 { font-size:1rem; font-weight:700; color:#fff; margin-bottom:1rem; }
        .act-box h4 { font-size:0.85rem; font-weight:700; color:rgba(255,255,255,0.9); margin:1.1rem 0 0.5rem; }
        .lab-ol { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); border-radius:10px; padding:1rem 1rem 1rem 2rem; margin-bottom:0.6rem; display:flex; flex-direction:column; gap:0.4rem; }
        .lab-ol li { font-size:0.83rem; color:rgba(255,255,255,0.88); line-height:1.55; }
        .lab-ol li code { font-family:'JetBrains Mono',monospace; font-size:0.75rem; background:rgba(255,255,255,0.15); padding:0.1rem 0.4rem; border-radius:4px; color:#fff; }
        .lab-ol li strong { color:#fff; }

        .quiz-box { background:linear-gradient(135deg,rgba(192,57,43,0.08),rgba(230,126,34,0.08)); border:1px solid rgba(230,126,34,0.2); border-radius:16px; padding:1.75rem; margin:1.5rem 0; }
        .quiz-box h3 { font-size:1rem; font-weight:700; color:var(--text); margin-bottom:1.25rem; }
        .quiz-list { list-style:none; display:flex; flex-direction:column; gap:0.75rem; }
        .qi { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:0.9rem 1rem; }
        .qi-n { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#e67e22; letter-spacing:0.08em; margin-bottom:0.3rem; }
        .qi-q { font-size:0.88rem; font-weight:600; color:var(--text); }
        .qi-a { font-size:0.82rem; color:var(--text2); font-style:italic; margin-top:0.4rem; padding-top:0.4rem; border-top:1px solid var(--border); }

        .hw-box { background:rgba(255,193,7,0.06); border:1px solid rgba(255,193,7,0.2); border-radius:14px; padding:1.5rem; margin:1.5rem 0; }
        .hw-box h3 { font-size:0.95rem; font-weight:700; color:var(--text); margin-bottom:1rem; }
        .hw-task { margin-bottom:0.85rem; }
        .hw-task h4 { font-size:0.82rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; }
        .hw-task ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; padding-left:0.5rem; }
        .hw-task li { font-size:0.82rem; color:var(--text2); line-height:1.5; display:flex; gap:0.4rem; }
        .hw-task li::before { content:'•'; color:#F59E0B; flex-shrink:0; }
        .hw-task li code { font-family:'JetBrains Mono',monospace; font-size:0.75rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.35rem; border-radius:4px; color:var(--accent); }

        .tk-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:0.65rem; margin:1rem 0; }
        .tk-card { background:var(--surface); border:1px solid var(--border); border-top:3px solid #e67e22; border-radius:12px; padding:0.9rem 1rem; }
        .tk-card h4 { font-size:0.82rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; font-family:'JetBrains Mono',monospace; }
        .tk-card p  { font-size:0.78rem; color:var(--text2); line-height:1.45; }

        .flow-pill { display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; justify-content:center; background:var(--surface2); border:1px solid var(--border); border-radius:12px; padding:1rem 1.5rem; margin:1.25rem 0; }
        .fp { font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:700; color:var(--text); background:var(--surface); border:1px solid var(--border); padding:0.45rem 0.9rem; border-radius:8px; }
        .fp-arrow { color:var(--muted); font-size:0.9rem; }

        .rules-box { background:rgba(230,126,34,0.05); border:1px solid rgba(230,126,34,0.2); border-radius:12px; padding:1.25rem; margin:1.25rem 0; }
        .rules-box h4 { font-size:0.85rem; font-weight:700; color:#c0392b; margin-bottom:0.65rem; }
        .rules-box ul { list-style:none; display:flex; flex-direction:column; gap:0.4rem; }
        .rules-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; display:flex; gap:0.5rem; }
        .rules-box li::before { content:'✓'; color:#e67e22; flex-shrink:0; font-weight:700; }

        /* ── Module complete card ── */
        .complete-card { background:linear-gradient(135deg,#3d1a00 0%,#c0392b 40%,#e67e22 80%,#f39c12 100%); border-radius:20px; padding:2.5rem 2rem; margin-top:2.5rem; text-align:center; position:relative; overflow:hidden; }
        .complete-card::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(255,255,255,0.07) 1px,transparent 1px); background-size:20px 20px; }
        .complete-card h2 { font-size:1.7rem; font-weight:800; color:#fff; margin-bottom:0.4rem; position:relative; }
        .complete-card .sub { font-family:'JetBrains Mono',monospace; font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.55); margin-bottom:1rem; position:relative; display:block; }
        .complete-card p { color:rgba(255,255,255,0.8); font-size:0.92rem; line-height:1.7; max-width:540px; margin:0 auto 1.75rem; position:relative; }
        .complete-pills { display:flex; flex-wrap:wrap; gap:0.4rem; justify-content:center; position:relative; margin-bottom:2rem; }
        .cpill { font-family:'JetBrains Mono',monospace; font-size:0.62rem; letter-spacing:0.05em; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.22); color:#fff; padding:0.25rem 0.65rem; border-radius:100px; }
        .complete-links { display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; position:relative; }
        .c-btn-primary { display:inline-flex; align-items:center; gap:0.5rem; background:#fff; color:#c0392b; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.88rem; font-weight:700; padding:0.8rem 1.75rem; border-radius:10px; text-decoration:none; transition:opacity 0.2s,transform 0.2s; }
        .c-btn-primary:hover { opacity:0.92; transform:translateY(-2px); }
        .c-btn-secondary { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.25); color:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.88rem; font-weight:700; padding:0.8rem 1.75rem; border-radius:10px; text-decoration:none; transition:opacity 0.2s; }
        .c-btn-secondary:hover { opacity:0.8; }

        @media(max-width:640px){
          .s12-page { padding:2rem 1rem 4rem; }
          .nav-row { flex-direction:column; }
          .nav-btn { width:100%; justify-content:center; }
          .hero { padding:1.5rem 1rem; border-radius:14px; }
          .hero h1 { font-size:1.3rem; }
          .jump-nav { flex-wrap:nowrap; overflow-x:auto; padding-bottom:0.4rem; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
          .jump-nav::-webkit-scrollbar { display:none; }
          .jpill { flex-shrink:0; }
          .act-box { padding:1.25rem 1rem; }
          .lab-ol { padding:0.85rem 0.85rem 0.85rem 1.75rem; }
          .complete-card { padding:1.75rem 1.25rem; }
          .complete-card h2 { font-size:1.3rem; }
        }
        @media(max-width:400px){ .hero h1 { font-size:1.1rem; } }
      `}</style>

      <div className="s12-page">

        <div className="bc">
          <Link href="/">Home</Link><span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link><span className="sep">/</span>
          <span className="cur">Session 12: Lifecycle, Repos &amp; Dependencies</span>
        </div>

        <div className="nav-row">
          <Link href="/courses/dev/session11" className="nav-btn">&larr; Session 11: Maven Fundamentals &amp; POM</Link>
          <Link href="/courses/dev/session13" className="nav-btn">Session 13: Docker Images &amp; Install &rarr;</Link>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 12 of 15</span>
            <span className="h-mod">Module 4 &mdash; Build Tool: Maven</span>
            <span className="h-fin">&#127381; Module Final</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4.5 hrs
            </span>
          </div>
          <h1>&#9981; Build Lifecycle, Repositories &amp; Multi-Module Projects</h1>
          <p>Master Maven&apos;s 23-phase default lifecycle, understand exactly how dependency resolution flows from local cache to Maven Central, and build multi-module projects with a single command.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","3 Lifecycles","23 Phases","Common Commands","Local Repo (.m2)","Repo Types","settings.xml","Nexus Mirror","Multi-Module","Parent POM","dependencyManagement","Lab","Quiz","Homework"].map((l,i)=>(
            <a key={i} href={`#s12p${i}`} className={`jpill${i===0?" active":""}`}>{l}</a>
          ))}
        </div>

        {/* OBJECTIVES */}
        <div id="s12p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o,i)=>(
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* THREE LIFECYCLES */}
        <div id="s12p1">
          <div className="pt"><span className="pt-badge">Foundation</span>Maven&apos;s Three Built-in Lifecycles</div>
          <p className="body-text">
            Maven has exactly <strong>three built-in lifecycles</strong>. When you run any Maven command, you are invoking a phase inside one of these lifecycles. Each lifecycle is independent — running <code>clean</code> never triggers <code>default</code> phases automatically.
          </p>
          <div className="lc-grid">
            {threeLifecycles.map(lc=>(
              <div key={lc.name} className="lc-card" style={{borderColor:lc.color, background:`${lc.color}0a`}}>
                <div className="lc-name" style={{color:lc.color}}>{lc.name}</div>
                <div className="lc-cmd">{lc.cmd}</div>
                <p className="lc-desc">{lc.desc}</p>
              </div>
            ))}
          </div>
          <div className="tip-box">
            <h4>&#128161; Combining Lifecycles in One Command</h4>
            <ul>
              <li>You can chain multiple lifecycle phases: <code>mvn clean package</code> runs the entire <code>clean</code> lifecycle then all phases up to <code>package</code> in the <code>default</code> lifecycle</li>
              <li><code>mvn clean install</code> is the most common full local build command in CI pipelines</li>
              <li>Order matters — Maven executes left to right: <code>mvn clean</code> always runs before <code>package</code> in <code>mvn clean package</code></li>
            </ul>
          </div>
        </div>

        {/* 23 PHASES */}
        <div id="s12p2">
          <div className="pt"><span className="pt-badge">Default Lifecycle</span>All 23 Phases — Complete Reference</div>
          <p className="body-text">
            The <strong>default lifecycle</strong> has 23 phases that always run in order. When you run <code>mvn package</code>, Maven runs <em>every phase from 1 through 17</em> &mdash; not just package. The <span style={{color:"#e67e22",fontWeight:700}}>highlighted phases</span> are the ones you need to know cold.
          </p>
          <table className="phase-table">
            <thead>
              <tr><th>#</th><th>Phase</th><th>What happens</th></tr>
            </thead>
            <tbody>
              {defaultPhases.map(p=>(
                <tr key={p.phase} className={p.highlight ? "hl" : ""}>
                  <td>{p.n}</td>
                  <td>{p.phase}</td>
                  <td>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ex-box">
            <div className="ex-label">&#128161; Key Rule — Phases Are Cumulative</div>
            <p><strong>Running <code>mvn test</code> executes phases 1–15.</strong> Running <code>mvn package</code> executes phases 1–17 (which includes test). You never need to run <code>mvn compile test package</code> — just <code>mvn package</code>.</p>
            <p>To <strong>skip tests</strong> (not recommended for production builds): <code>mvn package -DskipTests</code> — compiles test code but skips execution. Or <code>mvn package -Dmaven.test.skip=true</code> — skips compilation and execution of tests entirely.</p>
          </div>
        </div>

        {/* COMMON COMMANDS */}
        <div id="s12p3">
          <div className="pt"><span className="pt-badge">Commands</span>Essential Maven Commands</div>
          <div className="cmd-list">
            {commonCommands.map(([cmd,desc])=>(
              <div key={cmd} className="cmd-row">
                <span className="cmd-code">{cmd}</span>
                <span className="cmd-desc">{desc}</span>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># Reading Maven console output — key lines to watch</span>{"\n\n"}
<span className="c-ok">[INFO] --- maven-compiler-plugin:3.12.1:compile ---</span>    <span className="c-cm">← phase executing</span>{"\n"}
<span className="c-ok">[INFO] Compiling 5 source files to /app/target/classes</span>{"\n\n"}
<span className="c-ok">[INFO] --- maven-surefire-plugin:3.2.3:test ---</span>{"\n"}
<span className="c-ok">[INFO] Tests run: 12, Failures: 0, Errors: 0, Skipped: 0</span>   <span className="c-cm">← all green</span>{"\n\n"}
<span className="c-err">[ERROR] Tests run: 12, Failures: 1, Errors: 0, Skipped: 0</span>  <span className="c-cm">← test failed</span>{"\n"}
<span className="c-err">[ERROR] BUILD FAILURE</span>{"\n\n"}
<span className="c-ok">[INFO] Building jar: /app/target/hello-service-1.0.0.jar</span>  <span className="c-cm">← JAR produced</span>{"\n"}
<span className="c-ok">[INFO] BUILD SUCCESS</span>{"\n"}
<span className="c-ok">[INFO] Total time: 4.823 s</span>
          </div>
        </div>

        {/* LOCAL REPO */}
        <div id="s12p4">
          <div className="pt"><span className="pt-badge">Local Repository</span>The Maven Local Repository (.m2)</div>
          <p className="body-text">
            The <strong>local repository</strong> is a directory on your machine where Maven caches every artifact it has ever downloaded. It is the first place Maven looks when resolving any dependency. If the artifact is there and not a SNAPSHOT, Maven uses it without touching the network.
          </p>
          <table className="data-table">
            <thead><tr><th>Property</th><th>Details</th></tr></thead>
            <tbody>
              {localRepoFacts.map(([k,v])=>(
                <tr key={k}><td>{k}</td><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="cb">
<span className="c-cm"># Structure of ~/.m2/repository — mirrors GAV coordinates</span>{"\n"}
~/.m2/repository/{"\n"}
└── org/springframework/boot/spring-boot-starter-web/{"\n"}
    └── 3.2.0/{"\n"}
        ├── spring-boot-starter-web-3.2.0.jar         <span className="c-cm">← the JAR</span>{"\n"}
        ├── spring-boot-starter-web-3.2.0.pom         <span className="c-cm">← its POM (for transitive deps)</span>{"\n"}
        ├── spring-boot-starter-web-3.2.0.jar.sha1    <span className="c-cm">← integrity checksum</span>{"\n"}
        └── _remote.repositories                       <span className="c-cm">← tracks where it came from</span>{"\n\n"}
<span className="c-cm"># Check cache size</span>{"\n"}
du -sh ~/.m2/repository/{"\n"}
<span className="c-ok">1.2G    /home/user/.m2/repository/</span>            <span className="c-cm">← typical after several projects</span>{"\n\n"}
<span className="c-cm"># Force Maven to re-check remote repos for updates</span>{"\n"}
mvn clean install -U{"\n\n"}
<span className="c-cm"># Run a build offline (uses only what's already in .m2 cache)</span>{"\n"}
mvn package -o
          </div>
          <div className="tip-box">
            <h4>&#128161; Speeding Up CI Pipelines with .m2 Caching</h4>
            <ul>
              <li>CI platforms (GitHub Actions, Jenkins, GitLab CI) support caching the <code>~/.m2/repository</code> directory between pipeline runs</li>
              <li>First run: downloads all dependencies (slow — 2–5 minutes). Subsequent runs: reads from cache (fast — seconds)</li>
              <li>In Jenkins: configure a shared <code>.m2</code> directory on the agent machine — all jobs on that agent share one cache</li>
              <li>Cache key on the pom.xml file — invalidate the cache when pom.xml changes to pick up new dependencies</li>
            </ul>
          </div>
        </div>

        {/* REPO TYPES */}
        <div id="s12p5">
          <div className="pt"><span className="pt-badge">Repositories</span>Repository Types &amp; Resolution Order</div>
          <p className="body-text">
            When Maven needs a dependency, it searches repositories in a <strong>specific order</strong>. Understanding this order explains why builds are fast after the first run and how corporate mirrors work.
          </p>
          <div className="repo-grid">
            {repoTypes.map(r=>(
              <div key={r.type} className="repo-card">
                <div className="repo-header">
                  <span className="repo-icon">{r.icon}</span>
                  <span className="repo-type">{r.type}</span>
                </div>
                <div className="repo-when" style={{color:r.color}}>{r.when}</div>
                <p className="repo-desc">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="sub-h">Resolution Flow</div>
          <div className="flow-pill">
            <span className="fp">1. Local .m2</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">2. Corporate Mirror</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">3. Maven Central</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">4. pom.xml repos</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">&#9989; Found / &#10060; BUILD FAILURE</span>
          </div>

          <div className="warn-box">
            <h4>&#9888; Dependency Not Found?</h4>
            <ul>
              <li><strong>Check coordinates:</strong> groupId, artifactId, version must match exactly — a single typo causes <code>Could not resolve dependencies</code></li>
              <li><strong>Search Maven Central:</strong> visit <code>search.maven.org</code> and confirm the artifact exists at the exact version you declared</li>
              <li><strong>Check network:</strong> run <code>mvn dependency:resolve -U</code> to force re-download — watch for firewall or proxy errors in the output</li>
              <li><strong>Not in Central:</strong> some libraries (JBoss, Oracle JDBC) are not on Maven Central — you must add their repository URL to <code>pom.xml</code> or <code>settings.xml</code></li>
            </ul>
          </div>
        </div>

        {/* SETTINGS.XML */}
        <div id="s12p6">
          <div className="pt"><span className="pt-badge">Configuration</span>Maven settings.xml</div>
          <p className="body-text">
            <code>~/.m2/settings.xml</code> is Maven&apos;s user-level configuration file. It configures mirrors (redirect Central to your Nexus), proxy servers, server credentials, and active profiles. It is <em>not</em> committed to version control &mdash; it contains machine-specific and secret information.
          </p>
          <div className="cb">
<span className="c-cm">&lt;!-- ~/.m2/settings.xml — user-level Maven configuration --&gt;</span>{"\n"}
<span className="c-tag">&lt;settings&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- ── Override default local repo location ── --&gt;</span>{"\n"}
  <span className="c-tag">&lt;localRepository&gt;</span>/opt/maven-repo<span className="c-tag">&lt;/localRepository&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- ── Corporate mirror: redirect ALL Central traffic to Nexus ── --&gt;</span>{"\n"}
  <span className="c-tag">&lt;mirrors&gt;</span>{"\n"}
    <span className="c-tag">&lt;mirror&gt;</span>{"\n"}
      <span className="c-tag">&lt;id&gt;</span>nexus-central<span className="c-tag">&lt;/id&gt;</span>{"\n"}
      <span className="c-tag">&lt;name&gt;</span>Corporate Nexus Mirror<span className="c-tag">&lt;/name&gt;</span>{"\n"}
      <span className="c-tag">&lt;url&gt;</span>https://nexus.company.com/repository/maven-public/<span className="c-tag">&lt;/url&gt;</span>{"\n"}
      <span className="c-tag">&lt;mirrorOf&gt;</span>*<span className="c-tag">&lt;/mirrorOf&gt;</span>  <span className="c-cm">&lt;!-- * = mirror ALL remote repos --&gt;</span>{"\n"}
    <span className="c-tag">&lt;/mirror&gt;</span>{"\n"}
  <span className="c-tag">&lt;/mirrors&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- ── Server credentials for private repos ── --&gt;</span>{"\n"}
  <span className="c-tag">&lt;servers&gt;</span>{"\n"}
    <span className="c-tag">&lt;server&gt;</span>{"\n"}
      <span className="c-tag">&lt;id&gt;</span>nexus-central<span className="c-tag">&lt;/id&gt;</span>  <span className="c-cm">&lt;!-- must match mirror id --&gt;</span>{"\n"}
      <span className="c-tag">&lt;username&gt;</span>jenkins-deploy<span className="c-tag">&lt;/username&gt;</span>{"\n"}
      <span className="c-tag">&lt;password&gt;</span>{"${nexus.password}"}<span className="c-tag">&lt;/password&gt;</span>  <span className="c-cm">&lt;!-- use env var, not plain text --&gt;</span>{"\n"}
    <span className="c-tag">&lt;/server&gt;</span>{"\n"}
  <span className="c-tag">&lt;/servers&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- ── HTTP proxy (if your company requires one) ── --&gt;</span>{"\n"}
  <span className="c-tag">&lt;proxies&gt;</span>{"\n"}
    <span className="c-tag">&lt;proxy&gt;</span>{"\n"}
      <span className="c-tag">&lt;id&gt;</span>corp-proxy<span className="c-tag">&lt;/id&gt;</span>{"\n"}
      <span className="c-tag">&lt;active&gt;</span>true<span className="c-tag">&lt;/active&gt;</span>{"\n"}
      <span className="c-tag">&lt;protocol&gt;</span>http<span className="c-tag">&lt;/protocol&gt;</span>{"\n"}
      <span className="c-tag">&lt;host&gt;</span>proxy.company.com<span className="c-tag">&lt;/host&gt;</span>{"\n"}
      <span className="c-tag">&lt;port&gt;</span>8080<span className="c-tag">&lt;/port&gt;</span>{"\n"}
      <span className="c-tag">&lt;nonProxyHosts&gt;</span>localhost|*.company.com<span className="c-tag">&lt;/nonProxyHosts&gt;</span>{"\n"}
    <span className="c-tag">&lt;/proxy&gt;</span>{"\n"}
  <span className="c-tag">&lt;/proxies&gt;</span>{"\n\n"}

<span className="c-tag">&lt;/settings&gt;</span>
          </div>
        </div>

        {/* NEXUS MIRROR */}
        <div id="s12p7">
          <div className="pt"><span className="pt-badge">Corporate Repos</span>Maven Central vs Nexus / Artifactory</div>
          <p className="body-text">
            In a company environment, you <strong>never hit Maven Central directly</strong>. A corporate artifact repository (Nexus or Artifactory) sits between your developers and Maven Central. It acts as a proxy, a cache, and a private registry for your internal artifacts.
          </p>
          <div className="feat-grid">
            {[
              ["Proxy & Cache",        "Nexus/Artifactory fetches from Central on first request, then caches locally. Your team hits the fast internal server — not the public internet."],
              ["Air-gapped builds",    "Once cached, builds work even when Central is down or your internet is cut. Critical for production deployments."],
              ["Internal artifacts",   "Your published JARs live here — other teams depend on them without needing Central. deploy phase uploads to Nexus."],
              ["Security scanning",    "Nexus/Artifactory can scan every artifact for CVEs before allowing use. Block vulnerable libraries at the gateway."],
              ["Access control",       "Control which teams can access which artifacts. Separate repositories for releases, snapshots, and third-party libs."],
              ["Bandwidth savings",    "One download from Central, cached for 100 developers — not 100 individual downloads. Significant in large teams."],
            ].map(([t,d])=>(
              <div key={t} className="feat-card" style={{alignItems:"flex-start"}}>
                <span style={{color:"#e67e22",fontSize:"0.9rem",flexShrink:0,marginTop:"1px"}}>&#9654;</span>
                <div><strong>{t}</strong><span>{d}</span></div>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm">&lt;!-- distributionManagement in pom.xml — where to deploy --&gt;</span>{"\n"}
<span className="c-tag">&lt;distributionManagement&gt;</span>{"\n"}
  <span className="c-tag">&lt;repository&gt;</span>{"\n"}
    <span className="c-tag">&lt;id&gt;</span>nexus-releases<span className="c-tag">&lt;/id&gt;</span>{"\n"}
    <span className="c-tag">&lt;url&gt;</span>https://nexus.company.com/repository/maven-releases/<span className="c-tag">&lt;/url&gt;</span>{"\n"}
  <span className="c-tag">&lt;/repository&gt;</span>{"\n"}
  <span className="c-tag">&lt;snapshotRepository&gt;</span>{"\n"}
    <span className="c-tag">&lt;id&gt;</span>nexus-snapshots<span className="c-tag">&lt;/id&gt;</span>{"\n"}
    <span className="c-tag">&lt;url&gt;</span>https://nexus.company.com/repository/maven-snapshots/<span className="c-tag">&lt;/url&gt;</span>{"\n"}
  <span className="c-tag">&lt;/snapshotRepository&gt;</span>{"\n"}
<span className="c-tag">&lt;/distributionManagement&gt;</span>{"\n\n"}
<span className="c-cm"># Then deploy with:</span>{"\n"}
mvn clean deploy   <span className="c-cm">  # uploads JAR + POM to Nexus</span>
          </div>
        </div>

        {/* MULTI-MODULE */}
        <div id="s12p8">
          <div className="pt"><span className="pt-badge">Multi-Module</span>Multi-Module Maven Projects</div>
          <p className="body-text">
            A <strong>multi-module project</strong> splits a large application into separate Maven modules, each with its own <code>pom.xml</code>. A <strong>parent POM</strong> sits at the root, lists all modules, and coordinates the build. One <code>mvn install</code> from the root builds every module in the correct dependency order.
          </p>
          <div className="ex-box">
            <div className="ex-label">&#128200; Real-World Multi-Module Example</div>
            <p>A typical microservice has: <strong>core</strong> (domain models + utilities), <strong>data</strong> (database access layer), <strong>service</strong> (business logic), <strong>web</strong> (REST API / controllers). Each is a Maven module. <code>web</code> depends on <code>service</code>, which depends on <code>data</code>, which depends on <code>core</code>. Maven resolves the build order automatically.</p>
          </div>

          <div className="sub-h">Setting Up a Multi-Module Project</div>
          <div className="workflow">
            {multiModuleItems.map(s=>(
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* PARENT POM */}
        <div id="s12p9">
          <div className="pt"><span className="pt-badge">Parent POM</span>Writing the Parent pom.xml</div>
          <div className="cb">
<span className="c-cm">&lt;!-- my-app/pom.xml — THE PARENT --&gt;</span>{"\n"}
<span className="c-tag">&lt;project&gt;</span>{"\n"}
  <span className="c-tag">&lt;modelVersion&gt;</span>4.0.0<span className="c-tag">&lt;/modelVersion&gt;</span>{"\n\n"}
  <span className="c-tag">&lt;groupId&gt;</span>com.mycompany<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
  <span className="c-tag">&lt;artifactId&gt;</span>my-app<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
  <span className="c-tag">&lt;version&gt;</span>1.0.0-SNAPSHOT<span className="c-tag">&lt;/version&gt;</span>{"\n"}
  <span className="c-tag">&lt;packaging&gt;</span><span className="c-hi">pom</span><span className="c-tag">&lt;/packaging&gt;</span>   <span className="c-cm">&lt;!-- MUST be pom for a parent --&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- List all child modules --&gt;</span>{"\n"}
  <span className="c-tag">&lt;modules&gt;</span>{"\n"}
    <span className="c-tag">&lt;module&gt;</span>core<span className="c-tag">&lt;/module&gt;</span>{"\n"}
    <span className="c-tag">&lt;module&gt;</span>data<span className="c-tag">&lt;/module&gt;</span>{"\n"}
    <span className="c-tag">&lt;module&gt;</span>service<span className="c-tag">&lt;/module&gt;</span>{"\n"}
    <span className="c-tag">&lt;module&gt;</span>web<span className="c-tag">&lt;/module&gt;</span>{"\n"}
  <span className="c-tag">&lt;/modules&gt;</span>{"\n\n"}

  <span className="c-tag">&lt;properties&gt;</span>{"\n"}
    <span className="c-tag">&lt;java.version&gt;</span>17<span className="c-tag">&lt;/java.version&gt;</span>{"\n"}
    <span className="c-tag">&lt;spring.version&gt;</span>3.2.0<span className="c-tag">&lt;/spring.version&gt;</span>   <span className="c-cm">&lt;!-- one place to update --&gt;</span>{"\n"}
    <span className="c-tag">&lt;junit.version&gt;</span>5.10.1<span className="c-tag">&lt;/junit.version&gt;</span>{"\n"}
  <span className="c-tag">&lt;/properties&gt;</span>{"\n\n"}

  <span className="c-tag">&lt;build&gt;</span>{"\n"}
    <span className="c-tag">&lt;pluginManagement&gt;</span>   <span className="c-cm">&lt;!-- applies to all child modules --&gt;</span>{"\n"}
      <span className="c-tag">&lt;plugins&gt;</span>{"\n"}
        <span className="c-tag">&lt;plugin&gt;</span>{"\n"}
          <span className="c-tag">&lt;artifactId&gt;</span>maven-compiler-plugin<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
          <span className="c-tag">&lt;configuration&gt;</span>{"\n"}
            <span className="c-tag">&lt;source&gt;</span>${"{java.version}"}<span className="c-tag">&lt;/source&gt;</span>{"\n"}
            <span className="c-tag">&lt;target&gt;</span>${"{java.version}"}<span className="c-tag">&lt;/target&gt;</span>{"\n"}
          <span className="c-tag">&lt;/configuration&gt;</span>{"\n"}
        <span className="c-tag">&lt;/plugin&gt;</span>{"\n"}
      <span className="c-tag">&lt;/plugins&gt;</span>{"\n"}
    <span className="c-tag">&lt;/pluginManagement&gt;</span>{"\n"}
  <span className="c-tag">&lt;/build&gt;</span>{"\n\n"}
<span className="c-tag">&lt;/project&gt;</span>
          </div>

          <div className="sub-h">Child Module pom.xml</div>
          <div className="cb">
<span className="c-cm">&lt;!-- my-app/web/pom.xml — A CHILD MODULE --&gt;</span>{"\n"}
<span className="c-tag">&lt;project&gt;</span>{"\n"}
  <span className="c-tag">&lt;modelVersion&gt;</span>4.0.0<span className="c-tag">&lt;/modelVersion&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- Declare the parent --&gt;</span>{"\n"}
  <span className="c-tag">&lt;parent&gt;</span>{"\n"}
    <span className="c-tag">&lt;groupId&gt;</span>com.mycompany<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
    <span className="c-tag">&lt;artifactId&gt;</span>my-app<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
    <span className="c-tag">&lt;version&gt;</span>1.0.0-SNAPSHOT<span className="c-tag">&lt;/version&gt;</span>{"\n"}
    <span className="c-tag">&lt;relativePath&gt;</span>../pom.xml<span className="c-tag">&lt;/relativePath&gt;</span>{"\n"}
  <span className="c-tag">&lt;/parent&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- Only artifactId needed — groupId and version inherited --&gt;</span>{"\n"}
  <span className="c-tag">&lt;artifactId&gt;</span>web<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
  <span className="c-tag">&lt;packaging&gt;</span>war<span className="c-tag">&lt;/packaging&gt;</span>{"\n\n"}

  <span className="c-tag">&lt;dependencies&gt;</span>{"\n"}
    <span className="c-cm">&lt;!-- Depend on another module in the same project --&gt;</span>{"\n"}
    <span className="c-tag">&lt;dependency&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>com.mycompany<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>service<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
      <span className="c-tag">&lt;version&gt;</span>${"{project.version}"}<span className="c-tag">&lt;/version&gt;</span>  <span className="c-cm">&lt;!-- inherits parent version --&gt;</span>{"\n"}
    <span className="c-tag">&lt;/dependency&gt;</span>{"\n"}
  <span className="c-tag">&lt;/dependencies&gt;</span>{"\n\n"}
<span className="c-tag">&lt;/project&gt;</span>
          </div>
        </div>

        {/* DEPENDENCY MANAGEMENT */}
        <div id="s12p10">
          <div className="pt"><span className="pt-badge">Version Control</span>dependencyManagement — Centralise All Versions</div>
          <p className="body-text">
            <code>&lt;dependencyManagement&gt;</code> in the parent POM is the mechanism for governing dependency versions across all child modules. It <em>does not add</em> a dependency to any module &mdash; it only declares the version. Child modules then declare the dependency without a version tag, inheriting it from the parent.
          </p>
          <div className="cb">
<span className="c-cm">&lt;!-- Parent pom.xml — dependencyManagement block --&gt;</span>{"\n"}
<span className="c-tag">&lt;dependencyManagement&gt;</span>{"\n"}
  <span className="c-tag">&lt;dependencies&gt;</span>{"\n\n"}

    <span className="c-cm">&lt;!-- Spring Boot BOM — imports ALL Spring Boot version decisions at once --&gt;</span>{"\n"}
    <span className="c-tag">&lt;dependency&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>org.springframework.boot<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>spring-boot-dependencies<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
      <span className="c-tag">&lt;version&gt;</span>${"{spring.version}"}<span className="c-tag">&lt;/version&gt;</span>{"\n"}
      <span className="c-tag">&lt;type&gt;</span>pom<span className="c-tag">&lt;/type&gt;</span>{"\n"}
      <span className="c-tag">&lt;scope&gt;</span>import<span className="c-tag">&lt;/scope&gt;</span>{"\n"}
    <span className="c-tag">&lt;/dependency&gt;</span>{"\n\n"}

    <span className="c-cm">&lt;!-- Individual version declarations --&gt;</span>{"\n"}
    <span className="c-tag">&lt;dependency&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>org.junit.jupiter<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>junit-jupiter<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
      <span className="c-tag">&lt;version&gt;</span>${"{junit.version}"}<span className="c-tag">&lt;/version&gt;</span>{"\n"}
    <span className="c-tag">&lt;/dependency&gt;</span>{"\n\n"}
  <span className="c-tag">&lt;/dependencies&gt;</span>{"\n"}
<span className="c-tag">&lt;/dependencyManagement&gt;</span>{"\n\n"}

<span className="c-cm">&lt;!-- Child module pom.xml — NO version needed, inherited from parent --&gt;</span>{"\n"}
<span className="c-tag">&lt;dependencies&gt;</span>{"\n"}
  <span className="c-tag">&lt;dependency&gt;</span>{"\n"}
    <span className="c-tag">&lt;groupId&gt;</span>org.junit.jupiter<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
    <span className="c-tag">&lt;artifactId&gt;</span>junit-jupiter<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
    <span className="c-cm">&lt;!-- No &lt;version&gt; — inherited from parent dependencyManagement --&gt;</span>{"\n"}
    <span className="c-tag">&lt;scope&gt;</span>test<span className="c-tag">&lt;/scope&gt;</span>{"\n"}
  <span className="c-tag">&lt;/dependency&gt;</span>{"\n"}
<span className="c-tag">&lt;/dependencies&gt;</span>
          </div>
          <div className="tip-box">
            <h4>&#128161; dependencyManagement vs dependencies</h4>
            <ul>
              <li><strong>dependencyManagement</strong> — declares version and default scope. Does NOT add to classpath. Children must still declare the dependency but without a version.</li>
              <li><strong>dependencies</strong> — actually adds the artifact to the classpath for this module.</li>
              <li><strong>BOM import</strong> (scope=import, type=pom) — imports an entire bill of materials. Spring Boot BOM covers 300+ libraries at tested-compatible versions. Declare it once in the parent, get safe versions for everything.</li>
              <li><strong>Update all modules</strong> by changing one version in the parent properties — all children pick it up automatically.</li>
            </ul>
          </div>
        </div>

        {/* LAB */}
        <div id="s12p11">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 — Explore the Default Lifecycle</h4>
            <ol className="lab-ol">
              <li>Take your project from Session 11. Run <code>mvn compile</code> — note which phases execute and what output appears in <code>target/classes/</code></li>
              <li>Run <code>mvn test</code> — observe the compile phase runs first, then test-compile, then tests. Note the surefire output.</li>
              <li>Run <code>mvn package</code> — confirm all phases through 17 ran. Locate the JAR in <code>target/</code></li>
              <li>Run <code>mvn install</code> — verify the JAR is now in <code>~/.m2/repository/com/training/my-first-app/</code></li>
              <li>Run <code>mvn clean</code> — verify <code>target/</code> is deleted. Run <code>mvn package</code> again — confirms clean build.</li>
            </ol>

            <h4>Lab 2 — Explore the Local Repository</h4>
            <ol className="lab-ol">
              <li>Run <code>du -sh ~/.m2/repository/</code> — note the current cache size</li>
              <li>Navigate to <code>~/.m2/repository/org/junit/jupiter/junit-jupiter/5.10.1/</code> — list all files (JAR, POM, SHA1)</li>
              <li>Delete just one JAR: <code>rm ~/.m2/repository/org/junit/jupiter/junit-jupiter/5.10.1/*.jar</code></li>
              <li>Run <code>mvn test</code> — Maven detects the missing JAR and re-downloads it. Watch the download in the output.</li>
              <li>Run <code>mvn package -o</code> (offline mode) — verify it still works because the cache is warm</li>
            </ol>

            <h4>Lab 3 — Create a Multi-Module Project</h4>
            <ol className="lab-ol">
              <li>Create directory structure: <code>multi-app/</code> with child directories <code>core/</code> and <code>web/</code></li>
              <li>Write <code>multi-app/pom.xml</code> with <code>&lt;packaging&gt;pom&lt;/packaging&gt;</code> and <code>&lt;modules&gt;</code> listing core and web</li>
              <li>Write <code>multi-app/core/pom.xml</code> declaring the parent and <code>&lt;artifactId&gt;core&lt;/artifactId&gt;</code>. Add a simple Java class.</li>
              <li>Write <code>multi-app/web/pom.xml</code> declaring the parent and a dependency on <code>core</code></li>
              <li>From <code>multi-app/</code>, run <code>mvn clean install</code> — verify both modules build in order: core first, then web</li>
              <li>Check <code>~/.m2/repository/</code> — confirm both <code>multi-app-core</code> and <code>multi-app-web</code> artifacts were installed</li>
            </ol>

            <h4>Lab 4 — dependencyManagement</h4>
            <ol className="lab-ol">
              <li>Add <code>&lt;dependencyManagement&gt;</code> to your parent POM declaring JUnit 5.10.1</li>
              <li>In the core child module, declare the JUnit dependency WITHOUT a version tag</li>
              <li>Run <code>mvn help:effective-pom -pl core</code> — find the resolved JUnit version in the output. Confirm it matches the parent declaration.</li>
              <li>Change the JUnit version in the parent to <code>5.9.0</code> — run <code>mvn verify</code> and confirm all modules picked up the change</li>
            </ol>

            <h4>Challenge — settings.xml Mirror</h4>
            <ol className="lab-ol">
              <li>Create <code>~/.m2/settings.xml</code> with a mirror pointing to a non-existent URL: <code>http://fake-nexus/repository/</code></li>
              <li>Delete your local cache: <code>rm -rf ~/.m2/repository/org/junit</code></li>
              <li>Run <code>mvn test</code> — observe the connection failure and error message</li>
              <li>Remove the broken mirror from settings.xml and run again — confirm Maven falls back to Central and succeeds</li>
              <li>This demonstrates exactly what happens when a corporate Nexus server goes down</li>
            </ol>
          </div>
        </div>

        {/* QUIZ */}
        <div id="s12p12" className="quiz-box">
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
        <div id="s12p13" className="hw-box">
          <h3>&#128221; Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Lifecycle Mastery:</h4>
            <ul>
              <li>Without looking at notes, list all 23 phases of the default lifecycle in order with a one-sentence description of each</li>
              <li>Draw a diagram showing the three lifecycles and which phases in the default lifecycle are most commonly invoked by CI pipelines</li>
              <li>Explain: why does <code>mvn package</code> run tests even though you didn&apos;t ask for them?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Multi-Module Project:</h4>
            <ul>
              <li>Build a 3-module project: <code>model</code> (POJOs), <code>service</code> (business logic depending on model), <code>app</code> (main class depending on service)</li>
              <li>Parent POM must use <code>&lt;dependencyManagement&gt;</code> for all third-party dependency versions</li>
              <li>Run <code>mvn clean install</code> from root — screenshot showing all three modules building and installing successfully</li>
              <li>Run <code>mvn dependency:tree -pl app</code> — confirm it shows the transitive dependency chain: app → service → model</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Repository Investigation:</h4>
            <ul>
              <li>Find the exact path in <code>~/.m2/repository</code> where Spring Boot 3.2.0 is cached</li>
              <li>List all files in that directory and explain what each file type (.jar, .pom, .sha1) is used for</li>
              <li>Run a build, then disconnect from the internet and run <code>mvn package -o</code> — document whether it succeeds and why</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Module 4 Capstone:</h4>
            <ul>
              <li>Create a complete Maven project integrating Sessions 11 and 12: multi-module structure, parent POM with dependencyManagement, Spring Boot Starter Web dependency, JUnit 5 tests, Java 17 compiler config</li>
              <li>Build it with Jenkins (from Session 8) — create a Pipeline job that runs <code>mvn clean package</code> and archives the JAR</li>
              <li>Document the full Maven configuration with comments explaining every section of every pom.xml</li>
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
          <span className="fp">validate</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">compile</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">test</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">package</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">install</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">&#9989; deploy</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; Maven Golden Rules — Module 4 Complete</h4>
          <ul>
            <li>Run <code>mvn clean package</code> (not just <code>mvn package</code>) in CI — prevents stale output from previous builds contaminating results</li>
            <li>Use a parent POM with <code>&lt;dependencyManagement&gt;</code> in any multi-module project — never repeat version numbers across child POMs</li>
            <li>Use <code>mvn install</code> only for local inter-module dependencies — use <code>mvn deploy</code> to share artifacts with the team</li>
            <li>Never use <code>-DskipTests</code> in production CI pipelines — tests exist to catch regressions before they reach users</li>
            <li>Cache <code>~/.m2/repository</code> on CI agents — a warm cache cuts pipeline time from minutes to seconds</li>
            <li>Run <code>mvn versions:display-dependency-updates</code> monthly — track outdated and potentially vulnerable dependencies</li>
          </ul>
        </div>

        {/* MODULE COMPLETE */}
        <div className="complete-card">
          <h2>&#127381; Module 4 Complete!</h2>
          <span className="sub">Build Tool — Maven — Sessions 11 &amp; 12</span>
          <p>You can now declare dependencies, build JARs, run tests, manage versions across multi-module projects, and integrate Maven into Jenkins pipelines — the complete Java build skillset.</p>
          <div className="complete-pills">
            {["Maven Install","JAVA_HOME","pom.xml","groupId / artifactId","SNAPSHOT vs Release","compile scope","test scope","provided scope","mvn package","mvn install","mvn deploy","23 Phases","clean lifecycle","Local .m2 Repo","Maven Central","settings.xml","Nexus Mirror","Multi-Module","Parent POM","dependencyManagement"].map(t=>(
              <span key={t} className="cpill">&#10003; {t}</span>
            ))}
          </div>
          <div className="complete-links">
            <Link href="/courses/dev/session11" className="c-btn-secondary">&larr; Session 11</Link>
            <Link href="/courses/dev/session13" className="c-btn-primary">Module 5: Docker &rarr;</Link>
          </div>
        </div>

      </div>
    </>
  );
}