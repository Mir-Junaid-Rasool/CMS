// app/courses/dev/session13/page.tsx
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const objectives = [
  "Explain what Docker is, the problem it solves, and why containers became the standard deployment unit",
  "Understand the difference between a Docker Image and a Docker Container",
  "Describe the layered filesystem architecture of Docker Images",
  "Install Docker Engine on Ubuntu Linux step by step",
  "Install Docker Desktop on Windows and understand the WSL2 backend",
  "Run your first container and understand what happened at each step",
  "Understand the Docker Hub registry — how to search, pull, and verify images",
  "Read and understand an image's tag conventions: latest, version numbers, slim, alpine",
  "Inspect images with docker image ls, docker inspect, and docker history",
  "Understand the Docker Engine architecture: daemon, client, REST API, containerd, runc",
];

const containerProblem = [
  ["Works on my machine",      "Developer builds and tests locally. App works perfectly. Deployed to staging — crashes. Different OS version, different Java version, different environment variables, different file paths. \"But it works on my machine!\""],
  ["Dependency hell",          "App A needs Python 3.9. App B needs Python 3.11. App C needs Python 2.7. You can't install all three versions on the same server without complex virtual environment management."],
  ["Environment configuration","Dev uses MySQL 8. Staging uses MySQL 5.7. Production uses MySQL 8 but with different charset settings. Each environment needs manual configuration. Bugs appear only in production."],
  ["Server sprawl",            "Each app needs its own server to avoid conflicts. Servers are mostly idle. Provisioning a new server takes days. Scaling up means waiting for new hardware."],
  ["Slow onboarding",          "New developer joins. Setup takes 2 days: install the right versions of 8 tools, configure environment variables, fight conflicting configurations with other apps already on the machine."],
];

const vmVsContainer = [
  { prop: "What is virtualised",  vm: "Entire hardware — CPU, RAM, disk, network card", container: "Just the process — shares the host OS kernel" },
  { prop: "OS overhead",          vm: "Full OS per VM — 1–20GB disk, 256MB–2GB RAM", container: "No OS copy — shared kernel, a few MB extra" },
  { prop: "Startup time",         vm: "30 seconds to 2 minutes — boots full OS", container: "Milliseconds to seconds — starts a process" },
  { prop: "Isolation",            vm: "Strong — separate kernel, network stack", container: "Good — namespace and cgroup isolation, shared kernel" },
  { prop: "Portability",          vm: "Heavy — large disk images, hypervisor required", container: "Lightweight — single image file, run anywhere with Docker" },
  { prop: "Resource efficiency",  vm: "Low — each VM reserves CPU/RAM even when idle", container: "High — containers share host resources, packed densely" },
  { prop: "Consistency",          vm: "Good — full OS snapshot", container: "Excellent — identical image from dev to production" },
];

const imageLayerFacts = [
  { n:"1", t:"Base layer",           b:"The foundation — usually a minimal Linux distro (ubuntu:22.04, debian:slim, alpine:3.18) or a language runtime (openjdk:17-jre, python:3.11). This is the FROM instruction in a Dockerfile." },
  { n:"2", t:"Intermediate layers",  b:"Each instruction in a Dockerfile that modifies the filesystem adds a new layer. RUN apt install, COPY files, RUN mvn package — each creates a layer on top of the previous." },
  { n:"3", t:"Top layer (writable)", b:"When a container starts, Docker adds a thin writable layer on top. All runtime changes (log files, temp data, output) go here. When the container stops, this layer is discarded." },
  { n:"4", t:"Layer sharing",        b:"Layers are content-addressed and shared. If two images both use ubuntu:22.04 as their base, Docker stores that layer ONCE. Pulling image B when image A shares the same base only downloads the new layers." },
  { n:"5", t:"Layer caching in builds", b:"When building, Docker checks if a layer already exists in cache. If nothing changed, it reuses the cached layer — making rebuilds extremely fast. This is why layer order matters in Dockerfiles." },
];

const installLinuxSteps = [
  { n:"1", t:"Remove old Docker versions",     b:"sudo apt-get remove docker docker-engine docker.io containerd runc — removes any old or unofficial Docker packages that might conflict with the official installation." },
  { n:"2", t:"Install prerequisites",          b:"sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg — tools needed to add Docker's GPG key and repository." },
  { n:"3", t:"Add Docker's official GPG key",  b:"sudo install -m 0755 -d /etc/apt/keyrings && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && sudo chmod a+r /etc/apt/keyrings/docker.gpg" },
  { n:"4", t:"Add Docker apt repository",      b:"Add the official Docker repository to apt sources. This ensures you get the latest stable Docker Engine, not the outdated version in Ubuntu's default repo." },
  { n:"5", t:"Install Docker Engine",          b:"sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin" },
  { n:"6", t:"Start and enable Docker",        b:"sudo systemctl start docker && sudo systemctl enable docker — starts Docker now and configures it to start automatically on every boot." },
  { n:"7", t:"Add your user to docker group",  b:"sudo usermod -aG docker $USER && newgrp docker — lets you run docker commands without sudo. Log out and back in for the group change to take full effect." },
  { n:"8", t:"Verify installation",            b:"docker run hello-world — Docker pulls the hello-world image and runs a container that prints a success message. If you see the message, Docker is working correctly." },
];

const installWindowsSteps = [
  { n:"1", t:"Enable WSL2",                    b:"WSL2 (Windows Subsystem for Linux 2) is required — it provides the Linux kernel Docker needs. Open PowerShell as Administrator: wsl --install. Reboot when prompted." },
  { n:"2", t:"Download Docker Desktop",        b:"Visit docs.docker.com/desktop/install/windows-install/ — download Docker Desktop Installer.exe. Requires Windows 10 version 1903+ or Windows 11." },
  { n:"3", t:"Run the installer",              b:"Run Docker Desktop Installer.exe. Select 'Use WSL 2 instead of Hyper-V' (recommended). Follow the wizard. Docker Desktop installs the daemon, CLI, Docker Compose, and a system tray icon." },
  { n:"4", t:"Start Docker Desktop",           b:"Launch Docker Desktop from the Start menu. Wait for the Docker Desktop dashboard to show 'Docker Desktop is running' (the whale icon in the system tray turns solid)." },
  { n:"5", t:"Verify in PowerShell or CMD",    b:"Open a new terminal: docker version — shows client and server versions. docker run hello-world — runs your first container. Both should work without errors." },
];

