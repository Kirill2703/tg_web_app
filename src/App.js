import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/header/header";
import LoadingScreen from "./components/loadingScreen/loadingScreen";
import { fetchAllUsers, fetchUserNameByChatId } from "./thunks/userThunk"; // Импортируем нужные thunks

const tg = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.username); // Получаем имя пользователя из Redux
  const users = useSelector((state) => state.user.users); // Получаем список пользователей из Redux

  const chatId = tg?.initDataUnsafe?.user?.id;

  useEffect(() => {
    console.log("Запускаем useEffect"); // Лог для отслеживания запуска useEffect

    // Сразу расширяем приложение на весь экран
    tg.expand();
    console.log("Telegram Web App Expanded");

    // Затем инициализируем Telegram Web App
    tg.ready();
    console.log("Telegram Web App Ready");

    // Загрузка всех пользователей
    dispatch(fetchAllUsers()); // Загрузка пользователей
    console.log("Запрос на получение всех пользователей отправлен");

    // Симуляция загрузки данных
    setTimeout(() => {
      if (chatId) {
        console.log("chatId найден:", chatId);
        dispatch(fetchUserNameByChatId(chatId)); // Загружаем имя пользователя по chatId
      } else {
        console.log("chatId не найден");
      }
      console.log("Telegram Web App Data:", tg.initDataUnsafe);
      setLoading(false); // После загрузки устанавливаем состояние загрузки в false
    }, 2000); // Условная задержка 2 секунды
  }, [dispatch, chatId]);

  if (loading) {
    return <LoadingScreen />; // Показываем компонент загрузки
  }

  console.log("Имя пользователя из Redux:", userName);
  console.log("Список пользователей из Redux:", users);

  return (
    <div>
      <Header />
      {userName && <h2>Добро пожаловать, {userName}!</h2>}{" "}
      {/* Выводим имя пользователя */}
      <h3>Список пользователей:</h3>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.chatId}>{user.username}</li> // Измените на ваши поля
          ))
        ) : (
          <li>Пользователи не найдены.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
