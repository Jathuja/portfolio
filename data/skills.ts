import { SkillCategoryGroup, Skills } from "@/lib/types";

export const skillCategories: SkillCategoryGroup[] = [
  {
    id: "01",
    key: "languages",
    title: "Languages",
    tagline: "Core programming languages for application and software development",
    skills: [
      { name: "Java", descriptor: "Object-oriented programming, Spring Boot applications", highlighted: true },
      { name: "Python", descriptor: "Scripting, FastAPI backend services & AI integrations", highlighted: true },
      { name: "TypeScript", descriptor: "Typed web application development & APIs", highlighted: true },
      { name: "JavaScript", descriptor: "Dynamic client-side interactivity" },
      { name: "Dart", descriptor: "Cross-platform mobile development with Flutter", highlighted: true },
      { name: "C", descriptor: "Systems programming fundamentals" },
      { name: "C++", descriptor: "Object-oriented systems & algorithmic problem solving" },
      { name: "PHP", descriptor: "Server-side web development" },
    ],
  },
  {
    id: "02",
    key: "frontend",
    title: "Frontend",
    tagline: "Component-driven web interfaces & responsive styling",
    skills: [
      { name: "React", descriptor: "Component-based web application development", highlighted: true },
      { name: "Angular", descriptor: "Frontend development with TypeScript, RxJS and PrimeNG", highlighted: true },
      { name: "Tailwind CSS", descriptor: "Utility-first design systems & responsive styling", highlighted: true },
      { name: "HTML5", descriptor: "Semantic markup structure" },
      { name: "CSS3", descriptor: "Modern styling & responsive layouts" },
      { name: "PrimeNG", descriptor: "Component library for Angular user interfaces" },
      { name: "RxJS", descriptor: "Reactive programming & observable data streams" },
    ],
  },
  {
    id: "03",
    key: "backend",
    title: "Backend",
    tagline: "Server-side development, RESTful APIs & real-time communication",
    skills: [
      { name: "Spring Boot", descriptor: "Java backend development and REST APIs", highlighted: true },
      { name: "FastAPI", descriptor: "Python backend services and API development", highlighted: true },
      { name: "Node.js", descriptor: "JavaScript runtime for backend services and REST APIs", highlighted: true },
      { name: "Express.js", descriptor: "Node.js web framework for REST APIs" },
      { name: "REST APIs", descriptor: "API design, endpoints, and JSON communication", highlighted: true },
      { name: "WebSockets", descriptor: "Bi-directional real-time communication" },
    ],
  },
  {
    id: "04",
    key: "mobile",
    title: "Mobile",
    tagline: "Cross-platform mobile applications with Flutter",
    skills: [
      { name: "Flutter", descriptor: "Cross-platform mobile apps for iOS and Android", highlighted: true },
      { name: "Dart", descriptor: "Primary language for Flutter development", highlighted: true },
      { name: "Provider", descriptor: "State management pattern for Flutter applications" },
      { name: "Secure Local Storage", descriptor: "Encrypted token storage & session persistence" },
    ],
  },
  {
    id: "05",
    key: "databases",
    title: "Databases & Storage",
    tagline: "Relational databases, document stores & vector embeddings",
    skills: [
      { name: "PostgreSQL", descriptor: "Relational database design and queries", highlighted: true },
      { name: "MySQL", descriptor: "Relational database management" },
      { name: "MS SQL Server", descriptor: "Relational database management and SQL queries" },
      { name: "MongoDB", descriptor: "NoSQL document database for applications", highlighted: true },
      { name: "ChromaDB", descriptor: "Vector database for AI embeddings & semantic search", highlighted: true },
      { name: "Supabase", descriptor: "Cloud database, authentication & storage", highlighted: true },
    ],
  },
  {
    id: "06",
    key: "ai",
    title: "AI",
    tagline: "Applied AI, retrieval pipelines & LLM integrations",
    skills: [
      { name: "LangChain", descriptor: "LLM integration and prompt chaining", highlighted: true },
      { name: "RAG", descriptor: "Retrieval-Augmented Generation architectures", highlighted: true },
      { name: "LLM Integration", descriptor: "Working with Groq LLM & large language models" },
      { name: "Vector Databases", descriptor: "Semantic search and embedding storage" },
    ],
  },
  {
    id: "07",
    key: "tools",
    title: "Tools",
    tagline: "Version control, IDE tooling, testing & methodology",
    skills: [
      { name: "Git", descriptor: "Distributed version control system", highlighted: true },
      { name: "GitHub", descriptor: "Collaborative repository management & workflows", highlighted: true },
      { name: "Postman", descriptor: "API testing collections & mock servers" },
      { name: "Android Studio", descriptor: "IDE for Flutter and Android development" },
      { name: "VS Code", descriptor: "Primary code editor & extension ecosystem" },
      { name: "Agile Methodology", descriptor: "Iterative delivery & sprint planning" },
    ],
  },
];

// Flat skills representation for quick lookups & backward compatibility
const getSkillsByKey = (key: string): string[] => {
  const cat = skillCategories.find((c) => c.key === key);
  return cat ? cat.skills.map((s) => s.name) : [];
};

export const skills: Skills = {
  languages: getSkillsByKey("languages"),
  frontend: getSkillsByKey("frontend"),
  backend: getSkillsByKey("backend"),
  databases: getSkillsByKey("databases"),
  cloud: getSkillsByKey("ai"),
  tools: getSkillsByKey("tools"),
  softSkills: ["Agile Methodology", "Object-Oriented Programming", "Problem Solving"],
};
