import axiosClient from "./axiosClient";
import { stringify } from "query-string";

const chatbotApi = {
  getRoomHistory() {
    const url = `/chatbot/history`;
    return axiosClient.get(url);
  },
  sendMessage(message) {
    const url = `/chatbot`;
    return axiosClient.post(url, message);
  },
};

export default chatbotApi;
