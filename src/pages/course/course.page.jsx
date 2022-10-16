import { Rating } from "@mui/material";
import { Tab } from "bootstrap";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Tabs } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import coursesApi from "../../api/coursesApi";
import reviewApi from "../../api/reviewApi";
import ReviewForm from "./reviewForm/reviewForm";

const CoursePage = (props) => {
  const courseId = useLocation().pathname.split("/")[2];
  const [course, setCourse] = useState();
  const [listReviews, setListReviews] = useState();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await coursesApi.get(courseId);
        setCourse(res.data);
        const resReview = await reviewApi.getReviewByCourseId(courseId);
        setListReviews(resReview.data.content);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, [courseId]);
  return (
    <div className="container course__page">
      <div className="row d-flex flex-row">
        <div className="col-12 col-lg-9 col-md-7">
          <div className="course__left m-3">
            <h3 className="course__title">{course ? course.name : ""}</h3>
            <div className="course__dess">
              {course ? course.description : ""}
            </div>
            <div className="course__social">
              <div className="course__rating d-flex flex-row align-items-center gap-3">
                <Rating name="read-only" value={5} readOnly size="small" />
                <span className="total">
                  {" "}
                  5.0 ({listReviews ? listReviews.length : "0"} review)
                </span>
                <p className="m-0">
                  Đang có {course ? course.numStudents : ""} học viên tham gia
                </p>
              </div>
              <img
                className="img-fluid course__img"
                src={require("../../assets/img/course.webp")}
                alt=""
              />
            </div>
            <div className="course__left__image "></div>
          </div>
          <section id="course__content" className="course__content mb-3">
            <Tabs
              defaultActiveKey="coursecontent"
              id="uncontrolled-tab-example"
              className="justify-content-center"
            >
              <Tab
                eventKey="coursecontent"
                title="Nội dung khóa học"
                className="p-3 mb-3"
              >
                <div className="course__content__item">
                  <h4 className="course__content__title">Giới thiệu</h4>
                  <div className="course__content__des">
                    <p>
                      <strong>Khóa học này dành cho ai?</strong>
                    </p>
                    <p>
                      Khóa học này dành cho những người muốn học cách học online
                    </p>
                    <p>
                      <strong>Khóa học này có gì?</strong>
                    </p>
                    <p>
                      Khóa học này có 3 bài học, mỗi bài học có 1 video và 1 bài
                      tập
                    </p>
                    <p>
                      <strong>Khóa học này có bao nhiêu bài học?</strong>
                    </p>
                    <p>Khóa học này có 3 bài học</p>
                    <p>
                      <strong>Khóa học này có bao nhiêu video?</strong>
                    </p>
                    <p>Khóa học này có 3 video</p>
                    <p>
                      <strong>Khóa học này có bao nhiêu bài tập?</strong>
                    </p>
                    <p>Khóa học này có 3 bài tập</p>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="review" title="Đánh giá (3)">
                <ReviewForm listReviews={listReviews} />
              </Tab>
            </Tabs>
          </section>
        </div>
        <div className="col-12 col-lg-3 col-md-5 card__detail">
          <div className="course__right m-3 p-3">
            <h3 className="course__title">{course ? course.name : ""}</h3>
            <div className="course__dess">
              {course ? course.description : ""}
            </div>
            <div className="course__social">
              <div className="course__rating d-flex flex-row align-items-center gap-3 mb-2">
                <span className="total">
                  {" "}
                  5.0 ({listReviews ? listReviews.length : "0"} review)
                </span>
                <p className="m-0">
                  Đang có {course ? course.numStudents : ""} học viên tham gia
                </p>
              </div>
              <div className="course__rating d-flex flex-row align-items-center gap-3">
                <div className="course-language">
                  <span className="course-language__title">
                    Ngôn ngữ: {course ? course.language : ""}
                  </span>
                </div>
                <Rating name="read-only" value={5} readOnly size="small" />
              </div>
            </div>
            <img
              className="img-fluid course__img"
              src={require("../../assets/img/course.webp")}
              alt=""
            />

            <p className="text-center mt-3 course__price">
              <span> Chỉ</span> 2.999.000 <span>VNĐ</span>{" "}
            </p>
            <div className="d-flex justify-content-center mt-3">
              <button className="  btn-dkkh">Đăng kí ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
