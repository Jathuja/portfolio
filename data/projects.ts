import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "travelhub",
    title: "TravelHub",
    tagline: "Multi-Role Travel Booking & Management Platform",
    description:
      "TravelHub is a full-stack travel booking and management platform developed as a university group project. My main contributions were the Hotel Owner module and AI chatbot.",
    stack: [
      "React",
      "TypeScript",
      "Spring Boot",
      "PostgreSQL",
      "FastAPI",
      "LangChain",
      "ChromaDB",
      "Supabase",
    ],
    featured: true,
    year: "2024",
    role: "Software Developer / Team Project",
    problem:
      "TravelHub is a full-stack travel booking and management platform developed as a university group project. My main contributions were the Hotel Owner module and AI chatbot.",
    features: [
      "End-to-end Hotel Owner Module with admin-approval workflow, room/amenity management, and Supabase Storage image uploads.",
      "Comprehensive dashboard providing real-time occupancy insights and rating analytics.",
      "AI travel assistant powered by a RAG pipeline (LangChain, Groq LLM, ChromaDB) with intent detection for live backend queries.",
      "Event-driven auto-sync service and real-time USD/LKR currency conversion capabilities.",
      "Spring Security (JWT) authentication with role-based access for tourists, agencies, hotel owners, and admins.",
    ],
    challenge:
      "Integrating diverse system architectures (Java Spring Boot and Python FastAPI) while ensuring real-time consistency and reliable natural language querying against a dynamic relational database.",
    solution:
      "Leveraged a Retrieval-Augmented Generation (RAG) pipeline combined with an event-driven auto-sync service, allowing the AI to query real-time data seamlessly across disparate microservices.",
    architectureNotes:
      "Spring Boot handles core booking and management logic with Spring Security (JWT) and Spring Data JPA; FastAPI serves the AI assistant and ML services. Data is persisted in PostgreSQL with Flyway migrations, vector embeddings in ChromaDB, and media assets in Supabase Storage.",
    links: {
      demo: "https://travelhublanka.netlify.app",
      github: "https://github.com/Jathuja",
    },
    liveUrl: "https://travelhublanka.netlify.app",
    githubUrl: "https://github.com/Jathuja",
    status: "Completed",
    metrics: [
      { label: "AI Pipeline", value: "RAG / LangChain" },
      { label: "Currency Sync", value: "Real-time" },
      { label: "LLM", value: "Groq LLM" },
      { label: "Vector DB", value: "ChromaDB" },
    ],
  },
  {
    slug: "plannex",
    title: "PlanNex",
    tagline: "Cross-Platform Task & Project Management Platform",
    description:
      "PlanNex is a personal full-stack task and project management platform with web and mobile applications.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Flutter",
      "Dart",
      "FastAPI",
      "MongoDB",
      "WebSockets",
      "JWT/OAuth2",
    ],
    featured: true,
    year: "2024",
    role: "Full-Stack Developer / Personal Project",
    problem:
      "PlanNex is a personal full-stack task and project management platform with web and mobile applications.",
    features: [
      "JWT and Google OAuth2 authentication on the web application.",
      "Kanban-style drag-and-drop task boards for intuitive workflow organization.",
      "Real-time WebSocket notifications for immediate task assignment and state-change updates.",
      "Project and milestone tracking integrated with comprehensive calendar views.",
      "Flutter mobile app with secure encrypted JWT token storage, auto-login, and Provider-based light/dark theming.",
      "Mobile-specific derived task views: overdue, upcoming, and today's tasks, plus calendar-based task navigation.",
      "Advanced status and priority filtering on the mobile client.",
    ],
    challenge:
      "Designing a shared REST API that satisfies both the rich React web app interaction patterns and the mobile-optimized Flutter client simultaneously, while maintaining consistent real-time state across all clients.",
    solution:
      "Implemented a robust WebSocket-based notification architecture with optimistic UI updates in React, and an independently architected Flutter mobile client consuming the same FastAPI backend with Provider state management and encrypted local storage.",
    architectureNotes:
      "Frontend built with React and TypeScript; Flutter mobile app independently designed with Provider state management and secure local storage. Both clients communicate with a shared FastAPI backend over REST and WebSockets, with MongoDB for flexible document storage.",
    links: {
      github: "https://github.com/Jathuja/task-manager",
    },
    githubUrl: "https://github.com/Jathuja/task-manager",
    status: "In Progress",
    metrics: [
      { label: "Real-time Sync", value: "WebSockets" },
      { label: "Auth", value: "JWT + OAuth2" },
      { label: "Mobile", value: "Flutter / Dart" },
      { label: "Backend", value: "FastAPI + MongoDB" },
    ],
  },
  {
    slug: "resolvex",
    title: "ResolveX",
    tagline: "Smart Service Request & Issue Management System",
    description:
      "ResolveX is a team-developed service request and issue management system. My contribution focused on comments, activity timeline, and admin analytics.",
    stack: [
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "PrimeNG",
      "RxJS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
    ],
    featured: true,
    year: "2024",
    role: "Software Developer / Team Project",
    problem:
      "ResolveX is a team-developed service request and issue management system. My contribution focused on comments, activity timeline, and admin analytics.",
    features: [
      "Role-based access control (RBAC) for administrators, agents, and end-users.",
      "Reusable Angular modules for Comments and Activity Timeline, consumable across the entire platform.",
      "Admin Analytics Dashboard with interactive data visualizations for request trends and resolution metrics.",
      "REST API integration with JWT-secured endpoints for all service request operations.",
      "Real-time status tracking and issue lifecycle management.",
    ],
    challenge:
      "Building truly reusable, decoupled Angular modules for Comments and Activity Timeline that could be plugged into any view without tight coupling to a specific service domain.",
    solution:
      "Designed the Comments and Activity Timeline as standalone Angular modules with Input/Output-driven APIs, consuming REST endpoints via RxJS observables and PrimeNG UI components for a consistent, accessible interface.",
    architectureNotes:
      "Angular frontend with PrimeNG component library and Tailwind CSS for styling; Node.js + Express.js REST API backend with PostgreSQL as the relational database and JWT-based authentication.",
    links: {
      github: "https://github.com/Jathuja",
    },
    githubUrl: "https://github.com/Jathuja",
    status: "In Progress",
    metrics: [
      { label: "Frontend", value: "Angular + PrimeNG" },
      { label: "Backend", value: "Node.js + Express" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Auth", value: "JWT / RBAC" },
    ],
  },
];
