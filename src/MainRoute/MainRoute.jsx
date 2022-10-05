import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogPage from "../pages/Blog/Blog.page";
import CoursesPage from "../pages/courses/coursesPage";
import HomePage from "../pages/home/homePage";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/blogs/:id" element={<BlogPage />} />
      {/* <Route path="/*" element={<BlogPage />} /> */}
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
};

export default MainRoute;
