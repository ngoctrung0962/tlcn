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
    <div className="row m-3 align-items-center ">
      {listWishList
        ? listWishList?.map((item, index) => {
            return (
              <div className="col-12 col-md-6 " key={index}>
                <CourseCard
                  item={item?.courseInfo}
                  key={index}
                  listWishList={listWishList}
                />
              </div>
            );
          })
        : "Không có khóa học nào"}
    </div>
  );
}
