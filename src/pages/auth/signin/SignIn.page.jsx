import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, saveToken } from "../../../redux/userRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
import userApi from "../../../api/userApi";
export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      const res = await userApi.login(data);
      if (!res.errorCode){
        // saveToken(res)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row m-0 signin__page d-flex justify-content-center align-items-center">
      <div className="col-12 signin__page-inner d-flex  justify-content-center align-items-center">
        <div className="col-12 col-md-6 d-flex  flex-column justify-content-center align-items-center">
          <img
            src={require("../../../assets/img/logo.gif")}
            width={"auto"}
            height={100}
            alt=""
            className="mb-2"
          />
          <h1 className="login__title mb-5 text-center">ĐĂNG NHẬP</h1>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="form__login d-flex flex-column gap-3 align-items-center"
          >
            <TextField
              label="Tên đăng nhập"
              className="w-100"
              {...register("username")}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              className="w-100"
              {...register("password")}
            />
            <div className="d-flex flex-row w-100 justify-content-between align-items-center">
              <Link className="link_to_signup" to="/signup">
                Bạn chưa có tài khoản? Đăng kí ngay
              </Link>
              <Link className="link_to_signup" to="/signup">
                Quên mật khẩu
              </Link>
            </div>
            <Button
              className="btn_login mt-3"
              variant="outlined"
              onClick={handleSubmit(onSubmit)}
            >
              Đăng nhập
            </Button>
          </Form>
        </div>
        <div className="col-12 col-md-6 d-none d-md-block ">
          <img
            className="img-fluid"
            src={require("../../../assets/img/65012-learning-concept.gif")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
