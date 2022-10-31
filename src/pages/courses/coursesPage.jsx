import React, { useEffect } from "react";
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
import coursesApi from "../../api/coursesApi";

export default function CoursesPage() {
  const [value, setValue] = useState([0, 0]);
  const [outOfStock, setOutOfStock] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [paginate, setPaginate] = useState({
    page: 0,
  });

  const [listCourses, setListCourses] = useState([]);
  useEffect(() => {
    const getListCourses = async () => {
      try {
        const res = await coursesApi.getAll(paginate.page);
        if (res.data.content.length > 0) {
          setListCourses([...listCourses, ...res.data.content]);
          if (res.data.content.length < 10) {
            setOutOfStock(true);
          }
        } else {
          setOutOfStock(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListCourses();
  }, [paginate]);
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
            <div className="  d-flex justify-content-evenly flex-wrap gap-5 align-items-center w-100">
              {listCourses?.map((item) => {
                return (
                  <div
                    data-aos="flip-left"
                    key={item.id}
                    className="card col-12 col-md-4 col-lg-3 py-3 d-flex justify-content-center align-items-center card__course-item"
                  >
                    <img
                      src={require("../../assets/img/CSS3_logo_and_wordmark.svg.png")}
                      className="card-img-top img-fluid mb-2"
                      alt="..."
                    />
                    <h5 className="card-title text-center mb-2">{item.name}</h5>
                    <div className="card-body">
                      <div className="d-flex justify-content-center gap-1 mb-2">
                        <div className="card-language ">
                          Language: {item ? item.language : ""}
                        </div>
                        <div className="card-language">
                          Số lượng học sinh: {item ? item.numStudents : ""}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center gap-1">
                        <p className="card-text">
                          Giá : <span>{item.price} VNĐ</span>
                        </p>
                        <Rating
                          name="read-only"
                          value={5}
                          size="small"
                          readOnly
                        />
                      </div>

                      <div className="card__layer">
                        <div>
                          <Link
                            to={`/courses/${item.id}`}
                            className="btn btn-primary"
                          >
                            Xem khóa học
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="d-flex align-items-center justify-content-center w-100 my-4">
              <button
                className="main__btn  text-center"
                onClick={() => {
                  setPaginate({
                    page: paginate.page + 1,
                  });
                }}
                disabled={outOfStock}
              >
                {outOfStock === false ? "Xem thêm" : "Hết khóa học"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
