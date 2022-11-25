import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

import { MdDownload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import userApi from "../../api/userApi";
import { deleteDetailUser } from "../../redux/userRedux";
import "./Account.css";
import AccountChangePass from "./components/AccountChangePass";
import AccountHistoryPurchase from "./components/AccountHistoryPurchase";
import AccountInfo from "./components/AccountInfo";
import ModalRequestBecomeTeacher from "./components/ModalRequestBecomeTeacher";
const Account = () => {
  const username = useLocation().pathname.split("/")[2];
  const [userDetail, setUserDetail] = useState();
  //get detail user

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.get(username);
        setUserDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [username]);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    Swal.fire({
      title: "Bạn chắc chắn muốn đăng xuất?",
      denyButtonText: "Hủy",
      showDenyButton: true,
      confirmButtonText: `Đăng xuất`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Cookies.remove("token");
        await Cookies.remove("username");
        await dispatch(deleteDetailUser());
        Swal.fire("Đăng xuất thành công!", "", "success");
      }
    });
  };
  const [showModalRequestBecomeTeacher, setShowModalRequestBecomeTeacher] =
    useState(false);
  return (
    <div className="account">
      {showModalRequestBecomeTeacher && (
        <ModalRequestBecomeTeacher
          show={showModalRequestBecomeTeacher}
          onHide={() => setShowModalRequestBecomeTeacher(false)}
        />
      )}
      <header className="account__header position-sticky top-0">
        <div className="account__header__container container-fluid d-flex justify-content-between">
          <Link to="/">
            <div className="logo d-flex align-items-center">
              <BsArrowLeftShort size={15} cursor={"pointer"} />

              <h2>Trở về trang chủ</h2>
            </div>
          </Link>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 ">
            <div className="account__left container d-flex  flex-column py-3 sticky-top">
              <div className="account__left__avatar ">
                <img
                  src={require("../../assets/img/avt.jpg")}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="account__left__name">
                <h3>
                  Student <br /> <span>{userDetail?.fullname}</span>
                </h3>
              </div>
              <div className="account__left__info">
                <p>
                  I'm the Front-End Developer for #Company in Bangladesh, OR. I
                  have serious passion for UI effects, animations and creating
                  intuitive, dynamic user experiences.
                </p>
              </div>
              <div className="account__left__button">
                <button className="" onClick={handleLogout}>
                  <BiLogOut className="me-2" /> Đăng xuất
                </button>
                <button
                  className=""
                  onClick={() => {
                    setShowModalRequestBecomeTeacher(true);
                  }}
                >
                  <MdDownload className="me-2" /> Yêu cầu trở thành giảng viên
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 account__right">
            <div className="account__right container py-3">
              <AccountInfo
                userDetail={userDetail}
                setUserDetail={setUserDetail}
              />
              <AccountChangePass />
              <AccountHistoryPurchase />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
