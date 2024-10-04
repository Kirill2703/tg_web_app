import React, { useEffect, useState } from "react";
import Main from "./components/main/main";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Prediction from "./components/prediction/prediction";
import Quiz from "./components/quiz/quiz";
import Layout from "./components/layout/layout";
import Footer from "./components/footer/footer";

const tg = window.Telegram.WebApp;

function App() {
  const [isLoading, setIsLoading] = useState(false);

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
        {!isLoading && <Header />}
        <div class="content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main setLoading={setIsLoading} />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/table" element={<table />} />
            </Route>
          </Routes>
        </div>
        {!isLoading && <Footer />}
      </div>
    </Router>
  );
}

export default App;
