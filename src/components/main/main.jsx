import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/header";
import LoadingScreen from "../loadingScreen/loadingScreen";

const Main = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.username); // Получаем имя пользователя из Redux
  const currentUser = useSelector((state) => state.user.user); // Получаем список пользователей
  const loading = useSelector((state) => state.user.loading); // Получаем состояние загрузки
  const [isLoading, setIsLoading] = useState(true);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchAllUsers());
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading || loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header />
      {currentUser ? (
        <>
          <h2>Добро пожаловать, {currentUser.username}!</h2>
          <h3>Информация о пользователе:</h3>
          <p>Chat ID: {currentUser.chatId}</p>
          {/* Вы можете добавить больше информации о пользователе */}
        </>
      ) : (
        <h2>Пользователь не найден.</h2>
      )}
    </div>
  );
};

export default Main;
