// src/components/LoadingScreen.js

import React from "react";
import { useSelector } from "react-redux"; // Импортируем useSelector

const LoadingScreen = () => {
  // Получаем имя пользователя из состояния
  const username = useSelector((state) => state.user.username);

  return (
    <div className="loading-screen">
      <div>
        <img src="/loading-screen.jpg" alt="Loading" />
        <h2 className="text-loading-screen">
          Загрузка{username && `, ${username}`}...{" "}
          {/* Добавляем имя пользователя */}
        </h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
