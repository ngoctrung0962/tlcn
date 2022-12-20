import axiosClient from "./axiosClient";
import axios from "axios";

const coursesVideoApi = {
  getAll(params) {
    const url = `/courses?page=${params}`;
    return axiosClient.get(url);
  },
  // get course by id
  getByCourseId(id) {
    const url = `/course-video/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/products`;
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  checkisPurchaseCourse(courseId, username) {
    const url = `/isPurchaseCourse/${username}/${courseId}`;
    return axiosClient.get(url);
  },
  //get top 4 courses newest
  getTop4CoursesNewest(limit) {
    const url = `/courses/newest?limit=${limit}`;
    return axiosClient.get(url);
  },
  getbyId(id) {
    const url = `/course-video/video/${id}`;
    return axiosClient.get(url);
  },
};

export default coursesVideoApi;
