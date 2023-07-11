import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import userApi from "../../api/userApi";
import { deleteDetailUser } from "../../redux/userRedux";

import { Rating } from "@mui/material";
import coursesApi from "../../api/coursesApi";
import WishListTab from "./components/WishListTab";
import CourseCard from "../../components/CourseCard/CourseCard";
import Loading from "../../components/Loading/Loading";
const MyLearning = () => {
  const [loading, setLoading] = useState(false);
  const { listWishList } = useSelector((state) => state.user);
  const username = useLocation().pathname.split("/")[2];
  //get detail user

  const [listCourseBought, setListCourseBought] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await userApi.get(username);
        const resPurchase = await coursesApi.getlistpurchased(username);
        setListCourseBought(resPurchase.data.content);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [username]);

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
        <div className="row m-0 p-0">
          <Tabs defaultActiveKey="coursebought" className="mb-3 ">
            <Tab
              style={{
                overflow: "auto",
              }}
              eventKey="coursebought"
              title="Khóa học đã mua"
            >
              <div className="row m-3 align-items-center ">
                {!loading ? (
                  listCourseBought.map((item, index) => {
                    return (
                      <div className="col-12 col-md-6 ">
                        <CourseCard
                          item={item}
                          key={index}
                          listWishList={listWishList}
                          isWasBought={true}
                        />
                      </div>
                    );
                  })
                ) : (
                  <Loading />
                )}
              </div>
            </Tab>
            <Tab eventKey="wishlist" title="Khóa học yêu thích" unmountOnExit>
              <WishListTab />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
