// data/courses/webtechnologies/css/session10.ts
import type { SessionData } from "@/types/session";

const session8: SessionData = {
  meta: {
    sessionNumber: 8,
    module: "css",
    moduleNumber: 2,
    title: "CSS Box Model",
    subtitle: "Understanding how every HTML element is a rectangular box — content, padding, border, and margin",
    duration: "1 hr",
    color: "#11998e",
    colorDim: "rgba(17,153,142,0.09)",
    colorMid: "rgba(17,153,142,0.18)",
    objectives: [
      "Explain what the CSS Box Model is and why it matters",
      "Identify the four layers: Content, Padding, Border, and Margin",
      "Control element size using width, height, min/max constraints",
      "Apply padding to create space inside elements",
      "Style borders with different widths, styles, colors, and radius",
      "Use margin to space elements apart and center them with margin: 0 auto",
      "Understand the difference between content-box and border-box sizing",
      "Avoid common box model mistakes like margin collapse",
    ],
    prevSession: { num: 7, title: "Colors & Fonts", href: "/courses/webtechnologies/css/session9" },
    nextSession: { num: 9, title: "Display & Positioning", href: "/courses/webtechnologies/css/session11" },
  },

  topics: [
    {
      id: "what-is-box-model",
      heading: "What is the Box Model?",
      content:
        "Every HTML element is treated as a rectangular box. The CSS Box Model describes how these boxes are structured and how their dimensions are calculated. Understanding the box model is crucial for controlling layout and spacing. The box model consists of four areas that wrap around each other: Content at the center, surrounded by Padding, then Border, and finally Margin on the outside. Each area can be controlled independently to create the perfect spacing for your elements.",
      tip: "Think of a framed painting: the painting itself is the Content, the mat board is Padding, the frame is the Border, and the wall space around it is the Margin.",
      table: {
        headers: ["Layer", "Purpose", "Background Visible?"],
        rows: [
          { cells: ["Content", "The actual content (text, images)", "✅ Yes"] },
          { cells: ["Padding", "Space inside the element, around content", "✅ Yes"] },
          { cells: ["Border", "Line around the padding and content", "Has its own color"] },
          { cells: ["Margin", "Space outside the element, separates from others", "❌ Transparent"] },
        ],
      },
    },

    {
      id: "content-width-height",
      heading: "Content — Width & Height",
      content:
        "The content area is where text and images appear. You control its size using width and height properties. These can be set in absolute units like px, relative units like % or em, or left as auto so the browser calculates the size. You can also constrain sizes using min-width, max-width, min-height, and max-height — these are especially useful for responsive design where elements must adapt to different screen sizes.",
      table: {
        headers: ["Property", "Values", "Description"],
        rows: [
          { cells: ["width",      "px, %, em, auto", "Sets element width"] },
          { cells: ["height",     "px, %, em, auto", "Sets element height"] },
          { cells: ["max-width",  "px, %, em",       "Maximum width constraint"] },
          { cells: ["min-width",  "px, %, em",       "Minimum width constraint"] },
          { cells: ["max-height", "px, %, em",       "Maximum height constraint"] },
          { cells: ["min-height", "px, %, em",       "Minimum height constraint"] },
        ],
      },
      codeExamples: [
        {
          label: "Width & Height Examples",
          code: `.box-fixed {
  width: 200px;
  height: 100px;
  background: #3498db;
}

.box-percent {
  width: 50%;
  height: 150px;
  background: #e74c3c;
}

/* Responsive container — never too narrow or too wide */
.container {
  width: 90%;
  max-width: 1200px;
  min-width: 320px;
  margin: 0 auto;
}`,
        },
      ],
    },

    {
      id: "padding",
      heading: "Padding — Inner Spacing",
      content:
        "Padding creates space between the content and the border. Crucially, the element's background color extends into the padding area, so padding visually expands the colored region of an element. You can set padding on all four sides at once using the shorthand padding property, or target individual sides with padding-top, padding-right, padding-bottom, and padding-left. The shorthand follows a clockwise order: Top → Right → Bottom → Left.",
      definitions: [
        {
          term: "padding: 20px",
          description: "All four sides get 20px of padding.",
        },
        {
          term: "padding: 10px 20px",
          description: "10px top & bottom (vertical), 20px left & right (horizontal).",
        },
        {
          term: "padding: 10px 20px 15px",
          description: "10px top, 20px left & right, 15px bottom.",
        },
        {
          term: "padding: 10px 15px 20px 25px",
          description: "Top, Right, Bottom, Left — fully independent (clockwise).",
        },
      ],
      codeExamples: [
        {
          label: "Padding Shorthand Syntax",
          code: `/* All sides the same */
padding: 20px;

/* Vertical | Horizontal */
padding: 10px 20px;

/* Top | Horizontal | Bottom */
padding: 10px 20px 15px;

/* Top | Right | Bottom | Left (clockwise) */
padding: 10px 15px 20px 25px;

/* Individual sides */
padding-top: 10px;
padding-right: 15px;
padding-bottom: 20px;
padding-left: 25px;`,
        },
      ],
      table: {
        headers: ["Property", "Description", "Example"],
        rows: [
          { cells: ["padding",        "All sides at once (shorthand)", "padding: 20px;"] },
          { cells: ["padding-top",    "Top padding only",              "padding-top: 10px;"] },
          { cells: ["padding-right",  "Right padding only",            "padding-right: 15px;"] },
          { cells: ["padding-bottom", "Bottom padding only",           "padding-bottom: 10px;"] },
          { cells: ["padding-left",   "Left padding only",             "padding-left: 15px;"] },
        ],
      },
    },

    {
      id: "border",
      heading: "Border — The Frame",
      content:
        "Borders go around the padding and content. You can style three aspects independently — width (thickness), style (the line pattern), and color — or combine all three in the shorthand border property. The border-radius property rounds the corners of the border, and setting it to 50% on a square element creates a perfect circle.",
      table: {
        headers: ["Property", "Values", "Example"],
        rows: [
          { cells: ["border-width",  "thin, medium, thick, px",                                          "border-width: 2px;"] },
          { cells: ["border-style",  "solid, dashed, dotted, double, groove, ridge, inset, outset",      "border-style: solid;"] },
          { cells: ["border-color",  "color value",                                                       "border-color: red;"] },
          { cells: ["border",        "width style color (shorthand)",                                     "border: 2px solid red;"] },
          { cells: ["border-radius", "px, %",                                                             "border-radius: 10px;"] },
        ],
      },
      codeExamples: [
        {
          label: "Border Shorthand & Radius",
          code: `/* Shorthand: width style color */
border: 2px solid #3498db;
border: 4px dashed #e74c3c;
border: 3px dotted #2ecc71;

/* Rounded corners */
border-radius: 10px;        /* All corners */
border-radius: 50%;         /* Circle (on a square element) */
border-radius: 10px 20px;   /* Top-left/bottom-right | Top-right/bottom-left */

/* Individual sides */
border-top:    3px solid red;
border-right:  3px dashed blue;
border-bottom: 3px dotted green;
border-left:   3px double orange;`,
        },
      ],
    },

    {
      id: "margin",
      heading: "Margin — Outer Spacing",
      content:
        "Margins create space outside the border, separating elements from each other. Unlike padding, margins are always transparent — they never show the element's background color. The shorthand syntax is identical to padding. A special value, margin: 0 auto, is the classic way to horizontally center a block element — it tells the browser to distribute any available horizontal space equally on both sides.",
      tip: "Use padding for space inside an element (it shows the background) and margin for space between elements (always transparent).",
      table: {
        headers: ["Property", "Description", "Example"],
        rows: [
          { cells: ["margin",        "All sides at once (shorthand)", "margin: 20px;"] },
          { cells: ["margin-top",    "Top margin only",               "margin-top: 10px;"] },
          { cells: ["margin-right",  "Right margin only",             "margin-right: 15px;"] },
          { cells: ["margin-bottom", "Bottom margin only",            "margin-bottom: 10px;"] },
          { cells: ["margin-left",   "Left margin only",              "margin-left: 15px;"] },
        ],
      },
      codeExamples: [
        {
          label: "Margin Syntax & Auto Centering",
          code: `/* All sides */
margin: 20px;

/* Vertical | Horizontal */
margin: 10px 20px;

/* Top | Right | Bottom | Left */
margin: 10px 15px 20px 25px;

/* Center a block element horizontally */
.centered {
  width: 300px;
  margin: 0 auto;
}

/* Only bottom spacing between stacked elements */
.section {
  margin-bottom: 30px;
}`,
        },
      ],
    },

    {
      id: "box-sizing",
      heading: "box-sizing Property",
      content:
        "By default, when you set width: 200px on an element, that 200px only applies to the content area. Padding and border are added on top, making the element larger than expected. The box-sizing property changes this behaviour. Setting it to border-box makes the width include padding and border, so the element stays exactly the size you specified. Most developers apply this globally with the universal selector so every element behaves predictably.",
      tip: "Always add `* { box-sizing: border-box; }` at the top of your stylesheet. It makes sizing intuitive and avoids many layout bugs.",
      table: {
        headers: ["Value", "Description", "Calculation"],
        rows: [
          { cells: ["content-box", "Default — width/height applies to content only",  "Total = width + padding + border"] },
          { cells: ["border-box",  "width/height includes padding and border",         "Total = width (padding & border included)"] },
        ],
      },
      codeExamples: [
        {
          label: "content-box vs border-box",
          code: `/* content-box (default) — element ends up LARGER than 200px */
.box1 {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  box-sizing: content-box;
  /* Total width: 200 + 40 (padding) + 10 (border) = 250px */
}

/* border-box (recommended) — element stays exactly 200px */
.box2 {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  box-sizing: border-box;
  /* Total width: 200px — padding and border are included */
}

/* Apply globally — best practice */
* {
  box-sizing: border-box;
}`,
        },
        {
          label: "Box Model Calculation Example",
          code: `/* Given this element... */
.element {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 15px;
}

/* With content-box (default):
   Width  = 300 + (20×2 padding) + (5×2 border) = 350px
   Height = 200 + (20×2 padding) + (5×2 border) = 250px
   Margin: 15px on each side (space, not added to size)

   With border-box:
   Width  = 300px  ← what you set is what you get
   Height = 200px  ← much easier! */`,
        },
      ],
    },

    {
      id: "common-use-cases",
      heading: "Common Use Cases",
      content:
        "The box model properties combine to create virtually every UI pattern. Cards use padding for internal breathing room, a subtle border for definition, and margin to separate from neighbouring cards. Buttons use padding to size the clickable area, border for an outline style, and border-radius to round the shape. List items use padding for tap targets, margin-bottom to space them apart, and border-left as a colour accent.",
      codeExamples: [
        {
          label: "Card Component",
          code: `.card {
  width: 300px;
  padding: 25px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  box-sizing: border-box;
}`,
        },
        {
          label: "Button with Hover",
          code: `.button {
  padding: 12px 30px;
  border: 2px solid #3498db;
  border-radius: 25px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.button:hover {
  background: white;
  color: #3498db;
}`,
        },
        {
          label: "Spaced List Items",
          code: `.list-item {
  padding: 15px;
  margin-bottom: 10px;
  border-left: 4px solid #11998e;
  background: #f8f9fa;
}`,
        },
      ],
    },

    {
      id: "common-mistakes",
      heading: "Common Mistakes & Best Practices",
      content:
        "Several box model pitfalls trip up beginners. The most common is forgetting box-sizing: border-box, causing elements to overflow their containers. Margin collapse is another surprise: when two vertically adjacent elements both have margins, they do not add together — only the larger value applies. Negative margins are valid but should be used sparingly. Finally, margin: auto only works for horizontal centering on block-level elements; it has no effect on inline elements.",
      warning: "Vertical margin collapse: if two stacked elements have top/bottom margins of 20px and 30px, the gap between them is 30px — not 50px. Only the larger margin applies.",
      codeExamples: [
        {
          label: "Best Practice — Global Reset",
          code: `/* Always start your stylesheet with this */
* {
  box-sizing: border-box;
}

/* Consistent spacing rules */
/* Use padding for space INSIDE elements */
.card { padding: 20px; }

/* Use margin for space BETWEEN elements */
.card + .card { margin-top: 20px; }

/* Center block elements horizontally */
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-layers",
      label: "Box Model Layers",
      html: `<div style="font-family:sans-serif;padding:10px">
  <p style="font-size:0.8rem;color:#666;margin-bottom:12px;">Each layer wraps the one inside it — hover to see labels.</p>
  <div style="border:3px dashed #e74c3c;background:rgba(231,76,60,0.07);padding:20px;border-radius:10px;text-align:center">
    <span style="color:#e74c3c;font-weight:700;font-size:0.8rem;">MARGIN — transparent, separates elements</span>
    <div style="border:3px dashed #f39c12;background:rgba(243,156,18,0.1);padding:20px;margin:12px 0;border-radius:8px">
      <span style="color:#f39c12;font-weight:700;font-size:0.8rem;">BORDER — the visible frame</span>
      <div style="border:3px dashed #2ecc71;background:rgba(46,204,113,0.1);padding:20px;margin:12px 0;border-radius:6px">
        <span style="color:#2ecc71;font-weight:700;font-size:0.8rem;">PADDING — inner space (shows background)</span>
        <div style="background:rgba(52,152,219,0.25);border:2px solid #3498db;padding:18px;margin:12px 0;border-radius:4px;color:#1a6a9a;font-weight:700;font-size:0.85rem;">
          CONTENT — text, images, etc.
        </div>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      id: "demo-margin",
      label: "Margin Demo",
      html: `<div style="font-family:sans-serif;background:#ecf0f1;padding:20px;border-radius:10px">
  <p style="font-weight:bold;margin-bottom:12px;font-size:0.85rem;">Different margin values:</p>
  <div style="background:#3498db;color:white;padding:16px;margin:0;border-radius:8px;text-align:center;font-size:0.85rem;">margin: 0 — no spacing</div>
  <div style="background:#e74c3c;color:white;padding:16px;margin:20px 0;border-radius:8px;text-align:center;font-size:0.85rem;">margin: 20px 0 — 20px top & bottom</div>
  <div style="background:#2ecc71;color:white;padding:16px;margin:30px;border-radius:8px;text-align:center;font-size:0.85rem;">margin: 30px — all sides</div>
  <div style="width:60%;background:#f39c12;color:white;padding:16px;margin:20px auto;border-radius:8px;text-align:center;font-size:0.85rem;">margin: 0 auto — centered!</div>
</div>`,
    },
    {
      id: "demo-padding",
      label: "Padding Demo",
      html: `<div style="font-family:sans-serif">
  <p style="font-size:0.8rem;color:#666;margin-bottom:12px;">Notice how padding expands the blue area — background fills the padding zone.</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px">
    <div style="background:#3498db;color:white;padding:0;border:3px solid #2980b9;border-radius:8px;overflow:hidden">
      <div style="background:rgba(255,255,255,0.25);padding:10px;font-size:0.8rem;">padding: 0</div>
    </div>
    <div style="background:#3498db;color:white;padding:20px;border:3px solid #2980b9;border-radius:8px">
      <div style="background:rgba(255,255,255,0.25);padding:5px;font-size:0.8rem;">padding: 20px</div>
    </div>
    <div style="background:#3498db;color:white;padding:10px 30px;border:3px solid #2980b9;border-radius:8px">
      <div style="background:rgba(255,255,255,0.25);padding:5px;font-size:0.8rem;">padding: 10px 30px</div>
    </div>
  </div>
  <p style="margin-top:14px;color:#666;font-size:0.78rem;text-align:center;">The blue area IS the padding — background extends into it!</p>
</div>`,
    },
    {
      id: "demo-border",
      label: "Border Styles",
      html: `<div style="font-family:sans-serif">
  <p style="font-size:0.8rem;color:#666;margin-bottom:12px;">Six border styles and four border-radius values:</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px">
    <div style="padding:16px;border:4px solid #3498db;text-align:center;font-size:0.8rem;"><strong>solid</strong></div>
    <div style="padding:16px;border:4px dashed #e74c3c;text-align:center;font-size:0.8rem;"><strong>dashed</strong></div>
    <div style="padding:16px;border:4px dotted #2ecc71;text-align:center;font-size:0.8rem;"><strong>dotted</strong></div>
    <div style="padding:16px;border:5px double #f39c12;text-align:center;font-size:0.8rem;"><strong>double</strong></div>
    <div style="padding:16px;border:4px groove #9b59b6;text-align:center;font-size:0.8rem;"><strong>groove</strong></div>
    <div style="padding:16px;border:4px ridge #1abc9c;text-align:center;font-size:0.8rem;"><strong>ridge</strong></div>
  </div>
  <p style="font-size:0.78rem;color:#666;margin-bottom:8px;">border-radius:</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
    <div style="padding:20px;background:#e3f2fd;border:3px solid #3498db;border-radius:0;text-align:center;font-size:0.75rem;">0px</div>
    <div style="padding:20px;background:#ffebee;border:3px solid #e74c3c;border-radius:10px;text-align:center;font-size:0.75rem;">10px</div>
    <div style="padding:20px;background:#e8f5e9;border:3px solid #2ecc71;border-radius:25px;text-align:center;font-size:0.75rem;">25px</div>
    <div style="width:80px;height:80px;background:#fff3e0;border:3px solid #f39c12;border-radius:50%;text-align:center;display:flex;align-items:center;justify-content:center;margin:0 auto;font-size:0.75rem;">50%</div>
  </div>
</div>`,
    },
    {
      id: "demo-box-sizing",
      label: "box-sizing",
      html: `<div style="font-family:sans-serif">
  <p style="font-size:0.8rem;color:#666;margin-bottom:16px;">Both boxes have <strong>width: 200px</strong> — but the default content-box grows larger!</p>
  <div style="margin-bottom:20px">
    <p style="font-weight:bold;font-size:0.82rem;margin-bottom:8px;color:#c0392b;">content-box (default):</p>
    <div style="width:200px;padding:20px;border:5px solid #3498db;background:#e3f2fd;box-sizing:content-box;font-size:0.8rem;">
      width: 200px<br>padding: 20px<br>border: 5px<br><strong style="color:#c0392b;">Actual total: 250px ⚠️</strong>
    </div>
  </div>
  <div>
    <p style="font-weight:bold;font-size:0.82rem;margin-bottom:8px;color:#27ae60;">border-box (recommended):</p>
    <div style="width:200px;padding:20px;border:5px solid #e74c3c;background:#ffebee;box-sizing:border-box;font-size:0.8rem;">
      width: 200px<br>padding: 20px<br>border: 5px<br><strong style="color:#27ae60;">Actual total: 200px ✅</strong>
    </div>
  </div>
</div>`,
    },
    {
      id: "demo-complete",
      label: "Complete Box",
      html: `<div style="font-family:sans-serif">
  <p style="font-size:0.8rem;color:#666;margin-bottom:12px;">A single element showing all four layers at once:</p>
  <div style="background:#ecf0f1;padding:40px;border-radius:10px;">
    <div style="margin:30px;border:5px solid #e74c3c;padding:30px;background:#3498db;color:white;border-radius:15px;text-align:center">
      <h4 style="margin-bottom:12px;color:white;font-size:0.95rem;">Content Area</h4>
      <div style="background:rgba(255,255,255,0.2);padding:12px;border-radius:8px;font-size:0.8rem;">Text & images live here</div>
      <div style="margin-top:16px;font-size:0.8rem;line-height:2;">
        🟢 <strong>Padding:</strong> 30px — the blue space<br>
        🔴 <strong>Border:</strong> 5px solid red — the red frame<br>
        ⚪ <strong>Margin:</strong> 30px — the gray space outside
      </div>
    </div>
  </div>
  <p style="text-align:center;font-size:0.78rem;color:#666;margin-top:8px;">Gray = margin · Red frame = border · Blue = padding · White box = content</p>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Recreate the Box Model",
      description: "Build the nested box model diagram from scratch using pure CSS:",
      tasks: [
        "Create an HTML file with four nested divs: .margin-box, .border-box, .padding-box, .content-box",
        "Style .margin-box with a dashed red border and light red background",
        "Style .border-box with a dashed orange border and light orange background",
        "Style .padding-box with a dashed green border and light green background",
        "Style .content-box with a solid blue border and light blue background",
        "Add a text label inside each div describing its layer",
      ],
      hint: "Use border-style: dashed and background with low opacity (rgba) so the layers are visually distinct.",
    },
    {
      title: "Exercise 2: Build a Profile Card",
      description: "Use all four box model layers to design a polished card component:",
      tasks: [
        "Create a .card div with width: 280px, padding: 24px, and margin: 20px auto",
        "Add a border: 1px solid #ddd and border-radius: 12px",
        "Add box-shadow: 0 4px 12px rgba(0,0,0,0.1) for depth",
        "Inside the card add an avatar (div with 60×60px, border-radius: 50%), a name heading, and a short bio paragraph",
        "Ensure * { box-sizing: border-box } is set so sizing is predictable",
      ],
      hint: "Use margin: 0 auto on the card to centre it. Give the avatar div a background color instead of an image.",
    },
    {
      title: "Exercise 3: Spacing a Navigation Bar",
      description: "Use padding and margin to build a horizontal navigation bar:",
      tasks: [
        "Create a <nav> with five <a> links inside",
        "Style each link with padding: 10px 20px so it has a comfortable click area",
        "Add margin: 0 4px between links for spacing",
        "Give the active link a different background color using a class .active",
        "Add border-radius: 6px to each link",
        "Observe how changing padding vs margin affects the layout differently",
      ],
      hint: "Set display: inline-block on the <a> tags so padding applies correctly to inline elements.",
    },
    {
      title: "Challenge: box-sizing Comparison",
      description: "Demonstrate the practical difference between content-box and border-box:",
      tasks: [
        "Create two side-by-side containers, each with width: 300px",
        "Give both padding: 30px and border: 5px solid black",
        "Apply box-sizing: content-box to the first and box-sizing: border-box to the second",
        "Add a label inside each showing the expected vs actual rendered width",
        "Use your browser's DevTools (inspect element) to confirm the actual sizes",
        "Write a comment in your CSS explaining which you would use in a real project and why",
      ],
    },
  ],
};

export default session8;