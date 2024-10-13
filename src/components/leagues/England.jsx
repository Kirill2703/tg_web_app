import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { createUserPrediction } from "../../thunks/userPredictionThunk";
import fetchAllPredictions from "../../thunks/predictionThunk";
import { fetchUserNameByChatId } from "../../thunks/userThunk";
import { updateUserPoints } from "../../slices/userSlice";

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
    console.log("Запускаем useEffect для загрузки пользователя");
    if (chatId) {
      console.log("Chat ID:", chatId);
      dispatch(fetchUserNameByChatId(chatId))
        .then((result) => {
          console.log("Результат загрузки пользователя:", result);
        })
        .catch((err) => {
          console.error("Ошибка при загрузке пользователя:", err);
        });
    } else {
      console.error("Chat ID is empty");
    }
  }, [dispatch, chatId]);

  useEffect(() => {
    console.log("Запускаем useEffect для загрузки предсказаний");
    dispatch(fetchAllPredictions())
      .then((result) => {
        console.log("Результат загрузки предсказаний:", result);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке предсказаний:", err);
      });
  }, [dispatch]);

  if (loading) {
    console.log("Загрузка...");
    return <LoadingScreen />;
  }

  if (error) {
    console.error("Ошибка:", error);
    return <div>Ошибка: {error}</div>;
  }

  const englandPredictions = predictions.filter(
    (predict) => predict.country === "England"
  );

  const handleTeamClick = (prediction, team) => {
    console.log("Команда выбрана:", team);
    setSelectedPrediction({ ...prediction, selectedTeam: team });
    setShowModal(true);
  };

  const handleSubmitPrediction = async () => {
    console.log("Текущий пользователь:", currentUser);
    if (!currentUser) {
      console.error("Пользователь не загружен. Проверьте данные.");
      return;
    }
    if (betPoints <= 0) {
      console.error("Количество очков должно быть больше 0.");
      return;
    }

    console.log("Отправка прогноза с данными:", {
      username: currentUser.username,
      predictionId: selectedPrediction?._id,
      selectedTeam: selectedPrediction?.selectedTeam,
      betPoints,
    });

    const response = await dispatch(
      createUserPrediction({
        username: currentUser.username,
        predictionId: selectedPrediction?._id,
        selectedTeam: selectedPrediction?.selectedTeam,
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
            onChange={(e) => {
              console.log("Количество очков изменено:", e.target.value);
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

export default England;
