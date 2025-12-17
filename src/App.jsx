import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import usePage from "./hooks/usePage";
import useGame from "./hooks/useGame";

export default function App() {
  const page = usePage();
  const game = useGame();

  if (page.page === "start") {
    return <StartPage onStart={page.goToGame} />;
  }

  if (page.page === "game") {
    return <GamePage game={game} onFinish={page.goToResult} />;
  }

  if (page.page === "result") {
    return <ResultPage game={game} onRestart={page.goToStart} />;
  }

  return null;
}
