import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import userApi from "../../../api/userApi";
export default function ModalUpdateAvatar(props) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.avatarFile[0]);
    const res = await userApi.changeAvatar(
      props?.userDetail?.username,
      formData
    );
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Cập nhật ảnh đại diện thành công",
      });
      await props.setReload(!props.reload);
      props.onHide();
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Cập nhật ảnh đại diện thất bại",
      });
    }
  };
  return (
    <Modal
      {...props}
      show="true"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cập nhật ảnh đại diện
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form yêu cầu trở thành giảng viên */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <img
                  src={
                    watch("avatarFile")?.[0]
                      ? URL.createObjectURL(watch("avatarFile")[0])
                      : getValues("file")
                  }
                  alt="avatar"
                  style={{
                    height: "250px",
                    width: "auto",
                    maxWidth: "200px",
                    objectFit: "contain",
                    display: "block",
                    padding: "2px",
                    background: "gray",
                    borderRadius: "10px",
                    margin: "0 auto",
                  }}
                />
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  placeholder="Nhập email"
                  {...register("avatarFile", { required: true })}
                />
                {errors.file && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="account__btn"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting ? true : false}
        >
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
        <Button
          className="account__btn"
          onClick={props.onHide}
          disabled={isSubmitting ? true : false}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
