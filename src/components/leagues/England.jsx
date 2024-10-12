import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { createUserPrediction } from "../../thunks/userPredictionThunk";
import fetchAllPredictions from "../../thunks/predictionThunk";
import { fetchUserNameByChatId } from "../../thunks/userThunk";

const England = () => {
  const dispatch = useDispatch();
  const { predictions, loading, error } = useSelector(
    (state) => state.predictions
  );
  const userName = useSelector((state) => state.user.username);
  const userPoints = useSelector((state) => state.user.points); // Предполагаем, что у вас есть очки в состоянии пользователя

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showBetModal, setShowBetModal] = useState(false);
  const [betPoints, setBetPoints] = useState(0);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    if (chatId) {
      dispatch(fetchUserNameByChatId(chatId)); // Получаем пользователя по chatId
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

  // Фильтруем предсказания по стране "England"
  const englandPredictions = predictions.filter(
    (predict) => predict.country === "England"
  );

  const handleTeamClick = (prediction, team) => {
    setSelectedPrediction({ ...prediction, selectedTeam: team });
    setShowTeamModal(true);
  };

  const handleSubmitPrediction = () => {
    if (!userName) {
      console.error("Имя пользователя пустое. Проверьте, загружены ли данные.");
      return;
    }


    dispatch(
      createUserPrediction({
        username: userName,
        predictionId: selectedPrediction._id,
        selectedTeam: selectedPrediction.selectedTeam,
      })
    );

    setShowBetModal(false);
    setShowTeamModal(false);
  };

  return (
    <div>
      <h1>Матчи Англии</h1>
      <ul>
        {englandPredictions.map((prediction) => (
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

      {showTeamModal && (
        <div className="modal">
          <p>
            Вы уверены, что хотите выбрать {selectedPrediction.selectedTeam}?
          </p>
          <input
            type="number"
            value={betPoints}
            onChange={(e) => setBetPoints(Number(e.target.value))}
          />
          <button onClick={() => setShowBetModal(true)}>
            Подтвердить ставку
          </button>
          <button onClick={() => setShowTeamModal(false)}>Отмена</button>
        </div>
      )}

      {showBetModal && (
        <div className="modal">
          <p>
            {selectedPrediction.selectedTeam}.
          </p>
          <button onClick={handleSubmitPrediction}>Сделать ставку</button>
          <button onClick={() => setShowBetModal(false)}>Отмена</button>
        </div>
      )}
    </div>
  );
};

export default England;
