import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ListPost from "./component/ListPost";
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi,
} from "@uiw/react-md-editor";
import domToImage from "dom-to-image";
import "./component/editer.css";
export default function ForumPage() {
  const [value, setValue] = useState("");
  const nav = useNavigate();
  const [isOpenToolEditor, setIsOpenToolEditor] = useState(false);

  const textToImage = {
    name: "Text To Image",
    keyCommand: "text2image",
    buttonProps: { "aria-label": "Insert title3" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 20 20">
        <path
          fill="currentColor"
          d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
        ></path>
      </svg>
    ),
    execute: (state, api) => {
      const dom = document.getElementsByClassName("gooooooooo")[0];
      if (dom) {
        domToImage.toJpeg(dom, {}).then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "image.jpg";
          link.href = dataUrl;
          link.click();
        });
      }
    },
  };
  return (
    <div className="forumPage">
      {/* Header */}
      <div
        className="row header__tool d-flex flex-row justify-content-center align-items-center position-sticky  fixed-top "
        style={{
          background: "#fff",
          color: "#000",

          boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="tool__container d-flex flex-row justify-content-between align-items-center gap-4 my-2 flex-wrap">
          <span className="d-flex justify-content-between align-items-center">
            <Link
              className="navbar-brand justify-content-center align-items-center d-flex"
              to="/"
              style={{ fontSize: "14px", fontWeight: "bold", color: "#000" }}
              onClick={() => nav(-1)}
            >
              <MdKeyboardArrowLeft
                cursor="pointer"
                size={30}
                color={"#00693e"}
              />
              <span
                style={{
                  color: "#00693e",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Le
              </span>
              gacy
            </Link>
          </span>
          <div
            className="d-flex flex-row justify-content-center align-items-center gap-1"
            style={{
              color: "#fff",
            }}
          >
            {/* Form search */}
            <Form>
              <Form.Group
                className=""
                style={{
                  position: "relative",
                }}
              >
                <Form.Control
                  className="search__input"
                  type="text"
                  placeholder="Tìm kiếm bài viết"
                  style={{
                    paddingLeft: "40px",
                    border: "1px solid #E6E8EC",
                    borderRadius: "5px",
                  }}
                ></Form.Control>

                <img
                  src={require("../../assets/img/Search.png")}
                  alt=""
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </Form.Group>
            </Form>
          </div>
          <span className="d-flex flex-row justify-content-center align-items-center gap-3">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <img
                  src={require("../../assets/img/garden-model.png")}
                  alt=""
                  className="img-thumbnail"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="drop__menu">
                <Dropdown.Item>Trang cá nhân</Dropdown.Item>
                <Dropdown.Item>Bài viết của tôi</Dropdown.Item>
                <Dropdown.Item>Bài viết đã lưu</Dropdown.Item>
                <Dropdown.Item>Thêm bài viết</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
      </div>
      <div className="forum__content mt-2 py-2">
        <div className="row flex-column-reverse flex-md-row">
          <div className="col-12 col-md-8">
            <div className="forum__content__left">
              <div className="form__add">
                <div
                  className="form__add__content d-flex justify-content-between align-items-center"
                  onClick={() => {
                    setIsOpenToolEditor(!isOpenToolEditor);
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#9BA4B1",
                    }}
                  >
                    Thêm bài viết mới
                  </span>
                  <div
                    style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#fff",
                      backgroundColor: "#00693e",
                      borderRadius: "5px",
                      width: "30px",
                      height: "30px",
                      textAlign: "center",
                    }}
                  >
                    +
                  </div>
                </div>
                {isOpenToolEditor && (
                  <div
                    className="editer__add "
                    style={{
                      transition: "all 0.5s",
                    }}
                  >
                    <MDEditor
                      value={value}
                      onChange={setValue}
                      commands={[textToImage, commands.divider]}
                    />
                  </div>
                )}
              </div>
              <ListPost />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="forum__content__right">
              <div className="forum__content__right__title">
                <h3>Các chủ đề được đề xuất</h3>
              </div>
              <div className="forum__content__right__list">
                <ul>
                  <li className="topic__item">
                    <Link to="#">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Natus explicabo, nam pariatur ab omnis necessitatibus
                      assumenda
                    </Link>
                  </li>
                  <li className="topic__item">
                    <Link to="#">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Natus explicabo, nam pariatur ab omnis necessitatibus
                      assumenda
                    </Link>
                  </li>
                  <li className="topic__item">
                    <Link to="#">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Natus explicabo, nam pariatur ab omnis necessitatibus
                      assumenda
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
