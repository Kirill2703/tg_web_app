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


// import React, { useEffect, useState } from "react";
// import { fetchUserNameByChatId } from "../../thunks/userThunk";
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

//   // Проверка, есть ли текущий пользователь
//   if (!currentUser) {
//     return <div>Пользователь не найден</div>;
//   }

//   // Подсчет пройденных квизов
//   const completedQuizzesCount = currentUser.completedQuizzes.length; // Количество пройденных квизов

//   return (
//     <div>
//       <h1>Добро пожаловать, {currentUser.username}!</h1>
//       <p>Общее количество очков: {currentUser.points || 0}</p>
//       <p>Количество пройденных квизов: {completedQuizzesCount}</p>

//       <button>
//         <Link to="/history">История</Link>
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
    }, 2000);

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

  // Проверка, есть ли текущий пользователь
  if (!currentUser) {
    return <div>Пользователь не найден</div>;
  }

  // Подсчет пройденных квизов
  const completedQuizzesCount = currentUser.completedQuizzes.length; // Количество пройденных квизов

  // Подсчет очков, заработанных в квизах
  const calculateQuizPoints = () => {
    let quizPoints = 0;

    for (const quizId of currentUser.completedQuizzes) {
      // Для каждого завершенного квиза ищем его количество очков
      // Предположим, что вы сохраняете количество очков, полученных за квиз в quiz
      const quiz = fetchQuizById(quizId); // Вам нужно реализовать эту функцию для получения данных о квизах

      if (quiz) {
        const points = quiz.quantityPoints; // Вы можете изменить это в зависимости от вашей логики
        quizPoints += points; // Добавляем очки к общему счету
      }
    }

    return quizPoints;
  };

  const quizPoints = calculateQuizPoints(); // Получаем общее количество очков за квизы

  return (
    <div>
      <h1>Добро пожаловать, {currentUser.username}!</h1>
      <p>Общее количество очков: {currentUser.points || 0}</p>
      <p>Очки, заработанные в квизах: {quizPoints}</p>
      <p>Количество пройденных квизов: {completedQuizzesCount}</p>

      <button>
        <Link to="/history">История</Link>
      </button>
    </div>
  );
};

// Импортируйте или реализуйте функцию для получения квиза по ID
const fetchQuizById = (quizId) => {
  // Это может быть API запрос к серверу для получения данных о квизе
  // Или, если у вас уже есть локальный массив квизов, можете искать по этому массиву
};

export default Main;

