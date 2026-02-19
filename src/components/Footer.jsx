import { ArrowUp, Moon, Sun } from "lucide-react";

export default function Footer({ theme, onToggleTheme, onBackToTop }) {
  return (
    <footer className="mt-14 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm dark:text-white/60 text-slate-700">
            © {new Date().getFullYear()} Made by Dave Torres. All rights reserved. {/* NOTE: edit */}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur px-3 py-2 text-sm font-semibold hover:bg-white/10 inline-flex items-center gap-2"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>

            <button
              onClick={onBackToTop}
              className="rounded-xl px-3 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow shadow-indigo-500/25 inline-flex items-center gap-2"
            >
              <ArrowUp size={16} />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
