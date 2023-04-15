import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NewCourse.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Rating } from "@mui/material";
import { useState } from "react";
import coursesApi from "../../../api/coursesApi";
export default function HotCourse() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  const [listHotCourse, setListHotCourses] = useState([]);
  useEffect(() => {
    const fetchNewwestCourse = async () => {
      try {
        const res = await coursesApi.getTop4CoursesHot(4);
        setListHotCourses(res.data);
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
          Khóa học nổi bật <span className="text-center">HOT</span>
        </h1>
      </div>
      <div className="row d-flex flex-column flex-md-row justify-content-between gap-3 flex-wrap align-items-center">
        {listHotCourse?.map((item, index) => (
          <div
            data-aos="flip-left"
            key={index}
            className="card col-12 col-md-5 py-3 d-flex flex-xl-row flex-column align-items-center  card__course-item"
          >
            <img
              src={
                item.avatar
                  ? item.avatar
                  : require("../../../assets/img/no-image-1771002-1505134.png")
              }
              className="card-img-top img-fluid avt__course"
              alt="..."
            />

            <div className="card-body w-100 d-flex flex-column align-items-center  align-items-md-start">
              <div class="instructor">
                <img
                  src={require("../../../assets/img/garden-model.png")}
                  alt="Images"
                  className="img-fluid avt__teacher"
                />
                <h3 class="name">
                  <a href="course-details.html">David McLean</a>
                </h3>
              </div>
              <h5 className="card-title mb-2 ">{item.name}</h5>
              <div className="d-flex   mb-2">
                <div className="card-language me-1">
                  Language: {item ? item.language : ""}
                </div>
                <div className="card-language">
                  Số lượng học sinh: {item ? item.numStudents : ""}
                </div>
              </div>
              <div className="d-flex gap-1 align-items-center">
                <p className="card-text m-0">
                  Giá :{" "}
                  <span>
                    {item.price === 0
                      ? "Miễn phí"
                      : item.price.toLocaleString("vi", {
                          currency: "VND",
                        }) + " VND"}
                  </span>
                </p>
                <Rating name="read-only" value={5} size="small" readOnly />
              </div>

              {/* <div className="card__layer">
                <div>
                  <Link
                    to={`/courses/${item.id}`}
                    className="btn btn-primary"
                  >
                    Xem khóa học
                  </Link>
                </div>
              </div> */}
            </div>
            <div className="course__link">
              <div onClick={() => handleNavigateToCart(item)}>
                Mua ngay <i class="fa-solid fa-arrow-right"></i>
              </div>
              <Link to={`/courses/${item.id}`}>
                Xem khóa học <i class="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
