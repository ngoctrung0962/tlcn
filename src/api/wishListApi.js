import axiosClient from "./axiosClient";
import axios from "axios";

const wishListApi = {
  getListWishList() {
    const url = `/wishlist`;
    return axiosClient.get(url);
  },
  // get course by id
  add(courseId) {
    const url = `/wishlist/${courseId}`;
    return axiosClient.post(url);
  },
  remove(courseId) {
    const url = `/wishlist/${courseId}`;
    return axiosClient.delete(url);
  },
};

export default wishListApi;
