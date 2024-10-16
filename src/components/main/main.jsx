import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUserNameByChatId } from "../../thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/header";
import LoadingScreen from "../loadingScreen/loadingScreen";
import "../../App.css";
import Footer from "../footer/footer";
import History from "../historyPrediction/history";
import { Link } from "react-router-dom";

const Main = ({ setLoading }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // Получаем список пользователей
  const [isLoading, setIsLoading] = useState(true);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    setLoading(true);

    // Имитация задержки загрузки на 2 секунды
    const loadingTimer = setTimeout(() => {
      setIsLoading(false); // Убираем экран загрузки
      setLoading(false);
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
      <button>
        <Link to="/history">History</Link>
      </button>
    </div>
  );
};

export default Main;
