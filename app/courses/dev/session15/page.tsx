// app/courses/dev/session15/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Write production-quality Dockerfiles using all major instructions: FROM, RUN, COPY, ADD, WORKDIR, ENV, ARG, EXPOSE, VOLUME, USER, CMD, ENTRYPOINT",
  "Understand the difference between CMD and ENTRYPOINT and when to use each",
  "Build multi-stage Dockerfiles to create minimal production images",
  "Apply Dockerfile best practices: layer caching, .dockerignore, non-root user, minimal base images",
  "Write Docker Compose YAML files to define and run multi-container applications",
  "Use docker compose up, down, build, logs, and exec in day-to-day workflows",
  "Push and pull images to Docker Hub and understand public vs private repositories",
  "Explain Docker Trusted Registry (DTR) and when to use a private registry",
  "Understand Docker Swarm — what it is, how it differs from Compose, and core Swarm concepts",
  "Deploy a service stack to a Swarm and understand replicas, rolling updates, and drain/active nodes",
];

const dockerfileInstructions = [
  { instr: "FROM",        syntax: "FROM ubuntu:22.04",                           desc: "Sets the base image. Every Dockerfile must start with FROM. Use specific version tags — never FROM ubuntu (implies :latest)." },
  { instr: "RUN",         syntax: "RUN apt-get update && apt-get install -y curl",desc: "Executes a command during the build and creates a new layer. Chain commands with && to keep layer count low. Always clean up in the same RUN layer." },
  { instr: "COPY",        syntax: "COPY src/ /app/src/",                          desc: "Copies files/directories from build context (host) into the image. Preferred over ADD for simple file copies." },
  { instr: "ADD",         syntax: "ADD app.tar.gz /app/",                         desc: "Like COPY but also auto-extracts tar archives and supports URLs. Use COPY unless you specifically need extraction." },
  { instr: "WORKDIR",     syntax: "WORKDIR /app",                                 desc: "Sets the working directory for subsequent RUN, CMD, ENTRYPOINT, COPY, ADD instructions. Creates the directory if it doesn't exist. Use instead of 'RUN cd /app'." },
  { instr: "ENV",         syntax: "ENV NODE_ENV=production PORT=3000",            desc: "Sets environment variables in the image — available at build time AND runtime. Use ARG for build-only variables." },
  { instr: "ARG",         syntax: "ARG VERSION=1.0",                              desc: "Defines a build-time variable passed via --build-arg. Not available at runtime. Use for image version, build metadata." },
  { instr: "EXPOSE",      syntax: "EXPOSE 8080",                                  desc: "Documents which port the container listens on. Does NOT publish the port — it's metadata for humans and docker run -P." },
  { instr: "VOLUME",      syntax: "VOLUME /app/data",                             desc: "Declares a mount point. Docker creates an anonymous volume at this path if no volume is mounted. Used for database data directories." },
  { instr: "USER",        syntax: "USER appuser:appgroup",                        desc: "Sets the user for subsequent RUN, CMD, ENTRYPOINT. Create a non-root user and switch to it before CMD — never run production containers as root." },
  { instr: "CMD",         syntax: 'CMD ["node", "server.js"]',                   desc: "Default command when container starts. Can be overridden by docker run arguments. Use JSON array (exec form) — not shell form." },
  { instr: "ENTRYPOINT",  syntax: 'ENTRYPOINT ["java", "-jar", "app.jar"]',      desc: "The fixed executable that always runs. CMD becomes its default arguments. Unlike CMD, ENTRYPOINT is not overridden by docker run arguments (only by --entrypoint flag)." },
  { instr: "HEALTHCHECK", syntax: "HEALTHCHECK --interval=30s CMD curl -f http://localhost/health || exit 1", desc: "Defines how Docker tests if the container is healthy. Status shown in docker ps. Unhealthy containers can be replaced automatically in Swarm." },
  { instr: "LABEL",       syntax: 'LABEL maintainer="team@company.com" version="1.0"', desc: "Adds metadata key-value pairs to the image. Viewable with docker inspect. Good for maintainer, version, build date." },
  { instr: "ONBUILD",     syntax: "ONBUILD COPY . /app",                          desc: "Deferred instruction — executes only when this image is used as a base image in another Dockerfile. Used for base image templates." },
];

const cmdVsEntrypoint = [
  { aspect: "Can be overridden",    cmd: "Yes — docker run myimage other-command",             ep: "No — use --entrypoint flag to override" },
  { aspect: "docker run args",      cmd: "Replace CMD entirely",                               ep: "Appended to ENTRYPOINT as arguments" },
  { aspect: "Best used for",        cmd: "Default arguments, optional commands",               ep: "The fixed main executable of the container" },
  { aspect: "Example use",          cmd: 'CMD ["--help"]  — show help by default',             ep: 'ENTRYPOINT ["java", "-jar", "app.jar"]' },
  { aspect: "Together",             cmd: "CMD provides default args to ENTRYPOINT",            ep: 'ENTRYPOINT ["java"] CMD ["-jar", "app.jar"]' },
];

const composeKeys = [
  { key: "version",         desc: "Compose file format version. Use '3.8' for modern Swarm-compatible files." },
  { key: "services",        desc: "The main section. Each named entry is a container. The name becomes the DNS hostname on the default network." },
  { key: "image",           desc: "Image to use. Mutually exclusive with build. image: nginx:1.25-alpine" },
  { key: "build",           desc: "Build from a Dockerfile. build: . builds from current directory. build: {context: ., dockerfile: Dockerfile.prod}" },
  { key: "ports",           desc: "Port mappings. - '8080:80' maps host 8080 to container 80. Equivalent to -p." },
  { key: "environment",     desc: "Environment variables. List format: - KEY=VALUE. Or map format: KEY: VALUE." },
  { key: "env_file",        desc: "Load env vars from a file. env_file: .env. Use for secrets management." },
  { key: "volumes",         desc: "Mount volumes. - mydata:/app/data for named volumes. - ./src:/app/src for bind mounts." },
  { key: "networks",        desc: "Which networks this service joins. Services on the same network resolve each other by service name." },
  { key: "depends_on",      desc: "Start order — this service starts after the listed services. Does NOT wait for them to be ready." },
  { key: "restart",         desc: "Restart policy: no, always, on-failure, unless-stopped. Same as docker run --restart." },
  { key: "healthcheck",     desc: "Health check definition inline in Compose. Overrides Dockerfile HEALTHCHECK." },
  { key: "deploy",          desc: "Swarm-specific settings: replicas, resource limits, update config, restart policy. Ignored by docker compose up." },
];

const composeCommands = [
  ["docker compose up",                    "Create and start all services. Attaches to logs."],
  ["docker compose up -d",                 "Start all services in background (detached)"],
  ["docker compose up --build",            "Rebuild images before starting — use after Dockerfile changes"],
  ["docker compose up -d service-name",    "Start only one specific service"],
  ["docker compose down",                  "Stop and remove containers and networks"],
  ["docker compose down -v",               "Stop + remove containers, networks AND named volumes"],
  ["docker compose ps",                    "List status of all services in the project"],
  ["docker compose logs",                  "Print logs from all services"],
  ["docker compose logs -f api",           "Follow logs from the 'api' service only"],
  ["docker compose exec api sh",           "Open shell in running service container"],
  ["docker compose build",                 "Build or rebuild all service images"],
  ["docker compose build api",             "Build only the 'api' service image"],
  ["docker compose pull",                  "Pull latest versions of all service images"],
  ["docker compose restart api",           "Restart one service without recreating others"],
  ["docker compose scale api=3",           "Scale api service to 3 replicas (legacy syntax)"],
  ["docker compose config",                "Validate and print the merged Compose configuration"],
];

const swarmConcepts = [
  { term: "Swarm",         def: "A cluster of Docker hosts running in Swarm mode. One or more manager nodes and zero or more worker nodes. Managed as a single unit." },
  { term: "Node",          def: "A Docker host in the Swarm. Manager nodes control the Swarm state. Worker nodes run the actual containers (tasks). A node can be both." },
  { term: "Service",       def: "The definition of a task to run — which image, how many replicas, ports, update config. Services replace 'docker run' in Swarm." },
  { term: "Task",          def: "A single running container within a service. A service with 3 replicas has 3 tasks — one per node or multiple on one node." },
  { term: "Stack",         def: "A group of services that share dependencies — deployed from a Compose file with docker stack deploy. Swarm's equivalent of docker compose up." },
  { term: "Replica",       def: "A copy of a service's container. replicas: 3 runs 3 identical containers, distributed across nodes. Swarm ensures the desired count is always running." },
  { term: "Overlay Network",def: "A multi-host network that spans all Swarm nodes. Services communicate across hosts as if on the same LAN. Created automatically for stacks." },
  { term: "Rolling Update", def: "Update strategy that replaces tasks one at a time. Zero downtime — old containers keep serving while new ones start. Configured per service." },
  { term: "Drain",         def: "Node state where Swarm stops scheduling new tasks and moves existing tasks to other nodes. Used for maintenance without service interruption." },
  { term: "Secret",        def: "Encrypted sensitive data (passwords, TLS certs, API keys) stored in Swarm's Raft log. Mounted as a file in /run/secrets/ inside containers." },
];

