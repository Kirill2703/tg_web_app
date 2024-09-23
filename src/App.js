import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/header/header";
import LoadingScreen from "./components/loadingScreen/loadingScreen";
import UserLoader from "./components/userLoader/userLoader";
import { fetchUserNameByChatId } from "./thunks/userThunk"; // Импортируем thunk для загрузки пользователя

const tg = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.username); // Получаем имя пользователя из Redux
  
  const chatId = tg?.initDataUnsafe?.user?.id;

  useEffect(() => {
    // Сразу расширяем приложение на весь экран
    tg.expand();

    // Затем инициализируем Telegram Web App
    tg.ready();

    // Симуляция загрузки данных
    setTimeout(() => {
      if (chatId) {
        dispatch(fetchUserNameByChatId(chatId)); // Загружаем имя пользователя по chatId
      }
      setLoading(false); // После загрузки устанавливаем состояние загрузки в false
    }, 2000); // Условная задержка 2 секунды
  }, [dispatch, chatId]);

  if (loading) {
    return <LoadingScreen />; // Показываем компонент загрузки
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
