import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
const FormAddRep = ({ commentId, setIsOpenFormAddRep }) => {
  console.log(commentId);
  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({});
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
                  <img
                    class="rounded-circle shadow-1-strong me-3"
                    src={currentUser?.avatar}
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
                      Lily Coleman
                    </h6>
                    <p
                      class="text-muted  mb-0"
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Shared publicly - Jan 2020
                    </p>
                  </div>
                </div>

                <p
                  class="mt-3 mb-2 pb-2"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip consequat.
                </p>

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
                  Phản hồi {`(${listDataReply.length})`}
                </h4>
                <div className="d-flex flex-column">
                  {listDataReply.map((item, index) => {
                    return (
                      <div className="rep-cmt__item mb-3">
                        <div class="d-flex flex-start align-items-center mb-1">
                          <img
                            class="rounded-circle shadow-1-strong me-3"
                            src={item.user.avatar}
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
                              {item.user.name}
                            </h6>
                            <p
                              class="text-muted mb-0"
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              {item.title} - {item.date_created}
                            </p>
                          </div>
                        </div>
                        <div className="rep-cmt__content">
                          <div
                            className="rep-cmt__text"
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            {item.content}
                          </div>
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
                        ],
                      }}
                      setContents={getValues("description")}
                      onChange={(content) => {
                        setValue("content", content);
                      }}
                      height="100%"
                      setDefaultStyle="font-family: 'Readex Pro', sans-serif; "
                    />
                    <label class="form-label" for="textAreaExample">
                      Message
                    </label>
                  </div>
                </div>
                <div class="float-end mt-2 pt-1">
                  <button type="button" class="btn btn-primary btn-sm">
                    Post comment
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
