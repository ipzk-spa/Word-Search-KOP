import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "wskop_cookie_consent_v1";

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function initialPrefs() {
  const stored = readStored();
  if (!stored?.prefs) {
    return { preferences: true, analytics: false };
  }
  return {
    preferences: Boolean(stored.prefs.preferences),
    analytics: Boolean(stored.prefs.analytics),
  };
}

function initialOpen() {
  const stored = readStored();
  return !stored?.decided;
}

export default function CookieConsentBanner() {
  const [open, setOpen] = useState(initialOpen);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState(initialPrefs);

  const rows = useMemo(
    () => [
      {
        name: "localStorage (ключ згоди)",
        purpose: "Зберігання вибору cookie/GDPR та версії політики.",
        duration: "Доки не очищено дані сайту",
        category: "Необхідні",
      },
      {
        name: "localStorage (гра)",
        purpose: "Псевдонім, налаштування, локальні результати.",
        duration: "Доки не очищено дані сайту",
        category: "Функціональні",
      },
      {
        name: "Аналітика (опційно)",
        purpose: "У базовій збірці не підключається без згоди в банері.",
        duration: "—",
        category: "Необов’язково",
      },
    ],
    [],
  );

  const saveDecision = useCallback((next) => {
    writeStored({
      decided: true,
      decidedAt: new Date().toISOString(),
      policyVersion: "1.0",
      prefs: {
        necessary: true,
        preferences: Boolean(next.preferences),
        analytics: Boolean(next.analytics),
      },
    });
    setOpen(false);
  }, []);

  if (!open) {
    return (
      <div className="fixed bottom-3 right-3 z-[60] text-xs text-slate-400">
        <button
          type="button"
          className="rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-2 text-slate-200 hover:border-slate-500"
          onClick={() => {
            const stored = readStored();
            if (stored?.prefs) {
              setPrefs({
                preferences: Boolean(stored.prefs.preferences),
                analytics: Boolean(stored.prefs.analytics),
              });
            }
            setExpanded(false);
            setOpen(true);
          }}
        >
          Cookie / GDPR
        </button>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-800 bg-slate-950/95 p-4 text-slate-100 shadow-2xl backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 id="cookie-title" className="text-base font-semibold">
              Cookie та локальне сховище (GDPR)
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Конфігурація збереження на цьому проєкті. Деталі:{" "}
              <Link className="text-indigo-300 underline" to="/privacy">
                політика конфіденційності
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm hover:border-slate-500"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Сховати таблицю" : "Таблиця / налаштування"}
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm hover:border-slate-500"
              onClick={() =>
                saveDecision({ preferences: false, analytics: false })
              }
            >
              Лише необхідні
            </button>
            <button
              type="button"
              className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              onClick={() =>
                saveDecision({ preferences: true, analytics: prefs.analytics })
              }
            >
              Зберегти вибір
            </button>
            <button
              type="button"
              className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              onClick={() =>
                saveDecision({ preferences: true, analytics: true })
              }
            >
              Прийняти всі
            </button>
          </div>
        </div>

        {expanded ? (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="min-w-full text-left text-xs text-slate-200">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-medium">Технологія</th>
                  <th className="px-3 py-2 font-medium">Призначення</th>
                  <th className="px-3 py-2 font-medium">Термін</th>
                  <th className="px-3 py-2 font-medium">Категорія</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-t border-slate-800">
                    <td className="px-3 py-2 align-top">{r.name}</td>
                    <td className="px-3 py-2 align-top">{r.purpose}</td>
                    <td className="px-3 py-2 align-top">{r.duration}</td>
                    <td className="px-3 py-2 align-top">{r.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="grid gap-3 border-t border-slate-800 bg-slate-900/40 p-3 sm:grid-cols-2">
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={prefs.preferences}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, preferences: e.target.checked }))
                  }
                />
                <span>
                  <span className="font-medium">Функціональні</span> — гра та
                  налаштування локально.
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={prefs.analytics}
                  onChange={(e) =>
                    setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                  }
                />
                <span>
                  <span className="font-medium">Аналітика</span> — дозвіл на
                  майбутні скрипти (у базовій збірці не активується).
                </span>
              </label>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
