/**
 * @module components/TimerPanel
 */

import React from "react";
import { formatTime } from "../utils/formatTime.js";

/**
 * Панель таймера та поточного виділеного слова.
 * @param {Object} props
 * @param {number} props.elapsedMs Минулий час гри, мс.
 * @param {string} props.currentWord Літери поточного виділення.
 */
export default function TimerPanel({ elapsedMs, currentWord }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3">
      <div>
        <p className="text-xs text-slate-400">Час</p>
        <p className="text-lg font-semibold">{formatTime(elapsedMs)}</p>
      </div>

      <div className="text-right">
        <p className="text-xs text-slate-400">Поточне</p>
        <p className="text-sm font-semibold tracking-wide">
          {currentWord || "—"}
        </p>
      </div>
    </div>
  );
}
