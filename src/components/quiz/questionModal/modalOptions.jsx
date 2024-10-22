import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserPointsQuiz } from "../../../thunks/userThunk";

const ModalOptions = ({ question, onClose, chatId }) => {
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === question.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1); // Увеличиваем количество правильных ответов
    }
  };

  const handleSubmit = () => {
    // Отправляем на сервер количество правильных ответов и ID пользователя
    dispatch(
      updateUserPointsQuiz({ chatId, correctAnswers, quizId: question.quizId })
    );
    onClose();
  };

  const isCorrectAnswer = selectedAnswer === question.correctAnswer;
  return (
    <div className="modal">
      <h2>{question.questionText}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswerSelect(option)}
              style={{
                backgroundColor:
                  selectedAnswer === option
                    ? isCorrectAnswer
                      ? "green"
                      : "red"
                    : "white",
              }}
              disabled={isAnswered} // Делаем кнопку неактивной после выбора
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {isAnswered && (
        <div>
          {isCorrectAnswer
            ? `Правильно, ${question.points} очков уже у тебя в кармане!`
            : "Неправильный ответ!"}
        </div>
      )}
      <button className="submit-button" onClick={handleSubmit}>
        Завершить викторину и получить очки
      </button>
      <button className="close-button" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
};

export default ModalOptions;
