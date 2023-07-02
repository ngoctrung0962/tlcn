import React from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useState } from "react";
import teacherApi from "../../api/teacherApi";
import { useEffect } from "react";

export default function OurTeacher() {
  const [listTeacher, setListTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await teacherApi.getTopTeacher();
      if (res.errorCode == "") {
        setListTeacher(res.data);
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
      <h1 className="ms-5 top__teacher__title">Danh sách giáo viên nổi bật</h1>
      <div className="row px-2 px-md-5 mx-2 mx-md-5">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          // nhân 5 listTeacher
          listTeacher?.map((teacher, index) => (
            <div className="col-12 col-md-4 col-lg-3" key={index}>
              <TeacherCard teacher={teacher} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
