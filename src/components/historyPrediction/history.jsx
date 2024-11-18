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


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../../thunks/historyPredictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { fetchAllUserPredictions } from "../../thunks/userPredictionThunk";

const History = () => {
  const dispatch = useDispatch();

  // Получение данных из Redux
  const currentUser = useSelector((state) => state.user.currentUser);
  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useSelector((state) => state.history);
  const {
    userPredictions = [],
    loading: predictionsLoading,
    error: predictionsError,
  } = useSelector((state) => state.userPrediction);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserHistory(currentUser.username));
      dispatch(fetchAllUserPredictions());
    }
  }, [dispatch, currentUser]);

  // Функция для определения CSS-класса на основе результата
  const getOutcomeClass = (outcome) => {
    if (outcome === "Win") return "win";
    if (outcome === "Lose") return "lose";
    if (outcome === "Draw") return "draw";
    return "pending";
  };
  

  // Состояние загрузки или ошибки
  if (historyLoading || predictionsLoading) return <LoadingScreen />;
  if (historyError)
    return <div>Ошибка при загрузке истории: {historyError}</div>;
  if (predictionsError)
    return <div>Ошибка при загрузке предсказаний: {predictionsError}</div>;

  // Отображение истории предсказаний
  
  history.map((item) => {
    // Добавляем console.log для диагностики
     console.log(
       "Checking match:",
       item._id,
       "with predictions:",
       userPredictions
     );

     // Найдем соответствующее предсказание для текущего элемента истории
     const prediction = userPredictions.find((pred) => {
       console.log("Checking match:", item._id, "with prediction:", pred._id);
       return pred._id === item.predictionId;
     });
  });
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
              Your choice: {item.selectedTeam}
            </div>
            <div className="result-history-con">
              Result: {item.result || "Match is not finished"}
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
                Bet points: {prediction.betPoints}
              </div>
              <div className="total-points-history">
                Total: {prediction.betPoints * 2}
              </div>
            </div>
          ) : (
            <div>No prediction data found for this match</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
