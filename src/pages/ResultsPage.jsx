import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import { useResultsStore } from "../store/results.store.js";
import { formatTime } from "../utils/formatTime.js";

export default function ResultsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const entries = useResultsStore((s) => s.entries);
  const clear = useResultsStore((s) => s.clear);

  const filtered = useMemo(
    () => entries.filter((e) => e.userId === userId),
    [entries, userId],
  );

  return (
    <div className="grid gap-4">
      <Card
        title="Таблиця результатів"
        right={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate(`/user/${userId}/game`)}
            >
              Грати
            </Button>
            <Button variant="danger" onClick={clear}>
              Очистити
            </Button>
          </div>
        }
      >
        <p className="mb-3 text-sm text-slate-300">
          Історія спроб зберігається локально (Zustand + localStorage).
        </p>

        <div className="overflow-auto rounded-2xl border border-slate-800">
          <table className="min-w-[760px] w-full text-sm">
            <thead className="bg-slate-900/60 text-slate-300">
              <tr>
                <th className="px-3 py-2 text-left">Дата</th>
                <th className="px-3 py-2 text-left">User</th>
                <th className="px-3 py-2 text-left">Difficulty</th>
                <th className="px-3 py-2 text-left">Round</th>
                <th className="px-3 py-2 text-left">Found</th>
                <th className="px-3 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="px-3 py-6 text-slate-400" colSpan={6}>
                    Поки що немає результатів. Зіграй раунд.
                  </td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <tr key={e.id} className="border-t border-slate-800">
                    <td className="px-3 py-2 text-slate-300">
                      {new Date(e.finishedAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      {e.nickname ? `${e.nickname} (${e.userId})` : e.userId}
                    </td>
                    <td className="px-3 py-2">
                      {String(e.difficulty).toUpperCase()}
                    </td>
                    <td className="px-3 py-2">{e.roundId}</td>
                    <td className="px-3 py-2">
                      {e.foundCount}/{e.totalCount}
                    </td>
                    <td className="px-3 py-2 font-semibold">
                      {formatTime(e.elapsedMs)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate(`/user/${userId}/start`)}
          >
            ← Старт
          </Button>
          <Button onClick={() => navigate(`/user/${userId}/settings`)}>
            Налаштування →
          </Button>
        </div>
      </Card>

      <Card title="Вся історія (усі юзери)">
        <p className="text-sm text-slate-300">
          Загалом записів:{" "}
          <span className="text-slate-100 font-semibold">{entries.length}</span>
        </p>
      </Card>
    </div>
  );
}
