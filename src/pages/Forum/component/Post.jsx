import React from "react";
import { BiLike, BiTimeFive } from "react-icons/bi";
import { TfiCommentAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
export default function Post() {
  return (
    <div className="post__item">
      <div className="row">
        <div className="  col-12 col-md-6">
          <div className="post__item__img">
            <img
              src={require("../../../assets/img/Photo.png")}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="post__item__content mt-2 mt-md-0">
            <div
              className="d-flex  gap-1 "
              style={{
                marginBottom: "20px",
              }}
            >
              <div className="time tool__interact">
                <BiTimeFive />
                <span> 15, Sep, 2021</span>
              </div>
              <div className="like tool__interact">
                <BiLike />
                <span>2,729 Like</span>
              </div>
              <div className="comment tool__interact">
                <TfiCommentAlt />
                <span>2,729 Comment</span>
              </div>
            </div>
            <div className="post__item__content__title">
              <Link to="#">
                Morbi eu risus nulla. Aliquam erat volutp nullam vitae ex id
                justo modo facilisis.
              </Link>
            </div>
            <div className="post__item__content__desc">
              <p>
                Aenean interdum arcu sit amet nulla lacinia suscipit. Vivamus at
                laoreet mi. Fusce pulvinar commodo ligula, et egestas dolor. Ut
                hendrerit blandit neque in tempor.
              </p>
            </div>
            <div className="post__item__content__author d-flex gap-2">
              <button className="btn__read">
                Readmore
                <MdOutlineNavigateNext color="#fff" />
              </button>

              <div
                style={{
                  display: "block",
                  width: "1px",
                  height: "100%",
                  backgroundColor: "#000",
                }}
              >
                {""}
              </div>
              <div className="author__info d-flex flex-wrap">
                <div className="author__info__img me-3 ">
                  <img
                    className="img-fluid"
                    src={require("../../../assets/img/garden-model.png")}
                    alt=""
                  />
                </div>
                <div className="author__info__name">
                  <span>By</span>
                  <span>Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
