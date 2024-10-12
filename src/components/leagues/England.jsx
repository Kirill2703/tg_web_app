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

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [points, setPoints] = useState(0); // Новое состояние для очков

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    if (chatId) {
      dispatch(fetchUserNameByChatId(chatId));
    }
  }, [dispatch, chatId]);

  useEffect(() => {
    try {
      dispatch(fetchAllPredictions());
    } catch (error) {
      console.error("Ошибка при загрузке предсказаний:", error);
    }
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const englandPredictions = predictions.filter(
    (predict) => predict.country === "England"
  );

  const handleTeamClick = (prediction, team) => {
    setSelectedPrediction({ ...prediction, selectedTeam: team });
    setShowModal(true);
  };

  const handleSubmitPrediction = () => {
    if (!userName) {
      console.error("Имя пользователя пустое. Проверьте, загружены ли данные.");
      return;
    }

    console.log("Отправка данных:", {
      userName,
      predictionId: selectedPrediction._id,
      selectedTeam: selectedPrediction.selectedTeam,
      points, // Добавляем количество очков в лог
    });

    dispatch(
      createUserPrediction({
        username: userName,
        predictionId: selectedPrediction._id,
        selectedTeam: selectedPrediction.selectedTeam,
        points, // Передаем количество очков в экшене
      })
    );
    setShowModal(false);
  };

  return (
    <div>
      <h1>England Matches</h1>
      <ul>
        {englandPredictions.map((prediction) => (
          <li key={prediction._id}>
            <span onClick={() => handleTeamClick(prediction, prediction.team1)}>
              {prediction.team1}
            </span>{" "}
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
            Вы уверены, что хотите выбрать {selectedPrediction.selectedTeam}?
          </p>
          <label>
            Введите количество очков:
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)} // Обновляем состояние очков
              min="0"
            />
          </label>
          <button onClick={handleSubmitPrediction}>Да</button>
          <button onClick={() => setShowModal(false)}>Нет</button>
        </div>
      )}
    </div>
  );
};

export default England;
