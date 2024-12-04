import React, { useEffect, useState } from "react";
import { fetchAllUsers, fetchUserNameByChatId } from "../../thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingScreen/loadingScreen";
import "../../App.css";
import { Link } from "react-router-dom";
import mottos from "../../mottos";
import "animate.css";

const Main = ({ setLoading }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [flip, setFlip] = useState(false);
  const [randomQuote, setRandomQuote] = useState(() => {
    return mottos[Math.floor(Math.random() * mottos.length)];
  });

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

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
    }, 1000);

    if (chatId) {
      const fetchUserTimer = setTimeout(() => {
        dispatch(fetchUserNameByChatId(chatId));
      }, 2000);

      return () => clearTimeout(fetchUserTimer);
    }

    return () => clearTimeout(loadingTimer);
  }, [dispatch, chatId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <div>User undefined</div>;
  }

  const completedQuizzesCount = currentUser.completedQuizzes.length;

  const handleFlip = () => {
    setFlip(true);
    setTimeout(() => {
      setShowQuizzes((prev) => !prev);
      setFlip(false);
    }, 300);
  };

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
            Hello, <br />
            {currentUser.username}&#128075;
          </h1>
          <h2
            style={{ display: "flex", alignItems: "center" }}
            className="position-mp"
          >
            {userRank ? `#${userRank}` : "неизвестно"}
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
              Footwise Rules
            </Link>
          </button>
          <button className="btn-link-main-page">
            <Link to="/history" className="link-list-mp">
              Prediction History
            </Link>
          </button>
          <button className="btn-link-main-page">
            <Link to="/table" className="link-list-mp">
              Table of leaders
            </Link>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "60px",
            justifyContent: "center",
          }}
          onClick={handleFlip}
        >
          <p className={`points-main-page ${flip ? "flip-animation" : ""}`}>
            {showQuizzes ? completedQuizzesCount : currentUser.points}
          </p>
        </div>

        <div className="motivational-quote">{randomQuote}</div>
      </div>
    </>
  );
};

export default Main;
