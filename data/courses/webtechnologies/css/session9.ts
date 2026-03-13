// data/courses/webtechnologies/css/session9.ts
import type { SessionData } from "@/types/session";

const session9: SessionData = {
  meta: {
    sessionNumber: 9,
    module: "css",
    moduleNumber: 2,
    title: "Selectors, Colors & Fonts",
    subtitle: "How to target HTML elements with CSS selectors, apply color formats, style backgrounds, and control typography",
    duration: "1.5 hrs",
    color: "#11998e",
    colorDim: "rgba(17,153,142,0.09)",
    colorMid: "rgba(17,153,142,0.18)",
    objectives: [
      "Understand what CSS selectors are and why they are needed",
      "Use Universal, Element, Class, ID, Descendant, Child, and Grouping selectors",
      "Know when to use a class vs an ID",
      "Apply colors using named, hex, RGB, RGBA, HSL, and HSLA formats",
      "Set background colors, images, and CSS gradients",
      "Control typography with font-family, font-size, font-weight, and font-style",
      "Style text with text-align, text-decoration, text-transform, and text-shadow",
    ],
    prevSession: { num: 8, title: "Introduction to CSS", href: "/courses/webtechnologies/css/session8" },
    nextSession: { num: 10, title: "CSS Box Model", href: "/courses/webtechnologies/css/session10" },
  },

  topics: [
    // ── PART 1: SELECTORS ────────────────────────────────────────
    {
      id: "what-are-selectors",
      heading: "What are CSS Selectors?",
      content:
        "Selectors are patterns used to select the HTML elements you want to style. They tell the browser which elements should be affected by a CSS rule. Think of a selector as a way to 'point at' specific elements on your page — just like using a pointer to highlight items in a list. Every CSS rule starts with a selector, followed by a declaration block containing the styles to apply.",
      tip: "The selector is the most important part of a CSS rule. Getting it wrong means your styles simply won't apply — no errors, just silence.",
      table: {
        headers: ["Selector Type", "Syntax", "Example", "Description"],
        rows: [
          { cells: ["Universal",  "*",              "* { }",        "Selects all elements"] },
          { cells: ["Element",    "element",         "p { }",        "Selects all elements of that type"] },
          { cells: ["Class",      ".classname",      ".box { }",     "Selects elements with that class"] },
          { cells: ["ID",         "#idname",         "#header { }",  "Selects the element with that ID"] },
          { cells: ["Descendant", "parent child",    "div p { }",    "Selects children inside parent (any depth)"] },
          { cells: ["Child",      "parent > child",  "div > p { }",  "Selects direct children only"] },
          { cells: ["Grouping",   "sel1, sel2",      "h1, h2 { }",   "Applies same style to multiple selectors"] },
        ],
      },
    },

    {
      id: "selector-types",
      heading: "Selector Types in Detail",
      content:
        "Each selector type serves a different purpose. The Universal selector (*) resets all elements and is commonly used to strip default browser spacing. The Element selector targets every instance of a tag. The Class selector (.) is the most commonly used — it is reusable across many elements. The ID selector (#) targets one unique element per page and carries higher specificity. Descendant and Child selectors target elements by their position in the HTML tree. Grouping with a comma avoids repeating the same declarations for multiple selectors.",
      codeExamples: [
        {
          label: "Universal Selector — CSS Reset",
          code: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`,
        },
        {
          label: "Element Selector",
          code: `p {
  color: blue;
  font-size: 16px;
}

h1 {
  color: green;
  text-align: center;
}`,
        },
        {
          label: "Class Selector (most common)",
          code: `/* CSS */
.highlight {
  background-color: yellow;
  padding: 10px;
}

/* HTML — reusable on any element */
<p class="highlight">This paragraph is highlighted</p>
<span class="highlight">This span is also highlighted</span>

/* One element can have multiple classes */
<div class="box red large">...</div>`,
        },
        {
          label: "ID Selector (unique per page)",
          code: `/* CSS */
#header {
  background-color: #11998e;
  color: white;
  padding: 20px;
}

/* HTML */
<div id="header">Website Header</div>`,
        },
        {
          label: "Descendant vs Child Selector",
          code: `/* Descendant — any p inside div, at any depth */
div p {
  color: red;
}

/* Child — only direct p children of div */
div > p {
  color: purple;
}`,
        },
        {
          label: "Grouping Selector",
          code: `/* Apply same styles to h1, h2, and h3 at once */
h1, h2, h3 {
  color: #11998e;
  font-family: Arial, sans-serif;
}`,
        },
      ],
      subSections: [
        {
          id: "class-vs-id",
          heading: "Class vs ID — When to Use Which",
          content:
            "Use classes for styling — they are reusable, can appear on multiple elements, and one element can hold many classes. Use IDs for JavaScript targeting and anchor links. IDs have much higher specificity than classes, which can make them harder to override later. A common rule of thumb: if in doubt, use a class.",
          tip: "Prefer classes for all visual styling. Reserve IDs for JavaScript hooks (document.getElementById) and in-page anchor links (#section).",
        },
      ],
    },

    // ── PART 2: COLORS & BACKGROUNDS ─────────────────────────────
    {
      id: "color-values",
      heading: "Color Values in CSS",
      content:
        "CSS supports six ways to define colors. Named colors like 'red' or 'teal' are readable but limited to around 140 predefined names. Hexadecimal (#RRGGBB) is the most widely used format — each pair of characters represents red, green, and blue on a 00–FF scale. RGB and RGBA give precise numeric control; RGBA adds an alpha channel for transparency (0 = invisible, 1 = fully opaque). HSL (Hue, Saturation, Lightness) is intuitive for making color variations — simply adjust lightness to get tints and shades. HSLA adds transparency to HSL.",
      table: {
        headers: ["Method", "Syntax", "Example", "Use Case"],
        rows: [
          { cells: ["Color Names",  "name",               "red, blue, teal",          "Quick & simple"] },
          { cells: ["Hexadecimal",  "#RRGGBB",            "#FF5733",                  "Most common"] },
          { cells: ["RGB",          "rgb(r, g, b)",       "rgb(255, 87, 51)",         "Precise control"] },
          { cells: ["RGBA",         "rgba(r, g, b, a)",   "rgba(255, 87, 51, 0.5)",   "Color + transparency"] },
          { cells: ["HSL",          "hsl(h, s%, l%)",     "hsl(14, 100%, 60%)",       "Intuitive adjustments"] },
          { cells: ["HSLA",         "hsla(h, s%, l%, a)", "hsla(14, 100%, 60%, 0.5)", "HSL + transparency"] },
        ],
      },
      codeExamples: [
        {
          label: "Color Property Examples",
          code: `p {
  color: #3498db;            /* Text color — hex */
  background-color: #ecf0f1; /* Background — hex */
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* 50% transparent black */
}

.brand {
  color: hsl(174, 80%, 33%); /* Easy to adjust saturation/lightness */
}`,
        },
      ],
    },

    {
      id: "background-properties",
      heading: "Background Properties",
      content:
        "CSS provides several background properties beyond just background-color. You can set background images using background-image with a url(), control how they tile with background-repeat, position them with background-position, and scale them with background-size. The cover value for background-size is commonly used for hero sections — it scales the image to fill the entire element. For gradients, use linear-gradient() or radial-gradient() as the background-image value.",
      table: {
        headers: ["Property", "Values", "Description"],
        rows: [
          { cells: ["background-color",      "color value",                         "Sets background color"] },
          { cells: ["background-image",       "url(...)",                            "Sets background image or gradient"] },
          { cells: ["background-repeat",      "repeat, no-repeat, repeat-x, repeat-y", "How image repeats"] },
          { cells: ["background-position",    "left, right, center, top, bottom",   "Image position"] },
          { cells: ["background-size",        "cover, contain, auto, px, %",        "Image size"] },
          { cells: ["background-attachment",  "scroll, fixed",                      "Scroll behaviour"] },
        ],
      },
      codeExamples: [
        {
          label: "Background Color & Image",
          code: `.solid-bg {
  background-color: #e74c3c;
  padding: 30px;
}

.gradient-bg {
  background-image: linear-gradient(135deg, #667eea, #764ba2);
  padding: 30px;
  color: white;
}

/* Full-bleed hero image */
.hero {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}`,
        },
        {
          label: "Linear & Radial Gradients",
          code: `/* Linear gradient — direction, then colors */
background: linear-gradient(to right, red, yellow);
background: linear-gradient(135deg, #11998e, #38ef7d);
background: linear-gradient(to bottom, #5f27cd, #341f97);

/* Radial gradient — shape, then colors */
background: radial-gradient(circle, #ff6b6b, #4ecdc4);
background: radial-gradient(ellipse, #00d2ff, #3a47d5);

/* Multi-stop gradient */
background: linear-gradient(45deg, #fa709a 0%, #fee140 100%);`,
        },
      ],
    },

    // ── PART 3: TEXT & FONTS ──────────────────────────────────────
    {
      id: "font-properties",
      heading: "Font Properties",
      content:
        "Font properties control the typeface, size, and weight of text. font-family accepts a prioritised list of fonts — the browser uses the first one available, falling back to the next if not installed. Always end the list with a generic family (serif, sans-serif, monospace) as a final fallback. font-size can be set in absolute units (px) or relative units (em is relative to the parent element, rem is relative to the root html element). font-weight accepts named values (normal, bold) or numeric values from 100 to 900.",
      table: {
        headers: ["Property", "Values", "Description"],
        rows: [
          { cells: ["font-family",    "font names",            "Typeface to use"] },
          { cells: ["font-size",      "px, em, rem, %",        "Size of text"] },
          { cells: ["font-weight",    "normal, bold, 100–900", "Thickness of text"] },
          { cells: ["font-style",     "normal, italic, oblique", "Style of text"] },
          { cells: ["line-height",    "number, px, em, %",     "Space between lines"] },
          { cells: ["letter-spacing", "px, em",                "Space between letters"] },
          { cells: ["word-spacing",   "px, em",                "Space between words"] },
        ],
      },
      codeExamples: [
        {
          label: "Font Family — Fallback Stack",
          code: `/* Always provide fallbacks */
body {
  font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
}

h1 {
  font-family: Georgia, 'Times New Roman', serif;
}

code {
  font-family: 'Courier New', Courier, monospace;
}`,
        },
        {
          label: "Font Size — px vs em vs rem",
          code: `/* Absolute — always 16px regardless of context */
p { font-size: 16px; }

/* Relative to parent element's font-size */
.child { font-size: 1.5em; }  /* 1.5x the parent size */

/* Relative to root <html> font-size — more predictable */
h2 { font-size: 1.8rem; }`,
        },
        {
          label: "Font Weight & Style",
          code: `font-weight: normal;  /* Same as 400 */
font-weight: bold;    /* Same as 700 */
font-weight: 300;     /* Light */
font-weight: 900;     /* Black/Heavy */

font-style: italic;
font-style: normal;   /* Removes inherited italic */`,
        },
      ],
    },

    {
      id: "text-styling",
      heading: "Text Styling Properties",
      content:
        "Beyond font settings, CSS provides several properties to style text appearance. text-align controls horizontal alignment within its container. text-decoration adds or removes lines such as underlines (useful for removing the default underline from anchor tags with text-decoration: none). text-transform changes the visual case without altering the HTML. text-shadow creates shadow effects using x-offset, y-offset, blur radius, and color — multiple shadows can be layered with commas.",
      table: {
        headers: ["Property", "Values", "Description"],
        rows: [
          { cells: ["color",            "color value",                              "Text color"] },
          { cells: ["text-align",       "left, right, center, justify",             "Horizontal alignment"] },
          { cells: ["text-decoration",  "none, underline, overline, line-through",  "Text decoration lines"] },
          { cells: ["text-transform",   "uppercase, lowercase, capitalize",         "Text case"] },
          { cells: ["text-indent",      "px, em, %",                               "First line indent"] },
          { cells: ["text-shadow",      "x y blur color",                          "Shadow effect"] },
        ],
      },
      codeExamples: [
        {
          label: "Text Alignment",
          code: `text-align: left;     /* Default */
text-align: center;
text-align: right;
text-align: justify;  /* Spreads text to fill the full width */`,
        },
        {
          label: "Text Decoration",
          code: `text-decoration: underline;
text-decoration: overline;
text-decoration: line-through;

/* Remove underline from links */
a {
  text-decoration: none;
}`,
        },
        {
          label: "Text Transform",
          code: `text-transform: uppercase;   /* hello → HELLO */
text-transform: lowercase;   /* HELLO → hello */
text-transform: capitalize;  /* hello world → Hello World */`,
        },
        {
          label: "Text Shadow",
          code: `/* text-shadow: x-offset y-offset blur color */
h1 {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* Glow effect */
.glow {
  text-shadow: 0 0 10px #38ef7d;
  color: #11998e;
}

/* Multiple layered shadows */
.layered {
  text-shadow: 3px 3px 0 #2ecc71, 6px 6px 0 #3498db;
  color: #e74c3c;
}`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-selectors",
      label: "Selector Types",
      html: `<div style="font-family:sans-serif;font-size:0.85rem">
  <p style="color:#666;margin-bottom:12px;">Each box shows a selector type applied live:</p>

  <div style="margin-bottom:10px;padding:10px;background:#e3f2fd;border-left:4px solid #3498db;border-radius:6px">
    <code style="font-size:0.78rem;color:#1565c0;">* { box-sizing: border-box }</code>
    <p style="margin:4px 0 0;color:#555;">Universal — targets every element</p>
  </div>

  <div style="margin-bottom:10px;padding:10px;background:#e8f5e9;border-left:4px solid #2ecc71;border-radius:6px">
    <code style="font-size:0.78rem;color:#1b5e20;">p { color: green }</code>
    <p style="color:green;margin:4px 0 0;">Element selector — all &lt;p&gt; tags are green</p>
  </div>

  <div style="margin-bottom:10px;padding:10px;background:#fff9c4;border-left:4px solid #f39c12;border-radius:6px">
    <code style="font-size:0.78rem;color:#e65100;">.highlight { background: yellow }</code>
    <p style="margin:4px 0 0;">Normal text — <span style="background:yellow;padding:2px 6px;">Class selector applies here</span> — normal again</p>
  </div>

  <div style="margin-bottom:10px;padding:10px;background:#fce4ec;border-left:4px solid #e74c3c;border-radius:6px">
    <code style="font-size:0.78rem;color:#b71c1c;">#header { background: #11998e; color: white }</code>
    <div style="background:#11998e;color:white;padding:10px;border-radius:6px;margin-top:6px;text-align:center;">ID selector — unique element</div>
  </div>

  <div style="padding:10px;background:#f3e5f5;border-left:4px solid #9b59b6;border-radius:6px">
    <code style="font-size:0.78rem;color:#4a148c;">div p { color: purple }</code> vs
    <code style="font-size:0.78rem;color:#4a148c;">div > p { color: orange }</code>
    <div style="border:2px dashed #9b59b6;padding:10px;margin-top:6px;border-radius:4px">
      <p style="color:purple;margin:4px 0;">Direct child (purple — matched by both)</p>
      <div style="background:#f8f0ff;padding:6px;border-radius:4px;margin:4px 0">
        <p style="color:purple;margin:0;">Nested p (purple — descendant, not direct child)</p>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      id: "demo-colors",
      label: "Color Formats",
      html: `<div style="font-family:sans-serif">
  <p style="font-size:0.8rem;color:#666;margin-bottom:12px;">Six ways to write the same family of colors:</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
    <div style="background:red;color:white;padding:20px;border-radius:8px;text-align:center;font-size:0.8rem"><strong>red</strong><br>Color name</div>
    <div style="background:#3498db;color:white;padding:20px;border-radius:8px;text-align:center;font-size:0.8rem"><strong>#3498db</strong><br>Hex</div>
    <div style="background:rgb(46,204,113);color:white;padding:20px;border-radius:8px;text-align:center;font-size:0.8rem"><strong>rgb(46,204,113)</strong><br>RGB</div>
    <div style="background:rgba(231,76,60,0.7);color:white;padding:20px;border-radius:8px;text-align:center;font-size:0.8rem"><strong>rgba(231,76,60,0.7)</strong><br>RGBA — 70% opaque</div>
    <div style="background:hsl(280,80%,60%);color:white;padding:20px;border-radius:8px;text-align:center;font-size:0.8rem"><strong>hsl(280,80%,60%)</strong><br>HSL</div>
    <div style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:20px;border-radius:8px;text-align:center;font-size:0.8rem"><strong>linear-gradient</strong><br>Gradient</div>
  </div>
</div>`,
    },
    {
      id: "demo-gradients",
      label: "Gradients",
      html: `<div style="font-family:sans-serif">
  <p style="font-size:0.8rem;color:#666;margin-bottom:12px;">Linear and radial gradients:</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
    <div style="background:linear-gradient(to right,#ff6b6b,#feca57);padding:35px;border-radius:10px;color:white;text-align:center;font-size:0.78rem;font-weight:bold">to right</div>
    <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:35px;border-radius:10px;color:white;text-align:center;font-size:0.78rem;font-weight:bold">135deg</div>
    <div style="background:linear-gradient(to bottom,#11998e,#38ef7d);padding:35px;border-radius:10px;color:white;text-align:center;font-size:0.78rem;font-weight:bold">to bottom</div>
    <div style="background:radial-gradient(circle,#ff6b6b,#4ecdc4);padding:35px;border-radius:10px;color:white;text-align:center;font-size:0.78rem;font-weight:bold">radial circle</div>
    <div style="background:linear-gradient(45deg,#fa709a 0%,#fee140 100%);padding:35px;border-radius:10px;color:white;text-align:center;font-size:0.78rem;font-weight:bold">45deg multi</div>
    <div style="background:radial-gradient(ellipse,#00d2ff,#3a47d5);padding:35px;border-radius:10px;color:white;text-align:center;font-size:0.78rem;font-weight:bold">radial ellipse</div>
  </div>
</div>`,
    },
    {
      id: "demo-fonts",
      label: "Font Styles",
      html: `<div style="font-family:sans-serif;font-size:0.85rem">
  <div style="background:#f8f9fa;padding:14px;border-radius:8px;border-left:4px solid #3498db;margin-bottom:10px">
    <p style="font-family:Arial,sans-serif;font-size:1.1rem;margin:0"><strong>Arial, sans-serif</strong> — clean and modern</p>
  </div>
  <div style="background:#f8f9fa;padding:14px;border-radius:8px;border-left:4px solid #e74c3c;margin-bottom:10px">
    <p style="font-family:Georgia,serif;font-size:1.1rem;margin:0"><strong>Georgia, serif</strong> — elegant and readable</p>
  </div>
  <div style="background:#f8f9fa;padding:14px;border-radius:8px;border-left:4px solid #2ecc71;margin-bottom:10px">
    <p style="font-family:'Courier New',monospace;font-size:1.1rem;margin:0"><strong>Courier New, monospace</strong> — code & terminals</p>
  </div>
  <div style="background:#f8f9fa;padding:14px;border-radius:8px;border-left:4px solid #9b59b6;margin-bottom:10px">
    <p style="font-size:12px;margin:3px 0">12px — Small</p>
    <p style="font-size:16px;margin:3px 0">16px — Normal</p>
    <p style="font-size:22px;margin:3px 0">22px — Large</p>
    <p style="font-size:30px;margin:3px 0">30px — XLarge</p>
  </div>
  <div style="background:#f8f9fa;padding:14px;border-radius:8px;border-left:4px solid #f39c12">
    <p style="font-weight:300;margin:3px 0">300 — Light</p>
    <p style="font-weight:400;margin:3px 0">400 — Normal</p>
    <p style="font-weight:700;margin:3px 0">700 — Bold</p>
    <p style="font-weight:900;margin:3px 0">900 — Black</p>
  </div>
</div>`,
    },
    {
      id: "demo-text",
      label: "Text Effects",
      html: `<div style="font-family:sans-serif;font-size:0.85rem">
  <p style="font-weight:bold;color:#11998e;margin-bottom:8px;">Text Alignment:</p>
  <p style="text-align:left;background:#f8f9fa;padding:8px;margin:4px 0;border-radius:4px">Left aligned text</p>
  <p style="text-align:center;background:#f8f9fa;padding:8px;margin:4px 0;border-radius:4px">Center aligned text</p>
  <p style="text-align:right;background:#f8f9fa;padding:8px;margin:4px 0;border-radius:4px">Right aligned text</p>

  <p style="font-weight:bold;color:#11998e;margin:14px 0 8px;">Text Decoration:</p>
  <p style="text-decoration:underline;margin:4px 0">Underlined text</p>
  <p style="text-decoration:overline;margin:4px 0">Overlined text</p>
  <p style="text-decoration:line-through;margin:4px 0">Line-through text</p>

  <p style="font-weight:bold;color:#11998e;margin:14px 0 8px;">Text Transform:</p>
  <p style="text-transform:uppercase;margin:4px 0">uppercase example</p>
  <p style="text-transform:lowercase;margin:4px 0">LOWERCASE EXAMPLE</p>
  <p style="text-transform:capitalize;margin:4px 0">capitalize each word</p>

  <p style="font-weight:bold;color:#11998e;margin:14px 0 8px;">Text Shadow:</p>
  <h3 style="text-shadow:2px 2px 4px rgba(0,0,0,0.3);color:#11998e;margin:6px 0">Basic shadow</h3>
  <h3 style="text-shadow:0 0 10px #38ef7d;color:#11998e;margin:6px 0">Glow effect</h3>
  <h3 style="text-shadow:3px 3px 0 #2ecc71,6px 6px 0 #3498db;color:#e74c3c;margin:6px 0">Layered shadows</h3>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Selector Practice",
      description: "Build a page that demonstrates all seven selector types:",
      tasks: [
        "Create an HTML page with a mix of h1–h3 headings, paragraphs, divs, and spans",
        "Use the Universal selector to apply box-sizing: border-box to all elements",
        "Use the Element selector to give all <p> tags a line-height of 1.6",
        "Create a class .card and apply it to three div elements with a border and padding",
        "Create a unique id #hero on one section and give it a gradient background",
        "Use a Descendant selector (nav a) to style links inside a nav element only",
        "Use a Grouping selector to give h1, h2, and h3 the same color and font-family",
      ],
      hint: "Open browser DevTools and hover elements to see which rules are applying and their specificity.",
    },
    {
      title: "Exercise 2: Color Palette Page",
      description: "Create a visual color reference page using all six color formats:",
      tasks: [
        "Create six colored boxes side by side in a grid",
        "Color box 1 using a color name, box 2 using hex, box 3 using RGB",
        "Color box 4 using RGBA at 70% opacity, box 5 using HSL, box 6 using a linear-gradient",
        "Display the color value as text inside each box",
        "Add a hero banner using a radial-gradient background",
        "Add a semi-transparent overlay using rgba(0,0,0,0.4) on top of an image or color",
      ],
      hint: "Use display: grid with grid-template-columns: repeat(3, 1fr) to lay out the six boxes.",
    },
    {
      title: "Exercise 3: Typography Card",
      description: "Design a readable article card using font and text properties:",
      tasks: [
        "Set font-family to a sans-serif stack on the body",
        "Give the article title font-size: 2rem, font-weight: 700, and text-transform: uppercase",
        "Set the body text to font-size: 1rem and line-height: 1.8 for readability",
        "Style the article meta line (author, date) with font-style: italic and a lighter color",
        "Add a text-shadow to the title for depth",
        "Remove text-decoration from any links inside the card and style them with a custom color",
      ],
    },
    {
      title: "Challenge: Style a Full Landing Page",
      description: "Combine selectors, colors, and typography into a complete mini-page:",
      tasks: [
        "Create a page with a header nav, a hero section, a 3-card features section, and a footer",
        "Use class selectors for all repeatable components (.card, .btn, .nav-link)",
        "Use a linear-gradient for the hero background and an rgba overlay for text legibility",
        "Apply consistent typography: one font stack for headings, another for body text",
        "Style the nav links with text-decoration: none and a hover color change",
        "Ensure the footer text uses text-align: center and a reduced opacity color",
      ],
      hint: "Write your CSS from top to bottom: reset → typography → layout → components → utilities. This keeps specificity low and styles easy to override.",
    },
  ],
};

export default session9;