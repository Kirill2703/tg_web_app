import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../../thunks/historyPredictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { fetchUserNameByChatId } from "../../thunks/userThunk";

const History = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    if (chatId) {
      dispatch(fetchUserNameByChatId);
    }
  }, []);

  //   useEffect(() => {
  //     const fetchHistory = async () => {
  //       if (currentUser) {
  //         setLoading(true);
  //         try {
  //           const result = await dispatch(fetchUserHistory(currentUser.username));
  //           if (fetchUserHistory.fulfilled.match(result)) {
  //             setHistory(result.payload);
  //           } else {
  //             setError(result.error.message);
  //           }
  //         } catch (err) {
  //           setError(err.message);
  //         } finally {
  //           setLoading(false); // Убедитесь, что это всегда вызывается
  //         }
  //       } else {
  //         setLoading(false); // Если текущего пользователя нет, завершите загрузку
  //       }

  //         fetchHistory()
  //     };
  //   }, [dispatch, currentUser]);

  // if (loading) return <LoadingScreen />
  // if (error) return <div>ERROR</div>

  return (
    <div>
      {currentUser.username}
      <h1>История прогнозов</h1>
      {history.length === 0 ? (
        <p>У вас ещё не было прогнозов</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item._id}>
              <p>
                {item.match} - Твой прогноз: {item.selectedTeam} | Результат:{" "}
                {item.result}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
