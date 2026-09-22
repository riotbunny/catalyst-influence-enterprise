"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Background from "@/components/Background";

type Submission = {
  id: string;
  createdAt: string;
  executiveName: string;
  email: string;
  marketingCapacity: string;
  websiteUrl: string;
  city?: string;
  sourcePath?: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Invalid password.");
      setLoading(false);
      return;
    }

    setAuthenticated(true);
    await loadSubmissions();
    setLoading(false);
  }

  async function loadSubmissions() {
    const response = await fetch("/api/admin/submissions", {
      cache: "no-store",
    });

    if (!response.ok) {
      setError("Could not load submissions.");
      return;
    }

    const data = (await response.json()) as { submissions: Submission[] };
    setSubmissions(data.submissions);
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <Background />
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold text-brand-accent uppercase tracking-[0.22em] mb-4">
          Catalyst Admin
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-8">
          Partnership Applications
        </h1>

        {!authenticated ? (
          <form onSubmit={login} className="glass-panel rounded-3xl p-8 max-w-md">
            <label className="block text-sm font-medium text-gray-400 mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors"
              autoComplete="current-password"
            />
            {error ? <p className="text-sm text-red-400 mt-4">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="button-primary w-full text-black font-bold py-4 rounded-lg mt-6 disabled:opacity-60"
            >
              {loading ? "Unlocking..." : "Unlock Admin"}
            </button>
          </form>
        ) : (
          <section className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-gray-400">{submissions.length} submissions</p>
              <button
                type="button"
                onClick={loadSubmissions}
                className="border border-white/20 px-5 py-2 rounded-full text-white hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                Refresh
              </button>
            </div>
            {submissions.map((submission) => (
              <article key={submission.id} className="glass-panel rounded-3xl p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{submission.executiveName}</h2>
                    <p className="text-brand-accent mt-1">{submission.email}</p>
                  </div>
                  <time className="text-sm text-gray-500">
                    {new Date(submission.createdAt).toLocaleString()}
                  </time>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-sm">
                  <Info label="Website" value={submission.websiteUrl} />
                  <Info label="Acquisition Investment" value={submission.marketingCapacity} />
                  <Info label="City" value={submission.city || "Homepage"} />
                  <Info label="Source" value={submission.sourcePath || "/"} />
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <p className="text-gray-500 mb-1">{label}</p>
      <p className="text-gray-200 break-words">{value}</p>
    </div>
  );
}
