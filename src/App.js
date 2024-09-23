import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import LoadingScreen from "./components/loadingScreen/loadingScreen";
const tg = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true); // Добавьте состояние loading

  useEffect(() => {
    // Сразу расширяем приложение на весь экран
    tg.expand();

    // Затем инициализируем Telegram Web App
    tg.ready();

    // Симуляция загрузки данных
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Условная задержка 2 секунды
  }, []);

  if (loading) {
    return <LoadingScreen />; // Показываем компонент загрузки
  }

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
