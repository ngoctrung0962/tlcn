import React from "react";
export const Step1 = () => {
  return (
    <div className="p-1">
      <lottie-player
        src="https://assets2.lottiefiles.com/packages/lf20_4qkb4ywv.json"
        background="transparent"
        speed="1"
        style={{ width: "100%", height: "300px" }}
        loop
        autoplay
      ></lottie-player>
      <p
        style={{
          color: "#6a6f73",
          marginBottom: "2rem",
        }}
      >
        Bước 1/33
      </p>
    </div>
  );
};
