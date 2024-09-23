import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Импортируем useSelector
import "./App.css";
import Header from "./components/header/header";
import LoadingScreen from "./components/loadingScreen/loadingScreen";
import UserLoader from "./components/userLoader/userLoader";

const tg = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true);
  const telegramId = tg.initDataUnsafe?.user?.id; // Получаем Telegram ID из WebApp
  const userName = useSelector((state) => state.user.name); // Получаем имя пользователя из Redux

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
    return (
      <>
        <LoadingScreen />
        {telegramId && <UserLoader telegramId={telegramId} />}{" "}
        {/* Загружаем имя пользователя */}
      </>
    ); // Показываем компонент загрузки
  }

  return (
    <div>
      <Header />
      {userName && <h2>Добро пожаловать, {userName}!</h2>}{" "}
      {/* Выводим имя пользователя */}
    </div>
  );
}

export default App;
