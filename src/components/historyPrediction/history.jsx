import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../../thunks/historyPredictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { fetchAllUserPredictions } from "../../thunks/userPredictionThunk";
import fetchAllPredictions from "../../thunks/predictionThunk";
import { Pagination } from "antd";

const pageSize = 4;

const History = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useSelector((state) => state.history);
  const { predictions, loading, error } = useSelector(
    (state) => state.predictions
  );
  const {
    userPredictions = [],
    loading: predictionsLoading,
    error: predictionsError,
  } = useSelector((state) => state.userPrediction);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserHistory(currentUser.username));
      dispatch(fetchAllUserPredictions());
      dispatch(fetchAllPredictions());
    }
  }, [dispatch, currentUser]);
  console.log(userPredictions);

  const getOutcomeClass = (outcome) => {
    console.log(outcome);
    if (outcome === "Win") return "win";
    if (outcome === "Lose") return "lose";
    if (outcome === "draw") return "draw";
    return "pending";
  };

  const getOutcomeText = (outcome, selectedTeam, result, betPoints) => {
    if (result) {
      const [team1Goals, team2Goals] = result.split("-").map(Number);

      if (outcome === "Win") {
        return `Victory: ${betPoints * 2}`;
      } else if (outcome === "draw") {
        return `Refund: ${betPoints}`;
      } else if (outcome === "Lose") {
        return `Не в этот раз: 0`;
      }
    } else {
      return `Возможная награда: ${betPoints * 2}`;
    }
  };

  const sortedHistory = [...history].reverse();

  const currentItems = sortedHistory.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (historyLoading || predictionsLoading || loading) return <LoadingScreen />;
  if (historyError)
    return <div>Ошибка при загрузке истории: {historyError}</div>;
  if (predictionsError)
    return <div>Ошибка при загрузке предсказаний: {predictionsError}</div>;

  return (
    <div>
      <h1 className="history-prediction">История</h1>
      {history.length === 0 ? (
        <p className="make-prediction">
          У тебя ещё нет прогнозов. Сделай первый прогноз!
        </p>
      ) : (
        <div className="history-container">
          {currentItems.map((item) => {
            const prediction = userPredictions.find((userPrediction) => {
              return predictions.some(
                (pred) => userPrediction.predictionId === item.predictionId
              );
            });
            const result = item.result;
            const betPoints = prediction ? prediction.betPoints : 0;

            return (
              <div
                key={item._id}
                className={`history-item ${getOutcomeClass(item.outcome)}`}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    width: "100%",
                  }}
                >
                  <p className="history-teams">{item.match}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: "8px 8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <div className="choice-user-history">
                        Твой выбор: {item.selectedTeam}
                      </div>
                      <div className="result-history-con">
                        Результат: {item.result || "Match is not finished"}
                      </div>
                    </div>
                    {prediction ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                        }}
                      >
                        <div className="bet-points-history">
                          Поставлено: {prediction.betPoints}
                        </div>
                        <div className="total-points-history">
                          {getOutcomeText(
                            item.outcome,
                            item.selectedTeam,
                            result,
                            betPoints
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>Данные для этого прогноза не найдены</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Pagination
        align="center"
        style={{ marginTop: "20px", textAlign: "center" }}
        current={currentPage}
        total={sortedHistory.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default History;
