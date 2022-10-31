import axiosClient from "./axiosClient";
import { stringify } from "query-string";

const cartApi = {
  getListCourseInCart(username) {
    const url = `/cart/${username}`;
    return axiosClient.get(url);
  },
  AddToCartAction(courseId, username) {
    const url = `/cart/${username}/${courseId}`;
    return axiosClient.post(url);
  },
  DeleteFormCart(courseId, username) {
    const url = `/cart/${username}/${courseId}`;
    return axiosClient.delete(url);
  },
};

export default cartApi;
