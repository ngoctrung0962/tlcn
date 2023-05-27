import { Rating, TextField } from "@mui/material";
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import reviewApi from "../../../api/reviewApi";
import { formatDateDisplay } from "../../../utils/MyUtils";
import { MdOutlineDelete } from "react-icons/md";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import uploadFileApi from "../../../api/uploadFileApi";
const ReviewForm = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({});
  const { currentUser } = useSelector((state) => state.user);
  const [rating, setRating] = useState(0);

  const handleUploadImageBefore = async (files, info, uploadHandler) => {
    // uploadHandler(files);
    const formData = new FormData();
    formData.append("files", files[0]);
    const promise = new Promise((resolve, reject) => {
      const addImage = async () => {
        try {
          const res = await uploadFileApi.upLoadFile(formData);
          resolve(res.data[0]);
        } catch (error) {
          reject(error);
        }
      };
      addImage();
    });

    promise
      .then((res) => {
        const data = {
          // The response must have a "result" array.
          result: [
            {
              url: res,
              name: files[0].name,
              size: files[0].size,
            },
          ],
        };
        uploadHandler(data);
        return undefined;
      })
      .catch((err) => {
        console.log("err", err);
      });

    return undefined;
  };
  const handleImageUpload = async (
    targetImgElement,
    index,
    state,
    imageInfo,
    remainingFilesCount
  ) => {
    // Thay đổi đường dẫn ảnh
    // targetImgElement.src = imageInfo.src;
  };
  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await reviewApi.remove(reviewId);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Xóa bình luận thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        props.setListReviews(
          props.listReviews.filter((item) => item.id !== reviewId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    if (props.wasBought) {
      data.rate = rating;
      data.courseId = props.courseId;
      data.username = currentUser.username;
      try {
        const res = await reviewApi.add(data);
        if (res.errorCode === "") {
          Swal.fire({
            icon: "success",
            title: "Đánh giá thành công",
            text: "Cảm ơn bạn đã đánh giá khóa học",
            allowOutsideClick: true,
          });
          setValue("content", "");
          setRating(0);
          props.setListReviews([...props.listReviews, res.data]);
        } else {
          Swal.fire({
            icon: "error",
            title: "Đánh giá thất bại",
            text: "Vui lòng thử lại",
            allowOutsideClick: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Đánh giá thất bại",
        text: "Bạn chưa mua khóa học này",
        allowOutsideClick: true,
      });
    }
  };
  return (
    <div className="course__content__item">
      <h4 className="course__content__title p-2">Đánh giá </h4>

      <Form
        className=" my-5 form__rating mx-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={10} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <TextField
                id="outlined-basic"
                label="Nhập bình luận của bạn"
                variant="outlined"
                fullWidth
                type={"text"}
                {...register("content", { required: true })}
              /> */}
              <SunEditor
                setOptions={{
                  buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize", "formatBlock"],
                    ["paragraphStyle", "blockquote"],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                    ],
                    ["fontColor", "hiliteColor", "textStyle"],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["align", "horizontalRule", "list", "lineHeight"],
                    ["table", "link", "image", "video", "audio"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ["preview", "print"],
                  ],
                }}
                setContents={getValues("description")}
                onChange={(content) => {
                  setValue("content", content);
                }}
                height="100%"
                setDefaultStyle="font-family: 'Readex Pro', sans-serif; "
                onImageUploadBefore={handleUploadImageBefore}
                onImageUpload={handleImageUpload}
              />
            </Form.Group>
          </Col>
          <Col
            md={2}
            sm={12}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 ">
              <Rating
                size="small"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Form.Group>
          </Col>
          <Row>
            <div
              className="d-flex 
            justify-content-center "
            >
              <Button
                type="submit"
                className=" banner__link"
                onClick={handleSubmit(onSubmit)}
              >
                Thêm bình luận
              </Button>
            </div>
          </Row>
        </Row>
      </Form>

      {props?.listReviews?.map((item, index) => (
        <div key={index}>
          <div className="rating__container ">
            <div className="rating__item row mx-2 w-100">
              <div className="col-12 col-md-3 rating__avt d-flex justify-content-center align-items-center">
                <img
                  alt="avt"
                  src={
                    "https://users-avatars-online-courses.s3.us-west-2.amazonaws.com/man-2.png"
                  }
                  // require("../../../assets/img/member.jpg")
                />
                <div className="d-flex flex-column">
                  <span className="name_user">{item?.username}</span>
                  <div className=" rating__time">
                    <span>{formatDateDisplay(item?.createDate)}</span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-9 rating__content">
                <div className="rating__star">
                  <Rating
                    name="read-only"
                    value={Number(item?.rate)}
                    readOnly
                  />
                </div>
                {/* <p>{item?.content}</p>{" "} */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.content,
                  }}
                ></div>
                {item?.username === currentUser.username && (
                  <div
                    className="rating__delete"
                    onClick={() => handleDeleteReview(item.id)}
                  >
                    <MdOutlineDelete />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewForm;
