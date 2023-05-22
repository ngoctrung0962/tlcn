import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Swal from "sweetalert2";
import qaApi from "../../../../api/qaApi";
import uploadFileApi from "../../../../api/uploadFileApi";
import { formatDateDisplay } from "../../../../utils/MyUtils";
import FormAddRep from "./components/FormAddRep";

const QATab = ({ listQuestion, activeLecture }) => {
  const coursePath = useLocation().pathname.split("/")[2];
  const { currentUser } = useSelector((state) => state.user);
  // Lấy search params
  const [searchParams, setSearchParams] = useSearchParams();

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
      chapterId: activeLecture?.chapterId,
      lectureId: activeLecture?.id,
      courseId: coursePath,
      parentId: "-1",
      content: "",
    },
  });
  const [commentId, setCommentId] = useState();

  const [isOpenFormAddRep, setIsOpenFormAddRep] = useState(false);
  const handleClick = (id) => {
    setCommentId(id);
    setIsOpenFormAddRep(true);
  };

  const [listQA, setListQA] = useState();
  // Form add question
  //get data Q&A from api
  const [methodFilterQA, setMethodFilterQA] = useState("byCourse");
  const fetchDataQA = async () => {
    try {
      const methodFilterQAValue =  methodFilterQA === "byCourse"? coursePath
      : methodFilterQA === "byChapter"? activeLecture.chapterId
      : activeLecture.id;

      const requestParams = {
        methodFilterQA: methodFilterQAValue
      }

      // const resQA = await axios.get(
      //   `http://localhost:8080/api/v1/discusses?${methodFilterQA}=${
      //     methodFilterQA === "byCourse"
      //       ? coursePath
      //       : methodFilterQA === "byChapter"
      //       ? activeLecture.chapterId
      //       : activeLecture.id
      //   }&page=0&limit=100`
      // );
      const resQA = await qaApi.filter(requestParams);
      console.log("resQA", resQA.data.content);
      setListQA(resQA.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const res = await qaApi.addQA(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm câu hỏi thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchDataQA();
        reset();
      }
      console.log("res", res);
    } catch (error) {}
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

  useEffect(() => {
    fetchDataQA();
  }, [isOpenFormAddRep, methodFilterQA, searchParams.get("id")]);

  useEffect(() => {
    reset({
      chapterId: activeLecture?.chapterId,
      lectureId: activeLecture?.id,
      courseId: coursePath,
      parentId: "-1",
      content: "",
    });
  }, [activeLecture]);
  return (
    <div>
      <div className="question__container">
        <div className="question__form mb-4">
          <Form>
            <Row>
              <Col md={12} xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Thêm câu hỏi</Form.Label>
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
                        ["align", "horizontalRule", "list", "lineHeight"],
                        ["table", "link", "image", "video", "audio"],
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

                <Button
                  className="main__btn"
                  // onClick={handleSubmitQuestion(onSubmitQuestion)}
                  onClick={handleSubmit(onSubmit)}
                >
                  Thêm câu hỏi
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className=" row question__list">
          <Form.Label>Danh sách câu hỏi ({listQA?.length})</Form.Label>
          <Form.Select
            style={{
              width: "200px",
            }}
            className="mb-3"
            onChange={(e) => {
              setMethodFilterQA(e.target.value);
            }}
          >
            <option value="byCourse">Tất cả</option>
            <option value="byChapter">Theo chapter</option>
            <option value="byLecture">Theo bài giảng</option>
          </Form.Select>
          {/* {listQuestion?.map((item, index) => {
            return (
              <div className=" question__item mb-2 row" key={index}>
                <div className="question__left col col-12 col-md-2">
                  <div className="question__item-avatar">
                    <img
                      src={require("../../../../assets/img/avt.jpg")}
                      alt=""
                      className=""
                    />
                  </div>
                  <div className="question__item-name">{item.user.name}</div>
                  <span className="question__item-time me-3">
                    {item.date_created}
                  </span>
                </div>
                <div className="question__right col col-12 col-md-10">
                  <div className="question__item-header d-flex w-100">
                    <span className="question__item-title ">{item.title}</span>
                    <div className="question__item-tool d-flex gap-2">
                      <AiOutlineDelete size={24} cursor="pointer" />
                      <AiOutlineEdit size={24} cursor="pointer" />
                    </div>
                  </div>

                  <div className="question__item-content">{item.content}</div>

                  <div className="question__item-des d-flex gap-1"></div>
                </div>
              </div>
            );
          })} */}

          {!isOpenFormAddRep ? (
            <section
              style={{
                backgroundColor: "#eee",
              }}
              className="mb-4 p-2"
            >
              <div class=" ">
                {listQA?.map((item, index) => {
                  return (
                    <div class="row d-flex justify-content-center mb-2">
                      <div class="col-md-12 p-0 m-0">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex flex-start align-items-center">
                              {/* Nút xóa */}
                              {currentUser?.username === item?.username && (
                                <div
                                  class="btn  btn-sm  "
                                  style={{
                                    position: "absolute",
                                    right: "5px",
                                    top: "5px",
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
                                width="60"
                                height="60"
                              />
                              <div>
                                <h6
                                  class="fw-bold  mb-1"
                                  style={{
                                    color: "#054a49",
                                  }}
                                >
                                  {item?.username}
                                </h6>
                                <p class="text-muted small mb-0">
                                  {item?.title} -{" "}
                                  {formatDateDisplay(item?.createdDate)}
                                </p>
                              </div>
                            </div>

                            <p
                              class="mt-3 mb-2 pb-2"
                              style={{
                                fontSize: "12px",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: item.content,
                              }}
                            ></p>

                            <div class="small d-flex justify-content-start">
                              <a
                                href="#!"
                                class="d-flex align-items-center me-3"
                              >
                                <i class="far fa-thumbs-up me-2"></i>
                                <p class="mb-0">Like</p>
                              </a>

                              <div
                                class="d-flex align-items-center me-3"
                                onClick={() => handleClick(item?.id)}
                              >
                                <i class="fas fa-share me-2"></i>
                                <p class="mb-0">Reply</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : (
            <FormAddRep
              commentId={commentId}
              activeLecture={activeLecture && activeLecture}
              setIsOpenFormAddRep={setIsOpenFormAddRep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QATab;
