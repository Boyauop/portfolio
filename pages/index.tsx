import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const timeline = [
  { year: "2021", title: "Started coding journey", details: "Built my first web projects and explored data analysis." },
  { year: "2023", title: "Shipped production apps", details: "Focused on scalable web apps and API-driven products." },
  { year: "2024", title: "Data science specialization", details: "Applied ML workflows, analytics, and dashboarding to real cases." },
  { year: "2026", title: "Building modern products", details: "Combining full-stack engineering with data-driven decision making." }
];

const skills = ["TypeScript", "Next.js", "Python", "Pandas", "SQL", "Machine Learning", "Node.js", "REST APIs"];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section className="container section">
          <h2>About Me</h2>
          <p className="section-copy">
            I am a builder who enjoys crafting polished user experiences and extracting practical value from data.
          </p>
          <div className="timeline">
            {timeline.map((item) => (
              <article key={item.year} className="timeline-item">
                <span>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.details}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container section">
          <h2>Skill Badges</h2>
          <div className="skill-badges">
            {skills.map((skill) => (
              <span key={skill} className="badge">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
