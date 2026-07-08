import { FormEvent, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

const initialState: ContactState = {
  name: "",
  email: "",
  message: ""
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactState>(initialState);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/your-form-id";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (endpoint.includes("your-form-id")) {
      setStatus("Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in your .env.local first.");
      return;
    }

    setSubmitting(true);
    setStatus("");

    const payload = new URLSearchParams({
      name: form.name,
      email: form.email,
      message: form.message
    });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setStatus("Message sent successfully.");
      setForm(initialState);
    } catch (submitError: unknown) {
      const message = submitError instanceof Error ? submitError.message : "Unable to send your message";
      setStatus(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container section">
        <h1>Contact</h1>
        <p className="section-copy">Want to collaborate or discuss a project? Send a message.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            required
          />

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </button>
          {status ? <p className="status-text">{status}</p> : null}
        </form>
      </main>
      <Footer />
    </>
  );
}
