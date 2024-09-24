// src/components/Button.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../thunks/userThunk"; // Импортируем thunk

const Button = (props) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user); // Получаем пользователей из Redux

  // Загружаем всех пользователей при монтировании компонента
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Логируем состояние загрузки и ошибки
  useEffect(() => {
    console.log("Загрузка пользователей:", loading);
    console.log("Ошибка:", error);
  }, [loading, error]);

  if (loading) {
    return <button className="button">Загрузка...</button>; // Отображаем кнопку загрузки
  }

  if (error) {
    return <button className="button">Ошибка: {error}</button>; // Отображаем сообщение об ошибке
  }

  return (
    <div>
      <button className="button" {...props}></button>
      {users.map((user) => (
        <p key={user.chatId} className="user-name">
          {user.username}
        </p> // Отображаем имена пользователей
      ))}
    </div>
  );
};

export default Button;
