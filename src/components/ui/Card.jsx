/**
 * @module components/ui/Card
 */

import React from "react";

/**
 * Картка секції з опційним заголовком і слотом справа.
 * @param {Object} props
 * @param {string} [props.title] Заголовок.
 * @param {React.ReactNode} props.children Вміст.
 * @param {React.ReactNode} [props.right] Елемент у правій частині шапки.
 */
export default function Card({ title, children, right }) {
  return (
    <section className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4 shadow-sm">
      {title ? (
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">{title}</h2>
          {right}
        </div>
      ) : null}
      {children}
    </section>
  );
}
