
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

  // useEffect(() => {
  //   // Проверка на то, завершил ли пользователь квиз
  //   const checkIfQuizCompleted = async () => {
  //     const response = await fetch(
  //       `http://https://footwise.onrender.com/user/${chatId}`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       const user = data.user;

  //       if (user.completedQuizzes.includes(questions[0].quizId)) {
  //         setQuizCompleted(true); // Устанавливаем состояние, если квиз уже пройден
  //       }
  //     }
  //   };

  //   if (chatId) {
  //     checkIfQuizCompleted();
  //   }
  // }, [chatId, questions]); // Проверка при изменении chatId и questions

  useEffect(() => {
    const checkIfQuizCompleted = async () => {
      if (!chatId || questions.length === 0) return;

      try {
        const response = await fetch(
          `http://https://footwise.onrender.com/user/${chatId}`
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
    // <div className="modal">
    //   <h2>Вопросы викторины</h2>
    //   {quizCompleted ? ( // Проверка на завершение квиза
    //     <p>Квиз пройден! Вы не можете пройти его повторно.</p>
    //   ) : (
    //     <Slider {...settings}>
    //       {questions.map((question, index) => (
    //         <div key={index}>
    //           <h3>{question.questionText}</h3>
    //           <ul>
    //             {question.options.map((option, optionIndex) => (
    //               <li key={optionIndex}>
    //                 <button
    //                   onClick={() => handleAnswerSelect(index, option)}
    //                   style={{
    //                     backgroundColor:
    //                       selectedAnswers[index] === option
    //                         ? option === question.correctAnswer
    //                           ? "green"
    //                           : "red"
    //                         : "white",
    //                   }}
    //                   disabled={isAnswered[index]} // Делаем кнопку неактивной после выбора
    //                 >
    //                   {option}
    //                 </button>
    //               </li>
    //             ))}
    //           </ul>
    //           {isAnswered[index] && (
    //             <div>
    //               {selectedAnswers[index] === question.correctAnswer
    //                 ? `Правильно!`
    //                 : `Неправильный ответ!`}
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </Slider>
    //   )}
    //   {allAnswered &&
    //     !quizCompleted && ( // Кнопка отправки отображается только если квиз не пройден
    //       <button onClick={handleSubmit}>
    //         Завершить викторину и получить очки
    //       </button>
    //     )}
    //   <button onClick={onClose}>Закрыть</button>
    // </div>
    <div className="modal">
      <div className="modal-content">
        <h2>Вопросы викторины</h2>
        {quizCompleted ? (
          <p>Квиз пройден! Вы не можете пройти его повторно.</p>
        ) : (
          <Slider {...settings}>
            {questions.map((question, index) => (
              <div key={index}>
                <h3>{question.questionText}</h3>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <button
                        onClick={() => handleAnswerSelect(index, option)}
                        style={{
                          backgroundColor:
                            selectedAnswers[index] === option
                              ? option === question.correctAnswer
                                ? "green"
                                : "red"
                              : "white",
                        }}
                        disabled={isAnswered[index]}
                        className="btn-modal"
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
                {isAnswered[index] && (
                  <div>
                    {selectedAnswers[index] === question.correctAnswer
                      ? `Правильно!`
                      : `Неправильный ответ!`}
                  </div>
                )}
              </div>
            ))}
          </Slider>
        )}
        {allAnswered && !quizCompleted && (
          <button onClick={handleSubmit} className="complete-button">
            Завершить викторину и получить очки
          </button>
        )}
        <button onClick={onClose} className="close-button">
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default ModalOptions;

