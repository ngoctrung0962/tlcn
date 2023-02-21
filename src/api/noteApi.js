import axiosClient from "./axiosClient";

const noteApi = {
  getnotebyvideoid( videoid) {
    const url = `/notes/video/${videoid}`;
    return axiosClient.get(url);
  },
  addnote(data) {
    const url = `/notes`;
    return axiosClient.post(url, data);
  },
  deletenotebyid(id) {
    const url = `/notes/${id}`;
    return axiosClient.delete(url);
  },
};

export default noteApi;
