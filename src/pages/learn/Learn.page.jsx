import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsFillCameraVideoFill, BsPlayCircleFill } from "react-icons/bs";
import { HiOutlineVideoCamera, HiOutlineDocumentText } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
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
import FileViewer from "react-file-viewer";
import { BiNotepad } from "react-icons/bi";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { Button } from "react-bootstrap";
import noteApi from "../../api/noteApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useRef } from "react";
import { formatTime } from "../../utils/MyUtils";
import Calendar from "./tabs/CalendarTab/Calendar";
import QATab from "./tabs/Q&ATab/Q&ATab";
import CommentSection from "./tabs/Q&ATab/Q&ATab";
import lectureApi from "../../api/lectureApi";
import Loading from "../../components/Loading/Loading";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Question from "./components/quizz/Question";
import Quiz from "./components/quizz/Quiz";

const LearnPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const [course, setCourse] = useState();
  const [listVideo, setListVideo] = useState([]);
  const [listChapters, setListChapters] = useState([]);
  const nav = useNavigate();

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

  // Bài học hiện tại
  const [currentPicker, setCurrenPicker] = useState({
    srcVideo: null,
    title: "Intro Legacy",
    des: "Chào mừng bạn đến với khóa học trên Legacy",
    currentChapter: null,
    currentVideoOfChapter: null,
  });
  // Kiểm tra khóa học đã được đăng ký hay chưa
  const user = useSelector((state) => state.user.currentUser);

  const [wasBought, setWasBought] = useState(false);
  const [isPublicCourse, setIsPublicCourse] = useState(false);
  useEffect(() => {
    const checkRegistered = async () => {
      await setIsLoading(true);
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
      setIsLoading(false);
    };

    checkRegistered();
  }, [courseId, user?.username]);

  //Get video by videoId và get listnote of video
  const [listNote, setListNote] = useState([]);
  //react hook form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const fetchDataNote = async () => {
    try {
      const res = await noteApi.getnotebyvideoid(searchParams.get("id"));
      setListNote(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    data.videoId = searchParams.get("id");
    data.atTime = formatTime(Math.floor(videoRef.current.currentTime));
    console.log("data", data);
    try {
      const res = await noteApi.addnote(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm ghi chú thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchDataNote();
        setValue("content", "");
      } else {
        Swal.fire({
          icon: "error",
          title: "Thêm ghi chú thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await coursesVideoApi.getbyId(searchParams.get("id"));
        await fetchDataNote();

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

  //
  //Handle next video không sử dụng thứ tự của videoID
  const handleNextVideo = async () => {
    try {
      const res = await lectureApi.nextLecture(searchParams.get("id"));
      if (res.errorCode === "") {
        setSearchParams({ id: res.data.lecture.id });
        setActiveLecture(res.data.lecture);
      } else {
        Swal.fire({
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };
  //Handle prev video
  const handlePrevVideo = async () => {
    try {
      const res = await lectureApi.prevLecture(searchParams.get("id"));
      if (res.errorCode === "") {
        setSearchParams({ id: res.data.lecture.id });
        setActiveLecture(res.data.lecture);
      } else {
        Swal.fire({
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };

  //Get current time of video
  const videoRef = useRef(null);

  // const [currentTime, setCurrentTime] = useState(0);
  const handleChangeTime = (e) => {
    // set ref
    // videoRef.current.currentTime = e.target.value;
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await noteApi.deletenotebyid(id);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Xóa ghi chú thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        await fetchDataNote();
      } else {
        Swal.fire({
          icon: "error",
          title: "Xóa ghi chú thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };

  const listQuestion = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      date_created: "2021-10-10",
      user: {
        username: "admin",
        name: "Admin",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      listReply: [
        {
          id: 1,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elitQuisquam, quod.",
          date_created: "2021-10-10",
          user: {
            username: "user1",
            name: "User 1",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
        },
        {
          id: 2,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          date_created: "2021-10-10",
          user: {
            username: "user2",
            name: "User 2",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
        },
      ],
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      date_created: "2021-10-10",
      user: {
        username: "admin12",
        name: "Admin 2",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      listReply: [
        {
          id: 5,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          date_created: "2021-10-10",
          user: {
            username: "user5",
            name: "User 5",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
        },
        {
          id: 6,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
          date_created: "2021-10-10",
          user: {
            username: "user6",
            name: "User 6",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
        },
      ],
    },
  ];

  const [activeLecture, setActiveLecture] = useState();

  // Quizz
  const listQuestions = [
    {
      id: 1,
      questionName: "What is React?",
      answer: 2,
      listChooses: [
        {
          id: 1,
          content: "A JavaScript library for building user interfaces Sai",
        },
        {
          id: 2,
          content: "A JavaScript library for building user interfaces Đúng",
        },
        {
          id: 3,
          content: "A JavaScript library for building user interfaces Sai",
        },
      ],
    },
    {
      id: 2,
      questionName: "What is Vite?",
      answer: 3,
      listChooses: [
        {
          id: 1,
          content: "A JavaScript library for building user interfaces Sai",
        },
        {
          id: 2,
          content: "A JavaScript library for building user interfaces Sai",
        },
        {
          id: 3,
          content: "A JavaScript library for building user interfaces Đúng",
        },
      ],
    },
  ];

  return isLoading ? (
    <Loading />
  ) : wasBought || isPublicCourse ? (
    <div className="learn">
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
          <div
            className="d-none  d-md-flex flex-row justify-content-center align-items-center gap-1 "
            style={{
              color: "#fff",
            }}
          >
            <BiNotepad /> {course?.name}
          </div>
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
            20/10 bài học
          </span>
        </div>
      </div>
      <div className="row my-3 mb-5">
        <div className="col-12 col-lg-9">
          <div className="">
            {!activeLecture ? (
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  src={course?.avatar}
                  alt="anhkhoahoc"
                  style={{ height: "50%" }}
                />
              </div>
            ) : activeLecture?.lectureType === "VIDEO" ? (
              <video
                id="myVideo"
                className="learn__video"
                width="100%"
                height="500px"
                src={activeLecture.link}
                controls
                autoPlay
                onTimeUpdate={handleChangeTime}
                ref={videoRef}
              ></video>
            ) : activeLecture?.lectureType === "PRESENTATION" &&
              activeLecture?.type === "PDF" ? (
              // <FileViewer
              //   fileType={"pdf"}
              //   filePath={activeLecture?.link}
              //   errorComponent={<div>error</div>}
              //   onError={(e) => console.log(e) /* handle as you please */}
              // />
              // <DocViewer
              //   documents={[
              //     {
              //       uri: activeLecture?.link,
              //     },
              //   ]}
              //   pluginRenderers={DocViewerRenderers}
              //   config={{
              //     header: {
              //       disableHeader: false,
              //       disableFileName: true,
              //       retainURLParams: false,
              //     },
              //   }}
              // />

              <Quiz lectureId={activeLecture?.id} />
            ) : (
              ""
            )}

            <Tabs
              defaultActiveKey="overview"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="overview" title="Tổng quan">
                <h4 className="video__title mt-3 text-left">
                  {activeLecture?.title}
                </h4>

                {!activeLecture && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: course?.description,
                    }}
                  ></p>
                )}
                <p>{activeLecture?.description}</p>
              </Tab>
              {activeLecture && activeLecture?.lectureType === "VIDEO" && (
                <Tab eventKey="note" title="Note">
                  {/* Form add note */}
                  <div className="note__container">
                    <div className="note__form mb-4">
                      {searchParams.get("id") && (
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <Row>
                            <Col md={6} xs={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>Thêm ghi chú</Form.Label>

                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  placeholder="Nhập ghi chú"
                                  {...register("content", { required: true })}
                                />
                              </Form.Group>
                              <Button
                                className="main__btn"
                                onClick={handleSubmit(onSubmit)}
                              >
                                Thêm ghi chú
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </div>
                    <div className=" row note__list">
                      <Form.Label>Danh sách note</Form.Label>
                      {listNote?.map((item, index) => {
                        return (
                          <div className=" note__item mb-2" key={index}>
                            <div className="note__item-header">
                              <span className="note__item-time me-3">
                                {item.atTime}
                              </span>
                              <span className="note__item-delete">
                                <AiOutlineDelete
                                  size={20}
                                  cursor="pointer"
                                  onClick={() => handleDeleteNote(item.id)}
                                />
                              </span>
                            </div>
                            <div className="note__item-content">
                              {item.content}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Tab>
              )}

              {activeLecture && (
                <Tab eventKey="Q&A" title="Hỏi đáp">
                  <QATab
                    listQuestion={listQuestion}
                    activeLecture={activeLecture && activeLecture}
                  />
                </Tab>
              )}

              <Tab eventKey="calendar" title="Lịch">
                <Calendar />
              </Tab>
              <Tab eventKey="notification" title="Thông báo giảng viên">
                <Calendar />
              </Tab>
            </Tabs>
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
                      <Accordion.Header>
                        <p
                          style={{
                            padding: "0",
                            margin: "0",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          {chapter.chapterName}
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="list__videos">
                          {chapter?.lectures?.map((lecture, index) => {
                            return (
                              <li key={index}>
                                <div
                                  className={
                                    lecture.id == searchParams.get("id")
                                      ? "video__item active ps-3  "
                                      : "video__item  ps-3 "
                                  }
                                  onClick={() => {
                                    setSearchParams(
                                      { id: lecture.id },
                                      { replace: true }
                                    );
                                    setActiveLecture(lecture);
                                  }}
                                >
                                  <p
                                    className="video__title m-0 ms-2 "
                                    style={{
                                      padding: "0",
                                      margin: "0",
                                      fontSize: "12px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {lecture?.lectureType === "VIDEO" ? (
                                      <HiOutlineVideoCamera
                                        style={{
                                          fontSize: "12px",
                                          marginRight: "5px",
                                          marginBottom: "2px",
                                        }}
                                      />
                                    ) : (
                                      <HiOutlineDocumentText
                                        style={{
                                          fontSize: "12px",
                                          marginRight: "5px",
                                          marginBottom: "2px",
                                        }}
                                      />
                                    )}
                                    {lecture.title}
                                  </p>
                                </div>
                              </li>
                            );
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
      {activeLecture && (
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
      )}
    </div>
  ) : (
    <div
      className="container d-flex flex-column justify-content-center align-items-center mt-5
    
    "
    >
      <h3>Bạn chưa mua khóa học này</h3>
      <lottie-player
        src="https://assets1.lottiefiles.com/packages/lf20_pNx6yH.json"
        background="transparent"
        speed="0.7"
        loop
        autoplay
        style={{ width: "500px", height: "auto" }}
      ></lottie-player>
    </div>
  );
};

export default LearnPage;
