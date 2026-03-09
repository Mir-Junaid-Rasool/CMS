// data/courses/web-technologies/html/session2.ts
import type { SessionData } from "@/types/session";

const session2: SessionData = {
  meta: {
    sessionNumber: 2,
    module: "html",
    moduleNumber: 1,
    title: "Text Effects & Various Tags",
    subtitle: "DIV, MARQUEE, HR, IMG, Colors & Backgrounds — building styled, structured pages",
    duration: "2 hrs",
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.09)",
    colorMid: "rgba(249,115,22,0.18)",
    objectives: [
      "Apply text formatting tags for bold, italic, highlight and more",
      "Use block and inline container tags (DIV, SPAN)",
      "Understand deprecated tags and their modern alternatives",
      "Add images with correct attributes",
      "Apply color using names, hex and RGB values",
      "Set background colors and images on elements",
    ],
    prevSession: { num: 1, title: "Introduction to HTML", href: "/courses/webtechnologies/html/session1" },
    nextSession: { num: 3, title: "Lists & Image Attributes", href: "/courses/webtechnologies/html/session3" },
  },

  topics: [
    // ── Topic 1: Text Formatting ─────────────────────────────
    {
      id: "text-formatting",
      heading: "Text Formatting Tags",
      content:
        "HTML provides semantic and presentational tags to format text. Prefer semantic tags like <strong> and <em> over purely visual ones like <b> and <i> — they carry meaning for browsers, screen readers and search engines.",
      tip: "Use <strong> instead of <b> and <em> instead of <i> for better accessibility and SEO. Semantic tags describe meaning, not just appearance.",
      table: {
        headers: ["Tag", "Purpose", "Example Code", "Renders As"],
        rows: [
          { cells: ["<b>",      "Bold (presentational)",        "<b>Bold</b>",             "Bold"] },
          { cells: ["<strong>", "Bold (important — semantic)",  "<strong>Important</strong>","Important"] },
          { cells: ["<i>",      "Italic (presentational)",      "<i>Italic</i>",            "Italic"] },
          { cells: ["<em>",     "Italic (emphasis — semantic)", "<em>Emphasis</em>",        "Emphasis"] },
          { cells: ["<u>",      "Underline",                    "<u>Underline</u>",         "Underline"] },
          { cells: ["<mark>",   "Highlight",                    "<mark>Highlight</mark>",   "Highlight"] },
          { cells: ["<small>",  "Smaller text",                 "<small>Small</small>",     "Small"] },
          { cells: ["<del>",    "Strikethrough / deleted",      "<del>Deleted</del>",       "~~Deleted~~"] },
          { cells: ["<ins>",    "Inserted / underline",         "<ins>Inserted</ins>",      "Inserted"] },
          { cells: ["<sub>",    "Subscript",                    "H<sub>2</sub>O",           "H₂O"] },
          { cells: ["<sup>",    "Superscript",                  "mc<sup>2</sup>",           "mc²"] },
        ],
      },
      codeExamples: [
        {
          label: "All Text Formatting Tags in One Page",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text Effects</title>
</head>
<body>
  <h1>HTML Text Formatting</h1>

  <!-- Bold -->
  <p><b>Bold using &lt;b&gt;</b> vs <strong>Bold using &lt;strong&gt;</strong></p>

  <!-- Italic -->
  <p><i>Italic using &lt;i&gt;</i> vs <em>Italic using &lt;em&gt;</em></p>

  <!-- Other effects -->
  <p><u>Underlined text</u></p>
  <p><mark>Highlighted text</mark></p>
  <p><small>Smaller text — good for disclaimers</small></p>
  <p><del>Old price: ₹500</del> <ins>New price: ₹299</ins></p>

  <!-- Subscript and Superscript -->
  <p>Water: H<sub>2</sub>O &nbsp; | &nbsp; Energy: E = mc<sup>2</sup></p>
  <p>Carbon Dioxide: CO<sub>2</sub> &nbsp; | &nbsp; Area: πr<sup>2</sup></p>
</body>
</html>`,
        },
      ],
    },

    // ── Topic 2: DIV & SPAN ──────────────────────────────────
    {
      id: "div-span",
      heading: "DIV and SPAN — Container Tags",
      content:
        "DIV and SPAN are the backbone of page layout. DIV is a block-level element that starts on a new line and takes full width. SPAN is inline and wraps only its content. Both are neutral — they carry no visual meaning on their own but become powerful when styled with CSS.",
      definitions: [
        {
          term: "<div>",
          description: "Block-level container. Groups elements vertically. Used for sections, cards, wrappers.",
          code: `<div style="background: #fff3cd; padding: 16px; border-radius: 8px;">
  <h3>Notice</h3>
  <p>This whole block is wrapped in a DIV.</p>
</div>`,
        },
        {
          term: "<span>",
          description: "Inline container. Wraps a piece of text or inline element for styling without breaking flow.",
          code: `<p>
  My name is <span style="color: #f97316; font-weight: bold;">Alex</span>
  and I love <span style="background: #dcfce7; padding: 2px 6px;">coding</span>.
</p>`,
        },
      ],
      codeExamples: [
        {
          label: "DIV Layout with Nested Content",
          code: `<div style="max-width: 600px; margin: 0 auto; font-family: sans-serif;">

  <!-- Header section -->
  <div style="background: #f97316; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0;">My Profile</h1>
  </div>

  <!-- Content section -->
  <div style="background: #fff7ed; padding: 20px; border: 1px solid #fed7aa;">
    <p>Name: <span style="font-weight: bold;">Jane Smith</span></p>
    <p>Course: <span style="color: #f97316;">Web Technologies</span></p>
    <p>Status: <span style="background: #dcfce7; padding: 2px 8px; border-radius: 4px;">Active</span></p>
  </div>

  <!-- Footer section -->
  <div style="background: #1c1917; color: #a8a29e; padding: 12px 20px;
              border-radius: 0 0 8px 8px; font-size: 0.8em;">
    23CSE404 · Web Technologies Lab
  </div>

</div>`,
        },
      ],
    },

    // ── Topic 3: Various Tags ────────────────────────────────
    {
      id: "various-tags",
      heading: "Exposure to Various Tags",
      content:
        "HTML has many utility tags beyond headings and paragraphs. Some are still widely used, some are deprecated in HTML5 but appear in legacy code — important to recognise both.",
      definitions: [
        {
          term: "MARQUEE",
          description: "Creates scrolling text. Deprecated in HTML5 — use CSS animations in modern projects.",
          deprecated: true,
          note: "Modern alternative: CSS animation with @keyframes and translateX",
          code: `<!-- Deprecated — for learning/legacy only -->
<marquee direction="left" behavior="scroll" scrollamount="4">
  🚨 This text scrolls across the screen!
</marquee>

<marquee direction="right" behavior="alternate" bgcolor="#fff3cd">
  ↔ This text bounces left and right
</marquee>

<!-- Modern CSS alternative -->
<div style="overflow: hidden; white-space: nowrap;">
  <span style="display: inline-block; animation: scroll 8s linear infinite;">
    ✅ Modern scrolling text using CSS animation
  </span>
</div>
<style>
  @keyframes scroll {
    from { transform: translateX(100%); }
    to   { transform: translateX(-100%); }
  }
</style>`,
        },
        {
          term: "HR",
          description: "Horizontal Rule — creates a thematic break between sections. Self-closing void element.",
          code: `<h2>Section One</h2>
<p>Content of the first section.</p>

<hr>

<h2>Section Two</h2>
<p>Content of the second section.</p>

<!-- Styled HR -->
<hr style="border: none; border-top: 2px solid #f97316;
           width: 60%; margin: 24px auto;">`,
        },
        {
          term: "NOBR",
          description: "Prevents text from wrapping. Not part of HTML5 spec.",
          deprecated: true,
          note: "Modern alternative: CSS white-space: nowrap",
          code: `<!-- Legacy -->
<nobr>This long text will never wrap to the next line no matter how small the window</nobr>

<!-- Modern CSS alternative -->
<p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
  This text won't wrap and shows ... if too long
</p>`,
        },
        {
          term: "DFN",
          description: "Definition element — marks the first use of a term being defined. Renders in italics.",
          code: `<p>
  <dfn>HTML</dfn> stands for HyperText Markup Language.
  It is the standard language for creating web pages.
</p>
<p>
  <dfn title="Cascading Style Sheets">CSS</dfn> is used to style HTML documents.
</p>`,
        },
        {
          term: "LISTING / PRE",
          description: "LISTING is obsolete. PRE preserves whitespace and displays text in a monospace font — ideal for code.",
          code: `<!-- Obsolete — do not use -->
<!-- <listing>...</listing> -->

<!-- Use PRE instead -->
<pre>
  Name:   Alice
  Course: Web Technologies
  Year:   2024
</pre>

<!-- PRE + CODE for programming code -->
<pre><code>
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World"));
</code></pre>`,
        },
        {
          term: "Comment",
          description: "HTML comments are not rendered in the browser. Use them to explain code, mark sections, or temporarily disable markup.",
          code: `<!-- Single-line comment -->

<!--
  Multi-line comment
  for longer explanations
-->

<!-- TODO: Add navigation here -->
<nav>...</nav>

<!-- Temporarily disabled code:
<div class="old-banner">...</div>
-->`,
        },
      ],
    },

    // ── Topic 4: IMG Tag ─────────────────────────────────────
    {
      id: "img-tag",
      heading: "The IMG Tag & Its Attributes",
      content:
        "Images are embedded with the self-closing <img> tag. Always include src and alt — src loads the image, alt provides a text fallback for accessibility and SEO. Without alt, screen-reader users get no information about the image.",
      tip: "Always specify width and height on images. This prevents layout shift (CLS) while the image loads — the browser can reserve the right space in advance.",
      table: {
        headers: ["Attribute", "Required", "Description", "Example Value"],
        rows: [
          { cells: ["src",    "✅ Yes", "Path or URL to the image file",              "images/photo.jpg"] },
          { cells: ["alt",    "✅ Yes", "Descriptive text for accessibility/SEO",     "Profile photo of Alice"] },
          { cells: ["width",  "Recommended", "Width in pixels or %",                  "300 or 50%"] },
          { cells: ["height", "Recommended", "Height in pixels or %",                 "200"] },
          { cells: ["title",  "Optional", "Tooltip text shown on hover",              "Click to enlarge"] },
          { cells: ["loading","Optional", "lazy defers offscreen images",             "lazy"] },
          { cells: ["style",  "Optional", "Inline CSS for border, radius, etc.",      "border-radius: 8px"] },
        ],
      },
      codeExamples: [
        {
          label: "IMG Tag Examples",
          code: `<!-- Basic image -->
<img src="photo.jpg" alt="A mountain landscape">

<!-- With dimensions -->
<img src="logo.png" alt="Company Logo" width="200" height="80">

<!-- Responsive image (scales with container) -->
<img src="banner.jpg" alt="Welcome Banner"
     style="max-width: 100%; height: auto; border-radius: 12px;">

<!-- Image with tooltip -->
<img src="team.jpg" alt="Our team" title="Meet the team — hover works!" width="400">

<!-- Lazy loaded image (defers loading until near viewport) -->
<img src="large-photo.jpg" alt="Large image" loading="lazy" width="800" height="600">

<!-- Image as a link -->
<a href="https://example.com">
  <img src="banner.jpg" alt="Visit our website" width="300">
</a>

<!-- Placeholder when image is missing -->
<img src="broken-link.jpg"
     alt="Image failed to load — this alt text shows instead"
     width="300" height="200">`,
        },
      ],
    },

    // ── Topic 5: Colors ──────────────────────────────────────
    {
      id: "colors",
      heading: "Colors & Backgrounds",
      content:
        "CSS color can be specified four ways: named colors (tomato, steelblue), hexadecimal (#RRGGBB), RGB rgb(r,g,b), and RGBA rgba(r,g,b,a) which adds transparency. Background properties let you set solid colors, images, and control repetition and position.",
      codeExamples: [
        {
          label: "All Four Color Formats",
          code: `<!-- Color Names (140+ built-in) -->
<p style="color: tomato;">Text in tomato color</p>
<p style="color: steelblue;">Text in steelblue color</p>
<p style="background-color: lightyellow; padding: 8px;">Light yellow background</p>

<!-- Hexadecimal #RRGGBB -->
<p style="color: #FF0000;">Red using hex</p>
<p style="color: #0000FF;">Blue using hex</p>
<p style="background-color: #F0FFF0; padding: 8px;">#F0FFF0 honeydew background</p>

<!-- Shorthand hex #RGB (same as #RRGGBB when digits repeat) -->
<p style="color: #F00;">Red shorthand #F00 = #FF0000</p>

<!-- RGB rgb(red, green, blue) — values 0 to 255 -->
<p style="color: rgb(255, 99, 71);">rgb(255, 99, 71) — tomato</p>
<p style="background-color: rgb(220, 252, 231); padding: 8px;">rgb green tint</p>

<!-- RGBA — 4th value is opacity 0.0 (transparent) to 1.0 (solid) -->
<p style="background-color: rgba(249, 115, 22, 0.15);
          border: 1px solid rgba(249, 115, 22, 0.4);
          padding: 8px; border-radius: 6px;">
  rgba orange at 15% opacity — great for subtle highlights
</p>`,
        },
        {
          label: "Background Properties",
          code: `<!-- Solid background color -->
<div style="background-color: #1e293b; color: white; padding: 20px;">
  Dark background with white text
</div>

<!-- Background image -->
<div style="background-image: url('pattern.png');
            background-repeat: repeat;
            padding: 40px; text-align: center;">
  Content over a tiled background image
</div>

<!-- Background image — cover, no repeat, centered -->
<div style="background-image: url('hero.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            height: 300px;
            color: white;">
  Hero section with full-cover background
</div>

<!-- CSS gradient background (modern, no image needed) -->
<div style="background: linear-gradient(135deg, #f97316, #fb923c);
            color: white; padding: 24px; border-radius: 12px;">
  Gradient background using CSS
</div>`,
        },
      ],
      table: {
        headers: ["Property", "Value Example", "Effect"],
        rows: [
          { cells: ["background-color",    "#f97316 / tomato / rgb()",    "Sets solid background color"] },
          { cells: ["background-image",    "url('image.jpg')",            "Sets a background image"] },
          { cells: ["background-repeat",   "no-repeat / repeat-x / repeat", "Controls tiling"] },
          { cells: ["background-position", "center / top left / 50% 50%", "Positions the image"] },
          { cells: ["background-size",     "cover / contain / 300px",     "Scales the image"] },
          { cells: ["background",          "Shorthand for all above",     "background: url() no-repeat center/cover"] },
        ],
      },
    },
  ],

  // ── Live Demos ─────────────────────────────────────────────
  demos: [
    {
      id: "demo1",
      label: "Text Formatting",
      html: `<div style="font-family:sans-serif;line-height:2">
  <h3 style="color:#f97316;margin:0 0 10px">Text Formatting Demo</h3>
  <p><b>&lt;b&gt;</b> vs <strong>&lt;strong&gt;</strong> — both bold, different meaning</p>
  <p><i>&lt;i&gt;</i> vs <em>&lt;em&gt;</em> — both italic, different meaning</p>
  <p><u>Underline</u> | <mark>Highlight</mark> | <small>Small text</small></p>
  <p><del>Old ₹500</del> → <ins><strong>₹299</strong></ins></p>
  <p>H<sub>2</sub>O &nbsp;|&nbsp; CO<sub>2</sub> &nbsp;|&nbsp; E=mc<sup>2</sup> &nbsp;|&nbsp; x<sup>2</sup>+y<sup>2</sup></p>
</div>`,
    },
    {
      id: "demo2",
      label: "DIV Containers",
      html: `<div style="font-family:sans-serif;display:grid;gap:10px">
  <div style="background:#fff7ed;border-left:4px solid #f97316;padding:12px;border-radius:6px">
    <strong>Block DIV</strong> — takes full width, starts on new line
  </div>
  <p>Text with <span style="background:#fef9c3;padding:2px 6px;border-radius:4px">inline span</span> styling only part of the sentence.</p>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    <div style="background:#dcfce7;padding:12px;border-radius:6px;text-align:center">DIV 1</div>
    <div style="background:#dbeafe;padding:12px;border-radius:6px;text-align:center">DIV 2</div>
  </div>
</div>`,
    },
    {
      id: "demo3",
      label: "Colors",
      html: `<div style="font-family:sans-serif;display:grid;gap:8px">
  <div style="background:tomato;color:white;padding:10px;border-radius:6px">Color Name: tomato</div>
  <div style="background:#667eea;color:white;padding:10px;border-radius:6px">Hex: #667eea</div>
  <div style="background:rgb(56,239,125);color:#111;padding:10px;border-radius:6px">RGB: rgb(56,239,125)</div>
  <div style="background:rgba(249,115,22,0.2);border:1px solid rgba(249,115,22,0.5);padding:10px;border-radius:6px">RGBA: rgba(249,115,22,0.2) — transparent</div>
  <div style="background:linear-gradient(135deg,#f97316,#8b5cf6);color:white;padding:10px;border-radius:6px">CSS Gradient</div>
</div>`,
    },
    {
      id: "demo4",
      label: "Complete Page",
      html: `<div style="font-family:sans-serif;max-width:500px">
  <div style="background:linear-gradient(135deg,#f97316,#fb923c);color:white;padding:16px;border-radius:8px 8px 0 0">
    <h2 style="margin:0">🎓 Student Profile</h2>
  </div>
  <div style="background:#fff7ed;padding:16px;border:1px solid #fed7aa">
    <p><strong>Name:</strong> <em>Alex Kumar</em></p>
    <p><strong>Course:</strong> <mark>Web Technologies</mark></p>
    <p><del>Beginner</del> <ins>Intermediate</ins></p>
    <hr style="border:none;border-top:1px solid #fed7aa;margin:10px 0">
    <p>Formula: H<sub>2</sub>O | E=mc<sup>2</sup></p>
  </div>
  <div style="background:#1c1917;color:#a8a29e;padding:10px 16px;border-radius:0 0 8px 8px;font-size:0.75em">
    23CSE404 · HTML Session 2
  </div>
</div>`,
    },
  ],

  // ── Exercises ──────────────────────────────────────────────
  exercises: [
    {
      title: "Exercise 1: Text Formatting Page",
      description: "Create a single HTML page demonstrating all text effects:",
      tasks: [
        "Show all 11 formatting tags with examples in a table",
        "Write a scientific paragraph using sub and superscript (H₂O, E=mc²)",
        "Create a price-drop component using <del> and <ins>",
        "Wrap sections in <div> with different background colors",
        "Separate sections with styled <hr> tags",
      ],
      hint: "Use a <div> wrapper with padding for each section and apply background-color inline.",
    },
    {
      title: "Exercise 2: Color Palette Explorer",
      description: "Build a color reference page:",
      tasks: [
        "Create 5 divs showing color names (tomato, steelblue, goldenrod, orchid, seagreen)",
        "Create 5 divs showing hex colors of your choice",
        "Create 5 divs showing RGB values",
        "Create 2 divs showing RGBA transparency at 0.2 and 0.8 opacity",
        "Show the color code as text inside each div",
      ],
    },
    {
      title: "Challenge: Personal Card",
      description: "Build a styled profile card using only HTML inline styles:",
      tasks: [
        "Outer div with gradient background (use linear-gradient in background property)",
        "Profile section with your name in <strong> and role in <em>",
        "Skills list using text formatting (mark, small, strong)",
        "Use <dfn> to define a technical term you know",
        "Include a background-color div footer with <small> credits",
      ],
      hint: "Chain multiple styles: style='background: ...; padding: ...; border-radius: ...'",
    },
  ],
};

export default session2;