import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogPage from "../pages/Blog/Blog.page";
import CoursePage from "../pages/course/course.page";
import CoursesPage from "../pages/courses/coursesPage";
import HomePage from "../pages/home/homePage";
import LearnPage from "../pages/learn/Learn.page";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    

      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CoursePage />} />

      <Route path="/blogs/:id" element={<BlogPage />} />
      {/* <Route path="/*" element={<BlogPage />} /> */}
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
};

export default MainRoute;
