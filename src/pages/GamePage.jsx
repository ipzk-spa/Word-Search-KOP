import PageLayout from "../components/layout/PageLayout";
import GameHUD from "../components/game/GameHud";
import GameBoard from "../components/game/GameBoard";
import WordList from "../components/game/WorldList";
import Button from "../components/ui/button";

export default function GamePage({ game, onFinish }) {
  return (
    <PageLayout>
      <div className="section">
        <GameHUD />
      </div>
      <div className="section">Знайдено слів: {game.foundWords.length}</div>
      <div className="section">
        <GameBoard />
      </div>
      <div className="section">
        <WordList />
      </div>
      <Button onClick={onFinish}>Завершити гру</Button>
    </PageLayout>
  );
}
