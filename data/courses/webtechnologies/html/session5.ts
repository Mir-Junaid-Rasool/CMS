// data/courses/web-technologies/html/session5.ts
import type { SessionData } from "@/types/session";

const session5: SessionData = {
  meta: {
    sessionNumber: 5,
    module: "html",
    moduleNumber: 1,
    title: "Tables — Structure & Spanning",
    subtitle: "thead, tbody, tfoot, colspan, rowspan and accessible table markup",
    duration: "2 hrs",
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.09)",
    colorMid: "rgba(249,115,22,0.18)",
    objectives: [
      "Build structured HTML tables with thead, tbody, tfoot",
      "Merge cells horizontally using colspan",
      "Merge cells vertically using rowspan",
      "Apply borders, padding and alignment to tables",
      "Create nested tables for complex layouts",
      "Understand when to use tables vs CSS Grid/Flexbox",
    ],
    prevSession: { num: 4, title: "Hyperlinks, Anchors & URLs", href: "/courses/webtechnologies/html/session4" },
    nextSession: { num: 6, title: "Forms, Inputs & Frames", href: "/courses/webtechnologies/html/session6" },
  },

  topics: [
    {
      id: "table-basics",
      heading: "Table Structure",
      content:
        "An HTML table is defined with <table>. Rows are <tr>. Header cells are <th> (bold, centered by default). Data cells are <td>. Always use <thead>, <tbody>, and optionally <tfoot> to semantically separate sections — this also enables independent scrolling and print headers.",
      table: {
        headers: ["Tag", "Purpose", "Renders"],
        rows: [
          { cells: ["<table>",  "Outer container",           "Creates the table"] },
          { cells: ["<thead>",  "Header section",            "Groups header rows"] },
          { cells: ["<tbody>",  "Body section",              "Groups data rows"] },
          { cells: ["<tfoot>",  "Footer section",            "Groups summary rows"] },
          { cells: ["<tr>",     "Table Row",                 "One horizontal row"] },
          { cells: ["<th>",     "Table Header cell",         "Bold, centered"] },
          { cells: ["<td>",     "Table Data cell",           "Normal text, left-aligned"] },
          { cells: ["<caption>","Table caption/title",       "Above/below the table"] },
        ],
      },
      codeExamples: [
        {
          label: "Basic Structured Table",
          code: `<table border="1" cellpadding="8" cellspacing="0"
       style="border-collapse: collapse; width: 100%;">

  <caption>Student Marks — Semester 4</caption>

  <thead style="background: #f97316; color: white;">
    <tr>
      <th>Student Name</th>
      <th>HTML</th>
      <th>CSS</th>
      <th>JavaScript</th>
      <th>Total</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Alice Kumar</td>
      <td>92</td>
      <td>88</td>
      <td>85</td>
      <td>265</td>
    </tr>
    <tr style="background: #fff7ed;">
      <td>Bob Singh</td>
      <td>78</td>
      <td>82</td>
      <td>90</td>
      <td>250</td>
    </tr>
    <tr>
      <td>Carol Nair</td>
      <td>95</td>
      <td>91</td>
      <td>88</td>
      <td>274</td>
    </tr>
  </tbody>

  <tfoot style="background: #fef3c7; font-weight: bold;">
    <tr>
      <td>Class Average</td>
      <td>88</td>
      <td>87</td>
      <td>88</td>
      <td>263</td>
    </tr>
  </tfoot>

</table>`,
        },
      ],
    },

    {
      id: "colspan-rowspan",
      heading: "colspan and rowspan",
      content:
        "colspan merges cells horizontally — one cell spans multiple columns. rowspan merges cells vertically — one cell spans multiple rows. Both take a number indicating how many cells to span. Remove the extra cells that the spanning cell covers.",
      tip: "When using rowspan, remember to remove <td> elements from the rows below for as many rows as the span value minus 1. The most common mistake is forgetting to remove these extra cells.",
      codeExamples: [
        {
          label: "colspan — Horizontal Spanning",
          code: `<table border="1" cellpadding="8" style="border-collapse: collapse;">
  <thead>
    <tr>
      <!-- This header spans 3 columns -->
      <th colspan="3" style="background:#f97316;color:white;text-align:center">
        Exam Results
      </th>
    </tr>
    <tr>
      <th>Subject</th>
      <th>Midterm</th>
      <th>Final</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>45</td>
      <td>48</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>42</td>
      <td>46</td>
    </tr>
    <tr style="background:#fff7ed;font-weight:bold">
      <!-- Footer spans 2 columns for label -->
      <td colspan="2">Total Score</td>
      <td>181</td>
    </tr>
  </tbody>
</table>`,
        },
        {
          label: "rowspan — Vertical Spanning",
          code: `<table border="1" cellpadding="8" style="border-collapse: collapse;">
  <thead>
    <tr style="background:#f97316;color:white">
      <th>Day</th>
      <th>Time</th>
      <th>Subject</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <!-- Monday spans 2 rows -->
      <td rowspan="2" style="background:#fff7ed;font-weight:bold;text-align:center">Monday</td>
      <td>9:00 AM</td>
      <td>HTML Lab</td>
    </tr>
    <tr>
      <!-- No <td> for Day — covered by rowspan above -->
      <td>11:00 AM</td>
      <td>CSS Theory</td>
    </tr>
    <tr>
      <td rowspan="3" style="background:#fff7ed;font-weight:bold;text-align:center">Tuesday</td>
      <td>9:00 AM</td>
      <td>JavaScript</td>
    </tr>
    <tr>
      <td>11:00 AM</td>
      <td>PHP Lab</td>
    </tr>
    <tr>
      <td>2:00 PM</td>
      <td>Project Work</td>
    </tr>
  </tbody>
</table>`,
        },
        {
          label: "Combined colspan + rowspan",
          code: `<table border="1" cellpadding="10" style="border-collapse:collapse;width:100%">
  <tr style="background:#1c1917;color:white">
    <th rowspan="2">Name</th>
    <th colspan="2">Semester 1</th>
    <th colspan="2">Semester 2</th>
  </tr>
  <tr style="background:#292524;color:white">
    <th>Theory</th><th>Lab</th>
    <th>Theory</th><th>Lab</th>
  </tr>
  <tr>
    <td>Alice</td><td>85</td><td>90</td><td>88</td><td>92</td>
  </tr>
  <tr style="background:#fff7ed">
    <td>Bob</td><td>78</td><td>82</td><td>80</td><td>85</td>
  </tr>
</table>`,
        },
      ],
    },
  ],

  demos: [
    {
      id: "demo1",
      label: "Basic Table",
      html: `<table border="1" cellpadding="8" style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:0.85rem">
  <thead><tr style="background:#f97316;color:white"><th>Name</th><th>Roll No</th><th>Grade</th></tr></thead>
  <tbody>
    <tr><td>Alice</td><td>101</td><td>A</td></tr>
    <tr style="background:#fff7ed"><td>Bob</td><td>102</td><td>B+</td></tr>
    <tr><td>Carol</td><td>103</td><td>A+</td></tr>
  </tbody>
  <tfoot><tr style="background:#fef9c3;font-weight:700"><td colspan="2">Class Average</td><td>A</td></tr></tfoot>
</table>`,
    },
    {
      id: "demo2",
      label: "colspan Demo",
      html: `<table border="1" cellpadding="8" style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:0.85rem">
  <tr><th colspan="4" style="background:#f97316;color:white;text-align:center">Web Technologies Marks</th></tr>
  <tr style="background:#fff7ed"><th>Student</th><th>HTML</th><th>CSS</th><th>JS</th></tr>
  <tr><td>Alice</td><td>92</td><td>88</td><td>85</td></tr>
  <tr style="background:#fff7ed"><td>Bob</td><td>78</td><td>82</td><td>90</td></tr>
  <tr style="font-weight:700;background:#fef3c7"><td colspan="3">Total Average</td><td>86</td></tr>
</table>`,
    },
    {
      id: "demo3",
      label: "rowspan Demo",
      html: `<table border="1" cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:0.85rem">
  <tr style="background:#f97316;color:white"><th>Day</th><th>Period</th><th>Subject</th></tr>
  <tr><td rowspan="2" style="background:#fff7ed;font-weight:700;text-align:center">Mon</td><td>9 AM</td><td>HTML</td></tr>
  <tr><td>11 AM</td><td>CSS</td></tr>
  <tr><td rowspan="2" style="background:#fff7ed;font-weight:700;text-align:center">Tue</td><td>9 AM</td><td>JavaScript</td></tr>
  <tr><td>11 AM</td><td>PHP</td></tr>
</table>`,
    },
    {
      id: "demo4",
      label: "Combined Spanning",
      html: `<table border="1" cellpadding="8" style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:0.85rem">
  <tr style="background:#1c1917;color:white"><th rowspan="2">Name</th><th colspan="2">Sem 1</th><th colspan="2">Sem 2</th></tr>
  <tr style="background:#292524;color:#d6d3d1"><th>Theory</th><th>Lab</th><th>Theory</th><th>Lab</th></tr>
  <tr><td>Alice</td><td>85</td><td>90</td><td>88</td><td>92</td></tr>
  <tr style="background:#fff7ed"><td>Bob</td><td>78</td><td>82</td><td>80</td><td>85</td></tr>
</table>`,
    },
  ],

  exercises: [
    {
      title: "Exercise 1: Class Timetable",
      description: "Build a full week timetable using rowspan and colspan:",
      tasks: [
        "Create a 6-column table (Time, Mon, Tue, Wed, Thu, Fri)",
        "Use rowspan for 2-hour lab sessions that span 2 time slots",
        "Use colspan for a header row that spans all days",
        "Color alternate rows for readability",
        "Add a tfoot row showing total hours per day",
      ],
    },
    {
      title: "Exercise 2: Marks Sheet",
      description: "Build a formatted marks table:",
      tasks: [
        "Create a marks table for 5 students × 5 subjects",
        "Add a Total column and a Total row using colspan",
        "Highlight the highest score in each column",
        "Add a caption with the class and exam name",
        "Use border-collapse: collapse for clean borders",
      ],
    },
    {
      title: "Challenge: Invoice Table",
      description: "Build a realistic invoice using advanced table techniques:",
      tasks: [
        "Header section with company name spanning all columns",
        "Item rows with product, quantity, rate, amount",
        "Subtotal, tax (18% GST), and total rows with colspan labels",
        "Notes cell using rowspan on the left side",
        "Style with a professional color scheme",
      ],
    },
  ],
};

export default session5;