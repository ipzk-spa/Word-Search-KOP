import React from "react";
import { normalizeWord } from "../utils/grid.js";

export default function WordList({ words, found }) {
  return (
    <div className="grid gap-2">
      {words.map((w) => {
        const key = normalizeWord(w);
        const isFound = found.has(key);

        return (
          <div
            key={key}
            className={[
              "flex items-center justify-between rounded-xl border px-3 py-2 text-sm",
              isFound
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                : "border-slate-800 bg-slate-900/30 text-slate-200",
            ].join(" ")}
          >
            <span className="font-semibold tracking-wide">{key}</span>
            <span className="text-xs opacity-80">
              {isFound ? "✓ знайдено" : "…"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
