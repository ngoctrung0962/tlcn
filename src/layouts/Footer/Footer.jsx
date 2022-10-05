import React from "react";
import { BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-3 mb-3 d-flex justify-content-center align-items-center">
              <Link to="/">
                <h5
                  className="mb-4 footer__logo"
                  style={{ color: "#fff", fontSize: "30px" }}
                >
                  <span style={{ color: "rgb(252, 207, 0)", fontSize: "30px" }}>
                    Le
                  </span>
                  gacy
                </h5>
              </Link>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <h5 className="mb-4">About Us</h5>
              <ul className="nav flex-column about__text flex-no-wrap">
                <li className="nav-item mb-2 p-0">
                  <p>Địa chỉ: số 1 Võ Văn Ngân TP Thủ Đức</p>
                </li>
                <li className="nav-item mb-2 p-0">
                  <p>Email: ngoctrung0962@gmail.com</p>
                </li>
                <li className="nav-item mb-2 p-0">
                  <p>Điện thoại: 0987654337</p>
                </li>
              </ul>
            </div>

            <div className="col-md-5 col-12 offset-md-1 mb-3">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn main__btn" type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between pt-4 my-4 border-top">
            <p style={{ color: "#fff" }}>
              © 2022 Company, Inc. All rights reserved.
            </p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <BsInstagram style={{ fontSize: "30px", color: "#fff" }} />
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <BsYoutube style={{ fontSize: "30px", color: "#fff" }} />
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <BsFacebook style={{ fontSize: "30px", color: "#fff" }} />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </footer>
  );
}
