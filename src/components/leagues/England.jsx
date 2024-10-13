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
  useEffect(() => {
    console.log("Текущий пользователь:", currentUser); // Лог текущего пользователя
  }, [currentUser]);

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
    if (!currentUser || !currentUser.username) {
      console.error(
        "Пользователь не загружен или username отсутствует. Проверьте данные."
      );
      return;
    }

    if (betPoints <= 0) {
      console.error("Количество очков должно быть больше 0.");
      return;
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
      console.log("Ответ от API:", response.payload); // Логируем полный ответ от API
      console.log(
        "Обновленные очки пользователя:",
        response.payload.updatedUser.points
      );
      dispatch(updateUserPoints(response.payload.updatedUser.points));

      // Проверка состояния после обновления
      const updatedUser = useSelector((state) => state.user.currentUser);
      console.log("Текущий пользователь после обновления:", updatedUser); // Проверка обновленного пользователя
    } else {
      if (response.error) {
        console.error("Ошибка при создании прогноза:", response.error.message);
      } else {
        console.error("Неизвестная ошибка при создании прогноза");
      }
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
