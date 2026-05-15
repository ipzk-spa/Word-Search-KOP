import React from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import policy from "../../PRIVACY_POLICY.md?raw";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-sm text-indigo-300 hover:text-indigo-200">
            ← На головну
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <article className="max-w-none text-slate-200">
          <Markdown
            components={{
              h1: (props) => (
                <h1
                  className="mb-4 text-3xl font-bold tracking-tight text-white"
                  {...props}
                />
              ),
              h2: (props) => (
                <h2
                  className="mt-8 border-b border-slate-800 pb-2 text-xl font-semibold text-white"
                  {...props}
                />
              ),
              p: (props) => (
                <p className="mb-3 leading-relaxed text-slate-300" {...props} />
              ),
              ul: (props) => (
                <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-300" {...props} />
              ),
              li: (props) => <li className="leading-relaxed" {...props} />,
              a: (props) => (
                <a className="text-indigo-300 underline hover:text-indigo-200" {...props} />
              ),
              strong: (props) => (
                <strong className="font-semibold text-white" {...props} />
              ),
              table: ({ children, ...props }) => (
                <div className="my-4 overflow-x-auto rounded-xl border border-slate-800">
                  <table className="min-w-full border-collapse text-sm" {...props}>
                    {children}
                  </table>
                </div>
              ),
              thead: (props) => <thead className="bg-slate-900/80 text-slate-300" {...props} />,
              th: (props) => (
                <th className="border border-slate-800 px-3 py-2 text-left font-medium" {...props} />
              ),
              td: (props) => (
                <td className="border border-slate-800 px-3 py-2 align-top text-slate-300" {...props} />
              ),
            }}
          >
            {policy}
          </Markdown>
        </article>
      </main>
    </div>
  );
}
