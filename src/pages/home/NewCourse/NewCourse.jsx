import React from "react";
import { Link } from "react-router-dom";
import "./NewCourse.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import coursesApi from "../../../api/coursesApi";
export default function NewCourse() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
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
  return (
    <div data-aos="fade-up" className="d-flex flex-column mb-5 new__course">
      <div className="row">
        <h1 className="new__course-title">
          Khóa học mới nhất <span>Mới</span>
        </h1>
      </div>
      <div className="row d-flex flex-column flex-md-row justify-content-between gap-3 flex-wrap align-items-center">
        {listnewWestCourse?.map((course) => (
          <div
            data-aos="flip-left"
            key={course.id}
            className="card col-12 col-md-4 col-lg-3 py-3 d-flex justify-content-center align-items-center card__course-item"
          >
            <img
              src={require("../../../assets/img/CSS3_logo_and_wordmark.svg.png")}
              className="card-img-top img-fluid mb-2"
              alt="..."
            />
            <h5 className="card-title text-center mb-2">{course.name}</h5>
            <div className="card-body">
              <div className="d-flex justify-content-center gap-1 mb-2">
                <div className="card-language ">
                  Language: {course ? course.language : ""}
                </div>
                <div className="card-language">
                  Số lượng học sinh: {course ? course.numStudents : ""}
                </div>
              </div>
              <div className="d-flex justify-content-center gap-1">
                <p className="card-text">
                  Giá : <span>{course.price} VNĐ</span>
                </p>
                <Rating name="read-only" value={5} size="small" readOnly />
              </div>

              <div className="card__layer">
                <div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="btn btn-primary"
                  >
                    Xem khóa học
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
