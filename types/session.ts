// types/session.ts
// Shared types used across all web-technologies sessions

export interface CodeExample {
  label: string;
  code: string;
}

export interface DefinitionItem {
  term: string;
  description: string;
  note?: string;
  deprecated?: boolean;
  code?: string;
}

export interface TableRow {
  cells: string[];
}

export interface ContentTable {
  headers: string[];
  rows: TableRow[];
}

export interface TopicSection {
  id: string;
  heading: string;
  content: string;
  tip?: string;
  warning?: string;
  codeExamples?: CodeExample[];
  definitions?: DefinitionItem[];
  table?: ContentTable;
  subSections?: Omit<TopicSection, "subSections">[];
}

export interface Exercise {
  title: string;
  description: string;
  tasks: string[];
  hint?: string;
}

export interface DemoItem {
  id: string;
  label: string;
  html: string;
}

export interface SessionMeta {
  sessionNumber: number;
  module: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  color: string;
  colorDim: string;
  colorMid: string;
  objectives: string[];
  prevSession?: { num: number; title: string; href: string };
  nextSession?: { num: number; title: string; href: string };
}

export interface SessionData {
  meta: SessionMeta;
  topics: TopicSection[];
  demos: DemoItem[];
  exercises: Exercise[];
}