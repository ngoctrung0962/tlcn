import { Rating } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { formatDateDisplay } from "../../../utils/MyUtils";

export default function ModalRecept({ hanleExitModal, dataOrder }) {
  const nav = useNavigate();
  return (
    <Modal
      show="true"
      centered
      onHide={() => {
        hanleExitModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thông tin hóa đơn
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          maxHeight: "calc(100vh - 210px)",
          overflowY: "auto",
        }}
      >
        {/* Thông tin đơn hàng */}
        <div className="row">
          <p className="historypurcharse__caption modal__recept__title">
            <strong>Mã đơn:</strong> {dataOrder?.id}
          </p>
          <p className="historypurcharse__caption modal__recept__title">
            <strong>Tổng tiền:</strong> {dataOrder?.totalPrice}
          </p>
          <p className="historypurcharse__caption modal__recept__title">
            <strong>Phương thức thanh toán:</strong> {dataOrder?.paymentName}
          </p>
          <p className="historypurcharse__caption modal__recept__title">
            <strong>Ngày mua:</strong>
            {formatDateDisplay(dataOrder?.createDate)}
          </p>
          <p className="historypurcharse__caption modal__recept__title">
            <strong>Mã giảm giá:</strong>
            {dataOrder?.couponCode ? dataOrder.couponCode : "Không có"}
          </p>
          <p className="historypurcharse__caption modal__recept__title">
            <strong>Số lượng khóa học:</strong>
            {dataOrder?.qty}
          </p>
          <div className="list__course__order ">
            <div className="row">
              {dataOrder?.orderDetailList?.map((item, index) => (
                <div className="col-12">
                  <div
                    // data-aos="flip-left"
                    className="card col-12  py-3 d-flex flex-xl-row flex-column align-items-center  card__course-item"
                  >
                    <img
                      src={item?.avatar}
                      className="card-img-top img-fluid avt__course"
                      alt="..."
                    />

                    <div className="card-body w-100 d-flex flex-column align-items-center  align-items-md-start">
                      <div className="instructor">
                        <img
                          src={require("../../../assets/img/garden-model.png")}
                          alt="Images"
                          className="img-fluid avt__teacher"
                        />
                        <h3 className="name">
                          <Link to={`/teacher/${item?.accountName}`}>
                            {item?.accountName}
                          </Link>
                        </h3>
                      </div>
                      <h5 className="card-title mb-2 ">{item?.name}</h5>
                      <div className="d-flex   mb-2">
                        <div className="card-language me-1">
                          Language: {item ? item?.language : ""}
                        </div>
                        <div className="card-language">
                          Số lượng học sinh: {item ? item?.numStudents : ""}
                        </div>
                      </div>
                      <div className="d-flex gap-1 align-items-center">
                        <p className="card-text m-0">
                          Giá :{" "}
                          <span>
                            {item?.price === 0
                              ? "Miễn phí"
                              : item?.price?.toLocaleString("vi", {
                                  currency: "VND",
                                }) + " VND"}
                          </span>
                        </p>
                        <Rating
                          name="read-only"
                          value={item?.rate}
                          size="small"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="course__link d-flex flex-column gap-2">
                      <div onClick={() => nav(`/learn/${item.id}`)}>
                        Học ngay <i className="fa-solid fa-arrow-right"></i>
                      </div>

                      <Link to={`/courses/${item?.id}`}>
                        Xem khóa học <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary btn__footer__modal"
          onClick={() => {
            hanleExitModal();
          }}
        >
          Thoát
        </button>
      </Modal.Footer>
    </Modal>
  );
}
