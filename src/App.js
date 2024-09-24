import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchUserNameByChatId } from "./thunks/userThunk"; // Подключаем thunks
import LoadingScreen from "./components/loadingScreen/loadingScreen";
import Header from "./components/header/header";

const tg = window.Telegram.WebApp;

function App() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.username); // Получаем имя пользователя из Redux
  const users = useSelector((state) => state.user.user || []); // Получаем список пользователей
  const loading = useSelector((state) => state.user.loading); // Получаем состояние загрузки

  useEffect(() => {

    tg.expand();
  
    tg.ready();

    // Загрузка всех пользователей
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />; 
  }

  return (
    <div>
      <Header />
      {userName && <h2>Добро пожаловать, {userName}!</h2>}
      <h3>Список пользователей:</h3>
      <ul>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li key={user.chatId}>
              {user.username} (Chat ID: {user.chatId})
            </li>
          ))
        ) : (
          <li>Пользователи не найдены.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
