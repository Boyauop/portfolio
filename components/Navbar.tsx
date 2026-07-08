import Link from "next/link";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved: Theme = saved === "dark" || saved === "light" ? saved : systemDark ? "dark" : "light";
    setTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <header className="navbar-shell">
      <nav className="navbar container">
        <Link href="/" className="logo">
          Boyauop
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark and light mode">
            {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
          </button>
        </div>
      </nav>
    </header>
  );
}
