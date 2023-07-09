import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import userApi from "../../../api/userApi";
import { useRef } from "react";
import MUIAddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useState } from "react";
import uploadFileApi from "../../../api/uploadFileApi";
export default function ModalRequestBecomeTeacher(props) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: props.userDetail?.email,
      phone: props.userDetail?.phone,
    },
  });

  const buttonChooseFile = useRef(null);

  const [listCertificate, setListCertificate] = useState([]);

  const handleUploadFiles = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await uploadFileApi.upLoadFile(formData);
      if (res.errorCode === "") {
        return res.data;
      }
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (listCertificate.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Vui lòng cung cấp chứng chỉ",
      });
      return;
    } else {
      const listLink = await handleUploadFiles(listCertificate);
      data.certs = listLink;
      const res = await userApi.requestBecomeTeacher(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Yêu cầu trở thành giảng viên thành công",
        });
        props.onHide();
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Yêu cầu trở thành giảng viên thất bại",
        });
      }
      setLoading(false);
    }
  };
  return (
    <Modal
      {...props}
      show="true"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Yêu cầu trở thành giảng viên
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form yêu cầu trở thành giảng viên */}
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            overflow: "auto",
            maxHeight: "70vh",
          }}
        >
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  readOnly
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  readOnly
                  {...register("phone", { required: true })}
                />
                {errors.phone && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ"
                  {...register("address", { required: true })}
                />
                {errors.address && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Nghề nghiệp hiện tại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mô tả"
                  {...register("currentJob", { required: true })}
                />
                {errors.currentJob && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Chủ đề giảng dạy</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập chủ đề"
                  {...register("teachingTopic", { required: true })}
                />
                {errors.teachingTopic && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kinh nghiệm giảng dạy</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mô tả"
                  {...register("expDescribe", { required: true })}
                />
                {errors.expDescribe && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3 d-flex justify-content-center flex-column">
              <Form.Label>Chứng chỉ</Form.Label>
              <Form.Control
                hidden
                accept="image/*"
                multiple
                type="file"
                ref={buttonChooseFile}
                onChange={(e) => {
                  setListCertificate([...listCertificate, ...e.target.files]);
                }}
              />
              <div className="d-flex  mt-1">
                <Fab
                  style={{
                    backgroundColor: "#00693e",
                    color: "white",
                    borderRadius: "3px",
                    zIndex: 1,
                  }}
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                  onClick={() => {
                    buttonChooseFile.current?.click();
                  }}
                >
                  <MUIAddIcon fontSize="9" />
                  <p
                    style={{
                      fontSize: 9,
                      padding: 10,
                      margin: 0,
                    }}
                  >
                    Tải lên hình ảnh
                  </p>
                </Fab>
              </div>
              <Row>
                {listCertificate &&
                  listCertificate?.map((item, index) => {
                    return (
                      <Col md={6} sm={12}>
                        <div
                          style={{
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => {
                              setListCertificate(
                                listCertificate.filter(
                                  (item2) => item2 !== item
                                )
                              );
                            }}
                            style={{
                              position: "absolute",
                              top: 10,
                              right: 0,
                              zIndex: 2,
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                          <img
                            src={URL.createObjectURL(item)}
                            alt="avatar"
                            style={{
                              width: "100%",
                              height: "250px",
                              objectFit: "contain",

                              padding: "3px",
                              background: "#f1f1f1",
                              borderRadius: "10px",
                              margin: "10px auto",
                            }}
                          />
                        </div>
                      </Col>
                    );
                  })}
              </Row>

              {errors.avatar && <p className="form__error">Vui lòng nhập</p>}
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="account__btn"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting ? true : false}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
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
