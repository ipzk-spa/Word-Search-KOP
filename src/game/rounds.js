/**
 * @module game/rounds
 */

/** Набір раундів 5×5: сітка літер і список слів для пошуку. */
export const ROUNDS = [
  {
    id: 1,
    board: [
      ["C", "O", "D", "E", "S"],
      ["A", "R", "E", "A", "L"],
      ["S", "E", "A", "R", "C"],
      ["H", "O", "O", "K", "S"],
      ["T", "A", "I", "L", "W"],
    ],
    words: ["CODE", "REAL", "SEARCH", "HOOKS", "TAIL"],
  },

  {
    id: 2,
    board: [
      ["R", "E", "A", "C", "T"],
      ["O", "U", "T", "E", "R"],
      ["S", "T", "A", "T", "E"],
      ["H", "O", "O", "K", "S"],
      ["L", "O", "C", "A", "L"],
    ],
    words: ["REACT", "ROUTER", "STATE", "HOOKS", "LOCAL"],
  },

  {
    id: 3,
    board: [
      ["Z", "U", "S", "T", "A"],
      ["N", "D", "A", "T", "A"],
      ["S", "T", "O", "R", "E"],
      ["R", "E", "A", "C", "T"],
      ["H", "O", "O", "K", "S"],
    ],
    words: ["ZUSTAND", "DATA", "STORE", "REACT", "HOOKS"],
  },

  {
    id: 4,
    board: [
      ["J", "A", "V", "A", "S"],
      ["C", "R", "I", "P", "T"],
      ["R", "E", "A", "C", "T"],
      ["F", "O", "R", "M", "S"],
      ["S", "T", "A", "T", "E"],
    ],
    words: ["JAVAS", "CRIPT", "REACT", "FORMS", "STATE"],
  },

  {
    id: 5,
    board: [
      ["G", "R", "I", "D", "S"],
      ["D", "R", "A", "G", "S"],
      ["L", "I", "N", "E", "S"],
      ["H", "O", "O", "K", "S"],
      ["T", "I", "M", "E", "R"],
    ],
    words: ["GRIDS", "DRAGS", "LINES", "HOOKS", "TIMER"],
  },
];

/**
 * Повертає раунд з урахуванням складності (фільтр за довжиною слів).
 * @param {"easy"|"medium"|"hard"} difficulty Рівень складності.
 * @param {number} [roundIndex=0] Індекс раунду (циклічно по {@link ROUNDS}).
 * @returns {{id:number, board:string[][], words:string[]}}
 */
export function pickRoundByDifficulty(difficulty, roundIndex = 0) {
  const base = ROUNDS[roundIndex % ROUNDS.length];
  const words = base.words;

  if (difficulty === "easy") {
    return { ...base, words: words.filter((w) => w.length <= 5) };
  }
  if (difficulty === "medium") {
    return { ...base, words: words.filter((w) => w.length <= 6) };
  }
  return base;
}
