/**
 * NOTE: How to add a project:
 * Add another object with unique id.
 * category must match your filter tabs (All uses all automatically).
 */
export const projects = [
  {
    id: "p1",
    category: "Web App", // "Web App" | "Mobile" | "Others"
    title: "Jhigmoto Motorcycle & Accessories Application with 3D Viewer",
    description: "Brief project description (edit me).",
    tech: ["React", "Tailwind", "Framer Motion"],
    image: "/project1.png", // NOTE: put image in /public then set "/project1.png"
    link: "N/A",
  },
  {
    id: "p2",
    category: "Mobile",
    title: "Jhigmoto Motorcycle & Accessories Application with 3D Viewer",
    description: "Brief project description (edit me).",
    tech: ["React Native", "TypeScript"],
    image: "/project2.png",
    link: "https://example.com",
  },
  {
    id: "p3",
    category: "Others",
    title: "Project 3",
    description: "Brief project description (edit me).",
    tech: ["Node.js", "Express"],
    image: "/project3.png",
    link: "https://example.com",
  },
];
