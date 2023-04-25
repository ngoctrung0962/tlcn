import { createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import Storagekey from "../constants/storagekey";
import { showNotification } from "../utils/MyUtils";
import wishListApi from "../api/wishListApi";
import Swal from "sweetalert2";

export const login = async (dispatch, data, username) => {
  dispatch(loginStart());
  if (data.AccessToken && data.RefreshToken) {
    const isdone = await saveToken(data.AccessToken, data.RefreshToken);
    if (isdone) {
      const userdata = await userApi.get(username);
      dispatch(loginSuccess(userdata));
      localStorage.setItem(Storagekey.USER, JSON.stringify(userdata));
    }
  } else {
    dispatch(loginFailure());
  }
};

export const saveToken = (accessToken) => {
  localStorage.setItem(Storagekey.ACCESS_TOKEN, accessToken);
  return true;
};

export const register = async (dispatch, data) => {
  dispatch(RegisterStart());
  try {
    const res = await userApi.register(data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getListWishListAction = async (dispatch) => {
  try {
    const res = await wishListApi.getListWishList();
    dispatch(getListWishList(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const addWishListAction = async (dispatch, courseId) => {
  try {
    const res = await wishListApi.add(courseId);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Add to wishlist success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(addWishList(res.data));
    } else {
      Swal.fire({
        icon: "error",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeWishListAction = async (dispatch, courseId) => {
  try {
    const res = await wishListApi.remove(courseId);
    if (res.errorCode === "") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Remove from wishlist success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(deleteWishList(res.data));
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    listWishList: [],
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    RegisterStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    RegisterSuccess: (state, action) => {
      state.isFetching = false;
    },
    RegisterFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteDetailUser: (state, action) => {
      state.currentUser = null;
    },
    getListWishList: (state, action) => {
      state.listWishList = action.payload.content;
    },
    addWishList: (state, action) => {
      state.listWishList.push(action.payload);
    },
    deleteWishList: (state, action) => {
      state.listWishList = state.listWishList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  RegisterStart,
  RegisterSuccess,
  RegisterFailure,
  Logout,
  deleteDetailUser,
  getListWishList,
  addWishList,
  deleteWishList,
} = userSlice.actions;
export default userSlice.reducer;
