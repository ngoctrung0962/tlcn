import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartApi from "./api/cartApi";
import userApi from "./api/userApi";
import Loading from "./components/Loading/Loading";
import CustomLayout from "./CustomLayout/CustomLayout";
import Account from "./pages/Account/Account.page";
import ForgotPass from "./pages/auth/ForgotPass/ForgotPass.page";
import SignIn from "./pages/auth/signin/SignIn.page";
import SignUp from "./pages/auth/signup/SignUp.page";
import LearnPage from "./pages/learn/Learn.page";
import MyLearning from "./pages/MyLearning/MyLearning.page";
import { getListCart } from "./redux/cartRedux";
import {
  deleteDetailUser,
  getListWishListAction,
  loginSuccess,
} from "./redux/userRedux";
import ForumPage from "./pages/Forum/Forum.page";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  //get list courses in cart

  useEffect(() => {
    const getListCartAction = async () => {
      const res = await cartApi.getListCourseInCart();
      if (res.errorCode === "") {
        dispatch(getListCart(res.data));
      }
    };
    if (user) {
      getListCartAction();
      getListWishListAction(dispatch);
    }
  }, [dispatch, user]);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const token = await Cookies.get("token");
      const username = await Cookies.get("username");
      try {
        if (token && username) {
          const resGetUser = await userApi.get(username);
          dispatch(loginSuccess(resGetUser.data));
          if (resGetUser.errorCode) {
            await Cookies.remove("token");
            await Cookies.remove("username");
            await dispatch(deleteDetailUser());
          }
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getUser();
  }, [dispatch]);

  // Bắt sự kiện đổi route
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/*" exact element={user ? <CustomLayout /> : <SignIn />} />

        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/forgotpass"
          element={user ? <Navigate to="/" /> : <ForgotPass />}
        />
        <Route path="/account/:id" element={user ? <Account /> : <SignIn />} />
        <Route
          path="/mylearning/:id"
          element={user ? <MyLearning /> : <SignIn />}
        />
        <Route path="/learn/:id" element={<LearnPage />} />
        <Route path="/forum" element={<ForumPage />} />
      </Routes>
    </div>
  );
}

export default App;
