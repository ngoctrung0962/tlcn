import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
export default function Banner() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide mt-3 mb-3 banner__container"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner ">
        <div className="carousel-item  carousel-item1 active">
          <div className="row  px-5 py-3">
            <div className="banner__text col-12 col-md-7 d-flex flex-column justify-content-center px-3 px-md-5">
              <h1>Legacy có gì ?</h1>
              <p>
                <span>Learn Together </span>
                Tất cả chúng ta đều về học tập xã hội. Trò chuyện với những
                người khác trong khóa học của bạn, học hỏi lẫn nhau và phát
                triển kỹ năng của bạn trong một lớp học toàn cầu có hàng triệu
                người.
              </p>
              <div className="mb-4">
                <Link className="banner__link " to="/courses">
                  Truy cập ngay
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-5 d-flex flex-column justify-content-center ">
              <img
                className="img-fluid "
                src={"https://x2mint.vercel.app/assets/images/home_pic.svg"}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="carousel-item  carousel-item2 ">
          <div className="row  px-5 py-3">
            <div className="banner__text col-12 col-md-7 d-flex flex-column justify-content-center px-3 px-md-5">
              <h1>Legacy có gì ?</h1>
              <p>
                <span>Learn Everything </span>
                Từ lập trình, chăm sóc sức khỏe và lịch sử đến mã hóa và ngôn
                ngữ, Legacy có mọi khóa học dành cho bạn, từ người mới bắt đầu
                đến chuyên gia.
              </p>
              <div className="mb-4">
                <Link className="banner__link" to="/courses">
                  Truy cập ngay
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-5 d-flex flex-column justify-content-center ">
              <img
                className="img-fluid "
                src={"https://x2mint.vercel.app/assets/images/create.svg"}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="carousel-item  carousel-item3 ">
          <div className="row  px-5 py-3">
            <div className="banner__text col-12 col-md-7 d-flex flex-column justify-content-center px-3 px-md-5">
              <h1>Legacy có gì ?</h1>
              <p>
                <span>Learn From The Best </span>
                Những khóa học trên Legacy được thiết kế và hỗ trợ bởi các
                chuyên gia giảng dạy quốc tế, chất lượng các khóa học của chúng
                tôi là điều khiến chúng tôi khác biệt.
              </p>
              <div className="mb-4">
                <Link className="banner__link" to="/courses">
                  Truy cập ngay
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-5 d-flex flex-column justify-content-center ">
              <img
                className="img-fluid "
                src={"https://x2mint.vercel.app/assets/images/contest.svg"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev carousel-color"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <i className="bx bxs-chevron-left"></i>
      </button>
      <button
        className="carousel-control-next carousel-color"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <i className="bx bxs-chevron-right"></i>
      </button>
    </div>
  );
}
