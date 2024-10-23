// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserPointsQuiz } from "../../../thunks/userThunk";

// const ModalOptions = ({ onClose, chatId }) => {
//   console.log("Chat ID in ModalOptions:", chatId);
//   const questions = useSelector((state) => state.questions.questions);
//   const dispatch = useDispatch();

//   const [selectedAnswers, setSelectedAnswers] = useState(
//     Array(questions.length).fill(null)
//   ); // Состояние для всех ответов
//   const [isAnswered, setIsAnswered] = useState(
//     Array(questions.length).fill(false)
//   ); // Состояние для отслеживания ответов
//   const [correctAnswers, setCorrectAnswers] = useState(0);

//   const handleAnswerSelect = (index, answer) => {
//     if (isAnswered[index]) return; // Если на вопрос уже ответили, не обрабатываем клик

//     const newAnswers = [...selectedAnswers];
//     newAnswers[index] = answer; // Устанавливаем ответ на определённый вопрос
//     setSelectedAnswers(newAnswers);

//     // Проверяем, правильный ли ответ
//     if (answer === questions[index].correctAnswer) {
//       setCorrectAnswers((prev) => prev + 1); // Увеличиваем количество правильных ответов
//     }

//     // Отметим вопрос как отвеченный
//     const newAnsweredStatus = [...isAnswered];
//     newAnsweredStatus[index] = true;
//     setIsAnswered(newAnsweredStatus);
//   };

//   const handleSubmit = () => {
//     console.log("Submitting answers...");
//     console.log("Chat ID:", chatId);
//     console.log("Correct Answers:", correctAnswers);
//     console.log("Quiz ID:", questions[0].quizId);

//     if (!chatId) {
//       console.error("Chat ID is undefined!");
//       return; // Выход из функции, если chatId недоступен
//     }
//     // Отправляем на сервер количество правильных ответов и ID пользователя
//     dispatch(
//       updateUserPointsQuiz({
//         chatId,
//         correctAnswers,
//         quizId: questions[0].quizId,
//       }) // Используем quizId первого вопроса
//     );
//     onClose();
//     };
    
    

//   // Убедитесь, что isAnswered является массивом
//   const allAnswered = isAnswered.every(Boolean); // Проверяем, ответили ли на все вопросы

//   return (
//     <div className="modal">
//       <h2>Вопросы викторины</h2>
//       <ul>
//         {questions.map((question, index) => (
//           <li key={index}>
//             <h3>{question.questionText}</h3>
//             <ul>
//               {question.options.map((option, optionIndex) => (
//                 <li key={optionIndex}>
//                   <button
//                     onClick={() => handleAnswerSelect(index, option)}
//                     style={{
//                       backgroundColor:
//                         selectedAnswers[index] === option
//                           ? option === question.correctAnswer
//                             ? "green"
//                             : "red"
//                           : "white",
//                     }}
//                     disabled={isAnswered[index]} // Делаем кнопку неактивной после выбора
//                   >
//                     {option}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             {isAnswered[index] && (
//               <div>
//                 {selectedAnswers[index] === question.correctAnswer
//                   ? `Правильно!`
//                   : `Неправильный ответ!`}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//       {allAnswered && (
//         <button onClick={handleSubmit}>
//           Завершить викторину и получить очки
//         </button>
//       )}
//       <button onClick={onClose}>Закрыть</button>
//     </div>
//   );
// };

// export default ModalOptions;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Slider from "react-slick";
// import { updateUserPointsQuiz } from "../../../thunks/userThunk";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// const ModalOptions = ({ onClose, chatId }) => {
//   console.log("Chat ID in ModalOptions:", chatId);
//   const questions = useSelector((state) => state.questions.questions);
//   const dispatch = useDispatch();

//   const [selectedAnswers, setSelectedAnswers] = useState(
//     Array(questions.length).fill(null)
//   ); // Состояние для всех ответов
//   const [isAnswered, setIsAnswered] = useState(
//     Array(questions.length).fill(false)
//   ); // Состояние для отслеживания ответов
//   const [correctAnswers, setCorrectAnswers] = useState(0);

