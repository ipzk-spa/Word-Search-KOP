import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";

import GameBoard from "../components/GameBoard.jsx";
import WordList from "../components/WordList.jsx";
import TimerPanel from "../components/TimerPanel.jsx";

import { useSettings } from "../hooks/useSettings.js";
import { pickRoundByDifficulty } from "../game/rounds.js";
import { useWordSearchGame } from "../hooks/useWordSearchGame.js";

import { useResultsStore } from "../store/results.store.js";
import { useUserStore } from "../store/user.store.js";
import { normalizeWord } from "../utils/grid.js";
import { formatTime } from "../utils/formatTime.js";

export default function GamePage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const nickname = useUserStore((s) => s.nickname);
  const addEntry = useResultsStore((s) => s.addEntry);
  const { difficulty, timeLimitSec, highlightFound } = useSettings();

  const [roundIndex, setRoundIndex] = useState(0);
  const [showDone, setShowDone] = useState(false);
  const [lastStats, setLastStats] = useState(null);
  const [foundWordPaths, setFoundWordPaths] = useState(new Set());

  const round = useMemo(
    () => pickRoundByDifficulty(difficulty, roundIndex),
    [difficulty, roundIndex],
  );

  const game = useWordSearchGame({
    board: round.board,
    words: round.words,
    timeLimitSec,
    onComplete: (stats) => {
      setLastStats(stats);
      setShowDone(true);

      addEntry({
        id: crypto.randomUUID?.() || String(Date.now()),
        userId,
        nickname,
        difficulty,
        roundId: round.id,
        foundCount: stats.foundCount,
        totalCount: stats.totalCount,
        elapsedMs: stats.elapsedMs,
        finishedAt: new Date().toISOString(),
      });
    },
  });

  function onBoardUp() {
    const prevWord = game.currentWord;
    const prevPath = Array.from(game.selectedSet);

    game.endSelection();

    setTimeout(() => {
      const normalized = normalizeWord(prevWord);
      const rev = normalized.split("").reverse().join("");
      const match =
        game.targetWords.includes(normalized) || game.targetWords.includes(rev);

      if (match) {
        setFoundWordPaths((curr) => new Set([...curr, ...prevPath]));
      }
    }, 0);
  }

  const timeInfo =
    timeLimitSec > 0 ? `Ліміт: ${timeLimitSec} сек` : "Без ліміту";
  const openTimeUp = game.status === "timeup";

  function restartRound() {
    setShowDone(false);
    setLastStats(null);
    setFoundWordPaths(new Set());
    game.reset();
  }

  function nextRound() {
    setShowDone(false);
    setLastStats(null);
    setFoundWordPaths(new Set());
    setRoundIndex((i) => i + 1);
    setTimeout(() => game.reset(), 0);
  }

  return (
    <div className="grid gap-4">
      <Card
        title={`Гра • Раунд ${round.id}`}
        right={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {difficulty.toUpperCase()}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{timeInfo}</span>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
          <div className="grid gap-3">
            <TimerPanel
              elapsedMs={game.elapsedMs}
              currentWord={game.currentWord}
            />

            <GameBoard
              board={round.board}
              selectedSet={game.selectedSet}
              foundWordPaths={foundWordPaths}
              onCellDown={game.startSelection}
              onCellEnter={game.extendSelection}
              onBoardUp={onBoardUp}
              highlightFound={highlightFound}
            />

            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate(`/user/${userId}/settings`)}
              >
                ⚙ Налаштування
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate(`/user/${userId}/results`)}
              >
                📋 Результати
              </Button>
              <Button variant="danger" onClick={restartRound}>
                ↻ Рестарт
              </Button>
            </div>
          </div>

          <div className="grid gap-3">
            <h3 className="text-sm font-semibold text-slate-200">
              Слова для пошуку
            </h3>
            <WordList words={round.words} found={game.found} />

            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-3 text-sm text-slate-300">
              <p className="font-semibold text-slate-200">Правило виділення</p>
              <p>
                Тільки пряма лінія: горизонталь / вертикаль / діагональ. Крок —
                на сусідню клітинку.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        open={showDone}
        title="Гру завершено 🎉"
        onClose={() => setShowDone(false)}
        actions={
          <>
            <Button
              variant="ghost"
              onClick={() => navigate(`/user/${userId}/results`)}
            >
              Таблиця результатів
            </Button>
            <Button variant="danger" onClick={restartRound}>
              Грати ще раз
            </Button>
            <Button onClick={nextRound}>Наступний раунд →</Button>
          </>
        }
      >
        <p className="text-slate-300">
          Ти знайшов(ла) всі слова за{" "}
          <span className="text-slate-100 font-semibold">
            {formatTime(lastStats?.elapsedMs || game.elapsedMs)}
          </span>
          .
        </p>
      </Modal>

      <Modal
        open={openTimeUp}
        title="Час вийшов ⏱️"
        onClose={() => {}}
        actions={
          <>
            <Button variant="danger" onClick={restartRound}>
              Спробувати знову
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(`/user/${userId}/settings`)}
            >
              Змінити налаштування
            </Button>
          </>
        }
      >
        <p className="text-slate-300">
          Ліміт часу закінчився. Можеш перезапустити раунд або зменшити
          складність/зняти ліміт.
        </p>
      </Modal>
    </div>
  );
}
