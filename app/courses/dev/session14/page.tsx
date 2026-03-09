// app/courses/dev/session14/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Create, start, stop, restart, and remove Docker containers using the CLI",
  "Understand the difference between docker run, docker start, and docker create",
  "Run interactive containers with -it and execute commands inside running containers with exec",
  "Map container ports to host ports and understand the -p flag syntax",
  "Pass environment variables into containers at runtime using -e and --env-file",
  "Mount volumes to persist data beyond the container lifecycle",
  "Understand Docker networking — bridge, host, none, and custom networks",
  "Connect multiple containers on the same custom network without port exposure",
  "Read and follow container logs with docker logs and understand log drivers",
  "Use the complete Docker CLI reference confidently for day-to-day container management",
];

const runFlagRef = [
  ["-d",                     "--detach",            "Run container in background — returns the container ID immediately. Without -d the terminal blocks until the container exits."],
  ["-it",                    "--interactive --tty", "Attach an interactive terminal — use together for shell access. -i keeps stdin open, -t allocates a pseudo-TTY."],
  ["--name",                 "--name my-app",       "Assign a human-readable name. Without this Docker generates a random name like 'quirky_euler'. Named containers are easier to manage."],
  ["-p",                     "-p 8080:80",          "Map host port to container port. Format: hostPort:containerPort. Multiple -p flags allowed. Required to access services from outside the container."],
  ["-e",                     "-e KEY=VALUE",        "Set an environment variable inside the container. Multiple -e flags allowed. Use --env-file to pass many variables from a file."],
  ["-v",                     "-v /host/path:/container/path", "Bind mount — mounts a host directory into the container. Changes are visible immediately in both directions."],
  ["--mount",                "--mount type=volume,src=mydata,dst=/data", "Preferred volume syntax — explicit, less error-prone than -v. Supports named volumes, bind mounts, and tmpfs."],
  ["--network",              "--network my-net",    "Connect to a specific Docker network. Containers on the same network can reach each other by name."],
  ["--rm",                   "--rm",                "Automatically remove the container when it exits. Ideal for short-lived tasks and one-off commands — keeps docker ps -a clean."],
  ["--restart",              "--restart unless-stopped", "Restart policy. Options: no (default), always, on-failure, unless-stopped. Use unless-stopped for production services."],
  ["-u",                     "-u 1000:1000",        "Run the container process as a specific user:group. Best practice — never run as root inside a container in production."],
  ["--memory",               "--memory 512m",       "Memory limit. Container is killed by OOM killer if it exceeds this. Also --memory-swap to control swap."],
  ["--cpus",                 "--cpus 1.5",          "CPU limit — 1.5 means up to 1.5 CPU cores. Prevents a single container from monopolising the host."],
];

const containerLifecycle = [
  { state: "Created",  color: "#3498db", desc: "Container exists as filesystem snapshot — not yet running. docker create creates this state. Entry point has not been called." },
  { state: "Running",  color: "#27ae60", desc: "The entry point process is active. docker run or docker start moves to this state. Container has its own PID namespace, network, filesystem." },
  { state: "Paused",   color: "#e67e22", desc: "All processes frozen — SIGSTOP sent to every process. Memory contents preserved. docker pause / docker unpause. Rarely used directly." },
  { state: "Stopped",  color: "#e74c3c", desc: "Entry point process exited (normally or killed). Container still exists with its writable layer — logs and files still accessible. docker stop / docker kill." },
  { state: "Removed",  color: "#7f8c8d", desc: "Container and its writable layer permanently deleted. Logs gone. docker rm. Images are unaffected — you can run a new container from the same image." },
];

const essentialCommands = [
  { group: "Create & Run",   cmds: [
    ["docker run -d -p 8080:80 --name web nginx:alpine",      "Start nginx in background, map port 8080→80, name it 'web'"],
    ["docker run -it --rm ubuntu:22.04 bash",                  "Interactive ubuntu shell — auto-removed on exit"],
    ["docker run --restart unless-stopped -d myapp:1.0",       "Start with auto-restart policy (survives reboots)"],
    ["docker create --name mydb postgres:15-alpine",           "Create container without starting it"],
    ["docker start mydb",                                       "Start a created or stopped container"],
  ]},
  { group: "Inspect & Monitor", cmds: [
    ["docker ps",                                               "List running containers"],
    ["docker ps -a",                                            "List ALL containers including stopped ones"],
    ["docker ps --format 'table {{.Names}}\\t{{.Status}}'",    "Custom output format — names and status only"],
    ["docker logs web",                                         "Print all logs from container 'web'"],
    ["docker logs -f web",                                      "Follow logs in real time (like tail -f)"],
    ["docker logs --tail 50 web",                               "Last 50 lines only"],
    ["docker stats",                                            "Live CPU, memory, network, disk I/O for all running containers"],
    ["docker stats web",                                        "Live stats for one container"],
    ["docker inspect web",                                      "Full JSON metadata — IP, mounts, env vars, network settings"],
    ["docker top web",                                          "Show processes running inside the container"],
  ]},
  { group: "Execute & Interact", cmds: [
    ["docker exec -it web sh",                                  "Open interactive shell in running container"],
    ["docker exec web cat /etc/nginx/nginx.conf",               "Run a single command in running container"],
    ["docker exec -e DEBUG=true web ./script.sh",               "Execute with an additional environment variable"],
    ["docker attach web",                                        "Attach your terminal to the container's stdin/stdout. Ctrl+C stops the container — use Ctrl+P Ctrl+Q to detach."],
    ["docker cp ./config.conf web:/etc/app/config.conf",        "Copy a file from host into running container"],
    ["docker cp web:/var/log/app.log ./app.log",                "Copy a file out of a running container"],
  ]},
  { group: "Stop & Clean Up", cmds: [
    ["docker stop web",                                         "Graceful stop — sends SIGTERM, waits 10s, then SIGKILL"],
    ["docker stop -t 30 web",                                   "Graceful stop with 30-second timeout before SIGKILL"],
    ["docker kill web",                                         "Immediate SIGKILL — use when container is unresponsive"],
    ["docker restart web",                                      "Stop then start — useful after config changes"],
    ["docker rm web",                                           "Remove a stopped container"],
    ["docker rm -f web",                                        "Force remove — stops and removes in one command"],
    ["docker rm $(docker ps -aq)",                              "Remove ALL stopped containers"],
    ["docker container prune",                                  "Remove all stopped containers — confirms before deleting"],
    ["docker system prune",                                     "Remove stopped containers + dangling images + unused networks"],
    ["docker system prune -a",                                  "Remove EVERYTHING unused — use with caution on prod servers"],
  ]},
];

const portMappingExamples = [
  ["-p 8080:80",             "Host port 8080 → Container port 80. Access via http://localhost:8080"],
  ["-p 3000:3000",           "Same port on both sides. Common for Node.js and React dev servers."],
  ["-p 127.0.0.1:5432:5432","Bind to localhost only — not accessible from other machines. Secure for databases."],
  ["-p 8080:80 -p 8443:443", "Multiple port mappings — HTTP and HTTPS on the same container."],
  ["-P",                     "Publish ALL exposed ports to random high ports on the host. Quick dev testing."],
];

