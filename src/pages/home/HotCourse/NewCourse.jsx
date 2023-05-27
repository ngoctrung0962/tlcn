import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import coursesApi from "../../../api/coursesApi";
import CourseCard from "../../../components/CourseCard/CourseCard";
import "./NewCourse.css";
export default function HotCourse() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  const { listWishList } = useSelector((state) => state.user);
  const [listHotCourse, setListHotCourses] = useState([]);
  useEffect(() => {
    const fetchNewwestCourse = async () => {
      try {
        const res = await coursesApi.getTop4CoursesHot(4);
        setListHotCourses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewwestCourse();
  }, []);

  return (
    <div data-aos="fade-up" className="d-flex flex-column mb-5 new__course">
      <div className="row">
        <h1 className="new__course-title">
          Khóa học nổi bật <span className="text-center">HOT</span>
        </h1>
      </div>
      <div className="row d-flex flex-column flex-md-row justify-content-between gap-3 flex-wrap align-items-center">
        {listHotCourse?.map((item, index) => (
          <CourseCard item={item} key={index} listWishList={listWishList} />
        ))}
      </div>
    </div>
  );
}
