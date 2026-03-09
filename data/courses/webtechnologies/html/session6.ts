// data/courses/web-technologies/html/session6.ts
import type { SessionData } from "@/types/session";

const session6: SessionData = {
  meta: {
    sessionNumber: 6,
    module: "html",
    moduleNumber: 1,
    title: "Forms, Inputs & Frames",
    subtitle: "form structure, input types, attributes, validation and accessible form markup",
    duration: "2.5 hrs",
    color: "#11998e",
    colorDim: "rgba(17,153,142,0.09)",
    colorMid: "rgba(17,153,142,0.18)",
    objectives: [
      "Understand what HTML forms are and why they are used",
      "Build forms using the <form> element with action and method attributes",
      "Use essential input types: text, email, password, number, date, and more",
      "Apply important input attributes: name, id, placeholder, required, disabled",
      "Build selection controls: checkbox, radio, select, and textarea",
      "Follow best practices for accessible and validated forms",
    ],
    prevSession: { num: 5, title: "Tables — Structure & Spanning", href: "/courses/webtechnologies/html/session5" },
    nextSession: { num: 7, title: "Introduction to CSS", href: "/courses/webtechnologies/html/session7" },
  },

  topics: [
    {
      id: "form-structure",
      heading: "Form Structure",
      content:
        "Forms are interactive elements that allow users to input and submit data. They are essential for user registration, login, contact forms, surveys, and any interactive functionality. An HTML form is defined with <form>. The action attribute specifies the URL where form data is sent. The method attribute is either GET (data visible in URL) or POST (data hidden in request body). Every input inside a form must have a name attribute for its data to be submitted.",
      table: {
        headers: ["Attribute", "Description"],
        rows: [
          { cells: ["action", "URL where form data is sent"] },
          { cells: ["method", "GET (visible in URL) or POST (hidden)"] },
          { cells: ["name",   "Name identifier for the form"] },
        ],
      },
      codeExamples: [
        {
          label: "Basic Form Structure",
          code: `<form action="/submit" method="POST">

  <label for="username">Username:</label>
  <input type="text" id="username" name="username">

  <button type="submit">Submit</button>

</form>`,
        },
      ],
    },

    {
      id: "input-types",
      heading: "Essential Input Types",
      content:
        "HTML5 provides a rich set of input types that enable built-in validation and appropriate mobile keyboards. Text inputs include text, password, email, tel, and url. Numeric and date inputs include number, range, date, and time. Selection controls include checkbox (multiple choices), radio (single choice), color (color picker), and file (file upload). Buttons include submit (submit form), reset (clear form), and button (generic clickable).",
      table: {
        headers: ["Type", "Category", "Purpose"],
        rows: [
          { cells: ["text",     "Text",      "Single-line text input"] },
          { cells: ["password", "Text",      "Hidden password input"] },
          { cells: ["email",    "Text",      "Email with built-in format validation"] },
          { cells: ["tel",      "Text",      "Phone number input"] },
          { cells: ["url",      "Text",      "Website URL input"] },
          { cells: ["number",   "Number",    "Numeric input with optional min/max"] },
          { cells: ["range",    "Number",    "Slider for numeric range"] },
          { cells: ["date",     "Date/Time", "Date picker"] },
          { cells: ["time",     "Date/Time", "Time picker"] },
          { cells: ["checkbox", "Selection", "Multiple independent choices"] },
          { cells: ["radio",    "Selection", "Single choice from a group"] },
          { cells: ["color",    "Selection", "Visual color picker"] },
          { cells: ["file",     "Selection", "File upload dialog"] },
          { cells: ["submit",   "Button",    "Submits the form"] },
          { cells: ["reset",    "Button",    "Resets all fields"] },
          { cells: ["button",   "Button",    "Generic clickable button"] },
        ],
      },
      codeExamples: [
        {
          label: "Common Input Types",
          code: `<!-- Text inputs -->
<input type="text"     name="username"  placeholder="Your name">
<input type="email"    name="email"     placeholder="you@example.com">
<input type="password" name="password"  placeholder="Min 8 characters" minlength="8">
<input type="tel"      name="phone"     placeholder="123-456-7890">
<input type="url"      name="website"   placeholder="https://example.com">

<!-- Number & date -->
<input type="number"   name="age"       min="13" max="120">
<input type="range"    name="rating"    min="1"  max="10" value="5">
<input type="date"     name="dob">
<input type="time"     name="meeting">

<!-- Selection -->
<input type="color"    name="favcolor"  value="#11998e">
<input type="file"     name="avatar">

<!-- Radio group (only one selectable) -->
<input type="radio" id="male"   name="gender" value="male">
<label for="male">Male</label>
<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label>

<!-- Checkboxes (multiple selectable) -->
<input type="checkbox" id="terms" name="terms" required>
<label for="terms">I agree to terms</label>`,
        },
        {
          label: "Select Dropdown & Textarea",
          code: `<!-- Dropdown select -->
<label for="subject">Subject</label>
<select id="subject" name="subject" required>
  <option value="">Select a subject</option>
  <option value="general">General Inquiry</option>
  <option value="support">Technical Support</option>
  <option value="billing">Billing Question</option>
  <option value="feedback">Feedback</option>
</select>

<!-- Multi-line textarea -->
<label for="message">Message</label>
<textarea id="message" name="message" rows="5"
  placeholder="Your message here..."
  style="resize: vertical;">
</textarea>`,
        },
      ],
    },

    {
      id: "input-attributes",
      heading: "Important Input Attributes",
      content:
        "Attributes control the behaviour and validation of form fields. The name attribute is required for data submission — without it, the field value is not sent to the server. The id attribute uniquely identifies a field and must match the for attribute of its <label>. The placeholder attribute shows hint text inside the field. Boolean attributes like required, readonly, and disabled modify field behaviour without needing a value.",
      tip: "Always pair every input with a <label> using matching for and id values. Never use placeholder as a substitute for a label — placeholder text disappears when the user starts typing and is not reliably read by screen readers.",
      table: {
        headers: ["Attribute", "Description"],
        rows: [
          { cells: ["name",        "REQUIRED for data submission — identifies the field value"] },
          { cells: ["id",          "Unique identifier; links to <label for='...'>"] },
          { cells: ["placeholder", "Hint text shown inside the empty field"] },
          { cells: ["required",    "Field must be filled before form submits"] },
          { cells: ["readonly",    "Field is visible but cannot be edited"] },
          { cells: ["disabled",    "Field is inactive and not submitted"] },
          { cells: ["maxlength",   "Maximum number of characters allowed"] },
          { cells: ["min / max",   "Minimum and maximum values (number, date, range)"] },
          { cells: ["minlength",   "Minimum number of characters required"] },
          { cells: ["pattern",     "Regex pattern the value must match"] },
          { cells: ["value",       "Default or pre-filled value"] },
        ],
      },
      codeExamples: [
        {
          label: "Attributes in Practice",
          code: `<form action="/register" method="POST">

  <!-- required + placeholder + label -->
  <label for="fullname">Full Name *</label>
  <input type="text" id="fullname" name="fullname"
         placeholder="John Doe" required>

  <!-- email validation built in -->
  <label for="email">Email *</label>
  <input type="email" id="email" name="email"
         placeholder="john@example.com" required>

  <!-- minlength validation -->
  <label for="pwd">Password *</label>
  <input type="password" id="pwd" name="password"
         placeholder="Min 8 characters" minlength="8" required>

  <!-- min/max on number -->
  <label for="age">Age</label>
  <input type="number" id="age" name="age" min="13" max="120">

  <!-- readonly pre-filled field -->
  <label for="role">Role</label>
  <input type="text" id="role" name="role" value="Student" readonly>

  <button type="submit">Register</button>
  <button type="reset">Reset</button>

</form>`,
        },
      ],
    },

    {
      id: "complete-forms",
      heading: "Complete Form Examples",
      content:
        "Real-world forms combine multiple input types, proper labels, and validation attributes. A registration form typically collects name, email, password, date of birth, gender (radio), and terms agreement (checkbox). A contact form uses text, email, a subject dropdown (<select>), and a message textarea. Always group related fields semantically and keep forms as short as possible to reduce user friction.",
      codeExamples: [
        {
          label: "Registration Form",
          code: `<form action="/register" method="POST">

  <label for="reg-name">Full Name *</label>
  <input type="text" id="reg-name" name="fullname"
         placeholder="John Doe" required>

  <label for="reg-email">Email *</label>
  <input type="email" id="reg-email" name="email"
         placeholder="john@example.com" required>

  <label for="reg-password">Password *</label>
  <input type="password" id="reg-password" name="password"
         placeholder="Min 8 characters" minlength="8" required>

  <label for="reg-dob">Date of Birth</label>
  <input type="date" id="reg-dob" name="dob">

  <label>Gender</label>
  <input type="radio" id="male"   name="gender" value="male">
  <label for="male">Male</label>
  <input type="radio" id="female" name="gender" value="female">
  <label for="female">Female</label>

  <input type="checkbox" id="terms" name="terms" required>
  <label for="terms">I agree to terms *</label>

  <button type="submit">Register</button>
  <button type="reset">Reset</button>

</form>`,
        },
        {
          label: "Contact Form",
          code: `<form action="/contact" method="POST">

  <label for="contact-name">Name *</label>
  <input type="text" id="contact-name" name="name"
         placeholder="Your name" required>

  <label for="contact-email">Email *</label>
  <input type="email" id="contact-email" name="email"
         placeholder="your@email.com" required>

  <label for="contact-subject">Subject *</label>
  <select id="contact-subject" name="subject" required>
    <option value="">Select a subject</option>
    <option value="general">General Inquiry</option>
    <option value="support">Technical Support</option>
    <option value="billing">Billing Question</option>
    <option value="feedback">Feedback</option>
  </select>

  <label for="contact-message">Message *</label>
  <textarea id="contact-message" name="message" rows="5"
    placeholder="Your message here..."
    required style="resize: vertical;"></textarea>

  <button type="submit">Send Message</button>

</form>`,
        },
        {
          label: "Survey Form (range, color, date)",
          code: `<form action="/survey" method="POST">

  <label for="s-name">Name</label>
  <input type="text" id="s-name" name="name" placeholder="Your name">

  <label for="s-age">Age</label>
  <input type="number" id="s-age" name="age" min="13" max="120" placeholder="18">

  <label for="s-score">Satisfaction (1–10): <span id="rangeLabel">5</span></label>
  <input type="range" id="s-score" name="satisfaction" min="1" max="10" value="5"
    oninput="document.getElementById('rangeLabel').textContent = this.value">

  <label for="s-color">Favourite Color</label>
  <input type="color" id="s-color" name="color" value="#11998e">

  <label for="s-date">Survey Date</label>
  <input type="date" id="s-date" name="date">

  <label for="s-comments">Additional Comments</label>
  <textarea id="s-comments" name="comments" rows="4"
    placeholder="Any feedback..."></textarea>

  <button type="submit">Submit Survey</button>

</form>`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo1",
      label: "Registration Form",
      html: `<div style="font-family:sans-serif;font-size:0.85rem;max-width:400px">
  <h3 style="color:#11998e;margin-bottom:16px">Registration Form</h3>
  <label style="display:block;margin-bottom:4px;font-weight:bold">Full Name *</label>
  <input type="text" placeholder="John Doe" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Email *</label>
  <input type="email" placeholder="john@example.com" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Password *</label>
  <input type="password" placeholder="Min 8 characters" minlength="8" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Date of Birth</label>
  <input type="date" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <div style="margin-bottom:12px">
    <input type="radio" id="d1male" name="gender" value="male">
    <label for="d1male" style="margin-right:12px">Male</label>
    <input type="radio" id="d1female" name="gender" value="female">
    <label for="d1female">Female</label>
  </div>
  <div style="margin-bottom:16px">
    <input type="checkbox" id="d1terms" required>
    <label for="d1terms"> I agree to terms *</label>
  </div>
  <button style="background:linear-gradient(135deg,#11998e,#38ef7d);color:white;border:none;padding:12px 28px;border-radius:20px;font-size:1em;cursor:pointer;margin-right:8px">Register</button>
  <button type="reset" style="background:linear-gradient(135deg,#999,#666);color:white;border:none;padding:12px 28px;border-radius:20px;font-size:1em;cursor:pointer">Reset</button>
</div>`,
    },
    {
      id: "demo2",
      label: "Contact Form",
      html: `<div style="font-family:sans-serif;font-size:0.85rem;max-width:400px">
  <h3 style="color:#11998e;margin-bottom:16px">Contact Form</h3>
  <label style="display:block;margin-bottom:4px;font-weight:bold">Name *</label>
  <input type="text" placeholder="Your name" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Email *</label>
  <input type="email" placeholder="your@email.com" required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Subject *</label>
  <select required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
    <option value="">Select a subject</option>
    <option>General Inquiry</option>
    <option>Technical Support</option>
    <option>Billing Question</option>
    <option>Feedback</option>
  </select>
  <label style="display:block;margin-bottom:4px;font-weight:bold">Message *</label>
  <textarea rows="4" placeholder="Your message here..." required style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:16px;font-size:0.9rem;resize:vertical"></textarea>
  <button style="background:linear-gradient(135deg,#11998e,#38ef7d);color:white;border:none;padding:12px 28px;border-radius:20px;font-size:1em;cursor:pointer">Send Message</button>
</div>`,
    },
    {
      id: "demo3",
      label: "Survey Form",
      html: `<div style="font-family:sans-serif;font-size:0.85rem;max-width:400px">
  <h3 style="color:#11998e;margin-bottom:16px">Survey Form</h3>
  <label style="display:block;margin-bottom:4px;font-weight:bold">Name</label>
  <input type="text" placeholder="Your name" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Age</label>
  <input type="number" min="13" max="120" placeholder="18" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Satisfaction (1–10): <span id="rv">5</span></label>
  <input type="range" min="1" max="10" value="5" oninput="document.getElementById('rv').textContent=this.value" style="width:100%;margin-bottom:12px">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Favourite Color</label>
  <input type="color" value="#11998e" style="width:60px;height:40px;border:none;cursor:pointer;margin-bottom:12px">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Survey Date</label>
  <input type="date" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:12px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Additional Comments</label>
  <textarea rows="3" placeholder="Any feedback..." style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:16px;font-size:0.9rem"></textarea>
  <button style="background:linear-gradient(135deg,#11998e,#38ef7d);color:white;border:none;padding:12px 28px;border-radius:20px;font-size:1em;cursor:pointer">Submit Survey</button>
</div>`,
    },
    {
      id: "demo4",
      label: "All Input Types",
      html: `<div style="font-family:sans-serif;font-size:0.85rem;max-width:400px">
  <h3 style="color:#11998e;margin-bottom:16px">All Input Types</h3>
  <label style="display:block;margin-bottom:4px;font-weight:bold">Text</label>
  <input type="text" placeholder="Regular text" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:10px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Email</label>
  <input type="email" placeholder="email@example.com" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:10px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Password</label>
  <input type="password" placeholder="••••••••" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:10px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Number (0–100)</label>
  <input type="number" min="0" max="100" value="50" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:10px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Date</label>
  <input type="date" style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:10px;font-size:0.9rem">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Range</label>
  <input type="range" min="0" max="100" value="50" style="width:100%;margin-bottom:10px">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Color Picker</label>
  <input type="color" value="#11998e" style="width:60px;height:36px;border:none;cursor:pointer;margin-bottom:10px">
  <label style="display:block;margin-bottom:4px;font-weight:bold">Radio</label>
  <div style="margin-bottom:10px">
    <input type="radio" id="ai1" name="r" value="1"><label for="ai1" style="margin:0 12px 0 4px">Option 1</label>
    <input type="radio" id="ai2" name="r" value="2"><label for="ai2" style="margin-left:4px">Option 2</label>
  </div>
  <label style="display:block;margin-bottom:4px;font-weight:bold">Checkbox</label>
  <div style="margin-bottom:10px">
    <input type="checkbox" id="ac1"><label for="ac1" style="margin:0 12px 0 4px">Choice 1</label>
    <input type="checkbox" id="ac2"><label for="ac2" style="margin-left:4px">Choice 2</label>
  </div>
  <label style="display:block;margin-bottom:4px;font-weight:bold">Dropdown</label>
  <select style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:10px;font-size:0.9rem">
    <option value="">Choose option</option>
    <option>Option 1</option><option>Option 2</option><option>Option 3</option>
  </select>
  <label style="display:block;margin-bottom:4px;font-weight:bold">Textarea</label>
  <textarea rows="3" placeholder="Multi-line text..." style="width:100%;padding:10px;border:2px solid #ddd;border-radius:6px;margin-bottom:16px;font-size:0.9rem"></textarea>
  <button style="background:linear-gradient(135deg,#11998e,#38ef7d);color:white;border:none;padding:12px 28px;border-radius:20px;font-size:1em;cursor:pointer">Submit All</button>
</div>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Login Form",
      description: "Create a simple login form:",
      tasks: [
        "Add an email input and a password input with proper labels",
        "Include a 'Remember Me' checkbox",
        "Add a submit button labelled 'Login'",
        "Use required on both email and password fields",
        "Link every label to its input using for and id",
      ],
    },
    {
      title: "Exercise 2: Registration Form",
      description: "Build a complete user registration form:",
      tasks: [
        "Collect full name, email, and password (minlength 8, required)",
        "Add a date of birth field using type='date'",
        "Include gender selection using radio buttons",
        "Add a terms and conditions checkbox (required)",
        "Include both a submit and a reset button",
      ],
    },
    {
      title: "Exercise 3: Contact Form",
      description: "Create a contact/enquiry form:",
      tasks: [
        "Add name and email text fields with required validation",
        "Include a subject <select> dropdown with at least 4 options",
        "Add a multi-line message <textarea> with rows='5'",
        "Style the form with a consistent color scheme",
        "Ensure every input has a matching label",
      ],
    },
  ],
};

export default session6;