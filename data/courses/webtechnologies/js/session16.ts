// data/courses/webtechnologies/javascript/session16.ts
import type { SessionData } from "@/types/session";

const session16: SessionData = {
  meta: {
    sessionNumber: 16,
    module: "javascript",
    moduleNumber: 3,
    title: "DOM Manipulation",
    subtitle: "Learn to read, create, and modify HTML elements with JavaScript — making pages dynamic and interactive in real time",
    duration: "2 hrs",
    color: "008000",
    colorDim: "rgba(247,223,30,0.10)",
    colorMid: "rgba(247,223,30,0.22)",
    objectives: [
      "Understand what the DOM is and how it represents an HTML page as a tree",
      "Select elements using getElementById, querySelector, and querySelectorAll",
      "Read and change element content with textContent, innerHTML, and value",
      "Read and modify CSS styles using style and classList",
      "Create, insert, and remove elements dynamically",
      "Read and set HTML attributes with getAttribute, setAttribute, and dataset",
      "Traverse the DOM tree using parent, child, and sibling relationships",
      "Understand when to use innerHTML vs createElement for security and performance",
    ],
    prevSession: { num: 15, title: "Functions & Scope", href: "/courses/webtechnologies/javascript/session15" },
    nextSession: { num: 17, title: "Events & Event Handling", href: "/courses/webtechnologies/javascript/session17" },
  },

  topics: [
    // ── 1. WHAT IS THE DOM ────────────────────────────────────────
    {
      id: "what-is-the-dom",
      heading: "What is the DOM?",
      content:
        "The Document Object Model (DOM) is a programming interface that represents an HTML page as a live tree of objects. When a browser loads an HTML file it parses every tag into a node and arranges them in a hierarchy — the document is the root, html is its child, then head and body, then everything inside them. JavaScript can read and modify this tree at any time, and the browser instantly reflects those changes on screen. The DOM is the bridge between your HTML structure and your JavaScript logic — without it there would be no way for code to interact with the page.",
      tip: "The DOM is not the HTML file on disk — it is the browser's live, in-memory representation of the page. Changing the DOM changes what the user sees immediately, without reloading the page.",
      table: {
        headers: ["Node Type", "Example", "Description"],
        rows: [
          { cells: ["Document",        "document",                    "The root — entry point for all DOM access"] },
          { cells: ["Element Node",     "<div>, <p>, <button>",       "Every HTML tag becomes an element node"] },
          { cells: ["Text Node",        "The text inside a tag",      "The actual text content inside an element"] },
          { cells: ["Attribute Node",   "class=\"card\", id=\"main\"", "HTML attributes on an element"] },
          { cells: ["Comment Node",     "<!-- comment -->",            "HTML comments in the source"] },
        ],
      },
      codeExamples: [
        {
          label: "The DOM Tree",
          code: "// HTML:\n// <html>\n//   <body>\n//     <h1 id=\"title\">Hello</h1>\n//     <p class=\"text\">World</p>\n//   </body>\n// </html>\n\n// The browser turns this into a tree:\n// document\n//   └── html\n//         ├── head\n//         └── body\n//               ├── h1#title  (text: 'Hello')\n//               └── p.text    (text: 'World')\n\n// JavaScript accesses the tree through the document object\nconsole.log(document.title);       // page title\nconsole.log(document.URL);         // current URL\nconsole.log(document.body);        // the <body> element\nconsole.log(document.documentElement); // the <html> element",
        },
      ],
    },

    // ── 2. SELECTING ELEMENTS ─────────────────────────────────────
    {
      id: "selecting-elements",
      heading: "Selecting Elements",
      content:
        "Before you can change anything on the page you need to get a reference to the element. JavaScript provides several methods. getElementById returns the single element with a matching id — it is the fastest selector. querySelector returns the first element matching any CSS selector — very flexible. querySelectorAll returns all matching elements as a NodeList — you need to loop over it. getElementsByClassName and getElementsByTagName return live HTMLCollections that update automatically when the DOM changes, but they are less commonly used in modern code.",
      tip: "Prefer querySelector and querySelectorAll in modern code — they accept any CSS selector so the knowledge transfers directly from your CSS skills.",
      codeExamples: [
        {
          label: "All Selection Methods",
          code: "// By ID — returns one element or null\nconst title = document.getElementById('title');\n\n// By CSS selector — returns the FIRST match or null\nconst firstBtn  = document.querySelector('button');\nconst byClass   = document.querySelector('.card');\nconst byId      = document.querySelector('#hero');\nconst nested    = document.querySelector('.nav a.active');\nconst byAttr    = document.querySelector('input[type=\"email\"]');\n\n// All matching elements — returns a NodeList\nconst allCards  = document.querySelectorAll('.card');\nconst allInputs = document.querySelectorAll('input');\nconst allBtns   = document.querySelectorAll('button');\n\n// NodeList is not an array — convert if you need array methods\nconst cardsArray = Array.from(allCards);\n// or use spread:\nconst cardsArray2 = [...allCards];\n\n// Loop over a NodeList directly with forEach\nallCards.forEach(card => console.log(card.textContent));\n\n// Scoped search — search within an element, not the whole page\nconst nav = document.querySelector('nav');\nconst navLinks = nav.querySelectorAll('a'); // only links inside nav",
        },
      ],
      table: {
        headers: ["Method", "Returns", "Updates Automatically?", "Use When"],
        rows: [
          { cells: ["getElementById(id)",        "Element or null",     "N/A",  "You have an id and need one element"] },
          { cells: ["querySelector(css)",         "Element or null",     "No",   "You need the first matching element"] },
          { cells: ["querySelectorAll(css)",       "Static NodeList",     "No",   "You need all matching elements"] },
          { cells: ["getElementsByClassName(cls)", "Live HTMLCollection", "Yes",  "Rarely — prefer querySelectorAll"] },
          { cells: ["getElementsByTagName(tag)",   "Live HTMLCollection", "Yes",  "Rarely — prefer querySelectorAll"] },
        ],
      },
    },

    // ── 3. READING & CHANGING CONTENT ────────────────────────────
    {
      id: "reading-changing-content",
      heading: "Reading & Changing Content",
      content:
        "Once you have an element reference you can read and update its content through several properties. textContent gets or sets the plain text inside an element — it strips all HTML tags and is safe from injection attacks. innerHTML gets or sets the HTML markup inside an element — powerful but dangerous with untrusted input. innerText is similar to textContent but respects CSS visibility — it returns only text that is visually rendered. For form inputs and textareas, use the value property to read or set the current value. Always prefer textContent over innerHTML when you only need text — it is faster and secure.",
      warning: "Never set innerHTML to content that comes from user input or an external source without sanitising it first — this opens your page to Cross-Site Scripting (XSS) attacks. For user-generated text always use textContent.",
      codeExamples: [
        {
          label: "textContent, innerHTML, and value",
          code: "// textContent — safe, plain text only\nconst heading = document.querySelector('h1');\nconsole.log(heading.textContent); // reads the text\nheading.textContent = 'New Title'; // sets plain text\nheading.textContent = '<b>Bold</b>'; // renders literally as text, NOT bold\n\n// innerHTML — renders HTML markup\nconst container = document.querySelector('.container');\nconsole.log(container.innerHTML);  // reads HTML including child tags\ncontainer.innerHTML = '<p>Hello <strong>World</strong></p>'; // renders bold\n\n// ❌ DANGER — never do this with user input:\n// container.innerHTML = userInput; // XSS vulnerability!\n\n// ✅ SAFE — use textContent for user content:\nconst userInput = '<img src=x onerror=alert(1)>';\nconst display = document.querySelector('#display');\ndisplay.textContent = userInput; // shows literally, no script runs\n\n// value — for form elements\nconst input = document.querySelector('input[name=\"username\"]');\nconsole.log(input.value);       // read what the user typed\ninput.value = 'Priya';          // set the value programmatically\ninput.value = '';               // clear the field\n\n// Checkbox and radio\nconst checkbox = document.querySelector('#agree');\nconsole.log(checkbox.checked);  // true or false\ncheckbox.checked = true;        // tick it programmatically",
        },
      ],
    },

    // ── 4. STYLES & CLASSES ───────────────────────────────────────
    {
      id: "styles-and-classes",
      heading: "Styles & Classes — Changing Appearance",
      content:
        "There are two ways to change an element's appearance with JavaScript. The element.style property lets you set inline CSS — it overrides everything else and should be used sparingly, only for values you need to calculate at runtime (like a dynamic width). The classList API is the right tool for most appearance changes — it lets you add, remove, toggle, and check CSS classes without touching inline styles. This keeps your styles in your CSS file where they belong and lets you swap entire visual states with a single line.",
      tip: "Prefer classList over element.style for almost everything. Define all your visual states as CSS classes, then use JavaScript to switch between them. This keeps CSS in CSS files and JavaScript in JS files.",
      codeExamples: [
        {
          label: "The classList API — add, remove, toggle, contains",
          code: "const card = document.querySelector('.card');\n\n// add — adds a class (does nothing if already present)\ncard.classList.add('active');\ncard.classList.add('highlighted', 'visible'); // multiple at once\n\n// remove — removes a class (does nothing if not present)\ncard.classList.remove('hidden');\n\n// toggle — adds if missing, removes if present, returns boolean\ncard.classList.toggle('open');  // like a light switch\n\n// contains — check if class is present\nif (card.classList.contains('active')) {\n  console.log('Card is active');\n}\n\n// replace — swap one class for another\ncard.classList.replace('old-theme', 'new-theme');\n\n// Reading all classes\nconsole.log(card.className);       // 'card active highlighted'\nconsole.log(card.classList.length); // 3",
        },
        {
          label: "element.style — Inline CSS for Dynamic Values",
          code: "const box = document.querySelector('.box');\n\n// CSS property names become camelCase in JavaScript\nbox.style.backgroundColor = '#11998e';  // background-color\nbox.style.fontSize = '18px';             // font-size\nbox.style.marginTop = '20px';            // margin-top\nbox.style.display = 'none';              // hide element\nbox.style.display = '';                  // remove inline style (revert to CSS)\n\n// Set multiple styles at once with cssText (replaces ALL inline styles)\nbox.style.cssText = 'width: 200px; height: 200px; background: coral;';\n\n// Reading computed style (what the browser actually applies)\nconst computed = window.getComputedStyle(box);\nconsole.log(computed.width);         // '200px'\nconsole.log(computed.backgroundColor); // 'rgb(17, 153, 142)'",
        },
      ],
    },

    // ── 5. CREATING & INSERTING ELEMENTS ─────────────────────────
    {
      id: "creating-inserting-elements",
      heading: "Creating & Inserting Elements",
      content:
        "You can build new HTML elements entirely in JavaScript and insert them wherever you need them in the DOM. The workflow is: create an element with document.createElement, configure it (set its text, classes, attributes), then insert it using one of the insertion methods. The modern insertAdjacentHTML and insertAdjacentElement methods let you specify exactly where relative to a target element you want to insert. append and prepend are the simplest for adding children. This approach is far safer than building HTML strings and assigning them to innerHTML.",
      codeExamples: [
        {
          label: "createElement — The Safe Way to Add HTML",
          code: "// Step 1: Create the element\nconst card = document.createElement('div');\n\n// Step 2: Configure it\ncard.className = 'card';\ncard.id = 'user-card';\ncard.textContent = 'Hello from JavaScript!';\n\n// Or build up a structure:\nconst img = document.createElement('img');\nimg.src = '/images/avatar.jpg';\nimg.alt = 'User avatar';\n\nconst name = document.createElement('h3');\nname.textContent = 'Priya Sharma';\n\nconst bio = document.createElement('p');\nbio.textContent = 'Frontend Developer';\n\n// Step 3: Assemble — append children to the card\ncard.append(img, name, bio);\n\n// Step 4: Insert into the page\nconst container = document.querySelector('#cards-container');\ncontainer.append(card);       // adds at the END of container\ncontainer.prepend(card);      // adds at the START of container",
        },
        {
          label: "All Insertion Methods",
          code: "const list = document.querySelector('ul');\nconst newItem = document.createElement('li');\nnewItem.textContent = 'New item';\n\n// append — adds as LAST child (accepts strings and nodes)\nlist.append(newItem);\nlist.append('Plain text also works');\n\n// prepend — adds as FIRST child\nlist.prepend(newItem);\n\n// before / after — inserts as SIBLING\nconst ref = document.querySelector('#item-3');\nref.before(newItem);  // inserts before #item-3\nref.after(newItem);   // inserts after #item-3\n\n// insertAdjacentHTML — insert HTML string at specific position\nconst target = document.querySelector('.container');\ntarget.insertAdjacentHTML('beforebegin', '<p>Before container</p>');\ntarget.insertAdjacentHTML('afterbegin',  '<p>First inside</p>');\ntarget.insertAdjacentHTML('beforeend',   '<p>Last inside</p>');\ntarget.insertAdjacentHTML('afterend',    '<p>After container</p>');\n\n// replaceWith — replaces the element itself\nconst old = document.querySelector('#old-element');\nconst fresh = document.createElement('div');\nfresh.textContent = 'Replaced!';\nold.replaceWith(fresh);",
        },
        {
          label: "Removing Elements",
          code: "// remove() — removes the element from the DOM\nconst toast = document.querySelector('.toast');\ntoast.remove();\n\n// removeChild — old style, still works\nconst parent = document.querySelector('.list');\nconst child  = parent.querySelector('.item');\nparent.removeChild(child);\n\n// Clear all children of an element\nconst container = document.querySelector('#output');\ncontainer.innerHTML = '';       // fast but loses event listeners on children\n\n// Safer alternative — remove children one by one\nwhile (container.firstChild) {\n  container.firstChild.remove();\n}",
        },
      ],
    },

    // ── 6. ATTRIBUTES & DATASET ───────────────────────────────────
    {
      id: "attributes-and-dataset",
      heading: "Attributes & dataset",
      content:
        "HTML attributes like src, href, alt, disabled, and placeholder are accessible through dedicated element properties and through the generic getAttribute/setAttribute API. The dataset property provides a clean interface for custom data-* attributes — the preferred way to store custom data on HTML elements without inventing new attributes. data-* attributes show up in your HTML and are readable by both JavaScript and CSS, making them excellent for passing configuration to components.",
      codeExamples: [
        {
          label: "getAttribute, setAttribute, removeAttribute",
          code: "const link = document.querySelector('a#main-link');\n\n// Read an attribute\nconsole.log(link.getAttribute('href'));    // '/about'\nconsole.log(link.getAttribute('target'));  // '_blank'\nconsole.log(link.getAttribute('data-id')); // '42'\n\n// Set an attribute\nlink.setAttribute('href', '/contact');\nlink.setAttribute('target', '_blank');\nlink.setAttribute('disabled', '');  // presence = true for boolean attrs\n\n// Remove an attribute\nlink.removeAttribute('disabled');\n\n// Check existence\nif (link.hasAttribute('disabled')) {\n  console.log('Link is disabled');\n}\n\n// Direct property access — faster for standard attributes\nconst img = document.querySelector('img');\nconsole.log(img.src);    // full absolute URL\nconsole.log(img.alt);    // alt text\nimg.src = '/new-img.jpg';\nimg.alt = 'New description';\n\n// disabled, checked, selected — boolean properties\nconst btn = document.querySelector('button');\nbtn.disabled = true;    // disables the button\nbtn.disabled = false;   // re-enables it",
        },
        {
          label: "dataset — Custom data-* Attributes",
          code: "// HTML: <div class=\"card\" data-user-id=\"42\" data-role=\"admin\" data-is-active=\"true\">\n\nconst card = document.querySelector('.card');\n\n// Read — data-user-id becomes dataset.userId (camelCase)\nconsole.log(card.dataset.userId);   // '42' (always a string)\nconsole.log(card.dataset.role);     // 'admin'\nconsole.log(card.dataset.isActive); // 'true'\n\n// Convert types as needed\nconst id = Number(card.dataset.userId); // 42\nconst isActive = card.dataset.isActive === 'true'; // boolean\n\n// Write — sets the data attribute on the element\ncard.dataset.userId = '99';\ncard.dataset.newField = 'hello'; // creates data-new-field='hello'\n\n// Delete\ndelete card.dataset.role;\n\n// Iterate all data attributes\nfor (const [key, value] of Object.entries(card.dataset)) {\n  console.log(key, '=', value);\n}",
        },
      ],
    },

    // ── 7. DOM TRAVERSAL ─────────────────────────────────────────
    {
      id: "dom-traversal",
      heading: "Traversing the DOM Tree",
      content:
        "Sometimes you already have a reference to one element and need to navigate to a related element — its parent, its children, or its siblings — without running a new query. DOM traversal properties let you move through the tree. The element-specific versions (children, firstElementChild, nextElementSibling) are the most practical because they skip text nodes and comment nodes — returning only actual element nodes.",
      codeExamples: [
        {
          label: "Parent, Children, and Siblings",
          code: "const item = document.querySelector('.list-item.active');\n\n// PARENT\nconsole.log(item.parentElement);         // the immediate parent element\nconsole.log(item.closest('ul'));          // nearest ancestor matching selector\nconsole.log(item.closest('.container')); // walks up until it finds .container\n\n// CHILDREN\nconsole.log(item.children);              // HTMLCollection of child elements\nconsole.log(item.firstElementChild);     // first child element\nconsole.log(item.lastElementChild);      // last child element\nconsole.log(item.childElementCount);     // number of child elements\n\n// Loop children\n[...item.children].forEach(child => {\n  console.log(child.tagName, child.textContent);\n});\n\n// SIBLINGS\nconsole.log(item.nextElementSibling);    // element after this one\nconsole.log(item.previousElementSibling);// element before this one\n\n// Walk all next siblings\nlet next = item.nextElementSibling;\nwhile (next) {\n  console.log(next.textContent);\n  next = next.nextElementSibling;\n}",
        },
        {
          label: "closest() — Walking Up to Find an Ancestor",
          code: "// Useful in event delegation — find the relevant ancestor\n// from a deeply clicked element\n\n// HTML:\n// <ul class=\"todo-list\">\n//   <li class=\"todo-item\" data-id=\"1\">\n//     <span class=\"todo-text\">Buy groceries</span>\n//     <button class=\"delete-btn\">Delete</button>\n//   </li>\n// </ul>\n\ndocument.addEventListener('click', function(event) {\n  // Even if user clicks the button text (a text node),\n  // closest() walks up to find the li\n  const todoItem = event.target.closest('.todo-item');\n  if (!todoItem) return; // click was outside any todo item\n\n  const id = todoItem.dataset.id;\n  console.log('Clicked item with id:', id);\n});",
        },
      ],
      table: {
        headers: ["Property", "Returns", "Skips Text Nodes?"],
        rows: [
          { cells: ["parentElement",          "Parent element",                        "Yes"] },
          { cells: ["children",               "HTMLCollection of child elements",      "Yes"] },
          { cells: ["firstElementChild",       "First child element",                  "Yes"] },
          { cells: ["lastElementChild",        "Last child element",                   "Yes"] },
          { cells: ["nextElementSibling",      "Next sibling element",                 "Yes"] },
          { cells: ["previousElementSibling",  "Previous sibling element",             "Yes"] },
          { cells: ["closest(selector)",       "Nearest ancestor matching selector",   "Yes"] },
          { cells: ["childNodes",              "All child nodes including text",        "No"] },
          { cells: ["parentNode",              "Parent node (may be document)",        "No"] },
        ],
      },
    },

    // ── 8. PRACTICAL PATTERNS ─────────────────────────────────────
    {
      id: "dom-practical-patterns",
      heading: "Practical DOM Patterns",
      content:
        "Real-world DOM work combines selection, modification, creation, and traversal into reusable patterns. Rendering a list from a data array. Showing and hiding elements with classes. Updating a counter display. Building a card from an object. These are the exact patterns you will write dozens of times in every JavaScript project.",
      codeExamples: [
        {
          label: "Render a List from an Array",
          code: "const students = [\n  { name: 'Priya',  score: 92 },\n  { name: 'Arjun',  score: 78 },\n  { name: 'Fatima', score: 88 },\n];\n\nconst list = document.querySelector('#student-list');\n\n// Clear existing content\nlist.innerHTML = '';\n\n// Create and append an element for each item\nstudents.forEach(student => {\n  const li = document.createElement('li');\n  li.className = 'student-item';\n  li.dataset.score = student.score;\n  li.innerHTML =\n    '<span class=\"name\">' + student.name + '</span>' +\n    '<span class=\"score\">' + student.score + '</span>';\n  list.append(li);\n});\n\n// Or build as a string (ok when data is from your own code, not user input)\nlist.innerHTML = students\n  .map(s => '<li class=\"student-item\"><span>' + s.name + '</span><span>' + s.score + '</span></li>')\n  .join('');",
        },
        {
          label: "Toggle Show/Hide with classList",
          code: "// CSS:\n// .modal { display: none; }\n// .modal.visible { display: flex; }\n\nconst modal   = document.querySelector('#modal');\nconst openBtn = document.querySelector('#open-modal');\nconst closeBtn = document.querySelector('#close-modal');\n\nopenBtn.addEventListener('click', () => {\n  modal.classList.add('visible');\n  document.body.classList.add('no-scroll');\n});\n\ncloseBtn.addEventListener('click', () => {\n  modal.classList.remove('visible');\n  document.body.classList.remove('no-scroll');\n});\n\n// Close on backdrop click\nmodal.addEventListener('click', (e) => {\n  if (e.target === modal) { // only if clicking the backdrop\n    modal.classList.remove('visible');\n  }\n});",
        },
        {
          label: "Live Counter Display",
          code: "let count = 0;\nconst display  = document.querySelector('#count-display');\nconst incBtn   = document.querySelector('#increment');\nconst decBtn   = document.querySelector('#decrement');\nconst resetBtn = document.querySelector('#reset');\n\nfunction updateDisplay() {\n  display.textContent = count;\n  display.className = count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero';\n}\n\nincBtn.addEventListener('click',   () => { count++; updateDisplay(); });\ndecBtn.addEventListener('click',   () => { count--; updateDisplay(); });\nresetBtn.addEventListener('click', () => { count = 0; updateDisplay(); });\n\nupdateDisplay(); // set initial state",
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-selecting",
      label: "Selecting Elements",
      html: `<style>
  .sel-demo { font-family: sans-serif; font-size: 0.82rem; }
  .sel-box  { background: #f8f9fa; border-radius: 10px; padding: 14px; margin-bottom: 10px; }
  .sel-code { background: #1e1e1e; color: #d4d4d4; padding: 9px 13px; border-radius: 7px; font-family: 'Courier New', monospace; font-size: 0.72rem; margin-bottom: 8px; }
  .sel-result { background: #f0fdf4; color: #166534; border: 1px solid #86efac; padding: 7px 12px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 0.72rem; font-weight: 700; }
  .sel-result.null { background: #fee2e2; color: #7f1d1d; border-color: #fca5a5; }
  .kw { color: #569cd6 } .fn { color: #dcdcaa } .str { color: #ce9178 }
</style>
<div class="sel-demo">
  <p style="color:#666;margin-bottom:12px">A live mini DOM — try reading the element info below:</p>

  <!-- The target DOM -->
  <div id="demo-dom" style="border:2px dashed #11998e;border-radius:8px;padding:14px;margin-bottom:14px">
    <h3 id="demo-heading" style="margin:0 0 8px;color:#11998e">DOM Demo Heading</h3>
    <p class="demo-text" style="margin:4px 0;color:#555">First paragraph</p>
    <p class="demo-text" style="margin:4px 0;color:#555">Second paragraph</p>
    <button class="demo-btn" style="background:#11998e;color:white;border:none;padding:6px 14px;border-radius:6px;margin:4px;cursor:pointer">Button A</button>
    <button class="demo-btn" style="background:#3498db;color:white;border:none;padding:6px 14px;border-radius:6px;margin:4px;cursor:pointer">Button B</button>
  </div>

  <div class="sel-box">
    <p style="font-weight:700;color:#11998e;margin-bottom:6px">getElementById</p>
    <div class="sel-code"><span class="fn">getElementById</span>(<span class="str">'demo-heading'</span>)</div>
    <div class="sel-result">→ &lt;h3 id="demo-heading"&gt;DOM Demo Heading&lt;/h3&gt;</div>
  </div>

  <div class="sel-box">
    <p style="font-weight:700;color:#3498db;margin-bottom:6px">querySelector — first match only</p>
    <div class="sel-code"><span class="fn">querySelector</span>(<span class="str">'.demo-text'</span>)</div>
    <div class="sel-result">→ &lt;p class="demo-text"&gt;First paragraph&lt;/p&gt;</div>
  </div>

  <div class="sel-box">
    <p style="font-weight:700;color:#9b59b6;margin-bottom:6px">querySelectorAll — all matches as NodeList</p>
    <div class="sel-code"><span class="fn">querySelectorAll</span>(<span class="str">'.demo-btn'</span>)</div>
    <div class="sel-result">→ NodeList(2) [button.demo-btn, button.demo-btn]</div>
  </div>

  <div class="sel-box">
    <p style="font-weight:700;color:#e74c3c;margin-bottom:6px">querySelector — no match returns null</p>
    <div class="sel-code"><span class="fn">querySelector</span>(<span class="str">'.does-not-exist'</span>)</div>
    <div class="sel-result null">→ null</div>
  </div>
</div>`,
    },

    {
      id: "demo-content",
      label: "Content & Styles",
      html: `<style>
  .live-demo { font-family: sans-serif; font-size: 0.82rem; }
  .demo-section { background: #f8f9fa; border-radius: 10px; padding: 14px; margin-bottom: 10px; }
  .demo-target { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 8px; min-height: 40px; }
  .demo-controls { display: flex; gap: 8px; flex-wrap: wrap; }
  .demo-mini-btn {
    padding: 6px 14px; border: none; border-radius: 6px; font-size: 0.75rem;
    font-weight: 700; cursor: pointer; transition: opacity 0.2s;
  }
  .demo-mini-btn:hover { opacity: 0.85; }
</style>
<div class="live-demo">
  <div class="demo-section">
    <p style="font-weight:700;color:#11998e;margin-bottom:8px">textContent vs innerHTML</p>
    <div class="demo-target" id="content-target">Original content here</div>
    <div class="demo-controls">
      <button class="demo-mini-btn" style="background:#11998e;color:white"
        onclick="document.getElementById('content-target').textContent='Set with textContent — plain text only'">
        .textContent = 'text'
      </button>
      <button class="demo-mini-btn" style="background:#3498db;color:white"
        onclick="document.getElementById('content-target').innerHTML='Set with <strong>innerHTML</strong> — <em>HTML renders!</em>'">
        .innerHTML = 'html'
      </button>
      <button class="demo-mini-btn" style="background:#9b59b6;color:white"
        onclick="document.getElementById('content-target').textContent='&lt;b&gt;This does NOT render as bold — textContent is safe&lt;/b&gt;'">
        textContent with tags
      </button>
    </div>
  </div>

  <div class="demo-section">
    <p style="font-weight:700;color:#e74c3c;margin-bottom:8px">classList — add, remove, toggle</p>
    <div class="demo-target" id="class-target" style="font-weight:700;text-align:center;font-size:1rem;transition:all 0.3s">
      Watch me change
    </div>
    <div class="demo-controls">
      <button class="demo-mini-btn" style="background:#11998e;color:white"
        onclick="document.getElementById('class-target').classList.add('active'); document.getElementById('class-target').style.background='#11998e'; document.getElementById('class-target').style.color='white'">
        classList.add('active')
      </button>
      <button class="demo-mini-btn" style="background:#e74c3c;color:white"
        onclick="document.getElementById('class-target').classList.remove('active'); document.getElementById('class-target').style.background=''; document.getElementById('class-target').style.color=''">
        classList.remove('active')
      </button>
      <button class="demo-mini-btn" style="background:#f39c12;color:white"
        onclick="const el=document.getElementById('class-target'); const on=el.classList.toggle('toggled'); el.style.background=on?'#f39c12':''; el.style.color=on?'white':''; el.textContent=on?'Toggled ON':'Toggled OFF'">
        classList.toggle
      </button>
    </div>
  </div>

  <div class="demo-section">
    <p style="font-weight:700;color:#9b59b6;margin-bottom:8px">element.style — inline CSS</p>
    <div class="demo-target" id="style-target" style="text-align:center;font-weight:700;transition:all 0.3s">
      Style me!
    </div>
    <div class="demo-controls">
      <button class="demo-mini-btn" style="background:#9b59b6;color:white"
        onclick="const t=document.getElementById('style-target');t.style.backgroundColor='#9b59b6';t.style.color='white';t.style.borderRadius='24px'">
        style.backgroundColor
      </button>
      <button class="demo-mini-btn" style="background:#e74c3c;color:white"
        onclick="const t=document.getElementById('style-target');t.style.transform='scale(1.15) rotate(3deg)'">
        style.transform
      </button>
      <button class="demo-mini-btn" style="background:#6b7280;color:white"
        onclick="const t=document.getElementById('style-target');t.style.cssText='';t.textContent='Style me!'">
        Reset styles
      </button>
    </div>
  </div>
</div>`,
    },

    {
      id: "demo-create",
      label: "Creating Elements",
      html: `<style>
  .create-demo { font-family: sans-serif; font-size: 0.82rem; }
  .create-btn {
    padding: 8px 16px; border: none; border-radius: 8px; font-size: 0.78rem;
    font-weight: 700; cursor: pointer; margin: 4px; transition: transform 0.15s, opacity 0.2s;
  }
  .create-btn:hover { opacity: 0.85; }
  .create-btn:active { transform: scale(0.96); }
  .created-card {
    background: white; border: 1px solid #e5e7eb; border-radius: 8px;
    padding: 12px 14px; margin: 6px 0; display: flex; justify-content: space-between;
    align-items: center; animation: slideIn 0.25s ease;
  }
  @keyframes slideIn { from { opacity:0; transform: translateY(-8px) } to { opacity:1; transform: translateY(0) } }
  .remove-btn {
    background: none; border: 1px solid #fca5a5; color: #ef4444; border-radius: 5px;
    padding: 3px 8px; font-size: 0.7rem; cursor: pointer;
  }
  .remove-btn:hover { background: #fee2e2; }
</style>
<div class="create-demo">
  <p style="color:#666;margin-bottom:12px">Click to create elements — they appear below in real time:</p>

  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
    <button class="create-btn" style="background:#11998e;color:white" onclick="
      const list = document.getElementById('created-list');
      const card = document.createElement('div');
      card.className = 'created-card';
      const names = ['Priya','Arjun','Fatima','Ali','Riya','Dev'];
      const name = names[Math.floor(Math.random()*names.length)];
      const scores = Math.floor(Math.random()*41)+60;
      card.innerHTML = '<span><strong>' + name + '</strong> — Score: ' + scores + '</span>';
      const btn = document.createElement('button');
      btn.className = 'remove-btn';
      btn.textContent = 'Remove';
      btn.onclick = () => card.remove();
      card.append(btn);
      list.prepend(card);
    ">+ Add Student Card</button>

    <button class="create-btn" style="background:#3498db;color:white" onclick="
      const list = document.getElementById('created-list');
      const colors = ['#11998e','#3498db','#e74c3c','#f39c12','#9b59b6','#1abc9c'];
      const color = colors[Math.floor(Math.random()*colors.length)];
      const badge = document.createElement('div');
      badge.className = 'created-card';
      badge.innerHTML = '<span style=&quot;display:inline-block;background:' + color + ';color:white;padding:4px 12px;border-radius:20px;font-size:0.75rem;font-weight:700&quot;>Badge #' + (Math.floor(Math.random()*100)) + '</span>';
      const btn = document.createElement('button');
      btn.className = 'remove-btn';
      btn.textContent = 'Remove';
      btn.onclick = () => badge.remove();
      badge.append(btn);
      list.prepend(badge);
    ">+ Add Badge</button>

    <button class="create-btn" style="background:#e74c3c;color:white" onclick="
      const list = document.getElementById('created-list');
      while(list.firstChild) list.firstChild.remove();
    ">Clear All</button>
  </div>

  <div id="created-list" style="min-height:60px;border:2px dashed #e5e7eb;border-radius:10px;padding:8px">
    <p style="color:#9ca3af;text-align:center;font-size:0.78rem;padding:16px 0">Elements you create will appear here</p>
  </div>

  <div style="background:#f0fdf4;border-left:3px solid #22c55e;padding:10px 14px;border-radius:0 8px 8px 0;margin-top:12px;font-size:0.75rem;color:#166534">
    Each click runs <code>document.createElement('div')</code>, sets properties, then calls <code>list.prepend(card)</code> — no page reload, instant DOM update.
  </div>
</div>`,
    },

    {
      id: "demo-traversal",
      label: "DOM Traversal",
      html: `<style>
  .tree-node {
    border: 2px solid; border-radius: 8px; padding: 8px 12px;
    font-family: 'Courier New', monospace; font-size: 0.72rem; font-weight: 700;
    cursor: pointer; transition: all 0.2s; display: inline-block;
  }
  .tree-node:hover { transform: scale(1.05); }
  .tree-node.selected { box-shadow: 0 0 0 3px #f7df1e; }
  .tree-line { border-left: 2px solid #e5e7eb; margin-left: 20px; padding-left: 16px; }
  .info-panel { background: #1e1e1e; color: #d4d4d4; border-radius: 8px; padding: 12px 14px; font-family: 'Courier New', monospace; font-size: 0.72rem; line-height: 1.8; min-height: 80px; }
  .info-key { color: #9cdcfe } .info-val { color: #ce9178 }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Click any node to see its traversal relationships:</p>

  <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap">
    <div style="flex:1;min-width:180px">
      <!-- Tree visual -->
      <div style="margin-bottom:6px">
        <div class="tree-node" style="border-color:#11998e;color:#11998e" id="node-ul" onclick="showNode(this,'ul.todo-list','parentElement: document.body','children: [li, li, li]','firstElementChild: li#item-1')">ul.todo-list</div>
      </div>
      <div class="tree-line">
        <div style="margin-bottom:6px">
          <div class="tree-node" style="border-color:#3498db;color:#3498db" id="node-li1" onclick="showNode(this,'li#item-1','parentElement: ul.todo-list','nextElementSibling: li#item-2','children: [span, button]')">li#item-1</div>
        </div>
        <div class="tree-line">
          <div style="margin-bottom:4px"><div class="tree-node" style="border-color:#9b59b6;color:#9b59b6;font-size:0.65rem" onclick="showNode(this,'span.text','parentElement: li#item-1','nextElementSibling: button','textContent: Buy groceries')">span.text</div></div>
          <div><div class="tree-node" style="border-color:#e74c3c;color:#e74c3c;font-size:0.65rem" onclick="showNode(this,'button.delete','parentElement: li#item-1','previousElementSibling: span.text','textContent: Delete')">button.delete</div></div>
        </div>
        <div style="margin-bottom:6px;margin-top:6px">
          <div class="tree-node" style="border-color:#3498db;color:#3498db" id="node-li2" onclick="showNode(this,'li#item-2','parentElement: ul.todo-list','previousElementSibling: li#item-1','nextElementSibling: li#item-3')">li#item-2</div>
        </div>
        <div>
          <div class="tree-node" style="border-color:#3498db;color:#3498db" id="node-li3" onclick="showNode(this,'li#item-3','parentElement: ul.todo-list','previousElementSibling: li#item-2','nextElementSibling: null')">li#item-3</div>
        </div>
      </div>
    </div>

    <div style="flex:1.2;min-width:200px">
      <p style="font-weight:700;color:#374151;margin-bottom:6px">Selected node info:</p>
      <div class="info-panel" id="traversal-info">
        <span style="color:#6a9955">// Click a node to inspect it</span>
      </div>
    </div>
  </div>

  <script>
    function showNode(el, name, p1, p2, p3) {
      document.querySelectorAll('.tree-node').forEach(n => n.classList.remove('selected'));
      el.classList.add('selected');
      const panel = document.getElementById('traversal-info');
      panel.innerHTML =
        '<span style="color:#dcdcaa">node</span> = <span style="color:#ce9178">' + name + '</span><br>' +
        '<br>' +
        '<span style="color:#9cdcfe">' + p1.split(':')[0] + '</span>: <span style="color:#ce9178">' + p1.split(':').slice(1).join(':') + '</span><br>' +
        '<span style="color:#9cdcfe">' + p2.split(':')[0] + '</span>: <span style="color:#ce9178">' + p2.split(':').slice(1).join(':') + '</span><br>' +
        '<span style="color:#9cdcfe">' + p3.split(':')[0] + '</span>: <span style="color:#ce9178">' + p3.split(':').slice(1).join(':') + '</span>';
    }
  </script>
</div>`,
    },

    {
      id: "demo-live-builder",
      label: "Live DOM Builder",
      html: `<style>
  .builder-input {
    width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 7px;
    font-size: 0.8rem; font-family: sans-serif; box-sizing: border-box; margin-bottom: 8px;
  }
  .builder-btn {
    padding: 9px 18px; border: none; border-radius: 8px; font-size: 0.78rem;
    font-weight: 700; cursor: pointer; background: #11998e; color: white;
    transition: transform 0.15s; width: 100%;
  }
  .builder-btn:hover { opacity: 0.9; }
  .builder-btn:active { transform: scale(0.97); }
  .output-card {
    background: white; border: 1px solid #e5e7eb; border-radius: 10px;
    padding: 14px; margin-top: 6px; animation: pop 0.2s ease;
  }
  @keyframes pop { from { opacity:0;transform:scale(0.95) } to { opacity:1;transform:scale(1) } }
  .tag-chip { display:inline-block;background:#f0fdf4;color:#166534;border:1px solid #86efac;border-radius:5px;padding:2px 7px;font-family:monospace;font-size:0.7rem;margin-right:4px; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Fill in the form — watch JavaScript build a DOM element live:</p>

  <div style="display:flex;gap:12px;flex-wrap:wrap">
    <div style="flex:1;min-width:160px">
      <label style="font-weight:700;color:#374151;display:block;margin-bottom:4px;font-size:0.78rem">Element text</label>
      <input class="builder-input" id="b-text" placeholder="Enter some text..." value="Hello, DOM!">

      <label style="font-weight:700;color:#374151;display:block;margin-bottom:4px;font-size:0.78rem">CSS Class</label>
      <input class="builder-input" id="b-class" placeholder="e.g. card highlight" value="card">

      <label style="font-weight:700;color:#374151;display:block;margin-bottom:4px;font-size:0.78rem">Background color</label>
      <input class="builder-input" id="b-color" type="color" value="#11998e" style="height:38px;padding:4px">

      <button class="builder-btn" onclick="
        const text = document.getElementById('b-text').value || 'No text';
        const cls  = document.getElementById('b-class').value || '';
        const color = document.getElementById('b-color').value;
        const out  = document.getElementById('b-output');

        const el = document.createElement('div');
        el.textContent = text;
        if(cls) el.className = cls;
        el.style.background = color;
        el.style.color = 'white';
        el.style.padding = '12px 16px';
        el.style.borderRadius = '8px';
        el.style.fontWeight = '700';
        el.style.marginBottom = '6px';

        const code = document.getElementById('b-code');
        code.innerHTML =
          '<span style=&quot;color:#569cd6&quot;>const</span> el = document.<span style=&quot;color:#dcdcaa&quot;>createElement</span>(<span style=&quot;color:#ce9178&quot;>&apos;div&apos;</span>);<br>' +
          'el.<span style=&quot;color:#9cdcfe&quot;>textContent</span> = <span style=&quot;color:#ce9178&quot;>&apos;' + text + '&apos;</span>;<br>' +
          (cls ? 'el.<span style=&quot;color:#9cdcfe&quot;>className</span> = <span style=&quot;color:#ce9178&quot;>&apos;' + cls + '&apos;</span>;<br>' : '') +
          'el.<span style=&quot;color:#9cdcfe&quot;>style</span>.background = <span style=&quot;color:#ce9178&quot;>&apos;' + color + '&apos;</span>;<br>' +
          'container.<span style=&quot;color:#dcdcaa&quot;>append</span>(el);';

        out.innerHTML = '';
        out.append(el);
      ">Build Element →</button>
    </div>

    <div style="flex:1.2;min-width:180px">
      <p style="font-weight:700;color:#374151;margin-bottom:6px;font-size:0.78rem">Generated code:</p>
      <div id="b-code" style="background:#1e1e1e;color:#d4d4d4;border-radius:8px;padding:12px;font-family:'Courier New',monospace;font-size:0.7rem;line-height:1.8;min-height:80px">
        <span style="color:#6a9955">// Your code will appear here</span>
      </div>
      <p style="font-weight:700;color:#374151;margin:10px 0 6px;font-size:0.78rem">Result:</p>
      <div id="b-output" style="min-height:48px;border:2px dashed #e5e7eb;border-radius:8px;padding:8px">
        <span style="color:#9ca3af;font-size:0.75rem">Element appears here</span>
      </div>
    </div>
  </div>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Selection & Reading",
      description: "Practise selecting elements and reading their properties:",
      tasks: [
        "Create an HTML page with a heading, two paragraphs with the same class, a form with an input, and a button",
        "Use getElementById, querySelector, and querySelectorAll to select each element — log the results",
        "Read and log the textContent of the heading, the innerHTML of one paragraph, and the value of the input",
        "Convert the NodeList from querySelectorAll to an array using Array.from() then loop it with forEach",
        "Use closest() — inside a click handler on the button, call event.target.closest('form') and log what you get",
        "Try selecting an element that doesn't exist — verify you get null and write a guard: if (!el) return;",
      ],
      hint: "Always check that querySelector returned something before using it: const el = document.querySelector('.thing'); if (!el) return; — this prevents 'Cannot read properties of null' errors.",
    },
    {
      title: "Exercise 2: Modifying the DOM",
      description: "Change content, classes, and styles in response to user actions:",
      tasks: [
        "Select a heading and change its textContent to 'Updated by JavaScript' on button click",
        "Add a CSS class 'active' to a card element on click, and remove it on a second click using classList.toggle",
        "Build a dark mode toggle — clicking a button adds/removes a 'dark' class on the body element",
        "Use element.style to animate a box: on click set its width to '200px', backgroundColor to '#11998e', and borderRadius to '50%'",
        "Create a character counter — as the user types in a textarea, update a span to show how many characters remain (max 100)",
        "Use dataset — add data-status='pending' to a list item, then change it to 'complete' on click and update the visual with a CSS class",
      ],
      hint: "For the character counter: textarea.addEventListener('input', () => { counter.textContent = 100 - textarea.value.length; }) — use the 'input' event, not 'keydown'.",
    },
    {
      title: "Exercise 3: Creating & Removing Elements",
      description: "Build a dynamic to-do list entirely with createElement:",
      tasks: [
        "Build a form with an input and an Add button — no list items in the HTML initially",
        "On form submit: create an li element, set its textContent to the input value, clear the input, append it to the ul",
        "Each li should also contain a Delete button — clicking it removes just that li with .remove()",
        "Add a 'Complete' button too — clicking it toggles a 'done' class that adds line-through styling via CSS",
        "Add a 'Clear All' button that removes all li elements from the list",
        "Store each task as an object in an array and re-render the whole list from the array each time it changes",
      ],
      hint: "For the delete button: create it with createElement, set its onclick to () => li.remove(), then append it to the li before appending the li to the ul. Each item should have its own closure over the li reference.",
    },
    {
      title: "Challenge: Dynamic Card Grid",
      description: "Build a searchable, filterable card grid driven entirely by JavaScript and the DOM:",
      tasks: [
        "Start with a data array of 8 student objects: {name, score, subject, avatar: initials string}",
        "Write a renderCards(data) function that clears the grid and re-renders it from the array using createElement",
        "Each card should show the avatar (a coloured circle with initials), name, subject, and a score badge that is green if >=75, amber if >=50, red if below",
        "Add a live search input — on every 'input' event, filter the data array and call renderCards with the filtered results",
        "Add three filter buttons (All, Passing, Failing) — clicking each re-renders with the appropriate subset",
        "Add a Sort button that toggles between sorting by name and by score — re-render after each toggle",
      ],
      hint: "Keep the original data array untouched — always filter/sort a copy: const filtered = [...students].filter(...). This way you can always return to the full list. Your renderCards function should be the single source of truth for the UI.",
    },
  ],
};

export default session16;