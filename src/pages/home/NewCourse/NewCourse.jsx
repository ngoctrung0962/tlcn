import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NewCourse.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import coursesApi from "../../../api/coursesApi";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { useSelector } from "react-redux";
export default function NewCourse() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  const { listWishList } = useSelector((state) => state.user);
  const [listnewWestCourse, setListnewWestCourse] = useState([]);
  useEffect(() => {
    const fetchNewwestCourse = async () => {
      try {
        const res = await coursesApi.getTop4CoursesNewest(4);
        setListnewWestCourse(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewwestCourse();
  }, []);
  const nav = useNavigate();
  const handleNavigateToCart = (course) => {
    // Truyền state vào đây
    nav("/cart", { state: course });
  };
  return (
    <div data-aos="fade-up" className="d-flex flex-column mb-5 new__course">
      <div className="row">
        <h1 className="new__course-title">
          Khóa học mới nhất <span>NEW</span>
        </h1>
      </div>
      <div className="row  flex-column flex-md-row  flex-wrap align-items-center">
        {listnewWestCourse?.map((item, index) => (
          <div className="col-12 col-md-6" key={index}>
            <CourseCard item={item} key={index} listWishList={listWishList} />
          </div>
        ))}
      </div>
    </div>
  );
}
