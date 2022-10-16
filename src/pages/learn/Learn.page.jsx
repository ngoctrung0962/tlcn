import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";

const LearnPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("id"));

  useEffect(() => {
    if (!searchParams.get("id")) {
      console.log(searchParams.get("id"));
      setSearchParams({ id: 1 }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(searchParams.get("id"));
  }, [searchParams]);

  const [srcVideo, setSrcVideo] = useState(
    "https://www.youtube.com/embed/nS5Se6PgAQo?list=RDnS5Se6PgAQo"
  );

  const [title, setTitle] = useState("Learn ReactJS");
  const dataFake = [
    {
      id: 1,
      title: "Learn ReactJS",
      src: "https://www.youtube.com/embed/nS5Se6PgAQo?list=RDnS5Se6PgAQo",
    },
    {
      id: 2,
      title: "Learn Game Development",
      src: "https://www.youtube.com/watch?v=xtNQbzbBsy0&list=PLn9lhDYvf_3HS5RvfAfH4g1XHUN1gapFV",
    },
    {
      id: 3,
      title: "Learn Kotlin",
      src: "https://www.youtube.com/embed/nS5Se6PgAQo?list=RDnS5Se6PgAQo",
    },
    {
      id: 4,
      title: "Learn Laravel",
      src: "https://www.youtube.com/embed/rJrSXYrHn5g?list=PLn9lhDYvf_3HS5RvfAfH4g1XHUN1gapFV",
    },
    {
      id: 5,
      title: "Learn React Native",
      src: "https://www.youtube.com/watch?v=xtNQbzbBsy0&list=PLn9lhDYvf_3HS5RvfAfH4g1XHUN1gapFV",
    },
  ];
  return (
    <>
      <div className="container-fluid">
        <div className="row header__tool d-flex flex-row justify-content-center align-items-center position-sticky">
          <div className="tool__container d-flex flex-row justify-content-between align-items-center gap-4 my-2">
            <span className="d-flex justify-content-between align-items-center">
              <MdKeyboardArrowLeft size={30} color={"#e6c511"} />
              <Link
                data-aos="flip-right"
                className="navbar-brand justify-content-center align-items-center d-flex"
                to="/"
                style={{ fontSize: "14px" }}
              >
                <img
                  src={require("../../assets/img/logo.gif")}
                  width={"auto"}
                  height={30}
                  alt=""
                />
                <span style={{ color: "rgb(252, 207, 0)", fontSize: "14px" }}>
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
            <div>
              <iframe
                width="100%"
                height="530"
                src={srcVideo}
                title="[Engsub/Vietsub] 清空 (Qing Kong) || Thanh Trừ - Vương Hân Thần & Tô Tinh Tiệp) || Original & Remix"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h4 className="video__title mt-3 text-left">{title}</h4>
            </div>
          </div>
          <div className="col-12 col-lg-3 ">
            <div className="list__video-container">
              <h5>Nội dung khóa học</h5>
              <ul className="list__videos">
                {dataFake.map((item, index) => (
                  <li
                    key={index}
                    className="video__item ps-3 d-flex flex-row align-items-center "
                  >
                    <p className="video__title m-0">{item.title}</p>
                    <BsPlayCircleFill
                      className="ms-3 icon__playvideo "
                      onClick={() => {
                        setSrcVideo(item.src);
                        setTitle(item.title);
                        setSearchParams({ id: item.id }, { replace: true });
                        // Thay đổi id trong url sẽ gọi lại useEffect call api lấy dữ liệu của video bài giảng và không cần set 2 state ở trên
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row footer__tool d-flex flex-row justify-content-center align-items-center fixed-bottom">
          <div className="tool__container d-flex flex-row justify-content-center align-items-center gap-4 my-2">
            <span>
              <MdKeyboardArrowLeft size={30} color={"#e6c511"} />
              Bài học trước
            </span>

            <span>
              Bài học kế tiếp
              <MdKeyboardArrowRight size={30} color={"#e6c511"} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnPage;
