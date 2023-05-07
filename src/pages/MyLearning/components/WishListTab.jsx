import { Rating } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addWishListAction } from "../../../redux/userRedux";

export default function WishListTab() {
  const { listWishList } = useSelector((state) => state.user);
  console.log(listWishList);
  const handleAddWishList = async (courseId) => {
    await addWishListAction(dispatch, courseId);
  };
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleNavigateToCart = (course) => {
    // Truyền state vào đây
    nav("/cart", { state: course });
  };
  return (
    <div>
      {listWishList
        ? listWishList?.map((item, index) => {
            return (
              <div
                data-aos="flip-left"
                key={index}
                className="card col-12 col-md-5 py-3 d-flex flex-xl-row flex-column align-items-center  card__course-item"
              >
                <img
                  src={
                    item?.courseInfo?.avatar
                      ? item?.courseInfo?.avatar
                      : require("../../../assets/img/no-image-1771002-1505134.png")
                  }
                  className="card-img-top img-fluid avt__course"
                  alt="..."
                />

                <div className="card-body w-100 d-flex flex-column align-items-center  align-items-md-start">
                  <div
                    className={
                      listWishList?.find(
                        (e) => e.courseInfo.id === item.courseInfo?.id
                      )
                        ? "wish__icon__active"
                        : "wish__icon"
                    }
                    onClick={() => handleAddWishList(item.courseInfo?.id)}
                  >
                    <i className="fa-regular fa-heart ms-2"></i>
                  </div>

                  <div className="instructor">
                    <img
                      src={require("../../../assets/img/garden-model.png")}
                      alt="Images"
                      className="img-fluid avt__teacher"
                    />
                    <h3 className="name">
                      <a href="course-details.html">David McLean</a>
                    </h3>
                  </div>
                  <h5 className="card-title mb-2 ">{item?.courseInfo?.name}</h5>
                  <div className="d-flex   mb-2">
                    <div className="card-language me-1">
                      Language: {item ? item.courseInfo?.language : ""}
                    </div>
                    <div className="card-language">
                      Số lượng học sinh:{" "}
                      {item ? item.courseInfo?.numStudents : ""}
                    </div>
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    <p className="card-text m-0">
                      Giá :{" "}
                      <span>
                        {item.courseInfo?.price === 0
                          ? "Miễn phí"
                          : item.courseInfo?.price.toLocaleString("vi", {
                              currency: "VND",
                            }) + " VND"}
                      </span>
                    </p>
                    <Rating
                      name="read-only"
                      value={item?.courseInfo?.rate}
                      size="small"
                      readOnly
                    />
                  </div>
                </div>
                <div className="course__link d-flex flex-column gap-2">
                  <div onClick={() => handleNavigateToCart(item.courseInfo)}>
                    Mua ngay <i class="fa-solid fa-arrow-right"></i>
                  </div>
                  <Link to={`/courses/${item.courseInfo?.id}`}>
                    Xem khóa học <i class="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            );
          })
        : "Không có khóa học nào"}
    </div>
  );
}