const swarmCommands = [
  ["docker swarm init",                                    "Initialise this host as a Swarm manager"],
  ["docker swarm join --token TOKEN HOST:PORT",            "Join an existing Swarm as a worker"],
  ["docker swarm join-token worker",                       "Print the token command to add a worker"],
  ["docker node ls",                                       "List all nodes in the Swarm with their status"],
  ["docker node update --availability drain node1",        "Drain a node for maintenance"],
  ["docker service create --name web --replicas 3 -p 80:80 nginx", "Create a service with 3 replicas"],
  ["docker service ls",                                    "List all running services"],
  ["docker service ps web",                                "List tasks (containers) for the 'web' service"],
  ["docker service scale web=5",                           "Scale the web service to 5 replicas"],
  ["docker service update --image nginx:1.26 web",         "Rolling update — replace tasks one by one"],
  ["docker service rollback web",                          "Roll back the last update"],
  ["docker service rm web",                                "Remove a service and all its tasks"],
  ["docker stack deploy -c docker-compose.yml myapp",      "Deploy a Compose file as a Swarm stack"],
  ["docker stack ls",                                      "List all deployed stacks"],
  ["docker stack ps myapp",                                "List all tasks in a stack"],
  ["docker stack rm myapp",                                "Remove a stack and all its services"],
  ["docker secret create db_password ./password.txt",      "Create an encrypted secret"],
  ["docker secret ls",                                     "List all secrets"],
];

const quizData = [
  { q: "What is the difference between COPY and ADD in a Dockerfile?",
    a: "COPY simply copies files from the build context into the image. ADD does everything COPY does, but also: auto-extracts tar/gzip archives, and can fetch files from URLs. Best practice: always use COPY unless you specifically need extraction or URL fetching — COPY's intent is clearer and safer." },
  { q: "What is the difference between CMD and ENTRYPOINT?",
    a: "ENTRYPOINT defines the fixed executable that always runs — it's the container's main process. CMD provides default arguments to ENTRYPOINT, or a default command if no ENTRYPOINT is set. CMD is easily overridden by arguments passed to docker run; ENTRYPOINT requires --entrypoint to override. Together: ENTRYPOINT ['java', '-jar'] CMD ['app.jar'] — docker run myimage other.jar replaces only CMD." },
  { q: "Why should you use multi-stage builds in Dockerfiles?",
    a: "Multi-stage builds use one stage (e.g. Maven + JDK) to compile/build the application, then copy only the built artifact into a minimal final stage (e.g. JRE-only). The build tools never appear in the final image. This dramatically reduces image size (from 500MB to 80MB for Java apps), reduces attack surface, and prevents source code from being in the production image." },
  { q: "What does 'docker compose down -v' do that 'docker compose down' does not?",
    a: "docker compose down stops and removes containers and networks. The -v flag additionally removes named volumes declared in the volumes section. This deletes all persisted data (database files, uploads). Use down alone to preserve data between restarts; use down -v when you want a completely clean reset." },
  { q: "How does Docker Compose handle service startup order with depends_on?",
    a: "depends_on controls the ORDER services start — Docker starts dependent services first. However, it does NOT wait for the service to be READY (accepting connections). A database container might be running but still initialising. Applications must implement retry logic or use health checks with condition: service_healthy in depends_on to wait for readiness." },
  { q: "What is the difference between Docker Compose and Docker Swarm?",
    a: "Docker Compose runs multi-container applications on a SINGLE host — for development and simple deployments. Docker Swarm orchestrates containers across MULTIPLE hosts — a cluster. Swarm adds high availability (replicas across nodes), rolling updates, secrets management, and load balancing across nodes. Use Compose for dev/single host; use Swarm (or Kubernetes) for production clusters." },
  { q: "What is a Swarm service and how does it differ from a container?",
    a: "A Swarm service is a declaration of desired state: run X replicas of image Y with these constraints. Swarm continuously ensures the desired state is met — if a container crashes, Swarm starts a replacement automatically. A single container (docker run) has no self-healing. Services are the unit of deployment in Swarm, not individual containers." },
  { q: "What is a Docker secret and why is it better than an environment variable for passwords?",
    a: "A Docker secret is encrypted data stored in Swarm's distributed Raft log. It is decrypted and mounted as a file in /run/secrets/ inside the container — never as an environment variable. Environment variables are visible in docker inspect, process lists, and logs. Secrets are encrypted at rest and in transit, never stored on disk outside of Swarm managers, and only available to services explicitly granted access." },
];

const takeaways = [
  ["Dockerfile",       "FROM → RUN → COPY → WORKDIR → USER → EXPOSE → CMD"],
  ["Multi-stage",      "Build in stage 1, copy artifact to minimal stage 2"],
  [".dockerignore",    "Exclude node_modules, .git, secrets from build context"],
  ["CMD vs ENTRYPOINT","ENTRYPOINT = fixed exec, CMD = default args (overridable)"],
  ["Compose up -d",    "Start full stack in background; down -v for clean reset"],
  ["depends_on",       "Controls start order — NOT readiness. Add health checks."],
  ["Swarm service",    "Self-healing replicas — desired state always maintained"],
  ["docker secret",    "Encrypted, file-mounted — safer than env vars for passwords"],
];

