import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/button";

export default function ResultPage({ game, onRestart }) {
  return (
    <PageLayout>
      <div className="section">
        <h2>Результати</h2>
        <p>Знайдено слів: {game.foundWords.length}</p>
      </div>
      <Button onClick={onRestart}>На старт</Button>
    </PageLayout>
  );
}
