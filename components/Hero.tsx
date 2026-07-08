import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero container">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="hero-kicker">
        Data Science + Full-Stack
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        Hi, I am <span>Boyauop</span>. I build modern, data-driven products.
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="hero-copy">
        I turn ideas into polished web apps with clean UX, measurable impact, and production-ready engineering.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="hero-actions">
        <Link href="/projects" className="btn btn-primary">
          View Projects
        </Link>
        <Link href="/contact" className="btn btn-secondary">
          Let&apos;s Talk
        </Link>
      </motion.div>
    </section>
  );
}
