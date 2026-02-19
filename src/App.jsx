import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import SectionTitle from "./components/SectionTitle.jsx";
import SocialIcons from "./components/SocialIcons.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import SkillsCard from "./components/SkillsCard.jsx";
import ToolsMarquee from "./components/ToolsMarquee.jsx";
import Footer from "./components/Footer.jsx";

import { projects } from "./data/projects.js";
import { timeline } from "./data/timeline.js";
import { skillGroups, toolsRow } from "./data/skills.js";
import { socials } from "./data/socials.js";

const homeSocials = socials.filter((s) =>
  ["github", "linkedin", "email"].includes(s.key)
);

const SECTIONS = ["home", "about", "projects", "skills", "contact"];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [active, setActive] = useState("home");
  const [projectFilter, setProjectFilter] = useState("All");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sending, setSending] = useState(false);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    // We also add "light" helper class for custom background CSS
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll-based active section + progress bar
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const offset = 150;

          // Detect active section
          let current = "home";

          for (let id of SECTIONS) {
            const el = document.getElementById(id);
            if (!el) continue;

            if (scrollY + offset >= el.offsetTop) {
              current = id;
            }
          }

          setActive(current);

          // Progress calculation
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          const progress = (scrollY / docHeight) * 100;
          setScrollProgress(progress);

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "All") return projects;
    return projects.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  return (
    <div className="min-h-screen text-slate-100 dark:text-slate-100 text-slate-900">
      {/* Animated background layer */}
      <div className="animated-bg" />

      <Navbar
        active={active}
        scrollProgress={scrollProgress}
        onNav={scrollToId}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      {/* Page container */}
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HOME / HERO */}
        <section id="home" className="relative flex items-center min-h-[calc(100vh-96px)] pt-24">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm dark:text-white text-slate-900 dark:bg-white/5 bg-white/60 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Available for opportunities
                </div>

                <p className="mt-6 text-lg dark:text-white/80 text-slate-700">
                  Hello, I&apos;m
                </p>

                {/* NOTE: Change your name here */}
                <h1 className="mt-2 text-5xl sm:text-6xl font-extrabold tracking-tight dark:text-white text-slate-900">
                  Dave Kenneth Torres
                </h1>

                {/* Roles */}
                <div className="mt-5 space-y-1">
                  {/* Primary role (emphasized) */}
                  <div className="text-2xl sm:text-3xl font-extrabold dark:text-white text-slate-900">
                    IT Support
                  </div>

                  {/* Secondary roles */}
                  <div className="text-base sm:text-lg font-medium dark:text-white/70 text-slate-700">
                    &amp; Web Developer, Java Programmer
                  </div>
                </div>

                <p className="mt-6 max-w-xl leading-relaxed dark:text-white/70 text-slate-700">
                  {/* NOTE: Edit your description here */}
                  Short description here... You can replace this with your real intro and specialties.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollToId("projects")}
                    className="rounded-xl px-5 py-3 font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 active:scale-[0.99]"
                  >
                    View My Works
                  </button>

                  {/* NOTE: Replace href with your direct-download CV link */}
                  <a
                    href="https://drive.google.com/uc?export=download&id=1f--5U9-Wk8rFlp9AbLRF9uH0wWsZoVRJ"
                    className="rounded-xl px-5 py-3 font-semibold border border-white/15 dark:text-white text-slate-900 dark:bg-white/5 bg-white/70 backdrop-blur hover:bg-white/10"
                    download
                  >
                    Download Resume
                  </a>
                </div>
                {/* Social icons row */}
                <div className="mt-4">
                  <SocialIcons socials={homeSocials} />
                </div>

                <p className="mt-4 text-sm dark:text-white/50 text-slate-600">
                  {/* NOTE: Gmail mailto will open their email app */}
                  {/*Tip: For email icon, use <code className="px-1">mailto:</code> link to open Gmail/email client.*/}
                </p>
              </div>

              {/* Right hero card */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative"
              >
                <div className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur p-6 shadow-2xl shadow-black/20">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold dark:text-white text-slate-900">Quick Highlights</div>
                    {/*<div className="text-xs dark:text-white/60 text-slate-600">Edit in App.jsx</div>*/}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/40 p-4">
                      <div className="text-sm dark:text-white/60 text-slate-600">Specialty</div>
                      <div className="mt-1 font-semibold dark:text-white text-slate-900">Web / UI / IT Support</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/40 p-4">
                      <div className="text-sm dark:text-white/60 text-slate-600">Projects Made</div>
                      <div className="mt-1 font-semibold dark:text-white text-slate-900 text-xl">
                        {projects.length} projects
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/40 p-4">
                      <div className="text-sm dark:text-white/60 text-slate-600">Work Experiences</div>
                      <div className="mt-1 font-semibold dark:text-white text-slate-900">2+ years</div>
                    </div>
                    {/*<div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/40 p-4">
                      <div className="text-sm dark:text-white/60 text-slate-600">Theme</div>
                      <div className="mt-1 font-semibold dark:text-white text-slate-900">Blue–Violet</div>
                    </div>*/}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 p-4">
                    <div className="text-sm dark:text-white/70 text-slate-700">
                      {/* This panel is optional—pwede mong palitan ng featured project preview, stats, etc. */}
                    </div>
                  </div>
                </div>

                {/* Floating glow */}
                <div className="pointer-events-none absolute -inset-6 -z-10 opacity-70 blur-3xl animate-floaty">
                  <div className="h-full w-full rounded-[40px] bg-gradient-to-r from-blue-500/25 via-indigo-500/25 to-violet-500/25" />
                </div>

                
              </motion.div>
            </motion.div>
          </div>
          {/* Centered Scroll Down Arrow */}
          <div className="absolute bottom-11 left-1/2 -translate-x-1/2">
            <motion.button
              onClick={() => scrollToId("about")}
              animate={{ y: [0, 50, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-full p-4 hover:bg-white/20 transition"
            >
              <ChevronDown size={29} className="dark:text-white text-slate-900" />
            </motion.button>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <SectionTitle title="About" subtitle="A little quick intro of my self and my timeline journey" />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* LEFT: Photo */}
            <div className="relative h-full flex items-center justify-center">
              {/* Glow Background */}
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 opacity-40 blur-3xl" />

              {/* Image Card */}
              <div className="relative h-full flex items-center justify-center">
                <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-tr from-indigo-600/40 via-violet-600/30 to-blue-600/40 blur-3xl" />

                <div className="relative w-full max-w-md rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/10 p-4 shadow-2xl">
                  <img
                    src="assets/DAVE-KENNETH-CORBILLON-TORRES.png"
                    alt="About"
                    className="rounded-[24px] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Details aligned rows */}
            <div className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur p-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold dark:text-white text-slate-900">
                {/* NOTE: Edit these details */}
                Get to know me better
              </h3>

              <p className="mt-5 leading-relaxed dark:text-white/70 text-slate-700">
                I am a resourceful IT graduate with hands-on experience in technical support, network setup, and full-stack web development. I have worked on troubleshooting hardware and software issues, configuring LAN/WAN networks, and developing web applications using technologies such as JavaScript, PHP, Node.js, and MySQL. I enjoy solving technical problems, improving systems, and building reliable digital solutions that create real value.
              </p>

              {/* Aligned rows (like table feel) */}
              <div className="mt-6 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-sm dark:text-white/60 text-slate-600">Location</div>
                  <div className="col-span-2 font-semibold dark:text-white text-slate-900">
                    Perez, Trece Martires City, Cavite
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-sm dark:text-white/60 text-slate-600">Experience</div>
                  <div className="col-span-2 font-semibold dark:text-white text-slate-900">
                    2+ years
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-sm dark:text-white/60 text-slate-600">Status</div>
                  <div className="col-span-2 font-semibold dark:text-white text-slate-900">
                    Available/Immediately
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm dark:text-white/50 text-slate-600">
                {/* NOTE */}
                {/* Tip: You can change these values in <code>src/App.jsx</code> (About section). */}
              </p>
            </div>
          </div>

          {/* MY JOURNEY timeline */}
          <div className="mt-16">
            <h3 className="text-4xl font-bold dark:text-white text-slate-900 text-center">
              My Journey
            </h3>

            <div className="mt-10 relative">
              {/* center line */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/15" />

              <div className="space-y-10">
                {timeline.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div key={item.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={isLeft ? "md:pr-10" : "md:col-start-2 md:pl-10"}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: 0.5 }}
                          className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur p-6"
                        >
                          <div className="text-sm dark:text-white/60 text-slate-600">
                            {item.year}
                          </div>
                          <div className="mt-1 text-lg font-semibold dark:text-white text-slate-900">
                            {item.position}
                          </div>
                          <div className="mt-1 text-sm font-medium dark:text-white/70 text-slate-700">
                            {item.company}
                          </div>
                          <p className="mt-3 dark:text-white/70 text-slate-700 leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      </div>

                      {/* dot */}
                      <div className="absolute left-1/2 top-8 -translate-x-1/2">
                        <div className="h-4 w-4 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 shadow-lg shadow-indigo-500/30" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-10 text-sm dark:text-white/50 text-slate-600 text-center">
                {/* NOTE */}
                {/* How to add experience: edit <code>src/data/timeline.js</code> and add another object. */}
              </p>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <SectionTitle
            title="My Projects"
            subtitle="Check out some of my recent work"
            center
          />

          {/* Filter tabs (folders) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {["All", "Web App", "Mobile", "Others"].map((cat) => {
              const activeTab = projectFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-semibold border",
                    activeTab
                      ? "border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow shadow-indigo-500/25"
                      : "border-white/12 dark:text-white text-slate-900 dark:bg-white/5 bg-white/70 backdrop-blur hover:bg-white/10",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-center text-sm dark:text-white/50 text-slate-600">
            {/* NOTE */}
            How to add folders: just add a new category string and update the tabs above.
            Projects are in <code>src/data/projects.js</code>.
          </p>

          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <SectionTitle title="Skills" subtitle="What I use to build great experiences" center />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <SkillsCard key={group.id} group={group} />
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-center text-2xl font-bold dark:text-white text-slate-900">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                &gt;_ Tools &amp; Technologies
              </span>
            </h3>

            <div className="mt-6 marquee-mask">
              <ToolsMarquee items={toolsRow} />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section">
          <SectionTitle title="Contact Me" subtitle="Let’s build something together" center />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left info */}
            <div className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur p-6">
              <h3 className="text-2xl font-bold dark:text-white text-slate-900">
                Let&apos;s talk about everything!
              </h3>
              <p className="mt-3 dark:text-white/70 text-slate-700 leading-relaxed">
                Don&apos;t like forms? Send me an email directly or connect with me on social media.
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/40 p-4">
                  <div className="text-sm dark:text-white/60 text-slate-600">Email</div>
                  <div className="font-semibold dark:text-white text-slate-900">
                    {/* NOTE: replace */}
                    davekentorres@gmail.com
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/40 p-4">
                  <div className="text-sm dark:text-white/60 text-slate-600">Phone</div>
                  <div className="font-semibold dark:text-white text-slate-900">
                    +63 956 236 5181
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/40 p-4">
                  <div className="text-sm dark:text-white/60 text-slate-600">Location</div>
                  <div className="font-semibold dark:text-white text-slate-900">
                    Trece Martires City, Cavite, Philippines, 4109
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-sm font-semibold dark:text-white/80 text-slate-800">
                  Follow me on social media:
                </div>
                <div className="mt-3">
                  <SocialIcons socials={socials} variant="boxed" />
                </div>

                <p className="mt-3 text-sm dark:text-white/50 text-slate-600">
                  {/* NOTE */}
                  {/* How to add socials: edit <code>src/data/socials.js</code> and add another link.*/}
                </p>
              </div>
            </div>

            {/* Right form */}
            <div className="rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 bg-white/70 backdrop-blur p-6">
              <form
                onSubmit={(e) => {
                e.preventDefault();

                if (sending) return;

                const formData = new FormData(e.target);
                if (formData.get("website")) {
                  return; // bot detected
                }
                const email = formData.get("email");

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

                if (!emailRegex.test(email)) {
                  alert("Please enter a valid email address.");
                  return;
                }

                const templateParams = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  subject: formData.get("subject"),
                  message: formData.get("message"),
                };
                setSending(true);
                
                emailjs
                  .send(
                    "service_v75qki6",
                    "template_08pa6ud",
                    templateParams,
                    "ejFL_jFkIDCUs8rkN"
                  )
                  .then(() => {
                    alert("Your message sent successfully to Mr. Dave Kenneth Torres gmail!");
                    e.target.reset();
                    setSending(false);
                  })
                  .catch((error) => {
                    console.error(error);
                    alert("Failed to send message. Feel free to use the email or socials provided to contact me directly.");
                    setSending(false);
                  });
              }}
                className="space-y-4"
               >
                <input
                  type="text"
                  name="website"
                  style={{ display: "none" }}
                  autoComplete="off"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold dark:text-white/80 text-slate-800">
                      Your Name
                    </label>
                    <input
                      name="name"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400/60"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold dark:text-white/80 text-slate-800">
                      Your Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400/60"
                      placeholder="name@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-white/80 text-slate-800">
                    Subject
                  </label>
                  <input
                    name="subject"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400/60"
                    placeholder="Project inquiry"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold dark:text-white/80 text-slate-800">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={7}
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/10 dark:bg-black/10 bg-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400/60"
                    placeholder="Write your message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-2xl px-5 py-3 font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>

                <p className="text-sm dark:text-white/50 text-slate-600">
                  {/* NOTE */}
                  Want real sending? Use EmailJS, Formspree, or a small Node/Express API.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        onBackToTop={() => scrollToId("home")}
      />

      {/* HIRE ME section is same as Contact (as you requested: both nav links go to contact).
          If you want a separate section later, create <section id="hire"> and update navbar links.
       */}
    </div>
  );
}
