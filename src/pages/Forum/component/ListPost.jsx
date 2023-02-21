import React from "react";
import Post from "./Post";
export default function ListPost() {
  return (
    <div
      className="list__post"
      style={{
        marginTop: "20px",
      }}
    >
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
