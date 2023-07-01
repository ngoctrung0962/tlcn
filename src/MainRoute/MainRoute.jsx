import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogPage from "../pages/Blog/Blog.page";
import Cart from "../pages/Cart/Cart";
import ContactPage from "../pages/Contact/Contact.page";
import CoursePage from "../pages/course/course.page";
import CoursesPage from "../pages/courses/coursesPage";
import HomePage from "../pages/home/homePage";
import NotFound from "../pages/NotFound/NotFound";
import FailPage from "../pages/ResultPurchar/Fail.page";
import SuccessPage from "../pages/ResultPurchar/Success.page";
import Teacher from "../pages/Teacher/Teacher";
import OurTeacher from "../pages/OurTeacher/OurTeacher";
import HistoryPurcharse from "../pages/HistoryPurcharse/HistoryPurcharse";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/courses" element={<CoursesPage />} />

        <Route path="/courses/:id" element={<CoursePage />} />

        <Route path="/teacher/:id" element={<Teacher />} />
        <Route path="/teachers" element={<OurTeacher />} />

        <Route path="/historypurchase/:id" element={<Teacher />} />
        <Route path="/historypurchase" element={<HistoryPurcharse />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/blogs/:id" element={<BlogPage />} />

        <Route path="/contact" element={<ContactPage />} />

        {/* <Route path="/*" element={<BlogPage />} /> */}
        <Route path="*" element={<NotFound />} />
        <Route path="/purcharse/success" element={<SuccessPage />} />
        <Route path="/purcharse/fail" element={<FailPage />} />
      </Routes>
    </>
  );
};

export default MainRoute;
