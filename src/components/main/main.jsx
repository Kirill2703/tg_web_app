import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUserNameByChatId } from "../../thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingScreen/loadingScreen";
import "../../App.css";
import { Link } from "react-router-dom";
import mottos from "../../mottos";

const Main = ({ setLoading }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const [quote, setQuote] = useState("");

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  const randomQuote = mottos[Math.floor(Math.random() * mottos.length)];

  // useEffect(() => {
  //   // Выбираем случайную цитату
    
  //   setQuote(randomQuote);
  // }, []);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0 && currentUser) {
      const sortedUsers = [...users].sort((a, b) => b.points - a.points);
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
          <h2
            style={{ display: "flex", alignItems: "center" }}
            className="position-mp"
          >
            {userRank ? `#${userRank}` : "неизвестно"} {currentUser.username}
          </h2>
        </div>

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

        <div className="motivational-quote">{randomQuote}</div>
      </div>
    </>
  );
};

export default Main;
