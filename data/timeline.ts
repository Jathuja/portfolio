import { TimelineItem } from "@/lib/types";

export const timelineData: TimelineItem[] = [
  // ─── LEADERSHIP / EXTRA-CURRICULAR ────────────────────────────────────────────
  {
    id: "leadership-panel",
    category: "experience",
    date: "2025",
    title: "Company Panel Coordinator",
    subtitle: "UTE CAT Flagship Fair",
    description:
      "Coordinated company panel activities, managed communication between industry representatives and participants, and supported all event-related arrangements for the faculty flagship fair.",
    tags: ["Leadership", "Communication", "Event Coordination"],
    highlight: false,
  },

  // ─── OPEN SOURCE ─────────────────────────────────────────────────────────────
  {
    id: "opensource-wso2",
    category: "milestone",
    date: "2025",
    title: "Open Source Contribution — WSO2 API Manager",
    subtitle: "First Open-Source Contribution",
    description:
      "Contributed to WSO2 API Manager documentation as my first open-source contribution, gaining experience navigating an enterprise open-source project and following open-source contribution workflows.",
    tags: ["Open Source", "WSO2", "Documentation"],
    highlight: false,
  },

  // ─── PROJECTS ────────────────────────────────────────────────────────────────
  {
    id: "project-travelhub",
    category: "milestone",
    date: "2024",
    title: "TravelHub — Multi-Role Travel Booking Platform",
    subtitle: "Software Developer / Team Project",
    description:
      "TravelHub is a full-stack travel booking and management platform developed as a university group project. My main contributions were the Hotel Owner module and AI chatbot.",
    tags: ["React", "Spring Boot", "FastAPI", "LangChain", "PostgreSQL"],
    highlight: true,
  },
  {
    id: "project-plannex",
    category: "milestone",
    date: "2024",
    title: "PlanNex — Cross-Platform Task & Project Management",
    subtitle: "Full-Stack Developer / Personal Project",
    description:
      "Personal full-stack task and project management platform with web and mobile applications.",
    tags: ["React", "Flutter", "FastAPI", "MongoDB"],
    highlight: true,
  },
  {
    id: "project-resolvex",
    category: "milestone",
    date: "2024",
    title: "ResolveX — Smart Service Request Management System",
    subtitle: "Software Developer / Team Project",
    description:
      "Team-developed service request and issue management system. My contribution focused on comments, activity timeline, and admin analytics.",
    tags: ["Angular", "Node.js", "PostgreSQL"],
    highlight: false,
  },

  // ─── EDUCATION ───────────────────────────────────────────────────────────────
  {
    id: "edu-undergrad",
    category: "education",
    date: "2023 – Present",
    title: "BSc (Hons) in Information Technology",
    subtitle: "Faculty of Information Technology, University of Moratuwa",
    description:
      "Third-year undergraduate pursuing a degree in Information Technology. CGPA: 3.30 / 4.00. Focused on full-stack development, mobile app development, database design, and applied artificial intelligence.",
    tags: ["Full-Stack", "Mobile Dev", "AI & ML", "Database Design"],
    highlight: true,
  },
  {
    id: "edu-al",
    category: "education",
    date: "Completed",
    title: "GCE Advanced Level – Non-Stream",
    subtitle: "BT/Vincent Girls' High School, Batticaloa",
    description:
      "Completed Advanced Level with results ABC. Subjects: Physics, Combined Mathematics, and Information & Communication Technology.",
    tags: ["Physics", "Mathematics", "ICT"],
    highlight: false,
  },
];
