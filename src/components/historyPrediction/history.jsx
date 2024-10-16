import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../../thunks/historyPredictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { fetchUserNameByChatId } from "../../thunks/userThunk";

const History = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [history, setHistory] = useState([]);
  const { history, loading, error } = useSelector((state) => state.history);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserHistory(currentUser.username));
    }
  }, [dispatch, currentUser]);

  if (loading) return <LoadingScreen />;
  if (error) return <div>Ошибка: {error}</div>;

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
