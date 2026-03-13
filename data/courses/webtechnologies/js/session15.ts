// data/courses/webtechnologies/javascript/session15.ts
import type { SessionData } from "@/types/session";

const session15: SessionData = {
  meta: {
    sessionNumber: 15,
    module: "javascript",
    moduleNumber: 3,
    title: "Functions & Scope",
    subtitle: "Master the building blocks of every JavaScript program — how to write reusable code, understand where variables live, and use modern arrow function syntax",
    duration: "2 hrs",
    color: "008000",
    colorDim: "rgba(247,223,30,0.10)",
    colorMid: "rgba(247,223,30,0.22)",
    objectives: [
      "Declare functions using function declarations, expressions, and arrow functions",
      "Understand the difference between parameters and arguments",
      "Use default parameters, rest parameters, and destructured parameters",
      "Understand return values and what happens without a return statement",
      "Explain the four types of scope: global, function, block, and module",
      "Understand variable hoisting and the temporal dead zone",
      "Write and use higher-order functions that accept or return functions",
      "Understand closures and why they are one of JavaScript's most powerful features",
    ],
    prevSession: { num: 14, title: "Variables, Data Types & Operators", href: "/courses/webtechnologies/javascript/session14" },
    nextSession: { num: 16, title: "Arrays & Array Methods", href: "/courses/webtechnologies/javascript/session16" },
  },

  topics: [
    // ── 1. WHAT IS A FUNCTION ─────────────────────────────────────
    {
      id: "what-is-a-function",
      heading: "What is a Function?",
      content:
        "A function is a named, reusable block of code that performs a specific task. Instead of writing the same logic over and over, you define it once and call it whenever you need it. Functions are the fundamental unit of code reuse in JavaScript — every program of any size is built from functions. A well-named function also makes code self-documenting: calculateTax(price) tells you exactly what it does without reading its internals. Functions can receive inputs (parameters), perform work, and return an output (return value).",
      tip: "A good function does ONE thing and does it well. If you find yourself naming a function doThisAndAlsoThat, it should probably be two functions.",
      codeExamples: [
        {
          label: "Anatomy of a Function",
          code: "//        name      parameters\n//         ↓           ↓\nfunction greet(firstName, lastName) {\n  // function body — the code that runs\n  const fullName = firstName + ' ' + lastName;\n  return 'Hello, ' + fullName + '!'; // return value\n}\n\n// Calling the function with arguments\nconst message = greet('Priya', 'Sharma');\nconsole.log(message); // 'Hello, Priya Sharma!'\n\n// Can be called as many times as needed\nconsole.log(greet('Arjun', 'Singh'));  // 'Hello, Arjun Singh!'\nconsole.log(greet('Fatima', 'Khan'));  // 'Hello, Fatima Khan!'",
        },
      ],
    },

    // ── 2. THREE WAYS TO DEFINE A FUNCTION ───────────────────────
    {
      id: "function-types",
      heading: "Three Ways to Define a Function",
      content:
        "JavaScript has three syntaxes for writing functions. A function declaration uses the function keyword and is hoisted — you can call it before it appears in your code. A function expression assigns an anonymous function to a variable — it is not hoisted and the variable rules (let/const) apply. An arrow function is the modern compact syntax introduced in ES6 — it uses => and is particularly useful for short callbacks. Arrow functions also behave differently with the this keyword, which matters in object methods and event handlers.",
      table: {
        headers: ["Syntax", "Hoisted?", "this binding", "Best Used For"],
        rows: [
          { cells: ["Function Declaration", "✅ Yes", "Own this", "Named, reusable top-level functions"] },
          { cells: ["Function Expression",  "❌ No",  "Own this", "Assigning functions to variables, conditionally"] },
          { cells: ["Arrow Function",        "❌ No",  "Inherited (lexical)", "Callbacks, array methods, short functions"] },
        ],
      },
      codeExamples: [
        {
          label: "Function Declaration",
          code: "// Can be called BEFORE it is defined — hoisted\nconsole.log(double(5)); // 10 — works!\n\nfunction double(n) {\n  return n * 2;\n}\n\nconsole.log(double(8)); // 16",
        },
        {
          label: "Function Expression",
          code: "// Cannot be called before this line — not hoisted\n// console.log(square(5)); // ReferenceError!\n\nconst square = function(n) {\n  return n * n;\n};\n\nconsole.log(square(4));  // 16\nconsole.log(square(9));  // 81\n\n// Named function expression — useful for recursion and stack traces\nconst factorial = function fact(n) {\n  return n <= 1 ? 1 : n * fact(n - 1);\n};\nconsole.log(factorial(5)); // 120",
        },
        {
          label: "Arrow Function",
          code: "// Full arrow function\nconst add = (a, b) => {\n  return a + b;\n};\n\n// Concise body — implicit return when body is a single expression\nconst add2 = (a, b) => a + b;\n\n// Single parameter — parentheses optional\nconst triple = n => n * 3;\n\n// No parameters — empty parens required\nconst greet = () => 'Hello!';\n\n// Returning an object literal — wrap in parentheses\nconst makeUser = (name, age) => ({ name, age });\n\nconsole.log(add(3, 4));         // 7\nconsole.log(triple(6));         // 18\nconsole.log(greet());           // 'Hello!'\nconsole.log(makeUser('Ali',25));// { name: 'Ali', age: 25 }",
        },
      ],
    },

    // ── 3. PARAMETERS & ARGUMENTS ────────────────────────────────
    {
      id: "parameters-and-arguments",
      heading: "Parameters, Arguments & Return Values",
      content:
        "Parameters are the variable names listed in the function definition — they are placeholders. Arguments are the actual values you pass when calling the function. JavaScript is flexible: if you pass fewer arguments than parameters, the missing ones become undefined. If you pass more arguments than parameters, the extras are silently ignored (but available via the arguments object). The return statement ends the function immediately and sends a value back to the caller. Without a return statement (or with a bare return), the function returns undefined.",
      warning: "A function stops executing the moment it hits a return statement — any code after return in the same block is unreachable and never runs.",
      codeExamples: [
        {
          label: "Default Parameters",
          code: "// Without default — missing args become undefined\nfunction greet(name) {\n  return 'Hello, ' + name;\n}\nconsole.log(greet());          // 'Hello, undefined'\n\n// With default parameter values\nfunction greetWithDefault(name = 'stranger', greeting = 'Hello') {\n  return greeting + ', ' + name + '!';\n}\nconsole.log(greetWithDefault());                  // 'Hello, stranger!'\nconsole.log(greetWithDefault('Priya'));           // 'Hello, Priya!'\nconsole.log(greetWithDefault('Arjun', 'Welcome'));// 'Welcome, Arjun!'\n\n// Defaults can reference earlier parameters\nfunction createUser(name, role = 'user', id = name.toLowerCase()) {\n  return { name, role, id };\n}\nconsole.log(createUser('Fatima'));\n// { name: 'Fatima', role: 'user', id: 'fatima' }",
        },
        {
          label: "Rest Parameters — Accepting Any Number of Arguments",
          code: "// ...nums collects all arguments into an array\nfunction sum(...nums) {\n  let total = 0;\n  for (const n of nums) total += n;\n  return total;\n}\nconsole.log(sum(1, 2, 3));          // 6\nconsole.log(sum(10, 20, 30, 40));   // 100\nconsole.log(sum());                  // 0\n\n// Mix fixed and rest — rest must be last\nfunction logWithPrefix(prefix, ...messages) {\n  for (const msg of messages) {\n    console.log('[' + prefix + '] ' + msg);\n  }\n}\nlogWithPrefix('INFO', 'Server started', 'Port: 3000', 'Ready');\n// [INFO] Server started\n// [INFO] Port: 3000\n// [INFO] Ready",
        },
        {
          label: "Return Values & Early Return",
          code: "// Functions return undefined without an explicit return\nfunction noReturn() {\n  const x = 10; // does work but returns nothing\n}\nconsole.log(noReturn()); // undefined\n\n// Early return — exit as soon as you have the answer\nfunction isEven(n) {\n  if (n % 2 === 0) return true;  // exits here if even\n  return false;                   // only reached if odd\n}\n\n// Even cleaner\nfunction isEven2(n) {\n  return n % 2 === 0; // comparison returns boolean directly\n}\n\n// Guard clauses — return early on invalid input\nfunction divide(a, b) {\n  if (b === 0) return 'Cannot divide by zero';\n  if (typeof a !== 'number' || typeof b !== 'number') return 'Invalid input';\n  return a / b;\n}\nconsole.log(divide(10, 2));  // 5\nconsole.log(divide(10, 0));  // 'Cannot divide by zero'",
        },
      ],
    },

    // ── 4. SCOPE ─────────────────────────────────────────────────
    {
      id: "scope",
      heading: "Scope — Where Variables Live",
      content:
        "Scope determines where a variable is accessible in your code. JavaScript has four types of scope. Global scope — variables declared outside any function or block are accessible everywhere in the file. Function scope — variables declared inside a function only exist within that function. Block scope — variables declared with let or const inside any curly braces (if, for, while) only exist within that block. Module scope — in ES modules, each file has its own scope, so top-level variables are not global unless explicitly exported. Understanding scope prevents variable name collisions and makes code more predictable.",
      tip: "Think of scope as visibility. A variable in a function cannot be seen from outside it. But a function can see variables from its outer scope. Scope is one-way looking glass — inner sees outer, outer cannot see inner.",
      codeExamples: [
        {
          label: "Global vs Function vs Block Scope",
          code: "// Global scope — accessible everywhere\nconst appName = 'MyApp';\n\nfunction showName() {\n  // Function scope — only inside this function\n  const version = '1.0';\n  console.log(appName + ' v' + version); // Can access global\n}\n\nshowName(); // 'MyApp v1.0'\n// console.log(version); // ReferenceError — version is function-scoped\n\n// Block scope — let and const\nif (true) {\n  let blockVar = 'I am block scoped';\n  const blockConst = 'Me too';\n  var functionVar = 'I leak out of blocks!';\n  console.log(blockVar); // works inside\n}\n\n// console.log(blockVar);   // ReferenceError — block scoped\nconsole.log(functionVar);    // 'I leak out of blocks!' — var ignores blocks",
        },
        {
          label: "Scope Chain — Inner Functions See Outer Variables",
          code: "const globalMsg = 'I am global';\n\nfunction outer() {\n  const outerMsg = 'I am from outer';\n\n  function inner() {\n    const innerMsg = 'I am from inner';\n    // inner can see ALL outer scopes\n    console.log(globalMsg);  // 'I am global'\n    console.log(outerMsg);   // 'I am from outer'\n    console.log(innerMsg);   // 'I am from inner'\n  }\n\n  inner();\n  // console.log(innerMsg); // ReferenceError — outer cannot see inner\n}\n\nouter();\n// console.log(outerMsg); // ReferenceError — global cannot see outer",
        },
        {
          label: "var Leaks Out of Blocks — Why let/const Are Better",
          code: "// var inside a for loop leaks into the surrounding function\nfunction badLoop() {\n  for (var i = 0; i < 3; i++) {\n    console.log(i); // 0, 1, 2 — works as expected here\n  }\n  console.log('After loop, i is:', i); // 3 — var leaked out!\n}\n\nfunction goodLoop() {\n  for (let i = 0; i < 3; i++) {\n    console.log(i); // 0, 1, 2\n  }\n  // console.log(i); // ReferenceError — let stays in the block\n}\n\nbadLoop();\ngoodLoop();",
        },
      ],
    },

    // ── 5. HOISTING ──────────────────────────────────────────────
    {
      id: "hoisting",
      heading: "Hoisting & the Temporal Dead Zone",
      content:
        "Hoisting is JavaScript's behaviour of moving declarations to the top of their scope before execution. Function declarations are fully hoisted — both the name and the body — so you can call them before they appear in your code. var declarations are hoisted but their value is not — they are initialised to undefined until the assignment runs. let and const declarations are hoisted too but NOT initialised — accessing them before their line throws a ReferenceError. The period between the start of the scope and the let/const initialisation is called the Temporal Dead Zone (TDZ).",
      codeExamples: [
        {
          label: "Hoisting Behaviour by Keyword",
          code: "// Function declaration — fully hoisted, callable anywhere\nconst result = add(2, 3);\nconsole.log(result); // 5 — works before the definition!\n\nfunction add(a, b) { return a + b; }\n\n// var — declaration hoisted, value is NOT\nconsole.log(x); // undefined (not ReferenceError — declaration was hoisted)\nvar x = 10;\nconsole.log(x); // 10\n\n// let — in the Temporal Dead Zone until this line\n// console.log(y); // ReferenceError: Cannot access 'y' before initialization\nlet y = 20;\nconsole.log(y); // 20\n\n// const — same as let, TDZ applies\n// console.log(PI); // ReferenceError\nconst PI = 3.14;\nconsole.log(PI); // 3.14",
        },
      ],
      warning: "Never rely on hoisting for function calls — it makes code harder to read. Always define functions before calling them, even though declarations allow the reverse. The TDZ is a safety feature — it prevents you from accidentally using a variable before it has a value.",
    },

    // ── 6. HIGHER-ORDER FUNCTIONS ────────────────────────────────
    {
      id: "higher-order-functions",
      heading: "Higher-Order Functions — Functions as Values",
      content:
        "In JavaScript, functions are first-class citizens — they can be stored in variables, passed as arguments to other functions, and returned from functions. A higher-order function is any function that either accepts another function as an argument (a callback) or returns a function. This is one of the most powerful patterns in JavaScript. The built-in array methods map, filter, and reduce are higher-order functions. Writing your own higher-order functions lets you build elegant, reusable abstractions.",
      codeExamples: [
        {
          label: "Passing Functions as Arguments (Callbacks)",
          code: "// A function that accepts another function as an argument\nfunction applyTwice(fn, value) {\n  return fn(fn(value));\n}\n\nconst double = n => n * 2;\nconst addTen = n => n + 10;\n\nconsole.log(applyTwice(double, 3));  // double(double(3)) = double(6) = 12\nconsole.log(applyTwice(addTen, 5)); // addTen(addTen(5)) = addTen(15) = 25\n\n// setTimeout takes a callback — runs it after a delay\nsetTimeout(() => console.log('1 second later!'), 1000);\n\n// Array .forEach takes a callback — runs it for each element\n['Priya', 'Arjun', 'Fatima'].forEach(name => {\n  console.log('Hello, ' + name + '!');\n});",
        },
        {
          label: "Returning Functions (Function Factories)",
          code: "// A function that returns another function\nfunction multiplier(factor) {\n  return function(number) {\n    return number * factor;\n  };\n}\n\nconst double   = multiplier(2);\nconst triple   = multiplier(3);\nconst tenTimes = multiplier(10);\n\nconsole.log(double(5));   // 10\nconsole.log(triple(5));   // 15\nconsole.log(tenTimes(5)); // 50\n\n// Arrow function version — more concise\nconst makeMultiplier = factor => number => number * factor;\nconst quadruple = makeMultiplier(4);\nconsole.log(quadruple(7)); // 28",
        },
        {
          label: "Array Higher-Order Methods Preview",
          code: "const scores = [55, 92, 78, 43, 88, 61];\n\n// .map — transform every element, returns new array\nconst doubled = scores.map(s => s * 2);\nconsole.log(doubled); // [110, 184, 156, 86, 176, 122]\n\n// .filter — keep elements where callback returns true\nconst passing = scores.filter(s => s >= 60);\nconsole.log(passing); // [92, 78, 88, 61]\n\n// .reduce — fold array down to a single value\nconst total = scores.reduce((acc, s) => acc + s, 0);\nconst average = total / scores.length;\nconsole.log(average.toFixed(1)); // '69.5'\n\n// Chain them together\nconst avgPassing = scores\n  .filter(s => s >= 60)\n  .reduce((acc, s, _, arr) => acc + s / arr.length, 0);\nconsole.log(avgPassing.toFixed(1)); // '79.8'",
        },
      ],
    },

    // ── 7. CLOSURES ──────────────────────────────────────────────
    {
      id: "closures",
      heading: "Closures — Functions That Remember",
      content:
        "A closure is formed when a function is defined inside another function and references variables from the outer function's scope. The inner function retains access to those outer variables even after the outer function has finished executing. The inner function carries a backpack of references to its surrounding scope — that backpack is the closure. Closures are used to create private state, build factory functions, implement the module pattern, and power many popular JavaScript libraries. Understanding closures is one of the milestones of JavaScript mastery.",
      tip: "Closures don't copy the value of outer variables — they keep a live reference. If the outer variable changes, the closure sees the new value.",
      codeExamples: [
        {
          label: "A Counter — The Classic Closure Example",
          code: "function makeCounter(start = 0) {\n  let count = start; // private — cannot be accessed from outside\n\n  return {\n    increment() { return ++count; },\n    decrement() { return --count; },\n    reset()     { count = start; return count; },\n    value()     { return count; }\n  };\n}\n\nconst counter = makeCounter(10);\nconsole.log(counter.increment()); // 11\nconsole.log(counter.increment()); // 12\nconsole.log(counter.decrement()); // 11\nconsole.log(counter.value());     // 11\nconsole.log(counter.reset());     // 10\n\n// count is truly private — no way to access it directly\n// console.log(counter.count); // undefined",
        },
        {
          label: "Closure Preserves Outer Variables After Function Exits",
          code: "function makeAdder(x) {\n  // x lives in makeAdder's scope\n  return function(y) {\n    return x + y; // still has access to x via closure\n  };\n}\n\n// makeAdder(5) ran and FINISHED — but the returned function\n// still holds a reference to x = 5 in its closure\nconst add5  = makeAdder(5);\nconst add10 = makeAdder(10);\n\nconsole.log(add5(3));  // 8   (5 + 3)\nconsole.log(add5(7));  // 12  (5 + 7)\nconsole.log(add10(3)); // 13  (10 + 3)\n\n// add5 and add10 each closed over different values of x",
        },
        {
          label: "Practical Closure — Memoisation Cache",
          code: "// Cache expensive computation results\nfunction memoize(fn) {\n  const cache = {}; // private cache, lives in closure\n\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (key in cache) {\n      console.log('Cache hit!');\n      return cache[key];\n    }\n    const result = fn(...args);\n    cache[key] = result;\n    return result;\n  };\n}\n\nconst slowSquare = n => {\n  // imagine this is expensive\n  return n * n;\n};\n\nconst fastSquare = memoize(slowSquare);\nconsole.log(fastSquare(12)); // computed: 144\nconsole.log(fastSquare(12)); // Cache hit! — 144\nconsole.log(fastSquare(7));  // computed: 49",
        },
      ],
    },

    // ── 8. IIFE & PRACTICAL PATTERNS ─────────────────────────────
    {
      id: "practical-patterns",
      heading: "IIFE and Practical Function Patterns",
      content:
        "An Immediately Invoked Function Expression (IIFE) is a function that defines and calls itself in the same statement. It creates a private scope that does not pollute the global scope — widely used before ES modules existed and still useful for isolating code. Pure functions are functions that always return the same output for the same input and have no side effects — they never read from or write to anything outside their parameters. Pure functions are predictable, easy to test, and safe to use anywhere.",
      codeExamples: [
        {
          label: "IIFE — Immediately Invoked Function Expression",
          code: "// Syntax: wrap function in () then call with ()\n(function() {\n  const privateVar = 'I am private';\n  console.log('IIFE ran! ' + privateVar);\n})();\n\n// console.log(privateVar); // ReferenceError — truly private\n\n// Arrow IIFE\n(() => {\n  const config = { debug: true, version: '2.0' };\n  console.log('Config loaded:', config.version);\n})();\n\n// IIFE with a return value\nconst appConfig = (() => {\n  const env = 'production';\n  return {\n    env,\n    debug: env !== 'production',\n    apiUrl: 'https://api.example.com'\n  };\n})();\nconsole.log(appConfig.env);   // 'production'\nconsole.log(appConfig.debug); // false",
        },
        {
          label: "Pure vs Impure Functions",
          code: "// IMPURE — reads from external state, produces side effects\nlet taxRate = 0.18;\nfunction calculateTaxImpure(price) {\n  return price * taxRate; // depends on external variable\n}\n// If taxRate changes, same input gives different output!\n\n// PURE — same input always gives same output, no side effects\nfunction calculateTax(price, rate) {\n  return price * rate; // only depends on its parameters\n}\nconsole.log(calculateTax(1000, 0.18)); // always 180\nconsole.log(calculateTax(1000, 0.18)); // always 180\n\n// IMPURE — modifies external array\nconst items = [1, 2, 3];\nfunction addItemImpure(item) {\n  items.push(item); // side effect — mutates external data\n}\n\n// PURE — returns a new array, never mutates\nfunction addItemPure(arr, item) {\n  return [...arr, item]; // new array, original untouched\n}\nconsole.log(addItemPure(items, 4)); // [1, 2, 3, 4]\nconsole.log(items);                 // [1, 2, 3] — unchanged",
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-function-types",
      label: "Function Syntax",
      html: `<style>
  .fn-block { background:#f8f9fa; border-radius:10px; padding:14px; margin-bottom:12px; }
  .fn-code  { background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:8px; font-family:'Courier New',monospace; font-size:0.71rem; line-height:1.75; margin-bottom:8px; }
  .fn-out   { background:#f0fdf4; color:#166534; padding:8px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.72rem; border-left:3px solid #22c55e; }
  .kw { color:#569cd6 }
  .fn-name { color:#dcdcaa }
  .str { color:#ce9178 }
  .num { color:#b5cea8 }
  .cm  { color:#6a9955 }
  .op  { color:#c586c0 }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Three syntaxes — same result, different rules:</p>

  <div class="fn-block">
    <p style="font-weight:700;color:#11998e;margin-bottom:8px">① Function Declaration — hoisted, callable anywhere</p>
    <div class="fn-code">
      <span class="kw">function</span> <span class="fn-name">add</span>(a, b) {<br>
      &nbsp;&nbsp;<span class="kw">return</span> a + b;<br>
      }<br>
      <span class="cm">// Can call BEFORE the definition — hoisted</span><br>
      console.log(<span class="fn-name">add</span>(<span class="num">3</span>, <span class="num">4</span>));
    </div>
    <div class="fn-out">→ 7</div>
  </div>

  <div class="fn-block">
    <p style="font-weight:700;color:#3498db;margin-bottom:8px">② Function Expression — not hoisted, assigned to variable</p>
    <div class="fn-code">
      <span class="kw">const</span> square = <span class="kw">function</span>(n) {<br>
      &nbsp;&nbsp;<span class="kw">return</span> n * n;<br>
      };<br>
      console.log(square(<span class="num">9</span>));
    </div>
    <div class="fn-out">→ 81</div>
  </div>

  <div class="fn-block">
    <p style="font-weight:700;color:#9b59b6;margin-bottom:8px">③ Arrow Function — concise, lexical this</p>
    <div class="fn-code">
      <span class="cm">// Block body</span><br>
      <span class="kw">const</span> greet = (name) <span class="op">=></span> {<br>
      &nbsp;&nbsp;<span class="kw">return</span> <span class="str">'Hello, '</span> + name;<br>
      };<br><br>
      <span class="cm">// Concise body — implicit return</span><br>
      <span class="kw">const</span> double <span class="op">=</span> n <span class="op">=></span> n * <span class="num">2</span>;<br>
      <span class="kw">const</span> noArgs <span class="op">=</span> () <span class="op">=></span> <span class="str">'no params'</span>;<br><br>
      console.log(greet(<span class="str">'Priya'</span>));<br>
      console.log(double(<span class="num">7</span>));
    </div>
    <div class="fn-out">→ 'Hello, Priya'<br>→ 14</div>
  </div>

  <div style="background:#fef9c3;border-left:3px solid #fde047;padding:10px 14px;border-radius:0 8px 8px 0;font-size:0.75rem;color:#713f12">
    <strong>Arrow shorthand rules:</strong> Single param → no parens needed. Single expression body → no braces, no return keyword. Returning an object → wrap in <code>( )</code> to avoid confusion with a block.
  </div>
</div>`,
    },

    {
      id: "demo-scope",
      label: "Scope",
      html: `<style>
  .scope-layer {
    border-radius: 10px; padding: 14px; position: relative; margin-bottom: 4px;
  }
  .scope-label {
    font-size: 0.68rem; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.08em; margin-bottom: 8px;
  }
  .scope-var {
    display: inline-block; padding: 4px 10px; border-radius: 6px;
    font-family: 'Courier New', monospace; font-size: 0.72rem;
    font-weight: 700; margin: 3px 4px;
  }
  .scope-arrow { text-align:center; font-size:0.72rem; color:#888; margin:2px 0; }
  .access-row { display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:0.78rem; }
  .tick { color:#22c55e; font-weight:800 }
  .cross { color:#ef4444; font-weight:800 }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Scope is nested — inner scopes see outer, not the reverse:</p>

  <div class="scope-layer" style="background:#fef9c3;border:2px solid #fde047">
    <div class="scope-label" style="color:#92400e">🌐 Global Scope</div>
    <div class="scope-var" style="background:#fde047;color:#92400e">appName = 'MyApp'</div>

    <div class="scope-arrow">↓ outer() can see global</div>

    <div class="scope-layer" style="background:#dbeafe;border:2px solid #93c5fd">
      <div class="scope-label" style="color:#1e3a8a">🔵 Function Scope — outer()</div>
      <div class="scope-var" style="background:#93c5fd;color:#1e3a8a">version = '1.0'</div>

      <div class="scope-arrow">↓ inner() can see outer() and global</div>

      <div class="scope-layer" style="background:#dcfce7;border:2px solid #86efac">
        <div class="scope-label" style="color:#14532d">🟢 Function Scope — inner()</div>
        <div class="scope-var" style="background:#86efac;color:#14532d">message = 'Hi!'</div>
        <div style="font-size:0.72rem;color:#14532d;margin-top:6px">✓ Can access: appName, version, message</div>
      </div>
    </div>
  </div>

  <div style="background:#f8f9fa;border-radius:10px;padding:14px;margin-top:12px">
    <p style="font-weight:700;color:#374151;margin-bottom:8px">Who can access what?</p>
    ${[
      ["Global scope",       "appName",        true,  "always accessible"],
      ["outer() scope",      "version",        true,  "accessible inside outer and inner"],
      ["inner() scope",      "message",        false, "only accessible inside inner"],
      ["outer accessing",    "message",        false, "outer cannot see inner's variables"],
      ["Block (let/const)",  "blockVar",       false, "stays inside { } where declared"],
      ["Block (var)",        "varVariable",    true,  "var leaks outside blocks — avoid!"],
    ].map(([scope, varname, canAccess, note]) => `
    <div class="access-row">
      <span class="${canAccess ? 'tick' : 'cross'}">${canAccess ? '✓' : '✗'}</span>
      <code style="background:#f0f4f8;padding:2px 7px;border-radius:4px;font-size:0.72rem">${varname}</code>
      <span style="color:#6b7280;font-size:0.75rem">${note}</span>
    </div>`).join("")}
  </div>
</div>`,
    },

    {
      id: "demo-hof",
      label: "Higher-Order Functions",
      html: `<style>
  .hof-code { background:#1e1e1e; color:#d4d4d4; padding:12px 14px; border-radius:8px; font-family:'Courier New',monospace; font-size:0.71rem; line-height:1.75; margin-bottom:8px; }
  .hof-out  { background:#f0fdf4; color:#166534; padding:8px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.72rem; border-left:3px solid #22c55e; margin-bottom:12px; }
  .kw { color:#569cd6 } .fn { color:#dcdcaa } .str { color:#ce9178 } .num { color:#b5cea8 } .cm { color:#6a9955 }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Functions as arguments, functions as return values:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">Passing a function as an argument</p>
  <div class="hof-code">
    <span class="kw">function</span> <span class="fn">applyTwice</span>(fn, value) {<br>
    &nbsp;&nbsp;<span class="kw">return</span> fn(fn(value)); <span class="cm">// calls fn twice</span><br>
    }<br><br>
    <span class="kw">const</span> double = n => n * <span class="num">2</span>;<br>
    console.log(<span class="fn">applyTwice</span>(double, <span class="num">3</span>));
  </div>
  <div class="hof-out">→ 12 &nbsp;(double(double(3)) = double(6) = 12)</div>

  <p style="font-weight:700;color:#3498db;margin-bottom:6px">Returning a function (factory pattern)</p>
  <div class="hof-code">
    <span class="kw">const</span> <span class="fn">multiplier</span> = factor => number => number * factor;<br><br>
    <span class="kw">const</span> double   = <span class="fn">multiplier</span>(<span class="num">2</span>);<br>
    <span class="kw">const</span> triple   = <span class="fn">multiplier</span>(<span class="num">3</span>);<br><br>
    console.log(double(<span class="num">5</span>)); <span class="cm">// 10</span><br>
    console.log(triple(<span class="num">5</span>)); <span class="cm">// 15</span>
  </div>
  <div class="hof-out">→ 10 &nbsp;→ 15</div>

  <p style="font-weight:700;color:#9b59b6;margin-bottom:6px">Array methods are higher-order functions</p>
  <div class="hof-code">
    <span class="kw">const</span> scores = [<span class="num">55</span>, <span class="num">92</span>, <span class="num">78</span>, <span class="num">43</span>, <span class="num">88</span>];<br><br>
    scores.<span class="fn">map</span>(s => s * <span class="num">2</span>);<br>
    <span class="cm">// [110, 184, 156, 86, 176]</span><br><br>
    scores.<span class="fn">filter</span>(s => s >= <span class="num">60</span>);<br>
    <span class="cm">// [92, 78, 88]</span><br><br>
    scores.<span class="fn">reduce</span>((acc, s) => acc + s, <span class="num">0</span>);<br>
    <span class="cm">// 356 (total)</span>
  </div>
  <div class="hof-out">map → transforms &nbsp;|&nbsp; filter → selects &nbsp;|&nbsp; reduce → folds to one value</div>
</div>`,
    },

    {
      id: "demo-closures",
      label: "Closures",
      html: `<style>
  .cl-code { background:#1e1e1e; color:#d4d4d4; padding:12px 14px; border-radius:8px; font-family:'Courier New',monospace; font-size:0.71rem; line-height:1.8; margin-bottom:8px; }
  .cl-out  { background:#f0fdf4; color:#166534; padding:8px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.72rem; border-left:3px solid #22c55e; margin-bottom:14px; }
  .kw  { color:#569cd6 } .fn { color:#dcdcaa } .str { color:#ce9178 } .num { color:#b5cea8 } .cm { color:#6a9955 } .hi { color:#f7df1e; font-weight:700 }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">A closure is a function that remembers its outer scope even after that scope has closed:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">Counter — private state via closure</p>
  <div class="cl-code">
    <span class="kw">function</span> <span class="fn">makeCounter</span>() {<br>
    &nbsp;&nbsp;<span class="kw">let</span> <span class="hi">count</span> = <span class="num">0</span>; <span class="cm">// private — lives in closure</span><br>
    &nbsp;&nbsp;<span class="kw">return</span> {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;increment: () => ++<span class="hi">count</span>, <span class="cm">// ← still sees count!</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;value: () => <span class="hi">count</span><br>
    &nbsp;&nbsp;};<br>
    }<br><br>
    <span class="kw">const</span> c = <span class="fn">makeCounter</span>(); <span class="cm">// makeCounter() finished...</span><br>
    c.increment(); c.increment(); c.increment();<br>
    console.log(c.value()); <span class="cm">// ...but count is still 3!</span>
  </div>
  <div class="cl-out">→ 3 — count persists in the closure even after makeCounter returned</div>

  <p style="font-weight:700;color:#3498db;margin-bottom:6px">Factory — each closure captures its own value</p>
  <div class="cl-code">
    <span class="kw">const</span> add5  = <span class="fn">makeAdder</span>(<span class="num">5</span>);  <span class="cm">// closes over x=5</span><br>
    <span class="kw">const</span> add10 = <span class="fn">makeAdder</span>(<span class="num">10</span>); <span class="cm">// closes over x=10</span><br><br>
    console.log(add5(<span class="num">3</span>));  <span class="cm">// 5+3 = 8</span><br>
    console.log(add10(<span class="num">3</span>)); <span class="cm">// 10+3 = 13</span>
  </div>
  <div class="cl-out">→ 8 &nbsp;&nbsp;→ 13 — two closures, two independent values of x</div>

  <div style="background:#f5f3ff;border-left:3px solid #9b59b6;padding:10px 14px;border-radius:0 8px 8px 0;font-size:0.75rem;color:#4c1d95">
    <strong>Mental model:</strong> When a function is created inside another function, it gets a <em>backpack</em> containing references to all the outer variables it uses. Even when the outer function finishes and its stack frame is gone, the backpack survives as long as the inner function exists.
  </div>
</div>`,
    },

    {
      id: "demo-params",
      label: "Parameters",
      html: `<style>
  .p-row { display:flex; gap:10px; margin-bottom:8px; align-items:flex-start; }
  .p-code { background:#1e1e1e; color:#d4d4d4; padding:8px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.71rem; flex:1; line-height:1.6; }
  .p-out  { background:#f0fdf4; color:#166534; padding:7px 10px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.71rem; min-width:160px; border:1px solid #86efac; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Default parameters, rest, destructured — all parameter flavours:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px">Default Parameters</p>
  ${[
    ["greet() — no args",              "greet(name='stranger')  →  call with no args",    "'Hello, stranger!'"],
    ["greet('Priya') — one arg",       "greet(name='stranger')  →  call with 'Priya'",   "'Hello, Priya!'"],
  ].map(([label, code, out]) => `
  <div class="p-row" style="margin-bottom:4px">
    <div class="p-code">${code}</div>
    <div class="p-out">${out}</div>
  </div>`).join("")}

  <p style="font-weight:700;color:#3498db;margin-bottom:6px;margin-top:10px">Rest Parameters</p>
  ${[
    ["sum(1, 2, 3)",       "function sum(...nums) — nums is [1,2,3]",    "6"],
    ["sum(10, 20, 30, 40)","function sum(...nums) — nums is [10,20,30,40]","100"],
  ].map(([label, code, out]) => `
  <div class="p-row" style="margin-bottom:4px">
    <div class="p-code">${code}</div>
    <div class="p-out">${out}</div>
  </div>`).join("")}

  <p style="font-weight:700;color:#9b59b6;margin-bottom:6px;margin-top:10px">Destructured Parameters</p>
  <div class="p-row">
    <div class="p-code">function show({ name, score = 0 })<br>show({ name: 'Priya', score: 95 })</div>
    <div class="p-out">'Priya scored 95'</div>
  </div>
  <div class="p-row">
    <div class="p-code">function show({ name, score = 0 })<br>show({ name: 'Arjun' })</div>
    <div class="p-out">'Arjun scored 0' (default)</div>
  </div>

  <div style="margin-top:10px;background:#fef9c3;border-left:3px solid #fde047;padding:9px 13px;border-radius:0 8px 8px 0;font-size:0.75rem;color:#713f12">
    <strong>Rest must be last:</strong> <code>function fn(a, b, ...rest)</code> ✅ &nbsp;&nbsp; <code>function fn(...rest, a)</code> ❌ SyntaxError
  </div>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Function Syntax Practice",
      description: "Write the same function three ways to build syntax confidence:",
      tasks: [
        "Write a function isEven(n) as a function declaration — returns true if n is even",
        "Write the same function as a function expression assigned to const isEven2",
        "Write the same function as an arrow function const isEven3 = n => ...",
        "Write a function clamp(value, min, max) that returns value, but no lower than min and no higher than max",
        "Write a function repeat(str, times = 1) with a default parameter — returns str repeated times times",
        "Test all functions with several inputs including edge cases (0, negatives, exactly at min/max)",
      ],
      hint: "For clamp: return Math.min(Math.max(value, min), max) — or use if/else. For the arrow version of isEven, a single expression body means no braces or return needed.",
    },
    {
      title: "Exercise 2: Scope & Hoisting",
      description: "Predict and verify what code outputs to build scope intuition:",
      tasks: [
        "Predict the output before running: declare var x = 1 globally, then in a function declare var x = 2 and log it, then log x outside the function",
        "Try the same with let — what changes?",
        "Write a function that has three nested functions, each logging a variable from every outer scope — verify the scope chain works",
        "Demonstrate hoisting: call a function declaration BEFORE it is defined and verify it works",
        "Try to use a let variable before it is declared — read the exact error message",
        "Write a loop using var and log the counter after the loop — then repeat with let and compare",
      ],
      hint: "For the var/let loop test: after a for (var i = 0; i < 5; i++) loop, logging i gives 5 (leaked). After for (let i ...), logging i throws ReferenceError.",
    },
    {
      title: "Exercise 3: Higher-Order Functions & Closures",
      description: "Build reusable abstractions using functions as values:",
      tasks: [
        "Write a function compose(f, g) that returns a new function applying f(g(x)) — test it by composing double and addOne",
        "Write a function makeMultiplier(factor) that returns a function — create triple, quadruple, and half from it",
        "Write a function once(fn) that returns a version of fn that can only be called one time — subsequent calls return the first result",
        "Write a makeCounter(start, step) factory — counter should support increment(), decrement(), reset(), and value() — the count should be truly private",
        "Write a memoize(fn) function that caches results — test it with a function that logs 'computing...' so you can see cache hits",
        "Use .map(), .filter(), and .reduce() together: from an array of student objects {name, score}, filter passing students (>=60), map to just their names, then join into a comma-separated string",
      ],
      hint: "For once(fn): use a closure to store a called boolean and the first return value. For compose(f, g): return x => f(g(x)).",
    },
    {
      title: "Challenge: Build a Mini Utility Library",
      description: "Create a small library of reusable higher-order functions:",
      tasks: [
        "pipe(...fns) — takes any number of functions and returns a function that passes a value through each in sequence (left to right)",
        "debounce(fn, delay) — returns a version of fn that only runs after delay ms have passed since the last call (use setTimeout and clearTimeout)",
        "partial(fn, ...presetArgs) — returns a function with some arguments pre-filled, remaining args accepted on the call",
        "curry(fn) — converts a two-argument function into a chain of single-argument functions: add(3)(4) === add(3, 4)",
        "Test pipe by building a string processing pipeline: pipe(trim, toLowerCase, addExclamation) applied to '  Hello World  '",
        "Explain in comments how each function uses closures to preserve state between calls",
      ],
      hint: "pipe: reduce over the fns array, passing the accumulated value through each. partial: return (...laterArgs) => fn(...presetArgs, ...laterArgs). curry: return a => b => fn(a, b).",
    },
  ],
};

export default session15;