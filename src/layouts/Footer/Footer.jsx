import React from "react";
import { BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  const handScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const path = useLocation().pathname;
  const nav = useNavigate();
  const handleBackToHome = () => {
    if (path === "/") handScrollToTop();
    else nav("/");
  };
  return (
    <footer className="footer  d-flex justify-content-center align-items-center">
      <div className=" d-flex justify-content-center align-items-center">
        <button
          className="footer__brand text-center"
          onClick={handleBackToHome}
        >
          VỀ TRANG CHỦ
        </button>
      </div>
    </footer>
  );
}
