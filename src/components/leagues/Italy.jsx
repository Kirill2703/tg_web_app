import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchAllPredictions from "../../thunks/predictionThunk";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { fetchUserNameByChatId } from "../../thunks/userThunk";
import { createUserPrediction } from "../../thunks/userPredictionThunk";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Pagination } from "antd";

const pageSize = 5;

const Italy = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { predictions, loading, error } = useSelector(
    (state) => state.predictions
  );
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [betPoints, setBetPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEndedModal, setShowEndedModal] = useState(false);
  const [showStartedModal, setShowStartedModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tg = window.Telegram.WebApp;
  const chatId = tg.initDataUnsafe?.user?.id;

  useEffect(() => {
    if (chatId) {
      dispatch(fetchUserNameByChatId(chatId));
    }
  }, [dispatch, chatId]);

  useEffect(() => {
    dispatch(fetchAllPredictions());
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const italyPredictions = predictions
    .filter((predict) => predict.country == "Italy")
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const currentPredictions = italyPredictions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleTeamClick = (prediction, team) => {
    const eventDate = new Date(prediction.date);
    const eventTime = prediction.time;
    const [hours, minutes] = eventTime.split(":").map(Number);
    eventDate.setHours(hours, minutes, 0, 0);
    const currentTime = new Date();

    if (prediction.status === "finished") {
      setShowEndedModal(true);
      return;
    }

    if (currentTime > eventDate) {
      setShowStartedModal(true);
      return;
    }
    
    setSelectedPrediction({ ...prediction, selectedTeam: team });
    setShowModal(true);
  };

  const handleSubmitPrediction = async () => {
    if (
      !currentUser ||
      !currentUser.username ||
      !selectedPrediction ||
      betPoints <= 0
    ) {
      return;
    }

    const resultAction = await dispatch(
      createUserPrediction({
        username: currentUser.username,
        predictionId: selectedPrediction._id,
        selectedTeam: selectedPrediction.selectedTeam,
        betPoints,
      })
    );

    if (createUserPrediction.fulfilled.match(resultAction)) {
      const { updatedUser } = resultAction.payload;
      if (updatedUser) {
        dispatch(fetchUserNameByChatId(currentUser.chatId));
      }
    }

    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);

    return `${day}.${month}.${year}`;
  };
  return (
    <div>
      <h1 className="header-league-page">Italy league</h1>
      {currentPredictions.map((prediction) => (
        <div key={prediction._id} className="predict-item">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div onClick={() => handleTeamClick(prediction, prediction.team1)}>
              <p className="team">{prediction.team1}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span className="vs">vs</span>
              <p className="date-predict">{formatDate(prediction.date)}</p>
            </div>

            <div onClick={() => handleTeamClick(prediction, prediction.team2)}>
              <p className="team">{prediction.team2}</p>
            </div>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="modal-prediction">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: " rgb(16, 47, 49)",
              borderRadius: "20px",
              margin: "0 20px",
              padding: "10px",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <p className="accept-choice">
                Вы уверены, что хотите выбрать{" "}
                <span style={{ color: "#8e7a6b" }}>
                  {selectedPrediction.selectedTeam}
                </span>{" "}
                и поставить {betPoints} очков?
              </p>
            </div>
            <div style={{ width: "80%", marginTop: "20px" }}>
              <input
                onChange={(e) => {
                  setBetPoints(Number(e.target.value));
                }}
                placeholder="Введите количество очков"
                className="input-points"
              />
            </div>
            <div style={{ margin: "20px 0" }}>
              <button onClick={handleSubmitPrediction} className="btn-yes">
                <FaCheck />
              </button>
              <button onClick={() => setShowModal(false)} className="btn-no">
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}
      {showEndedModal && (
        <div className="modal-ended">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: " rgb(16, 47, 49)",
              borderRadius: "20px",
              margin: "0 20px",
              padding: "10px",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <p className="ended-event">The event has already ended</p>
            </div>
            <button onClick={() => setShowEndedModal(false)} className="btn-no">
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      {showStartedModal && (
        <div className="modal-started">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: " rgb(16, 47, 49)",
              borderRadius: "20px",
              margin: "0 20px",
              padding: "10px",
            }}
          >
            <div style={{ marginTop: "20px" }}>
              <p className="started-event">The event has already started</p>
            </div>
            <button
              onClick={() => setShowStartedModal(false)}
              className="btn-no"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      <Pagination
        align="center"
        style={{ marginTop: "20px", textAlign: "center" }}
        current={currentPage}
        total={italyPredictions.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Italy;
