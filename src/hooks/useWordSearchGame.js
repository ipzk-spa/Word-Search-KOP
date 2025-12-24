import { useEffect, useMemo, useRef, useState } from "react";
import {
  directionOfPath,
  lettersFromPath,
  normalizeWord,
} from "../utils/grid.js";

export function useWordSearchGame({ board, words, timeLimitSec, onComplete }) {
  const targetWords = useMemo(() => words.map(normalizeWord), [words]);

  const [found, setFound] = useState(() => new Set());
  const [dragging, setDragging] = useState(false);
  const [path, setPath] = useState([]);
  const [status, setStatus] = useState("playing"); // playing | completed | timeup
  const [elapsedMs, setElapsedMs] = useState(0);

  const startedAtRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      const now = Date.now();
      const elapsed = now - startedAtRef.current;
      setElapsedMs(elapsed);

      if (timeLimitSec > 0 && elapsed >= timeLimitSec * 1000) {
        window.clearInterval(timerRef.current);
        setStatus("timeup");
        setDragging(false);
        setPath([]);
      }
    }, 250);

    return () => window.clearInterval(timerRef.current);
  }, [timeLimitSec]);

  const allFound = found.size === targetWords.length && targetWords.length > 0;

  useEffect(() => {
    if (allFound && status === "playing") {
      window.clearInterval(timerRef.current);
      setStatus("completed");
      onComplete?.({
        elapsedMs,
        foundCount: targetWords.length,
        totalCount: targetWords.length,
      });
    }
  }, [allFound, status, onComplete, elapsedMs, targetWords.length]);

  function reset() {
    setFound(new Set());
    setDragging(false);
    setPath([]);
    setStatus("playing");
    setElapsedMs(0);

    startedAtRef.current = Date.now();
    window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const now = Date.now();
      const elapsed = now - startedAtRef.current;
      setElapsedMs(elapsed);

      if (timeLimitSec > 0 && elapsed >= timeLimitSec * 1000) {
        window.clearInterval(timerRef.current);
        setStatus("timeup");
        setDragging(false);
        setPath([]);
      }
    }, 250);
  }

  function startSelection(key) {
    if (status !== "playing") return;
    setDragging(true);
    setPath([key]);
  }

  function extendSelection(key) {
    if (!dragging || status !== "playing") return;
    setPath((prev) => {
      if (prev.length === 0) return [key];
      if (prev[prev.length - 1] === key) return prev;
      if (prev.includes(key)) return prev;

      const next = [...prev, key];
      const dir = directionOfPath(next);
      if (!dir) return prev;

      return next;
    });
  }

  function endSelection() {
    if (!dragging || status !== "playing") return;
    setDragging(false);

    setPath((prev) => {
      const word = normalizeWord(lettersFromPath(board, prev));
      const wordRev = word.split("").reverse().join("");

      const matched = targetWords.find((w) => w === word || w === wordRev);
      if (matched) {
        setFound((curr) => new Set([...curr, matched]));
      }
      return [];
    });
  }

  const currentWord = useMemo(() => {
    if (path.length === 0) return "";
    return lettersFromPath(board, path);
  }, [board, path]);

  const selectedSet = useMemo(() => new Set(path), [path]);

  return {
    status,
    elapsedMs,
    targetWords,
    found,
    selectedSet,
    currentWord,

    startSelection,
    extendSelection,
    endSelection,
    reset,
  };
}
