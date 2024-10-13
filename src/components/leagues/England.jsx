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
  const currentUser = useSelector((state) => state.user.currentUser);

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [betPoints, setBetPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

 useEffect(() => {
   if (chatId) {
     console.log("Chat ID:", chatId); // Логируем chatId
     dispatch(fetchUserNameByChatId(chatId)); // Получаем пользователя по chatId
   } else {
     console.error("Chat ID is empty");
   }
 }, [dispatch, chatId]);

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
    (predict) => predict.country === "England"
  );

  const handleTeamClick = (prediction, team) => {
    setSelectedPrediction({ ...prediction, selectedTeam: team });
    setShowModal(true);
  };

  const handleSubmitPrediction = async () => {
    if (!currentUser || betPoints <= 0) {
      console.error(
        "Имя пользователя пустое или некорректное количество очков."
      );
      return;
    }

    // Делаем асинхронный вызов к thunk
    const resultAction = await dispatch(
      createUserPrediction({
        username: currentUser.username,
        predictionId: selectedPrediction._id,
        selectedTeam: selectedPrediction.selectedTeam,
        betPoints,
      })
    );

    // Проверяем, успешно ли прошел вызов и есть ли полезная нагрузка в результате
    if (createUserPrediction.fulfilled.match(resultAction)) {
      const updatedUser = resultAction.payload.updatedUser; // Здесь предполагается, что вы обновляете пользователя на сервере
      console.log("Обновленные очки пользователя:", updatedUser.points);
      dispatch(updateUserPoints(updatedUser.points)); // Обновляем очки на фронтенде
    } else {
      console.error(
        "Ошибка при создании прогноза:",
        resultAction.error.message
      );
    }

    setShowModal(false); // Закрыть окно после отправки прогноза
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
