import axiosClient from "./axiosClient";

const calendarApi = {
  addCalendar(data) {
    const url = `/learning-tool/reminder`;
    return axiosClient.post(url, data);
  },
};

export default calendarApi;
