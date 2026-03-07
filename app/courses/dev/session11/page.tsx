// app/courses/dev/session11/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Explain what Maven is, what problems it solves, and why it is the standard Java build tool",
  "Install Maven on Linux (Ubuntu) and Windows and verify the installation",
  "Understand Maven's build requirements: JDK, JAVA_HOME, and PATH configuration",
  "Describe Maven's project structure convention and why convention over configuration matters",
  "Read and write a complete pom.xml file from scratch",
  "Understand the four core POM coordinates: groupId, artifactId, version, and packaging",
  "Use SNAPSHOT vs RELEASE versioning correctly and know when to use each",
  "Declare and resolve Maven dependencies — direct and transitive",
  "Understand what Maven Plugins are and how they bind to lifecycle phases",
  "Run your first Maven build and read the console output confidently",
];

const whyMaven = [
  ["Dependency management",   "Declare what libraries you need — Maven downloads them automatically from the Central Repository. No more manual JAR hunting and copying."],
  ["Consistent project structure", "Every Maven project looks the same: src/main/java, src/test/java, target/. Any developer can pick up any Maven project and know where everything is."],
  ["Standard build lifecycle", "compile → test → package → install → deploy. Run one command and Maven knows exactly what steps to execute in what order."],
  ["Plugin ecosystem",         "Hundreds of plugins for compiling, testing, code quality, deployment, documentation — all configured the same way in pom.xml."],
  ["Reproducible builds",      "pom.xml is a complete declaration of your build. Any machine, any developer, any CI server gets the same result from the same pom.xml."],
  ["Transitive dependencies",  "If library A depends on library B, Maven fetches B automatically. You never need to manually trace the full dependency tree."],
];

const installStepsLinux = [
  { n:"1", t:"Verify Java is installed",            b:"Maven requires a JDK (not just JRE). Run: java -version. You need JDK 8, 11, or 17. Install if missing: sudo apt update && sudo apt install -y openjdk-17-jdk" },
  { n:"2", t:"Set JAVA_HOME",                        b:"echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc && source ~/.bashrc. Verify: echo $JAVA_HOME — must print the path, not empty." },
  { n:"3", t:"Download Maven",                       b:"Visit maven.apache.org/download.cgi — copy the link for the latest binary zip (e.g. apache-maven-3.9.x-bin.tar.gz). Or: wget https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz" },
  { n:"4", t:"Extract and move",                     b:"tar -xzf apache-maven-3.9.6-bin.tar.gz && sudo mv apache-maven-3.9.6 /opt/maven" },
  { n:"5", t:"Set MAVEN_HOME and PATH",              b:"echo 'export MAVEN_HOME=/opt/maven' >> ~/.bashrc && echo 'export PATH=$PATH:$MAVEN_HOME/bin' >> ~/.bashrc && source ~/.bashrc" },
  { n:"6", t:"Verify installation",                  b:"mvn -version — should print: Apache Maven 3.9.x, Java version 17.x, OS name: Linux. If you see 'command not found', PATH was not set correctly — check step 5." },
];

const installStepsWindows = [
  { n:"1", t:"Install JDK",                          b:"Download JDK 17 from adoptium.net. Run the installer. Note the install path (e.g. C:\\Program Files\\Eclipse Adoptium\\jdk-17)." },
  { n:"2", t:"Set JAVA_HOME",                        b:"System Properties → Environment Variables → System variables → New: Variable name: JAVA_HOME, Variable value: C:\\Program Files\\Eclipse Adoptium\\jdk-17" },
  { n:"3", t:"Download Maven zip",                   b:"maven.apache.org/download.cgi → apache-maven-3.9.x-bin.zip. Extract to C:\\maven (keep the path short — no spaces)." },
  { n:"4", t:"Set MAVEN_HOME",                       b:"Environment Variables → System variables → New: Variable name: MAVEN_HOME, Variable value: C:\\maven\\apache-maven-3.9.x" },
  { n:"5", t:"Add to PATH",                          b:"Environment Variables → System variables → Path → Edit → New → %MAVEN_HOME%\\bin. Click OK on all dialogs." },
  { n:"6", t:"Open new CMD and verify",              b:"Open a new Command Prompt (required for PATH changes to apply). Run: mvn -version. Output should show Apache Maven 3.9.x and the JDK version." },
];

const projectStructure = [
  ["my-app/",                   "Project root — contains pom.xml and all source directories"],
  ["  pom.xml",                 "The Project Object Model — complete build descriptor. Maven reads this file first."],
  ["  src/",                    "All source code and resources — never put source outside src/"],
  ["    main/",                 "Production code and resources"],
  ["      java/",               "Java source files (.java) — package directories mirror package names"],
  ["      resources/",          "Non-Java files compiled into the JAR: application.properties, log4j.xml, SQL scripts"],
  ["    test/",                 "Test code — compiled and run separately, never included in the final JAR"],
  ["      java/",               "JUnit test classes (.java)"],
  ["      resources/",          "Test-only config files, test fixtures, mock data"],
  ["  target/",                 "Maven output directory — generated automatically. Contains .class files, JARs, test reports. NEVER commit to Git."],
  ["  target/classes/",         "Compiled .class files from src/main/java"],
  ["  target/test-classes/",    "Compiled .class files from src/test/java"],
  ["  target/surefire-reports/","JUnit XML test result files — parsed by Jenkins JUnit plugin"],
  ["  target/my-app-1.0.jar",   "The packaged application JAR — produced by mvn package"],
];

const pomCoordinates = [
  {
    coord: "groupId",
    type: "String",
    example: "com.mycompany.projectname",
    desc: "Uniquely identifies your organisation or project group. Convention: reverse domain name. All projects under the same organisation share the same groupId. Think of it as the top-level namespace.",
    rules: ["Use lowercase only", "Reverse domain name: com.google, org.apache, io.github.username", "No underscores — use dots: com.my.company not com_my_company"],
  },
  {
    coord: "artifactId",
    type: "String",
    example: "hello-service",
    desc: "The name of this specific artifact (JAR/WAR/POM). Must be unique within the groupId. This becomes the filename of the produced JAR: artifactId-version.jar.",
    rules: ["Lowercase, hyphen-separated: my-web-app", "No version number in the artifactId — version is a separate field", "Short but descriptive: user-service, payment-gateway, config-server"],
  },
  {
    coord: "version",
    type: "String",
    example: "1.0.0-SNAPSHOT",
    desc: "The version of this artifact. Maven uses semantic versioning (MAJOR.MINOR.PATCH). Append -SNAPSHOT for in-development versions; remove it for releases. See the SNAPSHOT section below.",
    rules: ["Semantic versioning: 1.0.0, 2.3.1, 0.5.0-beta", "Development: append -SNAPSHOT (1.0.0-SNAPSHOT)", "Release: remove -SNAPSHOT (1.0.0)", "Never release a SNAPSHOT to production"],
  },
  {
    coord: "packaging",
    type: "jar | war | pom",
    example: "jar",
    desc: "The type of artifact to produce. jar is the default (standalone applications, libraries). war for web applications deployed to Tomcat/JBoss. pom for parent/aggregator projects that contain no source code.",
    rules: ["Default is jar — omit the tag for simple apps", "war: web apps deployed to a servlet container", "pom: parent project coordinating child modules"],
  },
];

const snapshotVsRelease = [
  ["SNAPSHOT (1.0.0-SNAPSHOT)", "Development",  "Mutable — Maven always re-downloads to get the latest version. Use during active development when the code changes frequently. Every mvn install on the same version can produce a different JAR.", "#e67e22"],
  ["RELEASE (1.0.0)",           "Production",   "Immutable — once published, a release version never changes. Maven caches it locally forever. Use when the code is stable and tested. A release 1.0.0 today is identical to 1.0.0 in two years.", "#27ae60"],
];

