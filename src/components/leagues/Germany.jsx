import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPredictions } from '../../thunks/predictionThunk';
import LoadingScreen from '../loadingScreen/loadingScreen';

const Germany = () => {
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

    const germanyPredictions = predictions.filter(
      (predict) => predict.country == "Germany"
    );
    return (
      <div>
        <h1>Germany matches</h1>
        <ul>
          {germanyPredictions.length > 0 ? (
            germanyPredictions.map((prediction) => (
              <li key={prediction._id}>
                <p>
                  Матч: {prediction.team1} vs {prediction.team2}
                </p>
                <p>Дата: {new Date(prediction.date).toLocaleDateString()}</p>
                <p>Статус: {prediction.status}</p>
              </li>
            ))
          ) : (
            <p>Нет доступных прогнозов для Германии</p>
          )}
        </ul>
      </div>
    );
}

export default Germany;
