import PageLayout from "../components/layout/pagelayout";
import GameHUD from "../components/game/gamehud";
import GameBoard from "../components/game/gameboard";
import WordList from "../components/game/worldlist";

export default function GamePage() {
  return (
    <PageLayout>
      <GameHUD />
      <GameBoard />
      <WordList />
    </PageLayout>
  );
}
