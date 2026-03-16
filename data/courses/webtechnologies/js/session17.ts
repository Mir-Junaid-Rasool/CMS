// data/courses/webtechnologies/javascript/session17.ts
import type { SessionData } from "@/types/session";

const session17: SessionData = {
  meta: {
    sessionNumber: 17,
    module: "javascript",
    moduleNumber: 3,
    title: "Events & Event Handling",
    subtitle: "Make pages respond to the user — clicks, keyboard input, form submissions, mouse movement, and more",
    duration: "2 hrs",
    color: "#A832A8",
    colorDim: "rgba(247,223,30,0.10)",
    colorMid: "rgba(247,223,30,0.22)",
    objectives: [
      "Understand the browser event model and how events flow through the DOM",
      "Add and remove event listeners with addEventListener and removeEventListener",
      "Use the event object to read click coordinates, key names, and target elements",
      "Understand event bubbling and capturing",
      "Stop propagation and prevent default browser behaviour",
      "Use event delegation to handle events on dynamic elements efficiently",
      "Handle common event types: click, input, submit, keydown, mouseover, scroll, resize",
      "Debounce and throttle expensive event handlers for performance",
    ],
    prevSession: { num: 16, title: "DOM Manipulation", href: "/courses/webtechnologies/javascript/session16" },
    nextSession: { num: 18, title: "Arrays & Array Methods", href: "/courses/webtechnologies/javascript/session18" },
  },

  topics: [
    // ── 1. WHAT IS AN EVENT ───────────────────────────────────────
    {
      id: "what-is-an-event",
      heading: "What is an Event?",
      content:
        "An event is a signal that something has happened in the browser — a user clicked a button, pressed a key, submitted a form, scrolled the page, or the browser finished loading a resource. JavaScript can listen for these signals and run code in response. This is the foundation of all interactivity on the web. The browser fires hundreds of different event types constantly — your job is to attach listeners to the ones you care about.",
      tip: "Think of events as the browser saying 'something just happened — does anyone care?' An event listener is your code raising its hand and saying 'yes, I care — run this function when that happens'.",
      table: {
        headers: ["Category", "Common Events", "Fires When…"],
        rows: [
          { cells: ["Mouse",    "click, dblclick, mouseenter, mouseleave, mousemove, mousedown, mouseup", "Mouse interacts with an element"] },
          { cells: ["Keyboard", "keydown, keyup, keypress",                                               "User presses or releases a key"] },
          { cells: ["Form",     "submit, input, change, focus, blur, reset",                              "User interacts with form elements"] },
          { cells: ["Window",   "load, DOMContentLoaded, resize, scroll, beforeunload",                   "Page or viewport changes"] },
          { cells: ["Touch",    "touchstart, touchend, touchmove",                                        "Touch screen interactions"] },
          { cells: ["Drag",     "dragstart, dragend, dragover, drop",                                     "Drag-and-drop interactions"] },
          { cells: ["Media",    "play, pause, ended, volumechange",                                        "Audio/video state changes"] },
        ],
      },
    },

    // ── 2. addEventListener ───────────────────────────────────────
    {
      id: "adding-event-listeners",
      heading: "addEventListener — The Right Way to Listen",
      content:
        "There are three ways to attach event handlers in JavaScript but only one is recommended. Inline HTML attributes (onclick=\"...\") mix HTML and JavaScript and cannot be removed programmatically. Element properties (element.onclick = fn) only allow one handler per event — assigning a second one overwrites the first. addEventListener is the correct modern approach — it separates concerns, allows multiple handlers on the same element and event, and lets you remove specific handlers later. The third argument is an options object or a boolean for capture mode.",
      warning: "Avoid inline HTML event attributes like onclick and oninput in HTML tags. They are hard to maintain, cannot be removed, and mix responsibilities. Always use addEventListener in a separate script.",
      codeExamples: [
        {
          label: "addEventListener vs the old ways",
          code: "const btn = document.querySelector('#my-btn');\n\n// ❌ Old way 1 — inline HTML (avoid)\n// <button onclick=\"handleClick()\">Click</button>\n\n// ❌ Old way 2 — element property (only one handler allowed)\nbtn.onclick = function() { console.log('First handler'); };\nbtn.onclick = function() { console.log('Second handler'); }; // OVERWRITES the first!\n\n// ✅ addEventListener — multiple handlers, removable\nbtn.addEventListener('click', function() {\n  console.log('First handler — still runs');\n});\nbtn.addEventListener('click', function() {\n  console.log('Second handler — also runs');\n});\n// Both run! addEventListener stacks, onclick overwrites.",
        },
        {
          label: "addEventListener Syntax & Options",
          code: "const btn = document.querySelector('#btn');\n\n// Syntax: element.addEventListener(eventType, handler, options)\n\n// Anonymous function\nbtn.addEventListener('click', function() {\n  console.log('Clicked!');\n});\n\n// Arrow function (most common in modern code)\nbtn.addEventListener('click', () => {\n  console.log('Clicked with arrow!');\n});\n\n// Named function — required if you want to remove it later\nfunction handleClick() {\n  console.log('Clicked with named function!');\n}\nbtn.addEventListener('click', handleClick);\n\n// Options object\nbtn.addEventListener('click', handleClick, {\n  once: true,     // auto-removes after firing once\n  capture: false, // use bubble phase (default)\n  passive: true,  // tells browser handler won't call preventDefault (performance)\n});\n\n// Remove a listener — must pass the EXACT same function reference\nbtn.removeEventListener('click', handleClick);",
        },
      ],
    },

    // ── 3. THE EVENT OBJECT ───────────────────────────────────────
    {
      id: "event-object",
      heading: "The Event Object",
      content:
        "Every event handler automatically receives an event object as its first argument. This object contains everything about what happened — what element was interacted with, where the mouse was, which key was pressed, whether modifier keys were held, and methods to control the event's behaviour. By convention this parameter is named event, e, or evt. The most important properties are target (the exact element that triggered the event), currentTarget (the element the listener is attached to), and type (the name of the event).",
      codeExamples: [
        {
          label: "Core Event Object Properties",
          code: "document.addEventListener('click', function(event) {\n  console.log(event.type);          // 'click'\n  console.log(event.target);        // element that was clicked\n  console.log(event.currentTarget); // element with the listener\n  console.log(event.timeStamp);     // ms since page load\n});\n\n// Mouse events — position\ndocument.addEventListener('mousemove', function(e) {\n  console.log(e.clientX, e.clientY); // position relative to viewport\n  console.log(e.pageX, e.pageY);     // position relative to whole page\n  console.log(e.offsetX, e.offsetY); // position relative to target element\n});\n\n// Mouse events — button and modifiers\ndocument.addEventListener('click', function(e) {\n  console.log(e.button);     // 0=left, 1=middle, 2=right\n  console.log(e.ctrlKey);    // true if Ctrl held\n  console.log(e.shiftKey);   // true if Shift held\n  console.log(e.altKey);     // true if Alt held\n  console.log(e.metaKey);    // true if Cmd (Mac) or Win key held\n});",
        },
        {
          label: "Keyboard Event Properties",
          code: "document.addEventListener('keydown', function(e) {\n  console.log(e.key);     // 'a', 'Enter', 'ArrowUp', ' ' (space)\n  console.log(e.code);    // 'KeyA', 'Enter', 'ArrowUp', 'Space'\n  console.log(e.keyCode); // deprecated number — use e.key instead\n\n  // e.key is the character/name, e.code is the physical key\n  // On an AZERTY keyboard, pressing the 'q' key:\n  //   e.key  = 'a'   (what it types)\n  //   e.code = 'KeyQ' (physical position)\n\n  // Common checks\n  if (e.key === 'Enter')   console.log('Enter pressed');\n  if (e.key === 'Escape')  console.log('Escape pressed');\n  if (e.key === 'ArrowUp') console.log('Up arrow');\n  if (e.ctrlKey && e.key === 's') {\n    e.preventDefault(); // stop browser save dialog\n    console.log('Ctrl+S — custom save handler');\n  }\n});",
        },
      ],
    },

    // ── 4. BUBBLING & CAPTURING ───────────────────────────────────
    {
      id: "bubbling-and-capturing",
      heading: "Event Bubbling & Capturing",
      content:
        "When an event fires on a deeply nested element, it doesn't just notify that element's listeners — it travels through the DOM. First the capturing phase: the event travels down from the window to the target element. Then the target phase: the event fires on the element that was actually interacted with. Then the bubbling phase: the event travels back up through every ancestor to the window. By default, addEventListener listens in the bubble phase. Most events bubble — exceptions include focus, blur, and scroll. Understanding bubbling is critical for event delegation.",
      tip: "Bubbling is your friend — it's the mechanism behind event delegation. Instead of attaching 100 listeners to 100 list items, attach one listener to the parent ul and let clicks bubble up to it.",
      codeExamples: [
        {
          label: "Bubbling in Action",
          code: "// HTML structure:\n// <div id=\"grandparent\">\n//   <div id=\"parent\">\n//     <button id=\"child\">Click me</button>\n//   </div>\n// </div>\n\ndocument.querySelector('#grandparent').addEventListener('click', () => {\n  console.log('3. Grandparent heard the click');\n});\ndocument.querySelector('#parent').addEventListener('click', () => {\n  console.log('2. Parent heard the click');\n});\ndocument.querySelector('#child').addEventListener('click', () => {\n  console.log('1. Child — the actual target');\n});\n\n// Clicking the button logs:\n// 1. Child — the actual target\n// 2. Parent heard the click\n// 3. Grandparent heard the click\n// The event BUBBLED up from child → parent → grandparent",
        },
        {
          label: "stopPropagation & preventDefault",
          code: "const inner = document.querySelector('.inner');\nconst outer = document.querySelector('.outer');\n\n// stopPropagation — stop the event from travelling further\ninner.addEventListener('click', function(e) {\n  e.stopPropagation(); // outer's listener will NOT fire\n  console.log('Inner clicked — bubble stopped here');\n});\n\nouter.addEventListener('click', function() {\n  console.log('This will NOT run if inner was clicked');\n});\n\n// preventDefault — stop the browser's default action\nconst link = document.querySelector('a#nav-link');\nlink.addEventListener('click', function(e) {\n  e.preventDefault(); // stops navigation\n  console.log('Link clicked but page did NOT navigate');\n  // Now handle navigation your own way\n});\n\nconst form = document.querySelector('form');\nform.addEventListener('submit', function(e) {\n  e.preventDefault(); // stops page reload\n  console.log('Form submitted — handling with JavaScript');\n  // Now validate and send data with fetch()\n});\n\n// stopImmediatePropagation — also prevents OTHER listeners\n// on the SAME element from running\nelement.addEventListener('click', (e) => {\n  e.stopImmediatePropagation();\n});",
        },
      ],
    },

    // ── 5. EVENT DELEGATION ───────────────────────────────────────
    {
      id: "event-delegation",
      heading: "Event Delegation — One Listener, Many Elements",
      content:
        "Event delegation is a pattern that takes advantage of bubbling. Instead of adding an event listener to every individual element, you add one listener to a common ancestor and use the event.target property to determine which child was actually interacted with. This is far more efficient when you have many similar elements, and it automatically works for elements added to the DOM dynamically after the listener was set up — something that is impossible with direct listeners.",
      tip: "Event delegation is the standard pattern for lists, tables, card grids, and any repeating UI. Always use it when you have more than a handful of similar interactive elements.",
      codeExamples: [
        {
          label: "Without Delegation vs With Delegation",
          code: "// ❌ Without delegation — one listener per button (wasteful)\nconst buttons = document.querySelectorAll('.action-btn');\nbuttons.forEach(btn => {\n  btn.addEventListener('click', handleClick);\n});\n// Problem: if you add new buttons to the DOM later,\n// they won't have listeners!\n\n// ✅ With delegation — one listener on the parent\nconst container = document.querySelector('#button-container');\ncontainer.addEventListener('click', function(e) {\n  // Check if the click landed on (or inside) an action button\n  const btn = e.target.closest('.action-btn');\n  if (!btn) return; // click was on the container itself, not a button\n\n  console.log('Button clicked:', btn.dataset.action);\n  // Works for ALL buttons — including ones added later!\n});",
        },
        {
          label: "Delegation on a To-Do List",
          code: "const todoList = document.querySelector('#todo-list');\n\n// One listener handles clicks on ALL items and ALL buttons\ntodoList.addEventListener('click', function(e) {\n  // Which todo item contains the clicked element?\n  const item = e.target.closest('.todo-item');\n  if (!item) return;\n\n  // What was specifically clicked inside the item?\n  if (e.target.closest('.complete-btn')) {\n    item.classList.toggle('completed');\n    console.log('Toggled complete for:', item.dataset.id);\n    return;\n  }\n\n  if (e.target.closest('.delete-btn')) {\n    item.remove();\n    console.log('Deleted item:', item.dataset.id);\n    return;\n  }\n\n  if (e.target.closest('.edit-btn')) {\n    const text = item.querySelector('.todo-text');\n    text.contentEditable = 'true';\n    text.focus();\n    return;\n  }\n});\n\n// New items added to todoList AUTOMATICALLY work — no extra listeners needed",
        },
      ],
    },

    // ── 6. COMMON EVENT TYPES ─────────────────────────────────────
    {
      id: "common-events",
      heading: "Common Event Types in Depth",
      content:
        "Different event types expose different properties and have different default behaviours. Mouse events give you coordinates and button info. Keyboard events give you the key name. Form events have their own lifecycle — input fires on every character change, change fires only when focus leaves the field, and submit fires on form submission. The DOMContentLoaded event is critical for ensuring your script runs only after the HTML has been parsed.",
      codeExamples: [
        {
          label: "Form Events — input, change, submit, focus, blur",
          code: "const input = document.querySelector('#search-input');\nconst form  = document.querySelector('#search-form');\n\n// input — fires on EVERY keystroke / paste\ninput.addEventListener('input', function(e) {\n  console.log('Current value:', e.target.value); // live update\n  // Perfect for live search, character counters\n});\n\n// change — fires when value changes AND focus leaves the field\ninput.addEventListener('change', function(e) {\n  console.log('Committed value:', e.target.value);\n  // Good for select dropdowns and checkboxes\n});\n\n// focus — element received keyboard focus\ninput.addEventListener('focus', function() {\n  input.parentElement.classList.add('focused');\n});\n\n// blur — element lost focus\ninput.addEventListener('blur', function() {\n  input.parentElement.classList.remove('focused');\n  // Great place to validate the field value\n  if (!input.value.trim()) {\n    input.classList.add('error');\n  }\n});\n\n// submit — fired on the FORM, not the button\nform.addEventListener('submit', function(e) {\n  e.preventDefault(); // ALWAYS prevent default on forms\n  const data = new FormData(form);\n  console.log('Name:', data.get('name'));\n  console.log('Email:', data.get('email'));\n});",
        },
        {
          label: "Scroll & Resize Events",
          code: "// scroll — fires continuously while scrolling\nwindow.addEventListener('scroll', function() {\n  const scrollY = window.scrollY; // pixels scrolled from top\n  const navbar = document.querySelector('nav');\n  if (scrollY > 80) {\n    navbar.classList.add('scrolled');\n  } else {\n    navbar.classList.remove('scrolled');\n  }\n});\n\n// How far down the page are we? (0 to 1)\nfunction getScrollPercent() {\n  const scrolled = document.documentElement.scrollTop;\n  const total = document.documentElement.scrollHeight\n              - document.documentElement.clientHeight;\n  return scrolled / total;\n}\n\n// resize — fires when browser window is resized\nwindow.addEventListener('resize', function() {\n  console.log('Width:', window.innerWidth);\n  console.log('Height:', window.innerHeight);\n  // Recalculate layout, update charts, etc.\n});\n\n// DOMContentLoaded — HTML parsed, DOM ready (no need to wait for images)\ndocument.addEventListener('DOMContentLoaded', function() {\n  console.log('DOM is ready — safe to query elements now');\n  // All querySelector calls are safe here\n});\n\n// load — everything loaded including images, stylesheets\nwindow.addEventListener('load', function() {\n  console.log('All resources finished loading');\n});",
        },
        {
          label: "Mouse & Pointer Events",
          code: "const card = document.querySelector('.card');\n\n// mouseenter / mouseleave — do NOT bubble (better for hover)\ncard.addEventListener('mouseenter', () => card.classList.add('hovered'));\ncard.addEventListener('mouseleave', () => card.classList.remove('hovered'));\n\n// mouseover / mouseout — DO bubble (fires for child elements too)\n// Use mouseenter/mouseleave when you don't want child triggers\n\n// Track mouse position relative to an element\ncard.addEventListener('mousemove', function(e) {\n  const rect = card.getBoundingClientRect();\n  const x = e.clientX - rect.left; // x relative to card\n  const y = e.clientY - rect.top;  // y relative to card\n  card.style.setProperty('--mouse-x', x + 'px');\n  card.style.setProperty('--mouse-y', y + 'px');\n});\n\n// contextmenu — right click\ndocument.addEventListener('contextmenu', function(e) {\n  e.preventDefault(); // stop browser context menu\n  showCustomMenu(e.clientX, e.clientY);\n});",
        },
      ],
    },

    // ── 7. DEBOUNCE & THROTTLE ────────────────────────────────────
    {
      id: "debounce-throttle",
      heading: "Debounce & Throttle — Performance for Frequent Events",
      content:
        "Some events fire extremely rapidly — scroll can fire dozens of times per second, mousemove hundreds of times. Running expensive code (API calls, DOM updates, complex calculations) on every single event would crush performance. Debounce delays execution until the event has stopped firing for a set period — perfect for search inputs where you only want to search after the user pauses typing. Throttle limits how often a function can run — perfect for scroll handlers where you want updates at a consistent rate but not on every single pixel.",
      tip: "Rule of thumb: debounce for search inputs and form validation (run after the user stops). Throttle for scroll and resize handlers (run at a steady rate during continuous events).",
      codeExamples: [
        {
          label: "Debounce — Wait Until They Stop",
          code: "// Debounce: only call fn after delay ms of silence\nfunction debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer); // cancel the previous timer\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst searchInput = document.querySelector('#search');\n\nfunction searchAPI(query) {\n  console.log('Searching for:', query);\n  // fetch('/api/search?q=' + query)...\n}\n\n// Without debounce: searchAPI fires on EVERY keystroke\n// searchInput.addEventListener('input', e => searchAPI(e.target.value));\n\n// With debounce: searchAPI only fires 400ms after typing stops\nconst debouncedSearch = debounce(searchAPI, 400);\nsearchInput.addEventListener('input', e => debouncedSearch(e.target.value));\n\n// User types 'javascript' (10 keystrokes) — searchAPI called ONCE",
        },
        {
          label: "Throttle — Limit the Rate",
          code: "// Throttle: call fn at most once per interval ms\nfunction throttle(fn, interval) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= interval) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\nfunction updateScrollUI() {\n  const scrollY = window.scrollY;\n  const navbar = document.querySelector('nav');\n  navbar.classList.toggle('scrolled', scrollY > 80);\n\n  // Update progress bar\n  const total = document.documentElement.scrollHeight - window.innerHeight;\n  const progress = (scrollY / total) * 100;\n  document.querySelector('.progress').style.width = progress + '%';\n}\n\n// Without throttle: runs hundreds of times while scrolling\n// window.addEventListener('scroll', updateScrollUI);\n\n// With throttle: runs at most once every 100ms\nconst throttledScroll = throttle(updateScrollUI, 100);\nwindow.addEventListener('scroll', throttledScroll);",
        },
      ],
    },

    // ── 8. CUSTOM EVENTS ─────────────────────────────────────────
    {
      id: "custom-events",
      heading: "Custom Events — Components Talking to Each Other",
      content:
        "JavaScript lets you create and dispatch your own custom events using the CustomEvent constructor. This is a clean way for different parts of your application to communicate without being tightly coupled — one component dispatches an event when something happens, and any other component that cares can listen for it. Custom events bubble just like native events, and you can attach any data to them through the detail property.",
      codeExamples: [
        {
          label: "Creating & Dispatching Custom Events",
          code: "// Create a custom event with data\nconst cartEvent = new CustomEvent('cart:itemAdded', {\n  bubbles: true,   // let it bubble up the DOM\n  detail: {\n    productId: 42,\n    name: 'Wireless Headphones',\n    price: 2499,\n    quantity: 1\n  }\n});\n\n// Dispatch from any element — it bubbles up\nconst addBtn = document.querySelector('#add-to-cart');\naddBtn.dispatchEvent(cartEvent);\n\n// Listen anywhere up the tree\ndocument.addEventListener('cart:itemAdded', function(e) {\n  console.log('Item added:', e.detail.name);\n  console.log('Price:', e.detail.price);\n  updateCartBadge(e.detail.quantity);\n  showToast('Added to cart: ' + e.detail.name);\n});\n\n// Practical pattern — helper function\nfunction emitEvent(element, name, data) {\n  element.dispatchEvent(new CustomEvent(name, {\n    bubbles: true,\n    detail: data\n  }));\n}\n\n// Usage\nemitEvent(addBtn, 'cart:itemAdded', { productId: 42, price: 2499 });",
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-event-types",
      label: "Event Types",
      html: `<style>
  .ev-log { background: #1e1e1e; color: #d4d4d4; border-radius: 10px; padding: 12px 14px; font-family: 'Courier New', monospace; font-size: 0.72rem; min-height: 80px; max-height: 140px; overflow-y: auto; }
  .ev-zone { border: 2px dashed #e5e7eb; border-radius: 10px; padding: 14px; text-align: center; cursor: pointer; transition: all 0.2s; user-select: none; font-size: 0.82rem; font-family: sans-serif; }
  .ev-zone:hover { border-color: #11998e; background: #f0fdf4; }
  .ev-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .ev-btn { padding: 9px 16px; border: none; border-radius: 8px; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: transform 0.1s; }
  .ev-btn:active { transform: scale(0.95); }
  .tag { display: inline-block; padding: 1px 7px; border-radius: 10px; font-size: 0.68rem; font-weight: 700; margin-right: 4px; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:10px">Interact with the elements — watch live events log below:</p>

  <div class="ev-row">
    <div class="ev-zone" id="click-zone" style="flex:1"
      onclick="addLog('click','click','#11998e')"
      ondblclick="addLog('dblclick','dblclick','#3498db')"
      oncontextmenu="event.preventDefault();addLog('contextmenu','right click','#9b59b6')">
      🖱️ Click / Double-click / Right-click me
    </div>
    <div class="ev-zone" id="hover-zone" style="flex:1"
      onmouseenter="addLog('mouseenter','mouse entered','#f39c12')"
      onmouseleave="addLog('mouseleave','mouse left','#e74c3c')">
      🌊 Hover in and out
    </div>
  </div>

  <div style="margin-bottom:10px">
    <input id="ev-input" type="text" placeholder="⌨️  Type here to see keyboard and input events…"
      style="width:100%;padding:9px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:0.8rem;box-sizing:border-box"
      oninput="addLog('input','input: &quot;'+this.value+'&quot;','#11998e')"
      onfocus="addLog('focus','input focused','#3498db')"
      onblur="addLog('blur','input blurred','#6b7280')"
      onkeydown="addLog('keydown','key: '+event.key,'#9b59b6')">
  </div>

  <div style="display:flex;gap:8px;margin-bottom:10px">
    <button class="ev-btn" style="background:#11998e;color:white;flex:1"
      id="once-btn">🔂 Once only (fires one time)</button>
    <button class="ev-btn" style="background:#e74c3c;color:white"
      onclick="document.getElementById('ev-log').innerHTML='<span style=&quot;color:#6a9955&quot;>// cleared</span>'">
      Clear log
    </button>
  </div>

  <div id="ev-log" class="ev-log"><span style="color:#6a9955">// events will appear here…</span></div>

  <script>
    let logCount = 0;
    function addLog(type, detail, color) {
      logCount++;
      const log = document.getElementById('ev-log');
      const line = document.createElement('div');
      const colors = { click:'#11998e', dblclick:'#3498db', mouseenter:'#f39c12', mouseleave:'#e74c3c', input:'#11998e', focus:'#3498db', blur:'#6b7280', keydown:'#9b59b6', contextmenu:'#9b59b6' };
      line.innerHTML = '<span style="color:#569cd6">#' + logCount + '</span> <span style="color:' + color + ';font-weight:700">' + type + '</span> <span style="color:#d4d4d4">— ' + detail + '</span>';
      log.insertBefore(line, log.firstChild);
    }
    document.getElementById('once-btn').addEventListener('click', function handler() {
      addLog('click','this button only fires ONCE (once:true option)','#f39c12');
      this.style.opacity = '0.4';
      this.textContent = '✓ Already fired — disabled';
      this.removeEventListener('click', handler);
    });
  </script>
</div>`,
    },

    {
      id: "demo-bubbling",
      label: "Bubbling",
      html: `<style>
  .bubble-box {
    border-radius: 12px; padding: 16px; cursor: pointer;
    transition: all 0.15s; user-select: none; font-family: sans-serif;
    font-size: 0.78rem; font-weight: 700;
  }
  .bubble-box:active { transform: scale(0.98); }
  .bubble-log { background: #1e1e1e; color: #d4d4d4; border-radius: 8px; padding: 10px 13px; font-family: 'Courier New', monospace; font-size: 0.72rem; min-height: 60px; max-height: 120px; overflow-y: auto; margin-top: 10px; }
  .flash { animation: bflash 0.4s ease; }
  @keyframes bflash { 0%,100%{filter:none} 50%{filter:brightness(1.4)} }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:10px">Click the innermost box — watch the event bubble outward:</p>

  <div class="bubble-box" id="b-grand" style="background:#fef9c3;border:2px solid #fde047;color:#92400e">
    🟡 Grandparent (outermost)
    <div class="bubble-box" id="b-parent" style="background:#dbeafe;border:2px solid #93c5fd;color:#1e3a8a;margin-top:10px">
      🔵 Parent
      <div class="bubble-box" id="b-child" style="background:#dcfce7;border:2px solid #86efac;color:#14532d;margin-top:10px;text-align:center">
        🟢 Child — Click ME
      </div>
    </div>
  </div>

  <div style="display:flex;gap:8px;margin-top:10px">
    <button style="padding:6px 14px;background:#e74c3c;color:white;border:none;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer"
      id="stop-toggle" onclick="
        window._stopProp = !window._stopProp;
        this.textContent = window._stopProp ? '✓ stopPropagation ON — bubble blocked' : 'stopPropagation OFF';
        this.style.background = window._stopProp ? '#166534' : '#e74c3c';
      ">stopPropagation OFF</button>
    <button style="padding:6px 14px;background:#6b7280;color:white;border:none;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer"
      onclick="document.getElementById('bubble-log').innerHTML='<span style=&quot;color:#6a9955&quot;>// cleared</span>'">Clear</button>
  </div>

  <div id="bubble-log" class="bubble-log"><span style="color:#6a9955">// Click the green box to start…</span></div>

  <script>
    window._stopProp = false;
    let bCount = 0;
    function blogEntry(label, color, stopped) {
      bCount++;
      const log = document.getElementById('bubble-log');
      const line = document.createElement('div');
      line.innerHTML = '<span style="color:#569cd6">#' + bCount + '</span> <span style="color:' + color + ';font-weight:700">' + label + '</span>' + (stopped ? ' <span style="color:#ef4444">← STOPPED HERE</span>' : '');
      log.insertBefore(line, log.firstChild);
    }
    document.getElementById('b-child').addEventListener('click', function(e) {
      document.getElementById('b-child').classList.add('flash');
      setTimeout(()=>document.getElementById('b-child').classList.remove('flash'),400);
      blogEntry('🟢 Child fired', '#22c55e');
      if (window._stopProp) { e.stopPropagation(); blogEntry('  stopPropagation called', '#ef4444', true); }
    });
    document.getElementById('b-parent').addEventListener('click', function(e) {
      if (e.target === e.currentTarget || !window._stopProp) {
        document.getElementById('b-parent').classList.add('flash');
        setTimeout(()=>document.getElementById('b-parent').classList.remove('flash'),400);
        blogEntry('🔵 Parent heard bubble', '#3b82f6');
      }
    });
    document.getElementById('b-grand').addEventListener('click', function(e) {
      if (e.target !== document.getElementById('b-parent') && e.target !== document.getElementById('b-grand')) {
        document.getElementById('b-grand').classList.add('flash');
        setTimeout(()=>document.getElementById('b-grand').classList.remove('flash'),400);
        blogEntry('🟡 Grandparent heard bubble', '#ca8a04');
      }
    });
  </script>
</div>`,
    },

    {
      id: "demo-delegation",
      label: "Event Delegation",
      html: `<style>
  .del-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 14px;
    background: white; border: 1px solid #e5e7eb; border-radius: 8px;
    margin-bottom: 6px; transition: all 0.2s; font-family: sans-serif; font-size: 0.8rem;
  }
  .del-item.completed .del-text { text-decoration: line-through; color: #9ca3af; }
  .del-item.completed { background: #f9fafb; }
  .del-text { flex: 1; }
  .del-btn { padding: 4px 10px; border: none; border-radius: 5px; font-size: 0.7rem; font-weight: 700; cursor: pointer; }
  .complete-btn { background: #dcfce7; color: #166534; }
  .delete-btn  { background: #fee2e2; color: #991b1b; }
  .del-log { background: #1e1e1e; color: #d4d4d4; border-radius: 8px; padding: 9px 12px; font-family: 'Courier New', monospace; font-size: 0.7rem; margin-top: 10px; min-height: 50px; }
  .listener-badge { display:inline-block; background:#f7df1e; color:#1a1a1a; border-radius:5px; padding:2px 8px; font-size:0.7rem; font-weight:800; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:6px">
    <span class="listener-badge">1 listener</span> on the parent handles ALL items — including new ones added dynamically:
  </p>

  <div id="del-list" style="margin-bottom:10px">
    <div class="del-item" data-id="1"><span class="del-text">Buy groceries</span><button class="del-btn complete-btn">✓ Done</button><button class="del-btn delete-btn">✕ Del</button></div>
    <div class="del-item" data-id="2"><span class="del-text">Write session notes</span><button class="del-btn complete-btn">✓ Done</button><button class="del-btn delete-btn">✕ Del</button></div>
    <div class="del-item" data-id="3"><span class="del-text">Review pull request</span><button class="del-btn complete-btn">✓ Done</button><button class="del-btn delete-btn">✕ Del</button></div>
  </div>

  <div style="display:flex;gap:8px;margin-bottom:10px">
    <input id="del-input" placeholder="Add new task…" style="flex:1;padding:8px 12px;border:1px solid #d1d5db;border-radius:7px;font-size:0.78rem">
    <button id="del-add" style="padding:8px 16px;background:#11998e;color:white;border:none;border-radius:7px;font-weight:700;cursor:pointer;font-size:0.78rem">Add</button>
  </div>

  <div id="del-log" class="del-log"><span style="color:#6a9955">// delegation log — click any button</span></div>

  <script>
    let delId = 4;
    function delLog(msg, color) {
      const log = document.getElementById('del-log');
      const d = document.createElement('div');
      d.innerHTML = '<span style="color:' + (color||'#d4d4d4') + '">' + msg + '</span>';
      log.insertBefore(d, log.firstChild);
    }

    // THE ONE LISTENER — handles everything
    document.getElementById('del-list').addEventListener('click', function(e) {
      const item = e.target.closest('.del-item');
      if (!item) return;
      if (e.target.closest('.complete-btn')) {
        item.classList.toggle('completed');
        delLog('✓ Toggled complete on item #' + item.dataset.id, '#22c55e');
      } else if (e.target.closest('.delete-btn')) {
        delLog('✕ Deleted item #' + item.dataset.id, '#ef4444');
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'all 0.2s';
        setTimeout(() => item.remove(), 200);
      }
    });

    // Add new item — delegation handles it automatically
    document.getElementById('del-add').addEventListener('click', function() {
      const input = document.getElementById('del-input');
      const text = input.value.trim();
      if (!text) return;
      const id = delId++;
      const item = document.createElement('div');
      item.className = 'del-item';
      item.dataset.id = id;
      item.innerHTML = '<span class="del-text">' + text + '</span><button class="del-btn complete-btn">✓ Done</button><button class="del-btn delete-btn">✕ Del</button>';
      document.getElementById('del-list').append(item);
      delLog('+ Added item #' + id + ' — delegate works immediately!', '#f7df1e');
      input.value = '';
    });
  </script>
</div>`,
    },

    {
      id: "demo-form-events",
      label: "Form Events",
      html: `<style>
  .form-field { margin-bottom: 14px; }
  .form-label { display: block; font-weight: 700; font-size: 0.78rem; color: #374151; margin-bottom: 5px; }
  .form-input {
    width: 100%; padding: 9px 13px; border: 2px solid #e5e7eb; border-radius: 8px;
    font-size: 0.8rem; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box;
  }
  .form-input:focus  { outline: none; border-color: #11998e; box-shadow: 0 0 0 3px rgba(17,153,142,0.15); }
  .form-input.error  { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.15); }
  .form-input.valid  { border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.15); }
  .field-hint { font-size: 0.7rem; margin-top: 4px; min-height: 16px; }
  .char-bar { height: 4px; border-radius: 2px; transition: width 0.2s, background 0.2s; margin-top: 4px; }
  .submit-btn { width: 100%; padding: 10px; background: #11998e; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: opacity 0.2s; }
  .submit-btn:hover { opacity: 0.9; }
  .form-output { background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 10px 14px; font-family: 'Courier New', monospace; font-size: 0.72rem; color: #166534; margin-top: 10px; display: none; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Live form validation — every field uses different event types:</p>

  <form id="demo-form" novalidate>
    <div class="form-field">
      <label class="form-label">Name <span style="color:#9ca3af">(input event — live)</span></label>
      <input class="form-input" id="f-name" type="text" placeholder="At least 2 characters">
      <div class="field-hint" id="f-name-hint" style="color:#9ca3af">Start typing…</div>
    </div>

    <div class="form-field">
      <label class="form-label">Email <span style="color:#9ca3af">(blur event — on leave)</span></label>
      <input class="form-input" id="f-email" type="email" placeholder="user@example.com">
      <div class="field-hint" id="f-email-hint" style="color:#9ca3af">Validated when you leave the field</div>
    </div>

    <div class="form-field">
      <label class="form-label">Message <span style="color:#9ca3af">(character counter)</span></label>
      <textarea class="form-input" id="f-msg" rows="3" placeholder="Max 100 characters" style="resize:vertical"></textarea>
      <div class="char-bar" id="f-char-bar" style="width:0%;background:#11998e"></div>
      <div class="field-hint" id="f-char-hint" style="color:#9ca3af">0 / 100 characters</div>
    </div>

    <button type="submit" class="submit-btn">Submit Form</button>
  </form>

  <div class="form-output" id="form-output"></div>

  <script>
    // Name — live validation on input event
    document.getElementById('f-name').addEventListener('input', function() {
      const hint = document.getElementById('f-name-hint');
      const val = this.value.trim();
      if (val.length === 0) {
        this.className = 'form-input';
        hint.textContent = 'Start typing…';
        hint.style.color = '#9ca3af';
      } else if (val.length < 2) {
        this.className = 'form-input error';
        hint.textContent = '✗ Too short — at least 2 characters';
        hint.style.color = '#ef4444';
      } else {
        this.className = 'form-input valid';
        hint.textContent = '✓ Looks good!';
        hint.style.color = '#22c55e';
      }
    });

    // Email — validate on blur event (when user leaves field)
    document.getElementById('f-email').addEventListener('blur', function() {
      const hint = document.getElementById('f-email-hint');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.value) {
        this.className = 'form-input error';
        hint.textContent = '✗ Email is required';
        hint.style.color = '#ef4444';
      } else if (!emailRegex.test(this.value)) {
        this.className = 'form-input error';
        hint.textContent = '✗ Please enter a valid email address';
        hint.style.color = '#ef4444';
      } else {
        this.className = 'form-input valid';
        hint.textContent = '✓ Valid email!';
        hint.style.color = '#22c55e';
      }
    });
    document.getElementById('f-email').addEventListener('focus', function() {
      if (!this.classList.contains('valid')) {
        this.className = 'form-input';
        document.getElementById('f-email-hint').textContent = 'Validated when you leave the field';
        document.getElementById('f-email-hint').style.color = '#9ca3af';
      }
    });

    // Message — character counter on input event
    document.getElementById('f-msg').addEventListener('input', function() {
      const max = 100;
      const len = this.value.length;
      const pct = Math.min(len / max * 100, 100);
      const bar = document.getElementById('f-char-bar');
      const hint = document.getElementById('f-char-hint');
      bar.style.width = pct + '%';
      bar.style.background = pct < 60 ? '#11998e' : pct < 85 ? '#f39c12' : '#ef4444';
      hint.textContent = len + ' / ' + max + ' characters' + (len > max ? ' — too long!' : '');
      hint.style.color = len > max ? '#ef4444' : '#6b7280';
      this.className = 'form-input' + (len > max ? ' error' : len > 0 ? ' valid' : '');
    });

    // Submit — preventDefault + collect data
    document.getElementById('demo-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const out = document.getElementById('form-output');
      out.style.display = 'block';
      out.innerHTML =
        '✓ e.preventDefault() — no page reload<br>' +
        'name: "' + document.getElementById('f-name').value + '"<br>' +
        'email: "' + document.getElementById('f-email').value + '"<br>' +
        'message: "' + document.getElementById('f-msg').value.substring(0,40) + (document.getElementById('f-msg').value.length > 40 ? '…' : '') + '"';
    });
  </script>
</div>`,
    },

    {
      id: "demo-debounce",
      label: "Debounce & Throttle",
      html: `<style>
  .perf-box { background: #f8f9fa; border-radius: 10px; padding: 14px; margin-bottom: 10px; font-family: sans-serif; }
  .perf-bar-wrap { height: 8px; background: #e5e7eb; border-radius: 4px; margin: 8px 0; }
  .perf-bar { height: 100%; border-radius: 4px; transition: width 0.1s; }
  .count-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-weight: 800; font-size: 0.75rem; font-family: 'Courier New', monospace; }
  .perf-input { width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 7px; font-size: 0.8rem; box-sizing: border-box; margin-bottom: 8px; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Type fast — compare raw vs debounced call counts:</p>

  <input class="perf-input" id="perf-input" placeholder="Type quickly here to see the difference…">

  <div class="perf-box">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <span style="font-weight:700;color:#e74c3c;font-size:0.78rem">⚡ Without debounce (fires on EVERY keystroke)</span>
      <span class="count-badge" id="raw-count" style="background:#fee2e2;color:#991b1b">0 calls</span>
    </div>
    <div class="perf-bar-wrap"><div class="perf-bar" id="raw-bar" style="width:0%;background:#ef4444"></div></div>
    <div style="font-size:0.72rem;color:#9ca3af" id="raw-last">last call: —</div>
  </div>

  <div class="perf-box">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <span style="font-weight:700;color:#11998e;font-size:0.78rem">🛡️ With debounce (fires 400ms after you stop)</span>
      <span class="count-badge" id="deb-count" style="background:#dcfce7;color:#166534">0 calls</span>
    </div>
    <div class="perf-bar-wrap"><div class="perf-bar" id="deb-bar" style="width:0%;background:#11998e"></div></div>
    <div style="font-size:0.72rem;color:#9ca3af" id="deb-last">last call: —</div>
  </div>

  <div style="background:#f0f9ff;border-left:3px solid #38bdf8;padding:9px 13px;border-radius:0 8px 8px 0;font-size:0.75rem;color:#0c4a6e">
    <strong>API call savings:</strong> If you type a 10-character search query, debounce sends <strong>1 API request</strong> instead of 10. At scale, that is a 90% reduction in server load.
  </div>

  <script>
    let rawCalls = 0, debCalls = 0;
    function debounce(fn, d) {
      let t;
      return function(...a) { clearTimeout(t); t = setTimeout(() => fn(...a), d); };
    }
    document.getElementById('perf-input').addEventListener('input', function() {
      rawCalls++;
      const rc = document.getElementById('raw-count');
      const rb = document.getElementById('raw-bar');
      rc.textContent = rawCalls + ' calls';
      rb.style.width = Math.min(rawCalls * 5, 100) + '%';
      document.getElementById('raw-last').textContent = 'last call: "' + this.value + '"';
    });
    const debouncedFn = debounce(function(val) {
      debCalls++;
      const dc = document.getElementById('deb-count');
      const db = document.getElementById('deb-bar');
      dc.textContent = debCalls + ' calls';
      db.style.width = Math.min(debCalls * 25, 100) + '%';
      document.getElementById('deb-last').textContent = 'last call: "' + val + '"';
    }, 400);
    document.getElementById('perf-input').addEventListener('input', function() {
      debouncedFn(this.value);
    });
  </script>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Event Listener Fundamentals",
      description: "Build confidence with addEventListener and the event object:",
      tasks: [
        "Add a click listener to a button that logs event.target, event.type, and event.timeStamp",
        "Add two separate click listeners to the same button — verify both run (proving addEventListener stacks)",
        "Add a click listener with { once: true } — click the button three times and confirm it only fires once",
        "Add a keydown listener to the document — log e.key for every keypress, and show an alert when Escape is pressed",
        "Add a mousemove listener to a div — update a paragraph inside it to show the current x and y coordinates",
        "Use removeEventListener to remove a named handler after it has fired 5 times — use a counter in a closure",
      ],
      hint: "For removeEventListener to work, you must pass the exact same function reference you passed to addEventListener. Arrow functions stored in variables work — anonymous functions passed directly cannot be removed.",
    },
    {
      title: "Exercise 2: Bubbling, Capturing & Preventing Defaults",
      description: "Explore how events travel through the DOM:",
      tasks: [
        "Create three nested divs — add a click listener to each and verify events bubble from inner to outer",
        "Add stopPropagation() to the middle div's click handler — verify the outer div's listener no longer fires",
        "Add a click listener to a link and call preventDefault() — verify the browser does not navigate",
        "Build a modal: clicking outside the modal content (on the backdrop) should close it — use event.target === backdrop check",
        "Add a form with a submit button — prevent default, collect the input values with FormData, and log them as an object",
        "Experiment with { capture: true } — add a capturing listener to the outer div and observe it fires BEFORE the inner div's bubble listener",
      ],
      hint: "For the modal backdrop close: give the backdrop a click listener that checks if (event.target === backdropElement) before closing — this prevents closing when the user clicks inside the modal content.",
    },
    {
      title: "Exercise 3: Event Delegation",
      description: "Build a dynamic list managed entirely through a single delegated listener:",
      tasks: [
        "Create an empty ul with no li elements in the HTML — add items dynamically with JavaScript",
        "Add one click listener to the ul that handles three button types inside each li: complete, delete, and edit",
        "For complete: toggle a 'done' class on the li (CSS adds strikethrough). For delete: animate out then remove. For edit: make the text contentEditable",
        "Add a form above the list — on submit, create a new li with the input text and append to ul — verify the delegated listener handles new items immediately",
        "Use dataset on each li to store a unique id — log the id whenever an action is taken",
        "Add a 'Delete All Completed' button outside the list — remove all li elements that have the 'done' class",
      ],
      hint: "Use closest() inside the delegated handler: const item = e.target.closest('li'); if (!item) return; — this safely gets the li ancestor regardless of which part of the li was clicked.",
    },
    {
      title: "Challenge: Interactive Dashboard with Events",
      description: "Build a mini analytics dashboard with rich event handling:",
      tasks: [
        "Build a page with: a live search bar, a data table of 10 students (name, subject, score), a sort toggle button, and a theme switcher",
        "Live search: debounce the input event at 300ms — filter table rows whose name or subject matches the query",
        "Sort: clicking the score header toggles between ascending and descending — re-render the sorted rows",
        "Theme: a toggle button dispatches a custom event 'theme:change' with detail: { theme: 'dark'|'light' } — a listener on the document applies the class to body",
        "Row click: clicking any table row highlights it and shows a details panel below the table with all the student's data",
        "Keyboard: pressing Escape clears the search and collapses the details panel — pressing T toggles the theme",
      ],
      hint: "For the custom theme event: document.dispatchEvent(new CustomEvent('theme:change', { detail: { theme: current === 'dark' ? 'light' : 'dark' } })). Listen with document.addEventListener('theme:change', e => document.body.classList.toggle('dark', e.detail.theme === 'dark')).",
    },
  ],
};

export default session17;