import React from "react";
import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loading__container">
      <div className="loading__inner d-flex justify-content-center alight-items-center">
        {/* <lottie-player
          src="https://assets4.lottiefiles.com/packages/lf20_9oookkwa/loading.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player> */}
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="100"
          height="100"
          visible={true}
        />
      </div>
    </div>
  );
}
