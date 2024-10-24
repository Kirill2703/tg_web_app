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
      {currentUser ? (
        <>
          {/* <div>Твои очки: {currentUser.points}</div> */}
          <div className="header-username">{currentUser.username}</div>
        </>
      ) : (
        <p
          style={{
            color: "whitesmoke",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "ActayWide",
          }}
        >
          Пользователь не найден
        </p>
      )}
      <button onClick={onClose} className="button-exit-header">
        <IoExitOutline />
      </button>
    </div>
  );
};

export default Header;
