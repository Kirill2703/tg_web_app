import React from 'react';
import { useSelector } from 'react-redux';

const LoadingScreen = () => {
    const username = useSelector((state) => state.user.username);
    return (
      <div className="loading-screen">
        <div>
          <img src="/loading-screen.jpg" alt="Loading" />
          <h2 className="text-loading-screen">Загрузка...</h2>
          {username && <p>Добро пожаловать, {username}!</p>}
        </div>
      </div>
    );
}

export default LoadingScreen;
