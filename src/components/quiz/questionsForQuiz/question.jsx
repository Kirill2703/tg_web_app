// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import fetchAllQuestionsByQuizId from "../../../thunks/questionsThunk";
// import ModalOptions from "../questionModal/modalOptions";

// const Question = () => {
//   const { quizId } = useParams();
//   const dispatch = useDispatch();
//   const questions = useSelector((state) => state.questions.questions);
//   const loading = useSelector((state) => state.questions.loading);
//   const error = useSelector((state) => state.questions.error);
//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const currentUser = useSelector((state) => state.user.currentUser);

//   const chatId = currentUser ? currentUser.chatId : null;
//   useEffect(() => {
//     dispatch(fetchAllQuestionsByQuizId(quizId));
//   }, [dispatch, quizId]);

//   const handleQuestionClick = (question) => {
//     setSelectedQuestion(question); // Устанавливаем выбранный вопрос
//   };

//   const handleCloseModal = () => {
//     setSelectedQuestion(null); // Закрываем модальное окно
//   };

//   if (loading) {
//     return <div>Загрузка вопросов...</div>;
//   }

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }
//   return (
//     <div>
//       <h2>Вопросы квиза</h2>
//       <ul>
//         {questions.map((question) => (
//           <li
//             key={question._id}
//             onClick={() => handleQuestionClick(question)}
//             style={{ cursor: "pointer" }}
//           >
//             {question.questionText}
//           </li>
//         ))}
//       </ul>

//       {selectedQuestion && (
//         <ModalOptions
//           question={selectedQuestion}
//           onClose={handleCloseModal}
//           chatId={chatId}
//         />
//       )}
//     </div>
//   );
// };

// export default Question;

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

  useEffect(() => {
    dispatch(fetchAllQuestionsByQuizId(quizId));
  }, [dispatch, quizId]);

  const handleOpenModal = () => {
    setIsModalOpen(true); // Открыть модальное окно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрыть модальное окно
  };

  if (loading) {
    return <div>Загрузка вопросов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h2>Квиз</h2>
      <button onClick={handleOpenModal}>Начать квиз</button>

      {isModalOpen && (
        <ModalOptions
          onClose={handleCloseModal}
          chatId={currentUser.chatId} // Передаем chatId из currentUser
        />
      )}
    </div>
  );
};

export default Question;

