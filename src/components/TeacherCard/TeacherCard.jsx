import React from "react";
import { Link } from "react-router-dom";

export default function TeacherCard({ teacher }) {
  return (
    <Link to={`/teacher/${teacher?.username}`}>
      <div className="card d-flex flex-row teacher__card ">
        <img
          src={teacher?.teacherInfo?.avatar}
          className="card-img-top card__teacher__avatar"
          alt="avt"
        />
        <div className="card-body">
          <h5 className="card-title teacher__fullname">
            {teacher?.teacherInfo?.fullname}
          </h5>
          <p className="card-text teacher__caption">
            <strong>Lĩnh vực dạy:</strong> {teacher?.caption}
          </p>
          <p className="card-text teacher__caption">
            <strong>Số học sinh theo học:</strong> {teacher?.totalStudents}
          </p>
          <p className="card-text teacher__caption">
            <strong>Số lượt review:</strong>
            {teacher?.totalReviews}
          </p>
        </div>
      </div>
    </Link>
  );
}