const envVarExamples = [
  ["docker run -e MYSQL_ROOT_PASSWORD=secret mysql:8",          "Single env var — inline"],
  ["docker run -e DB_HOST=db -e DB_PORT=5432 myapp:1.0",       "Multiple env vars — multiple -e flags"],
  ["docker run --env-file .env myapp:1.0",                      "Load from .env file — one KEY=VALUE per line. Never commit .env to Git."],
  ["docker run -e NODE_ENV=production -e PORT=3000 node-app",   "Common Node.js environment configuration"],
];

const volumeTypes = [
  {
    type: "Named Volume",
    syntax: "docker run -v mydata:/app/data",
    managed: "Docker manages the storage location",
    use: "Databases, persistent application state. Best for production — Docker handles backup and migration.",
    color: "#0db7ed",
  },
  {
    type: "Bind Mount",
    syntax: "docker run -v /host/path:/container/path",
    managed: "You specify the exact host path",
    use: "Development — mount your source code so changes reflect immediately without rebuilding the image.",
    color: "#27ae60",
  },
  {
    type: "tmpfs Mount",
    syntax: "docker run --tmpfs /app/temp",
    managed: "In-memory only — never written to disk",
    use: "Sensitive data (secrets, session tokens) that must not be written to disk. Cleared when container stops.",
    color: "#e67e22",
  },
];

const networkTypes = [
  {
    driver: "bridge",
    scope: "Single host",
    desc: "Default network for containers. Each container gets a private IP. Port mapping (-p) exposes services to the host. Containers on the same bridge network can communicate.",
    use: "Default for most single-host applications.",
  },
  {
    driver: "host",
    scope: "Single host",
    desc: "Container shares the host's network stack completely — no network isolation. Container binds directly to host ports. No -p flags needed (or allowed).",
    use: "High-performance applications where network overhead matters. Only on Linux.",
  },
  {
    driver: "none",
    scope: "Isolated",
    desc: "No network at all — container has only a loopback interface. Completely network-isolated. Cannot send or receive any traffic.",
    use: "Batch processing jobs, security-critical workloads with no network requirements.",
  },
  {
    driver: "custom bridge",
    scope: "Single host",
    desc: "User-defined bridge network. Containers can resolve each other by container name (automatic DNS). Much better than the default bridge for multi-container apps.",
    use: "Any multi-container application — containers talk to each other by name instead of IP.",
  },
  {
    driver: "overlay",
    scope: "Multi-host",
    desc: "Spans multiple Docker hosts — used by Docker Swarm. Containers on different machines communicate as if on the same local network.",
    use: "Docker Swarm services, multi-host container clusters.",
  },
];

const quizData = [
  { q: "What is the difference between 'docker run', 'docker start', and 'docker create'?",
    a: "docker create: creates the container filesystem and metadata but does not start the process. docker start: starts an existing created or stopped container. docker run: create + start in one command — the most common operation. docker run = docker create + docker start." },
  { q: "What does the -d flag do in 'docker run -d' and when would you NOT use it?",
    a: "-d (--detach) runs the container in the background and returns the container ID immediately, freeing your terminal. You would NOT use -d when you want interactive shell access (-it) or when running a one-off command where you need to see the output directly in the terminal." },
  { q: "Explain the port mapping syntax: docker run -p 8080:80. Which is host and which is container?",
    a: "Format is hostPort:containerPort. -p 8080:80 maps host port 8080 to container port 80. A request to http://localhost:8080 on the host reaches port 80 inside the container. Memory tip: host:container — H before C, like how you type it." },
  { q: "What is the difference between a named volume and a bind mount?",
    a: "A named volume (docker run -v mydata:/app/data) is managed by Docker — Docker chooses the storage location. Portable and easy to back up. A bind mount (-v /host/path:/container/path) maps a specific host directory — you control the location. Use bind mounts for development (mount source code), named volumes for production persistence (databases)." },
  { q: "Why should you use a custom bridge network instead of the default bridge?",
    a: "On a custom bridge network, containers can resolve each other by container name (Docker provides automatic DNS). On the default bridge, containers can only communicate by IP address (which changes). Custom networks also provide better isolation — you choose which containers can see each other." },
  { q: "What is the difference between 'docker stop' and 'docker kill'?",
    a: "docker stop sends SIGTERM to the main process, waits up to 10 seconds for graceful shutdown, then sends SIGKILL if still running. This allows applications to close connections, flush buffers, and clean up. docker kill sends SIGKILL immediately — no grace period. Use docker stop normally; docker kill only when the container is unresponsive." },
  { q: "What does 'docker exec -it mycontainer sh' do and when do you use it?",
    a: "docker exec runs a command in an already-running container. -it attaches an interactive terminal. sh starts a shell inside the container. This is used for debugging — inspecting files, checking environment variables, running diagnostic commands inside a live container without stopping it." },
  { q: "What happens to container data when you run 'docker rm'?",
    a: "docker rm deletes the container and its writable layer — all files created inside the container (logs, temp files, any data written to the container filesystem) are permanently deleted. The IMAGE is not affected. Data stored in named volumes persists independently — docker rm does not remove volumes unless you add the -v flag." },
];

const takeaways = [
  ["docker run",       "-d detach, -it interactive, -p ports, -e env, -v volume"],
  ["docker exec",      "Run commands in a running container — debug without stopping"],
  ["docker logs -f",   "Follow live container output — essential for debugging"],
  ["Port mapping",     "hostPort:containerPort — -p 8080:80"],
  ["Named volumes",    "Persist data beyond container lifecycle — managed by Docker"],
  ["Bind mounts",      "Dev workflow — mount source code for live editing"],
  ["Custom network",   "Automatic DNS — containers reach each other by name"],
  ["--rm flag",        "Auto-clean containers on exit — keep environments tidy"],
];

