import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import userQuizProgressReducer from "../slices/userQuizProgressSlice";
import questionReducer from "../slices/questionsSlice";
import quizReducer from "../slices/quizSlice";
import predictionReducer from "../slices/predictionSlice";
import userPredictionReducer from "../slices/userPredictionSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    userPrediction: userPredictionReducer,
    userQuizProgress: userQuizProgressReducer,
    questions: questionReducer,
    quiz: quizReducer,
    predictions: predictionReducer,
  },
});

export default store;
