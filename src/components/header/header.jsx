import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserNameByChatId } from "../../thunks/userThunk";
import { ImExit } from "react-icons/im";
import { RiUserFill } from "react-icons/ri";

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
      <div className="header-username">
        <span>Footwise</span>
      </div>
      <button onClick={onClose} className="button-exit-header">
        <ImExit />
      </button>
    </div>
  );
};

export default Header;

// {
//   currentUser ? (
//     <>
//       {/* <div>Твои очки: {currentUser.points}</div> */}

//       <div className="header-username">
//         <RiUserFill />
//         <span
//           style={{
//             paddingLeft: "8px",
//           }}
//         >
//           Footwise
//         </span>
//       </div>
//     </>
//   ) : (
//     <p
//       style={{
//         color: "whitesmoke",
//         fontSize: "16px",
//         display: "flex",
//         justifyContent: "center",
//         fontFamily: "ActayWide",
//       }}
//     >
//       <RiUserFill />
//       Пользователь не найден
//     </p>
//   );
// }
