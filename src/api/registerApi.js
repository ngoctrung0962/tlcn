import axiosClient from "./axiosClient";
const registerApi = {
  register(data) {
    const url = `/account/users/register`;
    return axiosClient.post(url, data);
  },
};

export default registerApi;
