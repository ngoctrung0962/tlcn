import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeleton({ width = "100%", height = "100%" }) {
  return <Skeleton width={width} height={height} />;
}
