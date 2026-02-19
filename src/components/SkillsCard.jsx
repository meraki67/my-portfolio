import { motion } from "framer-motion";
import { Code2, MonitorSmartphone, Database, Wrench } from "lucide-react";

const iconMap = {
  frontend: Code2,
  ui: MonitorSmartphone,
  backend: Database,
  tools: Wrench,
};

function Progress({ label, value }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold dark:text-white text-slate-900">{label}</span>
        <span className="dark:text-white/60 text-slate-600">{value}%</span>
      </div>

      <div className="mt-2 h-2 rounded-full bg-black/10 dark:bg-black/10 bg-white/50 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>
    </div>
  );
}

export default function SkillsCard({ group }) {
  const Icon = iconMap[group.icon] || Code2;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur p-6 shadow-xl shadow-black/10">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/55 p-3">
          <Icon size={18} />
        </div>
        <div className="text-lg font-extrabold dark:text-white text-slate-900">
          {group.title}
        </div>
      </div>

      {/* NOTE: max 4 skills inside each card */}
      <div className="mt-4">
        {group.items.slice(0, 4).map((it) => (
          <Progress key={it.label} label={it.label} value={it.value} />
        ))}
      </div>

      <p className="mt-4 text-xs dark:text-white/50 text-slate-600">
        {/* NOTE */}
        Add/edit skills in <code>src/data/skills.js</code> (max 4 per card recommended).
      </p>
    </div>
  );
}
