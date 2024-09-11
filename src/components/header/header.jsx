import React from 'react';
const Header = () => {
    const tg = window.Telegram.WebApp;

    const onClose = () => {
      tg.close();
    };
    return (
        <div className='header'>
            <button onClick={onClose} className='button'>Close</button>
            <span className='username'>{tg.initDataUnsef?.user?.username }</span>
        </div>
    );
}

export default Header;
