import { useState } from "react";

export default function useGame() {
  const [words] = useState(["REACT", "VITE", "GAME"]);
  const [foundWords, setFoundWords] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  function onWordFound(word) {
    setFoundWords((prev) => {
      if (prev.includes(word)) return prev;
      const updated = [...prev, word];
      if (updated.lenght === words.length) {
        setIsFinished(true);
      }
      return updated;
    });
  }

  function finishGame() {
    setIsFinished(true);
  }

  function resetGame() {
    setFoundWords([]);
    setIsFinished(false);
  }

  return {
    words,
    foundWords,
    isFinished,
    onWordFound,
    finishGame,
    resetGame,
  };
}
