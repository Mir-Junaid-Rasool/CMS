// data/courses/webtechnologies/css/session10.ts
import type { SessionData } from "@/types/session";

const session10: SessionData = {
  meta: {
    sessionNumber: 10,
    module: "css",
    moduleNumber: 2,
    title: "CSS Flexbox",
    subtitle: "Build flexible, responsive layouts with ease — align, distribute, and reorder elements without floats or hacks",
    duration: "1.5 hrs",
    color: "#11998e",
    colorDim: "rgba(17,153,142,0.09)",
    colorMid: "rgba(17,153,142,0.18)",
    objectives: [
      "Understand what Flexbox is and the problem it solves",
      "Know the difference between a flex container and flex items",
      "Control direction and wrapping with flex-direction and flex-wrap",
      "Align items along the main axis using justify-content",
      "Align items along the cross axis using align-items and align-content",
      "Control individual item sizing with flex-grow, flex-shrink, and flex-basis",
      "Override alignment for a single item using align-self",
      "Build real-world layouts: navbars, card grids, and centered heroes",
    ],
    prevSession: { num: 9, title: "Selectors, Colors & Fonts", href: "/courses/webtechnologies/css/session9" },
    nextSession: { num: 11, title: "CSS Box Model", href: "/courses/webtechnologies/css/session11" },
  },

  topics: [
    {
      id: "what-is-flexbox",
      heading: "What is Flexbox?",
      content:
        "Flexbox (Flexible Box Layout) is a CSS layout model that makes it easy to arrange elements in a row or column, control spacing between them, and align them — even when their sizes are unknown or dynamic. Before Flexbox, developers used floats, tables, and tricky positioning hacks to build layouts. Flexbox replaces all of that with simple, readable properties. You enable it on a parent element with display: flex, and its direct children automatically become flex items that can be controlled with a handful of intuitive properties.",
      tip: "Flexbox works in one dimension at a time — either a row OR a column. For two-dimensional layouts (rows AND columns simultaneously), use CSS Grid.",
      codeExamples: [
        {
          label: "Enabling Flexbox — It's Just One Line",
          code: `/* Before Flexbox — messy float hacks */
.container::after {
  content: '';
  display: table;
  clear: both;
}
.item { float: left; width: 33%; }

/* With Flexbox — clean and simple */
.container {
  display: flex; /* That's it! All children become flex items */
}`,
        },
      ],
    },

    {
      id: "container-vs-items",
      heading: "Flex Container & Flex Items",
      content:
        "Flexbox has two key players: the flex container and flex items. The flex container is the parent element — the one you apply display: flex to. Flex items are the direct children of that container. Properties applied to the container control the overall layout (direction, wrapping, alignment of all items). Properties applied to individual items control how that specific item behaves (its size, order, and self-alignment). You never apply both sets to the same element — container properties go on the parent, item properties go on the children.",
      codeExamples: [
        {
          label: "Container vs Items — Who Gets Which Property",
          code: `/* CONTAINER (parent) — controls overall layout */
.container {
  display: flex;           /* Activates flexbox */
  flex-direction: row;     /* Direction items flow */
  flex-wrap: wrap;         /* Allow items to wrap */
  justify-content: center; /* Main axis alignment */
  align-items: center;     /* Cross axis alignment */
  gap: 16px;               /* Space between items */
}

/* ITEMS (children) — control individual behaviour */
.item {
  flex-grow: 1;            /* Grow to fill space */
  flex-shrink: 1;          /* Shrink if needed */
  flex-basis: 200px;       /* Starting size */
  align-self: flex-start;  /* Override container alignment */
  order: 2;                /* Change visual order */
}`,
        },
      ],
      table: {
        headers: ["Applied To", "Properties", "Controls"],
        rows: [
          { cells: ["Container (parent)", "display, flex-direction, flex-wrap, justify-content, align-items, align-content, gap", "Overall layout of all items"] },
          { cells: ["Items (children)", "flex-grow, flex-shrink, flex-basis, flex, align-self, order", "Individual item behaviour"] },
        ],
      },
    },

    {
      id: "flex-direction",
      heading: "flex-direction — Which Way Do Items Flow?",
      content:
        "flex-direction sets the main axis — the direction in which flex items are placed. The default is row, which places items left to right horizontally. column stacks them top to bottom vertically. Adding -reverse to either value reverses the visual order without changing the HTML. This is one of Flexbox's superpowers: you can switch a horizontal layout to vertical with a single word, which is extremely powerful for responsive design.",
      codeExamples: [
        {
          label: "All Four Direction Values",
          code: `.row {
  display: flex;
  flex-direction: row;            /* → Left to right (default) */
}

.row-reverse {
  display: flex;
  flex-direction: row-reverse;    /* ← Right to left */
}

.column {
  display: flex;
  flex-direction: column;         /* ↓ Top to bottom */
}

.column-reverse {
  display: flex;
  flex-direction: column-reverse; /* ↑ Bottom to top */
}`,
        },
      ],
      table: {
        headers: ["Value", "Direction", "Common Use Case"],
        rows: [
          { cells: ["row",            "Left → Right",  "Navbars, card rows (default)"] },
          { cells: ["row-reverse",    "Right → Left",  "RTL languages, reversed button groups"] },
          { cells: ["column",         "Top → Bottom",  "Sidebar menus, stacked forms"] },
          { cells: ["column-reverse", "Bottom → Top",  "Chat messages, reversed feeds"] },
        ],
      },
    },

    {
      id: "flex-wrap",
      heading: "flex-wrap — Should Items Wrap to a New Line?",
      content:
        "By default, all flex items try to fit on a single line, shrinking if necessary (nowrap). Setting flex-wrap: wrap allows items to flow onto the next line when there is not enough space — just like words in a paragraph. This is essential for responsive grids: set each item's minimum width using flex-basis, and they will wrap naturally on smaller screens without any media queries.",
      tip: "flex-wrap: wrap combined with flex-basis on items is the simplest way to create a responsive card grid without writing a single media query.",
      codeExamples: [
        {
          label: "nowrap vs wrap",
          code: `/* All items squeezed onto one line — can overflow on small screens */
.no-wrap {
  display: flex;
  flex-wrap: nowrap; /* Default */
}

/* Items flow to next line when they don't fit */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card-grid .card {
  flex-basis: 250px; /* Each card starts at 250px wide */
  flex-grow: 1;      /* Stretch to fill remaining row space */
}`,
        },
      ],
    },

    {
      id: "justify-content",
      heading: "justify-content — Spacing Along the Main Axis",
      content:
        "justify-content controls how items are positioned and spaced along the main axis (horizontal in row, vertical in column). flex-start packs items to the beginning, flex-end packs to the end, and center places them in the middle. space-between puts equal gaps between items with no space on the outer edges — perfect for navigation links. space-around adds equal space around each item. space-evenly gives truly equal space everywhere including the outer edges.",
      codeExamples: [
        {
          label: "All justify-content Values — Visual Reference",
          code: `.flex { display: flex; }

/* [■ ■ ■         ] */
.start   { justify-content: flex-start; }

/* [         ■ ■ ■] */
.end     { justify-content: flex-end; }

/* [    ■ ■ ■     ] */
.center  { justify-content: center; }

/* [■        ■        ■] */
.between { justify-content: space-between; }

/* [ ■   ■   ■  ] */
.around  { justify-content: space-around; }

/* [  ■  ■  ■  ] */
.evenly  { justify-content: space-evenly; }`,
        },
      ],
      table: {
        headers: ["Value", "Behaviour", "Best For"],
        rows: [
          { cells: ["flex-start",    "Pack items to the start",          "Left-aligned content"] },
          { cells: ["flex-end",      "Pack items to the end",            "Right-aligned buttons"] },
          { cells: ["center",        "Centre all items",                 "Hero sections, modals"] },
          { cells: ["space-between", "Equal gaps, no outer space",       "Navigation bars, tabs"] },
          { cells: ["space-around",  "Equal space around each item",     "Icon rows"] },
          { cells: ["space-evenly",  "Equal space everywhere",           "Evenly spaced toolbars"] },
        ],
      },
    },

    {
      id: "align-items",
      heading: "align-items — Alignment on the Cross Axis",
      content:
        "While justify-content works along the main axis, align-items works on the cross axis (perpendicular). In a row layout, the cross axis is vertical — so align-items controls how tall items line up with short ones. stretch (default) makes all items the same height as the tallest. center vertically centres them. flex-start aligns to the top, flex-end to the bottom. baseline aligns items by their text baseline — great for navbars with mixed font sizes.",
      tip: "The most common layout challenge is perfectly centering an element both horizontally and vertically. With Flexbox it is just two lines: justify-content: center and align-items: center on the parent.",
      codeExamples: [
        {
          label: "Perfect Centering — The Classic Flexbox Trick",
          code: `/* Center a child both horizontally AND vertically */
.parent {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
  height: 300px;           /* parent needs a defined height */
}

/* The child will be perfectly centred — no absolute positioning needed! */`,
        },
        {
          label: "All align-items Values",
          code: `.flex { display: flex; height: 120px; }

.stretch    { align-items: stretch; }     /* Items fill full height (default) */
.center     { align-items: center; }      /* Items centred vertically */
.flex-start { align-items: flex-start; }  /* Items at the top */
.flex-end   { align-items: flex-end; }    /* Items at the bottom */
.baseline   { align-items: baseline; }    /* Text baselines align */`,
        },
      ],
    },

    {
      id: "gap",
      heading: "gap — Clean Spacing Between Items",
      content:
        "The gap property adds consistent space between flex items without adding space to the outer edges. Before gap existed, developers used margin on items and then had to remove it from the first or last item with :first-child or :last-child selectors. gap eliminates all of that complexity. You can set a single value for equal spacing in both directions, or two values to set row-gap and column-gap separately. gap works in both Flexbox and CSS Grid.",
      codeExamples: [
        {
          label: "gap vs the Old margin Hack",
          code: `/* Old way — painful margin hacks */
.item { margin-right: 16px; }
.item:last-child { margin-right: 0; } /* Undo the last one! */

/* New way — gap handles it cleanly */
.container {
  display: flex;
  gap: 16px;       /* Equal gap between ALL items, no outer edges */
}

/* Two values: row-gap then column-gap */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 16px;  /* 24px between rows, 16px between columns */
}`,
        },
      ],
    },

    {
      id: "flex-grow-shrink-basis",
      heading: "flex-grow, flex-shrink & flex-basis",
      content:
        "These three properties control how individual items size themselves relative to available space. flex-basis sets the starting size before any growing or shrinking (like width in a row). flex-grow defines how much of the remaining free space an item should absorb — 0 means it won't grow at all, 1 means it takes an equal share, 2 means double share. flex-shrink defines how much an item shrinks when there is not enough space (default is 1 — items shrink equally). The flex shorthand combines all three in one clean declaration.",
      codeExamples: [
        {
          label: "flex-grow — Sharing Available Space",
          code: `.container { display: flex; width: 600px; gap: 0; }

/* All three items grow equally — each takes 200px */
.equal { flex-grow: 1; }

/* A gets double the space of B and C */
.item-a { flex-grow: 2; } /* Gets 2 shares → 300px */
.item-b { flex-grow: 1; } /* Gets 1 share  → 150px */
.item-c { flex-grow: 1; } /* Gets 1 share  → 150px */`,
        },
        {
          label: "flex-basis — Starting Size",
          code: `/* Sidebar stays fixed, main content takes the rest */
.sidebar { flex-basis: 260px; flex-shrink: 0; flex-grow: 0; }
.main    { flex-basis: 0;     flex-grow: 1; }`,
        },
        {
          label: "flex Shorthand — grow shrink basis",
          code: `/* flex: grow shrink basis */
.item { flex: 1 1 auto; }   /* Grow, shrink, auto size — most common */
.item { flex: 1; }          /* Shorthand for flex: 1 1 0 */
.item { flex: none; }       /* flex: 0 0 auto — fixed, never resize */
.item { flex: 0 0 200px; }  /* Fixed 200px — no growing or shrinking */`,
        },
      ],
    },

    {
      id: "align-self-order",
      heading: "align-self & order — Per-Item Overrides",
      content:
        "Sometimes you need one item to behave differently from the rest of the group. align-self overrides the container's align-items value for a single specific item. It accepts the same values: flex-start, flex-end, center, stretch, and baseline. The order property changes the visual position of an item without touching the HTML. All items default to order: 0, so negative values move items earlier and positive values push them later.",
      warning: "Using order to change visual position can harm accessibility — screen readers follow the DOM order, not the visual order. Only use order for cosmetic reordering, never for meaningful content.",
      codeExamples: [
        {
          label: "align-self — Override One Item's Alignment",
          code: `.container {
  display: flex;
  align-items: center; /* All items centred by default */
  height: 150px;
}

.special {
  align-self: flex-end; /* Only this item goes to the bottom */
}`,
        },
        {
          label: "order — Change Visual Order",
          code: `/* HTML order: A, B, C, D */
/* Visual order after order: C, A, D, B */

.item-a { order: 1; }  /* Appears 2nd */
.item-b { order: 3; }  /* Appears 4th */
.item-c { order: 0; }  /* Appears 1st (0 is the default) */
.item-d { order: 2; }  /* Appears 3rd */`,
        },
      ],
    },

    {
      id: "real-world-patterns",
      heading: "Real-World Flexbox Patterns",
      content:
        "Flexbox shines in everyday UI patterns you will build repeatedly. A navbar with logo on the left and links on the right is a classic space-between layout. A hero section with content perfectly centred uses justify-content and align-items together. A responsive card grid uses flex-wrap with flex-basis so cards wrap naturally on mobile without a single media query. A sticky footer layout uses flex-direction: column with flex-grow: 1 on the main content so the footer is always pushed to the bottom.",
      codeExamples: [
        {
          label: "Pattern 1 — Navbar: Logo Left, Links Right",
          code: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: #11998e;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}`,
        },
        {
          label: "Pattern 2 — Perfectly Centred Hero",
          code: `.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #11998e, #38ef7d);
  color: white;
}`,
        },
        {
          label: "Pattern 3 — Responsive Card Grid (Zero Media Queries)",
          code: `.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1 1 280px; /* grow | shrink | minimum width */
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
/* On small screens cards automatically stack into a single column */`,
        },
        {
          label: "Pattern 4 — Sticky Footer Layout",
          code: `body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

main {
  flex-grow: 1; /* Expands to push footer to the very bottom */
}

footer {
  padding: 24px;
  background: #f8f9fa;
  text-align: center;
}`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-direction",
      label: "flex-direction",
      html: `<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:14px">Same HTML, four completely different layouts:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">row (default) — items flow left to right</p>
  <div style="display:flex;flex-direction:row;gap:8px;margin-bottom:16px">
    <div style="background:#11998e;color:white;padding:14px 22px;border-radius:8px;font-weight:700">A</div>
    <div style="background:#11998e;color:white;padding:14px 22px;border-radius:8px;font-weight:700">B</div>
    <div style="background:#11998e;color:white;padding:14px 22px;border-radius:8px;font-weight:700">C</div>
  </div>

  <p style="font-weight:700;color:#e74c3c;margin-bottom:6px">row-reverse — items flow right to left</p>
  <div style="display:flex;flex-direction:row-reverse;gap:8px;margin-bottom:16px">
    <div style="background:#e74c3c;color:white;padding:14px 22px;border-radius:8px;font-weight:700">A</div>
    <div style="background:#e74c3c;color:white;padding:14px 22px;border-radius:8px;font-weight:700">B</div>
    <div style="background:#e74c3c;color:white;padding:14px 22px;border-radius:8px;font-weight:700">C</div>
  </div>

  <div style="display:flex;gap:32px">
    <div>
      <p style="font-weight:700;color:#3498db;margin-bottom:6px">column ↓</p>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="background:#3498db;color:white;padding:12px 22px;border-radius:8px;font-weight:700;text-align:center">A</div>
        <div style="background:#3498db;color:white;padding:12px 22px;border-radius:8px;font-weight:700;text-align:center">B</div>
        <div style="background:#3498db;color:white;padding:12px 22px;border-radius:8px;font-weight:700;text-align:center">C</div>
      </div>
    </div>
    <div>
      <p style="font-weight:700;color:#9b59b6;margin-bottom:6px">column-reverse ↑</p>
      <div style="display:flex;flex-direction:column-reverse;gap:8px">
        <div style="background:#9b59b6;color:white;padding:12px 22px;border-radius:8px;font-weight:700;text-align:center">A</div>
        <div style="background:#9b59b6;color:white;padding:12px 22px;border-radius:8px;font-weight:700;text-align:center">B</div>
        <div style="background:#9b59b6;color:white;padding:12px 22px;border-radius:8px;font-weight:700;text-align:center">C</div>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      id: "demo-justify",
      label: "justify-content",
      html: `<div style="font-family:sans-serif;font-size:0.8rem">
  <p style="color:#666;margin-bottom:12px">Six ways to distribute items along the main axis:</p>
  ${[
    ["flex-start",    "#11998e", "Items packed to the start"],
    ["flex-end",      "#e74c3c", "Items packed to the end"],
    ["center",        "#3498db", "Items centred"],
    ["space-between", "#f39c12", "Equal gaps, no outer space"],
    ["space-around",  "#9b59b6", "Equal space around each item"],
    ["space-evenly",  "#1abc9c", "Equal space everywhere"],
  ].map(([val, color, label]) => `
  <div style="margin-bottom:10px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <code style="font-size:0.72rem;color:${color};font-weight:700">${val}</code>
      <span style="font-size:0.7rem;color:#888">${label}</span>
    </div>
    <div style="display:flex;justify-content:${val};background:#f0f4f8;padding:8px 12px;border-radius:8px;gap:6px;border:1px solid #e2e8f0">
      <div style="background:${color};color:white;padding:10px 16px;border-radius:6px;font-size:0.75rem;font-weight:700">■</div>
      <div style="background:${color};color:white;padding:10px 16px;border-radius:6px;font-size:0.75rem;font-weight:700">■</div>
      <div style="background:${color};color:white;padding:10px 16px;border-radius:6px;font-size:0.75rem;font-weight:700">■</div>
    </div>
  </div>`).join("")}
</div>`,
    },
    {
      id: "demo-align",
      label: "align-items",
      html: `<div style="font-family:sans-serif;font-size:0.8rem">
  <p style="color:#666;margin-bottom:12px">Items have different heights so you can clearly see cross-axis alignment:</p>
  ${[
    ["stretch",    "#11998e", "Items fill the full container height"],
    ["flex-start", "#3498db", "Items align to the top"],
    ["center",     "#e74c3c", "Items centre vertically"],
    ["flex-end",   "#f39c12", "Items align to the bottom"],
  ].map(([val, color, label]) => `
  <div style="margin-bottom:12px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <code style="font-size:0.72rem;color:${color};font-weight:700">${val}</code>
      <span style="font-size:0.7rem;color:#888">${label}</span>
    </div>
    <div style="display:flex;align-items:${val};background:#f0f4f8;padding:8px;border-radius:8px;gap:8px;height:80px;border:1px solid #e2e8f0">
      <div style="background:${color};color:white;padding:8px 14px;border-radius:6px;font-size:0.75rem;font-weight:700">S</div>
      <div style="background:${color};color:white;padding:8px 14px;border-radius:6px;font-size:0.75rem;font-weight:700;height:${val==="stretch"?"auto":"60px"};display:flex;align-items:center">T</div>
      <div style="background:${color};color:white;padding:8px 14px;border-radius:6px;font-size:0.75rem;font-weight:700;height:${val==="stretch"?"auto":"40px"};display:flex;align-items:center">M</div>
    </div>
  </div>`).join("")}
</div>`,
    },
    {
      id: "demo-grow",
      label: "flex-grow",
      html: `<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:14px">How items claim available space with different grow values:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">All flex-grow: 1 — equal shares</p>
  <div style="display:flex;gap:8px;margin-bottom:18px">
    <div style="flex:1;background:#11998e;color:white;padding:14px 8px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">A (grow: 1)</div>
    <div style="flex:1;background:#11998e;color:white;padding:14px 8px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">B (grow: 1)</div>
    <div style="flex:1;background:#11998e;color:white;padding:14px 8px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">C (grow: 1)</div>
  </div>

  <p style="font-weight:700;color:#3498db;margin-bottom:6px">A=2, B=1, C=1 — A gets twice the space</p>
  <div style="display:flex;gap:8px;margin-bottom:18px">
    <div style="flex:2;background:#3498db;color:white;padding:14px 8px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">A (grow: 2)</div>
    <div style="flex:1;background:#5dade2;color:white;padding:14px 8px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">B (grow: 1)</div>
    <div style="flex:1;background:#5dade2;color:white;padding:14px 8px;border-radius:8px;text-align:center;font-weight:700;font-size:0.78rem">C (grow: 1)</div>
  </div>

  <p style="font-weight:700;color:#e74c3c;margin-bottom:6px">flex-grow: 0 — items stay their natural size</p>
  <div style="display:flex;gap:8px">
    <div style="flex:0 0 auto;background:#e74c3c;color:white;padding:14px 18px;border-radius:8px;font-weight:700;font-size:0.78rem">Fixed A</div>
    <div style="flex:0 0 auto;background:#e74c3c;color:white;padding:14px 18px;border-radius:8px;font-weight:700;font-size:0.78rem">Fixed B</div>
    <div style="flex:0 0 auto;background:#e74c3c;color:white;padding:14px 18px;border-radius:8px;font-weight:700;font-size:0.78rem">Fixed C</div>
  </div>
</div>`,
    },
    {
      id: "demo-patterns",
      label: "Real-World Patterns",
      html: `<div style="font-family:sans-serif">
  <p style="font-size:0.78rem;color:#666;margin-bottom:10px;font-weight:700">Pattern 1 — Navbar: logo left, links right</p>
  <nav style="display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,#11998e,#38ef7d);padding:0 20px;height:52px;border-radius:10px;margin-bottom:16px">
    <span style="color:white;font-weight:800;font-size:1rem">⚡ MyBrand</span>
    <ul style="display:flex;gap:20px;list-style:none;margin:0;padding:0">
      ${["Home","About","Work","Contact"].map(l=>`<li><a href="#" style="color:white;text-decoration:none;font-size:0.8rem">${l}</a></li>`).join("")}
    </ul>
  </nav>

  <p style="font-size:0.78rem;color:#666;margin-bottom:10px;font-weight:700">Pattern 2 — Perfectly centred hero content</p>
  <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:90px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:10px;margin-bottom:16px">
    <h3 style="color:white;margin:0 0 6px;font-size:0.95rem">Welcome to Flexbox</h3>
    <a href="#" style="background:white;color:#667eea;padding:6px 20px;border-radius:20px;text-decoration:none;font-size:0.78rem;font-weight:700">Get Started</a>
  </div>

  <p style="font-size:0.78rem;color:#666;margin-bottom:10px;font-weight:700">Pattern 3 — Responsive card grid with flex-wrap</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px">
    ${["Design","Code","Deploy","Test","Review","Launch"].map((l,i)=>{
      const colors=["#11998e","#3498db","#e74c3c","#f39c12","#9b59b6","#1abc9c"];
      return `<div style="flex:1 1 100px;background:${colors[i]};color:white;padding:16px 8px;border-radius:8px;text-align:center;font-weight:700;font-size:0.8rem">${l}</div>`;
    }).join("")}
  </div>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Flex Direction Explorer",
      description: "See how one property transforms the same content into completely different layouts:",
      tasks: [
        "Create a .container div with four coloured child divs labelled Item 1 through Item 4",
        "Apply display: flex and flex-direction: row — observe the default horizontal layout",
        "Change to flex-direction: column — items should stack vertically",
        "Try row-reverse and column-reverse — the order flips without touching HTML",
        "Add justify-content: center to each version and observe the difference",
      ],
      hint: "Give the container a fixed height (e.g. height: 300px) when using column so you can see vertical alignment effects clearly.",
    },
    {
      title: "Exercise 2: Build a Responsive Navbar",
      description: "Recreate the classic logo-left, links-right navigation pattern from scratch:",
      tasks: [
        "Create a <nav> with a .logo span and a <ul> of four links inside",
        "Apply display: flex and justify-content: space-between to the nav element",
        "Use align-items: center so the logo and links are vertically aligned",
        "Make the <ul> its own flex container with display: flex, gap: 24px, and list-style: none",
        "Style the links with color, text-decoration: none, and a :hover color change",
        "Give the nav a background, padding, and min-height: 64px",
      ],
      hint: "The <nav> is the outer flex container with two items (logo + ul). The <ul> is its own inner flex container for the links. Nested flex containers are completely normal.",
    },
    {
      title: "Exercise 3: Responsive Card Grid",
      description: "Build a card grid that wraps naturally on small screens without any media queries:",
      tasks: [
        "Create a .grid container div with six .card children inside",
        "Apply display: flex, flex-wrap: wrap, and gap: 20px to .grid",
        "Give each .card flex: 1 1 250px so they grow but have a 250px minimum width",
        "Add padding: 24px, border-radius: 12px, border: 1px solid #ddd, and box-shadow to each card",
        "Put a title, a short paragraph, and a button inside each card",
        "Resize the browser window — cards should wrap automatically into fewer columns",
      ],
      hint: "flex: 1 1 250px is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 250px. The browser will fit as many 250px cards per row as possible, then wrap the rest.",
    },
    {
      title: "Challenge: Full Page Flexbox Layout",
      description: "Combine everything into a complete page layout using only Flexbox:",
      tasks: [
        "Set body { display: flex; flex-direction: column; min-height: 100vh } for the sticky footer base",
        "Give <main> { flex-grow: 1 } so it expands and pushes the footer to the bottom",
        "Inside main, create a sidebar + content row: sidebar gets flex-basis: 260px; flex-shrink: 0 and content gets flex-grow: 1",
        "Build a space-between navbar in the header with a logo on the left and nav links on the right",
        "Add a card grid in the content area using flex-wrap: wrap with at least four cards",
        "Create a hero section inside content with justify-content: center and align-items: center with a centred headline and CTA button",
      ],
      hint: "Think in layers — the page body is a column flex. The main area content is a row flex. Inside that, the card section is a wrapping row flex. Nesting flex containers is normal and encouraged.",
    },
  ],
};

export default session10;