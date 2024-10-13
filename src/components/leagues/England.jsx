import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { createUserPrediction } from "../../thunks/userPredictionThunk";
import fetchAllPredictions from "../../thunks/predictionThunk";
import { fetchUserNameByChatId } from "../../thunks/userThunk";

const England = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const { predictions, loading, error } = useSelector(
    (state) => state.predictions
  );

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
    // Проверка на наличие currentUser и его свойств
    if (
      !currentUser ||
      !currentUser.username ||
      !selectedPrediction ||
      betPoints <= 0
    ) {
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
      const { updatedUser } = resultAction.payload; // Изменено на деструктуризацию
      if (updatedUser) {
        console.log("Обновленные очки пользователя:", updatedUser.points);
        // Обновите состояние приложения или сделайте что-то еще с updatedUser
        dispatch(fetchUserNameByChatId(currentUser.chatId)); // Обновите пользователя, если нужно
      } else {
        console.error("Обновленные данные пользователя не найдены");
      }
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
      {/* Добавлена проверка на наличие currentUser перед доступом к username */}
      {currentUser ? (
        <div>Текущий пользователь: {currentUser.username}</div>
      ) : (
        <div>Пользователь не загружен.</div>
      )}
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
