import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUserNameByChatId } from "../../thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/header";
import LoadingScreen from "../loadingScreen/loadingScreen";

const Main = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // Получаем список пользователей
  const loading = useSelector((state) => state.user.loading); // Получаем состояние загрузки
    const [isLoading, setIsLoading] = useState(true);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    console.log("Chat ID:", chatId);

    // Имитация задержки загрузки на 2 секунды
    const loadingTimer = setTimeout(() => {
      setIsLoading(false); // Убираем экран загрузки
    }, 2000);

    // Имитация получения данных с задержкой
    if (chatId) {
      const fetchUserTimer = setTimeout(() => {
        dispatch(fetchUserNameByChatId(chatId)); // Получаем пользователя по chatId
      }, 1000); // Запрос через 1 секунду

      return () => clearTimeout(fetchUserTimer); // Очистка таймера запроса
    }

    return () => clearTimeout(loadingTimer); // Очистка таймера загрузки
  }, [dispatch, chatId]);

    if (isLoading) {
      return <LoadingScreen />;
    }

  return (
    <div>
      <Header />
      {currentUser ? (
        <>
          <h2>{currentUser.username}</h2>
          <h3>Твои очки: {currentUser.points }</h3>
          <p>Chat ID: {currentUser.chatId}</p>
        </>
      ) : (
        <h2>Пользователь не найден.</h2>
      )}
    </div>
  );
};

export default Main;
