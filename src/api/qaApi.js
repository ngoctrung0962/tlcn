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
  filter(requestParams, valueRequestParams) {
    const url = `/discusses?page=0&limit=100&${requestParams}=${valueRequestParams}`;
    return axiosClient.get(url);
  },
};

export default qaApi;
