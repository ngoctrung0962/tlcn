import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RiSave3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import userApi from "../../../api/userApi";
import CustomDatePicker from "../../../components/DatePicker/DatePicker.component";
export default function AccountChangePass() {
  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data) => {
    data.username = currentUser?.username;
    try {
      const res = await userApi.changepassword(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Đổi mật khẩu thành công",
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: res.message,
        });
      }
    } catch (error) {}
  };
  return (
    <section id="infomation" className="account__right__section p-3">
      <div className="container-fluid">
        <div className="account__right-title d-flex justify-content-between flex-wrap align-items-center ">
          <h3>Thay đổi mật khẩu</h3>
          <button className="account__btn" onClick={handleSubmit(onSubmit)}>
            <RiSave3Fill className="me-2" /> Lưu
          </button>
        </div>
        <hr className="account_hr" />
        <div className="account__right__content">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu cũ</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("oldPwd", { required: true })}
                  />
                  {errors.oldPwd && (
                    <p className="form__error">Nhập mật khẩu cũ</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu mới</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("newPwd", {
                      required: true,
                    })}
                  />
                </Form.Group>
                {errors.newPwd && (
                  <p className="form__error">Nhập mật khẩu mới </p>
                )}
              </Col>
              <Col md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Nhập lại mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("confirmPwd", {
                      required: true,
                      validate: (value) => value === getValues("newPwd"),
                    })}
                  />
                </Form.Group>
                {errors.confirmPwd && (
                  <p className="form__error">Mật khẩu không khớp</p>
                )}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </section>
  );
}
