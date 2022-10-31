import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RiSave3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import CustomDatePicker from "../../../components/DatePicker/DatePicker.component";
export default function AccountHistoryPurchase() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});
  return (
    <section id="infomation" className="account__right__section p-3">
      <div className="container-fluid">
        <div className="account__right-title d-flex justify-content-between flex-wrap align-items-center ">
          <h3>Khóa học đã mua</h3>
          <button className="account__btn">
            <RiSave3Fill className="me-2" /> Mua thêm
          </button>
        </div>
        <hr className="account_hr" />
        <div className="account__right__content">
          <ul className="list_courses">
            <li className="list_courses__item">
              <Link to={"/"} className="c_item d-flex">
                <div className="c-img p-3">
                  <img
                    src={require("../../../assets/img/13.png")}
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <span>English Toeic</span>
              </Link>
            </li>
            <li className="list_courses__item">
              <Link to={"/"} className="c_item d-flex">
                <div className="c-img p-3">
                  <img
                    src={require("../../../assets/img/13.png")}
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sapiente officiis sit minus ea architecto sunt enim accusamus
                </span>
              </Link>
            </li>
            <li className="list_courses__item">
              <Link to={"/"} className="c_item d-flex">
                <div className="c-img p-3">
                  <img
                    src={require("../../../assets/img/banner1.png")}
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <span>English Toeic</span>
              </Link>
            </li>
            <li className="list_courses__item">
              <Link to={"/"} className="c_item d-flex">
                <div className="c-img p-3">
                  <img
                    src={require("../../../assets/img/banner.png")}
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <span>English Toeic</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
