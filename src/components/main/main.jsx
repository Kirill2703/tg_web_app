import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUserNameByChatId } from "../../thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/header";
import LoadingScreen from "../loadingScreen/loadingScreen";
import "../../App.css";
import Footer from "../footer/footer";

const Main = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // Получаем список пользователей
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
      }, 2000); // Запрос через 1 секунду

      return () => clearTimeout(fetchUserTimer); // Очистка таймера запроса
    }

    return () => clearTimeout(loadingTimer); // Очистка таймера загрузки
  }, [dispatch, chatId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
        
    </div>
  );
};

export default Main;
