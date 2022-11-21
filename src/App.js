import "./App.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CustomLayout from "./CustomLayout/CustomLayout";
import SignIn from "./pages/auth/signin/SignIn.page";
import SignUp from "./pages/auth/signup/SignUp.page";
import LearnPage from "./pages/learn/Learn.page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { deleteDetailUser, loginSuccess } from "./redux/userRedux";
import userApi from "./api/userApi";
import cartApi from "./api/cartApi";
import { getListCart } from "./redux/cartRedux";
import Account from "./pages/Account/Account.page";
import SuccessPage from "./pages/ResultPurchar/Success.page";
import FailPage from "./pages/ResultPurchar/Fail.page";
import { useState } from "react";
import ContactPage from "./pages/Contact/Contact.page";
import ForgotPass from "./pages/auth/ForgotPass/ForgotPass.page";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  //get list courses in cart

  useEffect(() => {
    const getListCartAction = async () => {
      const res = await cartApi.getListCourseInCart(user?.username);
      if (res.errorCode === "") {
        dispatch(getListCart(res.data));
      }
    };
    if (user) {
      getListCartAction();
    }
  }, [dispatch, user]);

  useEffect(() => {
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
    };
    getUser();
  }, [dispatch]);
  const [isOnline, setIsOnline] = useState(false);

  window.addEventListener("online", () => setIsOnline(true));
  window.addEventListener("offline", () => setIsOnline(false));
  console.log(isOnline);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={user ? <CustomLayout /> : <SignIn />} />

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

          <Route
            path="/learn/:id"
            element={!user ? <Navigate to="/signin" /> : <LearnPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
