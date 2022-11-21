import React from "react";

export default function SuccessPage(props) {
  return (
    <div className="container successpage d-flex justify-content-center align-items-center ">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="success__img">
            <img
              src={require("../../assets/img/backgroundLogin.gif")}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="success__content d-flex flex-column justify-content-center align-items-center h-100 text-center">
            <h1>Đặt hàng thành công</h1>
            <h3>Tên khóa học: LEARNING SPRING BOOT</h3>
            <span>Giá: 100.000 VNĐ</span>
            <h4>Học viên: Nguyễn Ngọc Trung</h4>
            <div className=" d-flex gap-3">
              <button className="success__btn">Về trang chủ</button>
              <button className="success__btn">Đến khóa học</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
