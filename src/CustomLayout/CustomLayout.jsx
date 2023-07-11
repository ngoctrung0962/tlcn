import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../layouts/Header/Header";
import MainRoute from "../MainRoute/MainRoute";

export default function CustomLayout() {
  return (
    <>
      <Header />
      <MainRoute />
    </>
  );
}
