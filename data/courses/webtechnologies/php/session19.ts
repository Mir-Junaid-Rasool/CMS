// data/courses/webtechnologies/php/session19.ts
import type { SessionData } from "@/types/session";

const session19: SessionData = {
  meta: {
    sessionNumber: 19,
    module: "php",
    moduleNumber: 4,
    title: "Introduction to PHP",
    subtitle: "Set up your server environment, write your first PHP script, and understand how PHP powers the web from the server side",
    duration: "2 hrs",
    color: "#777bb4",
    colorDim: "rgba(119,123,180,0.10)",
    colorMid: "rgba(119,123,180,0.22)",
    objectives: [
      "Understand what PHP is and how it differs from JavaScript",
      "Install XAMPP and understand what Apache, MySQL, and PHP each do",
      "Start and stop Apache using the XAMPP Control Panel",
      "Create and run your first PHP file through the browser via localhost",
      "Use the built-in PHP development server with php -S localhost:8000",
      "Understand the PHP request-response cycle",
      "Use echo, print, and var_dump to output values",
      "Write PHP variables, comments, and basic data types",
    ],
    prevSession: { num: 18, title: "Forms & Form Validation", href: "/courses/webtechnologies/javascript/session18" },
    nextSession: { num: 20, title: "PHP Variables, Data Types & Operators", href: "/courses/webtechnologies/php/session20" },
  },

  topics: [
    // ── 1. WHAT IS PHP ────────────────────────────────────────────
    {
      id: "what-is-php",
      heading: "What is PHP?",
      content:
        "PHP (PHP: Hypertext Preprocessor) is a server-side scripting language designed specifically for building web applications. Unlike JavaScript which runs in the browser on the user's machine, PHP runs on the web server before the page is sent to the user. The server processes the PHP code, builds an HTML page from the result, and sends only that finished HTML to the browser. The browser never sees the PHP code — it only ever receives plain HTML. This makes PHP ideal for tasks that must happen securely on the server: reading from a database, handling form submissions, managing user sessions, and generating dynamic pages.",
      tip: "The key difference: JavaScript runs in the browser (client-side). PHP runs on the server (server-side). They have different jobs and both are essential in a full web application.",
      table: {
        headers: ["Feature", "PHP", "JavaScript"],
        rows: [
          { cells: ["Where it runs",    "On the web server",                    "In the user's browser"] },
          { cells: ["When it runs",     "Before the page is sent",              "After the page is loaded"] },
          { cells: ["User can see code","No — only sees the HTML output",       "Yes — in browser DevTools"] },
          { cells: ["File extension",   ".php",                                 ".js"] },
          { cells: ["Typical uses",     "Databases, forms, sessions, APIs",     "Interactivity, DOM, animations"] },
          { cells: ["Needs a server",   "Yes — Apache, Nginx, or PHP built-in", "No — runs directly in browser"] },
        ],
      },
      codeExamples: [
        {
          label: "How PHP Works — Request to Response",
          code: "// 1. Browser requests:  http://localhost/hello.php\n//\n// 2. Apache receives the request, sees .php extension,\n//    passes the file to the PHP interpreter\n//\n// 3. PHP reads hello.php:\n//    <?php echo '<h1>Hello, World!</h1>'; ?>\n//\n// 4. PHP executes the code and produces:\n//    <h1>Hello, World!</h1>\n//\n// 5. Apache sends ONLY the HTML back to the browser\n//\n// 6. Browser renders: Hello, World! (as a heading)\n//    — the browser NEVER saw the <?php ?> tags",
        },
      ],
    },

    // ── 2. INSTALLING XAMPP ───────────────────────────────────────
    {
      id: "installing-xampp",
      heading: "Step 1 — Download & Install XAMPP",
      content:
        "XAMPP is a free, open-source package that bundles Apache (web server), MySQL/MariaDB (database), and PHP into a single installer. It is the fastest way to get a PHP development environment running on Windows, macOS, or Linux. The name stands for Cross-platform (X), Apache (A), MariaDB (M), PHP (P), and Perl (P). Once installed, XAMPP gives you a Control Panel where you can start and stop each service with a single click.",
      subSections: [
        {
          id: "xampp-download",
          heading: "Download XAMPP",
          content: "Go to https://www.apachefriends.org and download the installer for your operating system. Choose the latest stable version. The download is around 150 MB. Run the installer and accept all defaults — the default installation path is C:\\xampp on Windows and /opt/lampp on Linux.",
          codeExamples: [
            {
              label: "Default Installation Paths",
              code: "// Windows\nC:\\xampp\\\n  apache\\    // Apache web server files\n  htdocs\\    // YOUR web files go here (document root)\n  mysql\\     // MySQL / MariaDB database\n  php\\       // PHP interpreter\n  php.ini    // PHP configuration file\n\n// macOS (via XAMPP application)\n/Applications/XAMPP/\n  htdocs/    // YOUR web files go here\n\n// Linux\n/opt/lampp/\n  htdocs/    // YOUR web files go here",
            },
          ],
        },
        {
          id: "xampp-control-panel",
          heading: "The XAMPP Control Panel",
          content: "After installation, open the XAMPP Control Panel. You will see a list of modules — Apache, MySQL, FileZilla, Mercury, and Tomcat. For PHP development you only need Apache and optionally MySQL. Click the Start button next to Apache. The status light turns green and the port numbers 80 and 443 appear. Apache is now running and serving files from the htdocs folder.",
          codeExamples: [
            {
              label: "XAMPP Control Panel — What Each Button Does",
              code: "// XAMPP Control Panel Modules:\n\n// Apache   [Start] [Admin] [Config] [Logs]\n//   Start  — launches Apache on port 80 (HTTP) and 443 (HTTPS)\n//   Admin  — opens http://localhost in your browser\n//   Config — opens httpd.conf (Apache settings)\n//   Logs   — opens Apache error and access logs\n\n// MySQL    [Start] [Admin] [Config] [Logs]\n//   Start  — launches MariaDB on port 3306\n//   Admin  — opens phpMyAdmin in the browser\n\n// When Apache is running:\n// Green light + port numbers = running normally\n// Red light or no port = failed to start\n\n// Common reason it fails: port 80 is already in use\n// (Skype, IIS, or another web server)\n// Fix: change Apache port to 8080 in Config > httpd.conf",
            },
          ],
        },
      ],
    },

    // ── 3. CREATING YOUR FIRST PHP FILE ──────────────────────────
    {
      id: "first-php-file",
      heading: "Step 2 — Create & Run Your First PHP File",
      content:
        "All PHP files served through XAMPP must be placed inside the htdocs folder. This is the document root — the folder that Apache maps to http://localhost/. Create a subfolder inside htdocs for your project to keep things organised. PHP files have the .php extension. Open any text editor (VS Code is recommended) to write your code. Every PHP code block starts with the opening tag <?php and ends with the closing tag ?>. When a file is pure PHP with no HTML, the closing ?> tag is omitted by convention.",
      tip: "Always work in a subfolder inside htdocs, not directly in htdocs itself. For example: C:\\xampp\\htdocs\\myproject\\ accessed at http://localhost/myproject/",
      codeExamples: [
        {
          label: "Your First PHP File — hello.php",
          code: "<?php\n// File: C:\\xampp\\htdocs\\myproject\\hello.php\n// Access at: http://localhost/myproject/hello.php\n\necho '<h1>Hello, World!</h1>';\necho '<p>PHP is running on the server!</p>';\n\n// phpinfo() shows your entire PHP configuration\n// Useful to verify PHP is installed correctly\nphpinfo();\n?>",
        },
        {
          label: "Mixing PHP and HTML",
          code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My First PHP Page</title>\n</head>\n<body>\n\n  <h1>Welcome!</h1>\n\n  <?php\n    // PHP block inside HTML\n    $name = 'Priya';\n    $date = date('l, d F Y');\n    echo '<p>Hello, ' . $name . '!</p>';\n    echo '<p>Today is ' . $date . '</p>';\n  ?>\n\n  <p>This is regular HTML below the PHP block.</p>\n\n  <p>The time right now is: <?php echo date('H:i:s'); ?></p>\n\n</body>\n</html>",
        },
        {
          label: "Step-by-Step: Run Your First File",
          code: "// Step 1: Open XAMPP Control Panel\n//   Start Apache — wait for green light\n\n// Step 2: Create the project folder\n//   Windows: C:\\xampp\\htdocs\\myphp\\\n//   Mac:     /Applications/XAMPP/htdocs/myphp/\n\n// Step 3: Create hello.php inside that folder\n//   <?php\n//     echo '<h1>Hello from PHP!</h1>';\n//   ?>\n\n// Step 4: Open your browser\n//   Type: http://localhost/myphp/hello.php\n//   Press Enter\n\n// Step 5: You should see: Hello from PHP!\n//   If you see the raw PHP code instead of output,\n//   Apache is not running — check the Control Panel",
        },
      ],
    },

    // ── 4. PHP BUILT-IN SERVER ────────────────────────────────────
    {
      id: "php-builtin-server",
      heading: "Step 3 — The PHP Built-in Development Server",
      content:
        "PHP ships with a lightweight built-in web server that you can start from the command line — no XAMPP or Apache required. This is perfect for quick experiments and small projects. You navigate to your project folder in the terminal and run php -S localhost:8000. PHP starts a server on port 8000 and serves files from the current directory. Every request is logged to the terminal so you can see exactly what is happening. This approach is simpler than XAMPP for small scripts but lacks MySQL and the full Apache feature set.",
      tip: "The built-in server is for development only — never use it in production. It handles one request at a time and is not designed for performance or security at scale.",
      codeExamples: [
        {
          label: "Starting the Built-in PHP Server",
          code: "// Open Terminal (macOS/Linux) or Command Prompt / PowerShell (Windows)\n\n// Step 1: Navigate to your project folder\ncd C:\\xampp\\htdocs\\myphp        // Windows\ncd /Applications/XAMPP/htdocs/myphp // macOS\ncd ~/projects/myphp              // Linux\n\n// Step 2: Start the server\nphp -S localhost:8000\n\n// You will see output like:\n// PHP 8.2.0 Development Server (http://localhost:8000) started\n\n// Step 3: Open your browser and visit:\n// http://localhost:8000/hello.php\n// http://localhost:8000/index.php\n\n// Step 4: The terminal shows each request:\n// [Mon Jan 01 10:00:00 2025] 127.0.0.1:52341 [200]: GET /hello.php\n// [Mon Jan 01 10:00:01 2025] 127.0.0.1:52342 [404]: GET /missing.php\n\n// Step 5: Stop the server\n// Press Ctrl + C in the terminal",
        },
        {
          label: "Common php -S Options",
          code: "// Serve on a different port\nphp -S localhost:3000\n\n// Serve from a specific folder (not the current directory)\nphp -S localhost:8000 -t /path/to/your/project\n\n// Bind to all network interfaces (accessible from other devices on same WiFi)\nphp -S 0.0.0.0:8000\n// Then other devices can visit: http://YOUR_IP_ADDRESS:8000\n\n// Check your PHP version first\nphp --version\n// PHP 8.2.0 (cli) (built: ...)\n// If 'php' is not recognised on Windows, you need to:\n// Add C:\\xampp\\php to your system PATH environment variable\n\n// Check PHP is working\nphp -r \"echo 'PHP works! Version: ' . PHP_VERSION;\"\n// PHP works! Version: 8.2.0",
        },
        {
          label: "XAMPP vs Built-in Server — When to Use Each",
          code: "// USE XAMPP when you need:\n// - MySQL database (XAMPP includes phpMyAdmin)\n// - .htaccess URL rewriting (Apache feature)\n// - Virtual hosts / multiple projects\n// - Full production-like environment\n// - SSL/HTTPS locally\n\n// USE php -S localhost:8000 when you need:\n// - Quick PHP file testing\n// - No database needed\n// - Simple scripts and exercises\n// - No XAMPP installation available\n// - Fast startup — one command, instant server\n\n// Both serve the same PHP files — your code is identical\n// The only difference is the server running it",
        },
      ],
    },

    // ── 5. PHP SYNTAX BASICS ─────────────────────────────────────
    {
      id: "php-syntax-basics",
      heading: "PHP Syntax — Tags, Statements & Comments",
      content:
        "PHP code lives inside special tags that tell the server where PHP begins and ends. The standard opening tag is <?php and the closing tag is ?>. Everything outside these tags is sent to the browser as-is. Every PHP statement ends with a semicolon — forgetting the semicolon is one of the most common beginner errors. PHP is case-insensitive for built-in functions and keywords (echo, if, function) but case-sensitive for variable names. The short echo tag <?= is a shorthand for <?php echo.",
      warning: "Every PHP statement must end with a semicolon. Missing semicolons cause a parse error and the entire page goes blank or shows a 500 error. Always check your semicolons first when debugging.",
      codeExamples: [
        {
          label: "PHP Tags and Semicolons",
          code: "<?php\n// Standard PHP — used in .php files\necho 'Hello';\n?>\n\n<!-- Short echo tag — prints a value directly in HTML -->\n<p>Welcome, <?= $name ?></p>\n\n<!-- Equivalent to: -->\n<p>Welcome, <?php echo $name; ?></p>\n\n<?php\n// Every statement ends with a semicolon\n$x = 10;          // assignment — semicolon required\necho $x;          // output — semicolon required\n$y = $x + 5;      // expression — semicolon required\n\n// This would cause a PARSE ERROR:\n// echo 'Hello'   // ← missing semicolon!\n?>",
        },
        {
          label: "Comments in PHP",
          code: "<?php\n\n// Single-line comment — everything after // is ignored\n# Also a single-line comment (less common)\n\n/*\n  Multi-line comment\n  Can span many lines\n  Good for explaining a block of code\n*/\n\n$price = 100;   // inline comment after code\n\n/**\n * DocBlock comment — used for function/class documentation\n * @param string $name The user's name\n * @return string The greeting message\n */\nfunction greet($name) {\n  return 'Hello, ' . $name;\n}\n\n?>",
        },
      ],
    },

    // ── 6. OUTPUT FUNCTIONS ───────────────────────────────────────
    {
      id: "output-functions",
      heading: "Output — echo, print, var_dump & print_r",
      content:
        "PHP has several ways to output data. echo is the most commonly used — it is a language construct (not a function) that outputs one or more strings and has no return value. print is similar but slightly slower, only outputs one value, and returns 1. For debugging, var_dump shows the type AND value of any variable — essential when you need to know exactly what a variable contains. print_r shows a human-readable representation of arrays and objects, making it invaluable when working with complex data structures.",
      codeExamples: [
        {
          label: "echo — The Workhorse Output",
          code: "<?php\n\n// echo can output strings\necho 'Hello, World!';\necho \"Hello, World!\";     // double quotes also work\necho '<h1>Big Heading</h1>'; // HTML is fine\n\n// echo can output multiple values (comma-separated)\necho 'Name: ', 'Priya', ' | Age: ', 25;\n// Name: Priya | Age: 25\n\n// Short echo tag in HTML\n$score = 95;\n?>\n<p>Your score is: <?= $score ?></p>\n<?php\n\n// String concatenation with dot (.)\n$first = 'Priya';\n$last  = 'Sharma';\necho 'Full name: ' . $first . ' ' . $last;\n// Full name: Priya Sharma\n\n// Variables inside double-quoted strings are interpolated\necho \"Full name: $first $last\";\n// Full name: Priya Sharma  (same result!)\n\n?>",
        },
        {
          label: "var_dump & print_r — Debugging Tools",
          code: "<?php\n\n$name   = 'Priya';\n$age    = 24;\n$price  = 99.99;\n$active = true;\n$items  = ['apple', 'mango', 'banana'];\n\n// var_dump — shows type AND value (best for debugging)\nvar_dump($name);    // string(5) \"Priya\"\nvar_dump($age);     // int(24)\nvar_dump($price);   // float(99.99)\nvar_dump($active);  // bool(true)\nvar_dump($items);\n// array(3) {\n//   [0]=> string(5) \"apple\"\n//   [1]=> string(5) \"mango\"\n//   [2]=> string(6) \"banana\"\n// }\n\n// print_r — human-readable, good for arrays and objects\nprint_r($items);\n// Array ( [0] => apple [1] => mango [2] => banana )\n\n// Wrap in <pre> tags to format output nicely in the browser\necho '<pre>';\nprint_r($items);\necho '</pre>';\n\n// var_export — shows PHP syntax representation\nvar_export($items);\n// array ( 0 => 'apple', 1 => 'mango', 2 => 'banana', )\n\n?>",
        },
      ],
    },

    // ── 7. VARIABLES & DATA TYPES ─────────────────────────────────
    {
      id: "variables-and-types",
      heading: "Variables & Data Types",
      content:
        "In PHP, every variable starts with a dollar sign ($). You do not declare a variable type — PHP figures it out from the value assigned. This is called loose typing. PHP has eight primitive types: four scalar types (string, integer, float, boolean), two compound types (array and object), and two special types (null and resource). The gettype() function returns the type name as a string. PHP 8 added strict typing support — adding declare(strict_types=1) at the top of a file makes PHP enforce types strictly for that file.",
      codeExamples: [
        {
          label: "Variables and All Data Types",
          code: "<?php\n\n// Variables start with $\n// No declaration keyword needed — just assign\n$name    = 'Priya';        // string\n$age     = 24;              // integer\n$price   = 1299.99;         // float (also called double)\n$isAdmin = true;            // boolean: true or false\n$nothing = null;            // null — intentional empty value\n\n// Check types\necho gettype($name);    // string\necho gettype($age);     // integer\necho gettype($price);   // double\necho gettype($isAdmin); // boolean\necho gettype($nothing); // NULL\n\n// Type checking functions\nvar_dump(is_string($name));  // bool(true)\nvar_dump(is_int($age));      // bool(true)\nvar_dump(is_float($price));  // bool(true)\nvar_dump(is_bool($isAdmin)); // bool(true)\nvar_dump(is_null($nothing)); // bool(true)\n\n// Constants — values that never change, no $ sign\ndefine('TAX_RATE', 0.18);\ndefine('SITE_NAME', 'MyWebApp');\necho TAX_RATE;    // 0.18\necho SITE_NAME;   // MyWebApp\n// TAX_RATE = 0.20; // Fatal error — constants cannot be reassigned\n\n?>",
        },
        {
          label: "String Quoting Rules",
          code: "<?php\n\n$user = 'Arjun';\n\n// Single quotes — literal string, NO variable interpolation\necho 'Hello $user';         // Hello $user  (literal)\necho 'It\\'s a nice day';   // It's a nice day  (escape single quote)\n\n// Double quotes — variables are interpolated\necho \"Hello $user\";         // Hello Arjun\necho \"Hello {$user}!\";      // Hello Arjun!  (curly braces — clearer)\n\n// Escape sequences in double-quoted strings\necho \"Line one\\nLine two\";  // \\n = new line\necho \"Tab\\there\";           // \\t = tab\necho \"He said \\\"hello\\\"\";   // \\\" = literal double quote\n\n// Heredoc — multi-line string with double-quote behaviour\n$message = <<<EOT\nHello $user,\nThis is a multi-line string.\nVariables like $user are interpolated.\nEOT;\necho $message;\n\n// Nowdoc — multi-line string with single-quote behaviour (no interpolation)\n$raw = <<<'EOT'\nHello $user  — this does NOT expand the variable.\nEOT;\necho $raw;\n\n?>",
        },
      ],
      table: {
        headers: ["Type", "PHP Example", "gettype() Returns", "Notes"],
        rows: [
          { cells: ["String",  "$x = 'hello'",       "string",  "Text in single or double quotes"] },
          { cells: ["Integer", "$x = 42",             "integer", "Whole numbers, no decimal"] },
          { cells: ["Float",   "$x = 3.14",           "double",  "Decimal numbers (also called double)"] },
          { cells: ["Boolean", "$x = true",           "boolean", "true or false (case-insensitive)"] },
          { cells: ["Null",    "$x = null",           "NULL",    "Intentional absence of value"] },
          { cells: ["Array",   "$x = [1, 2, 3]",      "array",   "Ordered or keyed collection"] },
          { cells: ["Object",  "$x = new ClassName()", "object",  "Instance of a class"] },
          { cells: ["Resource","$x = fopen(...)",     "resource","External handle (file, DB connection)"] },
        ],
      },
    },

    // ── 8. PHPINFO & DEBUGGING SETUP ─────────────────────────────
    {
      id: "phpinfo-and-debugging",
      heading: "phpinfo(), Error Display & Debugging Setup",
      content:
        "When setting up PHP for the first time, two functions are invaluable. phpinfo() dumps a detailed page showing your PHP version, all loaded extensions, configuration values, and environment variables — it is the quickest way to confirm PHP is running correctly. By default PHP hides error messages in the browser for security. During development you want errors displayed. You can turn this on in php.ini or at the top of any script with ini_set. The error_reporting level controls which kinds of errors are shown.",
      warning: "Never leave phpinfo() or display_errors enabled on a production (live) website. Both reveal sensitive server information that attackers can exploit. Only enable them on your local development machine.",
      codeExamples: [
        {
          label: "phpinfo() — Verify Your Installation",
          code: "<?php\n// Create this file: C:\\xampp\\htdocs\\info.php\n// Visit: http://localhost/info.php  OR  http://localhost:8000/info.php\n\nphpinfo();\n\n// phpinfo() shows:\n// - PHP version\n// - PHP configuration (php.ini location)\n// - All loaded extensions (MySQL, GD, curl, etc.)\n// - Environment variables\n// - Server information\n\n// After checking, DELETE this file from your server!\n// It exposes sensitive configuration details.\n?>",
        },
        {
          label: "Enable Error Reporting for Development",
          code: "<?php\n// Option 1: At the top of each development script\nini_set('display_errors', 1);          // show errors in browser\nini_set('display_startup_errors', 1);  // show startup errors too\nerror_reporting(E_ALL);                // report ALL error types\n\n// Option 2: In php.ini (applies to all scripts)\n// Find php.ini: run phpinfo() and look for 'Loaded Configuration File'\n// Change these lines:\n//   display_errors = On        (was: Off)\n//   error_reporting = E_ALL   (was: E_ALL & ~E_DEPRECATED)\n\n// Common error types:\n// E_ERROR   — fatal errors (script stops)\n// E_WARNING — warnings (script continues)\n// E_NOTICE  — minor issues (undefined variable, etc.)\n// E_ALL     — everything\n\n// After changing php.ini you MUST restart Apache in XAMPP\n// Control Panel → Apache → Stop → Start\n\n// Test that errors show:\n// echo $undefinedVariable; // Should show Notice if E_ALL is on\n?>",
        },
        {
          label: "A Good Development Template",
          code: "<?php\n// Copy this template at the top of every development PHP file\ndeclare(strict_types=1);           // enforce strict types\nini_set('display_errors', '1');\nini_set('display_startup_errors', '1');\nerror_reporting(E_ALL);\n\n// Your code below\n$name = 'Priya';\n$age  = 24;\n\necho '<h2>User Info</h2>';\necho '<p>Name: ' . htmlspecialchars($name) . '</p>';\necho '<p>Age: '  . $age . '</p>';\n\n// htmlspecialchars() converts special characters to HTML entities\n// Always use it when echoing user-provided data\n// Prevents XSS: <script>alert(1)</script> becomes safe text\n?>",
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-setup-guide",
      label: "Setup Guide",
      html: `<style>
  .setup-step {
    display: flex; gap: 14px; margin-bottom: 16px; align-items: flex-start;
    font-family: sans-serif;
  }
  .step-num {
    width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-weight: 800; font-size: 0.9rem; flex-shrink: 0;
    background: #777bb4; color: white;
  }
  .step-num.done { background: #22c55e; }
  .step-content { flex: 1; }
  .step-title { font-weight: 700; font-size: 0.85rem; color: #1e1b4b; margin-bottom: 4px; }
  .step-desc  { font-size: 0.78rem; color: #4b5563; line-height: 1.6; }
  .step-code  {
    background: #1e1e1e; color: #d4d4d4; border-radius: 7px; padding: 9px 13px;
    font-family: 'Courier New', monospace; font-size: 0.72rem; margin-top: 7px;
    line-height: 1.7;
  }
  .step-note  {
    background: #f0fdf4; border-left: 3px solid #22c55e; padding: 7px 11px;
    border-radius: 0 6px 6px 0; font-size: 0.73rem; color: #166534; margin-top: 7px;
  }
  .step-warn  {
    background: #fef9c3; border-left: 3px solid #fde047; padding: 7px 11px;
    border-radius: 0 6px 6px 0; font-size: 0.73rem; color: #713f12; margin-top: 7px;
  }
  .tab-btns { display: flex; gap: 6px; margin-bottom: 14px; }
  .tab-btn {
    padding: 6px 14px; border: 2px solid #e5e7eb; border-radius: 7px; font-size: 0.75rem;
    font-weight: 700; cursor: pointer; background: white; color: #6b7280; transition: all 0.15s;
  }
  .tab-btn.active { border-color: #777bb4; background: #777bb4; color: white; }
  .tab-panel { display: none; }
  .tab-panel.active { display: block; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#6b7280;margin-bottom:12px">Choose your setup method:</p>

  <div class="tab-btns">
    <button class="tab-btn active" onclick="showTab('xampp',this)">XAMPP (recommended)</button>
    <button class="tab-btn" onclick="showTab('builtin',this)">Built-in Server</button>
  </div>

  <!-- XAMPP TAB -->
  <div id="tab-xampp" class="tab-panel active">
    ${[
      ["1","Download XAMPP","Go to apachefriends.org — download for your OS (Windows/Mac/Linux). Run the installer, accept all defaults.",
       "Install to: C:\\xampp (Windows) or /opt/lampp (Linux)","",""],
      ["2","Open Control Panel","After install, open the XAMPP Control Panel application from your Start Menu or Applications folder.","","",""],
      ["3","Start Apache","Click the Start button next to Apache. Wait for the green light and port numbers (80, 443) to appear.",
       "Green ✓ — Apache running on port 80",
       "If port 80 is busy: Config → httpd.conf → change Listen 80 to Listen 8080",""],
      ["4","Test in browser","Open your browser and visit http://localhost — you should see the XAMPP dashboard.",
       "Seeing the XAMPP welcome page means Apache is working!","",""],
      ["5","Create your project","Create a folder inside C:\\xampp\\htdocs\\ called myphp — this is your project folder.","","",""],
      ["6","Create hello.php","Inside myphp, create hello.php with: <?php echo '<h1>Hello!</h1>'; ?>","","",""],
      ["7","Open in browser","Visit http://localhost/myphp/hello.php — you should see Hello! as a heading.",
       "If you see the PHP source code instead of output, Apache is not running","",""],
    ].map(([num, title, desc, note, warn]) => `
    <div class="setup-step">
      <div class="step-num">${num}</div>
      <div class="step-content">
        <div class="step-title">${title}</div>
        <div class="step-desc">${desc}</div>
        ${note ? `<div class="step-note">✓ ${note}</div>` : ''}
        ${warn ? `<div class="step-warn">⚠️ ${warn}</div>` : ''}
      </div>
    </div>`).join("")}
  </div>

  <!-- BUILT-IN SERVER TAB -->
  <div id="tab-builtin" class="tab-panel">
    ${[
      ["1","Verify PHP is installed","Open Terminal or Command Prompt and check your PHP version.","",""],
      ["2","Create a project folder","Create a folder anywhere — e.g. C:\\projects\\myphp or ~/projects/myphp","",""],
      ["3","Create index.php","Inside the folder create index.php with any PHP code.","",""],
      ["4","Start the server","Navigate to the folder in Terminal and start the server.","One command — instant server, no Control Panel needed",""],
      ["5","Open in browser","Visit http://localhost:8000 or http://localhost:8000/index.php","",""],
      ["6","Watch the log","The terminal shows every request in real time — great for debugging.","",""],
      ["7","Stop the server","Press Ctrl + C in the terminal when done.","",""],
    ].map(([num, title, desc, note]) => {
      const codes = [
        "php --version\n// PHP 8.2.0 (cli)\n// If not found: install PHP or add it to your PATH",
        "mkdir C:\\projects\\myphp  (Windows)\nmkdir ~/projects/myphp    (Mac/Linux)",
        "<?php\necho '<h1>Hello from built-in server!</h1>';\necho '<p>PHP version: ' . PHP_VERSION . '</p>';\n?>",
        "cd C:\\projects\\myphp     (Windows)\ncd ~/projects/myphp       (Mac/Linux)\n\nphp -S localhost:8000\n// PHP 8.2.0 Development Server started",
        "// Open browser:\nhttp://localhost:8000\nhttp://localhost:8000/index.php",
        "// Terminal output:\n[10:00:01] 127.0.0.1 [200]: GET /index.php\n[10:00:02] 127.0.0.1 [404]: GET /missing.php",
        "// In the terminal running the server:\nCtrl + C\n// Server stopped"
      ];
      return `
      <div class="setup-step">
        <div class="step-num">${num}</div>
        <div class="step-content">
          <div class="step-title">${title}</div>
          <div class="step-desc">${desc}</div>
          <div class="step-code">${codes[parseInt(num)-1].replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
          ${note ? `<div class="step-note">✓ ${note}</div>` : ''}
        </div>
      </div>`;
    }).join("")}
  </div>

  <script>
    function showTab(id, btn) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + id).classList.add('active');
      btn.classList.add('active');
    }
  </script>
</div>`,
    },

    {
      id: "demo-php-vs-js",
      label: "PHP vs JavaScript",
      html: `<style>
  .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .compare-col  { border-radius: 10px; overflow: hidden; }
  .compare-head { padding: 10px 14px; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; gap: 8px; }
  .compare-code { background: #1e1e1e; color: #d4d4d4; padding: 12px 14px; font-family: 'Courier New', monospace; font-size: 0.7rem; line-height: 1.75; }
  .compare-note { padding: 8px 14px; font-size: 0.72rem; line-height: 1.5; }
  .kw  { color: #569cd6 } .str { color: #ce9178 } .cm { color: #6a9955 } .fn { color: #dcdcaa } .var { color: #9cdcfe }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#6b7280;margin-bottom:12px">Same concept, different worlds — PHP (server) vs JavaScript (browser):</p>

  ${[
    {
      label: "Variables",
      php: '<span class="kw">$</span><span class="var">name</span> = <span class="str">\'Priya\'</span>;<br><span class="kw">$</span><span class="var">age</span>  = <span class="str">24</span>;<br><span class="fn">echo</span> <span class="kw">$</span><span class="var">name</span> . <span class="str">\' is \'</span> . <span class="kw">$</span><span class="var">age</span>;',
      js:  '<span class="kw">const</span> <span class="var">name</span> = <span class="str">\'Priya\'</span>;<br><span class="kw">const</span> <span class="var">age</span>  = 24;<br>console.<span class="fn">log</span>(<span class="var">name</span> + <span class="str">\' is \'</span> + <span class="var">age</span>);',
      note: "PHP variables always start with $. JavaScript uses const/let/var."
    },
    {
      label: "String Interpolation",
      php: '<span class="fn">echo</span> <span class="str">"Hello <span class="kw">$</span><span class="var">name</span>!"</span>; <span class="cm">// works in ""</span><br><span class="fn">echo</span> <span class="str">\'Hello $name\'</span>; <span class="cm">// literal in \'\'</span>',
      js:  'console.<span class="fn">log</span>(<span class="str">`Hello <span class="kw">${</span><span class="var">name</span><span class="kw">}</span>!`</span>); <span class="cm">// template literal</span><br>console.<span class="fn">log</span>(<span class="str">\'Hello \'</span> + <span class="var">name</span>); <span class="cm">// concatenation</span>',
      note: "PHP uses double quotes for interpolation. JS uses backtick template literals."
    },
    {
      label: "Output",
      php: '<span class="fn">echo</span> <span class="str">\'Hello\'</span>; <span class="cm">// most common</span><br><span class="fn">print</span> <span class="str">\'Hello\'</span>; <span class="cm">// returns 1</span><br><span class="fn">var_dump</span>(<span class="kw">$</span><span class="var">name</span>); <span class="cm">// debug with type</span>',
      js:  'console.<span class="fn">log</span>(<span class="str">\'Hello\'</span>); <span class="cm">// to DevTools</span><br>document.body.<span class="var">innerHTML</span> = <span class="str">\'Hello\'</span>; <span class="cm">// to page</span><br>console.<span class="fn">log</span>(<span class="kw">typeof</span> <span class="var">name</span>); <span class="cm">// debug type</span>',
      note: "PHP echo outputs to the HTML page. JS console.log outputs to DevTools."
    },
    {
      label: "Comments",
      php: '<span class="cm">// single-line</span><br><span class="cm"># also single-line</span><br><span class="cm">/* multi-line */</span>',
      js:  '<span class="cm">// single-line</span><br><span class="cm">/* multi-line */</span>',
      note: "PHP also supports # for single-line comments (shell style)."
    },
  ].map(({label, php, js, note}) => `
  <div style="margin-bottom:14px">
    <div style="font-weight:700;color:#374151;font-size:0.78rem;margin-bottom:6px">${label}</div>
    <div class="compare-grid">
      <div class="compare-col">
        <div class="compare-head" style="background:#777bb4;color:white">🐘 PHP (server)</div>
        <div class="compare-code">${php}</div>
        <div class="compare-note" style="background:#f5f3ff;color:#4c1d95">${note.split('PHP')[1]||''}</div>
      </div>
      <div class="compare-col">
        <div class="compare-head" style="background:#f7df1e;color:#1a1a1a">⚡ JavaScript (browser)</div>
        <div class="compare-code">${js}</div>
        <div class="compare-note" style="background:#fef9c3;color:#713f12">${note}</div>
      </div>
    </div>
  </div>`).join("")}
</div>`,
    },

    {
      id: "demo-output-functions",
      label: "Output Functions",
      html: `<style>
  .out-card { background: #f8f9fa; border-radius: 10px; padding: 14px; margin-bottom: 12px; }
  .out-label { font-weight: 800; font-size: 0.78rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
  .out-fn   { background: #777bb4; color: white; padding: 2px 9px; border-radius: 5px; font-family: 'Courier New', monospace; font-size: 0.7rem; }
  .out-code { background: #1e1e1e; color: #d4d4d4; border-radius: 7px; padding: 10px 13px; font-family: 'Courier New', monospace; font-size: 0.71rem; line-height: 1.7; margin-bottom: 8px; }
  .out-result { background: white; border: 1px solid #e5e7eb; border-radius: 7px; padding: 10px 13px; font-family: 'Courier New', monospace; font-size: 0.72rem; color: #374151; }
  .out-result .type { color: #777bb4; font-weight: 700; }
  .out-result .val  { color: #166534; }
  .out-result .key  { color: #3b82f6; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#6b7280;margin-bottom:12px">Four ways to output data in PHP — and what they produce:</p>

  <div class="out-card">
    <div class="out-label"><span class="out-fn">echo</span> Most common — outputs strings and HTML</div>
    <div class="out-code">
      echo 'Hello, World!';<br>
      echo '&lt;h3&gt;Heading&lt;/h3&gt;';<br>
      echo 'Name: ', 'Priya', ', Age: ', 24;
    </div>
    <div class="out-result">
      Hello, World!<br>
      <strong>Heading</strong><br>
      Name: Priya, Age: 24
    </div>
  </div>

  <div class="out-card">
    <div class="out-label"><span class="out-fn">var_dump()</span> Debug tool — shows type AND value</div>
    <div class="out-code">
      var_dump('Priya');<br>
      var_dump(24);<br>
      var_dump(true);<br>
      var_dump(null);
    </div>
    <div class="out-result">
      <span class="type">string</span>(5) <span class="val">"Priya"</span><br>
      <span class="type">int</span>(24)<br>
      <span class="type">bool</span>(<span class="val">true</span>)<br>
      <span class="type">NULL</span>
    </div>
  </div>

  <div class="out-card">
    <div class="out-label"><span class="out-fn">print_r()</span> Human-readable arrays and objects</div>
    <div class="out-code">
      $fruits = ['apple', 'mango', 'banana'];<br>
      echo '&lt;pre&gt;'; print_r($fruits); echo '&lt;/pre&gt;';
    </div>
    <div class="out-result" style="white-space:pre;font-size:0.7rem">Array
(
    <span class="key">[0]</span> => <span class="val">apple</span>
    <span class="key">[1]</span> => <span class="val">mango</span>
    <span class="key">[2]</span> => <span class="val">banana</span>
)</div>
  </div>

  <div class="out-card">
    <div class="out-label"><span class="out-fn">var_dump()</span> on an array — shows types too</div>
    <div class="out-code">
      $data = [42, 'hello', true, null];<br>
      var_dump($data);
    </div>
    <div class="out-result" style="white-space:pre;font-size:0.7rem"><span class="type">array</span>(4) {
  [<span class="key">0</span>]=> <span class="type">int</span>(<span class="val">42</span>)
  [<span class="key">1</span>]=> <span class="type">string</span>(5) <span class="val">"hello"</span>
  [<span class="key">2</span>]=> <span class="type">bool</span>(<span class="val">true</span>)
  [<span class="key">3</span>]=> <span class="type">NULL</span>
}</div>
  </div>
</div>`,
    },

    {
      id: "demo-variables-types",
      label: "Variables & Types",
      html: `<style>
  .type-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .type-code { background: #1e1e1e; color: #d4d4d4; padding: 7px 12px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 0.73rem; flex: 1.6; }
  .type-badge { padding: 4px 11px; border-radius: 20px; font-family: 'Courier New', monospace; font-size: 0.7rem; font-weight: 700; min-width: 70px; text-align: center; }
  .type-val { background: #f0fdf4; color: #166534; border: 1px solid #86efac; padding: 6px 10px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 0.72rem; min-width: 120px; }
  .section-head { font-weight: 700; font-size: 0.78rem; margin: 12px 0 6px; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#6b7280;margin-bottom:12px">PHP data types — value and gettype() result:</p>

  ${[
    ["String",  "$name = 'Priya'",        "string",  "#777bb4","#ede9fe", "'Priya'"],
    ["Integer", "$age = 24",              "integer", "#3b82f6","#dbeafe", "24"],
    ["Float",   "$price = 1299.99",       "double",  "#0891b2","#e0f2fe", "1299.99"],
    ["Boolean", "$active = true",         "boolean", "#22c55e","#dcfce7", "true"],
    ["Null",    "$empty = null",          "NULL",    "#6b7280","#f3f4f6", "NULL"],
    ["Array",   "$arr = [1, 2, 3]",       "array",   "#f59e0b","#fef3c7", "Array(3)"],
  ].map(([type, code, gettype, color, bg, val]) => `
  <div class="type-row">
    <div class="type-code">${code}</div>
    <div class="type-badge" style="background:${bg};color:${color}">${gettype}</div>
    <div class="type-val">→ ${val}</div>
  </div>`).join("")}

  <p class="section-head" style="color:#777bb4;margin-top:14px">Constants (no $ sign, never change)</p>
  ${[
    ["define('TAX_RATE', 0.18)",  "0.18"],
    ["define('APP_NAME', 'MyApp')","'MyApp'"],
    ["PHP_VERSION",                "'8.2.0' (built-in)"],
    ["PHP_EOL",                    "newline char (built-in)"],
    ["PHP_INT_MAX",                "9223372036854775807"],
  ].map(([code, val]) => `
  <div class="type-row">
    <div class="type-code">${code}</div>
    <div class="type-val" style="flex:1">→ ${val}</div>
  </div>`).join("")}
</div>`,
    },

    {
      id: "demo-request-cycle",
      label: "Request Cycle",
      html: `<style>
  .cycle-step {
    display: flex; align-items: flex-start; gap: 14px; margin-bottom: 10px; padding: 12px 14px;
    border-radius: 10px; font-family: sans-serif; font-size: 0.78rem;
  }
  .cycle-icon { font-size: 1.6rem; flex-shrink: 0; line-height: 1; }
  .cycle-title { font-weight: 700; margin-bottom: 3px; }
  .cycle-desc { color: #4b5563; line-height: 1.5; font-size: 0.75rem; }
  .cycle-code { background: #1e1e1e; color: #d4d4d4; border-radius: 6px; padding: 7px 10px; font-family: 'Courier New', monospace; font-size: 0.68rem; margin-top: 6px; line-height: 1.6; }
  .cycle-arrow { text-align: center; color: #9ca3af; font-size: 1.2rem; margin: 2px 0; }
</style>
<div>
  <p style="color:#6b7280;margin-bottom:12px;font-family:sans-serif;font-size:0.82rem">The PHP request-response cycle — step by step:</p>

  <div class="cycle-step" style="background:#ede9fe">
    <div class="cycle-icon">🌐</div>
    <div>
      <div class="cycle-title" style="color:#4c1d95">1. Browser sends a request</div>
      <div class="cycle-desc">User types a URL or clicks a link. The browser sends an HTTP GET request to the server.</div>
      <div class="cycle-code">GET /hello.php HTTP/1.1<br>Host: localhost</div>
    </div>
  </div>
  <div class="cycle-arrow">↓</div>

  <div class="cycle-step" style="background:#dbeafe">
    <div class="cycle-icon">🖥️</div>
    <div>
      <div class="cycle-title" style="color:#1e3a8a">2. Apache receives the request</div>
      <div class="cycle-desc">Apache sees the .php extension and hands the file to the PHP interpreter instead of sending it directly.</div>
      <div class="cycle-code">// Apache config (auto-handled by XAMPP):<br>AddType application/x-httpd-php .php</div>
    </div>
  </div>
  <div class="cycle-arrow">↓</div>

  <div class="cycle-step" style="background:#e0f2fe">
    <div class="cycle-icon">🐘</div>
    <div>
      <div class="cycle-title" style="color:#0c4a6e">3. PHP executes the code</div>
      <div class="cycle-desc">PHP reads the file top-to-bottom, runs all PHP blocks, and produces HTML output.</div>
      <div class="cycle-code">&lt;?php<br>  $name = 'Priya';<br>  echo '&lt;h1&gt;Hello, '.$name.'!&lt;/h1&gt;';<br>?&gt;<br>// PHP produces: &lt;h1&gt;Hello, Priya!&lt;/h1&gt;</div>
    </div>
  </div>
  <div class="cycle-arrow">↓</div>

  <div class="cycle-step" style="background:#dcfce7">
    <div class="cycle-icon">📄</div>
    <div>
      <div class="cycle-title" style="color:#14532d">4. Server sends back HTML</div>
      <div class="cycle-desc">Apache takes PHP's output (pure HTML) and sends it back in the HTTP response. No PHP code is included.</div>
      <div class="cycle-code">HTTP/1.1 200 OK<br>Content-Type: text/html<br><br>&lt;h1&gt;Hello, Priya!&lt;/h1&gt;</div>
    </div>
  </div>
  <div class="cycle-arrow">↓</div>

  <div class="cycle-step" style="background:#fef9c3">
    <div class="cycle-icon">🖼️</div>
    <div>
      <div class="cycle-title" style="color:#713f12">5. Browser renders the HTML</div>
      <div class="cycle-desc">The browser renders the received HTML. It never saw the PHP code — only the finished HTML output.</div>
      <div class="cycle-code">// Browser renders a big heading:<br>Hello, Priya!</div>
    </div>
  </div>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Install & Verify Your Environment",
      description: "Get your PHP development environment up and running:",
      tasks: [
        "Download and install XAMPP from apachefriends.org — run the installer with default settings",
        "Open the XAMPP Control Panel and start Apache — confirm the green light and port 80 appear",
        "Open your browser and visit http://localhost — you should see the XAMPP dashboard",
        "Create the folder C:\\xampp\\htdocs\\phplearning\\ (or the equivalent on your OS)",
        "Create info.php inside that folder containing only: <?php phpinfo(); ?>",
        "Visit http://localhost/phplearning/info.php — read the output and note your PHP version, php.ini location, and three extensions that are loaded",
        "Delete info.php after checking — practise the security habit of never leaving phpinfo() on a server",
      ],
      hint: "If Apache fails to start, check whether port 80 is in use by another application. In the XAMPP Control Panel, click Config next to Apache, open httpd.conf, and change 'Listen 80' to 'Listen 8080'. Then access your files at http://localhost:8080/ instead.",
    },
    {
      title: "Exercise 2: The Built-in PHP Server",
      description: "Run PHP without XAMPP using the built-in development server:",
      tasks: [
        "Open Terminal (Mac/Linux) or Command Prompt (Windows) and run: php --version to confirm PHP is available",
        "Create a new folder called phptest anywhere on your computer (e.g. Desktop/phptest)",
        "Create index.php inside it with: <?php echo '<h1>Built-in server works!</h1>'; echo '<p>PHP version: ' . PHP_VERSION . '</p>'; ?>",
        "In the terminal, cd into the phptest folder and run: php -S localhost:8000",
        "Open http://localhost:8000 in your browser — verify the output appears",
        "Create a second file called about.php with different content and visit http://localhost:8000/about.php",
        "Watch the terminal as you load pages — note how each request is logged with a status code",
        "Press Ctrl+C to stop the server",
      ],
      hint: "On Windows, if 'php' is not recognised as a command, you need to add the PHP folder to your PATH. In XAMPP this is C:\\xampp\\php. Search 'environment variables' in Windows settings and add this path to the PATH variable.",
    },
    {
      title: "Exercise 3: PHP Basics — Output and Variables",
      description: "Write your first real PHP scripts practising all output methods:",
      tasks: [
        "Create profile.php — declare variables for your name, age, city, and a favourite programming language. Output them in a nicely formatted HTML page using echo",
        "Use var_dump() on each variable and wrap the output in <pre> tags so it is readable in the browser",
        "Create a constants.php file — define at least three constants (your site name, version, and max items per page) and output them",
        "Practise both single and double-quoted strings — create a variable $language = 'PHP' and show the difference between echo '$language is great' and echo \"$language is great\"",
        "Create a data_types.php file with one variable of each type (string, integer, float, boolean, null, array) — use gettype() and is_string()/is_int() etc. to verify each type",
        "Use print_r() wrapped in <pre> tags to display an associative array of your personal details",
      ],
      hint: "When using var_dump() or print_r() in the browser, always wrap them: echo '<pre>'; var_dump($variable); echo '</pre>'; — otherwise the output is all squished on one line with no indentation.",
    },
    {
      title: "Challenge: Build a PHP System Info Page",
      description: "Create a polished system information page using PHP constants and functions:",
      tasks: [
        "Create a file called sysinfo.php with proper HTML5 structure — title, meta charset, a styled page",
        "Display: PHP version (PHP_VERSION), operating system (PHP_OS), maximum integer (PHP_INT_MAX), end-of-line character type (PHP_EOL displayed as literal name), and today's date using date('l, d F Y')",
        "Display the current time using date('H:i:s') — wrap it in a span with id='clock'",
        "Show the server's document root using $_SERVER['DOCUMENT_ROOT'] and the current script path using $_SERVER['SCRIPT_FILENAME']",
        "Use a PHP array of your three favourite technologies — display them as a styled HTML list using a foreach loop (we will cover loops properly in session 20 but try it now: foreach ($array as $item) { echo '<li>' . $item . '</li>'; })",
        "Add a note at the bottom reminding yourself: 'This page refreshes each request — PHP re-runs every time'",
      ],
      hint: "The $_SERVER superglobal is a PHP array filled with server and request information. Use var_dump($_SERVER) to see everything available in it. date() formats the current server time — format characters are documented at php.net/date.",
    },
  ],
};

export default session19;