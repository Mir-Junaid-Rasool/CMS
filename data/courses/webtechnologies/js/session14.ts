// data/courses/webtechnologies/javascript/session14.ts
import type { SessionData } from "@/types/session";

const session14: SessionData = {
  meta: {
    sessionNumber: 14,
    module: "javascript",
    moduleNumber: 3,
    title: "Variables, Data Types & Operators",
    subtitle: "A deep dive into how JavaScript stores, classifies, and transforms data — the foundation every program is built on",
    duration: "2 hrs",
    color: "008000",
    colorDim: "rgba(247,223,30,0.10)",
    colorMid: "rgba(247,223,30,0.22)",
    objectives: [
      "Understand memory and how variables store references vs values",
      "Master string methods: length, slice, includes, replace, split, and more",
      "Work with numbers: parseInt, parseFloat, toFixed, Math methods",
      "Understand type coercion — when JavaScript converts types automatically",
      "Explicitly convert between types with Number(), String(), Boolean()",
      "Use nullish coalescing (??) and optional chaining (?.) operators",
      "Destructure arrays and objects into variables cleanly",
      "Use the spread (...) and rest (...) operators",
    ],
    prevSession: { num: 13, title: "JavaScript Introduction & Basics", href: "/courses/webtechnologies/javascript/session13" },
    nextSession: { num: 15, title: "Functions & Scope", href: "/courses/webtechnologies/javascript/session15" },
  },

  topics: [
    // ── 1. MEMORY — VALUES VS REFERENCES ─────────────────────────
    {
      id: "values-vs-references",
      heading: "How JavaScript Stores Data — Values vs References",
      content:
        "Understanding how JavaScript stores variables in memory prevents a whole category of confusing bugs. Primitive values (strings, numbers, booleans, null, undefined) are stored by value — when you copy one into another variable, you get a completely independent copy. Objects and arrays are stored by reference — when you assign one to another variable, both variables point to the exact same object in memory. Changing it through one variable changes it for both. This surprises almost every beginner the first time they encounter it.",
      warning: "Arrays and objects are passed by reference. If you need an independent copy of an array, use [...arr] (spread). For objects, use {...obj}. Otherwise both variables will share the same data.",
      codeExamples: [
        {
          label: "Primitive — Copied by Value",
          code: "let a = 10;\nlet b = a;   // b gets a COPY of the value 10\nb = 99;      // changing b does NOT affect a\n\nconsole.log(a); // 10  — unchanged\nconsole.log(b); // 99",
        },
        {
          label: "Object — Copied by Reference",
          code: "const user1 = { name: 'Priya', score: 100 };\nconst user2 = user1;  // user2 points to the SAME object\n\nuser2.name = 'Arjun'; // modifying through user2...\n\nconsole.log(user1.name); // 'Arjun' — user1 was ALSO changed!\nconsole.log(user2.name); // 'Arjun'\n\n// Fix: make a true copy with spread\nconst user3 = { ...user1 }; // independent copy\nuser3.name = 'Fatima';\nconsole.log(user1.name); // 'Arjun' — user1 unchanged now",
        },
        {
          label: "Array — Same Reference Trap",
          code: "const original = [1, 2, 3];\nconst alias    = original;  // same array in memory\nalias.push(4);\n\nconsole.log(original); // [1, 2, 3, 4] — oops!\n\n// Fix: spread creates a shallow copy\nconst copy = [...original];\ncopy.push(5);\nconsole.log(original); // [1, 2, 3, 4] — safe now\nconsole.log(copy);     // [1, 2, 3, 4, 5]",
        },
      ],
    },

    // ── 2. STRINGS IN DEPTH ───────────────────────────────────────
    {
      id: "strings-in-depth",
      heading: "Strings — Methods & Properties",
      content:
        "Strings in JavaScript are immutable — you cannot change a character in place, but you can call methods that return new modified strings. Every string has a length property and dozens of built-in methods. The most useful ones cover searching (includes, startsWith, endsWith, indexOf), extracting (slice, substring), transforming (toUpperCase, toLowerCase, trim, replace, replaceAll), and splitting into arrays (split). Strings are zero-indexed — the first character is at position 0.",
      tip: "String methods never modify the original string — they always return a new one. Always capture the result: const trimmed = str.trim() — calling str.trim() alone does nothing to str.",
      codeExamples: [
        {
          label: "Essential String Properties & Methods",
          code: "const str = '  Hello, World!  ';\n\n// Length\nconsole.log(str.length);              // 18\n\n// Whitespace\nconsole.log(str.trim());              // 'Hello, World!'\nconsole.log(str.trimStart());         // 'Hello, World!  '\nconsole.log(str.trimEnd());           // '  Hello, World!'\n\n// Case\nconsole.log(str.trim().toUpperCase()); // 'HELLO, WORLD!'\nconsole.log(str.trim().toLowerCase()); // 'hello, world!'",
        },
        {
          label: "Searching Inside Strings",
          code: "const sentence = 'The quick brown fox jumps over the lazy dog';\n\n// Check if a substring exists\nconsole.log(sentence.includes('fox'));       // true\nconsole.log(sentence.includes('cat'));       // false\n\n// Find position (returns -1 if not found)\nconsole.log(sentence.indexOf('fox'));        // 16\nconsole.log(sentence.indexOf('cat'));        // -1\n\n// Check start / end\nconsole.log(sentence.startsWith('The'));     // true\nconsole.log(sentence.endsWith('dog'));       // true\nconsole.log(sentence.startsWith('quick'));   // false",
        },
        {
          label: "Extracting & Transforming",
          code: "const str = 'JavaScript is awesome';\n\n// slice(start, end) — end is exclusive\nconsole.log(str.slice(0, 10));          // 'JavaScript'\nconsole.log(str.slice(11));             // 'is awesome' (to end)\nconsole.log(str.slice(-7));             // 'awesome'  (from end)\n\n// replace — replaces first match\nconsole.log(str.replace('awesome', 'powerful')); // 'JavaScript is powerful'\n\n// replaceAll — replaces every match\nconst csv = 'a,b,c,d';\nconsole.log(csv.replaceAll(',', ' | ')); // 'a | b | c | d'\n\n// split — string into array\nconsole.log('one,two,three'.split(','));  // ['one', 'two', 'three']\nconsole.log('hello'.split(''));          // ['h','e','l','l','o']\n\n// repeat & padStart\nconsole.log('ha'.repeat(3));            // 'hahaha'\nconsole.log('5'.padStart(3, '0'));       // '005'",
        },
        {
          label: "Accessing Characters",
          code: "const word = 'JavaScript';\n\n// By index (zero-based)\nconsole.log(word[0]);          // 'J'\nconsole.log(word[4]);          // 'S'\nconsole.log(word[word.length - 1]); // 't' (last char)\n\n// at() — supports negative indices\nconsole.log(word.at(0));       // 'J'\nconsole.log(word.at(-1));      // 't' (last char — cleaner!)\nconsole.log(word.at(-2));      // 'p'",
        },
      ],
      table: {
        headers: ["Method", "What It Does", "Example → Result"],
        rows: [
          { cells: [".length",        "Number of characters",            "'hello'.length → 5"] },
          { cells: [".trim()",         "Remove whitespace both ends",     "'  hi  '.trim() → 'hi'"] },
          { cells: [".includes(s)",    "Does string contain s?",          "'cat'.includes('at') → true"] },
          { cells: [".indexOf(s)",     "Position of s (-1 if missing)",   "'hello'.indexOf('l') → 2"] },
          { cells: [".slice(s,e)",     "Extract from s to e",             "'hello'.slice(1,3) → 'el'"] },
          { cells: [".replace(a,b)",   "Replace first a with b",          "'aaa'.replace('a','x') → 'xaa'"] },
          { cells: [".replaceAll(a,b)","Replace all a with b",            "'aaa'.replaceAll('a','x') → 'xxx'"] },
          { cells: [".split(sep)",     "Split into array at sep",         "'a,b'.split(',') → ['a','b']"] },
          { cells: [".toUpperCase()",  "All caps",                        "'hi'.toUpperCase() → 'HI'"] },
          { cells: [".padStart(n,c)",  "Pad to length n with char c",     "'5'.padStart(3,'0') → '005'"] },
          { cells: [".at(i)",          "Char at index, supports negatives","'abc'.at(-1) → 'c'"] },
        ],
      },
    },

    // ── 3. NUMBERS IN DEPTH ───────────────────────────────────────
    {
      id: "numbers-in-depth",
      heading: "Numbers — Parsing, Formatting & Math",
      content:
        "JavaScript has a single Number type for all numeric values — integers and decimals alike. This causes some well-known quirks around floating point precision. The parseInt and parseFloat functions convert strings to numbers, and Number() does a strict conversion. The Math object provides a library of mathematical functions. The toFixed method formats a number to a set number of decimal places and returns a string — essential for displaying currency.",
      warning: "Floating point precision: 0.1 + 0.2 === 0.30000000000000004 in JavaScript (and every language using IEEE 754). For currency or finance, always use toFixed(2) to round before displaying, or work in integer cents.",
      codeExamples: [
        {
          label: "Parsing Strings to Numbers",
          code: "// parseInt — reads an integer, ignores trailing non-numeric\nconsole.log(parseInt('42'));        // 42\nconsole.log(parseInt('42.9'));      // 42 (truncates decimal)\nconsole.log(parseInt('42px'));      // 42 (ignores 'px')\nconsole.log(parseInt('px42'));      // NaN (must start with digit)\nconsole.log(parseInt('1010', 2));   // 10 (binary to decimal)\n\n// parseFloat — reads a decimal number\nconsole.log(parseFloat('3.14'));    // 3.14\nconsole.log(parseFloat('3.14abc')); // 3.14\n\n// Number() — strict conversion\nconsole.log(Number('42'));          // 42\nconsole.log(Number('3.14'));        // 3.14\nconsole.log(Number(''));            // 0\nconsole.log(Number('abc'));         // NaN\nconsole.log(Number(true));          // 1\nconsole.log(Number(false));         // 0\nconsole.log(Number(null));          // 0",
        },
        {
          label: "Formatting Numbers",
          code: "const price = 1234.5678;\n\n// toFixed — rounds to N decimal places, returns a STRING\nconsole.log(price.toFixed(2));      // '1234.57'\nconsole.log(price.toFixed(0));      // '1235'\n\n// toLocaleString — locale-aware formatting\nconsole.log((1234567.89).toLocaleString('en-IN')); // '12,34,567.89'\nconsole.log((1234567.89).toLocaleString('en-US')); // '1,234,567.89'\n\n// Currency formatting\nconsole.log(new Intl.NumberFormat('en-IN', {\n  style: 'currency',\n  currency: 'INR'\n}).format(1234.5)); // '₹1,234.50'\n\n// isNaN — check if value is Not a Number\nconsole.log(isNaN('hello')); // true\nconsole.log(isNaN(42));      // false\nconsole.log(Number.isNaN('hello')); // false (stricter — only true for NaN value)\nconsole.log(Number.isNaN(NaN));     // true",
        },
        {
          label: "The Math Object",
          code: "// Rounding\nconsole.log(Math.round(4.5));    // 5   (rounds to nearest)\nconsole.log(Math.floor(4.9));    // 4   (rounds DOWN always)\nconsole.log(Math.ceil(4.1));     // 5   (rounds UP always)\nconsole.log(Math.trunc(4.9));    // 4   (removes decimal)\nconsole.log(Math.trunc(-4.9));   // -4  (not -5 — just truncates)\n\n// Min, Max, Absolute Value\nconsole.log(Math.min(3, 1, 4, 1, 5)); // 1\nconsole.log(Math.max(3, 1, 4, 1, 5)); // 5\nconsole.log(Math.abs(-42));           // 42\n\n// Power and Square Root\nconsole.log(Math.pow(2, 10));    // 1024\nconsole.log(Math.sqrt(144));     // 12\n\n// Random — 0 (inclusive) to 1 (exclusive)\nconsole.log(Math.random());              // e.g. 0.7341...\n\n// Random integer between min and max (inclusive)\nfunction randInt(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nconsole.log(randInt(1, 6)); // dice roll: 1–6",
        },
      ],
    },

    // ── 4. TYPE COERCION ─────────────────────────────────────────
    {
      id: "type-coercion",
      heading: "Type Coercion — When JavaScript Converts Types Automatically",
      content:
        "Type coercion is JavaScript automatically converting one type to another behind the scenes. It happens most often when you mix types with operators. Adding a string and a number gives a string. Comparing with == triggers coercion. Using a non-boolean in an if statement triggers coercion to boolean. While coercion is a core part of the language, it frequently surprises beginners and causes bugs — which is why === (strict equality, no coercion) is preferred over == (loose equality, with coercion).",
      codeExamples: [
        {
          label: "Implicit Coercion Surprises",
          code: "// + with a string converts everything to string\nconsole.log(1 + '2');        // '12'  (not 3!)\nconsole.log('5' + 3);        // '53'\nconsole.log('5' + 3 + 2);    // '532'\nconsole.log(5 + 3 + '2');    // '82'  (left to right!)\n\n// - * / convert strings to numbers\nconsole.log('10' - 5);       // 5   (string → number)\nconsole.log('10' * '2');     // 20\nconsole.log('10' / '2');     // 5\nconsole.log('10' - 'abc');   // NaN\n\n// == loose equality coercion\nconsole.log(0 == false);     // true  (both falsy)\nconsole.log(1 == true);      // true\nconsole.log('' == false);    // true\nconsole.log(null == undefined); // true\nconsole.log(null == 0);      // false (quirk!)\n\n// === strict equality — no coercion, always predictable\nconsole.log(0 === false);    // false\nconsole.log(1 === true);     // false\nconsole.log('5' === 5);      // false",
        },
        {
          label: "Explicit Type Conversion — Always Prefer This",
          code: "// To Number\nconsole.log(Number('42'));     // 42\nconsole.log(Number(true));     // 1\nconsole.log(Number(false));    // 0\nconsole.log(Number(null));     // 0\nconsole.log(Number(undefined));// NaN\nconsole.log(+'42');            // 42 (unary + shorthand)\n\n// To String\nconsole.log(String(42));       // '42'\nconsole.log(String(true));     // 'true'\nconsole.log(String(null));     // 'null'\nconsole.log((42).toString());  // '42'\nconsole.log((255).toString(16)); // 'ff' (hex!)\n\n// To Boolean\nconsole.log(Boolean(0));       // false\nconsole.log(Boolean(''));      // false\nconsole.log(Boolean(null));    // false\nconsole.log(Boolean(1));       // true\nconsole.log(Boolean('hello')); // true\nconsole.log(Boolean([]));      // true (empty array is truthy!)\nconsole.log(!!'hello');        // true  (double-not shorthand)",
        },
      ],
    },

    // ── 5. MODERN OPERATORS ───────────────────────────────────────
    {
      id: "modern-operators",
      heading: "Modern Operators — ??, ?., && and ||",
      content:
        "ES2020 introduced two powerful operators that clean up a lot of defensive code. The nullish coalescing operator (??) returns the right side only when the left side is null or undefined — unlike || which triggers on any falsy value (including 0 and empty string). The optional chaining operator (?.) safely accesses nested properties without throwing an error if an intermediate value is null or undefined — it short-circuits and returns undefined instead of crashing. Together they make working with uncertain data much cleaner.",
      tip: "Use ?? instead of || for default values when 0 or empty string are valid inputs. For example, a user's score could legitimately be 0 — score || 'N/A' would incorrectly return 'N/A', but score ?? 'N/A' would correctly return 0.",
      codeExamples: [
        {
          label: "?? Nullish Coalescing — Default Values Done Right",
          code: "// || triggers on ANY falsy value (0, '', false, null, undefined)\nconst score1 = 0;\nconsole.log(score1 || 'No score'); // 'No score' — WRONG, 0 is valid!\n\n// ?? only triggers on null or undefined\nconsole.log(score1 ?? 'No score'); // 0 — CORRECT\n\nconst name = '';\nconsole.log(name || 'Anonymous');  // 'Anonymous' — might be wrong\nconsole.log(name ?? 'Anonymous');  // '' — keeps the empty string\n\n// Practical use — API response might be null\nconst user = null;\nconst displayName = user?.name ?? 'Guest';\nconsole.log(displayName); // 'Guest'",
        },
        {
          label: "?. Optional Chaining — Safe Property Access",
          code: "const user = {\n  name: 'Priya',\n  address: {\n    city: 'Mumbai'\n  }\n};\n\n// Without optional chaining — crashes if address is missing\n// console.log(user.profile.avatar); // TypeError: Cannot read properties of undefined\n\n// With optional chaining — returns undefined safely\nconsole.log(user?.name);              // 'Priya'\nconsole.log(user?.profile?.avatar);   // undefined (no crash!)\nconsole.log(user?.address?.city);     // 'Mumbai'\n\n// Works with methods too\nconsole.log(user?.getName?.());       // undefined (method doesn't exist)\n\n// Works with arrays\nconst users = [{ name: 'Ali' }];\nconsole.log(users?.[0]?.name);        // 'Ali'\nconsole.log(users?.[5]?.name);        // undefined (no crash!)\n\n// Combine with ?? for clean defaults\nconst city = user?.address?.city ?? 'Unknown city';\nconsole.log(city); // 'Mumbai'",
        },
        {
          label: "&&  and || Short-Circuit Evaluation",
          code: "// && returns the first FALSY value, or the last value if all truthy\nconsole.log(1 && 2 && 3);       // 3    (all truthy, returns last)\nconsole.log(1 && false && 3);   // false (first falsy)\nconsole.log(0 && 'hello');      // 0    (first falsy)\n\n// Practical: conditionally render something\nconst isAdmin = true;\nconst adminPanel = isAdmin && '<AdminPanel />';\nconsole.log(adminPanel); // '<AdminPanel />'\n\n// || returns the first TRUTHY value\nconsole.log(null || undefined || 'hello'); // 'hello' (first truthy)\nconsole.log('' || 0 || 'fallback');       // 'fallback'\n\n// Practical: fallback chain\nconst username = null;\nconst displayName2 = username || localStorage?.getItem('name') || 'Guest';\nconsole.log(displayName2); // 'Guest'",
        },
      ],
    },

    // ── 6. DESTRUCTURING ─────────────────────────────────────────
    {
      id: "destructuring",
      heading: "Destructuring — Unpacking Arrays & Objects",
      content:
        "Destructuring is a clean syntax for extracting values from arrays and objects into individual variables in a single statement. Array destructuring uses position — the first variable gets the first element. Object destructuring uses property names — you can rename and provide defaults. Destructuring is widely used in modern JavaScript for function parameters, API responses, and React hooks. It dramatically reduces repetitive code like const name = user.name; const age = user.age;",
      codeExamples: [
        {
          label: "Array Destructuring",
          code: "// Without destructuring\nconst coords = [19.07, 72.87];\nconst lat = coords[0];\nconst lng = coords[1];\n\n// With destructuring — same result, cleaner syntax\nconst [latitude, longitude] = [19.07, 72.87];\nconsole.log(latitude);  // 19.07\nconsole.log(longitude); // 72.87\n\n// Skip elements with a comma\nconst [first, , third] = ['a', 'b', 'c'];\nconsole.log(first); // 'a'\nconsole.log(third); // 'c'\n\n// Default values\nconst [x = 0, y = 0, z = 0] = [10, 20];\nconsole.log(z); // 0 (default)\n\n// Swap two variables — classic trick!\nlet a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(a, b); // 2 1",
        },
        {
          label: "Object Destructuring",
          code: "const user = {\n  name: 'Fatima',\n  age: 24,\n  city: 'Chennai'\n};\n\n// Without destructuring\nconst name1 = user.name;\nconst age1  = user.age;\n\n// With destructuring\nconst { name, age, city } = user;\nconsole.log(name); // 'Fatima'\nconsole.log(age);  // 24\n\n// Rename while destructuring\nconst { name: fullName, age: years } = user;\nconsole.log(fullName); // 'Fatima'\nconsole.log(years);    // 24\n\n// Default values\nconst { name: n, role = 'Member' } = user;\nconsole.log(role); // 'Member' (not in object, uses default)\n\n// Nested destructuring\nconst { address: { country } = {} } = { address: { country: 'India' } };\nconsole.log(country); // 'India'",
        },
        {
          label: "Destructuring in Function Parameters",
          code: "// Instead of accessing obj.name, obj.score inside the function...\nfunction displayResult({ name, score, grade = 'N/A' }) {\n  console.log(`${name} scored ${score} — Grade: ${grade}`);\n}\n\ndisplayResult({ name: 'Arjun', score: 88, grade: 'B' });\n// Arjun scored 88 — Grade: B\n\ndisplayResult({ name: 'Priya', score: 95 });\n// Priya scored 95 — Grade: N/A\n\n// Array parameter destructuring\nfunction getFirst([first, second]) {\n  return first;\n}\nconsole.log(getFirst(['alpha', 'beta', 'gamma'])); // 'alpha'",
        },
      ],
    },

    // ── 7. SPREAD & REST ─────────────────────────────────────────
    {
      id: "spread-and-rest",
      heading: "Spread (...) and Rest (...) Operators",
      content:
        "The spread operator (...) and the rest operator (...) use the same three-dot syntax but do opposite things. Spread expands an array or object into individual elements — spreading its contents out. Rest collects multiple individual values into a single array — gathering them together. Spread is used in array and object literals and in function calls. Rest is used in function parameter lists to capture any number of arguments into an array.",
      codeExamples: [
        {
          label: "Spread — Expanding Arrays & Objects",
          code: "// Spread into a new array\nconst nums = [1, 2, 3];\nconst more = [...nums, 4, 5, 6];\nconsole.log(more); // [1, 2, 3, 4, 5, 6]\n\n// Merge two arrays\nconst a = [1, 2, 3];\nconst b = [4, 5, 6];\nconst merged = [...a, ...b];\nconsole.log(merged); // [1, 2, 3, 4, 5, 6]\n\n// Copy an array (no reference sharing)\nconst original = [10, 20, 30];\nconst copy = [...original];\ncopy.push(40);\nconsole.log(original); // [10, 20, 30] — safe!\n\n// Spread into function arguments\nconsole.log(Math.max(...nums)); // 3\n\n// Spread objects — merge / override properties\nconst defaults = { theme: 'light', lang: 'en', size: 14 };\nconst userPrefs = { theme: 'dark', size: 16 };\nconst config = { ...defaults, ...userPrefs };\nconsole.log(config);\n// { theme: 'dark', lang: 'en', size: 16 }  (userPrefs overrides defaults)",
        },
        {
          label: "Rest — Collecting Arguments into an Array",
          code: "// Rest in function parameters — gathers remaining args\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sum(1, 2, 3));       // 6\nconsole.log(sum(10, 20, 30, 40)); // 100\n\n// Mix fixed params with rest\nfunction greetAll(greeting, ...names) {\n  for (const name of names) {\n    console.log(`${greeting}, ${name}!`);\n  }\n}\ngreetAll('Hello', 'Priya', 'Arjun', 'Fatima');\n// Hello, Priya!\n// Hello, Arjun!\n// Hello, Fatima!\n\n// Rest in destructuring\nconst [head, ...tail] = [1, 2, 3, 4, 5];\nconsole.log(head); // 1\nconsole.log(tail); // [2, 3, 4, 5]\n\nconst { name, ...rest } = { name: 'Ali', age: 25, city: 'Delhi' };\nconsole.log(name); // 'Ali'\nconsole.log(rest); // { age: 25, city: 'Delhi' }",
        },
      ],
    },

    // ── 8. WORKING WITH MULTIPLE TYPES ───────────────────────────
    {
      id: "practical-patterns",
      heading: "Putting It Together — Practical Patterns",
      content:
        "The real power emerges when you combine these features. Destructuring + default values from an API response. Spread to safely update objects without mutation. Optional chaining + nullish coalescing for robust data access. These patterns appear constantly in real JavaScript codebases and are essential for writing modern, readable code.",
      codeExamples: [
        {
          label: "Safe API Response Handling",
          code: "// Imagine this came from a fetch() call — some fields may be missing\nconst apiResponse = {\n  user: {\n    id: 42,\n    name: 'Riya',\n    // email is missing\n    stats: { posts: 0, followers: 1200 }\n  }\n};\n\n// Safe extraction with optional chaining + nullish coalescing\nconst { user } = apiResponse;\nconst name       = user?.name       ?? 'Unknown';\nconst email      = user?.email      ?? 'No email provided';\nconst posts      = user?.stats?.posts      ?? 0;\nconst followers  = user?.stats?.followers  ?? 0;\n\nconsole.log(name);      // 'Riya'\nconsole.log(email);     // 'No email provided'\nconsole.log(posts);     // 0  (not 'No posts' — 0 is valid!)\nconsole.log(followers); // 1200",
        },
        {
          label: "Immutable Object Updates (React Pattern)",
          code: "// Never mutate state directly — create a new object with spread\nconst state = {\n  user: { name: 'Priya', score: 80 },\n  theme: 'light',\n  isLoading: false\n};\n\n// Update just the score — spread keeps everything else\nconst newState = {\n  ...state,\n  user: { ...state.user, score: 95 },  // nested update\n  isLoading: true\n};\n\nconsole.log(state.user.score);    // 80  (original unchanged)\nconsole.log(newState.user.score); // 95\nconsole.log(newState.theme);      // 'light' (preserved)",
        },
        {
          label: "String Processing Pipeline",
          code: "// Real-world: clean and process user input\nfunction processInput(raw) {\n  return raw\n    .trim()                    // remove whitespace\n    .toLowerCase()             // normalise case\n    .replace(/\\s+/g, '-')     // spaces to hyphens\n    .replace(/[^a-z0-9-]/g, '') // remove special chars\n    .slice(0, 50);             // limit length\n}\n\nconsole.log(processInput('  Hello World!  '));  // 'hello-world'\nconsole.log(processInput('  My Blog Post #1 ')); // 'my-blog-post-1'\n// This is a URL slug generator!",
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-strings",
      label: "String Methods",
      html: `<style>
  .method-row { display:flex; align-items:center; gap:10px; margin-bottom:7px; font-size:0.8rem; }
  .method-code { background:#1e1e1e; color:#d4d4d4; padding:7px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.73rem; flex:1; }
  .method-result { background:#f0fdf4; color:#166534; border:1px solid #86efac; padding:6px 10px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.73rem; min-width:130px; text-align:center; font-weight:700; }
  .section-label { font-weight:700; font-size:0.78rem; margin:12px 0 6px; }
</style>
<div style="font-family:sans-serif">
  <p style="color:#666;margin-bottom:10px;font-size:0.82rem">Key string methods and their outputs:</p>

  <p class="section-label" style="color:#11998e">Whitespace & Case</p>
  ${[
    ["'  Hello  '.trim()",        "'Hello'"],
    ["'hello'.toUpperCase()",     "'HELLO'"],
    ["'WORLD'.toLowerCase()",     "'world'"],
    ["'hi'.repeat(3)",            "'hihihi'"],
    ["'5'.padStart(3,'0')",       "'005'"],
  ].map(([c,r]) => `<div class="method-row"><div class="method-code">${c}</div><div class="method-result">${r}</div></div>`).join("")}

  <p class="section-label" style="color:#3498db">Searching</p>
  ${[
    ["'cat'.includes('at')",      "true"],
    ["'hello'.indexOf('l')",      "2"],
    ["'hi'.startsWith('h')",      "true"],
    ["'bye'.endsWith('ye')",      "true"],
    ["'dog'.indexOf('x')",        "-1"],
  ].map(([c,r]) => `<div class="method-row"><div class="method-code">${c}</div><div class="method-result">${r}</div></div>`).join("")}

  <p class="section-label" style="color:#9b59b6">Extract & Transform</p>
  ${[
    ["'JavaScript'.slice(0,4)",   "'Java'"],
    ["'JavaScript'.slice(-6)",    "'Script'"],
    ["'a,b,c'.split(',')",        "['a','b','c']"],
    ["'aaa'.replaceAll('a','x')", "'xxx'"],
    ["'abc'.at(-1)",              "'c'"],
  ].map(([c,r]) => `<div class="method-row"><div class="method-code">${c}</div><div class="method-result">${r}</div></div>`).join("")}
</div>`,
    },

    {
      id: "demo-numbers",
      label: "Numbers & Math",
      html: `<style>
  .num-row { display:flex; align-items:center; gap:10px; margin-bottom:7px; }
  .num-code { background:#1e1e1e; color:#d4d4d4; padding:7px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.73rem; flex:1; }
  .num-result { background:#dbeafe; color:#1e3a8a; border:1px solid #93c5fd; padding:6px 10px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.73rem; min-width:100px; text-align:center; font-weight:700; }
  .num-result.warn { background:#fef9c3; color:#713f12; border-color:#fde047; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:10px">Parsing, formatting, and Math methods:</p>

  <p style="font-weight:700;color:#11998e;margin-bottom:6px;font-size:0.78rem">Parsing</p>
  ${[
    ["parseInt('42px')",    "42"],
    ["parseInt('px42')",    "NaN"],
    ["parseFloat('3.14x')", "3.14"],
    ["Number('42')",        "42"],
    ["Number('abc')",       "NaN"],
    ["Number(true)",        "1"],
  ].map(([c,r]) => `<div class="num-row"><div class="num-code">${c}</div><div class="num-result${r==='NaN'?' warn':''}">${r}</div></div>`).join("")}

  <p style="font-weight:700;color:#3498db;margin-bottom:6px;font-size:0.78rem;margin-top:10px">Math Object</p>
  ${[
    ["Math.round(4.5)",      "5"],
    ["Math.floor(4.9)",      "4"],
    ["Math.ceil(4.1)",       "5"],
    ["Math.max(3,1,4,1,5)",  "5"],
    ["Math.min(3,1,4,1,5)",  "1"],
    ["Math.abs(-42)",        "42"],
    ["Math.sqrt(144)",       "12"],
    ["Math.pow(2,8)",        "256"],
  ].map(([c,r]) => `<div class="num-row"><div class="num-code">${c}</div><div class="num-result">${r}</div></div>`).join("")}

  <p style="font-weight:700;color:#9b59b6;margin-bottom:6px;font-size:0.78rem;margin-top:10px">Formatting</p>
  ${[
    ["(3.14159).toFixed(2)", "'3.14'"],
    ["(1000).toFixed(2)",    "'1000.00'"],
    ["(0.1 + 0.2).toFixed(2)", "'0.30'"],
  ].map(([c,r]) => `<div class="num-row"><div class="num-code">${c}</div><div class="num-result">${r}</div></div>`).join("")}

  <div style="background:#fef9c3;border-left:3px solid #fde047;padding:9px 12px;border-radius:0 6px 6px 0;margin-top:10px;font-size:0.75rem;color:#713f12">
    ⚠️ <strong>0.1 + 0.2 = 0.30000000000000004</strong> — floating point quirk. Always use <code>.toFixed(2)</code> when displaying currency.
  </div>
</div>`,
    },

    {
      id: "demo-coercion",
      label: "Type Coercion",
      html: `<style>
  .coerce-row { display:flex; align-items:center; gap:10px; margin-bottom:7px; }
  .coerce-code { background:#1e1e1e; color:#d4d4d4; padding:7px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.73rem; flex:1; }
  .coerce-result { padding:6px 10px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.73rem; min-width:80px; text-align:center; font-weight:700; }
  .ok   { background:#dcfce7; color:#14532d; border:1px solid #86efac; }
  .warn { background:#fef9c3; color:#713f12; border:1px solid #fde047; }
  .bad  { background:#fee2e2; color:#7f1d1d; border:1px solid #fca5a5; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:10px">Implicit coercion surprises vs explicit conversion:</p>

  <p style="font-weight:700;color:#e74c3c;margin-bottom:6px;font-size:0.78rem">⚠️ Implicit Coercion (the surprises)</p>
  ${[
    ["1 + '2'",          "'12'",  "warn", "string concat, not addition!"],
    ["'5' - 3",          "2",     "ok",   "- converts to number"],
    ["0 == false",       "true",  "warn", "loose equality coerces"],
    ["'' == false",      "true",  "warn", "both falsy"],
    ["null == undefined","true",  "warn", "JS quirk"],
    ["null == 0",        "false", "bad",  "null only == undefined"],
  ].map(([c,r,cls,note]) => `
  <div class="coerce-row">
    <div class="coerce-code">${c}</div>
    <div class="coerce-result ${cls}">${r}</div>
    <div style="font-size:0.7rem;color:#888;flex:1">${note}</div>
  </div>`).join("")}

  <p style="font-weight:700;color:#11998e;margin-bottom:6px;font-size:0.78rem;margin-top:12px">✅ Explicit Conversion (predictable)</p>
  ${[
    ["Number('42')",     "42",    "ok"],
    ["Number(true)",     "1",     "ok"],
    ["String(42)",       "'42'",  "ok"],
    ["Boolean(0)",       "false", "ok"],
    ["Boolean([])",      "true",  "warn"],
    ["0 === false",      "false", "ok"],
  ].map(([c,r,cls]) => `
  <div class="coerce-row">
    <div class="coerce-code">${c}</div>
    <div class="coerce-result ${cls}">${r}</div>
  </div>`).join("")}
</div>`,
    },

    {
      id: "demo-modern-ops",
      label: "?? and ?.",
      html: `<style>
  .op-block { background:#f8f9fa; border-radius:10px; padding:14px; margin-bottom:12px; }
  .op-code-block { background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:8px; font-family:'Courier New',monospace; font-size:0.72rem; line-height:1.7; margin-bottom:8px; }
  .op-output { background:#f0fdf4; color:#166534; padding:8px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.73rem; border-left:3px solid #22c55e; }
  .op-output.warn { background:#fef9c3; color:#713f12; border-left-color:#fde047; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Nullish coalescing and optional chaining in action:</p>

  <div class="op-block">
    <p style="font-weight:700;color:#11998e;margin-bottom:8px">?? vs || for default values</p>
    <div class="op-code-block">
      <span style="color:#569cd6">const</span> score = <span style="color:#b5cea8">0</span>;<br>
      score <span style="color:#c586c0">||</span> <span style="color:#ce9178">'No score'</span>  <span style="color:#6a9955">// 'No score' ← WRONG</span><br>
      score <span style="color:#c586c0">??</span> <span style="color:#ce9178">'No score'</span>  <span style="color:#6a9955">// 0 ← CORRECT</span>
    </div>
    <div class="op-output warn">|| gives 'No score' — treats 0 as falsy</div>
    <div class="op-output" style="margin-top:6px">?? gives 0 — only null/undefined trigger the fallback</div>
  </div>

  <div class="op-block">
    <p style="font-weight:700;color:#3498db;margin-bottom:8px">?. safe property access</p>
    <div class="op-code-block">
      <span style="color:#569cd6">const</span> user = { name: <span style="color:#ce9178">'Priya'</span> };<br><br>
      user<span style="color:#c586c0">.</span>profile<span style="color:#c586c0">.</span>avatar  <span style="color:#6a9955">// 💥 TypeError!</span><br>
      user<span style="color:#c586c0">?.</span>profile<span style="color:#c586c0">?.</span>avatar  <span style="color:#6a9955">// undefined (safe)</span><br><br>
      user<span style="color:#c586c0">?.</span>name <span style="color:#c586c0">??</span> <span style="color:#ce9178">'Guest'</span>  <span style="color:#6a9955">// 'Priya'</span><br>
      user<span style="color:#c586c0">?.</span>email <span style="color:#c586c0">??</span> <span style="color:#ce9178">'No email'</span> <span style="color:#6a9955">// 'No email'</span>
    </div>
    <div class="op-output">?. returns undefined instead of crashing — chain as many as you need</div>
  </div>

  <div class="op-block">
    <p style="font-weight:700;color:#9b59b6;margin-bottom:8px">?? chained with ?.</p>
    <div class="op-code-block">
      <span style="color:#569cd6">const</span> city = user<span style="color:#c586c0">?.</span>address<span style="color:#c586c0">?.</span>city <span style="color:#c586c0">??</span> <span style="color:#ce9178">'Unknown'</span>;
    </div>
    <div class="op-output">Reads: "get city if it exists, otherwise 'Unknown'" — one line, no crashes, no wrong defaults</div>
  </div>
</div>`,
    },

    {
      id: "demo-destructuring",
      label: "Destructuring",
      html: `<style>
  .destr-row { display:flex; gap:12px; margin-bottom:12px; }
  .destr-box { flex:1; background:#f8f9fa; border-radius:10px; padding:14px; }
  .destr-code { background:#1e1e1e; color:#d4d4d4; padding:10px 12px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.7rem; line-height:1.7; margin-bottom:8px; }
  .destr-out { background:#f0fdf4; color:#166534; padding:7px 10px; border-radius:6px; font-family:'Courier New',monospace; font-size:0.7rem; border-left:3px solid #22c55e; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Destructuring — unpacking values cleanly:</p>

  <div class="destr-row">
    <div class="destr-box">
      <p style="font-weight:700;color:#11998e;margin-bottom:8px;font-size:0.78rem">Array Destructuring</p>
      <div class="destr-code">
        <span style="color:#569cd6">const</span> [lat, lng] = [<span style="color:#b5cea8">19.07</span>, <span style="color:#b5cea8">72.87</span>];<br>
        <span style="color:#569cd6">const</span> [a, , c] = [<span style="color:#ce9178">'x'</span>,<span style="color:#ce9178">'y'</span>,<span style="color:#ce9178">'z'</span>];<br>
        <span style="color:#6a9955">// skip b with empty comma</span><br><br>
        <span style="color:#569cd6">let</span> p=<span style="color:#b5cea8">1</span>, q=<span style="color:#b5cea8">2</span>;<br>
        [p, q] = [q, p]; <span style="color:#6a9955">// swap!</span>
      </div>
      <div class="destr-out">lat=19.07, lng=72.87<br>a='x', c='z'<br>p=2, q=1</div>
    </div>
    <div class="destr-box">
      <p style="font-weight:700;color:#3498db;margin-bottom:8px;font-size:0.78rem">Object Destructuring</p>
      <div class="destr-code">
        <span style="color:#569cd6">const</span> user = {<br>
        &nbsp;&nbsp;name: <span style="color:#ce9178">'Fatima'</span>, age: <span style="color:#b5cea8">24</span><br>
        };<br><br>
        <span style="color:#569cd6">const</span> { name, age } = user;<br>
        <span style="color:#6a9955">// rename on extract:</span><br>
        <span style="color:#569cd6">const</span> { name: <span style="color:#9cdcfe">fullName</span> } = user;<br>
        <span style="color:#6a9955">// default value:</span><br>
        <span style="color:#569cd6">const</span> { role = <span style="color:#ce9178">'Member'</span> } = user;
      </div>
      <div class="destr-out">name='Fatima', age=24<br>fullName='Fatima'<br>role='Member' (default)</div>
    </div>
  </div>

  <div class="destr-box">
    <p style="font-weight:700;color:#9b59b6;margin-bottom:8px;font-size:0.78rem">Rest in Destructuring</p>
    <div style="display:flex;gap:12px">
      <div style="flex:1">
        <div class="destr-code">
          <span style="color:#569cd6">const</span> [head, ...tail] = [<span style="color:#b5cea8">1</span>,<span style="color:#b5cea8">2</span>,<span style="color:#b5cea8">3</span>,<span style="color:#b5cea8">4</span>];<br>
          <span style="color:#6a9955">// head=1, tail=[2,3,4]</span>
        </div>
        <div class="destr-out">head=1 &nbsp;|&nbsp; tail=[2,3,4]</div>
      </div>
      <div style="flex:1">
        <div class="destr-code">
          <span style="color:#569cd6">const</span> { name, ...rest } = user;<br>
          <span style="color:#6a9955">// rest = { age: 24 }</span>
        </div>
        <div class="destr-out">name='Fatima' &nbsp;|&nbsp; rest={age:24}</div>
      </div>
    </div>
  </div>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: String Processing",
      description: "Practice the most important string methods on real inputs:",
      tasks: [
        "Create a string '  JavaScript is Amazing!  ' and use trim(), toLowerCase(), and includes() on it",
        "Use slice() to extract just the word 'Amazing' from the string",
        "Given the email string 'user@example.com', use split('@') to separate the username from the domain",
        "Build a function formatName(raw) that trims whitespace, converts to title case (first letter uppercase, rest lowercase), and returns the result",
        "Given 'one,two,three,four,five', split it into an array then join it back with ' | ' as the separator",
        "Use padStart to format numbers as '001', '002', ... '010' — convert numbers 1–10 to this format in a loop",
      ],
      hint: "For title case: str.trim().toLowerCase() then replace the first character with str[0].toUpperCase(). For joining an array back to a string, use .join(separator).",
    },
    {
      title: "Exercise 2: Numbers & Type Conversion",
      description: "Work through the numeric methods and conversion edge cases:",
      tasks: [
        "Write a function celsiusToFahrenheit(c) that converts and returns the result formatted to 1 decimal place using toFixed",
        "Given the array [3.7, 1.2, 9.5, 4.1, 7.8], use Math.floor, Math.ceil, and Math.round on each value — log all three results per number",
        "Write a randInt(min, max) function using Math.random() that returns a random integer in the range min to max inclusive",
        "Write a function safeParseInt(str) that uses parseInt, checks the result with Number.isNaN, and returns 0 if the parse failed",
        "Demonstrate the 0.1 + 0.2 floating point issue, then fix the display using toFixed(2)",
        "Use Intl.NumberFormat to format the number 1234567.89 as Indian Rupee currency (en-IN, INR)",
      ],
      hint: "celsiusToFahrenheit: (c * 9/5) + 32. Remember toFixed returns a string — you may need to convert back with Number() if you need to do more maths.",
    },
    {
      title: "Exercise 3: Modern Operators & Destructuring",
      description: "Rewrite messy defensive code using ??, ?. and destructuring:",
      tasks: [
        "Given const user = { name: 'Ali', address: { city: 'Delhi' } }, safely access user.address.city, user.address.postcode, and user.phone using ?.",
        "Use ?? to provide defaults: city defaults to 'Unknown', postcode to '000000', phone to 'Not provided'",
        "Destructure the user object to extract name and city in a single statement — rename city to hometown",
        "Given const scores = [88, 72, 95, 61, 79], destructure to get the first score as topScore and the rest as remaining",
        "Write a function updateUser(user, changes) that returns a new object with the changes applied using spread — never mutate the original",
        "Write a function sum(...nums) using rest parameters that accepts any number of arguments and returns their total",
      ],
      hint: "For updateUser: return { ...user, ...changes }. This creates a new object with all original properties, then overwrites only the ones in changes.",
    },
    {
      title: "Challenge: Data Transformation Pipeline",
      description: "Build a complete pipeline that cleans, validates, and formats raw user data:",
      tasks: [
        "Start with this raw array: [{name:'  priya ', age:'24', score:'88.5'}, {name:'ARJUN', age:'abc', score:'72'}, {name:' fatima', age:'22', score:null}]",
        "Write a function cleanUser(raw) that: trims and title-cases the name, parses age with parseInt (default 0 if NaN), parses score with parseFloat (default 0 if null/NaN)",
        "Add a grade field: use a helper getGrade(score) with if/else if to assign A/B/C/D/F",
        "Add an isValid field: true only if age is between 16 and 120 AND score is between 0 and 100",
        "Use .map() to transform the whole array through cleanUser, then .filter() to keep only isValid users",
        "Log a formatted summary for each valid user using a template literal: 'Priya (24) — Score: 88.50 — Grade: B'",
      ],
      hint: "Use Number.isNaN() after parsing to detect failed conversions. For title case: name.trim().toLowerCase().replace(/\\b\\w/g, c => c.toUpperCase()). Chain your .map() and .filter() calls.",
    },
  ],
};

export default session14;