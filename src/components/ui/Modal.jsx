/**
 * @module components/ui/Modal
 */

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button.jsx";

/**
 * Модальне вікно через React Portal (`#modal-root`).
 * @param {Object} props
 * @param {boolean} props.open Чи відкрито вікно.
 * @param {string} props.title Заголовок.
 * @param {React.ReactNode} props.children Тіло модалки.
 * @param {Function} [props.onClose] Закриття (Escape або ✕).
 * @param {React.ReactNode} [props.actions] Кнопки в футері.
 */
export default function Modal({ open, title, children, onClose, actions }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const host = document.getElementById("modal-root");
  if (!host) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" onClick={onClose} className="px-3 py-1">
            ✕
          </Button>
        </div>

        <div className="text-sm text-slate-200">{children}</div>

        {actions ? (
          <div className="mt-4 flex flex-wrap justify-end gap-2">{actions}</div>
        ) : null}
      </div>
    </div>,
    host,
  );
}
