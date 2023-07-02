import React from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useState } from "react";
import teacherApi from "../../api/teacherApi";
import { useEffect } from "react";
import orderApi from "../../api/orderApi";
import HistoryPurcharseCard from "../../components/HistoryPurcharseCard/HistoryPurcharseCard";

export default function HistoryPurcharse() {
  const [listOrder, setListOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await orderApi.getMyOrder();
      if (res.errorCode == "") {
        setListOrder(res?.data?.content);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h1 className="ms-5 top__teacher__title">Lịch sử mua hàng</h1>
      <div className="row px-2 px-md-5 mx-2 mx-md-5">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          listOrder?.map((item, index) => (
            <div className="col-12 col-lg-4 col-xl-3" key={index}>
              <HistoryPurcharseCard historypurcharse={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