const engineComponents = [
  { comp: "Docker Client (CLI)",   role: "The docker command you type. Sends API requests to the Docker daemon. Can connect to local or remote daemons. The client and daemon can run on different machines." },
  { comp: "Docker Daemon (dockerd)",role: "The background service that does the actual work. Manages images, containers, networks, and volumes. Listens on a UNIX socket (/var/run/docker.sock) for API requests from the client." },
  { comp: "REST API",              role: "The interface between client and daemon. All docker commands translate to REST API calls. You can call this API directly with curl for automation and scripting." },
  { comp: "containerd",           role: "The container runtime. The daemon delegates to containerd for pulling images and managing container lifecycle. containerd is an industry standard now used in Kubernetes too." },
  { comp: "runc",                  role: "The lowest level — actually creates the container process using Linux namespaces and cgroups. Implements the OCI (Open Container Initiative) runtime specification." },
  { comp: "Docker Registry",       role: "Stores and distributes images. Docker Hub is the default public registry. Private registries (ECR, GCR, ACR, Nexus) store proprietary images. The daemon pulls from here when running an image." },
];

const imageTagConventions = [
  ["ubuntu:latest",         "The most recent stable release. Convenient but fragile — latest changes over time and breaks builds unexpectedly. Avoid in production Dockerfiles."],
  ["ubuntu:22.04",          "Specific version — pinned. Same today as in two years. Use specific versions in production Dockerfiles for reproducible builds."],
  ["node:20-alpine",        "Alpine Linux base — minimal OS (~5MB vs ~200MB for Ubuntu). Much smaller images. Use when image size matters. Some native npm packages need extra tools to compile on Alpine."],
  ["node:20-slim",          "Debian slim — strips non-essential packages. Smaller than full Debian, larger than Alpine. Better compatibility than Alpine for most Node apps."],
  ["python:3.11-bullseye",  "Debian Bullseye (11) base. Stable, well-tested. Use when you need broad library compatibility."],
  ["maven:3.9-eclipse-temurin-17", "Multi-component tag — Maven 3.9 on Eclipse Temurin JDK 17. Common for Jenkins CI build containers."],
  ["nginx:1.25-alpine",     "Pinned version + Alpine. Recommended production pattern — small, specific, predictable."],
];

const dockerHubCommands = [
  ["docker search nginx",                    "Search Docker Hub for images matching 'nginx'"],
  ["docker pull nginx",                      "Download the latest nginx image to local cache"],
  ["docker pull nginx:1.25-alpine",          "Download a specific tagged version"],
  ["docker image ls",                        "List all images stored locally"],
  ["docker image ls -a",                     "List all images including intermediate layers"],
  ["docker inspect nginx:1.25-alpine",       "Full JSON metadata: layers, env vars, exposed ports, entry point"],
  ["docker history nginx:1.25-alpine",       "Show each layer: command that created it and its size"],
  ["docker image rm nginx",                  "Remove an image from local storage"],
  ["docker image prune",                     "Remove all unused (dangling) images"],
  ["docker image prune -a",                  "Remove ALL unused images — reclaim disk space"],
];

const quizData = [
  { q: "What problem does Docker solve that virtual machines do not solve as well?",
    a: "Docker packages an application with all its dependencies into a portable container image. The container runs identically on any machine with Docker — eliminating 'works on my machine' problems. VMs solve isolation but are heavy (full OS, gigabytes of disk, slow startup). Docker containers share the host kernel, start in milliseconds, and are just megabytes." },
  { q: "What is the difference between a Docker Image and a Docker Container?",
    a: "A Docker Image is a read-only template — a layered filesystem snapshot containing the application, runtime, libraries, and configuration. An Image is like a class. A Container is a running instance of that Image — a live process with a writable layer on top. Multiple containers can run from the same image simultaneously." },
  { q: "Explain Docker's layered image architecture and why it matters.",
    a: "Docker images are built in layers — each Dockerfile instruction that changes the filesystem creates a new read-only layer stacked on top of the previous. Layers are content-addressed and shared — if two images share a base layer, it is stored once. This makes pulls faster (only new layers download), builds faster (unchanged layers are cached), and storage efficient." },
  { q: "What is the Docker daemon and what is its role?",
    a: "dockerd is the background service that manages all Docker objects — images, containers, networks, volumes. It listens on a UNIX socket for API requests from the Docker CLI. When you run docker run, the CLI sends an API request to the daemon, which pulls the image (if needed), creates the container, and starts the process." },
  { q: "What is the difference between docker pull and docker run when the image is not cached?",
    a: "docker pull only downloads the image to the local cache — it does not start a container. docker run starts a container from the image — but if the image is not in the local cache, Docker automatically pulls it first, then starts the container. docker pull is explicit; docker run's pull is implicit." },
  { q: "What does :latest mean as a Docker image tag and why should you avoid it in production?",
    a: ":latest is a mutable tag that points to the most recent build of an image. It changes whenever the image maintainer publishes a new version. Using :latest means your builds are not reproducible — today's :latest is different from last month's :latest. In production, always pin to a specific version tag (e.g. nginx:1.25.3) so builds are identical over time." },
  { q: "What is the purpose of Alpine-based Docker images?",
    a: "Alpine Linux is a minimal Linux distribution (~5MB). Alpine-based images (e.g. node:20-alpine) are dramatically smaller than Ubuntu-based ones — 50–200MB vs 500MB–1GB. Smaller images pull faster, take less registry storage, and have a reduced attack surface (fewer packages = fewer potential CVEs). The tradeoff: Alpine uses musl libc instead of glibc, which can break some native extensions." },
  { q: "What command shows you the layers that make up a Docker image and their sizes?",
    a: "docker history <image-name> shows each layer in the image — the command that created it, when it was created, and its size. This helps you understand how the image was built and identify large layers that inflate the image size unnecessarily." },
];

