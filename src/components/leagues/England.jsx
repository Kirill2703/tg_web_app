import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPredictions } from "../../thunks/predictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { fetchAllUserPredictions } from "../../thunks/userPredictionThunk";

const England = () => {
  const dispatch = useDispatch();
  // Получаем данные из state
  const { predictions, loading, error } = useSelector((state) => state.predictions);
  const userId = useSelector((state) => state.user.id);

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Загружаем предсказания при монтировании компонента
  useEffect(() => {
    dispatch(fetchAllPredictions());
  }, [dispatch]);

  // Проверка на загрузку и ошибки
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  // Фильтруем предсказания по стране "England"
  const englandPredictions = predictions.filter(
    (predict) => predict.country == "England"
  );

  const handleTeamClick = (prediction, team) => {
    setSelectedPrediction({ ...prediction, selectedTeam: team });
    setShowModal(true);
  };

  const handleSubmitPrediction = () => {
    dispatch(
      fetchAllUserPredictions({
        userId,
        prediction: selectedPrediction._id,
        selectedTeam: selectedPrediction.selectedTeam,
      })
    );
    setShowModal(false); // Закрыть окно после отправки прогноза
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
          <button onClick={handleSubmitPrediction}>Да</button>
          <button onClick={() => setShowModal(false)}>Нет</button>
        </div>
      )}
    </div>
  );
};

export default England;