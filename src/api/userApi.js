import axiosClient from "./axiosClient";

const userApi = {
  register(username, password, data) {
    const header = {
      username: username,
      password: password,
    };
    const url = `/register`;
    return axiosClient.post(url, data, {
      headers: header,
    });
  },
  get(username) {
    const url = `/account/detail/${username}`;
    return axiosClient.get(url);
  },
  update(username, data) {
    const url = `/account/${username}`;
    return axiosClient.put(url, data);
  },
  // resetPass(user) {
  //   const ob = {};
  // },
  login(data) {
    const url = `/login`;
    return axiosClient.post(url, data);
  },
  changepassword(data) {
    const url = `/account/changePassword`;
    return axiosClient.post(url, data);
  },
  forgotPassword(username, email) {
    const url = `/forgot-password/${username}?email=${email}`;
    return axiosClient.post(url);
  },
  resetPass(newPass, token) {
    const url = `/reset-password?token=${token}&password=${newPass}`;
    return axiosClient.post(url);
  },
  changeAvatar(username, data) {
    const url = `/account/${username}/avatar`;
    return axiosClient.post(url, data);
  },
  requestBecomeTeacher(data) {
    const url = `/enroll-teacher`;
    return axiosClient.post(url, data);
  },
  getTeacherInfo(username) {
    const url = `teacher/profile/${username}`;
    return axiosClient.get(url);
  },
};

export default userApi;
