import React from "react";
import { BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <footer className="py-3">
          <div className="row">
            <div className="col-6 col-md-3 mb-2 d-flex justify-content-center align-items-center">
              <Link to="/">
                <h5
                  className="mb-4 footer__logo"
                  style={{ color: "#2d3748", fontSize: "30px" }}
                >
                  <span style={{ color: "#005fb7", fontSize: "30px" }}>Le</span>
                  gacy
                </h5>
              </Link>
            </div>
            <div className="col-6 col-md-3 mb-2">
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

            <div className="col-md-5 col-12 offset-md-1 mb-2">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Join the 5,000+ people that uses BRIX Templates</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="footer__sendEmail"
                    placeholder="Email address"
                  />
                  <button className="btn main__btn " type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between pt-4 my-1 border-top">
            <p style={{ color: "#005fb7" }}>
              © 2022 Company, Inc. All rights reserved.
            </p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <Link className="link-dark" to="/">
                  <BsInstagram style={{ fontSize: "30px", color: "#005fb7" }} />
                </Link>
              </li>
              <li className="ms-3">
                <Link className="link-dark" to="/">
                  <BsYoutube style={{ fontSize: "30px", color: "#005fb7" }} />
                </Link>
              </li>
              <li className="ms-3">
                <Link className="link-dark" to="/">
                  <BsFacebook style={{ fontSize: "30px", color: "#005fb7" }} />
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </footer>
  );
}
