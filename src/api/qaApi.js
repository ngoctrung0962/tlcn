import axiosClient from "./axiosClient";

const qaApi = {
  addQA(data) {
    const url = `/discusses`;
    return axiosClient.post(url, data);
  },
  getbyId(id) {
    const url = `/discusses/${id}`;
    return axiosClient.get(url);
  },
  getQAChild(id) {
    const url = `/discusses/${id}/replies`;
    return axiosClient.get(url);
  },
  delete(id) {
    const url = `/discusses/${id}`;
    return axiosClient.delete(url);
  },
};

export default qaApi;
