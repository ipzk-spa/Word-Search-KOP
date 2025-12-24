import React from "react";
import { posKey } from "../utils/grid.js";

export default function GameBoard({
  board,
  selectedSet,
  foundWordPaths = new Set(),
  onCellDown,
  onCellEnter,
  onBoardUp,
  highlightFound = true,
}) {
  const size = board.length;

  return (
    <div
      className="select-none"
      onMouseUp={onBoardUp}
      onMouseLeave={onBoardUp}
      onTouchEnd={onBoardUp}
    >
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {board.map((row, r) =>
          row.map((letter, c) => {
            const key = posKey(r, c);
            const selected = selectedSet.has(key);
            const found = highlightFound && foundWordPaths.has(key);

            const cls = [
              "aspect-square w-14 sm:w-16 grid place-items-center rounded-xl border text-lg font-bold",
              "transition",
              selected
                ? "bg-indigo-600/70 border-indigo-400 text-white"
                : "bg-slate-900/40 border-slate-800 text-slate-100",
              found ? "ring-2 ring-emerald-400/70" : "",
            ].join(" ");

            return (
              <button
                key={key}
                className={cls}
                onMouseDown={() => onCellDown(key)}
                onMouseEnter={() => onCellEnter(key)}
                onTouchStart={() => onCellDown(key)}
                onTouchMove={(e) => {
                  const t = e.touches?.[0];
                  if (!t) return;
                  const el = document.elementFromPoint(t.clientX, t.clientY);
                  const dataKey = el?.getAttribute?.("data-key");
                  if (dataKey) onCellEnter(dataKey);
                }}
                data-key={key}
                type="button"
              >
                {letter}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