const dependencyScope = [
  ["compile",  "Default. Available at compile time, test time, and packaged in the final JAR/WAR. Use for core libraries like Spring, Guava."],
  ["test",     "Only available during compilation and execution of tests. Not included in the final JAR. Use for JUnit, Mockito, AssertJ — you don't ship test libraries."],
  ["provided", "Available at compile and test time but NOT packaged — the deployment environment provides it. Use for javax.servlet-api: Tomcat provides it at runtime."],
  ["runtime",  "Not needed for compilation but needed at runtime. Packaged in the final artifact. Use for JDBC drivers — you compile against the interface, the driver is only needed to run."],
  ["import",   "Only for POM dependencies in dependencyManagement. Imports the full dependency list from another BOM (Bill of Materials) — e.g. Spring Boot parent BOM."],
];

const corePlugins = [
  ["maven-compiler-plugin",  "Compiles Java source files. Default, but you configure it to set Java source/target version. Almost every project overrides this to set Java 11 or 17."],
  ["maven-surefire-plugin",  "Runs JUnit unit tests during the test phase. Generates XML result files in target/surefire-reports/ — read by Jenkins JUnit plugin."],
  ["maven-jar-plugin",       "Packages compiled classes into a JAR. Default behaviour. Configure to set the Main-Class manifest attribute for executable JARs."],
  ["maven-war-plugin",       "Packages the project into a WAR file for deployment to Tomcat/JBoss. Only used when packaging is set to war."],
  ["maven-install-plugin",   "Installs the built artifact into the local .m2 repository so other local projects can depend on it."],
  ["maven-deploy-plugin",    "Deploys the artifact to a remote repository (Nexus, Artifactory) for the team to use."],
  ["maven-clean-plugin",     "Deletes the target/ directory. Runs during the clean lifecycle phase (mvn clean)."],
  ["maven-dependency-plugin","Analyse dependency tree, copy JARs, list unused dependencies. Use: mvn dependency:tree to see the full resolved tree."],
];

const quizData = [
  { q: "What is the purpose of Maven and what key problem does it solve?",
    a: "Maven is a build automation tool for Java projects. It solves dependency management (auto-downloading JARs), provides a standard project structure, and defines a consistent build lifecycle so any Maven project can be built the same way on any machine." },
  { q: "What are the four POM coordinates and what does each identify?",
    a: "groupId: the organisation/project namespace (reverse domain). artifactId: the specific module name. version: the version of this artifact. packaging: the output type (jar, war, pom). Together they uniquely identify any artifact in any repository." },
  { q: "What is the difference between a SNAPSHOT version and a RELEASE version?",
    a: "SNAPSHOT (1.0.0-SNAPSHOT) is mutable — Maven re-downloads it on every build to get the latest. Use during development. RELEASE (1.0.0) is immutable — once published it never changes. Use for stable, tested versions deployed to production." },
  { q: "What is the Maven project directory structure and what goes in each main folder?",
    a: "src/main/java: production Java source. src/main/resources: non-Java files (config, SQL). src/test/java: JUnit test classes. src/test/resources: test config. target/: all generated output — never commit this to Git." },
  { q: "What is the difference between compile and test dependency scope?",
    a: "compile scope: available at compile time, test time, and packaged in the final JAR. test scope: only available during test compilation and execution — NOT included in the final JAR. Use test scope for JUnit, Mockito etc." },
  { q: "What is JAVA_HOME and why does Maven need it?",
    a: "JAVA_HOME is an environment variable pointing to the JDK installation directory. Maven uses it to find the Java compiler (javac) and runtime. If JAVA_HOME is not set or points to a JRE instead of a JDK, Maven cannot compile source code." },
  { q: "What does the maven-surefire-plugin do and why is it important for Jenkins?",
    a: "maven-surefire-plugin runs JUnit tests during the test phase and generates XML result files in target/surefire-reports/. Jenkins' JUnit plugin parses these XML files to display test pass/fail counts and trend graphs." },
  { q: "What are transitive dependencies and why are they significant?",
    a: "If your project depends on library A, and A depends on library B, then B is a transitive dependency — Maven downloads it automatically without you needing to declare it. This means declaring 1 dependency can pull in 10+ JARs. Use mvn dependency:tree to see the full resolved list." },
];

const takeaways = [
  ["Maven",           "Build tool — dependency management + standard lifecycle"],
  ["pom.xml",         "Complete build descriptor — everything Maven needs"],
  ["groupId",         "Organisation namespace — reverse domain convention"],
  ["artifactId",      "Module name — becomes the JAR filename"],
  ["SNAPSHOT",        "Mutable dev version — re-downloaded every build"],
  ["RELEASE",         "Immutable stable version — cached forever"],
  ["scope",           "compile / test / provided / runtime — controls packaging"],
  ["Plugins",         "Bound to lifecycle phases — compile, test, package, deploy"],
];

