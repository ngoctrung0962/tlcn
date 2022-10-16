import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
export default function Banner() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide mt-3 mb-3"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner ">
        <div className="carousel-item  carousel-item1 active">
          <div className="row  px-5 py-3">
            <div className="banner__text col-12 col-md-7 d-flex flex-column justify-content-center px-3 px-md-5">
              <h1>Legacy trên Youtube</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, aperiam cupiditate error adipisci consectetur
                odio odit voluptas illum molestiae aliquid enim animi aliquam
                sit asperiores ipsum. Sunt fugiat delectus modi!
              </p>
              <div className="mb-4">
                <Link className="banner__link " to="/">
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
              <h1>Legacy trên Youtube</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
                excepturi blanditiis voluptatibus deserunt! Aliquam architecto
                atque quia, illo voluptate ipsum neque! Alias voluptatibus
                laborum dolorum id! Dicta eum suscipit veritatis.
              </p>
              <div className="mb-4">
                <Link className="banner__link" to="/">
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
              <h1>Legacy trên Youtube</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Incidunt modi, corporis placeat ipsa aliquid ducimus itaque
                harum omnis alias doloremque, maiores laborum enim a veritatis
                soluta iure quaerat sed quos.
              </p>
              <div className="mb-4">
                <Link className="banner__link" to="/">
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
