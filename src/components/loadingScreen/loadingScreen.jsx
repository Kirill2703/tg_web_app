import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../thunks/userThunk";

const LoadingScreen = () => {
  const username = useSelector((state) => state.user.username);
  const loading = useSelector((state) => state.user.loading);
  // const users = useSelector((state) => state.user.user || []); // Получаем список пользователей
  const dispatch = useDispatch();

  useEffect(() => {
    // Загрузка всех пользователей
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div className="loading-screen">
      <div>
        <img src="/loading-screen.jpg" alt="Loading" />
        <h2 className="text-loading-screen">Загрузка...</h2>
        {loading ? (
          <p>Пожалуйста, подождите...</p>
        ) : (
          <p>Добро пожаловать, {username}!</p> // Выводим имя пользователя
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
