import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { ImFilter } from "react-icons/im";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./coursesPage.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

export default function CoursesPage() {
  const [value, setValue] = useState([0, 0]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-2">
          <div
            style={{ height: "500px" }}
            className="filter__courses  mx-1 my-3"
          >
            <h6 className="filter__title mb-3 d-flex align-items-center">
              Bộ lọc tìm kiếm <ImFilter className="ms-1" />
            </h6>
            <Box sx={{ width: "90%", marginBottom: "30px" }}>
              <p className="filter__type ">Lọc theo giá</p>
              <Slider
                sx={{
                  color: "#000",
                  fontSize: "11px",
                }}
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                color="secondary"
                min={0}
                max={1000000}
                step={100000}
              />
              <p className="value__filter">
                {value[0]} - {value[1]}
              </p>
            </Box>

            <Box sx={{ width: "90%" }}>
              <p className="filter__type ">Lọc theo loại khóa học</p>
              <FormGroup sx={{ fontFamily: "inherit", fontSize: "11px" }}>
                <FormControlLabel control={<Checkbox />} label="Normal" />
                <FormControlLabel control={<Checkbox />} label="Luxury" />
              </FormGroup>
            </Box>
          </div>
        </div>
        <div className="col-12 col-lg-10">
          <div
            style={{ minHeight: "500px" }}
            className="courses__container mx-1 my-3 "
          >
            <div className=" container d-flex justify-content-evenly flex-wrap gap-5 align-items-center w-100">
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div
                data-aos="flip-left"
                className="card col-12 col-md-4  py-3 justify-content-center align-items-center card__course-item"
              >
                <img
                  src={require("../../assets/img/html-5-logo.png")}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">HTML từ Zero đến Hero</h5>
                  <p className="card-text">
                    <span>Giá</span> : 2.000.000 VNĐ
                  </p>
                  <Rating name="read-only" value={5} readOnly />
                  <div className="card__layer">
                    <div>
                      <Link to="/" className="btn btn-primary">
                        Xem khóa học
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center w-100 my-4">
              <button className="main__btn  text-center">Xem thêm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
