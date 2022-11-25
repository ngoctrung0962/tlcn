import React from "react";

export default function Loading() {
  return (
    <div className="loading__container">
      <div className="loading__inner" style={{ height: "100vh" }}>
        <lottie-player
          src="https://assets4.lottiefiles.com/packages/lf20_9oookkwa/loading.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
}
