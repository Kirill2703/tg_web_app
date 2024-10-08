import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPredictions } from "../../thunks/predictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";

const England = () => {
  const dispatch = useDispatch();

  // Получаем данные из state
  const { predictions, loading, error } = useSelector((state) => state.predictions);

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

  return (
    <div>
      <h1>England Matches</h1>
      <ul>
        {englandPredictions.length > 0 ? (
          englandPredictions.map((prediction) => (
            <li key={prediction._id}>
              <p>
                Матч: {prediction.team1} vs {prediction.team2}
              </p>
              <p>Дата: {new Date(prediction.date).toLocaleDateString()}</p>
              <p>Статус: {prediction.status}</p>
            </li>
          ))
        ) : (
          <p>Нет доступных прогнозов для Англии</p>
        )}
      </ul>
    </div>
  );
};

export default England;