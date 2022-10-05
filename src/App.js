import "./App.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CustomLayout from "./CustomLayout/CustomLayout";
import SignIn from "./pages/auth/signin/SignIn.page";
import SignUp from "./pages/auth/signup/SignUp.page";
function App() {
  const user = false;
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
