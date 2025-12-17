import { useState } from "react";

export default function usePage() {
  const [page, setPage] = useState("start");

  return {
    page,
    goToStart: () => setPage("start"),
    goToGame: () => setPage("game"),
    goToResult: () => setPage("result"),
  };
}
