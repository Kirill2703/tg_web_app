import React from "react";
import { useSelector } from "react-redux";

const LoadingScreen = () => {
  const username = useSelector((state) => state.user.username); 
  const loading = useSelector((state) => state.user.loading);

  return (
    <div className="loading-screen">
      <div>
        <img src="/loading-screen.jpg" alt="Loading" />
        <h2 className="text-loading-screen">Загрузка...</h2>
        {loading ? (
          <p>Пожалуйста, подождите...</p>
        ) : (
          <p>Добро пожаловать, {username}!</p> // Выводим имя пользователя
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
