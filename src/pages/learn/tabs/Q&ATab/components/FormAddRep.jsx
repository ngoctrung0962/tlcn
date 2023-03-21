import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, NavItem, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Swal from "sweetalert2";
import qaApi from "../../../../../api/qaApi";
import uploadFileApi from "../../../../../api/uploadFileApi";
import { formatDateDisplay } from "../../../../../utils/MyUtils";
const FormAddRep = ({ commentId, setIsOpenFormAddRep, activeLecture }) => {
  console.log("activeLecture 1 :", activeLecture);
  const coursePath = useLocation().pathname.split("/")[2];

  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      chapterId: "25",
      lectureId: "24",
      courseId: "COU03",
      parentId: commentId,
      content: "",
    },
  });
  useEffect(() => {
    reset({
      chapterId: activeLecture?.chapterId,
      lectureId: activeLecture?.id,
      courseId: coursePath,
      parentId: commentId,
      content: "",
    });
  }, [activeLecture]);
  const listDataReply = [
    {
      id: 1,
      user: {
        name: "Nguyễn Văn A",
        avatar:
          "https://users-avatars-online-courses.s3.us-west-2.amazonaws.com/man-1.png",
      },
      title: "Câu hỏi 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date_created: "2021-10-10",
    },
    {
      id: 2,
      user: {
        name: "Nguyễn Văn B",
        avatar:
          "https://users-avatars-online-courses.s3.us-west-2.amazonaws.com/man-1.png",
      },
      title: "Câu hỏi 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date_created: "2021-10-10",
    },
  ];

  const [listChild, setListChild] = useState();
  const [QA, setQA] = useState();
  const fetchDataQA = async () => {
    try {
      const response = await qaApi.getbyId(commentId);
      setQA(response.data);

      const resChild = await qaApi.getQAChild(commentId);
      setListChild(resChild.content);
    } catch (error) {
      console.log("Failed to fetch data: ", error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await qaApi.addQA(data);
      if (response.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thêm câu trả lời thành công",
          showConfirmButton: false,
        });
        fetchDataQA();
        console.log(response);
        reset();
      }
    } catch (error) {
      console.log("Failed to fetch data: ", error);
    }
  };

  const handleUploadImageBefore = async (files, info, uploadHandler) => {
    // uploadHandler(files);
    console.log("handleUploadImageBefore", uploadHandler);
    console.log("info", info);
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
    console.log("target", targetImgElement);
    console.log("image", imageInfo);
    // Thay đổi đường dẫn ảnh
    // targetImgElement.src = imageInfo.src;
  };
  const handleDeleteQuestion = async (id) => {
    try {
      const res = await qaApi.delete(id);
      if (res.errorCode === null) {
        Swal.fire({
          icon: "success",
          title: "Xóa câu hỏi thành công",
          showConfirmButton: false,
          timer: 1500,
        });

        fetchDataQA();
        if (id === commentId) {
          setIsOpenFormAddRep(false);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Xóa câu hỏi thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDataQA();
  }, []);
  return (
    <section
      style={{
        backgroundColor: "#eee",
      }}
      className="mb-4 p-2"
    >
      {" "}
      <div>
        <button
          className="main__btn  float-left"
          onClick={() => {
            setIsOpenFormAddRep(false);
          }}
        >
          <i class="fa-solid fa-arrow-left me-2"></i>
          Tất cả câu hỏi
        </button>
        <div class="row d-flex justify-content-center">
          <div class="col-md-12 p-0 m-0">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-start align-items-center">
                  {/* Nút xóa */}
                  {currentUser?.username === QA?.username && (
                    <div
                      class="btn  btn-sm  "
                      style={{
                        position: "absolute",
                        right: "5px",
                        top: "5px",
                        padding: "5px",
                      }}
                      onClick={() => {
                        handleDeleteQuestion(QA?.id);
                      }}
                    >
                      <i
                        class="fas fa-trash"
                        style={{
                          fontSize: "11px",
                        }}
                      ></i>
                    </div>
                  )}
                  <img
                    class="rounded-circle shadow-1-strong me-3"
                    src={QA?.ownerAvt}
                    alt="avatar"
                    width="50"
                    height="50"
                  />
                  <div>
                    <h6
                      class="fw-bold  mb-1"
                      style={{
                        color: "#00693e",
                        fontSize: "14px",
                      }}
                    >
                      {QA?.username}
                    </h6>
                    <p
                      class="text-muted  mb-0"
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {QA?.title} {"-"}
                      {formatDateDisplay(QA?.createdDate)}
                    </p>
                  </div>
                </div>

                <p
                  class="mt-3 mb-2 pb-2"
                  style={{
                    fontSize: "12px",
                  }}
                  dangerouslySetInnerHTML={{ __html: QA?.content }}
                ></p>

                <div class="small d-flex justify-content-start">
                  <a href="#!" class="d-flex align-items-center me-3">
                    <i class="far fa-thumbs-up me-2"></i>
                    <p class="mb-0">Like</p>
                  </a>
                  <a href="#!" class="d-flex align-items-center me-3">
                    <i class="far fa-comment-dots me-2"></i>
                    <p class="mb-0">Comment</p>
                  </a>
                  <a href="#!" class="d-flex align-items-center me-3">
                    <i class="fas fa-share me-2"></i>
                    <p class="mb-0">Share</p>
                  </a>
                </div>
              </div>

              {/* List trả lời cmt */}
              <div className="ms-4">
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    marginBottom: "14px",
                  }}
                >
                  Phản hồi {`(${listChild?.length})`}
                </h4>
                <div className="d-flex flex-column">
                  {listChild?.map((item, index) => {
                    return (
                      <div
                        className="rep-cmt__item mb-3"
                        style={{
                          position: "relative",
                        }}
                      >
                        <div class="d-flex flex-start align-items-center mb-1">
                          {/* Nút xóa */}
                          {currentUser?.username === item?.username && (
                            <div
                              class="btn  btn-sm  "
                              style={{
                                position: "absolute",
                                right: "5px",
                                top: "0px",
                                padding: "5px",
                              }}
                              onClick={() => handleDeleteQuestion(item?.id)}
                            >
                              <i
                                class="fas fa-trash"
                                style={{
                                  fontSize: "11px",
                                }}
                              ></i>
                            </div>
                          )}
                          <img
                            class="rounded-circle shadow-1-strong me-3"
                            src={item?.ownerAvt}
                            alt="avatar"
                            width="30"
                            height="30"
                          />
                          <div>
                            <h6
                              class="fw-bold  mb-0"
                              style={{
                                fontSize: "12px",
                                color: "#00693e",
                              }}
                            >
                              {item?.username}
                            </h6>
                            <p
                              class="text-muted mb-0"
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              {item.title} -{" "}
                              {formatDateDisplay(item.createdDate)}
                            </p>
                          </div>
                        </div>
                        <div className="rep-cmt__content">
                          <div
                            className="rep-cmt__text"
                            style={{
                              fontSize: "12px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                class="card-footer py-3 border-0"
                style={{
                  "background-color": "#f8f9fa",
                }}
              >
                <div class="d-flex flex-start w-100">
                  <img
                    class="rounded-circle shadow-1-strong me-3"
                    src={currentUser?.avatar}
                    alt="avatar"
                    width="40"
                    height="40"
                  />
                  <div class="form-outline w-100">
                    <Form>
                      <Row>
                        <Col md={12} xs={12}>
                          <Form.Group className="mb-3">
                            <Form.Control
                              className="mb-3"
                              placeholder="Nhập tiêu đề"
                              {...register("title", {
                                required: "Tiêu đề không được để trống",
                              })}
                            ></Form.Control>

                            <SunEditor
                              setOptions={{
                                buttonList: [
                                  ["undo", "redo"],
                                  ["font", "fontSize", "formatBlock"],
                                  ["paragraphStyle", "blockquote"],
                                  ["bold", "underline", "italic"],
                                  ["fontColor", "hiliteColor", "textStyle"],
                                  ["removeFormat"],
                                  ["outdent", "indent"],
                                  [
                                    "align",
                                    "horizontalRule",
                                    "list",
                                    "lineHeight",
                                  ],
                                  ["table", "link", "image"],
                                ],
                              }}
                              setContents={getValues("content")}
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
                      </Row>
                    </Form>
                  </div>
                </div>
                <div class="float-end mt-2 pt-1">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Thêm phản hồi
                  </button>
                  <button type="button" class="btn btn-outline-primary btn-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormAddRep;
