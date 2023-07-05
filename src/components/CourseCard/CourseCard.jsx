import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addWishListAction, removeWishListAction } from "../../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
export default function CourseCard({ item, listWishList, isWasBought }) {
  const nav = useNavigate();

  const handleNavigateToCart = (course) => {
    // Truyền state vào đây
    nav("/cart", { state: course });
  };
  const dispatch = useDispatch();

  const handleAddWishList = async (courseId) => {
    await addWishListAction(dispatch, courseId);
  };

  const handleRemoveWishList = async (courseId) => {
    await removeWishListAction(dispatch, courseId);
  };
  return (
    <div
      // data-aos="flip-left"
      className="card   d-flex flex-xl-row flex-column align-items-center  card__course-item"
    >
      <img
        src={
          item?.avatar
            ? item?.avatar
            : require("../../assets/img/no-image-1771002-1505134.png")
        }
        className="card-img-top img-fluid avt__course"
        alt="..."
      />

      <div className="card-body w-100 d-flex flex-column align-items-center  align-items-md-start">
        <div
          className={
            listWishList?.find((e) => e.courseInfo.id === item.id)
              ? "wish__icon__active"
              : "wish__icon"
          }
          onClick={() => {
            if (listWishList?.find((e) => e.courseInfo.id === item.id)) {
              handleRemoveWishList(item.id);
            } else handleAddWishList(item.id);
          }}
        >
          <i className="fa-regular fa-heart ms-2"></i>
        </div>

        <div className="instructor">
          <img
            src={require("../../assets/img/garden-model.png")}
            alt="Images"
            className="img-fluid avt__teacher"
          />
          <h3 className="name">
            <Link to={`/teacher/${item?.accountName}`}>
              {item?.accountName}
            </Link>
          </h3>
        </div>
        <h5 className="card-title mb-2 ">{item?.name}</h5>
        <div className="d-flex   mb-2">
          <div className="card-language me-1">
            Language: {item ? item?.language : ""}
          </div>
          <div className="card-language">
            Số lượng học sinh: {item ? item?.numStudents : ""}
          </div>
        </div>
        <div className="d-flex gap-1 align-items-center">
          <p className="card-text m-0">
            Giá :{" "}
            <span>
              {item?.price === 0
                ? "Miễn phí"
                : item?.price?.toLocaleString("vi", {
                    currency: "VND",
                  }) + " VND"}
            </span>
          </p>
          <Rating name="read-only" value={item?.rate} size="small" readOnly />
        </div>
      </div>
      <div className="course__link d-flex flex-column gap-2">
        {isWasBought ? (
          <div onClick={() => nav(`/learn/${item.id}`)}>
            Học ngay <i className="fa-solid fa-arrow-right"></i>
          </div>
        ) : (
          <div onClick={() => handleNavigateToCart(item)}>
            Mua ngay <i className="fa-solid fa-arrow-right"></i>
          </div>
        )}

        <Link to={`/courses/${item?.id}`}>
          Xem khóa học <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}
