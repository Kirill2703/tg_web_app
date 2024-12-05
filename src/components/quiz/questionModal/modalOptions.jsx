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
  );
  const [isAnswered, setIsAnswered] = useState(
    Array(questions.length).fill(false)
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    afterChange: (current) => {
      setCurrentQuestionIndex(current); // Следим за текущим слайдом
    },
    beforeChange: (current, next) => {
      if (next <= current) return false; // Запрещаем возврат назад
    },
    adaptiveHeight: true,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 30; // Сбрасываем таймер на 30 секунд
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Очищаем таймер при смене вопроса
  }, [currentQuestionIndex]);

  useEffect(() => {
    setTimeLeft(30); // Сбрасываем таймер при загрузке нового вопроса
  }, [currentQuestionIndex]);

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
    if (isAnswered[index]) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer;
    setSelectedAnswers(newAnswers);

    if (answer === questions[index].correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    const newAnsweredStatus = [...isAnswered];
    newAnsweredStatus[index] = true;
    setIsAnswered(newAnsweredStatus);
  };

  const handleTimeOut = () => {
    if (isAnswered[currentQuestionIndex]) return;

    const newAnsweredStatus = [...isAnswered];
    newAnsweredStatus[currentQuestionIndex] = true;
    setIsAnswered(newAnsweredStatus);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true); // Завершаем квиз на последнем вопросе
    }
  };

  const handleSubmit = () => {
    if (!chatId) {
      console.error("Chat ID is undefined!");
      return;
    }

    dispatch(
      updateUserPointsQuiz({
        chatId,
        correctAnswers,
        quizId: questions[0].quizId,
      })
    );
    onClose();
  };

  const allAnswered = isAnswered.every(Boolean);

  return (
    <div className="modal">
      <div className="modal-content">
        {quizCompleted ? (
          <p>The quiz has been completed! You can't go through it again.</p>
        ) : (
          <Slider {...settings}>
            {questions.map((question, index) => (
              <div key={index}>
                <h3 className="question-title-modal">
                  {question.questionText}
                </h3>
                <div className="timer" style={{ margin: "10px 0" }}>
                  <p>
                    Time left: {index === currentQuestionIndex ? timeLeft : "—"}{" "}
                    s
                  </p>
                </div>
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
          Close
        </button>
        {allAnswered && !quizCompleted && (
          <button onClick={handleSubmit} className="complete-button">
            Get points
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalOptions;
