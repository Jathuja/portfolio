import { UsesCategoryGroup } from "@/lib/types";

/**
 * Workspace, Hardware, Development Tools & Daily Utilities
 * 
 * Living index of physical hardware, development environment, frameworks, and productivity software.
 * // TODO: Adjust specifications and tools to match your personal setup.
 */
export const usesCategories: UsesCategoryGroup[] = [
  {
    id: "01",
    key: "hardware",
    title: "Hardware & Workstation",
    tagline: "Ergonomic physical setup tuned for deep focus, low latency, and multi-window orchestration.",
    items: [
      {
        id: "hw-01",
        name: 'Apple MacBook Pro 14" (M3 Pro, 36GB RAM)',
        category: "Machine",
        description:
          "My primary daily driver. Exceptional battery efficiency, silent fan curve during intensive compilation, and sufficient unified memory for parallel Docker containers and dev servers.",
        specsOrDetails: "Apple M3 Pro / 12-core CPU / 18-core GPU / 1TB SSD",
        tag: "Daily Driver",
        highlight: true,
      },
      {
        id: "hw-02",
        name: 'Dell UltraSharp 27" 4K USB-C Monitor (U2723QE)',
        category: "Display",
        description:
          "IPS Black panel with 2000:1 contrast ratio. Crisp text rendering for dense code layouts and accurate sRGB color reproduction when designing UI components.",
        specsOrDetails: "3840 x 2160 / 60Hz / 90W Power Delivery Hub",
        tag: "Primary Display",
      },
      {
        id: "hw-03",
        name: "Keychron Q1 Pro Custom Mechanical Keyboard",
        category: "Input",
        description:
          "75% layout, fully CNC aluminum body, QMK/VIA programmable. Fitted with lubricated Gateron Oil King linear switches for a deep acoustic profile and minimal finger fatigue.",
        specsOrDetails: "Hot-swappable / PBT Double-shot Keycaps / Tape Modded",
        tag: "Peripherals",
        highlight: true,
      },
      {
        id: "hw-04",
        name: "Logitech MX Master 3S",
        category: "Input",
        description:
          "Ergonomic thumb support with electromagnetic MagSpeed scroll wheel. Indispensable for skimming large log streams and multidirectional navigation in design tools.",
        specsOrDetails: "8K DPI Darkfield Sensor / Quiet Clicks / USB-C",
        tag: "Peripherals",
      },
      {
        id: "hw-05",
        name: "Sony WH-1000XM5 Wireless ANC Headphones",
        category: "Audio",
        description:
          "Active noise cancellation for open workspace focus. Tuned for ambient instrumental soundscapes and long pair-programming sessions.",
        specsOrDetails: "LDAC / Multi-point Bluetooth / 30hr Battery Life",
        tag: "Audio",
      },
    ],
  },
  {
    id: "02",
    key: "editor-terminal",
    title: "Development Environment & Terminal",
    tagline: "Strict minimal aesthetics, instant keybindings, and robust developer ergonomics.",
    items: [
      {
        id: "env-01",
        name: "Cursor & VS Code",
        category: "Editor",
        description:
          "Primary code editor configured with a strict minimal theme, disabled mini-map, zero extraneous UI chrome, and custom keybindings optimized for split-pane refactoring.",
        specsOrDetails: "Theme: Custom Dark / Font: JetBrains Mono (14.5px, line-height 1.6)",
        tag: "Editor",
        highlight: true,
      },
      {
        id: "env-02",
        name: "JetBrains Mono (with ligatures)",
        category: "Typography",
        description:
          "The monospace typeface powering both my IDE and terminal. The increased lowercase height and distinctive operator shapes provide supreme visual comfort during long reading sessions.",
        specsOrDetails: "Weight: 400 Regular & 500 Medium / Calt Ligatures Enabled",
        tag: "Typography",
      },
      {
        id: "env-03",
        name: "Ghostty & iTerm2",
        category: "Terminal",
        description:
          "Fast GPU-accelerated terminal emulator pairing true color fidelity with instant launch speeds and reliable UTF-8 symbol rendering.",
        specsOrDetails: "GPU Rendered / Native macOS Window Tabs",
        tag: "Terminal",
      },
      {
        id: "env-04",
        name: "Zsh + Starship Cross-Shell Prompt",
        category: "Shell",
        description:
          "Minimalist prompt showing only critical context: active Git branch, dirty status, execution duration, and active Node/Rust toolchains.",
        specsOrDetails: "Async Git fetching / zsh-autosuggestions / fzf fuzzy search",
        tag: "Shell",
        highlight: true,
      },
      {
        id: "env-05",
        name: "Git & GitHub CLI (`gh`)",
        category: "Version Control",
        description:
          "Configured with strict commit signing, atomic staging via interactive rebasing, and custom aliases for quick log graph inspections.",
        specsOrDetails: "SSH Key Auth / Signed Commits / Delta Diff Viewer",
        tag: "Tooling",
      },
    ],
  },
  {
    id: "03",
    key: "stack-libraries",
    title: "Core Frameworks & Engineering Stack",
    tagline: "The technologies, runtimes, and libraries I default to for building production software.",
    items: [
      {
        id: "stk-01",
        name: "Next.js (App Router)",
        category: "Web Framework",
        description:
          "My go-to React metaframework for server components, streaming SSR, edge middleware, and optimized static generation pipelines.",
        specsOrDetails: "React 18/19 / Server Actions / Route Handlers",
        tag: "Frontend & Meta",
        highlight: true,
      },
      {
        id: "stk-02",
        name: "TypeScript (Strict Mode)",
        category: "Language",
        description:
          "Configured with `noImplicitAny: true` and `strictNullChecks`. I treat types as living system documentation and contract verification.",
        specsOrDetails: "TypeScript 5.x / Zod for Runtime Schema Validation",
        tag: "Language",
        highlight: true,
      },
      {
        id: "stk-03",
        name: "Tailwind CSS & Vanilla Design Tokens",
        category: "Styling",
        description:
          "Utility-first styling driven by raw CSS variables for theme switching, hairline border semantics, and predictable layout scales.",
        specsOrDetails: "PostCSS / JIT Engine / Custom Semantic Tokens",
        tag: "Styling",
      },
      {
        id: "stk-04",
        name: "Framer Motion",
        category: "Animation",
        description:
          "Physics-based spring animations, layout transitions, and strict `prefers-reduced-motion` compliance across interactive components.",
        specsOrDetails: "Declarative Variants / Exit Transitions / Scroll-Linked Reveal",
        tag: "Animation",
      },
      {
        id: "stk-05",
        name: "PostgreSQL & Prisma ORM",
        category: "Persistence",
        description:
          "Reliable ACID-compliant relational storage with type-safe schema definitions, automated migrations, and connection pooling.",
        specsOrDetails: "Postgres 16 / Prisma Client / Neon / Supabase",
        tag: "Backend",
      },
      {
        id: "stk-06",
        name: "Docker & Containerization",
        category: "DevOps",
        description:
          "Multi-stage Docker builds ensuring identical local development environments, reproducible builds, and isolated integration test suites.",
        specsOrDetails: "Docker Compose / Alpine Base Images / Multi-arch builds",
        tag: "DevOps",
      },
    ],
  },
  {
    id: "04",
    key: "productivity",
    title: "Productivity, Design & Daily Utilities",
    tagline: "Secondary apps and utilities that keep workflows friction-free and organized.",
    items: [
      {
        id: "app-01",
        name: "Raycast",
        category: "Productivity",
        description:
          "Replaced Spotlight completely. Used for clipboard history, window management, GitHub issue searches, currency conversion, and script commands.",
        specsOrDetails: "macOS Launcher / Custom Node Extensions",
        tag: "Utility",
        highlight: true,
      },
      {
        id: "app-02",
        name: "Figma",
        category: "Design",
        description:
          "Where ideas start before code. Used for wireframing layouts, testing typography pairings, and prototyping responsive component proportions.",
        specsOrDetails: "Design Systems / Auto-Layout / Vector Components",
        tag: "Design",
      },
      {
        id: "app-03",
        name: "Bruno & Postman",
        category: "API Testing",
        description:
          "Git-friendly, local-first API client for exploring REST and GraphQL endpoints without vendor lock-in or cloud sync overhead.",
        specsOrDetails: "Plaintext Collection Format / Environment Variables",
        tag: "Developer Tool",
      },
      {
        id: "app-04",
        name: "TablePlus",
        category: "Database Client",
        description:
          "Native, lightweight GUI for inspecting Postgres, MySQL, and Redis instances with keyboard navigation and inline editing.",
        specsOrDetails: "Native Swift GUI / SSH Tunneling / Multiple Tabs",
        tag: "Developer Tool",
      },
      {
        id: "app-05",
        name: "Notion & Obsidian",
        category: "Knowledge Management",
        description:
          "Personal engineering wiki, architectural decision logs (ADRs), reading notes, and sprint planning.",
        specsOrDetails: "Markdown Backed / Linked Knowledge Graph",
        tag: "Notes",
      },
    ],
  },
];
