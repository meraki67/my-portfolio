import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur overflow-hidden shadow-xl shadow-black/10"
    >
      {/* NOTE: Replace project.image with your screenshot path */}
      <div className="h-44 w-full bg-black/20 dark:bg-black/20 bg-white/40 flex items-center justify-center">
        <span className="text-xs dark:text-white/60 text-slate-600">
          Project image here (set in src/data/projects.js)
        </span>
      </div>

      <div className="p-5">
        <div className="text-xs font-semibold dark:text-white/60 text-slate-600">
          {project.category}
        </div>
        <div className="mt-1 text-lg font-bold dark:text-white text-slate-900">
          {project.title}
        </div>
        <p className="mt-2 text-sm dark:text-white/70 text-slate-700 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-semibold rounded-full border border-white/10 bg-black/10 dark:bg-black/10 bg-white/55 px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <a
            href={project.link}
            target={project.link.startsWith("http") ? "_blank" : undefined}
            rel={project.link.startsWith("http") ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-300 hover:text-indigo-200"
          >
            View <ExternalLink size={16} />
          </a>

          <span className="text-xs dark:text-white/40 text-slate-500">
            {/* NOTE */}
            Edit projects in <code>src/data/projects.js</code>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