export default function Session15() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s15-page {
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
        .hero { border-radius:20px; background:linear-gradient(135deg,#001f3a 0%,#0a4a7a 45%,#0db7ed 100%); padding:2.5rem 2rem; margin-bottom:2rem; position:relative; overflow:hidden; }
        .hero::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px); background-size:22px 22px; }
        .hero-meta { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; flex-wrap:wrap; position:relative; }
        .h-badge { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#fff; padding:0.3rem 0.75rem; border-radius:100px; }
        .h-mod   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.08em; text-transform:uppercase; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); color:rgba(255,255,255,0.8); padding:0.3rem 0.75rem; border-radius:100px; }
        .h-fin   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; background:rgba(255,215,0,0.18); border:1px solid rgba(255,215,0,0.4); color:#FFD700; padding:0.3rem 0.75rem; border-radius:100px; }
        .h-dur   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:rgba(255,255,255,0.6); display:flex; align-items:center; gap:0.35rem; }
        .hero h1 { font-size:clamp(1.5rem,3.5vw,2.2rem); font-weight:800; color:#fff; letter-spacing:-0.03em; line-height:1.15; position:relative; margin-bottom:0.75rem; }
        .hero p  { color:rgba(255,255,255,0.75); font-size:0.95rem; line-height:1.65; max-width:640px; position:relative; }

        /* ── Jump nav ── */
        .jump-nav { display:flex; gap:0.4rem; margin-bottom:2.5rem; flex-wrap:wrap; }
        .jpill { font-family:'JetBrains Mono',monospace; font-size:0.6rem; padding:0.3rem 0.8rem; border-radius:100px; border:1px solid var(--border); background:var(--surface2); color:var(--muted); text-decoration:none; letter-spacing:0.06em; transition:all 0.2s; white-space:nowrap; }
        .jpill:hover { color:var(--text); border-color:var(--border2); }
        .jpill.active { background:linear-gradient(135deg,#0a4a7a,#0db7ed); color:#fff; border-color:transparent; }

        /* ── Section titles ── */
        .pt { font-size:1.3rem; font-weight:800; letter-spacing:-0.025em; color:var(--text); margin:2.5rem 0 1.25rem; display:flex; align-items:center; gap:0.75rem; }
        .pt::after { content:''; flex:1; height:1px; background:var(--border); }
        .pt-badge { font-family:'JetBrains Mono',monospace; font-size:0.6rem; letter-spacing:0.08em; text-transform:uppercase; background:linear-gradient(135deg,#0a4a7a,#0db7ed); color:#fff; padding:0.2rem 0.65rem; border-radius:100px; flex-shrink:0; }

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

        /* ── Boxes ── */
        .tip-box { background:rgba(13,183,237,0.07); border-left:3px solid #0db7ed; border-radius:0 12px 12px 0; padding:1.1rem 1.25rem; margin:1.1rem 0; }
        .tip-box h4 { font-size:0.82rem; font-weight:700; color:#0a7abf; margin-bottom:0.5rem; }
        .tip-box p  { font-size:0.83rem; color:var(--text2); line-height:1.6; margin-bottom:0.4rem; }
        .tip-box ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .tip-box li { font-size:0.82rem; color:var(--text2); line-height:1.5; display:flex; gap:0.45rem; }
        .tip-box li::before { content:'→'; color:#0db7ed; flex-shrink:0; font-size:0.75rem; margin-top:1px; }
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
        .ex-box p { font-size:0.84rem; color:var(--text2); line-height:1.65; margin-bottom:0.45rem; }
        .ex-box p:last-child { margin-bottom:0; }
        .ex-box ul { padding-left:1.2rem; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
        .ex-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; }
        .ex-box p code,.ex-box li code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }
        .ex-box strong { color:var(--text); }

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
        .c-hi  { color:#0db7ed; font-weight:700; }
        .c-yml { color:#f39c12; }

        /* ── Dockerfile instruction table ── */
        .df-table { width:100%; border-collapse:collapse; font-size:0.8rem; margin:1.25rem 0; }
        .df-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.6rem 0.85rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.75rem; }
        .df-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .df-table tbody tr:hover { background:var(--surface); }
        .df-table td { padding:0.55rem 0.85rem; color:var(--text2); vertical-align:top; line-height:1.5; }
        .df-table td:first-child { font-family:'JetBrains Mono',monospace; font-size:0.78rem; font-weight:700; color:#0db7ed; width:105px; }
        .df-table td:nth-child(2) { font-family:'JetBrains Mono',monospace; font-size:0.67rem; color:#a5d6ff; width:270px; }
        .df-table td:nth-child(3) { font-size:0.77rem; }

        /* ── CMD vs ENTRYPOINT table ── */
        .compare-table { width:100%; border-collapse:collapse; font-size:0.8rem; margin:1.25rem 0; }
        .compare-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.6rem 0.85rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.75rem; }
        .compare-table thead th:nth-child(2) { color:#0db7ed; }
        .compare-table thead th:nth-child(3) { color:#e67e22; }
        .compare-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .compare-table tbody tr:hover { background:var(--surface); }
        .compare-table td { padding:0.6rem 0.85rem; color:var(--text2); vertical-align:top; line-height:1.5; font-size:0.78rem; }
        .compare-table td:first-child { font-weight:700; color:var(--text); font-size:0.78rem; width:150px; }

        /* ── Compose keys table ── */
        .data-table { width:100%; border-collapse:collapse; font-size:0.82rem; margin:1.25rem 0; }
        .data-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.6rem 0.85rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.76rem; }
        .data-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .data-table tbody tr:hover { background:var(--surface); }
        .data-table td { padding:0.55rem 0.85rem; color:var(--text2); vertical-align:top; line-height:1.5; }
        .data-table td:first-child { font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#0db7ed; font-weight:600; width:140px; }

        /* ── Command list ── */
        .cmd-list { display:flex; flex-direction:column; gap:0; background:#0d1117; border-radius:12px; border:1px solid rgba(255,255,255,0.06); overflow:hidden; margin:0.75rem 0; }
        .cmd-row  { display:flex; gap:0; border-bottom:1px solid rgba(255,255,255,0.06); }
        .cmd-row:last-child { border-bottom:none; }
        .cmd-code { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#a5d6ff; padding:0.55rem 1rem; min-width:320px; flex-shrink:0; border-right:1px solid rgba(255,255,255,0.06); white-space:nowrap; }
        .cmd-desc { font-size:0.75rem; color:#8b949e; padding:0.55rem 1rem; line-height:1.5; }
        @media(max-width:700px){ .cmd-row { flex-direction:column; } .cmd-code { border-right:none; border-bottom:1px solid rgba(255,255,255,0.06); min-width:unset; white-space:normal; } }

        /* ── Swarm concepts ── */
        .swarm-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin:1.25rem 0; }
        @media(max-width:580px){ .swarm-grid { grid-template-columns:1fr; } }
        .swarm-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:0.9rem 1rem; }
        .swarm-term { font-family:'JetBrains Mono',monospace; font-size:0.8rem; font-weight:700; color:#0db7ed; margin-bottom:0.35rem; }
        .swarm-def  { font-size:0.78rem; color:var(--text2); line-height:1.5; }

        /* ── Lab ── */
        .act-box { background:linear-gradient(135deg,#001f3a 0%,#0a4a7a 45%,#0db7ed 100%); border-radius:16px; padding:1.75rem; margin:1.5rem 0; }
        .act-box h3 { font-size:1rem; font-weight:700; color:#fff; margin-bottom:1rem; }
        .act-box h4 { font-size:0.85rem; font-weight:700; color:rgba(255,255,255,0.9); margin:1.1rem 0 0.5rem; }
        .lab-ol { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); border-radius:10px; padding:1rem 1rem 1rem 2rem; margin-bottom:0.6rem; display:flex; flex-direction:column; gap:0.4rem; }
        .lab-ol li { font-size:0.83rem; color:rgba(255,255,255,0.88); line-height:1.55; }
        .lab-ol li code { font-family:'JetBrains Mono',monospace; font-size:0.75rem; background:rgba(255,255,255,0.15); padding:0.1rem 0.4rem; border-radius:4px; color:#fff; }
        .lab-ol li strong { color:#fff; }

        /* ── Quiz ── */
        .quiz-box { background:linear-gradient(135deg,rgba(10,74,122,0.08),rgba(13,183,237,0.08)); border:1px solid rgba(13,183,237,0.2); border-radius:16px; padding:1.75rem; margin:1.5rem 0; }
        .quiz-box h3 { font-size:1rem; font-weight:700; color:var(--text); margin-bottom:1.25rem; }
        .quiz-list { list-style:none; display:flex; flex-direction:column; gap:0.75rem; }
        .qi { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:0.9rem 1rem; }
        .qi-n { font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:#0db7ed; letter-spacing:0.08em; margin-bottom:0.3rem; }
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
        .tk-card { background:var(--surface); border:1px solid var(--border); border-top:3px solid #0db7ed; border-radius:12px; padding:0.9rem 1rem; }
        .tk-card h4 { font-size:0.82rem; font-weight:700; color:var(--text); margin-bottom:0.4rem; font-family:'JetBrains Mono',monospace; }
        .tk-card p  { font-size:0.78rem; color:var(--text2); line-height:1.45; }

        /* ── Flow pill ── */
        .flow-pill { display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; justify-content:center; background:var(--surface2); border:1px solid var(--border); border-radius:12px; padding:1rem 1.5rem; margin:1.25rem 0; }
        .fp { font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:700; color:var(--text); background:var(--surface); border:1px solid var(--border); padding:0.45rem 0.9rem; border-radius:8px; }
        .fp-arrow { color:var(--muted); font-size:0.9rem; }

        /* ── Rules box ── */
        .rules-box { background:rgba(13,183,237,0.05); border:1px solid rgba(13,183,237,0.2); border-radius:12px; padding:1.25rem; margin:1.25rem 0; }
        .rules-box h4 { font-size:0.85rem; font-weight:700; color:#0a7abf; margin-bottom:0.65rem; }
        .rules-box ul { list-style:none; display:flex; flex-direction:column; gap:0.4rem; }
        .rules-box li { font-size:0.83rem; color:var(--text2); line-height:1.5; display:flex; gap:0.5rem; }
        .rules-box li::before { content:'✓'; color:#0db7ed; flex-shrink:0; font-weight:700; }

        /* ── Course complete card ── */
        .complete-card { background:linear-gradient(135deg,#001f3a 0%,#0a4a7a 30%,#0db7ed 70%,#56d364 100%); border-radius:24px; padding:3rem 2.5rem; margin-top:3rem; text-align:center; position:relative; overflow:hidden; }
        .complete-card::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(255,255,255,0.07) 1px,transparent 1px); background-size:20px 20px; }
        .complete-trophy { font-size:3.5rem; margin-bottom:0.75rem; position:relative; }
        .complete-card h2 { font-size:clamp(1.6rem,4vw,2.4rem); font-weight:900; color:#fff; margin-bottom:0.3rem; position:relative; letter-spacing:-0.03em; }
        .complete-sub { font-family:'JetBrains Mono',monospace; font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:1.25rem; position:relative; display:block; }
        .complete-card p { color:rgba(255,255,255,0.82); font-size:0.95rem; line-height:1.75; max-width:600px; margin:0 auto 2rem; position:relative; }

        .modules-achieved { display:grid; grid-template-columns:repeat(5,1fr); gap:0.5rem; margin:0 auto 2.5rem; max-width:700px; position:relative; }
        @media(max-width:600px){ .modules-achieved { grid-template-columns:1fr 1fr; } }
        .mod-badge { border-radius:14px; padding:0.85rem 0.5rem; text-align:center; border:1.5px solid rgba(255,255,255,0.18); background:rgba(255,255,255,0.08); }
        .mod-badge-icon { font-size:1.4rem; display:block; margin-bottom:0.35rem; }
        .mod-badge-name { font-family:'JetBrains Mono',monospace; font-size:0.6rem; letter-spacing:0.05em; color:#fff; display:block; margin-bottom:0.2rem; font-weight:700; }
        .mod-badge-sessions { font-size:0.65rem; color:rgba(255,255,255,0.55); display:block; }

        .skills-grid { display:flex; flex-wrap:wrap; gap:0.4rem; justify-content:center; position:relative; margin-bottom:2.5rem; }
        .skill-pill { font-family:'JetBrains Mono',monospace; font-size:0.62rem; letter-spacing:0.04em; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; padding:0.25rem 0.65rem; border-radius:100px; }

        .complete-links { display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap; position:relative; }
        .c-btn-primary { display:inline-flex; align-items:center; gap:0.5rem; background:#fff; color:#0a4a7a; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem; font-weight:700; padding:0.85rem 1.85rem; border-radius:12px; text-decoration:none; transition:all 0.2s; }
        .c-btn-primary:hover { opacity:0.92; transform:translateY(-2px); }
        .c-btn-secondary { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.1); border:1.5px solid rgba(255,255,255,0.25); color:#fff; font-family:'Plus Jakarta Sans',sans-serif; font-size:0.9rem; font-weight:700; padding:0.85rem 1.85rem; border-radius:12px; text-decoration:none; transition:all 0.2s; }
        .c-btn-secondary:hover { background:rgba(255,255,255,0.18); }

        @media(max-width:640px){
          .s15-page { padding:2rem 1rem 4rem; }
          .nav-row { flex-direction:column; }
          .nav-btn { width:100%; justify-content:center; }
          .hero { padding:1.5rem 1rem; border-radius:14px; }
          .hero h1 { font-size:1.3rem; }
          .jump-nav { flex-wrap:nowrap; overflow-x:auto; padding-bottom:0.4rem; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
          .jump-nav::-webkit-scrollbar { display:none; }
          .jpill { flex-shrink:0; }
          .act-box { padding:1.25rem 1rem; }
          .lab-ol { padding:0.85rem 0.85rem 0.85rem 1.75rem; }
          .complete-card { padding:2rem 1.25rem; }
          .complete-card h2 { font-size:1.4rem; }
        }
        @media(max-width:400px){ .hero h1 { font-size:1.1rem; } }
      `}</style>

      <div className="s15-page">

        <div className="bc">
          <Link href="/">Home</Link><span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link><span className="sep">/</span>
          <span className="cur">Session 15: Compose, Hub, Registry &amp; Swarm</span>
        </div>

        <div className="nav-row">
          <Link href="/courses/dev/session14" className="nav-btn">&larr; Session 14: Containers &amp; CLI</Link>
          <span className="nav-btn" style={{opacity:0.4, pointerEvents:"none", cursor:"default"}}>Course Complete &#127881;</span>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 15 of 15</span>
            <span className="h-mod">Module 5 &mdash; Docker &amp; Containers</span>
            <span className="h-fin">&#127881; Final Session</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~5 hrs
            </span>
          </div>
          <h1>&#9881; Dockerfile, Compose, Hub, Registry &amp; Swarm</h1>
          <p>Write production Dockerfiles, orchestrate full stacks with Compose, publish images to Hub, manage private registries, and deploy scalable services with Docker Swarm. Course capstone.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","Dockerfile Instructions","CMD vs ENTRYPOINT","Multi-Stage Builds",".dockerignore","Docker Hub","Private Registry","Docker Compose YAML","Compose Commands","Docker Swarm","Swarm Commands","Lab","Quiz","Homework"].map((l,i)=>(
            <a key={i} href={`#s15p${i}`} className={`jpill${i===0?" active":""}`}>{l}</a>
          ))}
        </div>

        {/* OBJECTIVES */}
        <div id="s15p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o,i)=>(
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* DOCKERFILE INSTRUCTIONS */}
        <div id="s15p1">
          <div className="pt"><span className="pt-badge">Dockerfile</span>Dockerfile Instructions — Complete Reference</div>
          <p className="body-text">
            A <strong>Dockerfile</strong> is a text file containing instructions that Docker executes sequentially to build an image. Each instruction that modifies the filesystem creates a new read-only layer. The order of instructions matters — both for correctness and for build performance.
          </p>
          <table className="df-table">
            <thead><tr><th>Instruction</th><th>Syntax Example</th><th>What it does</th></tr></thead>
            <tbody>
              {dockerfileInstructions.map(r=>(
                <tr key={r.instr}><td>{r.instr}</td><td>{r.syntax}</td><td>{r.desc}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Complete Java Spring Boot Dockerfile</div>
          <div className="cb">
<span className="c-cm"># ── Production Dockerfile for a Spring Boot application ──────</span>{"\n"}
<span className="c-kw">FROM</span> <span className="c-str">eclipse-temurin:17-jre-alpine</span>{"\n\n"}

<span className="c-cm"># Image metadata</span>{"\n"}
<span className="c-kw">LABEL</span> <span className="c-attr">maintainer</span>=<span className="c-val">"devops@company.com"</span> \{"\n"}
      <span className="c-attr">version</span>=<span className="c-val">"2.1.0"</span> \{"\n"}
      <span className="c-attr">description</span>=<span className="c-val">"Order Service API"</span>{"\n\n"}

<span className="c-cm"># Create a non-root user — never run as root in production</span>{"\n"}
<span className="c-kw">RUN</span> addgroup -S appgroup {"&&"} adduser -S appuser -G appgroup{"\n\n"}

<span className="c-cm"># Set working directory</span>{"\n"}
<span className="c-kw">WORKDIR</span> /app{"\n\n"}

<span className="c-cm"># Copy the JAR built by Maven (session 12!)</span>{"\n"}
<span className="c-kw">COPY</span> target/order-service-2.1.0.jar app.jar{"\n\n"}

<span className="c-cm"># Set ownership to the non-root user</span>{"\n"}
<span className="c-kw">RUN</span> chown appuser:appgroup app.jar{"\n\n"}

<span className="c-cm"># Switch to non-root user for all following instructions</span>{"\n"}
<span className="c-kw">USER</span> appuser{"\n\n"}

<span className="c-cm"># JVM tuning environment variables</span>{"\n"}
<span className="c-kw">ENV</span> JAVA_OPTS=<span className="c-val">"-Xms256m -Xmx512m -XX:+UseContainerSupport"</span>{"\n"}
<span className="c-kw">ENV</span> SPRING_PROFILES_ACTIVE=<span className="c-val">production</span>{"\n\n"}

<span className="c-cm"># Document the port the app listens on</span>{"\n"}
<span className="c-kw">EXPOSE</span> 8080{"\n\n"}

<span className="c-cm"># Health check — Swarm and Kubernetes use this</span>{"\n"}
<span className="c-kw">HEALTHCHECK</span> --interval=30s --timeout=10s --retries=3 \{"\n"}
  <span className="c-kw">CMD</span> wget -qO- http://localhost:8080/actuator/health || exit 1{"\n\n"}

<span className="c-cm"># ENTRYPOINT = the fixed executable. CMD = its default args.</span>{"\n"}
<span className="c-kw">ENTRYPOINT</span> [<span className="c-str">"java"</span>]{"\n"}
<span className="c-kw">CMD</span> [<span className="c-str">"-jar"</span>, <span className="c-str">"app.jar"</span>]
          </div>
        </div>

        {/* CMD VS ENTRYPOINT */}
        <div id="s15p2">
          <div className="pt"><span className="pt-badge">Key Concepts</span>CMD vs ENTRYPOINT</div>
          <p className="body-text">
            The distinction between <code>CMD</code> and <code>ENTRYPOINT</code> trips up almost every Docker beginner. The rule of thumb: use <code>ENTRYPOINT</code> for the fixed executable that defines what the container <em>is</em>, and <code>CMD</code> for its default arguments that callers might reasonably override.
          </p>
          <table className="compare-table">
            <thead><tr><th>Aspect</th><th>CMD</th><th>ENTRYPOINT</th></tr></thead>
            <tbody>
              {cmdVsEntrypoint.map(r=>(
                <tr key={r.aspect}><td>{r.aspect}</td><td>{r.cmd}</td><td>{r.ep}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="cb">
<span className="c-cm"># ── Shell form vs exec form — ALWAYS use exec form ───────────</span>{"\n"}
<span className="c-cm"># Shell form (avoid) — runs via /bin/sh -c. Signals not forwarded.</span>{"\n"}
<span className="c-kw">CMD</span> node server.js{"\n\n"}
<span className="c-cm"># Exec form (correct) — runs directly. Receives OS signals.</span>{"\n"}
<span className="c-kw">CMD</span> [<span className="c-str">"node"</span>, <span className="c-str">"server.js"</span>]{"\n\n"}

<span className="c-cm"># ── ENTRYPOINT + CMD together ────────────────────────────────</span>{"\n"}
<span className="c-kw">ENTRYPOINT</span> [<span className="c-str">"java"</span>, <span className="c-str">"-jar"</span>]   <span className="c-cm">  # fixed: always run java -jar</span>{"\n"}
<span className="c-kw">CMD</span> [<span className="c-str">"app.jar"</span>]              <span className="c-cm">  # default: app.jar (overridable)</span>{"\n\n"}
<span className="c-cm"># docker run myimage                → java -jar app.jar</span>{"\n"}
<span className="c-cm"># docker run myimage other.jar      → java -jar other.jar</span>{"\n"}
<span className="c-cm"># docker run --entrypoint sh myimage → sh (overrides ENTRYPOINT)</span>
          </div>
        </div>

        {/* MULTI-STAGE BUILDS */}
        <div id="s15p3">
          <div className="pt"><span className="pt-badge">Best Practice</span>Multi-Stage Builds</div>
          <p className="body-text">
            A <strong>multi-stage build</strong> uses multiple <code>FROM</code> statements in a single Dockerfile. Each stage is independent. You use a fat build stage (with Maven, JDK, Node build tools) to compile the application, then <code>COPY --from=build</code> only the artifact into a lean final stage. Build tools never enter the production image.
          </p>
          <div className="cb">
<span className="c-cm"># ── Multi-stage Dockerfile: Maven + Java ─────────────────────</span>{"\n"}

<span className="c-cm"># ── Stage 1: BUILD ── Full JDK + Maven to compile ────────────</span>{"\n"}
<span className="c-kw">FROM</span> <span className="c-str">maven:3.9-eclipse-temurin-17</span> <span className="c-kw">AS</span> build{"\n"}
<span className="c-kw">WORKDIR</span> /build{"\n\n"}

<span className="c-cm"># Copy pom.xml first — cache this layer (dependencies rarely change)</span>{"\n"}
<span className="c-kw">COPY</span> pom.xml .{"\n"}
<span className="c-kw">RUN</span> mvn dependency:go-offline -q   <span className="c-cm">  # pre-download all dependencies</span>{"\n\n"}

<span className="c-cm"># Now copy source — this layer rebuilds only when code changes</span>{"\n"}
<span className="c-kw">COPY</span> src ./src{"\n"}
<span className="c-kw">RUN</span> mvn clean package -DskipTests -q{"\n\n"}

<span className="c-cm"># ── Stage 2: PRODUCTION ── Minimal JRE only ──────────────────</span>{"\n"}
<span className="c-kw">FROM</span> <span className="c-str">eclipse-temurin:17-jre-alpine</span> <span className="c-kw">AS</span> production{"\n"}
<span className="c-kw">WORKDIR</span> /app{"\n"}
<span className="c-kw">RUN</span> addgroup -S app {"&&"} adduser -S app -G app{"\n\n"}

<span className="c-cm"># Copy ONLY the JAR from the build stage — no Maven, no JDK, no source</span>{"\n"}
<span className="c-kw">COPY</span> --from=build /build/target/*.jar app.jar{"\n"}
<span className="c-kw">RUN</span> chown app:app app.jar{"\n"}
<span className="c-kw">USER</span> app{"\n"}
<span className="c-kw">EXPOSE</span> 8080{"\n"}
<span className="c-kw">ENTRYPOINT</span> [<span className="c-str">"java"</span>, <span className="c-str">"-jar"</span>, <span className="c-str">"app.jar"</span>]{"\n\n"}

<span className="c-cm"># Build result comparison:</span>{"\n"}
<span className="c-cm"># Single-stage (JDK + Maven + app):  ~680MB</span>{"\n"}
<span className="c-ok"># Multi-stage (JRE + app only):       ~85MB  ← 8x smaller</span>{"\n\n"}

<span className="c-cm"># Build targeting a specific stage (useful for debugging):</span>{"\n"}
docker build --target build -t myapp:build-debug .{"\n"}
docker build --target production -t myapp:2.1.0 .
          </div>
          <div className="tip-box">
            <h4>&#128161; Layer Caching Strategy — pom.xml Trick</h4>
            <ul>
              <li><strong>Copy pom.xml before source code.</strong> Maven dependencies only change when pom.xml changes. If you copy pom.xml first and run <code>mvn dependency:go-offline</code>, Docker caches that layer.</li>
              <li>When you change only source code — not pom.xml — the dependency download layer is reused. Build goes from 3 minutes to 15 seconds.</li>
              <li>Same principle applies to Node.js: copy <code>package.json</code> and run <code>npm install</code> before copying your <code>src/</code> — <code>node_modules</code> is cached unless package.json changes.</li>
            </ul>
          </div>
        </div>

        {/* DOCKERIGNORE */}
        <div id="s15p4">
          <div className="pt"><span className="pt-badge">Best Practice</span>.dockerignore</div>
          <p className="body-text">
            <code>.dockerignore</code> works like <code>.gitignore</code> — it excludes files and directories from the build context that Docker sends to the daemon. Without it, <code>docker build</code> sends your entire project directory including <code>node_modules</code>, test output, <code>.git</code> history, and secrets.
          </p>
          <div className="cb">
<span className="c-cm"># .dockerignore — exclude from build context</span>{"\n\n"}
<span className="c-cm"># Version control</span>{"\n"}
<span className="c-ok">.git</span>{"\n"}
<span className="c-ok">.gitignore</span>{"\n\n"}
<span className="c-cm"># Build output — the multi-stage build produces its own</span>{"\n"}
<span className="c-ok">target/</span>{"\n"}
<span className="c-ok">*.class</span>{"\n\n"}
<span className="c-cm"># Node.js — never send node_modules (often gigabytes)</span>{"\n"}
<span className="c-ok">node_modules/</span>{"\n"}
<span className="c-ok">npm-debug.log</span>{"\n\n"}
<span className="c-cm"># IDE and OS files</span>{"\n"}
<span className="c-ok">.idea/</span>{"\n"}
<span className="c-ok">.vscode/</span>{"\n"}
<span className="c-ok">*.DS_Store</span>{"\n"}
<span className="c-ok">Thumbs.db</span>{"\n\n"}
<span className="c-cm"># Secrets and config — NEVER include these in an image</span>{"\n"}
<span className="c-ok">.env</span>{"\n"}
<span className="c-ok">.env.*</span>{"\n"}
<span className="c-ok">*.pem</span>{"\n"}
<span className="c-ok">*.key</span>{"\n"}
<span className="c-ok">secrets/</span>{"\n\n"}
<span className="c-cm"># Docker files themselves (not needed in context)</span>{"\n"}
<span className="c-ok">Dockerfile*</span>{"\n"}
<span className="c-ok">docker-compose*.yml</span>{"\n\n"}
<span className="c-cm"># Test output</span>{"\n"}
<span className="c-ok">target/surefire-reports/</span>
          </div>
        </div>

        {/* DOCKER HUB */}
        <div id="s15p5">
          <div className="pt"><span className="pt-badge">Registry</span>Pushing to Docker Hub</div>
          <p className="body-text">
            Docker Hub is the default public registry. Pushing an image makes it available to any machine with Docker installed. Images can be public (free, visible to everyone) or private (requires login, limited free private repos).
          </p>
          <div className="cb">
<span className="c-cm"># ── Push your image to Docker Hub ────────────────────────────</span>{"\n\n"}
<span className="c-cm"># 1. Create a free account at hub.docker.com</span>{"\n\n"}
<span className="c-cm"># 2. Log in from the CLI</span>{"\n"}
docker login{"\n"}
<span className="c-ok">Username: yourusername</span>{"\n"}
<span className="c-ok">Password:</span>{"\n"}
<span className="c-ok">Login Succeeded</span>{"\n\n"}
<span className="c-cm"># 3. Tag your image with your Hub username as the namespace</span>{"\n"}
<span className="c-cm">#    Format: username/repository:tag</span>{"\n"}
docker tag my-api:1.0 yourusername/my-api:1.0{"\n"}
docker tag my-api:1.0 yourusername/my-api:latest  <span className="c-cm">  # also tag as latest</span>{"\n\n"}
<span className="c-cm"># 4. Push to Docker Hub</span>{"\n"}
docker push yourusername/my-api:1.0{"\n"}
<span className="c-ok">The push refers to repository [docker.io/yourusername/my-api]</span>{"\n"}
<span className="c-ok">a1b2c3: Pushed</span>{"\n"}
<span className="c-ok">b2c3d4: Pushed</span>{"\n"}
<span className="c-ok">1.0: digest: sha256:abc123... size: 1234</span>{"\n\n"}
<span className="c-cm"># 5. Pull from another machine</span>{"\n"}
docker pull yourusername/my-api:1.0{"\n\n"}
<span className="c-cm"># Set image to private on hub.docker.com (Account Settings → Repository)</span>{"\n"}
<span className="c-cm"># Private images require docker login before docker pull</span>
          </div>
          <div className="warn-box">
            <h4>&#9888; Never Push Images Containing Secrets</h4>
            <ul>
              <li>Scan images with <code>docker scout cves myimage:tag</code> before pushing — check for CVEs in base image layers</li>
              <li>Always build with <code>.dockerignore</code> — accidentally included <code>.env</code> files and <code>*.pem</code> keys are visible to anyone who pulls the image</li>
              <li>Run <code>docker history myimage</code> — inspect every layer. If you see a layer that added and then deleted a secret, the secret is still in the image history</li>
              <li>Use multi-stage builds — secrets used during build (e.g. npm tokens) never enter the final production image</li>
            </ul>
          </div>
        </div>

        {/* PRIVATE REGISTRY */}
        <div id="s15p6">
          <div className="pt"><span className="pt-badge">Enterprise</span>Private Registries — DTR &amp; Alternatives</div>
          <p className="body-text">
            <strong>Docker Trusted Registry (DTR)</strong> was Docker Enterprise&apos;s on-premise private registry — now part of Mirantis Container Registry. In practice, most organisations use <strong>Nexus Repository</strong>, <strong>JFrog Artifactory</strong>, <strong>AWS ECR</strong>, <strong>Google Artifact Registry</strong>, or <strong>Azure ACR</strong> as their private registry.
          </p>
          <div className="ex-box">
            <div className="ex-label">&#127963; Why a Private Registry?</div>
            <p><strong>Security:</strong> proprietary application images must not be public. Source code, business logic, and configuration embedded in images must stay within the organisation.</p>
            <p><strong>Speed:</strong> a registry inside the corporate network is far faster than pulling from Docker Hub — critical in CI where every pipeline pulls images.</p>
            <p><strong>Control:</strong> manage which images are approved for use, enforce vulnerability scanning gates, control access by team, retain images for audit compliance.</p>
            <p><strong>Air-gapped environments:</strong> production environments with no internet access need a local registry mirror. The registry proxy caches external images once; all internal machines pull from the local cache.</p>
          </div>
          <div className="cb">
<span className="c-cm"># ── Using a private registry ─────────────────────────────────</span>{"\n\n"}
<span className="c-cm"># Log in to private registry</span>{"\n"}
docker login registry.company.com{"\n\n"}
<span className="c-cm"># Tag with the private registry URL as namespace</span>{"\n"}
docker tag my-api:1.0 registry.company.com/team/my-api:1.0{"\n\n"}
<span className="c-cm"># Push to private registry</span>{"\n"}
docker push registry.company.com/team/my-api:1.0{"\n\n"}
<span className="c-cm"># Pull on any machine authenticated to the registry</span>{"\n"}
docker pull registry.company.com/team/my-api:1.0{"\n\n"}
<span className="c-cm"># ── Run a local registry for testing ─────────────────────────</span>{"\n"}
docker run -d -p 5000:5000 --name registry --restart always \{"\n"}
  -v registry-data:/var/lib/registry \{"\n"}
  registry:2{"\n\n"}
docker tag my-api:1.0 localhost:5000/my-api:1.0{"\n"}
docker push localhost:5000/my-api:1.0
          </div>
        </div>

        {/* COMPOSE YAML */}
        <div id="s15p7">
          <div className="pt"><span className="pt-badge">Docker Compose</span>Writing docker-compose.yml</div>
          <p className="body-text">
            A <code>docker-compose.yml</code> file declares your entire application stack as code — services, networks, volumes, environment — in a single YAML file checked into version control. One command starts the whole stack.
          </p>
          <div className="sub-h">Compose File Keys Reference</div>
          <table className="data-table">
            <thead><tr><th>Key</th><th>Description</th></tr></thead>
            <tbody>
              {composeKeys.map(r=>(
                <tr key={r.key}><td>{r.key}</td><td>{r.desc}</td></tr>
              ))}
            </tbody>
          </table>

          <div className="sub-h">Complete Production Stack Example</div>
          <div className="cb">
<span className="c-cm"># docker-compose.yml — React frontend + Node API + PostgreSQL</span>{"\n"}
<span className="c-yml">version</span>: <span className="c-str">'3.8'</span>{"\n\n"}

<span className="c-yml">services</span>:{"\n\n"}

  <span className="c-yml">db</span>:{"\n"}
    <span className="c-yml">image</span>: <span className="c-str">postgres:15-alpine</span>{"\n"}
    <span className="c-yml">container_name</span>: <span className="c-str">myapp-db</span>{"\n"}
    <span className="c-yml">restart</span>: <span className="c-str">unless-stopped</span>{"\n"}
    <span className="c-yml">environment</span>:{"\n"}
      <span className="c-yml">POSTGRES_DB</span>: <span className="c-str">myapp</span>{"\n"}
      <span className="c-yml">POSTGRES_USER</span>: <span className="c-str">appuser</span>{"\n"}
      <span className="c-yml">POSTGRES_PASSWORD_FILE</span>: <span className="c-str">/run/secrets/db_password</span>{"\n"}
    <span className="c-yml">volumes</span>:{"\n"}
      - <span className="c-str">pgdata:/var/lib/postgresql/data</span>{"\n"}
    <span className="c-yml">networks</span>:{"\n"}
      - <span className="c-str">backend</span>{"\n"}
    <span className="c-yml">healthcheck</span>:{"\n"}
      <span className="c-yml">test</span>: [<span className="c-str">"CMD-SHELL"</span>, <span className="c-str">"pg_isready -U appuser -d myapp"</span>]{"\n"}
      <span className="c-yml">interval</span>: <span className="c-str">10s</span>{"\n"}
      <span className="c-yml">timeout</span>: <span className="c-str">5s</span>{"\n"}
      <span className="c-yml">retries</span>: <span className="c-str">5</span>{"\n\n"}

  <span className="c-yml">api</span>:{"\n"}
    <span className="c-yml">build</span>:{"\n"}
      <span className="c-yml">context</span>: <span className="c-str">./api</span>{"\n"}
      <span className="c-yml">dockerfile</span>: <span className="c-str">Dockerfile</span>{"\n"}
    <span className="c-yml">container_name</span>: <span className="c-str">myapp-api</span>{"\n"}
    <span className="c-yml">restart</span>: <span className="c-str">unless-stopped</span>{"\n"}
    <span className="c-yml">ports</span>:{"\n"}
      - <span className="c-str">"3000:3000"</span>{"\n"}
    <span className="c-yml">environment</span>:{"\n"}
      <span className="c-yml">NODE_ENV</span>: <span className="c-str">production</span>{"\n"}
      <span className="c-yml">DATABASE_URL</span>: <span className="c-str">postgresql://appuser@db:5432/myapp</span>{"\n"}
    <span className="c-yml">depends_on</span>:{"\n"}
      <span className="c-yml">db</span>:{"\n"}
        <span className="c-yml">condition</span>: <span className="c-str">service_healthy</span>   <span className="c-cm">  # waits for healthcheck to pass</span>{"\n"}
    <span className="c-yml">networks</span>:{"\n"}
      - <span className="c-str">backend</span>{"\n"}
      - <span className="c-str">frontend</span>{"\n\n"}

  <span className="c-yml">web</span>:{"\n"}
    <span className="c-yml">image</span>: <span className="c-str">nginx:1.25-alpine</span>{"\n"}
    <span className="c-yml">container_name</span>: <span className="c-str">myapp-web</span>{"\n"}
    <span className="c-yml">restart</span>: <span className="c-str">unless-stopped</span>{"\n"}
    <span className="c-yml">ports</span>:{"\n"}
      - <span className="c-str">"80:80"</span>{"\n"}
      - <span className="c-str">"443:443"</span>{"\n"}
    <span className="c-yml">volumes</span>:{"\n"}
      - <span className="c-str">./nginx/nginx.conf:/etc/nginx/nginx.conf:ro</span>{"\n"}
      - <span className="c-str">./dist:/usr/share/nginx/html:ro</span>       <span className="c-cm">  # built React app</span>{"\n"}
      - <span className="c-str">certbot-certs:/etc/letsencrypt:ro</span>{"\n"}
    <span className="c-yml">networks</span>:{"\n"}
      - <span className="c-str">frontend</span>{"\n\n"}

<span className="c-yml">volumes</span>:{"\n"}
  <span className="c-yml">pgdata</span>:{"\n"}
  <span className="c-yml">certbot-certs</span>:{"\n\n"}

<span className="c-yml">networks</span>:{"\n"}
  <span className="c-yml">frontend</span>:{"\n"}
  <span className="c-yml">backend</span>:
          </div>
          <div className="tip-box">
            <h4>&#128161; condition: service_healthy in depends_on</h4>
            <ul>
              <li>Plain <code>depends_on: [db]</code> only waits for the container to <em>start</em> — the database process may still be initialising</li>
              <li><code>condition: service_healthy</code> waits until the <code>healthcheck</code> reports <strong>healthy</strong> — the database is actually ready to accept connections</li>
              <li>This requires a <code>healthcheck</code> defined on the dependency service — as shown in the <code>db</code> service above</li>
              <li>Your application should also implement retry logic regardless — in production, network blips happen at any time</li>
            </ul>
          </div>
        </div>

        {/* COMPOSE COMMANDS */}
        <div id="s15p8">
          <div className="pt"><span className="pt-badge">Compose CLI</span>Docker Compose Commands</div>
          <div className="cmd-list">
            {composeCommands.map(([cmd,desc])=>(
              <div key={cmd} className="cmd-row">
                <span className="cmd-code">{cmd}</span>
                <span className="cmd-desc">{desc}</span>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># Typical development workflow</span>{"\n"}
docker compose up -d --build          <span className="c-cm">  # start everything, rebuild if needed</span>{"\n"}
docker compose logs -f api            <span className="c-cm">  # watch api logs</span>{"\n"}
docker compose exec api sh            <span className="c-cm">  # debug shell in api container</span>{"\n"}
docker compose restart api            <span className="c-cm">  # restart after config change</span>{"\n"}
docker compose down                   <span className="c-cm">  # stop everything, keep data</span>{"\n\n"}
<span className="c-cm"># Clean slate reset (WARNING: deletes database data)</span>{"\n"}
docker compose down -v                <span className="c-cm">  # stop + delete volumes</span>{"\n"}
docker compose up -d --build          <span className="c-cm">  # fresh start</span>
          </div>
        </div>

        {/* DOCKER SWARM */}
        <div id="s15p9">
          <div className="pt"><span className="pt-badge">Orchestration</span>Docker Swarm</div>
          <p className="body-text">
            <strong>Docker Swarm</strong> is Docker&apos;s native container orchestration system. It turns a group of Docker hosts into a single, self-healing cluster. Where <code>docker compose</code> manages containers on one machine, Swarm manages services across many machines — with automatic load balancing, health-based replacement, rolling updates, and encrypted secrets.
          </p>
          <div className="swarm-grid">
            {swarmConcepts.map(c=>(
              <div key={c.term} className="swarm-card">
                <div className="swarm-term">{c.term}</div>
                <div className="swarm-def">{c.def}</div>
              </div>
            ))}
          </div>
          <div className="flow-pill">
            <span className="fp">Manager Nodes</span><span className="fp-arrow">&darr;</span>
            <span className="fp">Desired State</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">Scheduler</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">Worker Nodes</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">Tasks (containers)</span>
          </div>
          <div className="cb">
<span className="c-cm"># ── Initialise a single-node Swarm ───────────────────────────</span>{"\n"}
docker swarm init{"\n"}
<span className="c-ok">Swarm initialized: current node (abc123) is now a manager.</span>{"\n"}
<span className="c-ok">To add a worker to this swarm, run:</span>{"\n"}
<span className="c-ok">    docker swarm join --token SWMTKN-1-xxx HOST:2377</span>{"\n\n"}
<span className="c-cm"># ── Deploy a Compose file as a Swarm stack ───────────────────</span>{"\n"}
docker stack deploy -c docker-compose.yml myapp{"\n"}
<span className="c-ok">Creating network myapp_frontend</span>{"\n"}
<span className="c-ok">Creating network myapp_backend</span>{"\n"}
<span className="c-ok">Creating service myapp_db</span>{"\n"}
<span className="c-ok">Creating service myapp_api</span>{"\n"}
<span className="c-ok">Creating service myapp_web</span>{"\n\n"}
<span className="c-cm"># ── Scale a service ──────────────────────────────────────────</span>{"\n"}
docker service scale myapp_api=5{"\n"}
<span className="c-ok">myapp_api scaled to 5</span>{"\n\n"}
<span className="c-cm"># ── Rolling update — zero downtime ───────────────────────────</span>{"\n"}
docker service update \{"\n"}
  --image registry.company.com/myapp-api:2.2.0 \{"\n"}
  --update-parallelism 1 \   <span className="c-cm">  # update 1 replica at a time</span>{"\n"}
  --update-delay 10s \       <span className="c-cm">  # wait 10s between each</span>{"\n"}
  myapp_api{"\n\n"}
<span className="c-cm"># Roll back if the update goes wrong</span>{"\n"}
docker service rollback myapp_api
          </div>
        </div>

        {/* SWARM COMMANDS */}
        <div id="s15p10">
          <div className="pt"><span className="pt-badge">Swarm CLI</span>Docker Swarm Commands</div>
          <div className="cmd-list">
            {swarmCommands.map(([cmd,desc])=>(
              <div key={cmd} className="cmd-row">
                <span className="cmd-code">{cmd}</span>
                <span className="cmd-desc">{desc}</span>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># ── Swarm secrets — encrypted, file-mounted ──────────────────</span>{"\n"}
echo "S3cr3tP@ssw0rd" | docker secret create db_password -{"\n"}
docker secret ls{"\n"}
<span className="c-ok">ID             NAME          CREATED</span>{"\n"}
<span className="c-ok">x9q1w2e3r4t5   db_password   2 minutes ago</span>{"\n\n"}
<span className="c-cm"># Reference in Compose/Stack file:</span>{"\n"}
<span className="c-yml">services</span>:{"\n"}
  <span className="c-yml">db</span>:{"\n"}
    <span className="c-yml">image</span>: <span className="c-str">postgres:15</span>{"\n"}
    <span className="c-yml">secrets</span>: [<span className="c-str">db_password</span>]{"\n"}
    <span className="c-yml">environment</span>:{"\n"}
      <span className="c-yml">POSTGRES_PASSWORD_FILE</span>: <span className="c-str">/run/secrets/db_password</span>{"\n"}
<span className="c-yml">secrets</span>:{"\n"}
  <span className="c-yml">db_password</span>:{"\n"}
    <span className="c-yml">external</span>: <span className="c-str">true</span>
          </div>
        </div>

        {/* LAB */}
        <div id="s15p11">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities — Course Capstone</h3>

            <h4>Lab 1 — Write and Build a Dockerfile</h4>
            <ol className="lab-ol">
              <li>Create a simple Node.js Express API: <code>npm init -y {"&&"} npm install express</code>. Write a server.js with a <code>/</code> route returning your name and a <code>/health</code> route returning <code>{"{ status: 'ok' }"}</code></li>
              <li>Write a multi-stage Dockerfile: stage 1 uses <code>node:20-alpine</code> to install dependencies, stage 2 copies only what is needed into a fresh <code>node:20-alpine</code> image as a non-root user</li>
              <li>Create a <code>.dockerignore</code> excluding <code>node_modules</code>, <code>.env</code>, and <code>.git</code></li>
              <li>Build: <code>docker build -t my-api:1.0 .</code>. Run: <code>docker run -d -p 3000:3000 --name api my-api:1.0</code></li>
              <li>Verify: <code>curl http://localhost:3000/health</code>. Then run <code>docker history my-api:1.0</code> — confirm the non-root user and tiny size</li>
            </ol>

            <h4>Lab 2 — Push to Docker Hub</h4>
            <ol className="lab-ol">
              <li>Create a free Docker Hub account at hub.docker.com</li>
              <li><code>docker login</code> — authenticate your CLI</li>
              <li><code>docker tag my-api:1.0 YOURUSERNAME/my-api:1.0</code></li>
              <li><code>docker push YOURUSERNAME/my-api:1.0</code> — watch each layer upload</li>
              <li>Delete your local image: <code>docker image rm my-api:1.0 YOURUSERNAME/my-api:1.0</code></li>
              <li>Pull it back from Hub: <code>docker pull YOURUSERNAME/my-api:1.0</code>. Run it again — confirm it works from the remote image</li>
            </ol>

            <h4>Lab 3 — Docker Compose Full Stack</h4>
            <ol className="lab-ol">
              <li>Write a <code>docker-compose.yml</code> with three services: your Node API from Lab 1, a PostgreSQL 15 database, and pgAdmin for the database UI</li>
              <li>Connect api and db on a <code>backend</code> network. Connect pgAdmin and db on a separate <code>admin</code> network. The API&apos;s port 3000 is the only port exposed externally — db has no <code>ports:</code> section</li>
              <li>Add a healthcheck to the db service and use <code>condition: service_healthy</code> in the api&apos;s depends_on</li>
              <li>Run <code>docker compose up -d --build</code>. Verify all three containers show healthy with <code>docker compose ps</code></li>
              <li>Test network isolation: exec into the api container and confirm it can reach <code>db</code> by name. Then exec into a standalone container with no network attached and confirm it <em>cannot</em> reach <code>db</code></li>
            </ol>

            <h4>Lab 4 — Docker Swarm Single-Node</h4>
            <ol className="lab-ol">
              <li>Initialise a Swarm: <code>docker swarm init</code></li>
              <li>Deploy your Compose file as a stack: <code>docker stack deploy -c docker-compose.yml myapp</code></li>
              <li>Verify services: <code>docker service ls</code> — all should show the desired/running replica count</li>
              <li>Scale the API service: <code>docker service scale myapp_api=3</code>. Watch replicas start: <code>docker service ps myapp_api</code></li>
              <li>Simulate a failure: <code>docker rm -f</code> one of the API task containers. Watch Swarm automatically replace it: <code>docker service ps myapp_api</code></li>
              <li>Tear down: <code>docker stack rm myapp {"&&"} docker swarm leave --force</code></li>
            </ol>

            <h4>&#127942; Challenge — Complete DevOps Pipeline</h4>
            <ol className="lab-ol">
              <li>Combine Sessions 8 (Jenkins), 12 (Maven), and 15 (Docker): create a Jenkins pipeline that checks out your Java project, runs <code>mvn clean package</code>, builds a Docker image, and pushes it to Docker Hub</li>
              <li>Jenkins pipeline stages: <strong>Checkout</strong> &rarr; <strong>Maven Build</strong> &rarr; <strong>Docker Build</strong> &rarr; <strong>Docker Push</strong> &rarr; <strong>Deploy Stack</strong></li>
              <li>The Deploy stage should run <code>docker stack deploy</code> to update the running Swarm service with the new image</li>
              <li>Make a code change, commit, trigger the pipeline — verify the new version is deployed with zero downtime</li>
            </ol>
          </div>
        </div>

        {/* QUIZ */}
        <div id="s15p12" className="quiz-box">
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
        <div id="s15p13" className="hw-box">
          <h3>&#128221; Final Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Production Dockerfile:</h4>
            <ul>
              <li>Write a multi-stage Dockerfile for your Maven Java project from Module 4 — build stage uses <code>maven:3.9</code>, production stage uses <code>eclipse-temurin:17-jre-alpine</code></li>
              <li>Include: non-root user, HEALTHCHECK, LABEL metadata, JVM tuning ENV vars, .dockerignore</li>
              <li>Compare image sizes: single-stage vs multi-stage — document the difference</li>
              <li>Run <code>docker history</code> on both — document which layers take the most space</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Docker Compose Production Config:</h4>
            <ul>
              <li>Write a production-grade docker-compose.yml for a 3-tier application (web + api + database) using all best practices from this session</li>
              <li>Must include: healthchecks on all services, <code>condition: service_healthy</code> depends_on, separate frontend and backend networks, named volumes for data, restart: unless-stopped on all services</li>
              <li>Use an <code>env_file</code> for secrets — document which variables are required and why</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Swarm Exploration:</h4>
            <ul>
              <li>Deploy your Compose stack to a single-node Swarm. Scale the API service to 5 replicas.</li>
              <li>Perform a rolling update to a new image version — document the output of <code>docker service ps</code> during the update</li>
              <li>Create a Swarm secret and use it in your PostgreSQL service — verify the secret is accessible at <code>/run/secrets/</code> inside the container but does not appear in <code>docker inspect</code> environment variables</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Course Capstone — Full DevOps Pipeline:</h4>
            <ul>
              <li>Build an end-to-end pipeline combining all 5 modules: <strong>Git push</strong> triggers <strong>Jenkins</strong> &rarr; <strong>Maven build</strong> &rarr; <strong>Docker image built</strong> &rarr; <strong>pushed to Hub/registry</strong> &rarr; <strong>Swarm stack updated</strong></li>
              <li>Write a Jenkinsfile (declarative pipeline syntax from Session 8) with all five stages</li>
              <li>Submit a video or screenshot sequence showing: code change committed, Jenkins pipeline runs, new Docker image appears in registry, <code>docker service ps</code> shows the rolling update completing</li>
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
          <span className="fp">Dockerfile</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">docker build</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Image</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">docker push</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Registry</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Swarm Deploy</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">&#127881; Live</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; Docker Production Golden Rules — Module 5 Complete</h4>
          <ul>
            <li>Always use multi-stage builds — build tools and source code must never be in the production image</li>
            <li>Run as a non-root user — create an application user in the Dockerfile and <code>USER</code> to it before <code>CMD</code></li>
            <li>Use <code>.dockerignore</code> — never let secrets, <code>node_modules</code>, or <code>.git</code> into the build context</li>
            <li>Pin all base image versions — <code>node:20.11.0-alpine3.19</code> not <code>node:latest</code></li>
            <li>Add HEALTHCHECK to all production images — enables self-healing in Swarm and Kubernetes</li>
            <li>Never expose database ports externally — use custom networks and access by container/service name</li>
            <li>Use Swarm secrets for all sensitive values — never environment variables for passwords or API keys</li>
            <li>Configure rolling updates with <code>--update-parallelism 1 --update-delay 10s</code> — always ensure zero-downtime deployments</li>
          </ul>
        </div>

        {/* COURSE COMPLETE */}
        <div className="complete-card">
          <div className="complete-trophy">&#127942;</div>
          <h2>DevOps Course Complete!</h2>
          <span className="complete-sub">All 15 Sessions &mdash; All 5 Modules &mdash; Fully Achieved</span>
          <p>From DevOps principles to Jenkins pipelines, Maven builds, and Docker production deployments — you have covered the full modern DevOps engineering stack. You are equipped to build, test, containerise, and deploy real applications in professional CI/CD environments.</p>

          <div className="modules-achieved">
            {[
              { icon:"&#128218;", name:"DevOps Foundations",     sessions:"Sessions 1–3" },
              { icon:"&#9881;",   name:"DevOps in Practice",     sessions:"Sessions 4–6" },
              { icon:"&#128679;", name:"CI with Jenkins",        sessions:"Sessions 7–10" },
              { icon:"&#128230;", name:"Build Tool: Maven",      sessions:"Sessions 11–12" },
              { icon:"&#127388;", name:"Docker & Containers",    sessions:"Sessions 13–15" },
            ].map(m=>(
              <div key={m.name} className="mod-badge">
                <span className="mod-badge-icon" dangerouslySetInnerHTML={{__html:m.icon}}/>
                <span className="mod-badge-name">{m.name}</span>
                <span className="mod-badge-sessions">{m.sessions}</span>
              </div>
            ))}
          </div>

          <div className="skills-grid">
            {[
              "DevOps Culture","CI/CD Principles","Git Workflow","Jenkins Install","Freestyle Jobs",
              "Declarative Pipeline","Jenkinsfile","Master-Slave","Build Triggers","Maven Install",
              "pom.xml","GAV Coordinates","SNAPSHOT vs Release","Maven Lifecycle","23 Phases",
              "Local .m2 Repo","Maven Central","settings.xml","Multi-Module POM","dependencyManagement",
              "Docker Images","Layered Filesystem","docker run","Port Mapping","Named Volumes",
              "Bind Mounts","docker exec","Custom Networks","DNS by Name","Dockerfile",
              "Multi-Stage Builds",".dockerignore","CMD vs ENTRYPOINT","Docker Hub","docker push",
              "Private Registry","Docker Compose","compose up/down","Docker Swarm","Rolling Updates",
              "Swarm Secrets","Swarm Services","Stack Deploy",
            ].map(s=>(
              <span key={s} className="skill-pill">&#10003; {s}</span>
            ))}
          </div>

          <div className="complete-links">
            <Link href="/courses/dev/session1" className="c-btn-secondary">&#8592; Back to Session 1</Link>
            <Link href="/courses/dev/session11" className="c-btn-secondary">Module 4: Maven</Link>
            <Link href="/courses/dev/session13" className="c-btn-primary">&#127381; Module 5 Start</Link>
          </div>
        </div>

      </div>
    </>
  );
}