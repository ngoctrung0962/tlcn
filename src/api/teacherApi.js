import axiosClient from "./axiosClient";

const teacherApi = {
  getTopTeacher() {
    const url = "/teachers/top-teachers";
    return axiosClient.get(url);
  },
 
};

export default teacherApi;
