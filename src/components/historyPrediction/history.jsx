import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../../thunks/historyPredictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { fetchAllUserPredictions } from "../../thunks/userPredictionThunk";

const History = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { history, loading, error } = useSelector((state) => state.history);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserHistory(currentUser.username));
      dispatch(fetchAllUserPredictions())
    }
  }, [dispatch, currentUser]);

  const getOutcomeClass = (outcome) => {
    if (outcome === "Win") return "win";
    if (outcome === "Lose") return "lose";
    if (outcome === "Draw") return "draw";
    return "pending";
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h1 className="history-prediction">History prediction</h1>
      {history.length === 0 ? (
        <p className="make-prediction">
          You haven`t prediction. Make your first prediction!
        </p>
      ) : (
        <div className="history-container">
          {history.map((item) => (
            <div
              key={item._id}
              className={`history-item ${getOutcomeClass(item.outcome)}`}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
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
                    <div className="choise-user-history">
                      Your choice: {item.selectedTeam}
                    </div>
                    <div className="result-history-con">
                      Result:
                      {item.result ? item.result : "Match is not finish"}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div>Bet points</div>
                    <div>Total</div>
                  </div>
                </div>
                <div>
                  <span className="result-text">{item.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
