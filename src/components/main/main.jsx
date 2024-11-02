
import React, { useEffect, useState } from "react";
import { fetchUserNameByChatId } from "../../thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingScreen/loadingScreen";
import "../../App.css";
import { Link } from "react-router-dom";

const Main = ({ setLoading }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

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
    <div style={{ margin: "12px 20px", position: "relative" }}>
      <h1 className="username-main-page">
        Привет, {currentUser.username}&#128075;
      </h1>
      {/* <h1>Добро пожаловать, {currentUser.username}!</h1>
      <p>Общее количество очков: {currentUser.points || 0}</p>
      <p>Количество пройденных квизов: {completedQuizzesCount}</p> */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "20px, 28px, 0, 28px",
          gap: "10px"
        }}
      >
        <button className="btn-link-main-page">
          <Link to="/rules" className="link-list-mp">
            Правила
          </Link>
        </button>
        <button className="btn-link-main-page">
          <Link to="/history" className="link-list-mp">
            История прогнозов
          </Link>
        </button>
        <button className="btn-link-main-page">
          <Link to="/leaders" className="link-list-mp">
            Таблица лидеров
          </Link>
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p className="points-main-page">{currentUser.points}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "24px 0px 12px -4px",
          }}
        >
          <p className="current-quiz-main-page">{completedQuizzesCount}</p>
        </div>
      </div>

      {/* <img style={{position: "absolute", left: "-100px", bottom: "200px"}} src="/ball-bckg.png" alt="" /> */}
    </div>
    // <div className="bckg-ball-img"></div>
  );
};

export default Main;
