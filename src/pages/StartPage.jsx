import Header from "../components/layout/Header";
import PageLayout from "../components/layout/PageLayout";
import Button from "../components/ui/button";

export default function StartPage({ onStart }) {
  return (
    <PageLayout>
      <div className="section">
        <h1>Word Search</h1>
        <p>Почати гру Word Search</p>
      </div>
      <Button onClick={onStart}>Почати гру</Button>
    </PageLayout>
  );
}