//   const settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipeToSlide: true,
//     adaptiveHeight: true,
//   };

//   const handleAnswerSelect = (index, answer) => {
//     if (isAnswered[index]) return; // Если на вопрос уже ответили, не обрабатываем клик

//     const newAnswers = [...selectedAnswers];
//     newAnswers[index] = answer; // Устанавливаем ответ на определённый вопрос
//     setSelectedAnswers(newAnswers);

//     // Проверяем, правильный ли ответ
//     if (answer === questions[index].correctAnswer) {
//       setCorrectAnswers((prev) => prev + 1); // Увеличиваем количество правильных ответов
//     }

//     // Отметим вопрос как отвеченный
//     const newAnsweredStatus = [...isAnswered];
//     newAnsweredStatus[index] = true;
//     setIsAnswered(newAnsweredStatus);
//   };

//   const handleSubmit = () => {
//     console.log("Submitting answers...");
//     console.log("Chat ID:", chatId);
//     console.log("Correct Answers:", correctAnswers);
//     console.log("Quiz ID:", questions[0].quizId);

//     if (!chatId) {
//       console.error("Chat ID is undefined!");
//       return; // Выход из функции, если chatId недоступен
//     }
//     // Отправляем на сервер количество правильных ответов и ID пользователя
//     dispatch(
//       updateUserPointsQuiz({
//         chatId,
//         correctAnswers,
//         quizId: questions[0].quizId,
//       }) // Используем quizId первого вопроса
//     );
//     onClose();
//   };

//   // Убедитесь, что isAnswered является массивом
//   const allAnswered = isAnswered.every(Boolean); // Проверяем, ответили ли на все вопросы

//   return (
//     <div className="modal">
//       <h2>Вопросы викторины</h2>
//       <Slider {...settings}>
//         {questions.map((question, index) => (
//           <div key={index}>
//             <h3>{question.questionText}</h3>
//             <ul>
//               {question.options.map((option, optionIndex) => (
//                 <li key={optionIndex}>
//                   <button
//                     onClick={() => handleAnswerSelect(index, option)}
//                     style={{
//                       backgroundColor:
//                         selectedAnswers[index] === option
//                           ? option === question.correctAnswer
//                             ? "green"
//                             : "red"
//                           : "white",
//                     }}
//                     disabled={isAnswered[index]} // Делаем кнопку неактивной после выбора
//                   >
//                     {option}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             {isAnswered[index] && (
//               <div>
//                 {selectedAnswers[index] === question.correctAnswer
//                   ? `Правильно!`
//                   : `Неправильный ответ!`}
//               </div>
//             )}
//           </div>
//         ))}
//       </Slider>
//       {allAnswered && (
//         <button onClick={handleSubmit}>
//           Завершить викторину и получить очки
//         </button>
//       )}
//       <button onClick={onClose}>Закрыть</button>
//     </div>
//   );
// };

// export default ModalOptions;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPointsQuiz } from "../thunks/userThunk";
import Modal from "./Modal"; // Импортируем модальное окно

const QuizComponent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном
  const [modalMessage, setModalMessage] = useState(""); // Сообщение для модального окна

  const handleQuizSubmission = async (quizData) => {
    const { chatId, correctAnswers, quizId } = quizData;

    const resultAction = await dispatch(
      updateUserPointsQuiz({ chatId, correctAnswers, quizId })
    );

    if (updateUserPointsQuiz.fulfilled.match(resultAction)) {
      console.log("Очки успешно обновлены:", resultAction.payload.points);
    } else {
      // Если есть ошибка, показываем модальное окно с сообщением
      setModalMessage(resultAction.payload);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Квиз</h1>
      {/* Ваша логика для отображения квиза */}

      {/* Кнопка для отправки квиза */}
      <button
        onClick={() =>
          handleQuizSubmission({
            chatId: currentUser.chatId,
            correctAnswers: 3,
            quizId: "quizIdExample",
          })
        }
      >
        Отправить квиз
      </button>

      {/* Модальное окно */}
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default QuizComponent;
