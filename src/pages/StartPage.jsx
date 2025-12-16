import Header from "../components/layout/header";
import PageLayout from "../components/layout/pagelayout";
import Button from "../components/ui/button";

export default function StartPage() {
  return (
    <PageLayout>
      <Header />
      <p>
        У таблиці з літерами заховано кілька слів.
        Знайдіть усі слова на полі 5×5.
      </p>
      <Button>Почати гру</Button>
    </PageLayout>
  );
}
