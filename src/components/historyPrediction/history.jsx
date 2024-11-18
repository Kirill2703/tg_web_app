// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserHistory } from "../../thunks/historyPredictionThunk";
// import LoadingScreen from "../loadingScreen/loadingScreen";
// import { fetchAllUserPredictions } from "../../thunks/userPredictionThunk";

// const History = () => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.user.currentUser);
//   const { history, loading, error } = useSelector((state) => state.history);
//   const userPredict = useSelector(
//     (state) => state.userPredictions.userPredictions
//   );

//   useEffect(() => {
//     if (currentUser) {
//       dispatch(fetchUserHistory(currentUser.username));
//       dispatch(fetchAllUserPredictions());
//     }
//   }, [dispatch, currentUser]);

//   const getOutcomeClass = (outcome) => {
//     if (outcome === "Win") return "win";
//     if (outcome === "Lose") return "lose";
//     if (outcome === "Draw") return "draw";
//     return "pending";
//   };

//   if (loading) return <LoadingScreen />;
//   if (error) return <div>Ошибка: {error}</div>;

//   return (
//     <div>
//       <h1 className="history-prediction">History prediction</h1>
//       {history.length === 0 ? (
//         <p className="make-prediction">
//           You haven`t prediction. Make your first prediction!
//         </p>
//       ) : (
//         <div className="history-container">
//           {history.map((item) => (
//             <div
//               key={item._id}
//               className={`history-item ${getOutcomeClass(item.outcome)}`}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "6px",
//                   width: "100%",
//                 }}
//               >
//                 <p className="history-teams">{item.match}</p>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: "8px 8px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "6px",
//                     }}
//                   >
//                     <div className="choise-user-history">
//                       Your choice: {item.selectedTeam}
//                     </div>
//                     <div className="result-history-con">
//                       Result:
//                       {item.result ? item.result : "Match is not finish"}
//                     </div>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "6px",
//                     }}
//                   >
//                     <div className="bet-points-history">
//                       Bet points: {userPredict.betPoints}
//                     </div>
//                     <div className="total-points-history">
//                       Total: {userPredict.betPoints * 2}
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div>
//                   <span className="result-text">{item.outcome}</span>
//                 </div> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// };

// export default History;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserHistory } from "../../thunks/historyPredictionThunk";
// import { fetchAllUserPredictions } from "../../thunks/userPredictionThunk";
// import fetchAllPredictions from "../../thunks/predictionThunk"

// import LoadingScreen from "../loadingScreen/loadingScreen";

// const History = () => {
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.user.currentUser);

//   // Получаем данные без loading и error
//   const history = useSelector((state) => state.history.history);
//   const predictions = useSelector((state) => state.predictions.predictions);
//   const userPredictions = useSelector(
//     (state) => state.userPrediction.userPredictions
//   );

//   useEffect(() => {
//     if (currentUser) {
//       dispatch(fetchUserHistory(currentUser.username));
//       dispatch(fetchAllUserPredictions());
//       dispatch(fetchAllPredictions());
//     }
//   }, [dispatch, currentUser]);

//   const getOutcomeClass = (outcome) => {
//     if (outcome === "Win") return "win";
//     if (outcome === "Lose") return "lose";
//     if (outcome === "Draw") return "draw";
//     return "pending";
//   };
//   if (!history || !predictions || !userPredictions) {
//     return <LoadingScreen />;
//   }

//   return (
//     <div className="history-container">
//       <h1 className="history-prediction">History Prediction</h1>
//       {history.length === 0 ? (
//         <p className="make-prediction">
//           You haven’t made any predictions yet. Make your first prediction!
//         </p>
//       ) : (
//         history.map((item) => {
//           const prediction = predictions.find(
//             (pred) => pred._id === item.predictionId
//           );
//           const userPrediction = userPredictions.find(
//             (pred) => pred._id === item.predictionId
//           );

//           return (
//             <div
//               key={item._id}
//               className={`history-item ${getOutcomeClass(item.outcome)}`}
//             >
//               <div className="history-item-details">
//                 <p className="history-teams">{item.match}</p>
//                 <div className="history-item-content">
//                   <div className="choice-user-history">
//                     Your choice: {item.selectedTeam}
//                   </div>
//                   <div className="result-history-con">
//                     Result: {item.result || "Match is not finished"}
//                   </div>
//                   {userPrediction && (
//                     <div className="prediction-info">
//                       <div className="bet-points-history">
//                         Bet points: {userPrediction.betPoints}
//                       </div>
//                       <div className="total-points-history">
//                         Availabel Total: {userPrediction.betPoints * 2}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default History;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../../thunks/historyPredictionThunk";
import { fetchAllUserPredictions } from "../../thunks/userPredictionThunk";
import fetchAllPredictions from "../../thunks/predictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";

const History = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useSelector((state) => state.history);
  const {
    predictions,
    loading: predictionsLoading,
    error: predictionsError,
  } = useSelector((state) => state.predictions);
  const {
    userPredictions,
    loading: userPredictionsLoading,
    error: userPredictionsError,
  } = useSelector((state) => state.userPrediction);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserHistory(currentUser.username));
      dispatch(fetchAllUserPredictions());
      dispatch(fetchAllPredictions());
    }
  }, [dispatch, currentUser]);

  const getOutcomeClass = (outcome) => {
    if (outcome === "Win") return "win";
    if (outcome === "Lose") return "lose";
    if (outcome === "Draw") return "draw";
    return "pending";
  };

  if (historyLoading || predictionsLoading || userPredictionsLoading) {
    return <LoadingScreen />;
  }

  if (historyError || predictionsError || userPredictionsError) {
    return (
      <div>
        Error: {historyError || predictionsError || userPredictionsError}
      </div>
    );
  }

  return (
    <div className="history-container">
      <h1 className="history-prediction">History Prediction</h1>
      {history.length === 0 ? (
        <p className="make-prediction">
          You haven’t made any predictions yet. Make your first prediction!
        </p>
      ) : (
        history.map((item) => {
          // Find corresponding prediction from all predictions
          const prediction = predictions.find(
            (pred) => pred._id === item.predictionId
          );
          const userPrediction = userPredictions.find(
            (pred) => pred._id === item.predictionId
          );

          return (
            <div
              key={item._id}
              className={`history-item ${getOutcomeClass(item.outcome)}`}
            >
              <div className="history-item-details">
                <p className="history-teams">{item.match}</p>
                <div className="history-item-content">
                  <div className="choice-user-history">
                    Your choice: {item.selectedTeam}
                  </div>
                  <div className="result-history-con">
                    Result: {item.result || "Match is not finished"}
                  </div>
                  {userPrediction ? (
                    <div className="prediction-info">
                      <div className="bet-points-history">
                        Bet points: {userPrediction.betPoints}
                      </div>
                      <div className="total-points-history">
                        Total: {userPrediction.betPoints * 2}
                      </div>
                    </div>
                  ) : (
                    <div>No prediction data found for this match</div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default History;

