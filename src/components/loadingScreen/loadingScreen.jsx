import React from 'react';

const LoadingScreen = () => {
    return (
      <div className="loading-screen">
        <div>
            <img src="/loading-screen.jpeg" alt="Loading" />
            <h2 className='text-loading-screen'>Загрузка...</h2>
        </div>
      </div>
    );
}

export default LoadingScreen;
