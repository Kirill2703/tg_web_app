import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAllPredictions from "../../thunks/predictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { fetchUserNameByChatId } from "../../thunks/userThunk";
import { createUserPrediction } from "../../thunks/userPredictionThunk";

const Italy = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { predictions, loading, error } = useSelector(
    (state) => state.predictions
  );
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [betPoints, setBetPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    if (chatId) {
      dispatch(fetchUserNameByChatId(chatId));
    }
  }, [dispatch, chatId]);

  useEffect(() => {
    dispatch(fetchAllPredictions());
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const italyPredictions = predictions.filter(
    (predict) => predict.country == "Italy"
  );

  const handleTeamClick = (prediction, team) => {
    setSelectedPrediction({ ...prediction, selectedTeam: team });
    setShowModal(true);
  };

  const handleSubmitPrediction = async () => {
    if (
      !currentUser ||
      !currentUser.username ||
      !selectedPrediction ||
      betPoints <= 0
    ) {
      return;
    }

    const resultAction = await dispatch(
      createUserPrediction({
        username: currentUser.username,
        predictionId: selectedPrediction._id,
        selectedTeam: selectedPrediction.selectedTeam,
        betPoints,
      })
    );

    if (createUserPrediction.fulfilled.match(resultAction)) {
      const { updatedUser } = resultAction.payload;
      if (updatedUser) {
        dispatch(fetchUserNameByChatId(currentUser.chatId));
      }
    }

    setShowModal(false);
  };
  return (
    <div>
      <h1>Italy matches</h1>
      {currentUser ? (
        <div>Текущий пользователь: {currentUser.username}</div>
      ) : (
        <div>Пользователь не загружен.</div>
      )}
      <ul>
        {italyPredictions.map((prediction) => (
          <li key={prediction._id}>
            <span onClick={() => handleTeamClick(prediction, prediction.team1)}>
              {prediction.team1}
            </span>
            vs
            <span onClick={() => handleTeamClick(prediction, prediction.team2)}>
              {prediction.team2}
            </span>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <p>
            Вы уверены, что хотите выбрать {selectedPrediction.selectedTeam} и
            поставить {betPoints} очков?
          </p>
          <input
            type="number"
            value={betPoints}
            onChange={(e) => {
              setBetPoints(Number(e.target.value));
            }}
            placeholder="Введите количество очков"
          />
          <button onClick={handleSubmitPrediction}>Да</button>
          <button onClick={() => setShowModal(false)}>Нет</button>
        </div>
      )}
    </div>
  );
};

export default Italy;
