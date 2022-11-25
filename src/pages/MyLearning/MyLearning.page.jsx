import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import userApi from "../../api/userApi";
import { deleteDetailUser } from "../../redux/userRedux";
import "./Account.css";
const MyLearning = () => {
  const username = useLocation().pathname.split("/")[2];
  const [userDetail, setUserDetail] = useState();
  //get detail user

  const [listCourseBought, setListCourseBought] = useState([]);
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
  return (
    <div className="mylearning">
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
      <div className="container-fluid">
        <div className="row">
          <Tabs defaultActiveKey="coursebought" className="mb-3" justify>
            <Tab eventKey="coursebought" title="Khóa học đã mua"></Tab>
            <Tab eventKey="wishlist" title="Khóa học yêu thích">
              2
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
