import React from "react";
import { Link } from "react-router-dom";
import "./NewCourse.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Rating } from "@mui/material";
export default function HotCourse() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <div data-aos="fade-up" className="d-flex flex-column mb-5 new__course">
      <div className="row">
        <h1 className="new__course-title">
          Khóa học nổi bật <span className="text-center">HOT</span>
        </h1>
      </div>
      <div className="row d-flex flex-column flex-md-row justify-content-between gap-3 flex-wrap align-items-center">
        <div
          data-aos="flip-left"
          className="card col-12 col-md-4 col-lg-3 py-3 justify-content-center align-items-center card__course-item"
        >
          <img
            src={require("../../../assets/img/CSS3_logo_and_wordmark.svg.png")}
            className="card-img-top img-fluid"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">CSS từ Zero đến Hero</h5>
            <p className="card-text">Giá : 2.000.000 VNĐ</p>
            <Rating name="read-only" value={5} readOnly />
            <div className="card__layer">
              <div>
                <Link to="/" className="btn btn-primary">
                  Xem khóa học
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="flip-left"
          className="card col-12 col-md-4 col-lg-3 py-3 justify-content-center align-items-center card__course-item"
        >
          <img
            src={require("../../../assets/img/CSS3_logo_and_wordmark.svg.png")}
            className="card-img-top img-fluid"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">CSS từ Zero đến Hero</h5>
            <p className="card-text">Giá : 2.000.000 VNĐ</p>
            <Rating name="read-only" value={5} readOnly />
            <div className="card__layer">
              <div>
                <Link to="/" className="btn btn-primary">
                  Xem khóa học
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="flip-left"
          className="card col-12 col-md-4 col-lg-3 py-3 justify-content-center align-items-center card__course-item"
        >
          <img
            src={require("../../../assets/img/CSS3_logo_and_wordmark.svg.png")}
            className="card-img-top img-fluid"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">CSS từ Zero đến Hero</h5>
            <p className="card-text">Giá : 2.000.000 VNĐ</p>
            <Rating name="read-only" value={5} readOnly />
            <div className="card__layer">
              <div>
                <Link to="/" className="btn btn-primary">
                  Xem khóa học
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="flip-left"
          className="card col-12 col-md-4 col-lg-3 py-3 justify-content-center align-items-center card__course-item"
        >
          <img
            src={require("../../../assets/img/CSS3_logo_and_wordmark.svg.png")}
            className="card-img-top img-fluid"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">CSS từ Zero đến Hero</h5>
            <p className="card-text">Giá : 2.000.000 VNĐ</p>
            <Rating name="read-only" value={5} readOnly />
            <div className="card__layer">
              <div>
                <Link to="/" className="btn btn-primary">
                  Xem khóa học
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
