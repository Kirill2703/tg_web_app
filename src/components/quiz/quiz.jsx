import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAllQuizes from "../../thunks/quizThunk";
import { Link } from "react-router-dom";

const Quiz = () => {
  const quizes = useSelector((state) => state.quiz.quizes);
  const currentUser = useSelector((state) => state.user.currentUser);
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

  const completedQuizzes = currentUser?.completedQuizzes || [];

  return (
    <>
      <div style={{ margin: "20px 20px 0 20px" }}>
        <h1 className="header-quizes">Quizzes</h1>
        <div>
          <div className="container-card-quiz">
            {quizes.map((quiz, index) => {
              const isCompleted = completedQuizzes.includes(quiz._id);
              return (
                <Link
                  to={`/quiz/${quiz._id}`}
                  key={quiz._id}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card-quiz"
                    style={{
                      backgroundColor: isCompleted ? "#b34a4a" : "#e6f2f2",
                      animationDelay: `${index * 0.5}s`,
                    }}
                  >
                    <img
                      src={require("../../icons/quiz.svg").default}
                      alt="Quiz"
                      width={40}
                      height={40}
                    />
                    <p className="quiz-title">{quiz.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
