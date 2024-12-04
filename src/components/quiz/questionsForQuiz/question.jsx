
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import fetchAllQuestionsByQuizId from "../../../thunks/questionsThunk";
import ModalOptions from "../questionModal/modalOptions";

const Question = () => {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const loading = useSelector((state) => state.questions.loading);
  const error = useSelector((state) => state.questions.error);
  const [isModalOpen, setIsModalOpen] = useState(false); // Отслеживаем, открыто ли модальное окно
  const currentUser = useSelector((state) => state.user.currentUser);
  const quizes = useSelector((state) => state.quiz.quizes);

  useEffect(() => {
    dispatch(fetchAllQuestionsByQuizId(quizId));
  }, [dispatch, quizId]);

  const handleOpenModal = () => {
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  if (loading) {
    return <div>Загрузка вопросов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const currentQuiz = quizes.find((quiz) => quiz._id === quizId);

  return (
    <div style={{ margin: "0 20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "40px",
        }}
      >
        {currentQuiz ? (
          <h2 className="title-quiz-questions-page">{currentQuiz.title}</h2>
        ) : (
          <h2>Квиз не найден</h2>
        )}
        <button onClick={handleOpenModal} className="btn-start-quiz">
          Начать
        </button>

        <div>
          <p className="facts-quiz">
            Проверь свои знания и набери очки! За каждый правильный ответ —{" "}
            <strong>+5 баллов</strong>. Покажи, на что ты способен, и будь
            лучшим!
          </p>
          <p>Quiz complexity: {quiz.complexity}</p>
          <p>Quantity points for quiz: {quiz.quantityPoints}</p>
          <p>Quantity quiestions in quiz: {quiz.quantityQuestions}</p>
        </div>
      </div>
      {isModalOpen && (
        <ModalOptions onClose={handleCloseModal} chatId={currentUser.chatId} />
      )}
    </div>
  );
};

export default Question;

