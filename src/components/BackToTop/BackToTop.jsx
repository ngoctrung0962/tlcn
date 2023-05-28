import React from "react";
import { TbArrowBigUp } from "react-icons/tb";
export default function BackToTop() {
  const showBackToTop = () => {
    const backToTop = document.querySelector(".back__to__top");
    if (window.scrollY > 200) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  };
  window.addEventListener("scroll", showBackToTop);

  const handScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="back__to__top" onClick={handScrollToTop}>
      <TbArrowBigUp />
    </div>
  );
}
