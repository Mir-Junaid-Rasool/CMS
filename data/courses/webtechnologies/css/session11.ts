// data/courses/webtechnologies/css/session11.ts
import type { SessionData } from "@/types/session";

const session11: SessionData = {
  meta: {
    sessionNumber: 11,
    module: "css",
    moduleNumber: 2,
    title: "Display, Positioning & CSS Grid",
    subtitle: "Master the display property, control element positioning with precision, and build two-dimensional layouts using CSS Grid",
    duration: "2 hrs",
    color: "#11998e",
    colorDim: "rgba(17,153,142,0.09)",
    colorMid: "rgba(17,153,142,0.18)",
    objectives: [
      "Understand the display property and the difference between block, inline, and inline-block",
      "Hide elements with display: none vs visibility: hidden",
      "Understand the CSS positioning model and the five position values",
      "Use top, right, bottom, left offsets to place elements precisely",
      "Stack overlapping elements using z-index",
      "Know when to use Flexbox vs CSS Grid",
      "Build grid layouts using grid-template-columns and grid-template-rows",
      "Span items across multiple columns and rows",
      "Create named grid areas for readable, maintainable layouts",
    ],
    prevSession: { num: 10, title: "CSS Flexbox", href: "/courses/webtechnologies/css/session10" },
    nextSession: { num: 12, title: "Lists, Tables & Cursor Effects", href: "/courses/webtechnologies/css/session12" },
  },

  topics: [
    // ── PART 1: DISPLAY ──────────────────────────────────────────
    {
      id: "display-property",
      heading: "The display Property",
      content:
        "Every HTML element has a default display value that controls how it occupies space on the page. Block elements (div, p, h1, section) take up the full width available and always start on a new line. Inline elements (span, a, strong, em) only take up as much space as their content and sit side by side in a line. Inline-block is a hybrid — elements sit in a line like inline elements but you can give them a width and height like block elements. Understanding display is foundational to controlling layout.",
      table: {
        headers: ["Value", "Starts New Line?", "Width / Height?", "Common Elements"],
        rows: [
          { cells: ["block",        "✅ Yes", "✅ Yes", "div, p, h1–h6, section, article, header, footer"] },
          { cells: ["inline",       "❌ No",  "❌ No",  "span, a, strong, em, img, button"] },
          { cells: ["inline-block", "❌ No",  "✅ Yes", "Custom badges, nav items, icon buttons"] },
          { cells: ["none",         "—",     "—",     "Hidden elements (removed from layout)"] },
          { cells: ["flex",         "✅ Yes", "✅ Yes", "Flex containers (Session 10)"] },
          { cells: ["grid",         "✅ Yes", "✅ Yes", "Grid containers (this session)"] },
        ],
      },
      codeExamples: [
        {
          label: "block vs inline vs inline-block",
          code: `/* Block — full width, new line */
div {
  display: block;
  width: 100%;          /* Can set width */
  background: #11998e;
}

/* Inline — fits content, ignores width/height */
span {
  display: inline;
  /* width: 200px; — this is IGNORED on inline elements */
  color: #11998e;
}

/* Inline-block — sits in a line BUT accepts width/height */
.badge {
  display: inline-block;
  width: 80px;
  height: 30px;
  background: #11998e;
  color: white;
  border-radius: 20px;
  text-align: center;
  line-height: 30px;
}`,
        },
      ],
      subSections: [
        {
          id: "display-none-vs-visibility",
          heading: "display: none vs visibility: hidden",
          content:
            "Both hide an element visually, but they behave very differently. display: none completely removes the element from the page — it takes up no space at all and other elements fill in the gap. visibility: hidden makes the element invisible but it still occupies its space in the layout, leaving a blank gap. Choose display: none when you want to fully remove something (like a dropdown closing) and visibility: hidden when you want the space preserved.",
          codeExamples: [
            {
              label: "none vs hidden — Space Behaviour",
              code: `/* Removes element completely — no space left behind */
.hidden-completely {
  display: none;
}

/* Element is invisible BUT still occupies space */
.invisible-but-present {
  visibility: hidden;
}

/* Tip: use opacity: 0 for fade animations — keeps space, allows transitions */
.fade-out {
  opacity: 0;
  transition: opacity 0.3s;
}`,
            },
          ],
        },
      ],
    },

    // ── PART 2: POSITIONING ───────────────────────────────────────
    {
      id: "position-property",
      heading: "The position Property",
      content:
        "The position property takes elements out of the normal document flow and places them precisely where you want. There are five values. static is the default — elements appear in their natural document order and top/left/right/bottom have no effect. relative moves an element relative to where it would normally be, while the original space is preserved. absolute removes the element from flow and positions it relative to its nearest positioned ancestor. fixed pins an element to the browser viewport so it stays put when scrolling. sticky is a hybrid — it scrolls normally until it hits a threshold, then sticks in place.",
      table: {
        headers: ["Value", "In Normal Flow?", "Positioned Relative To", "Common Use Case"],
        rows: [
          { cells: ["static",   "✅ Yes", "Normal flow (default)",          "Default — no special positioning"] },
          { cells: ["relative", "✅ Yes", "Its own normal position",         "Nudge element, create stacking context"] },
          { cells: ["absolute", "❌ No",  "Nearest positioned ancestor",    "Dropdowns, tooltips, overlays"] },
          { cells: ["fixed",    "❌ No",  "Browser viewport",               "Sticky navbars, chat buttons, cookie banners"] },
          { cells: ["sticky",   "✅ Yes", "Scroll container (then viewport)","Sticky section headers, table headers"] },
        ],
      },
      codeExamples: [
        {
          label: "All Five position Values",
          code: `/* static — default, top/left/right/bottom do nothing */
.box { position: static; }

/* relative — moves from its natural position, space preserved */
.nudged {
  position: relative;
  top: 10px;   /* Move DOWN 10px from where it would normally be */
  left: 20px;  /* Move RIGHT 20px */
}

/* absolute — removed from flow, positioned to nearest positioned parent */
.tooltip {
  position: absolute;
  top: 0;
  right: 0;
  /* Positions at top-right of the nearest position: relative parent */
}

/* fixed — locked to the viewport, stays on screen while scrolling */
.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

/* sticky — scrolls normally then sticks when it reaches the offset */
.section-header {
  position: sticky;
  top: 0; /* Sticks when it reaches the top of the scroll container */
  background: white;
}`,
        },
      ],
    },

    {
      id: "absolute-positioning",
      heading: "Absolute Positioning — The Parent Trick",
      content:
        "Absolute positioning is the most powerful but also the most misunderstood. When you set position: absolute on an element, it looks for the nearest ancestor that has a position value other than static (usually position: relative). If it finds one, it positions itself relative to that ancestor's boundaries. If it finds none, it falls back to the entire page (the initial containing block). The pattern is always: set position: relative on the parent container, then position: absolute on the child you want to place precisely inside it.",
      tip: "The golden rule: to use position: absolute on a child, always set position: relative on its parent. This creates a coordinate system for the absolute child to work within.",
      codeExamples: [
        {
          label: "The Parent Trick — Notification Badge",
          code: `/* Parent gets position: relative — creates the coordinate system */
.avatar {
  position: relative;
  width: 60px;
  height: 60px;
}

/* Child gets position: absolute — places inside the parent */
.badge {
  position: absolute;
  top: -6px;     /* 6px above the top edge of .avatar */
  right: -6px;   /* 6px beyond the right edge of .avatar */
  width: 20px;
  height: 20px;
  background: red;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}`,
        },
        {
          label: "Overlay — Centred Text on an Image",
          code: `/* Image container */
.card {
  position: relative;  /* Anchor for the overlay */
  width: 300px;
  height: 200px;
  overflow: hidden;
}

/* Overlay covers entire card */
.overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  /* Shorthand: inset: 0; */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover .overlay {
  opacity: 1;
}`,
        },
      ],
    },

    {
      id: "z-index",
      heading: "z-index — Controlling Stack Order",
      content:
        "When elements overlap, z-index determines which one appears on top. Think of it as layers — higher z-index values appear in front of lower ones. z-index only works on positioned elements (anything except position: static). The default z-index is auto (effectively 0). Positive values bring elements forward, negative values push them behind normal content. It is best practice to use z-index in multiples of 10 (10, 20, 30) so you can easily insert new layers between existing ones later.",
      warning: "z-index only works on elements with position: relative, absolute, fixed, or sticky. Setting z-index on a static element has no effect.",
      codeExamples: [
        {
          label: "z-index Layering System",
          code: `/* Recommended z-index scale for a real project */
:root {
  --z-base:    0;
  --z-above:   10;
  --z-dropdown: 100;
  --z-sticky:  200;
  --z-modal:   300;
  --z-toast:   400;
}

.dropdown-menu {
  position: absolute;
  z-index: var(--z-dropdown); /* Sits above normal content */
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal); /* Sits above dropdowns */
}

.toast-notification {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: var(--z-toast); /* Always on top */
}`,
        },
      ],
    },

    // ── PART 3: CSS GRID ──────────────────────────────────────────
    {
      id: "what-is-grid",
      heading: "What is CSS Grid?",
      content:
        "CSS Grid is a two-dimensional layout system — it lets you control both rows AND columns at the same time. While Flexbox is ideal for laying out items in a single direction (a row of cards, a column of menu items), Grid is designed for full page layouts and complex component structures where you need items to align in both directions simultaneously. You activate it with display: grid on a container, then define your columns and rows using grid-template-columns and grid-template-rows.",
      tip: "Use Flexbox when you have a one-dimensional list of items (a row of buttons, a column of cards). Use Grid when you need items to align in two dimensions — rows AND columns at the same time.",
      codeExamples: [
        {
          label: "Flexbox vs Grid — When to Use Each",
          code: `/* FLEXBOX — one direction, content drives size */
.navbar {
  display: flex;
  justify-content: space-between; /* Row of nav items */
}

/* GRID — two directions, you define the structure */
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;  /* Sidebar | Main */
  grid-template-rows: 64px 1fr 60px; /* Header | Body | Footer */
}`,
        },
      ],
    },

    {
      id: "grid-template",
      heading: "grid-template-columns & grid-template-rows",
      content:
        "These two properties define the structure of your grid — how many columns and rows exist and how wide/tall each one is. Values can be in pixels (fixed), fractions (fr — proportional), percentages, or auto (sized to content). The fr unit is Flexbox's flex-grow equivalent for Grid — 1fr means 'take one equal share of the remaining space'. The repeat() function saves you from writing the same value multiple times. minmax() sets a minimum and maximum size for a track, which is essential for responsive grids.",
      codeExamples: [
        {
          label: "Defining Columns and Rows",
          code: `.grid {
  display: grid;

  /* Three equal columns */
  grid-template-columns: 1fr 1fr 1fr;

  /* Shorthand using repeat() */
  grid-template-columns: repeat(3, 1fr);

  /* Fixed sidebar + flexible main */
  grid-template-columns: 260px 1fr;

  /* Fixed sidebar + flexible main + fixed aside */
  grid-template-columns: 260px 1fr 200px;

  /* Responsive — as many columns as fit, min 250px each */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  /* Two explicit rows then auto-sized rows for remaining items */
  grid-template-rows: 64px auto;

  /* Gap between cells */
  gap: 24px;
  /* Or separate row/column gaps */
  row-gap: 24px;
  column-gap: 16px;
}`,
        },
      ],
      table: {
        headers: ["Value / Function", "What it Does", "Example"],
        rows: [
          { cells: ["px",             "Fixed size track",                             "200px"] },
          { cells: ["fr",             "Fraction of remaining space",                  "1fr, 2fr"] },
          { cells: ["auto",           "Size to content",                              "auto"] },
          { cells: ["repeat(n, size)","Repeat a track n times",                       "repeat(3, 1fr)"] },
          { cells: ["minmax(min,max)","Track is at least min, at most max",           "minmax(250px, 1fr)"] },
          { cells: ["auto-fit",       "Fill row with as many columns as possible",    "repeat(auto-fit, minmax(200px, 1fr))"] },
          { cells: ["auto-fill",      "Same as auto-fit but keeps empty columns",     "repeat(auto-fill, minmax(200px, 1fr))"] },
        ],
      },
    },

    {
      id: "placing-items",
      heading: "Placing & Spanning Grid Items",
      content:
        "By default, grid items are placed automatically one after another. You can override this with grid-column and grid-row to precisely place items and make them span across multiple tracks. Grid lines are numbered starting at 1. The shorthand syntax start / end defines which lines an item starts and ends at. Using span N is more readable — it means 'span across N tracks from wherever the item starts'. The grid-area shorthand combines both row and column placement in a single declaration.",
      codeExamples: [
        {
          label: "Spanning Columns and Rows",
          code: `/* Item spans from column line 1 to line 3 (2 columns wide) */
.wide-item {
  grid-column: 1 / 3;
}

/* Easier with span — same result */
.wide-item {
  grid-column: span 2;
}

/* Span across all columns regardless of how many there are */
.full-width {
  grid-column: 1 / -1; /* -1 means the last grid line */
}

/* Place at a specific row and column */
.hero {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

/* Span 2 rows tall */
.tall-item {
  grid-row: span 2;
}`,
        },
        {
          label: "grid-area Shorthand",
          code: `/* grid-area: row-start / column-start / row-end / column-end */
.item {
  grid-area: 1 / 1 / 3 / 4;
  /* Starts at row 1, col 1 — ends at row 3, col 4 */
}`,
        },
      ],
    },

    {
      id: "grid-template-areas",
      heading: "grid-template-areas — Naming Your Layout",
      content:
        "grid-template-areas is one of the most readable features in CSS. Instead of using line numbers, you draw your layout visually using named areas directly in your CSS. Each string represents a row, and each word in the string is the name of a cell. Repeat a name across multiple cells and the item will span them. Use a dot (.) for empty cells. Once you've drawn the areas on the container, you assign each child to its area using the grid-area property with that name.",
      tip: "grid-template-areas makes your layout instantly readable to anyone. You can literally see the page structure in your CSS — header across the top, sidebar left, main right, footer at the bottom.",
      codeExamples: [
        {
          label: "Named Grid Areas — Full Page Layout",
          code: `.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 64px 1fr 60px;
  grid-template-areas:
    "header  header"   /* Header spans both columns */
    "sidebar main"     /* Sidebar left, main right */
    "footer  footer";  /* Footer spans both columns */
  min-height: 100vh;
  gap: 0;
}

/* Assign each child to its named area */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`,
        },
        {
          label: "Named Areas — Magazine Layout",
          code: `.magazine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 16px;
  grid-template-areas:
    "hero   hero   aside"
    "card1  card2  aside"
    "card3  card4  card4";
}

.hero   { grid-area: hero; }
.aside  { grid-area: aside; }
.card1  { grid-area: card1; }
.card2  { grid-area: card2; }
.card3  { grid-area: card3; }
.card4  { grid-area: card4; }`,
        },
      ],
    },

    {
      id: "grid-alignment",
      heading: "Aligning Items Inside Grid Cells",
      content:
        "Grid provides the same alignment properties as Flexbox, plus a few extras. justify-items aligns all items horizontally within their cell (start, end, center, stretch). align-items aligns all items vertically within their cell. place-items is the shorthand for both. For the entire grid tracks inside the container, justify-content and align-content control how the grid itself is positioned when it doesn't fill the container. Individual items can override with justify-self and align-self.",
      codeExamples: [
        {
          label: "Grid Alignment Properties",
          code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 200px);

  /* Align ALL items within their cells */
  justify-items: center;  /* Horizontal — start | end | center | stretch */
  align-items: center;    /* Vertical   — start | end | center | stretch */

  /* Shorthand: align-items then justify-items */
  place-items: center;

  /* Align the whole grid inside its container */
  justify-content: center; /* When grid is narrower than container */
  align-content: start;
}

/* Override alignment for one specific item */
.special-item {
  justify-self: end;
  align-self: start;
  /* Shorthand */
  place-self: start end;
}`,
        },
      ],
    },

    {
      id: "grid-vs-flexbox-real-world",
      heading: "Grid + Flexbox Together — The Power Combo",
      content:
        "In real projects you will use Grid and Flexbox together. Grid handles the big picture — the overall page structure with header, sidebar, main content, and footer. Flexbox handles the small picture — the items within each grid area, like aligning icons and text in a navbar, distributing cards inside the main area, or laying out form fields. There is no competition between them. Use Grid for the outer shell and Flexbox for the inner components.",
      codeExamples: [
        {
          label: "Grid for Page Layout + Flexbox for Components",
          code: `/* GRID — defines the page shell */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr 56px;
  min-height: 100vh;
}

/* FLEXBOX — inside the header grid area */
.header {
  grid-area: header;
  display: flex;               /* Flexbox inside a grid area */
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: #11998e;
  color: white;
}

/* FLEXBOX — inside the main grid area */
.main {
  grid-area: main;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 24px;
  align-content: flex-start;
}`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-display",
      label: "display Values",
      html: `<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:14px">See how block, inline, and inline-block elements behave differently:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">block — full width, always starts on a new line</p>
  <div style="margin-bottom:14px">
    <div style="display:block;background:#11998e;color:white;padding:10px 16px;border-radius:6px;margin-bottom:6px">Block Element 1 — takes full width</div>
    <div style="display:block;background:#38ef7d;color:#1a1a1a;padding:10px 16px;border-radius:6px">Block Element 2 — forced to new line</div>
  </div>

  <p style="font-weight:700;color:#3498db;margin-bottom:6px">inline — sits in the text flow, ignores width/height</p>
  <div style="margin-bottom:14px;background:#f0f4f8;padding:12px;border-radius:8px">
    Normal text flow —
    <span style="display:inline;background:#3498db;color:white;padding:2px 8px;border-radius:4px">Inline A</span>
    continues here —
    <span style="display:inline;background:#5dade2;color:white;padding:2px 8px;border-radius:4px">Inline B</span>
    — and the text keeps flowing.
  </div>

  <p style="font-weight:700;color:#e74c3c;margin-bottom:6px">inline-block — sits inline BUT respects width/height</p>
  <div style="margin-bottom:14px">
    <span style="display:inline-block;width:90px;height:36px;background:#e74c3c;color:white;border-radius:6px;text-align:center;line-height:36px;font-size:0.78rem;margin-right:8px">Badge 1</span>
    <span style="display:inline-block;width:90px;height:36px;background:#c0392b;color:white;border-radius:6px;text-align:center;line-height:36px;font-size:0.78rem;margin-right:8px">Badge 2</span>
    <span style="display:inline-block;width:90px;height:36px;background:#e74c3c;color:white;border-radius:6px;text-align:center;line-height:36px;font-size:0.78rem">Badge 3</span>
  </div>

  <p style="font-weight:700;color:#888;margin-bottom:6px">display: none vs visibility: hidden</p>
  <div style="background:#f0f4f8;padding:12px;border-radius:8px">
    <div style="display:inline-block;background:#11998e;color:white;padding:8px 16px;border-radius:6px;margin-right:8px;font-size:0.78rem">Visible</div>
    <div style="display:none;background:#999;color:white;padding:8px 16px;border-radius:6px;margin-right:8px;font-size:0.78rem">display:none — gone!</div>
    <div style="visibility:hidden;display:inline-block;background:#999;color:white;padding:8px 16px;border-radius:6px;margin-right:8px;font-size:0.78rem">visibility:hidden</div>
    <div style="display:inline-block;background:#11998e;color:white;padding:8px 16px;border-radius:6px;font-size:0.78rem">Visible again</div>
    <p style="font-size:0.72rem;color:#666;margin-top:8px">↑ Notice the gap where visibility:hidden is — it still occupies space. display:none leaves no gap.</p>
  </div>
</div>`,
    },

    {
      id: "demo-position",
      label: "Positioning",
      html: `<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:14px">The five position values demonstrated live:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">relative — nudged 10px down and right from its normal spot</p>
  <div style="background:#f0f4f8;padding:16px;border-radius:8px;margin-bottom:14px;height:70px">
    <div style="display:inline-block;background:#e0e0e0;color:#666;padding:8px 16px;border-radius:6px;font-size:0.78rem">Normal</div>
    <div style="display:inline-block;position:relative;top:10px;left:10px;background:#11998e;color:white;padding:8px 16px;border-radius:6px;font-size:0.78rem">Relative (moved)</div>
    <div style="display:inline-block;background:#e0e0e0;color:#666;padding:8px 16px;border-radius:6px;font-size:0.78rem">Normal</div>
  </div>

  <p style="font-weight:700;color:#3498db;margin-bottom:6px">absolute — notification badge pinned to top-right of its parent</p>
  <div style="background:#f0f4f8;padding:16px;border-radius:8px;margin-bottom:14px">
    <div style="position:relative;display:inline-block;width:52px;height:52px;background:#3498db;border-radius:50%">
      <span style="position:absolute;top:-6px;right:-6px;width:20px;height:20px;background:#e74c3c;color:white;border-radius:50%;font-size:0.65rem;display:flex;align-items:center;justify-content:center;font-weight:700">3</span>
    </div>
    <span style="margin-left:16px;font-size:0.8rem;color:#555">Avatar with absolute-positioned badge</span>
  </div>

  <p style="font-weight:700;color:#e74c3c;margin-bottom:6px">absolute — overlay centred on a card using inset: 0</p>
  <div style="position:relative;height:80px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;margin-bottom:14px;overflow:hidden">
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:0.9rem;border-radius:8px">
      Overlay covers the whole card
    </div>
  </div>

  <p style="font-weight:700;color:#f39c12;margin-bottom:6px">sticky — scroll the box below to see the header stick</p>
  <div style="height:120px;overflow-y:auto;border:1px solid #ddd;border-radius:8px">
    <div style="position:sticky;top:0;background:#f39c12;color:white;padding:8px 14px;font-weight:700;font-size:0.78rem">📌 Sticky Header — scroll me!</div>
    ${Array.from({length:6},(_,i)=>`<p style="padding:8px 14px;font-size:0.78rem;color:#555;border-bottom:1px solid #f0f0f0">Scrollable content row ${i+1}</p>`).join("")}
  </div>
</div>`,
    },

    {
      id: "demo-grid-basics",
      label: "Grid Basics",
      html: `<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:14px">Building grids with grid-template-columns:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">repeat(3, 1fr) — three equal columns</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
    ${Array.from({length:6},(_,i)=>`<div style="background:#11998e;color:white;padding:16px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">Item ${i+1}</div>`).join("")}
  </div>

  <p style="font-weight:700;color:#3498db;margin-bottom:6px">260px 1fr — fixed sidebar + flexible main</p>
  <div style="display:grid;grid-template-columns:100px 1fr;gap:8px;margin-bottom:16px">
    <div style="background:#3498db;color:white;padding:16px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">Sidebar<br>100px</div>
    <div style="background:#5dade2;color:white;padding:16px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">Main content — 1fr (takes remaining space)</div>
  </div>

  <p style="font-weight:700;color:#e74c3c;margin-bottom:6px">repeat(auto-fit, minmax(120px, 1fr)) — responsive, no media queries</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;margin-bottom:16px">
    ${["Design","Code","Test","Deploy","Review","Ship"].map((l,i)=>{
      const c=["#e74c3c","#c0392b","#e74c3c","#c0392b","#e74c3c","#c0392b"];
      return `<div style="background:${c[i]};color:white;padding:16px 8px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">${l}</div>`;
    }).join("")}
  </div>

  <p style="font-weight:700;color:#9b59b6;margin-bottom:6px">Spanning — item spans 2 columns with grid-column: span 2</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
    <div style="grid-column:span 2;background:#9b59b6;color:white;padding:16px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">Wide Item (span 2)</div>
    <div style="background:#8e44ad;color:white;padding:16px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">Normal</div>
    <div style="background:#8e44ad;color:white;padding:16px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">Normal</div>
    <div style="grid-column:1/-1;background:#6c3483;color:white;padding:16px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">Full Width (1 / -1)</div>
  </div>
</div>`,
    },

    {
      id: "demo-grid-areas",
      label: "Grid Areas",
      html: `<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:10px">Named grid areas — a complete page layout in one block of CSS:</p>
  <div style="background:#1e1e1e;color:#d4d4d4;padding:14px;border-radius:8px;font-family:'Courier New',monospace;font-size:0.72rem;margin-bottom:14px;line-height:1.8">
    <span style="color:#9cdcfe">grid-template-areas</span>:<br>
    &nbsp;&nbsp;<span style="color:#ce9178">"header&nbsp;&nbsp;header"</span><br>
    &nbsp;&nbsp;<span style="color:#ce9178">"sidebar main&nbsp;&nbsp;"</span><br>
    &nbsp;&nbsp;<span style="color:#ce9178">"footer&nbsp;&nbsp;footer"</span>;
  </div>

  <div style="display:grid;grid-template-columns:90px 1fr;grid-template-rows:44px 120px 36px;grid-template-areas:'header header' 'sidebar main' 'footer footer';gap:6px">
    <div style="grid-area:header;background:linear-gradient(135deg,#11998e,#38ef7d);color:white;border-radius:8px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-weight:700;font-size:0.8rem">
      <span>⚡ Header</span>
      <div style="display:flex;gap:12px;font-size:0.72rem">
        <span>Home</span><span>About</span><span>Contact</span>
      </div>
    </div>
    <div style="grid-area:sidebar;background:#3498db;color:white;border-radius:8px;padding:12px;font-size:0.75rem">
      <p style="font-weight:700;margin-bottom:8px">Sidebar</p>
      <p style="opacity:0.85;margin-bottom:4px">• Link 1</p>
      <p style="opacity:0.85;margin-bottom:4px">• Link 2</p>
      <p style="opacity:0.85">• Link 3</p>
    </div>
    <div style="grid-area:main;background:#ecf0f1;border-radius:8px;padding:14px;font-size:0.78rem">
      <p style="font-weight:700;color:#2c3e50;margin-bottom:8px">Main Content</p>
      <div style="display:flex;gap:8px">
        ${["Card A","Card B","Card C"].map(c=>`<div style="flex:1;background:white;padding:10px;border-radius:6px;border:1px solid #ddd;text-align:center;font-size:0.72rem;color:#555">${c}</div>`).join("")}
      </div>
    </div>
    <div style="grid-area:footer;background:#2c3e50;color:white;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.72rem;opacity:0.9">
      Footer — spans both columns
    </div>
  </div>
</div>`,
    },

    {
      id: "demo-combo",
      label: "Grid + Flexbox",
      html: `<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:10px">Grid handles the page shell — Flexbox handles the components inside:</p>

  <div style="display:grid;grid-template-columns:80px 1fr;grid-template-rows:48px 1fr 36px;gap:6px;height:280px">

    <!-- Header uses Flexbox inside a Grid area -->
    <div style="grid-column:1/-1;background:linear-gradient(135deg,#11998e,#38ef7d);border-radius:8px;display:flex;justify-content:space-between;align-items:center;padding:0 16px">
      <span style="color:white;font-weight:800;font-size:0.9rem">⚡ Grid + Flex</span>
      <div style="display:flex;gap:14px">
        ${["Home","Docs","Blog"].map(l=>`<a href="#" style="color:white;text-decoration:none;font-size:0.75rem">${l}</a>`).join("")}
      </div>
    </div>

    <!-- Sidebar -->
    <div style="background:#2c3e50;border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:6px">
      ${["Dashboard","Projects","Settings"].map(l=>`<div style="background:rgba(255,255,255,0.1);color:white;padding:7px 10px;border-radius:5px;font-size:0.72rem">${l}</div>`).join("")}
    </div>

    <!-- Main uses Flexbox to lay out cards -->
    <div style="background:#f4f6f8;border-radius:8px;padding:12px;display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start">
      ${["Analytics","Users","Revenue","Growth"].map((l,i)=>{
        const colors=["#11998e","#3498db","#e74c3c","#f39c12"];
        return `<div style="flex:1 1 80px;background:${colors[i]};color:white;padding:10px;border-radius:6px;text-align:center;font-size:0.72rem;font-weight:700">${l}</div>`;
      }).join("")}
    </div>

    <!-- Footer -->
    <div style="grid-column:1/-1;background:#ecf0f1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.72rem;color:#888">
      Footer — Grid area, Flexbox alignment
    </div>
  </div>

  <div style="margin-top:10px;background:#f8f9fa;padding:10px;border-radius:6px;border-left:3px solid #11998e">
    <p style="font-size:0.72rem;color:#555;margin:0"><strong>Key insight:</strong> Grid defines the page structure (columns, rows, areas). Each area then uses Flexbox internally to align its own content. They work together, not against each other.</p>
  </div>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Display Property Exploration",
      description: "Understand how display changes an element's layout behaviour:",
      tasks: [
        "Create a page with three div elements and three span elements, each with a different background color",
        "Observe that divs stack vertically (block) and spans flow inline",
        "Add display: inline to the divs — they should now flow in a line",
        "Add display: block to the spans — they should now stack vertically",
        "Create a row of navigation buttons using display: inline-block so you can control their width and height while keeping them in a line",
        "Try hiding one element with display: none and another with visibility: hidden — notice the difference in space",
      ],
      hint: "Give each element a background color and padding so the layout behaviour is clearly visible.",
    },
    {
      title: "Exercise 2: Positioning Practice",
      description: "Build a card component that uses all three key position values:",
      tasks: [
        "Create a .card div with position: relative, a background image or color, and overflow: hidden",
        "Add a .badge element with position: absolute, top: -8px, right: -8px — it should appear as a corner tag",
        "Add a .overlay div that covers the entire card (position: absolute, inset: 0) with a semi-transparent dark background",
        "Make the overlay invisible by default (opacity: 0) and visible on hover (opacity: 1) using a CSS transition",
        "Add a fixed .back-to-top button with position: fixed, bottom: 24px, right: 24px",
        "Give the back-to-top button a high z-index so it appears above all other content",
      ],
      hint: "Remember the golden rule: position: relative on the parent creates the coordinate system for position: absolute children.",
    },
    {
      title: "Exercise 3: CSS Grid Layouts",
      description: "Build three different grid layouts to master the core concepts:",
      tasks: [
        "Layout 1 — Photo gallery: use repeat(auto-fit, minmax(200px, 1fr)) with gap: 16px for a responsive grid of colored boxes",
        "Layout 2 — Dashboard: create a 2×2 grid with one card spanning 2 columns (grid-column: span 2) at the top",
        "Layout 3 — Page skeleton: use grid-template-areas to create a header / sidebar+main / footer layout",
        "For Layout 3, make the header and footer span both columns using the named area technique",
        "Add background colors to each area and min-height: 100vh to the grid container",
        "Experiment with different gap values and observe how the spacing changes",
      ],
      hint: "For grid-template-areas, the number of words in each string must match the number of columns. Use the same name in multiple cells to make an item span those cells.",
    },
    {
      title: "Challenge: Full Dashboard Layout",
      description: "Combine Grid, Flexbox, and Positioning to build a complete app dashboard:",
      tasks: [
        "Use CSS Grid with grid-template-areas to define: header, sidebar, main, and footer zones",
        "Build the header as a Flexbox navbar with logo left, navigation centre, and a user avatar right",
        "Build the sidebar as a vertical Flexbox column of navigation links with icons",
        "In the main area, use a wrapping Flexbox or nested Grid to show 4 stat cards in a row",
        "Below the stat cards, add a wide content section using grid-column: span 2 or full width",
        "Add a position: fixed back-to-top button at bottom-right with a z-index of 100",
        "Make the sidebar sticky using position: sticky, top: 0 so it stays visible while main content scrolls",
      ],
      hint: "Start with the Grid layout first and get the areas working. Then add Flexbox inside each area. Add positioning last. Build from the outside in.",
    },
  ],
};

export default session11;