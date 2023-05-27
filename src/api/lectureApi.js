import axiosClient from "./axiosClient";

const lectureApi = {
  nextLecture(currentLectureId) {
    const url = `/lectures/next-lectures?currentLecture=${currentLectureId}`;
    return axiosClient.get(url);
  },
  prevLecture(currentLectureId) {
    const url = `/lectures/prev-lectures?currentLecture=${currentLectureId}`;
    return axiosClient.get(url);
  },
  getLectureById(id) {
    const url = `/lectures/${id}`;
    return axiosClient.get(url);
  }
};
export default lectureApi;
