import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPredictions } from '../../thunks/predictionThunk';
import LoadingScreen from '../loadingScreen/loadingScreen';

const Spain = () => {
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

    const spainPredictions = predictions.filter(
      (predict) => predict.country == "Spain"
    );
    return (
      <div>
        <h1>Spain matches</h1>
        <ul>
          {spainPredictions.length > 0 ? (
            spainPredictions.map((prediction) => (
              <li key={prediction._id}>
                <p>
                  Матч: {prediction.team1} vs {prediction.team2}
                </p>
                <p>Дата: {new Date(prediction.date).toLocaleDateString()}</p>
                <p>Статус: {prediction.status}</p>
              </li>
            ))
          ) : (
            <p>Нет доступных прогнозов для Испании</p>
          )}
        </ul>
      </div>
    );
}

export default Spain;
