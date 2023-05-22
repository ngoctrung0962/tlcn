import axiosClient from "./axiosClient";

const requestOrder = {
  request(data) {
    const url = `/vnpay/request-pay`;
    return axiosClient.post(url, data);
  },
};

export default requestOrder;
