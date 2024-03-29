import { Rating } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import coursesApi from "../../api/coursesApi";
import reviewApi from "../../api/reviewApi";
import ReviewForm from "./reviewForm/reviewForm";
import { FaShoppingCart, FaRegRegistered } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handleAddtoCart } from "../../redux/cartRedux";
import Swal from "sweetalert2";
import { formatDateDisplay } from "../../utils/MyUtils";
import { Tabs, Tab } from "react-bootstrap";
const CoursePage = (props) => {
  const user = useSelector((state) => state.user.currentUser);
  const nav = useNavigate();
  const { listCart } = useSelector((state) => state.cart);
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
      } catch (error) {
        nav("/404");
      }
    };
    getCourse();
  }, [courseId]);
  const dispatch = useDispatch();
  const handleSubmitAddtoCart = async (courseId) => {
    await handleAddtoCart(courseId, dispatch, listCart);
  };

  // Kiểm tra khóa học đã được đăng ký hay chưa
  const [wasBought, setWasBought] = useState(false);
  useEffect(() => {
    const checkRegistered = async () => {
      try {
        const res = await coursesApi.checkisPurchaseCourse(
          courseId,
          user?.username
        );
        setWasBought(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkRegistered();
  }, [courseId, user?.username]);

  //Hàm đăng kí khóa học public
  const handleRegisterFreeCourse = async () => {
    try {
      const res = await coursesApi.purcharPublicCourse(courseId);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Đăng kí khóa học thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        setWasBought(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Đăng kí khóa học thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container course__page">
      <div className="row d-flex flex-row">
        <div className="col-12 col-lg-9 col-md-7">
          <div className="course__left m-3">
            <h3 className="course__title">{course ? course?.name : ""}</h3>
            {/* Thông tin giảng viên start*/}
            <div className="d-flex flex-row align-items-center gap-2">
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#2d3748",
                }}
              >
                {" "}
                Giảng viên:
              </span>

              <Link
                className="course__teacher align-items-center gap-2 d-flex"
                to={`/teacher/${course?.accountName}`}
              >
                <div className="course__teacher__avatar">
                  <img
                    className="img-fluid"
                    src={course?.ownerAvt}
                    alt="avatar"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div className="course__teacher__info">
                  <h5 className="m-0">{course?.accountName}</h5>
                </div>
              </Link>
            </div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "10px",
              }}
            >
              Ngày phát hành: {formatDateDisplay(course?.createDate)}
            </p>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "10px",
              }}
            >
              Lần cần nhật gần đây: {formatDateDisplay(course?.updateDate)}
            </p>

            {/* Thông tin giảng viên end*/}
            <div className="course__social">
              <div className="course__rating d-flex flex-row align-items-center gap-3">
                <Rating
                  name="read-only"
                  value={course ? course.rate : 0}
                  readOnly
                  size="small"
                />
                <span className="total">
                  ({listReviews ? listReviews?.length : "0"} lượt đánh giá)
                </span>
                <p className="m-0">
                  Đang có {course ? course?.numStudents : ""} học viên tham gia
                </p>
              </div>
              <div className="course__img">
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_fq7pwzey.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              </div>

              {/* <img
                className="img-fluid course__img"
                src={require("../../assets/img/course.webp")}
                alt=""
              /> */}
            </div>
            <div className="course__left__image "></div>
          </div>
          <section id="course__content" className="course__content mb-3">
            <Tabs
              defaultActiveKey="coursecontent"
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
                    <div
                      className="course__dess"
                      dangerouslySetInnerHTML={{
                        __html: course?.description,
                      }}
                    ></div>
                  </div>
                </div>
              </Tab>
              <Tab
                eventKey="review"
                title={`Đánh giá (${listReviews ? listReviews.length : "0"})`}
              >
                <ReviewForm
                  wasBought={wasBought}
                  listReviews={listReviews}
                  setListReviews={setListReviews}
                  courseId={courseId}
                />
              </Tab>
            </Tabs>
          </section>
        </div>
        <div className="col-12 col-lg-3 col-md-5 card__detail">
          <div className="course__right m-3 p-3">
            <h3 className="course__title">{course ? course.name : ""}</h3>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: course?.description,
              }}
              className="course__dess"
            ></div> */}
            <div className="course__social d-flex flex-column gap-3">
              <div className="course__rating d-flex align-items-center gap-2">
                <Rating
                  name="read-only"
                  value={course ? course.rate : 0}
                  readOnly
                  size="small"
                />
                <span className="total">
                  ({listReviews ? listReviews.length : "0"} review)
                </span>
              </div>

              <p className="m-0">
                Đang có {course ? course.numStudents : ""} học viên tham gia
              </p>
              <div className="course__rating">
                <div className="course-language">
                  <span className="course-language__title">
                    Ngôn ngữ: {course ? course.language : ""}
                  </span>
                </div>
              </div>
            </div>
            <img
              className="img-fluid course__img"
              src={course?.avatar ? course?.avatar : ""}
              alt="avatarcourse"
            />

            {course?.price !== 0 ? (
              <p className="text-center mt-3 course__price">
                <span> Chỉ</span>{" "}
                {course
                  ? course.price.toLocaleString("vi", {
                      currency: "VND",
                    })
                  : ""}{" "}
                <span>VNĐ</span>{" "}
              </p>
            ) : (
              <p className="text-center mt-3 course__price">
                <span> Miễn phí</span>{" "}
              </p>
            )}
            {/* <p className="text-center mt-3 course__price">
              <span> Chỉ</span>{" "}
              {course
                ? course.price.toLocaleString("vi", {
                    currency: "VND",
                  })
                : ""}{" "}
              <span>VNĐ</span>{" "}
            </p> */}

            {wasBought ? (
              <div className="d-flex justify-content-center mt-3 gap-2">
                <Link className="  btn-dkkh" to={`/learn/${courseId}`}>
                  Học ngay
                </Link>
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-3 gap-2">
                {course?.public === true && (
                  <button
                    className="  btn-dkkh"
                    onClick={handleRegisterFreeCourse}
                  >
                    Đăng kí ngay <FaRegRegistered />
                  </button>
                )}

                <button
                  className="  btn-dkkh"
                  onClick={() => handleSubmitAddtoCart(course?.id)}
                >
                  Thêm vào giỏ hàng <FaShoppingCart />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