const takeaways = [
  ["Container",         "Process with isolated filesystem, network, resources — not a full VM"],
  ["Image",             "Read-only layered template — the blueprint for containers"],
  ["Layers",            "Shared, cached, content-addressed — efficient storage and fast builds"],
  ["Docker Hub",        "Default public registry — docker pull downloads from here"],
  [":latest",           "Mutable tag — avoid in production, use specific versions"],
  ["alpine",            "Minimal base (~5MB) — smaller, faster, less attack surface"],
  ["dockerd",           "The daemon — listens for API calls, manages all Docker objects"],
  ["docker history",    "Inspect each layer: command, size, creation date"],
];

export default function Session13() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .s13-page {
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
        .h-dur   { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:rgba(255,255,255,0.6); display:flex; align-items:center; gap:0.35rem; }
        .hero h1 { font-size:clamp(1.5rem,3.5vw,2.2rem); font-weight:800; color:#fff; letter-spacing:-0.03em; line-height:1.15; position:relative; margin-bottom:0.75rem; }
        .hero p  { color:rgba(255,255,255,0.75); font-size:0.95rem; line-height:1.65; max-width:620px; position:relative; }

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

        /* ── Tip / Warn / Ex boxes ── */
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
        .ex-box li code, .ex-box p code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }
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
        .c-hi  { color:#0db7ed; font-weight:700; }

        /* ── Problem cards ── */
        .problem-list { display:flex; flex-direction:column; gap:0.55rem; margin:1.25rem 0; }
        .problem-card { background:var(--surface); border:1px solid var(--border); border-left:3px solid #dc3545; border-radius:0 12px 12px 0; padding:0.9rem 1.1rem; }
        .problem-title { font-size:0.87rem; font-weight:700; color:var(--text); margin-bottom:0.3rem; }
        .problem-desc  { font-size:0.8rem; color:var(--text2); line-height:1.55; }

        /* ── VM vs Container table ── */
        .compare-table { width:100%; border-collapse:collapse; font-size:0.8rem; margin:1.25rem 0; }
        .compare-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.65rem 0.9rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.76rem; }
        .compare-table thead th:nth-child(2) { color:#e67e22; }
        .compare-table thead th:nth-child(3) { color:#0db7ed; }
        .compare-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .compare-table tbody tr:hover { background:var(--surface); }
        .compare-table td { padding:0.6rem 0.9rem; color:var(--text2); vertical-align:top; line-height:1.5; font-size:0.78rem; }
        .compare-table td:first-child { font-weight:700; color:var(--text); font-size:0.78rem; width:160px; }

        /* ── Layer steps ── */
        .layer-list { display:flex; flex-direction:column; gap:0.5rem; margin:1.25rem 0; }
        .layer-card { display:flex; gap:0.85rem; padding:0.9rem 1rem; border-radius:12px; background:var(--surface); border:1px solid var(--border); transition:border-color 0.2s; }
        .layer-card:hover { border-color:var(--border2); }
        .layer-num { width:28px; height:28px; border-radius:8px; background:linear-gradient(135deg,#0a4a7a,#0db7ed); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem; flex-shrink:0; }
        .layer-body strong { font-size:0.88rem; color:var(--text); display:block; margin-bottom:0.2rem; }
        .layer-body p { font-size:0.8rem; color:var(--text2); line-height:1.5; }

        /* ── Workflow ── */
        .workflow { display:flex; flex-direction:column; gap:0.5rem; margin:1.25rem 0; position:relative; }
        .workflow::before { content:''; position:absolute; left:19px; top:0; bottom:0; width:2px; background:var(--border); z-index:0; }
        .wf-step { display:flex; align-items:flex-start; gap:0.85rem; padding:0.9rem 1rem; border-radius:12px; background:var(--surface); border:1px solid var(--border); position:relative; z-index:1; transition:border-color 0.2s; }
        .wf-step:hover { border-color:var(--border2); }
        .wf-num { width:28px; height:28px; border-radius:8px; background:linear-gradient(135deg,#0a4a7a,#0db7ed); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem; flex-shrink:0; }
        .wf-body { display:flex; flex-direction:column; gap:0.2rem; width:100%; }
        .wf-body strong { font-size:0.88rem; color:var(--text); }
        .wf-body p { font-size:0.8rem; color:var(--text2); line-height:1.5; }
        .wf-body code { font-family:'JetBrains Mono',monospace; font-size:0.74rem; background:var(--surface2); border:1px solid var(--border); padding:0.1rem 0.4rem; border-radius:4px; color:var(--accent); }

        /* ── Engine components ── */
        .engine-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin:1.25rem 0; }
        @media(max-width:580px){ .engine-grid { grid-template-columns:1fr; } }
        .engine-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:0.9rem 1rem; }
        .engine-name { font-family:'JetBrains Mono',monospace; font-size:0.78rem; font-weight:700; color:#0db7ed; margin-bottom:0.35rem; }
        .engine-role { font-size:0.78rem; color:var(--text2); line-height:1.5; }

        /* ── Tag table ── */
        .data-table { width:100%; border-collapse:collapse; font-size:0.82rem; margin:1.25rem 0; }
        .data-table thead th { background:var(--surface2); color:var(--text); font-weight:700; padding:0.65rem 0.9rem; text-align:left; border-bottom:2px solid var(--border); font-size:0.78rem; }
        .data-table tbody tr { border-bottom:1px solid var(--border); transition:background 0.15s; }
        .data-table tbody tr:hover { background:var(--surface); }
        .data-table td { padding:0.6rem 0.9rem; color:var(--text2); vertical-align:top; line-height:1.5; }
        .data-table td:first-child { font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#0db7ed; font-weight:600; min-width:220px; }

        /* ── Command list ── */
        .cmd-list { display:flex; flex-direction:column; gap:0; background:#0d1117; border-radius:12px; border:1px solid rgba(255,255,255,0.06); overflow:hidden; margin:0.75rem 0; }
        .cmd-row  { display:flex; gap:0; border-bottom:1px solid rgba(255,255,255,0.06); }
        .cmd-row:last-child { border-bottom:none; }
        .cmd-code { font-family:'JetBrains Mono',monospace; font-size:0.71rem; color:#a5d6ff; padding:0.55rem 1rem; min-width:310px; flex-shrink:0; border-right:1px solid rgba(255,255,255,0.06); }
        .cmd-desc { font-size:0.76rem; color:#8b949e; padding:0.55rem 1rem; line-height:1.5; }
        @media(max-width:640px){ .cmd-row { flex-direction:column; } .cmd-code { border-right:none; border-bottom:1px solid rgba(255,255,255,0.06); min-width:unset; } }

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
          .s13-page { padding:2rem 1rem 4rem; }
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

      <div className="s13-page">

        {/* Breadcrumb */}
        <div className="bc">
          <Link href="/">Home</Link><span className="sep">/</span>
          <Link href="/courses/dev/session1">DevOps</Link><span className="sep">/</span>
          <span className="cur">Session 13: Docker Images &amp; Installation</span>
        </div>

        <div className="nav-row">
          <Link href="/courses/dev/session12" className="nav-btn">&larr; Session 12: Maven Lifecycle &amp; Repos</Link>
          <Link href="/courses/dev/session14" className="nav-btn">Session 14: Containers &amp; CLI &rarr;</Link>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-meta">
            <span className="h-badge">Session 13 of 15</span>
            <span className="h-mod">Module 5 &mdash; Docker &amp; Containers</span>
            <span className="h-dur">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              ~4 hrs
            </span>
          </div>
          <h1>&#127988; Docker Images &amp; Installation</h1>
          <p>Package your application once, run it anywhere — identically. Learn how Docker images work, how layers make them efficient, and get Docker running on Linux and Windows.</p>
        </div>

        {/* Jump nav */}
        <div className="jump-nav">
          {["Objectives","The Problem","VM vs Container","What is Docker","Docker Engine","Images vs Containers","Layered Filesystem","Install Linux","Install Windows","Docker Hub","Image Tags","Inspect Images","Lab","Quiz","Homework"].map((l,i)=>(
            <a key={i} href={`#s13p${i}`} className={`jpill${i===0?" active":""}`}>{l}</a>
          ))}
        </div>

        {/* OBJECTIVES */}
        <div id="s13p0" className="obj-card">
          <h2>&#128218; Learning Objectives</h2>
          <ul className="obj-list">
            {objectives.map((o,i)=>(
              <li key={i}><span className="obj-check">&#10003;</span>{o}</li>
            ))}
          </ul>
        </div>

        {/* THE PROBLEM */}
        <div id="s13p1">
          <div className="pt"><span className="pt-badge">Motivation</span>The Problem Docker Solves</div>
          <p className="body-text">
            Before Docker, deploying software reliably across different environments was one of the hardest problems in software engineering. The same code behaved differently on every machine because every machine was different.
          </p>
          <div className="problem-list">
            {containerProblem.map(([title, desc]) => (
              <div key={title} className="problem-card">
                <div className="problem-title">&#10060; {title}</div>
                <div className="problem-desc">{desc}</div>
              </div>
            ))}
          </div>
          <div className="ex-box">
            <div className="ex-label">&#9989; The Docker Solution</div>
            <p><strong>Docker packages the application AND its entire environment</strong> — the runtime, libraries, config files, environment variables — into a single portable unit called a <strong>container image</strong>. Run that image on any machine with Docker installed and you get exactly the same behaviour. The environment is no longer a variable.</p>
            <p>One image. Runs on your laptop, your colleague&apos;s Mac, the CI server, the staging VM, and the production Kubernetes cluster — <strong>identically</strong>.</p>
          </div>
        </div>

        {/* VM VS CONTAINER */}
        <div id="s13p2">
          <div className="pt"><span className="pt-badge">Concepts</span>Virtual Machines vs Containers</div>
          <p className="body-text">
            Both VMs and containers provide isolation, but they work at fundamentally different levels. Containers are not a replacement for VMs — they solve different problems — but for application deployment, containers win on almost every metric.
          </p>
          <table className="compare-table">
            <thead>
              <tr><th>Property</th><th>&#128187; Virtual Machine</th><th>&#127388; Docker Container</th></tr>
            </thead>
            <tbody>
              {vmVsContainer.map(row => (
                <tr key={row.prop}>
                  <td>{row.prop}</td>
                  <td>{row.vm}</td>
                  <td>{row.container}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tip-box">
            <h4>&#128161; VMs and Containers are Complementary</h4>
            <ul>
              <li>In production, containers typically <strong>run inside VMs</strong> — you get the strong isolation of the VM (each tenant has their own kernel) plus the density and speed of containers inside it</li>
              <li>Kubernetes nodes are VMs; the pods running on them are containers</li>
              <li>Docker Desktop on Mac/Windows runs a Linux VM behind the scenes — the Docker daemon runs inside that VM</li>
            </ul>
          </div>
        </div>

        {/* WHAT IS DOCKER */}
        <div id="s13p3">
          <div className="pt"><span className="pt-badge">Foundation</span>What is Docker?</div>
          <p className="body-text">
            <strong>Docker</strong> is an open-source platform for building, shipping, and running applications in containers. Released in 2013 by Docker Inc., it popularised container technology by making Linux namespaces and cgroups accessible through a simple CLI and a portable image format.
          </p>
          <p className="body-text">
            Docker consists of several components: the <strong>Docker Engine</strong> (daemon + CLI), the <strong>image format</strong> (OCI-compatible layered filesystem), the <strong>registry protocol</strong> (for distributing images), and <strong>Docker Hub</strong> (the default public registry). Docker also produces Docker Compose, Docker Swarm, and Docker Desktop.
          </p>
          <div className="cb">
<span className="c-cm"># The three core Docker operations — everything else builds on these</span>{"\n\n"}
<span className="c-cm"># 1. Build — create an image from a Dockerfile</span>{"\n"}
docker build -t my-app:1.0 .{"\n\n"}
<span className="c-cm"># 2. Ship — push the image to a registry</span>{"\n"}
docker push myusername/my-app:1.0{"\n\n"}
<span className="c-cm"># 3. Run — start a container from an image</span>{"\n"}
docker run -p 8080:8080 my-app:1.0{"\n\n"}
<span className="c-cm"># That's the entire Docker workflow in 3 commands</span>
          </div>
        </div>

        {/* DOCKER ENGINE */}
        <div id="s13p4">
          <div className="pt"><span className="pt-badge">Architecture</span>Docker Engine Architecture</div>
          <p className="body-text">
            When you type <code>docker run nginx</code>, a chain of components springs into action. Understanding this chain helps you debug failures and understand what Docker is actually doing.
          </p>
          <div className="engine-grid">
            {engineComponents.map(e => (
              <div key={e.comp} className="engine-card">
                <div className="engine-name">{e.comp}</div>
                <div className="engine-role">{e.role}</div>
              </div>
            ))}
          </div>
          <div className="flow-pill">
            <span className="fp">docker CLI</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">REST API</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">dockerd</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">containerd</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">runc</span><span className="fp-arrow">&rarr;</span>
            <span className="fp">&#127388; Container</span>
          </div>
          <div className="cb">
<span className="c-cm"># Verify all components are running</span>{"\n"}
docker version{"\n"}
<span className="c-ok">Client: Docker Engine - Community</span>{"\n"}
<span className="c-ok"> Version:           25.0.3</span>{"\n"}
<span className="c-ok"> API version:       1.44</span>{"\n"}
<span className="c-ok">Server: Docker Engine - Community</span>{"\n"}
<span className="c-ok"> Engine:</span>{"\n"}
<span className="c-ok">  Version:          25.0.3</span>{"\n"}
<span className="c-ok">  API version:      1.44 (minimum version 1.12)</span>{"\n"}
<span className="c-ok"> containerd:</span>{"\n"}
<span className="c-ok">  Version:          1.6.28</span>{"\n\n"}
<span className="c-cm"># Check daemon is running</span>{"\n"}
sudo systemctl status docker{"\n"}
<span className="c-ok">● docker.service - Docker Application Container Engine</span>{"\n"}
<span className="c-ok">     Loaded: loaded (/lib/systemd/system/docker.service; enabled)</span>{"\n"}
<span className="c-ok">     Active: active (running) since ...</span>
          </div>
        </div>

        {/* IMAGES VS CONTAINERS */}
        <div id="s13p5">
          <div className="pt"><span className="pt-badge">Core Concepts</span>Docker Images vs Containers</div>
          <p className="body-text">
            The most important distinction in Docker: an <strong>Image</strong> is the static blueprint. A <strong>Container</strong> is the running instance. You can run many containers from one image simultaneously, each completely isolated.
          </p>
          <div className="cb">
<span className="c-cm"># Image = read-only template (class / blueprint)</span>{"\n"}
<span className="c-cm"># Container = running instance (object / process)</span>{"\n\n"}
<span className="c-cm"># One image, three independent containers running simultaneously:</span>{"\n"}
docker run -d -p 8081:80 --name web1 nginx:1.25-alpine{"\n"}
docker run -d -p 8082:80 --name web2 nginx:1.25-alpine{"\n"}
docker run -d -p 8083:80 --name web3 nginx:1.25-alpine{"\n\n"}
docker ps{"\n"}
<span className="c-ok">CONTAINER ID   IMAGE              PORTS                  NAMES</span>{"\n"}
<span className="c-ok">{"a1b2c3d4e5f6   nginx:1.25-alpine   0.0.0.0:8081->80/tcp   web1"}</span>{"\n"}
<span className="c-ok">{"b2c3d4e5f6a1   nginx:1.25-alpine   0.0.0.0:8082->80/tcp   web2"}</span>{"\n"}
<span className="c-ok">{"c3d4e5f6a1b2   nginx:1.25-alpine   0.0.0.0:8083->80/tcp   web3"}</span>{"\n\n"}
<span className="c-cm"># All three share the same nginx image layers — only their</span>{"\n"}
<span className="c-cm"># thin writable layer is separate. Very efficient.</span>
          </div>
          <div className="tip-box">
            <h4>&#128161; Container Lifecycle</h4>
            <ul>
              <li><strong>Created</strong> — container exists but process has not started</li>
              <li><strong>Running</strong> — process is executing</li>
              <li><strong>Paused</strong> — process is suspended (frozen in memory)</li>
              <li><strong>Stopped/Exited</strong> — process ended, container still exists with its writable layer</li>
              <li><strong>Removed</strong> — container and its writable layer deleted permanently</li>
              <li>The <strong>image is never modified</strong> by running containers — only the writable layer changes</li>
            </ul>
          </div>
        </div>

        {/* LAYERED FILESYSTEM */}
        <div id="s13p6">
          <div className="pt"><span className="pt-badge">Internals</span>The Layered Image Filesystem</div>
          <p className="body-text">
            Docker images are built as a stack of read-only layers. Each layer contains only the <em>diff</em> — the changes made by one Dockerfile instruction. This architecture makes images efficient to store, fast to build, and fast to pull.
          </p>
          <div className="layer-list">
            {imageLayerFacts.map(f => (
              <div key={f.n} className="layer-card">
                <div className="layer-num">{f.n}</div>
                <div className="layer-body"><strong>{f.t}</strong><p>{f.b}</p></div>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># Visualise layers with docker history</span>{"\n"}
docker history nginx:1.25-alpine{"\n\n"}
<span className="c-ok">IMAGE          CREATED        CREATED BY                                      SIZE</span>{"\n"}
<span className="c-ok">a2318d29afaa   2 weeks ago    CMD ["nginx" "-g" "daemon off;"]                0B</span>{"\n"}
<span className="c-ok">missing        2 weeks ago    STOPSIGNAL SIGQUIT                              0B</span>{"\n"}
<span className="c-ok">missing        2 weeks ago    EXPOSE 80                                       0B</span>{"\n"}
<span className="c-ok">missing        2 weeks ago    COPY /etc/nginx /etc/nginx                      20.6kB</span>{"\n"}
<span className="c-ok">missing        2 weeks ago    RUN /bin/sh -c apk add --no-cache nginx         4.65MB</span>{"\n"}
<span className="c-ok">missing        2 weeks ago    ADD alpine-minirootfs-3.18.tar.gz /              7.34MB</span>{"\n\n"}
<span className="c-cm"># Total image size = sum of all layer sizes</span>{"\n"}
<span className="c-cm"># Layers marked 'missing' are from a different Docker host — normal</span>
          </div>
          <div className="warn-box">
            <h4>&#9888; Large Layers &amp; Build Performance</h4>
            <ul>
              <li>Put <strong>instructions that change rarely at the top</strong> of your Dockerfile (OS packages, Java install) — these layers are cached and reused across builds</li>
              <li>Put <strong>instructions that change often at the bottom</strong> (COPY application code) — only these layers rebuild when code changes</li>
              <li>Every <code>RUN</code>, <code>COPY</code>, and <code>ADD</code> creates a new layer — combine related commands with <code>&amp;&amp;</code> to keep layer count low</li>
              <li>A single <code>RUN apt-get install</code> that installs 50 packages creates ONE layer, not 50</li>
            </ul>
          </div>
        </div>

        {/* INSTALL LINUX */}
        <div id="s13p7">
          <div className="pt"><span className="pt-badge">Install</span>Docker Installation on Ubuntu Linux</div>
          <p className="body-text">
            Always install Docker from <strong>Docker&apos;s official repository</strong>, not Ubuntu&apos;s default apt repo. Ubuntu&apos;s version is often significantly outdated.
          </p>
          <div className="workflow">
            {installLinuxSteps.map(s => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># Complete install script for Ubuntu 22.04</span>{"\n\n"}
<span className="c-cm"># Remove old versions</span>{"\n"}
sudo apt-get remove -y docker docker-engine docker.io containerd runc 2{">/dev/null"}{"\n\n"}
<span className="c-cm"># Install prerequisites</span>{"\n"}
sudo apt-get update{"\n"}
sudo apt-get install -y ca-certificates curl gnupg{"\n\n"}
<span className="c-cm"># Add Docker GPG key</span>{"\n"}
sudo install -m 0755 -d /etc/apt/keyrings{"\n"}
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg{"\n"}
sudo chmod a+r /etc/apt/keyrings/docker.gpg{"\n\n"}
<span className="c-cm"># Add Docker repository</span>{"\n"}
echo \{"\n"}
  <span className="c-str">"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable"</span> | \{"\n"}
  sudo tee /etc/apt/sources.list.d/docker.list {">"} /dev/null{"\n\n"}
<span className="c-cm"># Install Docker Engine</span>{"\n"}
sudo apt-get update{"\n"}
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin{"\n\n"}
<span className="c-cm"># Start and enable</span>{"\n"}
sudo systemctl start docker{"\n"}
sudo systemctl enable docker{"\n\n"}
<span className="c-cm"># Add user to docker group (no more sudo)</span>{"\n"}
sudo usermod -aG docker $USER{"\n"}
newgrp docker{"\n\n"}
<span className="c-cm"># Verify</span>{"\n"}
docker run hello-world{"\n"}
<span className="c-ok">Hello from Docker!</span>{"\n"}
<span className="c-ok">This message shows that your installation appears to be working correctly.</span>
          </div>
        </div>

        {/* INSTALL WINDOWS */}
        <div id="s13p8">
          <div className="pt"><span className="pt-badge">Install</span>Docker Installation on Windows</div>
          <p className="body-text">
            On Windows, Docker runs via <strong>Docker Desktop</strong> — a GUI application that installs the Docker daemon inside a lightweight Linux VM using WSL2 (Windows Subsystem for Linux 2).
          </p>
          <div className="workflow">
            {installWindowsSteps.map(s => (
              <div key={s.n} className="wf-step">
                <div className="wf-num">{s.n}</div>
                <div className="wf-body"><strong>{s.t}</strong><p>{s.b}</p></div>
              </div>
            ))}
          </div>
          <div className="warn-box">
            <h4>&#9888; Common Windows Installation Issues</h4>
            <ul>
              <li><strong>WSL2 not installed</strong> — Run <code>wsl --install</code> in PowerShell as Administrator and reboot before installing Docker Desktop</li>
              <li><strong>Virtualisation disabled in BIOS</strong> — WSL2 requires hardware virtualisation (Intel VT-x / AMD-V). Enable in BIOS/UEFI settings.</li>
              <li><strong>Docker Desktop not starting</strong> — Check the system tray for the whale icon. If it shows a red dot, click it for error details. Often a WSL2 kernel update is needed: <code>wsl --update</code></li>
              <li><strong>Docker Desktop requires a paid subscription</strong> for companies with {">"} 250 employees or {">"} $10M revenue. For personal use and small teams it is free.</li>
            </ul>
          </div>
        </div>

        {/* DOCKER HUB */}
        <div id="s13p9">
          <div className="pt"><span className="pt-badge">Registry</span>Docker Hub — The Default Image Registry</div>
          <p className="body-text">
            <strong>Docker Hub</strong> (hub.docker.com) is the default public registry — a library of over 9 million images. Official images (maintained by Docker or upstream vendors) are the most trusted. Community images are published by individuals and organisations.
          </p>
          <div className="cmd-list">
            {dockerHubCommands.map(([cmd, desc]) => (
              <div key={cmd} className="cmd-row">
                <span className="cmd-code">{cmd}</span>
                <span className="cmd-desc">{desc}</span>
              </div>
            ))}
          </div>
          <div className="cb">
<span className="c-cm"># Pull and inspect the official nginx image</span>{"\n"}
docker pull nginx:1.25-alpine{"\n"}
<span className="c-ok">1.25-alpine: Pulling from library/nginx</span>{"\n"}
<span className="c-ok">661ff4d9561e: Pull complete  ← alpine base layer</span>{"\n"}
<span className="c-ok">7c37af2e8b83: Pull complete  ← nginx install layer</span>{"\n"}
<span className="c-ok">a1522a75ef46: Pull complete  ← config layer</span>{"\n"}
<span className="c-ok">Digest: sha256:a4a7f4f8a7...</span>{"\n"}
<span className="c-ok">Status: Downloaded newer image for nginx:1.25-alpine</span>{"\n\n"}
<span className="c-cm"># Verify it's stored locally</span>{"\n"}
docker image ls{"\n"}
<span className="c-ok">REPOSITORY   TAG           IMAGE ID       CREATED        SIZE</span>{"\n"}
<span className="c-ok">nginx        1.25-alpine   a2318d29afaa   2 weeks ago    41.1MB</span>{"\n\n"}
<span className="c-cm"># Compare sizes — always prefer alpine for production</span>{"\n"}
docker pull nginx:latest      <span className="c-cm">  # ~187MB</span>{"\n"}
docker pull nginx:1.25-alpine <span className="c-cm">  # ~41MB — 4.5x smaller</span>
          </div>
        </div>

        {/* IMAGE TAGS */}
        <div id="s13p10">
          <div className="pt"><span className="pt-badge">Tags</span>Understanding Image Tag Conventions</div>
          <p className="body-text">
            An image tag is a label applied to a specific image version. Tags are part of the image reference: <code>repository:tag</code>. Understanding tag conventions helps you choose the right image and avoid reliability and security problems.
          </p>
          <table className="data-table">
            <thead><tr><th>Tag Example</th><th>Convention &amp; When to Use</th></tr></thead>
            <tbody>
              {imageTagConventions.map(([tag, desc]) => (
                <tr key={tag}><td>{tag}</td><td>{desc}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="tip-box">
            <h4>&#128161; Production Tag Strategy</h4>
            <ul>
              <li><strong>Never use <code>:latest</code> in production</strong> — pin to a specific version. <code>nginx:1.25.3-alpine</code> is the same image forever.</li>
              <li><strong>Use <code>-alpine</code> when possible</strong> — dramatically smaller images mean faster deployments and less attack surface</li>
              <li><strong>Test on the exact tag you deploy</strong> — don&apos;t develop on <code>:latest</code> then deploy <code>:1.25-alpine</code>; test on <code>:1.25-alpine</code></li>
              <li><strong>Subscribe to security alerts</strong> for your base images — Docker Hub notifies you of CVEs in images you use</li>
            </ul>
          </div>
        </div>

        {/* INSPECT IMAGES */}
        <div id="s13p11">
          <div className="pt"><span className="pt-badge">Inspection</span>Inspecting Images</div>
          <p className="body-text">
            Before running an image in production, inspect it. <code>docker inspect</code> reveals the full metadata — environment variables, exposed ports, entry point, default command, and the layer digests.
          </p>
          <div className="cb">
<span className="c-cm"># Full JSON metadata — truncated for readability</span>{"\n"}
docker inspect nginx:1.25-alpine{"\n"}
<span className="c-ok">[{"\n"}
  {"{"}{"\n"}
    "Id": "sha256:a2318d29afaa...",{"\n"}
    "RepoTags": ["nginx:1.25-alpine"],{"\n"}
    "Architecture": "amd64",{"\n"}
    "Os": "linux",{"\n"}
    "Size": 43131023,{"\n"}
    "Config": {"{"}{"\n"}
      "ExposedPorts": {"{"} "80/tcp": {"{"}{"}"}  {"}"},     <span className="c-cm">← nginx listens on port 80</span>{"\n"}
      "Env": ["PATH=/usr/local/sbin:...", "NGINX_VERSION=1.25.3"],{"\n"}
      "Cmd": ["nginx", "-g", "daemon off;"],  <span className="c-cm">← default start command</span>{"\n"}
      "WorkingDir": ""{"\n"}
    {"}"},{"\n"}
    "RootFS": {"{"}{"\n"}
      "Type": "layers",{"\n"}
      "Layers": [{"\n"}
        "sha256:661ff4d9561e...",  <span className="c-cm">← alpine base</span>{"\n"}
        "sha256:7c37af2e8b83...",  <span className="c-cm">← nginx install</span>{"\n"}
        "sha256:a1522a75ef46..."   <span className="c-cm">← config</span>{"\n"}
      ]{"\n"}
    {"}"}{"\n"}
  {"}"}{"\n"}
]</span>{"\n\n"}
<span className="c-cm"># Extract just one field with --format</span>{"\n"}
docker inspect --format={"'{{.Config.ExposedPorts}}'"} nginx:1.25-alpine{"\n"}
<span className="c-ok">{"map[80/tcp:{}]"}</span>{"\n\n"}
<span className="c-cm"># See disk usage broken down by image</span>{"\n"}
docker system df{"\n"}
<span className="c-ok">TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE</span>{"\n"}
<span className="c-ok">Images          5         2         512MB     280MB (54%)</span>{"\n"}
<span className="c-ok">Containers      3         3         0B        0B</span>
          </div>
        </div>

        {/* LAB */}
        <div id="s13p12">
          <div className="act-box">
            <h3>&#127919; Hands-On Lab Activities</h3>

            <h4>Lab 1 — Install Docker and Verify</h4>
            <ol className="lab-ol">
              <li>Follow the Linux installation steps — install Docker Engine on your Ubuntu machine</li>
              <li>Run <code>docker version</code> — screenshot client and server versions</li>
              <li>Run <code>docker run hello-world</code> — screenshot the success output</li>
              <li>Run <code>sudo usermod -aG docker $USER</code> then log out and back in — verify you can run <code>docker ps</code> without sudo</li>
              <li>Run <code>docker system info</code> — identify the Docker Root Dir, storage driver, and number of containers</li>
            </ol>

            <h4>Lab 2 — Explore Docker Hub and Pull Images</h4>
            <ol className="lab-ol">
              <li>Run <code>docker search nginx</code> — identify the official image (marked OFFICIAL)</li>
              <li>Pull three nginx variants: <code>docker pull nginx:latest</code>, <code>docker pull nginx:1.25-alpine</code>, <code>docker pull nginx:1.25-slim</code></li>
              <li>Run <code>docker image ls</code> — screenshot showing all three. Compare their sizes.</li>
              <li>Pull the official Ubuntu image: <code>docker pull ubuntu:22.04</code>. Then pull <code>alpine:3.18</code>. Compare sizes.</li>
              <li>Document your findings: how much smaller is alpine compared to ubuntu? What are the implications for production use?</li>
            </ol>

            <h4>Lab 3 — Inspect Images</h4>
            <ol className="lab-ol">
              <li>Run <code>docker history nginx:1.25-alpine</code> — count the layers, identify the largest one</li>
              <li>Run <code>docker inspect nginx:1.25-alpine</code> — find: the exposed port, the default CMD, and the number of layers</li>
              <li>Run <code>{"docker inspect --format='{{.Config.Env}}' nginx:1.25-alpine"}</code> — list the environment variables</li>
              <li>Compare <code>docker history nginx:latest</code> vs <code>docker history nginx:1.25-alpine</code> — which has more layers? Which layers differ?</li>
              <li>Run <code>docker system df</code> — note total image disk usage and how much is reclaimable</li>
            </ol>

            <h4>Lab 4 — Run Your First Real Container</h4>
            <ol className="lab-ol">
              <li>Run nginx: <code>docker run -d -p 8080:80 --name my-nginx nginx:1.25-alpine</code></li>
              <li>Verify it is running: <code>docker ps</code> — note the container ID, image, ports, and name</li>
              <li>Open a browser or curl: <code>curl http://localhost:8080</code> — you should see the nginx welcome page HTML</li>
              <li>Check logs: <code>docker logs my-nginx</code> — the GET request you just made should appear</li>
              <li>Stop and remove: <code>docker stop my-nginx && docker rm my-nginx</code>. Verify with <code>docker ps -a</code> that it is gone.</li>
            </ol>

            <h4>Challenge — Layer Caching</h4>
            <ol className="lab-ol">
              <li>Pull <code>python:3.11-alpine</code> and <code>python:3.12-alpine</code></li>
              <li>Run <code>docker system df -v</code> — note how much space is shared vs unique between the two images</li>
              <li>Run <code>docker image prune</code> — observe which images are removed (only dangling/untagged ones)</li>
              <li>Remove all pulled images with <code>docker image prune -a</code> and verify disk reclaimed with <code>docker system df</code></li>
            </ol>
          </div>
        </div>

        {/* QUIZ */}
        <div id="s13p13" className="quiz-box">
          <h3>&#127891; Quick Quiz &mdash; Knowledge Check</h3>
          <ul className="quiz-list">
            {quizData.map((item, i) => (
              <li key={i} className="qi">
                <div className="qi-n">Q{i+1} of {quizData.length}</div>
                <div className="qi-q">{item.q}</div>
                <div className="qi-a">&#128161; {item.a}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* HOMEWORK */}
        <div id="s13p14" className="hw-box">
          <h3>&#128221; Homework Assignment</h3>
          <div className="hw-task">
            <h4>1. Installation &amp; Verification:</h4>
            <ul>
              <li>Install Docker Engine on Linux and Docker Desktop on Windows (or document both processes)</li>
              <li>Screenshot <code>docker version</code>, <code>docker system info</code>, and <code>docker run hello-world</code> on both platforms</li>
              <li>Document any installation issues and how you solved them</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>2. Image Comparison Report:</h4>
            <ul>
              <li>Pull these image variants: <code>node:20</code>, <code>node:20-slim</code>, <code>node:20-alpine</code></li>
              <li>Create a table comparing: image size, number of layers, base OS, and package manager available</li>
              <li>Write a recommendation: which would you use for a production Node.js API and why?</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>3. Docker Hub Exploration:</h4>
            <ul>
              <li>Visit hub.docker.com — find the official images for: PostgreSQL, Redis, and Maven</li>
              <li>For each: document the recommended tag for production use, the exposed ports, and any important environment variables</li>
              <li>Pull each image and verify with <code>docker inspect</code> that the exposed ports match the documentation</li>
            </ul>
          </div>
          <div className="hw-task">
            <h4>4. Understanding Questions:</h4>
            <ul>
              <li>Draw a diagram showing the Docker Engine architecture (Client → REST API → dockerd → containerd → runc → Container)</li>
              <li>Explain: what happens step-by-step when you run <code>docker run nginx:1.25-alpine</code> for the first time?</li>
              <li>Why are container images stored in layers? List three concrete benefits of this approach.</li>
            </ul>
          </div>
        </div>

        {/* TAKEAWAYS */}
        <div className="pt"><span className="pt-badge">Summary</span>Key Takeaways</div>
        <div className="tk-grid">
          {takeaways.map(([t,d]) => (
            <div key={t} className="tk-card"><h4>{t}</h4><p>{d}</p></div>
          ))}
        </div>

        <div className="flow-pill">
          <span className="fp">Dockerfile</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Image (layers)</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">Registry (Hub)</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">docker pull</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">docker run</span><span className="fp-arrow">&rarr;</span>
          <span className="fp">&#127388; Container</span>
        </div>

        <div className="rules-box">
          <h4>&#11088; Docker Image Golden Rules</h4>
          <ul>
            <li>Never use <code>:latest</code> in production Dockerfiles — pin to specific version tags for reproducible builds</li>
            <li>Prefer <code>-alpine</code> base images — 5–10x smaller, faster pulls, smaller attack surface</li>
            <li>Always run <code>docker image prune</code> periodically on build servers — dangling images accumulate fast</li>
            <li>Use <code>docker inspect</code> to verify exposed ports and environment variables before deploying an unfamiliar image</li>
            <li>Trust only official images and verified publisher images from Docker Hub for production workloads</li>
            <li>Run <code>docker scan &lt;image&gt;</code> to check for CVEs before deploying to production</li>
          </ul>
        </div>

        {/* NEXT */}
        <div className="next-card">
          <div className="next-text">
            <h4>Up Next &middot; Module 5 &middot; Session 14</h4>
            <h3>Working with Docker Containers &amp; CLI</h3>
            <ul>
              <li>Creating, starting, stopping, and removing containers</li>
              <li>Running interactive containers with <code>-it</code> and exec</li>
              <li>Port mapping, environment variables, volume mounts</li>
              <li>Container networking — bridge, host, and custom networks</li>
              <li>The complete Docker CLI reference</li>
            </ul>
          </div>
          <Link href="/courses/dev/session14" className="next-btn">Session 14 &rarr;</Link>
        </div>

      </div>
    </>
  );
}