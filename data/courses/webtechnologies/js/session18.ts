// data/courses/webtechnologies/javascript/session18.ts
import type { SessionData } from "@/types/session";

const session18: SessionData = {
  meta: {
    sessionNumber: 18,
    module: "javascript",
    moduleNumber: 3,
    title: "Forms & Form Validation",
    subtitle: "Build forms that guide users to success — collect data correctly, validate it thoroughly, and give clear, helpful feedback",
    duration: "2 hrs",
    color: "#A832A8",
    colorDim: "rgba(247,223,30,0.10)",
    colorMid: "rgba(247,223,30,0.22)",
    objectives: [
      "Understand the HTML form element and all its input types",
      "Access and read form data using the FormData API and element properties",
      "Validate input using HTML5 built-in validation attributes",
      "Write custom JavaScript validation logic with clear error messages",
      "Understand the difference between client-side and server-side validation",
      "Build a real-time validation UI with visual feedback on every field",
      "Use regular expressions for email, phone, and password pattern matching",
      "Handle form submission — prevent defaults, validate, and display results",
    ],
    prevSession: { num: 17, title: "Events & Event Handling", href: "/courses/webtechnologies/javascript/session17" },
    nextSession: { num: 19, title: "Fetch API & Async JavaScript", href: "/courses/webtechnologies/javascript/session19" },
  },

  topics: [
    // ── 1. HTML FORM ELEMENTS ─────────────────────────────────────
    {
      id: "html-form-elements",
      heading: "HTML Form Elements & Input Types",
      content:
        "A form is a collection of controls that lets users send data to a server or handle it with JavaScript. The form element wraps all its controls and defines how data is submitted — the action attribute sets the destination URL and method sets HTTP verb (GET or POST). HTML5 introduced many specialised input types beyond text — email, password, number, date, tel, url, color, range, file and more. Using the correct type gives you free browser validation, the right keyboard on mobile, and better accessibility. The name attribute is essential — it is the key used when submitting form data.",
      tip: "Always use the most specific input type for the job. type='email' gives mobile users a keyboard with the @ symbol. type='number' prevents letters. type='date' gives a native date picker. These are free wins that require zero JavaScript.",
      table: {
        headers: ["Input Type", "Best For", "Built-in Behaviour"],
        rows: [
          { cells: ["text",     "Short freeform text",        "Basic text, no restriction"] },
          { cells: ["email",    "Email addresses",             "Validates @ presence, email keyboard on mobile"] },
          { cells: ["password", "Passwords",                   "Masks characters, prevents autocomplete by default"] },
          { cells: ["number",   "Numeric values",              "Number keyboard, min/max/step attributes"] },
          { cells: ["tel",      "Phone numbers",               "Telephone keyboard on mobile, no format enforcement"] },
          { cells: ["url",      "Web addresses",               "Validates URL format"] },
          { cells: ["date",     "Calendar dates",              "Native date picker, structured value"] },
          { cells: ["time",     "Time values",                 "Native time picker"] },
          { cells: ["range",    "Sliders / numeric ranges",   "Draggable slider, min/max/step"] },
          { cells: ["checkbox", "Boolean on/off",              "checked property, can select multiple"] },
          { cells: ["radio",    "One of several options",      "Same name groups them, only one selectable"] },
          { cells: ["select",   "Dropdown choices",            "Multiple attribute for multi-select"] },
          { cells: ["textarea", "Multi-line text",             "rows/cols size, resizable"] },
          { cells: ["file",     "File uploads",                "accept attribute filters file types"] },
          { cells: ["hidden",   "Data not shown to user",     "Submitted with form but invisible"] },
        ],
      },
      codeExamples: [
        {
          label: "A Well-Structured Form",
          code: "<form id=\"signup-form\" action=\"/register\" method=\"POST\" novalidate>\n\n  <!-- Text input with label -->\n  <div class=\"field-group\">\n    <label for=\"username\">Username</label>\n    <input\n      type=\"text\"\n      id=\"username\"\n      name=\"username\"\n      placeholder=\"Choose a username\"\n      required\n      minlength=\"3\"\n      maxlength=\"20\"\n      autocomplete=\"username\"\n    >\n  </div>\n\n  <!-- Email -->\n  <div class=\"field-group\">\n    <label for=\"email\">Email address</label>\n    <input type=\"email\" id=\"email\" name=\"email\" required>\n  </div>\n\n  <!-- Password -->\n  <div class=\"field-group\">\n    <label for=\"password\">Password</label>\n    <input type=\"password\" id=\"password\" name=\"password\"\n           minlength=\"8\" required autocomplete=\"new-password\">\n  </div>\n\n  <!-- Number with constraints -->\n  <div class=\"field-group\">\n    <label for=\"age\">Age</label>\n    <input type=\"number\" id=\"age\" name=\"age\" min=\"13\" max=\"120\">\n  </div>\n\n  <!-- Radio group -->\n  <fieldset>\n    <legend>Account type</legend>\n    <label><input type=\"radio\" name=\"role\" value=\"student\" checked> Student</label>\n    <label><input type=\"radio\" name=\"role\" value=\"teacher\"> Teacher</label>\n  </fieldset>\n\n  <!-- Checkbox -->\n  <label>\n    <input type=\"checkbox\" name=\"terms\" id=\"terms\" required>\n    I agree to the Terms of Service\n  </label>\n\n  <button type=\"submit\">Create Account</button>\n  <button type=\"reset\">Clear Form</button>\n\n</form>",
        },
      ],
    },

    // ── 2. READING FORM DATA ──────────────────────────────────────
    {
      id: "reading-form-data",
      heading: "Reading Form Data with JavaScript",
      content:
        "There are two ways to read form data in JavaScript. Accessing individual element properties directly is best when you need specific fields — use element.value for text inputs, element.checked for checkboxes and radios, and element.files for file inputs. The FormData API collects all named fields at once into an iterable object — perfect for sending data via fetch or inspecting an entire form at once. FormData respects the name attribute on each input, so it is essential that every input has a name.",
      codeExamples: [
        {
          label: "Reading Individual Fields",
          code: "// Text, email, password, number, tel, url — all use .value\nconst username = document.getElementById('username').value;\nconst email    = document.getElementById('email').value;\nconst age      = Number(document.getElementById('age').value);\n\n// Checkbox — use .checked (true or false)\nconst agreed = document.getElementById('terms').checked;\n\n// Radio — find the checked one in the group\nconst roleInput = document.querySelector('input[name=\"role\"]:checked');\nconst role = roleInput ? roleInput.value : null;\n\n// Select dropdown\nconst select = document.getElementById('country');\nconst country = select.value;\n// Multiple select — get all selected options\nconst multiSelect = document.getElementById('skills');\nconst skills = [...multiSelect.selectedOptions].map(o => o.value);\n\n// Textarea\nconst bio = document.getElementById('bio').value;\n\n// File input\nconst fileInput = document.getElementById('avatar');\nconst file = fileInput.files[0]; // first selected file\nif (file) {\n  console.log(file.name, file.size, file.type);\n}",
        },
        {
          label: "FormData API — Collect All Fields at Once",
          code: "const form = document.getElementById('signup-form');\n\nform.addEventListener('submit', function(e) {\n  e.preventDefault();\n\n  // Create FormData from the entire form\n  const data = new FormData(form);\n\n  // Read individual values\n  console.log(data.get('username'));  // 'priya_dev'\n  console.log(data.get('email'));     // 'priya@example.com'\n  console.log(data.get('role'));      // 'student'\n\n  // Check if a field exists\n  console.log(data.has('terms'));     // true or false\n\n  // For fields with multiple values (multi-select, multiple checkboxes)\n  const allSkills = data.getAll('skills'); // returns array\n\n  // Convert to a plain object\n  const formObject = Object.fromEntries(data.entries());\n  console.log(formObject);\n  // { username: 'priya_dev', email: 'priya@example.com', ... }\n\n  // Send with fetch (covered in Session 19)\n  // fetch('/api/register', { method: 'POST', body: data });\n});",
        },
      ],
    },

    // ── 3. HTML5 BUILT-IN VALIDATION ─────────────────────────────
    {
      id: "html5-validation",
      heading: "HTML5 Built-in Validation Attributes",
      content:
        "HTML5 provides a set of validation attributes that the browser enforces automatically before form submission — no JavaScript needed. required marks a field as mandatory. minlength and maxlength enforce string length. min and max constrain numeric and date values. pattern accepts a regular expression the value must match. type itself validates format for email and url. The novalidate attribute on the form element disables all browser validation — useful when you want to replace it entirely with your own JavaScript UI. The Constraint Validation API lets you check validity in JavaScript even when novalidate is set.",
      codeExamples: [
        {
          label: "Validation Attributes",
          code: "<!-- required — field must have a value -->\n<input type=\"text\" name=\"name\" required>\n\n<!-- minlength / maxlength — string length limits -->\n<input type=\"text\" name=\"username\" minlength=\"3\" maxlength=\"20\">\n\n<!-- min / max — for number, date, time, range -->\n<input type=\"number\" name=\"age\" min=\"13\" max=\"120\">\n<input type=\"date\" name=\"dob\" min=\"2000-01-01\" max=\"2010-12-31\">\n\n<!-- pattern — must match a regular expression -->\n<input type=\"text\" name=\"postcode\"\n       pattern=\"[0-9]{6}\"\n       title=\"Please enter a 6-digit postcode\">\n\n<!-- type validation — email and url are checked automatically -->\n<input type=\"email\" name=\"email\" required>\n<input type=\"url\" name=\"website\" placeholder=\"https://\">\n\n<!-- step — valid values increment -->\n<input type=\"number\" name=\"score\" min=\"0\" max=\"100\" step=\"5\">\n\n<!-- multiple — for email and file inputs -->\n<input type=\"email\" name=\"emails\" multiple>\n<input type=\"file\" name=\"docs\" multiple accept=\".pdf,.doc\">",
        },
        {
          label: "Constraint Validation API",
          code: "const input = document.getElementById('email');\n\n// Check validity without submitting\nconsole.log(input.validity.valid);       // true or false\nconsole.log(input.validity.valueMissing);// true if required and empty\nconsole.log(input.validity.typeMismatch);// true if wrong type format\nconsole.log(input.validity.tooShort);    // true if below minlength\nconsole.log(input.validity.tooLong);     // true if above maxlength\nconsole.log(input.validity.rangeUnderflow);// true if below min\nconsole.log(input.validity.rangeOverflow); // true if above max\nconsole.log(input.validity.patternMismatch);// true if pattern fails\n\n// Browser's built-in error message\nconsole.log(input.validationMessage); // 'Please include an @ in the email'\n\n// Set a custom error message\ninput.setCustomValidity('This email is already registered');\n// Clear a custom error (restore built-in)\ninput.setCustomValidity('');\n\n// Trigger browser validation bubble manually\ninput.reportValidity();",
        },
      ],
    },

    // ── 4. CUSTOM JAVASCRIPT VALIDATION ──────────────────────────
    {
      id: "custom-validation",
      heading: "Custom JavaScript Validation",
      content:
        "HTML5 attributes handle simple rules but real applications need more — checking if a username is taken, ensuring password and confirm-password match, validating a phone number format, or running async checks against a server. Custom validation means adding a novalidate attribute to the form, intercepting the submit event, running your own checks, and showing your own error messages. A good validation function returns an object with a valid boolean and a message string — making it easy to test and reuse.",
      tip: "Validate on blur (when the user leaves a field) for immediate feedback, and revalidate on input (as they type) once an error has been shown. Never validate only on submit — users should know about errors as they fill in the form, not all at once at the end.",
      codeExamples: [
        {
          label: "A Validation Function Pattern",
          code: "// Each validator returns { valid: boolean, message: string }\n\nfunction validateRequired(value, fieldName) {\n  if (!value.trim()) {\n    return { valid: false, message: fieldName + ' is required' };\n  }\n  return { valid: true, message: '' };\n}\n\nfunction validateMinLength(value, min, fieldName) {\n  if (value.trim().length < min) {\n    return {\n      valid: false,\n      message: fieldName + ' must be at least ' + min + ' characters'\n    };\n  }\n  return { valid: true, message: '' };\n}\n\nfunction validateEmail(value) {\n  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  if (!value.trim()) {\n    return { valid: false, message: 'Email is required' };\n  }\n  if (!emailRegex.test(value)) {\n    return { valid: false, message: 'Please enter a valid email address' };\n  }\n  return { valid: true, message: '' };\n}\n\nfunction validatePassword(value) {\n  if (value.length < 8) {\n    return { valid: false, message: 'Password must be at least 8 characters' };\n  }\n  if (!/[A-Z]/.test(value)) {\n    return { valid: false, message: 'Password must contain an uppercase letter' };\n  }\n  if (!/[0-9]/.test(value)) {\n    return { valid: false, message: 'Password must contain a number' };\n  }\n  return { valid: true, message: '' };\n}\n\nfunction validateMatch(value, other, fieldName) {\n  if (value !== other) {\n    return { valid: false, message: fieldName + ' does not match' };\n  }\n  return { valid: true, message: '' };\n}",
        },
        {
          label: "Showing & Clearing Error Messages",
          code: "// Helper: show an error on a field\nfunction showError(inputId, message) {\n  const input = document.getElementById(inputId);\n  const errorEl = document.getElementById(inputId + '-error');\n\n  input.classList.remove('valid');\n  input.classList.add('error');\n\n  if (errorEl) {\n    errorEl.textContent = message;\n    errorEl.style.display = 'block';\n  }\n}\n\n// Helper: show success on a field\nfunction showSuccess(inputId) {\n  const input = document.getElementById(inputId);\n  const errorEl = document.getElementById(inputId + '-error');\n\n  input.classList.remove('error');\n  input.classList.add('valid');\n\n  if (errorEl) {\n    errorEl.textContent = '';\n    errorEl.style.display = 'none';\n  }\n}\n\n// Validate a single field and update UI\nfunction validateField(inputId, validators) {\n  const input = document.getElementById(inputId);\n  const value = input.value;\n\n  for (const validate of validators) {\n    const result = validate(value);\n    if (!result.valid) {\n      showError(inputId, result.message);\n      return false;\n    }\n  }\n\n  showSuccess(inputId);\n  return true;\n}",
        },
      ],
    },

    // ── 5. REGULAR EXPRESSIONS FOR VALIDATION ────────────────────
    {
      id: "regex-validation",
      heading: "Regular Expressions for Common Validation Patterns",
      content:
        "Regular expressions (regex) are patterns used to test whether a string matches a specific format. They are essential for validating email addresses, phone numbers, passwords, postcodes, and URLs. In JavaScript, a regex literal is written between forward slashes: /pattern/flags. The test() method returns true if a string matches the pattern. The flags g (global), i (case insensitive), and m (multiline) modify how the pattern behaves. You do not need to understand every regex character to use them — learn the common patterns for your use cases.",
      codeExamples: [
        {
          label: "Common Validation Regex Patterns",
          code: "// Email — basic but practical\nconst emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconsole.log(emailRegex.test('priya@example.com'));  // true\nconsole.log(emailRegex.test('not-an-email'));        // false\n\n// Indian phone number — 10 digits, optional +91 prefix\nconst phoneRegex = /^(\\+91)?[6-9]\\d{9}$/;\nconsole.log(phoneRegex.test('9876543210'));    // true\nconsole.log(phoneRegex.test('+919876543210')); // true\nconsole.log(phoneRegex.test('1234567890'));    // false (doesn't start 6-9)\n\n// Strong password — min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special\nconst strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$/;\nconsole.log(strongPassRegex.test('Secure@1'));  // true\nconsole.log(strongPassRegex.test('weakpass'));  // false\n\n// Username — letters, numbers, underscores, 3-20 chars\nconst usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;\nconsole.log(usernameRegex.test('priya_dev')); // true\nconsole.log(usernameRegex.test('p!'));         // false\n\n// Indian PIN code — 6 digits\nconst pinRegex = /^[1-9][0-9]{5}$/;\nconsole.log(pinRegex.test('560001')); // true\nconsole.log(pinRegex.test('000001')); // false\n\n// URL — starts with http or https\nconst urlRegex = /^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b/;\nconsole.log(urlRegex.test('https://example.com')); // true\nconsole.log(urlRegex.test('not a url'));            // false",
        },
        {
          label: "Regex Cheatsheet — Key Characters",
          code: "// ^ — start of string     $ — end of string\n// . — any character        \\d — digit [0-9]\n// \\w — word char [a-zA-Z0-9_]  \\s — whitespace\n// * — zero or more         + — one or more\n// ? — zero or one          {n} — exactly n times\n// {n,m} — between n and m  [abc] — character set\n// [^abc] — NOT these chars  (a|b) — a OR b\n// (?=...) — lookahead (must be followed by)\n// i flag — case insensitive  g flag — find all matches\n\n// Testing in JavaScript\nconst regex = /^\\d{6}$/;       // exactly 6 digits\nconsole.log(regex.test('560001')); // true\nconsole.log(regex.test('56000'));  // false (only 5 digits)\nconsole.log(regex.test('abc123')); // false (has letters)\n\n// Replace — remove non-digits from phone input\nconst rawPhone = '+91 98765 43210';\nconst digitsOnly = rawPhone.replace(/\\D/g, ''); // '919876543210'\n\n// Extract — get all numbers from a string\nconst scores = 'Priya: 88, Arjun: 72, Fatima: 95';\nconst numbers = scores.match(/\\d+/g); // ['88', '72', '95']",
        },
      ],
    },

    // ── 6. REAL-TIME VALIDATION UI ────────────────────────────────
    {
      id: "realtime-validation-ui",
      heading: "Building a Real-Time Validation UI",
      content:
        "A great form validation experience validates each field at the right moment: show nothing until the user has interacted with a field, validate on blur when they leave, then switch to live validation on input once they have seen an error. This prevents the jarring experience of red error messages appearing on fields the user hasn't even touched yet. The pattern: listen for blur to start validation on a field, then add an input listener that revalidates in real time once blur has fired. A password strength meter is a common extension of this pattern.",
      codeExamples: [
        {
          label: "Blur-first, Then Live Revalidation",
          code: "const emailInput = document.getElementById('email');\nlet emailTouched = false;\n\n// Start validating when user leaves the field\nemailInput.addEventListener('blur', function() {\n  emailTouched = true;\n  validateEmailField();\n});\n\n// Live revalidate — but ONLY after the field has been touched\nemailInput.addEventListener('input', function() {\n  if (emailTouched) validateEmailField();\n});\n\nfunction validateEmailField() {\n  const value = emailInput.value;\n  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n\n  if (!value.trim()) {\n    showError('email', 'Email address is required');\n  } else if (!emailRegex.test(value)) {\n    showError('email', 'Please enter a valid email (e.g. name@example.com)');\n  } else {\n    showSuccess('email');\n  }\n}",
        },
        {
          label: "Password Strength Meter",
          code: "const passwordInput = document.getElementById('password');\nconst strengthBar    = document.getElementById('strength-bar');\nconst strengthLabel  = document.getElementById('strength-label');\n\nfunction getPasswordStrength(password) {\n  let score = 0;\n  const checks = [\n    { test: password.length >= 8,          label: '8+ characters' },\n    { test: /[A-Z]/.test(password),         label: 'uppercase letter' },\n    { test: /[a-z]/.test(password),         label: 'lowercase letter' },\n    { test: /[0-9]/.test(password),         label: 'number' },\n    { test: /[!@#$%^&*]/.test(password),    label: 'special character' },\n    { test: password.length >= 12,          label: '12+ characters' },\n  ];\n\n  const passed = checks.filter(c => c.test);\n  score = passed.length;\n\n  if (score <= 2) return { level: 'Weak',   color: '#ef4444', width: '25%' };\n  if (score <= 3) return { level: 'Fair',   color: '#f59e0b', width: '50%' };\n  if (score <= 4) return { level: 'Good',   color: '#3b82f6', width: '75%' };\n  return              { level: 'Strong', color: '#22c55e', width: '100%' };\n}\n\npasswordInput.addEventListener('input', function() {\n  const { level, color, width } = getPasswordStrength(this.value);\n  strengthBar.style.width = this.value ? width : '0%';\n  strengthBar.style.background = color;\n  strengthLabel.textContent = this.value ? level : '';\n  strengthLabel.style.color = color;\n});",
        },
        {
          label: "Full Submit Handler with All Checks",
          code: "const form = document.getElementById('signup-form');\n\nform.addEventListener('submit', function(e) {\n  e.preventDefault();\n\n  // Validate all fields — collect results\n  const checks = [\n    validateField('username', [\n      v => validateRequired(v, 'Username'),\n      v => validateMinLength(v, 3, 'Username'),\n    ]),\n    validateField('email', [\n      v => validateEmail(v),\n    ]),\n    validateField('password', [\n      v => validatePassword(v),\n    ]),\n    validateField('confirm', [\n      v => validateMatch(v, document.getElementById('password').value, 'Passwords'),\n    ]),\n  ];\n\n  const allValid = checks.every(result => result === true);\n\n  if (!allValid) {\n    // Focus the first invalid field\n    const firstError = form.querySelector('.error');\n    if (firstError) firstError.focus();\n    return;\n  }\n\n  // All valid — collect data and submit\n  const data = new FormData(form);\n  const payload = Object.fromEntries(data.entries());\n  console.log('Submitting:', payload);\n  // fetch('/api/register', { method: 'POST', body: JSON.stringify(payload) })\n});",
        },
      ],
    },

    // ── 7. CLIENT VS SERVER VALIDATION ───────────────────────────
    {
      id: "client-vs-server",
      heading: "Client-Side vs Server-Side Validation",
      content:
        "Client-side validation runs in the browser before data is sent — it is fast, immediate, and improves user experience. But it can be bypassed entirely by anyone who opens the browser's developer tools or sends a raw HTTP request. Server-side validation runs on the server after data is received and is the true security gate — it must always exist. Client-side validation is for user experience. Server-side validation is for security and data integrity. Always do both. Never trust data that came from a browser.",
      warning: "Client-side validation can be bypassed in seconds. Anyone can open DevTools, edit the JavaScript, and submit anything. Server-side validation is not optional — it is the only real safety net.",
      codeExamples: [
        {
          label: "What Belongs Where",
          code: "// CLIENT-SIDE (browser) — for good UX\n// ✓ Show immediate feedback as the user types\n// ✓ Prevent obviously invalid data from being sent\n// ✓ Show password strength meters\n// ✓ Enable/disable the submit button based on field state\n// ✓ Format phone numbers, postcodes as user types\n// ✗ NOT a security mechanism — can be bypassed!\n\n// SERVER-SIDE (backend) — for security & integrity\n// ✓ Re-validate EVERYTHING the client validated\n// ✓ Check uniqueness (username taken, email exists)\n// ✓ Check business rules (age >= 18, valid promo code)\n// ✓ Sanitise input before saving to database\n// ✓ Rate limiting to prevent abuse\n// ✓ Cannot be bypassed by the user\n\n// Example: username uniqueness check\n// Client: show live feedback while typing (debounced API call)\nasync function checkUsernameAvailability(username) {\n  const response = await fetch('/api/check-username?u=' + username);\n  const { available } = await response.json();\n  if (available) {\n    showSuccess('username');\n  } else {\n    showError('username', 'This username is already taken');\n  }\n}\n// Server: ALSO checks the database — even if client skipped it",
        },
      ],
    },

    // ── 8. ACCESSIBILITY IN FORMS ─────────────────────────────────
    {
      id: "form-accessibility",
      heading: "Accessible Forms",
      content:
        "Forms must be accessible to users who rely on screen readers, keyboard navigation, and other assistive technologies. Every input needs a label — either a visible label element associated with for/id, or an aria-label attribute. Error messages need to be programmatically associated with their fields using aria-describedby so screen readers announce them. Use aria-invalid='true' on invalid fields. Group related controls (radio buttons, checkboxes) with fieldset and legend. Never use placeholder as a substitute for a label — it disappears as soon as typing starts.",
      codeExamples: [
        {
          label: "Accessible Form Markup Pattern",
          code: "<div class=\"field-group\">\n  <!-- Visible label associated with input via for/id -->\n  <label for=\"email\">Email address</label>\n\n  <input\n    type=\"email\"\n    id=\"email\"\n    name=\"email\"\n    required\n    aria-required=\"true\"\n    aria-describedby=\"email-error email-hint\"\n    aria-invalid=\"false\"\n    autocomplete=\"email\"\n  >\n\n  <!-- Hint text for all users -->\n  <p id=\"email-hint\" class=\"hint\">We'll send a confirmation link here</p>\n\n  <!-- Error message — hidden until there's an error -->\n  <p id=\"email-error\" class=\"error-msg\" role=\"alert\" aria-live=\"polite\"></p>\n</div>\n\n<!-- When showing an error via JavaScript: -->\n<!-- input.setAttribute('aria-invalid', 'true'); -->\n<!-- errorEl.textContent = 'Please enter a valid email'; -->\n\n<!-- Grouping related controls -->\n<fieldset>\n  <legend>Notification preferences</legend>\n  <label><input type=\"checkbox\" name=\"notify\" value=\"email\"> Email</label>\n  <label><input type=\"checkbox\" name=\"notify\" value=\"sms\"> SMS</label>\n  <label><input type=\"checkbox\" name=\"notify\" value=\"push\"> Push notifications</label>\n</fieldset>",
        },
        {
          label: "Updating ARIA Attributes on Validation",
          code: "function showError(inputId, message) {\n  const input   = document.getElementById(inputId);\n  const errorEl = document.getElementById(inputId + '-error');\n\n  input.classList.add('error');\n  input.classList.remove('valid');\n  input.setAttribute('aria-invalid', 'true'); // tells screen reader it's invalid\n\n  if (errorEl) {\n    errorEl.textContent = message;    // role='alert' announces this automatically\n    errorEl.hidden = false;\n  }\n}\n\nfunction showSuccess(inputId) {\n  const input   = document.getElementById(inputId);\n  const errorEl = document.getElementById(inputId + '-error');\n\n  input.classList.add('valid');\n  input.classList.remove('error');\n  input.setAttribute('aria-invalid', 'false');\n\n  if (errorEl) {\n    errorEl.textContent = '';\n    errorEl.hidden = true;\n  }\n}",
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo-input-types",
      label: "Input Types",
      html: `<style>
  .it-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
  .it-field { background: #f8f9fa; border-radius: 10px; padding: 12px; }
  .it-label { font-size: 0.7rem; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; display: block; }
  .it-type  { font-size: 0.65rem; font-family: 'Courier New', monospace; background: #f7df1e; color: #1a1a1a; padding: 1px 6px; border-radius: 4px; font-weight: 700; }
  .it-input {
    width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px;
    font-size: 0.78rem; box-sizing: border-box; margin-top: 4px;
    transition: border-color 0.2s;
  }
  .it-input:focus { outline: none; border-color: #11998e; box-shadow: 0 0 0 2px rgba(17,153,142,0.15); }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Every HTML5 input type — notice how they behave differently:</p>
  <div class="it-grid">
    ${[
      ["text",     "Free text",        "text", "e.g. Priya Sharma"],
      ["email",    "Email address",    "email", "user@example.com"],
      ["password", "Password",         "password", "••••••••"],
      ["number",   "Number (min 0)",   "number", ""],
      ["tel",      "Phone number",     "tel", "9876543210"],
      ["url",      "Web address",      "url", "https://"],
      ["date",     "Date picker",      "date", ""],
      ["time",     "Time picker",      "time", ""],
      ["color",    "Colour picker",    "color", ""],
      ["range",    "Range slider",     "range", ""],
    ].map(([type, label, inputType, placeholder]) => `
    <div class="it-field">
      <span class="it-label">${label}</span>
      <span class="it-type">type="${type}"</span>
      <input class="it-input" type="${inputType}" placeholder="${placeholder}" ${type === 'range' ? 'min="0" max="100" value="50"' : ''} ${type === 'number' ? 'min="0"' : ''}>
    </div>`).join("")}
    <div class="it-field">
      <span class="it-label">Select dropdown</span>
      <span class="it-type">&lt;select&gt;</span>
      <select class="it-input" style="margin-top:4px">
        <option value="">Choose…</option>
        <option>HTML</option><option>CSS</option><option>JavaScript</option>
      </select>
    </div>
    <div class="it-field">
      <span class="it-label">Textarea</span>
      <span class="it-type">&lt;textarea&gt;</span>
      <textarea class="it-input" rows="2" placeholder="Multi-line text…" style="resize:vertical;margin-top:4px"></textarea>
    </div>
  </div>
</div>`,
    },

    {
      id: "demo-validation-live",
      label: "Live Validation",
      html: `<style>
  .vl-field { margin-bottom: 14px; }
  .vl-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
  .vl-label-text { font-weight: 700; font-size: 0.78rem; color: #374151; }
  .vl-status { font-size: 0.7rem; font-weight: 700; }
  .vl-input {
    width: 100%; padding: 9px 12px; border: 2px solid #e5e7eb; border-radius: 8px;
    font-size: 0.8rem; box-sizing: border-box; transition: border-color 0.2s, box-shadow 0.2s;
    font-family: sans-serif;
  }
  .vl-input:focus   { outline: none; border-color: #94a3b8; box-shadow: 0 0 0 3px rgba(148,163,184,0.2); }
  .vl-input.valid   { border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.15); }
  .vl-input.invalid { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.15); }
  .vl-error { font-size: 0.72rem; color: #ef4444; margin-top: 4px; min-height: 16px; }
  .vl-hint  { font-size: 0.7rem; color: #9ca3af; margin-top: 3px; }
  .str-bar-wrap { height: 5px; background: #e5e7eb; border-radius: 3px; margin-top: 6px; }
  .str-bar { height: 100%; border-radius: 3px; transition: width 0.3s, background 0.3s; width: 0%; }
  .submit-row { display: flex; gap: 10px; margin-top: 6px; }
  .vl-submit { flex: 1; padding: 10px; background: #11998e; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; }
  .vl-submit:hover { opacity: 0.9; }
  .vl-reset { padding: 10px 16px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; }
  .result-box { background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 10px 14px; font-family: 'Courier New', monospace; font-size: 0.72rem; color: #166534; margin-top: 10px; display: none; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:14px">Interact with each field — validation runs on blur then live:</p>

  <div class="vl-field">
    <div class="vl-label">
      <span class="vl-label-text">Username</span>
      <span class="vl-status" id="s-user"></span>
    </div>
    <input class="vl-input" id="i-user" type="text" placeholder="3–20 characters, letters/numbers/_">
    <div class="vl-error" id="e-user"></div>
    <div class="vl-hint">Letters, numbers, and underscores only</div>
  </div>

  <div class="vl-field">
    <div class="vl-label">
      <span class="vl-label-text">Email address</span>
      <span class="vl-status" id="s-email"></span>
    </div>
    <input class="vl-input" id="i-email" type="email" placeholder="you@example.com">
    <div class="vl-error" id="e-email"></div>
  </div>

  <div class="vl-field">
    <div class="vl-label">
      <span class="vl-label-text">Password</span>
      <span class="vl-status" id="s-pass" style="font-weight:800"></span>
    </div>
    <input class="vl-input" id="i-pass" type="password" placeholder="Min 8 chars, uppercase, number">
    <div class="str-bar-wrap"><div class="str-bar" id="str-bar"></div></div>
    <div class="vl-error" id="e-pass"></div>
  </div>

  <div class="vl-field">
    <div class="vl-label">
      <span class="vl-label-text">Confirm password</span>
      <span class="vl-status" id="s-conf"></span>
    </div>
    <input class="vl-input" id="i-conf" type="password" placeholder="Repeat your password">
    <div class="vl-error" id="e-conf"></div>
  </div>

  <div class="submit-row">
    <button class="vl-submit" id="vl-submit">Create Account</button>
    <button class="vl-reset" onclick="resetForm()">Reset</button>
  </div>
  <div class="result-box" id="result-box"></div>

  <script>
    const touched = {};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userRx  = /^[a-zA-Z0-9_]{3,20}$/;

    function setFieldState(id, state, msg) {
      const input = document.getElementById('i-' + id);
      const err   = document.getElementById('e-' + id);
      const stat  = document.getElementById('s-' + id);
      input.className = 'vl-input ' + (state === 'valid' ? 'valid' : state === 'invalid' ? 'invalid' : '');
      if (err) err.textContent = state === 'invalid' ? msg : '';
      if (stat) { stat.textContent = state === 'valid' ? '✓' : state === 'invalid' ? '✗' : ''; stat.style.color = state === 'valid' ? '#22c55e' : '#ef4444'; }
    }

    function validateUser() {
      const v = document.getElementById('i-user').value;
      if (!v) return setFieldState('user','invalid','Username is required');
      if (!userRx.test(v)) return setFieldState('user','invalid','3–20 chars, letters/numbers/_ only');
      setFieldState('user','valid');
    }
    function validateEmail() {
      const v = document.getElementById('i-email').value;
      if (!v) return setFieldState('email','invalid','Email is required');
      if (!emailRx.test(v)) return setFieldState('email','invalid','Please enter a valid email address');
      setFieldState('email','valid');
    }
    function validatePass() {
      const v = document.getElementById('i-pass').value;
      const bar = document.getElementById('str-bar');
      const stat = document.getElementById('s-pass');
      let score = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v)) score++;
      if (/[a-z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[!@#$%^&*]/.test(v)) score++;
      const levels = ['','Weak','Fair','Good','Strong','Very Strong'];
      const colors = ['','#ef4444','#f59e0b','#3b82f6','#22c55e','#22c55e'];
      const widths = ['0%','20%','40%','65%','85%','100%'];
      bar.style.width = v ? widths[score] : '0%';
      bar.style.background = colors[score];
      if (v) { stat.textContent = levels[score]; stat.style.color = colors[score]; } else { stat.textContent = ''; }
      if (!v) return setFieldState('pass','invalid','Password is required');
      if (v.length < 8) return setFieldState('pass','invalid','Must be at least 8 characters');
      if (!/[A-Z]/.test(v)) return setFieldState('pass','invalid','Must include an uppercase letter');
      if (!/[0-9]/.test(v)) return setFieldState('pass','invalid','Must include a number');
      setFieldState('pass','valid');
    }
    function validateConf() {
      const p = document.getElementById('i-pass').value;
      const c = document.getElementById('i-conf').value;
      if (!c) return setFieldState('conf','invalid','Please confirm your password');
      if (c !== p) return setFieldState('conf','invalid','Passwords do not match');
      setFieldState('conf','valid');
    }

    ['user','email','pass','conf'].forEach(id => {
      const fn = {user:validateUser,email:validateEmail,pass:validatePass,conf:validateConf}[id];
      document.getElementById('i-' + id).addEventListener('blur', () => { touched[id]=true; fn(); });
      document.getElementById('i-' + id).addEventListener('input', () => { if(touched[id]) fn(); });
    });
    document.getElementById('i-pass').addEventListener('input', () => { if(touched.conf) validateConf(); });

    document.getElementById('vl-submit').addEventListener('click', function() {
      ['user','email','pass','conf'].forEach(id => { touched[id]=true; });
      validateUser(); validateEmail(); validatePass(); validateConf();
      const allValid = ['i-user','i-email','i-pass','i-conf'].every(id => document.getElementById(id).classList.contains('valid'));
      const box = document.getElementById('result-box');
      if (allValid) {
        box.style.display = 'block';
        box.innerHTML = '✓ Form valid! Payload:<br>{ username: "' + document.getElementById('i-user').value + '",<br>  email: "' + document.getElementById('i-email').value + '",<br>  password: "••••••••" }';
      } else {
        box.style.display = 'none';
        document.querySelector('.vl-input.invalid').focus();
      }
    });

    function resetForm() {
      ['user','email','pass','conf'].forEach(id => {
        touched[id] = false;
        setFieldState(id,'','');
        document.getElementById('i-'+id).value = '';
      });
      document.getElementById('str-bar').style.width = '0%';
      document.getElementById('s-pass').textContent = '';
      document.getElementById('result-box').style.display = 'none';
    }
  </script>
</div>`,
    },

    {
      id: "demo-regex",
      label: "Regex Tester",
      html: `<style>
  .rx-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .rx-pattern { font-family: 'Courier New', monospace; font-size: 0.72rem; background: #1e1e1e; color: #ce9178; padding: 5px 10px; border-radius: 5px; flex: 1.2; }
  .rx-input { flex: 1.5; padding: 7px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.75rem; font-family: 'Courier New', monospace; }
  .rx-result { width: 70px; text-align: center; padding: 6px; border-radius: 6px; font-weight: 800; font-size: 0.72rem; }
  .rx-pass { background: #dcfce7; color: #166534; }
  .rx-fail { background: #fee2e2; color: #991b1b; }
  .rx-section { font-weight: 700; color: #374151; font-size: 0.78rem; margin: 12px 0 6px; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:12px">Edit the test values — results update live:</p>

  <p class="rx-section">Email</p>
  <div class="rx-row">
    <div class="rx-pattern">/^[^\s@]+@[^\s@]+\.[^\s@]+$/</div>
    <input class="rx-input" id="rx-email" value="priya@example.com" oninput="testRx('rx-email',/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'rx-r-email')">
    <div class="rx-result rx-pass" id="rx-r-email">✓ pass</div>
  </div>

  <p class="rx-section">Indian Phone Number</p>
  <div class="rx-row">
    <div class="rx-pattern">/^(\+91)?[6-9]\d{9}$/</div>
    <input class="rx-input" id="rx-phone" value="9876543210" oninput="testRx('rx-phone',/^(\+91)?[6-9]\d{9}$/,'rx-r-phone')">
    <div class="rx-result rx-pass" id="rx-r-phone">✓ pass</div>
  </div>

  <p class="rx-section">Username (letters, numbers, _)</p>
  <div class="rx-row">
    <div class="rx-pattern">/^[a-zA-Z0-9_]{3,20}$/</div>
    <input class="rx-input" id="rx-user" value="priya_dev" oninput="testRx('rx-user',/^[a-zA-Z0-9_]{3,20}$/,'rx-r-user')">
    <div class="rx-result rx-pass" id="rx-r-user">✓ pass</div>
  </div>

  <p class="rx-section">Strong Password</p>
  <div class="rx-row">
    <div class="rx-pattern">/(?=.*[A-Z])(?=.*\d)(?=.*[!@#]).{8,}/</div>
    <input class="rx-input" id="rx-pass" value="Secure@1" oninput="testRx('rx-pass',/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,'rx-r-pass')">
    <div class="rx-result rx-pass" id="rx-r-pass">✓ pass</div>
  </div>

  <p class="rx-section">PIN Code (6 digits, no leading 0)</p>
  <div class="rx-row">
    <div class="rx-pattern">/^[1-9][0-9]{5}$/</div>
    <input class="rx-input" id="rx-pin" value="560001" oninput="testRx('rx-pin',/^[1-9][0-9]{5}$/,'rx-r-pin')">
    <div class="rx-result rx-pass" id="rx-r-pin">✓ pass</div>
  </div>

  <script>
    function testRx(inputId, regex, resultId) {
      const val = document.getElementById(inputId).value;
      const el  = document.getElementById(resultId);
      const ok  = regex.test(val);
      el.textContent = ok ? '✓ pass' : '✗ fail';
      el.className = 'rx-result ' + (ok ? 'rx-pass' : 'rx-fail');
    }
  </script>
</div>`,
    },

    {
      id: "demo-formdata",
      label: "FormData API",
      html: `<style>
  .fd-form { background: #f8f9fa; border-radius: 10px; padding: 16px; }
  .fd-row { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
  .fd-field { flex: 1; min-width: 130px; }
  .fd-label { font-size: 0.72rem; font-weight: 700; color: #6b7280; display: block; margin-bottom: 4px; }
  .fd-input { width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.78rem; box-sizing: border-box; }
  .fd-btn { width: 100%; padding: 9px; background: #11998e; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 0.78rem; cursor: pointer; }
  .fd-output { background: #1e1e1e; color: #d4d4d4; border-radius: 8px; padding: 12px 14px; font-family: 'Courier New', monospace; font-size: 0.72rem; line-height: 1.8; margin-top: 10px; min-height: 80px; }
  .fd-key { color: #9cdcfe } .fd-val { color: #ce9178 } .fd-cm { color: #6a9955 }
</style>
<div style="font-family:sans-serif;font-size:0.82rem">
  <p style="color:#666;margin-bottom:10px">Fill the form and click collect — see FormData extract all fields at once:</p>

  <form class="fd-form" id="fd-form" novalidate>
    <div class="fd-row">
      <div class="fd-field">
        <label class="fd-label">Name</label>
        <input class="fd-input" type="text" name="name" value="Priya Sharma">
      </div>
      <div class="fd-field">
        <label class="fd-label">Email</label>
        <input class="fd-input" type="email" name="email" value="priya@example.com">
      </div>
    </div>
    <div class="fd-row">
      <div class="fd-field">
        <label class="fd-label">Score</label>
        <input class="fd-input" type="number" name="score" value="92" min="0" max="100">
      </div>
      <div class="fd-field">
        <label class="fd-label">Role</label>
        <select class="fd-input" name="role">
          <option value="student" selected>Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
    <div style="margin-bottom:10px">
      <label style="font-size:0.78rem;display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" name="newsletter" value="yes" checked>
        Subscribe to newsletter
      </label>
    </div>
    <button type="button" class="fd-btn" onclick="collectForm()">Collect with FormData →</button>
  </form>

  <div class="fd-output" id="fd-output"><span class="fd-cm">// Click the button to collect form data</span></div>

  <script>
    function collectForm() {
      const form = document.getElementById('fd-form');
      const data = new FormData(form);
      const obj  = Object.fromEntries(data.entries());
      const out  = document.getElementById('fd-output');
      let html = '<span class="fd-cm">// new FormData(form) → Object.fromEntries(data.entries())</span><br><br>';
      html += '<span style="color:#569cd6">const</span> payload = {<br>';
      for (const [k, v] of Object.entries(obj)) {
        html += '&nbsp;&nbsp;<span class="fd-key">' + k + '</span>: <span class="fd-val">"' + v + '"</span>,<br>';
      }
      html += '};<br><br>';
      html += '<span class="fd-cm">// Ready to send:</span><br>';
      html += '<span style="color:#dcdcaa">fetch</span>(<span class="fd-val">"/api/submit"</span>, { method: <span class="fd-val">"POST"</span>, body: JSON.stringify(payload) });';
      out.innerHTML = html;
    }
  </script>
</div>`,
    },

    {
      id: "demo-full-form",
      label: "Full Registration Form",
      html: `<style>
  .reg-form { max-width: 420px; }
  .reg-field { margin-bottom: 12px; }
  .reg-label { display: flex; justify-content: space-between; font-size: 0.76rem; font-weight: 700; color: #374151; margin-bottom: 4px; }
  .reg-input {
    width: 100%; padding: 9px 12px; border: 2px solid #e5e7eb; border-radius: 7px;
    font-size: 0.8rem; box-sizing: border-box; transition: all 0.2s; font-family: sans-serif;
  }
  .reg-input:focus  { outline: none; border-color: #11998e; box-shadow: 0 0 0 3px rgba(17,153,142,0.12); }
  .reg-input.ok     { border-color: #22c55e; }
  .reg-input.err    { border-color: #ef4444; }
  .reg-msg { font-size: 0.7rem; margin-top: 3px; min-height: 15px; }
  .reg-steps { display: flex; gap: 6px; margin-bottom: 14px; }
  .reg-step { flex: 1; height: 4px; border-radius: 2px; background: #e5e7eb; transition: background 0.3s; }
  .reg-step.done { background: #22c55e; }
  .reg-step.active { background: #11998e; }
  .reg-btn { width: 100%; padding: 10px; background: #11998e; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; margin-top: 4px; }
  .reg-btn:hover { opacity: 0.9; }
  .success-box { background: #f0fdf4; border: 1px solid #86efac; border-radius: 10px; padding: 18px; text-align: center; display: none; }
</style>
<div style="font-family:sans-serif;font-size:0.82rem" class="reg-form">
  <p style="color:#666;margin-bottom:10px">A complete registration form with real-time validation:</p>

  <div class="reg-steps">
    <div class="reg-step active" id="step-1"></div>
    <div class="reg-step" id="step-2"></div>
    <div class="reg-step" id="step-3"></div>
    <div class="reg-step" id="step-4"></div>
  </div>

  <form id="reg-form" novalidate>
    <div class="reg-field">
      <div class="reg-label"><span>Full name</span><span id="rn-s"></span></div>
      <input class="reg-input" id="rn" type="text" placeholder="Priya Sharma">
      <div class="reg-msg" id="rn-m"></div>
    </div>
    <div class="reg-field">
      <div class="reg-label"><span>Email address</span><span id="re-s"></span></div>
      <input class="reg-input" id="re" type="email" placeholder="priya@example.com">
      <div class="reg-msg" id="re-m"></div>
    </div>
    <div class="reg-field">
      <div class="reg-label"><span>Password</span><span id="rp-s" style="font-weight:800"></span></div>
      <input class="reg-input" id="rp" type="password" placeholder="Min 8 chars, uppercase, number">
      <div style="height:4px;background:#e5e7eb;border-radius:2px;margin-top:4px"><div id="rp-bar" style="height:100%;border-radius:2px;transition:all 0.3s;width:0%"></div></div>
      <div class="reg-msg" id="rp-m"></div>
    </div>
    <div class="reg-field">
      <div class="reg-label"><span>Confirm password</span><span id="rc-s"></span></div>
      <input class="reg-input" id="rc" type="password" placeholder="Repeat your password">
      <div class="reg-msg" id="rc-m"></div>
    </div>
    <div style="margin-bottom:12px">
      <label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;font-size:0.76rem;color:#374151">
        <input type="checkbox" id="r-terms" style="margin-top:2px">
        <span>I agree to the <span style="color:#11998e;text-decoration:underline">Terms of Service</span> and <span style="color:#11998e;text-decoration:underline">Privacy Policy</span></span>
      </label>
      <div class="reg-msg" id="rt-m" style="color:#ef4444"></div>
    </div>
    <button type="submit" class="reg-btn">Create Account →</button>
  </form>

  <div class="success-box" id="reg-success">
    <div style="font-size:2rem;margin-bottom:8px">🎉</div>
    <div style="font-weight:800;font-size:1rem;color:#166534;margin-bottom:4px">Account Created!</div>
    <div style="font-size:0.78rem;color:#166534" id="reg-success-msg"></div>
  </div>

  <script>
    const t2 = {};
    const exRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function rf(id, cls, msg, icon, color) {
      const i=document.getElementById(id), m=document.getElementById(id+'-m')||document.getElementById(id.replace('r','r')+'m'), s=document.getElementById(id+'-s')||document.getElementById(id+'s');
      const mid = { rn:'rn-m', re:'re-m', rp:'rp-m', rc:'rc-m' }[id];
      const sid = { rn:'rn-s', re:'re-s', rp:'rp-s', rc:'rc-s' }[id];
      if(i) { i.className='reg-input '+(cls||''); }
      const mel=document.getElementById(mid); if(mel){mel.textContent=msg||''; mel.style.color=cls==='ok'?'#22c55e':'#ef4444';}
      const sel=document.getElementById(sid); if(sel){sel.textContent=icon||''; sel.style.color=color||'#374151';}
      updateProgress();
    }
    function updateProgress() {
      const fields = ['rn','re','rp','rc'];
      const okCount = fields.filter(id => document.getElementById(id)&&document.getElementById(id).classList.contains('ok')).length;
      for(let i=0;i<4;i++) {
        const s=document.getElementById('step-'+(i+1));
        if(!s)return;
        s.className='reg-step'+(i<okCount?' done':i===okCount?' active':'');
      }
    }
    function vName(){const v=document.getElementById('rn').value.trim(); if(!v)return rf('rn','err','Name is required','✗','#ef4444'); if(v.length<2)return rf('rn','err','Name too short','✗','#ef4444'); rf('rn','ok','Looks good!','✓','#22c55e');}
    function vEmail(){const v=document.getElementById('re').value; if(!v)return rf('re','err','Email is required','✗','#ef4444'); if(!exRx.test(v))return rf('re','err','Invalid email format','✗','#ef4444'); rf('re','ok','Valid email','✓','#22c55e');}
    function vPass(){
      const v=document.getElementById('rp').value;
      const bar=document.getElementById('rp-bar'); const stat=document.getElementById('rp-s');
      let sc=0; if(v.length>=8)sc++; if(/[A-Z]/.test(v))sc++; if(/[a-z]/.test(v))sc++; if(/[0-9]/.test(v))sc++; if(/[!@#$%^&*]/.test(v))sc++;
      const lv=['','Weak','Fair','Good','Strong','Strong'], cl=['','#ef4444','#f59e0b','#3b82f6','#22c55e','#22c55e'], ww=['0%','20%','40%','65%','100%','100%'];
      if(bar){bar.style.width=v?ww[sc]:'0%'; bar.style.background=cl[sc];}
      if(stat){stat.textContent=v?lv[sc]:''; stat.style.color=cl[sc];}
      if(!v)return rf('rp','err','Password is required','','');
      if(v.length<8)return rf('rp','err','At least 8 characters','','');
      if(!/[A-Z]/.test(v))return rf('rp','err','Add an uppercase letter','','');
      if(!/[0-9]/.test(v))return rf('rp','err','Add a number','','');
      rf('rp','ok','','','');
    }
    function vConf(){const p=document.getElementById('rp').value,c=document.getElementById('rc').value; if(!c)return rf('rc','err','Please confirm password','✗','#ef4444'); if(c!==p)return rf('rc','err','Passwords do not match','✗','#ef4444'); rf('rc','ok','Passwords match','✓','#22c55e');}
    [{id:'rn',fn:vName},{id:'re',fn:vEmail},{id:'rp',fn:vPass},{id:'rc',fn:vConf}].forEach(({id,fn})=>{
      document.getElementById(id).addEventListener('blur',()=>{t2[id]=true;fn();});
      document.getElementById(id).addEventListener('input',()=>{if(t2[id])fn();});
    });
    document.getElementById('rp').addEventListener('input',()=>{if(t2.rc)vConf();});
    document.getElementById('reg-form').addEventListener('submit',function(e){
      e.preventDefault();
      t2.rn=t2.re=t2.rp=t2.rc=true;
      vName();vEmail();vPass();vConf();
      const termsOk=document.getElementById('r-terms').checked;
      document.getElementById('rt-m').textContent=termsOk?'':'You must accept the terms';
      const allOk=['rn','re','rp','rc'].every(id=>document.getElementById(id).classList.contains('ok'))&&termsOk;
      if(allOk){
        document.getElementById('reg-form').style.display='none';
        const s=document.getElementById('reg-success'); s.style.display='block';
        document.getElementById('reg-success-msg').textContent='Welcome, '+document.getElementById('rn').value.split(' ')[0]+'! Account ready.';
      }
    });
  </script>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: HTML5 Validation Attributes",
      description: "Build a form that uses only HTML attributes for validation — no JavaScript:",
      tasks: [
        "Create a registration form with: name (required, minlength 2), email (required, type email), age (type number, min 13, max 120), website (type url, optional), and a PIN field (pattern [0-9]{4}, title explaining the format)",
        "Add a submit button and test each built-in browser validation by submitting with invalid data",
        "Add the novalidate attribute to the form and observe that browser validation is now disabled",
        "Remove novalidate and use the Constraint Validation API: on blur of each field, read input.validity.valid and log which validity flag is false",
        "Use input.validationMessage to read the browser's built-in error text and display it in a custom span below each field",
        "Use input.setCustomValidity() to replace the browser message for the name field with your own friendly message",
      ],
      hint: "Open DevTools and inspect the validity object: console.log(input.validity) — you will see all flags at once. Remember to call setCustomValidity('') to clear a custom message once the field becomes valid.",
    },
    {
      title: "Exercise 2: Custom Validation Functions",
      description: "Build a library of validator functions following the { valid, message } pattern:",
      tasks: [
        "Write validateRequired(value, label) — returns error if empty after trim",
        "Write validateEmail(value) — uses regex, returns specific messages for empty vs invalid format",
        "Write validatePassword(value) — checks length >= 8, has uppercase, has digit, has special char — return the first failing check",
        "Write validateMatch(value, otherValue, label) — checks two values are equal",
        "Write validatePhone(value) — validates an Indian 10-digit number with optional +91 prefix",
        "Wire all validators to a signup form — validate each field on blur, show errors under each field, and run all validators on submit before allowing it to proceed",
      ],
      hint: "Make each validator return an object: { valid: true, message: '' } or { valid: false, message: 'Error text' }. Then your field validation loop just needs: for (const v of validators) { const r = v(value); if (!r.valid) { showError(r.message); return false; } }",
    },
    {
      title: "Exercise 3: Real-Time Validation UI",
      description: "Implement the blur-first, then live revalidation pattern for a complete form:",
      tasks: [
        "Build a form with username, email, password, and confirm password fields",
        "Show no validation state until a field has been blurred — use a touched object to track this",
        "After blur, switch to live revalidation on input events",
        "Add a password strength bar that updates in real time with five strength levels: empty, weak, fair, good, strong",
        "The confirm password field should re-validate live whenever the password field changes",
        "The submit button should only trigger a success message when every field passes — otherwise focus the first invalid field",
      ],
      hint: "Use a single object: const touched = { username: false, email: false, password: false, confirm: false }. Set touched[fieldName] = true in the blur handler. In the input handler: if (touched[fieldName]) validateField(fieldName).",
    },
    {
      title: "Challenge: Multi-Step Registration Form",
      description: "Build a three-step form wizard with validation at each step:",
      tasks: [
        "Step 1 — Personal info: full name, date of birth, gender (radio), phone number",
        "Step 2 — Account info: username (check availability with a simulated async check after 800ms debounce), email, password with strength meter",
        "Step 3 — Preferences: profile bio (textarea, max 200 chars with counter), skills (multi-select), and terms checkbox",
        "Each Next button validates only the current step's fields — do not proceed if any are invalid",
        "Show a progress indicator (e.g. Step 2 of 3) and allow going back to edit previous steps",
        "On final submission, collect all data with FormData across all steps and display a summary card",
      ],
      hint: "Store each step's data in a JavaScript object as the user completes it: const formData = { step1: {}, step2: {}, step3: {} }. When they go back, repopulate the fields from this object. The final FormData should be built from this stored object, not from the DOM.",
    },
  ],
};

export default session18;