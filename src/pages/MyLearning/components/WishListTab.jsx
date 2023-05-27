import { Rating } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addWishListAction,
  removeWishListAction,
} from "../../../redux/userRedux";
import CourseCard from "../../../components/CourseCard/CourseCard";

export default function WishListTab() {
  const { listWishList } = useSelector((state) => state.user);

  const handleAddWishList = async (courseId) => {
    await addWishListAction(dispatch, courseId);
  };

  const handleRemoveWishList = async (courseId) => {
    await removeWishListAction(dispatch, courseId);
  };

  const dispatch = useDispatch();

  const nav = useNavigate();

  const handleNavigateToCart = (course) => {
    // Truyền state vào đây
    nav("/cart", { state: course });
  };

  return (
    <div className="row m-0 p-0 justify-content-evenly  align-items-center gap-1">
      {listWishList
        ? listWishList?.map((item, index) => {
            return (
              // <div
              //   key={index}
              //   className="card col-12 col-md-5 py-3 d-flex flex-xl-row flex-column align-items-center  card__course-item"
              // >
              //   <img
              //     src={
              //       item?.courseInfo?.avatar
              //         ? item?.courseInfo?.avatar
              //         : require("../../../assets/img/no-image-1771002-1505134.png")
              //     }
              //     className="card-img-top img-fluid avt__course"
              //     alt="..."
              //   />

              //   <div className="card-body w-100 d-flex flex-column align-items-center  align-items-md-start">
              //     <div
              //       className={"wish__icon__active"}
              //       onClick={() => {
              //         handleRemoveWishList(item?.courseInfo?.id);
              //       }}
              //     >
              //       <i className="fa-regular fa-heart ms-2"></i>
              //     </div>

              //     <div className="instructor">
              //       <img
              //         src={require("../../../assets/img/garden-model.png")}
              //         alt="Images"
              //         className="img-fluid avt__teacher"
              //       />
              //       <h3 className="name">
              //         <a href="course-details.html">David McLean</a>
              //       </h3>
              //     </div>
              //     <h5 className="card-title mb-2 ">{item?.courseInfo?.name}</h5>
              //     <div className="d-flex   mb-2">
              //       <div className="card-language me-1">
              //         Language: {item ? item?.courseInfo?.language : ""}
              //       </div>
              //       <div className="card-language">
              //         Số lượng học sinh:{" "}
              //         {item ? item?.courseInfo?.numStudents : ""}
              //       </div>
              //     </div>
              //     <div className="d-flex gap-1 align-items-center">
              //       <p className="card-text m-0">
              //         Giá :{" "}
              //         <span>
              //           {item?.courseInfo?.price === 0
              //             ? "Miễn phí"
              //             : item?.courseInfo?.price?.toLocaleString("vi", {
              //                 currency: "VND",
              //               }) + " VND"}
              //         </span>
              //       </p>
              //       <Rating
              //         name="read-only"
              //         value={item?.courseInfo?.rate}
              //         size="small"
              //         readOnly
              //       />
              //     </div>

              //     {/* <div className="card__layer">
              //     <div>
              //       <Link
              //         to={`/courses/${item.id}`}
              //         className="btn btn-primary"
              //       >
              //         Xem khóa học
              //       </Link>
              //     </div>
              //   </div> */}
              //   </div>
              //   <div className="course__link d-flex flex-column gap-2">
              //     <div onClick={() => handleNavigateToCart(item?.courseInfo)}>
              //       Mua ngay <i class="fa-solid fa-arrow-right"></i>
              //     </div>
              //     <Link to={`/courses/${item?.courseInfo?.id}`}>
              //       Xem khóa học <i class="fa-solid fa-arrow-right"></i>
              //     </Link>
              //   </div>
              // </div>
              <CourseCard
                item={item?.courseInfo}
                key={index}
                listWishList={listWishList}
              />
            );
          })
        : "Không có khóa học nào"}
    </div>
  );
}
