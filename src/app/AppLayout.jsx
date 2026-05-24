import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useUserStore } from "../store/user.store.js";

export default function AppLayout() {
  const { userId } = useParams();
  const nickname = useUserStore((s) => s.nickname);

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link
            to={`/user/${userId}/start`}
            className="font-semibold tracking-tight"
          >
            Word Search <span className="text-slate-400">5×5</span>
          </Link>
          <nav className="flex gap-3 text-sm">
            <Link
              className="text-slate-300 hover:text-white"
              to={`/user/${userId}/settings`}
            >
              Налаштування
            </Link>
            <Link
              className="text-slate-300 hover:text-white"
              to={`/user/${userId}/results`}
            >
              Результати
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {nickname ? (
          <p className="mb-4 text-sm text-slate-400">
            Привіт, <span className="text-slate-200">{nickname}</span> 👋
          </p>
        ) : null}
        <Outlet />
      </main>

      <footer className="border-t border-slate-800/60">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Зроблено на React • Form (react-hook-form + yup) • Zustand • Portals</p>
          <p className="flex flex-wrap gap-3">
            <Link className="hover:text-slate-300" to="/privacy">
              Політика конфіденційності
            </Link>
            <a
              className="hover:text-slate-300"
              href="https://github.com/ipzk-spa/Word-Search-KOP/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
            >
              Ліцензія: MIT
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
