import { Rating, TextField } from "@mui/material";
import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const ReviewForm = (props) => {
  const reviewData = [
    {
      id: 1,
      name: "John Doe 1",
      rating: 3,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "2021-10-10",
    },
    {
      id: 2,
      name: "John Doe 2",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. .",
      date: "2021-10-10",
    },
    {
      id: 3,
      name: "John Doe 3",
      rating: 4,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.",
      date: "2021-10-10",
    },
  ];
  console.log(reviewData);
  console.log(props.listReviews, "list review");

  return (
    <div className="course__content__item">
      <h4 className="course__content__title">Đánh giá (3)</h4>

      <Form className=" my-5 form__rating mx-4 ">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={10} sm={12}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <TextField
                id="outlined-basic"
                label="Nhập bình luận của bạn"
                variant="outlined"
                fullWidth
                type={"text"}
              />
            </Form.Group>
          </Col>
          <Col
            md={2}
            sm={12}
            className="d-flex justify-content-center align-items-center"
          >
            <Form.Group className="mb-3 ">
              <Rating value={5} size="big" />
            </Form.Group>{" "}
          </Col>
          <Row>
            <div
              className="d-flex 
            justify-content-center "
            >
              <Button variant="primary" type="submit" className="button-85">
                Thêm bình luận
              </Button>
            </div>
          </Row>
        </Row>
      </Form>

      {reviewData.map((item, index) => {
        return (
          <div key={index} className="rating__container d-flex">
            <div className="rating__item row mx-2 w-100">
              <div className="col-12 col-md-3 rating__avt d-flex justify-content-center align-items-center">
                <img
                  alt="avt"
                  src={require("../../../assets/img/member.jpg")}
                />
                <div className="d-flex flex-column">
                  <span className="name_user">{item.name}</span>
                  <div className=" rating__time">
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-9 rating__content">
                <div className="rating__star">
                  <Rating name="read-only" value={item.rating} readOnly />
                </div>
                <span>{item.comment}</span>
              </div>
            </div>
          </div>
        );
      })}

      {props?.listReviews?.map((item, index) => (
        <div key={index} className="rating__container ">
          <div className="rating__item row mx-2 w-100">
            <div className="col-12 col-md-3 rating__avt d-flex justify-content-center align-items-center">
              <img alt="avt" src={require("../../../assets/img/member.jpg")} />
              <div className="d-flex flex-column">
                <span className="name_user">{item?.username}</span>
                <div className=" rating__time">
                  <span>{item?.date}</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-9 rating__content">
              <div className="rating__star">
                <Rating name="read-only" value={item?.rating} readOnly />
              </div>
              <p>{item?.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewForm;
