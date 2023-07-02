import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, loginSuccess, saveToken } from "../../../redux/userRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
import userApi from "../../../api/userApi";
import Storagekey from "../../../constants/storagekey";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useState } from "react";
export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await userApi.login(data);
      if (!res.errorCode) {
        await Cookies.set("token", res.data.token);

        const isDoneLogin = await saveToken(res.data.token);

        if (isDoneLogin) {
          const resGetUser = await userApi.get(res.data.username);
          dispatch(loginSuccess(resGetUser.data));
          await Cookies.set("username", res.data.username);
          Swal.fire({
            icon: "success",
            iconHtml: "👍",
            title: "Đăng nhập thành công",
            text: "Chào mừng bạn đến với trang web của chúng tôi",
          });
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          iconHtml: "👎",
          title: "Đăng nhập thất bại",
          text: "Vui lòng kiểm tra lại tài khoản hoặc mật khẩu",
          allowOutsideClick: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="row m-0 signin__page d-flex justify-content-center align-items-center">
        <div className="col-12 signin__page-inner d-flex  justify-content-center align-items-center">
          <div className="col-12 col-md-6 d-flex  flex-column justify-content-center align-items-center">
            <h1 className="login__title mb-5 text-center">ĐĂNG NHẬP</h1>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="form__login d-flex flex-column gap-3 align-items-center"
            >
              <Form.Group className="w-100">
                <TextField
                  label="Tên đăng nhập"
                  className="w-100"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-danger form__error">
                    Vui lòng nhập tên đăng nhập
                  </span>
                )}
              </Form.Group>

              <Form.Group className="w-100">
                <TextField
                  label="Mật khẩu"
                  type="password"
                  className="w-100"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-danger form__error">
                    Password không đúng
                  </span>
                )}
              </Form.Group>

              <div className="d-flex flex-row w-100 justify-content-between align-items-center">
                <Link className="link_to_signup" to="/signup">
                  Bạn chưa có tài khoản? Đăng kí ngay
                </Link>
                <Link className="link_to_signup" to="/forgotpass">
                  Quên mật khẩu
                </Link>
              </div>
              <Button
                className="btn_login mt-3"
                variant="outlined"
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
              >
                Đăng nhập
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </Button>
            </Form>
          </div>
          <div className="col-12 col-md-6 d-none d-md-block ">
            <lottie-player
              src="https://assets3.lottiefiles.com/private_files/lf30_sxw84pnl.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </>
  );
}
