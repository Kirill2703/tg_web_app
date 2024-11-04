import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUserNameByChatId } from "../../thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingScreen/loadingScreen";
import "../../App.css";
import { Link } from "react-router-dom";

const Main = ({ setLoading }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.length > 0 && currentUser) {
      // Сортируем пользователей и находим позицию текущего пользователя
      const sortedUsers = [...currentUser].sort((a, b) => b.points - a.points);
      const rank =
        sortedUsers.findIndex((user) => user.chatId === currentUser.chatId) + 1;
      setUserRank(rank);
    }
  }, [users, currentUser]);

  useEffect(() => {
    setLoading(true);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setLoading(false);
    }, 3000);

    if (chatId) {
      const fetchUserTimer = setTimeout(() => {
        dispatch(fetchUserNameByChatId(chatId));
      }, 3000);

      return () => clearTimeout(fetchUserTimer);
    }

    return () => clearTimeout(loadingTimer);
  }, [dispatch, chatId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Проверка, есть ли текущий пользователь
  if (!currentUser) {
    return <div>Пользователь не найден</div>;
  }

  // Подсчет пройденных квизов
  const completedQuizzesCount = currentUser.completedQuizzes.length; // Количество пройденных квизов

  return (
    <>
      <div style={{ margin: "20px 20px 0 20px", position: "relative" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h1 className="username-main-page">
            Привет, <br />
            {currentUser.username}&#128075;
          </h1>
          <h2>{userRank ? `#${userRank}` : "неизвестно"}</h2>
        </div>
        {/* <h1>Добро пожаловать, {currentUser.username}!</h1>
        <p>Общее количество очков: {currentUser.points || 0}</p>
        <p>Количество пройденных квизов: {completedQuizzesCount}</p> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "10px",
            marginTop: "28px",
          }}
        >
          <button className="btn-link-main-page">
            <Link to="/rules" className="link-list-mp">
              Правила Footwise
            </Link>
          </button>
          <button className="btn-link-main-page">
            <Link to="/history" className="link-list-mp">
              История прогнозов
            </Link>
          </button>
          <button className="btn-link-main-page">
            <Link to="/table" className="link-list-mp">
              Таблица лидеров
            </Link>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "60px",
            justifyContent: "center",
          }}
        >
          <p className="points-main-page">{currentUser.points}</p>
        </div>
      </div>
      <p>dsfs</p>
    </>
  );
};

export default Main;
