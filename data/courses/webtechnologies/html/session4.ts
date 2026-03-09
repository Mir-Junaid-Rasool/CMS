// data/courses/web-technologies/html/session4.ts
import type { SessionData } from "@/types/session";

const session4: SessionData = {
  meta: {
    sessionNumber: 4,
    module: "html",
    moduleNumber: 1,
    title: "Hyperlinks, Anchors & URLs",
    subtitle: "The href attribute, link types, anchor jumps, email/phone links and linking documents",
    duration: "2 hrs",
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.09)",
    colorMid: "rgba(249,115,22,0.18)",
    objectives: [
      "Understand URL structure: protocol, domain, path, query, fragment",
      "Create absolute and relative hyperlinks",
      "Use anchor links for in-page navigation",
      "Link to email addresses and phone numbers",
      "Open links in new tabs and understand rel attributes",
      "Link to downloadable files and external documents",
    ],
    prevSession: { num: 3, title: "Lists & Image Attributes", href: "/courses/webtechnologies/html/session3" },
    nextSession: { num: 5, title: "Tables", href: "/courses/webtechnologies/html/session5" },
  },

  topics: [
    {
      id: "url-structure",
      heading: "Understanding URLs",
      content:
        "A URL (Uniform Resource Locator) is the address of a resource on the web. Every URL has a structured format with distinct parts. Understanding each part helps you write correct links.",
      codeExamples: [
        {
          label: "URL Anatomy",
          code: `https://www.example.com:443/courses/html?page=2&lang=en#section3

┌─────────┐   ┌───────────────┐ ┌──┐ ┌────────────────┐ ┌────────────────┐ ┌──────────┐
│ Protocol│   │    Domain     │ │Port│ │     Path       │ │  Query String  │ │ Fragment │
└─────────┘   └───────────────┘ └──┘ └────────────────┘ └────────────────┘ └──────────┘
  https://    www.example.com    443   /courses/html      ?page=2&lang=en    #section3

Protocol  → https:// or http://  (how to communicate)
Domain    → example.com          (which server)
Port      → :443                 (which port — usually omitted for 80/443)
Path      → /courses/html        (which file/resource on server)
Query     → ?page=2&lang=en      (extra parameters — key=value pairs)
Fragment  → #section3            (jump to id="section3" on the page)`,
        },
      ],
      definitions: [
        {
          term: "Absolute URL",
          description: "Full address including protocol and domain. Works from anywhere. Used for external sites.",
          code: `<a href="https://www.w3schools.com/html/">W3Schools HTML</a>`,
        },
        {
          term: "Relative URL",
          description: "Path relative to the current page. No protocol or domain needed. Used for internal pages.",
          code: `<!-- Same folder -->
<a href="about.html">About</a>

<!-- Sub-folder -->
<a href="courses/html.html">HTML Course</a>

<!-- Parent folder -->
<a href="../index.html">Back to Home</a>

<!-- Root-relative (starts from site root) -->
<a href="/contact.html">Contact</a>`,
        },
      ],
    },

    {
      id: "anchor-tag",
      heading: "The Anchor Tag — <a>",
      content:
        "The <a> tag creates hyperlinks. The href attribute specifies the destination. The target attribute controls where the link opens. The rel attribute provides relationship information — important for security and SEO.",
      table: {
        headers: ["Attribute", "Values", "Purpose"],
        rows: [
          { cells: ["href",     "URL, #id, mailto:, tel:",   "Link destination"] },
          { cells: ["target",   "_self / _blank / _parent",  "_blank opens new tab"] },
          { cells: ["rel",      "noopener noreferrer",        "Security for external links"] },
          { cells: ["title",    "Any text",                   "Tooltip on hover"] },
          { cells: ["download", "filename.pdf",               "Download instead of navigate"] },
        ],
      },
      codeExamples: [
        {
          label: "Link Types & Examples",
          code: `<!-- External link — opens in new tab (with security attributes) -->
<a href="https://www.w3schools.com" target="_blank" rel="noopener noreferrer">
  Visit W3Schools ↗
</a>

<!-- Internal link — same tab (default) -->
<a href="/courses/html/session2.html">Next Session →</a>

<!-- Relative link to file in same folder -->
<a href="contact.html">Contact Us</a>

<!-- Link to parent directory -->
<a href="../index.html">← Go Back Home</a>

<!-- Download link -->
<a href="files/notes.pdf" download="HTML-Notes.pdf">
  ⬇ Download Notes (PDF)
</a>

<!-- Image as link -->
<a href="https://example.com">
  <img src="logo.png" alt="Visit our site" width="120">
</a>`,
        },
      ],
      tip: "Always add rel='noopener noreferrer' when using target='_blank'. Without it, the new page can access and manipulate the opener via window.opener — a security risk.",
    },

    {
      id: "anchor-links",
      heading: "Anchor Links — In-Page Navigation",
      content:
        "A fragment link (#id) jumps to any element with a matching id attribute on the same page. This is used for table-of-contents navigation, back-to-top buttons, and single-page navigation.",
      codeExamples: [
        {
          label: "In-Page Anchor Navigation",
          code: `<!-- Table of contents at the top of the page -->
<nav>
  <h3>Contents</h3>
  <ul>
    <li><a href="#introduction">1. Introduction</a></li>
    <li><a href="#html-basics">2. HTML Basics</a></li>
    <li><a href="#conclusion">3. Conclusion</a></li>
  </ul>
</nav>

<!-- Section targets (scroll targets) -->
<section id="introduction">
  <h2>Introduction</h2>
  <p>Welcome to the course...</p>
</section>

<section id="html-basics">
  <h2>HTML Basics</h2>
  <p>HTML stands for...</p>
</section>

<section id="conclusion">
  <h2>Conclusion</h2>
  <p>Summary of what we learned...</p>
</section>

<!-- Back to top -->
<a href="#top">↑ Back to Top</a>`,
        },
      ],
    },

    {
      id: "special-links",
      heading: "Special Link Types — Email, Phone & Downloads",
      content:
        "The href attribute supports special protocols beyond HTTP. mailto: opens the user's email client, tel: dials a number on mobile devices, and the download attribute forces a file download instead of navigation.",
      codeExamples: [
        {
          label: "mailto, tel, and Download Links",
          code: `<!-- Email link — opens default mail app -->
<a href="mailto:professor@college.edu">
  📧 Email the Professor
</a>

<!-- Email with subject and body pre-filled -->
<a href="mailto:support@example.com?subject=Help Request&body=Hello, I need help with...">
  Contact Support
</a>

<!-- Phone link — tappable on mobile -->
<a href="tel:+919876543210">📞 Call: +91 98765 43210</a>

<!-- WhatsApp link -->
<a href="https://wa.me/919876543210?text=Hello" target="_blank">
  💬 WhatsApp Us
</a>

<!-- Download file -->
<a href="files/assignment.pdf" download>⬇ Download Assignment</a>

<!-- Download with custom filename -->
<a href="files/lecture-01.pdf" download="HTML-Lecture-1.pdf">
  ⬇ Download Lecture Notes
</a>

<!-- Link to a specific section of another page -->
<a href="session1.html#document-structure">
  Review Document Structure →
</a>`,
        },
      ],
    },

    {
      id: "link-styling",
      heading: "Styling Links with CSS",
      content:
        "Links have four interactive states that can be styled with CSS pseudo-classes. Understanding these states lets you create visually distinct, accessible navigation.",
      table: {
        headers: ["Pseudo-class", "When Active", "Common Use"],
        rows: [
          { cells: [":link",    "Unvisited link",              "Default blue color"] },
          { cells: [":visited", "Already visited link",        "Purple color — user has been here"] },
          { cells: [":hover",   "Mouse is over the link",      "Underline, color change, background"] },
          { cells: [":active",  "Link is being clicked",       "Pressed/darker state"] },
          { cells: [":focus",   "Focused via keyboard Tab",    "Outline for accessibility"] },
        ],
      },
      codeExamples: [
        {
          label: "Link State Styling",
          code: `<style>
  /* Default link */
  a { color: #f97316; text-decoration: none; }

  /* Visited */
  a:visited { color: #ea580c; }

  /* Hover — underline appears on hover instead of always showing */
  a:hover { text-decoration: underline; color: #c2410c; }

  /* Active — when clicking */
  a:active { color: #9a3412; }

  /* Focus — keyboard navigation */
  a:focus { outline: 2px solid #f97316; outline-offset: 2px; border-radius: 2px; }

  /* Button-style link */
  .btn-link {
    display: inline-block;
    background: #f97316;
    color: white;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 600;
  }
  .btn-link:hover { background: #ea580c; text-decoration: none; }
</style>

<a href="session2.html">Next Session →</a>
<a href="session2.html" class="btn-link">Go to Session 2</a>`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo1",
      label: "Link Types",
      html: `<div style="font-family:sans-serif;display:grid;gap:10px">
  <div style="padding:10px;background:#fff7ed;border-radius:8px;border:1px solid #fed7aa">
    <strong style="color:#f97316">External:</strong><br>
    <a href="https://w3schools.com" target="_blank" rel="noopener" style="color:#f97316">W3Schools ↗</a>
  </div>
  <div style="padding:10px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
    <strong style="color:#16a34a">Email:</strong><br>
    <a href="mailto:teacher@college.edu" style="color:#16a34a">📧 teacher@college.edu</a>
  </div>
  <div style="padding:10px;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe">
    <strong style="color:#2563eb">Phone:</strong><br>
    <a href="tel:+919876543210" style="color:#2563eb">📞 +91 98765 43210</a>
  </div>
  <div style="padding:10px;background:#faf5ff;border-radius:8px;border:1px solid #e9d5ff">
    <strong style="color:#7c3aed">Download:</strong><br>
    <a href="#" style="color:#7c3aed">⬇ Download Notes.pdf</a>
  </div>
</div>`,
    },
    {
      id: "demo2",
      label: "Anchor Navigation",
      html: `<div style="font-family:sans-serif">
  <nav style="background:#fff7ed;padding:12px;border-radius:8px;margin-bottom:12px">
    <strong style="color:#f97316">Contents:</strong>
    <ul style="margin:6px 0 0;padding-left:20px">
      <li><a href="#s-intro" style="color:#f97316">Introduction</a></li>
      <li><a href="#s-html" style="color:#f97316">HTML Basics</a></li>
      <li><a href="#s-end" style="color:#f97316">Summary</a></li>
    </ul>
  </nav>
  <div id="s-intro" style="padding:8px;border-left:3px solid #f97316;margin-bottom:8px"><strong>Introduction</strong> — section 1</div>
  <div id="s-html" style="padding:8px;border-left:3px solid #f97316;margin-bottom:8px"><strong>HTML Basics</strong> — section 2</div>
  <div id="s-end" style="padding:8px;border-left:3px solid #f97316"><strong>Summary</strong> — section 3</div>
</div>`,
    },
    {
      id: "demo3",
      label: "Button Links",
      html: `<div style="font-family:sans-serif;display:flex;flex-wrap:wrap;gap:10px;align-items:center">
  <a href="#" style="display:inline-block;background:#f97316;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600">Primary Button</a>
  <a href="#" style="display:inline-block;background:transparent;color:#f97316;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;border:2px solid #f97316">Outline Button</a>
  <a href="#" style="display:inline-block;color:#f97316;text-decoration:none;font-weight:600">Text Link →</a>
  <a href="mailto:test@test.com" style="display:inline-block;background:#1c1917;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600">📧 Email Link</a>
</div>`,
    },
    {
      id: "demo4",
      label: "Navigation Menu",
      html: `<nav style="font-family:sans-serif">
  <ul style="list-style:none;padding:0;margin:0;display:flex;gap:4px;background:#1c1917;padding:8px;border-radius:10px">
    <li><a href="#" style="color:white;text-decoration:none;padding:8px 14px;border-radius:6px;background:#f97316;display:block">Home</a></li>
    <li><a href="#" style="color:#a8a29e;text-decoration:none;padding:8px 14px;border-radius:6px;display:block">Courses</a></li>
    <li><a href="#" style="color:#a8a29e;text-decoration:none;padding:8px 14px;border-radius:6px;display:block">Students</a></li>
    <li><a href="mailto:info@college.edu" style="color:#a8a29e;text-decoration:none;padding:8px 14px;border-radius:6px;display:block">Contact</a></li>
  </ul>
</nav>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Multi-Page Website",
      description: "Create a 3-page website (index.html, about.html, contact.html):",
      tasks: [
        "Add a navigation bar on each page with relative links to the other pages",
        "Highlight the current page's link differently (use color or font-weight)",
        "Add an external link to W3Schools with target='_blank'",
        "Add a mailto link in the footer of every page",
      ],
    },
    {
      title: "Exercise 2: Table of Contents",
      description: "Build a long single-page article with anchor navigation:",
      tasks: [
        "Create 5 sections with id attributes",
        "Build a numbered table of contents at the top linking to each section",
        "Add a 'Back to Top' link at the bottom of each section",
        "Style the TOC links with a background color on hover",
      ],
      hint: "Add id='top' to the <body> or first <h1> for the Back to Top link.",
    },
    {
      title: "Challenge: Contact Card",
      description: "Build a contact card with multiple link types:",
      tasks: [
        "Name with a link to a LinkedIn profile (external, new tab)",
        "Email address as a mailto: link with subject pre-filled",
        "Phone number as a tel: link",
        "A download button for a resume PDF",
        "Social links (GitHub, Twitter) as icon-style button links",
      ],
    },
  ],
};

export default session4;