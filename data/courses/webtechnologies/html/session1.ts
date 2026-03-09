// data/courses/webtechnologies/html/session1.ts
import type { SessionData } from "@/types/session";

const session1: SessionData = {
  meta: {
    sessionNumber: 1,
    module: "html",
    moduleNumber: 1,
    title: "Introduction to HTML & The Web",
    subtitle: "From a 18-tag proposal to a living standard powering 1.7 billion websites",
    duration: "2 hrs",
    color: "#3b82f6",
    colorDim: "rgba(59,130,246,0.09)",
    colorMid: "rgba(59,130,246,0.18)",
    objectives: [
      "Understand what HTML is and how it fits into the web-technology stack",
      "Identify the anatomy of an HTML document and its core elements",
      "Write valid HTML5 markup using tags, attributes, and comments",
      "Recognise the historical milestones that shaped the modern web",
      "Use common text-formatting and structural tags confidently",
    ],
    prevSession: undefined,
    nextSession: {
      num: 2,
      title: "Text Effects & Various Tags",
      href: "/courses/webtechnologies/html/session2",
    },
  },

  // ── Topics ──────────────────────────────────────────────────────────
  topics: [
    {
      id: "what-is-html",
      heading: "What is HTML?",
      content:
        "HTML (HyperText Markup Language) is the standard markup language for creating web pages. " +
        "It describes the structure of a web page using a series of elements represented as tags. " +
        "HTML is NOT a programming language — it is a markup language that tells browsers how to display content.",
      definitions: [
        {
          term: "Markup Language",
          description:
            "Annotates content with structural meaning — headings, paragraphs, lists, links — rather than performing computations.",
        },
        {
          term: "HyperText",
          description:
            "Text that links to other text or resources, making it non-linear — the foundation of the web.",
        },
        {
          term: "Platform Independent",
          description:
            "Renders correctly on any browser (Chrome, Firefox, Safari, Edge) across all operating systems and devices.",
        },
        {
          term: "Human Readable",
          description:
            "Plain text files — open any .html file in a text editor and you can read it immediately.",
        },
      ],
    },

    {
      id: "document-structure",
      heading: "Basic HTML Document Structure",
      content:
        "Every HTML5 document follows a strict skeleton. Browsers expect this structure to parse and render content correctly.",
      tip: "The lang attribute on <html> is important for accessibility. Screen readers use it to select the correct speech-synthesis voice.",
      codeExamples: [
        {
          label: "Minimal HTML5 Document",
          code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is my first paragraph.</p>
    <!-- This is a comment — not shown in the browser -->
  </body>
</html>`,
        },
      ],
      definitions: [
        {
          term: "<!DOCTYPE html>",
          description:
            "Declaration (not a tag) that tells the browser this is HTML5. Always the very first line.",
        },
        {
          term: "<html lang='en'>",
          description:
            "The root element wrapping the entire document. The lang attribute helps screen readers and search engines.",
        },
        {
          term: "<head>",
          description:
            "Contains metadata: page title, character set, viewport settings, CSS links. Nothing here is visually rendered.",
        },
        {
          term: "<meta charset='UTF-8'>",
          description:
            "Sets character encoding so special characters (€, ₹, ©, etc.) display correctly.",
        },
        {
          term: "<title>",
          description:
            "Text shown in the browser tab and used as the default bookmark name. Critical for SEO.",
        },
        {
          term: "<body>",
          description:
            "All visible content lives here — headings, paragraphs, images, links, forms, videos.",
        },
      ],
    },

    {
      id: "tags-and-elements",
      heading: "Tags, Elements & Nesting",
      content:
        "An HTML element = opening tag + content + closing tag. " +
        "Elements can be nested (placed inside other elements), but they must be properly closed in reverse order.",
      tip: "Always indent nested elements by 2 spaces. This makes your code readable and helps you spot missing closing tags instantly.",
      codeExamples: [
        {
          label: "Element Anatomy",
          code: `<!-- Anatomy of an element -->
<p>This is a paragraph.</p>
<!-- Opening tag ^   ^ Closing tag (note the slash) -->

<!-- Void elements (self-closing) — no closing tag needed -->
<br>          <!-- line break -->
<hr>          <!-- horizontal rule -->
<img src="photo.jpg" alt="A photo">
<input type="text">

<!-- Nested elements — close in reverse order (LIFO) -->
<p>
  This is <strong>bold</strong> and <em>italic</em> text.
</p>

<!-- WRONG — overlapping tags -->
<strong><em>text</strong></em>   ❌

<!-- CORRECT -->
<strong><em>text</em></strong>   ✅`,
        },
      ],
    },

    {
      id: "common-tags",
      heading: "Common HTML Tags",
      content:
        "These are the tags you will use in almost every HTML page. Learn them well.",
      tip: "Alt text is mandatory for accessibility. Screen readers read it aloud. Search engines use it for image indexing.",
      codeExamples: [
        {
          label: "Headings & Paragraphs",
          code: `<!-- Headings: h1 is the most important, h6 the least -->
<h1>Page Title (use only once per page)</h1>
<h2>Section Heading</h2>
<h3>Sub-section Heading</h3>
<h4>Minor Heading</h4>

<!-- Paragraph -->
<p>This is a paragraph. Browsers add spacing around paragraphs automatically.</p>

<!-- Line break (inside a paragraph) -->
<p>First line.<br>Second line on same paragraph.</p>

<!-- Horizontal rule (thematic break) -->
<hr>`,
        },
        {
          label: "Text Formatting",
          code: `<!-- Semantic (preferred) -->
<strong>Bold — important text</strong>
<em>Italic — emphasised text</em>
<mark>Highlighted text</mark>
<del>Strikethrough (deleted)</del>
<ins>Underline (inserted)</ins>
<small>Smaller text — fine print</small>
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- Sub & superscript -->
<p>H<sub>2</sub>O &nbsp;&nbsp; E = mc<sup>2</sup></p>

<!-- Inline code -->
<p>Use the <code>&lt;img&gt;</code> tag to embed images.</p>

<!-- Block-level preformatted / code block -->
<pre><code>
function greet(name) {
  return "Hello, " + name;
}
</code></pre>`,
        },
        {
          label: "Links",
          code: `<!-- External link — opens in new tab -->
<a href="https://www.w3schools.com" target="_blank" rel="noopener">
  Visit W3Schools
</a>

<!-- Internal link (same site) -->
<a href="/about.html">About Us</a>

<!-- Anchor link (same page) -->
<a href="#section2">Jump to Section 2</a>
<h2 id="section2">Section 2</h2>

<!-- Email link -->
<a href="mailto:hello@example.com">Send Email</a>

<!-- Phone link (useful on mobile) -->
<a href="tel:+919876543210">Call Us</a>`,
        },
        {
          label: "Images",
          code: `<!-- Basic image -->
<img src="logo.png" alt="Company Logo">

<!-- With explicit dimensions (improves page layout stability) -->
<img src="banner.jpg" alt="Welcome Banner" width="800" height="300">

<!-- Image inside a link -->
<a href="https://example.com">
  <img src="click-me.png" alt="Click to visit site">
</a>

<!-- Responsive image (scales with container) -->
<img src="photo.jpg" alt="Landscape" style="max-width: 100%; height: auto;">`,
        },
      ],
    },

    {
      id: "attributes",
      heading: "HTML Attributes",
      content:
        "Attributes provide extra information about elements. They always appear in the opening tag as name=\"value\" pairs.",
      tip: "Prefer id and class for targeting elements instead of inline style. It keeps your HTML clean and makes styling reusable.",
      codeExamples: [
        {
          label: "Attribute Syntax & Common Attributes",
          code: `<!-- Syntax: <tag attribute="value"> -->

<!-- id — unique identifier on the page -->
<p id="intro">First paragraph</p>

<!-- class — groups multiple elements for CSS/JS -->
<p class="highlight">Styled paragraph</p>
<p class="highlight">Another styled paragraph</p>

<!-- style — inline CSS (use sparingly) -->
<p style="color: red; font-size: 18px;">Red text</p>

<!-- title — tooltip on hover -->
<abbr title="Cascading Style Sheets">CSS</abbr>

<!-- lang — language of the element -->
<p lang="ta">வணக்கம்</p>

<!-- Combined example -->
<img
  src="team.jpg"
  alt="Our team photo"
  id="hero-img"
  class="rounded shadow"
  width="600"
  height="400"
  title="Meet the team"
>`,
        },
      ],
      definitions: [
        { term: "id",     description: "Unique identifier. Only one element per page can have the same id. Used for CSS targeting and in-page anchors." },
        { term: "class",  description: "Reusable group name. Multiple elements can share a class, and one element can have several classes." },
        { term: "src",    description: "Source URL for media elements like <img>, <video>, <audio>, <script>." },
        { term: "href",   description: "Hypertext Reference — the destination URL for <a> and <link> elements." },
        { term: "alt",    description: "Alternative text for images — shown when image fails to load and read by screen readers." },
        { term: "target", description: "Where to open the linked document: _self (same tab) or _blank (new tab)." },
        { term: "style",  description: "Inline CSS styles directly on an element. Overrides external/internal CSS." },
        { term: "title",  description: "Advisory information shown as a tooltip on hover." },
      ],
    },

    {
      id: "semantic-html",
      heading: "Semantic HTML5 Elements",
      content:
        "HTML5 introduced semantic elements — tags whose names describe their meaning. " +
        "They make your code readable for developers, accessible for screen-reader users, and indexable for search engines.",
      codeExamples: [
        {
          label: "Semantic Page Layout",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Layout Example</title>
</head>
<body>

  <header>
    <h1>My Blog</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>My First Post</h2>
      <time datetime="2025-01-15">January 15, 2025</time>
      <p>Content of the blog post goes here...</p>

      <section>
        <h3>Comments</h3>
        <p>Great post!</p>
      </section>
    </article>

    <aside>
      <h3>Recent Posts</h3>
      <ul>
        <li><a href="#">Post 1</a></li>
        <li><a href="#">Post 2</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 My Blog. All rights reserved.</p>
  </footer>

</body>
</html>`,
        },
      ],
      definitions: [
        { term: "<header>",           description: "Introductory content or navigation for the page or a section." },
        { term: "<nav>",              description: "A set of navigation links." },
        { term: "<main>",             description: "The dominant, unique content of the page. Only one per page." },
        { term: "<article>",          description: "Self-contained content that makes sense independently (blog post, news article, product card)." },
        { term: "<section>",          description: "A thematic grouping of content with its own heading." },
        { term: "<aside>",            description: "Content tangentially related to the main content (sidebars, pull quotes, ads)." },
        { term: "<footer>",           description: "Footer for the page or a section — copyright, links, contact info." },
        { term: "<figure> / <figcaption>", description: "Self-contained media (image, diagram, chart) with an optional caption." },
      ],
    },
  ],

  // ── Live Demos ───────────────────────────────────────────────────────
  demos: [
    {
      id: "demo1",
      label: "Document Structure",
      html: `<div style="font-family:sans-serif;line-height:1.7;font-size:0.85rem">
  <h3 style="color:#3b82f6;margin:0 0 10px">HTML Document Skeleton</h3>
  <div style="background:#0d1117;color:#e6edf3;padding:14px;border-radius:8px;font-family:monospace;font-size:0.78rem;white-space:pre">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;My Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</div>
  <p style="margin-top:10px;color:#555">Every HTML page starts with this skeleton. The browser reads it top to bottom.</p>
</div>`,
    },
    {
      id: "demo2",
      label: "Common Tags",
      html: `<div style="font-family:sans-serif;line-height:2;font-size:0.85rem">
  <h3 style="color:#3b82f6;margin:0 0 10px">Common Tags in Action</h3>
  <h1 style="font-size:1.4rem;margin:4px 0">h1 — Page Title</h1>
  <h2 style="font-size:1.1rem;margin:4px 0">h2 — Section Heading</h2>
  <p>A <strong>paragraph</strong> with <em>emphasis</em>, <mark>highlight</mark>, and <code>inline code</code>.</p>
  <p>H<sub>2</sub>O &nbsp;|&nbsp; E = mc<sup>2</sup></p>
  <p><del>Old price ₹500</del> &nbsp;<ins>New price ₹299</ins></p>
  <hr style="border:none;border-top:1px solid #e2e8f0;margin:8px 0">
  <p><a href="#" style="color:#3b82f6">Anchor link example</a></p>
</div>`,
    },
    {
      id: "demo3",
      label: "Attributes",
      html: `<div style="font-family:sans-serif;font-size:0.85rem;line-height:1.8">
  <h3 style="color:#3b82f6;margin:0 0 10px">Attributes Demo</h3>
  <p>Image with <code>src</code>, <code>alt</code>, <code>width</code>:</p>
  <img src="https://placehold.co/200x80/3b82f6/white?text=img+tag" alt="Placeholder" width="200" style="border-radius:6px;display:block;margin-bottom:8px">
  <p>Link with <code>href</code> and <code>target="_blank"</code>:<br>
    <a href="https://developer.mozilla.org" target="_blank" rel="noopener" style="color:#3b82f6">MDN Web Docs ↗</a>
  </p>
  <p>Paragraph with <code>id</code> and <code>style</code>:<br>
    <span id="demo-p" style="background:#dbeafe;padding:3px 8px;border-radius:4px">id="demo-p" with inline background</span>
  </p>
</div>`,
    },
    {
      id: "demo4",
      label: "Semantic Layout",
      html: `<div style="font-family:sans-serif;font-size:0.82rem;max-width:480px">
  <div style="background:#3b82f6;color:white;padding:12px 16px;border-radius:8px 8px 0 0">
    <strong>header</strong> — My Blog &nbsp;·&nbsp; <em style="font-size:0.75rem">nav: Home · About</em>
  </div>
  <div style="display:grid;grid-template-columns:1fr 180px;border:1px solid #bfdbfe;border-top:none">
    <div style="padding:12px;border-right:1px solid #bfdbfe">
      <div style="background:#eff6ff;padding:10px;border-radius:6px;margin-bottom:8px">
        <strong>main &gt; article</strong>
        <p style="margin:4px 0 0;color:#555">Blog post content…</p>
      </div>
    </div>
    <div style="padding:12px;background:#f8fafc">
      <strong>aside</strong>
      <ul style="margin:6px 0 0;padding-left:16px;color:#555">
        <li>Post 1</li><li>Post 2</li>
      </ul>
    </div>
  </div>
  <div style="background:#1e293b;color:#94a3b8;padding:8px 16px;border-radius:0 0 8px 8px;font-size:0.72rem">
    footer — © 2025 My Blog
  </div>
</div>`,
    },
  ],

  // ── Exercises ────────────────────────────────────────────────────────
  exercises: [
    {
      title: "Exercise 1: Build Your First HTML Page",
      description: "Create a file named index.html and build the complete structure:",
      tasks: [
        "Add the full HTML5 boilerplate (DOCTYPE, html, head, body)",
        "Set the page title to your name in the <title> tag",
        "Add a <h1> heading with your name",
        "Add a <p> paragraph describing your interests",
        "Use at least 3 formatting tags: <strong>, <em>, <mark>",
        "Add an unordered list of your hobbies",
        "Open the file in Chrome and validate the output",
      ],
      hint: "Start with the boilerplate skeleton, then fill the <body> section step by step.",
    },
    {
      title: "Exercise 2: Tags & Attributes Practice",
      description: "Extend your page to practice common tags and attributes:",
      tasks: [
        "Add an <img> with src, alt, width and height attributes",
        "Add a link with href and target='_blank' that opens in a new tab",
        "Add a <p> with an id attribute and style it with inline CSS",
        "Use <sub> and <sup> to write H₂O and E=mc² on the page",
        "Add an <hr> to separate two sections",
      ],
    },
    {
      title: "Challenge: Semantic Profile Page",
      description: "Restructure your page using semantic HTML5 elements:",
      tasks: [
        "Wrap the whole page in <header>, <main>, and <footer>",
        "Put your name and a <nav> with 3 anchor links inside <header>",
        "Use an <article> inside <main> for your bio content",
        "Add an <aside> with a 'Quick Facts' list",
        "Add a <figure> with an image and a <figcaption>",
      ],
      hint: "Think of a real website layout: header at top, sidebar on the right, footer at bottom.",
    },
  ],
};

export default session1;