import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import noteApi from "../../../../api/noteApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { formatTime } from "../../../../utils/MyUtils";
import { useEffect } from "react";
import Loading from "../../../../components/Loading/Loading";

export default function NoteTab({ videoRef }) {
  const [loading, setLoading] = useState(false);
  //Get video by videoId và get listnote of video
  const [listNote, setListNote] = useState([]);
  //react hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const fetchDataNote = async () => {
    try {
      setLoading(true);
      const res = await noteApi.getnotebyvideoid(searchParams.get("id"));

      setListNote(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const onSubmit = async (data) => {
    setLoading(true);
    data.videoId = searchParams.get("id");
    data.atTime = formatTime(Math.floor(videoRef.current.currentTime));
    try {
      const res = await noteApi.addnote(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm ghi chú thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchDataNote();
        setValue("content", "");
      } else {
        Swal.fire({
          icon: "error",
          title: "Thêm ghi chú thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoading(false);
    } catch (error) {}
  };
  const handleDeleteNote = async (id) => {
    try {
      setLoading(true);
      const res = await noteApi.deletenotebyid(id);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Xóa ghi chú thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchDataNote();
      } else {
        Swal.fire({
          icon: "error",
          title: "Xóa ghi chú thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDataNote();
  }, []);
  return (
    <div className="note__container">
      <div className="note__form mb-4">
        {searchParams.get("id") && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Thêm ghi chú</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Nhập ghi chú"
                    {...register("content", { required: true })}
                  />
                </Form.Group>
                <Button
                  className="main__btn"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  Thêm ghi chú
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
      <div className=" row note__list">
        <Form.Label>Danh sách note ({listNote?.length})</Form.Label>
        {listNote?.length != 0 || !loading ? (
          listNote?.map((item, index) => {
            return (
              <div className=" note__item mb-2" key={index}>
                <div className="note__item-header">
                  <span className="note__item-time me-3">{item.atTime}</span>
                  <span className="note__item-delete">
                    <AiOutlineDelete
                      size={20}
                      cursor="pointer"
                      onClick={() => handleDeleteNote(item.id)}
                      disabled={loading}
                    />
                  </span>
                </div>
                <div className="note__item-content">{item.content}</div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
