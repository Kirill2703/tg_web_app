import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserNameByTelegramId } from "../../thunks/userThunk";

const UserLoader = ({ telegramId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (telegramId) {
      dispatch(fetchUserNameByTelegramId(telegramId)); // Загружаем имя пользователя по telegramId
    }
  }, [dispatch, telegramId]);

  return null; // Этот компонент ничего не рендерит
};

export default UserLoader;
