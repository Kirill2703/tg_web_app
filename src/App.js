import React, { useEffect, useState } from "react";
import Main from "./components/main/main";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Prediction from "./components/prediction/prediction";
import Quiz from "./components/quiz/quiz";
import Layout from "./components/layout/layout";
import Footer from "./components/footer/footer";
import TableStat from "./components/table/tableStat";
import England from "./components/leagues/England";
import Germany from "./components/leagues/Germany";
import Spain from "./components/leagues/Spain";
import Italy from "./components/leagues/Italy";
import France from "./components/leagues/France";
import History from "./components/historyPrediction/history";
import Question from "./components/quiz/questionsForQuiz/question";
import Rules from "./components/rules/rules";
import UCL from "./components/leagues/UCL";
import UEL from "./components/leagues/UEL";
import UConference from "./components/leagues/UConference";

const tg = window.Telegram.WebApp;

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tg.expand();

    tg.ready();
  }, []);

  

  return (
    <Router>
      <div className="main-container">
        {!isLoading && <Header />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main setLoading={setIsLoading} />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/:quizId" element={<Question />} />
              <Route path="/table" element={<TableStat />} />
              <Route path="/prediction/england" element={<England />} />
              <Route path="/prediction/germany" element={<Germany />} />
              <Route path="/prediction/spain" element={<Spain />} />
              <Route path="/prediction/italy" element={<Italy />} />
              <Route path="/prediction/france" element={<France />} />
              <Route path="/prediction/ucl" element={<UCL />} />
              <Route path="/prediction/uel" element={<UEL />} />
              <Route path="/prediction/conferenceleague" element={<UConference />} />
              <Route path="/history" element={<History />} />
              <Route path="/leadears" element={<TableStat />} />
              <Route path="/rules" element={<Rules />} />
            </Route>
          </Routes>
        </div>
        {!isLoading && <Footer />}
      </div>
    </Router>
  );
}

export default App;
