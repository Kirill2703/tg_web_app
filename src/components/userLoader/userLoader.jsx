import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserNameByChatId } from "../../thunks/userThunk";

const UserLoader = ({ telegramId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (telegramId) {
      dispatch(fetchUserNameByChatId(chatId)); // Загружаем имя пользователя по telegramId
    }
  }, [dispatch, chatId]);

  return null; // Этот компонент ничего не рендерит
};

export default UserLoader;
