import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserNameByChatId } from "../../thunks/userThunk";
import { IoExitOutline } from "react-icons/io5";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    if (chatId) {
      dispatch(fetchUserNameByChatId);
    }
  }, []);

  const onClose = () => {
    tg.close();
  };
  return (
    <div className="header">
      {/* <button onClick={onClose} className="button">
        Close
      </button> */}
      {currentUser ? (
        <>
          <div className="header-info">
            <h3>Твои очки: {currentUser.points}</h3>
            <h2>{currentUser.username}</h2>
          </div>
        </>
      ) : (
                  <h2 style={{ color: "whitesmoke", fontSize: "16px"}}>Пользователь не найден</h2>
      )}
      <button onClick={onClose} className="button">
        <IoExitOutline />
      </button>
    </div>
  );
};

export default Header;
