import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects & Works" },
  { id: "skills", label: "Skills" },
  // { id: "contact", label: "Contact Me" },
];

// NOTE: "Hire Me" emphasized and placed at the end
const hireItem = { id: "contact", label: "Hire Me" };

export default function Navbar({ active, onNav, theme, onToggleTheme }) {
  return (
    <div className="sticky top-0 z-50 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Brand */}
            <button
              onClick={() => onNav("home")}
              className="text-sm font-bold dark:text-white text-slate-900 flex items-center gap-1"
            >
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                &lt;
              </span>

              Dave

              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                /&gt;
              </span>
            </button>

            {/* Links */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNav(item.id)}
                  className="group relative text-sm font-semibold dark:text-white/80 text-slate-800 transition-colors duration-200 hover:text-indigo-500"
                >
                  {item.label}

                  {/* Hover underline */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 origin-center bg-gradient-to-r from-indigo-500 to-violet-500 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                </button>
              ))}

              {/* Hire Me emphasized */}
              <button
                onClick={() => onNav(hireItem.id)}
                className="ml-4 rounded-full px-4 py-2 text-sm font-extrabold text-white bg-emerald-500 hover:bg-emerald-400 shadow shadow-emerald-500/25"
              >
                Hire Me
              </button>
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="rounded-xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/60 p-2 hover:bg-white/10"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Mobile: simple dropdown-like row */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={() => onNav("contact")}
                  className="rounded-xl px-3 py-2 text-sm font-bold text-white bg-emerald-500"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </div>

          {/* Mobile links row */}
          <div className="md:hidden px-4 pb-3 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className="rounded-full px-3 py-2 text-xs font-semibold border border-white/10 dark:text-white text-slate-900 dark:bg-white/5 bg-white/70"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
