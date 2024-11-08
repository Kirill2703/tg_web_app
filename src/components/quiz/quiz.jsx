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
    <>
      <div style={{ margin: "0 20px" }}>
        <h1 className="header-quizes">Квизы</h1>
        <div className="container-card-quiz">
          {quizes.map((quiz, index) => (
            <Link
              to={`/quiz/${quiz._id}`}
              key={quiz._id}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card-quiz"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <img
                  src={require("../../icons/england.svg").default}
                  alt="England"
                  width={40}
                  height={40}
                />
                <p className="quiz-title">{quiz.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quiz;