export default function Session14() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s14-page {
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

        .hero { border-radius:20px; background:linear-gradient(135deg,#001f3a 0%,#0a4a7a 45%,#0db7ed 100%); padding:2.5rem 2rem; margin-bottom:2rem; position:relative; overflow:hidden; }
        .hero::before { content:''; position:absolute; inset:0; background-image:radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px); background-size:22px 22px; }
        .hero-meta { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; flex-wrap:wrap; position:relative; }
        .h-badge { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#fff; padding:0.3rem 0.75rem; border-radius:100px; }
        .h-mod   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.08em; text-transform:uppercase; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); color:rgba(255,255,255,0.8); padding:0.3rem 0.75rem; border-radius:100px; }
        .h-dur   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:rgba(255,255,255,0.6); display:flex; align-items:center; gap:0.35rem; }
        .hero h1 { font-size:clamp(1.5rem,3.5vw,2.2rem); font-weight:800; color:#fff; letter-spacing:-0.03em; line-height:1.15; position:relative; margin-bottom:0.75rem; }
        .hero p  { color:rgba(255,255,255,0.75); font-size:0.95rem; line-height:1.65; max-width:620px; position:relative; }

        .jump-nav { display:flex; gap:0.4rem; margin-bottom:2.5rem; flex-wrap:wrap; }
        .jpill { font-family:'JetBrains Mono',monospace; font-size:0.6rem; padding:0.3rem 0.8rem; border-radius:100px; border:1px solid var(--border); background:var(--surface2); color:var(--muted); text-decoration:none; letter-spacing:0.06em; transition:all 0.2s; white-space:nowrap; }
        .jpill:hover { color:var(--text); border-color:var(--border2); }
        .jpill.active { background:linear-gradient(135deg,#0a4a7a,#0db7ed); color:#fff; border-color:transparent; }

        .pt { font-size:1.3rem; font-weight:800; letter-spacing:-0.025em; color:var(--text); margin:2.5rem 0 1.25rem; display:flex; align-items:center; gap:0.75rem; }
        .pt::after { content:''; flex:1; height:1px; background:var(--border); }
        .pt-badge { font-family:'JetBrains Mono',monospace; font-size:0.6rem; letter-spacing:0.08em; text-transform:uppercase; background:linear-gradient(135deg,#0a4a7a,#0db7ed); color:#fff; padding:0.2rem 0.65rem; border-radius:100px; flex-shrink:0; }

        .obj-card { background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); border-radius:16px; padding:1.75rem; margin-bottom:2rem; }
        .obj-card h2 { font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:1.1rem; }
        .obj-list { list-style:none; display:flex; flex-direction:column; gap:0.55rem; }
        .obj-list li { display:flex; align-items:flex-start; gap:0.65rem; font-size:0.9rem; color:rgba(255,255,255,0.92); line-height:1.5; }
        .obj-check { width:18px; height:18px; border-radius:50%; background:rgba(255,215,0,0.2); border:1.5px solid #FFD700; display:flex; align-items:center; justify-content:center; font-size:0.6rem; color:#FFD700; flex-shrink:0; margin-top:2px; }

        .body-text { font-size:0.9rem; color:var(--text2); line-height:1.75; margin-bottom:1rem; }
        .body-text strong { color:var(--text); }
        .body-text code { font-family:'JetBrains Mono',monospace; font-size:0.8rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        .sub-h { font-size:0.95rem; font-weight:700; color:var(--text); margin:1.5rem 0 0.75rem; }

        .tip-box { background:rgba(13,183,237,0.07); border-left:3px solid #0db7ed; border-radius:0 12px 12px 0; padding:1.1rem 1.25rem; margin:1.1rem 0; }
        .tip-box h4 { font-size:0.82rem; font-weight:700; color:#0a7abf; margin-bottom:0.5rem; }
        .tip-box p  { font-size:0.83rem; color:var(--text2); line-height:1.6; margin-bottom:0.4rem; }
        .tip-box ul { list-style:none; padding-left:0; display:flex; flex-direction:column; gap:0.3rem; margin:0.4rem 0; }
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
        .c-hi  { color:#0db7ed; font-weight:700; }

        /* ── Lifecycle states ── */
        .lc-states { display:flex; gap:0.5rem; flex-wrap:wrap; margin:1.25rem 0; }
        .lc-state { flex:1; min-width:160px; border-radius:12px; padding:1rem; border:2px solid; }
        .lc-state-name { font-family:'JetBrains Mono',monospace; font-size:0.8rem; font-weight:700; margin-bottom:0.4rem; }
        .lc-state-desc { font-size:0.76rem; color:var(--text2); line-height:1.5; }
        @media(max-width:600px){ .lc-states { flex-direction:column; } }

        /* ── Flag reference table ── */
        .flag-table { width:100%; border-collapse:collapse; font-size:0.8rem; margin:1.25rem 0; }
        .flag-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.6rem 0.85rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.75rem; }
        .flag-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .flag-table tbody tr:hover { background:var(--surface); }
        .flag-table td { padding:0.55rem 0.85rem; color:var(--text2); vertical-align:top; line-height:1.5; }
        .flag-table td:first-child { font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:700; color:#0db7ed; width:70px; }
        .flag-table td:nth-child(2) { font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#a5d6ff; width:230px; }
        .flag-table td:nth-child(3) { font-size:0.77rem; }

        /* ── Command groups ── */
        .cmd-section { margin-bottom:1.75rem; }
        .cmd-group-header { font-family:'JetBrains Mono',monospace; font-size:0.68rem; letter-spacing:0.08em; text-transform:uppercase; color:#0db7ed; margin-bottom:0.5rem; padding-bottom:0.35rem; border-bottom:1px solid var(--border); font-weight:700; }
        .cmd-list { display:flex; flex-direction:column; gap:0; background:#0d1117; border-radius:12px; border:1px solid rgba(255,255,255,0.06); overflow:hidden; }
        .cmd-row  { display:flex; gap:0; border-bottom:1px solid rgba(255,255,255,0.06); }
        .cmd-row:last-child { border-bottom:none; }
        .cmd-code { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#a5d6ff; padding:0.55rem 1rem; min-width:330px; flex-shrink:0; border-right:1px solid rgba(255,255,255,0.06); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .cmd-desc { font-size:0.75rem; color:#8b949e; padding:0.55rem 1rem; line-height:1.5; }
        @media(max-width:700px){ .cmd-row { flex-direction:column; } .cmd-code { border-right:none; border-bottom:1px solid rgba(255,255,255,0.06); min-width:unset; white-space:normal; } }

        /* ── Port / env / volume tables ── */
        .data-table { width:100%; border-collapse:collapse; font-size:0.82rem; margin:0.75rem 0; }
        .data-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.6rem 0.85rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.76rem; }
        .data-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .data-table tbody tr:hover { background:var(--surface); }
        .data-table td { padding:0.55rem 0.85rem; color:var(--text2); vertical-align:top; line-height:1.5; }
        .data-table td:first-child { font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#0db7ed; font-weight:600; min-width:200px; }

        /* ── Volume cards ── */
        .vol-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.7rem; margin:1.25rem 0; }
        @media(max-width:640px){ .vol-grid { grid-template-columns:1fr; } }
        .vol-card { border-radius:14px; padding:1.1rem; border:2px solid; }
        .vol-type { font-family:'JetBrains Mono',monospace; font-size:0.8rem; font-weight:700; margin-bottom:0.3rem; }
        .vol-syntax { font-family:'JetBrains Mono',monospace; font-size:0.67rem; opacity:0.75; margin-bottom:0.5rem; }
        .vol-managed { font-size:0.72rem; font-style:italic; margin-bottom:0.55rem; color:var(--text2); }
        .vol-use { font-size:0.78rem; color:var(--text2); line-height:1.5; }

        /* ── Network cards ── */
        .net-list { display:flex; flex-direction:column; gap:0.55rem; margin:1.25rem 0; }
        .net-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:0.9rem 1.1rem; display:grid; grid-template-columns:110px 80px 1fr; gap:0.75rem; align-items:start; }
        @media(max-width:580px){ .net-card { grid-template-columns:1fr; gap:0.3rem; } }
        .net-driver { font-family:'JetBrains Mono',monospace; font-size:0.8rem; font-weight:700; color:#0db7ed; }
        .net-scope  { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:var(--muted); background:var(--surface2); border:1px solid var(--border); padding:0.15rem 0.4rem; border-radius:6px; display:inline-block; }
        .net-body   { display:flex; flex-direction:column; gap:0.25rem; }
        .net-desc   { font-size:0.79rem; color:var(--text2); line-height:1.5; }
        .net-use    { font-size:0.73rem; color:#0db7ed; font-style:italic; }

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

        /* ── Next card ── */
        .next-card { background:linear-gradient(135deg,#001f3a 0%,#0a4a7a 55%,#0db7ed 100%); border-radius:16px; padding:1.75rem; margin-top:2rem; display:flex; align-items:center; justify-content:space-between; gap:1.5rem; flex-wrap:wrap; }
        .next-text h4 { font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:0.4rem; }
        .next-text h3 { font-size:1.1rem; font-weight:800; color:#fff; margin-bottom:0.5rem; }
        .next-text ul { list-style:none; display:flex; flex-direction:column; gap:0.3rem; }
        .next-text li { font-size:0.83rem; color:rgba(255,255,255,0.8); display:flex; gap:0.5rem; }
        .next-text li::before { content:'→'; color:rgba(255,255,255,0.6); flex-shrink:0; }
        .next-btn { font-family:'Plus Jakarta Sans',sans-serif; font-size:0.85rem; font-weight:700; color:#0a4a7a; background:#fff; border:none; padding:0.75rem 1.5rem; border-radius:10px; cursor:pointer; text-decoration:none; white-space:nowrap; display:inline-flex; align-items:center; gap:0.5rem; transition:opacity 0.2s,transform 0.2s; }
        .next-btn:hover { opacity:0.9; transform:translateX(3px); }

        @media(max-width:640px){
          .s14-page { padding:2rem 1rem 4rem; }
          .nav-row { flex-direction:column; }
          .nav-btn { width:100%; justify-content:center; }
          .hero { padding:1.5rem 1rem; border-radius:14px; }
          .hero h1 { font-size:1.3rem; }
          .jump-nav { flex-wrap:nowrap; overflow-x:auto; padding-bottom:0.4rem; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
          .jump-nav::-webkit-scrollbar { display:none; }
          .jpill { flex-shrink:0; }
          .act-box { padding:1.25rem 1rem; }
          .lab-ol { padding:0.85rem 0.85rem 0.85rem 1.75rem; }
          .next-card { flex-direction:column; align-items:stretch; }
          .next-btn { width:100%; justify-content:center; }
        }
        @media(max-width:400px){ .hero h1 { font-size:1.1rem; } }
      `}</style>

      <div className="s14-page">

        <div className="bc">
          <Link href="/">Home</Link><span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link><span className="sep">/</span>
          <span className="cur">Session 14: Containers, Engine &amp; CLI</span>
        </div>

        <div className="nav-row">
          <Link href="/courses/dev/session13" className="nav-btn">&larr; Session 13: Docker Images &amp; Install</Link>
          <Link href="/courses/dev/session15" className="nav-btn">Session 15: Compose, Hub &amp; Swarm &rarr;</Link>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 14 of 15</span>
            <span className="h-mod">Module 5 &mdash; Docker &amp; Containers</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4.5 hrs
            </span>
          </div>
          <h1>&#127388; Working with Docker Containers &amp; CLI</h1>
          <p>Master the complete container workflow — create, run, inspect, debug, persist data, and connect containers — using the full Docker CLI with confidence.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","Container Lifecycle","docker run Flags","Essential CLI","Port Mapping","Env Variables","Volumes","docker exec","Logs & Stats","Networking","Custom Networks","Lab","Quiz","Homework"].map((l,i)=>(
            <a key={i} href={`#s14p${i}`} className={`jpill${i===0?" active":""}`}>{l}</a>
          ))}
        </div>

        {/* OBJECTIVES */}
        <div id="s14p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o,i)=>(
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* CONTAINER LIFECYCLE */}
        <div id="s14p1">
          <div className="pt"><span className="pt-badge">Concepts</span>Container Lifecycle States</div>
          <p className="body-text">
            A Docker container moves through defined states from creation to removal. Understanding these states explains which commands are valid at each point and what happens to your data.
          </p>
          <div className="lc-states">
            {containerLifecycle.map(s=>(
              <div key={s.state} className="lc-state" style={{borderColor:s.color, background:`${s.color}0a`}}>
                <div className="lc-state-name" style={{color:s.color}}>{s.state}</div>
                <div className="lc-state-desc">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="flow-pill">
            <span className="fp">docker create</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">Created</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">docker start</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">Running</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">docker stop</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">Stopped</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">docker rm</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">&#128465; Removed</span>
          </div>
          <div className="tip-box">
            <h4>&#128161; docker run = docker create + docker start</h4>
            <ul>
              <li><code>docker run</code> is the shortcut you use 95% of the time — it creates and starts the container in one step</li>
              <li><code>docker create</code> is useful when you need to inspect or configure a container before it starts, or pre-create containers to be started by an orchestrator</li>
              <li>A stopped container still exists — its writable layer (files, logs) is preserved until <code>docker rm</code> is run</li>
            </ul>
          </div>
        </div>

        {/* docker run FLAGS */}
        <div id="s14p2">
          <div className="pt"><span className="pt-badge">Reference</span>docker run Flag Reference</div>
          <p className="body-text">
            <code>docker run</code> is the most important Docker command. Its flags control every aspect of how a container runs. These are the flags you will use daily.
          </p>
          <table className="flag-table">
            <thead><tr><th>Short</th><th>Full / Example</th><th>What it does</th></tr></thead>
            <tbody>
              {runFlagRef.map(([s,f,d])=>(
                <tr key={s}><td>{s}</td><td>{f}</td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="cb">
<span className="c-cm"># Full production-style run command combining multiple flags</span>{"\n"}
docker run \{"\n"}
  -d \                              <span className="c-cm">  # run in background</span>{"\n"}
  --name my-api \                   <span className="c-cm">  # give it a name</span>{"\n"}
  -p 8080:3000 \                    <span className="c-cm">  # map host 8080 to container 3000</span>{"\n"}
  -e NODE_ENV=production \          <span className="c-cm">  # environment variable</span>{"\n"}
  -e DATABASE_URL=postgres://... \  <span className="c-cm">  # second env var</span>{"\n"}
  --mount type=volume,src=api-logs,dst=/app/logs \ <span className="c-cm">  # persist logs</span>{"\n"}
  --network app-net \               <span className="c-cm">  # join custom network</span>{"\n"}
  --restart unless-stopped \        <span className="c-cm">  # auto-restart on crash/reboot</span>{"\n"}
  --memory 512m \                   <span className="c-cm">  # memory limit</span>{"\n"}
  --cpus 1.0 \                      <span className="c-cm">  # CPU limit</span>{"\n"}
  my-api:2.1.0                      <span className="c-cm">  # image:tag</span>
          </div>
        </div>

        {/* ESSENTIAL CLI */}
        <div id="s14p3">
          <div className="pt"><span className="pt-badge">CLI Reference</span>Essential Docker Commands</div>
          <p className="body-text">
            These are the commands you need for day-to-day container management — grouped by task so you can find them quickly.
          </p>
          {essentialCommands.map(group=>(
            <div key={group.group} className="cmd-section">
              <div className="cmd-group-header">{group.group}</div>
              <div className="cmd-list">
                {group.cmds.map(([cmd,desc])=>(
                  <div key={cmd} className="cmd-row">
                    <span className="cmd-code">{cmd}</span>
                    <span className="cmd-desc">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* PORT MAPPING */}
        <div id="s14p4">
          <div className="pt"><span className="pt-badge">Networking</span>Port Mapping</div>
          <p className="body-text">
            By default, container ports are <strong>not accessible from outside the container</strong>. The <code>-p</code> flag creates a mapping between a port on the host machine and a port inside the container. Without port mapping, a web server in a container cannot be reached from your browser.
          </p>
          <table className="data-table">
            <thead><tr><th>Flag</th><th>Behaviour</th></tr></thead>
            <tbody>
              {portMappingExamples.map(([f,d])=>(
                <tr key={f}><td>{f}</td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="cb">
<span className="c-cm"># Run nginx and verify port mapping</span>{"\n"}
docker run -d -p 8080:80 --name webserver nginx:1.25-alpine{"\n\n"}
<span className="c-cm"># Confirm it's running and the port is mapped</span>{"\n"}
docker ps{"\n"}
<span className="c-ok">CONTAINER ID   IMAGE              PORTS                                   NAMES</span>{"\n"}
<span className="c-ok">{"a1b2c3d4   nginx:1.25-alpine   0.0.0.0:8080->80/tcp, :::8080->80/tcp   webserver"}</span>{"\n\n"}
<span className="c-cm"># Test from the host</span>{"\n"}
curl -I http://localhost:8080{"\n"}
<span className="c-ok">HTTP/1.1 200 OK</span>{"\n"}
<span className="c-ok">Server: nginx/1.25.3</span>{"\n\n"}
<span className="c-cm"># Localhost-only binding — only this machine can connect</span>{"\n"}
docker run -d -p 127.0.0.1:5432:5432 --name mydb postgres:15-alpine{"\n"}
<span className="c-cm"># Prevents external access — good for development databases</span>
          </div>
          <div className="warn-box">
            <h4>&#9888; Port Already in Use</h4>
            <ul>
              <li>Error: <code>Bind for 0.0.0.0:8080 failed: port is already allocated</code> — something is already using port 8080 on the host</li>
              <li>Fix: use a different host port (<code>-p 8081:80</code>), or find and stop the conflicting process: <code>sudo lsof -i :8080</code></li>
              <li>You can map different host ports to the same container port: <code>-p 8080:80</code> and <code>-p 8443:443</code> on the same container</li>
            </ul>
          </div>
        </div>

        {/* ENV VARIABLES */}
        <div id="s14p5">
          <div className="pt"><span className="pt-badge">Configuration</span>Environment Variables</div>
          <p className="body-text">
            Environment variables are the standard way to configure containers at runtime — database URLs, API keys, feature flags, log levels. They keep configuration out of the image, making the same image deployable to dev, staging, and production with different settings.
          </p>
          <table className="data-table">
            <thead><tr><th>Command</th><th>Use Case</th></tr></thead>
            <tbody>
              {envVarExamples.map(([c,d])=>(
                <tr key={c}><td>{c}</td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="cb">
<span className="c-cm"># .env file — one KEY=VALUE per line</span>{"\n"}
<span className="c-cm"># .env</span>{"\n"}
<span className="c-ok">MYSQL_ROOT_PASSWORD=mysecretpassword</span>{"\n"}
<span className="c-ok">MYSQL_DATABASE=myapp</span>{"\n"}
<span className="c-ok">MYSQL_USER=appuser</span>{"\n"}
<span className="c-ok">MYSQL_PASSWORD=apppassword</span>{"\n\n"}
<span className="c-cm"># Load all variables from the file</span>{"\n"}
docker run -d --name mydb --env-file .env mysql:8{"\n\n"}
<span className="c-cm"># Verify env vars are set inside the container</span>{"\n"}
docker exec mydb env | grep MYSQL{"\n"}
<span className="c-ok">MYSQL_ROOT_PASSWORD=mysecretpassword</span>{"\n"}
<span className="c-ok">MYSQL_DATABASE=myapp</span>{"\n\n"}
<span className="c-cm"># Override a single variable at runtime</span>{"\n"}
docker run -e MYSQL_DATABASE=testdb --env-file .env mysql:8
          </div>
          <div className="warn-box">
            <h4>&#9888; Never Commit .env Files to Git</h4>
            <ul>
              <li>Add <code>.env</code> to <code>.gitignore</code> — it contains secrets. Use <code>.env.example</code> with placeholder values as documentation.</li>
              <li>In production, use a secrets manager (AWS Secrets Manager, HashiCorp Vault, Kubernetes Secrets) instead of .env files</li>
              <li><code>docker inspect</code> shows environment variables in plain text — keep this in mind on shared servers</li>
            </ul>
          </div>
        </div>

        {/* VOLUMES */}
        <div id="s14p6">
          <div className="pt"><span className="pt-badge">Persistence</span>Docker Volumes</div>
          <p className="body-text">
            Container filesystems are <strong>ephemeral</strong> — all data written inside a container is lost when the container is removed. Volumes are the mechanism for persisting data beyond the container lifecycle. Three types exist for different use cases.
          </p>
          <div className="vol-grid">
            {volumeTypes.map(v=>(
              <div key={v.type} className="vol-card" style={{borderColor:v.color, background:`${v.color}0a`}}>
                <div className="vol-type" style={{color:v.color}}>{v.type}</div>
                <div className="vol-syntax">{v.syntax}</div>
                <div className="vol-managed">{v.managed}</div>
                <div className="vol-use">{v.use}</div>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># ── Named volume — Docker manages the path ──────────────────</span>{"\n"}
docker volume create mydata              <span className="c-cm">  # explicit create (optional)</span>{"\n"}
docker run -v mydata:/var/lib/mysql mysql:8   <span className="c-cm">  # MySQL data persists</span>{"\n"}
docker volume ls                         <span className="c-cm">  # list all volumes</span>{"\n"}
docker volume inspect mydata             <span className="c-cm">  # see where it's stored on host</span>{"\n"}
docker volume rm mydata                  <span className="c-cm">  # delete (only when no container uses it)</span>{"\n\n"}
<span className="c-cm"># ── Bind mount — mount your source code ──────────────────────</span>{"\n"}
docker run -d \{"\n"}
  -v $(pwd)/src:/app/src \    <span className="c-cm">  # mount current dir/src into container</span>{"\n"}
  -v $(pwd)/public:/app/public \{"\n"}
  -p 3000:3000 \{"\n"}
  node-app:dev                <span className="c-cm">  # code changes reflect without rebuild</span>{"\n\n"}
<span className="c-cm"># ── --mount syntax (preferred — explicit and less error-prone) ─</span>{"\n"}
docker run \{"\n"}
  --mount type=volume,source=dbdata,target=/var/lib/postgresql/data \{"\n"}
  postgres:15-alpine{"\n\n"}
<span className="c-cm"># Backup a volume to a tar file</span>{"\n"}
docker run --rm \{"\n"}
  -v mydata:/data \{"\n"}
  -v $(pwd):/backup \{"\n"}
  alpine tar czf /backup/mydata-backup.tar.gz -C /data .
          </div>
          <div className="tip-box">
            <h4>&#128161; When to Use Each Volume Type</h4>
            <ul>
              <li><strong>Named volumes</strong> — databases, uploaded files, anything that needs to survive container removal. Docker manages location and backup.</li>
              <li><strong>Bind mounts</strong> — development workflow. Mount your IDE&apos;s working directory so code changes inside the container are immediate — no rebuild needed.</li>
              <li><strong>tmpfs</strong> — sensitive data like session tokens or decrypted secrets that must never touch disk. Gone when container stops.</li>
              <li><code>docker rm -v container-name</code> — removes the container AND its anonymous volumes. Named volumes are NOT removed.</li>
            </ul>
          </div>
        </div>

        {/* EXEC */}
        <div id="s14p7">
          <div className="pt"><span className="pt-badge">Debugging</span>docker exec — Running Commands in Containers</div>
          <p className="body-text">
            <code>docker exec</code> runs a command inside a <strong>running</strong> container without stopping it. This is your primary debugging tool — inspect the filesystem, check running processes, test connectivity, or modify configuration on a live container.
          </p>
          <div className="cb">
<span className="c-cm"># Open an interactive shell (most common use)</span>{"\n"}
docker exec -it my-nginx sh         <span className="c-cm">  # Alpine uses sh, not bash</span>{"\n"}
docker exec -it my-ubuntu bash      <span className="c-cm">  # Ubuntu has bash</span>{"\n\n"}
<span className="c-cm"># Run a single command non-interactively</span>{"\n"}
docker exec my-nginx cat /etc/nginx/nginx.conf{"\n"}
docker exec my-nginx nginx -t       <span className="c-cm">  # test nginx config</span>{"\n"}
docker exec my-nginx nginx -s reload <span className="c-cm"> # reload nginx config without restart</span>{"\n\n"}
<span className="c-cm"># Check environment variables inside the container</span>{"\n"}
docker exec my-api env{"\n"}
docker exec my-api env | grep DB    <span className="c-cm">  # filter for database vars</span>{"\n\n"}
<span className="c-cm"># Test network connectivity from inside a container</span>{"\n"}
docker exec my-app ping -c 3 my-db  <span className="c-cm">  # can this app reach the db?</span>{"\n"}
docker exec my-app curl http://my-service:8080/health{"\n\n"}
<span className="c-cm"># Run as a specific user</span>{"\n"}
docker exec -u root my-app sh       <span className="c-cm">  # escalate to root for debugging</span>{"\n\n"}
<span className="c-cm"># Install a debug tool temporarily</span>{"\n"}
docker exec -u root my-alpine-app apk add --no-cache curl{"\n"}
<span className="c-cm"># Note: installed packages are lost when the container restarts</span>
          </div>
          <div className="warn-box">
            <h4>&#9888; exec vs attach — Critical Difference</h4>
            <ul>
              <li><code>docker exec</code> — runs a <strong>new process</strong> in the container. Exiting the exec shell does <strong>not</strong> stop the container.</li>
              <li><code>docker attach</code> — attaches to the container&apos;s <strong>main process</strong>. Pressing <strong>Ctrl+C kills the main process and stops the container</strong>. To safely detach: <strong>Ctrl+P then Ctrl+Q</strong>.</li>
              <li>For interactive debugging, always prefer <code>docker exec -it container sh</code> over <code>docker attach</code>.</li>
            </ul>
          </div>
        </div>

        {/* LOGS & STATS */}
        <div id="s14p8">
          <div className="pt"><span className="pt-badge">Observability</span>Container Logs &amp; Resource Stats</div>
          <p className="body-text">
            Docker captures everything written to stdout and stderr by the container&apos;s main process and stores it as logs. <code>docker logs</code> is your first stop when a container is misbehaving.
          </p>
          <div className="cb">
<span className="c-cm"># ── Logs ─────────────────────────────────────────────────────</span>{"\n"}
docker logs my-app                    <span className="c-cm">  # all logs since start</span>{"\n"}
docker logs -f my-app                 <span className="c-cm">  # follow (like tail -f) — Ctrl+C to stop</span>{"\n"}
docker logs --tail 100 my-app         <span className="c-cm">  # last 100 lines only</span>{"\n"}
docker logs --since 1h my-app         <span className="c-cm">  # logs from the last 1 hour</span>{"\n"}
docker logs --since 2024-01-15 my-app <span className="c-cm">  # logs since a specific date</span>{"\n"}
docker logs -f --tail 50 my-app 2{">&"}1 | grep ERROR  <span className="c-cm">  # filter for errors</span>{"\n\n"}
<span className="c-cm"># ── Stats (live resource usage) ──────────────────────────────</span>{"\n"}
docker stats                          <span className="c-cm">  # live stats for ALL running containers</span>{"\n"}
docker stats my-app my-db             <span className="c-cm">  # specific containers</span>{"\n"}
docker stats --no-stream              <span className="c-cm">  # one snapshot, then exit (for scripting)</span>{"\n\n"}
<span className="c-cm"># Example stats output:</span>{"\n"}
<span className="c-ok">CONTAINER   CPU %   MEM USAGE / LIMIT   MEM %   NET I/O         BLOCK I/O</span>{"\n"}
<span className="c-ok">my-app      0.5%    45MB / 512MB        8.8%    1.2kB / 800B    0B / 4.1MB</span>{"\n"}
<span className="c-ok">my-db       2.1%    312MB / 1GB         30.5%   55kB / 18kB     2.3MB / 8.9MB</span>{"\n\n"}
<span className="c-cm"># ── Inspect running processes ────────────────────────────────</span>{"\n"}
docker top my-app                     <span className="c-cm">  # ps-style output of container processes</span>
          </div>
          <div className="tip-box">
            <h4>&#128161; Log Drivers</h4>
            <ul>
              <li>Docker supports multiple log drivers: <code>json-file</code> (default, stores to disk), <code>syslog</code>, <code>journald</code>, <code>fluentd</code>, <code>awslogs</code>, <code>splunk</code></li>
              <li>Configure on daemon level in <code>/etc/docker/daemon.json</code> or per-container with <code>--log-driver</code></li>
              <li>Production containers should ship logs to a centralised system (ELK stack, CloudWatch, Datadog) — not rely on local disk storage</li>
              <li>Applications must write to <strong>stdout/stderr</strong> for Docker to capture logs — not to log files inside the container</li>
            </ul>
          </div>
        </div>

        {/* NETWORKING */}
        <div id="s14p9">
          <div className="pt"><span className="pt-badge">Networking</span>Docker Networking</div>
          <p className="body-text">
            Docker provides container networking through network drivers. Each container gets its own network namespace by default — isolated network interfaces, routing tables, and firewall rules.
          </p>
          <div className="net-list">
            {networkTypes.map(n=>(
              <div key={n.driver} className="net-card">
                <div><div className="net-driver">{n.driver}</div></div>
                <div><span className="net-scope">{n.scope}</span></div>
                <div className="net-body">
                  <div className="net-desc">{n.desc}</div>
                  <div className="net-use">&#9654; {n.use}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># View all networks</span>{"\n"}
docker network ls{"\n"}
<span className="c-ok">NETWORK ID     NAME      DRIVER    SCOPE</span>{"\n"}
<span className="c-ok">a1b2c3d4e5f6   bridge    bridge    local   ← default for all containers</span>{"\n"}
<span className="c-ok">b2c3d4e5f6a1   host      host      local   ← shares host network stack</span>{"\n"}
<span className="c-ok">c3d4e5f6a1b2   none      null      local   ← no networking</span>{"\n\n"}
<span className="c-cm"># Inspect a network</span>{"\n"}
docker network inspect bridge{"\n"}
<span className="c-cm"># Shows all containers on the network and their IPs</span>
          </div>
        </div>

        {/* CUSTOM NETWORKS */}
        <div id="s14p10">
          <div className="pt"><span className="pt-badge">Custom Networks</span>Creating &amp; Using Custom Bridge Networks</div>
          <p className="body-text">
            Custom bridge networks are the right way to connect multiple containers. Containers on the same custom network can <strong>resolve each other by container name</strong> via Docker&apos;s built-in DNS — no IP addresses needed.
          </p>
          <div className="cb">
<span className="c-cm"># ── Create a custom network ───────────────────────────────────</span>{"\n"}
docker network create app-net{"\n"}
<span className="c-cm"># Or with subnet and gateway (for precise control):</span>{"\n"}
docker network create --subnet 172.20.0.0/16 --gateway 172.20.0.1 app-net{"\n\n"}
<span className="c-cm"># ── Start containers on the network ──────────────────────────</span>{"\n"}
<span className="c-cm"># Start a PostgreSQL database</span>{"\n"}
docker run -d \{"\n"}
  --name db \{"\n"}
  --network app-net \{"\n"}
  -e POSTGRES_PASSWORD=secret \{"\n"}
  -e POSTGRES_DB=myapp \{"\n"}
  -v pgdata:/var/lib/postgresql/data \{"\n"}
  postgres:15-alpine{"\n\n"}
<span className="c-cm"># Start the application — it connects to 'db' by NAME</span>{"\n"}
docker run -d \{"\n"}
  --name api \{"\n"}
  --network app-net \{"\n"}
  -p 8080:3000 \{"\n"}
  -e DATABASE_URL=postgresql://postgres:secret@db:5432/myapp \{"\n"}
  my-api:1.0{"\n\n"}
<span className="c-cm"># Verify — exec into api and ping db by name</span>{"\n"}
docker exec api ping -c 2 db{"\n"}
<span className="c-ok">PING db (172.20.0.2): 56 data bytes</span>{"\n"}
<span className="c-ok">64 bytes from 172.20.0.2: seq=0 ttl=64 time=0.1ms</span>{"\n\n"}
<span className="c-cm"># The db container is NOT reachable from the host (no -p flag)</span>{"\n"}
<span className="c-cm"># Only the api container (port 8080) is exposed externally</span>{"\n\n"}
<span className="c-cm"># Connect an existing container to a second network</span>{"\n"}
docker network connect monitoring-net api{"\n\n"}
<span className="c-cm"># Disconnect</span>{"\n"}
docker network disconnect app-net api{"\n\n"}
<span className="c-cm"># Remove network (must be empty first)</span>{"\n"}
docker network rm app-net
          </div>
          <div className="ex-box">
            <div className="ex-label">&#128161; DNS by Container Name</div>
            <p><strong>This is the key advantage of custom networks:</strong> when <code>api</code> connects to <code>postgresql://postgres:secret@db:5432/myapp</code>, Docker resolves <strong>db</strong> to the IP of the container named <code>db</code> automatically. You never hardcode IPs.</p>
            <p>On the <strong>default bridge</strong> network, this DNS resolution does <em>not</em> work — containers must use IP addresses. This is why you should <strong>always create a custom network</strong> for multi-container applications.</p>
          </div>
          <div className="warn-box">
            <h4>&#9888; Network Security Rule</h4>
            <ul>
              <li>Only expose ports that external clients actually need — use <code>-p</code> only for the API/web container, <strong>not</strong> for the database</li>
              <li>Database containers should have <strong>no -p flag</strong> — accessible only to containers on the same custom network</li>
              <li>Separate networks for separate concerns: <code>frontend-net</code>, <code>backend-net</code>, <code>db-net</code> — the web container joins both frontend and backend; the database joins only backend</li>
            </ul>
          </div>
        </div>

        {/* LAB */}
        <div id="s14p11">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 — Container Lifecycle</h4>
            <ol className="lab-ol">
              <li>Run: <code>docker run -d -p 8080:80 --name mysite nginx:alpine</code></li>
              <li>Verify with <code>docker ps</code> — note state is Up. Access <code>curl http://localhost:8080</code></li>
              <li>Stop it: <code>docker stop mysite</code>. Run <code>docker ps -a</code> — note state is Exited, container still exists</li>
              <li>Restart it: <code>docker start mysite</code>. Verify it is accessible again at localhost:8080</li>
              <li>Remove it: <code>docker rm -f mysite</code>. Run <code>docker ps -a</code> — confirm it is gone</li>
              <li>Try: <code>docker run --rm -d -p 8080:80 --name tempsite nginx:alpine</code>. Stop it — verify it auto-removes with <code>docker ps -a</code></li>
            </ol>

            <h4>Lab 2 — Environment Variables and Port Mapping</h4>
            <ol className="lab-ol">
              <li>Create a <code>.env</code> file with: <code>MYSQL_ROOT_PASSWORD=testpass</code>, <code>MYSQL_DATABASE=testdb</code>, <code>MYSQL_USER=testuser</code>, <code>MYSQL_PASSWORD=userpass</code></li>
              <li>Run: <code>docker run -d --name mydb --env-file .env -p 3306:3306 mysql:8</code></li>
              <li>Wait 10 seconds for MySQL to start, then: <code>docker exec mydb mysql -uroot -ptestpass -e "SHOW DATABASES;"</code></li>
              <li>Verify your <code>testdb</code> database exists in the output</li>
              <li>Run <code>docker inspect mydb | grep -A 20 Env</code> — confirm all env vars are set (note: visible in plain text!)</li>
            </ol>

            <h4>Lab 3 — Volumes and Data Persistence</h4>
            <ol className="lab-ol">
              <li>Run MySQL with a named volume: <code>docker run -d --name db1 -e MYSQL_ROOT_PASSWORD=secret -v dbdata:/var/lib/mysql mysql:8</code></li>
              <li>Create a table: <code>docker exec db1 mysql -uroot -psecret -e "CREATE DATABASE shop; USE shop; CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(50));"</code></li>
              <li>Insert data: <code>{"docker exec db1 mysql -uroot -psecret -e \"USE shop; INSERT INTO products VALUES (1, 'Laptop');\""}</code></li>
              <li>Remove the container: <code>docker rm -f db1</code></li>
              <li>Start a NEW container using the SAME volume: <code>docker run -d --name db2 -e MYSQL_ROOT_PASSWORD=secret -v dbdata:/var/lib/mysql mysql:8</code></li>
              <li>Verify data persisted: <code>{"docker exec db2 mysql -uroot -psecret -e \"USE shop; SELECT * FROM products;\""}</code> — should show your Laptop row</li>
            </ol>

            <h4>Lab 4 — Custom Networks and Container Communication</h4>
            <ol className="lab-ol">
              <li>Create a network: <code>docker network create myapp-net</code></li>
              <li>Start a Redis container on the network: <code>docker run -d --name cache --network myapp-net redis:7-alpine</code></li>
              <li>Start an Ubuntu container on the same network: <code>docker run -it --rm --network myapp-net ubuntu:22.04 bash</code></li>
              <li>Inside the Ubuntu container: <code>apt-get update -q {"&&"} apt-get install -y -q redis-tools {"&&"} redis-cli -h cache ping</code></li>
              <li>You should see <code>PONG</code> — the Ubuntu container reached Redis by container name <strong>cache</strong></li>
              <li>Try pinging by name from outside the network: <code>docker run --rm alpine ping -c 2 cache</code> — should fail (different network)</li>
            </ol>

            <h4>Challenge — Full Stack: App + Database</h4>
            <ol className="lab-ol">
              <li>Create network: <code>docker network create stack-net</code></li>
              <li>Run PostgreSQL: <code>docker run -d --name postgres --network stack-net -e POSTGRES_PASSWORD=secret -v pgdata:/var/lib/postgresql/data postgres:15-alpine</code></li>
              <li>Run pgAdmin (database UI): <code>docker run -d --name pgadmin --network stack-net -p 5050:80 -e PGADMIN_DEFAULT_EMAIL=admin@test.com -e PGADMIN_DEFAULT_PASSWORD=admin dpage/pgadmin4</code></li>
              <li>Open <code>http://localhost:5050</code> — log in and add a new server connection using hostname <strong>postgres</strong> (the container name)</li>
              <li>Verify pgAdmin can connect to PostgreSQL by container name across the custom network</li>
            </ol>
          </div>
        </div>

        {/* QUIZ */}
        <div id="s14p12" className="quiz-box">
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
        <div id="s14p13" className="hw-box">
          <h3>&#128221; Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Container Management Mastery:</h4>
            <ul>
              <li>Run 3 different containers simultaneously (nginx, redis, postgres) — each with correct port mappings, names, and restart policies</li>
              <li>Screenshot <code>docker ps</code> showing all three running with their port mappings</li>
              <li>Use <code>docker stats</code> to capture resource usage of all three — screenshot and document what you observe</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Volume Persistence Exercise:</h4>
            <ul>
              <li>Run a PostgreSQL container with a named volume, create a database with 3 tables and sample data</li>
              <li>Remove the container and restart it with the same volume — verify all data survived</li>
              <li>Use a bind mount to export a SQL dump: <code>docker exec db pg_dump -U postgres mydb {">"} backup.sql</code> then copy it out with <code>docker cp</code></li>
              <li>Document the difference in behaviour between removing a container with and without <code>-v</code></li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Networking Investigation:</h4>
            <ul>
              <li>Create a 3-container application: web (nginx), api (any simple HTTP server), db (redis)</li>
              <li>Put api and db on one network (<code>backend-net</code>), web and api on another (<code>frontend-net</code>)</li>
              <li>Verify: web can reach api, api can reach db, web CANNOT reach db directly</li>
              <li>Screenshot <code>docker network inspect</code> for both networks showing which containers are connected</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Debugging Practice:</h4>
            <ul>
              <li>Run a container and deliberately break it: <code>docker run -d --name broken -e WRONG_VAR=oops myapp:1.0</code></li>
              <li>Use <code>docker logs broken</code>, <code>docker inspect broken</code>, and <code>docker exec -it broken sh</code> to diagnose the issue</li>
              <li>Write a 1-page "Docker Debugging Runbook" — the exact sequence of commands you use to diagnose a misbehaving container</li>
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
          <span className="fp">docker run</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">-d -p -e -v</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Running</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">exec / logs</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">docker stop</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">docker rm</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; Docker Container Golden Rules</h4>
          <ul>
            <li>Always name containers with <code>--name</code> — random names like &apos;quirky_euler&apos; are impossible to manage at scale</li>
            <li>Use <code>--restart unless-stopped</code> for long-running services — they survive server reboots automatically</li>
            <li>Never expose database ports externally — use custom networks so only the application container can reach the database</li>
            <li>Use named volumes for databases, bind mounts for development source code — never mix them up</li>
            <li>Always use <code>docker exec -it container sh</code> for debugging — never <code>docker attach</code> unless you know what you&apos;re doing</li>
            <li>Add <code>--memory</code> and <code>--cpus</code> limits on shared servers — a runaway container can starve everything else</li>
            <li>Run <code>docker system prune</code> regularly on build/dev machines — stopped containers and dangling images consume gigabytes</li>
          </ul>
        </div>

        {/* NEXT */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next &middot; Module 5 &middot; Session 15</h4>
            <h3>Compose, Hub, Registry, Swarm &amp; Dockerfile</h3>
            <ul>
              <li>Writing Dockerfiles — FROM, RUN, COPY, CMD, ENTRYPOINT, multi-stage builds</li>
              <li>Docker Compose — define and run multi-container applications with a single YAML file</li>
              <li>Docker Hub — push and pull your own images</li>
              <li>Docker Trusted Registry — private registries for the enterprise</li>
              <li>Docker Swarm — orchestrate containers across multiple hosts</li>
            </ul>
          </div>
          <Link href="/courses/dev/session15" className="next-btn">Session 15 &rarr;</Link>
        </div>

      </div>
    </>
  );
}