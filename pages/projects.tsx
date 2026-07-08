import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  updated_at: string;
};

const featuredProjects = [
  {
    title: "Sales Forecast Dashboard",
    description: "Forecasting pipeline with interactive insights for planning and inventory optimization.",
    tech: ["Python", "Prophet", "Plotly", "FastAPI"],
    githubUrl: "https://github.com/Boyauop/sales-forecast-dashboard",
    liveUrl: "https://example.com/sales-forecast-dashboard"
  },
  {
    title: "Portfolio Analytics",
    description: "Personal analytics suite tracking engagement metrics and project performance.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com/Boyauop/portfolio-analytics",
    liveUrl: "https://example.com/portfolio-analytics"
  },
  {
    title: "NLP Job Matcher",
    description: "NLP model that scores CV-to-role fit and explains skill gaps with actionable feedback.",
    tech: ["Python", "Transformers", "Scikit-learn"],
    githubUrl: "https://github.com/Boyauop/nlp-job-matcher",
    liveUrl: "https://example.com/nlp-job-matcher"
  }
];

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState("");
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "Boyauop";

  useEffect(() => {
    let active = true;
    const fetchRepos = async () => {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`);
      }
      const data = (await response.json()) as Repo[];
      if (active) {
        setRepos(data);
      }
    };

    fetchRepos().catch((fetchError: unknown) => {
      const message = fetchError instanceof Error ? fetchError.message : "Failed to fetch repositories";
      setError(message);
    });

    return () => {
      active = false;
    };
  }, [username]);

  const latestRepos = useMemo(
    () =>
      repos.map((repo) => ({
        title: repo.name,
        description: repo.description ?? "No description provided.",
        tech: [repo.language ?? "Code", `Updated ${new Date(repo.updated_at).toLocaleDateString()}`],
        githubUrl: repo.html_url,
        liveUrl: repo.homepage ?? undefined
      })),
    [repos]
  );

  return (
    <>
      <Navbar />
      <main className="container section">
        <h1>Projects</h1>
        <p className="section-copy">A mix of highlighted builds and latest repositories pulled directly from GitHub.</p>

        <h2>Featured Work</h2>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <h2>Latest GitHub Repositories</h2>
        {error ? <p className="error-text">{error}</p> : null}
        <div className="project-grid">
          {latestRepos.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
