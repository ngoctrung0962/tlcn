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
import Loading from "../../../../components/Loading/Loading";

const QATab = ({ activeLecture }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const methodFilterQAValue =
        methodFilterQA === "byCourse"
          ? coursePath
          : methodFilterQA === "byChapter"
          ? activeLecture.chapterId
          : activeLecture.id;

      const resQA = await qaApi.filter(methodFilterQA, methodFilterQAValue);
      setListQA(resQA?.content);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const onSubmit = async (data) => {
    setLoading(true);
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
    } catch (error) {}
    setLoading(false);
  };

  const handleDeleteQuestion = async (id) => {
    setLoading(true);
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
    setLoading(false);
  };
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
                  disabled={loading}
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

          {!isOpenFormAddRep ? (
            <section
              style={{
                backgroundColor: "#eee",
              }}
              className="mb-4 p-2"
            >
              <div class=" ">
                {!loading || listQA?.length > 0 ? (
                  listQA?.map((item, index) => {
                    return (
                      <div
                        class="row d-flex justify-content-center mb-2"
                        key={index}
                      >
                        <div class="col-md-12 p-0 m-0">
                          <div class="card">
                            <div class="card-body">
                              <div class="d-flex flex-start align-items-center">
                                {/* Nút xóa */}
                                {currentUser?.username === item?.username && (
                                  <Button
                                    class="btn  btn-sm  "
                                    style={{
                                      position: "absolute",
                                      right: "5px",
                                      top: "5px",
                                      padding: "5px",
                                    }}
                                    disabled={loading}
                                    onClick={() =>
                                      handleDeleteQuestion(item?.id)
                                    }
                                  >
                                    <i
                                      class="fas fa-trash"
                                      style={{
                                        fontSize: "11px",
                                      }}
                                    ></i>
                                  </Button>
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
                                  __html: item?.content,
                                }}
                              ></p>

                              <div class="small d-flex justify-content-start">
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
                  })
                ) : (
                  <Loading />
                )}
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
