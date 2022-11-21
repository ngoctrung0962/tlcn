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
  //get top 8 products newest
  //get top 4 courses newest
  getTop4CoursesNewest(limit) {
    const url = `/courses/newest?limit=${limit}`;
    return axiosClient.get(url);
  },
  getTop4CoursesHot(limit) {
    const url = `/courses/topNumStudents?limit=${limit}`;
    return axiosClient.get(url);
  },
  //get min price
  getMinPrice() {
    const url = `/products/price/min`;
    return axiosClient.get(url);
  },
  //get max price
  getMaxPrice() {
    const url = `/products/price/max`;
    return axiosClient.get(url);
  },
  //get top seller
  getTopSeller() {
    const url = `/products/topseller`;
    return axiosClient.get(url);
  },
  //get top featured
  getTopFeatured() {
    const url = `/products/topfeature`;
    return axiosClient.get(url);
  },
  //get hot trend
  getHotTrend() {
    const url = `/products/hottrend`;
    return axiosClient.get(url);
  },
};

export default coursesApi;
