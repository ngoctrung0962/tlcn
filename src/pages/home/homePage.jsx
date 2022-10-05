import React from "react";
import Banner from "../../components/Banner/Banner";
import Footer from "../../layouts/Footer/Footer";
import Header from "../../layouts/Header/Header";
import MainRoute from "../../MainRoute/MainRoute";
import HotCourse from "./HotCourse/NewCourse";
import NewCourse from "./NewCourse/NewCourse";

export default function HomePage() {
  return (
    <>
      <div className="container-fluid">
        <Banner />
        <div className="container">
          <NewCourse />
          <HotCourse />
        </div>
      </div>
    </>
  );
}
