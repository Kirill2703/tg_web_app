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
            <p>Твои очки: {currentUser.points}</p>
            <p>{currentUser.username}</p>
          </div>
        </>
      ) : (
        <p
          style={{
            color: "whitesmoke",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Пользователь не найден
        </p>
      )}
      <button onClick={onClose} className="button">
        <IoExitOutline />
      </button>
    </div>
  );
};

export default Header;
