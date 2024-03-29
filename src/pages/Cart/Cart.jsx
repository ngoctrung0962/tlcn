import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import CartItem from "./components/CartItem/CartItem";
import requestOrder from "../../api/requestOrder";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const state = useLocation().state;

  const { listCart, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const user = useSelector((state) => state.user.currentUser);
  const [couponCode, setCouponCode] = useState("");

  const [dataPost, setDataPost] = useState({
    username: user.username,
    couponCode: couponCode,
    paymentId: "01",
    orderDetailList: state ? [`${state.id}`] : [],
  });

  const [tongTien, setTongTien] = useState(state ? state.price : 0);

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const res = await requestOrder.request(dataPost);
      if (res.errorCode == "") {
        const linkRes = res.data;
        window.open(linkRes, "_self");
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: res.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
    await console.log("checkout");
    setLoading(false);
  };

  return (
    <div
      className="cart__page"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="cart__left ">
            <div className="cart__head">
              <h3>Shopping Cart</h3>
            </div>
            <div className="cart__body">
              {!state &&
                listCart?.map((item) => {
                  return (
                    <CartItem
                      course={item}
                      dataPost={dataPost}
                      setDataPost={setDataPost}
                      tongTien={tongTien}
                      setTongTien={setTongTien}
                    />
                  );
                })}

              {!state && listCart?.length === 0 && (
                <div className="cart__empty">
                  <h3>No course in cart</h3>
                </div>
              )}

              {state && (
                <CartItem
                  course={state}
                  dataPost={dataPost}
                  setDataPost={setDataPost}
                  tongTien={tongTien}
                  setTongTien={setTongTien}
                  disableClick={true}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="cart__right ">
            <div className="cart__title">
              <h3>Summary</h3>
            </div>
            <div className="cart__total">
              <div className="sub__total d-flex justify-content-between">
                <h3>Total:</h3>
                <h3>{tongTien.toLocaleString()} VNĐ</h3>
              </div>
            </div>
            <div className="cart__discount">
              <h3>Discount</h3>
              <div className="discount__input">
                <input
                  type="text"
                  placeholder="Enter your code"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setDataPost({
                      ...dataPost,
                      couponCode: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="cart__checkout">
              <button onClick={handleCheckOut} disabled={loading}>
                Checkout
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm ms-3"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </div>

            <div className="cart__discount">
              <h3>We Accept</h3>
              <div className="list__accept">
                <div className="accept__img">
                  <img
                    src={require("../../assets/img/Logo-VNPAY-QR-1.png")}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
