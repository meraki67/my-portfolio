import {
  Github, Linkedin, Instagram, Facebook, Mail, Twitter, Send, Globe, Briefcase, BriefcaseBusiness  
} from "lucide-react";

/**
 * NOTE: socials data comes from src/data/socials.js
 * Add more socials by adding to socials.js and mapping an icon here if needed.
 */
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  x: Twitter,
  telegram: Send,
  onlinejobs: Briefcase,
  website: BriefcaseBusiness,
};

export default function SocialIcons({ socials, variant = "inline" }) {
  const base =
    variant === "boxed"
      ? "rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/55 p-3 hover:bg-white/10"
      : "rounded-xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/55 p-2 hover:bg-white/10";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {socials.map((s) => {
        const Icon = iconMap[s.key];
        if (!Icon) return null;

        return (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={base}
            aria-label={s.label}
            title={s.label}
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
