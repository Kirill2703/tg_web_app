import React, { useEffect } from "react";
import Main from "./components/main/main";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Prediction from "./components/prediction/prediction";
import Quiz from "./components/quiz/quiz";
import Layout from "./components/layout/layout";
import Footer from "./components/footer/footer";

const tg = window.Telegram.WebApp;

function App() {
  // const dispatch = useDispatch();
  // const userName = useSelector((state) => state.user.username); // Получаем имя пользователя из Redux
  // const users = useSelector((state) => state.user.user || []); // Получаем список пользователей
  // const loading = useSelector((state) => state.user.loading); // Получаем состояние загрузки
  useEffect(() => {
    tg.expand();

    tg.ready();

    // // Загрузка всех пользователей
    // dispatch(fetchAllUsers());
  }, []);

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Router>
      <div className="main-container">
        <Header />
        <div class="content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/table" element={<table />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
