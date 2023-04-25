import axiosClient from "./axiosClient";
import axios from "axios";

const quizApi = {
  startQuiz(courseId) {
    const url = `/lectures/${courseId}/start-quiz`;
    return axiosClient.get(url);
  },
  submitQuiz(courseId, data) {
    const url = `/lectures/${courseId}/submit-answers`;
    return axiosClient.post(url, data);
  }
};

export default quizApi;
