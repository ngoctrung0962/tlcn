import { Radio, RadioGroup } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Slider from "@mui/material/Slider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImFilter } from "react-icons/im";
import { useSelector } from "react-redux";
import categoriescoursesApi from "../../api/categoriescoursesApi";
import coursesApi from "../../api/coursesApi";
import CourseCard from "../../components/CourseCard/CourseCard";
import "./coursesPage.css";
import Loading from "../../components/Loading/Loading";
export default function CoursesPage() {
  const [loading, setLoading] = useState(false);

  const { listWishList } = useSelector((state) => state.user);
  //Text search
  const [searchText, setSearchText] = useState({
    language: {
      key: "language",
      value: "",
      operation: "EQUAL",
    },
    category: {
      key: "category",
      value: "",
      operation: "EQUAL",
    },
    price: {
      key: "price",
      value: "",
      operation: "BETWEEN",
    },
  });
  // use hook form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ searchText });
  var btnLoadmore = document.getElementById("btn__loadmore");

  //Handle search start
  const onSubmit = async (data) => {
    if (paginate.page !== 0) {
      setPaginate({
        page: 0,
      });
    }
    data = Object.values(data);
    const temp = Object.values(searchText);
    try {
      setLoading(true);
      const res = await coursesApi.searchCourse(temp, paginate.page);
      setListCourses(res.data.content);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const [priceRange, setPriceRange] = useState([0, 0]);
  const [outOfStock, setOutOfStock] = useState(false);
  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
    setSearchText({
      ...searchText,
      price: {
        key: "price",
        value: newValue.join(","),
        operation: "BETWEEN",
      },
    });
    setValue("price.value", newValue.join(","));
  };
  //Handle search end

  const [paginate, setPaginate] = useState({
    page: 0,
  });

  const [listCourses, setListCourses] = useState([]);
  useEffect(() => {
    const getListCourses = async () => {
      setLoading(true);
      try {
        const res = await coursesApi.searchCourse(
          Object.values(searchText),
          paginate.page
        );
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
      setLoading(false);
    };
    getListCourses();
  }, [paginate]);

  const [listCategories, setListCategories] = useState([]);

  useEffect(() => {
    const paginateCategories = {
      page: 0,
    };
    const fetchData = async () => {
      const data = [];
      var res = { data: [] };
      try {
        do {
          res = await categoriescoursesApi.getAll(paginateCategories.page);
          paginateCategories.page++;
          data.push(...res.data.content);
        } while (res.data.length === 10);
        setListCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const listLanguages = [
    {
      id: 1,
      name: "English",
      value: "English",
    },
    {
      id: 2,
      name: "Vietnamese",
      value: "Vietnamese",
    },
  ];

  //toggle full width filter
  let filterCourse = document.getElementById("filter__courses");
  const toggleFilter = () => {
    filterCourse.classList.toggle("show-full");
  };

  const handleResetFilter = async () => {
    const defaultSearchText = {
      language: {
        key: "language",
        value: "",
        operation: "EQUAL",
      },
      category: {
        key: "category",
        value: "",
        operation: "EQUAL",
      },
      price: {
        key: "price",
        value: "",
        operation: "BETWEEN",
      },
    };
    const temp = Object.values(defaultSearchText);
    try {
      setLoading(true);
      const res = await coursesApi.searchCourse(temp, 0);
      setListCourses(res.data.content);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-2 position-relative">
          <form
            className="filter__courses  mx-1 my-3"
            id="filter__courses"
            onSubmit={handleSubmit(onSubmit)}
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
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                color="secondary"
                step={100000}
                size="small"
                min={0}
                max={10000000}
              />
              <p className="value__filter">
                {priceRange[0].toLocaleString("vi", {
                  currency: "VND",
                })}{" "}
                -{" "}
                {priceRange[1].toLocaleString("vi", {
                  currency: "VND",
                })}
              </p>
            </Box>

            <Box
              sx={{
                width: "90%",
                marginBottom: "20px",
                fontFamily: "inherit",
                fontSize: "11px",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="filter__type ">Lọc theo loại khóa học</p>
              <FormGroup>
                {listCategories.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={item.name}
                      onChange={(e) => {
                        const oldValue = watch("category.value");
                        if (e.target.checked) {
                          if (oldValue === undefined) {
                            const newValue = item.id + ",";
                            setValue("category.value", newValue);
                            setSearchText({
                              ...searchText,
                              category: {
                                key: "category",
                                value: newValue,
                                operation: "EQUAL",
                              },
                            });
                          } else {
                            const newValue = oldValue + item.id + ",";
                            setValue("category.value", newValue);
                            setSearchText({
                              ...searchText,
                              category: {
                                key: "category",
                                value: newValue,
                                operation: "EQUAL",
                              },
                            });
                          }
                        } else {
                          const newValue = oldValue.replace(item.id + ",", "");
                          setValue("category.value", newValue);
                          setSearchText({
                            ...searchText,
                            category: {
                              key: "category",
                              value: newValue,
                              operation: "EQUAL",
                            },
                          });
                        }
                      }}
                    />
                  );
                })}
              </FormGroup>
            </Box>
            <Box sx={{ width: "90%", marginBottom: "20px" }}>
              <p className="filter__type ">Lọc theo ngôn ngữ</p>
              <RadioGroup
                className=""
                sx={{ fontFamily: "inherit", fontSize: "11px" }}
                defaultValue="Vietnamese"
              >
                {listLanguages.map((item, index) => {
                  return (
                    <FormControlLabel
                      className="filter__option"
                      key={item.id}
                      value={item.value}
                      control={<Radio />}
                      label={item.name}
                      onChange={(e) => {
                        // setValue("...language.value", item.value);
                        setSearchText({
                          ...searchText,
                          language: {
                            key: "language",
                            value: item.value,
                            operation: "EQUAL",
                          },
                        });
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </Box>
            <Box
              sx={{
                width: "100%",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button
                onClick={handleSubmit(onSubmit)}
                className="main__btn "
                style={{
                  minWidth: "100px",
                }}
                disabled={loading}
              >
                Lọc
              </button>
              <button
                onClick={handleResetFilter}
                className="main__btn "
                style={{
                  minWidth: "100px",
                }}
                type="button"
                disabled={loading}
              >
                Mặc định
              </button>
            </Box>
          </form>
        </div>
        <div className="col-12 col-lg-10 ">
          <div
            style={{ minHeight: "500px" }}
            className="courses__container mx-1 my-3 "
          >
            <div className=" row ">
              {listCourses.length > 0 ? (
                listCourses?.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6 " key={index}>
                      <CourseCard
                        item={item}
                        key={index}
                        listWishList={listWishList}
                      />
                    </div>
                  );
                })
              ) : (
                <div>{loading ? <Loading /> : "Không có khóa học nào"}</div>
              )}
            </div>

            {loading && listCourses.length > 0 && <Loading />}
            <div className="d-flex align-items-center justify-content-center w-100 my-4">
              <button
                className="main__btn  text-center"
                id="btn__loadmore"
                onClick={() => {
                  setPaginate({
                    page: paginate.page + 1,
                  });
                }}
                disabled={outOfStock || loading}
                style={{
                  cursor: outOfStock ? "not-allowed" : "pointer",
                }}
              >
                {outOfStock === false ? "Xem thêm" : "Xem thêm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
