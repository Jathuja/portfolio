import { NowData } from "@/lib/types";

/**
 * What I'm Doing Now (/now)
 * 
 * Inspired by Derek Sivers' /now page movement.
 * A public declaration of current engineering priorities, active builds, reading list, and goals.
 * // TODO: Update regularly as your focus and projects evolve.
 */
export const nowData: NowData = {
  lastUpdated: "September 2026",
  location: "Batticaloa, Sri Lanka",
  statusSummary:
    "Third-year IT undergraduate pursuing BSc (Hons) at the University of Moratuwa, currently building full-stack web applications and AI-integrated systems.",
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  focusItems: [
    {
      id: "01",
      category: "building",
      title: "PlanNex & AI Web Applications",
      description:
        "Building PlanNex, a full-stack project management platform with Kanban boards and real-time WebSockets, while integrating RAG pipelines and LLMs into web services.",
      status: "Active Projects",
      details: [
        "Developing real-time notifications with WebSockets and FastAPI",
        "Integrating LangChain and Groq LLM for AI-driven functionality",
        "Crafting intuitive user interfaces with React and Tailwind CSS",
      ],
      link: {
        label: "View Projects",
        url: "/projects",
      },
    },
    {
      id: "02",
      category: "learning",
      title: "Applied AI & Backend Architecture",
      description:
        "Deep diving into enterprise Java architectures, Spring Boot ecosystems, and advanced RAG pipelines for semantic data retrieval.",
      status: "In Progress",
      details: [
        "Mastering Spring Boot and Spring Security for secure APIs",
        "Optimizing vector database queries with ChromaDB",
        "Expanding foundational knowledge in database schema design",
      ],
    },
    {
      id: "03",
      category: "reading",
      title: "Engineering Literature & Architecture Monographs",
      description:
        "Re-reading timeless systems engineering books and contemporary engineering management essays to refine architectural intuition.",
      status: "Current Reading List",
      details: [
        "Designing Data-Intensive Applications by Martin Kleppmann",
        "A Philosophy of Software Design by John Ousterhout",
        "Database Internals: A Deep Dive by Alex Petrov",
      ],
    },
    {
      id: "04",
      category: "seeking",
      title: "Software Engineering Internships",
      description:
        "Actively seeking upcoming software engineering internship opportunities to apply my knowledge of full-stack development, Java backend architectures, and AI integrations.",
      status: "Open to Inquiries",
      details: [
        "Available for technical interviews and pair-programming assessments",
        "Interested in full-stack engineering, web development, and applied artificial intelligence",
      ],
      link: {
        label: "Get in Touch",
        url: "/contact",
      },
    },
  ],
};
