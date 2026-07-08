import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
};

export default function ProjectCard({ title, description, tech, githubUrl, liveUrl }: ProjectCardProps) {
  return (
    <motion.article className="project-card" whileHover={{ y: -8, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="skill-badges">
        {tech.map((item) => (
          <span key={item} className="badge">
            {item}
          </span>
        ))}
      </div>
      <div className="project-links">
        <a href={githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {liveUrl ? (
          <a href={liveUrl} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
