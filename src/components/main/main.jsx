// import React, { useEffect, useState } from "react";
// import { fetchAllUsers, fetchUserNameByChatId } from "../../thunks/userThunk";
// import { useDispatch, useSelector } from "react-redux";
// import LoadingScreen from "../loadingScreen/loadingScreen";
// import "../../App.css";
// import { Link } from "react-router-dom";

// const Main = ({ setLoading }) => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.user.currentUser);
//   const [isLoading, setIsLoading] = useState(true);

//   const tg = window.Telegram.WebApp;
//   const chatId = tg.initDataUnsafe?.user?.id;

//   useEffect(() => {
//     setLoading(true);

//     const loadingTimer = setTimeout(() => {
//       setIsLoading(false);
//       setLoading(false);
//     }, 2000);

//     if (chatId) {
//       const fetchUserTimer = setTimeout(() => {
//         dispatch(fetchUserNameByChatId(chatId));
//       }, 2000);

//       return () => clearTimeout(fetchUserTimer);
//     }

//     return () => clearTimeout(loadingTimer);
//   }, [dispatch, chatId]);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <div>
//       <button>
//         <Link to="/history">History</Link>
//       </button>
//     </div>
//   );
// };

// export default Main;


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
    <div style={{ margin: "12px 28px" }}>
      <h1 className="username-main-page">
        Привет, {currentUser.username}&#128075;
      </h1>
      {/* <h1>Добро пожаловать, {currentUser.username}!</h1>
      <p>Общее количество очков: {currentUser.points || 0}</p>
      <p>Количество пройденных квизов: {completedQuizzesCount}</p> */}

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

      <div style={{display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center"}}>
        <button className="btn-link-main-page">
          <Link to="/rules">Правила</Link>
        </button>
        <button className="btn-link-main-page">
          <Link to="/history">История</Link>
        </button>
        <button className="btn-link-main-page">
          <Link to="/leadres">Таблица лидеров</Link>
        </button>
      </div>
    </div>
  );
};

export default Main;
