import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPredictions } from '../../thunks/predictionThunk';
import LoadingScreen from '../loadingScreen/loadingScreen';

const Italy = () => {
    const dispatch = useDispatch();

    const { predictions, loading, error } = useSelector(
      (state) => state.predictions
    );

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
    return (
      <div>
        <h1>Italy matches</h1>
        <ul>
          {italyPredictions.length > 0 ? (
            italyPredictions.map((prediction) => (
              <li key={prediction._id}>
                <p>
                  Матч: {prediction.team1} vs {prediction.team2}
                </p>
                <p>Дата: {new Date(prediction.date).toLocaleDateString()}</p>
                <p>Статус: {prediction.status}</p>
              </li>
            ))
          ) : (
            <p>Нет доступных прогнозов для Италии</p>
          )}
        </ul>
      </div>
    );
}

export default Italy;
