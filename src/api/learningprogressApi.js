import axiosClient from "./axiosClient";

const learningprogressApi = {
  getLearningProgress(courseId) {
    const url = `/learning-progress/inquire/${courseId}`;
    return axiosClient.get(url);
  },
  markLectureAsComplete(courseId, lectureId) {
    const url = `/learning-progress/mark-completed/${courseId}/lectures/${lectureId}`;
    return axiosClient.post(url);
  },
  unmarkLectureAsComplete(courseId, lectureId) {
    const url = `/learning-progress/unmark-completed/${courseId}/lectures/${lectureId}`;
    return axiosClient.post(url);
  },
};
export default learningprogressApi;
