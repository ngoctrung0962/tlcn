import React from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Route, Routes, useSearchParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import FormAddRep from "./components/FormAddRep";

const QATab = ({ listQuestion }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [CmtIdParams, setCmtIdParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({});
  const [commentId, setCommentId] = useState();

  const [isOpenFormAddRep, setIsOpenFormAddRep] = useState(false);
  const handleClick = (id) => {
    setCommentId(id);
    setIsOpenFormAddRep(true);
  };

  const listDataComments = [
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
  return (
    <div>
      <div className="question__container">
        <div className="question__form mb-4">
          <Form>
            <Row>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Thêm câu hỏi</Form.Label>
                  <Form.Control
                    className="mb-3"
                    placeholder="Nhập tiêu đề"
                  ></Form.Control>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Nhập câu hỏi"
                  ></Form.Control>
                </Form.Group>

                <Button
                  className="main__btn"
                  // onClick={handleSubmitQuestion(onSubmitQuestion)}
                >
                  Thêm câu hỏi
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className=" row question__list">
          <Form.Label>Danh sách câu hỏi ({listQuestion.length})</Form.Label>
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
                {listDataComments.map((item, index) => {
                  return (
                    <div class="row d-flex justify-content-center mb-2">
                      <div class="col-md-12 p-0 m-0">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex flex-start align-items-center">
                              <img
                                class="rounded-circle shadow-1-strong me-3"
                                src={item?.user?.avatar}
                                alt="avatar"
                                width="60"
                                height="60"
                              />
                              <div>
                                <h6
                                  class="fw-bold  mb-1"
                                  style={{
                                    color: "#00693e",
                                  }}
                                >
                                  {item?.user?.name}
                                </h6>
                                <p class="text-muted small mb-0">
                                  {item.title} - {item.date_created}
                                </p>
                              </div>
                            </div>

                            <p
                              class="mt-3 mb-2 pb-2"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              {item.content}
                            </p>

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
              setIsOpenFormAddRep={setIsOpenFormAddRep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QATab;
