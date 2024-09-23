import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import LoadingScreen from "./components/loadingScreen/loadingScreen";
const tg = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true); // Добавьте состояние loading

  useEffect(() => {
    tg.ready(); // Инициализация Telegram Web App

    // После полной загрузки приложения - вызываем expand()
    setTimeout(() => {
      tg.expand(); // Расширяем окно на весь экран
      setLoading(false);
    }, 2000); // Условная задержка для симуляции загрузки данных
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
