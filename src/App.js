import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsers, fetchUserNameByChatId } from "./thunks/userThunk"; // Подключаем thunks
// import LoadingScreen from "./components/loadingScreen/loadingScreen";
// import Header from "./components/header/header";
// import { Outlet } from "react-router-dom";
import Main from "./components/main/main";

const tg = window.Telegram.WebApp;

function App() {
  // const dispatch = useDispatch();
  // const userName = useSelector((state) => state.user.username); // Получаем имя пользователя из Redux
  // const users = useSelector((state) => state.user.user || []); // Получаем список пользователей
  // const loading = useSelector((state) => state.user.loading); // Получаем состояние загрузки
  useEffect(() => {

    tg.expand();
  
    tg.ready();

    // // Загрузка всех пользователей
    // dispatch(fetchAllUsers());
  }, []);

  // if (loading) {
  //   return <LoadingScreen />; 
  // }

  return (
    <div>
      <Main />
    </div>
  );
}

export default App;

