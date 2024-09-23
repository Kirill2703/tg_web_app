import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/header';
import LoadingScreen from './components/loadingScreen/loadingScreen';
const tg = window.Telegram.WebApp;

function App() {
  const [loading, setLoading] = useState(true); // Добавьте состояние loading

  useEffect(() => {
    // Симуляция загрузки, замените это на ваши реальные данные
    setTimeout(() => {
      setLoading(false);
      tg.ready(); // Подготовьте Telegram Web App
    }, 2000); // 2 секунды
  }, [tg]);

  if (loading) {
    return <LoadingScreen />; // Показываем компонент загрузки
  }

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
