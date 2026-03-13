// data/courses/webtechnologies/javascript/session13.ts
import type { SessionData } from "@/types/session";

const session13: SessionData = {
  meta: {
    sessionNumber: 13,
    module: "javascript",
    moduleNumber: 3,
    title: "JavaScript Introduction & Basics",
    subtitle: "From zero to writing real code — variables, data types, operators, conditionals, and loops explained from the ground up",
    duration: "2 hrs",
    color: "008000",
    colorDim: "rgba(247,223,30,0.10)",
    colorMid: "rgba(247,223,30,0.22)",
    objectives: [
      "Understand what JavaScript is and where it runs",
      "Add JavaScript to an HTML page in three ways",
      "Declare variables using var, let, and const — and know which to use",
      "Recognise the six primitive data types and typeof operator",
      "Perform arithmetic, comparison, and logical operations",
      "Write conditional logic with if, else if, else, and the ternary operator",
      "Loop through repetitive tasks with for, while, and for...of",
      "Use console.log to debug and inspect values",
    ],
    prevSession: { num: 12, title: "Transitions & Animations", href: "/courses/webtechnologies/css/session12" },
    nextSession: { num: 14, title: "Functions & Scope", href: "/courses/webtechnologies/javascript/session14" },
  },

  topics: [
    // ── 1. WHAT IS JAVASCRIPT ─────────────────────────────────────
    {
      id: "what-is-javascript",
      heading: "What is JavaScript?",
      content:
        "JavaScript is the programming language of the web. Where HTML gives a page its structure and CSS gives it style, JavaScript gives it behaviour — it makes pages interactive, dynamic, and responsive to the user. Every click, form submission, dropdown menu, live search result, image slider, and notification you have ever seen on a website is powered by JavaScript. It runs directly inside the browser — no installation needed — and it is the only programming language that browsers understand natively. JavaScript is also used on servers (Node.js), in mobile apps, and in desktop applications, making it one of the most versatile languages in existence.",
      tip: "JavaScript is NOT the same as Java. They share a similar name for historical marketing reasons but are completely different languages with different syntax, uses, and ecosystems.",
      table: {
        headers: ["Language", "Role", "Analogy"],
        rows: [
          { cells: ["HTML",       "Structure & Content",  "The skeleton and organs of a body"] },
          { cells: ["CSS",        "Style & Presentation", "The skin, clothes, and appearance"] },
          { cells: ["JavaScript", "Behaviour & Logic",    "The brain and nervous system"] },
        ],
      },
      codeExamples: [
        {
          label: "JavaScript in Action — Three Lines That Change Everything",
          code: "// Without JavaScript — a static button that does nothing\n<button>Click me</button>\n\n// With JavaScript — the button responds to the user\n<button onclick=\"alert('Hello! JavaScript is working!')\">\n  Click me\n</button>\n\n// Even better — separate JS from HTML\n<button id=\"myBtn\">Click me</button>\n<script>\n  document.getElementById('myBtn').addEventListener('click', function() {\n    alert('Hello from JavaScript!');\n  });\n</script>",
        },
      ],
    },

    // ── 2. ADDING JAVASCRIPT TO HTML ──────────────────────────────
    {
      id: "adding-javascript",
      heading: "Adding JavaScript to an HTML Page",
      content:
        "Just like CSS, there are three ways to add JavaScript to an HTML page. Inline JavaScript sits directly on an HTML element as an event attribute — fine for quick tests but messy in real projects. Internal JavaScript lives inside a script tag anywhere in the HTML file — useful for small single-page scripts. External JavaScript is stored in a separate .js file and linked with a script tag — this is always the best practice for real projects as it keeps code organised, reusable, and cached by the browser. The script tag is best placed just before the closing body tag so the HTML loads before the JavaScript tries to interact with it.",
      tip: "Always place your script tag just before </body>. If you put it in the <head>, the JavaScript runs before the HTML elements exist — and your code will fail trying to find elements that haven't been created yet.",
      codeExamples: [
        {
          label: "Three Ways to Add JavaScript",
          code: "<!-- ❌ 1. Inline — messy, hard to maintain -->\n<button onclick=\"alert('clicked!')\">Click</button>\n\n<!-- ✅ 2. Internal — inside a <script> tag -->\n<!DOCTYPE html>\n<html>\n<body>\n  <button id=\"btn\">Click me</button>\n\n  <!-- Script goes just before </body> -->\n  <script>\n    document.getElementById('btn').addEventListener('click', function() {\n      alert('Button clicked!');\n    });\n  </script>\n</body>\n</html>\n\n<!-- ✅✅ 3. External — best practice -->\n<!-- In index.html -->\n<script src=\"app.js\"></script>  <!-- Just before </body> -->\n\n/* In app.js — separate clean file */\ndocument.getElementById('btn').addEventListener('click', function() {\n  alert('Hello from app.js!');\n});",
        },
      ],
    },

    // ── 3. CONSOLE.LOG & COMMENTS ─────────────────────────────────
    {
      id: "console-and-comments",
      heading: "console.log & Comments — Your First Tools",
      content:
        "Before writing complex programs, you need two essential tools: console.log and comments. console.log() prints any value to the browser's developer console — it is the most important debugging tool you have. Open the console by pressing F12 (or Cmd+Option+I on Mac) and clicking the Console tab. You will use console.log constantly to check what a variable contains, verify your logic is working, and track down bugs. Comments are lines the JavaScript engine ignores completely — they are notes for humans. Single-line comments start with // and multi-line comments are wrapped in /* */.",
      codeExamples: [
        {
          label: "console.log & Comments",
          code: "// Single-line comment — JavaScript ignores this line\n\n/*\n  Multi-line comment\n  Great for explaining a block of code\n  or temporarily disabling code\n*/\n\n// Print values to the browser console (open with F12)\nconsole.log('Hello, World!');          // Hello, World!\nconsole.log(42);                       // 42\nconsole.log(true);                     // true\nconsole.log(10 + 5);                   // 15\n\n// Log multiple values at once\nlet name = 'Priya';\nlet age = 22;\nconsole.log('Name:', name, '| Age:', age); // Name: Priya | Age: 22\n\n// Log objects and arrays nicely\nconsole.log({ name: 'Priya', age: 22 });\nconsole.table([1, 2, 3, 4, 5]);        // Shows a nice table\n\n// Helpful variants\nconsole.warn('This is a warning!');    // Yellow warning\nconsole.error('Something went wrong'); // Red error",
        },
      ],
    },

    // ── 4. VARIABLES ─────────────────────────────────────────────
    {
      id: "variables",
      heading: "Variables — Storing Information",
      content:
        "A variable is a named container that holds a value. Think of it as a labelled box — you put something inside it, give it a name, and retrieve it later by that name. JavaScript has three keywords for declaring variables: var (the old way — avoid it), let (the modern way — use for values that change), and const (the modern way — use for values that never change after assignment). Use const by default and only switch to let when you know the value will need to be reassigned. A meaningful variable name makes code self-documenting — name should explain what the value represents.",
      tip: "Default to const. Switch to let only when you need to reassign. Never use var in modern JavaScript — it has confusing scoping behaviour that causes bugs.",
      codeExamples: [
        {
          label: "var vs let vs const",
          code: "// var — OLD way, function-scoped, avoid in modern JS\nvar username = 'Ali';\nvar username = 'Sara'; // Can re-declare — causes bugs!\n\n// let — MODERN, block-scoped, for values that change\nlet score = 0;\nscore = 10;    // ✅ Can reassign\nscore = 25;    // ✅ Can reassign again\n// let score = 50; // ❌ Cannot re-declare in same scope\n\n// const — MODERN, block-scoped, for values that stay fixed\nconst PI = 3.14159;\nconst siteTitle = 'My Website';\n// PI = 3; // ❌ TypeError: Assignment to constant variable\n\n// Naming rules\nlet firstName = 'Riya';    // ✅ camelCase (recommended)\nlet user_age = 25;         // ✅ snake_case (valid but less common in JS)\nlet _private = true;       // ✅ underscore prefix — convention for private\n// let 2fast = true;       // ❌ Cannot start with a number\n// let my-var = true;      // ❌ Hyphens not allowed",
        },
        {
          label: "Declaring vs Initialising",
          code: "// Declare and initialise at the same time\nlet city = 'Mumbai';\n\n// Declare first, assign later (only works with let/var)\nlet userScore;\nconsole.log(userScore); // undefined — not yet assigned\nuserScore = 100;\nconsole.log(userScore); // 100\n\n// const MUST be initialised when declared\nconst MAX_SIZE = 500; // ✅\n// const TAX_RATE;    // ❌ SyntaxError — must initialise const",
        },
      ],
      table: {
        headers: ["Keyword", "Re-declare?", "Reassign?", "Scope", "Use When"],
        rows: [
          { cells: ["var",   "✅ Yes", "✅ Yes", "Function", "Never — legacy only"] },
          { cells: ["let",   "❌ No",  "✅ Yes", "Block",    "Value needs to change"] },
          { cells: ["const", "❌ No",  "❌ No",  "Block",    "Default choice — value is fixed"] },
        ],
      },
    },

    // ── 5. DATA TYPES ─────────────────────────────────────────────
    {
      id: "data-types",
      heading: "Data Types — What Kind of Value Is It?",
      content:
        "JavaScript has six primitive data types — the basic building blocks of all values. A string is text, wrapped in single quotes, double quotes, or backticks. A number covers both integers and decimals — there is no separate int or float type. A boolean is simply true or false — the foundation of all decision-making in code. Undefined means a variable has been declared but not yet given a value. Null means intentionally empty — a deliberate absence of value. BigInt handles integers too large for the normal number type. There is also a seventh type — Object — which covers arrays, functions, and objects. The typeof operator tells you the type of any value.",
      codeExamples: [
        {
          label: "All Six Primitive Types",
          code: "// String — text in quotes\nlet firstName  = 'Arjun';        // Single quotes\nlet greeting   = \"Hello World\";  // Double quotes\nlet template   = `Hi \${firstName}!`; // Backtick template literal\n\n// Number — integers and decimals\nlet age        = 25;\nlet price      = 99.99;\nlet negative   = -10;\nlet scientific = 1.5e6;     // 1,500,000\n\n// Boolean — true or false only\nlet isLoggedIn = true;\nlet hasError   = false;\n\n// Undefined — declared but not assigned\nlet result;\nconsole.log(result);        // undefined\n\n// Null — intentional empty value\nlet selectedUser = null;    // No user selected yet\n\n// BigInt — very large integers\nlet bigNumber = 9007199254740991n; // Add 'n' suffix",
        },
        {
          label: "typeof — Check the Type of Any Value",
          code: "console.log(typeof 'hello');       // \"string\"\nconsole.log(typeof 42);            // \"number\"\nconsole.log(typeof 3.14);          // \"number\"\nconsole.log(typeof true);          // \"boolean\"\nconsole.log(typeof undefined);     // \"undefined\"\nconsole.log(typeof null);          // \"object\" ← known JS quirk!\nconsole.log(typeof [1,2,3]);       // \"object\"\nconsole.log(typeof {name:'Ali'});  // \"object\"\nconsole.log(typeof function(){}); // \"function\"\n\n// Practical use — check before using a variable\nlet userInput = getUserInput(); // might be undefined\nif (typeof userInput === 'string') {\n  console.log(userInput.toUpperCase());\n}",
        },
      ],
      table: {
        headers: ["Type", "Example Values", "typeof Result", "Description"],
        rows: [
          { cells: ["String",    "'hello', \"world\", `hi`", "\"string\"",    "Text — any characters in quotes"] },
          { cells: ["Number",    "42, 3.14, -10, NaN",       "\"number\"",    "All numeric values including decimals"] },
          { cells: ["Boolean",   "true, false",              "\"boolean\"",   "Logical true or false"] },
          { cells: ["Undefined", "undefined",                "\"undefined\"", "Variable declared but not assigned"] },
          { cells: ["Null",      "null",                     "\"object\"",    "Intentional empty value (JS quirk)"] },
          { cells: ["BigInt",    "9007199254740991n",         "\"bigint\"",    "Integers beyond safe number limit"] },
        ],
      },
      subSections: [
        {
          id: "template-literals",
          heading: "Template Literals — The Modern Way to Build Strings",
          content:
            "Template literals use backticks instead of quotes and allow you to embed any JavaScript expression directly inside the string using ${ }. This replaces messy string concatenation with + signs. They also preserve line breaks, making them great for multi-line strings. Any valid JavaScript expression can go inside the curly braces — variables, calculations, function calls, even ternary operators.",
          codeExamples: [
            {
              label: "Template Literals vs Concatenation",
              code: "const name  = 'Fatima';\nconst score = 95;\nconst grade = 'A';\n\n// ❌ Old way — string concatenation with +\nconsole.log('Student ' + name + ' scored ' + score + ' and got grade ' + grade);\n\n// ✅ Modern way — template literal\nconsole.log(`Student \${name} scored \${score} and got grade \${grade}`);\n\n// Expressions inside ${ }\nconsole.log(`Double the score: \${score * 2}`);\nconsole.log(`Pass or fail: \${score >= 50 ? 'Pass' : 'Fail'}`);\n\n// Multi-line strings\nconst html = `\n  <div class=\"card\">\n    <h2>\${name}</h2>\n    <p>Score: \${score}</p>\n  </div>\n`;",
            },
          ],
        },
      ],
    },

    // ── 6. OPERATORS ──────────────────────────────────────────────
    {
      id: "operators",
      heading: "Operators — Working With Values",
      content:
        "Operators are symbols that perform operations on values. Arithmetic operators do maths. Comparison operators compare two values and return a boolean. Logical operators combine booleans. Assignment operators store values into variables. The most important distinction for beginners is between == (loose equality — converts types before comparing) and === (strict equality — checks both value AND type). Always use === in modern JavaScript — using == can produce unexpected results due to type coercion.",
      tip: "Always use === (triple equals) for comparisons, never == (double equals). Triple equals checks both the value AND the type — it never surprises you.",
      codeExamples: [
        {
          label: "Arithmetic Operators",
          code: "let a = 10;\nlet b = 3;\n\nconsole.log(a + b);   // 13  — addition\nconsole.log(a - b);   // 7   — subtraction\nconsole.log(a * b);   // 30  — multiplication\nconsole.log(a / b);   // 3.333... — division\nconsole.log(a % b);   // 1   — modulus (remainder)\nconsole.log(a ** b);  // 1000 — exponentiation (10³)\n\n// Increment & decrement\nlet count = 5;\ncount++;              // count is now 6 (post-increment)\ncount--;              // count is now 5 (post-decrement)\n++count;              // count is now 6 (pre-increment)",
        },
        {
          label: "Comparison Operators",
          code: "let x = 10;\nlet y = '10';\n\n// == loose equality — type conversion happens (AVOID)\nconsole.log(x == y);   // true  ← dangerous! number == string\nconsole.log(x == 10);  // true\n\n// === strict equality — checks value AND type (USE THIS)\nconsole.log(x === y);  // false ← string '10' ≠ number 10\nconsole.log(x === 10); // true\n\n// Other comparison operators\nconsole.log(10 > 5);   // true  — greater than\nconsole.log(10 < 5);   // false — less than\nconsole.log(10 >= 10); // true  — greater than or equal\nconsole.log(10 <= 9);  // false — less than or equal\nconsole.log(x !== y);  // true  — strict not equal",
        },
        {
          label: "Logical Operators",
          code: "// && AND — both must be true\nconsole.log(true  && true);  // true\nconsole.log(true  && false); // false\nconsole.log(false && true);  // false\n\n// || OR — at least one must be true\nconsole.log(true  || false); // true\nconsole.log(false || false); // false\n\n// ! NOT — flips the boolean\nconsole.log(!true);          // false\nconsole.log(!false);         // true\n\n// Practical use\nlet age = 20;\nlet hasID = true;\nlet canEnter = age >= 18 && hasID;\nconsole.log(canEnter); // true\n\n// || for default values\nlet username = null;\nlet displayName = username || 'Guest'; // 'Guest' (fallback)\nconsole.log(displayName); // Guest",
        },
        {
          label: "Assignment Operators",
          code: "let score = 10;\n\nscore += 5;   // score = score + 5  → 15\nscore -= 3;   // score = score - 3  → 12\nscore *= 2;   // score = score * 2  → 24\nscore /= 4;   // score = score / 4  → 6\nscore **= 2;  // score = score ** 2 → 36\nscore %= 10;  // score = score % 10 → 6",
        },
      ],
      table: {
        headers: ["Category", "Operators", "Returns"],
        rows: [
          { cells: ["Arithmetic",  "+ - * / % **",              "Number"] },
          { cells: ["Comparison",  "=== !== > < >= <=",         "Boolean (true/false)"] },
          { cells: ["Logical",     "&& || !",                   "Boolean or one of the operands"] },
          { cells: ["Assignment",  "= += -= *= /= %= **=",      "The assigned value"] },
          { cells: ["String",      "+ (concatenation)",         "String"] },
        ],
      },
    },

    // ── 7. CONDITIONALS ───────────────────────────────────────────
    {
      id: "conditionals",
      heading: "Conditionals — Making Decisions",
      content:
        "Conditionals let your program make decisions — run different code depending on whether a condition is true or false. The if statement runs a block only when its condition is truthy. else runs when the if condition is false. else if checks additional conditions in a chain. For simple two-outcome decisions there is a shorthand called the ternary operator — it fits a whole if/else on one line. The switch statement is cleaner than a long else if chain when comparing one variable against many possible values.",
      codeExamples: [
        {
          label: "if / else if / else",
          code: "let score = 78;\n\nif (score >= 90) {\n  console.log('Grade: A — Excellent!');\n} else if (score >= 75) {\n  console.log('Grade: B — Good job!');\n} else if (score >= 60) {\n  console.log('Grade: C — Keep it up!');\n} else if (score >= 50) {\n  console.log('Grade: D — Just passed.');\n} else {\n  console.log('Grade: F — Please retake.');\n}\n// Output: Grade: B — Good job!",
        },
        {
          label: "Ternary Operator — One-Line if/else",
          code: "// Syntax: condition ? valueIfTrue : valueIfFalse\n\nlet age = 20;\nlet status = age >= 18 ? 'Adult' : 'Minor';\nconsole.log(status); // Adult\n\n// In a template literal\nlet points = 85;\nconsole.log(`You \${points >= 50 ? 'passed' : 'failed'} the exam!`);\n// You passed the exam!\n\n// Nested ternary (use sparingly — can get confusing)\nlet temp = 22;\nlet weather = temp > 30 ? 'Hot' : temp > 20 ? 'Warm' : 'Cold';\nconsole.log(weather); // Warm",
        },
        {
          label: "switch Statement",
          code: "let day = 'Monday';\n\nswitch (day) {\n  case 'Monday':\n  case 'Tuesday':\n  case 'Wednesday':\n  case 'Thursday':\n  case 'Friday':\n    console.log('Weekday — time to work!');\n    break;                   // IMPORTANT: prevents fall-through\n  case 'Saturday':\n  case 'Sunday':\n    console.log('Weekend — time to rest!');\n    break;\n  default:\n    console.log('Unknown day');\n}\n\n// Another example — HTTP status codes\nlet statusCode = 404;\nswitch (statusCode) {\n  case 200: console.log('OK');           break;\n  case 404: console.log('Not Found');    break;\n  case 500: console.log('Server Error'); break;\n  default:  console.log('Unknown');\n}",
        },
      ],
      subSections: [
        {
          id: "truthy-falsy",
          heading: "Truthy & Falsy — What Counts as True?",
          content:
            "In JavaScript, every value is either truthy or falsy when used in a boolean context like an if statement. Exactly six values are falsy: false, 0, '' (empty string), null, undefined, and NaN. Everything else — including non-zero numbers, non-empty strings, arrays, and objects — is truthy. This lets you write very concise checks like if (username) instead of if (username !== null && username !== undefined && username !== '').",
          codeExamples: [
            {
              label: "Falsy Values — Only These Six",
              code: "// The only six falsy values in JavaScript\nif (false)     console.log('falsy'); // falsy\nif (0)         console.log('falsy'); // falsy\nif ('')        console.log('falsy'); // falsy (empty string)\nif (null)      console.log('falsy'); // falsy\nif (undefined) console.log('falsy'); // falsy\nif (NaN)       console.log('falsy'); // falsy\n\n// Everything else is truthy\nif (1)         console.log('truthy'); // truthy\nif ('hello')   console.log('truthy'); // truthy\nif ([])        console.log('truthy'); // truthy — empty array IS truthy!\nif ({})        console.log('truthy'); // truthy — empty object IS truthy!\nif (-1)        console.log('truthy'); // truthy — negative numbers too!\n\n// Practical use\nlet username = '';\nif (username) {\n  console.log('Welcome, ' + username);\n} else {\n  console.log('Please enter a username'); // This runs\n}",
            },
          ],
        },
      ],
    },

    // ── 8. LOOPS ──────────────────────────────────────────────────
    {
      id: "loops",
      heading: "Loops — Repeating Actions",
      content:
        "Loops let you run the same block of code repeatedly without copy-pasting it. The for loop is the most common — you define a start value, a condition to keep looping, and what to do after each iteration. The while loop keeps running as long as a condition is true — use it when you don't know in advance how many iterations you need. The for...of loop is the cleanest way to iterate over arrays and strings — it gives you each value directly without needing an index. The for...in loop iterates over the keys of an object.",
      warning: "Always make sure a loop's condition will eventually become false — otherwise you create an infinite loop that freezes the browser tab. If the browser freezes, close the tab!",
      codeExamples: [
        {
          label: "for Loop — The Classic",
          code: "// Syntax: for (initialise; condition; update)\nfor (let i = 0; i < 5; i++) {\n  console.log('Count:', i);\n}\n// Count: 0\n// Count: 1\n// Count: 2\n// Count: 3\n// Count: 4\n\n// Count down\nfor (let i = 5; i > 0; i--) {\n  console.log(i);\n}\n// 5, 4, 3, 2, 1\n\n// Loop through an array with its index\nconst fruits = ['apple', 'mango', 'banana'];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(i, fruits[i]);\n}\n// 0 apple\n// 1 mango\n// 2 banana",
        },
        {
          label: "while Loop — Condition-Based",
          code: "// Runs while the condition is true\nlet energy = 3;\n\nwhile (energy > 0) {\n  console.log(`Energy remaining: \${energy}`);\n  energy--; // Decrement — makes the condition eventually false\n}\nconsole.log('Out of energy!');\n// Energy remaining: 3\n// Energy remaining: 2\n// Energy remaining: 1\n// Out of energy!\n\n// do...while — runs at least once, then checks the condition\nlet attempts = 0;\ndo {\n  console.log('Attempt:', attempts + 1);\n  attempts++;\n} while (attempts < 3);\n// Attempt: 1\n// Attempt: 2\n// Attempt: 3",
        },
        {
          label: "for...of — The Clean Array Iterator",
          code: "const colors = ['red', 'green', 'blue'];\n\n// for...of gives you the VALUE directly\nfor (const color of colors) {\n  console.log(color);\n}\n// red\n// green\n// blue\n\n// Works on strings too — iterates character by character\nfor (const char of 'Hello') {\n  console.log(char);\n}\n// H, e, l, l, o\n\n// for...in — iterates over KEYS of an object\nconst person = { name: 'Arjun', age: 22, city: 'Delhi' };\nfor (const key in person) {\n  console.log(`\${key}: \${person[key]}`);\n}\n// name: Arjun\n// age: 22\n// city: Delhi",
        },
        {
          label: "break & continue — Loop Control",
          code: "// break — exit the loop immediately\nfor (let i = 0; i < 10; i++) {\n  if (i === 5) break;   // Stop when i hits 5\n  console.log(i);\n}\n// 0, 1, 2, 3, 4\n\n// continue — skip this iteration, move to the next\nfor (let i = 0; i < 8; i++) {\n  if (i % 2 === 0) continue; // Skip even numbers\n  console.log(i);\n}\n// 1, 3, 5, 7",
        },
      ],
      table: {
        headers: ["Loop", "Best For", "Syntax Preview"],
        rows: [
          { cells: ["for",      "Known number of iterations, index needed",   "for (let i = 0; i < n; i++)"] },
          { cells: ["while",    "Unknown iterations, condition-driven",        "while (condition) { }"] },
          { cells: ["do...while","Run at least once, then check condition",   "do { } while (condition)"] },
          { cells: ["for...of", "Iterating arrays and strings by value",      "for (const item of array)"] },
          { cells: ["for...in", "Iterating object keys",                      "for (const key in object)"] },
        ],
      },
    },

    // ── 9. PUTTING IT ALL TOGETHER ────────────────────────────────
    {
      id: "putting-together",
      heading: "Putting It All Together — Mini Programs",
      content:
        "The real power of programming comes from combining variables, conditions, and loops. Even with just these basics you can solve interesting problems — calculate a grade from a score, find the largest number in a list, count how many items pass a condition, build a simple number guessing game, or generate a multiplication table. These mini programs are the building blocks of every real application you will ever write.",
      codeExamples: [
        {
          label: "Grade Calculator",
          code: "function getGrade(score) {\n  if (score >= 90) return 'A';\n  else if (score >= 75) return 'B';\n  else if (score >= 60) return 'C';\n  else if (score >= 50) return 'D';\n  else return 'F';\n}\n\nconst scores = [95, 82, 67, 45, 73];\n\nfor (const score of scores) {\n  console.log(`Score: \${score} → Grade: \${getGrade(score)}`);\n}\n// Score: 95 → Grade: A\n// Score: 82 → Grade: B\n// Score: 67 → Grade: C\n// Score: 45 → Grade: F\n// Score: 73 → Grade: C",
        },
        {
          label: "Find the Largest Number",
          code: "const numbers = [14, 87, 3, 52, 99, 21, 64];\n\nlet largest = numbers[0]; // Start by assuming first is largest\n\nfor (const num of numbers) {\n  if (num > largest) {\n    largest = num; // Found a new largest\n  }\n}\n\nconsole.log(`Largest number: \${largest}`); // Largest number: 99",
        },
        {
          label: "FizzBuzz — Classic Coding Challenge",
          code: "// Print 1 to 30\n// — If divisible by 3: print \"Fizz\"\n// — If divisible by 5: print \"Buzz\"\n// — If divisible by both: print \"FizzBuzz\"\n// — Otherwise: print the number\n\nfor (let i = 1; i <= 30; i++) {\n  if (i % 3 === 0 && i % 5 === 0) {\n    console.log('FizzBuzz');\n  } else if (i % 3 === 0) {\n    console.log('Fizz');\n  } else if (i % 5 === 0) {\n    console.log('Buzz');\n  } else {\n    console.log(i);\n  }\n}",
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-variables",
      label: "Variables & Types",
      html: `<style>
  .js-demo { font-family: 'Segoe UI', sans-serif; font-size: 0.82rem; }
  .type-pill {
    display: inline-block; padding: 3px 10px; border-radius: 20px;
    font-family: 'Courier New', monospace; font-size: 0.72rem; font-weight: 700;
    margin: 3px 2px;
  }
  .code-line {
    background: #1e1e1e; color: #d4d4d4; padding: 10px 14px; border-radius: 6px;
    font-family: 'Courier New', monospace; font-size: 0.78rem; margin: 6px 0;
  }
  .output-line {
    background: #f0fdf4; border-left: 3px solid #11998e; padding: 8px 12px;
    border-radius: 0 6px 6px 0; font-family: 'Courier New', monospace;
    font-size: 0.78rem; color: #166534; margin: 4px 0;
  }
</style>
<div class="js-demo">
  <p style="color:#666;margin-bottom:12px">The six data types and how typeof identifies them:</p>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
    <div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;margin-bottom:4px">📝</div>
      <div class="type-pill" style="background:#fde047;color:#713f12">string</div>
      <div style="color:#555;margin-top:4px;font-size:0.75rem">'hello', "world"</div>
    </div>
    <div style="background:#dbeafe;border:1px solid #93c5fd;border-radius:8px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;margin-bottom:4px">🔢</div>
      <div class="type-pill" style="background:#93c5fd;color:#1e3a8a">number</div>
      <div style="color:#555;margin-top:4px;font-size:0.75rem">42, 3.14, -10</div>
    </div>
    <div style="background:#dcfce7;border:1px solid #86efac;border-radius:8px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;margin-bottom:4px">✅</div>
      <div class="type-pill" style="background:#86efac;color:#14532d">boolean</div>
      <div style="color:#555;margin-top:4px;font-size:0.75rem">true, false</div>
    </div>
    <div style="background:#f3f4f6;border:1px solid #d1d5db;border-radius:8px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;margin-bottom:4px">❓</div>
      <div class="type-pill" style="background:#d1d5db;color:#374151">undefined</div>
      <div style="color:#555;margin-top:4px;font-size:0.75rem">not assigned</div>
    </div>
    <div style="background:#fce7f3;border:1px solid #f9a8d4;border-radius:8px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;margin-bottom:4px">🚫</div>
      <div class="type-pill" style="background:#f9a8d4;color:#831843">null</div>
      <div style="color:#555;margin-top:4px;font-size:0.75rem">intentionally empty</div>
    </div>
    <div style="background:#ede9fe;border:1px solid #c4b5fd;border-radius:8px;padding:12px;text-align:center">
      <div style="font-size:1.4rem;margin-bottom:4px">🔠</div>
      <div class="type-pill" style="background:#c4b5fd;color:#4c1d95">bigint</div>
      <div style="color:#555;margin-top:4px;font-size:0.75rem">9007199254740991n</div>
    </div>
  </div>

  <p style="font-weight:700;color:#374151;margin-bottom:6px">typeof in action:</p>
  ${[
    ["typeof 'hello'",      '"string"',    "#fde047","#713f12"],
    ["typeof 42",           '"number"',    "#93c5fd","#1e3a8a"],
    ["typeof true",         '"boolean"',   "#86efac","#14532d"],
    ["typeof undefined",    '"undefined"', "#d1d5db","#374151"],
    ["typeof null",         '"object" ⚠️', "#fca5a5","#7f1d1d"],
  ].map(([expr, result, bg, fg]) => `
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
    <div class="code-line" style="flex:1">console.log(${expr})</div>
    <div style="color:#888;font-size:0.8rem">→</div>
    <div class="type-pill" style="background:${bg};color:${fg}">${result}</div>
  </div>`).join("")}

  <div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:10px;margin-top:10px;font-size:0.75rem;color:#713f12">
    ⚠️ <strong>typeof null === "object"</strong> is a known JavaScript bug from 1995. It was never fixed to preserve backwards compatibility. Always check for null explicitly: <code>value === null</code>
  </div>
</div>`,
    },

    {
      id: "demo-operators",
      label: "Operators",
      html: `<style>
  .op-row { display:flex; align-items:center; gap:10px; margin-bottom:8px; font-size:0.8rem; }
  .op-code { background:#1e1e1e; color:#d4d4d4; padding:7px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.75rem; flex:1; }
  .op-result { background:#f0fdf4; color:#166534; border:1px solid #86efac; padding:6px 10px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.75rem; min-width:80px; text-align:center; font-weight:700; }
  .op-result.warn { background:#fef9c3; color:#713f12; border-color:#fde047; }
  .op-result.good { background:#dcfce7; color:#14532d; border-color:#86efac; }
  .op-result.bad  { background:#fce7f3; color:#831843; border-color:#f9a8d4; }
</style>
<div style="font-family:sans-serif">
  <p style="color:#666;margin-bottom:12px;font-size:0.82rem">Key operators and their outputs:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px;font-size:0.8rem">Arithmetic</p>
  ${[
    ["10 + 3", "13"], ["10 - 3", "7"], ["10 * 3", "30"],
    ["10 / 3", "3.333..."], ["10 % 3", "1  (remainder)"], ["2 ** 10", "1024"],
  ].map(([c,r])=>`<div class="op-row"><div class="op-code">${c}</div><div class="op-result">${r}</div></div>`).join("")}

  <p style="font-weight:700;color:#3498db;margin-bottom:6px;font-size:0.8rem;margin-top:12px">Comparison — always returns true or false</p>
  ${[
    ["10 === 10",    "true",  "good"],
    ["10 === '10'",  "false", "good"],
    ['10 == "10"',   "true ⚠️","warn"],
    ["10 > 5",       "true",  "good"],
    ["10 !== '10'",  "true",  "good"],
  ].map(([c,r,cls])=>`<div class="op-row"><div class="op-code">${c}</div><div class="op-result ${cls}">${r}</div></div>`).join("")}

  <div style="background:#fef9c3;padding:8px 12px;border-radius:6px;border-left:3px solid #fde047;margin:8px 0;font-size:0.75rem;color:#713f12">
    ⚠️ Use <strong>===</strong> always. The <strong>==</strong> operator converts types silently, which causes hard-to-find bugs.
  </div>

  <p style="font-weight:700;color:#9b59b6;margin-bottom:6px;font-size:0.8rem;margin-top:12px">Logical</p>
  ${[
    ["true && true",   "true",  "good"],
    ["true && false",  "false", "bad"],
    ["false || true",  "true",  "good"],
    ["false || false", "false", "bad"],
    ["!true",          "false", "bad"],
    ["!false",         "true",  "good"],
  ].map(([c,r,cls])=>`<div class="op-row"><div class="op-code">${c}</div><div class="op-result ${cls}">${r}</div></div>`).join("")}
</div>`,
    },

    {
      id: "demo-conditionals",
      label: "Conditionals",
      html: `<style>
  @keyframes highlight-row { from{background:#fef9c3} to{background:transparent} }
  .grade-row { display:flex; align-items:center; gap:10px; padding:8px 12px; border-radius:8px; margin-bottom:6px; font-size:0.8rem; transition:background 0.3s; }
  .grade-row:hover { background:#f0f4f8; }
  .grade-badge { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.9rem; flex-shrink:0; }
  .grade-bar-wrap { flex:1; height:8px; background:#e5e7eb; border-radius:4px; overflow:hidden; }
  .grade-bar { height:100%; border-radius:4px; transition:width 0.6s ease; }
</style>
<div style="font-family:sans-serif">
  <p style="color:#666;margin-bottom:12px;font-size:0.82rem">if/else if/else — grade calculator running live:</p>

  <div style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:8px;font-family:'Courier New',monospace;font-size:0.72rem;margin-bottom:14px;line-height:1.8">
    <span style="color:#569cd6">if</span> (score &gt;= <span style="color:#b5cea8">90</span>)&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#6a9955">// Grade A</span><br>
    <span style="color:#569cd6">else if</span> (score &gt;= <span style="color:#b5cea8">75</span>)&nbsp;<span style="color:#6a9955">// Grade B</span><br>
    <span style="color:#569cd6">else if</span> (score &gt;= <span style="color:#b5cea8">60</span>)&nbsp;<span style="color:#6a9955">// Grade C</span><br>
    <span style="color:#569cd6">else if</span> (score &gt;= <span style="color:#b5cea8">50</span>)&nbsp;<span style="color:#6a9955">// Grade D</span><br>
    <span style="color:#569cd6">else</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#6a9955">// Grade F</span>
  </div>

  ${[
    [95, "A", "#22c55e", "#dcfce7"],
    [82, "B", "#3b82f6", "#dbeafe"],
    [67, "C", "#f59e0b", "#fef3c7"],
    [53, "D", "#f97316", "#ffedd5"],
    [38, "F", "#ef4444", "#fee2e2"],
  ].map(([score, grade, color, bg]) => `
  <div class="grade-row">
    <div class="grade-badge" style="background:${bg};color:${color}">${grade}</div>
    <div style="flex:1">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px">
        <span style="font-weight:700;color:#374151">Score: ${score}</span>
        <span style="color:${color};font-weight:700">Grade ${grade}</span>
      </div>
      <div class="grade-bar-wrap">
        <div class="grade-bar" style="width:${score}%;background:${color}"></div>
      </div>
    </div>
  </div>`).join("")}

  <div style="margin-top:14px;background:#f8f9fa;padding:12px;border-radius:8px;font-size:0.78rem">
    <p style="font-weight:700;color:#374151;margin-bottom:6px">Ternary shorthand:</p>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <div style="background:#1e1e1e;color:#d4d4d4;padding:7px 12px;border-radius:6px;font-family:'Courier New',monospace;font-size:0.72rem">score >= 50 ? 'Pass' : 'Fail'</div>
      ${[[95,"Pass","#22c55e"],[82,"Pass","#3b82f6"],[38,"Fail","#ef4444"]].map(([s,r,c])=>`<div style="background:${c}15;color:${c};border:1px solid ${c}40;padding:4px 10px;border-radius:4px;font-size:0.72rem;font-weight:700">${s} → ${r}</div>`).join("")}
    </div>
  </div>
</div>`,
    },

    {
      id: "demo-loops",
      label: "Loops",
      html: `<style>
  @keyframes pop-in { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
  .loop-item { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:8px; font-weight:800; font-size:0.8rem; color:white; animation:pop-in 0.3s ease forwards; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Loops visualised — each box is one iteration:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">for loop — i from 0 to 9</p>
  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;background:#f0fdf4;padding:10px;border-radius:8px">
    ${Array.from({length:10},(_,i)=>`<div class="loop-item" style="background:#11998e;animation-delay:${i*0.06}s">${i}</div>`).join("")}
  </div>

  <p style="font-weight:700;color:#3498db;margin-bottom:6px">for...of — iterating an array</p>
  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;background:#eff6ff;padding:10px;border-radius:8px">
    ${["🍎","🥭","🍌","🍇","🍓","🍑"].map((f,i)=>`<div class="loop-item" style="background:#3498db;font-size:1.1rem;animation-delay:${i*0.1}s">${f}</div>`).join("")}
  </div>

  <p style="font-weight:700;color:#9b59b6;margin-bottom:6px">FizzBuzz — 1 to 20 with conditions inside a loop</p>
  <div style="display:flex;flex-wrap:wrap;gap:5px;background:#f5f3ff;padding:10px;border-radius:8px;margin-bottom:14px">
    ${Array.from({length:20},(_,i)=>{
      const n = i+1;
      const isFizz = n%3===0, isBuzz = n%5===0;
      const label = isFizz && isBuzz ? "FB" : isFizz ? "Fz" : isBuzz ? "Bz" : n;
      const bg = isFizz && isBuzz ? "#7c3aed" : isFizz ? "#9b59b6" : isBuzz ? "#06b6d4" : "#6b7280";
      return `<div class="loop-item" style="background:${bg};width:32px;height:32px;font-size:0.65rem;animation-delay:${i*0.05}s" title="${isFizz&&isBuzz?"FizzBuzz":isFizz?"Fizz":isBuzz?"Buzz":n}">${label}</div>`;
    }).join("")}
  </div>
  <div style="display:flex;gap:12px;font-size:0.72rem;margin-bottom:14px">
    <span style="display:flex;align-items:center;gap:4px"><span style="background:#9b59b6;width:12px;height:12px;border-radius:3px;display:inline-block"></span>Fizz (÷3)</span>
    <span style="display:flex;align-items:center;gap:4px"><span style="background:#06b6d4;width:12px;height:12px;border-radius:3px;display:inline-block"></span>Buzz (÷5)</span>
    <span style="display:flex;align-items:center;gap:4px"><span style="background:#7c3aed;width:12px;height:12px;border-radius:3px;display:inline-block"></span>FizzBuzz (÷15)</span>
    <span style="display:flex;align-items:center;gap:4px"><span style="background:#6b7280;width:12px;height:12px;border-radius:3px;display:inline-block"></span>Number</span>
  </div>

  <p style="font-weight:700;color:#e74c3c;margin-bottom:6px">break & continue — skip evens, stop at 9</p>
  <div style="display:flex;flex-wrap:wrap;gap:6px;background:#fef2f2;padding:10px;border-radius:8px">
    ${Array.from({length:10},(_,i)=>{
      if(i>=9) return `<div style="background:#9ca3af;color:white;padding:7px 10px;border-radius:6px;font-size:0.72rem;font-weight:700">break!</div>`;
      if(i%2===0) return `<div style="background:#fca5a5;color:white;width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:0.72rem;text-decoration:line-through">${i}</div>`;
      return `<div class="loop-item" style="background:#e74c3c;animation-delay:${i*0.07}s">${i}</div>`;
    }).join("")}
  </div>
  <p style="font-size:0.72rem;color:#888;margin-top:6px">Strikethrough = skipped with <code>continue</code>. Stops at 9 with <code>break</code>.</p>
</div>`,
    },

    {
      id: "demo-mini-programs",
      label: "Mini Programs",
      html: `<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Real programs combining variables + conditions + loops:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">Grade Calculator — scores array processed in a loop</p>
  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
    ${[
      [95,"A","#22c55e"],[82,"B","#3b82f6"],[67,"C","#f59e0b"],
      [45,"F","#ef4444"],[73,"C","#f59e0b"],[88,"B","#3b82f6"]
    ].map(([score, grade, color])=>`
    <div style="background:white;border:1px solid #e5e7eb;border-radius:10px;padding:12px 14px;text-align:center;min-width:70px">
      <div style="font-size:1.4rem;font-weight:800;color:${color}">${grade}</div>
      <div style="font-size:0.72rem;color:#6b7280;margin-top:2px">${score} pts</div>
    </div>`).join("")}
  </div>

  <p style="font-weight:700;color:#3498db;margin-bottom:6px">Find Largest — scanning an array with a loop</p>
  <div style="background:#eff6ff;padding:12px;border-radius:8px;margin-bottom:14px">
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
      ${[14,87,3,52,99,21,64].map(n=>`
      <div style="background:${n===99?'#3b82f6':'#e5e7eb'};color:${n===99?'white':'#374151'};padding:7px 12px;border-radius:6px;font-weight:700;font-size:0.8rem;${n===99?'box-shadow:0 0 0 3px rgba(59,130,246,0.3)':''}">${n}${n===99?'  ✓':''}</div>`).join("")}
    </div>
    <p style="margin:0;font-size:0.75rem;color:#1e3a8a;font-weight:600">Largest: 99 — found by comparing each element in a loop</p>
  </div>

  <p style="font-weight:700;color:#9b59b6;margin-bottom:6px">Multiplication Table — nested loops</p>
  <div style="overflow-x:auto">
    <table style="border-collapse:collapse;font-size:0.72rem">
      <thead>
        <tr>
          <th style="background:#9b59b6;color:white;padding:6px 10px;border-radius:6px 0 0 0">×</th>
          ${Array.from({length:5},(_,i)=>`<th style="background:#9b59b6;color:white;padding:6px 10px">${i+1}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${Array.from({length:5},(_,row)=>`
        <tr>
          <td style="background:#f5f3ff;font-weight:700;color:#7c3aed;padding:6px 10px;text-align:center">${row+1}</td>
          ${Array.from({length:5},(_,col)=>{
            const val=(row+1)*(col+1);
            const intensity=Math.round((val/25)*80);
            return `<td style="background:rgba(155,89,182,${val/25*0.3});color:#4c1d95;padding:6px 10px;text-align:center;font-weight:600">${val}</td>`;
          }).join("")}
        </tr>`).join("")}
      </tbody>
    </table>
  </div>
  <p style="font-size:0.72rem;color:#888;margin-top:6px">Generated by two nested for loops — outer loop = rows, inner loop = columns</p>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Variables & Types",
      description: "Get comfortable declaring variables and identifying types:",
      tasks: [
        "Open your browser's DevTools console (F12 → Console tab)",
        "Declare a const for your name, a let for your age, and a const for your favourite color",
        "Use console.log to print each variable — then log all three in a single template literal sentence",
        "Use typeof on each variable and log the result — predict what each will be before running",
        "Declare a variable without assigning it and log it — what do you see?",
        "Try reassigning a const variable — read the error message carefully and understand why it happens",
      ],
      hint: "The browser console is your playground. You can type JavaScript directly into it and press Enter to run it instantly — no file needed.",
    },
    {
      title: "Exercise 2: Operators & Conditionals",
      description: "Build a grade checker using comparison and logical operators:",
      tasks: [
        "Create a variable called score and set it to any number between 0 and 100",
        "Write an if/else if/else block that assigns a letter grade (A/B/C/D/F) based on the score",
        "Use console.log to print a message like: 'Score: 85 → Grade: B — Good job!'",
        "Rewrite the same logic using a ternary operator for just pass/fail (score >= 50)",
        "Add a check using && — the student only gets an 'A+' if score >= 95 AND they submitted before the deadline (boolean variable)",
        "Test with at least five different scores to verify every branch works",
      ],
      hint: "Test boundary values — exactly 90, exactly 75, exactly 50, 49, and 0 — to make sure your >= conditions are correct.",
    },
    {
      title: "Exercise 3: Loops",
      description: "Write five small loop programs to build loop muscle memory:",
      tasks: [
        "Loop 1 — Print numbers 1 to 20 using a for loop",
        "Loop 2 — Print only even numbers from 1 to 20 using the modulus operator % inside the loop",
        "Loop 3 — Given an array of names, use for...of to print 'Hello, [name]!' for each",
        "Loop 4 — Use a while loop to count down from 10 to 1, then print 'Blast off!'",
        "Loop 5 — Solve FizzBuzz for numbers 1 to 30 (divisible by 3 = Fizz, by 5 = Buzz, by both = FizzBuzz)",
      ],
      hint: "For Loop 2, remember that n % 2 === 0 means n is even. You can either use an if statement inside the loop or change the loop increment to i += 2.",
    },
    {
      title: "Challenge: Number Guessing Game",
      description: "Build a complete interactive number guessing game using everything you have learned:",
      tasks: [
        "Generate a random secret number: const secret = Math.floor(Math.random() * 100) + 1",
        "Use a while loop that keeps running until the player guesses correctly",
        "Inside the loop, use prompt() to ask the player for a guess",
        "Convert the input to a number: const guess = Number(prompt('Guess a number 1-100:'))",
        "Use if/else if/else to tell the player if their guess is too high, too low, or correct",
        "Count the number of attempts and display it when they win: 'You guessed it in 7 attempts!'",
        "Bonus: tell the player if they are 'very close' (within 5) using Math.abs(secret - guess) <= 5",
      ],
      hint: "prompt() returns a string — always convert it with Number() before comparing. Also check if the player entered a valid number with isNaN() to handle invalid inputs gracefully.",
    },
  ],
};

export default session13;