export default function Session11() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s11-page {
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

        /* ── Hero ── */
        .hero { border-radius:20px; background:linear-gradient(135deg,#3d1a00 0%,#c0392b 30%,#e67e22 70%,#f39c12 100%); padding:2.5rem 2rem; margin-bottom:2rem; position:relative; overflow:hidden; }
        .hero::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px); background-size:22px 22px; }
        .hero-meta { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; flex-wrap:wrap; position:relative; }
        .h-badge { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#fff; padding:0.3rem 0.75rem; border-radius:100px; }
        .h-mod   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.08em; text-transform:uppercase; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); color:rgba(255,255,255,0.8); padding:0.3rem 0.75rem; border-radius:100px; }
        .h-dur   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:rgba(255,255,255,0.6); display:flex; align-items:center; gap:0.35rem; }
        .hero h1 { font-size:clamp(1.5rem,3.5vw,2.2rem); font-weight:800; color:#fff; letter-spacing:-0.03em; line-height:1.15; position:relative; margin-bottom:0.75rem; }
        .hero p  { color:rgba(255,255,255,0.75); font-size:0.95rem; line-height:1.65; max-width:620px; position:relative; }

        /* ── Jump nav ── */
        .jump-nav { display:flex; gap:0.4rem; margin-bottom:2.5rem; flex-wrap:wrap; }
        .jpill { font-family:'JetBrains Mono',monospace; font-size:0.6rem; padding:0.3rem 0.8rem; border-radius:100px; border:1px solid var(--border); background:var(--surface2); color:var(--muted); text-decoration:none; letter-spacing:0.06em; transition:all 0.2s; white-space:nowrap; }
        .jpill:hover { color:var(--text); border-color:var(--border2); }
        .jpill.active { background:linear-gradient(135deg,#c0392b,#e67e22); color:#fff; border-color:transparent; }

        /* ── Section title ── */
        .pt { font-size:1.3rem; font-weight:800; letter-spacing:-0.025em; color:var(--text); margin:2.5rem 0 1.25rem; display:flex; align-items:center; gap:0.75rem; }
        .pt::after { content:''; flex:1; height:1px; background:var(--border); }
        .pt-badge { font-family:'JetBrains Mono',monospace; font-size:0.6rem; letter-spacing:0.08em; text-transform:uppercase; background:linear-gradient(135deg,#c0392b,#e67e22); color:#fff; padding:0.2rem 0.65rem; border-radius:100px; flex-shrink:0; }

        /* ── Objectives ── */
        .obj-card { background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); border-radius:16px; padding:1.75rem; margin-bottom:2rem; }
        .obj-card h2 { font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:1.1rem; }
        .obj-list { list-style:none; display:flex; flex-direction:column; gap:0.55rem; }
        .obj-list li { display:flex; align-items:flex-start; gap:0.65rem; font-size:0.9rem; color:rgba(255,255,255,0.92); line-height:1.5; }
        .obj-check { width:18px; height:18px; border-radius:50%; background:rgba(255,215,0,0.2); border:1.5px solid #FFD700; display:flex; align-items:center; justify-content:center; font-size:0.6rem; color:#FFD700; flex-shrink:0; margin-top:2px; }

        /* ── Body text ── */
        .body-text { font-size:0.9rem; color:var(--text2); line-height:1.75; margin-bottom:1rem; }
        .body-text strong { color:var(--text); }
        .body-text code { font-family:'JetBrains Mono',monospace; font-size:0.8rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        .sub-h { font-size:0.95rem; font-weight:700; color:var(--text); margin:1.5rem 0 0.75rem; }

        /* ── Tip / Ex / Warn boxes ── */
        .tip-box { background:rgba(230,126,34,0.07); border-left:3px solid #e67e22; border-radius:0 12px 12px 0; padding:1.1rem 1.25rem; margin:1.1rem 0; }
        .tip-box h4 { font-size:0.82rem; font-weight:700; color:#c0392b; margin-bottom:0.5rem; }
        .tip-box p  { font-size:0.83rem; color:var(--text2); line-height:1.6; margin-bottom:0.4rem; }
        .tip-box ul { list-style:none; padding-left:0; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .tip-box li { font-size:0.82rem; color:var(--text2); line-height:1.5; display:flex; gap:0.45rem; }
        .tip-box li::before { content:'→'; color:#e67e22; flex-shrink:0; font-size:0.75rem; margin-top:1px; }
        .tip-box strong { color:var(--text); }
        .tip-box code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        .ex-box { background:var(--surface2); border-left:3px solid #27ae60; border-radius:0 12px 12px 0; padding:1.1rem 1.25rem; margin:1.1rem 0; }
        .ex-label { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#27ae60; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:0.6rem; font-weight:600; }
        .ex-box p  { font-size:0.84rem; color:var(--text2); line-height:1.65; margin-bottom:0.45rem; }
        .ex-box p:last-child { margin-bottom:0; }
        .ex-box ul { padding-left:1.2rem; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .ex-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; }
        .ex-box li code,.ex-box p code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }
        .ex-box strong { color:var(--text); }

        .warn-box { background:rgba(220,53,69,0.05); border-left:3px solid #dc3545; border-radius:0 12px 12px 0; padding:1.1rem 1.25rem; margin:1.1rem 0; }
        .warn-box h4 { font-size:0.82rem; font-weight:700; color:#dc3545; margin-bottom:0.5rem; }
        .warn-box p  { font-size:0.83rem; color:var(--text2); line-height:1.6; margin-bottom:0.4rem; }
        .warn-box ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .warn-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; display:flex; gap:0.45rem; }
        .warn-box li::before { content:'⚠'; flex-shrink:0; font-size:0.72rem; color:#dc3545; }
        .warn-box strong { color:var(--text); }
        .warn-box code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        /* ── Code block ── */
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

        /* ── Feature grid ── */
        .feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin:1.25rem 0; }
        @media(max-width:560px){ .feat-grid { grid-template-columns:1fr; } }
        .feat-card { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:0.85rem 1rem; display:flex; gap:0.6rem; align-items:flex-start; }
        .feat-icon { color:#e67e22; font-size:0.9rem; flex-shrink:0; margin-top:1px; }
        .feat-card strong { font-size:0.84rem; color:var(--text); display:block; margin-bottom:0.12rem; }
        .feat-card span { font-size:0.78rem; color:var(--text2); line-height:1.45; }

        /* ── Workflow ── */
        .workflow { display:flex; flex-direction:column; gap:0.5rem; margin:1.25rem 0; position:relative; }
        .workflow::before { content:''; position:absolute; left:19px; top:0; bottom:0; width:2px; background:var(--border); z-index:0; }
        .wf-step { display:flex; align-items:flex-start; gap:0.85rem; padding:0.9rem 1rem; border-radius:12px; background:var(--surface); border:1px solid var(--border); position:relative; z-index:1; transition:border-color 0.2s; }
        .wf-step:hover { border-color:var(--border2); }
        .wf-num { width:28px; height:28px; border-radius:8px; background:linear-gradient(135deg,#c0392b,#e67e22); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem; flex-shrink:0; }
        .wf-body { display:flex; flex-direction:column; gap:0.2rem; width:100%; }
        .wf-body strong { font-size:0.88rem; color:var(--text); }
        .wf-body p { font-size:0.8rem; color:var(--text2); line-height:1.5; }
        .wf-body code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        /* ── Project structure tree ── */
        .tree { background:#0d1117; border-radius:12px; padding:1.25rem; font-family:'JetBrains Mono',monospace; font-size:0.73rem; line-height:2; overflow-x:auto; margin:0.75rem 0; border:1px solid rgba(255,255,255,0.06); }
        .tree-row { display:flex; gap:1.5rem; }
        .tree-path { color:#7ee787; min-width:270px; flex-shrink:0; white-space:nowrap; }
        .tree-desc { color:#8b949e; font-size:0.7rem; }

        /* ── Coordinate cards ── */
        .coord-list { display:flex; flex-direction:column; gap:0.9rem; margin:1.25rem 0; }
        .coord-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; overflow:hidden; }
        .coord-header { display:flex; align-items:center; gap:0.75rem; padding:0.85rem 1.1rem; border-bottom:1px solid var(--border); background:var(--surface2); }
        .coord-name { font-family:'JetBrains Mono',monospace; font-size:0.9rem; font-weight:700; color:#e67e22; }
        .coord-type { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:var(--muted); background:var(--surface); border:1px solid var(--border); padding:0.15rem 0.5rem; border-radius:6px; }
        .coord-example { font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#a5d6ff; margin-left:auto; }
        .coord-body { padding:0.85rem 1.1rem; }
        .coord-desc { font-size:0.82rem; color:var(--text2); line-height:1.6; margin-bottom:0.65rem; }
        .coord-rules { list-style:none; display:flex; flex-direction:column; gap:0.28rem; }
        .coord-rules li { font-size:0.77rem; color:var(--text2); display:flex; gap:0.45rem; line-height:1.45; }
        .coord-rules li::before { content:'✓'; color:#e67e22; flex-shrink:0; font-weight:700; font-size:0.72rem; }

        /* ── SNAPSHOT vs Release compare ── */
        .snap-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.85rem; margin:1.25rem 0; }
        @media(max-width:560px){ .snap-grid { grid-template-columns:1fr; } }
        .snap-card { border-radius:14px; padding:1.2rem; border:2px solid; }
        .snap-card h4 { font-family:'JetBrains Mono',monospace; font-size:0.8rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:0.5rem; }
        .snap-card .sc-sub { font-size:0.76rem; font-weight:600; color:var(--text2); margin-bottom:0.65rem; }
        .snap-card p  { font-size:0.79rem; color:var(--text2); line-height:1.55; }

        /* ── Dependency scope table ── */
        .data-table { width:100%; border-collapse:collapse; font-size:0.82rem; margin:1.25rem 0; }
        .data-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.65rem 0.9rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.78rem; }
        .data-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .data-table tbody tr:hover { background:var(--surface); }
        .data-table td { padding:0.6rem 0.9rem; color:var(--text2); vertical-align:top; line-height:1.5; }
        .data-table td:first-child { font-family:'JetBrains Mono',monospace; font-size:0.76rem; font-weight:700; color:#e67e22; width:100px; }

        /* ── Plugin rows ── */
        .plugin-rows { display:flex; flex-direction:column; gap:0.35rem; margin:0.75rem 0; }
        .plugin-row { display:flex; gap:0.75rem; padding:0.65rem 0.9rem; background:var(--surface); border:1px solid var(--border); border-radius:10px; align-items:flex-start; transition:border-color 0.15s; }
        .plugin-row:hover { border-color:var(--border2); }
        .plugin-name { font-family:'JetBrains Mono',monospace; font-size:0.73rem; font-weight:700; color:#e67e22; min-width:210px; flex-shrink:0; }
        .plugin-desc { font-size:0.78rem; color:var(--text2); line-height:1.5; }
        @media(max-width:640px){ .plugin-row { flex-direction:column; gap:0.25rem; } .plugin-name { min-width:unset; } }

        /* ── Lab ── */
        .act-box { background:linear-gradient(135deg,#3d1a00 0%,#c0392b 40%,#e67e22 100%); border-radius:16px; padding:1.75rem; margin:1.5rem 0; }
        .act-box h3 { font-size:1rem; font-weight:700; color:#fff; margin-bottom:1rem; }
        .act-box h4 { font-size:0.85rem; font-weight:700; color:rgba(255,255,255,0.9); margin:1.1rem 0 0.5rem; }
        .lab-ol { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); border-radius:10px; padding:1rem 1rem 1rem 2rem; margin-bottom:0.6rem; display:flex; flex-direction:column; gap:0.4rem; }
        .lab-ol li { font-size:0.83rem; color:rgba(255,255,255,0.88); line-height:1.55; }
        .lab-ol li code { font-family:'JetBrains Mono',monospace; font-size:0.75rem; background:rgba(255,255,255,0.15); padding:0.1rem 0.4rem; border-radius:4px; color:#fff; }
        .lab-ol li strong { color:#fff; }

        /* ── Quiz ── */
        .quiz-box { background:linear-gradient(135deg,rgba(192,57,43,0.08),rgba(230,126,34,0.08)); border:1px solid rgba(230,126,34,0.2); border-radius:16px; padding:1.75rem; margin:1.5rem 0; }
        .quiz-box h3 { font-size:1rem; font-weight:700; color:var(--text); margin-bottom:1.25rem; }
        .quiz-list { list-style:none; display:flex; flex-direction:column; gap:0.75rem; }
        .qi { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:0.9rem 1rem; }
        .qi-n { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#e67e22; letter-spacing:0.08em; margin-bottom:0.3rem; }
        .qi-q { font-size:0.88rem; font-weight:600; color:var(--text); }
        .qi-a { font-size:0.82rem; color:var(--text2); font-style:italic; margin-top:0.4rem; padding-top:0.4rem; border-top:1px solid var(--border); }

        /* ── Homework ── */
        .hw-box { background:rgba(255,193,7,0.06); border:1px solid rgba(255,193,7,0.2); border-radius:14px; padding:1.5rem; margin:1.5rem 0; }
        .hw-box h3 { font-size:0.95rem; font-weight:700; color:var(--text); margin-bottom:1rem; }
        .hw-task { margin-bottom:0.85rem; }
        .hw-task h4 { font-size:0.82rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; }
        .hw-task ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; padding-left:0.5rem; }
        .hw-task li { font-size:0.82rem; color:var(--text2); line-height:1.5; display:flex; gap:0.4rem; }
        .hw-task li::before { content:'•'; color:#F59E0B; flex-shrink:0; }
        .hw-task li code { font-family:'JetBrains Mono',monospace; font-size:0.75rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.35rem; border-radius:4px; color:var(--accent); }

        /* ── Takeaways ── */
        .tk-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:0.65rem; margin:1rem 0; }
        .tk-card { background:var(--surface); border:1px solid var(--border); border-top:3px solid #e67e22; border-radius:12px; padding:0.9rem 1rem; }
        .tk-card h4 { font-size:0.82rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; font-family:'JetBrains Mono',monospace; }
        .tk-card p  { font-size:0.78rem; color:var(--text2); line-height:1.45; }

        /* ── Flow pill ── */
        .flow-pill { display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; justify-content:center; background:var(--surface2); border:1px solid var(--border); border-radius:12px; padding:1rem 1.5rem; margin:1.25rem 0; }
        .fp { font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:700; color:var(--text); background:var(--surface); border:1px solid var(--border); padding:0.45rem 0.9rem; border-radius:8px; }
        .fp-arrow { color:var(--muted); font-size:0.9rem; }

        /* ── Rules box ── */
        .rules-box { background:rgba(230,126,34,0.05); border:1px solid rgba(230,126,34,0.2); border-radius:12px; padding:1.25rem; margin:1.25rem 0; }
        .rules-box h4 { font-size:0.85rem; font-weight:700; color:#c0392b; margin-bottom:0.65rem; }
        .rules-box ul { list-style:none; display:flex; flex-direction:column; gap:0.4rem; }
        .rules-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; display:flex; gap:0.5rem; }
        .rules-box li::before { content:'✓'; color:#e67e22; flex-shrink:0; font-weight:700; }

        /* ── Next card ── */
        .next-card { background:linear-gradient(135deg,#0d2818 0%,#1a5c38 55%,#27ae60 100%); border-radius:16px; padding:1.75rem; margin-top:2rem; display:flex; align-items:center; justify-content:space-between; gap:1.5rem; flex-wrap:wrap; }
        .next-text h4 { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:0.4rem; }
        .next-text h3 { font-size:1.1rem; font-weight:800; color:#fff; margin-bottom:0.5rem; }
        .next-text ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; }
        .next-text li { font-size:0.83rem; color:rgba(255,255,255,0.8); display:flex; gap:0.5rem; }
        .next-text li::before { content:'→'; color:rgba(255,255,255,0.6); flex-shrink:0; }
        .next-btn { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.85rem; font-weight:700; color:#1a5c38; background:#fff; border:none; padding:0.75rem 1.5rem; border-radius:10px; cursor:pointer; text-decoration:none; white-space:nowrap; display:inline-flex; align-items:center; gap:0.5rem; transition:opacity 0.2s,transform 0.2s; }
        .next-btn:hover { opacity:0.9; transform:translateX(3px); }

        @media(max-width:640px){
          .s11-page { padding:2rem 1rem 4rem; }
          .nav-row { flex-direction:column; }
          .nav-btn { width:100%; justify-content:center; }
          .hero { padding:1.5rem 1rem; border-radius:14px; }
          .hero h1 { font-size:1.3rem; }
          .next-card { flex-direction:column; align-items:stretch; }
          .next-btn { width:100%; justify-content:center; }
          .jump-nav { flex-wrap:nowrap; overflow-x:auto; padding-bottom:0.4rem; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
          .jump-nav::-webkit-scrollbar { display:none; }
          .jpill { flex-shrink:0; }
          .act-box { padding:1.25rem 1rem; }
          .lab-ol { padding:0.85rem 0.85rem 0.85rem 1.75rem; }
          .tree-row { flex-direction:column; gap:0; }
          .tree-desc { padding-left:1rem; }
        }
        @media(max-width:400px){ .hero h1 { font-size:1.1rem; } }
      `}</style>

      <div className="s11-page">

        {/* Breadcrumb */}
        <div className="bc">
          <Link href="/">Home</Link><span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link><span className="sep">/</span>
          <span className="cur">Session 11: Maven Fundamentals &amp; POM</span>
        </div>

        {/* Prev / Next */}
        <div className="nav-row">
          <Link href="/courses/dev/session10" className="nav-btn">&larr; Session 10: Security &amp; Plugins</Link>
          <Link href="/courses/dev/session12" className="nav-btn">Session 12: Lifecycle &amp; Repos &rarr;</Link>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 11 of 15</span>
            <span className="h-mod">Module 4 &mdash; Build Tool: Maven</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4 hrs
            </span>
          </div>
          <h1>&#9096; Maven Fundamentals &amp; POM</h1>
          <p>Stop copying JARs manually. Maven declares exactly what your project needs, downloads it automatically, and produces a reproducible build on every machine that runs a single command.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","What is Maven","Why Maven","Install Linux","Install Windows","Project Structure","pom.xml","Coordinates","SNAPSHOT vs Release","Dependencies","Plugins","Lab","Quiz","Homework"].map((l,i)=>(
            <a key={i} href={`#s11p${i}`} className={`jpill${i===0?" active":""}`}>{l}</a>
          ))}
        </div>

        {/* OBJECTIVES */}
        <div id="s11p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o,i)=>(
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* WHAT IS MAVEN */}
        <div id="s11p1">
          <div className="pt"><span className="pt-badge">Foundation</span>What is Maven?</div>
          <p className="body-text">
            <strong>Apache Maven</strong> is a build automation and project management tool used almost universally in Java development. Released in 2004, it is maintained by the Apache Software Foundation and is the default build tool for most enterprise Java, Spring Boot, and Jakarta EE projects.
          </p>
          <p className="body-text">
            At its core, Maven is a <strong>declarative build tool</strong> &mdash; instead of writing scripts that describe <em>how</em> to build (like Ant), you declare <em>what</em> your project is and what it needs. Maven figures out the how. This declaration lives in a single file: <code>pom.xml</code>.
          </p>
          <div className="ex-box">
            <div className="ex-label">&#128161; The Before-Maven Problem</div>
            <p><strong>Before Maven:</strong> You manually download each library JAR, copy it to a lib/ folder, add it to your classpath, hunt down its transitive dependencies, check them into version control (50MB of JARs in Git), repeat for every developer and every CI machine. Different machines end up with different JAR versions — builds break unpredictably.</p>
            <p><strong>With Maven:</strong> Write 5 lines in pom.xml. Run <code>mvn package</code>. Maven downloads every dependency automatically. Every developer, every CI machine, every environment gets the identical result.</p>
          </div>
        </div>

        {/* WHY MAVEN */}
        <div id="s11p2">
          <div className="pt"><span className="pt-badge">Benefits</span>Why Maven?</div>
          <div className="feat-grid">
            {whyMaven.map(([t,d])=>(
              <div key={t} className="feat-card">
                <span className="feat-icon">&#9654;</span>
                <div><strong>{t}</strong><span>{d}</span></div>
              </div>
            ))}
          </div>
          <div className="tip-box">
            <h4>&#128161; Maven vs Ant vs Gradle</h4>
            <ul>
              <li><strong>Ant</strong> &mdash; procedural (you write every step). No dependency management. Completely manual. Older projects only.</li>
              <li><strong>Maven</strong> &mdash; declarative, opinionated, convention-over-configuration. Standard for Java/Spring/Jakarta EE. You learn it once and can work on any Maven project immediately.</li>
              <li><strong>Gradle</strong> &mdash; flexible DSL (Groovy/Kotlin). Faster incremental builds. Standard for Android and modern Spring projects. More powerful but steeper learning curve.</li>
              <li><strong>In this course:</strong> Maven — it is the most widely used in enterprise DevOps pipelines and what Jenkins was originally designed around.</li>
            </ul>
          </div>
        </div>

        {/* INSTALL LINUX */}
        <div id="s11p3">
          <div className="pt"><span className="pt-badge">Install</span>Maven Installation on Linux (Ubuntu)</div>
          <p className="body-text">
            Maven requires a <strong>JDK</strong> — not just a JRE. The Java compiler (<code>javac</code>) must be available. Set <code>JAVA_HOME</code> to the JDK root, not the <code>bin</code> folder inside it.
          </p>
          <div className="workflow">
            {installStepsLinux.map(s=>(
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># Complete install script — copy and run on Ubuntu 22.04+</span>{"\n\n"}
<span className="c-cm"># 1. Install JDK 17</span>{"\n"}
sudo apt update && sudo apt install -y openjdk-17-jdk{"\n\n"}
<span className="c-cm"># 2. Set JAVA_HOME</span>{"\n"}
echo <span className="c-str">'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64'</span> {">> ~/.bashrc"}{"\n"}
echo <span className="c-str">'export PATH=$PATH:$JAVA_HOME/bin'</span> {">> ~/.bashrc"}{"\n\n"}
<span className="c-cm"># 3. Download and install Maven 3.9.6</span>{"\n"}
wget https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz{"\n"}
tar -xzf apache-maven-3.9.6-bin.tar.gz{"\n"}
sudo mv apache-maven-3.9.6 /opt/maven{"\n\n"}
<span className="c-cm"># 4. Set MAVEN_HOME</span>{"\n"}
echo <span className="c-str">'export MAVEN_HOME=/opt/maven'</span> {">> ~/.bashrc"}{"\n"}
echo <span className="c-str">'export PATH=$PATH:$MAVEN_HOME/bin'</span> {">> ~/.bashrc"}{"\n"}
source ~/.bashrc{"\n\n"}
<span className="c-cm"># 5. Verify</span>{"\n"}
mvn -version{"\n"}
<span className="c-ok">Apache Maven 3.9.6 (bc0240f3c744dd6b6ec2920b3cd08dcc295161ae)</span>{"\n"}
<span className="c-ok">Maven home: /opt/maven</span>{"\n"}
<span className="c-ok">Java version: 17.0.9, vendor: Ubuntu, runtime: /usr/lib/jvm/java-17-openjdk-amd64</span>{"\n"}
<span className="c-ok">OS name: "linux", version: "5.15.0", arch: "amd64"</span>
          </div>
          <div className="tip-box">
            <h4>&#128161; Quick Install via apt (Ubuntu)</h4>
            <ul>
              <li>Ubuntu repositories include Maven: <code>sudo apt install -y maven</code> — installs Maven and its JDK dependency automatically</li>
              <li>This is the fastest way for local development but may install an older Maven version</li>
              <li>For CI servers and production environments, install the latest version manually as shown above to ensure a consistent, current version</li>
            </ul>
          </div>
        </div>

        {/* INSTALL WINDOWS */}
        <div id="s11p4">
          <div className="pt"><span className="pt-badge">Install</span>Maven Installation on Windows</div>
          <div className="workflow">
            {installStepsWindows.map(s=>(
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>
          <div className="warn-box">
            <h4>&#9888; Common Windows Installation Mistakes</h4>
            <ul>
              <li><strong>JAVA_HOME points to JRE, not JDK</strong> — Maven needs <code>javac</code>, which only exists in the JDK. Ensure JAVA_HOME ends at the JDK root (e.g. <code>C:\Program Files\Eclipse Adoptium\jdk-17</code>), not the <code>bin</code> subfolder.</li>
              <li><strong>Space in PATH</strong> — <code>C:\Program Files\Maven</code> can cause issues. Install to <code>C:\maven</code> instead.</li>
              <li><strong>Old CMD still open</strong> — Environment variable changes only apply to NEW command prompts. Always open a fresh CMD/PowerShell to verify.</li>
              <li><strong>PATH not saved</strong> — Click OK on all three dialogs (Edit Path → Environment Variables → System Properties) or changes are lost.</li>
            </ul>
          </div>
        </div>

        {/* PROJECT STRUCTURE */}
        <div id="s11p5">
          <div className="pt"><span className="pt-badge">Convention</span>Standard Maven Project Structure</div>
          <p className="body-text">
            Maven enforces a <strong>standard directory layout</strong>. This is the single most important Maven convention: every Maven project on earth looks the same. You never need to configure where source files are &mdash; Maven already knows.
          </p>
          <div className="tree">
            {projectStructure.map(([path,desc])=>(
              <div key={path} className="tree-row">
                <span className="tree-path">{path}</span>
                <span className="tree-desc">{desc}</span>
              </div>
            ))}
          </div>
          <div className="ex-box">
            <div className="ex-label">&#9997; Create a Maven project from scratch</div>
            <p>Use the <strong>archetype:generate</strong> goal to generate a correctly structured project in seconds:</p>
            <ul>
              <li><code>mvn archetype:generate -DgroupId=com.mycompany -DartifactId=hello-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false</code></li>
              <li>Maven generates the full folder structure, a sample <code>App.java</code>, a sample <code>AppTest.java</code>, and a starter <code>pom.xml</code></li>
              <li>Navigate into the folder: <code>cd hello-app</code> and run <code>mvn package</code> — you should see <code>BUILD SUCCESS</code> on the first run</li>
            </ul>
          </div>
          <div className="warn-box">
            <h4>&#9888; Never Commit the target/ Directory to Git</h4>
            <ul>
              <li><code>target/</code> is generated output — it changes every build, can be hundreds of MB, and can be reproduced by running <code>mvn package</code></li>
              <li>Add to <code>.gitignore</code>: <code>target/</code> — this is standard in every Maven project's .gitignore</li>
              <li>Committing <code>target/</code> bloats your repository, causes merge conflicts, and gives teammates a false sense that they don't need to build the project themselves</li>
            </ul>
          </div>
        </div>

        {/* POM.XML */}
        <div id="s11p6">
          <div className="pt"><span className="pt-badge">Core File</span>The pom.xml — Project Object Model</div>
          <p className="body-text">
            The <strong>pom.xml</strong> (Project Object Model) is the heart of every Maven project. It is an XML file in the project root that completely describes the project — its identity, its dependencies, its build configuration, and its plugins. Maven reads this file and knows everything it needs to do.
          </p>
          <div className="cb">
<span className="c-tag">&lt;?xml version=<span className="c-val">"1.0"</span> encoding=<span className="c-val">"UTF-8"</span>?&gt;</span>{"\n"}
<span className="c-tag">&lt;project</span> <span className="c-attr">xmlns</span>=<span className="c-val">"http://maven.apache.org/POM/4.0.0"</span>{"\n"}
         <span className="c-attr">xmlns:xsi</span>=<span className="c-val">"http://www.w3.org/2001/XMLSchema-instance"</span>{"\n"}
         <span className="c-attr">xsi:schemaLocation</span>=<span className="c-val">"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"</span><span className="c-tag">&gt;</span>{"\n\n"}

  <span className="c-tag">&lt;modelVersion&gt;</span>4.0.0<span className="c-tag">&lt;/modelVersion&gt;</span>  <span className="c-cm">&lt;!-- always 4.0.0 --&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- ── The four coordinates ─────────────────── --&gt;</span>{"\n"}
  <span className="c-tag">&lt;groupId&gt;</span>com.mycompany.myproject<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
  <span className="c-tag">&lt;artifactId&gt;</span>hello-service<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
  <span className="c-tag">&lt;version&gt;</span>1.0.0-SNAPSHOT<span className="c-tag">&lt;/version&gt;</span>{"\n"}
  <span className="c-tag">&lt;packaging&gt;</span>jar<span className="c-tag">&lt;/packaging&gt;</span>  <span className="c-cm">&lt;!-- jar | war | pom --&gt;</span>{"\n\n"}

  <span className="c-tag">&lt;name&gt;</span>Hello Service<span className="c-tag">&lt;/name&gt;</span>  <span className="c-cm">&lt;!-- human-readable display name --&gt;</span>{"\n"}
  <span className="c-tag">&lt;description&gt;</span>Demo Maven project<span className="c-tag">&lt;/description&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- ── Java version configuration ──────────── --&gt;</span>{"\n"}
  <span className="c-tag">&lt;properties&gt;</span>{"\n"}
    <span className="c-tag">&lt;maven.compiler.source&gt;</span>17<span className="c-tag">&lt;/maven.compiler.source&gt;</span>{"\n"}
    <span className="c-tag">&lt;maven.compiler.target&gt;</span>17<span className="c-tag">&lt;/maven.compiler.target&gt;</span>{"\n"}
    <span className="c-tag">&lt;project.build.sourceEncoding&gt;</span>UTF-8<span className="c-tag">&lt;/project.build.sourceEncoding&gt;</span>{"\n"}
  <span className="c-tag">&lt;/properties&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- ── Dependencies ─────────────────────────── --&gt;</span>{"\n"}
  <span className="c-tag">&lt;dependencies&gt;</span>{"\n\n"}
    <span className="c-cm">&lt;!-- JUnit 5 — test scope: not included in final JAR --&gt;</span>{"\n"}
    <span className="c-tag">&lt;dependency&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>org.junit.jupiter<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>junit-jupiter<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
      <span className="c-tag">&lt;version&gt;</span>5.10.1<span className="c-tag">&lt;/version&gt;</span>{"\n"}
      <span className="c-tag">&lt;scope&gt;</span>test<span className="c-tag">&lt;/scope&gt;</span>{"\n"}
    <span className="c-tag">&lt;/dependency&gt;</span>{"\n\n"}

    <span className="c-cm">&lt;!-- Spring Boot Starter — compile scope (default) --&gt;</span>{"\n"}
    <span className="c-tag">&lt;dependency&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>org.springframework.boot<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>spring-boot-starter-web<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
      <span className="c-tag">&lt;version&gt;</span>3.2.0<span className="c-tag">&lt;/version&gt;</span>{"\n"}
    <span className="c-tag">&lt;/dependency&gt;</span>{"\n\n"}

    <span className="c-cm">&lt;!-- Servlet API — provided: Tomcat supplies it at runtime --&gt;</span>{"\n"}
    <span className="c-tag">&lt;dependency&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>jakarta.servlet<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>jakarta.servlet-api<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
      <span className="c-tag">&lt;version&gt;</span>6.0.0<span className="c-tag">&lt;/version&gt;</span>{"\n"}
      <span className="c-tag">&lt;scope&gt;</span>provided<span className="c-tag">&lt;/scope&gt;</span>{"\n"}
    <span className="c-tag">&lt;/dependency&gt;</span>{"\n\n"}

  <span className="c-tag">&lt;/dependencies&gt;</span>{"\n\n"}

  <span className="c-cm">&lt;!-- ── Build plugins ──────────────────────────── --&gt;</span>{"\n"}
  <span className="c-tag">&lt;build&gt;</span>{"\n"}
    <span className="c-tag">&lt;plugins&gt;</span>{"\n"}
      <span className="c-tag">&lt;plugin&gt;</span>{"\n"}
        <span className="c-tag">&lt;groupId&gt;</span>org.apache.maven.plugins<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
        <span className="c-tag">&lt;artifactId&gt;</span>maven-compiler-plugin<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
        <span className="c-tag">&lt;version&gt;</span>3.12.1<span className="c-tag">&lt;/version&gt;</span>{"\n"}
        <span className="c-tag">&lt;configuration&gt;</span>{"\n"}
          <span className="c-tag">&lt;source&gt;</span>17<span className="c-tag">&lt;/source&gt;</span>{"\n"}
          <span className="c-tag">&lt;target&gt;</span>17<span className="c-tag">&lt;/target&gt;</span>{"\n"}
        <span className="c-tag">&lt;/configuration&gt;</span>{"\n"}
      <span className="c-tag">&lt;/plugin&gt;</span>{"\n"}
    <span className="c-tag">&lt;/plugins&gt;</span>{"\n"}
  <span className="c-tag">&lt;/build&gt;</span>{"\n\n"}

<span className="c-tag">&lt;/project&gt;</span>
          </div>
        </div>

        {/* COORDINATES */}
        <div id="s11p7">
          <div className="pt"><span className="pt-badge">Coordinates</span>The Four POM Coordinates</div>
          <p className="body-text">
            Every Maven artifact is uniquely identified by four coordinates called the <strong>GAV</strong> (groupId, artifactId, version) plus packaging. Together they form a unique address in any Maven repository.
          </p>
          <div className="coord-list">
            {pomCoordinates.map(c=>(
              <div key={c.coord} className="coord-card">
                <div className="coord-header">
                  <span className="coord-name">{c.coord}</span>
                  <span className="coord-type">{c.type}</span>
                  <span className="coord-example">{c.example}</span>
                </div>
                <div className="coord-body">
                  <p className="coord-desc">{c.desc}</p>
                  <ul className="coord-rules">
                    {c.rules.map((r,i)=><li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="tip-box">
            <h4>&#128161; Finding Coordinates on Maven Central</h4>
            <ul>
              <li>Visit <strong>search.maven.org</strong> or <strong>mvnrepository.com</strong> — search for any library by name</li>
              <li>Click the version you want — the site shows the exact <code>&lt;dependency&gt;</code> XML block to paste into your pom.xml</li>
              <li>Example: search "junit-jupiter" → click 5.10.1 → copy the dependency XML — groupId, artifactId, version are all shown</li>
            </ul>
          </div>
        </div>

        {/* SNAPSHOT VS RELEASE */}
        <div id="s11p8">
          <div className="pt"><span className="pt-badge">Versioning</span>SNAPSHOT vs RELEASE Versions</div>
          <p className="body-text">
            Maven treats versions ending in <code>-SNAPSHOT</code> completely differently from release versions. Understanding this distinction prevents broken builds and accidental production deployments.
          </p>
          <div className="snap-grid">
            {snapshotVsRelease.map(([label,env,desc,color])=>(
              <div key={label} className="snap-card" style={{borderColor:color,background:`${color}0a`}}>
                <h4 style={{color}}>{label}</h4>
                <div className="sc-sub">&#127354; {env}</div>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm">&lt;!-- Development — version changes are re-fetched every build --&gt;</span>{"\n"}
<span className="c-tag">&lt;version&gt;</span>1.0.0-SNAPSHOT<span className="c-tag">&lt;/version&gt;</span>{"\n\n"}
<span className="c-cm">&lt;!-- Ready to release — remove -SNAPSHOT, tag in Git --&gt;</span>{"\n"}
<span className="c-tag">&lt;version&gt;</span>1.0.0<span className="c-tag">&lt;/version&gt;</span>{"\n\n"}
<span className="c-cm">&lt;!-- Next dev cycle starts immediately after release --&gt;</span>{"\n"}
<span className="c-tag">&lt;version&gt;</span>1.1.0-SNAPSHOT<span className="c-tag">&lt;/version&gt;</span>{"\n\n"}
<span className="c-cm">&lt;!-- Use maven-release-plugin to automate the SNAPSHOT → release process --&gt;</span>{"\n"}
mvn release:prepare  <span className="c-cm">  # strips -SNAPSHOT, creates Git tag, bumps to next SNAPSHOT</span>{"\n"}
mvn release:perform  <span className="c-cm">  # builds the release and deploys to the remote repository</span>
          </div>
          <div className="warn-box">
            <h4>&#9888; SNAPSHOT in Production = Unpredictable Builds</h4>
            <ul>
              <li>If your artifact is <code>1.0.0-SNAPSHOT</code> in production, the next <code>mvn deploy</code> by any developer overwrites it — production is now running different code without a deployment</li>
              <li>CI pipelines should block promotion of SNAPSHOT artifacts to staging or production environments</li>
              <li><strong>Rule:</strong> Development builds use SNAPSHOT. Anything deployed beyond the developer's laptop is a RELEASE.</li>
            </ul>
          </div>
        </div>

        {/* DEPENDENCIES */}
        <div id="s11p9">
          <div className="pt"><span className="pt-badge">Dependencies</span>Maven Dependencies</div>
          <p className="body-text">
            A <strong>dependency</strong> is any external library your project needs. You declare it in <code>&lt;dependencies&gt;</code> using its GAV coordinates. Maven downloads it from the Central Repository and caches it in your local <code>.m2</code> repository. You never manually download or copy a JAR.
          </p>

          <div className="sub-h">Dependency Scope</div>
          <p className="body-text">
            The <code>&lt;scope&gt;</code> element controls when a dependency is available and whether it is included in the final packaged artifact.
          </p>
          <table className="data-table">
            <thead><tr><th>Scope</th><th>Description</th></tr></thead>
            <tbody>
              {dependencyScope.map(([s,d])=>(
                <tr key={s}><td>{s}</td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Transitive Dependencies</div>
          <p className="body-text">
            When you depend on library A, and A depends on library B, Maven automatically downloads B as well &mdash; you never need to declare B yourself. This is called a <strong>transitive dependency</strong>.
          </p>
          <div className="cb">
<span className="c-cm">&lt;!-- You declare ONE dependency --&gt;</span>{"\n"}
<span className="c-tag">&lt;dependency&gt;</span>{"\n"}
  <span className="c-tag">&lt;groupId&gt;</span>org.springframework.boot<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
  <span className="c-tag">&lt;artifactId&gt;</span>spring-boot-starter-web<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
  <span className="c-tag">&lt;version&gt;</span>3.2.0<span className="c-tag">&lt;/version&gt;</span>{"\n"}
<span className="c-tag">&lt;/dependency&gt;</span>{"\n\n"}
<span className="c-cm"># Maven resolves and downloads ~30+ transitive JARs automatically:</span>{"\n"}
<span className="c-cm"># spring-core, spring-web, spring-webmvc, jackson-databind,</span>{"\n"}
<span className="c-cm"># jackson-core, logback-classic, slf4j-api, tomcat-embed-core ...</span>{"\n\n"}
<span className="c-cm"># See the full tree:</span>{"\n"}
mvn dependency:tree{"\n"}
<span className="c-ok">[INFO] com.mycompany:hello-service:jar:1.0.0-SNAPSHOT</span>{"\n"}
<span className="c-ok">[INFO] +- org.springframework.boot:spring-boot-starter-web:jar:3.2.0</span>{"\n"}
<span className="c-ok">[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:3.2.0</span>{"\n"}
<span className="c-ok">[INFO] |  |  +- org.springframework.boot:spring-boot:jar:3.2.0</span>{"\n"}
<span className="c-ok">[INFO] |  |  \- ch.qos.logback:logback-classic:jar:1.4.11</span>
          </div>

          <div className="sub-h">Excluding a Transitive Dependency</div>
          <div className="cb">
<span className="c-cm">&lt;!-- Exclude a transitive dep — e.g. replace log4j with logback --&gt;</span>{"\n"}
<span className="c-tag">&lt;dependency&gt;</span>{"\n"}
  <span className="c-tag">&lt;groupId&gt;</span>com.example<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
  <span className="c-tag">&lt;artifactId&gt;</span>some-library<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
  <span className="c-tag">&lt;version&gt;</span>2.0.0<span className="c-tag">&lt;/version&gt;</span>{"\n"}
  <span className="c-tag">&lt;exclusions&gt;</span>{"\n"}
    <span className="c-tag">&lt;exclusion&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>log4j<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>log4j<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
    <span className="c-tag">&lt;/exclusion&gt;</span>{"\n"}
  <span className="c-tag">&lt;/exclusions&gt;</span>{"\n"}
<span className="c-tag">&lt;/dependency&gt;</span>
          </div>
        </div>

        {/* PLUGINS */}
        <div id="s11p10">
          <div className="pt"><span className="pt-badge">Plugins</span>Maven Plugins</div>
          <p className="body-text">
            Every action Maven takes during a build is performed by a <strong>plugin</strong>. Compiling source code, running tests, packaging a JAR, deploying to a server &mdash; each is a plugin executing a <strong>goal</strong> bound to a lifecycle phase. Maven ships with default plugins for all standard phases; you configure and extend them in <code>&lt;build&gt;&lt;plugins&gt;</code>.
          </p>
          <div className="plugin-rows">
            {corePlugins.map(([name,desc])=>(
              <div key={name} className="plugin-row">
                <span className="plugin-name">{name}</span>
                <span className="plugin-desc">{desc}</span>
              </div>
            ))}
          </div>

          <div className="sub-h">Configuring a Plugin</div>
          <div className="cb">
<span className="c-cm">&lt;!-- Configure maven-compiler-plugin for Java 17 --&gt;</span>{"\n"}
<span className="c-tag">&lt;build&gt;</span>{"\n"}
  <span className="c-tag">&lt;plugins&gt;</span>{"\n"}
    <span className="c-tag">&lt;plugin&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>org.apache.maven.plugins<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>maven-compiler-plugin<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
      <span className="c-tag">&lt;version&gt;</span>3.12.1<span className="c-tag">&lt;/version&gt;</span>{"\n"}
      <span className="c-tag">&lt;configuration&gt;</span>{"\n"}
        <span className="c-tag">&lt;source&gt;</span>17<span className="c-tag">&lt;/source&gt;</span>{"\n"}
        <span className="c-tag">&lt;target&gt;</span>17<span className="c-tag">&lt;/target&gt;</span>{"\n"}
        <span className="c-tag">&lt;encoding&gt;</span>UTF-8<span className="c-tag">&lt;/encoding&gt;</span>{"\n"}
      <span className="c-tag">&lt;/configuration&gt;</span>{"\n"}
    <span className="c-tag">&lt;/plugin&gt;</span>{"\n\n"}

    <span className="c-cm">&lt;!-- Configure surefire to use JUnit 5 --&gt;</span>{"\n"}
    <span className="c-tag">&lt;plugin&gt;</span>{"\n"}
      <span className="c-tag">&lt;groupId&gt;</span>org.apache.maven.plugins<span className="c-tag">&lt;/groupId&gt;</span>{"\n"}
      <span className="c-tag">&lt;artifactId&gt;</span>maven-surefire-plugin<span className="c-tag">&lt;/artifactId&gt;</span>{"\n"}
      <span className="c-tag">&lt;version&gt;</span>3.2.3<span className="c-tag">&lt;/version&gt;</span>{"\n"}
    <span className="c-tag">&lt;/plugin&gt;</span>{"\n\n"}

    <span className="c-cm">&lt;!-- Execute a specific plugin goal directly --&gt;</span>{"\n"}
    <span className="c-cm">&lt;!-- mvn dependency:tree   — lists full dependency tree --&gt;</span>{"\n"}
    <span className="c-cm">&lt;!-- mvn compiler:compile  — compiles without running full lifecycle --&gt;</span>{"\n"}
    <span className="c-cm">&lt;!-- mvn surefire:test     — runs tests without recompiling --&gt;</span>{"\n"}
  <span className="c-tag">&lt;/plugins&gt;</span>{"\n"}
<span className="c-tag">&lt;/build&gt;</span>
          </div>
        </div>

        {/* LAB */}
        <div id="s11p11">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 — Install Maven and Verify</h4>
            <ol className="lab-ol">
              <li>Install JDK 17 and set <code>JAVA_HOME</code> correctly</li>
              <li>Download and install Maven 3.9.x — set <code>MAVEN_HOME</code> and <code>PATH</code></li>
              <li>Run <code>mvn -version</code> — screenshot the output showing Maven version and Java version</li>
              <li>Run <code>echo $JAVA_HOME</code> (Linux) or <code>echo %JAVA_HOME%</code> (Windows) — verify it points to the JDK, not a JRE</li>
              <li>Run <code>javac -version</code> — verify the Java compiler is accessible (not just <code>java</code>)</li>
            </ol>

            <h4>Lab 2 — Generate and Explore a Maven Project</h4>
            <ol className="lab-ol">
              <li>Run: <code>mvn archetype:generate -DgroupId=com.training -DartifactId=my-first-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false</code></li>
              <li>Navigate into <code>my-first-app/</code> and examine the generated structure — list every directory and file</li>
              <li>Open <code>pom.xml</code> — identify the four coordinates (groupId, artifactId, version, packaging)</li>
              <li>Run <code>mvn package</code> — watch Maven download dependencies, compile, run tests, and produce a JAR</li>
              <li>Locate the generated JAR in <code>target/</code> — run it with <code>java -cp target/my-first-app-1.0-SNAPSHOT.jar com.training.App</code></li>
            </ol>

            <h4>Lab 3 — Modify pom.xml and Add a Dependency</h4>
            <ol className="lab-ol">
              <li>Open <code>pom.xml</code> — add the compiler plugin configured for Java 17 (source and target both 17)</li>
              <li>Add a test dependency: JUnit Jupiter 5.10.1 with <code>&lt;scope&gt;test&lt;/scope&gt;</code></li>
              <li>Add a runtime dependency: <strong>Gson</strong> (<code>com.google.code.gson:gson:2.10.1</code>) with default (compile) scope</li>
              <li>Run <code>mvn dependency:tree</code> — observe all three dependencies and their transitive dependencies in the tree output</li>
              <li>Run <code>mvn package</code> — verify <strong>BUILD SUCCESS</strong> and check the JAR size increased (Gson is now bundled)</li>
            </ol>

            <h4>Lab 4 — SNAPSHOT and Release Versioning</h4>
            <ol className="lab-ol">
              <li>Current version in pom.xml should be <code>1.0-SNAPSHOT</code> — run <code>mvn install</code> and locate the artifact in <code>~/.m2/repository/com/training/my-first-app/1.0-SNAPSHOT/</code></li>
              <li>Change the version to <code>1.0.0</code> (remove -SNAPSHOT). Run <code>mvn install</code> again.</li>
              <li>Locate the new artifact in <code>~/.m2/repository/com/training/my-first-app/1.0.0/</code> — observe the difference in filename (no timestamp suffix)</li>
              <li>Change version back to <code>1.1.0-SNAPSHOT</code> — this simulates starting the next development iteration after a release</li>
            </ol>

            <h4>Challenge — Dependency Exclusion</h4>
            <ol className="lab-ol">
              <li>Add Spring Boot Starter Web as a dependency: <code>org.springframework.boot:spring-boot-starter-web:3.2.0</code></li>
              <li>Run <code>mvn dependency:tree</code> — count how many transitive dependencies were pulled in by this one declaration</li>
              <li>Add an <code>&lt;exclusion&gt;</code> to remove <code>spring-boot-starter-tomcat</code> (you would do this if deploying to a standalone Tomcat)</li>
              <li>Run <code>mvn dependency:tree</code> again — verify the embedded Tomcat JARs are gone from the tree</li>
            </ol>
          </div>
        </div>

        {/* QUIZ */}
        <div id="s11p12" className="quiz-box">
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
        <div id="s11p13" className="hw-box">
          <h3>&#128221; Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Maven Installation Report:</h4>
            <ul>
              <li>Install Maven on both Linux and Windows (or document both processes if you only have one OS)</li>
              <li>Run <code>mvn -version</code> on both — screenshot showing Maven version, Java version, and OS</li>
              <li>Document any installation problems you encountered and how you solved them</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Build Your Own pom.xml from Scratch:</h4>
            <ul>
              <li>Without using archetype:generate, create a Maven project by hand — create the directory structure manually</li>
              <li>Write a <code>pom.xml</code> with meaningful groupId/artifactId, Java 17 compiler config, JUnit 5 test dependency, and at least one compile-scope dependency from Maven Central</li>
              <li>Add a <code>HelloWorld.java</code> in the correct package directory and a <code>HelloWorldTest.java</code> test</li>
              <li>Run <code>mvn test</code> — capture the full console output showing the test running and passing</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Dependency Analysis:</h4>
            <ul>
              <li>Add Spring Boot Starter Web to your project and run <code>mvn dependency:tree</code></li>
              <li>Count the direct dependencies vs transitive dependencies — document the numbers</li>
              <li>Find one transitive dependency that has a known CVE (Common Vulnerabilities and Exposures) using <strong>nvd.nist.gov</strong></li>
              <li>Explain: how would you update just that transitive dependency version in Maven?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Understanding Questions:</h4>
            <ul>
              <li>Explain the difference between <code>provided</code> and <code>runtime</code> dependency scope with a real-world example of when you would use each</li>
              <li>Why does Maven use reverse domain name for groupId? What problems does this naming convention prevent?</li>
              <li>A colleague asks: "why can't I just check in all my JARs into Git like I used to?" — write a 3-paragraph explanation of why Maven's approach is superior</li>
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
          <span className="fp">pom.xml</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Dependencies</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Download</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Compile</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Test</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">&#9989; JAR</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; Maven Golden Rules</h4>
          <ul>
            <li>Never commit the <code>target/</code> directory to Git — add it to <code>.gitignore</code></li>
            <li>Never hardcode dependency versions in multiple places — use <code>&lt;properties&gt;</code> to define versions once</li>
            <li>Use <code>-SNAPSHOT</code> during development, remove it for every release version</li>
            <li>Always declare <code>test</code> scope for test libraries — JUnit, Mockito, AssertJ never belong in production JARs</li>
            <li>Set <code>maven.compiler.source</code> and <code>target</code> explicitly — never rely on Maven defaults for Java version</li>
            <li>Run <code>mvn dependency:tree</code> regularly — understand what transitive dependencies you are shipping</li>
          </ul>
        </div>

        {/* NEXT */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next &middot; Module 4 &middot; Session 12</h4>
            <h3>Build Lifecycle, Repositories &amp; Dependencies</h3>
            <ul>
              <li>The complete Maven Build Lifecycle — all 23 phases explained</li>
              <li>Local repository (.m2) — how Maven caches and reuses artifacts</li>
              <li>Maven Central and remote repositories — how dependency resolution works</li>
              <li>Configuring a corporate repository mirror (Nexus / Artifactory)</li>
              <li>Multi-module Maven projects and parent POMs</li>
            </ul>
          </div>
          <Link href="/courses/dev/session12" className="next-btn">Session 12 &rarr;</Link>
        </div>

      </div>
    </>
  );
}