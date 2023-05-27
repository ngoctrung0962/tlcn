import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { BiNotepad } from "react-icons/bi";
import { HiOutlineDocumentText, HiOutlineVideoCamera } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import chapterApi from "../../api/chapterApi";
import coursesApi from "../../api/coursesApi";
import learningprogressApi from "../../api/learningprogressApi";
import lectureApi from "../../api/lectureApi";
import Loading from "../../components/Loading/Loading";
import Quiz from "./components/quizz/Quiz";
import Calendar from "./tabs/CalendarTab/Calendar";
import ChatBotTab from "./tabs/ChatBotTab/ChatBotTab";
import NoteTab from "./tabs/NoteTab/NoteTab";
import NotiOfTeacherTab from "./tabs/NotiOfTeacherTab/NotiOfTeacherTab";
import QATab from "./tabs/Q&ATab/Q&ATab";
import LoadingSkeleton from "../../components/Loading/LoadingSkeleton";

const LearnPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const [course, setCourse] = useState();
  const [listChapters, setListChapters] = useState([]);

  const [learningProgress, setLearningProgress] = useState();
  const handleMarkAsDoneLecture = async (e, lectureId) => {
    try {
      if (e.target.checked) {
        const res = await learningprogressApi.markLectureAsComplete(
          courseId,
          lectureId
        );
        if (res.errorCode === "") {
          Swal.fire({
            icon: "success",
            title: "Đánh dấu hoàn thành thành công",
            showConfirmButton: false,
            timer: 1500,
          });
          setLearningProgress(res.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Đánh dấu hoàn thành thất bại",
            text: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        const res = await learningprogressApi.unmarkLectureAsComplete(
          courseId,
          lectureId
        );
        if (res.errorCode === "") {
          Swal.fire({
            icon: "success",
            title: "Bỏ đánh dấu hoàn thành thành công",
            showConfirmButton: false,
            timer: 1500,
          });
          setLearningProgress(res.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Bỏ đánh dấu hoàn thành thất bại",
            text: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {}
  };
  //Get video course by courseId
  useEffect(() => {
    const getData = async () => {
      try {
        const resChapter = await chapterApi.getbycourseId(courseId);
        const resCourse = await coursesApi.get(courseId);
        const resProgress = await learningprogressApi.getLearningProgress(
          courseId
        );
        setListChapters(resChapter.data);
        setCourse(resCourse.data);
        setLearningProgress(resProgress.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [courseId]);

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

  //react hook form

  useEffect(() => {
    const getLectureByID = async () => {
      try {
        const res = await lectureApi.getLectureById(searchParams.get("id"));

        setActiveLecture(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLectureByID();
  }, []);

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

  const [activeLecture, setActiveLecture] = useState();
  console.log("activeLecture", activeLecture);

  return isLoading ? (
    <Loading />
  ) : wasBought || isPublicCourse ? (
    <div className="learn" style={{ height: "100vh", overflow: "auto" }}>
      <div className="row header__tool d-flex flex-row justify-content-center align-items-center position-sticky">
        <div className="tool__container d-flex flex-row justify-content-between align-items-center gap-4 my-2">
          <span className="d-flex justify-content-between align-items-center">
            <Link
              className="navbar-brand justify-content-center align-items-center d-flex"
              to="/"
              style={{ fontSize: "14px", fontWeight: "bold", color: "#fff" }}
              // onClick={() => nav(-1)}
            >
              <MdKeyboardArrowLeft
                cursor="pointer"
                size={30}
                color={"#054a49"}
              />
              <span
                style={{
                  color: "#054a49",
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
            <BiNotepad />{" "}
            {course ? course.name : <LoadingSkeleton width={200} height={20} />}
          </div>
          <span className="d-flex flex-row justify-content-center align-items-center gap-3">
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={learningProgress?.percentCompleted}
              />
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
                  {`${Math.round(
                    learningProgress?.percentCompleted
                      ? learningProgress?.percentCompleted
                      : 0
                  )}%`}
                </Typography>
              </Box>
            </Box>
            {/* 20/10 bài học */}
            {(learningProgress?.learnedLectures?.length
              ? learningProgress?.learnedLectures?.length
              : "0") +
              "/" +
              (learningProgress?.totalLecturesInCourse
                ? learningProgress?.totalLecturesInCourse
                : "0") +
              " bài học"}
          </span>
        </div>
      </div>
      <div className="row my-3 mb-5">
        <div className="col-12 col-lg-9">
          <div className="">
            {!activeLecture ? (
              course?.avatar ? (
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <img
                    src={course?.avatar}
                    alt="anhkhoahoc"
                    style={{ height: "50%" }}
                  />
                </div>
              ) : (
                <LoadingSkeleton height={300} width="100%" />
              )
            ) : activeLecture?.lectureType === "VIDEO" ? (
              <video
                id="myVideo"
                className="learn__video"
                width="100%"
                height="500px"
                src={activeLecture.link}
                controls
                autoPlay
                ref={videoRef}
                crossOrigin="anonymous"
              >
                {/* <track
                  src={"../../assets/test3.mp4-1.vtt"}
                  kind="subtitles"
                  srcLang="en"
                  label="English" // Nhãn hiển thị cho phụ đề
                /> */}
                <track
                  label="English"
                  kind="subtitles"
                  srclang="en"
                  src="https://video-react.js.org/assets/elephantsdream/captions.en.vtt"
                  default
                ></track>
              </video>
            ) : activeLecture?.lectureType === "PRESENTATION" &&
              activeLecture?.type === "PDF" ? (
              <>
                <DocViewer
                  documents={[
                    {
                      uri: activeLecture?.link,
                    },
                  ]}
                  pluginRenderers={DocViewerRenderers}
                  config={{
                    header: {
                      disableHeader: false,
                      disableFileName: true,
                      retainURLParams: false,
                    },
                  }}
                />
              </>
            ) : (
              <Quiz lectureId={activeLecture?.id} />
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

                {!activeLecture &&
                  (course?.description ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: course?.description,
                      }}
                    ></p>
                  ) : (
                    <p>
                      <LoadingSkeleton height={"20vh"} />
                    </p>
                  ))}
                <p>{activeLecture?.description}</p>
              </Tab>
              {activeLecture && activeLecture?.lectureType === "VIDEO" && (
                <Tab eventKey="note" title="Note">
                  {/* Form add note */}
                  {/* <div className="note__container">
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
                  </div> */}
                  <NoteTab videoRef={videoRef} />
                </Tab>
              )}

              {activeLecture && (
                <Tab eventKey="Q&A" title="Hỏi đáp">
                  <QATab activeLecture={activeLecture && activeLecture} />
                </Tab>
              )}

              <Tab eventKey="calendar" title="Lịch">
                <Calendar />
              </Tab>
              <Tab eventKey="notification" title="Thông báo giảng viên">
                <NotiOfTeacherTab />
              </Tab>
              <Tab eventKey="chatbot" title="Chat BOT" unmountOnExit>
                <ChatBotTab />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="col-12 col-lg-3 ">
          <div className="list__video-container">
            <h5>Nội dung khóa học</h5>
            {listChapters && listChapters.length == 0 && (
              <LoadingSkeleton height={"70vh"} width="100%" />
            )}
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
                              <li
                                key={index}
                                style={{
                                  position: "relative",
                                }}
                              >
                                <div className="markasdone__lecture">
                                  <Form.Check
                                    type={"checkbox"}
                                    defaultChecked={
                                      learningProgress?.learnedLectures?.find(
                                        (item) => item === lecture.id
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={async (e) => {
                                      handleMarkAsDoneLecture(e, lecture.id);
                                    }}
                                  />
                                </div>
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
              <MdKeyboardArrowLeft size={30} color={"#054a49"} />
              Bài học trước
            </span>

            <span onClick={handleNextVideo}>
              Bài học kế tiếp
              <MdKeyboardArrowRight size={30} color={"#054a49"} />
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
