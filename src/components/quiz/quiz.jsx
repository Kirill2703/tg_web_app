import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAllQuizes from "../../thunks/quizThunk";
import { Link } from "react-router-dom";

const Quiz = () => {
  const quizes = useSelector((state) => state.quiz.quizes);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.quiz.loading);
  const error = useSelector((state) => state.quiz.error);

  useEffect(() => {
    dispatch(fetchAllQuizes());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка квизов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

    return (
      <div>
        <h1>Квизы</h1>
        <ul>
          {quizes.map((quiz) => (
            <li key={quiz._id}>
              <Link to={`/quiz/${quiz._id}`}>{quiz.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default Quiz;
