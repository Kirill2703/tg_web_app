import React from "react";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div>
        <img src="/loading-screen.jpg" alt="Loading" />
        <h2 className="text-loading-screen">Загрузка...</h2>
        <p className="loading-text-secondary">
          Ты готов принять вызов? Самые крутые награды ждут только лучших! 🏅🎮
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
