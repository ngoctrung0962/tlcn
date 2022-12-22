import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import chapterApi from "../../api/chapterApi";
import coursesApi from "../../api/coursesApi";
import coursesVideoApi from "../../api/coursesVideoApi";
import Accordion from "react-bootstrap/Accordion";
import BackToTop from "../../components/BackToTop/BackToTop";

const LearnPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const [course, setCourse] = useState();
  const [listVideo, setListVideo] = useState([]);
  const [listChapters, setListChapters] = useState([]);
  const nav = useNavigate();
  const currentVideoId = listVideo[2]?.id;
  //Get video course by courseId
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await coursesVideoApi.getByCourseId(courseId);
        const resChapter = await chapterApi.getbycourseId(courseId);
        const resCourse = await coursesApi.get(courseId);
        setListVideo(res.data);
        setListChapters(resChapter.data);
        setCourse(resCourse.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [courseId]);
  // useEffect(() => {
  //   if (!searchParams.get("id")) {
  //     setSearchParams(
  //       { id: currentVideoId ? currentVideoId : 1 },
  //       { replace: true }
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Bài học hiện tại
  const [currentPicker, setCurrenPicker] = useState({
    srcVideo: null,
    title: "Intro Legacy",
    des: "Chào mừng bạn đến với khóa học trên Legacy",
    currentChapter: null,
    currentVideoOfChapter: null,
  });
  console.log("currentPicker", currentPicker);
  // Kiểm tra khóa học đã được đăng ký hay chưa
  const user = useSelector((state) => state.user.currentUser);

  const [wasBought, setWasBought] = useState(false);
  const [isPublicCourse, setIsPublicCourse] = useState(false);
  useEffect(() => {
    const checkRegistered = async () => {
      try {
        const res = await coursesApi.checkisPurchaseCourse(
          courseId,
          user?.username
        );
        const resCourse = await coursesApi.get(courseId);
        setIsPublicCourse(resCourse.data?.public);
        setWasBought(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkRegistered();
  }, [courseId, user?.username]);

  //Get video by videoId
  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await coursesVideoApi.getbyId(searchParams.get("id"));
        setCurrenPicker({
          ...currentPicker,
          srcVideo: res.data?.link,
          title: res.data?.title,
          des: res.data?.description,
          currentChapter: res.data?.chapterId,
          currentVideoOfChapter: res.data?.id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getVideo();
  }, [searchParams.get("id")]);
  //Handle next video không sử dụng thứ tự của videoID
  const handleNextVideo = () => {
    const currIndex = listVideo.findIndex(
      (item) => item.id == searchParams.get("id")
    );
    console.log(currIndex, searchParams.get("id"));
    const nextVideo = listVideo[currIndex + 1];
    console.log(nextVideo);
    if (nextVideo) {
      setSearchParams({ id: nextVideo.id });
    }
  };
  //Handle prev video
  const handlePrevVideo = () => {
    const currIndex = listVideo.findIndex(
      (item) => item.id == searchParams.get("id")
    );
    const prevVideo = listVideo[currIndex - 1];
    if (prevVideo) {
      setSearchParams({ id: prevVideo.id });
    }
  };
  const duration = document.getElementById("item-videoCourse")?.duration;
  return wasBought || isPublicCourse ? (
    <div>
      <BackToTop />

      <div className="row header__tool d-flex flex-row justify-content-center align-items-center position-sticky">
        <div className="tool__container d-flex flex-row justify-content-between align-items-center gap-4 my-2">
          <span className="d-flex justify-content-between align-items-center">
            <Link
              className="navbar-brand justify-content-center align-items-center d-flex"
              to="/"
              style={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}
              onClick={() => nav(-1)}
            >
              <MdKeyboardArrowLeft
                cursor="pointer"
                size={30}
                color={"#00693e"}
              />
              <span
                style={{
                  color: "#00693e",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Le
              </span>
              gacy
            </Link>
          </span>

          <span className="d-flex flex-row justify-content-center align-items-center gap-3">
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress variant="determinate" value={20} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" component="div" color="#f0f0f0">
                  {`${Math.round(20)}%`}
                </Typography>
              </Box>
            </Box>
            2/10 bài học
          </span>
        </div>
      </div>
      <div className="row my-3 ">
        <div className="col-12 col-lg-9">
          <div className="">
            {!currentPicker.srcVideo ? (
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  src={course?.avatar}
                  alt="anhkhoahoc"
                  style={{ height: "50%" }}
                />
              </div>
            ) : (
              <iframe
                width="100%"
                height="530"
                src={currentPicker.srcVideo}
                title={currentPicker.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="learn-iframe"
              ></iframe>
            )}

            <h4 className="video__title mt-3 text-left">
              {currentPicker?.title}
            </h4>
            <p>{currentPicker?.des}</p>
          </div>
        </div>
        <div className="col-12 col-lg-3 ">
          <div className="list__video-container">
            <h5>Nội dung khóa học</h5>

            <div className="list__chapter">
              <Accordion alwaysOpen>
                {listChapters?.map((chapter, index) => {
                  return (
                    <Accordion.Item eventKey={index} key={index}>
                      <Accordion.Header>{chapter.chapterName}</Accordion.Header>
                      <Accordion.Body>
                        <ul className="list__videos">
                          {listVideo?.map((item, index) => {
                            if (item.chapterId === chapter.id) {
                              return (
                                <li
                                  key={index}
                                  className={
                                    item.id == searchParams.get("id")
                                      ? "video__item active ps-3 d-flex flex-row align-items-center "
                                      : "video__item  ps-3 d-flex flex-row align-items-center "
                                  }
                                >
                                  <p className="video__title m-0">
                                    {item.title}
                                  </p>

                                  <BsPlayCircleFill
                                    className="ms-3 icon__playvideo "
                                    onClick={() => {
                                      setSearchParams(
                                        { id: item.id },
                                        { replace: true }
                                      );
                                    }}
                                  />
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className="row footer__tool d-flex flex-row justify-content-center align-items-center fixed-bottom">
        <div className="tool__container d-flex flex-row justify-content-center align-items-center gap-4 my-2">
          <span onClick={handlePrevVideo}>
            <MdKeyboardArrowLeft size={30} color={"#00693e"} />
            Bài học trước
          </span>

          <span onClick={handleNextVideo}>
            Bài học kế tiếp
            <MdKeyboardArrowRight size={30} color={"#00693e"} />
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="container">Bạn chưa mua khóa học này</div>
  );
};

export default LearnPage;
