import axiosClient from "./axiosClient";
import { stringify } from "query-string";

const cartApi = {
  getListCourseInCart() {
    const url = `/cart`;
    return axiosClient.get(url);
  },
  AddToCartAction(courseId) {
    const url = `/cart/${courseId}`;
    return axiosClient.post(url);
  },
  DeleteFormCart(courseId) {
    const url = `/cart/${courseId}`;
    return axiosClient.delete(url);
  },
};

export default cartApi;
