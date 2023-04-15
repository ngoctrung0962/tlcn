import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleDeleteFromCart } from "../../../../redux/cartRedux";

const CartItem = ({
  course,
  setDataPost,
  dataPost,
  tongTien,
  setTongTien,
  disableClick = false,
}) => {
  const dispatch = useDispatch();
  const handleSubmitDeleteFromCart = async (courseId) => {
    await handleDeleteFromCart(courseId, dispatch);
  };
  return (
    <div className="cart__item d-flex">
      <FormControlLabel
        control={
          <Checkbox
            disabled={disableClick}
            defaultChecked={disableClick}
            onChange={(e) => {
              console.log(e.target.checked);
              if (e.target.checked === true) {
                setDataPost({
                  ...dataPost,
                  orderDetailList: [
                    ...dataPost.orderDetailList,
                    `${course.id}`,
                  ],
                });
                setTongTien(tongTien + course.price);
              } else {
                setDataPost({
                  ...dataPost,
                  orderDetailList: dataPost.orderDetailList.filter(
                    (i) => i !== `${course.id}`
                  ),
                });
                setTongTien(tongTien - course.price);
              }
            }}
          />
        }
      />
      <div className="cart__item__img ">
        <img className="img-thumb" src={course.avatar} alt="avt" />
      </div>
      <div className="cart__item__info">
        <Link to={`/courses/${course.id}`}>
          <h3>{course.name}</h3>
        </Link>

        <p>{course.price.toLocaleString()} VNĐ</p>

        <div className="wish__list__btn">
          Add to wishlist
          <i className="fa-regular fa-heart ms-2"></i>
        </div>
      </div>
      {disableClick !== true && (
        <div className="icon__delete__item">
          <i
            className="fa-solid fa-xmark"
            onClick={() => {
              handleSubmitDeleteFromCart(course.id);
            }}
          ></i>
        </div>
      )}
    </div>
  );
};

export default CartItem;
