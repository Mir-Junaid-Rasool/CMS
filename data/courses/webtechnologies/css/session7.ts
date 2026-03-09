// data/courses/web-technologies/css/session7.ts
import type { SessionData } from "@/types/session";

const session7: SessionData = {
  meta: {
    sessionNumber: 7,
    module: "css",
    moduleNumber: 2,
    title: "Introduction to CSS",
    subtitle: "What CSS is, syntax rules, and three ways to apply styles to HTML",
    duration: "1 hr",
    color: "#11998e",
    colorDim: "rgba(17,153,142,0.09)",
    colorMid: "rgba(17,153,142,0.18)",
    objectives: [
      "Understand what CSS is and why it is used",
      "Explain how CSS separates content from presentation",
      "Write a valid CSS rule using selector, property, and value",
      "Apply CSS using inline, internal, and external methods",
      "Identify the pros and cons of each CSS application method",
      "Know the eight CSS topics that make up Module 2",
    ],
    prevSession: { num: 6, title: "Forms, Inputs & Frames", href: "/courses/webtechnologies/html/session6" },
    nextSession: { num: 8, title: "CSS Selectors", href: "/courses/webtechnologies/css/session8" },
  },

  topics: [
    {
      id: "what-is-css",
      heading: "What is CSS?",
      content:
        "CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML. While HTML provides structure and content, CSS makes it beautiful. CSS handles three main concerns: Styling (colors, fonts, spacing, and visual appearance), Layout (positioning and arranging elements on the page), and Responsive design (making websites work on all devices and screen sizes). The web development trio is HTML for structure (the skeleton and content), CSS for presentation (styling and visual design), and JavaScript for behavior (interactivity and functionality). The key concept is that CSS separates content from presentation — you can change the entire look of a website without touching the HTML structure.",
      codeExamples: [
        {
          label: "CSS in Context — The Web Trio",
          code: `<!-- HTML: Structure -->
<h1>Welcome</h1>
<p>This is my webpage.</p>
<a href="#">Click here</a>

<!-- CSS: Presentation (in a .css file or <style> block) -->
h1 {
  color: #11998e;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
p {
  font-size: 1.1em;
  line-height: 1.6;
}
a {
  display: inline-block;
  background: #11998e;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
}

<!-- JavaScript: Behavior (Module 4) -->
<script>
  document.querySelector('a').addEventListener('click', () => {
    alert('You clicked!');
  });
</script>`,
        },
      ],
    },

    {
      id: "css-syntax",
      heading: "CSS Syntax",
      content:
        "CSS consists of rules that tell browsers how to display HTML elements. Every CSS rule has three parts: a selector that targets which HTML elements to style, a property that defines what aspect to style (color, size, spacing, etc.), and a value that specifies the exact styling to apply. A property and its value together form a declaration. All declarations for a selector are grouped inside a declaration block enclosed in curly braces { }. Each declaration ends with a semicolon.",
      codeExamples: [
        {
          label: "CSS Rule Structure",
          code: `/* Basic structure */
selector {
    property: value;
    property: value;
}

/* Real example */
h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}

/* Multiple selectors */
h1, h2, h3 {
    font-family: 'Segoe UI', sans-serif;
    color: #11998e;
}

/* Comment syntax */
/* This is a CSS comment — ignored by the browser */`,
        },
      ],
    },

    {
      id: "ways-to-apply-css",
      heading: "Three Ways to Apply CSS",
      content:
        "There are three methods to apply CSS to an HTML document. Inline CSS uses the style attribute directly on an HTML element — it has the highest priority but is hard to maintain and has no reusability. Internal CSS places styles in a <style> tag inside the <head> — good for single-page projects but cannot be reused across multiple pages. External CSS links a separate .css file using a <link> tag in the <head> — this is the best practice as it provides a clean separation of concerns, is reusable across all pages of a site, and the file can be cached by the browser for faster loading.",
      table: {
        headers: ["Method", "Where Written", "Pros", "Cons"],
        rows: [
          {
            cells: [
              "Inline",
              "style attribute on the element",
              "Quick for one-off overrides; highest priority",
              "Hard to maintain; mixes HTML and CSS; no reusability",
            ],
          },
          {
            cells: [
              "Internal",
              "<style> tag inside <head>",
              "Styles scoped to one page; good for single-page sites",
              "Increases page size; cannot be reused across pages",
            ],
          },
          {
            cells: [
              "External",
              "Separate .css file linked with <link>",
              "Clean separation; reusable; cacheable; easiest to maintain",
              "Requires an extra HTTP request (minimal impact)",
            ],
          },
        ],
      },
      tip: "Always prefer External CSS for real projects. Reserve Internal CSS for quick single-page experiments and Inline CSS only for dynamic styles applied via JavaScript or to override a very specific element.",
      codeExamples: [
        {
          label: "1. Inline CSS",
          code: `<!-- Style applied directly on the element -->
<p style="color: red; font-size: 18px;">This is inline CSS</p>

<h1 style="color: #11998e; text-align: center; font-size: 2em;">
  Styled heading
</h1>`,
        },
        {
          label: "2. Internal CSS",
          code: `<!DOCTYPE html>
<html>
<head>
  <style>
    p {
      color: green;
      font-size: 16px;
    }
    h1 {
      color: #11998e;
      border-bottom: 3px solid #11998e;
    }
  </style>
</head>
<body>
  <h1>Internal CSS Example</h1>
  <p>This paragraph is styled via the internal style block.</p>
</body>
</html>`,
        },
        {
          label: "3. External CSS (Best Practice)",
          code: `<!-- In your HTML file -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>External CSS Example</h1>
  <p>Styled by the linked stylesheet.</p>
</body>
</html>

/* In styles.css */
p {
  color: purple;
  font-size: 18px;
  line-height: 1.6;
}
h1 {
  color: #11998e;
  font-size: 2em;
}`,
        },
      ],
    },

    {
      id: "module2-overview",
      heading: "Module 2: CSS Topics Overview",
      content:
        "Module 2 covers eight CSS topics in a recommended learning order. Start with Selectors to learn how to target elements, then Colors & Backgrounds to add visual appeal. Next comes Text & Fonts for typography, followed by the Box Model to understand spacing and dimensions. Display & Positioning covers layout control, then Flexbox for building flexible layouts. Finally, Lists & Tables covers styling specific elements, and Cursor Effects adds interactivity cues.",
      table: {
        headers: ["#", "Topic", "Key Concepts"],
        rows: [
          { cells: ["1", "Selectors",           "Element, Class, ID, Universal, Attribute selectors"] },
          { cells: ["2", "Colors & Backgrounds", "Color values, background properties, gradients"] },
          { cells: ["3", "Text & Fonts",         "Font properties, text styling, web fonts"] },
          { cells: ["4", "Box Model",            "Margin, padding, border, content dimensions"] },
          { cells: ["5", "Display & Positioning","Display types, position values, z-index"] },
          { cells: ["6", "Flexbox",              "Flexible layouts, alignment, distribution"] },
          { cells: ["7", "Lists & Tables",       "Styling list and table elements"] },
          { cells: ["8", "Cursor Effects",       "Cursor types and custom cursors"] },
        ],
      },
    },
  ],

  demos: [
    {
      id: "demo1",
      label: "Without CSS",
      html: `<div style="background:white;padding:20px;font-family:serif">
  <h1 style="all:initial;font-size:2em;font-weight:bold;display:block">Welcome</h1>
  <p style="all:initial;display:block;margin:10px 0">This is plain HTML with no styling. It's functional but boring!</p>
  <a href="#" style="all:initial;color:blue;text-decoration:underline;cursor:pointer">Click here</a>
</div>`,
    },
    {
      id: "demo2",
      label: "With CSS",
      html: `<div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:30px;border-radius:15px;color:white;box-shadow:0 10px 30px rgba(0,0,0,0.2);font-family:'Segoe UI',sans-serif">
  <h1 style="font-size:2.5em;margin-bottom:15px;text-shadow:2px 2px 4px rgba(0,0,0,0.3)">Welcome</h1>
  <p style="font-size:1.1em;line-height:1.6;margin-bottom:15px">This is HTML styled with CSS. Much more attractive and engaging!</p>
  <a href="#" style="display:inline-block;background:white;color:#667eea;padding:10px 20px;border-radius:25px;text-decoration:none;font-weight:bold">Click here</a>
</div>`,
    },
    {
      id: "demo3",
      label: "CSS Syntax Live",
      html: `<div style="font-family:sans-serif;padding:10px">
  <div style="background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:8px;font-family:'Courier New',monospace;font-size:0.9rem;margin-bottom:16px">
    <span style="color:#d7ba7d">h1</span> {<br>
    &nbsp;&nbsp;<span style="color:#9cdcfe">color</span>: <span style="color:#ce9178">blue</span>;<br>
    &nbsp;&nbsp;<span style="color:#9cdcfe">font-size</span>: <span style="color:#ce9178">24px</span>;<br>
    &nbsp;&nbsp;<span style="color:#9cdcfe">text-align</span>: <span style="color:#ce9178">center</span>;<br>
    }
  </div>
  <h1 style="color:blue;font-size:24px;text-align:center;font-family:sans-serif">This heading is styled with CSS!</h1>
</div>`,
    },
    {
      id: "demo4",
      label: "Inline vs External",
      html: `<div style="font-family:sans-serif;font-size:0.85rem">
  <p style="font-weight:bold;margin-bottom:8px;color:#c62828">Inline CSS:</p>
  <p style="color:red;font-size:18px;margin-bottom:16px">This paragraph uses inline style="color:red"</p>
  <p style="font-weight:bold;margin-bottom:8px;color:#2e7d32">Internal / External CSS (simulated):</p>
  <style>.demo-ext-p { color: purple; font-size: 18px; line-height: 1.5; }</style>
  <p class="demo-ext-p">This paragraph is styled by a CSS rule targeting its class — reusable on any element.</p>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Your First CSS Rule",
      description: "Practice writing basic CSS rules:",
      tasks: [
        "Create an HTML file with an h1, a p, and an a element",
        "Using internal CSS, set the h1 color to #11998e and font-size to 2em",
        "Style the p with a comfortable line-height (1.6) and font-size of 1.1em",
        "Style the a tag to look like a button with background color, padding, and border-radius",
        "View the result in a browser and compare with unstyled HTML",
      ],
    },
    {
      title: "Exercise 2: Three Methods Comparison",
      description: "Apply the same styles using all three methods:",
      tasks: [
        "Create three identical HTML pages each with an h1 and two paragraphs",
        "On page 1, style the h1 using inline CSS",
        "On page 2, style the h1 using internal CSS in a <style> block",
        "On page 3, create a styles.css file and link it with <link> to style the h1",
        "Note the differences in code cleanliness and maintenance effort",
      ],
    },
    {
      title: "Challenge: Style a Complete Page",
      description: "Apply CSS to a full HTML page:",
      tasks: [
        "Take your completed HTML form from Session 6",
        "Create an external stylesheet called form-styles.css",
        "Style the body with a background color and a web-safe font",
        "Style all labels as bold with a consistent color",
        "Style the submit button with a gradient background, white text, and rounded corners",
      ],
    },
  ],
};

export default session7;