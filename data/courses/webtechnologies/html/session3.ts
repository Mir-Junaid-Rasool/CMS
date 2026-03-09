// data/courses/web-technologies/html/session3.ts
import type { SessionData } from "@/types/session";

const session3: SessionData = {
  meta: {
    sessionNumber: 3,
    module: "html",
    moduleNumber: 1,
    title: "Lists & Image Attributes",
    subtitle: "Ordered, unordered, and definition lists — plus mastering every image attribute",
    duration: "2 hrs",
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.09)",
    colorMid: "rgba(249,115,22,0.18)",
    objectives: [
      "Create ordered lists with different numbering styles",
      "Build unordered lists with bullet customisation",
      "Construct definition lists for glossaries and FAQs",
      "Nest lists for multi-level navigation menus",
      "Apply all image attributes including responsive techniques",
    ],
    prevSession: { num: 2, title: "Text Effects & Various Tags", href: "/courses/webtechnologies/html/session2" },
    nextSession: { num: 4, title: "Hyperlinks, Anchors & URLs", href: "/courses/webtechnologies/html/session4" },
  },

  topics: [
    {
      id: "unordered-lists",
      heading: "Unordered Lists — <ul>",
      content:
        "An unordered list renders items with bullet points. The type attribute (or CSS list-style-type) controls the bullet shape. Each item is wrapped in <li>. Unordered lists are ideal for navigation menus, feature lists, and any collection without a meaningful order.",
      table: {
        headers: ["type value", "Bullet Shape", "Usage"],
        rows: [
          { cells: ["disc",   "● Filled circle (default)",   "General lists"] },
          { cells: ["circle", "○ Hollow circle",             "Sub-lists"] },
          { cells: ["square", "■ Filled square",             "Feature lists"] },
          { cells: ["none",   "No bullet",                   "Navigation menus"] },
        ],
      },
      codeExamples: [
        {
          label: "Unordered List Examples",
          code: `<!-- Default disc bullets -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Circle bullets -->
<ul type="circle">
  <li>Python</li>
  <li>Java</li>
  <li>C++</li>
</ul>

<!-- Square bullets -->
<ul type="square">
  <li>React</li>
  <li>Angular</li>
  <li>Vue</li>
</ul>

<!-- No bullets (for navigation) -->
<ul style="list-style-type: none; padding: 0;">
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>`,
        },
      ],
    },

    {
      id: "ordered-lists",
      heading: "Ordered Lists — <ol>",
      content:
        "Ordered lists number items automatically. The type attribute sets the counter style, start sets the starting value, and reversed reverses the count. Use ordered lists for steps, rankings, instructions, and any sequence where order matters.",
      table: {
        headers: ["type value", "Counter Style", "Example"],
        rows: [
          { cells: ["1", "Numbers (default)", "1. 2. 3."] },
          { cells: ["A", "Uppercase letters", "A. B. C."] },
          { cells: ["a", "Lowercase letters", "a. b. c."] },
          { cells: ["I", "Uppercase Roman",   "I. II. III."] },
          { cells: ["i", "Lowercase Roman",   "i. ii. iii."] },
        ],
      },
      codeExamples: [
        {
          label: "Ordered List Examples",
          code: `<!-- Default numbers -->
<ol>
  <li>Open VS Code</li>
  <li>Create index.html</li>
  <li>Write HTML boilerplate</li>
  <li>Open in browser</li>
</ol>

<!-- Uppercase letters -->
<ol type="A">
  <li>Introduction</li>
  <li>Main Content</li>
  <li>Conclusion</li>
</ol>

<!-- Roman numerals -->
<ol type="I">
  <li>Module 1: HTML</li>
  <li>Module 2: CSS</li>
  <li>Module 3: JavaScript</li>
</ol>

<!-- Start from a specific number -->
<ol start="5">
  <li>Step Five</li>
  <li>Step Six</li>
  <li>Step Seven</li>
</ol>

<!-- Reversed countdown -->
<ol reversed>
  <li>Gold 🥇</li>
  <li>Silver 🥈</li>
  <li>Bronze 🥉</li>
</ol>`,
        },
      ],
    },

    {
      id: "definition-lists",
      heading: "Definition Lists — <dl>",
      content:
        "A definition list pairs terms (<dt>) with their descriptions (<dd>). Perfect for glossaries, FAQs, metadata, and key-value pairs. One <dt> can have multiple <dd> entries and vice versa.",
      codeExamples: [
        {
          label: "Definition List Examples",
          code: `<!-- Basic glossary -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — the structure of web pages</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets — controls the visual presentation</dd>

  <dt>JavaScript</dt>
  <dd>A scripting language that adds interactivity to web pages</dd>
</dl>

<!-- FAQ style -->
<dl>
  <dt>What is the internet?</dt>
  <dd>A global network connecting millions of computers worldwide.</dd>

  <dt>What is a web browser?</dt>
  <dd>Software that retrieves and displays web pages.</dd>
  <dd>Examples: Chrome, Firefox, Safari, Edge.</dd>
</dl>`,
        },
      ],
    },

    {
      id: "nested-lists",
      heading: "Nested Lists",
      content:
        "Lists can be nested inside <li> elements to any depth. This creates hierarchical structures like site navigation, outlines, and multi-level menus. Always close the inner list before closing the parent <li>.",
      tip: "Avoid nesting more than 3 levels deep — it becomes hard to read. For deep hierarchies, consider using a different structure like a tree with CSS.",
      codeExamples: [
        {
          label: "Nested List — Course Outline",
          code: `<ul>
  <li>Module 1: HTML
    <ul>
      <li>Session 1: Introduction</li>
      <li>Session 2: Text & Tags</li>
      <li>Session 3: Lists & Images</li>
    </ul>
  </li>
  <li>Module 2: CSS
    <ul>
      <li>Session 7: Introduction to CSS</li>
      <li>Session 8: Box Model</li>
    </ul>
  </li>
  <li>Module 3: JavaScript</li>
</ul>

<!-- Mixed: ordered inside unordered -->
<ul>
  <li>Frontend Skills
    <ol>
      <li>Learn HTML first</li>
      <li>Then add CSS</li>
      <li>Finally JavaScript</li>
    </ol>
  </li>
  <li>Backend Skills
    <ol type="a">
      <li>Choose a language</li>
      <li>Learn databases</li>
    </ol>
  </li>
</ul>`,
        },
      ],
    },

    {
      id: "image-attributes",
      heading: "Image Attributes — Deep Dive",
      content:
        "The <img> tag has no closing tag and supports many attributes. Beyond src and alt, understanding width, height, loading, and usemap unlocks powerful image capabilities. Images can be responsive, lazy-loaded, or used as clickable image maps.",
      tip: "Always include width and height attributes to prevent Cumulative Layout Shift (CLS). The browser reserves space before the image loads.",
      table: {
        headers: ["Attribute", "Required", "Values / Example", "Purpose"],
        rows: [
          { cells: ["src",      "✅", "path/to/image.jpg",          "Image file path or URL"] },
          { cells: ["alt",      "✅", "Description of image",        "Accessibility & fallback text"] },
          { cells: ["width",    "👍", "300 / 50%",                   "Display width"] },
          { cells: ["height",   "👍", "200",                         "Display height"] },
          { cells: ["title",    "Optional", "Tooltip on hover",      "Advisory information"] },
          { cells: ["loading",  "Optional", "lazy / eager",          "Defer offscreen images"] },
          { cells: ["style",    "Optional", "border-radius: 50%",    "Inline CSS styling"] },
          { cells: ["usemap",   "Optional", "#mapname",              "Link to image map"] },
          { cells: ["ismap",    "Optional", "ismap",                 "Server-side image map"] },
        ],
      },
      codeExamples: [
        {
          label: "Image Attribute Examples",
          code: `<!-- Fully attributed image -->
<img src="profile.jpg"
     alt="Alice's profile picture"
     width="200"
     height="200"
     title="Alice — Web Developer"
     loading="lazy"
     style="border-radius: 50%; border: 3px solid #f97316;">

<!-- Responsive image (no fixed dimensions) -->
<img src="banner.jpg"
     alt="Course banner"
     style="width: 100%; max-width: 800px; height: auto; display: block;">

<!-- Image map — clickable regions on a single image -->
<img src="worldmap.jpg" alt="World Map" usemap="#worldmap" width="600" height="300">
<map name="worldmap">
  <area shape="rect"   coords="50,50,200,200"   href="asia.html"   alt="Asia">
  <area shape="circle" coords="300,150,80"       href="europe.html" alt="Europe">
  <area shape="poly"   coords="400,50,500,100,450,200" href="africa.html" alt="Africa">
</map>

<!-- Thumbnail that links to full size -->
<a href="full-photo.jpg">
  <img src="thumbnail.jpg"
       alt="Click to view full image"
       width="150"
       style="border: 2px solid #e5e7eb; border-radius: 8px;">
</a>`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo1",
      label: "Unordered Lists",
      html: `<div style="font-family:sans-serif;display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
  <div>
    <strong style="color:#f97316">disc</strong>
    <ul><li>HTML</li><li>CSS</li><li>JS</li></ul>
  </div>
  <div>
    <strong style="color:#f97316">circle</strong>
    <ul type="circle"><li>React</li><li>Vue</li><li>Angular</li></ul>
  </div>
  <div>
    <strong style="color:#f97316">square</strong>
    <ul type="square"><li>Node</li><li>PHP</li><li>Python</li></ul>
  </div>
</div>`,
    },
    {
      id: "demo2",
      label: "Ordered Lists",
      html: `<div style="font-family:sans-serif;display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
  <div><strong style="color:#f97316">Numbers</strong><ol><li>Step 1</li><li>Step 2</li><li>Step 3</li></ol></div>
  <div><strong style="color:#f97316">Letters</strong><ol type="A"><li>Option A</li><li>Option B</li><li>Option C</li></ol></div>
  <div><strong style="color:#f97316">Roman</strong><ol type="I"><li>Module I</li><li>Module II</li><li>Module III</li></ol></div>
</div>`,
    },
    {
      id: "demo3",
      label: "Definition List",
      html: `<dl style="font-family:sans-serif;display:grid;gap:8px">
  <dt style="font-weight:700;color:#f97316;margin-top:8px">HTML</dt>
  <dd style="margin:0 0 0 20px;color:var(--muted,#888)">HyperText Markup Language — the skeleton of every webpage</dd>
  <dt style="font-weight:700;color:#f97316">CSS</dt>
  <dd style="margin:0 0 0 20px;color:var(--muted,#888)">Cascading Style Sheets — controls visual presentation</dd>
  <dt style="font-weight:700;color:#f97316">JavaScript</dt>
  <dd style="margin:0 0 0 20px;color:var(--muted,#888)">Scripting language that adds interactivity</dd>
  <dd style="margin:0 0 0 20px;color:var(--muted,#888)">Runs directly in the browser</dd>
</dl>`,
    },
    {
      id: "demo4",
      label: "Nested Lists",
      html: `<ul style="font-family:sans-serif;line-height:1.8">
  <li><strong style="color:#f97316">Module 1: HTML</strong>
    <ul>
      <li>Session 1: Introduction</li>
      <li>Session 2: Text & Tags</li>
      <li>Session 3: Lists & Images ← You are here</li>
    </ul>
  </li>
  <li><strong style="color:#3b82f6">Module 2: CSS</strong>
    <ul>
      <li>Session 7: Selectors</li>
      <li>Session 8: Box Model</li>
    </ul>
  </li>
  <li><strong style="color:#eab308">Module 3: JavaScript</strong></li>
</ul>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Course Syllabus Page",
      description: "Build a nested list representing a full course syllabus:",
      tasks: [
        "Create an ordered list of 4 modules",
        "Inside each module, add an unordered list of at least 3 topics",
        "Style each module heading differently using inline color",
        "Add a definition list at the bottom defining 5 web terms",
      ],
    },
    {
      title: "Exercise 2: Photo Gallery",
      description: "Build a simple image gallery using HTML only:",
      tasks: [
        "Add 4 images with proper alt text",
        "Set width and height on every image",
        "Wrap each image in an <a> tag linking to the full-size image",
        "Add title attributes that appear on hover",
        "Add a caption using a definition list <dt>/<dd>",
      ],
    },
    {
      title: "Challenge: Navigation Menu",
      description: "Build a multi-level navigation bar using nested lists:",
      tasks: [
        "Create a top-level unordered list with 4 menu items",
        "Each item should have a nested unordered list of 3 sub-items",
        "Remove bullet points using list-style-type: none",
        "Style links with inline color and remove underline (text-decoration: none)",
        "Use <hr> to separate the nav from the page content",
      ],
      hint: "Set style='list-style: none; padding: 0; margin: 0;' on the ul element.",
    },
  ],
};

export default session3;