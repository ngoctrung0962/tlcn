import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RiSave3Fill } from "react-icons/ri";
import CustomDatePicker from "../../../components/DatePicker/DatePicker.component";
export default function AccountChangePass() {
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
          <h3>Thay đổi mật khẩu</h3>
          <button className="account__btn">
            <RiSave3Fill className="me-2" /> Lưu
          </button>
        </div>
        <hr className="account_hr" />
        <div className="account__right__content">
          <Form>
            <Row>
              <Col md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu cũ</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu mới</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label>Nhập lại mật khẩu</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </section>
  );
}
