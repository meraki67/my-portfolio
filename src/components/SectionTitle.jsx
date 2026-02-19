export default function SectionTitle({ title, subtitle, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 dark:text-white/70 text-slate-700">
          {subtitle}
        </p>
      )}
    </div>
  );
}
