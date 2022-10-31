import React from "react";
import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RiSave3Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import userApi from "../../../api/userApi";
import CustomDatePicker from "../../../components/DatePicker/DatePicker.component";
export default function AccountInfo({ userDetail, setUserDetail }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: userDetail ? userDetail : {},
  });

  useEffect(() => reset(userDetail), [userDetail]);

  const onSubmit = async (data) => {
    data.birthdate = new Date(data.birthdate).toISOString();
    try {
      const res = await userApi.update(userDetail?.username, data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        setUserDetail(res.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Cập nhật thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };
  return (
    <section id="infomation" className="account__right__section p-3">
      <div className="container-fluid">
        <div className="account__right-title d-flex justify-content-between flex-wrap align-items-center ">
          <h3>Thông tin tài khoản</h3>
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
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control type="text" {...register("fullname")} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ngày sinh</Form.Label>
                  <CustomDatePicker control={control} field={"birthdate"} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Giới tính</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    {...register("gender")}
                  >
                    <option value="nam">Nam</option>
                    <option value="nu">Nữ</option>
                    <option value="khac">Khác</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" {...register("email")} />
                </Form.Group>
                {/* giới tính */}
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control type="text" {...register("phone")} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </section>
  );
}
