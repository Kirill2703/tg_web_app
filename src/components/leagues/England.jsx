import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { createUserPrediction } from "../../thunks/userPredictionThunk"; // Убедитесь, что вы правильно импортируете
import fetchAllPredictions from "../../thunks/predictionThunk";
import { fetchUserNameByChatId } from "../../thunks/userThunk";
import { updateUserPoints } from "../../slices/userSlice"; // Импортируем из userSlice

const England = () => {
  const dispatch = useDispatch();
  const { predictions, loading, error } = useSelector(
    (state) => state.predictions
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [betPoints, setBetPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    if (chatId) {
      console.log("Chat ID:", chatId);
      dispatch(fetchUserNameByChatId(chatId));
    } else {
      console.error("Chat ID is empty");
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

  const englandPredictions = predictions.filter(
    (predict) => predict.country === "England"
  );

  const handleTeamClick = (prediction, team) => {
    setSelectedPrediction({ ...prediction, selectedTeam: team });
    setShowModal(true);
  };

  const handleSubmitPrediction = async () => {
    // Проверка на наличие currentUser и betPoints
    if (!currentUser) {
      console.error("Пользователь не загружен. Проверьте данные.");
      return; // Прекращаем выполнение, если пользователь не загружен
    }
    if (betPoints <= 0) {
      console.error("Количество очков должно быть больше 0.");
      return; // Прекращаем выполнение, если очки меньше или равны 0
    }

    const response = await dispatch(
      createUserPrediction({
        username: currentUser.username,
        predictionId: selectedPrediction._id,
        selectedTeam: selectedPrediction.selectedTeam,
        betPoints,
      })
    );

    if (createUserPrediction.fulfilled.match(response)) {
      console.log(
        "Обновленные очки пользователя:",
        response.payload.updatedUser.points
      );
      dispatch(updateUserPoints(response.payload.updatedUser.points));
    } else {
      console.error("Ошибка при создании прогноза:", response.error.message);
    }

    setShowModal(false);
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

      {showModal && (
        <div className="modal">
          <p>
            Вы уверены, что хотите выбрать {selectedPrediction.selectedTeam} и
            поставить {betPoints} очков?
          </p>
          <input
            type="number"
            value={betPoints}
            onChange={(e) => setBetPoints(Number(e.target.value))}
            placeholder="Введите количество очков"
          />
          <button onClick={handleSubmitPrediction}>Да</button>
          <button onClick={() => setShowModal(false)}>Нет</button>
        </div>
      )}
    </div>
  );
};

export default England;
