import { useMemo, useState } from "react";
import GameBoard from "../../components/GameBoard.jsx";
import { posKey } from "../../utils/grid.js";

export default {
  title: "Game/GameBoard",
  component: GameBoard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    highlightFound: { control: "boolean" },
    size: { control: "select", options: [3, 4, 5] },
  },
};

function StatefulBoard(args) {
  const { size, highlightFound } = args;
  const board = useMemo(() => {
    const letters = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ";
    const rows = [];
    let k = 0;
    for (let r = 0; r < size; r += 1) {
      const row = [];
      for (let c = 0; c < size; c += 1) {
        row.push(letters[k % letters.length]);
        k += 1;
      }
      rows.push(row);
    }
    return rows;
  }, [size]);

  const [selected, setSelected] = useState(() => new Set());
  const found = useMemo(() => new Set([posKey(0, 0), posKey(0, 1)]), []);

  return (
    <GameBoard
      board={board}
      selectedSet={selected}
      foundWordPaths={found}
      highlightFound={highlightFound}
      onCellDown={(key) => setSelected(new Set([key]))}
      onCellEnter={(key) =>
        setSelected((prev) => {
          const next = new Set(prev);
          next.add(key);
          return next;
        })
      }
      onBoardUp={() => setSelected(new Set())}
    />
  );
}

export const Grid3 = {
  render: StatefulBoard,
  args: { size: 3, highlightFound: true },
};

export const Grid5NoFoundHighlight = {
  render: StatefulBoard,
  args: { size: 5, highlightFound: false },
};

export const Grid4 = {
  render: StatefulBoard,
  args: { size: 4, highlightFound: true },
};
