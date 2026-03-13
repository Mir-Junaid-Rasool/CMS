// data/courses/webtechnologies/css/session12.ts
import type { SessionData } from "@/types/session";

const session12: SessionData = {
  meta: {
    sessionNumber: 12,
    module: "css",
    moduleNumber: 2,
    title: "Transitions & Animations",
    subtitle: "Bring your interfaces to life — smooth state changes with transitions and powerful multi-step animations with @keyframes",
    duration: "1.5 hrs",
    color: "#11998e",
    colorDim: "rgba(17,153,142,0.09)",
    colorMid: "rgba(17,153,142,0.18)",
    objectives: [
      "Understand the difference between CSS transitions and CSS animations",
      "Write smooth transitions using the transition shorthand",
      "Control timing with duration, delay, and easing functions",
      "Use transform to move, scale, rotate, and skew elements",
      "Build multi-step animations using @keyframes",
      "Control animation playback with animation properties",
      "Combine transforms and animations for polished UI effects",
      "Follow best practices for performance-friendly animations",
    ],
    prevSession: { num: 11, title: "Display, Positioning & CSS Grid", href: "/courses/webtechnologies/css/session11" },
    nextSession: { num: 13, title: "Responsive Design & Media Queries", href: "/courses/webtechnologies/css/session13" },
  },

  topics: [
    // ── 1. TRANSITIONS vs ANIMATIONS ─────────────────────────────
    {
      id: "transitions-vs-animations",
      heading: "Transitions vs Animations — What's the Difference?",
      content:
        "CSS gives you two tools for motion: transitions and animations. A transition is a smooth change between two states — it needs a trigger like :hover, :focus, or a JavaScript class toggle. It goes from A to B and that's it. An animation runs on its own without any trigger — you define keyframes (checkpoints) and the browser plays through them automatically, optionally looping forever. Think of a transition as a light switch with a dimmer — it smoothly goes from off to on when you flip it. Think of an animation as a movie — it plays frames in sequence, independently, on its own schedule.",
      tip: "Use transitions for UI feedback (hover effects, button presses, menu opens). Use animations for things that move on their own (loaders, pulses, floating elements, intro sequences).",
      table: {
        headers: ["Feature", "Transition", "Animation"],
        rows: [
          { cells: ["Needs a trigger?",    "✅ Yes (hover, focus, class change)", "❌ No — runs automatically"] },
          { cells: ["Number of steps",      "2 — start state and end state",       "Unlimited — as many keyframes as needed"] },
          { cells: ["Can loop?",            "❌ No",                               "✅ Yes — infinite or a set number"] },
          { cells: ["Can reverse?",         "✅ Yes — reverses when trigger ends", "✅ Yes — with animation-direction"] },
          { cells: ["Best for",             "Hover effects, UI state changes",     "Loaders, pulses, entrance effects"] },
        ],
      },
    },

    // ── 2. TRANSITIONS ────────────────────────────────────────────
    {
      id: "css-transitions",
      heading: "CSS Transitions",
      content:
        "A transition smoothly animates a property change over a set duration. You add it to the element in its default state — not on the :hover or trigger state. This ensures the transition plays both when entering AND leaving the triggered state. The transition shorthand takes four values: the property to animate, the duration, the easing function (how it accelerates), and an optional delay before it starts. You can animate multiple properties by separating them with commas, or use transition: all to animate every changing property at once — though transition: all should be used carefully as it can be slow.",
      codeExamples: [
        {
          label: "transition Syntax & Shorthand",
          code: `/* Full syntax */
.element {
  transition: property duration timing-function delay;
}

/* Single property */
.button {
  background: #11998e;
  transition: background 0.3s ease;
}
.button:hover {
  background: #0d7a6e;
}

/* Multiple properties — comma separated */
.card {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}

/* All changing properties at once (use sparingly) */
.element {
  transition: all 0.3s ease;
}`,
        },
      ],
      table: {
        headers: ["Property", "Values", "Description"],
        rows: [
          { cells: ["transition-property",        "all, property name, none",           "Which CSS property to animate"] },
          { cells: ["transition-duration",         "s or ms (e.g. 0.3s, 300ms)",        "How long the transition takes"] },
          { cells: ["transition-timing-function",  "ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier()", "Speed curve"] },
          { cells: ["transition-delay",            "s or ms",                            "Wait before starting"] },
          { cells: ["transition",                  "property duration timing delay",     "Shorthand for all four"] },
        ],
      },
    },

    // ── 3. TIMING FUNCTIONS ───────────────────────────────────────
    {
      id: "timing-functions",
      heading: "Timing Functions — Controlling the Feel",
      content:
        "The timing function is what makes an animation feel natural or mechanical. ease (the default) starts slow, speeds up, then slows down at the end — it mimics how real objects move. linear moves at a constant speed — good for continuous rotations and progress bars. ease-in starts slow and accelerates — good for elements leaving the screen. ease-out starts fast and decelerates — good for elements entering the screen. ease-in-out is slow at both ends — great for elements that move from one place to another. cubic-bezier() gives you complete control with a custom curve.",
      codeExamples: [
        {
          label: "All Timing Functions Compared",
          code: `/* ease — slow start, fast middle, slow end (default) */
transition: transform 0.5s ease;

/* linear — constant speed, mechanical feel */
transition: transform 0.5s linear;

/* ease-in — starts slow, accelerates (element leaving) */
transition: transform 0.5s ease-in;

/* ease-out — starts fast, decelerates (element entering) */
transition: transform 0.5s ease-out;

/* ease-in-out — slow at both ends, smooth arc */
transition: transform 0.5s ease-in-out;

/* cubic-bezier — fully custom curve */
/* Try different values at cubic-bezier.com */
transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
/* This creates a satisfying bounce overshoot effect! */`,
        },
      ],
    },

    // ── 4. TRANSFORM ─────────────────────────────────────────────
    {
      id: "css-transform",
      heading: "CSS transform — Move, Scale, Rotate & Skew",
      content:
        "The transform property moves, resizes, rotates, or distorts an element without affecting the document layout — other elements don't shift around it. This makes it ideal for animations since it doesn't trigger expensive layout recalculations. You can chain multiple transforms in a single declaration by separating them with spaces. The order matters — transforms are applied right to left, so rotate then translate is different from translate then rotate. transform is one of the two most GPU-accelerated CSS properties (the other being opacity), making it the best choice for smooth animations.",
      tip: "For the smoothest 60fps animations, only animate transform and opacity. These are handled by the GPU and never trigger layout or paint — everything else can cause jank.",
      codeExamples: [
        {
          label: "All transform Functions",
          code: `/* TRANSLATE — move in X and Y */
transform: translateX(50px);      /* Move right 50px */
transform: translateY(-20px);     /* Move up 20px */
transform: translate(50px, -20px);/* Move right and up together */

/* SCALE — resize (1 = normal, 2 = double, 0.5 = half) */
transform: scaleX(1.5);           /* Stretch horizontally */
transform: scaleY(0.8);           /* Shrink vertically */
transform: scale(1.1);            /* Scale both axes equally */

/* ROTATE — spin around the centre point */
transform: rotate(45deg);         /* 45° clockwise */
transform: rotate(-90deg);        /* 90° counter-clockwise */
transform: rotate(360deg);        /* Full spin */

/* SKEW — tilt/shear the element */
transform: skewX(15deg);          /* Slant horizontally */
transform: skewY(10deg);          /* Slant vertically */

/* CHAIN MULTIPLE TRANSFORMS (space-separated) */
transform: translateY(-8px) scale(1.05) rotate(2deg);`,
        },
        {
          label: "transform-origin — Change the Pivot Point",
          code: `/* Default pivot is the centre of the element */
transform-origin: center;       /* Default */

/* Pivot from top-left corner */
transform-origin: top left;
transform: rotate(45deg);       /* Rotates from top-left */

/* Pivot from bottom-centre */
transform-origin: bottom center;
transform: rotate(-10deg);      /* Good for card fan effect */

/* Pixel or % values */
transform-origin: 0% 0%;        /* Same as top left */
transform-origin: 100% 50%;     /* Right edge, vertical centre */`,
        },
      ],
      table: {
        headers: ["Function", "What It Does", "Example"],
        rows: [
          { cells: ["translateX(n)",  "Move horizontally",          "translateX(100px)"] },
          { cells: ["translateY(n)",  "Move vertically",            "translateY(-50px)"] },
          { cells: ["translate(x,y)", "Move both axes",             "translate(20px, -10px)"] },
          { cells: ["scale(n)",       "Resize uniformly",           "scale(1.2)"] },
          { cells: ["scaleX(n)",      "Resize horizontally only",   "scaleX(2)"] },
          { cells: ["rotate(deg)",    "Spin around centre",         "rotate(45deg)"] },
          { cells: ["skew(x,y)",      "Tilt / shear",               "skewX(15deg)"] },
        ],
      },
    },

    // ── 5. PRACTICAL TRANSITION PATTERNS ─────────────────────────
    {
      id: "transition-patterns",
      heading: "Practical Transition Patterns",
      content:
        "Transitions shine in everyday UI patterns. Buttons lift on hover with translateY and a deeper box-shadow. Cards scale up subtly to signal they are clickable. Navigation links reveal an underline with a width transition. Menu drawers slide in and out with transform: translateX. Colour transitions on links and backgrounds give satisfying visual feedback. These micro-interactions make an interface feel polished and responsive without a single line of JavaScript.",
      codeExamples: [
        {
          label: "Lift & Shadow — Hover Card",
          code: `.card {
  border-radius: 12px;
  padding: 24px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transform: translateY(0);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.14);
}`,
        },
        {
          label: "Animated Underline — Nav Link",
          code: `.nav-link {
  position: relative;
  text-decoration: none;
  color: #333;
}

/* The underline starts at zero width */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;          /* Hidden by default */
  height: 2px;
  background: #11998e;
  transition: width 0.3s ease;
}

/* Expands to full width on hover */
.nav-link:hover::after {
  width: 100%;
}`,
        },
        {
          label: "Slide-In Drawer",
          code: `.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 20px rgba(0,0,0,0.15);
  transform: translateX(100%); /* Hidden off-screen to the right */
  transition: transform 0.35s ease-in-out;
}

/* Add this class with JavaScript to open */
.drawer.open {
  transform: translateX(0); /* Slides into view */
}`,
        },
        {
          label: "Button Press Effect",
          code: `.btn {
  padding: 12px 28px;
  background: #11998e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.1s ease, background 0.2s ease;
}

.btn:hover {
  background: #0d7a6e;
}

.btn:active {
  transform: scale(0.96); /* Satisfying press-in effect */
}`,
        },
      ],
    },

    // ── 6. KEYFRAME ANIMATIONS ────────────────────────────────────
    {
      id: "keyframe-animations",
      heading: "@keyframes — Multi-Step Animations",
      content:
        "While transitions move between two states, @keyframes let you define as many intermediate steps as you need. You declare a named set of keyframes with @keyframes name { }, then assign it to an element using the animation property. Inside, you define waypoints using percentages — 0% is the start, 100% is the end, and you can add any percentage in between. You can also use the keywords from and to as aliases for 0% and 100%. Once defined, the same @keyframes block can be reused on any element.",
      codeExamples: [
        {
          label: "@keyframes Syntax",
          code: `/* Step 1: Define the keyframes */
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Step 2: Apply to an element */
.hero-title {
  animation: slideInFromLeft 0.6s ease-out;
}

/* Using from / to (aliases for 0% and 100%) */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Multi-step with intermediate waypoints */
@keyframes bounce {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-30px); }
  50%  { transform: translateY(0); }
  70%  { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}`,
        },
      ],
    },

    // ── 7. ANIMATION PROPERTIES ───────────────────────────────────
    {
      id: "animation-properties",
      heading: "animation Properties — Full Control",
      content:
        "The animation shorthand combines eight sub-properties. Name and duration are required — everything else has a sensible default. animation-iteration-count sets how many times it plays — use infinite for looping effects like spinners and pulses. animation-direction controls whether it plays forward (normal), backward (reverse), or alternates back and forth (alternate). animation-fill-mode determines what styles apply before and after the animation — forwards keeps the final keyframe styles applied after the animation ends, which is essential for entrance animations. animation-play-state can pause and resume an animation with pause/running.",
      codeExamples: [
        {
          label: "animation Shorthand & All Sub-Properties",
          code: `/* Shorthand: name duration timing delay iterations direction fill-mode */
.element {
  animation: fadeIn 0.5s ease-out 0.2s 1 normal forwards;
}

/* Written out as individual properties */
.element {
  animation-name:            fadeIn;
  animation-duration:        0.5s;
  animation-timing-function: ease-out;
  animation-delay:           0.2s;
  animation-iteration-count: 1;        /* or: infinite */
  animation-direction:       normal;   /* normal | reverse | alternate | alternate-reverse */
  animation-fill-mode:       forwards; /* none | forwards | backwards | both */
  animation-play-state:      running;  /* running | paused */
}`,
        },
        {
          label: "animation-fill-mode: forwards — Why It Matters",
          code: `/* WITHOUT forwards — element snaps back to original state */
@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}
.box {
  animation: slideIn 0.5s ease-out;
  /* After 0.5s the element jumps back to translateX(-100%)! */
}

/* WITH forwards — element stays at the final keyframe */
.box {
  animation: slideIn 0.5s ease-out forwards;
  /* After 0.5s the element stays at translateX(0) — correct! */
}`,
        },
        {
          label: "Multiple Animations",
          code: `/* Apply several animations at once — comma separated */
.element {
  animation:
    fadeIn    0.5s ease-out forwards,
    slideUp   0.5s ease-out forwards,
    wiggle    1s   ease-in-out 1s infinite;
}`,
        },
      ],
      table: {
        headers: ["Property", "Values", "Description"],
        rows: [
          { cells: ["animation-name",            "keyframe name",                          "Which @keyframes to use"] },
          { cells: ["animation-duration",         "s or ms",                               "How long one cycle takes"] },
          { cells: ["animation-timing-function",  "ease, linear, cubic-bezier()",          "Speed curve"] },
          { cells: ["animation-delay",            "s or ms",                               "Wait before first play"] },
          { cells: ["animation-iteration-count",  "number or infinite",                    "How many times to play"] },
          { cells: ["animation-direction",        "normal, reverse, alternate, alternate-reverse", "Playback direction"] },
          { cells: ["animation-fill-mode",        "none, forwards, backwards, both",       "Styles before/after animation"] },
          { cells: ["animation-play-state",       "running, paused",                       "Play or pause"] },
        ],
      },
    },

    // ── 8. COMMON ANIMATION RECIPES ──────────────────────────────
    {
      id: "animation-recipes",
      heading: "Essential Animation Recipes",
      content:
        "A small set of reusable @keyframes covers the vast majority of UI needs. A fade-in entrance, a slide-up entrance, a spinner for loading states, a pulse for drawing attention, a shake for error feedback, and a bounce for playful interactions. These are the building blocks you will reach for on every project. Define them once in a shared CSS file and apply them anywhere by name.",
      codeExamples: [
        {
          label: "Fade In",
          code: `@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.hero { animation: fadeIn 0.6s ease-out forwards; }`,
        },
        {
          label: "Slide Up Entrance",
          code: `@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card { animation: slideUp 0.5s ease-out forwards; }

/* Stagger multiple cards with delay */
.card:nth-child(1) { animation-delay: 0.0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }`,
        },
        {
          label: "Spinner — Infinite Rotation",
          code: `@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(17, 153, 142, 0.2);
  border-top-color: #11998e;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}`,
        },
        {
          label: "Pulse — Draw Attention",
          code: `@keyframes pulse {
  0%   { transform: scale(1);    opacity: 1; }
  50%  { transform: scale(1.08); opacity: 0.8; }
  100% { transform: scale(1);    opacity: 1; }
}

.notification-dot {
  animation: pulse 1.5s ease-in-out infinite;
}`,
        },
        {
          label: "Shake — Error Feedback",
          code: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15%       { transform: translateX(-8px); }
  30%       { transform: translateX(8px); }
  45%       { transform: translateX(-6px); }
  60%       { transform: translateX(6px); }
  75%       { transform: translateX(-4px); }
  90%       { transform: translateX(4px); }
}

.input.error {
  animation: shake 0.5s ease;
  border-color: #e74c3c;
}`,
        },
        {
          label: "Float — Gentle Up/Down",
          code: `@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.hero-image {
  animation: float 3s ease-in-out infinite;
}`,
        },
      ],
    },

    // ── 9. PERFORMANCE BEST PRACTICES ────────────────────────────
    {
      id: "animation-performance",
      heading: "Performance — Smooth 60fps Animations",
      content:
        "Not all CSS properties are equal when it comes to animation performance. The browser goes through three stages for every frame: Layout (calculating positions and sizes), Paint (filling in pixels), and Composite (merging layers). Properties that trigger Layout are the most expensive — width, height, margin, padding, top, left. Properties that trigger Paint are cheaper but still costly — background, color, border. Only transform and opacity skip both Layout and Paint entirely — they are handled by the GPU compositor, making them the only properties that can reliably achieve 60fps smooth animations. Sticking to these two properties is the single most important animation performance tip.",
      warning: "Avoid animating width, height, margin, padding, top, left, or right — these trigger full layout recalculations every frame and can cause choppy animations. Always prefer transform: translate() instead of animating left/top.",
      codeExamples: [
        {
          label: "Slow vs Fast — The Right Way to Animate Movement",
          code: `/* ❌ SLOW — triggers full layout every frame */
@keyframes moveLeft {
  from { left: 0; }
  to   { left: 200px; }
}
.box { position: absolute; animation: moveLeft 1s; }

/* ✅ FAST — GPU composited, silky smooth */
@keyframes moveLeft {
  from { transform: translateX(0); }
  to   { transform: translateX(200px); }
}
.box { animation: moveLeft 1s; }

/* ✅ ALSO FAST — Only animate these two properties */
@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
        },
        {
          label: "will-change — Hint the Browser",
          code: `/* Tell the browser to prepare GPU layer in advance */
.animated-card {
  will-change: transform, opacity;
  /* Use sparingly — only on elements you KNOW will animate */
  /* Overusing will-change wastes GPU memory */
}

/* Remove will-change after animation ends (via JS) */
.animated-card.done {
  will-change: auto;
}`,
        },
        {
          label: "Respecting User Preferences",
          code: `/* Some users prefer no motion (vestibular disorders, epilepsy) */
/* Always respect this — it's an accessibility requirement */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-transitions",
      label: "Transitions",
      html: `<style>
  .demo-btn {
    padding: 12px 24px; border: none; border-radius: 8px;
    background: #11998e; color: white; font-size: 0.82rem;
    font-weight: 700; cursor: pointer; margin: 6px;
    transform: scale(1) translateY(0);
    box-shadow: 0 3px 10px rgba(17,153,142,0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }
  .demo-btn:hover { transform: translateY(-4px) scale(1.04); box-shadow: 0 10px 25px rgba(17,153,142,0.4); }
  .demo-btn:active { transform: scale(0.96); }

  .demo-card-t {
    background: white; border-radius: 12px; padding: 18px;
    border: 1px solid #e2e8f0; cursor: pointer; margin: 8px 0;
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .demo-card-t:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.13); }

  .demo-link-t {
    position: relative; text-decoration: none;
    color: #11998e; font-weight: 700; font-size: 0.9rem;
  }
  .demo-link-t::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 2px; background: #11998e;
    transition: width 0.3s ease;
  }
  .demo-link-t:hover::after { width: 100%; }

  .demo-color-t {
    padding: 12px 20px; border-radius: 8px; display: inline-block;
    background: #f0f4f8; color: #333; font-size: 0.82rem;
    font-weight: 600; margin: 6px; cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease, border-radius 0.3s ease;
  }
  .demo-color-t:hover { background: #11998e; color: white; border-radius: 24px; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:14px">Hover over each element to see transitions in action:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:8px">Button — lift + scale on hover, press on click</p>
  <div style="margin-bottom:16px">
    <button class="demo-btn">Hover Me</button>
    <button class="demo-btn">Click Me</button>
  </div>

  <p style="font-weight:700;color:#3498db;margin-bottom:8px">Card — translateY + box-shadow transition</p>
  <div class="demo-card-t" style="margin-bottom:16px">
    <p style="font-weight:700;color:#2c3e50;margin:0 0 4px">Hover this card</p>
    <p style="color:#888;margin:0;font-size:0.78rem">It lifts up with a deeper shadow — a classic interactive card effect</p>
  </div>

  <p style="font-weight:700;color:#e74c3c;margin-bottom:8px">Animated underline — width: 0 → 100%</p>
  <div style="margin-bottom:16px;padding:10px">
    <a class="demo-link-t" href="#">Hover to reveal the underline</a>
  </div>

  <p style="font-weight:700;color:#9b59b6;margin-bottom:8px">Color + shape — background and border-radius together</p>
  <div>
    <span class="demo-color-t">Hover Me</span>
    <span class="demo-color-t">And Me</span>
    <span class="demo-color-t">Me Too</span>
  </div>
</div>`,
    },

    {
      id: "demo-transform",
      label: "Transforms",
      html: `<style>
  .t-box {
    display: inline-flex; align-items: center; justify-content: center;
    width: 80px; height: 80px; background: #11998e; color: white;
    border-radius: 10px; font-weight: 700; font-size: 0.78rem;
    margin: 10px; cursor: pointer; transition: transform 0.3s ease;
  }
  .t-translate:hover { transform: translate(12px, -12px); }
  .t-scale:hover     { transform: scale(1.35); }
  .t-rotate:hover    { transform: rotate(45deg); }
  .t-skew:hover      { transform: skewX(20deg); }
  .t-combo:hover     { transform: translateY(-10px) scale(1.1) rotate(6deg); }
  .t-box.blue  { background: #3498db; }
  .t-box.red   { background: #e74c3c; }
  .t-box.orange{ background: #f39c12; }
  .t-box.purple{ background: #9b59b6; }
  .t-box.teal  { background: #1abc9c; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:4px">Hover each box to see the transform applied:</p>
  <div style="display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin-bottom:12px">
    <div class="t-box t-translate">translate</div>
    <div class="t-box blue t-scale">scale</div>
    <div class="t-box red t-rotate">rotate</div>
    <div class="t-box orange t-skew">skewX</div>
    <div class="t-box purple t-combo">combo</div>
  </div>

  <div style="background:#f8f9fa;padding:12px;border-radius:8px;font-size:0.78rem;color:#555">
    <p style="font-weight:700;color:#2c3e50;margin-bottom:6px">What each does:</p>
    <p style="margin:3px 0"><span style="color:#11998e;font-weight:700">translate</span> — moves the element right and up</p>
    <p style="margin:3px 0"><span style="color:#3498db;font-weight:700">scale</span> — grows the element to 1.35×</p>
    <p style="margin:3px 0"><span style="color:#e74c3c;font-weight:700">rotate</span> — spins 45° clockwise</p>
    <p style="margin:3px 0"><span style="color:#f39c12;font-weight:700">skewX</span> — shears/slants the element</p>
    <p style="margin:3px 0"><span style="color:#9b59b6;font-weight:700">combo</span> — translateY + scale + rotate chained together</p>
    <p style="margin-top:8px;color:#888">Notice other elements don't move — transform doesn't affect the layout flow!</p>
  </div>
</div>`,
    },

    {
      id: "demo-keyframes",
      label: "Keyframe Animations",
      html: `<style>
  @keyframes demo-fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes demo-slideUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes demo-spin     { to{transform:rotate(360deg)} }
  @keyframes demo-pulse    { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.12);opacity:0.75} }
  @keyframes demo-bounce   { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-20px)} 60%{transform:translateY(-10px)} }
  @keyframes demo-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes demo-shake    { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }

  .anim-card {
    background: white; border: 1px solid #e2e8f0; border-radius: 10px;
    padding: 14px; text-align: center; font-size: 0.78rem; font-weight: 700;
  }
  .anim-trigger { cursor: pointer; }
  .anim-trigger:hover .anim-icon { animation-play-state: running !important; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Hover each card to trigger its animation:</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:10px">

    <div class="anim-card anim-trigger">
      <div class="anim-icon" style="width:44px;height:44px;background:#11998e;border-radius:8px;margin:0 auto 8px;animation:demo-fadeIn 0.8s ease forwards infinite;animation-play-state:paused"></div>
      <div style="color:#11998e">fade in</div>
    </div>

    <div class="anim-card anim-trigger">
      <div class="anim-icon" style="width:44px;height:44px;background:#3498db;border-radius:8px;margin:0 auto 8px;animation:demo-slideUp 0.6s ease forwards infinite;animation-play-state:paused"></div>
      <div style="color:#3498db">slide up</div>
    </div>

    <div class="anim-card anim-trigger">
      <div class="anim-icon" style="width:40px;height:40px;border:4px solid rgba(17,153,142,0.2);border-top-color:#11998e;border-radius:50%;margin:0 auto 8px;animation:demo-spin 0.8s linear infinite;animation-play-state:paused"></div>
      <div style="color:#11998e">spinner</div>
    </div>

    <div class="anim-card anim-trigger">
      <div class="anim-icon" style="width:44px;height:44px;background:#e74c3c;border-radius:50%;margin:0 auto 8px;animation:demo-pulse 1.2s ease-in-out infinite;animation-play-state:paused"></div>
      <div style="color:#e74c3c">pulse</div>
    </div>

    <div class="anim-card anim-trigger">
      <div class="anim-icon" style="font-size:2rem;margin:0 auto 8px;width:44px;animation:demo-bounce 0.8s ease infinite;animation-play-state:paused">⚽</div>
      <div style="color:#f39c12">bounce</div>
    </div>

    <div class="anim-card anim-trigger">
      <div class="anim-icon" style="font-size:2rem;margin:0 auto 8px;width:44px;animation:demo-float 2.5s ease-in-out infinite;animation-play-state:paused">🚀</div>
      <div style="color:#9b59b6">float</div>
    </div>

    <div class="anim-card anim-trigger">
      <div class="anim-icon" style="width:44px;height:44px;background:#e74c3c;border-radius:8px;margin:0 auto 8px;border:2px solid #c0392b;animation:demo-shake 0.5s ease infinite;animation-play-state:paused"></div>
      <div style="color:#e74c3c">shake</div>
    </div>

  </div>
  <p style="color:#888;font-size:0.72rem;margin-top:12px;text-align:center">Each animation is just a @keyframes block + animation property — reusable anywhere!</p>
</div>`,
    },

    {
      id: "demo-timing",
      label: "Timing Functions",
      html: `<style>
  @keyframes timing-move { from { transform: translateX(0); } to { transform: translateX(calc(100% - 48px)); } }
  .timing-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .timing-label { width: 110px; font-size: 0.72rem; font-weight: 700; flex-shrink: 0; }
  .timing-track { flex: 1; height: 36px; background: #f0f4f8; border-radius: 8px; position: relative; overflow: hidden; cursor: pointer; }
  .timing-ball  { position: absolute; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; }
  .timing-track:hover .timing-ball { animation: timing-move 1.2s var(--easing) forwards; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:14px">Hover each track to see how timing functions feel different — same duration, different personality:</p>

  <div class="timing-row">
    <span class="timing-label" style="color:#11998e">ease (default)</span>
    <div class="timing-track" style="--easing:ease">
      <div class="timing-ball" style="background:#11998e"></div>
    </div>
  </div>
  <div class="timing-row">
    <span class="timing-label" style="color:#3498db">linear</span>
    <div class="timing-track" style="--easing:linear">
      <div class="timing-ball" style="background:#3498db"></div>
    </div>
  </div>
  <div class="timing-row">
    <span class="timing-label" style="color:#e74c3c">ease-in</span>
    <div class="timing-track" style="--easing:ease-in">
      <div class="timing-ball" style="background:#e74c3c"></div>
    </div>
  </div>
  <div class="timing-row">
    <span class="timing-label" style="color:#f39c12">ease-out</span>
    <div class="timing-track" style="--easing:ease-out">
      <div class="timing-ball" style="background:#f39c12"></div>
    </div>
  </div>
  <div class="timing-row">
    <span class="timing-label" style="color:#9b59b6">ease-in-out</span>
    <div class="timing-track" style="--easing:ease-in-out">
      <div class="timing-ball" style="background:#9b59b6"></div>
    </div>
  </div>
  <div class="timing-row">
    <span class="timing-label" style="color:#1abc9c">bounce<br><span style="font-weight:400;opacity:0.8">cubic-bezier</span></span>
    <div class="timing-track" style="--easing:cubic-bezier(0.34,1.56,0.64,1)">
      <div class="timing-ball" style="background:#1abc9c"></div>
    </div>
  </div>

  <p style="font-size:0.72rem;color:#888;margin-top:8px">Notice: ease-out feels snappy (good for entrances). ease-in feels sluggish (good for exits). The cubic-bezier overshoots — that's the satisfying bounce!</p>
</div>`,
    },

    {
      id: "demo-stagger",
      label: "Staggered Entrance",
      html: `<style>
  @keyframes stagger-in {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .stagger-card {
    background: white; border: 1px solid #e2e8f0; border-radius: 10px;
    padding: 16px; opacity: 0;
    animation: stagger-in 0.5s ease-out forwards;
  }
  .stagger-card:nth-child(1) { animation-delay: 0.0s; }
  .stagger-card:nth-child(2) { animation-delay: 0.1s; }
  .stagger-card:nth-child(3) { animation-delay: 0.2s; }
  .stagger-card:nth-child(4) { animation-delay: 0.3s; }
  .stagger-card:nth-child(5) { animation-delay: 0.4s; }
  .stagger-card:nth-child(6) { animation-delay: 0.5s; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Cards animate in one by one using animation-delay — same @keyframes, staggered timing:</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px">
    ${["Design","Develop","Test","Deploy","Monitor","Iterate"].map((l,i)=>{
      const colors=["#11998e","#3498db","#e74c3c","#f39c12","#9b59b6","#1abc9c"];
      const icons=["🎨","💻","🧪","🚀","📊","🔄"];
      return `<div class="stagger-card">
        <div style="font-size:1.5rem;margin-bottom:6px">${icons[i]}</div>
        <div style="font-weight:700;color:${colors[i]};font-size:0.82rem">${l}</div>
        <div style="color:#888;font-size:0.72rem;margin-top:3px">Step ${i+1}</div>
      </div>`;
    }).join("")}
  </div>
  <div style="background:#f0fdf4;padding:10px 14px;border-radius:8px;border-left:3px solid #11998e">
    <p style="font-size:0.75rem;color:#555;margin:0"><strong>How it works:</strong> All cards use the same <code>stagger-in</code> keyframe. Each card gets an increasing <code>animation-delay</code> (0s, 0.1s, 0.2s...) so they appear one after another. The cards start at <code>opacity: 0</code> and <code>animation-fill-mode: forwards</code> keeps them visible.</p>
  </div>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Transition Toolkit",
      description: "Build a set of reusable UI components that all use CSS transitions:",
      tasks: [
        "Create a button that lifts (translateY(-4px)) and deepens its shadow on hover — transition both in 0.2s ease",
        "Create a card that scales up slightly (scale(1.03)) on hover with a 0.25s ease transition",
        "Create a nav link with an animated underline using ::after pseudo-element — transition width from 0 to 100%",
        "Create a toggle switch look using a div that changes background-color from #ccc to #11998e on hover",
        "Experiment with different timing functions on each element and notice how the feel changes",
        "Add transition-delay: 0.05s to one element and observe the pause before it starts",
      ],
      hint: "Always put the transition property on the element's default state, not on :hover. This ensures it plays smoothly in both directions.",
    },
    {
      title: "Exercise 2: Transform Playground",
      description: "Explore all transform functions by applying them to a grid of boxes:",
      tasks: [
        "Create 6 coloured boxes in a flex row, each labelled with a transform name",
        "On hover: box 1 uses translateY(-20px), box 2 uses scale(1.4), box 3 uses rotate(180deg)",
        "Box 4 uses skewX(20deg), box 5 chains translateY(-10px) scale(1.2), box 6 uses rotate(360deg)",
        "Add transition: transform 0.3s ease to all boxes",
        "Change transform-origin on box 3 to top left and observe how the rotation pivot changes",
        "Notice that transforming any box does not push other boxes away — confirm transform is layout-independent",
      ],
      hint: "Use transform-origin: top left vs center on a rotating element to clearly see how the pivot point affects the animation.",
    },
    {
      title: "Exercise 3: @keyframes Animation Library",
      description: "Build your own reusable animation library with six named keyframe animations:",
      tasks: [
        "Write @keyframes for: fadeIn, slideUp, slideInLeft, spin, pulse, and shake",
        "Create a demo element for each animation — apply the animation with the correct duration and fill-mode",
        "Make the spinner infinite with animation-iteration-count: infinite and linear timing",
        "Use animation-delay to stagger four cards appearing with slideUp — delay each by 0.1s more than the last",
        "Add animation-direction: alternate to the pulse so it smoothly reverses instead of jumping back",
        "Apply your shake animation to a form input when it has the class .error (add/remove the class with JS)",
      ],
      hint: "Set opacity: 0 on elements that use entrance animations BEFORE the animation starts, then use animation-fill-mode: forwards so they stay visible after.",
    },
    {
      title: "Challenge: Animated Landing Page Hero",
      description: "Build a polished hero section where every element animates in on page load:",
      tasks: [
        "Create a hero section with: a tagline (h1), a subtitle (p), a CTA button, and a floating illustration (div or emoji)",
        "Animate the h1 in with slideUp — animation-delay: 0s",
        "Animate the p in with slideUp — animation-delay: 0.15s",
        "Animate the button in with fadeIn — animation-delay: 0.3s, then add a hover lift transition",
        "Apply the float animation (translateY up and down) to the illustration — make it loop infinitely with ease-in-out",
        "Add prefers-reduced-motion media query that disables all animations for users who prefer reduced motion",
        "Test the page feels polished — adjust durations and delays until the sequence feels natural and not rushed",
      ],
      hint: "The key to a great staggered entrance is keeping total animation time under 1 second. If it takes longer than that, it feels sluggish rather than elegant.",
    },
  ],
};

export default session12;