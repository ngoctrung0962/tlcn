import axiosClient from "./axiosClient";
import axios from "axios";

const coursesApi = {
  getAll(params) {
    const url = `/courses?page=${params}`;
    return axiosClient.get(url);
  },
  // get course by id
  get(id) {
    const url = `/course/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/course/add`;
    return axiosClient.post(url, data);
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
  getTop4CoursesHot(limit) {
    const url = `/courses/topNumStudents?limit=${limit}`;
    return axiosClient.get(url);
  },
  searchCourse(data, page) {
    const url = `/courses/search?page=${page}`;
    return axiosClient.post(url, data);
  },
  getlistpurchased(username) {
    const url = `listPurchasedCourses/${username}`;
    return axiosClient.get(url);
  },
  purcharPublicCourse(courseId) {
    const url = `/courses/${courseId}/enroll-publiccourse`;
    return axiosClient.post(url);
  },
};

export default coursesApi;
