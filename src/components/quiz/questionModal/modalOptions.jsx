import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { updateUserPointsQuiz } from "../../../thunks/userThunk";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ModalOptions = ({ onClose, chatId }) => {
  const questions = useSelector((state) => state.questions.questions);
  const dispatch = useDispatch();

  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  ); // Состояние для всех ответов
  const [isAnswered, setIsAnswered] = useState(
    Array(questions.length).fill(false)
  ); // Состояние для отслеживания ответов
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false); // Новое состояние для отслеживания завершения квиза

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
  };

  useEffect(() => {
    const checkIfQuizCompleted = async () => {
      if (!chatId || questions.length === 0) return;

      try {
        const response = await fetch(
          `https://footwise.onrender.com/user/${chatId}`
        );
        if (response.ok) {
          const data = await response.json();
          const userCompletedQuizzes = data.user?.completedQuizzes || [];
          const quizId = questions[0].quizId;

          // Установка quizCompleted в true, если квиз уже пройден
          if (userCompletedQuizzes.includes(quizId)) {
            setQuizCompleted(true);
          }
        } else {
          console.error("Ошибка загрузки данных пользователя.");
        }
      } catch (error) {
        console.error("Ошибка при проверке завершения квиза:", error);
      }
    };

    checkIfQuizCompleted();
  }, [chatId, questions]);

  const handleAnswerSelect = (index, answer) => {
    if (isAnswered[index]) return; // Если на вопрос уже ответили, не обрабатываем клик

    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer; // Устанавливаем ответ на определённый вопрос
    setSelectedAnswers(newAnswers);

    // Проверяем, правильный ли ответ
    if (answer === questions[index].correctAnswer) {
      setCorrectAnswers((prev) => prev + 1); // Увеличиваем количество правильных ответов
    }

    // Отметим вопрос как отвеченный
    const newAnsweredStatus = [...isAnswered];
    newAnsweredStatus[index] = true;
    setIsAnswered(newAnsweredStatus);
  };

  const handleSubmit = () => {
    if (!chatId) {
      console.error("Chat ID is undefined!");
      return; // Выход из функции, если chatId недоступен
    }

    // Отправляем на сервер количество правильных ответов и ID пользователя
    dispatch(
      updateUserPointsQuiz({
        chatId,
        correctAnswers,
        quizId: questions[0].quizId,
      }) // Используем quizId первого вопроса
    );
    onClose();
  };

  // Убедитесь, что isAnswered является массивом
  const allAnswered = isAnswered.every(Boolean); // Проверяем, ответили ли на все вопросы

  return (
    <div className="modal">
      <div className="modal-content">
        {quizCompleted ? (
          <p>Квиз пройден! Вы не можете пройти его повторно.</p>
        ) : (
          <Slider {...settings}>
            {questions.map((question, index) => (
              <div key={index}>
                <h3 className="question-title-modal">
                  {question.questionText}
                </h3>
                <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      style={{ listStyle: "none", padding: "0", margin: "0" }}
                    >
                      <button
                        onClick={() => handleAnswerSelect(index, option)}
                        style={{
                          backgroundColor:
                            selectedAnswers[index] === option
                              ? option === question.correctAnswer
                                ? "green"
                                : "red"
                              : "#8b7e66",
                        }}
                        disabled={isAnswered[index]}
                        className="btn-modal list-questions"
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Slider>
        )}
        <button onClick={onClose} className="close-button">
          Закрыть
        </button>
        {allAnswered && !quizCompleted && (
          <button onClick={handleSubmit} className="complete-button">
            Получить очки
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalOptions;
