import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard";
import { useSelector } from "react-redux";
import userApi from "../../api/userApi";

export default function Teacher() {
  const { listWishList } = useSelector((state) => state.user);

  const userName = useParams().id;
  const dataFake = {
    username: "trungtt",
    aboutMe:
      "My name is Trung Ngoc and I'm an expert in Frontend side, By following me, you can learn and get more job about frontend",
    caption: "TrungTT - The expert frontend developer",
    facebookLink: "udhfggh",
    youtubeLink: "link where",
    linkedinLink: "",
    teacherInfo: {
      username: "trungtt",
      role: "TEACHER",
      fullname: "Nguyễn Ngọc Trung",
      birthdate: "2001-02-15T00:00:00.000+00:00",
      gender: "nam",
      email: "ngoctrung0962@gmail.com",
      phone: "0962931340",
      avatar:
        "https://imgbuckets.s3.ap-southeast-1.amazonaws.com/avatar-trungttSat%20Jun%2024%2014%3A42%3A22%20ICT%202023",
    },
    totalStudents: 0,
    totalCourses: 1,
    totalReviews: 0,
    topCourses: [
      {
        id: "COU018",
        category: {
          id: "C01",
          name: "Web Developer",
          active: true,
        },
        language: "Vietnamese",
        name: "Test course. Web MVC",
        description: "<p>Mo tả</p>",
        accountName: "trungtt",
        ownerAvt:
          "https://imgbuckets.s3.ap-southeast-1.amazonaws.com/avatar-trungttSat%20Jun%2024%2014%3A42%3A22%20ICT%202023",
        price: 130000.0,
        createDate: "2023-06-21T00:00:00.000+00:00",
        updateDate: "2023-06-21T00:00:00.000+00:00",
        numStudents: 0,
        avatar:
          "https://onlinecourse-lectures.s3.ap-southeast-1.amazonaws.com/ae0daa0c-d6c5-40d9-b208-88a79826902c-slider-img.png",
        rate: 0.0,
        status: 3,
        public: false,
        active: true,
      },
      {
        id: "COU018",
        category: {
          id: "C01",
          name: "Web Developer",
          active: true,
        },
        language: "Vietnamese",
        name: "Test course. Web MVC",
        description: "<p>Mo tả</p>",
        accountName: "trungtt",
        ownerAvt:
          "https://imgbuckets.s3.ap-southeast-1.amazonaws.com/avatar-trungttSat%20Jun%2024%2014%3A42%3A22%20ICT%202023",
        price: 130000.0,
        createDate: "2023-06-21T00:00:00.000+00:00",
        updateDate: "2023-06-21T00:00:00.000+00:00",
        numStudents: 0,
        avatar:
          "https://onlinecourse-lectures.s3.ap-southeast-1.amazonaws.com/ae0daa0c-d6c5-40d9-b208-88a79826902c-slider-img.png",
        rate: 0.0,
        status: 3,
        public: false,
        active: true,
      },
      {
        id: "COU018",
        category: {
          id: "C01",
          name: "Web Developer",
          active: true,
        },
        language: "Vietnamese",
        name: "Test course. Web MVC",
        description: "<p>Mo tả</p>",
        accountName: "trungtt",
        ownerAvt:
          "https://imgbuckets.s3.ap-southeast-1.amazonaws.com/avatar-trungttSat%20Jun%2024%2014%3A42%3A22%20ICT%202023",
        price: 130000.0,
        createDate: "2023-06-21T00:00:00.000+00:00",
        updateDate: "2023-06-21T00:00:00.000+00:00",
        numStudents: 0,
        avatar:
          "https://onlinecourse-lectures.s3.ap-southeast-1.amazonaws.com/ae0daa0c-d6c5-40d9-b208-88a79826902c-slider-img.png",
        rate: 0.0,
        status: 3,
        public: false,
        active: true,
      },
      {
        id: "COU018",
        category: {
          id: "C01",
          name: "Web Developer",
          active: true,
        },
        language: "Vietnamese",
        name: "Test course. Web MVC",
        description: "<p>Mo tả</p>",
        accountName: "trungtt",
        ownerAvt:
          "https://imgbuckets.s3.ap-southeast-1.amazonaws.com/avatar-trungttSat%20Jun%2024%2014%3A42%3A22%20ICT%202023",
        price: 130000.0,
        createDate: "2023-06-21T00:00:00.000+00:00",
        updateDate: "2023-06-21T00:00:00.000+00:00",
        numStudents: 0,
        avatar:
          "https://onlinecourse-lectures.s3.ap-southeast-1.amazonaws.com/ae0daa0c-d6c5-40d9-b208-88a79826902c-slider-img.png",
        rate: 0.0,
        status: 3,
        public: false,
        active: true,
      },
      {
        id: "COU018",
        category: {
          id: "C01",
          name: "Web Developer",
          active: true,
        },
        language: "Vietnamese",
        name: "Test course. Web MVC",
        description: "<p>Mo tả</p>",
        accountName: "trungtt",
        ownerAvt:
          "https://imgbuckets.s3.ap-southeast-1.amazonaws.com/avatar-trungttSat%20Jun%2024%2014%3A42%3A22%20ICT%202023",
        price: 130000.0,
        createDate: "2023-06-21T00:00:00.000+00:00",
        updateDate: "2023-06-21T00:00:00.000+00:00",
        numStudents: 0,
        avatar:
          "https://onlinecourse-lectures.s3.ap-southeast-1.amazonaws.com/ae0daa0c-d6c5-40d9-b208-88a79826902c-slider-img.png",
        rate: 0.0,
        status: 3,
        public: false,
        active: true,
      },
    ],
  };
  const [teacherInfo, setTeacherInfo] = useState();
  const fetchDataTeacher = async () => {
    try {
      const res = await userApi.getTeacherInfo(userName);
      if (res.errorCode == "") {
        setTeacherInfo(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDataTeacher();
  }, []);

  return (
    <div className="teacher__profile__page mt-3 container">
      <Row>
        <Col md={6} xs={12}>
          <div className="teacher__profile__left">
            <div className="teacher__name">
              <span>Giảng viên:</span>
              <h1>{teacherInfo?.teacherInfo.fullname}</h1>
            </div>

            <p className="teacher__caption">{teacherInfo?.caption}</p>

            <div className="teacher__achievements d-flex gap-2">
              <div className="teacher__achievements__item">
                <p>Tổng học viên</p>
                <span>{teacherInfo?.totalStudents}</span>
              </div>
              <div className="teacher__achievements__item">
                <p>Tổng khóa học</p>
                <span>{teacherInfo?.totalCourses}</span>
              </div>
              <div className="teacher__achievements__item">
                <p>Đánh giá</p>
                <span>{teacherInfo?.totalReviews}</span>
              </div>
            </div>

            <div className="teacher__about__me">
              <span>Giới thiệu về tôi</span>
              <p
                dangerouslySetInnerHTML={{
                  __html: teacherInfo?.aboutMe,
                }}
              ></p>
            </div>
            <div className="teacher__top__course"></div>
          </div>
        </Col>
        <Col md={6} xs={12}>
          <div className="teacher__profile__right d-flex flex-column justify-content-center align-items-center">
            <div className="teacher__avatar">
              <img
                src={teacherInfo?.teacherInfo?.avatar}
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="teacher__link__list">
              <span>Liên kết</span>
              <div className="teacher__link__list__item">
                <i className="fab fa-facebook"></i>
                <a href={teacherInfo?.facebookLink}>Facebook</a>
              </div>
              <div className="teacher__link__list__item">
                <i className="fab fa-youtube"></i>
                <a href={teacherInfo?.youtubeLink}>Youtube</a>
              </div>
              <div className="teacher__link__list__item">
                <i className="fab fa-linkedin"></i>
                <a href={teacherInfo?.linkedinLink}>Linkedin</a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="teacher__top__course ">
          <span>Khóa học nổi bật</span>
          <div className="teacher__top__course__list d-md-flex flex-wrap justify-content-between ">
            <div className="row">
              {teacherInfo?.topCourses.map((item, index) => (
                <div className="col-md-6 col-12 ">
                  <CourseCard
                    item={item}
                    key={index}
                    listWishList={listWishList}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
}
